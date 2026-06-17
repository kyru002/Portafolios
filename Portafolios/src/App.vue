<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import IconSpark from './components/icons/IconSpark.vue'
import IconGithub from './components/icons/IconGithub.vue'
import IconLinkedin from './components/icons/IconLinkedin.vue'
import IconMail from './components/icons/IconMail.vue'
import AnimatedHeroBackground from './components/AnimatedHeroBackground.vue'
import StatsSection from './components/StatsSection.vue'
import SectionDivider from './components/SectionDivider.vue'
import AboutFuture from './components/AboutFuture.vue'

const CONTACT_EMAIL = 'enriqueabadromero02@gmail.com'
const DEFAULT_FALLBACK_IMAGE = '/suport-desk-4.png'

const navigation = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Tecnologías', href: '#tech' },
  { label: 'Contacto', href: '#contact' },
]

const heroFacts = ['Disponible para oportunidades', 'IA + Full Stack', 'Diseño centrado en producto']

function isFullImageProject(project) {
  return project && ['viejo-roble', 'topcon', 'ticketing-app', 'satoshi-spain'].includes(project.id)
}

const projects = [
  {
    id: 'coding-404',
    featured: true,
    category: 'Proyecto final',
    title: 'CODING 404',
    role: 'Trabajo final de grado y dirección de producto',
    description:
      'Proyecto final orientado a aumentar la motivación en el aprendizaje de programación: puntos, rachas, logros y ejercicios interactivos con feedback instantáneo.',
    stack: ['Vue', 'Node.js', 'JavaScript', 'SQL', 'Gamification'],
    ctaLive: 'https://kyru002.github.io/Coding404/',
    ctaCode: 'https://github.com/kyru002/Coding404/tree/main',
    previewTone: 'learning',
    previewImage: '/suport-desk-4.png',
    previewImageFit: 'cover',
    previewImagePosition: '50% 50%',
    metrics: [
      { label: 'Racha activa', value: '12' },
      { label: 'Lecciones', value: '248' },
      { label: 'XP hoy', value: '980' },
    ],
    panels: [
      {
        title: 'Panel de aprendizaje',
        type: 'dashboard',
      },
      {
        title: 'Ruta móvil',
        type: 'mobile',
      },
      {
        title: 'Sistema de progreso',
        type: 'progress',
      },
    ],
    bullets: [
      'Rutas de aprendizaje con dificultad progresiva',
      'Sistema de progreso pensado para retención',
      'Feedback instantáneo y bucles de recompensa',
    ],
  },
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
]

// Estado del modal para previsualizar imágenes
const modalOpen = ref(false)
const modalSrc = ref('')

function openPreview(src) {
  modalSrc.value = src
  modalOpen.value = true
}

function closePreview() {
  modalOpen.value = false
  modalSrc.value = ''
}

function onImgError(event, project) {
  const fallback = project?.previewImageFallback || DEFAULT_FALLBACK_IMAGE
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

const contactIcons = [IconGithub, IconLinkedin, IconMail]

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/kyru002' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/enrique-abad-romero-098a282bb/' },
  { label: 'Correo', href: `mailto:${CONTACT_EMAIL}` },
]

let observer
let tiltCleanup = []

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
  const tiltTargets = document.querySelectorAll('[data-tilt]')

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

  tiltTargets.forEach((target) => {
    const move = (event) => updateTilt(target, event)
    const enter = () => target.classList.add('is-tilting')
    const leave = () => {
      target.classList.remove('is-tilting')
      target.style.setProperty('--tilt-x', '0deg')
      target.style.setProperty('--tilt-y', '0deg')
      target.style.setProperty('--glow-x', '50%')
      target.style.setProperty('--glow-y', '50%')
    }

    target.addEventListener('pointermove', move)
    target.addEventListener('pointerenter', enter)
    target.addEventListener('pointerleave', leave)

    tiltCleanup.push(() => {
      target.removeEventListener('pointermove', move)
      target.removeEventListener('pointerenter', enter)
      target.removeEventListener('pointerleave', leave)
    })
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  tiltCleanup.forEach((dispose) => dispose())
  tiltCleanup = []
})
</script>

