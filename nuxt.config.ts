// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL,
    },
  },
  css: ["element-plus/theme-chalk/dark/css-vars.css"],
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
