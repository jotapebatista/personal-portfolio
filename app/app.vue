<script setup lang="ts">
const showPreloader = ref(true)
const { glitching, bindListeners } = useEggs()
useSmoothScroll()

onMounted(() => {
  bindListeners()
})
</script>

<template>
  <div :class="['min-h-full', glitching && 'animate-glitch']">
    <SitePreloader v-model="showPreloader" />
    <SiteNav />
    <SiteCursor />
    <EggGrid />
    <EggIndex />
    <EggToast />
    <EggTemplateGhost />
    <NuxtPage />
  </div>
</template>
