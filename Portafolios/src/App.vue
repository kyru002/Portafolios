<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import IconSpark from './components/icons/IconSpark.vue'
import IconGithub from './components/icons/IconGithub.vue'
import IconLinkedin from './components/icons/IconLinkedin.vue'
import IconMail from './components/icons/IconMail.vue'
import IconPhone from './components/icons/IconPhone.vue'
import AnimatedHeroBackground from './components/AnimatedHeroBackground.vue'
import StatsSection from './components/StatsSection.vue'
import SectionDivider from './components/SectionDivider.vue'
import AboutFuture from './components/AboutFuture.vue'

function getAssetUrl(path) {
  if (!path) return ''
  const base = import.meta.env.BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}

const CONTACT_EMAIL = 'enriqueabadromero02@gmail.com'
const DEFAULT_FALLBACK_IMAGE = getAssetUrl('/suport-desk-4.png')

const navigation = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Tecnologías', href: '#tech' },
  { label: 'Contacto', href: '#contact' },
]

const heroFacts = ['Disponible para oportunidades', 'IA + Full Stack', 'Diseño centrado en producto']

function isFullImageProject(project) {
  return project && ['viejo-roble', 'topcon', 'ticketing-app', 'satoshi-spain', 'coding-404'].includes(project.id)
}

function isCodeOnlyProject(project) {
  return project && project.codeOnly === true
}

