import { requireAdmin } from '@/lib/admin-auth';

export async function POST(req) {
  const auth = requireAdmin(req); if (auth) return auth;
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file) return Response.json({ error: 'Fichier manquant' }, { status: 400 });

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) return Response.json({ error: 'Clé API imgbb manquante' }, { status: 500 });

    const buf = Buffer.from(await file.arrayBuffer());
    const b64 = buf.toString('base64');

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ key: apiKey, image: b64 }),
    });
    const data = await res.json();
    if (!data.success) return Response.json({ error: 'Upload imgbb échoué' }, { status: 500 });

    return Response.json({ url: data.data.url });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
