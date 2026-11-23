<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  navigation: {
    type: Array,
    required: true,
  },
})

const mobileMenuOpen = ref(false)

const menuAriaLabel = computed(() =>
  mobileMenuOpen.value ? 'Cerrar menú de navegación' : 'Abrir menú de navegación',
)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMenu() {
  mobileMenuOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" data-reveal>
    <a class="brand" href="#inicio" @click="closeMenu">
      <span class="brand-mark brand-mark-photo">
        <img
          src="/profile.png"
          width="56"
          height="56"
          alt="Avatar de Enrique Abad"
          class="brand-photo"
          loading="eager"
          decoding="async"
        />
      </span>
      <span class="brand-copy">
        <strong>Enrique Abad</strong>
        <small>Desarrollador Full Stack Junior</small>
      </span>
    </a>

    <button
      class="menu-toggle"
      type="button"
      @click="toggleMenu"
      :aria-expanded="mobileMenuOpen"
      aria-controls="menu-principal"
      :aria-label="menuAriaLabel"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <div id="menu-principal" class="site-header-menu" :class="{ 'is-open': mobileMenuOpen }">
      <nav class="site-nav" aria-label="Navegación principal">
        <a v-for="item in props.navigation" :key="item.href" :href="item.href" @click="closeMenu">
          {{ item.label }}
        </a>
      </nav>

      <a class="header-cta button button-primary" href="#contact" @click="closeMenu">Hablemos</a>
    </div>
  </header>
</template>
