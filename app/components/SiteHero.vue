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
  <section
    ref="root"
    class="section relative flex min-h-svh items-end pt-[calc(var(--nav-h)+1.5rem)] pb-14 max-sm:items-center max-sm:pb-20"
  >
    <div class="container grid w-full max-w-[920px] gap-4">
      <p class="eyebrow opacity-0" data-fade>2026</p>
      <h1
        class="display m-0 flex max-w-full flex-wrap gap-x-[0.25em] gap-y-[0.08em] text-[clamp(2.5rem,11vw,8.5rem)]"
        :aria-label="site.name"
      >
        <span
          v-for="(word, wi) in nameParts"
          :key="wi"
          class="inline-flex whitespace-nowrap"
        >
          <span
            v-for="(ch, ci) in word.split('')"
            :key="`${wi}-${ci}`"
            class="inline-block overflow-hidden align-bottom"
          >
            <span data-char class="inline-block opacity-0 will-change-transform">{{ ch }}</span>
          </span>
        </span>
      </h1>
      <p class="m-0 text-[clamp(1.05rem,2.4vw,1.45rem)] font-medium opacity-0" data-fade>
        {{ site.role }}
      </p>
      <p
        class="muted m-0 max-w-xl text-[clamp(0.95rem,2.8vw,1.05rem)] leading-relaxed opacity-0"
        data-fade
      >
        {{ site.tagline }}
      </p>
      <div class="mt-2 flex flex-wrap gap-3 opacity-0" data-fade>
        <MagneticButton href="#work" primary>Work</MagneticButton>
        <MagneticButton href="#contact">Email</MagneticButton>
      </div>
    </div>
    <div
      class="muted absolute right-[clamp(1rem,4vw,3rem)] bottom-6 text-[0.7rem] tracking-[0.18em] uppercase opacity-0 max-sm:hidden"
      style="writing-mode: vertical-rl"
      data-fade
      aria-hidden="true"
    >
      Scroll
    </div>
  </section>
</template>
