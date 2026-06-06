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
  name: 'إيماجير IBI — بطاقات المفردات المصورة',
  slug: 'imagier-ibi',
  price: 250000, // 2500 DZD
  oldPrice: 320000,
  color: '#C85046',
  category: 'بطاقات علاج النطق',
  sku: 'KALAM-004',
  stock: 50,
  description: JSON.stringify([
    { type: 'heading', text: 'إيماجير IBI — بطاقات المفردات المصورة' },
    { type: 'text', text: 'مجموعة مكونة من 218 بطاقة مصورة لتعليم المفردات الأساسية للأطفال. مصممة بطريقة احترافية لتنمية مهارات التواصل واللغة.' },
    { type: 'heading', text: 'المحتويات' },
    { type: 'list', items: [
      '218 بطاقة مصورة بحجم 8 × 8 سم',
      'رسومات ملونة جذابة',
      'بطاقات مغلفة بطبقة حماية مع زوايا مدورة',
      'مواضيع متنوعة: العائلة، الحيوانات، المنزل، الألوان، الأرقام، وغيرها',
      'صندوق تخزين متين'
    ]},
    { type: 'heading', text: 'الفوائد' },
    { type: 'list', items: [
      'تنمية المفردات اللغوية',
      'تقوية مهارات التواصل',
      'مناسب للأطفال من 3 إلى 8 سنوات',
      'مثالي للاستخدام المنزلي وجلسات التخاطب',
      'يدعم التعلم البصري'
    ]},
    { type: 'heading', text: 'معلومات إضافية' },
    { type: 'text', text: 'البطاقات مصممة بألوان زاهية وصور واضحة تجذب انتباه الطفل. الطبقة الحامية تحمي البطاقات من التمزق والبلل لاستخدام طويل الأمد.' },
    { type: 'text', text: 'صنع في الجزائر — تصميم أصلي 100%' }
  ]),
  images: [],
};

async function main() {
  console.log('Uploading imagier IBI images to imgbb...');
  
  const mockupUrl = await uploadToImgbb(join(PUBLIC, 'mockup_imagier_ibi.jpg'));
  console.log('✓ Mockup uploaded:', mockupUrl);
  
  const spreadUrl = await uploadToImgbb(join(PUBLIC, 'spread_imagier_ibi.jpg'));
  console.log('✓ Spread uploaded:', spreadUrl);
  
  const closeupUrl = await uploadToImgbb(join(PUBLIC, 'card_closeup_imagier_ibi.jpg'));
  console.log('✓ Closeup uploaded:', closeupUrl);

  const existing = await prisma.product.findUnique({ where: { slug: PRODUCT.slug } });
  if (existing) {
    console.log(`Updating existing product: ${PRODUCT.name}`);
    await prisma.product.update({
      where: { slug: PRODUCT.slug },
      data: {
        ...PRODUCT,
        images: JSON.stringify([mockupUrl, spreadUrl, closeupUrl]),
      },
    });
  } else {
    console.log(`Creating product: ${PRODUCT.name}`);
    await prisma.product.create({
      data: {
        ...PRODUCT,
        images: JSON.stringify([mockupUrl, spreadUrl, closeupUrl]),
      },
    });
  }
  
  console.log(`✓ ${PRODUCT.slug}`);
  console.log('\nDone! imagier IBI added.');
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
