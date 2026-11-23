<script setup>
import { ref } from 'vue'
import AboutFuture from './components/AboutFuture.vue'
import ContactSection from './components/ContactSection.vue'
import HeroSection from './components/HeroSection.vue'
import ImageModal from './components/ImageModal.vue'
import ProjectCarousel from './components/ProjectCarousel.vue'
import SectionDivider from './components/SectionDivider.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import StatsSection from './components/StatsSection.vue'
import TechSection from './components/TechSection.vue'
import { useReveal } from './composables/useReveal'
import { projects } from './data/projects'
import { techCategories, techCount } from './data/tech'

const navigation = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Tecnologías', href: '#tech' },
  { label: 'Contacto', href: '#contact' },
]

const heroFacts = ['Disponible para oportunidades', 'Full Stack: Vue y Node.js', 'Interés en IA y datos']
const modalOpen = ref(false)
const modalSrc = ref('')
const modalAlt = ref('Vista previa del proyecto')

function openPreview(src, alt) {
  modalSrc.value = src
  modalAlt.value = alt || 'Vista previa del proyecto'
  modalOpen.value = true
}

function closePreview() {
  modalOpen.value = false
}

function onImgError(event) {
  if (event?.target) event.target.src = '/ticketing-app.webp'
}

useReveal()
</script>

<template>
  <a class="skip-link" href="#contenido-principal">Saltar al contenido</a>
  <div class="page-shell">
    <SiteHeader :navigation="navigation" />
    <main id="contenido-principal">
      <HeroSection :hero-facts="heroFacts" />
      <SectionDivider />
      <section id="about" class="section about-section"><AboutFuture /></section>
      <StatsSection :tech-count="techCount" :project-count="projects.length" />
      <SectionDivider />
      <ProjectCarousel :projects="projects" @open-preview="openPreview" @img-error="onImgError" />
      <SectionDivider />
      <TechSection :categories="techCategories" />
      <SectionDivider />
      <ContactSection />
    </main>
    <SiteFooter />
    <ImageModal :open="modalOpen" :src="modalSrc" :alt="modalAlt" @close="closePreview" />
  </div>
</template>
