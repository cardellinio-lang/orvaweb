import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function PATCH(req, { params }) {
  const auth = requireAdmin(req); if (auth) return auth;
  const data = await req.json();
  const order = await prisma.order.update({ where: { id: params.id }, data });
  return Response.json(order);
}

export async function DELETE(req, { params }) {
  const auth = requireAdmin(req); if (auth) return auth;
  await prisma.order.delete({ where: { id: params.id } });
  return Response.json({ ok: true });
}
