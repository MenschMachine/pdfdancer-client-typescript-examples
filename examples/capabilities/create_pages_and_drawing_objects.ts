import path from 'node:path';
import {Color, PDFDancer} from 'pdfdancer-client-typescript';
import {openPdfFromPath} from '../shared';

export async function runExample(): Promise<void> {
  const pdf = await openPdfFromPath(path.resolve('examples/Showcase.pdf'));
  await pdf.newPage().customSize(300, 300).landscape().add();
  const page = 8;
  await pdf.newLine(page).from(30, 30).to(180, 80).strokeColor(Color.RED).strokeWidth(2).add();
  await pdf.newBezier(page).from(40, 120).control1(80, 180).control2(150, 60).to(220, 120).strokeColor(Color.BLACK).add();
  await pdf.newRectangle(page).at(40, 180).size(100, 60).strokeColor(Color.RED).add();
  await pdf.newPath(page).rectangle(180, 170, 80, 60).strokeColor(Color.BLACK).fillColor(new Color(220, 220, 80)).at(page, 0, 0).add();
  if (process.env.PDFDANCER_RUN_IMAGE_BUILDER === '1') {
    await pdf.newImage().fromFile(path.resolve('examples/experiment.png')).at(page, 120, 30).add();
  }
  await pdf.save(path.resolve('output/capabilities/created_pages_and_drawing_objects.pdf'));
}
runExample().catch(console.error);
