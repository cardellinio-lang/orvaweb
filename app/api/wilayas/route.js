import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET() {
  const wilayas = await prisma.wilaya.findMany({ orderBy: { id: 'asc' } });
  return Response.json(wilayas);
}

export async function PATCH(req) {
  const auth = requireAdmin(req); if (auth) return auth;
  const { id, price, priceOffice } = await req.json();
  const wilaya = await prisma.wilaya.update({
    where: { id: Number(id) },
    data: { price: Number(price), priceOffice: Number(priceOffice) },
  });
  return Response.json(wilaya);
}
