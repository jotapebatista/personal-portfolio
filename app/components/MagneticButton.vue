<script setup lang="ts">
const props = defineProps<{
  href?: string
  primary?: boolean
  target?: string
  rel?: string
}>()

const emit = defineEmits<{ click: [MouseEvent] }>()
const el = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
const { scrollTo } = useSmoothScroll()

const onMove = (e: MouseEvent) => {
  if (!el.value || reduced.value) return
  if (window.matchMedia('(pointer: coarse)').matches) return
  const rect = el.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  el.value.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
}

const onLeave = () => {
  if (!el.value) return
  el.value.style.transform = 'translate(0, 0)'
}

const onClick = (e: MouseEvent) => {
  emit('click', e)
  if (e.defaultPrevented || !props.href) return

  // In-page anchors → Lenis
  if (props.href.startsWith('#')) {
    e.preventDefault()
    scrollTo(props.href)
    return
  }

  // mailto is often swallowed by smooth-scroll / custom handlers — force it
  if (props.href.startsWith('mailto:')) {
    e.preventDefault()
    window.location.assign(props.href)
  }
}
</script>

<template>
  <a
    v-if="href"
    ref="el"
    :href="href"
    :target="target"
    :rel="rel"
    class="btn"
    :class="{ 'btn-primary': primary }"
    @mousemove="onMove"
    @mouseleave="onLeave"
    @click="onClick"
  >
    <slot />
  </a>
  <button
    v-else
    ref="el"
    type="button"
    class="btn"
    :class="{ 'btn-primary': primary }"
    @mousemove="onMove"
    @mouseleave="onLeave"
    @click="onClick"
  >
    <slot />
  </button>
</template>
