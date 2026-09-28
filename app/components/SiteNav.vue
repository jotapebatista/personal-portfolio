<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

const { scrollTo } = useSmoothScroll()
const { onLogoClick } = useEggs()

const links = [
  { href: '#work', id: 'work', label: 'Work' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#about', id: 'about', label: 'About' },
]

const active = ref<string | null>(null)
const sectionIds = [...links.map((l) => l.id), 'contact']

const linksRef = ref<HTMLElement | null>(null)
const indicator = reactive({
  x: 0,
  w: 0,
  ready: false,
})

const go = (href: string, e: Event) => {
  e.preventDefault()
  active.value = href.slice(1) || null
  scrollTo(href)
}

const moveIndicator = () => {
  const root = linksRef.value
  if (!root || !active.value || active.value === 'contact') {
    indicator.ready = false
    return
  }
  const el = root.querySelector<HTMLElement>(`[data-nav="${active.value}"]`)
  if (!el || getComputedStyle(el).display === 'none') {
    indicator.ready = false
    return
  }
  indicator.x = el.offsetLeft
  indicator.w = el.offsetWidth
  indicator.ready = true
}

let triggers: ScrollTriggerType[] = []

const syncActive = () => {
  const header = document.querySelector('header')
  const navH = header?.getBoundingClientRect().height || 72
  const probe = navH + 100

  let current: string | null = null
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= probe) current = id
  }
  active.value = current
}

watch(active, () => nextTick(moveIndicator))

onMounted(async () => {
  syncActive()
  window.addEventListener('scroll', syncActive, { passive: true })
  window.addEventListener('resize', moveIndicator)

  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  triggers = [
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: syncActive,
      onRefresh: syncActive,
    }),
  ]

  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    syncActive()
    moveIndicator()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', syncActive)
  window.removeEventListener('resize', moveIndicator)
  triggers.forEach((t) => t.kill())
  triggers = []
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 h-nav border-b border-line bg-bg/85 backdrop-blur-md"
  >
    <div class="container flex h-full items-center justify-between gap-4">
      <button
        class="display shrink-0 text-[1.15rem] tracking-[-0.04em] text-text"
        type="button"
        aria-label="Home / easter egg"
        @click="onLogoClick"
      >
        JB
      </button>

      <nav
        class="flex min-w-0 flex-1 items-center justify-end gap-[clamp(0.75rem,2.2vw,1.75rem)]"
        aria-label="Primary"
      >
        <div ref="linksRef" class="relative flex items-center gap-3 sm:gap-[clamp(0.75rem,2.2vw,1.75rem)]">
          <a
            v-for="link in links"
            :key="link.href"
            :data-nav="link.id"
            class="nav-link relative py-1 text-[0.78rem] font-medium transition-colors duration-200 sm:text-[0.85rem]"
            :class="active === link.id ? 'text-accent' : 'text-muted hover:text-text'"
            :href="link.href"
            :aria-current="active === link.id ? 'true' : undefined"
            @click="go(link.href, $event)"
          >
            {{ link.label }}
          </a>

          <span
            class="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] origin-left rounded-full bg-accent transition-[transform,width,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            :class="indicator.ready ? 'opacity-100' : 'opacity-0'"
            :style="{
              width: `${indicator.w}px`,
              transform: `translate3d(${indicator.x}px, 0, 0)`,
              boxShadow: indicator.ready
                ? '0 0 12px color-mix(in srgb, var(--accent) 55%, transparent)'
                : 'none',
            }"
            aria-hidden="true"
          />
        </div>

        <a
          class="btn text-[0.8rem] !px-4 !py-2"
          :class="active === 'contact' ? 'btn-primary' : ''"
          href="#contact"
          @click="go('#contact', $event)"
        >
          Email
        </a>
      </nav>
    </div>
  </header>
</template>
