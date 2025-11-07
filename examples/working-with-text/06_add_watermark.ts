import path from 'node:path';
import { Color, StandardFonts } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/watermarked.pdf');
const WATERMARK_TEXT = 'DRAFT';
const WATERMARK_FONT = StandardFonts.HELVETICA_BOLD;
const WATERMARK_SIZE = 72;
const WATERMARK_COLOR = new Color(200, 200, 200, 128);
const WATERMARK_POSITION = { x: 150, y: 400 } as const;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();

  for (const page of pages) {
    await page
      .newParagraph()
      .text(WATERMARK_TEXT)
      .font(WATERMARK_FONT, WATERMARK_SIZE)
      .color(WATERMARK_COLOR)
      .at(WATERMARK_POSITION.x, WATERMARK_POSITION.y)
      .add();
  }

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Watermarked ${pages.length} pages and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
