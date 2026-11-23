<script setup>
import { computed, ref } from 'vue'
import { useTilt } from '../composables/useTilt'
import { usePrefersReducedMotion } from '../composables/usePrefersReducedMotion'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['open-preview', 'img-error'])
const currentProjectIndex = ref(0)
const transitionName = ref('carousel-fade')
const { updateTilt, resetTilt } = useTilt()
const { prefersReducedMotion } = usePrefersReducedMotion()

let touchStartX = 0
let touchCurrentX = 0

const activeProject = computed(() => props.projects[currentProjectIndex.value])

function nextSlide() {
  transitionName.value = 'carousel-slide-next'
  currentProjectIndex.value = (currentProjectIndex.value + 1) % props.projects.length
}

function prevSlide() {
  transitionName.value = 'carousel-slide-prev'
  currentProjectIndex.value = (currentProjectIndex.value - 1 + props.projects.length) % props.projects.length
}

function goToSlide(index) {
  if (index > currentProjectIndex.value) {
    transitionName.value = 'carousel-slide-next'
  } else if (index < currentProjectIndex.value) {
    transitionName.value = 'carousel-slide-prev'
  }
  currentProjectIndex.value = index
}

function onPointerMove(event) {
  if (prefersReducedMotion.value) return
  updateTilt(event.currentTarget, event)
}

function onPointerEnter(event) {
  if (prefersReducedMotion.value) return
  event.currentTarget.classList.add('is-tilting')
}

function onPointerLeave(event) {
  const target = event.currentTarget
  target.classList.remove('is-tilting')
  resetTilt(target)
}

function onKeydown(event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prevSlide()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    nextSlide()
  }
}

function onTouchStart(event) {
  touchStartX = event.changedTouches[0].clientX
  touchCurrentX = touchStartX
}

function onTouchMove(event) {
  touchCurrentX = event.changedTouches[0].clientX
}

function onTouchEnd() {
  const delta = touchCurrentX - touchStartX
  if (Math.abs(delta) < 40) return
  if (delta < 0) {
    nextSlide()
  } else {
    prevSlide()
  }
}
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="section-heading projects-heading" data-reveal>
      <p class="eyebrow">Proyectos</p>
      <h2>El producto primero. Todo lo demás acompaña al trabajo.</h2>
      <p>
        Aquí muestro los proyectos que he hecho durante mi formación y mis primeras experiencias profesionales.
      </p>
    </div>

    <div
      class="projects-carousel-container"
      role="region"
      aria-label="Carrusel de proyectos"
      aria-roledescription="carrusel"
      tabindex="0"
      @keydown="onKeydown"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend.passive="onTouchEnd"
    >
      <div class="projects-carousel-track">
        <transition :name="transitionName" mode="out-in">
          <div :key="activeProject.id" aria-live="polite">
            <ProjectCard
              :project="activeProject"
              @open-preview="emit('open-preview', ...$event)"
              @img-error="emit('img-error', ...$event)"
              @pointer-move="onPointerMove"
              @pointer-enter="onPointerEnter"
              @pointer-leave="onPointerLeave"
            />
          </div>
        </transition>
      </div>

      <div class="carousel-controls">
        <button class="carousel-arrow" type="button" @click="prevSlide" aria-label="Proyecto anterior">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
          </svg>
        </button>
        <button class="carousel-arrow" type="button" @click="nextSlide" aria-label="Siguiente proyecto">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>

    <div class="carousel-indicators" role="tablist" aria-label="Selector de proyectos">
      <button
        v-for="(proj, idx) in props.projects"
        :key="proj.id"
        class="indicator-dot"
        :class="{ active: idx === currentProjectIndex }"
        :aria-label="'Ver proyecto ' + proj.title"
        :aria-current="idx === currentProjectIndex ? 'true' : 'false'"
        @click="goToSlide(idx)"
      ></button>
    </div>
  </section>
</template>
