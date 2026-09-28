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
  <footer class="footer">
    <div class="container footer__inner">
      <button
        type="button"
        class="footer__copy"
        :class="{ 'is-holding': holding }"
        aria-label="Copyright — hold for a surprise"
        @pointerdown="startHold"
        @pointerup="endHold"
        @pointerleave="endHold"
        @pointercancel="endHold"
      >
        © {{ year }} João Batista
      </button>
      <span class="muted footer__hint">Nuxt + GSAP</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 1.5rem 0 2rem;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.85rem;
}

.footer__copy {
  color: var(--muted);
  transition: color 0.25s ease;
  user-select: none;
}

.footer__copy:hover,
.footer__copy.is-holding {
  color: var(--accent);
}

.footer__hint {
  font-size: 0.75rem;
}
</style>
