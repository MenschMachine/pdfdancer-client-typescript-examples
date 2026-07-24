import path from 'node:path';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const matches = await pdf.findFonts('Helvetica', 12);
  console.log('Matching fonts:', matches.length);
  const fontPath = process.env.PDFDANCER_FONT_PATH;
  if (fontPath) console.log('Registered font:', await pdf.registerFont(fontPath));
}
runExample().catch(console.error);
