<template>

</template>
<script setup>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import earthMapTexture from '~/assets/images/earth/00_earthmap1k.jpg';
import specularMap from '~/assets/images/earth/02_earthspec1k.jpg';
import bumpMap from '~/assets/images/earth/01_earthbump1k.jpg';
import lightsMap from '~/assets/images/earth/03_earthlights1k.jpg';
import earthCloudsMap from '~/assets/images/earth/04_earthcloudmap.jpg';
import earthCloudsTransMap from '~/assets/images/earth/05_earthcloudmaptrans.jpg';

onMounted(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);
    // THREE.ColorManagement.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;
    scene.add(earthGroup);
    new OrbitControls(camera, renderer.domElement);
    const detail = 12;
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.IcosahedronGeometry(1, detail);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load(earthMapTexture),
        specularMap: loader.load(specularMap),
        bumpMap: loader.load(bumpMap),
        bumpScale: 0.04,
    });
    // material.map.colorSpace = THREE.SRGBColorSpace;
    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    const lightsMat = new THREE.MeshBasicMaterial({
        map: loader.load(lightsMap),
        blending: THREE.AdditiveBlending,
    });

    const lightsMesh = new THREE.Mesh(geometry, lightsMat);
    earthGroup.add(lightsMesh);

    const cloudsMat = new THREE.MeshStandardMaterial({
        map: loader.load(earthCloudsMap),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        alphaMap: loader.load(earthCloudsTransMap),
        // alphaTest: 0.3,
    });
    const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.setScalar(1.008);
    earthGroup.add(cloudsMesh);

    const fresnelMat = useFresnelMat();
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    const stars = useStarField({ numStars: 2222 });
    scene.add(stars);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    function animate() {
        requestAnimationFrame(animate);

        earthMesh.rotation.y += 0.002;
        lightsMesh.rotation.y += 0.002;
        cloudsMesh.rotation.y += 0.0023;
        glowMesh.rotation.y += 0.002;
        stars.rotation.y -= 0.0002;
        scene.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }

    animate();

    function handleWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleWindowResize, false);
});
</script>