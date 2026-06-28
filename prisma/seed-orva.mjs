import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    name: 'نظارة ماجيك فيجن 6 في 1 - بعدسات مغناطيسية قابلة للتبديل',
    slug: 'orva-magic-vision-6-en-1',
    price: 3500,
    images: JSON.stringify([
      'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/570876/1.jpg?8400',
      'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/570876/2.jpg?8401',
      'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/570876/3.jpg?8401',
      'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/570876/4.jpg?8401',
      'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/570876/5.jpg?8401',
      'https://ma.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/62/570876/6.jpg?8401',
    ]),
    description: 'نظارة ماجيك فيجن 6 في 1 مع مشابك مغناطيسية قابلة للتبديل\n\nمناسبة للاستخدام في جميع الأوقات والمناسبات:\n• إطار خفيف من TR90\n• 6 عدسات قابلة للتبديل (نهار/ليل/شمس)\n• مشابك مغناطيسية سهلة التركيب\n• مثالية للقيادة والأنشطة الخارجية\n• مناسبة للرجال والنساء',
    color: '#1a1a2e',
    category: 'orva',
    sku: 'ORVA-MV6',
    stock: 15,
    active: true,
    position: 1001,
  },
];

async function main() {
  const existing = await prisma.product.count();
  if (existing > 0) {
    console.log(`Database already has ${existing} products — skipping seed`);
    return;
  }
  for (const p of products) {
    await prisma.product.create({ data: p });
    console.log(`Created: ${p.name}`);
  }
  console.log(`Seeded ${products.length} product(s)`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
