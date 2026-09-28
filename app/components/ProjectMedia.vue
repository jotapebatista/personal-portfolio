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
  sources: MediaSlide[]
  device?: 'auto' | 'phone' | 'laptop'
}>()

const reduced = useReducedMotion()

const index = ref(0)
const stageRef = ref<HTMLElement | null>(null)
const tilted = ref(false)
const narrow = ref(false)

const deviceTransform = (phone: boolean) => {
  if (reduced.value || narrow.value) return { transform: 'none' }
  if (phone) {
    return tilted.value
      ? { transform: 'rotateY(-14deg) rotateX(5deg) rotateZ(0.5deg)' }
      : { transform: 'rotateY(-24deg) rotateX(9deg) rotateZ(1.5deg)' }
  }
  return tilted.value
    ? { transform: 'rotateY(-8deg) rotateX(4deg)' }
    : { transform: 'rotateY(-18deg) rotateX(8deg)' }
}

let mqNarrow: MediaQueryList | null = null
const syncNarrow = () => {
  if (!mqNarrow) return
  narrow.value = mqNarrow.matches
  if (narrow.value) tilted.value = false
}

onMounted(() => {
  mqNarrow = window.matchMedia('(max-width: 899px)')
  syncNarrow()
  mqNarrow.addEventListener('change', syncNarrow)
})

onUnmounted(() => {
  mqNarrow?.removeEventListener('change', syncNarrow)
})

const shown = ref<string | null>(null)
const ratio = ref<number | null>(null)
const errored = ref(false)
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
  return isLandscapeRatio.value && !!shown.value && !errored.value
})

const showSkeleton = computed(
  () =>
    (!shown.value && (cold.value || current.value.src === null || errored.value)) ||
    (showLaptop.value && !shown.value),
)

