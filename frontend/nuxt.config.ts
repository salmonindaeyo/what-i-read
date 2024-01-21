import { resolve } from "path"

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },
  alias: {
    "@Components": "./components",
    "@Stores" : "./store"
},
  css: ['./assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public : {
      APIURL : process.env.API_URL ?? "http://localhost:8000/api"
    }
  }

})
