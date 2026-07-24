import path from 'node:path';
import {Color} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const images = await pdf.selectImages();
  if (!images.length) throw new Error('No images found.');
  await images[0].fillRegion(0, 0, 10, 10, Color.WHITE);
  const output = path.resolve('output/capabilities/filled_image_region.pdf');
  await ensureParentDirectory(output);
  await pdf.save(output);
}
runExample().catch(console.error);
