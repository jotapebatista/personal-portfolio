<script setup lang="ts">
const { gridOpen } = useEggs()
</script>

<template>
  <div
    v-if="gridOpen"
    class="pointer-events-none fixed inset-0 z-90 mx-auto grid w-[min(1120px,calc(100%-2.5rem))] grid-cols-12"
    aria-hidden="true"
  >
    <div
      v-for="n in 12"
      :key="n"
      class="border-x border-accent/35 bg-accent/4"
    />
  </div>
</template>
