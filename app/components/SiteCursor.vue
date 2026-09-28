<script setup lang="ts">
const reduced = useReducedMotion()
const enabled = ref(false)
const x = ref(0)
const y = ref(0)
const hovering = ref(false)

onMounted(() => {
  const fine = window.matchMedia('(pointer: fine)').matches
  enabled.value = fine && !reduced.value
  if (!enabled.value) return

  document.body.classList.add('has-custom-cursor')

  const move = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
    const target = e.target as HTMLElement | null
    hovering.value = Boolean(target?.closest('a, button, [data-cursor-hover]'))
  }

  window.addEventListener('mousemove', move, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('mousemove', move)
    document.body.classList.remove('has-custom-cursor')
  })
})
</script>

<template>
  <div
    v-if="enabled"
    class="cursor"
    :class="{ 'is-hover': hovering }"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    aria-hidden="true"
  />
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: var(--cursor-size);
  height: var(--cursor-size);
  margin: calc(var(--cursor-size) / -2) 0 0 calc(var(--cursor-size) / -2);
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  mix-blend-mode: difference;
  transition:
    width 0.25s var(--ease-out),
    height 0.25s var(--ease-out),
    margin 0.25s var(--ease-out);
  will-change: transform;
}

.cursor.is-hover {
  width: 28px;
  height: 28px;
  margin: -14px 0 0 -14px;
}
</style>
