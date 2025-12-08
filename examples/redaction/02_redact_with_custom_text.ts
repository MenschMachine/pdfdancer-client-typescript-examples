import path from 'node:path';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/redaction/custom_replacement.pdf');

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);

    // Find text lines matching a pattern (e.g., "replaced")
    const lines = await pdf.page(1).selectTextLinesMatching('replaced');

    for (const line of lines) {
        await line.redact('[CONTENT REMOVED]');
    }

    console.log(`Redacted ${lines.length} text lines with custom replacement`);

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