const projects = [
  {
    id: 'viejo-roble',
    featured: false,
    category: 'Freelance',
    title: 'El Viejo Roble',
    role: 'Desarrollo full stack y UX responsive',
    description:
      'Web completa para restaurante con sistema de reservas, gestión de carta y diseño responsive. Actualmente en mantenimiento.',
    stack: ['Vue', 'Node.js', 'SQL', 'Responsive UI'],
    ctaLive: 'http://www.elviejoroblesabadell.es',
    ctaCode: 'https://github.com/kyru002/WebElViejoRoble-Portafolios',
    previewTone: 'restaurant',
    previewImage: '/el-viejo-roble-1.png',
    panels: [
      { title: 'Página principal', type: 'homepage' },
      { title: 'Página de carta', type: 'menu' },
      { title: 'UI de reservas', type: 'reservation' },
    ],
  },
  {
    id: 'coding-404',
    featured: false,
    category: 'Proyecto final',
    title: 'CODING 404',
    role: 'Trabajo final de grado y dirección de producto',
    description:
      'Proyecto final orientado a aumentar la motivación en el aprendizaje de programación: puntos, rachas, logros y ejercicios interactivos con feedback instantáneo.',
    stack: ['Vue', 'Node.js', 'JavaScript', 'SQL', 'Gamification'],
    ctaLive: 'http://51.195.43.10:5000/',
    ctaCode: 'https://github.com/kyru002/Coding404/tree/main',
    ctaPdf: '/Memoria Coding404.pdf',
    ctaPdfLabel: 'Memoria del proyecto',
    previewTone: 'learning',
    previewImage: '/image.png',
    previewImageFit: 'cover',
    previewImagePosition: '50% 50%',
  },
  {
    id: 'satoshi-spain',
    featured: false,
    category: 'Colaboración',
    title: 'Web Satoshi Spain',
    role: 'Primer proyecto profesional en equipo',
    description:
      'Desarrollo colaborativo de la web de la empresa con diseño moderno y optimización de rendimiento. Mi primer proyecto profesional en equipo.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Git'],
    ctaLive: 'https://kyru002.github.io/Satoshi-Spain/',
    ctaCode: 'https://github.com/kyru002/Satoshi-Spain',
    previewTone: 'collaboration',
    previewImage: '/satoshi-foto-1.png',
    previewImageFit: 'cover',
    previewImagePosition: '50% 50%',
  },
  {
    id: 'ticketing-app',
    featured: false,
    category: 'Proyecto de clase',
    title: 'App de Ticketing',
    role: 'Frontend + Backend (proyecto de clase)',
    description:
      'Aplicación de ticketing: creación de incidencias, asignación, seguimiento de estado y autenticación básica. Construida con Vue y Node.js.',
    stack: ['Vue', 'Node.js', 'MongoDB'],
    ctaLive: '',
    ctaCode: 'https://github.com/kyru002/SupportDesk1',
    previewTone: 'productivity',
    previewImage: '/suport-desk-1.png',
    previewImageFit: 'cover',
    previewImagePosition: '50% 50%',
    panels: [
      { title: 'Lista de incidencias', type: 'inbox' },
      { title: 'Detalle del ticket', type: 'workspace' },
      { title: 'Asignación y estado', type: 'reports' },
    ],
  },
  {
    id: 'topcon',
    featured: false,
    category: 'Aplicación empresarial',
    title: 'TopCon Reporting',
    role: 'Sistema interno de informes y colaboración',
    description:
      'Aplicación interna tipo OneNote para crear, gestionar y colaborar en informes de forma eficiente.',
    stack: ['JavaScript', 'CRUD', 'Enterprise UX', 'MongoDB'],
    ctaLive: 'https://axis-brook-34332755.figma.site',
    ctaCode: 'https://github.com/kyru002/Pruebas_Sistema_Informes',
    previewTone: 'enterprise',
    previewImage: '/sistema-informes-1.png',
    previewImageFallback: '/suport-desk-4.png',
    previewImageFit: 'cover',
    previewImagePosition: '50% 50%',
  },
  {
    id: 'wildebit',
    featured: false,
    category: 'Caso de estudio',
    title: 'Procesador Automático de Reservas',
    role: 'Desarrollo Backend e Integración de IA',
    description:
      'Automatización e IA. Proyecto desarrollado para automatizar la gestión de reservas de alojamientos. El sistema se conecta a la bandeja de entrada, procesa los correos de agencias de viajes online (OTAs) y extrae la información clave mediante Inteligencia Artificial (LLMs). Posteriormente, estructura todos estos datos en una base de datos SQLite, eliminando la necesidad de entrada manual y optimizando el flujo de trabajo.',
    stack: ['Python', 'LLMs', 'SQLite', 'Automatización'],
    ctaLive: '',
    ctaCode: 'https://github.com/kyru002/wildebit',
    previewTone: 'hackathon',
    codeOnly: true,
    codeSnippet: `// Wildebit — Procesador de Correos e IA\nimport imaplib\nimport sqlite3\nfrom llm_extractor import extract_booking_data\n\ndef process_inbox():\n    mail = connect_to_inbox()\n    emails = fetch_unread(mail)\n    \n    for email in emails:\n        # Extraer info clave usando IA\n        booking_data = extract_booking_data(email.body)\n        \n        if booking_data.is_valid:\n            save_to_sqlite(booking_data)\n            mark_as_processed(email)\n\ndef save_to_sqlite(data):\n    conn = sqlite3.connect('reservas.db')\n    conn.execute("INSERT INTO reservas VALUES (?,?,?)", \n                 (data.guest, data.dates, data.price))\n    conn.commit()`,
  },
]

// Estado del modal para previsualizar imágenes
const modalOpen = ref(false)
const modalSrc = ref('')

function openPreview(src) {
  modalSrc.value = getAssetUrl(src)
  modalOpen.value = true
}

function closePreview() {
  modalOpen.value = false
  modalSrc.value = ''
}

function onImgError(event, project) {
  const fallback = project?.previewImageFallback 
    ? getAssetUrl(project.previewImageFallback) 
    : DEFAULT_FALLBACK_IMAGE
  if (event?.target) event.target.src = fallback
}

