import path from 'node:path';
import { Color } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/highlighted.pdf');
const TARGET_PATTERN = 'alignment';
const HIGHLIGHT_COLOR = new Color(255, 0, 0);

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  pattern: string = TARGET_PATTERN,
  color: Color = HIGHLIGHT_COLOR
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const matches = await pdf.page(0).selectParagraphsMatching(pattern);
  if (!matches.length) {
    throw new Error(`No paragraphs matched pattern: ${pattern}`);
  }

  await Promise.all(
    matches.map((paragraph) => paragraph.edit().color(color).font('Helvetica', 12).apply())
  );

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Highlighted ${matches.length} paragraphs and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
