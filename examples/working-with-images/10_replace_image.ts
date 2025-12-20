import path from 'node:path';
import {readFile} from 'node:fs/promises';
import {ensureParentDirectory, EXPERIMENT_PATH, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/replaced_image.pdf');

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH,
    replacementImagePath: string = EXPERIMENT_PATH
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);
    const images = await pdf.page(1).selectImages();
    if (!images.length) {
        throw new Error('No images found on page 1 to replace.');
    }

    // Read the replacement image file
    const imageData = await readFile(replacementImagePath);

    // Replace the first image with the new image data
    // Note: The library accepts raw image bytes directly
    const result = await images[0].replace(imageData as any);
    if (!result) {
        throw new Error('Image replacement returned false');
    }

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(`Replaced first image on page 1 with ${replacementImagePath} and saved to ${outputPath}.`);
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
