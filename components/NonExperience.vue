<template>
    <canvas ref="nonExperianceRef" class="canvas"></canvas>
</template>
<script setup>
import * as THREE from 'three';
import { onMounted, useTemplateRef } from 'vue';

const experience = useTemplateRef('nonExperianceRef');

let renderer = null;
const width = 800
const height = 600
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.set(0, 4, 4)

function setRenderer() {
    renderer = new THREE.WebGLRenderer({ canvas: experience.value });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
}

onMounted(() => {
    setRenderer()
});

</script>