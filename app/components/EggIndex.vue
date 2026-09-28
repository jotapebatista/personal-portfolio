<script setup lang="ts">
import { eggsCatalog } from '~/data/content'

const { catalogOpen } = useEggs()
</script>

<template>
  <Teleport to="body">
    <div v-if="catalogOpen" class="eggs" role="dialog" aria-label="Easter eggs">
      <div class="eggs__panel">
        <div class="eggs__head">
          <h2 class="display">Easter eggs</h2>
          <button type="button" class="eggs__close" @click="catalogOpen = false">Close</button>
        </div>
        <ul>
          <li v-for="egg in eggsCatalog" :key="egg.trigger">
            <code>{{ egg.trigger }}</code>
            <span>{{ egg.effect }}</span>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.eggs {
  position: fixed;
  inset: 0;
  z-index: 95;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(10px);
}

.eggs__panel {
  width: min(520px, 100%);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 1rem;
  padding: 1.4rem 1.5rem 1.6rem;
}

.eggs__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.eggs__head h2 {
  margin: 0;
  font-size: 1.6rem;
}

.eggs__close {
  color: var(--muted);
}

.eggs__close:hover {
  color: var(--accent);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}

li {
  display: grid;
  gap: 0.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--line);
}

li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

code {
  font-size: 0.8rem;
  color: var(--accent);
}

span {
  color: var(--muted);
  font-size: 0.92rem;
}
</style>
