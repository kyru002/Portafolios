export const techCategories = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'Vue'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Java'],
  },
  {
    title: 'Datos y automatización',
    items: ['SQL', 'MongoDB', 'Python'],
  },
  {
    title: 'Herramientas',
    items: ['Git', 'GitHub'],
  },
  {
    title: 'En aprendizaje',
    items: ['IA y LLMs', 'Análisis de datos'],
  },
]

export const techCount = techCategories
  .flatMap((category) => category.items)
  .filter((item) => item !== 'IA y LLMs' && item !== 'Análisis de datos').length
