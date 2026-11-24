# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
See [RELEASING.md](RELEASING.md) for the release streams.

## [Unreleased]

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
