import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/bold_title.pdf');
const PARAGRAPH_PREFIX = 'PDFDancer';
const FONT_NAME = 'Helvetica-Bold';
const FONT_SIZE = 24;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  paragraphPrefix: string = PARAGRAPH_PREFIX
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const matches = await pdf.page(0).selectParagraphsStartingWith(paragraphPrefix);
  if (!matches.length) {
    throw new Error(`No paragraph found starting with "${paragraphPrefix}".`);
  }

  await matches[0].edit().font(FONT_NAME, FONT_SIZE).apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Updated font to ${FONT_NAME} ${FONT_SIZE}pt and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