const techStack = [
  { label: 'HTML', detail: 'Estructura semántica y bases escalables', value: 95 },
  { label: 'CSS', detail: 'Motion, glassmorphism y precisión en layout', value: 95 },
  { label: 'JavaScript', detail: 'Lógica interactiva y orquestación de UI', value: 90 },
  { label: 'Vue', detail: 'Arquitectura de componentes para interfaces modernas', value: 88 },
  { label: 'Node.js', detail: 'Servicios backend e integración de APIs', value: 84 },
  { label: 'Python', detail: 'Herramientas de IA y flujos orientados a datos', value: 82 },
  { label: 'Java', detail: 'Fundamentos sólidos de backend', value: 76 },
  { label: 'SQL', detail: 'Modelado de datos y diseño de persistencia', value: 86 },
  { label: 'Git', detail: 'Flujo de trabajo colaborativo', value: 92 },
]

const contactIcons = [IconGithub, IconLinkedin, IconMail, IconPhone]

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/kyru002' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/enrique-abad-romero-098a282bb/' },
  { label: 'Correo', href: `mailto:${CONTACT_EMAIL}` },
  { label: '619 21 12 41', href: 'tel:+34619211241' },
]

const mobileMenuOpen = ref(false)
const currentProjectIndex = ref(0)
const activeProject = computed(() => projects[currentProjectIndex.value])
const transitionName = ref('carousel-fade')

function nextSlide() {
  transitionName.value = 'carousel-slide-next'
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.length
}

function prevSlide() {
  transitionName.value = 'carousel-slide-prev'
  currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.length) % projects.length
}

// goToSlide handles indicator click slide transitions dynamically
function goToSlide(index) {
  if (index > currentProjectIndex.value) {
    transitionName.value = 'carousel-slide-next'
  } else if (index < currentProjectIndex.value) {
    transitionName.value = 'carousel-slide-prev'
  }
  currentProjectIndex.value = index
}

function handlePrev() {
  prevSlide()
}

function handleNext() {
  nextSlide()
}

function handleGoTo(index) {
  goToSlide(index)
}

function handlePointerMove(event) {
  updateTilt(event.currentTarget, event)
}

function handlePointerEnter(event) {
  event.currentTarget.classList.add('is-tilting')
}

function handlePointerLeave(event) {
  const target = event.currentTarget
  target.classList.remove('is-tilting')
  target.style.setProperty('--tilt-x', '0deg')
  target.style.setProperty('--tilt-y', '0deg')
  target.style.setProperty('--glow-x', '50%')
  target.style.setProperty('--glow-y', '50%')
}

let observer

function updateTilt(element, event) {
  const bounds = element.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  const rotateY = (x - 0.5) * 10
  const rotateX = (0.5 - y) * 10

  element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
  element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
  element.style.setProperty('--glow-x', `${(x * 100).toFixed(2)}%`)
  element.style.setProperty('--glow-y', `${(y * 100).toFixed(2)}%`)
}

