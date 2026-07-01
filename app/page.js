import prisma from '@/lib/db';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({ where: { active: true }, orderBy: { position: 'asc' } });
  return <HomeClient products={products} />;
}
