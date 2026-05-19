<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import IconSpark from './components/icons/IconSpark.vue'
import IconGithub from './components/icons/IconGithub.vue'
import IconLinkedin from './components/icons/IconLinkedin.vue'
import IconMail from './components/icons/IconMail.vue'
import AnimatedHeroBackground from './components/AnimatedHeroBackground.vue'
import StatsSection from './components/StatsSection.vue'
import SectionDivider from './components/SectionDivider.vue'
import AboutFuture from './components/AboutFuture.vue'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Technologies', href: '#tech' },
  { label: 'Contact', href: '#contact' },
]

const heroFacts = ['Available for opportunities', 'AI + Full Stack', 'Product-first design']

const projects = [
  {
    id: 'coding-404',
    featured: true,
    category: 'Final Project',
    title: 'CODING 404',
    role: 'Degree capstone and product direction',
    description:
      'Capstone project that tackles low engagement in traditional programming education. Full points, streaks, achievements and interactive exercises with instant feedback.',
    stack: ['Vue', 'Node.js', 'JavaScript', 'SQL', 'Gamification'],
    ctaLive: 'https://coding404.demo.com',
    ctaCode: 'https://github.com/tuusuario/coding404',
    previewTone: 'learning',
    metrics: [
      { label: 'Active streak', value: '12' },
      { label: 'Lessons', value: '248' },
      { label: 'XP today', value: '980' },
    ],
    panels: [
      {
        title: 'Learning dashboard',
        type: 'dashboard',
      },
      {
        title: 'Mobile route',
        type: 'mobile',
      },
      {
        title: 'Progress system',
        type: 'progress',
      },
    ],
    bullets: [
      'Learning paths with progressive difficulty',
      'Progression system designed for retention',
      'Instant feedback and reward loops',
    ],
  },
  {
    id: 'viejo-roble',
    featured: false,
    category: 'Freelance',
    title: 'El Viejo Roble',
    role: 'Full stack development and responsive UX',
    description:
      'Complete restaurant website with reservation system, menu management and responsive design. Currently under maintenance.',
    stack: ['Vue', 'Node.js', 'SQL', 'Responsive UI'],
    ctaLive: 'https://elviejoroble.es',
    ctaCode: 'https://github.com/tuusuario/el-viejo-roble',
    previewTone: 'restaurant',
    panels: [
      { title: 'Homepage', type: 'homepage' },
      { title: 'Menu page', type: 'menu' },
      { title: 'Reservation system UI', type: 'reservation' },
    ],
  },
  {
    id: 'wildebit',
    featured: false,
    category: 'Hackathon',
    title: 'Email Manager AI',
    role: 'AI automation and productivity',
    description:
      'Intelligent email manager using AI APIs to filter and organize messages automatically. Built during the Wildebit hackathon.',
    stack: ['Python', 'AI', 'APIs', 'Automation'],
    ctaLive: 'https://example.com',
    ctaCode: 'https://github.com/tuusuario/ai-email-manager',
    previewTone: 'productivity',
    panels: [
      { title: 'Smart inbox', type: 'inbox' },
      { title: 'AI filters', type: 'filters' },
      { title: 'Email categories', type: 'categories' },
    ],
  },
  {
    id: 'topcon',
    featured: false,
    category: 'Enterprise Application',
    title: 'TopCon Reporting',
    role: 'Internal reporting and collaboration system',
    description:
      'Internal reporting app similar to OneNote that enables employees to create, manage and collaborate on reports efficiently.',
    stack: ['JavaScript', 'CRUD', 'Enterprise UX', 'SQL'],
    ctaLive: 'https://example.com',
    ctaCode: 'https://github.com/tuusuario/topcon-reporting',
    previewTone: 'enterprise',
    panels: [
      { title: 'Workspace dashboard', type: 'workspace' },
      { title: 'Notes interface', type: 'notes' },
      { title: 'Report system', type: 'reports' },
    ],
  },
  {
    id: 'satoshi-spain',
    featured: false,
    category: 'Collaboration',
    title: 'Satoshi Spain Website',
    role: 'First professional team project',
    description:
      'Collaborative development of the company website with modern design and performance optimization. My first professional team project.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Git'],
    ctaLive: 'https://satoshispain.com',
    ctaCode: 'https://github.com/tuusuario/satoshi-spain',
    previewTone: 'collaboration',
    panels: [
      { title: 'Landing', type: 'homepage' },
      { title: 'Responsive blocks', type: 'menu' },
      { title: 'Performance', type: 'workspace' },
    ],
  },
]

const techStack = [
  { label: 'HTML', detail: 'Semantic structure and scalable foundations', value: 95 },
  { label: 'CSS', detail: 'Motion systems, glassmorphism, layout precision', value: 95 },
  { label: 'JavaScript', detail: 'Interactive product logic and UI orchestration', value: 90 },
  { label: 'Vue', detail: 'Component architecture for modern interfaces', value: 88 },
  { label: 'Node.js', detail: 'Backend services and API integration', value: 84 },
  { label: 'Python', detail: 'AI tooling and data-oriented workflows', value: 82 },
  { label: 'Java', detail: 'Strong backend fundamentals', value: 76 },
  { label: 'SQL', detail: 'Data modeling and persistence design', value: 86 },
  { label: 'Git', detail: 'Collaborative engineering workflow', value: 92 },
]