onMounted(() => {
  const revealTargets = document.querySelectorAll('[data-reveal]')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px',
    },
  )

  revealTargets.forEach((target) => observer.observe(target))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="page-shell">
    <header class="site-header" data-reveal>
      <a class="brand" href="#inicio" @click="mobileMenuOpen = false">
        <span class="brand-mark brand-mark-photo">
          <img :src="getAssetUrl('/profile.png')" alt="Kike Abad" class="brand-photo" />
        </span>
        <span class="brand-copy">
          <strong>Kike Abad</strong>
          <small>Full Stack e IA</small>
        </span>
      </a>

      <button 
        class="menu-toggle" 
        @click="mobileMenuOpen = !mobileMenuOpen" 
        :aria-expanded="mobileMenuOpen" 
        aria-label="Abrir menú de navegación"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <div class="site-header-menu" :class="{ 'is-open': mobileMenuOpen }">
        <nav class="site-nav" aria-label="Main navigation">
          <a v-for="item in navigation" :key="item.href" :href="item.href" @click="mobileMenuOpen = false">{{ item.label }}</a>
        </nav>

        <a class="header-cta button button-primary" href="#contact" @click="mobileMenuOpen = false">Hablemos</a>
      </div>
    </header>

    <main>
      <section id="inicio" class="hero section">
        <div class="hero-copy">
          <h1 class="animate-stagger-1">Desarrollador de Aplicaciones Web</h1>
          <p class="hero-lead animate-stagger-2">
            Construyo sistemas inteligentes, interfaces centradas en producto y experiencias orientadas a datos
            para startups de IA y equipos tech exigentes.
          </p>

          <div class="hero-actions animate-stagger-3">
            <a class="button button-primary" href="#projects">Ver proyectos</a>
            <a class="button button-secondary" href="#contact">Contactar</a>
          </div>

          <div class="hero-meta animate-stagger-4">
            <article v-for="fact in heroFacts" :key="fact" class="hero-chip">{{ fact }}</article>
          </div>
        </div>

        <AnimatedHeroBackground />
      </section>

      <SectionDivider />
      <section id="about" class="section about-section">
        <AboutFuture />
      </section>

      <StatsSection />
      <SectionDivider />

      <section id="projects" class="section projects-section">
        <div class="section-heading projects-heading" data-reveal>
          <p class="eyebrow">Proyectos</p>
          <h2>El producto primero. Todo lo demás acompaña al trabajo.</h2>
          <p>
            Aqui os muestro los pequeños proyectos que he echo durante mi tiempo de formación .
          </p>
        </div>

        <div class="projects-carousel-container">
          <button class="carousel-arrow prev-arrow" @click="handlePrev" aria-label="Proyecto anterior">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
          </button>

          <div class="projects-carousel-track">
            <transition :name="transitionName" mode="out-in">
              <article
                :key="activeProject.id"
                class="project-card glass-panel"
                :class="[activeProject.featured ? 'project-featured' : 'project-standard', `theme-${activeProject.previewTone}`]"
                @pointermove="handlePointerMove"
                @pointerenter="handlePointerEnter"
                @pointerleave="handlePointerLeave"
              >
                <div class="project-backdrop"></div>

                <div class="project-copy">
                  <div class="project-kicker">
                    <span>{{ activeProject.category }}</span>
                    <span class="project-badge">{{ activeProject.featured ? 'Destacado' : 'Caso de estudio' }}</span>
                  </div>
                  <h3>{{ activeProject.title }}</h3>
                  <p>{{ activeProject.description }}</p>
                  <p class="project-role">Rol: {{ activeProject.role }}</p>

                  <div class="project-tags">
                    <span v-for="tag in activeProject.stack" :key="tag">{{ tag }}</span>
                  </div>

                  <div v-if="activeProject.featured" class="project-bullets">
                    <span v-for="bullet in activeProject.bullets" :key="bullet">{{ bullet }}</span>
                  </div>

                  <div class="project-actions">
                    <a
                      v-if="activeProject.ctaLive"
                      class="button button-primary button-small"
                      :href="activeProject.ctaLive"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver en vivo
                    </a>
                    <a
                      v-if="activeProject.ctaCode"
                      class="button button-secondary button-small"
                      :href="activeProject.ctaCode"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver código
                    </a>
                    <a
                      v-if="activeProject.ctaPdf"
                      class="button button-secondary button-small button-pdf"
                      :href="getAssetUrl(activeProject.ctaPdf)"
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      📄 {{ activeProject.ctaPdfLabel || 'Descargar PDF' }}
                    </a>
                  </div>
                </div>

                <div class="project-visual" :class="activeProject.featured ? 'project-visual-featured' : ''">
                  <div class="visual-caption">
                    <span>Vista previa</span>
                    <strong>{{ activeProject.title }}</strong>
                  </div>

                  <div v-if="activeProject.featured" class="feature-showcase">
                    <div class="feature-large mock-screen">
                      <div class="mock-topbar">
                        <span></span><span></span><span></span>
                      </div>
                      <div class="mock-dashboard">
                        <div class="mock-sidebar">
                          <span class="mock-pill active">Panel</span>
                          <span class="mock-pill">Rutas</span>
                          <span class="mock-pill">Progreso</span>
                          <span class="mock-pill">Retos</span>
                        </div>
                        <div class="mock-main">
                          <div class="mock-hero-panel">
                            <strong>Programación que engancha</strong>
                            <p>Aprende haciendo, sube de nivel rápido y gana inercia con cada lección.</p>
                          </div>
                          <div class="mock-card-row">
                            <span class="mock-mini-card">Racha</span>
                            <span class="mock-mini-card">Objetivo</span>
                            <span class="mock-mini-card">Logros</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="feature-phone mock-phone">
                      <div class="phone-notch"></div>
                      <div class="phone-stack">
                        <span class="phone-card">Ruta 04</span>
                        <span class="phone-card highlight">+120 XP</span>
                        <span class="phone-card">Feedback instantáneo</span>
                      </div>
                    </div>
                    <div class="feature-side">
                      <div class="feature-figure">
                        <span class="feature-ring"></span>
                        <strong>Sistema de progreso</strong>
                        <small>Bucles de gamificación</small>
                      </div>
                      <div class="feature-list">
                        <span>Onboarding y diseño de retención</span>
                        <span>Microcopy y flujo de motivación</span>
                        <span>Product thinking sobre hábitos</span>
                      </div>
                    </div>
                  </div>

                  <div v-else-if="isCodeOnlyProject(activeProject)" class="project-code-showcase">
                    <div class="code-window">
                      <div class="code-window-topbar">
                        <span class="code-dot red"></span>
                        <span class="code-dot yellow"></span>
                        <span class="code-dot green"></span>
                        <span class="code-window-title">main.js</span>
                      </div>
                      <pre class="code-block"><code>{{ activeProject.codeSnippet }}</code></pre>
                    </div>
                  </div>

                  <div v-else-if="isFullImageProject(activeProject)" class="project-image-showcase-full">
                    <figure class="project-image-hero-full">
                      <img
                        :src="getAssetUrl(activeProject.previewImage)"
                        :alt="`Vista previa de ${activeProject.title}`"
                        loading="lazy"
                        decoding="async"
                        :style="{
                          width: '100%',
                          height: '100%',
                          objectFit: activeProject.previewImageFit || 'cover',
                          objectPosition: activeProject.previewImagePosition || 'center center',
                          display: 'block',
                        }"
                        @error="onImgError($event, activeProject)"
                        @click="openPreview(activeProject.previewImage)"
                      />
                    </figure>
                  </div>

                  <div v-else class="project-preview-grid">
                    <template v-if="activeProject.previewImage">
                      <figure class="project-image-hero-full">
                        <img
                          :src="getAssetUrl(activeProject.previewImage)"
                          :alt="`Vista previa de ${activeProject.title}`"
                          loading="lazy"
                          decoding="async"
                          :style="{ width: '100%', height: '100%', objectFit: activeProject.previewImageFit || 'cover', objectPosition: activeProject.previewImagePosition || 'center center', display: 'block' }"
                          @error="onImgError($event, activeProject)"
                          @click="openPreview(activeProject.previewImage)"
                        />
                      </figure>
                    </template>
                    <template v-else>
                      <div v-for="panel in activeProject.panels" :key="panel.title" class="mock-card" :class="`mock-${panel.type}`">
                        <div class="mock-label">{{ panel.title }}</div>
                        <div class="mock-frame">
                          <template v-if="panel.type === 'homepage'">
                            <div class="mock-hero-strip"></div>
                            <div class="mock-content-grid">
                              <span></span><span></span><span></span>
                            </div>
                          </template>
                          <template v-else-if="panel.type === 'menu'">
                            <div class="mock-menu-line wide"></div>
                            <div class="mock-menu-line"></div>
                            <div class="mock-menu-line"></div>
                            <div class="mock-menu-line short"></div>
                          </template>
                          <template v-else-if="panel.type === 'reservation'">
                            <div class="mock-reserve-calendar"></div>
                            <div class="mock-button-row">
                              <span></span><span></span>
                            </div>
                          </template>
                          <template v-else-if="panel.type === 'inbox'">
                            <div class="mock-mail-header"></div>
                            <div class="mock-mail-list">
                              <span v-for="index in 3" :key="index"></span>
                            </div>
                          </template>
                          <template v-else-if="panel.type === 'filters'">
                            <div class="mock-filter-chip-row">
                              <span></span><span></span><span></span>
                            </div>
                            <div class="mock-automation-graph"></div>
                          </template>
                          <template v-else-if="panel.type === 'categories'">
                            <div class="mock-category-list">
                              <span></span><span></span><span></span>
                            </div>
                          </template>
                          <template v-else-if="panel.type === 'workspace'">
                            <div class="mock-workspace-header"></div>
                            <div class="mock-workspace-grid">
                              <span></span><span></span><span></span>
                            </div>
                          </template>
                          <template v-else-if="panel.type === 'notes'">
                            <div class="mock-note-lines">
                              <span></span><span></span><span></span><span></span>
                            </div>
                          </template>
                          <template v-else-if="panel.type === 'reports'">
                            <div class="mock-report-card"></div>
                            <div class="mock-report-bars">
                              <span></span><span></span><span></span>
                            </div>
                          </template>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </article>
            </transition>
          </div>

          <button class="carousel-arrow next-arrow" @click="handleNext" aria-label="Siguiente proyecto">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div class="carousel-indicators">
          <button
            v-for="(proj, idx) in projects"
            :key="proj.id"
            class="indicator-dot"
            :class="{ active: idx === currentProjectIndex }"
            @click="handleGoTo(idx)"
            :aria-label="'Ver proyecto ' + proj.title"
          ></button>
        </div>
      </section>

      <SectionDivider />

      <section id="tech" class="section tech-section">
        <div class="section-heading tech-heading" data-reveal>
          <p class="eyebrow">Tecnologías</p>
          <h2>Conocimentos como dessarrollador web Full Stack </h2>
          <p>
            Mentalidad full stack, con foco en desarrollo de IA y análisis de datos.
          </p>
        </div>

        <div class="tech-grid">
          <article v-for="skill in techStack" :key="skill.label" class="tech-card glass-panel" data-reveal>
            <div class="tech-card-top">
              <strong>{{ skill.label }}</strong>
              <span>{{ skill.value }}%</span>
            </div>
            <p>{{ skill.detail }}</p>
            <div class="tech-meter">
              <span :style="{ width: `${skill.value}%` }"></span>
            </div>
          </article>
        </div>
      </section>

      <SectionDivider />

      <section id="contact" class="section contact-section">
        <div class="contact-card glass-panel" data-reveal>
          <div>
            <p class="eyebrow">Contacto</p>
            <h2>Construyamos algo juntos.</h2>
            <p>
              Abierto a startups de IA, equipos SaaS modernos, proyectos freelance y oportunidades remotas.
            </p>
          </div>

          <div class="contact-links">
            <a v-for="(link, index) in contactLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">
              <component :is="contactIcons[index]" class="contact-icon" />
              <span class="contact-label">{{ link.label }}</span>
            </a>
          </div>

          <a class="button button-primary" :href="`mailto:${CONTACT_EMAIL}`">Escríbeme</a>
        </div>
      </section>
    </main>

    <footer class="site-footer" data-reveal>
      <p>Portfolio de IA</p>
      <div class="footer-motion">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </footer>
    <div v-if="modalOpen" class="image-modal" @click.self="closePreview">
      <img :src="modalSrc" :alt="'Vista previa de ' + modalSrc" />
    </div>
  </div>
</template>