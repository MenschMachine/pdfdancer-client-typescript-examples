import path from 'node:path';
import { PDFDancer } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath } from '../shared';

const TEMPLATE_PATH = path.resolve('examples/templating/template.pdf');
const OUTPUT_PATH = path.resolve('output/templating/basic_fill.pdf');

export async function runExample(
  templatePath: string = TEMPLATE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(templatePath);

  // Fill placeholders using fluent API
  await pdf
    .replace('{{NAME}}', 'John Doe')
    .and('{{DATE}}', 'January 12, 2026')
    .and('{{COMPANY}}', 'Acme Corp')
    .apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Filled placeholders and saved to ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
