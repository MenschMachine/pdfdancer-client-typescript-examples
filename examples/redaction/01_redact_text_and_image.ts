import path from 'node:path';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/redaction/redacted_showcase.pdf');

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);

    // Redact text on page 1 - the phrase "This line will be replaced."
    const paragraphs = await pdf.page(1).selectParagraphs();
    const targetParagraph = paragraphs.find((p) =>
        (p.getText() ?? '').includes('This line will be replaced')
    );
    if (targetParagraph) {
        await targetParagraph.redact('[REDACTED]');
        console.log('Redacted text paragraph');
    }

    // Redact an image on page 3 (the first image - Transparent PNG)
    const images = await pdf.page(3).selectImages();
    if (images.length > 0) {
        await images[0].redact();
        console.log('Redacted first image on page 3');
    }

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(`Saved redacted PDF to ${outputPath}`);
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
