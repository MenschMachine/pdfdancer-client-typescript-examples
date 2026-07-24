<div align="center">

# PDFDancer TypeScript Examples

<img src="media/logo-silver-512h.webp" alt="PDFDancer logo" width="120">

</div>

Examples for editing and inspecting existing PDF documents with the
[`pdfdancer-client-typescript`](https://github.com/MenschMachine/pdfdancer-client-typescript)
SDK.

The repository contains runnable TypeScript programs for common PDF workflows:
text, images, pages, vector paths, forms, and advanced selectors. Each example
uses a fixture in `examples/` and writes generated documents to `output/` when
it performs a mutation.

## Quick start

Requirements:

- Node.js 20 or newer
- A PDFDancer API token

From the repository root:

```bash
npm install
export PDFDANCER_API_TOKEN=your-token-here
npx tsx examples/working-with-text/01_replace_text_using_selector.ts
```

The example saves the result to
`output/working-with-text/replaced_text.pdf`. Open that file to inspect the
modified PDF.

For PowerShell, set the token with:

```powershell
$env:PDFDANCER_API_TOKEN = "your-token-here"
npx tsx examples/working-with-text/01_replace_text_using_selector.ts
```

All commands should be run from the repository root because the examples use
repository-relative fixture paths.

## Configuration

The SDK reads these environment variables:

| Variable | Required | Description |
| --- | --- | --- |
| `PDFDANCER_API_TOKEN` | Yes | Preferred API authentication variable. |
| `PDFDANCER_TOKEN` | No | Legacy authentication variable, also supported. |
| `PDFDANCER_BASE_URL` | No | API endpoint; defaults to `https://api.pdfdancer.com`. |
| `PDFDANCER_CLIENT_DEBUG` | No | Set to `1` to enable SDK HTTP debug traces. |

Two advanced examples use additional variables:

- `PDFDANCER_FONT_PATH` supplies a font file to the font registration example.
- `PDFDANCER_RUN_IMAGE_BUILDER=1` enables the optional image-builder operation
  in the drawing-objects example.

## Examples

Start with the quick-start text replacement example, then browse the category
indexes for focused workflows.

- [Working with text](examples/working-with-text/README.md) — find, replace,
  insert, delete, and style text using selectors.
- [Working with images](examples/working-with-images/README.md) — inspect,
  move, resize, rotate, crop, replace, and transform images.
- [Working with pages](examples/working-with-pages/README.md) — reorder,
  extract, delete, and add pages.
- [Working with paths](examples/working-with-paths/README.md) — inspect,
  group, move, resize, rotate, remove, and recolor vector paths.
- [Working with forms](examples/forms/README.md) — inspect and mutate AcroForm
  fields and checkbox widgets.
- [Advanced capabilities](examples/capabilities/README.md) — create drawing
  objects, use snapshots and coordinate selectors, register fonts, fill image
  regions, group paths, and combine text operations.

## Running examples

Run an individual example with `npx tsx`:

```bash
npx tsx examples/working-with-images/01_list_images.ts
```

To run every TypeScript example in alphabetical order:

```bash
npm run example
```

The full suite requires a valid token and may include advanced examples with
additional environment requirements. Individual category READMEs document
their fixtures and output files.

Check the TypeScript sources without contacting the API:

```bash
npm run typecheck
```

## Repository layout

- `examples/` — input PDFs, images, and runnable TypeScript examples.
- `output/` — generated PDFs and other example results; created on demand and
  ignored by Git.
- `logs/` — optional SDK debug traces; ignored by Git.
- `scripts/run-examples.js` — runner used by `npm run example`.

## Helpful links

- [API documentation](https://docs.pdfdancer.com?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [Product overview](https://www.pdfdancer.com?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [npm package](https://www.npmjs.com/package/pdfdancer-client-typescript)
- [Changelog](https://www.pdfdancer.com/changelog/?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [Status](https://status.pdfdancer.com?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [Issue tracker](https://github.com/MenschMachine/pdfdancer-client-typescript-examples/issues)
