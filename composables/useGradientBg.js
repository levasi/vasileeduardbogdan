import * as THREE from 'three'

/**
 * Creates a gradient background mesh for a Three.js scene.
 * @param {Object} [options] - Optional colors and size.
 * @param {number} [options.width=100] - Width of the background plane.
 * @param {number} [options.height=100] - Height of the background plane.
 * @param {number|string} [options.color1=0x2193b0] - Top color.
 * @param {number|string} [options.color2=0x6dd5ed] - Bottom color.
 * @returns {THREE.Mesh} The gradient background mesh.
 */
export function useGradientBg(options = {}) {
    const {
        width = 100,
        height = 100,
        color1 = 0xDFEFCA,
        color2 = 0x559CAD,
    } = options

    const gradientMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) }
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide
    })

    const bgGeometry = new THREE.PlaneGeometry(width, height)
    const bgMesh = new THREE.Mesh(bgGeometry, gradientMaterial)
    bgMesh.position.z = -10 // Place it behind everything

    return bgMesh
}