const contactIcons = [IconGithub, IconLinkedin, IconMail]

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/tuusuario' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tuperfil' },
  { label: 'Email', href: 'mailto:tu.email@ejemplo.com' },
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
          <small>Full Stack & AI</small>
        </span>
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <a class="header-cta button button-primary" href="#contact">Let's Talk</a>
    </header>

    <main>
      <section id="inicio" class="hero section">
        <div class="hero-copy">
          <h1>Wel Application Developer</h1>
          <p class="hero-lead">
            Building intelligent systems, product-first interfaces, and data-aware experiences for modern AI
            startups and high-end tech teams.
          </p>

          <div class="hero-actions">
            <a class="button button-primary" href="#projects">View Projects</a>
            <a class="button button-secondary" href="#contact">Contact Me</a>
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
          <p class="eyebrow">Projects</p>
          <h2>Product showcase first. Everything else supports the work.</h2>
          <p>
            Large cards, real product presentation, and image-driven mockups designed to look like launch pages for
            modern AI and SaaS products.
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
                <span class="project-badge">{{ project.featured ? 'Featured' : 'Case Study' }}</span>
              </div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <p class="project-role">Role: {{ project.role }}</p>

              <div class="project-tags">
                <span v-for="tag in project.stack" :key="tag">{{ tag }}</span>
              </div>

              <div v-if="project.featured" class="project-bullets">
                <span v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</span>
              </div>

              <div class="project-actions">
                <a class="button button-primary button-small" :href="project.ctaLive" target="_blank" rel="noreferrer">View Live</a>
                <a class="button button-secondary button-small" :href="project.ctaCode" target="_blank" rel="noreferrer">View Code</a>
              </div>
            </div>

            <div class="project-visual" :class="project.featured ? 'project-visual-featured' : ''">
              <div class="visual-caption">
                <span>Visual preview</span>
                <strong>{{ project.title }}</strong>
              </div>

              <div v-if="project.featured" class="feature-showcase">
                <div class="feature-large mock-screen">
                  <div class="mock-topbar">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="mock-dashboard">
                    <div class="mock-sidebar">
                      <span class="mock-pill active">Dashboard</span>
                      <span class="mock-pill">Learning Paths</span>
                      <span class="mock-pill">Progress</span>
                      <span class="mock-pill">Challenges</span>
                    </div>
                    <div class="mock-main">
                      <div class="mock-hero-panel">
                        <strong>Programming made addictive</strong>
                        <p>Learn by doing, level up fast, and feel momentum with every lesson.</p>
                      </div>
                      <div class="mock-card-row">
                        <span class="mock-mini-card">XP streak</span>
                        <span class="mock-mini-card">Daily goal</span>
                        <span class="mock-mini-card">Badge unlocks</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="feature-phone mock-phone">
                  <div class="phone-notch"></div>
                  <div class="phone-stack">
                    <span class="phone-card">Path 04</span>
                    <span class="phone-card highlight">+120 XP</span>
                    <span class="phone-card">Instant feedback</span>
                  </div>
                </div>
                <div class="feature-side">
                  <div class="feature-figure">
                    <span class="feature-ring"></span>
                    <strong>Progress system</strong>
                    <small>Gamification loops</small>
                  </div>
                  <div class="feature-list">
                    <span>Onboarding and retention design</span>
                    <span>Microcopy and motivation flow</span>
                    <span>Product thinking around habit formation</span>
                  </div>
                </div>
              </div>

              <div v-else class="project-preview-grid">
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
              </div>
            </div>
          </article>
        </div>
      </section>

      <SectionDivider />

      <section id="tech" class="section tech-section">
        <div class="section-heading tech-heading" data-reveal>
          <p class="eyebrow">Tech Stack</p>
          <h2>Elegant engineering foundations for AI and data-driven products.</h2>
          <p>
            Full stack engineering mindset, with a clear path toward AI development and Data Analysis while keeping
            product quality at the center.
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
            <p class="eyebrow">Contact</p>
            <h2>Let’s build something together.</h2>
            <p>
              Open to AI startups, modern SaaS teams, freelance premium clients, and remote international roles.
            </p>
          </div>

          <div class="contact-links">
            <a v-for="(link, index) in contactLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">
              <component :is="contactIcons[index]" class="contact-icon" />
              <span class="contact-label">{{ link.label }}</span>
            </a>
          </div>

          <a class="button button-primary" href="mailto:tu.email@ejemplo.com">Let’s build something together</a>
        </div>
      </section>
    </main>

    <footer class="site-footer" data-reveal>
      <p>AI Engineer Portfolio</p>
      <div class="footer-motion">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </footer>
  </div>
</template>