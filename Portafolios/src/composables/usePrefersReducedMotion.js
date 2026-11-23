import { onBeforeUnmount, onMounted, ref } from 'vue'

export function usePrefersReducedMotion() {
  const prefersReducedMotion = ref(false)
  let mediaQuery
  let onChange

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    onChange = (event) => {
      prefersReducedMotion.value = event.matches
    }
    mediaQuery.addEventListener('change', onChange)
  })

  onBeforeUnmount(() => {
    if (mediaQuery && onChange) {
      mediaQuery.removeEventListener('change', onChange)
    }
  })

  return { prefersReducedMotion }
}