<template>
  <div class="page-shell">
    <header class="site-header" data-reveal>
      <a class="brand" href="#inicio">
        <span class="brand-mark"><IconSpark /></span>
        <span class="brand-copy">
          <strong>Kike Abad</strong>
          <small>Full Stack e IA</small>
        </span>
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <a class="header-cta button button-primary" href="#contact">Hablemos</a>
    </header>

    <main>
      <section id="inicio" class="hero section">
        <div class="hero-copy">
          <h1>Desarrollador de Aplicaciones Web</h1>
          <p class="hero-lead">
            Construyo sistemas inteligentes, interfaces centradas en producto y experiencias orientadas a datos
            para startups de IA y equipos tech exigentes.
          </p>

          <div class="hero-actions">
            <a class="button button-primary" href="#projects">Ver proyectos</a>
            <a class="button button-secondary" href="#contact">Contactar</a>
          </div>

          <div class="hero-meta">
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
            Tarjetas grandes, presentación real de producto y mockups basados en imagen para que parezcan páginas de
            lanzamiento de productos modernos.
          </p>
        </div>

        <div class="projects-stack">
          <article
            v-for="(project, index) in projects"
            :key="project.id"
            class="project-card glass-panel"
            :class="[project.featured ? 'project-featured' : 'project-standard', `theme-${project.previewTone}`]"
            data-reveal
            data-tilt
            :style="{ '--reveal-delay': `${index * 90}ms` }"
          >
            <div class="project-backdrop"></div>

            <div class="project-copy">
              <div class="project-kicker">
                <span>{{ project.category }}</span>
                <span class="project-badge">{{ project.featured ? 'Destacado' : 'Caso de estudio' }}</span>
              </div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <p class="project-role">Rol: {{ project.role }}</p>

              <div class="project-tags">
                <span v-for="tag in project.stack" :key="tag">{{ tag }}</span>
              </div>

              <div v-if="project.featured" class="project-bullets">
                <span v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</span>
              </div>

              <div class="project-actions">
                <a
                  v-if="project.ctaLive"
                  class="button button-primary button-small"
                  :href="project.ctaLive"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en vivo
                </a>
                <a
                  v-if="project.ctaCode"
                  class="button button-secondary button-small"
                  :href="project.ctaCode"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver código
                </a>
              </div>
            </div>

            <div class="project-visual" :class="project.featured ? 'project-visual-featured' : ''">
              <div class="visual-caption">
                <span>Vista previa</span>
                <strong>{{ project.title }}</strong>
              </div>

              <div v-if="project.featured" class="feature-showcase">
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

              <div v-else-if="isFullImageProject(project)" class="project-image-showcase-full">
                <figure class="project-image-hero-full">
                  <img
                    :src="project.previewImage"
                    :alt="`Vista previa de ${project.title}`"
                    loading="lazy"
                    decoding="async"
                    :style="{
                      width: '100%',
                      height: '100%',
                      objectFit: project.previewImageFit || 'cover',
                      objectPosition: project.previewImagePosition || 'center center',
                      display: 'block',
                    }"
                    @error="onImgError($event, project)"
                    @click="openPreview(project.previewImage)"
                  />
                </figure>
              </div>

              <div v-else class="project-preview-grid">
                <template v-if="project.previewImage">
                  <figure class="project-image-hero-full">
                    <img
                      :src="project.previewImage"
                      :alt="`Vista previa de ${project.title}`"
                      loading="lazy"
                      decoding="async"
                      :style="{ width: '100%', height: '100%', objectFit: project.previewImageFit || 'cover', objectPosition: project.previewImagePosition || 'center center', display: 'block' }"
                      @error="onImgError($event, project)"
                      @click="openPreview(project.previewImage)"
                    />
                  </figure>
                </template>
                <template v-else>
                  <div v-for="panel in project.panels" :key="panel.title" class="mock-card" :class="`mock-${panel.type}`">
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
        </div>
      </section>

      <SectionDivider />

      <section id="tech" class="section tech-section">
        <div class="section-heading tech-heading" data-reveal>
          <p class="eyebrow">Tecnologías</p>
          <h2>Bases de ingeniería sólidas para productos con IA y datos.</h2>
          <p>
            Mentalidad full stack, con foco en desarrollo de IA y análisis de datos sin perder la calidad de
            producto.
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