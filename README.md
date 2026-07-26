# Houtan Ghaebi — Portfolio

A responsive one-page portfolio built with React and Vite. The site presents current
projects, professional experience, reading, music, language study, and other active
learning in a compact interface designed for quick scanning and optional exploration.

## Structure

- `src/components/` contains the header, project/work explorer, and Now section.
- `src/data/` contains the editable portfolio content.
- `public/cv/` contains the downloadable CV.
- `src/styles.css` contains the complete responsive visual system.

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Checks

```bash
npm run lint
npm run build
```

## GitHub Pages deployment

A workflow is included at `.github/workflows/deploy.yml` and runs when `master` is
pushed.

1. Push to `master`.
2. In GitHub repo settings, set Pages source to `GitHub Actions`.
3. The workflow builds and deploys `dist/` automatically.

The workflow sets `VITE_BASE_PATH` automatically for both user sites and project
sites. Local development continues to use `/`.

## Content placeholders

Links that are not yet public are intentionally rendered as non-navigating placeholder
controls. Update `src/data/links.js`, `src/data/projects.js`, and
`src/data/learning.js` when the real destinations or audio files are ready.
