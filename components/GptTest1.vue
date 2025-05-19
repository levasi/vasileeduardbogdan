<template>
    <canvas ref="canvas" class="three-canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

onMounted(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)

    scene.add(ambientLight, pointLight)

    const textureLoader = new THREE.TextureLoader()
    const cards = []
    const projects = [
        { src: '/images/pexels-eprism-studio-108171-335257.jpg', url: 'https://your-link-1.com' },
        { src: '/images/pexels-laryssa-suaid-798122-1667088.jpg', url: 'https://your-link-2.com' },
        { src: '/images/pexels-madebymath-90946.jpg', url: 'https://your-link-3.com' }
    ]

    projects.forEach((item, i) => {

        const texture = textureLoader.load(item.src)
        const geometry = new THREE.PlaneGeometry(2, 1.2)
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = (i - 1) * 3
        // mesh.userData.url = item.url
        scene.add(mesh)
        cards.push(mesh)
    })

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(cards)
        if (intersects.length > 0) {
            const url = intersects[0].object.userData.url
            window.open(url, '_blank')
        }
    }

    window.addEventListener('click', onClick)

    const animate = () => {
        requestAnimationFrame(animate)
        cards.forEach(c => {
            if (c.rotation.y > 0.1) {
                c.userData.rotationDirection = -1 // Reverse direction
            } else if (c.rotation.y < -0.1) {
                c.userData.rotationDirection = 1 // Reverse direction
            }

            // Initialize rotationDirection if not set
            if (c.userData.rotationDirection === undefined) {
                c.userData.rotationDirection = 1
            }

            c.rotation.y += 0.0001 * c.userData.rotationDirection
            c.rotation.x += 0.0005 * -c.userData.rotationDirection
        })
        renderer.render(scene, camera)
    }

    animate()
})
</script>

<style scoped>
.three-canvas {
    width: 100vw;
    height: 100vh;
    display: block;
}
</style>