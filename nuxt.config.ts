// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [
      tailwindcss(),
      glsl(),
    ],
  },

  modules: ["v-gsap-nuxt", "@tresjs/nuxt"],
  tres: {
    devtools: true,
    glsl: true
  }
})