const aspectStyle = computed(() => {
  if (showLaptop.value) {
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
  if (!reduced.value && !narrow.value) tilted.value = true
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

const navBtn =
  'absolute top-1/2 z-[4] grid size-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-[color-mix(in_srgb,var(--bg)_75%,transparent)] text-[1.25rem] leading-none text-text backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent'
</script>

<template>
  <div
    class="grid w-full gap-[0.65rem]"
    :class="showPhone || showLaptop ? 'justify-items-center' : 'justify-items-stretch'"
  >
    <!-- Phone -->
    <div
      v-if="showPhone"
      ref="stageRef"
      class="relative grid w-full place-items-center px-10 py-5 pb-7 [perspective:1100px] [perspective-origin:50%_40%] max-[899px]:px-6 max-[899px]:py-3 max-[899px]:pb-4 max-[899px]:[perspective:none]"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
    >
      <div
        class="relative w-[min(100%,220px)] max-h-[min(58vh,480px)] [transform-style:preserve-3d] transition-transform duration-[550ms] drop-shadow-[18px_32px_36px_color-mix(in_srgb,#000_55%,transparent)] max-[899px]:w-[min(100%,200px)] max-[899px]:drop-shadow-[0_16px_24px_color-mix(in_srgb,#000_45%,transparent)]"
        :class="reduced || narrow ? 'drop-shadow-[0_18px_28px_color-mix(in_srgb,#000_40%,transparent)]' : ''"
        :style="deviceTransform(true)"
      >
        <div
          class="relative rounded-[2.35rem] bg-[linear-gradient(145deg,#4a4744_0%,#1e1d1b_22%,#2c2a28_52%,#0e0d0c_100%)] p-[0.58rem] shadow-[inset_0_1px_0_color-mix(in_srgb,#fff_22%,transparent),inset_0_-1px_0_color-mix(in_srgb,#000_60%,transparent),inset_1px_0_0_color-mix(in_srgb,#fff_8%,transparent),0_0_0_1.5px_#050505,0_0_0_2.5px_#2a2826] [transform:translateZ(12px)]"
        >
          <span
            class="absolute top-[18%] -left-[3px] h-[9%] w-[3px] rounded-sm bg-[linear-gradient(180deg,#3a3835,#161514)] shadow-[inset_0_1px_0_color-mix(in_srgb,#fff_10%,transparent),0_14px_0_0_#1a1917,0_32px_0_0_#1a1917]"
            aria-hidden="true"
          />
          <span
            class="absolute top-[24%] -right-[3px] h-[11%] w-[3px] rounded-sm bg-[linear-gradient(180deg,#3a3835,#161514)] shadow-[inset_0_1px_0_color-mix(in_srgb,#fff_12%,transparent)]"
            aria-hidden="true"
          />
          <div
            class="absolute top-[0.95rem] left-1/2 z-[3] h-[1.1rem] w-[30%] -translate-x-1/2 rounded-full bg-[#050504] shadow-[inset_0_0_0_1px_color-mix(in_srgb,#fff_7%,transparent),0_0_0_1px_color-mix(in_srgb,#000_80%,transparent)]"
            aria-hidden="true"
          />
          <div
            class="relative w-full isolate overflow-hidden rounded-[1.7rem] bg-[#050504]"
            :style="aspectStyle"
          >
            <Transition name="cross">
              <img
                :key="shown!"
                class="block h-auto w-full"
                :src="shown!"
                :alt="`${current.label || title} screenshot ${index + 1}`"
                draggable="false"
              >
            </Transition>
            <div
              class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(125deg,color-mix(in_srgb,#fff_8%,transparent)_0%,transparent_42%,transparent_68%,color-mix(in_srgb,#000_12%,transparent)_100%)] opacity-50 mix-blend-soft-light"
              aria-hidden="true"
            />
          </div>
          <div
            class="absolute bottom-[0.7rem] left-1/2 z-[3] h-[0.2rem] w-[30%] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--text)_32%,transparent)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <template v-if="multi">
        <button type="button" :class="[navBtn, 'left-0.5 max-[899px]:left-0']" aria-label="Previous image" @click="prev">
          ‹
        </button>
        <button type="button" :class="[navBtn, 'right-0.5 max-[899px]:right-0']" aria-label="Next image" @click="next">
          ›
        </button>
      </template>
    </div>

    <!-- Laptop / display -->
    <div
      v-else-if="showLaptop"
      ref="stageRef"
      class="relative grid w-full place-items-center overflow-hidden px-2 py-3 pb-5 [perspective:1400px] [perspective-origin:50%_40%] max-[899px]:px-0 max-[899px]:py-2 max-[899px]:pb-4 max-[899px]:[perspective:none]"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
    >
      <div
        class="relative w-[min(100%,440px)] [transform-style:preserve-3d] transition-transform duration-[550ms] drop-shadow-[16px_28px_32px_color-mix(in_srgb,#000_50%,transparent)] max-[899px]:w-full max-[899px]:max-w-full max-[899px]:drop-shadow-[0_14px_22px_color-mix(in_srgb,#000_40%,transparent)]"
        :style="deviceTransform(false)"
      >
        <div
          class="relative rounded-[0.85rem] bg-[linear-gradient(145deg,#3d3c3a_0%,#1a1918_35%,#2a2927_65%,#121110_100%)] p-[0.55rem] shadow-[inset_0_1px_0_color-mix(in_srgb,#fff_18%,transparent),inset_0_-1px_0_color-mix(in_srgb,#000_50%,transparent),inset_1px_0_0_color-mix(in_srgb,#fff_8%,transparent),0_0_0_1px_#0a0a09] [transform:translateZ(8px)] max-[899px]:rounded-[0.65rem] max-[899px]:p-[0.4rem]"
        >
          <span
            class="absolute top-[0.2rem] left-1/2 z-[3] size-[0.32rem] -translate-x-1/2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_0_1px_color-mix(in_srgb,#fff_10%,transparent),0_0_0_2px_#0a0a0a]"
            aria-hidden="true"
          />
          <div
            class="relative w-full isolate overflow-hidden rounded-[0.28rem] bg-[#0a0908]"
            :style="aspectStyle"
          >
            <Transition name="cross">
              <img
                v-if="shown"
                :key="shown"
                class="block h-auto w-full"
                :src="shown"
                :alt="`${current.label || title} screenshot ${index + 1}`"
                draggable="false"
              >
            </Transition>
            <div
              v-if="showSkeleton"
              class="absolute inset-0 flex flex-col gap-3 bg-[#0c0c0b] p-[0.85rem]"
              aria-hidden="true"
            >
              <div class="flex h-[1.1rem] items-center gap-[0.35rem]">
                <span class="animate-shimmer size-[0.45rem] rounded-full bg-muted/35" />
                <span class="animate-shimmer size-[0.45rem] rounded-full bg-muted/35" />
                <span class="animate-shimmer size-[0.45rem] rounded-full bg-muted/35" />
                <span class="animate-shimmer ml-[0.4rem] h-[0.55rem] flex-1 rounded-full bg-muted/20" />
              </div>
              <div class="grid min-h-0 flex-1 grid-rows-[1.1fr_auto_auto] gap-[0.65rem]">
                <div class="animate-shimmer min-h-0 rounded-[0.55rem] bg-muted/15" />
                <div class="grid gap-[0.4rem]">
                  <span class="animate-shimmer block h-[0.7rem] w-[72%] rounded-full bg-muted/15" />
                  <span class="animate-shimmer block h-[0.55rem] w-full rounded-full bg-muted/15" />
                  <span class="animate-shimmer block h-[0.55rem] w-[48%] rounded-full bg-muted/15" />
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <span class="animate-shimmer block aspect-[4/3] rounded-[0.4rem] bg-muted/15" />
                  <span class="animate-shimmer block aspect-[4/3] rounded-[0.4rem] bg-muted/15" />
                  <span class="animate-shimmer block aspect-[4/3] rounded-[0.4rem] bg-muted/15" />
                </div>
              </div>
              <p class="muted m-0 text-center text-[0.7rem] tracking-wide">
                {{ skeletonCaption }}
              </p>
            </div>
            <div
              class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(125deg,color-mix(in_srgb,#fff_6%,transparent)_0%,transparent_45%,transparent_70%,color-mix(in_srgb,#000_14%,transparent)_100%)] opacity-45 mix-blend-soft-light"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <template v-if="multi">
        <button type="button" :class="[navBtn, 'left-0.5 max-[899px]:left-0']" aria-label="Previous image" @click="prev">
          ‹
        </button>
        <button type="button" :class="[navBtn, 'right-0.5 max-[899px]:right-0']" aria-label="Next image" @click="next">
          ›
        </button>
      </template>
    </div>

    <!-- Flat media -->
    <div
      v-else
      class="relative w-full max-w-full max-h-[min(62vh,520px)] overflow-hidden rounded-2xl border border-line bg-surface max-[899px]:max-h-[min(48vh,360px)]"
      :class="isLandscapeRatio ? 'max-h-[min(52vh,420px)]' : ''"
      :style="aspectStyle"
    >
      <Transition name="cross">
        <img
          v-if="shown"
          :key="shown"
          class="absolute inset-0 h-full w-full object-cover"
          :src="shown"
          :alt="`${current.label || title} screenshot ${index + 1}`"
          draggable="false"
        >
      </Transition>

      <div
        v-if="showSkeleton"
        class="absolute inset-0 flex flex-col gap-3 bg-surface p-[0.85rem]"
        aria-hidden="true"
      >
        <div class="flex h-[1.1rem] items-center gap-[0.35rem]">
          <span class="animate-shimmer size-[0.45rem] rounded-full bg-muted/35" />
          <span class="animate-shimmer size-[0.45rem] rounded-full bg-muted/35" />
          <span class="animate-shimmer size-[0.45rem] rounded-full bg-muted/35" />
          <span class="animate-shimmer ml-[0.4rem] h-[0.55rem] flex-1 rounded-full bg-muted/20" />
        </div>
        <div class="grid min-h-0 flex-1 grid-rows-[1.1fr_auto_auto] gap-[0.65rem]">
          <div class="animate-shimmer min-h-0 rounded-[0.55rem] bg-muted/15" />
          <div class="grid gap-[0.4rem]">
            <span class="animate-shimmer block h-[0.7rem] w-[72%] rounded-full bg-muted/15" />
            <span class="animate-shimmer block h-[0.55rem] w-full rounded-full bg-muted/15" />
            <span class="animate-shimmer block h-[0.55rem] w-[48%] rounded-full bg-muted/15" />
          </div>
          <div class="grid grid-cols-3 gap-2">
            <span class="animate-shimmer block aspect-[4/3] rounded-[0.4rem] bg-muted/15" />
            <span class="animate-shimmer block aspect-[4/3] rounded-[0.4rem] bg-muted/15" />
            <span class="animate-shimmer block aspect-[4/3] rounded-[0.4rem] bg-muted/15" />
          </div>
        </div>
        <p class="muted m-0 text-center text-[0.7rem] tracking-wide">
          {{ skeletonCaption }}
        </p>
      </div>

      <template v-if="multi">
        <button type="button" :class="[navBtn, 'left-[0.55rem]']" aria-label="Previous image" @click="prev">
          ‹
        </button>
        <button type="button" :class="[navBtn, 'right-[0.55rem]']" aria-label="Next image" @click="next">
          ›
        </button>
      </template>
    </div>

    <p v-if="current.label" class="m-0 text-center text-[0.8rem] tracking-wide text-muted">
      <a
        v-if="current.href"
        class="border-b border-accent/45 text-inherit no-underline transition-colors hover:border-accent hover:text-accent"
        :href="current.href"
        target="_blank"
        rel="noreferrer"
      >{{ current.label }}</a>
      <template v-else>{{ current.label }}</template>
    </p>

    <div
      v-if="multi"
      class="flex justify-center gap-[0.4rem]"
      role="tablist"
      :aria-label="`${title} images`"
    >
      <button
        v-for="(slide, i) in slides"
        :key="i"
        type="button"
        class="h-[0.45rem] rounded-full transition-[background,width] duration-200"
        :class="i === index ? 'w-[1.1rem] bg-accent' : 'w-[0.45rem] bg-muted/45'"
        :aria-label="slide.label || `Image ${i + 1}`"
        :aria-selected="i === index"
        @click="go(i)"
      />
    </div>
  </div>
</template>
