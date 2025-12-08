import path from 'node:path';
import {Color} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/redaction/batch_redaction.pdf');

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);

    // Collect objects to redact
    const objectsToRedact = [];

    // Add sensitive paragraphs matching a pattern
    const ssnParagraphs = await pdf.selectParagraphsMatching('replaced');
    objectsToRedact.push(...ssnParagraphs);

    // Add text lines from page 1
    const textLines = await pdf.page(1).selectTextLinesMatching('line will be');
    objectsToRedact.push(...textLines);

    // Add images from page 3
    const images = await pdf.page(3).selectImages();
    objectsToRedact.push(...images);

    console.log(`Found ${objectsToRedact.length} objects to redact`);

    // Batch redact all objects at once
    const result = await pdf.redact(objectsToRedact, {
        defaultReplacement: '[REDACTED]',
        placeholderColor: new Color(0, 0, 0)  // Black for images/paths
    });

    console.log(`Redaction complete - Success: ${result.success}`);
    console.log(`Redacted ${result.count} objects`);

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
