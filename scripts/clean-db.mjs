import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.pageView.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.product.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.setting.createMany({
    data: [
      { key: 'about_visible', value: 'true' },
      { key: 'blog_visible', value: 'true' },
    ],
  });
  console.log('✅ Database cleaned — all ibishop data removed, Setting records created');
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
