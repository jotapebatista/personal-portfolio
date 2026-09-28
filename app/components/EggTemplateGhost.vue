<script setup lang="ts">
const { ghostActive } = useEggs()
</script>

<template>
  <Teleport to="body">
    <Transition name="ghost">
      <div v-if="ghostActive" class="ghost" aria-hidden="true">
        <div class="ghost__nav">
          <span>01. About</span>
          <span>02. Experience</span>
          <span>03. Work</span>
          <span>04. Contact</span>
        </div>
        <div class="ghost__body">
          <p class="ghost__hi">Hi, my name is</p>
          <h2>João Batista.</h2>
          <p class="ghost__sub">I build things for the web.</p>
          <p class="ghost__note">template residue detected — exorcising…</p>
        </div>
        <div class="ghost__tear" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ghost {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: #0b192f;
  color: #ccd6f6;
  font-family: 'SF Mono', ui-monospace, Menlo, monospace;
  overflow: hidden;
}

.ghost__nav {
  display: flex;
  gap: 1.25rem;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  color: #64ffda;
  font-size: 0.8rem;
}

.ghost__body {
  padding: 10vh 2rem 2rem;
  max-width: 720px;
  margin-inline: auto;
}

.ghost__hi {
  color: #64ffda;
  margin: 0 0 0.75rem;
}

.ghost__body h2 {
  margin: 0;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  color: #e6f1ff;
}

.ghost__sub {
  color: #8892b0;
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin: 0.5rem 0 1.5rem;
}

.ghost__note {
  color: #64ffda;
  opacity: 0.75;
  font-size: 0.85rem;
}

.ghost__tear {
  position: absolute;
  inset: 0;
  background: #c8f53a;
  transform: scaleX(0);
  transform-origin: left;
  animation: tear 0.7s 2.1s var(--ease-out) forwards;
}

@keyframes tear {
  to {
    transform: scaleX(1);
  }
}

.ghost-enter-active {
  transition: opacity 0.25s ease;
}
.ghost-leave-active {
  transition: opacity 0.35s ease;
}
.ghost-enter-from,
.ghost-leave-to {
  opacity: 0;
}
</style>
