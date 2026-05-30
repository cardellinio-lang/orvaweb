import prisma from '@/lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return Response.json({ error: 'Token requis' }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { token },
    include: { items: true },
  });

  if (!order) {
    return Response.json({ error: 'Commande introuvable' }, { status: 404 });
  }

  return Response.json({
    number: order.number,
    customer: order.customer,
    total: order.total,
    confirmed: order.confirmed,
  });
}

export async function POST(req) {
  const { token } = await req.json();
  if (!token) {
    return Response.json({ error: 'Token requis' }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { token } });
  if (!order) {
    return Response.json({ error: 'Commande introuvable' }, { status: 404 });
  }

  if (order.confirmed !== 'yes') {
    await prisma.order.update({
      where: { id: order.id },
      data: { confirmed: 'yes', status: 'confirmed' },
    });
  }

  return Response.json({ ok: true, number: order.number });
}
