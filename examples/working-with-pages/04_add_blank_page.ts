import path from 'node:path';
import { Orientation } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-pages/extra_page.pdf');

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  await pdf
    .newPage()
    .orientation(Orientation.PORTRAIT)
    .letter()
    .add();

  const pages = await pdf.pages();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Added blank letter page. Total pages: ${pages.length}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
