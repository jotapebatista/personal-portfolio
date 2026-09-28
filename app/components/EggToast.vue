<script setup lang="ts">
const { toast } = useEggs()
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="toast" class="toast" role="status">{{ toast }}</div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  translate: -50% 0;
  z-index: 120;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: var(--accent);
  color: var(--bg);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 12px 40px color-mix(in srgb, var(--bg) 55%, transparent);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
