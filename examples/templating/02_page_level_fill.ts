import path from 'node:path';
import { PDFDancer } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath } from '../shared';

const TEMPLATE_PATH = path.resolve('examples/templating/template.pdf');
const OUTPUT_PATH = path.resolve('output/templating/page_level_fill.pdf');

export async function runExample(
  templatePath: string = TEMPLATE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(templatePath);

  // Fill placeholders only on page 1
  await pdf
    .replace('{{HEADER}}', 'Welcome')
    .onPage(1)
    .apply();

  // Fill placeholders only on page 2
  await pdf
    .replace('{{HEADER}}', 'Details')
    .onPage(2)
    .apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Filled page-specific placeholders and saved to ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
