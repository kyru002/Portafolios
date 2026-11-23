import { onBeforeUnmount, onMounted } from 'vue'

export function useReveal(options = {}) {
  let observer

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
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px 0px -80px 0px',
      },
    )

    revealTargets.forEach((target) => observer.observe(target))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
