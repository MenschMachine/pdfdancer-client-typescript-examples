import path from 'node:path';
import {readFile} from 'node:fs/promises';
import {Image} from 'pdfdancer-client-typescript';
import {ensureParentDirectory, openPdfFromPath, REPLACEMENT_LOGO_PATH, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-images/replaced_image.pdf');
const TARGET_PAGE = 3;

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH,
    replacementImagePath: string = REPLACEMENT_LOGO_PATH
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);
    const images = await pdf.page(TARGET_PAGE).selectImages();
    if (!images.length) {
        throw new Error(`No images found on page ${TARGET_PAGE} to replace.`);
    }

    const imageData = await readFile(replacementImagePath);
    const replacementImage = new Image(undefined, 'png', undefined, undefined, new Uint8Array(imageData));

    const result = await images[0].replace(replacementImage);
    if (!result.success) {
        throw new Error(result.message ?? 'Image replacement failed');
    }

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(`Replaced first image on page ${TARGET_PAGE} with ${replacementImagePath} and saved to ${outputPath}.`);
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
