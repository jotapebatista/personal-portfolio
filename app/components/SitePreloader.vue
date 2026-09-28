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
      class="preloader"
      role="status"
      aria-live="polite"
      @click="complete"
    >
      <div class="preloader__mark display">JB</div>
      <div class="preloader__bar">
        <div class="preloader__fill" :style="{ width: `${progress}%` }" />
      </div>
      <div class="preloader__meta">
        <span>{{ progress }}</span>
        <span class="muted">click to skip</span>
      </div>
      <div class="preloader__curtain" :class="{ 'is-done': closing }" />
    </div>
  </Transition>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-content: center;
  gap: 1.25rem;
  background: var(--bg);
  cursor: pointer;
}

.preloader__mark {
  font-size: clamp(3rem, 10vw, 5rem);
  text-align: center;
  color: var(--accent);
}

.preloader__bar {
  width: min(220px, 50vw);
  height: 2px;
  margin-inline: auto;
  background: var(--line);
  overflow: hidden;
}

.preloader__fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.08s linear;
}

.preloader__meta {
  display: flex;
  justify-content: space-between;
  width: min(220px, 50vw);
  margin-inline: auto;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
}

.preloader__curtain {
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  pointer-events: none;
}

.preloader__curtain.is-done {
  animation: curtain 0.45s var(--ease-out) forwards;
}

@keyframes curtain {
  0% {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  45% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
  46% {
    transform-origin: top;
  }
  100% {
    transform: scaleY(0);
    transform-origin: top;
  }
}

.preload-leave-active {
  transition: opacity 0.3s ease;
}
.preload-leave-to {
  opacity: 0;
}
</style>
