<script setup lang="ts">
const showPreloader = ref(true)
const { glitching, bindListeners } = useEggs()
useSmoothScroll()

onMounted(() => {
  bindListeners()
})
</script>

<template>
  <div class="app" :class="{ 'is-glitching': glitching }">
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

<style scoped>
.app.is-glitching {
  animation: glitch 0.45s steps(2, end) 3;
}

@keyframes glitch {
  0% {
    filter: none;
    transform: none;
  }
  30% {
    filter: hue-rotate(20deg);
    transform: translateX(2px);
  }
  60% {
    filter: hue-rotate(-30deg);
    transform: translateX(-2px);
  }
  100% {
    filter: none;
    transform: none;
  }
}
</style>
