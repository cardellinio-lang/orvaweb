import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

function cleanImages(images) {
  return JSON.stringify((images || []).filter(i => i && (i.startsWith('http') || i.startsWith('data:'))));
}

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { position: 'asc' } });
  return new Response(JSON.stringify(products), {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

export async function PATCH(req) {
  const auth = requireAdmin(req); if (auth) return auth;
  const { id, direction, position } = await req.json();
  if (!id) return Response.json({ error: 'ID manquant' }, { status: 400 });

  if (position !== undefined) {
    const all = await prisma.product.findMany({ orderBy: { position: 'asc' } });
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return Response.json({ error: 'Produit introuvable' }, { status: 404 });

    const target = Math.max(0, Math.min(all.length - 1, position - 1));
    const currentPos = all[idx].position;
    const targetPos = all[target].position;

    if (target < idx) {
      for (const p of all.slice(target, idx)) {
        await prisma.product.update({ where: { id: p.id }, data: { position: p.position + 1 } });
      }
    } else if (target > idx) {
      for (const p of all.slice(idx + 1, target + 1)) {
        await prisma.product.update({ where: { id: p.id }, data: { position: p.position - 1 } });
      }
    }
    await prisma.product.update({ where: { id }, data: { position: targetPos } });

    return Response.json({ success: true, products: await prisma.product.findMany({ orderBy: { position: 'asc' } }) });
  }

  if (!direction) return Response.json({ error: 'Paramètres manquants' }, { status: 400 });

  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) return Response.json({ error: 'Produit introuvable' }, { status: 404 });

  const neighbor = direction === 'up'
    ? await prisma.product.findFirst({ where: { position: { lt: current.position } }, orderBy: { position: 'desc' } })
    : await prisma.product.findFirst({ where: { position: { gt: current.position } }, orderBy: { position: 'asc' } });

  if (!neighbor) return Response.json({ error: direction === 'up' ? 'Déjà en haut' : 'Déjà en bas' }, { status: 400 });

  await prisma.$transaction([
    prisma.product.update({ where: { id: current.id }, data: { position: neighbor.position } }),
    prisma.product.update({ where: { id: neighbor.id }, data: { position: current.position } }),
  ]);

  return Response.json({ success: true, products: await prisma.product.findMany({ orderBy: { position: 'asc' } }) });
}

export async function POST(req) {
  const auth = requireAdmin(req); if (auth) return auth;
  const data = await req.json();
  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
  const maxPos = await prisma.product.aggregate({ _max: { position: true } });
  const position = (maxPos._max.position || 0) + 10;
  const product = await prisma.product.create({
    data: { name: data.name, slug, price: data.price, oldPrice: data.oldPrice || null, images: cleanImages(data.images), description: data.description || '', color: data.color || '#000000', category: data.category || '', sku: data.sku || null, stock: data.stock || 1, position, tierEnabled: data.tierEnabled || false, tierQty: data.tierQty || null, tierPrice: data.tierPrice || null, tierMessage: data.tierMessage || null, tierGift: data.tierGift || null },
  });
  return Response.json(product, { status: 201 });
}

export async function DELETE(req) {
  const auth = requireAdmin(req); if (auth) return auth;
  const { id } = await req.json();
  if (!id) return Response.json({ error: 'ID manquant' }, { status: 400 });
  await prisma.product.delete({ where: { id } });
  return Response.json({ success: true });
}
