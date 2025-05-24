<template>
    <input type="range" @input="updateFov" v-model="fov" min="25" max="130" />
    <canvas ref="demoCanvasRef"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const demoCanvasRef = ref(null)
const fov = ref(75)
const scene = new THREE.Scene()
scene.background = new THREE.Color('#f0f0f0')
let camera = null

function updateFov() {
    camera.fov = fov.value
    camera.updateProjectionMatrix()
}

onMounted(() => {
    camera = new THREE.PerspectiveCamera(fov.value, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const geometry = new THREE.DodecahedronGeometry(1, 0)
    const material = new THREE.MeshLambertMaterial({
        color: '#468585',
        wireframe: false,
        emissive: '#468585'
    })
    const dodecahedronGeometry = new THREE.Mesh(geometry, material)


    const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2)
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: '#b4b4b3',
        wireframe: false,
        emissive: '#b4b4b3'
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.y = -1.5

    scene.add(dodecahedronGeometry)
    scene.add(box)

    const light = new THREE.SpotLight(0x006769, 100)
    light.position.set(1, 1, 1)
    scene.add(light)

    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: demoCanvasRef.value })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = true

    function animate() {
        requestAnimationFrame(animate)
        dodecahedronGeometry.rotation.x += 0.01
        dodecahedronGeometry.rotation.y += 0.01
        box.rotation.y += 0.01
        controls.update()
        renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', () => {
        const width = window.innerWidth
        const height = window.innerHeight
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    })


})

</script>