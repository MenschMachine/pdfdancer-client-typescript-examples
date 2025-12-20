import path from 'node:path';
import { FlipDirection } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/flipped_image.pdf');

// Available flip directions:
// - FlipDirection.HORIZONTAL: mirror left-right
// - FlipDirection.VERTICAL: mirror top-bottom
// - FlipDirection.BOTH: flip both horizontally and vertically

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  direction: FlipDirection = FlipDirection.HORIZONTAL
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const images = await pdf.page(1).selectImages();
  if (!images.length) {
    throw new Error('No images found on page 1 to flip.');
  }

  await images[0].flip(direction);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Flipped first image on page 1 ${direction} and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
