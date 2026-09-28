<script setup lang="ts">
export type MediaSlide =
  | string
  | null
  | {
      src?: string | null
      label?: string
      href?: string
    }

const props = defineProps<{
  title: string
  /** each entry: path string, null skeleton, or { src, label, href } */
  sources: MediaSlide[]
  /** Force shell. auto = phone if portrait, laptop if landscape */
  device?: 'auto' | 'phone' | 'laptop'
}>()

const reduced = useReducedMotion()

const index = ref(0)
const stageRef = ref<HTMLElement | null>(null)
const tilted = ref(false)

/** What's painted — stays until the next slide is ready */
const shown = ref<string | null>(null)
const ratio = ref<number | null>(null)
const errored = ref(false)
/** First paint / null slide only — never flash this between real images */
const cold = ref(true)

const ratioCache = new Map<string, number>()
let loadGen = 0

type NormSlide = { src: string | null; label?: string; href?: string }

const slides = computed<NormSlide[]>(() => {
  const raw = props.sources.length ? props.sources : [null]
  return raw.map((entry) => {
    if (entry === null) return { src: null }
    if (typeof entry === 'string') return { src: entry }
    return {
      src: entry.src ?? null,
      label: entry.label,
      href: entry.href,
    }
  })
})

const current = computed(() => slides.value[index.value] ?? { src: null })
const multi = computed(() => slides.value.length > 1)
const mode = computed(() => props.device ?? 'auto')

const isPhoneRatio = computed(() => ratio.value !== null && ratio.value < 0.72)
const isLandscapeRatio = computed(() => ratio.value !== null && ratio.value >= 1)

const showPhone = computed(() => {
  if (mode.value === 'laptop') return false
  if (mode.value === 'phone') return !!shown.value && !errored.value
  return isPhoneRatio.value && !!shown.value && !errored.value
})

const showLaptop = computed(() => {
  if (mode.value === 'phone') return false
  if (mode.value === 'laptop') return true
  // auto: laptop once we know it's landscape
  return isLandscapeRatio.value && !!shown.value && !errored.value
})

const showSkeleton = computed(
  () =>
    (!shown.value && (cold.value || current.value.src === null || errored.value)) ||
    (showLaptop.value && !shown.value),
)

const aspectStyle = computed(() => {
  if (showLaptop.value) {
    // Match screenshot ratio (Full HD = 16/9). Don't force 16/10 — that crops.
    if (ratio.value && ratio.value > 0) return { aspectRatio: `${ratio.value}` }
    return { aspectRatio: '16 / 9' }
  }
  if (ratio.value && ratio.value > 0) return { aspectRatio: `${ratio.value}` }
  return { aspectRatio: '4 / 3' }
})

const probe = (src: string) =>
  new Promise<{ ok: true; ratio: number } | { ok: false }>((resolve) => {
    const cached = ratioCache.get(src)
    if (cached !== undefined) {
      resolve({ ok: true, ratio: cached })
      return
    }
    const img = new Image()
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        const r = img.naturalWidth / img.naturalHeight
        ratioCache.set(src, r)
        resolve({ ok: true, ratio: r })
      } else {
        resolve({ ok: false })
      }
    }
    img.onerror = () => resolve({ ok: false })
    img.src = src
  })

const syncTilt = async () => {
  if (reduced.value) {
    tilted.value = false
    return
  }
  await nextTick()
  const el = stageRef.value
  tilted.value = !!el?.matches(':hover')
}

watch([showPhone, showLaptop], () => {
  syncTilt()
})

watch(
  [() => props.sources, index],
  async () => {
    const gen = ++loadGen
    const src = slides.value[index.value]?.src ?? null
    errored.value = false

    if (!src) {
      shown.value = null
      ratio.value = null
      cold.value = true
      return
    }

    if (!import.meta.client) return

    const hadImage = !!shown.value
    const result = await probe(src)
    if (gen !== loadGen) return

    if (!result.ok) {
      errored.value = true
      if (!hadImage) {
        shown.value = null
        ratio.value = null
        cold.value = true
      }
      return
    }

    shown.value = src
    ratio.value = result.ratio
    cold.value = false
    syncTilt()

    const n = slides.value.length
    for (const j of [(index.value + 1) % n, (index.value - 1 + n) % n]) {
      const neighbor = slides.value[j]?.src
      if (neighbor) void probe(neighbor)
    }
  },
  { immediate: true },
)

const prev = () => {
  index.value = (index.value - 1 + slides.value.length) % slides.value.length
}

const next = () => {
  index.value = (index.value + 1) % slides.value.length
}

const go = (i: number) => {
  index.value = i
}

const onEnter = () => {
  if (!reduced.value) tilted.value = true
}

