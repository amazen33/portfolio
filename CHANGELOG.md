# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
See [RELEASING.md](RELEASING.md) for the release streams.

## [Unreleased]

### Added

- Release streams (Dev, Candidate, Stable): `RELEASING.md`, this changelog, the
  `release-checks` and `release` workflows (the release attaches the CI-tested site build),
  and the rulesets in `.github/rulesets/`. `package.json` holds the next version (1.0.0).
  Production deploys only from a published stable release.
