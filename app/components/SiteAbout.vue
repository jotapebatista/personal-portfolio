<script setup lang="ts">
import { about } from '~/data/content'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
</script>

<template>
  <section id="about" ref="root" class="section">
    <div class="container about">
      <div>
        <p class="eyebrow" data-reveal>About</p>
        <h2 class="section-title" data-reveal>About</h2>
        <p class="about__lead" data-reveal>{{ about.lead }}</p>
        <p class="muted about__body" data-reveal>{{ about.body }}</p>
      </div>
      <ul class="about__tech" data-reveal>
        <li v-for="tech in about.tech" :key="tech">{{ tech }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 900px) {
  .about {
    grid-template-columns: 1.3fr 0.7fr;
    align-items: end;
  }
}

.about__lead {
  font-size: clamp(1.2rem, 2.4vw, 1.55rem);
  line-height: 1.45;
  margin: 0 0 1rem;
  max-width: 36rem;
}

.about__body {
  margin: 0;
  line-height: 1.6;
  max-width: 36rem;
}

.about__tech {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.about__tech li {
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 0.85rem;
  color: var(--muted);
}
</style>
