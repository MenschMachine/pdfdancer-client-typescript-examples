# Working with paths

These examples open `examples/basic-paths.pdf` and demonstrate inspection and
mutation of vector paths. Mutating examples write PDFs to
`output/working-with-paths/`.

- `01_list_paths.ts` — list vector paths and their coordinates. This example
  only inspects the document.
- `02_group_and_move_paths.ts` — group paths in a region and move the group;
  saves `moved_group.pdf`.
- `03_scale_path_group.ts` — scale a path group; saves `scaled_group.pdf`.
- `04_rotate_path_group.ts` — rotate a path group; saves `rotated_group.pdf`.
- `05_remove_path_group.ts` — remove a path group; saves `removed_group.pdf`.
- `06_change_path_colors_and_move.ts` — change path colors and move paths;
  saves `changed_path_colors_and_position.pdf`.

Run an example from the repository root:

```bash
npx tsx examples/working-with-paths/01_list_paths.ts
```
