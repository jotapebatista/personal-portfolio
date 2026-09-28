const accents = ['#c8f53a', '#ff5c35', '#b8a4ff'] as const

export function useAccent() {
  const index = useState('accent-index', () => 0)
  const accent = computed(() => accents[index.value % accents.length])

  const apply = (value: string) => {
    if (!import.meta.client) return
    document.documentElement.style.setProperty('--accent', value)
  }

  const cycle = () => {
    index.value = (index.value + 1) % accents.length
    apply(accent.value)
  }

  const setCoral = () => {
    index.value = 1
    apply(accents[1])
  }

  const reset = () => {
    index.value = 0
    apply(accents[0])
  }

  watch(accent, (v) => apply(v), { immediate: false })

  return { accent, cycle, setCoral, reset, accents }
}
