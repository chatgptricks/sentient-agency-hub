# Sentient HQ

An interactive isometric hub for exploring Sentient Agency through seven working zones.

## Experience

- Seven animated room zooms mapped to the original agency illustration
- Source-backed cards for Sentient tools, client builds, dashboards and internal systems
- Clear live, source-only, pending and offline states instead of invented destinations
- Keyboard navigation with `1–7`, arrow keys and `Esc`
- Responsive mobile layout with an accessible detail sheet

The full Codex Projects audit and room mapping are recorded in [`PROJECT_INVENTORY.md`](./PROJECT_INVENTORY.md).

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages

The production site is a static Next.js export published from the `gh-pages` branch.

```bash
npm run build:pages
```

The generated site is written to `out/` and configured for the `/sentient-agency-hub` repository path.
