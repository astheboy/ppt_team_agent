import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const html2pptx = require('./.claude/skills/pptx-skill/scripts/html2pptx.cjs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSlides() {
  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'AI Education Agent';
  pres.title = '이지온과 바이브 코딩: 우리 집 강아지를 위한 스마트 욕조 만들기';

  const slidesDir = path.join(__dirname, '.claude', 'brain', 'slides');

  // Generating the list of 14 files
  const slideFiles = Array.from({ length: 14 }, (_, i) => `slide${(i + 1).toString().padStart(2, '0')}.html`);

  console.log('Starting Batch HTML to PPTX conversion...\n');

  for (const slideFile of slideFiles) {
    const slidePath = path.join(slidesDir, slideFile);
    console.log(`Converting ${slideFile}...`);

    try {
      await html2pptx(slidePath, pres);
      console.log(`✓ ${slideFile} converted successfully`);
    } catch (error) {
      console.error(`✗ Error converting ${slideFile}:`, error.message);
      throw error;
    }
  }

  const outputFile = 'smart_bathtub_edu.pptx';
  console.log(`\nSaving presentation to ${outputFile}...`);
  await pres.writeFile({ fileName: outputFile });
  console.log(`✓ Presentation saved successfully!`);
}

convertSlides().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
