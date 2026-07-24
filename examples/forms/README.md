# Working with forms

These examples open `examples/Showcase.pdf` and demonstrate AcroForm field
inspection and mutation. Mutating examples write PDFs to
`output/working-with-forms/`.

- `01_list_fields.ts` — list each field's name, type, and current value. This
  example only inspects the document.
- `02_fill_fields.ts` — populate available fields by name and save `filled.pdf`.
- `03_check_boxes.ts` — check a checkbox widget and save `checked.pdf`.
- `04_clear_fields.ts` — clear the document's fields and save `cleared.pdf`.

Run an example from the repository root:

```bash
npx tsx examples/forms/01_list_fields.ts
```
