import { openPdfFromPath, SHOWCASE_PATH } from '../shared';

export async function runExample(pdfPath: string = SHOWCASE_PATH): Promise<void> {
  const pdf = await openPdfFromPath(pdfPath);
  const fields = await pdf.selectFormFields();
  console.log(`Found ${fields.length} form fields:\n`);

  for (const field of fields) {
    const value = field.value && field.value.trim().length > 0 ? field.value : '(empty)';
    console.log(`- ${field.name} :: ${field.type} :: ${value}`);
  }
}

if (require.main === module) {
  runExample().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
