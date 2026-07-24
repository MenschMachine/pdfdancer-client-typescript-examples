import path from 'node:path';
import {PDFDancer, PdfColorRequest, TextStyleRequest} from 'pdfdancer-client-typescript';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const response = await pdf.text().style(
    TextStyleRequest.literal('PDFDancer')
      .font('Helvetica-Bold')
      .size(18)
      .fillColor(PdfColorRequest.rgb(0.8, 0.1, 0.1))
      .build()
  );
  console.log(`Styled ${response.changed} text range(s).`);
  await pdf.save(path.resolve('output/working-with-text/styled_text.pdf'));
}
runExample().catch(console.error);
