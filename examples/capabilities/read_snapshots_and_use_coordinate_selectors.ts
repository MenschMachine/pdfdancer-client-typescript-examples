import path from 'node:path';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  const document = await pdf.getDocumentSnapshot();
  const page = pdf.page(1);
  const snapshot = await page.getSnapshot();
  const elements = await page.selectElements();
  const images = await page.selectImagesAt(60, 60, 10);
  const paths = await page.selectPathsAt(80, 580, 10);
  const forms = await page.selectForms();
  console.log('Document pages:', document.pages.length);
  console.log('Page elements:', elements.length, 'snapshot elements:', snapshot.elements.length);
  console.log('Images near (60,60):', images.length);
  console.log('Paths near (80,580):', paths.length);
  console.log('Form XObjects:', forms.length);
}
runExample().catch(console.error);
