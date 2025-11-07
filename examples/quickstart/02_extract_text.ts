import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { SHOWCASE_PATH, ensureParentDirectory, openPdfFromPath } from '../shared';

const OUTPUT_PATH = path.resolve('output/quickstart/extracted_text.txt');

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const paragraphs = await pdf.selectParagraphs();

  const texts = paragraphs
    .map((paragraph) => (paragraph.getText() ?? '').trim())
    .filter((text) => text.length > 0);

  await ensureParentDirectory(outputPath);
  await writeFile(outputPath, texts.join('\n\n'), 'utf8');

  console.log(`Exported ${texts.length} paragraphs to ${outputPath}`);
  const preview = texts.slice(0, 3).join('\n');
  if (preview) {
    console.log('\nPreview:\n' + preview);
  }
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
