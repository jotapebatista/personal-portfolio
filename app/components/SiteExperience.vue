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
      <ul class="m-0 grid list-none gap-0 p-0">
        <li
          v-for="job in experience"
          :key="job.company"
          class="border-t border-line py-7 last:border-b max-sm:py-[1.35rem]"
          data-reveal
        >
          <div
            class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 max-sm:flex-col max-sm:gap-1"
          >
            <h3 class="display m-0 text-[clamp(1.5rem,3vw,2rem)]">
              {{ job.company }}
            </h3>
            <span class="muted text-[0.9rem]">{{ job.period }}</span>
          </div>
          <p class="mt-[0.35rem] mb-[0.35rem] font-medium text-accent">
            {{ job.role }}
          </p>
          <a
            v-if="job.url"
            class="muted mb-[0.85rem] inline-block text-[0.9rem] transition-colors duration-200 hover:text-accent"
            :href="job.url"
            target="_blank"
            rel="noreferrer"
          >
            {{ job.urlLabel || job.url }}
          </a>
          <ul
            class="m-0 grid list-disc gap-[0.35rem] pl-[1.1rem] text-[0.95rem] leading-relaxed text-muted max-sm:pl-4 max-sm:text-[0.9rem]"
          >
            <li v-for="(point, i) in job.points" :key="i">{{ point }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
