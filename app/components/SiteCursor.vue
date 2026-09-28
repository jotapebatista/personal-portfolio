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
    class="pointer-events-none fixed top-0 left-0 z-[200] rounded-full bg-accent mix-blend-difference will-change-transform transition-[width,height,margin] duration-250"
    :class="
      hovering
        ? 'h-7 w-7 -mt-3.5 -ml-3.5'
        : 'h-[var(--cursor-size)] w-[var(--cursor-size)] -mt-[calc(var(--cursor-size)/2)] -ml-[calc(var(--cursor-size)/2)]'
    "
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    aria-hidden="true"
  />
</template>
