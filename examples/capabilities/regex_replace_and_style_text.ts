import path from 'node:path';
import {PDFDancer, TextReplaceRequest, TextStyleRequest} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const replacement = TextReplaceRequest.regex('PDFDancer', 'PDFDancer').maxMatches(2).build();
  console.log((await pdf.text().replace(replacement)).changed);
  const style = TextStyleRequest.literal('PDFDancer').font('Helvetica-Bold').size(16).build();
  console.log((await pdf.page(1).text().style(style)).changed);
  const output = path.resolve('output/capabilities/regex_replaced_and_styled_text.pdf');
  await ensureParentDirectory(output);
  await pdf.save(output);
}
runExample().catch(console.error);
