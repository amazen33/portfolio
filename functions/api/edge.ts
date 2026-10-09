// Cloudflare Pages Function: GET /api/edge
// Returns the visitor's own edge metadata from request.cf. No IP address is returned, logged or stored.
// Timing note: Workers clocks advance only on I/O, so CPU time is not measurable here and is not reported.

interface EdgeCf {
  colo?: string;
  country?: string;
  asn?: number;
  tlsVersion?: string;
  httpProtocol?: string;
  clientTcpRtt?: number;
}

interface EdgeResponse {
  colo: string | null;
  country: string | null;
  asn: number | null;
  tlsVersion: string | null;
  httpProtocol: string | null;
  clientTcpRtt: number | null;
  generatedAt: string;
}

const pick = <T>(value: T | undefined): T | null => (value === undefined || value === '' ? null : value);

export const onRequestGet = async ({ request }: { request: Request & { cf?: EdgeCf } }): Promise<Response> => {
  const cf: EdgeCf = request.cf ?? {};
  const body: EdgeResponse = {
    colo: pick(cf.colo),
    country: pick(cf.country),
    asn: pick(cf.asn),
    tlsVersion: pick(cf.tlsVersion),
    httpProtocol: pick(cf.httpProtocol),
    // HTTP/3 runs over QUIC, so there is no TCP round trip; Cloudflare reports 0, which we return as null.
    clientTcpRtt: cf.clientTcpRtt ? cf.clientTcpRtt : null,
    generatedAt: new Date().toISOString()
  };
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
};

export const onRequest = async ({ request }: { request: Request }): Promise<Response> =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'content-type': 'application/json; charset=utf-8', allow: 'GET' }
  });
