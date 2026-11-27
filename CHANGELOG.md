# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
See [RELEASING.md](RELEASING.md) for the release streams.

## [Unreleased]

### Added

- About: a portrait photo (`/ahmed-mazen.webp`, 480×480 WebP).

### Changed

- Content aligned to the CV's IBM, Oracle, DynamoDB and SAFe edition: the summary, strengths and skills
  now name IBM Db2, IBM MQ, Oracle Database, Amazon DynamoDB, Amazon S3, Kanban and SAFe; the
  IT-Blocks and Intercom entries mention IBM WebSphere, Db2 and MQ.
- CV dates and titles match the employers' experience letters: Raqmiyat ends in August 2018 (was
  August 2019), and the 2022–2023 NTG Clarity role is "Java Architect".

- ADR-0004 (proposed): production is a direct upload of the stable release's CI-tested build, as
  it has been in practice. Cloudflare's Git builds publish the repository root, not `dist/`, and its
  production branch is still `main`. It supersedes ADR-0003 decision 2. `RELEASING.md` (streams,
  steps 3 and 5) and the README "Deploy" section now describe the upload, and `production` records the
  live commit.
- The release workflow writes the checksum file with the archive's name only, so
  `sha256sum -c` works on the downloaded asset.
- `package.json` is bumped to the next base version, 1.0.1.

### Fixed

- `wrangler.toml` sets the Pages build output directory to `dist`, so a Cloudflare Git build without a
  build command fails instead of publishing the repository root. On 2026-11-24 the merge of #6 made
  amazen33.dev serve `README.md` and `package.json` for about four hours, until the v1.0.0 build was
  re-uploaded. ADR-0004 and RELEASING.md record the guard and the post-merge check.

## [1.0.0] - 2026-11-24

### Added

- Writing section (`/writing`) with its first technical article, the Product Security Architecture
  Framework (PSAF) 0.2 at `/writing/psaf`: lifecycle and supply-chain diagrams, control specification,
  maturity model and roadmap. Articles carry `og:type` article and `TechArticle` structured data, appear
  in the sitemap and on the home page, and CI checks that the PSAF page is built.
- CV: a "Leadership and architecture strengths" section.
- Security disclosure (SEC-01): `/.well-known/security.txt` (RFC 9116, contact
  `security@amazen33.dev`, expires 2027-04-30), `SECURITY.md`, and a CI check that the built
  site contains the file.
- Release streams (Dev, Candidate, Stable): `RELEASING.md`, this changelog, the
  `release-checks` and `release` workflows (the release attaches the CI-tested site build),
  and the rulesets in `.github/rulesets/`. `package.json` holds the next version (1.0.0).
  Production deploys only from a published stable release.
- ADR-0003: production builds from the `production` branch, which moves only to a stable
  release's commit. It records the existing Cloudflare Pages Git integration (amends ADR-0001).
- Colour theme switcher (System, Light, Dark) in the footer. The choice stays in the visitor's
  browser (`localStorage`); `public/theme.js` is a same-origin script, so the CSP is unchanged.

### Changed

- Content aligned to the Enterprise Solution Architect CV (24 Nov 2026), now the source of truth:
  title "Enterprise Solution Architect & Technical Team Lead", 21+ years; Synechron on the Tahakom
  engagement (Riyadh); the independent consulting role (Feb–Nov 2026, UAE and Iraq markets); NTG Clarity
  split into its telecom role (2024–2025) and the IoT Squared engagement (2022–2023); the IT-Blocks
  and Raqmiyat/ELM entries with the CV's dates; earlier career with month-level dates; skills regrouped
  as the CV's "Core technology and methods".
- Status tags are plain bold monospace text instead of pills, and "Read the case study" links are
  not underlined until hovered.
- Footer line reads "21+ years in enterprise IT & architecture".
- README "Deploy" describes the Git integration and the `production` branch instead of
  manual direct uploads.

[Unreleased]: https://github.com/amazen33/portfolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/amazen33/portfolio/releases/tag/v1.0.0
