<script setup lang="ts">
const visible = defineModel<boolean>({ required: true })
const reduced = useReducedMotion()
const { finish } = usePreloader()
const progress = ref(0)
const closing = ref(false)

const complete = () => {
  if (closing.value) return
  closing.value = true
  progress.value = 100
  document.documentElement.classList.remove('is-preloading')
  setTimeout(() => {
    visible.value = false
    finish()
  }, reduced.value ? 0 : 450)
}

onMounted(() => {
  document.documentElement.classList.add('is-preloading')

  if (reduced.value) {
    complete()
    return
  }

  const start = performance.now()
  const duration = 1400
  let raf = 0

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    progress.value = Math.round(t * 100)
    if (t < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      complete()
    }
  }
  raf = requestAnimationFrame(tick)

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    document.documentElement.classList.remove('is-preloading')
  })
})
</script>

<template>
  <Transition name="preload">
    <div
      v-if="visible"
      class="fixed inset-0 z-100 grid cursor-pointer place-content-center gap-5 bg-bg"
      role="status"
      aria-live="polite"
      @click="complete"
    >
      <div class="display text-center text-[clamp(3rem,10vw,5rem)] text-accent">
        JB
      </div>
      <div class="mx-auto h-0.5 w-[min(220px,50vw)] overflow-hidden bg-line">
        <div
          class="h-full bg-accent transition-[width] duration-75 linear"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <div
        class="mx-auto flex w-[min(220px,50vw)] justify-between text-xs tracking-wider tabular-nums"
      >
        <span>{{ progress }}</span>
        <span class="muted">click to skip</span>
      </div>
      <div
        class="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-accent"
        :class="{ 'animate-curtain': closing }"
      />
    </div>
  </Transition>
</template>
