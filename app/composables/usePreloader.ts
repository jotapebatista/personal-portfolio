/** Shared preloader gate — cinematic entrance waits for this. */
export function usePreloader() {
  const active = useState('preloader-active', () => true)
  const done = useState('preloader-done', () => false)

  const finish = () => {
    if (done.value) return
    done.value = true
    active.value = false
    if (import.meta.client) {
      document.documentElement.classList.remove('is-preloading')
    }
  }

  return { active, done, finish }
}
