import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-forms/checked.pdf');
const CHECKBOX_NAME = 'Subscribe';
const CHECKED_VALUE = 'Yes';

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  checkboxName: string = CHECKBOX_NAME,
  checkedValue: string = CHECKED_VALUE
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const matches = await pdf.selectFieldsByName(checkboxName);
  if (!matches.length) {
    throw new Error(`No checkbox found with name '${checkboxName}'.`);
  }

  await Promise.all(matches.map((field) => field.fill(checkedValue)));

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Checked '${checkboxName}' and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
