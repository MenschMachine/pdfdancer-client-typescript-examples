import path from 'node:path';
import {Color} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/redaction/images_redacted_with_color.pdf');
const TARGET_PAGE = 3;

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH,
    pageNumber: number = TARGET_PAGE
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);

    const images = await pdf.page(pageNumber).selectImages();

    if (!images.length) {
        throw new Error(`No images found on page ${pageNumber}`);
    }

    // Redact images with a gray placeholder color
    for (const image of images) {
        await image.redact({color: new Color(128, 128, 128)});
    }

    console.log(`Redacted ${images.length} images with gray placeholder`);

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
