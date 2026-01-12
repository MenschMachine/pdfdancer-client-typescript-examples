import path from 'node:path';
import { PDFDancer } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath } from '../shared';

const TEMPLATE_PATH = path.resolve('examples/templating/template.pdf');
const OUTPUT_PATH = path.resolve('output/templating/text_reflow.pdf');

export async function runExample(
  templatePath: string = TEMPLATE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(templatePath);

  // Use BEST_EFFORT reflow for longer replacement text
  await pdf
    .replace('{{SHORT}}', 'This is a much longer replacement text that may need reflowing')
    .bestEffort()
    .apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Filled placeholder with reflow and saved to ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
