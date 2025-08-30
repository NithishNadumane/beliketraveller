const sharp = require('sharp');
const path = require('path');

async function optimizeImages() {
  const inputLogo = path.join(__dirname, '../public/beliketravellerlogo.png');
  
  // Create favicon sizes
  await sharp(inputLogo)
    .resize(32, 32)
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));

  await sharp(inputLogo)
    .resize(16, 16)
    .toFile(path.join(__dirname, '../public/favicon-16x16.png'));

  // Create apple touch icon
  await sharp(inputLogo)
    .resize(180, 180)
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // Create a general purpose logo
  await sharp(inputLogo)
    .resize(192, 192)
    .toFile(path.join(__dirname, '../public/logo-192x192.png'));

  console.log('Images optimized successfully!');
}

optimizeImages().catch(console.error);
