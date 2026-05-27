<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles = []
  const particleCount = 100

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.opacity = Math.random() * 0.5 + 0.2
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1
    }
    draw() {
      ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle())

  let rafId
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach((p) => {
      p.update()
      p.draw()
    })
    rafId = requestAnimationFrame(animate)
  }
  animate()

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(rafId)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas absolute inset-0 pointer-events-none" />
</template>

<style scoped>
.particle-canvas {
  width: 100%;
  height: 100%;
}
</style>
