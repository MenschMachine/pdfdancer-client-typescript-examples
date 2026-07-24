import path from 'node:path';
import {PDFDancer, TextReplaceRequest} from 'pdfdancer-client-typescript';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const response = await pdf.text().replace(
    TextReplaceRequest.literal('PDFDancer', 'PDFDancer SDK').build()
  );
  console.log(`Matched ${response.matched} text range(s).`);
  await pdf.save(path.resolve('output/working-with-text/replaced_text.pdf'));
}
runExample().catch(console.error);
