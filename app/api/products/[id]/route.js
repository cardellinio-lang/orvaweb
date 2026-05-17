import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

function cleanImages(images) {
  return JSON.stringify((images || []).filter(i => i && (i.startsWith('http') || i.startsWith('data:'))));
}

export async function PUT(req, { params }) {
  const auth = requireAdmin(req); if (auth) return auth;
  const data = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { name: data.name, price: data.price, oldPrice: data.oldPrice || null, images: cleanImages(data.images), description: data.description || '', color: data.color || '#000000', category: data.category || '', sku: data.sku || null, stock: data.stock || 1, tierEnabled: data.tierEnabled || false, tierQty: data.tierQty || null, tierPrice: data.tierPrice || null, tierMessage: data.tierMessage || null, tierGift: data.tierGift || null },
  });
  return Response.json(product);
}

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req); if (auth) return auth;
  const data = await req.json();
  const product = await prisma.product.update({ where: { id: params.id }, data });
  return Response.json(product);
}

export async function DELETE(req, { params }) {
  const auth = requireAdmin(req); if (auth) return auth;
  await prisma.product.update({ where: { id: params.id }, data: { active: false } });
  return Response.json({ ok: true });
}
