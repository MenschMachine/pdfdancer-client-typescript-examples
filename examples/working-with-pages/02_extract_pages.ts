import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-pages/first_three_pages.pdf');
const PAGES_TO_KEEP = 3;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  pagesToKeep: number = PAGES_TO_KEEP
): Promise<void> {
  if (pagesToKeep <= 0) {
    throw new Error('pagesToKeep must be positive');
  }

  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();
  const totalPages = pages.length;
  if (pagesToKeep > totalPages) {
    throw new Error(`Document only has ${totalPages} pages; cannot keep ${pagesToKeep}.`);
  }

  for (let index = totalPages - 1; index >= pagesToKeep; index -= 1) {
    await pdf.page(index).delete();
  }

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Extracted first ${pagesToKeep} pages into ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
