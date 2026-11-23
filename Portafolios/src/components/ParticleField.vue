<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

const canvasRef = ref(null)
const { prefersReducedMotion } = usePrefersReducedMotion()

let rafId = null
let resizeObserver = null
let sectionObserver = null
let isPageVisible = true
let isHeroVisible = true
let shouldAnimate = true
let particles = []
let ctx = null
let canvas = null

function getParticleCount(width, height) {
  const area = width * height
  const density = area / 22000
  return Math.max(24, Math.min(100, Math.round(density)))
}

function isRunningAllowed() {
  return shouldAnimate && isPageVisible && isHeroVisible
}

function buildParticles(width, height) {
  const count = getParticleCount(width, height)
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1.2,
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.45 + 0.2,
  }))
}

function resizeCanvas() {
  if (!canvas || !ctx) return
  const container = canvas.parentElement
  if (!container) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = container.getBoundingClientRect()
  const width = Math.max(1, Math.floor(rect.width))
  const height = Math.max(1, Math.floor(rect.height))

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  buildParticles(width, height)
}

function drawFrame() {
  if (!canvas || !ctx) return
  const width = canvas.clientWidth
  const height = canvas.clientHeight

  ctx.clearRect(0, 0, width, height)

  for (const particle of particles) {
    particle.x += particle.speedX
    particle.y += particle.speedY

    if (particle.x >= width || particle.x <= 0) particle.speedX *= -1
    if (particle.y >= height || particle.y <= 0) particle.speedY *= -1

    ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function animate() {
  if (!isRunningAllowed()) {
    rafId = null
    return
  }

  drawFrame()
  rafId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (rafId !== null || !isRunningAllowed()) return
  rafId = requestAnimationFrame(animate)
}

function stopAnimation() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function onVisibilityChange() {
  isPageVisible = document.visibilityState === 'visible'
  if (isRunningAllowed()) startAnimation()
  else stopAnimation()
}

onMounted(() => {
  canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  if (!ctx) return

  shouldAnimate = !prefersReducedMotion.value
  resizeCanvas()

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
  })

  const container = canvas.parentElement
  if (container) {
    resizeObserver.observe(container)

    sectionObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = Boolean(entry?.isIntersecting)
        if (isRunningAllowed()) startAnimation()
        else stopAnimation()
      },
      { threshold: 0.02 },
    )
    sectionObserver.observe(container)
  }

  document.addEventListener('visibilitychange', onVisibilityChange)

  if (shouldAnimate) {
    startAnimation()
  } else {
    drawFrame()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
  resizeObserver?.disconnect()
  sectionObserver?.disconnect()
  stopAnimation()
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas absolute inset-0 pointer-events-none" />
</template>

<style scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
