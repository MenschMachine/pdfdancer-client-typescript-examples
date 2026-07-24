import path from 'node:path';
import {PDFDancer, TextDeleteRequest} from 'pdfdancer-client-typescript';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const response = await pdf.text().delete(
    TextDeleteRequest.literal('PDFDancer').build()
  );
  console.log(`Deleted ${response.changed} text range(s).`);
  await pdf.save(path.resolve('output/working-with-text/deleted_text.pdf'));
}
runExample().catch(console.error);
