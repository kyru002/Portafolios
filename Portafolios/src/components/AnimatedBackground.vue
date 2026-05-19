<script setup>
import ParticleField from './ParticleField.vue'
</script>

<template>
  <div class="animated-bg" aria-hidden="true">
    <ParticleField />

    <div class="grad grad-purple" />
    <div class="grad grad-blue" />
    <div class="grad grad-cyan" />

    <div class="grid-pattern" />
  </div>
</template>

<style scoped>
.animated-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}
.grad {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.95;
}
.grad-purple {
  width: 700px;
  height: 700px;
  left: 6%;
  top: 6%;
  background: radial-gradient(circle at 40% 40%, rgba(139,92,246,0.18) 0%, transparent 50%);
  animation: movePurple 12s ease-in-out infinite;
}
.grad-blue {
  width: 600px;
  height: 600px;
  right: 8%;
  top: 16%;
  background: radial-gradient(circle at 50% 50%, rgba(59,130,246,0.14) 0%, transparent 70%);
  animation: moveBlue 14s ease-in-out infinite;
}
.grad-cyan {
  width: 520px;
  height: 520px;
  left: 12%;
  bottom: 10%;
  background: radial-gradient(circle at 30% 70%, rgba(6,182,212,0.12) 0%, transparent 70%);
  animation: moveCyan 10s ease-in-out infinite;
}
.grid-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mix-blend-mode: overlay;
}

@keyframes movePurple {
  0% { transform: translate(0,0) scale(1); }
  50% { transform: translate(40px,-18px) scale(1.04); }
  100% { transform: translate(0,0) scale(1); }
}
@keyframes moveBlue {
  0% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-80px,30px) scale(1.06); }
  100% { transform: translate(0,0) scale(1); }
}
@keyframes moveCyan {
  0% { transform: translate(0,0) scale(1); }
  50% { transform: translate(20px,56px) scale(1.03); }
  100% { transform: translate(0,0) scale(1); }
}
</style>
