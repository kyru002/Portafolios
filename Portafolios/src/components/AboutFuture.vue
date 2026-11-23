<script setup>
const qualities = [
  {
    key: 'problemas',
    title: 'Resolución de problemas',
    description: 'Divido los problemas en partes pequeñas y construyo soluciones simples y mantenibles.',
  },
  {
    key: 'aprendizaje',
    title: 'Aprendizaje continuo',
    description: 'Aprendo rápido y lo practico en proyectos reales: web, bases de datos y automatización.',
  },
  {
    key: 'equipo',
    title: 'Trabajo en equipo',
    description: 'Experiencia en desarrollo colaborativo con Git, en proyectos de empresa y de clase.',
  },
  {
    key: 'ia',
    title: 'Interés por la IA',
    description:
      'Estoy aprendiendo IA y análisis de datos y los aplico en pequeños proyectos, como la automatización de reservas con LLMs.',
  },
]
</script>

<template>
  <section class="about-future section">
    <div class="section-heading centered" data-reveal>
      <p class="eyebrow">Sobre mí</p>
      <h2>Quién soy</h2>
      <p>
        Recién graduado en <span class="accent-blue">Desarrollo de Aplicaciones Web (DAW)</span>, con interés en
        <span class="accent-purple">IA y análisis de datos</span>, que sigo aprendiendo. Combino tecnología
        full stack con foco en crear productos útiles para problemas reales.
      </p>
    </div>

    <div class="qualities-grid">
      <article
        v-for="(quality, index) in qualities"
        :key="quality.title"
        class="quality-card glass-panel"
        data-reveal
        :style="{ '--reveal-delay': `${index * 100}ms` }"
      >
        <div class="quality-hover" />

        <div class="quality-icon-wrap">
          <svg
            v-if="quality.key === 'problemas'"
            class="quality-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M15.39 10.39a2.4 2.4 0 0 0 0 3.22l.38.38a2.4 2.4 0 0 1 0 3.4l-.38.38a2.4 2.4 0 0 0 0 3.22" />
            <path d="M8.61 10.39a2.4 2.4 0 0 1 0 3.22l-.38.38a2.4 2.4 0 0 0 0 3.4l.38.38a2.4 2.4 0 0 1 0 3.22" />
            <path d="M12 2v3" />
            <path d="M5 5l2.1 2.1" />
            <path d="M19 5l-2.1 2.1" />
            <path d="M7.5 8.5h9" />
            <path d="M10 14h4" />
          </svg>
          <svg
            v-else-if="quality.key === 'aprendizaje'"
            class="quality-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M22 10v6" />
            <path d="M2 10v6" />
            <path d="m12 3 10 5-10 5L2 8l10-5Z" />
            <path d="M6 12v5c0 1.2 2.7 2.3 6 2.3s6-1.1 6-2.3v-5" />
          </svg>
          <svg
            v-else-if="quality.key === 'equipo'"
            class="quality-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6" />
            <path d="M23 11h-6" />
          </svg>
          <svg
            v-else
            class="quality-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9.5 9a2.5 2.5 0 1 1 5 0c0 1.2-.64 1.9-1.36 2.48-.62.5-1.14.95-1.14 1.52" />
            <path d="M12 17h.01" />
            <path d="M7 3h10l4 7-4 7H7l-4-7 4-7Z" />
          </svg>
        </div>

        <h3>{{ quality.title }}</h3>
        <p>{{ quality.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.about-future {
  display: grid;
  gap: 28px;
}

.centered {
  margin: 0 auto;
  text-align: center;
}

.accent-blue {
  color: #60a5fa;
  font-weight: 600;
}

.accent-purple {
  color: #c084fc;
  font-weight: 600;
}

.qualities-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.quality-card {
  position: relative;
  padding: 22px;
  overflow: hidden;
  transition: transform 320ms cubic-bezier(.2,.9,.28,1), border-color 320ms ease, box-shadow 320ms ease;
}

.quality-card:hover {
  transform: translateY(-5px) scale(1.015);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 18px 50px rgba(8, 12, 24, 0.34);
}

.quality-hover {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(59,130,246,0), rgba(139,92,246,0));
  transition: background 320ms ease;
}

.quality-card:hover .quality-hover {
  background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08));
}

.quality-icon-wrap {
  position: relative;
  z-index: 1;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2));
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  transition: transform 300ms ease;
}

.quality-card:hover .quality-icon-wrap {
  transform: scale(1.08);
}

.quality-icon {
  width: 24px;
  height: 24px;
  color: #7dd3fc;
}

.quality-card h3,
.quality-card p {
  position: relative;
  z-index: 1;
}

.quality-card h3 {
  margin: 0 0 8px;
  color: #f5f8ff;
  font-size: 1.16rem;
}

.quality-card p {
  margin: 0;
  color: var(--muted);
}

.about-quote {
  padding: 26px;
  text-align: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08));
}

.about-quote p {
  margin: 0;
  color: #cfd9ef;
}

.quote-accent {
  font-weight: 700;
  background: linear-gradient(90deg, #60a5fa, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (max-width: 900px) {
  .qualities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
