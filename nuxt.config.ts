// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  css: [
  '~/assets/css/normalize.css',
  '~/assets/css/webflow.css',
  '~/assets/css/main.css'
],

  app: {
    pageTransition: false,
    head: {
      title: 'Nidra – Put your phone to bed.',
      meta: [
        { name: 'description', content: 'The Nidra Box, together with its cards, forms a quiet ritual—at night, at waking, and in the long middle of the day. A simple, beautiful place to set the phone down at the close of your day.' },
        { property: 'og:title', content: 'Nidra – Put your phone to bed.' },
        { property: 'og:description', content: 'The Nidra Box, together with its cards, forms a quiet ritual—at night, at waking, and in the long middle of the day. A simple, beautiful place to set the phone down at the close of your day.' },
        { property: 'og:image', content: '/images/9.png' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nidra – Put your phone to bed.' },
        { name: 'twitter:description', content: 'The Nidra Box, together with its cards, forms a quiet ritual—at night, at waking, and in the long middle of the day. A simple, beautiful place to set the phone down at the close of your day.' },
        { name: 'twitter:image', content: '/images/9.png' },
      ]
    }
  },

  routeRules: {
    '/shop': { redirect: '/product/nidra-box' }
  },

  devtools: { enabled: true },
  modules: ['@nuxt/image']
})