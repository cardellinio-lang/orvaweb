import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

function parseCSV(text) {
  const rows = [];
  let current = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { current.push(field); field = ''; }
      else if (ch === '\n') { current.push(field); if (current.some(f => f.trim())) rows.push(current); current = []; field = ''; }
      else if (ch !== '\r') field += ch;
    }
  }
  if (field || current.length) { current.push(field); if (current.some(f => f.trim())) rows.push(current); }
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim().toLowerCase());
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (row[i] || '').trim(); });
    return obj;
  });
}

export async function POST(req) {
  const auth = requireAdmin(req); if (auth) return auth;
  try {
    const { url } = await req.json();
    if (!url) return Response.json({ error: 'URL manquante' }, { status: 400 });

    const res = await fetch(url);
    if (!res.ok) return Response.json({ error: 'Impossible de récupérer le fichier' }, { status: 400 });

    const csv = await res.text();
    const rows = parseCSV(csv);
    if (!rows.length) return Response.json({ error: 'Fichier vide ou invalide' }, { status: 400 });

    const results = [];

    for (const row of rows) {
      const name = row.name;
      if (!name) continue;

      const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const slug = row.slug || baseSlug || 'produit-' + Date.now();
      const images = row.images ? row.images.split('|').map(u => u.trim()).filter(Boolean) : [];

      const existing = await prisma.product.findFirst({
        where: { OR: [{ slug }, { name }] },
      });

      const data = {
        name,
        price: Number(row.price) || 0,
        oldPrice: row.oldPrice ? Number(row.oldPrice) : null,
        images: JSON.stringify(images),
        description: row.description || '',
        color: row.color || '#000000',
        sku: row.sku || null,
        stock: row.stock ? Number(row.stock) : 1,
        active: row.active?.toLowerCase() === 'non' ? false : true,
      };

      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data });
        results.push({ name, action: 'modifié' });
      } else {
        await prisma.product.create({ data: { ...data, slug } });
        results.push({ name, action: 'créé' });
      }
    }

    return Response.json({ ok: true, total: rows.length, results });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
