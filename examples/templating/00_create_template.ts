import path from 'node:path';
import { Color, PDFDancer } from 'pdfdancer-client-typescript';
import { ensureParentDirectory } from '../shared';

const OUTPUT_PATH = path.resolve('examples/templating/template.pdf');

export async function runExample(
  outputPath: string = OUTPUT_PATH
): Promise<void> {
  const pdf = await PDFDancer.new({ pageSize: { width: 612, height: 792 } });

  // Page 1: Certificate template
  await pdf.page(1).newParagraph()
    .text('{{HEADER}}')
    .font('Helvetica-Bold', 24)
    .color(new Color(0, 0, 128))
    .at(250, 720)
    .apply();

  await pdf.page(1).newParagraph()
    .text('Certificate of Completion')
    .font('Helvetica-Bold', 28)
    .color(new Color(0, 0, 0))
    .at(150, 650)
    .apply();

  await pdf.page(1).newParagraph()
    .text('This is to certify that')
    .font('Helvetica', 14)
    .color(new Color(0, 0, 0))
    .at(220, 550)
    .apply();

  await pdf.page(1).newParagraph()
    .text('{{NAME}}')
    .font('Helvetica-Bold', 20)
    .color(new Color(0, 0, 128))
    .at(250, 500)
    .apply();

  await pdf.page(1).newParagraph()
    .text('has successfully completed the course on')
    .font('Helvetica', 14)
    .color(new Color(0, 0, 0))
    .at(180, 450)
    .apply();

  await pdf.page(1).newParagraph()
    .text('{{DATE}}')
    .font('Helvetica', 14)
    .color(new Color(0, 0, 0))
    .at(260, 400)
    .apply();

  await pdf.page(1).newParagraph()
    .text('Issued by {{COMPANY}}')
    .font('Helvetica', 12)
    .color(new Color(100, 100, 100))
    .at(220, 300)
    .apply();

  await pdf.page(1).newParagraph()
    .text('{{HIGHLIGHT}}')
    .font('Helvetica', 12)
    .color(new Color(0, 0, 0))
    .at(250, 200)
    .apply();

  await pdf.page(1).newParagraph()
    .text('{{SHORT}}')
    .font('Helvetica', 10)
    .color(new Color(0, 0, 0))
    .at(200, 150)
    .apply();

  // Page 2
  await pdf.newPage().customSize(612, 792).add();

  await pdf.page(2).newParagraph()
    .text('{{HEADER}}')
    .font('Helvetica-Bold', 24)
    .color(new Color(0, 0, 128))
    .at(250, 720)
    .apply();

  await pdf.page(2).newParagraph()
    .text('Additional Details')
    .font('Helvetica-Bold', 18)
    .color(new Color(0, 0, 0))
    .at(220, 650)
    .apply();

  await pdf.page(2).newParagraph()
    .text('This page contains additional information.')
    .font('Helvetica', 12)
    .color(new Color(0, 0, 0))
    .at(180, 600)
    .apply();

  await ensureParentDirectory(outputPath);
  await pdf.save(outputPath);
  console.log(`Created template PDF at ${outputPath}`);
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
