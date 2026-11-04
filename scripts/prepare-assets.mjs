import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = './Tandyu_Cleaned_Photos (1)/tandyu_cleaned_photos';
const publicDir = './public/assets';

const photoMetadata = [
  {
    filename: 'IMG_20200707_090849.jpg',
    category: 'landscapes',
    categories: ['Green Landscapes', 'Mountain Views'],
    titleEn: 'Lush Terraces of Tandiyun',
    titleHi: 'तंडियूं की हरी-भरी सीढ़ीदार घाटियां',
    captionEn: 'Monsoon greenery draping the hillsides around the village, July 2020.',
    captionHi: 'जुलाई २०२० में गांव के आस-पास की हरी-भरी पहाड़ियां और मानसून की ताजगी।',
    capturedAt: '2020-07-07 09:08:49',
    featured: true,
  },
  {
    filename: 'IMG_20200708_161601.jpg',
    category: 'village',
    categories: ['Village Life', 'Village Memories'],
    titleEn: 'The Village on the Hillside',
    titleHi: 'पहाड़ी ढलान पर बसा तंडियूं गांव',
    captionEn: 'Traditional homes resting quietly above the motorable approach route.',
    captionHi: 'सड़क मार्ग से ऊपर पहाड़ी पर स्थित गांव के पारम्परिक घर और शान्त परिवेश।',
    capturedAt: '2020-07-08 16:16:01',
    featured: true,
  },
  {
    filename: 'IMG_20200708_161605.jpg',
    category: 'landscapes',
    categories: ['Green Landscapes', 'Village Life'],
    titleEn: 'The Uphill Trail to Tandiyun',
    titleHi: 'तंडियूं की ओर जाता पहाड़ी मार्ग',
    captionEn: 'The winding ascent from Bidaliya Niwaas towards the heart of the village.',
    captionHi: 'बिडालिया निवास से गांव की ओर बढ़ता घुमावदार पहाड़ी रास्ता।',
    capturedAt: '2020-07-08 16:16:05',
    featured: false,
  },
  {
    filename: 'IMG_20200708_161634.jpg',
    category: 'mountains',
    categories: ['Mountain Views', 'Green Landscapes'],
    titleEn: 'Pine Slopes & Whispering Winds',
    titleHi: 'पाइन के जंगल और शांत पर्वत शिखर',
    captionEn: 'Crisp mountain air filtering through sacred oak and deodar slopes.',
    captionHi: 'बांज और बुरांश के पेड़ों से छनती हिमालयी ठंडी बयार।',
    capturedAt: '2020-07-08 16:16:34',
    featured: false,
  },
  {
    filename: 'IMG_20200708_161639.jpg',
    category: 'village',
    categories: ['Village Memories', 'Mountain Views'],
    titleEn: 'A Sanctuary in the Garhwal Hills',
    titleHi: 'गढ़वाल की शांत वादियों में बसा आशियाना',
    captionEn: 'Looking across the valley from the upper slopes of Tandiyun.',
    captionHi: 'तंडियूं की ऊपरी ढलानों से घाटी का मनोरम विहंगम दृश्य।',
    capturedAt: '2020-07-08 16:16:39',
    featured: false,
  },
  {
    filename: 'IMG_20200814_062035.jpg',
    category: 'clouds',
    categories: ['Sunrise & Sunset', 'Clouds & Mist'],
    titleEn: 'Dawn Over the Garhwal Ranges',
    titleHi: 'गढ़वाल पर्वतमाला पर प्रभात की स्वर्णिम किरणें',
    captionEn: 'First light breaking over layered Himalayan ridges, August 2020.',
    captionHi: 'अगस्त २०२० में हिमालय की परतों पर उगते सूरज का स्वर्णिम उजास।',
    capturedAt: '2020-08-14 06:20:35',
    featured: true,
  },
  {
    filename: 'IMG_20200814_063519.jpg',
    category: 'clouds',
    categories: ['Clouds & Mist', 'Sunrise & Sunset'],
    titleEn: 'Sea of Clouds Rolling Through the Valley',
    titleHi: 'घाटी में बहता बादलों का सागर',
    captionEn: 'Thick monsoon mist settling in the lower valleys beneath the village.',
    captionHi: 'गांव के नीचे घाटी में तैरती घनी बादलों और धुंध की चादर।',
    capturedAt: '2020-08-14 06:35:19',
    featured: true,
  },
  {
    filename: 'IMG_20200814_063612.jpg',
    category: 'mountains',
    categories: ['Mountain Views', 'Clouds & Mist'],
    titleEn: 'Endless Horizons of Uttarakhand',
    titleHi: 'उत्तराखंड की अंतहीन पर्वत श्रृंखलाएं',
    captionEn: 'Layered blue ridges stretching into the morning horizon.',
    captionHi: 'दूर क्षितिज तक फैली नीली पर्वत चोटियां और शांत आकाश।',
    capturedAt: '2020-08-14 06:36:12',
    featured: true,
  },
];

