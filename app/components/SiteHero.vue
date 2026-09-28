<script setup lang="ts">
import { site } from '~/data/content'

const root = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
const { done: preloaderDone } = usePreloader()
const played = ref(false)

const playIntro = async () => {
  if (played.value || !root.value) return
  played.value = true

  if (reduced.value) {
    root.value.querySelectorAll('[data-char], [data-fade]').forEach((el) => {
      ;(el as HTMLElement).style.opacity = '1'
      ;(el as HTMLElement).style.transform = 'none'
    })
    return
  }

  const gsap = (await import('gsap')).default
  const chars = root.value.querySelectorAll('[data-char]')
  gsap.fromTo(
    chars,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.95,
      ease: 'power3.out',
      stagger: 0.03,
    },
  )
  gsap.fromTo(
    root.value.querySelectorAll('[data-fade]'),
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, delay: 0.35, ease: 'power2.out' },
  )
}

watch(
  preloaderDone,
  (v) => {
    if (v) nextTick(() => playIntro())
  },
  { immediate: true },
)

const nameParts = site.name.split(' ')
</script>

<template>
  <section ref="root" class="hero section">
    <div class="container hero__grid">
      <p class="eyebrow" data-fade>2026</p>
      <h1 class="hero__title display" :aria-label="site.name">
        <span
          v-for="(word, wi) in nameParts"
          :key="wi"
          class="hero__word"
        >
          <span
            v-for="(ch, ci) in word.split('')"
            :key="`${wi}-${ci}`"
            class="hero__char-wrap"
          >
            <span data-char class="hero__char">{{ ch }}</span>
          </span>
        </span>
      </h1>
      <p class="hero__role" data-fade>{{ site.role }}</p>
      <p class="hero__tag muted" data-fade>{{ site.tagline }}</p>
      <div class="hero__ctas" data-fade>
        <MagneticButton href="#work" primary>Work</MagneticButton>
        <MagneticButton href="#contact">Email</MagneticButton>
      </div>
    </div>
    <div class="hero__scroll muted" data-fade aria-hidden="true">Scroll</div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-top: calc(var(--nav-h) + 1.5rem);
  padding-bottom: 3.5rem;
}

.hero__grid {
  display: grid;
  gap: 1rem;
  max-width: 920px;
  width: 100%;
}

.hero__title {
  font-size: clamp(2.5rem, 11vw, 8.5rem);
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.08em 0.25em;
  max-width: 100%;
}

.hero__word {
  display: inline-flex;
  white-space: nowrap;
}

.hero__char-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}

.hero__char {
  display: inline-block;
  will-change: transform;
  opacity: 0;
}

.hero [data-fade] {
  opacity: 0;
}

.hero__role {
  font-size: clamp(1.05rem, 2.4vw, 1.45rem);
  font-weight: 500;
  margin: 0;
}

.hero__tag {
  max-width: 38rem;
  font-size: clamp(0.95rem, 2.8vw, 1.05rem);
  line-height: 1.55;
  margin: 0;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.hero__scroll {
  position: absolute;
  right: clamp(1rem, 4vw, 3rem);
  bottom: 1.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

@media (max-width: 640px) {
  .hero {
    align-items: center;
    padding-bottom: 5rem;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
