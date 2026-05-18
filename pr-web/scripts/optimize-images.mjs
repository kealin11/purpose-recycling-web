import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')
const sourceDir = await fs.access(path.join(rootDir, 'image-sources'))
  .then(() => path.join(rootDir, 'image-sources'))
  .catch(() => publicDir)
const outputDir = path.join(publicDir, 'optimized')
const manifestPath = path.join(rootDir, 'src', 'imageManifest.js')

const imageExtensions = new Set(['.jpg', '.jpeg', '.png'])

const profiles = [
  {
    match: (relativePath) => relativePath.startsWith(`Header${path.sep}`),
    widths: [480, 800, 1200, 1600],
    quality: 74,
    maxBytesByWidth: { 480: 80000, 800: 140000, 1200: 240000, 1600: 350000 },
    sizes: '100vw',
  },
  {
    match: (relativePath) => relativePath.startsWith(`Services${path.sep}`),
    widths: [360, 600],
    quality: 72,
    maxBytesByWidth: { 360: 60000, 600: 100000 },
    sizes: '(max-width: 768px) 100vw, 33vw',
  },
  {
    match: (relativePath) => relativePath.startsWith(`About Us${path.sep}`),
    widths: [480, 800],
    quality: 73,
    maxBytesByWidth: { 480: 90000, 800: 150000 },
    sizes: '(max-width: 768px) 100vw, 25vw',
  },
  {
    match: (relativePath) => relativePath.startsWith(`Meet The Team${path.sep}`),
    widths: [320, 480, 600],
    quality: 74,
    maxBytesByWidth: { 320: 45000, 480: 70000, 600: 95000 },
    sizes: '(max-width: 768px) 100vw, 25vw',
  },
  {
    match: (relativePath) => relativePath.startsWith(`Recycling Knowledge${path.sep}`),
    widths: [360, 600, 800],
    quality: 76,
    maxBytesByWidth: { 360: 55000, 600: 90000, 800: 140000 },
    sizes: '(max-width: 768px) 100vw, 33vw',
  },
  {
    match: (relativePath) => relativePath.startsWith(`Our Partners${path.sep}`),
    widths: [240, 360],
    quality: 78,
    maxBytesByWidth: { 240: 30000, 360: 50000 },
    sizes: '(max-width: 768px) 50vw, 180px',
  },
  {
    match: () => true,
    widths: [128, 256, 512],
    quality: 78,
    maxBytesByWidth: { 128: 15000, 256: 30000, 512: 70000 },
    sizes: '76px',
  },
]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'optimized') return []
      return walk(fullPath)
    }
    return [fullPath]
  }))

  return files.flat()
}

function toPublicPath(filePath) {
  return `/${path.relative(sourceDir, filePath).replaceAll(path.sep, '/')}`
}

function variantPublicPath(relativePath, width) {
  const parsed = path.parse(relativePath)
  const safeDir = parsed.dir
    .split(path.sep)
    .filter(Boolean)
    .map(slugify)
    .join(path.sep)
  const safeName = `${slugify(parsed.name)}-${width}w.webp`

  return `/optimized/${path.join(safeDir, safeName).replaceAll(path.sep, '/')}`
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function encodeWebp(inputPath, width, quality, maxBytes) {
  let currentQuality = quality
  let buffer

  do {
    buffer = await sharp(inputPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: currentQuality, effort: 6 })
      .toBuffer()

    currentQuality -= 5
  } while (buffer.length > maxBytes && currentQuality >= 55)

  return buffer
}

async function optimizeImage(filePath) {
  const relativePath = path.relative(sourceDir, filePath)
  const publicPath = toPublicPath(filePath)
  const metadata = await sharp(filePath).metadata()
  const profile = profiles.find((candidate) => candidate.match(relativePath))
  const usableWidths = profile.widths.filter((width) => width <= metadata.width)
  const widths = usableWidths.length ? usableWidths : [Math.min(metadata.width, profile.widths[0])]
  const variants = []

  for (const width of widths) {
    const publicVariantPath = variantPublicPath(relativePath, width)
    const outputPath = path.join(publicDir, publicVariantPath.slice(1))
    await fs.mkdir(path.dirname(outputPath), { recursive: true })

    const buffer = await encodeWebp(filePath, width, profile.quality, profile.maxBytesByWidth[width] ?? 100000)
    await fs.writeFile(outputPath, buffer)

    const variantMetadata = await sharp(buffer).metadata()
    variants.push({
      src: publicVariantPath,
      width: variantMetadata.width,
      height: variantMetadata.height,
      bytes: buffer.length,
    })
  }

  variants.sort((a, b) => a.width - b.width)

  return {
    source: publicPath,
    src: variants[0].src,
    srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(', '),
    sizes: profile.sizes,
    width: variants.at(-1).width,
    height: variants.at(-1).height,
    variants,
  }
}

const allFiles = await walk(sourceDir)
const imageFiles = allFiles.filter((filePath) => imageExtensions.has(path.extname(filePath).toLowerCase()))
const optimizedImages = await Promise.all(imageFiles.map(optimizeImage))
const manifest = Object.fromEntries(optimizedImages.map((image) => [image.source, image]))

await fs.writeFile(
  manifestPath,
  `export const imageManifest = ${JSON.stringify(manifest, null, 2)}\n`,
)

const originalBytes = await Promise.all(imageFiles.map(async (filePath) => (await fs.stat(filePath)).size))
const optimizedBytes = optimizedImages.flatMap((image) => image.variants.map((variant) => variant.bytes))
const originalTotal = originalBytes.reduce((sum, bytes) => sum + bytes, 0)
const optimizedTotal = optimizedBytes.reduce((sum, bytes) => sum + bytes, 0)

console.log(`Optimized ${imageFiles.length} images.`)
console.log(`Original total: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`)
console.log(`Optimized variants total: ${(optimizedTotal / 1024 / 1024).toFixed(2)} MB`)
