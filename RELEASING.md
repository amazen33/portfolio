# Releasing

The site follows three release streams: **Dev → Candidate → Stable**.

## Streams

| Stream | What it is | Where it is deployed |
| --- | --- | --- |
| **Dev** | Every merge to `main`. CI keeps the tested build as the `site-dist` artifact | Optional preview: `--branch preview` |
| **Candidate** | Tag `vX.Y.Z-rc.N` on `main`. A GitHub **pre-release** with the tested build attached | Preview for acceptance: `--branch rc` |
| **Stable** | Tag `vX.Y.Z` on the **same commit** as the accepted candidate. The release workflow creates a **draft**, and the owner publishes it | **Production**: `--branch main`, only from a published stable release |

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
3. **Accept.** Deploy the candidate's asset to a preview and review it:

   ```bash
   npx wrangler@4.139.0 pages deploy site-dist --project-name amazen33 --branch rc --commit-hash <sha>
   ```

4. **Stable.** Tag the **same commit** `vX.Y.Z` and push it. Publish the draft release.
5. **Production.** Download the stable release's `site-dist-vX.Y.Z.zip`, check it against the `.sha256`, unzip it into `site-dist/`, and deploy it:

   ```bash
   npx wrangler@4.139.0 pages deploy site-dist --project-name amazen33 --branch main --commit-hash <sha>
   ```

   No deploy token is stored in this repository; Wrangler uses the owner's `wrangler login` (ADR-0001).
6. **Next.** Open a PR that bumps `package.json` to the next base version.

## Rules

- **Tags are immutable.** A `v*` tag is never moved or deleted.
- **Every change goes through a PR.** `main` requires the `Build and check` and `release-checks` status checks.
- **Every PR updates `CHANGELOG.md` under `[Unreleased]`**, or carries the label `changelog:skip` with a reason.
- **Production is deployed only from a published stable release.**

The rulesets are in `.github/rulesets/`.
