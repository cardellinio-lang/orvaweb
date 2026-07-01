import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const product = {
  name: 'هدايا نسائية فخمة بمناسبة الزواج و التخرج بتصميم خاص حسب الطلب',
  slug: 'female-luxury-gift-box',
  price: 18000,
  images: JSON.stringify([
    'https://cdn.salla.sa/DPzBj/3e3aaecf-4299-4f6d-8a84-4a1777684aae-500x500-oUgav3OlUPfF7UI7uKw8JmPkffwgv0qJCZcDit3D.jpg',
    'https://cdn.salla.sa/DPzBj/3c7b76df-71b3-489f-96bf-2fe006eddba2-1000x1000-Dqkxec0g2ZHkBdZOkfsBfN2yRsoD2rmkXdCKrBn5.jpg',
  ]),
  description: 'إهداء نسائي تذكاري: فاجئ المرأة التي تحب بهدية تخلد أجمل اللحظات مع هذا البوكس الذي يحتوي شنطة راقية وعطور متميزة بروائح جذابة، مع إمكانية تصميم عبارة إهداء تحمل بصمتك الخاصة.\n\n• شنطة راقية وعصرية\n• عطور متميزة بروائح جذابة\n• إكسسوارات بتصميم أنيق\n• كرت إهداء مخصص\n• تغليف هدية فاخر\n• تصميم حسب الطلب',
  color: '#a10510',
  category: 'هدايا',
  sku: 'ORVA-LUXGIFT-001',
  stock: 5,
  active: true,
};

const maxPos = await prisma.product.aggregate({ _max: { position: true } });
product.position = (maxPos._max.position || 0) + 10;

const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
if (existing) {
  console.log('⚠️ Product already exists, updating...');
  await prisma.product.update({ where: { slug: product.slug }, data: product });
} else {
  await prisma.product.create({ data: product });
}

console.log(`✅ Added: ${product.name} — ${product.price} DA`);
await prisma.$disconnect();
