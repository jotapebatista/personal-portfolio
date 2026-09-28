<script setup lang="ts">
const { showToast } = useEggs()
const holding = ref(false)
let holdTimer: ReturnType<typeof setTimeout> | null = null

const startHold = () => {
  holding.value = true
  holdTimer = setTimeout(() => {
    showToast('hey 👋')
    holding.value = false
  }, 1500)
}

const endHold = () => {
  holding.value = false
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
}

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line py-6 pb-8">
    <div class="container flex flex-wrap items-center justify-between gap-3 text-[0.85rem]">
      <button
        type="button"
        class="select-none text-muted transition-colors duration-250 hover:text-accent"
        :class="{ 'text-accent': holding }"
        aria-label="Copyright — hold for a surprise"
        @pointerdown="startHold"
        @pointerup="endHold"
        @pointerleave="endHold"
        @pointercancel="endHold"
      >
        © {{ year }} João Batista
      </button>
      <span class="muted text-xs">Nuxt + GSAP</span>
    </div>
  </footer>
</template>
