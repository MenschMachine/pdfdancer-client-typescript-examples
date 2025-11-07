import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-pages/deleted_page.pdf');
const PAGE_INDEX = 3;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  pageIndex: number = PAGE_INDEX
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();
  if (pageIndex >= pages.length) {
    throw new Error(`Page index ${pageIndex} out of range.`);
  }

  await pdf.page(pageIndex).delete();
  const remaining = await pdf.pages();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Deleted page ${pageIndex}. Document now has ${remaining.length} pages.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
