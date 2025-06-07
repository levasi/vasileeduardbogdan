import * as THREE from 'three'
import starTexture from '~/assets/images/stars/pngegg.png';
import nebulaTextureMap from '~/assets/images/stars/nebula.png';

export default function createStarField(container) {
    console.log(container)
    const width = container.offsetWidth
    const height = container.offsetHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 60
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Star field with twinkle and color
    const starCount = 1600
    const spread = 320
    const positions = []
    const colors = []
    const sizes = []
    for (let i = 0; i < starCount; i++) {
        const r = spread * Math.cbrt(Math.random())
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos(2 * Math.random() - 1)
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta)
        const z = r * Math.cos(phi)
        positions.push(x, y, z)
        // Vary color: blue, white, yellow, red
        const colorChoices = [0x559CAD, 0xffffff, 0xfff7c2, 0xffb3b3, 0xbad6ff]
        const color = new THREE.Color(colorChoices[Math.floor(Math.random() * colorChoices.length)])
        colors.push(color.r, color.g, color.b)
        // Vary size
        sizes.push(0.5 + Math.random() * 1.5)
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

    // Add rotation and rotation speed attributes
    const rotations = [];
    const rotationSpeeds = [];
    const trailLengths = [];
    for (let i = 0; i < starCount; i++) {
        rotations.push(Math.random() * Math.PI * 2);
        rotationSpeeds.push((Math.random() - 0.5) * 0.02);
        // Assign a trail length to some stars (e.g., 20% of stars) with very long trails
        trailLengths.push(Math.random() < 0.2 ? Math.random() * 20.0 + 10.0 : 0);
    }
    starGeometry.setAttribute('rotation', new THREE.Float32BufferAttribute(rotations, 1));
    starGeometry.setAttribute('rotationSpeed', new THREE.Float32BufferAttribute(rotationSpeeds, 1));
    starGeometry.setAttribute('trailLength', new THREE.Float32BufferAttribute(trailLengths, 1));

    // Custom ShaderMaterial for rotating sprites
    const loader = new THREE.TextureLoader();
    loader.load(starTexture, (starTexture) => {
        console.log(starTexture)
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: starTexture },
                size: { value: 6 },
                opacity: { value: 1 }
            },
            vertexShader: `
                attribute float size;
                attribute float rotation;
                attribute float trailLength;
                varying float vRotation;
                varying float vTrailLength;
                void main() {
                    vRotation = rotation;
                    vTrailLength = trailLength;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                uniform float opacity;
                varying float vRotation;
                varying float vTrailLength;
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    float c = cos(vRotation);
                    float s = sin(vRotation);
                    mat2 rot = mat2(c, -s, s, c);
                    uv = rot * uv;
                    uv += 0.5;
                    vec4 color = texture2D(pointTexture, uv);
                    if (color.a < 0.1) discard;
                    // Apply trail effect
                    if (vTrailLength > 0.0) {
                        float dist = length(gl_PointCoord - 0.5);
                        if (dist > 0.5) {
                            float trail = 1.0 - (dist - 0.5) / vTrailLength;
                            if (trail > 0.0) {
                                color.a *= trail * 4.0; // Further increase trail opacity
                            } else {
                                discard;
                            }
                        }
                    }
                    gl_FragColor = vec4(color.rgb, color.a * opacity);
                }
            `,
            transparent: true,
            depthWrite: false
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // --- Floating and forward movement effect ---
        const starPositions = starGeometry.attributes.position.array;
        function animate() {
            // Twinkle effect
            const time = Date.now() * 0.002;
            const starSizes = starGeometry.attributes.size;
            for (let i = 0; i < starCount; i++) {
                starSizes.array[i] = sizes[i] * (0.7 + 0.3 * Math.abs(Math.sin(time + i)));
            }
            starSizes.needsUpdate = true;

            // Float and move forward
            for (let i = 0; i < starCount; i++) {
                const idx = i * 3;
                // Gentle float
                starPositions[idx + 0] += Math.sin(time + i) * 0.01; // x
                starPositions[idx + 1] += Math.cos(time + i) * 0.01; // y
                // Move forward (increase z)
                starPositions[idx + 2] += 0.25; // z
                // If star passes the camera, reset to far background
                if (starPositions[idx + 2] > 60) {
                    starPositions[idx + 2] = -spread;
                    // Optionally randomize x/y for more variety
                    starPositions[idx + 0] = (Math.random() - 0.5) * spread * 2;
                    starPositions[idx + 1] = (Math.random() - 0.5) * spread * 2;
                }
            }
            starGeometry.attributes.position.needsUpdate = true;

            // Per-star rotation
            const rotAttr = starGeometry.attributes.rotation;
            const rotSpeedAttr = starGeometry.attributes.rotationSpeed;
            for (let i = 0; i < starCount; i++) {
                rotAttr.array[i] += rotSpeedAttr.array[i];
            }
            rotAttr.needsUpdate = true;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    });
}