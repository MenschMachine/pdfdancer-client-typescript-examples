import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-pages/reordered.pdf');
const SOURCE_NUMBER = 1;
const DEST_NUMBER = 3;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  sourcePage: number = SOURCE_NUMBER,
  destPage: number = DEST_NUMBER
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();
  if (sourcePage > pages.length) {
    throw new Error(`Source page ${sourcePage} out of range.`);
  }

  await pdf.movePage(sourcePage, destPage);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Moved page ${sourcePage} to position ${destPage}. Saved PDF to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
