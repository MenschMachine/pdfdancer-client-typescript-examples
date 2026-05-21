import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/find_and_replace.pdf');
const TEXT_PATTERN = 'This line will be replaced';
const REPLACEMENT_TEXT = 'Replaced with PDFDancer.';

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  textPattern: string = TEXT_PATTERN
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const matches = await pdf.page(1).selectTextLinesMatching(textPattern);
  if (!matches.length) {
    throw new Error(`No text lines found matching "${textPattern}".`);
  }

  await matches[0]
    .edit()
    .replace(REPLACEMENT_TEXT)
    .font('Helvetica', 12)
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
