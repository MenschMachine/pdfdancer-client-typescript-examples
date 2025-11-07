import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/redacted.pdf');
const TARGET_PHRASES = ['replaced', 'pdfdancer.com'];

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  phrases: string[] = TARGET_PHRASES
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const lowered = phrases.map((phrase) => phrase.toLowerCase());
  const paragraphs = await pdf.selectParagraphs();

  const matches = paragraphs.filter((paragraph) => {
    const text = (paragraph.getText() ?? '').toLowerCase();
    return lowered.some((phrase) => text.includes(phrase));
  });

  if (!matches.length) {
    throw new Error('No matching paragraphs found to redact.');
  }

  await Promise.all(matches.map((paragraph) => paragraph.delete()));

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Deleted ${matches.length} paragraphs. Saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
