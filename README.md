# ARIA Research Website

A standalone static website for ARIA. The site uses one `index.html` file with embedded CSS and JavaScript. It has no build step or package dependencies and can be opened directly in a browser.

## Deploy to GitHub Pages

1. Create a GitHub repository for the website and add `index.html`, `README.md`, and `CNAME` at the repository root.
2. In the repository, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then choose the `main` branch and `/ (root)` folder.
3. Save the setting. GitHub will publish the site at the URL shown on the Pages settings screen. If the repository is named `aria-website`, the default URL will usually be `https://narensara.github.io/aria-website/`.

The same folder can be deployed to Vercel as a static site. Import the repository and leave the framework and build-command settings empty.

## Set up Formspree

1. Create a free form at [formspree.io](https://formspree.io/).
2. Copy the form ID from the endpoint Formspree provides.
3. In `index.html`, replace `YOUR_FORM_ID` in:

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```

Also replace every `your-email@example.com` placeholder with the project contact email.

## Add a custom domain

1. Replace the placeholder text in `CNAME` with the custom domain, such as `ariaresearch.org` (do not include `https://`).
2. In the domain provider’s DNS settings, add the records specified by GitHub Pages or Vercel.
3. Add or confirm the same domain in the host’s project settings. For GitHub Pages, use **Settings → Pages → Custom domain**.

Update the `og:url` value near the top of `index.html` to the final public URL.

## Update research results

All research numbers are in `index.html`. Search for these unique values to find the relevant areas:

- `80.0%`, `0.796`, `0.886`, and `19.0 pts` for the four summary cards.
- `Cognitive State Detection — Per-State Performance` for the per-state table.
- `Evaluation on synthetic data` for the limitations note.
- `3,507 synthetic think-aloud samples` for the method description.

When results change, update both the summary cards and any matching values in the feature text or results table so the page remains internally consistent.

## Local preview

Double-click `index.html`, or open it directly from any browser. An internet connection is needed only to load the Inter font; the page falls back to system fonts when offline.
