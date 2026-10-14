# Releasing

The site follows three release streams: **Dev → Candidate → Stable**. See [ADR-0003](docs/adr/0003-production-from-stable-releases.md) for how they map onto Cloudflare Pages.

## Streams

| Stream | What it is | Where Cloudflare Pages serves it |
| --- | --- | --- |
| **Dev** | Every merge to `main` | Preview: `main.amazen33.pages.dev` |
| **Candidate** | Tag `vX.Y.Z-rc.N` on `main`. A GitHub **pre-release** with the CI-tested build attached | The preview of that commit (linked from its `Cloudflare Pages` check) |
| **Stable** | Tag `vX.Y.Z` on the **same commit** as the accepted candidate. The release workflow creates a **draft**, and the owner publishes it | **Production**, after the owner moves `production` to that commit |

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
3. **Accept.** Review the commit's preview deployment.
4. **Stable.** Tag the **same commit** `vX.Y.Z`, push it, and publish the draft release.
5. **Production.** Move `production` to the release commit. Cloudflare Pages then builds and serves it:

   ```bash
   git push origin vX.Y.Z^{commit}:refs/heads/production
   ```

6. **Next.** Open a PR that bumps `package.json` to the next base version.

## Rules

- **Tags are immutable.** A `v*` tag is never moved or deleted.
- **Every change goes through a PR.** `main` requires the `Build and check` and `release-checks` status checks.
- **`production` moves only to a published stable release.** It can't be deleted or force-pushed, and only admins can update it.
- **Every PR updates `CHANGELOG.md` under `[Unreleased]`**, or carries the label `changelog:skip` with a reason.

The rulesets are in `.github/rulesets/`.
