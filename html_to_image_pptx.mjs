/**
 * Convert HTML slides to PowerPoint presentation via screenshots
 * AI 질문 엔지니어링 교육 - 교사 연수
 */

import pptxgen from 'pptxgenjs';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSlides() {
  console.log('🎨 Starting PPTX conversion (via screenshots)...\n');

  // Create presentation
  const pres = new pptxgen();

  // Custom layout matching HTML dimensions (720pt × 405pt)
  pres.defineLayout({ name: 'CUSTOM_16x9', width: 10, height: 5.625 });
  pres.layout = 'CUSTOM_16x9';

  pres.author = 'Education Innovation';
  pres.company = 'AI Education Team';
  pres.subject = 'AI 질문 엔지니어링 교육';
  pres.title = '학생 AI 질문 엔지니어링 교육법 - 교사 연수';

  // Create temp directory for screenshots
  const tempDir = path.join(__dirname, '.temp-slides');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Get all slide files
  const slidesDir = path.join(__dirname, 'slides');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(file => file.startsWith('slide-') && file.endsWith('.html'))
    .sort();

  console.log(`📁 Found ${slideFiles.length} slides to convert\n`);

  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 960, height: 540 } // 720pt = 960px at 96 DPI
  });

  try {
    // Convert each slide
    for (let i = 0; i < slideFiles.length; i++) {
      const slideFile = slideFiles[i];
      const slideNum = i + 1;
      const filePath = path.join(slidesDir, slideFile);
      const screenshotPath = path.join(tempDir, `slide-${String(slideNum).padStart(2, '0')}.png`);

      try {
        console.log(`[${slideNum}/${slideFiles.length}] Processing ${slideFile}...`);

        // Open HTML file and take screenshot
        const page = await context.newPage();
        await page.goto(`file://${filePath}`);

        // Wait for fonts and images to load
        await page.waitForTimeout(1000);

        // Take screenshot
        await page.screenshot({
          path: screenshotPath,
          fullPage: false
        });

        await page.close();

        // Add slide with screenshot
        const slide = pres.addSlide();
        slide.addImage({
          path: screenshotPath,
          x: 0,
          y: 0,
          w: '100%',
          h: '100%'
        });

        console.log(`  ✓ Slide ${slideNum} converted successfully`);
      } catch (error) {
        console.error(`  ✗ Error converting ${slideFile}:`, error.message);
        throw error;
      }
    }
  } finally {
    await browser.close();
  }

  // Save presentation
  const outputFile = 'ai_question_engineering_training.pptx';
  console.log(`\n💾 Saving presentation as "${outputFile}"...`);

  await pres.writeFile({ fileName: outputFile });

  // Clean up temp files
  console.log(`🧹 Cleaning up temporary files...`);
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log(`\n✅ Presentation created successfully!`);
  console.log(`📊 Total slides: ${slideFiles.length}`);
  console.log(`📁 Output: ${path.join(__dirname, outputFile)}\n`);

  return outputFile;
}

// Run conversion
convertSlides()
  .then(outputFile => {
    console.log('🎉 Conversion complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Conversion failed:', error);
    console.error(error.stack);
    process.exit(1);
  });
