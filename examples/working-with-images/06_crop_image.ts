import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/cropped_image.pdf');

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  cropPixels: { left: number; top: number; right: number; bottom: number } = {
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
  }
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const images = await pdf.page(1).selectImages();
  if (!images.length) {
    throw new Error('No images found on page 1 to crop.');
  }

  await images[0].crop(cropPixels.left, cropPixels.top, cropPixels.right, cropPixels.bottom);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(
    `Cropped first image on page 1 by ${cropPixels.left}px left, ${cropPixels.top}px top, ${cropPixels.right}px right, ${cropPixels.bottom}px bottom and saved to ${outputPath}.`
  );
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
