const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');

// accommodate possible filename variants (user may have added an extra space)
// accept candidate filenames with minor variations (extra space before extension)
function findCandidate(dir, baseName) {
  const candidates = [
    `${baseName}.png`,
    `${baseName} .png`,
    `${baseName}.jpg`,
    `${baseName} .jpg`,
  ];

  const normalizedEntries = fs.readdirSync(dir).map((entry) => ({
    raw: entry,
    normalized: entry.toLowerCase().replace(/\s+/g, ' ').trim(),
  }));

  for (const c of candidates) {
    const normalizedCandidate = c.toLowerCase().replace(/\s+/g, ' ').trim();
    const found = normalizedEntries.find((entry) => entry.normalized === normalizedCandidate);
    if (found) return path.join(dir, found.raw);
  }

  return null;
}

const tasks = [
  {
    src: findCandidate(publicDir, 'Satoshi foto 1'),
    dest: path.join(publicDir, 'satoshi-1.webp'),
    width: 1200,
    height: 800,
  },
  {
    src: findCandidate(publicDir, 'satoshi foto 2'),
    dest: path.join(publicDir, 'satoshi-2.webp'),
    width: 600,
    height: 800,
  },
  {
    src: findCandidate(publicDir, 'satoshi foto 3'),
    dest: path.join(publicDir, 'satoshi-3.webp'),
    width: 600,
    height: 800,
  },
  {
    src: findCandidate(publicDir, 'El viejo roble 1'),
    dest: path.join(publicDir, 'viejo-roble-1.webp'),
    width: 1200,
    height: 800,
  },
  {
    src: findCandidate(publicDir, 'El viejo roble 2'),
    dest: path.join(publicDir, 'viejo-roble-2.webp'),
    width: 600,
    height: 800,
  },
  {
    src: findCandidate(publicDir, 'El viejo roble 3'),
    dest: path.join(publicDir, 'viejo-roble-3.webp'),
    width: 600,
    height: 800,
  },
  {
    src: findCandidate(publicDir, 'El viejo roble 4'),
    dest: path.join(publicDir, 'viejo-roble-4.webp'),
    width: 600,
    height: 800,
  },
];

async function run() {
  for (const t of tasks) {
    if (!t.src) {
      console.error('Source file missing: null')
      continue
    }

    if (!fs.existsSync(t.src)) {
      console.error('Source file missing:', t.src);
      continue;
    }

    try {
      await sharp(t.src)
        .resize(t.width, t.height, { fit: 'cover', position: 'centre' })
        .webp({ quality: 80 })
        .toFile(t.dest);
      console.log('Written', t.dest);
      // also generate medium and small responsive variants (800w, 480w)
      const baseName = path.basename(t.dest, path.extname(t.dest));
      const dirName = path.dirname(t.dest);
      const medium = path.join(dirName, `${baseName}-800w.webp`);
      const small = path.join(dirName, `${baseName}-480w.webp`);

      await sharp(t.src)
        .resize(Math.min(800, t.width), Math.round((800 * t.height) / t.width), { fit: 'cover', position: 'centre' })
        .webp({ quality: 78 })
        .toFile(medium);
      console.log('Written', medium);

      await sharp(t.src)
        .resize(Math.min(480, t.width), Math.round((480 * t.height) / t.width), { fit: 'cover', position: 'centre' })
        .webp({ quality: 76 })
        .toFile(small);
      console.log('Written', small);
    } catch (err) {
      console.error('Error processing', t.src, err);
    }
  }
}

run();
