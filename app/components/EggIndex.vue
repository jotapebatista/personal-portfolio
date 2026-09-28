<script setup lang="ts">
import { eggsCatalog } from '~/data/content'

const { catalogOpen } = useEggs()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="catalogOpen"
      class="fixed inset-0 z-95 grid place-items-center bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] p-5 backdrop-blur-[10px]"
      role="dialog"
      aria-label="Easter eggs"
    >
      <div class="w-[min(520px,100%)] rounded-2xl border border-line bg-surface px-6 py-[1.4rem] pb-[1.6rem]">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="display m-0 text-[1.6rem]">Easter eggs</h2>
          <button
            type="button"
            class="text-muted hover:text-accent"
            @click="catalogOpen = false"
          >
            Close
          </button>
        </div>
        <ul class="m-0 grid list-none gap-[0.85rem] p-0">
          <li
            v-for="(egg, i) in eggsCatalog"
            :key="egg.trigger"
            class="grid gap-1 border-b border-line pb-[0.85rem] last:border-b-0 last:pb-0"
          >
            <code class="text-[0.8rem] text-accent">{{ egg.trigger }}</code>
            <span class="text-[0.92rem] text-muted">{{ egg.effect }}</span>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>
