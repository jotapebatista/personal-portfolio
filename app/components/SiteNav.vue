<script setup lang="ts">
const { scrollTo } = useSmoothScroll()
const { onLogoClick } = useEggs()

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const go = (href: string, e: Event) => {
  e.preventDefault()
  scrollTo(href)
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 h-nav border-b border-line bg-bg">
    <div class="container flex h-full items-center justify-between">
      <button
        class="display text-[1.15rem] tracking-[-0.04em] text-text"
        type="button"
        aria-label="Home / easter egg"
        @click="onLogoClick"
      >
        JB
      </button>
      <nav
        class="flex gap-[clamp(0.65rem,2vw,1.6rem)] text-[0.85rem] font-medium text-text max-[520px]:gap-[0.7rem] max-[520px]:text-[0.78rem]"
        aria-label="Primary"
      >
        <a
          v-for="link in links"
          :key="link.href"
          class="opacity-70 transition-opacity duration-250 hover:opacity-100"
          :href="link.href"
          @click="go(link.href, $event)"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
