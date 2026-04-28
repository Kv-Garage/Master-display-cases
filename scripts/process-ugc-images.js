const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// UGC images to process
const UGC_IMAGES = [
  'UGC content.jpeg',
  'Vape Shop Display UGC cotent.jpeg',
  'Vape store Display UGC .jpeg',
  'In-store Shop Display 2.jpeg'
];

const INPUT_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'processed');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function analyzeImage(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    console.log(`\n--- ${path.basename(imagePath)} ---`);
    console.log(`Dimensions: ${metadata.width} x ${metadata.height}`);
    console.log(`Format: ${metadata.format}`);
    console.log(`Has alpha: ${metadata.hasAlpha}`);
    return metadata;
  } catch (error) {
    console.error(`Error analyzing ${imagePath}:`, error.message);
    return null;
  }
}

async function processImage(imagePath, metadata) {
  const fileName = path.basename(imagePath, path.extname(imagePath));
  const outputPaths = {
    gallery: path.join(OUTPUT_DIR, `${fileName}-gallery.jpg`),
    thumbnail: path.join(OUTPUT_DIR, `${fileName}-thumbnail.jpg`)
  };

  const { width, height } = metadata;
  
  // LIGHTBOX-OPTIMIZED CROPPING STRATEGY:
  // - Minimal cropping to preserve full product context
  // - Show the FULL display case (top, sides, and base visible)
  // - Product should take up ~70% of frame (not edge-to-edge)
  // - Maintain natural spacing around the product
  // - Keep context (floor, surrounding store environment)
  // - Aspect ratio: 4:5 (portrait) for better lightbox viewing
  
  // Target aspect ratio 4:5 (portrait) - better for showing full product height
  const targetAspect = 4 / 5;
  const currentAspect = width / height;
  
  let cropWidth, cropHeight, cropLeft, cropTop;
  
  if (currentAspect > targetAspect) {
    // Image is wider than 4:5, crop from sides
    cropHeight = height;
    cropWidth = Math.floor(cropHeight * targetAspect);
    cropLeft = Math.floor((width - cropWidth) / 2);
    cropTop = 0;
  } else {
    // Image is taller than 4:5, crop from top/bottom
    cropWidth = width;
    cropHeight = Math.floor(cropWidth / targetAspect);
    cropLeft = 0;
    cropTop = Math.floor((height - cropHeight) / 2);
  }
  
  // Apply minimal padding to ensure product doesn't touch edges
  // This creates the ~70% product-to-frame ratio
  const paddingPercent = 0.05; // 5% padding on each side
  const paddingX = Math.floor(cropWidth * paddingPercent);
  const paddingY = Math.floor(cropHeight * paddingPercent);
  
  // Adjust crop to include a bit more context around the product
  cropLeft = Math.max(0, cropLeft - paddingX);
  cropTop = Math.max(0, cropTop - paddingY);
  cropWidth = Math.min(width - cropLeft, cropWidth + paddingX * 2);
  cropHeight = Math.min(height - cropTop, cropHeight + paddingY * 2);
  
  // For images that might have watermarks at the very top, apply minimal top crop
  const topWatermarkCrop = Math.floor(cropHeight * 0.02); // Only 2% top crop
  cropTop += topWatermarkCrop;
  cropHeight -= topWatermarkCrop;
  
  console.log(`\nProcessing ${path.basename(imagePath)}:`);
  console.log(`  Original: ${width}x${height}`);
  console.log(`  Crop area: ${cropWidth}x${cropHeight}`);
  console.log(`  Crop position: (${cropLeft}, ${cropTop})`);
  console.log(`  Strategy: Light crop to preserve full product context`);
  
  try {
    // Process for gallery (larger, high quality for lightbox)
    await sharp(imagePath)
      .extract({
        left: cropLeft,
        top: cropTop,
        width: cropWidth,
        height: cropHeight
      })
      .resize(1200, 1500, {
        fit: 'inside',
        withoutEnlargement: true,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .jpeg({ quality: 92, progressive: true })
      .toFile(outputPaths.gallery);
    
    // Process for thumbnail (smaller)
    await sharp(imagePath)
      .extract({
        left: cropLeft,
        top: cropTop,
        width: cropWidth,
        height: cropHeight
      })
      .resize(400, 500, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPaths.thumbnail);
    
    console.log(`  Gallery output: ${outputPaths.gallery}`);
    console.log(`  Thumbnail output: ${outputPaths.thumbnail}`);
    
    return true;
  } catch (error) {
    console.error(`  Error processing: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('=== UGC Image Processor (Lightbox Optimized) ===');
  console.log('Processing retail display case images for eCommerce gallery\n');
  console.log('Strategy: Minimal cropping to show FULL product with context\n');
  
  for (const imageName of UGC_IMAGES) {
    const imagePath = path.join(INPUT_DIR, imageName);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`\nSkipping ${imageName}: File not found`);
      continue;
    }
    
    const metadata = await analyzeImage(imagePath);
    if (metadata) {
      await processImage(imagePath, metadata);
    }
  }
  
  console.log('\n=== Processing Complete ===');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log('\nImage Optimization Notes:');
  console.log('- Minimal cropping to preserve full product visibility');
  console.log('- 4:5 aspect ratio for optimal lightbox viewing');
  console.log('- Product takes ~70% of frame with natural spacing');
  console.log('- Context preserved (floor, store environment)');
}

main().catch(console.error);