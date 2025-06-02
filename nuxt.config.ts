// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/vasileeduardbogdan/' : '/', // Base URL for GitHub Pages only in production
  },
  vite: {
    build: {
      target: 'esnext', // Ensure modern JavaScript features are supported
    },
    plugins: [
      tailwindcss(),
      glsl(),
    ],
    assetsInclude: ['**/*.glb', '**/*.hdr'], // Add glb and hdr files to assetsInclude
  },

  modules: ["v-gsap-nuxt", "@tresjs/nuxt", "nuxt3-lenis", '@pinia/nuxt'],
  tres: {
    devtools: true,
    glsl: true
  }
})