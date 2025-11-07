import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/moved_image.pdf');
const NEW_POSITION = { x: 60, y: 60 } as const;

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const images = await pdf.page(0).selectImages();
  if (!images.length) {
    throw new Error('No images found on page 0 to move.');
  }

  await images[0].moveTo(NEW_POSITION.x, NEW_POSITION.y);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(
    `Moved first image on page 0 to (${NEW_POSITION.x}, ${NEW_POSITION.y}) and saved to ${outputPath}.`
  );
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