const onLeave = () => {
  tilted.value = false
}

const skeletonCaption = computed(() => {
  if (errored.value) return 'Couldn’t load'
  if (current.value.label) {
    return current.value.src
      ? `${current.value.label} · loading…`
      : `${current.value.label} · no image`
  }
  if (current.value.src) return 'Loading…'
  if (multi.value) return `${props.title} · ${index.value + 1}/${slides.value.length}`
  return `${props.title} · no image`
})
</script>

<template>
  <div
    class="gallery"
    :class="{
      'is-phone': showPhone,
      'is-laptop': showLaptop,
      'is-flat': reduced,
    }"
  >
    <!-- CSS 3D phone -->
    <div
      v-if="showPhone"
      ref="stageRef"
      class="phone-stage"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
    >
      <div class="phone" :class="{ 'is-tilted': tilted }">
        <div class="phone__bezel">
          <div class="phone__island" aria-hidden="true" />
          <div class="phone__screen" :style="aspectStyle">
            <Transition name="cross">
              <img
                :key="shown!"
                class="phone__img"
                :src="shown!"
                :alt="`${current.label || title} screenshot ${index + 1}`"
                draggable="false"
              >
            </Transition>
          </div>
          <div class="phone__home" aria-hidden="true" />
        </div>
      </div>

      <template v-if="multi">
        <button type="button" class="media__nav media__nav--prev" aria-label="Previous image" @click="prev">
          ‹
        </button>
        <button type="button" class="media__nav media__nav--next" aria-label="Next image" @click="next">
          ›
        </button>
      </template>
    </div>

    <!-- CSS 3D MacBook -->
    <div
      v-else-if="showLaptop"
      ref="stageRef"
      class="laptop-stage"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
    >
      <div class="laptop" :class="{ 'is-tilted': tilted }">
        <div class="laptop__chrome">
          <div class="laptop__screen" :style="aspectStyle">
            <Transition name="cross">
              <img
                v-if="shown"
                :key="shown"
                class="laptop__img"
                :src="shown"
                :alt="`${current.label || title} screenshot ${index + 1}`"
                draggable="false"
              >
            </Transition>
            <div v-if="showSkeleton" class="skeleton skeleton--laptop" aria-hidden="true">
              <div class="skeleton__chrome">
                <span class="skeleton__dot" />
                <span class="skeleton__dot" />
                <span class="skeleton__dot" />
                <span class="skeleton__url" />
              </div>
              <div class="skeleton__body">
                <div class="skeleton__hero" />
                <div class="skeleton__rows">
                  <span class="skeleton__line skeleton__line--lg" />
                  <span class="skeleton__line" />
                  <span class="skeleton__line skeleton__line--sm" />
                </div>
                <div class="skeleton__cards">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <p class="skeleton__caption muted">
                {{ skeletonCaption }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <template v-if="multi">
        <button type="button" class="media__nav media__nav--prev" aria-label="Previous image" @click="prev">
          ‹
        </button>
        <button type="button" class="media__nav media__nav--next" aria-label="Next image" @click="next">
          ›
        </button>
      </template>
    </div>

    <!-- Flat / loading (auto mid-ratio or cold without forced laptop) -->
    <div
      v-else
      class="media"
      :class="{
        'is-ready': shown && !errored,
        'is-landscape': isLandscapeRatio,
      }"
      :style="aspectStyle"
    >
      <Transition name="cross">
        <img
          v-if="shown"
          :key="shown"
          class="media__img"
          :src="shown"
          :alt="`${current.label || title} screenshot ${index + 1}`"
          draggable="false"
        >
      </Transition>

      <div v-if="showSkeleton" class="skeleton" aria-hidden="true">
        <div class="skeleton__chrome">
          <span class="skeleton__dot" />
          <span class="skeleton__dot" />
          <span class="skeleton__dot" />
          <span class="skeleton__url" />
        </div>
        <div class="skeleton__body">
          <div class="skeleton__hero" />
          <div class="skeleton__rows">
            <span class="skeleton__line skeleton__line--lg" />
            <span class="skeleton__line" />
            <span class="skeleton__line skeleton__line--sm" />
          </div>
          <div class="skeleton__cards">
            <span />
            <span />
            <span />
          </div>
        </div>
        <p class="skeleton__caption muted">
          {{ skeletonCaption }}
        </p>
      </div>

      <template v-if="multi">
        <button type="button" class="media__nav media__nav--prev" aria-label="Previous image" @click="prev">
          ‹
        </button>
        <button type="button" class="media__nav media__nav--next" aria-label="Next image" @click="next">
          ›
        </button>
      </template>
    </div>

    <p v-if="current.label" class="gallery__label muted">
      <a
        v-if="current.href"
        :href="current.href"
        target="_blank"
        rel="noreferrer"
      >{{ current.label }}</a>
      <template v-else>{{ current.label }}</template>
    </p>

    <div v-if="multi" class="gallery__dots" role="tablist" :aria-label="`${title} images`">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        type="button"
        class="gallery__dot"
        :class="{ 'is-active': i === index }"
        :aria-label="slide.label || `Image ${i + 1}`"
        :aria-selected="i === index"
        @click="go(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  gap: 0.65rem;
  width: 100%;
  justify-items: stretch;
}

