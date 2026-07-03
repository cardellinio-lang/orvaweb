import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const EUR_TO_DZD = 2.5;

const products = [
  {
    name: 'حمالة صدر رياضية Osaka | Bayou Green',
    slug: 'osaka-women-tech-sports-bra-bayou-green',
    price: 8250, oldPrice: 13750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00166_7038_1_Women_Tech_Sports_Bra_Bayou_Green_f77b7cb2-f670-4ffa-9a3d-421a30c13794.jpg?crop=center&height=620&v=1749196059&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Bayou Green\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-BG', stock: 0, active: true, position: 3001,
  },
  {
    name: 'حمالة صدر رياضية Osaka | Future Dusk',
    slug: 'osaka-women-tech-sports-bra-future-dusk',
    price: 8250, oldPrice: 13750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00166_5034_1_Women_Tech_Sports_Bra_Future_Dusk_0877b527-5414-4e3a-b90e-1df4c0e13642.jpg?crop=center&height=620&v=1749196136&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Future Dusk\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-FD', stock: 0, active: true, position: 3002,
  },
  {
    name: 'حمالة صدر رياضية Osaka | Faded Black',
    slug: 'osaka-women-tech-sports-bra-faded-black',
    price: 8250, oldPrice: 13750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00066_9044_1_Women_Tech_Sports_Bra_Faded_Black.jpg?crop=center&height=620&v=1770304513&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Faded Black\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-FB', stock: 0, active: true, position: 3003,
  },
  {
    name: 'حمالة صدر رياضية Osaka | Jadeite',
    slug: 'osaka-women-tech-sports-bra-jadeite',
    price: 8250, oldPrice: 13750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00066_9048_1_Women_Tech_Sports_Bra_Jadeite.jpg?crop=center&height=620&v=1770304514&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Jadeite\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-JD', stock: 0, active: true, position: 3004,
  },
  {
    name: 'حمالة صدر رياضية Osaka | Manor Blue',
    slug: 'osaka-women-tech-sports-bra-manor-blue',
    price: 8250, oldPrice: 13750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00066_6050_1_Women_Tech_Sports_Bra_Manor_Blue.jpg?crop=center&height=620&v=1770304513&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Manor Blue\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-MB', stock: 0, active: true, position: 3005,
  },
  {
    name: 'حمالة صدر بدون درزات Osaka | Faded Black',
    slug: 'osaka-women-seamless-strap-bra-faded-black',
    price: 13750, oldPrice: null,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00254_9044_1_Women-Tech-Sports-Bra_Faded-Black.jpg?crop=center&height=620&v=1754642887&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Faded Black\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-SBRA-FB', stock: 0, active: true, position: 3006,
  },
  {
    name: 'حمالة صدر بدون درزات Osaka | Cherry Lacquer',
    slug: 'osaka-women-seamless-strap-bra-cherry-lacquer',
    price: 11000, oldPrice: 13750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00197_4031_1_Women_Seamless_Strap_Bra_Cherry_Lacquer.jpg?crop=center&height=620&v=1770304540&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Cherry Lacquer\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-SBRA-CL2', stock: 0, active: true, position: 3007,
  },
  {
    name: 'حمالة صدر رياضية Osaka | Beige',
    slug: 'osaka-women-sports-bra-beige',
    price: 10000, oldPrice: 12500,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00203_1044_1_Women_Sports_Bra_-_CNS__Beige.jpg?crop=center&height=620&v=1754321567&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Beige\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-BE', stock: 0, active: true, position: 3008,
  },
  {
    name: 'حمالة صدر رياضية Osaka | Blue',
    slug: 'osaka-women-sports-bra-blue',
    price: 10000, oldPrice: 12500,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00203_6089_1_Women_Sports_Bra_-_CNS__Blue.jpg?crop=center&height=620&v=1754321552&width=620']),
    description: 'حمالة صدر رياضية من Osaka.\n• قماش تقني عالي الجودة\n• تصميم مريح للتمارين\n• دعم ممتاز أثناء الحركة\n\nاللون: Blue\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-BRA-BL', stock: 0, active: true, position: 3009,
  },
  {
    name: 'قميص تانك تقني Osaka | Future Dusk',
    slug: 'osaka-women-tech-tank-future-dusk',
    price: 9000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00171_5034_1_Women_Tech_Tank_Future_Dusk_d127703d-b5cd-4c5c-800e-e4552869a80f.jpg?crop=center&height=620&v=1770304503&width=620']),
    description: 'قميص بدون أكمام رياضي من Osaka.\n• قماش تقني يسمح بالتهوية\n• تصميم عصري ومريح\n• مناسب للتمارين الرياضية\n\nاللون: Future Dusk\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-TANK-FD', stock: 0, active: true, position: 3010,
  },
  {
    name: 'قميص تانك تقني Osaka | Bayou Green',
    slug: 'osaka-women-tech-tank-bayou-green',
    price: 9000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00171_7038_1_Women_Tech_Tank_Bayou_Green_c69e1e80-f505-4295-830a-0981d4a5d36f.jpg?crop=center&height=620&v=1770304503&width=620']),
    description: 'قميص بدون أكمام رياضي من Osaka.\n• قماش تقني يسمح بالتهوية\n• تصميم عصري ومريح\n• مناسب للتمارين الرياضية\n\nاللون: Bayou Green\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-TANK-BG', stock: 0, active: true, position: 3011,
  },
  {
    name: 'قميص تانك تقني Osaka | Faded Black',
    slug: 'osaka-women-tech-tank-faded-black-1',
    price: 15000, oldPrice: null,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00255_9044_1_Women_Tech_Tank_Faded_Black_097f613d-cd83-419b-8e8b-a20d35b4fd41.jpg?crop=center&height=620&v=1757339352&width=620']),
    description: 'قميص بدون أكمام رياضي من Osaka.\n• قماش تقني يسمح بالتهوية\n• تصميم عصري ومريح\n• مناسب للتمارين الرياضية\n\nاللون: Faded Black\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-TANK-FB', stock: 0, active: true, position: 3012,
  },
  {
    name: 'قميص تانك تقني Osaka | Cherry Lacquer',
    slug: 'osaka-women-tech-tank-cherry-lacquer',
    price: 12000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00199_4031_1_Women_Tech_Tank_Cherry_Lacquer.jpg?crop=center&height=620&v=1770304493&width=620']),
    description: 'قميص بدون أكمام رياضي من Osaka.\n• قماش تقني يسمح بالتهوية\n• تصميم عصري ومريح\n• مناسب للتمارين الرياضية\n\nاللون: Cherry Lacquer\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-TANK-CL', stock: 0, active: true, position: 3013,
  },
  {
    name: 'قميص تانك تقني Osaka | Jadeite',
    slug: 'osaka-women-tech-tank-jadeite',
    price: 9000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00055_9048_1_Women_Tech_Tank_Jadeite.jpg?crop=center&height=620&v=1770304514&width=620']),
    description: 'قميص بدون أكمام رياضي من Osaka.\n• قماش تقني يسمح بالتهوية\n• تصميم عصري ومريح\n• مناسب للتمارين الرياضية\n\nاللون: Jadeite\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-TANK-JD', stock: 0, active: true, position: 3014,
  },
  {
    name: 'قميص تانك تقني Osaka | Manor Blue',
    slug: 'osaka-women-tech-tank-manor-blue',
    price: 9000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00055_6050_1_Women_Tech_Tank_Manor_Blue.jpg?crop=center&height=620&v=1770304488&width=620']),
    description: 'قميص بدون أكمام رياضي من Osaka.\n• قماش تقني يسمح بالتهوية\n• تصميم عصري ومريح\n• مناسب للتمارين الرياضية\n\nاللون: Manor Blue\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-TANK-MB', stock: 0, active: true, position: 3015,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Future Dusk',
    slug: 'osaka-women-shimuresu-legging-future-dusk',
    price: 12000, oldPrice: 20000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00165_5034_1_Women_Shimuresu_Legging_Future_Dusk_56aa283f-aa50-45ba-904d-6bbab83275e2.jpg?crop=center&height=620&v=1770304502&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Future Dusk\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-FD', stock: 0, active: true, position: 3016,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Bayou Green',
    slug: 'osaka-women-shimuresu-legging-bayou-green',
    price: 12000, oldPrice: 20000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00165_7038_1_Women_Shimuresu_Legging_Bayou_Green_b1a88203-dfc5-49f7-8c5f-f084c946188e.jpg?crop=center&height=620&v=1749196159&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Bayou Green\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-BG', stock: 0, active: true, position: 3017,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Faded Black',
    slug: 'osaka-women-shimuresu-legging-faded-black-1',
    price: 20000, oldPrice: null,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00253_9044_1_Women_Shimuresu_Legging_Faded_Black.jpg?crop=center&height=620&v=1754642863&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Faded Black\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-FB', stock: 0, active: true, position: 3018,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Cherry Lacquer',
    slug: 'osaka-women-shimuresu-legging-cherry-lacquer',
    price: 16000, oldPrice: 20000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00198_4031_1_Women_Shimuresu_Legging_Cherry_Lacquer.jpg?crop=center&height=620&v=1770304492&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Cherry Lacquer\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-CL', stock: 0, active: true, position: 3019,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Jadeite',
    slug: 'osaka-women-shimuresu-legging-jadeite',
    price: 12000, oldPrice: 20000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00165_7038_1_Women_Shimuresu_Legging_Bayou_Green_b1a88203-dfc5-49f7-8c5f-f084c946188e.jpg?crop=center&height=620&v=1749196159&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Jadeite\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-JD', stock: 0, active: true, position: 3020,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Black',
    slug: 'osaka-women-legging-side-pocket-black',
    price: 12000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00212_9000_1_Women_Legging_side_pocket_-_CNS_Black.jpg?crop=center&height=620&v=1770304541&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Black\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-BK', stock: 0, active: true, position: 3021,
  },
  {
    name: 'بنطال ضيق رياضي Osaka | Purple',
    slug: 'osaka-women-legging-side-pocket-purple',
    price: 12000, oldPrice: 15000,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00212_5043_1_Women_Legging_side_pocket_-_CNS_Purple.jpg?crop=center&height=620&v=1770304542&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Purple\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-LEG-PP', stock: 0, active: true, position: 3022,
  },
  {
    name: 'بنطال ضيق Flared Osaka | Black',
    slug: 'osaka-women-flaired-legging-black',
    price: 15000, oldPrice: 18750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00204_9000_1_Women_Flaired_Legging_Black_28fce2ae-2033-4ac5-b024-d8cff4577176.jpg?crop=center&height=620&v=1756817357&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Black\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-FLR-BK', stock: 0, active: true, position: 3023,
  },
  {
    name: 'بنطال ضيق Flared Osaka | Blue',
    slug: 'osaka-women-flaired-legging-blue',
    price: 15000, oldPrice: 18750,
    images: JSON.stringify(['https://osakaworld.com/cdn/shop/files/APP00204_6090_1_Women_Flaired_Legging_Blue_018e2e72-514b-4f62-8c2a-cc682638cd63.jpg?crop=center&height=620&v=1756817383&width=620']),
    description: 'بنطال ضيق رياضي من Osaka.\n• قماش مطاطي مريح\n• تصميم عصري\n• مناسب للجري والتمارين\n\nاللون: Blue\nالمقاسات: XS - S - M - L - XL',
    color: '#e91e63', category: 'ملابس', sku: 'OSK-FLR-BL', stock: 0, active: true, position: 3024,
  },
];

async function main() {
  let added = 0;
  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) continue;
    await prisma.product.create({ data: p });
    added++;
    console.log(`Added: ${p.name}`);
  }
  if (added === 0) console.log('All products already exist — skipping');
  else console.log(`Added ${added} product(s)`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
