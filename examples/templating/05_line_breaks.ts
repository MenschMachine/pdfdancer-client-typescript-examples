import path from 'node:path';
import {Color, PDFDancer} from 'pdfdancer-client-typescript';
import {ensureParentDirectory} from '../shared';

const OUTPUT_PATH = path.resolve('output/templating/line_breaks.pdf');

export async function runExample(
    outputPath: string = OUTPUT_PATH
): Promise<void> {
    // Create a simple template with a placeholder followed by long text on a single line
    const pdf = await PDFDancer.new({pageSize: {width: 612, height: 792}});

    await pdf.page(1).newParagraph()
        .text('Line Breaks Example')
        .font('Helvetica-Bold', 20)
        .color(new Color(0, 0, 0))
        .at(180, 720)
        .apply();

    // A single-line paragraph with a placeholder that will be replaced with long text
    await pdf.page(1).newParagraph()
        .text('{{DESCRIPTION}} This text follows the placeholder on the same line.')
        .font('Helvetica', 12)
        .color(new Color(0, 0, 0))
        .at(50, 650)
        .apply();

    // Replace the placeholder with multi-line text using \n to force line breaks.
    // Without \n the replacement text would try to stay on one line and overflow.
    // With bestEffort() the reflow engine respects the explicit line breaks.
    await pdf
        .replace(
            '{{DESCRIPTION}}',
            'PDFDancer supports explicit line breaks in\n replacement text.'
        )
        .apply();

    await ensureParentDirectory(outputPath);
    await pdf.save(outputPath);
    console.log(`Created line breaks example at ${outputPath}`);
}

if (require.main === module) {
    runExample().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
