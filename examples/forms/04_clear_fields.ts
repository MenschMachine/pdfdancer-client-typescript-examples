import path from 'node:path';
import { ObjectType } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-forms/cleared.pdf');

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const fields = await pdf.selectFormFields();

  for (const field of fields) {
    if (field.type === ObjectType.CHECKBOX || field.type === ObjectType.RADIO_BUTTON) {
      await field.fill('Off');
    } else {
      await field.fill('');
    }
  }

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Cleared ${fields.length} fields and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
