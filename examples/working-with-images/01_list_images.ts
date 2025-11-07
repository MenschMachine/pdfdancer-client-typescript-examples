import { openPdfFromPath, SHOWCASE_PATH } from '../shared';

export async function runExample(pdfPath: string = SHOWCASE_PATH): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const images = await pdf.selectImages();

  if (!images.length) {
    console.log('No images found in this document.');
    return;
  }

  console.log(`Found ${images.length} images:\n`);
  for (const image of images) {
    const position = image.position;
    const rect = position.boundingRect;
    const size = rect && rect.width && rect.height ? `${rect.width.toFixed(1)}×${rect.height.toFixed(1)}` : 'unknown size';
    const x = position.getX();
    const y = position.getY();
    const coords = x !== undefined && y !== undefined ? `(${x.toFixed(1)}, ${y.toFixed(1)})` : '(unknown coordinates)';
    const pageIndex = position.pageIndex ?? '?';
    console.log(`- Page ${pageIndex}: ${coords} — ${size}`);
  }
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
