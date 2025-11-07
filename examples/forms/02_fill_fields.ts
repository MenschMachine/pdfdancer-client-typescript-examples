import path from 'node:path';
import { ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH } from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-forms/filled.pdf');
const FIELD_UPDATES: Record<string, string> = {
  Name: 'Ada Lovelace',
  Email: 'ada@example.com',
  Subscribe: 'Yes'
};

export async function runExample(
  pdfPath: string = SHOWCASE_PATH,
  outputPath: string = OUTPUT_PATH,
  updates: Record<string, string> = FIELD_UPDATES
): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);

  for (const [name, value] of Object.entries(updates)) {
    const matches = await pdf.selectFieldsByName(name);
    if (!matches.length) {
      console.log(`Skipping '${name}' — field not found`);
      continue;
    }

    await Promise.all(matches.map((field) => field.fill(value)));
  }

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Filled ${Object.keys(updates).length} fields and saved to ${outputPath}.`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
