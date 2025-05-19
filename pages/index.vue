<template>
    <div class="page font-poppins ">
        <div class="container">
            <div class="content flex h-screen items-center">
                <div class="col col-left flex-1 flex flex-col content-between">
                    <div class="col-left-hi" v-gsap.whenVisible.from='{ autoAlpha: 0 }'>
                        <span class="font-bubble" v-gsap.entrance.slide-top>Hy! I am</span>
                        <span class="text-tulip" v-gsap.animateText.slow>Bogdan Vasile</span>
                    </div>
                    <div class="text-2xl">
                        <div class="experience-wrapper">
                            <span class="font-bold text-romance text-6xl mr-2">
                                9
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
const meImage = ref(null)
const speechLineImage = ref(null)

onMounted(() => {
    gsap.from(meImage.value, {
        autoAlpha: 0,
        duration: 1
    })
    gsap.from(speechLineImage.value, {
        autoAlpha: 0,
        duration: 1,
        delay: 1
    })
})
</script>