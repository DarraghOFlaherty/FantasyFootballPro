import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ["@heroicons/vue"],
  },
  buildModules: ["floating-vue/nuxt"],
  modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt", "@nuxtjs/supabase"],
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  formkit: {
    configFile: "formkit.config.ts",
  },
});
