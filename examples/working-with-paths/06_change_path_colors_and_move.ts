import path from 'node:path';
import {Color} from 'pdfdancer-client-typescript';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/basic-paths.pdf'));
  const paths = await pdf.selectPaths();
  if (!paths.length) throw new Error('No paths found.');
  const vectorPath = paths[0];
  await vectorPath.edit().strokeColor(new Color(255, 0, 0)).fillColor(new Color(255, 255, 0)).apply();
  await vectorPath.moveTo(180, 500);
  await pdf.save(path.resolve('output/working-with-paths/changed_path_colors_and_position.pdf'));
}
runExample().catch(console.error);
