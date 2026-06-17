<script setup>
import IconSpark from './icons/IconSpark.vue'
import IconRocket from './icons/IconRocket.vue'
import IconPeople from './icons/IconPeople.vue'
import IconBulb from './icons/IconBulb.vue'

const qualities = [
  {
    icon: IconSpark,
    title: 'Solucion creativa de problemas',
    description: 'Transformando desafios complejos en soluciones elegantes e inteligentes.',
  },
  {
    icon: IconRocket,
    title: 'Mentalidad startup',
    description: 'Ejecucion rapida, aprendizaje continuo y desarrollo enfocado en producto.',
  },
  {
    icon: IconPeople,
    title: 'Colaboracion en equipo',
    description: 'Experiencia en flujos de trabajo agiles y desarrollo colaborativo.',
  },
  {
    icon: IconBulb,
    title: 'Impulsado por la innovacion',
    description: 'Apasionado por tecnologias emergentes y construir productos con impacto.',
  },
]
</script>

<template>
  <section class="about-future section">
    <div class="section-heading centered" data-reveal>
      <p class="eyebrow">Sobre Mi</p>
      <h2>Construyendo el Futuro</h2>
      <p>
        Recien graduado en <span class="accent-blue">Desarrollo de Aplicaciones Web (DAW)</span>, ahora
        especializandome en <span class="accent-purple">IA y Analisis de Datos</span>. Combino tecnología
        full-stack disciplinada con pasion por crear productos inteligentes enfocados en el usuario que
        resuelven problemas reales.
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
          <component :is="quality.icon" class="quality-icon" />
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
