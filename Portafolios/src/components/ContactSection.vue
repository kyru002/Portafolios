<script setup>
import IconGithub from './icons/IconGithub.vue'
import IconLinkedin from './icons/IconLinkedin.vue'
import IconMail from './icons/IconMail.vue'

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/kyru002',
    icon: IconGithub,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/enrique-abad-romero-098a282bb/',
    icon: IconLinkedin,
    external: true,
  },
  {
    label: 'Correo',
    href: 'mailto:enriqueabadromero02@gmail.com',
    icon: IconMail,
    external: false,
  },
]
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="contact-card glass-panel" data-reveal>
      <div>
        <p class="eyebrow">Contacto</p>
        <h2>Construyamos algo juntos.</h2>
        <p>
          Abierto a oportunidades como desarrollador full stack junior
          [COMPLETAR: presencial/híbrido/remoto y zona].
        </p>
      </div>

      <div class="contact-links">
        <a
          v-for="link in contactLinks"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : null"
          :rel="link.external ? 'noopener noreferrer' : null"
        >
          <component :is="link.icon" class="contact-icon" />
          <span class="contact-label">{{ link.label }}</span>
        </a>
      </div>

      <a class="button button-primary" href="mailto:enriqueabadromero02@gmail.com">Escríbeme</a>
    </div>
  </section>
</template>
