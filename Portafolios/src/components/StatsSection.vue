<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'

const props = defineProps({
  techCount: {
    type: Number,
    required: true,
  },
  projectCount: {
    type: Number,
    required: true,
  },
})

const sectionRef = ref(null)
const counters = ref([0, 0, 0, 0])
const { prefersReducedMotion } = usePrefersReducedMotion()

function createStats() {
  return [
  {
    key: 'tooling',
    value: props.techCount,
    suffix: '+',
    label: 'Tecnologías que uso',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    key: 'projects',
    value: props.projectCount,
    suffix: '+',
    label: 'Proyectos publicados',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    key: 'hackathon',
    value: 1,
    suffix: '',
    label: 'Hackathon',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  {
    key: 'commits',
    value: 180,
    suffix: '+',
    label: 'Commits en GitHub [COMPLETAR: confirmar cifra real]',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
]
}

const stats = createStats()

let observer
let rafId = null

function runCounters() {
  if (prefersReducedMotion.value) {
    counters.value = stats.map((s) => s.value)
    return
  }

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
              <svg
                v-if="stat.key === 'tooling'"
                class="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4L14 13l-3-3 3.7-3.7Z" />
              </svg>
              <svg
                v-else-if="stat.key === 'projects'"
                class="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12h16" />
                <path d="M12 4v16" />
                <path d="M4 7h16" />
                <path d="M4 17h16" />
              </svg>
              <svg
                v-else-if="stat.key === 'hackathon'"
                class="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
                <path d="M17 6h2a2 2 0 0 1 0 4h-2" />
                <path d="M7 6H5a2 2 0 0 0 0 4h2" />
              </svg>
              <svg
                v-else
                class="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3" />
                <path d="M15 22v-3.9a3.4 3.4 0 0 0-.94-2.65c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.62 6.44 7A3.4 3.4 0 0 0 9 18.1V22" />
              </svg>
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
