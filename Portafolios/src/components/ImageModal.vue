<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: 'Vista previa del proyecto',
  },
})

const emit = defineEmits(['close'])
const modalRef = ref(null)
const closeButtonRef = ref(null)
let previousFocusedElement = null

const focusSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const focusableElements = computed(() => {
  if (!modalRef.value) return []
  return Array.from(modalRef.value.querySelectorAll(focusSelector))
})

function closeModal() {
  emit('close')
}

function onKeydown(event) {
  if (!props.open) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeModal()
    return
  }

  if (event.key !== 'Tab') return

  const elements = focusableElements.value
  if (elements.length === 0) return

  const first = elements[0]
  const last = elements[elements.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      previousFocusedElement = document.activeElement
      document.body.classList.add('scroll-locked')
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      closeButtonRef.value?.focus()
    } else {
      document.body.classList.remove('scroll-locked')
      window.removeEventListener('keydown', onKeydown)
      if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
        previousFocusedElement.focus()
      }
    }
  },
)

onBeforeUnmount(() => {
  document.body.classList.remove('scroll-locked')
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div v-if="props.open" class="image-modal" role="dialog" aria-modal="true" @click.self="closeModal">
    <div ref="modalRef" class="image-modal-content">
      <button ref="closeButtonRef" class="image-modal-close" type="button" @click="closeModal" aria-label="Cerrar vista ampliada">
        Cerrar
      </button>
      <img :src="props.src" :alt="props.alt" />
    </div>
  </div>
</template>
