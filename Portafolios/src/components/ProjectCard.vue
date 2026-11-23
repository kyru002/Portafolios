<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open-preview', 'img-error', 'pointer-move', 'pointer-enter', 'pointer-leave'])

function isCodeOnlyProject(project) {
  return project && project.codeOnly === true
}
</script>

<template>
  <article
    class="project-card project-standard glass-panel"
    :class="`theme-${props.project.previewTone}`"
    @pointermove="emit('pointer-move', $event)"
    @pointerenter="emit('pointer-enter', $event)"
    @pointerleave="emit('pointer-leave', $event)"
  >
    <div class="project-backdrop"></div>

    <div class="project-copy">
      <div class="project-kicker">
        <span>{{ props.project.category }}</span>
        <span class="project-badge">Caso de estudio</span>
      </div>
      <h3>{{ props.project.title }}</h3>
      <p>{{ props.project.description }}</p>
      <p class="project-role">Rol: {{ props.project.role }}</p>

      <div class="project-tags">
        <span v-for="tag in props.project.stack" :key="tag">{{ tag }}</span>
      </div>

      <div class="project-actions">
        <a
          v-if="props.project.ctaLive"
          class="button button-primary button-small"
          :href="props.project.ctaLive"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ props.project.ctaLiveLabel || 'Ver en vivo' }}
        </a>
        <a
          v-if="props.project.ctaCode"
          class="button button-secondary button-small"
          :href="props.project.ctaCode"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver código
        </a>
        <a
          v-if="props.project.ctaPdf"
          class="button button-secondary button-small button-pdf"
          :href="props.project.ctaPdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          {{ props.project.ctaPdfLabel || 'Descargar PDF' }}
        </a>
      </div>
    </div>

    <div class="project-visual">
      <div class="visual-caption">
        <span>Vista previa</span>
        <strong>{{ props.project.title }}</strong>
      </div>

      <div v-if="isCodeOnlyProject(props.project)" class="project-code-showcase">
        <div class="code-window">
          <div class="code-window-topbar">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span class="code-window-title">{{ props.project.codeFileName }}</span>
          </div>
          <pre class="code-block"><code>{{ props.project.codeSnippet }}</code></pre>
          <p class="code-footer">{{ props.project.codeFooter }}</p>
        </div>
      </div>

      <div v-else class="project-image-showcase-full">
        <figure class="project-image-hero-full">
          <img
            :src="props.project.previewImage"
            :alt="props.project.previewAlt"
            :width="props.project.imageWidth"
            :height="props.project.imageHeight"
            loading="lazy"
            decoding="async"
            @error="emit('img-error', $event, props.project)"
            @click="emit('open-preview', props.project.previewImage, props.project.previewAlt)"
          />
        </figure>
      </div>
    </div>
  </article>
</template>
