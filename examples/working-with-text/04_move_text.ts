import path from 'node:path';
import {ensureParentDirectory, openPdfFromPath, SHOWCASE_PATH} from '../shared';

const OUTPUT_PATH = path.resolve('output/working-with-text/moved_text.pdf');
const TEXT_PREFIX = 'This is regular';
const NEW_POSITION = {x: 70, y: 500} as const;

export async function runExample(
    pdfPath: string = SHOWCASE_PATH,
    outputPath: string = OUTPUT_PATH,
    textPrefix: string = TEXT_PREFIX
): Promise<void> {
    const pdf = await openPdfFromPath(pdfPath);
    const matches = await pdf.page(1).selectTextLinesStartingWith(textPrefix);
    if (!matches.length) {
        throw new Error(`No text line found starting with "${textPrefix}".`);
    }

    const [line] = matches;
    await line.edit().moveTo(NEW_POSITION.x, NEW_POSITION.y).apply();

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(
        `Moved text line to (${NEW_POSITION.x}, ${NEW_POSITION.y}) and saved to ${outputPath}.`
    );
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
