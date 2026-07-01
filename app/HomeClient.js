'use client';

import { useState, useMemo } from 'react';

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

function ProductCard({ p, now }) {
  const imgs = JSON.parse(p.images || '[]');
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const isNew = now - new Date(p.createdAt).getTime() < MONTH_MS;
  const c = p.color || '#000000';
  const hasTier = p.tierEnabled && p.tierQty && p.tierPrice;
  return (
    <a key={p.id} href={`/products/${p.slug}`}
       style={{
         display: 'flex', flexDirection: 'column', background: '#fff',
         borderRadius: 16, overflow: 'hidden', textDecoration: 'none',
         boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
         transition: 'transform 0.2s, box-shadow 0.2s',
       }}>
      <div style={{ position: 'relative', aspectRatio: '1', background: '#f5f5f7', overflow: 'hidden' }}>
        <img src={imgs[0] || 'https://placehold.co/400x400/f5f5f7/8e8e93?text=P'}
             alt={p.name}
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {discount > 0 && (
          <span style={{ position: 'absolute', top: 8, right: 8, background: c, color: '#fff', fontSize: 11, fontWeight: 900, padding: '4px 10px', borderRadius: 20 }}>
            -{discount}%
          </span>
        )}
        {isNew && (
          <span style={{ position: 'absolute', top: 8, left: 8, background: '#ffd700', color: '#1d1d1f', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 20 }}>
            جديد
          </span>
        )}
        {hasTier && (
          <span style={{ position: 'absolute', bottom: 8, left: 8, background: '#16a34a', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 20 }}>
            كمّية
          </span>
        )}
      </div>
      <div style={{ padding: '12px 12px 16px', display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.4, color: '#1d1d1f' }}>{p.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: c }}>
            {p.price.toLocaleString()} <span style={{ fontSize: 13 }}>د.ج</span>
          </span>
          {p.oldPrice && (
            <span style={{ fontSize: 14, color: '#8e8e93', textDecoration: 'line-through' }}>{p.oldPrice.toLocaleString()}</span>
          )}
        </div>
        {hasTier && (
          <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 700 }}>أقل سعر {p.tierPrice.toLocaleString()} د.ج عند شراء {p.tierQty}+</span>
        )}
      </div>
    </a>
  );
}

const CATEGORY_LABELS = {
  'الجزائر / القصبة': { icon: '🇩🇿', label: 'الجزائر / القصبة' },
  'فن ورسم': { icon: '🎨', label: 'فن ورسم' },
  'ثنائي': { icon: '💑', label: 'ثنائي' },
  'مطبخ': { icon: '🍳', label: 'مطبخ' },
  'أطفال': { icon: '🧸', label: 'أطفال' },
  'إسلامي / عربي': { icon: '🕌', label: 'إسلامي / عربي' },
  'طبي': { icon: '🏥', label: 'طبي' },
  'طبيعة وورود': { icon: '🌸', label: 'طبيعة وورود' },
  'باقة 6 لوحات': { icon: '📦', label: 'باقة 6 لوحات' },
  'ثلاثي وثنائي': { icon: '🖼️', label: 'ثلاثي وثنائي' },
  'تجريدي': { icon: '✨', label: 'تجريدي' },
  'orva': { icon: '🎁', label: 'هدايا الزفاف' },
  'هدايا': { icon: '🎀', label: 'هدايا فاخرة' },
};

export default function HomeClient({ products }) {
  const now = useMemo(() => Date.now(), []);
  const [expandedCat, setExpandedCat] = useState(null);

  const grouped = useMemo(() => {
    const map = {};
    for (const p of products) {
      const cat = p.category || 'أخرى';
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    }
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [products]);

  const allCount = products.length;

  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 24, padding: '24px 0' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1d1d1f', margin: 0, lineHeight: 1.4 }}>
          لأن أجمل الهدايا تُصنع خصيصًا
        </h1>
        <p style={{ color: '#6e6e73', margin: '10px 0 0', fontSize: 15, lineHeight: 1.7 }}>
          نُصمم هدايا وإطارات زفاف مخصصة بأسماء العروسين وتاريخ المناسبة، لتبقى ذكرى جميلة تزيّن كل بيت.
        </p>
      </div>

      {/* Category Sections */}
      {grouped.map(([cat, items]) => {
        const meta = CATEGORY_LABELS[cat] || { icon: '📋', label: cat };
        return (
          <div key={cat} style={{ marginBottom: 32 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 12, padding: '0 4px',
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1d1d1f', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{meta.icon}</span> {meta.label}
                <span style={{ fontSize: 13, color: '#8e8e93', fontWeight: 600 }}>({items.length})</span>
              </h2>
              {items.length > 4 && (
                <button onClick={() => setExpandedCat(expandedCat === cat ? null : cat)}
                  style={{
                    background: 'none', border: 'none', color: '#a10510', fontWeight: 700, fontSize: 13,
                    cursor: 'pointer', padding: 0,
                  }}>
                  {expandedCat === cat ? 'أقل' : 'عرض الكل'}
                </button>
              )}
            </div>
            <div className="grid">
              {(expandedCat === cat ? items : items.slice(0, 4)).map(p => (
                <ProductCard key={p.id} p={p} now={now} />
              ))}
            </div>
          </div>
        );
      })}

      {grouped.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#8e8e93' }}>
          قريباً... منتجات جديدة قادمة
        </div>
      )}

      {/* Stats Strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16,
        marginBottom: 36, textAlign: 'center',
      }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#a10510' }}>{allCount}+</div>
          <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>منتج</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#4CAF50' }}>{grouped.length}</div>
          <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, marginTop: 4 }}>قسم</div>
        </div>
      </div>
    </div>
  );
}
