<template>
    <div class="font-poppins landing-screen">
        <div class="container">
            <div ref="skyContainer" class="three-sky-bg"></div>
            <div class="content flex h-screen items-center">
                <div class="col col-left flex-1 flex flex-col content-between">
                    <div class="col-left-hi" v-gsap.whenVisible.from='{ autoAlpha: 0 }'>
                        <span class="font-bubble" v-gsap.entrance.slide-top>Hy! I am</span>
                        <span class="text-tulip" v-gsap.animateText.slow>Bogdan Vasile</span>
                    </div>
                    <div class="text-2xl">
                        <div class="experience-wrapper" data-speed="1.5">
                            <span class="font-bold text-romance text-6xl mr-2">
                                9+
                            </span>
                            <span class="font-medium text-base experience">
                                Years of <br> experience
                            </span>
                        </div>
                        <div class="socials" data-speed="1.5">
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
                        <img data-speed="0.5" class="relative  rounded-full" src="~/assets/images/eu.jpg" alt="">
                    </div>
                </div>

                <div class="col flex-1 col-right" v-gsap.whenVisible.stagger>
                    <div class="text-lg text-right font-light">
                        I build elegant, efficient code — and I love every moment of it.
                    </div>

                    <div class="reviews">
                        <NuxtLink class="my-cv-btn" to="/cv">SEE MY CV</NuxtLink>
                    </div>

                    <div class="signature" data-speed="1.5">
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
        duration: 3,
        scale: 0.6,
        ease: 'power2.out',
    })
    gsap.from(speechLineImage.value, {
        autoAlpha: 0,
        duration: 1,
        delay: 1
    })
    gsap.to("[data-speed]", {
        y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * 150,
        ease: "none",
        scrollTrigger: {
            start: 0,
            end: "max",
            invalidateOnRefresh: true,
            scrub: 0
        }
    });
    // Three.js night sky
    nextTick(() => {
        useStarField1(skyContainer.value)


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
    background: #041429;
    color: #fff;
}
</style>