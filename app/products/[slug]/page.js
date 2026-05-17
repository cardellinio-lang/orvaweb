import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product || !product.active) notFound();
  product.images = JSON.parse(product.images || '[]');
  const wilayas = await prisma.wilaya.findMany({ orderBy: { id: 'asc' } });
  const communes = await prisma.commune.findMany({ orderBy: [{ wilayaId: 'asc' }, { name: 'asc' }] });
  return <ProductClient product={product} wilayas={JSON.parse(JSON.stringify(wilayas))} communes={JSON.parse(JSON.stringify(communes))} />;
}
