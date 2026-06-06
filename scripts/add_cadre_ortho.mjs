#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

const IMGBB_KEY = 'a8d77f4c5562a973f9c8ded591c2f637';
const PUBLIC = join(__dirname, '..', 'public', 'products');

async function uploadToImgbb(filePath) {
  const buf = readFileSync(filePath);
  const b64 = buf.toString('base64');
  const body = new URLSearchParams({ key: IMGBB_KEY, image: b64 });
  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  if (!data.success) throw new Error(`imgbb failed: ${JSON.stringify(data)}`);
  return data.data.url;
}

const PRODUCT = {
  name: 'إطار ديكور عيادة التخاطب — Bref, je suis orthophoniste',
  slug: 'cadre-decor-orthophoniste',
  price: 690000, // 6900 DZD
  oldPrice: 850000,
  color: '#C85046',
  category: 'ديكور عيادات التخاطب',
  sku: 'DECO-001',
  stock: 30,
  description: JSON.stringify([
    { type: 'heading', text: 'إطار ديكور عيادة التخاطب — Bref, je suis orthophoniste' },
    { type: 'text', text: 'أضف لمسة جمالية لعيادتك مع هذا الإطار الأنيق. تصميم عصري يجمع بين الفخامة والروح المرحة لمهنة التخاطب.' },
    { type: 'heading', text: 'المواصفات' },
    { type: 'list', items: [
      'إطار خشبي فاخر بلون ذهبي',
      'مطبوعة على ورق عالي الجودة',
      'تصميم ثنائي اللغة (فرنسي/عربي)',
      'مقاس: 30 × 40 سم',
      'جاهز للتعليق — مع حامل خلفي'
    ]},
    { type: 'heading', text: 'لماذا هذا الإطار؟' },
    { type: 'list', items: [
      'ديكور مثالي لعيادات التخاطب',
      'هدية رائعة للأخصائيين',
      'يضفي لمسة راقية ومبهجة على المكتب',
      'تصميم حصري من إنتاجنا'
    ]},
    { type: 'text', text: 'صنع في الجزائر — تصميم أصلي 100%' }
  ]),
  images: [],
};

async function main() {
  console.log('Uploading cadre ortho images to imgbb...');
  
  const mockupUrl = await uploadToImgbb(join(PUBLIC, 'mockup_cadre_ortho.jpg'));
  console.log('✓ Mockup:', mockupUrl);
  
  const spreadUrl = await uploadToImgbb(join(PUBLIC, 'spread_cadre_ortho.jpg'));
  console.log('✓ Spread:', spreadUrl);
  
  const closeupUrl = await uploadToImgbb(join(PUBLIC, 'closeup_cadre_ortho.jpg'));
  console.log('✓ Closeup:', closeupUrl);

  const existing = await prisma.product.findUnique({ where: { slug: PRODUCT.slug } });
  if (existing) {
    console.log(`Updating: ${PRODUCT.name}`);
    await prisma.product.update({
      where: { slug: PRODUCT.slug },
      data: { ...PRODUCT, images: JSON.stringify([mockupUrl, spreadUrl, closeupUrl]) },
    });
  } else {
    console.log(`Creating: ${PRODUCT.name}`);
    await prisma.product.create({
      data: { ...PRODUCT, images: JSON.stringify([mockupUrl, spreadUrl, closeupUrl]) },
    });
  }
  
  console.log(`✓ ${PRODUCT.slug}`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
