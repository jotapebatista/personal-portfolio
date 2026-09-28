import type Lenis from 'lenis'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

let sharedLenis: Lenis | null = null

export function getLenis() {
  return sharedLenis
}

export function useSmoothScroll() {
  const reduced = useReducedMotion()
  const lenis = shallowRef<Lenis | null>(null)

  onMounted(async () => {
    if (reduced.value) return

    const [{ default: LenisCtor }, gsapMod, stMod] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])
    const gsap = gsapMod.default
    const ScrollTrigger = stMod.ScrollTrigger as typeof ScrollTriggerType
    gsap.registerPlugin(ScrollTrigger)

    const instance = new LenisCtor({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })
    sharedLenis = instance
    lenis.value = instance

    instance.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    onUnmounted(() => {
      gsap.ticker.remove(tickerFn)
      instance.destroy()
      sharedLenis = null
      lenis.value = null
    })
  })

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number }) => {
    if (lenis.value) {
      lenis.value.scrollTo(target, { offset: options?.offset ?? -80 })
      return
    }
    if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { lenis, scrollTo }
}
