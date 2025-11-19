import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/find_and_replace.pdf');
const PARAGRAPH_PREFIX = 'This line will be replaced';
const REPLACEMENT_TEXT = 'This line was replaced!\nUpdated with PDFDancer';

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  paragraphPrefix: string = PARAGRAPH_PREFIX
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const matches = await pdf.page(0).selectParagraphsMatching(paragraphPrefix);
  if (!matches.length) {
    throw new Error(`No paragraphs found starting with "${paragraphPrefix}".`);
  }

  await matches[0]
    .edit()
    .replace(REPLACEMENT_TEXT)
    .font('Helvetica', 12)
    .lineSpacing(1.1)
    .apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Saved updated PDF to ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
