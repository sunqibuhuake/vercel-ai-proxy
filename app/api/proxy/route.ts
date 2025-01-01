
export const runtime = 'edge';

const GOOGLE_API_BASE_URL = 'https://generativelanguage.googleapis.com';
const GOOGLE_HOST = 'generativelanguage.googleapis.com';
export const preferredRegion = [
  "iad1",
  "sfo1",
  "pdx1"
];

export const POST = async (req: Request) => {
  // split url with /api/proxy
  const path = req.url.split('/api/proxy/')[1];

  if (!path) {
    return Response.json({ error: 'Invalid path' }, { status: 400 });
  }

  const url = new URL(req.url)
  url.host = GOOGLE_HOST
  url.pathname = url.pathname.replace('/api/proxy', '')

  return fetch(
    url,
    {
      method: req.method,
      headers: req.headers,
      body: req.body,
      signal: req.signal,
    }
  )

}