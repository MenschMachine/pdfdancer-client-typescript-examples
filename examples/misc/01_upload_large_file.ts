import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, LARGE_SAMPLE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/misc/large-file.pdf');
const UPLOAD_TIMEOUT_MS = 300_000; // 5 minutes for large file uploads

export async function runExample(
  pdfPath: string = LARGE_SAMPLE_PATH,
  outputPath: string = OUTPUT_PATH,
  timeout: number = UPLOAD_TIMEOUT_MS
): Promise<void> {
  const uploadStart = Date.now();
  const pdf = await openPdfFromPath(pdfPath, { timeout });
  const uploadSeconds = (Date.now() - uploadStart) / 1000;
  console.log(`Uploading time: ${uploadSeconds.toFixed(3)} seconds`);

  const saveStart = Date.now();
  try {
    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
  } finally {
    const saveSeconds = (Date.now() - saveStart) / 1000;
    console.log(`Saving time: ${saveSeconds.toFixed(3)} seconds`);
  }
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
