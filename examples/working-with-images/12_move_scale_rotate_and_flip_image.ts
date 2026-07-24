import path from 'node:path';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const images = await pdf.selectImages();
  if (!images.length) throw new Error('No images found.');
  const image = images[0];
  await image.moveTo(80, 80);
  await image.scale(0.8);
  await image.rotate(15);
  await image.setOpacity(0.8);
  await image.flipHorizontal();
  await pdf.save(path.resolve('output/working-with-images/moved_scaled_rotated_flipped_image.pdf'));
}
runExample().catch(console.error);
