// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
    css: [
    '~/assets/css/normalize.css',
    '~/assets/css/webflow.css',
    '~/assets/css/main.css'
  ],
    app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  devtools: { enabled: true }
})
