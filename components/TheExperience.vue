<script setup>
import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
</script>

<template>
    <div class="experience">
        <canvas id="experienceCanvas" class="canvas"></canvas>
    </div>
</template>