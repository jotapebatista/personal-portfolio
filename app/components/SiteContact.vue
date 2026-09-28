<script setup lang="ts">
import { site } from '~/data/content'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
</script>

<template>
  <section id="contact" ref="root" class="section contact">
    <div class="container">
      <p class="eyebrow" data-reveal>Contact</p>
      <h2 class="section-title" data-reveal>Email me</h2>
      <p class="muted contact__copy" data-reveal>
        Hiring, freelance, or just talk shop — mail works. I reply.
      </p>
      <div class="contact__actions" data-reveal>
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

<style scoped>
.contact {
  padding-bottom: 6rem;
}

.contact__copy {
  max-width: 32rem;
  line-height: 1.6;
  margin: 0 0 1.75rem;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