async function run() {
  const photosData = [];
  const galleryDir = path.join(publicDir, 'photos/gallery');

  for (const item of photoMetadata) {
    const srcFile = path.join(sourceDir, item.filename);
    if (!fs.existsSync(srcFile)) {
      console.warn(`File not found: ${srcFile}`);
      continue;
    }

    const baseName = path.parse(item.filename).name;
    const origDest = path.join(galleryDir, item.filename);
    const webpDest = path.join(galleryDir, `${baseName}.webp`);
    const thumbDest = path.join(galleryDir, `${baseName}-thumb.webp`);

    // Copy original preserved
    fs.copyFileSync(srcFile, origDest);

    // Also copy to specific category folder
    const catDest = path.join(publicDir, `photos/${item.category}`, item.filename);
    fs.copyFileSync(srcFile, catDest);

    // Get metadata
    const meta = await sharp(srcFile).metadata();
    const width = meta.width;
    const height = meta.height;
    const orientation = width >= height ? 'landscape' : 'portrait';

    // Generate WebP copy
    await sharp(srcFile)
      .webp({ quality: 85 })
      .toFile(webpDest);

    // Generate responsive thumbnail WebP copy
    await sharp(srcFile)
      .resize({ width: 720, height: 720, fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(thumbDest);

    photosData.push({
      id: baseName,
      filename: item.filename,
      src: `/assets/photos/gallery/${item.filename}`,
      webpSrc: `/assets/photos/gallery/${baseName}.webp`,
      thumbSrc: `/assets/photos/gallery/${baseName}-thumb.webp`,
      category: item.category,
      categories: item.categories,
      titleEn: item.titleEn,
      titleHi: item.titleHi,
      captionEn: item.captionEn,
      captionHi: item.captionHi,
      capturedAt: item.capturedAt,
      orientation,
      width,
      height,
      featured: item.featured,
    });

    console.log(`Processed: ${item.filename} -> WebP & Thumb (${orientation})`);
  }

  // Create hero poster from IMG_20200814_063519.jpg
  const posterSrc = path.join(sourceDir, 'IMG_20200814_063519.jpg');
  if (fs.existsSync(posterSrc)) {
    const posterJpg = path.join(publicDir, 'videos/hero-poster.jpg');
    const posterWebp = path.join(publicDir, 'videos/hero-poster.webp');
    await sharp(posterSrc).jpeg({ quality: 88 }).toFile(posterJpg);
    await sharp(posterSrc).webp({ quality: 85 }).toFile(posterWebp);
    console.log('Hero fallback poster created.');
  }

  // Write src/data/photos.json
  const dataDir = './src/data';
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(dataDir, 'photos.json'),
    JSON.stringify(photosData, null, 2),
    'utf-8'
  );
  console.log(`Saved ${photosData.length} photo entries to src/data/photos.json`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
