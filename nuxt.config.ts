// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    debug: true, // Включение отладочного режима Nitro
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
    },
  },
  css: [
    "element-plus/theme-chalk/dark/css-vars.css",
    "vue-final-modal/style.css",
  ],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
    "@element-plus/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
