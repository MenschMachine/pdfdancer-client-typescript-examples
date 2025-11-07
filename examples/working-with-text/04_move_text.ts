import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/moved_text.pdf');
const PARAGRAPH_PREFIX = 'This is regular';
const NEW_POSITION = { x: 50, y: 750 } as const;

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

  const [paragraph] = matches;
  console.log(paragraph.getText());
  await paragraph.edit().moveTo(NEW_POSITION.x, NEW_POSITION.y).apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(
    `Moved paragraph to (${NEW_POSITION.x}, ${NEW_POSITION.y}) and saved to ${outputPath}.`
  );
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
