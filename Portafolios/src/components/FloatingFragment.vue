<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
defineProps({
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 20 },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
})
</script>

<template>
  <div
    class="floating-fragment"
    :style="{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      ['--tx']: `${x}px`,
      ['--ty']: `${y}px`,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.floating-fragment {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  will-change: transform, opacity;
  animation-name: floatFragment;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
@keyframes floatFragment {
  0% { transform: translate(-50%, -50%) translate(0,0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  50% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1.03); opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(-50%, -50%) translate(0,0) scale(1); opacity: 0; }
}
</style>
