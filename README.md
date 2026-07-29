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

## GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Open the repository’s **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push to `main`, or run the workflow manually from the **Actions** tab.

Vite uses a relative asset base, so the build works at both a repository subpath and a custom domain.

## Configuration

- Replace `your-email@example.com` in `src/App.tsx` with the research contact email.
- Replace `YOUR_FORM_ID` in `src/App.tsx` with the ID from a Formspree form.
- Add real researcher photos by replacing the `.portrait` placeholders in `src/App.tsx`.
- To use a custom domain, create `public/CNAME` containing only the domain name.

## Research data

Metric cards and per-state results live in `src/data.ts`. Update that file when evaluation numbers change.
