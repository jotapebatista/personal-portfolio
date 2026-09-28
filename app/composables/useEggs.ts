const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

let logoClicks = 0
let logoTimer: ReturnType<typeof setTimeout> | null = null
let konamiIndex = 0
let konamiHits = 0
let toastTimer: ReturnType<typeof setTimeout> | null = null
let coralTimer: ReturnType<typeof setTimeout> | null = null

export function useEggs() {
  const { cycle, setCoral, reset } = useAccent()
  const gridOpen = useState('egg-grid', () => false)
  const catalogOpen = useState('egg-catalog', () => false)
  const toast = useState<string | null>('egg-toast', () => null)
  const ghostActive = useState('egg-ghost', () => false)
  const glitching = useState('egg-glitch', () => false)
  const listenersBound = useState('egg-listeners', () => false)

  const showToast = (message: string) => {
    toast.value = message
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toast.value = null
    }, 2400)
  }

  const triggerGlitch = () => {
    glitching.value = true
    setCoral()
    showToast('coral on')
    if (coralTimer) clearTimeout(coralTimer)
    coralTimer = setTimeout(() => {
      glitching.value = false
      reset()
    }, 10000)
  }

  const triggerGhost = async () => {
    if (ghostActive.value) return
    ghostActive.value = true
    showToast('old template…')
    await new Promise((r) => setTimeout(r, 2800))
    ghostActive.value = false
    showToast('gone.')
  }

  const onLogoClick = () => {
    logoClicks += 1
    if (logoTimer) clearTimeout(logoTimer)
    logoTimer = setTimeout(() => {
      logoClicks = 0
    }, 1200)
    if (logoClicks >= 5) {
      logoClicks = 0
      cycle()
      showToast('accent++')
    }
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

    if ((key === 'g' || key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey) {
      gridOpen.value = !gridOpen.value
    }

    const expected = KONAMI[konamiIndex]
    const match = key === expected

    if (match) {
      konamiIndex += 1
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0
        konamiHits += 1
        if (konamiHits >= 2) {
          konamiHits = 0
          triggerGhost()
        } else {
          triggerGlitch()
        }
      }
    } else {
      konamiIndex = key === KONAMI[0] ? 1 : 0
    }
  }

  /** Call once from app.vue — keeps egg essence working without duplicate listeners. */
  const bindListeners = () => {
    if (!import.meta.client || listenersBound.value) return
    listenersBound.value = true

    const route = useRoute()
    if (route.query.eggs === '1') catalogOpen.value = true
    if (route.query.template === '1') triggerGhost()

    window.addEventListener('keydown', onKey)
  }

  return {
    gridOpen,
    catalogOpen,
    toast,
    ghostActive,
    glitching,
    onLogoClick,
    showToast,
    triggerGhost,
    bindListeners,
  }
}
