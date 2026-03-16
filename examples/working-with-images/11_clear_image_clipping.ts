import path from 'node:path';
import { CLIPPING_TEST_PATH, ensureParentDirectory, openPdfFromPath } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/clear_image_clipping.pdf');

export async function runExample(
  pdfPath: string = CLIPPING_TEST_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const images = await pdf.page(1).selectImages();
  if (!images.length) {
    throw new Error('No images found on page 1 to reveal.');
  }

  const [image] = images;
  const cleared = await image.clearClipping();
  if (!cleared) {
    throw new Error(`Clearing clipping for image ${image.internalId} returned false.`);
  }

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(
    `Cleared clipping for image ${image.internalId} on page 1 and saved the revealed result to ${outputPath}.`
  );
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
