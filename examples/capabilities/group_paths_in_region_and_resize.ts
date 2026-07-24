import path from 'node:path';
import {BoundingRect} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/basic-paths.pdf'));
  const group = await pdf.page(1).groupPathsInRegion(new BoundingRect(0, 0, 600, 800));
  await group.resize(300, 300);
  const output = path.resolve('output/capabilities/grouped_paths_in_region_and_resized.pdf');
  await ensureParentDirectory(output);
  await pdf.save(output);
}
runExample().catch(console.error);
