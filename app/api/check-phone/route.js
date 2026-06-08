import prisma from '@/lib/db';

export async function POST(req) {
  const { phone, productId } = await req.json();
  if (!phone || !productId) {
    return Response.json({ blocked: false });
  }
  const count = await prisma.order.count({
    where: {
      phone,
      items: { some: { productId } },
    },
  });
  return Response.json({ blocked: count >= 5, count });
}
