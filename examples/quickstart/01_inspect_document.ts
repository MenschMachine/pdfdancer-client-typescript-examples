import { SHOWCASE_PATH, openPdfFromPath } from '../shared';

function shorten(text: string, max = 80): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export async function runExample(pdfPath: string = SHOWCASE_PATH): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const pages = await pdf.pages();
  const [paragraphs, textLines, images, formFields] = await Promise.all([
    pdf.selectParagraphs(),
    pdf.selectTextLines(),
    pdf.selectImages(),
    pdf.selectFormFields()
  ]);

  console.log('Document Summary');
  console.log('================');
  console.log(`Total pages: ${pages.length}`);
  console.log(`Total paragraphs: ${paragraphs.length}`);
  console.log(`Total text lines: ${textLines.length}`);
  console.log(`Total images: ${images.length}`);
  console.log(`Total form fields: ${formFields.length}`);

  if (!pages.length) {
    console.log('\nThis PDF does not contain any pages.');
    return;
  }

  const firstPage = pages[0];
  const [pageParagraphs, pageImages, pageFormFields] = await Promise.all([
    firstPage.selectParagraphs(),
    firstPage.selectImages(),
    firstPage.selectFormFields()
  ]);

  console.log('\nFirst Page Details');
  console.log('------------------');
  console.log(`Page index: ${firstPage.position.pageIndex ?? 0}`);
  console.log(`Paragraphs on page: ${pageParagraphs.length}`);
  console.log(`Images on page: ${pageImages.length}`);
  console.log(`Form fields on page: ${pageFormFields.length}`);

  const sample = pageParagraphs.slice(0, 5);
  if (!sample.length) {
    console.log('\nNo paragraphs found on the first page.');
    return;
  }

  console.log('\nSample paragraphs:');
  for (const paragraph of sample) {
    const x = paragraph.position.getX();
    const y = paragraph.position.getY();
    const coords = x !== undefined && y !== undefined ? `(${x.toFixed(1)}, ${y.toFixed(1)})` : '(?, ?)';
    const text = shorten((paragraph.getText() ?? '').replace(/\s+/g, ' '));
    console.log(`- ${coords} :: ${text}`);
  }
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
