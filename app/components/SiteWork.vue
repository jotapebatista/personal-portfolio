<script setup lang="ts">
import { projects, workOngoing, site } from '~/data/content'

const root = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()

const hasImageSlot = (project: (typeof projects)[number]) =>
  Array.isArray(project.images) && project.images.length > 0

const siteLinks = (project: (typeof projects)[number]) => {
  if (!project.images) return [] as Array<{ label: string; href: string }>
  const links: Array<{ label: string; href: string }> = []
  for (const entry of project.images) {
    if (!entry || typeof entry === 'string') continue
    if (entry.href && entry.label) links.push({ label: entry.label, href: entry.href })
  }
  return links
}

onMounted(async () => {
  if (reduced.value || !root.value) return
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const panels = root.value.querySelectorAll<HTMLElement>('[data-panel]')
  panels.forEach((panel) => {
    gsap.fromTo(
      panel.querySelectorAll('[data-reveal]'),
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          once: true,
        },
      },
    )
  })

  gsap.fromTo(
    root.value.querySelectorAll('.work__intro [data-reveal]'),
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root.value.querySelector('.work__intro'),
        start: 'top 80%',
        once: true,
      },
    },
  )
  requestAnimationFrame(() => ScrollTrigger.refresh())
})
</script>

<template>
  <section id="work" ref="root" class="work section">
    <div class="container work__intro">
      <p class="eyebrow" data-reveal>Work</p>
      <h2 class="section-title" data-reveal>Projects</h2>
    </div>

    <div class="work__stack-wrap">
      <article
        v-for="(project, i) in projects"
        :key="project.id"
        class="work__panel"
        data-panel
        :style="{ zIndex: i + 1 }"
      >
        <div
          class="container work__panel-inner"
          :class="{ 'has-media': hasImageSlot(project) }"
        >
          <div class="work__copy">
            <div class="work__meta" data-reveal>
              <span class="eyebrow">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="muted">{{ project.year }}</span>
              <template v-if="project.credit">
                <span class="muted" aria-hidden="true">·</span>
                <a
                  v-if="project.creditUrl"
                  class="work__credit"
                  :href="project.creditUrl"
                  target="_blank"
                  rel="noreferrer"
                >{{ project.credit }}</a>
                <span v-else class="work__credit">{{ project.credit }}</span>
              </template>
            </div>
            <h3 class="work__title display" data-reveal>{{ project.title }}</h3>
            <p class="work__blurb" data-reveal>{{ project.blurb }}</p>
            <ul v-if="project.stack.length" class="work__stack" data-reveal>
              <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
            </ul>
            <div
              v-if="project.liveUrl || project.repoUrl || siteLinks(project).length"
              class="work__links"
              data-reveal
            >
              <MagneticButton
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noreferrer"
                primary
              >
                Live
              </MagneticButton>
              <MagneticButton
                v-for="link in siteLinks(project)"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noreferrer"
                primary
              >
                {{ link.label }}
              </MagneticButton>
              <MagneticButton
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                rel="noreferrer"
              >
                Code
              </MagneticButton>
            </div>
          </div>

          <div v-if="hasImageSlot(project)" class="work__media" data-reveal>
            <ProjectMedia
              :title="project.title"
              :sources="project.images!"
              :device="project.device"
            />
          </div>

          <div class="work__wash" aria-hidden="true" />
        </div>
      </article>

      <!-- Not a project — signal the catalog isn’t closed -->
      <article
        class="work__panel work__panel--ongoing"
        data-panel
        :style="{ zIndex: projects.length + 1 }"
      >
        <div class="container work__ongoing">
          <div class="work__meta" data-reveal>
            <span class="work__live">
              <span class="work__live-dot" aria-hidden="true" />
              {{ workOngoing.eyebrow }}
            </span>
          </div>
          <h3 class="work__title display" data-reveal>{{ workOngoing.title }}</h3>
          <p class="work__blurb" data-reveal>{{ workOngoing.blurb }}</p>
<div class="work__links" data-reveal>
            <MagneticButton :href="`mailto:${site.email}`" primary>
              Email
            </MagneticButton>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.work {
  padding-bottom: 0;
}

.work__intro {
  margin-bottom: 2rem;
}

.work__stack-wrap {
  position: relative;
}

.work__panel {
  position: sticky;
  top: var(--nav-h);
  min-height: calc(100svh - var(--nav-h));
  display: flex;
  align-items: center;
  background: var(--bg);
  border-top: 1px solid var(--line);
  box-shadow: 0 -24px 48px color-mix(in srgb, var(--bg) 65%, transparent);
}

/* Sticky stack + tall media = clipped hell on phones */
@media (max-width: 899px) {
  .work__panel {
    position: relative;
    top: auto;
    min-height: 0;
    align-items: stretch;
    box-shadow: none;
  }

  .work__panel-inner {
    padding: 2.5rem 0;
    gap: 1.25rem;
  }

  .work__ongoing {
    padding: 2.5rem 0;
  }

  .work__title {
    font-size: clamp(1.85rem, 9vw, 2.75rem);
    line-height: 1.05;
  }

  .work__blurb {
    font-size: 0.98rem;
  }

  .work__media {
    max-width: 100%;
    justify-self: stretch;
  }

  .work__panel {
    overflow: hidden;
  }

  .work__wash {
    display: none;
  }
}

.work__panel--ongoing {
  border-top-style: dashed;
  border-top-color: color-mix(in srgb, var(--accent) 40%, var(--line));
}

.work__panel-inner {
  position: relative;
  padding: 3.5rem 0;
  display: grid;
  gap: 1.5rem;
  width: 100%;
}

.work__panel-inner.has-media {
  align-items: center;
}

@media (min-width: 900px) {
  .work__panel-inner.has-media {
    grid-template-columns: minmax(0, 1fr) minmax(300px, 480px);
    gap: 2.25rem;
    max-width: 1000px;
  }
}

.work__ongoing {
  position: relative;
  padding: 3.5rem 0;
  display: grid;
  gap: 0.85rem;
  max-width: 40rem;
}

.work__copy {
  display: grid;
  gap: 0.85rem;
  max-width: 36rem;
}

.work__meta {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}

.work__live {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.work__live-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent);
  animation: live-pulse 1.8s ease-out infinite;
}

.work__credit {
  font-size: 0.85rem;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

a.work__credit:hover {
  color: var(--accent);
  border-bottom-color: color-mix(in srgb, var(--accent) 50%, transparent);
}

.work__title {
  font-size: clamp(2.35rem, 5.8vw, 4.1rem);
  margin: 0;
}

.work__blurb {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
  max-width: 32rem;
}

.work__stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0.35rem 0 0;
}

.work__stack li {
  font-size: 0.8rem;
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
}

.work__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.35rem;
}

.work__media {
  position: relative;
  width: 100%;
  max-width: 480px;
  justify-self: start;
}

@media (min-width: 900px) {
  .work__media {
    justify-self: end;
  }
}

.work__wash {
  position: absolute;
  inset: auto -10% -30% auto;
  width: min(42vw, 420px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%);
  pointer-events: none;
  filter: blur(8px);
  z-index: -1;
}

@keyframes live-pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 0.55rem transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .work__live-dot {
    animation: none;
  }
}
</style>
