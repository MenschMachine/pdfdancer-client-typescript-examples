import path from 'node:path';
import { Color, Font, TemplateReplacement, TemplateReplaceRequest } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath } from '../shared';

const TEMPLATE_PATH = path.resolve('examples/templating/template.pdf');
const OUTPUT_PATH = path.resolve('output/templating/custom_formatting.pdf');

export async function runExample(
  templatePath: string = TEMPLATE_PATH,
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await openPdfFromPath(templatePath);

  // Fill with custom font and color
  await pdf.applyReplacements(new TemplateReplaceRequest([
    new TemplateReplacement(
      '{{HIGHLIGHT}}',
      'Important Text',
      new Font('Helvetica-Bold', 14),
      new Color(255, 0, 0)
    ),
  ]));

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Filled placeholder with custom formatting and saved to ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
