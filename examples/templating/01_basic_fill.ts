import path from 'node:path';
import { TemplateReplacement, TemplateReplaceRequest } from 'pdfdancer-client-typescript';
import { ensureParentDirectory, openPdfFromPath } from '../shared';

const TEMPLATE_PATH = path.resolve('examples/templating/template.pdf');
const OUTPUT_PATH = path.resolve('output/templating/basic_fill.pdf');

const REPLACEMENTS: Record<string, string> = {
  '{{NAME}}': 'John Doe',
  '{{DATE}}': 'January 7, 2026',
  '{{COMPANY}}': 'Acme Corp'
};

export async function runExample(
  templatePath: string = TEMPLATE_PATH,
  outputPath: string = OUTPUT_PATH,
  replacements: Record<string, string> = REPLACEMENTS
): Promise<void> {
  const pdf = await openPdfFromPath(templatePath);

  const templateReplacements = Object.entries(replacements).map(
    ([placeholder, text]) => new TemplateReplacement(placeholder, text)
  );

  await pdf.applyReplacements(new TemplateReplaceRequest(templateReplacements));

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Filled ${templateReplacements.length} placeholders and saved to ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
