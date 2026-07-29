# ARIA Research Website

The public research website for ARIA, an open initiative investigating metacognitive AI for students with ADHD and learning disabilities.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Framer Motion
- Plain CSS

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Vercel will detect Next.js automatically.
3. Deploy using the default framework settings; no custom build or output-directory configuration is required.

## Configuration

- Replace `your-email@example.com` in `src/App.tsx` with the research contact email.
- Replace `YOUR_FORM_ID` in `src/App.tsx` with the ID from a Formspree form.
- Add real researcher photos by replacing the `.portrait` placeholders in `src/App.tsx`.
- Configure a custom domain from the Vercel project settings.

## Research data

Metric cards and per-state results live in `src/data.ts`. Update that file when evaluation numbers change.
