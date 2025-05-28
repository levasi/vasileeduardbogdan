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
// import giuseppeHdr from '~/assets/hdr/san_giuseppe_bridge_2k.jpg';
import castleHdr from '~/assets/hdr/teutonic_castle_moat_1k.hdr'; // Adjust the path to your HDR file

import { onMounted, onBeforeUnmount, ref } from 'vue'
const lampTemplate = ref(null)
let renderer = null

onMounted(async () => {
    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader()

    const ultraHDRLoader = new UltraHDRLoader();

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    //add hdr
    const hdrLoader = new UltraHDRLoader();
    hdrLoader.load(castleHdr, (hdr) => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = hdr;
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
    await gltfLoader.load(lampGltf, (gltf) => {
        scene.add(gltf.scene)

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                console.log('Child:', child);

                child.geometry.center();
                // Apply a standard material to the mesh
                // You can customize the material properties as needed
                child.material = plasticMaterial;
            }
        });
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.scale.set(1, 1, 1)
    }, undefined, (error) => {
        console.error('An error happened while loading the GLTF model:', error);
    });


    // animate the scene
    function animate() {
        requestAnimationFrame(animate)
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