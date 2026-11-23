<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section id="tech" class="section tech-section">
    <div class="section-heading tech-heading" data-reveal>
      <p class="eyebrow">Tecnologías</p>
      <h2>Tecnologías con las que trabajo</h2>
      <p>Mi stack principal es Vue y Node.js. Sigo aprendiendo IA y análisis de datos.</p>
    </div>

    <div class="tech-categories">
      <article v-for="category in categories" :key="category.title" class="tech-category glass-panel" data-reveal>
        <h3>{{ category.title }}</h3>
        <div class="tech-chips">
          <span v-for="item in category.items" :key="item" class="tech-chip">{{ item }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
