# PDFDancer Client TypeScript Examples

This repository mirrors the Python example suite with idiomatic TypeScript/Node
scripts powered by [`pdfdancer-client-typescript`](../pdfdancer-client-typescript/_main).
Each file focuses on a single workflow—inspect, edit, or export PDF content—so
you can copy snippets directly into your projects.

## Prerequisites

- Node.js 20+
- A PDFDancer API token (`PDFDANCER_TOKEN`)
- (Optional) Custom API endpoint (`PDFDANCER_BASE_URL`, defaults to `https://api.pdfdancer.com`)
- Local sample PDFs (`examples/Showcase.pdf`, `examples/logo.png`, and `examples/ISO 32000-2 FDIS.pdf` are included)

## Getting Started

```bash
npm install

export PDFDANCER_TOKEN=your-token-here
# optionally customise the API endpoint
export PDFDANCER_BASE_URL=https://api.pdfdancer.com
```

Run any script with `tsx` via the provided helper:

```bash
npm run example -- examples/quickstart/01_inspect_document.ts
npm run example -- examples/working-with-text/02_redact_phrases.ts
npm run example -- examples/working-with-pages/04_add_blank_page.ts
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
- `examples/misc/01_upload_large_file.ts` – benchmark upload/save times for a large PDF.
- `output/` – destination for generated PDFs and text exports.
- `logs/` – HTTP traces emitted by the SDK when `PDFDANCER_CLIENT_DEBUG=1`.

See the README inside each `examples/<category>/` directory for per-file
summaries.

## Helpful Links

- npm: https://www.npmjs.com/package/pdfdancer-client-typescript
- Issue tracker and feature requests: https://github.com/theflyingcodr/pdfdancer
- PDFDancer product overview: https://pdfdancer.com
