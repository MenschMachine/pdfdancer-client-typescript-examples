import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/no_images_page.pdf');
const TARGET_PAGE_INDEX = 2;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  pageIndex: number = TARGET_PAGE_INDEX
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();
  if (pageIndex >= pages.length) {
    throw new Error(`Page index ${pageIndex} out of range.`);
  }

  const images = await pdf.page(pageIndex).selectImages();
  if (!images.length) {
    throw new Error(`No images found on page ${pageIndex} to delete.`);
  }

  await Promise.all(images.map((image) => image.delete()));

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Deleted ${images.length} images from page ${pageIndex} and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
