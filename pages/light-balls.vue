<template>
    <div ref="lightBallsCanvas"></div>
</template>

<script setup>
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { onMounted, onBeforeUnmount, ref } from 'vue';

import giuseppeHdr from '~/assets/hdr/san_giuseppe_bridge_2k.jpg';
import { getBody, getMouseBall } from './getBodies.js';

definePageMeta({
    layout: 'fixed-nav',
});

const lightBallsCanvas = ref(null);

function useThreeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    return { scene, camera, renderer };
}

function useOrbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    return controls;
}

function useHDRLoader(scene) {
    const hdrLoader = new UltraHDRLoader();
    hdrLoader.load(giuseppeHdr, (hdr) => {
        hdr.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdr;
    });
}

function usePhysicsWorld() {
    const gravity = { x: 0.0, y: 0, z: 0.0 };
    const world = new RAPIER.World(gravity);
    return world;
}

function useBodies(scene, world) {
    const numBodies = 100;
    const bodies = [];

    for (let i = 0; i < numBodies; i++) {
        const body = getBody(RAPIER, world);
        bodies.push(body);
        scene.add(body.mesh);
    }

    return bodies;
}

function useMouseInteraction(scene, camera, world) {
    const raycaster = new THREE.Raycaster();
    const pointerPos = new THREE.Vector2(0, 0);
    const mousePos = new THREE.Vector3(0, 0, 0);

    const mousePlaneGeo = new THREE.PlaneGeometry(48, 48, 48, 48);
    const mousePlaneMat = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0x00ff00,
        transparent: true,
        opacity: 0.0,
    });
    const mousePlane = new THREE.Mesh(mousePlaneGeo, mousePlaneMat);
    mousePlane.position.set(0, 0, 0.2);
    scene.add(mousePlane);

    const mouseBall = getMouseBall(RAPIER, world);
    scene.add(mouseBall.mesh);

    window.addEventListener('mousemove', (evt) => {
        pointerPos.set(
            (evt.clientX / window.innerWidth) * 2 - 1,
            -(evt.clientY / window.innerHeight) * 2 + 1
        );
    });

    const cameraDirection = new THREE.Vector3();

    function handleRaycast() {
        camera.getWorldDirection(cameraDirection);
        cameraDirection.multiplyScalar(-1);
        mousePlane.lookAt(cameraDirection);

        raycaster.setFromCamera(pointerPos, camera);
        const intersects = raycaster.intersectObjects([mousePlane], false);
        if (intersects.length > 0) {
            mousePos.copy(intersects[0].point);
        }
    }

    return { mouseBall, mousePos, handleRaycast };
}

function useLighting(scene) {
    const hemiLight = new THREE.HemisphereLight(0x00bbff, 0xaa00ff);
    hemiLight.intensity = 0.2;
    scene.add(hemiLight);
}

function useWindowResize(camera, renderer) {
    function handleWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleWindowResize, false);

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleWindowResize);
    });
}

onMounted(async () => {
    const { scene, camera, renderer } = useThreeScene();
    lightBallsCanvas.value.appendChild(renderer.domElement);

    const controls = useOrbitControls(camera, renderer);
    useHDRLoader(scene);
    await RAPIER.init();

    const world = usePhysicsWorld();
    const bodies = useBodies(scene, world);
    const { mouseBall, mousePos, handleRaycast } = useMouseInteraction(scene, camera, world);
    useLighting(scene);
    useWindowResize(camera, renderer);

    function animate() {
        requestAnimationFrame(animate);
        world.step();
        handleRaycast();
        mouseBall.update(mousePos);
        controls.update();
        bodies.forEach((b) => b.update());
        renderer.render(scene, camera);
    }

    animate();
});
</script>