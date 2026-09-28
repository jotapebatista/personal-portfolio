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
  <header class="nav">
    <div class="nav__inner container">
      <button class="nav__logo display" type="button" aria-label="Home / easter egg" @click="onLogoClick">
        JB
      </button>
      <nav class="nav__links" aria-label="Primary">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="go(link.href, $event)">
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 40;
  height: var(--nav-h);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.nav__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  font-size: 1.15rem;
  letter-spacing: -0.04em;
  color: var(--text);
}

.nav__links {
  display: flex;
  gap: clamp(0.85rem, 2vw, 1.6rem);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text);
}

.nav__links a {
  opacity: 0.72;
  transition: opacity 0.25s ease;
}

.nav__links a:hover {
  opacity: 1;
}

@media (max-width: 640px) {
  .nav__links a:nth-child(2),
  .nav__links a:nth-child(3) {
    display: none;
  }
}
</style>
