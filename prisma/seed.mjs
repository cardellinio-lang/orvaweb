import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    name: 'هدية خريطة الزفاف المؤطرة - إطار زواج مخصص مع الموقع والتاريخ',
    slug: 'framed-wedding-map-gift',
    price: 2900,
    images: JSON.stringify([
      'https://i.etsystatic.com/25506271/r/il/f07fa1/5359325661/il_fullxfull.5359325661_syah.jpg',
      'https://i.etsystatic.com/25506271/r/il/1f160f/6748245514/il_fullxfull.6748245514_kwkc.jpg',
      'https://i.etsystatic.com/25506271/r/il/3c589a/6748246404/il_fullxfull.6748246404_8opc.jpg',
      'https://i.etsystatic.com/25506271/r/il/dd60aa/6620833390/il_fullxfull.6620833390_bhgu.jpg',
      'https://i.etsystatic.com/25506271/r/il/d84215/6417522117/il_fullxfull.6417522117_e43d.jpg',
    ]),
    description: 'هدية زفاف مخصصة وجميلة للعروسين.\nتتميز الإطارة بأسماء العروسين، الموقع الدقيق للزواج مع قلب، والتاريخ على التقويم.\n\nمؤطرة بالكامل في إطار صندوقي بزجاج أمامي.\nتأتي مع صندوق تقديم خاص بها جاهزة للتغليف والإهداء.\n\n• إطار زجاجي أمامي\n• تصميم مخصص حسب الطلب\n• هدية مثالية للعرسان\n• تأتي مع صندوق هدايا',
    color: '#a10510',
    category: 'orva',
    sku: 'ORVA-WEDMAP',
    stock: 10,
    active: true,
    position: 1001,
  },
  {
    name: 'إطار خشبي بخريطة ثلاثية - التقينا - خطبنا - تزوجنا (هدية زفاف مخصصة)',
    slug: 'met-engaged-married-wooden-map-three',
    price: 6900,
    images: JSON.stringify([
      'https://i.etsystatic.com/19839857/r/il/98b945/5292063473/il_fullxfull.5292063473_go5a.jpg',
      'https://i.etsystatic.com/19839857/r/il/390f25/7040187313/il_fullxfull.7040187313_ikd5.jpg',
      'https://i.etsystatic.com/19839857/r/il/0a4c81/7040189715/il_fullxfull.7040189715_huz4.jpg',
      'https://i.etsystatic.com/19839857/r/il/e1aeef/7040187121/il_fullxfull.7040187121_34uw.jpg',
      'https://i.etsystatic.com/19839857/r/il/07e368/6992215282/il_fullxfull.6992215282_1naf.jpg',
      'https://i.etsystatic.com/19839857/r/il/2b0c37/6992261010/il_fullxfull.6992261010_2ql4.jpg',
    ]),
    description: 'إطار خشبي فاخر يروي قصتكما: أين التقيتما، أين خطبتما، وأين تزوجتما.\n\nخريطة خشبية ثلاثية الأبعاد على شكل قلوب مع إطار من خشب البلوط الصلب.\n\n• إطار خشبي فاخر\n• 3 مواقع على الخريطة (التقينا - خطبنا - تزوجنا)\n• تصميم مخصص حسب الطلب\n• هدية مثالية للذكرى السنوية أو الزفاف\n• جاهز للتعليق',
    color: '#a10510',
    category: 'orva',
    sku: 'ORVA-WOODMAP',
    stock: 10,
    active: true,
    position: 1002,
  },
  {
    name: 'إطار كانفاس على شاسيه 55x70 سم - أسماء العروسين وتاريخ الزفاف',
    slug: 'canvas-frame-55x70-wedding-names-date',
    price: 3400,
    images: JSON.stringify([]),
    description: 'إطار كانفاس (توال) على شاسيه خشبي مقاس 55×70 سم.\n\nمطبوع بأسماء العروسين وتاريخ الزفاف.\n\n• قماش كانفاس عالي الجودة\n• شاسيه خشبي متين\n• مقاس 55×70 سم\n• طباعة بأسماء العروسين وتاريخ الزفاف\n• جاهز للتعليق\n• هدية زفاف مثالية',
    color: '#a10510',
    category: 'orva',
    sku: 'ORVA-CNV55',
    stock: 15,
    active: true,
    position: 1003,
  },
];

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    console.log(`⚠️ Database already has ${count} products — skipping seed to preserve data (images, colors, etc.)`);
    return;
  }

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    console.log(`✅ ${p.name}`);
  }
  console.log(`\n🎉 Seeded ${products.length} product(s) total`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
