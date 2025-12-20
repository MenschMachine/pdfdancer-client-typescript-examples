import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/opacity_image.pdf');

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  opacity: number = 0.5
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const images = await pdf.page(1).selectImages();
  if (!images.length) {
    throw new Error('No images found on page 1 to set opacity.');
  }

  await images[0].setOpacity(opacity);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Set first image on page 1 to ${opacity * 100}% opacity and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
