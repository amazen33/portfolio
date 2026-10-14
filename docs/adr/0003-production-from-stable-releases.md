# ADR-0003: Production from stable releases through a `production` branch

**Status:** Accepted (owner, 2026-10-14: release streams for all repositories). **Amends:** ADR-0001 decision 2 (how the site is deployed).

## Context

ADR-0001 records deployments as direct uploads of the CI-tested build. In fact, the Pages project `amazen33` is connected to this repository through Cloudflare's GitHub app ("Cloudflare Workers and Pages"):
- every pushed branch gets a preview deployment;
- every push to `main` deploys **production**. The check runs on `b389c0d` and `27a67ae` show "Deployed successfully".

The owner's release-streams standard (Dev → Candidate → Stable) requires production to change **only** with a published stable release.

## Decision

1. **Keep the Git integration.** Branches and pull requests keep their preview deployments. `main` has a stable preview URL at `main.amazen33.pages.dev`.
2. **Production builds from the branch `production`.** The owner sets this once in the Cloudflare dashboard: Pages → `amazen33` → Settings → Builds & deployments → Production branch = `production`.
3. **Promotion.** After a stable release `vX.Y.Z` is published, the owner fast-forwards `production` to that release's commit:

   ```bash
   git push origin vX.Y.Z^{commit}:refs/heads/production
   ```

4. **Protection.** The ruleset `production-branch` blocks deletion and force-pushes on `production`, and only admins may update it.
5. **Records.** Every release still attaches the CI-tested build (`site-dist-<tag>.zip` and its SHA-256 checksum) as a record of what was approved.
6. **No deploy token** is stored in GitHub. This is unchanged.

## Consequences

- **Until the owner switches the production branch**, a merge to `main` still deploys production. The `production` branch was created at `b389c0d`, the commit production serves today, so the switch changes nothing visible.
- **Cloudflare builds from source** in its own build environment. CI (`Build and check`) remains the gate. Keep Cloudflare's Node version aligned with CI (Node 22) through the project's `NODE_VERSION` variable.
