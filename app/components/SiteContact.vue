<script setup lang="ts">
import { site } from '~/data/content'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
</script>

<template>
  <section id="contact" ref="root" class="section pb-24">
    <div class="container">
      <p class="eyebrow" data-reveal>Contact</p>
      <h2 class="section-title" data-reveal>Email me</h2>
      <p class="muted mb-7 max-w-lg leading-relaxed" data-reveal>
        Hiring, freelance, or just talk shop — mail works. I reply.
      </p>
      <div class="flex flex-wrap gap-3" data-reveal>
        <MagneticButton :href="`mailto:${site.email}`" primary>
          {{ site.email }}
        </MagneticButton>
        <MagneticButton :href="site.links.github" target="_blank" rel="noreferrer">
          GitHub
        </MagneticButton>
        <MagneticButton :href="site.links.linkedin" target="_blank" rel="noreferrer">
          LinkedIn
        </MagneticButton>
      </div>
    </div>
  </section>
</template>
