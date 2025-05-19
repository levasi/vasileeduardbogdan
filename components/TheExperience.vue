<script setup>
import * as THREE from 'three';
console.log(window)
console.log(document.getElementById('experienceCanvas'))

const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
// const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('experienceCanvas') })
// renderer.setSize(800, 600)
// renderer.setPixelRatio(window.devicePixelRatio)
// const controls = new THREE.OrbitControls(camera, renderer.domElement)
// const scene = new THREE.Scene()
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
// camera.position.z = 5

</script>

<template>
    <div class="experience">
        <canvas id="experienceCanvas" class="canvas"></canvas>
    </div>
</template>