<template>
    <div class="font-poppins ">
        <div class="container">
            <div ref="skyContainer" class="three-sky-bg"></div>
            <div class="content flex h-screen items-center landing-screen">
                <div class="col col-left flex-1 flex flex-col content-between">
                    <div class="col-left-hi" v-gsap.whenVisible.from='{ autoAlpha: 0 }'>
                        <span class="font-bubble" v-gsap.entrance.slide-top>Hy! I am</span>
                        <span class="text-tulip" v-gsap.animateText.slow>Bogdan Vasile</span>
                    </div>
                    <div class="text-2xl">
                        <div class="experience-wrapper">
                            <span class="font-bold text-romance text-6xl mr-2">
                                9+
                            </span>
                            <span class="font-medium text-base experience">
                                Years of <br> experience
                            </span>
                        </div>
                        <div class="socials">
                            <a href="https://www.linkedin.com/in/vasile-eduard-bogdan/" target="_blank"
                                class="font-medium social-icon">
                                <img class="linkedin-image" src="~/assets/images/linkedin.svg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col flex-1 col-center">
                    <div class="image-wrapper w-full max-w-12/12">
                        <img ref="speechLineImage" class="hidden md:block absolute speech-line-image -left-3/4"
                            src="~/assets/images/speech-line.svg" alt="">
                        <img ref="meImage" class="relative rounded-full" src="~/assets/images/eu.jpg" alt="">
                    </div>
                </div>

                <div class="col flex-1 col-right" v-gsap.whenVisible.stagger>
                    <div class="text-lg text-elephant text-right font-light">
                        I build elegant, efficient code — and I love every moment of it.
                    </div>

                    <div class="reviews">
                        <NuxtLink class="my-cv-btn" to="/cv">SEE MY CV</NuxtLink>
                    </div>

                    <div class="signature">
                        <span class="font-bold font-bubble text-2xl -ml-8">
                            Front-end
                        </span>
                        <br>
                        <span class="font-bold text-2xl">
                            Developer
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <PortofolioSection />
    </div>
</template>
<script setup>

import gsap from 'gsap'
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
const meImage = ref(null)
const speechLineImage = ref(null)
const skyContainer = ref(null)
let renderer, scene, camera, stars

onMounted(() => {
    gsap.from(meImage.value, {
        autoAlpha: 0,
        duration: 1,
        top: -33,
        ease: 'power2.out',
    })
    gsap.from(speechLineImage.value, {
        autoAlpha: 0,
        duration: 1,
        delay: 1
    })

    // Three.js night sky
    nextTick(() => {
        const container = skyContainer.value
        if (!container) return
        const width = container.offsetWidth
        const height = container.offsetHeight
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 1
        renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setSize(width, height)
        container.appendChild(renderer.domElement)

        // Create stars
        const starGeometry = new THREE.BufferGeometry()
        const starCount = 2000
        const positions = []
        const spread = 300;
        for (let i = 0; i < starCount; i++) {
            // Spherical distribution for a more even sky
            const r = spread * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positions.push(x, y, z);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        const starMaterial = new THREE.PointsMaterial({ color: 0xF56476, size: 0.7 })
        stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        let theta = 0;
        function animate() {
            requestAnimationFrame(animate)
            theta += 0.0007;
            // Camera rotates around the origin (0,0,0)
            const radius = 60;
            camera.position.x = Math.sin(theta) * radius;
            camera.position.z = Math.cos(theta) * radius;
            camera.position.y = 0;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera)
        }
        animate()

        // Responsive resize
        window.addEventListener('resize', handleResize)
        function handleResize() {
            if (!container) return
            const w = container.offsetWidth
            const h = container.offsetHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
    })
})
onBeforeUnmount(() => {
    if (renderer) renderer.dispose()
    window.removeEventListener('resize', () => { })
})
</script>
<style scoped>
/* Three.js night sky background */
.three-sky-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.landing-screen {
    position: relative;
    z-index: 1;
}
</style>