export default async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get('url');
  
  if (!target) {
    return new Response('Missing url', { status: 400 });
  }

  try {
    const upstream = await fetch(target);
    const data = await upstream.text();
    return new Response(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
