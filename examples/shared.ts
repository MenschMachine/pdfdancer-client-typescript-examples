import path from 'node:path';
import {constants} from 'node:fs';
import {access, mkdir, readFile} from 'node:fs/promises';
import {PDFDancer} from 'pdfdancer-client-typescript';

export const SHOWCASE_PATH = path.resolve('examples/Showcase.pdf');
export const LOGO_PATH = path.resolve('examples/logo.png');
export const EXPERIMENT_PATH = path.resolve('examples/experiment.png');
export const BASIC_PATHS_PATH = path.resolve('examples/basic-paths.pdf');
export const CLIPPING_TEST_PATH = path.resolve('examples/clipping/invisible-content-clipping-test.pdf');

export interface OpenPdfOptions {
    token?: string;
    baseUrl?: string;
    timeout?: number;
}

export async function ensureFileExists(filePath: string, label = 'File'): Promise<void> {
    try {
        await access(filePath, constants.F_OK);
    } catch {
        throw new Error(`${label} not found: ${filePath}`);
    }
}

export async function ensureParentDirectory(filePath: string): Promise<void> {
    const directory = path.dirname(filePath);
    await mkdir(directory, {recursive: true});
}

export async function openPdfFromPath(
    pdfPath: string,
    options: OpenPdfOptions = {}
): Promise<PDFDancer> {
    await ensureFileExists(pdfPath, 'PDF file');
    const pdfBytes = await readFile(pdfPath);
    return PDFDancer.open(pdfBytes, options.token, options.baseUrl, options.timeout);
}
