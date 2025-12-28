/**
 * Convert HTML slides to PowerPoint presentation
 * AI 질문 엔지니어링 교육 - 교사 연수
 */

import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const html2pptx = require('./.claude/skills/pptx-skill/scripts/html2pptx.cjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSlides() {
  console.log('🎨 Starting PPTX conversion...\n');

  // Create presentation
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE'; // 16:9 (720pt × 405pt)
  pres.author = 'Education Innovation';
  pres.company = 'AI Education Team';
  pres.subject = 'AI 질문 엔지니어링 교육';
  pres.title = '학생 AI 질문 엔지니어링 교육법 - 교사 연수';

  // Get all slide files
  const slidesDir = path.join(__dirname, 'slides');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(file => file.startsWith('slide-') && file.endsWith('.html'))
    .sort();

  console.log(`📁 Found ${slideFiles.length} slides to convert\n`);

  // Convert each slide
  for (let i = 0; i < slideFiles.length; i++) {
    const slideFile = slideFiles[i];
    const slideNum = i + 1;
    const filePath = path.join(slidesDir, slideFile);

    try {
      console.log(`[${slideNum}/${slideFiles.length}] Converting ${slideFile}...`);

      const { slide, placeholders } = await html2pptx(filePath, pres);

      console.log(`  ✓ Slide ${slideNum} converted successfully`);
      if (placeholders && placeholders.length > 0) {
        console.log(`    - Found ${placeholders.length} placeholder(s)`);
      }
    } catch (error) {
      console.error(`  ✗ Error converting ${slideFile}:`, error.message);
      throw error;
    }
  }

  // Save presentation
  const outputFile = 'ai_question_engineering_training.pptx';
  console.log(`\n💾 Saving presentation as "${outputFile}"...`);

  await pres.writeFile({ fileName: outputFile });

  console.log(`✅ Presentation created successfully!`);
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
    process.exit(1);
  });
