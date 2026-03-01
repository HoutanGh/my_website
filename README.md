# my_website (React)

This repository has been migrated from a static multi-page site to a React + Vite app.

The original static files are preserved in `legacy/`:
- `legacy/index.html`
- `legacy/projects.html`
- `legacy/contact.html`
- `legacy/doing.html`
- `legacy/style.css`
- `legacy/script.js`

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Production build check

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

A workflow is included at `.github/workflows/deploy.yml`.

1. Push to `main`.
2. In GitHub repo settings, set Pages source to `GitHub Actions`.
3. The workflow builds and deploys `dist/` automatically.

The workflow sets `VITE_BASE_PATH` automatically:
- User site repo (`<user>.github.io`) -> `/`
- Project repo (`my_website`) -> `/my_website/`
