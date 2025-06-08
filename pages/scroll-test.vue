<template>
    <LenisContainer root>
        <div ref="starterTemplate" class="scroll-template"></div>
        <span ref="h3">Scroll Animation</span>
        <section ref="s1">
            <p>
                s1
            </p>
        </section>
        <section>
            <p>
                This is a scroll animation example using GSAP and Three.js. Scroll down to see the effect.
            </p>
        </section>
        <section>
            <p>
                This is a scroll animation example using GSAP and Three.js. Scroll down to see the effect.
            </p>
        </section>
    </LenisContainer>
</template>
<script setup>
definePageMeta({
    layout: 'fixed-nav'
})
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNuxtApp } from '#app'


gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    const { $lenis } = useNuxtApp()
    if ($lenis) {
        $lenis.on('scroll', ScrollTrigger.update)
    }
})
import { onMounted, onBeforeUnmount, ref } from 'vue'
let renderer = null
const starterTemplate = ref(null)
const h3 = ref(null)
const s1 = ref(null)

onMounted(() => {
    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader()

    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0x90BEDE);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    // new OrbitControls(camera, renderer.domElement);
    starterTemplate.value.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const interestingMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() }
        },
        vertexShader: `
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vPosition;
            void main() {
                gl_FragColor = vec4(abs(sin(vPosition.x)), abs(sin(vPosition.y)), abs(sin(vPosition.z)), 1.0);
            }
        `
    });
    const cube = new THREE.Mesh(geometry, interestingMaterial);
    // const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    gsap.to(cube.position, {
        scrollTrigger: {
            trigger: 0,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        x: 12,
        y: 12,
        z: 12,
        duration: 2,
    });
    gsap.to(cube.scale, {
        scrollTrigger: {
            trigger: 0,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        x: 15,
        y: 15,
        z: 15,
        duration: 2,
    });
    camera.position.z = 5

    function animate() {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
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

<style scoped>
canvas {
    height: 100%;
}

section {
    height: 300px;
}

h3 {
    position: fixed;
    top: 20px;
    left: 20px;
    color: white;
    font-size: 2rem;
}
</style>