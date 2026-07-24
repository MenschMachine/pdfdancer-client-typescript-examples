import path from 'node:path';
import {PDFDancer, TextInsertRequest} from 'pdfdancer-client-typescript';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const response = await pdf.text().insert(
    TextInsertRequest.after('PDFDancer', ' — current SDK').build()
  );
  console.log(`Inserted at ${response.changed} target(s).`);
  await pdf.save(path.resolve('output/working-with-text/inserted_text.pdf'));
}
runExample().catch(console.error);
