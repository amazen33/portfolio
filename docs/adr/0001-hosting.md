# ADR-0001: Hosting: static Astro on Cloudflare Pages, with Pages Functions for edge features

**Status:** Accepted (owner, 2026-10-09) · **Author:** Claude (architecture and implementation for this repository)

## Context

The portfolio must be fast, cheap, private by default and portable. The owner's Cloudflare account and the domain
`amazen33.dev` are available. Twinfra's ADR-0037 allows Cloudflare for the owner's public presence.

## Decision

1. **Static-first.** Astro builds plain HTML and CSS. The site reads correctly with every edge feature switched off.
2. **Cloudflare Pages with Git integration** deploys from `main`, and pull requests get preview deployments. There are no
   deploy tokens in GitHub. GitHub Actions only builds and checks.
3. **Edge features are Pages Functions** in `/functions`. The first one is `/api/edge`, which returns the visitor's own
   `request.cf` data and stores nothing.
4. **Privacy.** Fonts are self-hosted, with no third-party requests. No cookies. Cloudflare Web Analytics, if enabled, is
   cookieless; the Content Security Policy allows only its beacon.
5. **Portability.** Moving the static output to another host only loses `/functions`. Each function stays small and has no
   state, so it is easy to port.

## Consequences

The free plan is enough. The custom domain `amazen33.dev` is attached in the Pages project once it is registered.
Pinned dependency versions follow the 14-day rule from Twinfra ADR-0034.
