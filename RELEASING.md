# Releasing

The site follows three release streams: **Dev → Candidate → Stable**. See [ADR-0004](docs/adr/0004-production-by-direct-upload-of-the-release-build.md) for how they map onto Cloudflare Pages: production is a direct upload of the stable release's build.

## Streams

| Stream | What it is | Where Cloudflare Pages serves it |
| --- | --- | --- |
| **Dev** | Every merge to `main` | Nowhere until the Git build settings are fixed (ADR-0004); `npm run preview` locally |
| **Candidate** | Tag `vX.Y.Z-rc.N` on `main`. A GitHub **pre-release** with the CI-tested build attached | `candidate.amazen33.pages.dev`, uploaded from the pre-release's asset |
| **Stable** | Tag `vX.Y.Z` on the **same commit** as the accepted candidate. The release workflow creates a **draft**, and the owner publishes it | **Production**, uploaded from the published release's asset |

## Version source

The `version` in `package.json` holds the **next release's base version**, `X.Y.Z`. Versions follow [Semantic Versioning](https://semver.org):

- **MAJOR:** a redesign or a change of structure or URLs;
- **MINOR:** new pages or sections;
- **PATCH:** fixes and wording.

## Cutting a release

1. **Prepare.** Open a PR titled `release: X.Y.Z`. In `CHANGELOG.md`, move `## [Unreleased]` into `## [X.Y.Z]`, and leave an empty `## [Unreleased]` above it. Merge it.
2. **Candidate.** Tag the merge commit `vX.Y.Z-rc.1` and push the tag. The `release` workflow:
   - validates the tag;
   - builds and checks the site exactly as CI does;
   - creates a pre-release with `site-dist-vX.Y.Z-rc.1.zip` and its SHA-256 checksum.
3. **Accept.** Upload the candidate's asset as a preview and review it at `candidate.amazen33.pages.dev` (same commands as step 5, with the `-rc.N` tag and `--branch candidate`).
4. **Stable.** Tag the **same commit** `vX.Y.Z`, push it, and publish the draft release.
5. **Production.** Upload the published release's own build, then move `production` to record it:

   ```bash
   TAG=vX.Y.Z
   SHA=$(git rev-parse --short "$TAG^{commit}")
   gh release download "$TAG" --pattern 'site-dist-*' --dir "../portfolio-deploy/.dl-$TAG"
   (cd "../portfolio-deploy/.dl-$TAG" && sha256sum -c "site-dist-$TAG.zip.sha256")
   unzip -q "../portfolio-deploy/.dl-$TAG/site-dist-$TAG.zip" -d "../portfolio-deploy/$SHA"
   git checkout --detach "$TAG"    # ./functions must match the release
   npx wrangler@4 pages deploy "../portfolio-deploy/$SHA" --project-name amazen33 --branch main      --commit-hash "$(git rev-parse "$TAG^{commit}")" --commit-message "$TAG"
   git push origin "$TAG^{commit}:refs/heads/production"
   ```

   `--branch main` is Cloudflare's production branch. Check https://amazen33.dev afterwards. Releases before v1.0.1
   wrote the runner's path into the `.sha256` file; for those, compare the hash by hand.

6. **Next.** Open a PR that bumps `package.json` to the next base version.

## Rules

- **Tags are immutable.** A `v*` tag is never moved or deleted.
- **Every change goes through a PR.** `main` requires the `Build and check` and `release-checks` status checks.
- **Check production after every merge to `main`** until automatic production deployments are off in the Pages dashboard: `/cv` must return 200 and `/README.md` 404 ([ADR-0004](docs/adr/0004-production-by-direct-upload-of-the-release-build.md)).
- **Production serves only a published stable release's asset**, uploaded as in step 5. `production` records that commit. It can't be deleted or force-pushed, and only admins can update it.
- **Every PR updates `CHANGELOG.md` under `[Unreleased]`**, or carries the label `changelog:skip` with a reason.

The rulesets are in `.github/rulesets/`.
