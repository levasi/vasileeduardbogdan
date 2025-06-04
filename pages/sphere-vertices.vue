<template>
    <div ref="container" class="three-container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import giuseppeHdr from '~/assets/hdr/san_giuseppe_bridge_2k.jpg';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default {
    name: "sphere-vertices",
    setup() {
        definePageMeta({
            layout: 'fixed-nav'
        })
        const container = ref(null);
        let scene, camera, renderer, textMesh;

        const initThreeJS = () => {
            setupScene();
            addHdr();
            setupCamera();
            setupRenderer();
            addOrbitControls();
            addLight();
            animate();
            addCube();
        };

        const addOrbitControls = () => {
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; // Enable damping for smooth controls
            controls.dampingFactor = 0.05; // Damping factor
            controls.minDistance = 2; // Minimum zoom distance
            controls.maxDistance = 10; // Maximum zoom distance
            controls.update();
        };

        // Mouse interaction setup
        const mouse = new THREE.Vector2(); // Store mouse position in NDC
        window.addEventListener("mousemove", (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize X
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize Y
        });

        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Plane at z = 0
        const planeIntersectPoint = new THREE.Vector3(); // Store intersection point

        const updateMousePositionIn3D = () => {
            raycaster.setFromCamera(mouse, camera); // Cast a ray from the camera
            raycaster.ray.intersectPlane(plane, planeIntersectPoint); // Find intersection with the plane
        };

        const gravitateObject = (object) => {
            const damping = 0.1; // Adjust damping for smooth motion
            object.position.x += (planeIntersectPoint.x - object.position.x) * damping;
            object.position.y += (planeIntersectPoint.y - object.position.y) * damping;
        };

        // HDR setup
        const addHdr = () => {
            const hdrLoader = new UltraHDRLoader();
            hdrLoader.load(giuseppeHdr, (hdr) => {
                hdr.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = hdr;
                // scene.background = hdr;
            });
        };

        const addText = () => {
            const fontLoader = new FontLoader();
            fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
                const textGeometry = new TextGeometry('Hello, Three.js!', {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    depth: 0.1,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelSegments: 5,
                });

                const textMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
                textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(-2, 0, 0); // Adjust position as needed
                scene.add(textMesh);
            });
        };

        addText();

        const setupScene = () => {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xDFEFCA);
        };
        window.addEventListener("click", (event) => {
            // Convert mouse position to normalized device coordinates (NDC)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Perform raycasting
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true); // Check all objects in the scene

            // Check if an object was clicked
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                // Change the color of the clicked object if it has a material
                if (clickedObject.material) {
                    clickedObject.material.color.set(Math.random() * 0xffffff); // Assign a random color
                }
            }
        });
        const setupCamera = () => {
            camera = new THREE.PerspectiveCamera(
                75,
                getAspectRatio(),
                0.1,
                1000
            );
            camera.position.z = 5;
        };

        const setupRenderer = () => {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(getContainerWidth(), getContainerHeight());
            container.value?.appendChild(renderer.domElement);
        };

        const getAspectRatio = () => {
            return getContainerWidth() / getContainerHeight();
        };

        const getContainerWidth = () => {
            return container.value?.clientWidth || window.innerWidth;
        };

        const getContainerHeight = () => {
            return container.value?.clientHeight || window.innerHeight;
        };

        const addLight = () => {
            const light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(10, 10, 10);
            scene.add(light);
        };
        const getCube = () => {
            const cube = scene.children.find((child) => child.isMesh && child.geometry.type === "SphereGeometry");
            if (cube) {
                return cube;
            }
            console.warn('No cube found in the scene');
        }
        const addCube = () => {

            const geometry = new THREE.SphereGeometry(
                3, // Radius
                16, // Width segments
                16 // Height segments
            ); // Create a cube geometry
            geometry.computeVertexNormals();
            const material = new THREE.MeshBasicMaterial({
                vertexColors: true, // Enable vertex colors
            });
            material.visible = false; // Make the geometry invisible
            geometry.name = 'big-sphere'; // Name the geometry for identification
            // Create an array to store colors for each vertex
            const colors = [];
            const color = new THREE.Color();

            // Assign a random color to each vertex
            for (let i = 0; i < geometry.attributes.position.count; i++) {
                color.set(Math.random() * 0xffffff); // Generate a random color
                colors.push(color.r, color.g, color.b); // Add the color to the array
            }

            // Add the colors to the geometry
            geometry.setAttribute(
                'color',
                new THREE.Float32BufferAttribute(colors, 3) // 3 values per vertex (r, g, b)
            );

            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, 0);
            scene.add(cube);

            // Add spheres to each vertex of the cube
            const sphereGeometry = new THREE.SphereGeometry(0.05, 16, 16); // Small sphere geometry
            const sphereMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color(Math.random() * 0xffffff), // Random color
                metalness: 0.8, // High metalness for shiny effect
                roughness: 0.2 // Low roughness for smooth surface
            });

            const positions = geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                sphere.name = 'small-sphere' // Name each sphere for identification
                sphere.position.set(
                    positions.getX(i),
                    positions.getY(i),
                    positions.getZ(i)
                );
                cube.add(sphere); // Add the sphere as a child of the cube
            }
        };

        const animateCube = () => {
            const cube = getCube();
            const scaleAmplitude = Math.sin(Date.now() * 0.002) * 0.08 + 1; // Oscillate scale between 0.8 and 1.2
            if (cube) {
                // Scale the cube
                cube.scale.set(scaleAmplitude, scaleAmplitude, scaleAmplitude);
            }
            if (cube) {
                // Gravitate small spheres along vertex normals
                const smallSpheres = cube.children.filter((child) => child.name === 'small-sphere');
                const positions = cube.geometry.attributes.position;
                const normals = cube.geometry.attributes.normal;

                smallSpheres.forEach((sphere, index) => {
                    const normal = new THREE.Vector3(
                        normals.getX(index),
                        normals.getY(index),
                        normals.getZ(index)
                    );

                    // Move the sphere along the normal
                    const amplitude = Math.sin(Date.now() * 0.001 + index) * 0.1; // Oscillate along the normal
                    sphere.position.set(
                        positions.getX(index) + normal.x * amplitude,
                        positions.getY(index) + normal.y * amplitude,
                        positions.getZ(index) + normal.z * amplitude
                    );
                });
            }

            if (cube) {
                cube.rotation.y += 0.001; // Rotate the cube
                cube.rotation.x += 0.001; // Rotate the cube
                cube.rotation.z += 0.001; // Rotate the cube
            }
        };

        const animate = () => {
            const renderLoop = () => {
                requestAnimationFrame(renderLoop);
                updateMousePositionIn3D(); // Update mouse position in 3D space

                animateCube();
                renderer.render(scene, camera);
            };
            renderLoop();
        };

        const onWindowResize = () => {
            if (container.value && camera && renderer) {
                camera.aspect = getAspectRatio();
                camera.updateProjectionMatrix();
                renderer.setSize(getContainerWidth(), getContainerHeight());
            }
        };

        onMounted(() => {
            initThreeJS();
            window.addEventListener("resize", onWindowResize);
        });

        onBeforeUnmount(() => {
            window.removeEventListener("resize", onWindowResize);
            if (renderer) {
                renderer.dispose();
            }
        });

        return {
            container,
        };
    },
};
</script>

<style>
.three-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
}
</style>
