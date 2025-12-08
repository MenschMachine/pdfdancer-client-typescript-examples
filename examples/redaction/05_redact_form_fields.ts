import path from 'node:path';
import {ObjectType} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/redaction/form_fields_redacted.pdf');

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);

    // Get all form fields
    const fields = await pdf.selectFormFields();

    if (!fields.length) {
        throw new Error('No form fields found in PDF');
    }

    // Redact all text fields
    let redactedCount = 0;
    for (const field of fields) {
        if (field.type === ObjectType.TEXT_FIELD) {
            await field.redact('[REMOVED]');
            redactedCount++;
        }
    }

    console.log(`Redacted ${redactedCount} form fields`);

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(`Saved to ${outputPath}`);
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
