# YOURS CAFE

This is the React + Vite site for YOURS CAFE.

## What's included

- Single-page React implementation of the main site sections
- Reused static assets from the original project (`public/images`, `public/fonts`, icons/manifests)
- Smoother interactions:
  - hero powder animation overlay
  - auto-rotating carousel
  - mobile menu transitions
  - scroll reveal animations
- Order form flow with async submit states

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown by Vite (usually `http://localhost:5173`).

## Quality checks

```bash
npm run lint
npm run build
```

## Project structure

- `src/App.jsx`: main page composition + interactive behaviors
- `src/App.css`: theme, layout, animations, responsive styling
- `src/index.css`: global reset and base document styles
- `public/images`: website images copied from the original static site
