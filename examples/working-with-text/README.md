# Working with text

These examples open `examples/Showcase.pdf` and demonstrate selector-based text
operations. Mutating examples write PDFs to `output/working-with-text/`.

- `01_replace_text_using_selector.ts` — replace text matched by a selector;
  saves `replaced_text.pdf`.
- `02_delete_text_using_selector.ts` — delete text matched by a selector; saves
  `deleted_text.pdf`.
- `03_insert_text_after_match.ts` — insert text after a matched range; saves
  `inserted_text.pdf`.
- `04_style_text_using_selector.ts` — apply styling to matched text; saves
  `styled_text.pdf`.

The first example is the recommended starting point because it demonstrates a
complete find-and-mutate workflow against an existing PDF.

Run it from the repository root:

```bash
npx tsx examples/working-with-text/01_replace_text_using_selector.ts
```
