import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-pages/reordered.pdf');
const SOURCE_INDEX = 0;
const DEST_INDEX = 2;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  sourceIndex: number = SOURCE_INDEX,
  destIndex: number = DEST_INDEX
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();
  if (sourceIndex >= pages.length) {
    throw new Error(`Source index ${sourceIndex} out of range.`);
  }

  await pdf.movePage(sourceIndex, destIndex);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Moved page ${sourceIndex} to position ${destIndex}. Saved PDF to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
