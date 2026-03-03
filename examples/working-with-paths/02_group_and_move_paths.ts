import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, BASIC_PATHS_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-paths/moved_group.pdf');

export async function runExample(
  pdfPath: string = BASIC_PATHS_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const paths = await pdf.page(1).selectPaths();
  if (paths.length < 2) {
    throw new Error(`Need at least 2 paths on page 1, found ${paths.length}.`);
  }

  const pathIds = paths.slice(0, 2).map(p => p.internalId);
  const group = await pdf.page(1).groupPaths(pathIds);
  await group.moveTo(200, 300);

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Grouped ${group.pathCount} paths, moved to (200, 300), saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
