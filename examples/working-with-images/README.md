# Working with images

Most examples open `examples/Showcase.pdf` and write results to
`output/working-with-images/`. The clipping example uses the dedicated fixture
`examples/clipping/invisible-content-clipping-test.pdf`.

- `01_list_images.ts` — list image metadata, page numbers, and coordinates.
  This example only inspects the document.
- `02_move_image.ts` — move the first image on a page; saves `moved_image.pdf`.
- `03_delete_images.ts` — delete all images from a page; saves
  `no_images_page.pdf`.
- `04_scale_image.ts` — scale the first image to half size; saves
  `scaled_image.pdf`.
- `05_scale_to_size.ts` — scale an image to explicit dimensions; saves
  `scaled_to_size.pdf`.
- `06_rotate_image.ts` — rotate the first image; saves `rotated_image.pdf`.
- `07_crop_image.ts` — crop the first image; saves `cropped_image.pdf`.
- `08_set_opacity.ts` — change the first image's opacity; saves
  `opacity_image.pdf`.
- `09_flip_image.ts` — flip the first image horizontally or vertically; saves
  `flipped_image.pdf`.
- `10_replace_image.ts` — replace the first image with
  `examples/replacement-logo.png`; saves `replaced_image.pdf`.
- `11_clear_image_clipping.ts` — remove the clipping path from a hidden image
  in the clipping fixture; saves `clear_image_clipping.pdf`.
- `12_move_scale_rotate_and_flip_image.ts` — chain several image transforms;
  saves `moved_scaled_rotated_flipped_image.pdf`.

Run an example from the repository root:

```bash
npx tsx examples/working-with-images/01_list_images.ts
```
