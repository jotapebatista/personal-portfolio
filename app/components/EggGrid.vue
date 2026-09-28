<script setup lang="ts">
const { gridOpen } = useEggs()
</script>

<template>
  <div v-if="gridOpen" class="grid" aria-hidden="true">
    <div v-for="n in 12" :key="n" class="grid__col" />
  </div>
</template>

<style scoped>
.grid {
  position: fixed;
  inset: 0;
  z-index: 90;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
  width: min(1120px, calc(100% - 2.5rem));
  margin-inline: auto;
  padding-block: 0;
}

.grid__col {
  border-inline: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 4%, transparent);
}
</style>
