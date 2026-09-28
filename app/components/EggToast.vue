<script setup lang="ts">
const { toast } = useEggs()
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="toast"
        class="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-full bg-accent px-[1.1rem] py-3 text-[0.9rem] font-semibold text-bg shadow-[0_12px_40px_color-mix(in_srgb,var(--bg)_55%,transparent)]"
        role="status"
      >
        {{ toast }}
      </div>
    </Transition>
  </Teleport>
</template>
