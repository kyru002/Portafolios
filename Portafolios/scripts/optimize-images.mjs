import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const projectRoot = process.cwd()
const publicDir = path.join(projectRoot, 'public')

const imageMap = [
  { input: 'el-viejo-roble-1.png', output: 'viejo-roble-restaurant.webp' },
  { input: 'image.png', output: 'coding-404.webp' },
  { input: 'satoshi-foto-1.png', output: 'satoshi-spain.webp' },
  { input: 'suport-desk-1.png', output: 'ticketing-app.webp' },
  { input: 'sistema-informes-1.png', output: 'topcon-reporting.webp' },
]

async function optimize(inputName, outputName) {
  const inputPath = path.join(publicDir, inputName)
  const outputPath = path.join(publicDir, outputName)

  await sharp(inputPath)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath)

  console.log(`Generado: ${outputName}`)
}

async function createProfileImages() {
  const inputPath = path.join(publicDir, 'profile.png')
  const sizeTargets = [
    { size: 96, output: 'profile-96.webp' },
    { size: 192, output: 'profile-192.webp' },
  ]

  for (const target of sizeTargets) {
    await sharp(inputPath)
      .resize(target.size, target.size, {
        fit: 'cover',
      })
      .webp({ quality: 82 })
      .toFile(path.join(publicDir, target.output))

    console.log(`Generado: ${target.output}`)
  }
}

async function removeOriginals() {
  const originals = [...imageMap.map((item) => item.input), 'profile.png', 'image copy.png', 'suport-desk-4.png']
  await Promise.all(
    originals.map(async (name) => {
      const target = path.join(publicDir, name)
      try {
        await fs.unlink(target)
        console.log(`Eliminado: ${name}`)
      } catch {
        // Ignora archivos que no existan
      }
    }),
  )
}

async function run() {
  for (const image of imageMap) {
    await optimize(image.input, image.output)
  }

  await createProfileImages()
  await removeOriginals()
}

run().catch((error) => {
  console.error('Error optimizando imágenes:', error)
  process.exit(1)
})
