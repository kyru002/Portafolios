const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');

const tasks = [
  {
    src: path.join(publicDir, 'Satoshi foto 1.png'),
    dest: path.join(publicDir, 'satoshi-1.webp'),
    width: 1200,
    height: 800,
  },
  {
    src: path.join(publicDir, 'satoshi foto 2.png'),
    dest: path.join(publicDir, 'satoshi-2.webp'),
    width: 600,
    height: 800,
  },
  {
    src: path.join(publicDir, 'satoshi foto 3.png'),
    dest: path.join(publicDir, 'satoshi-3.webp'),
    width: 600,
    height: 800,
  },
];

async function run() {
  for (const t of tasks) {
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
    } catch (err) {
      console.error('Error processing', t.src, err);
    }
  }
}

run();
