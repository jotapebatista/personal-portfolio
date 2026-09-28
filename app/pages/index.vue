<script setup lang="ts">
import { site } from '~/data/content'

const title = `${site.name} — ${site.role}`
const description =
  'Full-stack developer in Portugal. Nuxt, Vue, React, .NET, Node, SQL. I ship PWAs, APIs, and client sites — browser to database to deploy.'
const url = site.url
const ogImage = `${site.url}/og.jpg`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: url,
  ogImage,
  ogImageAlt: `${site.name} — ${site.role}`,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1280,
  ogImageHeight: 720,
  ogLocale: site.locale,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  robots: 'index, follow, max-image-preview:large',
  author: site.name,
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: url },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${url}/#website`,
            url,
            name: title,
            description,
            inLanguage: 'en',
            publisher: { '@id': `${url}/#person` },
          },
          {
            '@type': 'Person',
            '@id': `${url}/#person`,
            name: site.name,
            url,
            email: site.email,
            jobTitle: site.role,
            description: site.tagline,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'PT',
            },
            sameAs: [site.links.github, site.links.linkedin],
            knowsAbout: [
              'Full Stack Development',
              'Nuxt',
              'Vue',
              'React',
              '.NET',
              'Node.js',
              'TypeScript',
              'PostgreSQL',
              'PWA',
            ],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <main>
    <SiteHero />
    <SiteWork />
    <SiteExperience />
    <SiteAbout />
    <SiteContact />
    <SiteFooter />
  </main>
</template>
