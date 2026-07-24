# Working with pages

These examples open `examples/Showcase.pdf` and demonstrate page-level
operations. Mutating examples write PDFs to `output/working-with-pages/`.

- `01_reorder_pages.ts` — move one page to a different position and save
  `reordered.pdf`.
- `02_extract_pages.ts` — keep the first three pages and save
  `first_three_pages.pdf`.
- `03_delete_pages.ts` — delete a selected page and save `deleted_page.pdf`.
- `04_add_blank_page.ts` — append a blank Letter-sized page and save
  `extra_page.pdf`.

Run an example from the repository root:

```bash
npx tsx examples/working-with-pages/01_reorder_pages.ts
```
