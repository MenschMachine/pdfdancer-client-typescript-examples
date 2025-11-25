import path from 'node:path';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-pages/deleted_page.pdf');
const PAGE_NUMBER = 4;

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH,
    pageNumber: number = PAGE_NUMBER
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);
    const pages = await pdf.pages();
    if (pageNumber > pages.length) {
        throw new Error(`Page number ${pageNumber} out of range.`);
    }

    await pdf.page(pageNumber).delete();
    const remaining = await pdf.pages();

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(`Deleted page ${pageNumber}. Document now has ${remaining.length} pages.`);
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
