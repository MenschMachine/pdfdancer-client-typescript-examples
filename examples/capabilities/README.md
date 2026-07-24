# Advanced capabilities

These examples demonstrate capabilities that combine multiple selectors or
operate below the core workflow examples. They use either
`examples/Showcase.pdf` or `examples/basic-paths.pdf` and write results to
`output/capabilities/` when they create a PDF.

- `create_pages_and_drawing_objects.ts` — create pages and drawing objects.
  Set `PDFDANCER_RUN_IMAGE_BUILDER=1` to enable its optional image-builder
  operation.
- `fill_region_of_image.ts` — fill a selected region of an image.
- `find_and_register_fonts.ts` — find matching fonts and optionally register a
  font file. Set `PDFDANCER_FONT_PATH` to register a font.
- `group_paths_in_region_and_resize.ts` — group paths in a region and resize
  the resulting group.
- `read_snapshots_and_use_coordinate_selectors.ts` — read document snapshots
  and query objects with coordinate selectors. This example only inspects the
  document.
- `regex_replace_and_style_text.ts` — replace text with a regular expression
  and style matched text.

Run an example from the repository root:

```bash
npx tsx examples/capabilities/read_snapshots_and_use_coordinate_selectors.ts
```

These examples are intended as focused SDK references. For the shortest path
to a working document mutation, start with
`examples/working-with-text/01_replace_text_using_selector.ts` instead.
