<script setup lang="ts">
import { experience } from '~/data/content'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
</script>

<template>
  <section id="experience" ref="root" class="section">
    <div class="container">
      <p class="eyebrow" data-reveal>Experience</p>
      <h2 class="section-title" data-reveal>Jobs</h2>
      <ul class="exp">
        <li v-for="job in experience" :key="job.company" class="exp__item" data-reveal>
          <div class="exp__head">
            <h3 class="exp__company display">{{ job.company }}</h3>
            <span class="muted exp__period">{{ job.period }}</span>
          </div>
          <p class="exp__role">{{ job.role }}</p>
          <a
            v-if="job.url"
            class="exp__url muted"
            :href="job.url"
            target="_blank"
            rel="noreferrer"
          >
            {{ job.urlLabel || job.url }}
          </a>
          <ul class="exp__points">
            <li v-for="(point, i) in job.points" :key="i">{{ point }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.exp {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.exp__item {
  padding: 1.75rem 0;
  border-top: 1px solid var(--line);
}

.exp__item:last-child {
  border-bottom: 1px solid var(--line);
}

.exp__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  align-items: baseline;
}

.exp__company {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0;
}

.exp__period {
  font-size: 0.9rem;
}

.exp__role {
  margin: 0.35rem 0 0.35rem;
  color: var(--accent);
  font-weight: 500;
}

.exp__url {
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 0.85rem;
  transition: color 0.2s ease;
}

.exp__url:hover {
  color: var(--accent);
}

.exp__points {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--muted);
  line-height: 1.55;
  display: grid;
  gap: 0.35rem;
}
</style>
