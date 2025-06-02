<template>
    <div ref="lampTemplate"></div>
</template>
<script setup>
definePageMeta({
    layout: 'fixed-nav'
})
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';

// import files
import earthMapTexture from '~/assets/images/earth/00_earthmap1k.jpg';
import lampGltf from '~/assets/glb/duck.glb'; // Adjust the path to your GLTF model
import giuseppeHdr from '~/assets/hdr/san_giuseppe_bridge_2k.jpg';

import { onMounted, onBeforeUnmount, ref } from 'vue'
const lampTemplate = ref(null)
let renderer = null

onMounted(async () => {
    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader()
    const ultraHDRLoader = new UltraHDRLoader();

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    //background // Sprites BG
    const gradientBackground = useGetLayer({
        hue: 0.1,
        numSprites: 8,
        opacity: 0.2,
        radius: 10,
        size: 24,
        z: -15.5,
    });
    scene.add(gradientBackground);

    //add hdr
    const hdrLoader = new UltraHDRLoader();
    hdrLoader.load(giuseppeHdr, (hdr) => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        // scene.background = hdr;
        scene.environment = hdr;
    });

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.4); // Sky color, ground color, intensity
    scene.add(hemisphereLight);

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    new OrbitControls(camera, renderer.domElement);
    lampTemplate.value.appendChild(renderer.domElement)

    camera.position.z = 5

    // get colors from this url and create a color pallete https://coolors.co/577590-26f0f1-c4ebc8-8b5d33-cc2936
    const colorPalette = [
        0xFA7921,
        0xFE9920,
        0xFCFF6C,
        0xDAB6C4,
        0xA7BED3,
    ];

    // Create a basic material with the first color from the palette
    const material = new THREE.MeshBasicMaterial({ color: colorPalette[0] });

    const plasticMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0,
        transmission: 0.5,
        reflectivity: 0.5,
        clearCoat: 0.5,
        clearCoatRoughness: 0.5,
        lights: true
    });

    // load duck gltf model
    (async () => {
        await gltfLoader.load(lampGltf, (gltf) => {
            for (let i = 0; i < 1; i++) {
                const modelInstance = gltf.scene.clone(); // Clone the scene to create a new instance
                modelInstance.position.set(i * 2, 0, 0); // Position each instance differently
                scene.add(modelInstance);
            }

        }, undefined, (error) => {
        });
    })();
    // make the ducks follow the mouse cursor
    const mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function updateDucks() {
        // make the ducks rotate when the mouse moves
        scene.traverse((object) => {
            if (object.isMesh) {
                // object.rotation.y = mouse.x * Math.PI * 2;
                // object.rotation.x = mouse.y * Math.PI * 2;
                // object.rotation.z = mouse.x * Math.PI * 2;
            }
        });
    }

    // animate the scene
    function animate() {
        requestAnimationFrame(animate)
        updateDucks();
        renderer.render(scene, camera)
    }
    animate()

    function handleWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleWindowResize, false);
})
onBeforeUnmount(() => {
    renderer.dispose();
});
</script>