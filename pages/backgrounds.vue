<template>
    <div class="backgrounds-wrapper">
        <section v-for="(section, i) in sections" :key="i" :class="['bg-section', section.class]">
            <div :ref="el => threeContainers[i] = el" class="three-bg"></div>
            <span>{{ section.label }}</span>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import starTexture from '~/assets/images/stars/pngegg.png';

gsap.registerPlugin(ScrollTrigger)

const sections = [
    { label: 'Section 1', class: 'section1' },
    { label: 'Section 2', class: 'section2' },
    { label: 'Section 3', class: 'section3' },
    { label: 'Section 4', class: 'section4' },
]
const threeContainers = []
const renderers = []
const animFrames = []

// Section 1: Star field


// Section 2: Animated color gradient
function createGradientBG(container) {
    const width = container.offsetWidth
    const height = container.offsetHeight
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 10)
    camera.position.z = 2
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    // Plane with custom shader
    const geometry = new THREE.PlaneGeometry(width, height)
    const uniforms = {
        u_time: { value: 0 },
        u_color1: { value: new THREE.Color('#059669') },
        u_color2: { value: new THREE.Color('#f59e42') }
    }
    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform float u_time; uniform vec3 u_color1; uniform vec3 u_color2; varying vec2 vUv; void main() { float t = 0.5 + 0.5 * sin(u_time + vUv.y * 6.2831); gl_FragColor = vec4(mix(u_color1, u_color2, t), 1.0); }`
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    function animate() {
        uniforms.u_time.value += 0.01
        renderer.render(scene, camera)
        animFrames[1] = requestAnimationFrame(animate)
    }
    animate()
}

// Section 3: Floating cubes
function createFloatingCubes(container) {
    const width = container.offsetWidth
    const height = container.offsetHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 30
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    const cubes = []
    for (let i = 0; i < 12; i++) {
        const geometry = new THREE.BoxGeometry(3, 3, 3)
        const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${i * 30},80%,60%)`), roughness: 0.5, metalness: 0.5 })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)
        scene.add(cube)
        cubes.push(cube)
    }
    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 0, 30)
    scene.add(light)
    function animate() {
        cubes.forEach((cube, i) => {
            cube.rotation.x += 0.01 + i * 0.001
            cube.rotation.y += 0.008 + i * 0.001
            cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01
        })
        renderer.render(scene, camera)
        animFrames[2] = requestAnimationFrame(animate)
    }
    animate()
}

// Section 4: Animated sine wave lines
function createSineWaves(container) {
    const width = container.offsetWidth
    const height = container.offsetHeight
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 10)
    camera.position.z = 2
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    const lines = []
    for (let j = 0; j < 6; j++) {
        const points = []
        for (let i = 0; i < 200; i++) {
            const x = -width / 2 + (i / 199) * width
            const y = Math.sin(i * 0.08 + j) * 30 + (j - 2.5) * 40
            points.push(new THREE.Vector3(x, y, 0))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({ color: `hsl(${j * 60},80%,60%)` })
        const line = new THREE.Line(geometry, material)
        scene.add(line)
        lines.push({ geometry, j })
    }
    function animate() {
        const t = Date.now() * 0.001
        lines.forEach(({ geometry, j }) => {
            const positions = geometry.attributes.position.array
            for (let i = 0; i < 200; i++) {
                positions[i * 3 + 1] = Math.sin(i * 0.08 + j + t * 2) * 30 + (j - 2.5) * 40
            }
            geometry.attributes.position.needsUpdate = true
        })
        renderer.render(scene, camera)
        animFrames[3] = requestAnimationFrame(animate)
    }
    animate()
}

onMounted(async () => {
    await nextTick()
    // GSAP snap
    gsap.utils.toArray('.bg-section').forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            snap: {
                snapTo: 1,
                duration: 0.5,
                ease: 'power1.inOut',
                delay: 0.05,
            },
        })
    })
    // Three.js backgrounds for each section
    if (threeContainers[0]) useStarField1(threeContainers[0])
    if (threeContainers[1]) createGradientBG(threeContainers[1])
    if (threeContainers[2]) createFloatingCubes(threeContainers[2])
    if (threeContainers[3]) createSineWaves(threeContainers[3])
})

onBeforeUnmount(() => {
    animFrames.forEach(id => cancelAnimationFrame(id))
    renderers.forEach(r => r && r.dispose && r.dispose())
    window.removeEventListener('resize', () => { })
})
</script>

<style scoped>
.backgrounds-wrapper {
    width: 100vw;
}

.bg-section {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    position: relative;
    overflow: hidden;
}

.three-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.bg-section>span {
    position: relative;
    z-index: 1;
}

.section1 {
    background: #25171A;
}

.section2 {
    background: #059669;
}

.section3 {
    background: #f59e42;
}

.section4 {
    background: #be185d;
}
</style>
