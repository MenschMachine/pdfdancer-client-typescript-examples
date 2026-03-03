import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, BASIC_PATHS_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-paths/removed_group.pdf');

export async function runExample(
  pdfPath: string = BASIC_PATHS_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const paths = await pdf.page(1).selectPaths();
  if (!paths.length) {
    throw new Error('No paths found on page 1 to remove.');
  }

  const pathIds = [paths[0].internalId];
  const group = await pdf.page(1).groupPaths(pathIds);
  await group.remove();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Removed path group with ${group.pathCount} path(s), saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
