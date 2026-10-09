# amazen33.dev

Portfolio and live CV of **Ahmed Mazen**, Digital Transformation and Cloud Architecture Leader
(Principal Cloud & Platform Architect · Enterprise Architect · Founder & Product Lead, Twinfra).

- **Stack:** Astro (static) on Cloudflare Pages, with Pages Functions for edge features. See [ADR-0001](docs/adr/0001-hosting.md).
- **Residency and sovereignty:** what standard Cloudflare plans do and do not guarantee. See [ADR-0002](docs/adr/0002-data-residency-on-standard-plans.md).
- **Privacy:** self-hosted fonts, no cookies, no stored visitor data. `/api/edge` returns only the visitor's own edge metadata.

## Develop

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # output in dist/
```

Pages Functions (`/functions`) run on Cloudflare. To try them locally: `npx wrangler pages dev dist`.

## Deploy

Cloudflare Pages Git integration builds `main` with `npm run build`, output `dist`. Pull requests get preview deployments.
There are no deploy tokens in this repository.

## Content

- `src/data/profile.ts`: identity and links.
- `src/data/resume.json`: the CV, in JSON Resume format.
- `src/data/work.ts` and `src/pages/work/*`: case studies. Every claim traces to a public repository.

## Licence

Code: MIT (see `LICENSE`). Written content: © Ahmed Mazen. Fonts: SIL Open Font License, self-hosted through Fontsource.