.gallery.is-phone,
.gallery.is-laptop {
  justify-items: center;
}

.gallery__label {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  text-align: center;
}

.gallery__label a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.gallery__label a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* —— CSS 3D phone —— */
.phone-stage {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  perspective: 1100px;
  perspective-origin: 50% 40%;
  padding: 1.25rem 2.5rem 1.75rem;
}

.phone {
  position: relative;
  width: min(100%, 220px);
  max-height: min(58vh, 480px);
  transform-style: preserve-3d;
  transform: rotateY(-24deg) rotateX(9deg) rotateZ(1.5deg);
  transition: transform 0.55s var(--ease-out);
  filter: drop-shadow(18px 32px 36px color-mix(in srgb, #000 55%, transparent));
}

.phone.is-tilted {
  transform: rotateY(-14deg) rotateX(5deg) rotateZ(0.5deg);
}

.gallery.is-flat .phone,
.gallery.is-flat .phone.is-tilted {
  transform: none;
  filter: drop-shadow(0 18px 28px color-mix(in srgb, #000 40%, transparent));
}

.phone__bezel {
  position: relative;
  border-radius: 2.35rem;
  padding: 0.58rem;
  background:
    linear-gradient(
      145deg,
      #4a4744 0%,
      #1e1d1b 22%,
      #2c2a28 52%,
      #0e0d0c 100%
    );
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 22%, transparent),
    inset 0 -1px 0 color-mix(in srgb, #000 60%, transparent),
    inset 1px 0 0 color-mix(in srgb, #fff 8%, transparent),
    0 0 0 1.5px #050505,
    0 0 0 2.5px #2a2826;
  transform: translateZ(12px);
}

.phone__bezel::before,
.phone__bezel::after {
  content: '';
  position: absolute;
  background: linear-gradient(180deg, #3a3835, #161514);
  border-radius: 2px;
  box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 12%, transparent);
}

.phone__bezel::before {
  left: -3px;
  top: 18%;
  width: 3px;
  height: 9%;
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 10%, transparent),
    0 14px 0 0 #1a1917,
    0 32px 0 0 #1a1917;
}

.phone__bezel::after {
  right: -3px;
  top: 24%;
  width: 3px;
  height: 11%;
}

.phone__island {
  position: absolute;
  top: 0.95rem;
  left: 50%;
  z-index: 3;
  width: 30%;
  height: 1.1rem;
  translate: -50% 0;
  border-radius: 999px;
  background: #050504;
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, #fff 7%, transparent),
    0 0 0 1px color-mix(in srgb, #000 80%, transparent);
}

.phone__screen {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 1.7rem;
  background: #050504;
  isolation: isolate;
}

.phone__screen::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(
      125deg,
      color-mix(in srgb, #fff 14%, transparent) 0%,
      transparent 38%,
      transparent 62%,
      color-mix(in srgb, #000 18%, transparent) 100%
    );
  mix-blend-mode: soft-light;
  opacity: 0.85;
}

.phone__img {
  display: block;
  width: 100%;
  height: auto;
}

.phone__home {
  position: absolute;
  bottom: 0.7rem;
  left: 50%;
  z-index: 3;
  width: 30%;
  height: 0.2rem;
  translate: -50% 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text) 32%, transparent);
}

/* —— CSS 3D display (clean screen, no laptop chin) —— */
.laptop-stage {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  perspective: 1400px;
  perspective-origin: 50% 40%;
  padding: 0.75rem 0.5rem 1.25rem;
}

.laptop {
  position: relative;
  width: min(100%, 440px);
  transform-style: preserve-3d;
  transform: rotateY(-18deg) rotateX(8deg);
  transition: transform 0.55s var(--ease-out);
  filter: drop-shadow(16px 28px 32px color-mix(in srgb, #000 50%, transparent));
}

.laptop.is-tilted {
  transform: rotateY(-8deg) rotateX(4deg);
}

.gallery.is-flat .laptop,
.gallery.is-flat .laptop.is-tilted {
  transform: none;
  filter: drop-shadow(0 16px 24px color-mix(in srgb, #000 35%, transparent));
}

.laptop__chrome {
  position: relative;
  border-radius: 0.85rem;
  padding: 0.55rem;
  background:
    linear-gradient(
      145deg,
      #3d3c3a 0%,
      #1a1918 35%,
      #2a2927 65%,
      #121110 100%
    );
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, #fff 18%, transparent),
    inset 0 -1px 0 color-mix(in srgb, #000 50%, transparent),
    inset 1px 0 0 color-mix(in srgb, #fff 8%, transparent),
    0 0 0 1px #0a0a09;
  transform: translateZ(8px);
}

.laptop__camera {
  position: absolute;
  top: 0.2rem;
  left: 50%;
  z-index: 3;
  width: 0.32rem;
  height: 0.32rem;
  translate: -50% 0;
  border-radius: 50%;
  background: #1a1a1a;
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, #fff 10%, transparent),
    0 0 0 2px #0a0a0a;
}

.laptop__screen {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.28rem;
  background: #0a0908;
  isolation: isolate;
}

.laptop__screen::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(
      125deg,
      color-mix(in srgb, #fff 10%, transparent) 0%,
      transparent 42%,
      transparent 68%,
      color-mix(in srgb, #000 22%, transparent) 100%
    );
  mix-blend-mode: soft-light;
  opacity: 0.75;
}

.laptop__img {
  display: block;
  width: 100%;
  height: auto;
}

/* crossfade */
.cross-enter-active,
.cross-leave-active {
  transition: opacity 0.32s var(--ease-out);
}

.cross-leave-active {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cross-enter-from,
.cross-leave-to {
  opacity: 0;
}

/* —— Flat media —— */
.media {
  position: relative;
  width: 100%;
  max-width: 100%;
  max-height: min(62vh, 520px);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface);
}

.media.is-landscape {
  width: 100%;
  max-height: min(52vh, 420px);
}

.media__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media.is-ready .media__img {
  opacity: 1;
}

.media__nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  z-index: 4;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 75%, transparent);
  color: var(--text);
  font-size: 1.25rem;
  line-height: 1;
  display: grid;
  place-items: center;
  backdrop-filter: blur(8px);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.media__nav:hover {
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  color: var(--accent);
}

.media__nav--prev {
  left: 0.55rem;
}

.media__nav--next {
  right: 0.55rem;
}

.phone-stage .media__nav--prev,
.laptop-stage .media__nav--prev {
  left: 0.15rem;
}

.phone-stage .media__nav--next,
.laptop-stage .media__nav--next {
  right: 0.15rem;
}

.gallery__dots {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
}

.gallery__dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--muted) 45%, transparent);
  transition:
    background 0.2s ease,
    width 0.2s ease;
}

.gallery__dot.is-active {
  width: 1.1rem;
  background: var(--accent);
}

.skeleton {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 0.85rem;
  gap: 0.75rem;
  background: var(--surface);
}

.skeleton--laptop {
  background: #0c0c0b;
}

.skeleton__chrome {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  height: 1.1rem;
}

.skeleton__dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--muted) 35%, transparent);
}

.skeleton__url {
  flex: 1;
  height: 0.55rem;
  margin-left: 0.4rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--muted) 18%, transparent);
}

.skeleton__body {
  flex: 1;
  display: grid;
  grid-template-rows: 1.1fr auto auto;
  gap: 0.65rem;
  min-height: 0;
}

.skeleton__hero,
.skeleton__line,
.skeleton__cards span,
.skeleton__url {
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, var(--muted) 14%, transparent);
}

.skeleton__hero,
.skeleton__line,
.skeleton__cards span,
.skeleton__url,
.skeleton__dot {
  background-image: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--accent) 16%, transparent),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

.skeleton__hero {
  border-radius: 0.55rem;
  min-height: 0;
}

.skeleton__rows {
  display: grid;
  gap: 0.4rem;
}

.skeleton__line {
  display: block;
  height: 0.55rem;
  border-radius: 999px;
  width: 100%;
}

.skeleton__line--lg {
  width: 72%;
  height: 0.7rem;
}

.skeleton__line--sm {
  width: 48%;
}

.skeleton__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.skeleton__cards span {
  display: block;
  aspect-ratio: 4 / 3;
  border-radius: 0.4rem;
}

.skeleton__caption {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-align: center;
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton__hero,
  .skeleton__line,
  .skeleton__cards span,
  .skeleton__url,
  .skeleton__dot {
    animation: none;
  }

  .media,
  .phone,
  .laptop,
  .phone__img,
  .laptop__img,
  .media__img,
  .cross-enter-active,
  .cross-leave-active {
    transition: none;
  }
}
</style>
