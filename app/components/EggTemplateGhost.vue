<script setup lang="ts">
const { ghostActive } = useEggs()
</script>

<template>
  <Teleport to="body">
    <Transition name="ghost">
      <div
        v-if="ghostActive"
        class="fixed inset-0 z-[110] overflow-hidden bg-[#0b192f] font-mono text-[#ccd6f6]"
        aria-hidden="true"
      >
        <div class="flex justify-end gap-5 px-8 py-6 text-[0.8rem] text-[#64ffda]">
          <span>01. About</span>
          <span>02. Experience</span>
          <span>03. Work</span>
          <span>04. Contact</span>
        </div>
        <div class="mx-auto max-w-[720px] px-8 pt-[10vh] pb-8">
          <p class="mb-3 text-[#64ffda]">Hi, my name is</p>
          <h2 class="m-0 text-[clamp(2.5rem,8vw,4.5rem)] text-[#e6f1ff]">João Batista.</h2>
          <p class="my-2 mb-6 text-[clamp(1.2rem,3vw,2rem)] text-[#8892b0]">
            I build things for the web.
          </p>
          <p class="text-[0.85rem] text-[#64ffda] opacity-75">
            template residue detected — exorcising…
          </p>
        </div>
        <div
          class="animate-tear absolute inset-0 origin-left scale-x-0 bg-[#c8f53a]"
        />
      </div>
    </Transition>
  </Teleport>
</template>
