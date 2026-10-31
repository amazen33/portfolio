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

### Changed

- README "Deploy" describes the Git integration and the `production` branch instead of
  manual direct uploads.
