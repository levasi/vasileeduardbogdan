import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis({ smooth: true })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    nuxtApp.provide('lenis', lenis)
})