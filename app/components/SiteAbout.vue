<script setup lang="ts">
import { about } from '~/data/content'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root)
</script>

<template>
  <section id="about" ref="root" class="section">
    <div class="container grid gap-10 min-[900px]:grid-cols-[1.3fr_0.7fr] min-[900px]:items-end">
      <div>
        <p class="eyebrow" data-reveal>About</p>
        <h2 class="section-title" data-reveal>About</h2>
        <p
          class="mb-4 max-w-xl text-[clamp(1.2rem,2.4vw,1.55rem)] leading-snug"
          data-reveal
        >
          {{ about.lead }}
        </p>
        <p class="muted m-0 max-w-xl leading-relaxed" data-reveal>
          {{ about.body }}
        </p>
      </div>
      <ul class="m-0 flex list-none flex-wrap gap-[0.55rem] p-0" data-reveal>
        <li
          v-for="tech in about.tech"
          :key="tech"
          class="rounded-full border border-line px-[0.85rem] py-[0.55rem] text-[0.85rem] text-muted"
        >
          {{ tech }}
        </li>
      </ul>
    </div>
  </section>
</template>
