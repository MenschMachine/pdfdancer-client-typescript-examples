import { openPdfFromPath, BASIC_PATHS_PATH } from '../shared';

export async function runExample(pdfPath: string = BASIC_PATHS_PATH): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const paths = await pdf.page(1).selectPaths();

  if (!paths.length) {
    console.log('No paths found on page 1.');
    return;
  }

  console.log(`Found ${paths.length} paths on page 1:\n`);
  for (const p of paths) {
    const position = p.position;
    const x = position.getX();
    const y = position.getY();
    const coords = x !== undefined && y !== undefined ? `(${x.toFixed(1)}, ${y.toFixed(1)})` : '(unknown coordinates)';
    console.log(`- ID: ${p.internalId} at ${coords}`);
  }
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
