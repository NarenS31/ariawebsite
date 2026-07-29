# ARIA Research Website

The public research website for ARIA, an open initiative investigating metacognitive AI for students with ADHD and learning disabilities.

## Stack

- React 18
- TypeScript
- Vite
- Framer Motion
- Plain CSS

## Local development

```bash
npm install
npm run dev
```

Dependency versions are pinned in `package.json`. The deployment workflow installs them
without writing a lockfile so GitHub Pages builds consistently from the declared versions.

## Production build

```bash
npm run build
npm run preview
```

The compiled website is written to `dist/`.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Vercel will detect Vite automatically.
3. Use `npm run build` as the build command and `dist` as the output directory if Vercel does not fill them in automatically.

## Configuration

- Replace `your-email@example.com` in `src/App.tsx` with the research contact email.
- Replace `YOUR_FORM_ID` in `src/App.tsx` with the ID from a Formspree form.
- Add real researcher photos by replacing the `.portrait` placeholders in `src/App.tsx`.
- Configure a custom domain from the Vercel project settings.

## Research data

Metric cards and per-state results live in `src/data.ts`. Update that file when evaluation numbers change.
