# ADR-0004: Production is a direct upload of the stable release's build

**Status:** Proposed (2026-11-24), for the owner to accept. **Supersedes:** ADR-0003 decision 2 (production builds from the `production` branch). **Restores:** ADR-0001 decision 2 (direct upload of the CI-tested build).

## Context

ADR-0003 assumed that Cloudflare's Git integration builds and serves the site. The v1.0.0 release on 2026-11-24 showed that it does not:

- **The Git builds publish the repository, not the site.** A fresh build of `a5f3c19` (deployment `03b89466`) served `/README.md` and `/package.json` with HTTP 200, and `/` and `/index.html` with an empty 404. Every pull-request preview since PR #1 is blank in the same way, although Cloudflare reports each one as "Deploy successful". The build output directory is not `dist`, or the build command does not run.
- **Cloudflare's production branch is still `main`**, not `production` (`wrangler pages deployment list`). Merges to `main` create "Production" Git deployments (`6baa8bd`, `82cd315`, `a5f3c19`). All show as *Idle* and none became live.
- **Production has only ever changed by direct upload.** Before v1.0.0, amazen33.dev served the `053fa1d` build uploaded on 2026-10-31. Its `security.txt` matched byte for byte, and its HTML differed only by Cloudflare's email obfuscation. v1.0.0 went live the same way (deployment `ffac1aba`).
- **Pushing `production` changes nothing live today.** Moving it to `a5f3c19` produced only a *Preview* deployment.

Direct upload also keeps the property ADR-0001 chose it for: production serves the exact bytes CI tested and the release recorded, not a second build made in another environment.

## Decision

1. **Production is a direct upload of the stable release's asset.** After the owner publishes `vX.Y.Z`, the deployer:
   - downloads `site-dist-vX.Y.Z.zip`;
   - checks it against its `.sha256`;
   - extracts it to `portfolio-deploy/<short-sha>/`, next to this repository;
   - runs `wrangler pages deploy` from this repository with the release tag checked out, so `./functions` (Pages Functions) matches the release;
   - passes `--branch main`, Cloudflare's production branch.

   [RELEASING.md](../../RELEASING.md) step 5 holds the commands.
2. **Candidates are reviewed from their own asset**, uploaded as a preview with `--branch candidate` (`candidate.amazen33.pages.dev`), or locally with `npx wrangler pages dev`. Git previews are not trusted for acceptance until the owner actions below are done.
3. **`production` stays as the record** of what is live. It moves to the release commit after each production upload, under the same ruleset (no deletion or force-push, admins only).
4. **The checksum file names only the archive**, so `sha256sum -c` works after download. The release workflow previously wrote the runner's absolute path into it.
5. **No deploy token in GitHub.** This is unchanged. Uploads use the owner's `wrangler login`.
6. **Guard against repository-root deployments** (added 2026-11-24). `wrangler.toml` sets `pages_build_output_dir = "./dist"`. A Git build without a build command then fails instead of publishing the repository. Without the guard, the merge of PR #6 (`05001fc`) created a Git *Production* deployment that went live for about four hours: amazen33.dev served `README.md` and `package.json` and returned 404 for every page except the edge-cached `/`. Production was restored by re-uploading the v1.0.0 build. Earlier merges to `main` had stayed *Idle*, so the outcome of a merge is not predictable.

## Owner actions (Cloudflare dashboard, Pages → `amazen33` → Settings → Builds & deployments)

- **Branch control:** turn off automatic production deployments, so a merge to `main` can never go live by itself.
- **Build configuration:** set the build command to `npm run build` and the output directory to `dist`, with `NODE_VERSION` = `22` for Preview. Pull-request previews then show the site again.
- **Alternative:** to return to ADR-0003 instead, fix the build configuration *and* set the production branch to `production`, then mark this ADR rejected. Until both are done, do **not** rely on pushing `production` to deploy.

## Consequences

- **After every merge to `main`**, check that https://amazen33.dev/cv returns 200 and `/README.md` returns 404, until automatic production deployments are off. If not, re-upload the last release's folder as in RELEASING.md step 5.

- Production changes only through a deliberate upload of a published release's asset, which is stronger than ADR-0003's intent.
- One manual step per release. It can be automated later with a scoped Pages API token stored as a GitHub secret, in a job triggered by publishing a release.
- Until the owner actions are done, Git previews and the *Idle* production Git deployments keep appearing, and they are not evidence of what is live.
