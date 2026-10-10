# ADR-0002: Data residency and sovereignty on standard Cloudflare plans

**Status:** Accepted (owner, 2026-10-09) · **Repository:** `amazen33/portfolio` · **Author:** Claude (architecture)
**Related:** Twinfra ADR-0037 (Cloudflare optional edge), ADR-0041 (sovereign edge perimeter)
**Audience:** technical directors and recruiters. The site publishes this record as written.

## Context

The portfolio targets readers in the US, the EU and the Middle East (KSA/UAE). It runs on standard Cloudflare plans
(Free, Pro, Business), without the Enterprise Data Localization Suite. We want to show how to design for data residency
on those plans, and to be precise about what they do not guarantee.

## Facts (checked 2026-10-09 against Cloudflare documentation)

| Capability | What it controls | Values or availability | What it does **not** do |
| --- | --- | --- | --- |
| D1 `--jurisdiction` | Where the database runs and persists data | `eu`, `fedramp`; set **only at creation**; overrides location hints | Workers anywhere may still access it; it does not restrict processing |
| D1 location hint | Best-effort placement | e.g. `weur`, `enam`, `wnam` | It is a hint, not a guarantee |
| Workers KV jurisdiction | Where data is durably stored | `eu`, `fedramp`, `us`; **private beta**, granted on request | Values can be cached outside the jurisdiction |
| R2 jurisdiction | Storage **and processing** in the jurisdiction | `eu`, `fedramp`; jurisdiction-specific endpoint | It does not cover Workers code that reads objects elsewhere |
| Regional Services, Customer Metadata Boundary | Where TLS is decrypted; where Cloudflare's own logs live | Enterprise only. The metadata boundary covers only the EU and US | Not available on standard plans |
| Cloudflare Tunnel behind the proxy | Hides the origin and avoids open ports | All plans | **TLS is decrypted at the Cloudflare edge** that serves the visitor, which may be outside the region |

## Decision

1. **Classify before you place.** The portfolio stores **no personal data**. The contact form forwards email and stores nothing,
   the chat stores nothing, and feedback is aggregate counts. Residency features are shown through a **Sovereignty Lab** that uses
   **synthetic records only**, and the site says so.
2. **EU residency (demonstrated):** a D1 database created with `--jurisdiction=eu` and an R2 bucket in the `eu` jurisdiction hold
   the synthetic EU records. The page states the boundary plainly: data is stored in the EU, but the Worker that serves it may
   run anywhere.
3. **US placement (demonstrated, without a residency claim):** D1 has no `us` jurisdiction, so US synthetic records use a D1
   location hint (`enam` or `wnam`). This is labelled "placement preference, not a residency guarantee". KV jurisdictions are
   not used; they are in private beta.
4. **KSA/UAE (MENA) pattern: honest version.** On standard plans, the proxy and Tunnel decrypt at a global edge, so they
   **cannot** deliver "decrypt only in-region". The site documents Twinfra's ADR-0041 instead:
   - **Mode S4:** layer-4 scrubbing with TLS passthrough; TLS, WAF and logs in-region.
   - **Mode R7:** Regional Services, which lists KSA and UAE, under an Enterprise contract.
   - The demo shows the in-region half in the Twinfra dev environment when it is published (ADR-0037): TLS termination, the WAF and in-region logs.
5. **Encrypt before the edge (envelope encryption), with the keys in the right place.**
   - Sensitive demo payloads are encrypted **before** they reach Cloudflare: in the browser (WebCrypto AES-256-GCM with a fresh
     data key) or at an in-region origin.
   - The data key is wrapped with the in-region key service's public key (RSA-OAEP-256).
   - The Worker stores only ciphertext and the wrapped key. It **never sees plaintext or holds the master key**. Decryption
     happens only in-region.
   - **Limitation, stated on the page:** this protects *stored content*. It does **not** replace a Customer Metadata Boundary,
     because Cloudflare's own logs (IP, URL, timing) still follow the plan's defaults. The mitigation is to keep personal data out of
     URLs and headers, and to use ADR-0041 modes for regulated workloads.
6. **Edge telemetry widget.**
   - It shows the visitor **their own** `request.cf` data: data-centre code, country, ASN, TLS version, HTTP protocol and client TCP RTT.
     Nothing is stored.
   - Timing shown is wall-clock time for network work (sub-request and origin fetch durations). CPU time is **not** shown, because
     Workers clocks advance only on I/O by design, so CPU time cannot be measured from inside a Worker.
7. **Portability.** Edge features sit behind small TypeScript interfaces (storage, key-value, AI, telemetry) with Cloudflare
   adapters. The content stays static (Astro), so the site moves to another host by swapping adapters. We do not call the platform
   "cloud-agnostic". We say "portable by design, Cloudflare-native today".

## Consequences

Reviewers see residency handled precisely, including its limits. That is the signal an enterprise architect should send.
No compliance claim (GDPR, PDPL, FedRAMP) is made for the portfolio, which holds no regulated data.
