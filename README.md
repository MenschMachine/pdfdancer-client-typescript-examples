<div align="center">

# PDFDancer TypeScript Examples

<img src="media/logo-silver-512h.webp" alt="PDFDancer logo" width="120">

</div>

## PDF used to be read-only. We fixed that.

**Edit text in any real-world PDF. Even ones you didn't create.**

This repository contains working TypeScript/Node examples built on
[`pdfdancer-client-typescript`](../pdfdancer-client-typescript/_main). Each
script focuses on a single workflow—inspect, edit, or export PDF content—so you
can copy snippets straight into your own projects and ship faster with working
code examples. The examples run against real-world sample PDFs in `examples/`,
so you can see how PDFDancer behaves on documents you didn’t generate yourself.

## Prerequisites

- Node.js 20+
- A PDFDancer API token (`PDFDANCER_TOKEN`)
- (Optional) Custom API endpoint (`PDFDANCER_BASE_URL`, defaults to `https://api.pdfdancer.com`)
- Local sample PDFs (`examples/Showcase.pdf`, `examples/logo.png`, and `examples/ISO 32000-2 FDIS.pdf` are included)

## Getting Started

```bash
npm install

export PDFDANCER_TOKEN=your-token-here
```

Run any script directly with `npx tsx`:

```bash
npx tsx examples/quickstart/01_inspect_document.ts
npx tsx examples/working-with-text/02_redact_phrases.ts
npx tsx examples/redaction/01_redact_text_and_image.ts
```

Every script exports an async `runExample()` function, so you can also import
them elsewhere:

```typescript
import { runExample } from './examples/working-with-images/01_list_images';

await runExample();
```

## Repository Layout

- `examples/quickstart/` – inspect Showcase.pdf and dump its text output.
- `examples/working-with-text/` – replace, move, highlight, or watermark text.
- `examples/working-with-pages/` – reorder, extract, delete, or append pages.
- `examples/forms/` – enumerate, fill, toggle, and clear AcroForm fields.
- `examples/working-with-images/` – list, move, or delete page images.
- `examples/redaction/` – permanently redact text and images from PDFs.
- `examples/misc/01_upload_large_file.ts` – benchmark upload/save times for a large PDF.
- `output/` – destination for generated PDFs and text exports.
- `logs/` – HTTP traces emitted by the SDK when `PDFDANCER_CLIENT_DEBUG=1`.

See the README inside each `examples/<category>/` directory for per-file
summaries.

## Helpful links

- [API documentation](https://docs.pdfdancer.com?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [Product overview](https://www.pdfdancer.com?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [npm](https://www.npmjs.com/package/pdfdancer-client-typescript)
- [Changelog](https://www.pdfdancer.com/changelog/?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [Status](https://status.pdfdancer.com?utm_source=github&utm_medium=readme&utm_campaign=pdfdancer-ts-examples)
- [Issue tracker](https://github.com/MenschMachine/pdfdancer)
