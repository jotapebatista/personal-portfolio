/**
 * Scroll-reveal for section content. Keeps motion language alive past Work.
 */
export function useScrollReveal(root: Ref<HTMLElement | null>, selector = '[data-reveal]') {
  const reduced = useReducedMotion()

  onMounted(async () => {
    if (reduced.value || !root.value) return

    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const targets = root.value.querySelectorAll<HTMLElement>(selector)
    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      )
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
  })
}
