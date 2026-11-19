# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
See [RELEASING.md](RELEASING.md) for the release streams.

## [Unreleased]

### Added

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

- Content aligned to the current CV: 19+ years and six sectors; current role (Synechron); the
  Spectro Systems, NTG Clarity, Sigma Solutions, IT-Blocks and Raqmiyat entries with the CV's dates,
  titles and bullets; a dated "Earlier career" list; the skills grouped as banking and payments, Java
  enterprise, integration, streaming, cloud, security, resilience and engineering.
- Status tags are plain bold monospace text instead of pills, and "Read the case study" links are
  not underlined until hovered.
- Footer line reads "19+ years in enterprise IT & architecture".
- README "Deploy" describes the Git integration and the `production` branch instead of
  manual direct uploads.
