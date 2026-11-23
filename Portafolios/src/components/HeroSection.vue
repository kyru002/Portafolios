<script setup>
import AnimatedHeroBackground from './AnimatedHeroBackground.vue'

defineProps({
  heroFacts: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section id="inicio" class="hero section">
    <div class="hero-copy">
      <h1 class="animate-stagger-1">Desarrollador Full Stack Junior</h1>
      <p class="hero-lead animate-stagger-2">
        Recién graduado en DAW, construyo aplicaciones web completas con foco en producto.
        Trabajo desde el frontend hasta la base de datos.
      </p>

      <div class="hero-actions animate-stagger-3">
        <a class="button button-primary" href="#projects">Ver proyectos</a>
        <a class="button button-secondary" href="/cv-enrique-abad.pdf" download>
          Descargar CV
        </a>
      </div>

      <div class="hero-meta animate-stagger-4">
        <article v-for="fact in heroFacts" :key="fact" class="hero-chip">{{ fact }}</article>
      </div>
    </div>

    <AnimatedHeroBackground />
  </section>
</template>
