import prisma from '@/lib/db';

export async function POST() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.pageView.findFirst({
    where: { date: { gte: today } },
  });

  if (existing) {
    await prisma.pageView.update({
      where: { id: existing.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.pageView.create({
      data: { date: today, count: 1 },
    });
  }

  return Response.json({ ok: true });
}
