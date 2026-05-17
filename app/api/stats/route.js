import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(req) {
  const auth = requireAdmin(req); if (auth) return auth;

  const totalPageViews = await prisma.pageView.aggregate({ _sum: { count: true } });
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayViews = await prisma.pageView.findFirst({ where: { date: { gte: today } } });
  const totalOrders = await prisma.order.count();
  const totalProducts = await prisma.product.count({ where: { active: true } });

  // Last 7 days views
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
  const weeklyViews = await prisma.pageView.findMany({ where: { date: { gte: weekAgo } }, orderBy: { date: 'asc' } });

  return Response.json({
    totalViews: totalPageViews._sum.count || 0,
    todayViews: todayViews?.count || 0,
    totalOrders,
    totalProducts,
    weeklyViews,
  });
}
