<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ParticleField from './ParticleField.vue'
import FloatingFragment from './FloatingFragment.vue'

const containerRef = ref(null)
const curX = ref(0)
const curY = ref(0)
const targetX = ref(0)
const targetY = ref(0)
const isPointerInside = ref(false)

let rafId = null

function handleMouseMove(e) {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const max = 6
  const x = e.clientX - centerX
  const y = e.clientY - centerY
  targetY.value = (x / rect.width) * max
  targetX.value = ( -y / rect.height) * max
}

function handleMouseLeave() {
  targetX.value = 0
  targetY.value = 0
  isPointerInside.value = false
}

function handleMouseEnter() {
  isPointerInside.value = true
}

function animate() {
  curX.value += (targetX.value - curX.value) * 0.12
  curY.value += (targetY.value - curY.value) * 0.12
  // apply current tilt to the hero copy element (sibling in the .hero section)
    try {
      const container = containerRef.value
      const heroEl = container && container.closest('.hero')
      const heroCopy = heroEl && heroEl.querySelector('.hero-copy')
      if (heroCopy) {
        const rotX = curX.value.toFixed(3)
        const rotY = curY.value.toFixed(3)
        const threshold = 0.05
        const stillRotating = Math.abs(curX.value) > threshold || Math.abs(curY.value) > threshold
        if (isPointerInside.value || stillRotating) {
          heroCopy.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
        } else {
          heroCopy.style.transform = 'translate(-50%, -50%)'
        }
        heroCopy.style.transformOrigin = '50% 50%'
      }
    } catch (err) {
      // ignore
    }

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  rafId = requestAnimationFrame(animate)
  // attach listeners to the whole hero section so children (title, paragraph, buttons) don't block the effect
  const heroEl = document.querySelector('.hero')
  if (heroEl) {
    containerRef.value = heroEl
    heroEl.addEventListener('pointermove', handleMouseMove)
    heroEl.addEventListener('pointerenter', handleMouseEnter)
    heroEl.addEventListener('pointerleave', handleMouseLeave)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  const el = containerRef.value
  if (el) {
    el.removeEventListener('pointermove', handleMouseMove)
    el.removeEventListener('pointerleave', handleMouseLeave)
    el.removeEventListener('pointerenter', handleMouseEnter)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="animated-hero absolute inset-0 overflow-hidden z-0"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="absolute inset-0 overflow-hidden z-0">
      <ParticleField />

      <div class="grad central" />
      <div class="grad blue" />
      <div class="grad cyan" />

      <div class="grid-pattern" />
    </div>

    <FloatingFragment :delay="0" :duration="20" :x="-200" :y="-100">
      <svg class="w-8 h-8 text-blue-400/30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(59,130,246,0.25)"/></svg>
    </FloatingFragment>
    <FloatingFragment :delay="2" :duration="18" :x="200" :y="100">
      <svg class="w-6 h-6 text-purple-400/30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="rgba(139,92,246,0.2)"/></svg>
    </FloatingFragment>
  </div>
</template>

.style-scope-ignore {
/* helper to avoid accidental relative positioning from scoped rules */
}
<style scoped>
.animated-hero { position: absolute; inset: 0 }
.animated-hero .grad { position: absolute; border-radius: 50%; filter: blur(80px); }
.animated-hero .grad.central { inset: 0; background: radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 50%); animation: pulseScale 8s ease-in-out infinite; }
.animated-hero .grad.blue { width: 600px; height: 600px; right: 10%; top: 18%; background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%); animation: moveBlue 12s ease-in-out infinite; }
.animated-hero .grad.cyan { width: 500px; height: 500px; left: 12%; bottom: 12%; background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%); animation: moveCyan 10s ease-in-out infinite; }
.animated-hero .grid-pattern { position: absolute; inset: 0; opacity: 0.16; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 50px 50px; mix-blend-mode: overlay; }

@keyframes pulseScale { 0%{ transform: scale(1) } 50%{ transform: scale(1.2) } 100% { transform: scale(1) } }
@keyframes moveBlue { 0%{ transform: translate(0,0) } 50%{ transform: translate(-80px,30px) } 100%{ transform: translate(0,0) } }
@keyframes moveCyan { 0%{ transform: translate(0,0) } 50%{ transform: translate(20px,56px) } 100%{ transform: translate(0,0) } }

.content-wrapper { transition: transform 120ms ease-out }
</style>
