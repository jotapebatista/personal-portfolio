// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@vercel/analytics/nuxt'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: 'Syne', provider: 'google', weights: [500, 600, 700, 800] },
      { name: 'DM Sans', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  app: {
    head: {
      title: 'João Batista — Full Stack',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'Full-stack in Portugal. Nuxt, Vue, .NET, SQL. EV chargers, PWAs, client sites.',
        },
        { name: 'theme-color', content: '#0c0b0a' },
        { property: 'og:title', content: 'João Batista — Full Stack' },
        {
          property: 'og:description',
          content:
            'Full-stack in Portugal. Nuxt, Vue, .NET, SQL. EV chargers, PWAs, client sites.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://jotapebatista.pt' },
      ],
      link: [{ rel: 'canonical', href: 'https://jotapebatista.pt' }],
    },
  },
})
