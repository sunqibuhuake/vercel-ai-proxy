import { NextResponse } from "next/server";

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



  const proxyUrl = `${GOOGLE_API_BASE_URL}/${path}`;
  console.log(proxyUrl)

  try {
    const body = await req.text()
    console.log(body)
    return fetch(
      proxyUrl,
      {
        method: req.method,
        headers: req.headers,
        body:body,
        signal: req.signal,
      }
    )
    // console.log(res)
    // return NextResponse.next(res)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Error fetching data' }, { status: 500 });
  }
 



}