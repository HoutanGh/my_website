# My website

I built this site with React and Vite. It’s where I keep my projects, work and CV, along with what I’m reading and learning.

[Visit the site](https://houtangh.github.io/my_website/)

## Run it locally

```sh
npm install
npm run dev
```

Open the URL that Vite prints in the terminal.

Run `npm run check` for lint and build checks.

## Where I make changes

- `src/data/` has the projects, work, books and learning entries.
- `src/components/` has the React components.
- `src/styles.css` has the styles.
- `public/cv/` has my CV.

When a link or audio file is ready, add it to the relevant entry in `src/data/`.

## Deploy

A push to `master` runs the checks and publishes `dist/` to GitHub Pages. The workflow uses `VITE_BASE_PATH` for the Pages URL. Vite uses `/` locally.

For a new copy of the repo, set the Pages source to **GitHub Actions** in the repository settings.
