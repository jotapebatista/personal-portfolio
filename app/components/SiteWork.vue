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
    root.value.querySelectorAll('[data-work-intro] [data-reveal]'),
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root.value.querySelector('[data-work-intro]'),
        start: 'top 80%',
        once: true,
      },
    },
  )
  requestAnimationFrame(() => ScrollTrigger.refresh())
})
</script>

<template>
  <section id="work" ref="root" class="section pb-0">
    <div class="container mb-8" data-work-intro>
      <p class="eyebrow" data-reveal>Work</p>
      <h2 class="section-title" data-reveal>Projects</h2>
    </div>

    <div class="relative">
      <article
        v-for="(project, i) in projects"
        :key="project.id"
        class="sticky top-nav flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden border-t border-line bg-bg shadow-[0_-24px_48px_color-mix(in_srgb,var(--bg)_65%,transparent)] max-[899px]:relative max-[899px]:top-auto max-[899px]:shadow-none"
        data-panel
        :style="{ zIndex: i + 1 }"
      >
        <div
          class="container relative grid w-full gap-6 py-14 max-[899px]:gap-5 max-[899px]:py-10"
          :class="
            hasImageSlot(project)
              ? 'items-center min-[900px]:max-w-[1000px] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(300px,480px)] min-[900px]:gap-9'
              : ''
          "
        >
          <div class="grid max-w-xl gap-[0.85rem]">
            <div class="flex items-baseline gap-4" data-reveal>
              <span class="eyebrow">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="muted">{{ project.year }}</span>
              <template v-if="project.credit">
                <span class="muted" aria-hidden="true">·</span>
                <a
                  v-if="project.creditUrl"
                  class="text-[0.85rem] text-muted no-underline transition-colors duration-200 hover:text-accent hover:border-b hover:border-accent/50"
                  :href="project.creditUrl"
                  target="_blank"
                  rel="noreferrer"
                >{{ project.credit }}</a>
                <span v-else class="text-[0.85rem] text-muted">{{ project.credit }}</span>
              </template>
            </div>
            <h3
              class="display m-0 text-[clamp(2.35rem,5.8vw,4.1rem)] max-[899px]:text-[clamp(1.85rem,9vw,2.75rem)] max-[899px]:leading-[1.05]"
              data-reveal
            >
              {{ project.title }}
            </h3>
            <p
              class="m-0 max-w-lg text-[1.05rem] leading-relaxed text-muted max-[899px]:text-[0.98rem]"
              data-reveal
            >
              {{ project.blurb }}
            </p>
            <ul
              v-if="project.stack.length"
              class="mt-[0.35rem] mb-0 flex list-none flex-wrap gap-2 p-0"
              data-reveal
            >
              <li
                v-for="tech in project.stack"
                :key="tech"
                class="rounded-full border border-line px-[0.7rem] py-[0.35rem] text-[0.8rem] text-muted"
              >
                {{ tech }}
              </li>
            </ul>
            <div
              v-if="project.liveUrl || project.repoUrl || siteLinks(project).length"
              class="mt-[0.35rem] flex flex-wrap gap-[0.65rem]"
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

          <div
            v-if="hasImageSlot(project)"
            class="relative w-full max-w-[480px] justify-self-start min-[900px]:justify-self-end max-[899px]:max-w-full max-[899px]:justify-self-stretch"
            data-reveal
          >
            <ProjectMedia
              :title="project.title"
              :sources="project.images!"
              :device="project.device"
            />
          </div>
        </div>
      </article>

      <article
        class="sticky top-nav flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden border-t border-dashed border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] bg-bg shadow-[0_-24px_48px_color-mix(in_srgb,var(--bg)_65%,transparent)] max-[899px]:relative max-[899px]:top-auto max-[899px]:shadow-none"
        data-panel
        :style="{ zIndex: projects.length + 1 }"
      >
        <div class="container relative grid max-w-2xl gap-[0.85rem] py-14 max-[899px]:py-10">
          <div class="flex items-baseline gap-4" data-reveal>
            <span class="inline-flex items-center gap-[0.55rem] text-xs tracking-[0.14em] text-accent uppercase">
              <span
                class="animate-live-pulse size-[0.45rem] rounded-full bg-accent"
                aria-hidden="true"
              />
              {{ workOngoing.eyebrow }}
            </span>
          </div>
          <h3
            class="display m-0 text-[clamp(2.35rem,5.8vw,4.1rem)] max-[899px]:text-[clamp(1.85rem,9vw,2.75rem)] max-[899px]:leading-[1.05]"
            data-reveal
          >
            {{ workOngoing.title }}
          </h3>
          <p
            class="m-0 max-w-lg text-[1.05rem] leading-relaxed text-muted max-[899px]:text-[0.98rem]"
            data-reveal
          >
            {{ workOngoing.blurb }}
          </p>
          <div class="mt-[0.35rem] flex flex-wrap gap-[0.65rem]" data-reveal>
            <MagneticButton :href="`mailto:${site.email}`" primary>
              Email
            </MagneticButton>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
