<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import IconTooling from './icons/IconTooling.vue'
import IconRocket from './icons/IconRocket.vue'
import IconSupport from './icons/IconSupport.vue'
import IconGithub from './icons/IconGithub.vue'

const sectionRef = ref(null)
const counters = ref([0, 0, 0, 0])

const stats = [
  {
    icon: IconTooling,
    value: 8,
    suffix: '+',
    label: 'Tecnologias dominadas',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: IconRocket,
    value: 5,
    suffix: '+',
    label: 'Proyectos reales',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    icon: IconSupport,
    value: 1,
    suffix: '',
    label: 'Hackathon',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  {
    icon: IconGithub,
    value: 100,
    suffix: '+',
    label: 'Commits en Git',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
]

let observer
let rafId = null

function runCounters() {
  const start = performance.now()
  const duration = 2200

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = t * (2 - t)

    counters.value = stats.map((s) => Math.round(s.value * eased))

    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    }
  }

  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounters()
          observer?.disconnect()
        }
      })
    },
    { threshold: 0.45 },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <section ref="sectionRef" class="stats-section section">
    <div class="stats-wrap">
      <div class="stats-grid">
        <article v-for="(stat, index) in stats" :key="stat.label" class="stat-card glass-panel" data-reveal>
          <div class="stat-glow" :style="{ background: stat.gradient }" />

          <div class="stat-icon-ring" :style="{ background: stat.gradient }">
            <div class="stat-icon-core">
              <component :is="stat.icon" class="stat-icon" />
            </div>
          </div>

          <p class="stat-value">
            {{ counters[index] }}<span class="stat-suffix">{{ stat.suffix }}</span>
          </p>
          <p class="stat-label">{{ stat.label }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  position: relative;
  padding-top: 36px;
  margin-top: 48px;
  overflow: visible;
}

.stats-wrap {
  width: min(1100px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.stat-card {
  padding: 24px 18px;
  text-align: center;
  border-radius: 20px;
  transition: transform 320ms cubic-bezier(.2,.9,.28,1), box-shadow 320ms ease, border-color 320ms ease;
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 24px 70px rgba(8, 10, 18, 0.44);
}

.stat-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 320ms ease;
  filter: blur(20px);
}

.stat-card:hover .stat-glow {
  opacity: 0.08;
}

.stat-icon-ring {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  padding: 1px;
  display: inline-grid;
  place-items: center;
  margin-bottom: 14px;
}

.stat-icon-core {
  width: 100%;
  height: 100%;
  border-radius: 13px;
  background: #0a0a0f;
  display: grid;
  place-items: center;
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: #f5f8ff;
}

.stat-value {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1;
  color: #ffffff;
}

.stat-suffix {
  color: #d9e4fb;
}

.stat-label {
  margin: 10px 0 0;
  font-size: 0.9rem;
  color: #b9c8e8;
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
