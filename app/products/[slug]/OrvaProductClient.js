'use client';

import { useState, useEffect, useRef } from 'react';

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

const WILAYA_AR = {
  1:'أدرار',2:'الشلف',3:'الأغواط',4:'أم البواقي',5:'باتنة',6:'بجاية',7:'بسكرة',8:'بشار',
  9:'البليدة',10:'البويرة',11:'تمنراست',12:'تبسة',13:'تلمسان',14:'تيارت',15:'تيزي وزو',
  16:'الجزائر',17:'الجلفة',18:'جيجل',19:'سطيف',20:'سعيدة',21:'سكيكدة',22:'سيدي بلعباس',
  23:'عنابة',24:'قالمة',25:'قسنطينة',26:'المدية',27:'مستغانم',28:'المسيلة',29:'معسكر',
  30:'ورقلة',31:'وهران',32:'البيض',33:'إيليزي',34:'برج بوعريريج',35:'بومرداس',
  36:'الطارف',37:'تندوف',38:'تسمسيلت',39:'الوادي',40:'خنشلة',41:'سوق أهراس',
  42:'تيبازة',43:'ميلة',44:'عين الدفلى',45:'النعامة',46:'عين تموشنت',47:'غرداية',
  48:'غليزان',49:'تيميمون',50:'برج باجي مختار',51:'أولاد جلال',52:'بني عباس',
  53:'عين صالح',54:'عين قزام',55:'تقرت',56:'جانت',57:'المغير',58:'المنيعة',
};

function darken(hex, amount = 30) {
  if (!hex) return '#c2185b';
  hex = hex.replace('#', '');
  const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(58,89,209,${alpha})`;
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function OrvaProductClient({ product, wilayas, communes }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [wilayaId, setWilayaId] = useState('');
  const [communeId, setCommuneId] = useState('');
  const [customNames, setCustomNames] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [deliveryType, setDeliveryType] = useState('home');
  const [error, setError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [celebration, setCelebration] = useState(null);
  const [liveCount, setLiveCount] = useState(14 + Math.floor(Math.random() * 6));

  const hasColors = product.slug === 'girly-tshirt' || product.slug === 'ensemble-performance-ete';
  const hasSizes = product.slug === 'girly-tshirt' || product.slug === 'ensemble-performance-ete' || product.slug === 'burkini-orva-ensemble-bain';
  const girlyColors = hasColors ? [
    { label: 'روز', value: 'rose', color: '#e91e8c' },
    { label: 'أصفر', value: 'jaune', color: '#fdd835' },
    { label: 'أبيض', value: 'blanc', color: '#ffffff' },
  ] : null;
  const productSizes = product.slug === 'burkini-orva-ensemble-bain' ? ['L', 'XL', 'XXL'] : (hasSizes ? ['S', 'M', 'L', 'XL'] : null);
  const [itemSelections, setItemSelections] = useState(hasSizes ? [{ color: girlyColors ? girlyColors[0].value : null, size: productSizes ? productSizes[0] : null }] : []);

  useEffect(() => {
    if (!hasSizes) return;
    setItemSelections(prev => {
      const newArr = prev.slice(0, qty);
      while (newArr.length < qty) {
        newArr.push({ color: girlyColors ? girlyColors[0].value : null, size: productSizes ? productSizes[0] : null });
      }
      return newArr;
    });
  }, [qty, hasSizes, girlyColors, productSizes]);

  const c = product.color || '#3a59d1';
  const t = (typeof product.theme === 'object' && product.theme) ? product.theme : {};
  const btnBg = t.btnBg || c;
  const btnText = t.btnText || '#fff';
  const btnHover = t.btnHover || darken(btnBg);
  const hoverC = darken(c);
  const borderC = hexToRgba(c, 0.15);
  const lightBg = hexToRgba(c, 0.04);
  const ib = {
    width: '100%', padding: '14px 16px',
    border: `1px solid ${borderC}`,
    borderRadius: 8, fontSize: 14, fontFamily: 'Cairo',
    color: '#000', background: '#fff',
    lineHeight: '18px', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const formRef = useRef(null);
  const prevTierRef = useRef(false);
  const submittedRef = useRef(false);

  const imgs = Array.isArray(product.images) ? product.images : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => {
        const delta = Math.random() < 0.5 ? 1 : -1;
        return Math.max(12, Math.min(22, prev + delta));
      });
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq && PIXEL_ID) {
      window.fbq('track', 'ViewContent', {
        content_name: product.name, content_ids: [product.id],
        content_type: 'product', value: product.price / 100, currency: 'DZD',
      });
    }
  }, []);

  const basePrice = product.price;
  const tierActive = product.tierEnabled && product.tierQty && product.tierPrice && qty >= product.tierQty;
  const effectivePrice = tierActive ? product.tierPrice : basePrice;
  const finalPrice = effectivePrice;
  const selectedWilaya = wilayas.find(w => w.id === Number(wilayaId));
  const delivery = selectedWilaya ? (deliveryType === 'office' ? selectedWilaya.priceOffice : selectedWilaya.price) : 0;
  const total = finalPrice * qty + delivery;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const savings = product.tierEnabled && product.tierPrice ? product.price - product.tierPrice : 0;

  const filteredCommunes = wilayaId ? communes.filter(c => c.wilayaId === Number(wilayaId)) : [];

  useEffect(() => {
    if (phone.replace(/\s/g, '').length >= 10) {
      fetch('/api/check-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.replace(/\s/g, ''), productId: product.id }),
      })
        .then(r => r.json())
        .then(data => setBlocked(data.blocked))
        .catch(() => {});
    } else {
      setBlocked(false);
    }
  }, [phone, product.id]);

  useEffect(() => {
    if (product.tierEnabled && tierActive && !prevTierRef.current) {
      prevTierRef.current = true;
      setCelebration({ savings, tierQty: product.tierQty, tierPrice: product.tierPrice, price: product.price });
      const timer = setTimeout(() => setCelebration(null), 3500);
      return () => clearTimeout(timer);
    } else if (!tierActive) {
      prevTierRef.current = false;
    }
  }, [tierActive, product.tierEnabled, savings, product.tierQty, product.tierPrice, product.price]);

  const submitOrder = async () => {
    if (submittedRef.current) return;
    if (!customer || !phone || !wilayaId || !communeId || qty < 1) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    submittedRef.current = true;
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id, qty, customer, phone,
            wilayaId: Number(wilayaId), communeId: Number(communeId),
            address: '', deliveryType, pageUrl: window.location.href,
            customNames: itemSelections.length > 0 ? itemSelections.map((s, i) =>
              `القطعة ${i + 1}: ${girlyColors && s.color ? `اللون: ${girlyColors.find(c => c.value === s.color)?.label || s.color}` : ''}${s.size ? `${girlyColors && s.color ? ' / ' : ''}المقاس: ${s.size}` : ''}`
            ).join(' | ') : customNames,
            customDate,
          }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'خطأ'); }
      const orderData = await res.json();
      if (typeof window !== 'undefined' && window.fbq && PIXEL_ID) {
        window.fbq('track', 'Purchase', {
          value: total / 100, currency: 'DZD',
          content_name: product.name, content_ids: [product.id],
        }, { eventID: orderData.capiEventId });
      }
      window.location.href = `/merci?order=${orderData.number}&name=${encodeURIComponent(product.name)}&qty=${qty}&total=${total}&pid=${product.id}&capiEventId=${orderData.capiEventId}`;
    } catch (e) {
      setError(e.message || 'حدث خطأ أثناء الطلب');
      submittedRef.current = false;
    }
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blinkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes orvaPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 14px ${hexToRgba(btnBg, 0.2)}; }
          50% { transform: scale(1.03); box-shadow: 0 6px 24px ${hexToRgba(btnBg, 0.35)}; }
        }
        .orva-input:focus {
          border-color: ${c} !important;
          box-shadow: 0px 0px 0px 2px ${hexToRgba(c, 0.15)} !important;
          outline: none;
        }
        .order-btn {
          -webkit-tap-highlight-color: transparent;
        }
        .order-btn:active {
          transform: scale(0.96) !important;
          opacity: 0.85;
        }
        .orva-btn { transition: all 0.3s; }
        .orva-btn:hover {
          background-color: ${btnHover} !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
          transform: translateY(-1px);
        }
        .orva-pulse { animation: orvaPulse 2s ease-in-out infinite; }
      `}} />

      {/* COD Banner */}
      {product.stock !== 0 && (
      <div style={{ background: c, color: '#fff', borderRadius: 0, padding: '14px 20px', textAlign: 'center', fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 26 }}>🚚</span>
        الدفع عند الاستلام
      </div>
      )}

      {/* Social proof */}
      {product.stock !== 0 && (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{
          width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'inline-block',
          animation: 'blinkPulse 1.5s ease-in-out infinite',
          boxShadow: '0 0 8px rgba(34,197,94,0.6)',
        }} />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#16a34a' }}>{liveCount} شخص يشترون الآن</span>
      </div>
      )}

      <div className="lg-flex-row" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        {/* Left column - Image */}
        <div style={{ flex: '1 1 50%', minWidth: 0, width: '100%' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', background: '#f5f5f7', aspectRatio: '1' }}>
              <img src={imgs[imgIdx] || 'https://placehold.co/600x600/f5f5f7/8e8e93?text=N'} alt={product.name}
                   style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          {imgs.length > 1 && (
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollBehavior: 'smooth' }}>
                {imgs.slice(0, 10).map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                          style={{ minWidth: 80, width: 80, height: 80, borderRadius: 10, overflow: 'hidden', border: i === imgIdx ? '2px solid ' + c : '2px solid #e8e8ed', padding: 0, background: '#f5f5f7', cursor: 'pointer', flexShrink: 0 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Right column - Product info + Form */}
        <div style={{ flex: '1 1 50%', minWidth: 0, width: '100%' }}>
          <div style={{ background: '#fff', border: '1px solid #e5e5ea', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ height: 4, background: c }} />
            <div style={{ padding: '16px 20px 20px' }}>
              {/* Product title & price */}
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, lineHeight: 1.3, color: '#1d1d1f' }}>{product.name}</h1>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
                  {product.oldPrice && <span style={{ fontSize: 16, color: '#8e8e93', textDecoration: 'line-through' }}>{product.oldPrice.toLocaleString()} د.ج</span>}
                  <span style={{ fontSize: 28, fontWeight: 800, color: tierActive ? '#16a34a' : c }}>
                    {finalPrice.toLocaleString()} <span style={{ fontSize: 16 }}>د.ج</span>
                  </span>
                  {tierActive && product.price !== effectivePrice && (
                    <span style={{ fontSize: 14, color: '#8e8e93', textDecoration: 'line-through', marginLeft: 8 }}>{product.price.toLocaleString()} د.ج</span>
                  )}
                </div>
                {product.stock === 0 && <span style={{ display: 'inline-block', background: '#ef4444', color: '#fff', fontSize: 12, padding: '4px 14px', borderRadius: 20, fontWeight: 900, marginTop: 8 }}>نفذ من المخزون</span>}
                {discount > 0 && !tierActive && <span style={{ display: 'inline-block', background: c, color: '#fff', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 800, marginTop: 8 }}>🔥 خصم {discount}%</span>}
                {tierActive && savings > 0 && (
                  <span style={{ display: 'inline-block', background: '#16a34a', color: '#fff', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 800, marginTop: 8 }}>
                    🎉 توفير {savings.toLocaleString()} د.ج للقطعة
                  </span>
                )}
              </div>

              {product.description && <p style={{ color: '#6e6e73', marginTop: 12, fontSize: 14, lineHeight: 1.6, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: product.description }} />}

              <div style={{ height: 1, background: '#e8e8ed', margin: '16px 0' }} />

              {blocked ? (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#dc2626', marginBottom: 8, lineHeight: 1.6 }}>
                    عذراً، هذه الصفحة غير متاحة حالياً
                  </div>
                </div>
              ) : product.stock === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>😔</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#ef4444', marginBottom: 8, lineHeight: 1.6 }}>
                    نفذ من المخزون
                  </div>
                  <div style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.6 }}>
                    هذا المنتج غير متوفر حالياً. تابعينا على فيسبوك وإنستغرام للإعلام عند توفر منتجات جديدة.
                  </div>
                  <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <a href="https://www.facebook.com/orva.dz" target="_blank" rel="noopener" style={{ background: '#1877f2', color: '#fff', padding: '10px 20px', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 14 }}>فيسبوك</a>
                    <a href="https://instagram.com/orva.dz" target="_blank" rel="noopener" style={{ background: '#e4405f', color: '#fff', padding: '10px 20px', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 14 }}>إنستغرام</a>
                  </div>
                </div>
              ) : (
              <form ref={formRef} onSubmit={e => { e.preventDefault(); submitOrder(); }}>
                {/* Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>الاسم الكامل</label>
                  <input value={customer} onChange={e => setCustomer(e.target.value)}
                         placeholder="يرجى إدخال الاسم واللقب"
                         className="orva-input"
                         style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, background: '#fff' }} />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>رقم الهاتف</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                         placeholder="05XX XX XX XX" dir="ltr"
                         className="orva-input"
                         style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, textAlign: 'right', background: '#fff' }} />
                  <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 4 }}>سنقوم بالاتصال بك عبر هذا الرقم لتأكيد الطلب.</div>
                </div>

                {/* Customization for canvas frame */}
                {product.slug === 'canvas-frame-55x70-wedding-names-date' && (
                  <div style={{ marginBottom: 20, background: '#fff0f5', borderRadius: 14, padding: 16, border: '1px dashed #3a59d166' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 900, color: '#3a59d1', marginBottom: 12, textAlign: 'center' }}>✏️ تخصيص</h3>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>اسماء العروسين</label>
                      <input value={customNames} onChange={e => setCustomNames(e.target.value)}
                             placeholder="اكتب هنا"
                             className="orva-input"
                             style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, background: '#fff' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>تاريخ الزفاف</label>
                      <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)}
                             className="orva-input"
                             style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, background: '#fff' }} />
                    </div>
                  </div>
                )}

                {/* Per-item color/size selectors */}
                {hasSizes && itemSelections.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: 16, background: idx % 2 === 0 ? '#fafafa' : '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid #e8e8ed' }}>
                    <label style={{ fontSize: 13, fontWeight: 900, display: 'block', marginBottom: 8, color: '#1d1d1f' }}>القطعة {idx + 1}</label>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {/* Color */}
                      {girlyColors && (
                        <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                          {girlyColors.map(col => (
                            <button key={col.value} type="button" onClick={() => {
                              const next = [...itemSelections];
                              next[idx] = { ...next[idx], color: col.value };
                              setItemSelections(next);
                            }}
                                    style={{
                                      width: 36, height: 36, borderRadius: '50%',
                                      border: item.color === col.value ? `3px solid #1d1d1f` : `3px solid ${col.value === 'blanc' ? '#d2d2d7' : col.color}`,
                                      background: col.color,
                                      boxShadow: item.color === col.value ? `0 0 0 2px #fff, 0 0 0 4px ${col.color}` : 'none',
                                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      transition: 'all .2s',
                                    }}>
                              {item.color === col.value && <span style={{ color: col.value === 'blanc' || col.value === 'jaune' ? '#333' : '#fff', fontSize: 14 }}>✓</span>}
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Size */}
                      {productSizes && (
                        <div style={{ display: 'flex', gap: 4, flex: girlyColors ? 'none' : 1, justifyContent: girlyColors ? undefined : 'center' }}>
                          {productSizes.map(sz => (
                            <button key={sz} type="button" onClick={() => {
                              const next = [...itemSelections];
                              next[idx] = { ...next[idx], size: sz };
                              setItemSelections(next);
                            }}
                                    style={{
                                      padding: '8px 12px', borderRadius: 10,
                                      border: item.size === sz ? `2px solid ${c}` : '2px solid #d2d2d7',
                                      background: item.size === sz ? c : '#fff',
                                      color: item.size === sz ? '#fff' : '#1d1d1f',
                                      cursor: 'pointer', fontWeight: 800, fontSize: 13,
                                      transition: 'all .2s', minWidth: 36, textAlign: 'center',
                                    }}>
                              {sz}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Wilaya */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>الولاية</label>
                  <select value={wilayaId} onChange={e => { setWilayaId(e.target.value); setCommuneId(''); }}
                          className="orva-input"
                          style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, background: '#fff', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(c)}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 14px center', paddingLeft: 40 }}>
                    <option value="">اختر الولاية</option>
                    {wilayas.map(w => <option key={w.id} value={w.id}>{WILAYA_AR[w.id] || w.name}</option>)}
                  </select>
                </div>

                {/* Commune */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>البلدية</label>
                  <select value={communeId} onChange={e => setCommuneId(e.target.value)} disabled={!wilayaId}
                          className="orva-input"
                          style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, background: '#fff', opacity: wilayaId ? 1 : 0.5, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(c)}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 14px center', paddingLeft: 40 }}>
                    <option value="">اختر البلدية</option>
                    {filteredCommunes.map((com, i) => <option key={com.id || i} value={com.id}>{com.name}</option>)}
                  </select>
                </div>

                {/* Quantity */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>الكمية</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}
                            style={{ width: 44, height: 44, borderRadius: 12, border: '1.5px solid #d2d2d7', background: '#fff', fontSize: 22, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: btnBg }}>
                      −
                    </button>
                    <div style={{ fontSize: 22, fontWeight: 900, minWidth: 40, textAlign: 'center', color: '#1d1d1f' }}>{qty}</div>
                    <button type="button" onClick={() => setQty(qty + 1)}
                            style={{ width: 44, height: 44, borderRadius: 12, border: '1.5px solid #d2d2d7', background: '#fff', fontSize: 22, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: btnBg }}>
                      +
                    </button>
                    <div style={{ fontSize: 16, fontWeight: 700, color: tierActive ? '#16a34a' : c }}>× {finalPrice.toLocaleString()} د.ج</div>
                  </div>
                </div>

                {product.tierEnabled && product.tierQty && qty < product.tierQty && (
                  <div style={{ marginTop: 8, background: '#f0fdf4', borderRadius: 12, padding: '10px 14px', border: '1px dashed #22c55e' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>
                      {(product.tierMessage || `➕ أضف {remaining} فقط ووفر ${savings.toLocaleString()} د.ج لكل قطعة!`).replace(/\{remaining\}/g, product.tierQty - qty)}
                    </span>
                  </div>
                )}

                {/* Delivery type */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 14, fontWeight: 800, display: 'block', marginBottom: 6, color: '#1d1d1f' }}>نوع التوصيل</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={() => setDeliveryType('home')}
                            style={{ flex: 1, padding: '14px 8px', borderRadius: 14, border: deliveryType === 'home' ? '2px solid ' + c : '2px solid #e8e8ed', background: deliveryType === 'home' ? c : '#fff', color: deliveryType === 'home' ? '#fff' : '#1d1d1f', cursor: 'pointer', transition: 'all .2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      <span style={{ fontSize: 13, fontWeight: 800 }}>التوصيل إلى المنزل</span>
                    </button>
                    <button type="button" onClick={() => setDeliveryType('office')}
                            style={{ flex: 1, padding: '14px 8px', borderRadius: 14, border: deliveryType === 'office' ? '2px solid ' + c : '2px solid #e8e8ed', background: deliveryType === 'office' ? c : '#fff', color: deliveryType === 'office' ? '#fff' : '#1d1d1f', cursor: 'pointer', transition: 'all .2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                      <span style={{ fontSize: 13, fontWeight: 800 }}>التوصيل إلى المكتب</span>
                    </button>
                  </div>
                </div>

                {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px 16px', borderRadius: 12, fontSize: 14, marginBottom: 16 }}>{error}</div>}

                {/* CTA Button */}
                <button type="submit" className="order-btn orva-btn"
                        style={{ width: '100%', padding: '16px 24px', background: btnBg, color: btnText, fontSize: 20, fontWeight: 900, borderRadius: 14, border: 'none', cursor: 'pointer', transition: 'transform .15s, opacity .15s' }}>
                  اطلب الآن
                </button>

                {/* Order Summary */}
                <div style={{ marginTop: 20, background: '#f8f9fa', borderRadius: 14, padding: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 4, color: '#1d1d1f' }}>ملخص الطلبية</h3>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #d2d2d7' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1d1d1f' }}>سعر المنتج</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: tierActive ? '#16a34a' : '#6e6e73' }}>
                        {tierActive && <span style={{ fontSize: 12, color: '#8e8e93', textDecoration: 'line-through', marginLeft: 6 }}>{product.price.toLocaleString()}</span>}
                        {finalPrice.toLocaleString()} د.ج
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #d2d2d7' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1d1d1f' }}>الكمية</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#6e6e73' }}>{qty}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #d2d2d7' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1d1d1f' }}>{deliveryType === 'home' ? 'سعر التوصيل للمنزل' : 'سعر التوصيل للمكتب'}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#6e6e73' }}>{delivery > 0 ? `${delivery.toLocaleString()} د.ج` : 'اختر الولاية'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                      <span style={{ fontSize: 16, fontWeight: 900, color: '#1d1d1f' }}>السعر الإجمالي</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: '#3a59d1' }}>{delivery > 0 ? `${total.toLocaleString()} د.ج` : `${(finalPrice * qty).toLocaleString()} د.ج`}</span>
                    </div>
                  </div>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery images */}
      {imgs.length > 0 && (
        <div style={{ marginTop: 24, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: imgs.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 0,
          }}>
            {imgs.slice(0, 10).map((img, i) => (
              <div key={i}>
                <img src={img} alt={`${product.name} ${i + 1}`}
                     style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky footer */}
      {scrolled && product.stock !== 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 16px', background: '#fff', borderTop: '1px solid #e8e8ed', zIndex: 600, boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
          <button onClick={() => {
            const allFilled = customer && phone && wilayaId && communeId;
            if (allFilled) { submitOrder(); }
            else { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
          }}
                  style={{ width: '100%', padding: '16px 24px', background: btnBg, color: btnText, fontSize: 20, fontWeight: 900, borderRadius: 14, border: 'none', cursor: 'pointer', transition: 'transform .15s, opacity .15s' }}
                  className="order-btn orva-btn">
            اطلب الآن
          </button>
        </div>
      )}

      {product.stock !== 0 && <OrderNotification productName={product.name} color={c} />}
      {celebration && <CelebrationOverlay data={celebration} onClose={() => setCelebration(null)} />}
    </div>
  );
}

function CelebrationOverlay({ data, onClose }) {
  const canvasRef = useRef(null);
  const isPack = !!data.title;
  const savingAmt = isPack ? data.savings : data.price - data.tierPrice;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const colors = ['#ff6b35','#ffaa00','#ffd700','#ff3b6f','#a855f7','#22c55e','#f50','#48dbfb'];
    let pieces = [];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * canvas.width, y: -10 - Math.random() * 60,
        w: 4 + Math.random() * 8, h: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 5, vy: 2 + Math.random() * 4,
        rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 10,
        gravity: 0.06 + Math.random() * 0.04, opacity: 1,
      });
    }

    const ctx2d = canvas.getContext('2d');
    let animId;
    function draw() {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      pieces = pieces.filter(p => {
        p.x += p.vx; p.vy += p.gravity; p.y += p.vy;
        p.rot += p.rotV; p.opacity -= 0.004;
        ctx2d.save();
        ctx2d.translate(p.x, p.y);
        ctx2d.rotate((p.rot * Math.PI) / 180);
        ctx2d.globalAlpha = Math.max(0, p.opacity);
        ctx2d.fillStyle = p.color;
        ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx2d.restore();
        return p.opacity > 0 && p.y < canvas.height + 20;
      });
      if (pieces.length > 0) animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { if (animId) cancelAnimationFrame(animId); };
  }, []);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
    }}>
      <style>{`
        @keyframes wowBadgePop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.18) rotate(3deg); opacity: 1; }
          80% { transform: scale(0.95) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes wowFloatUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes wowShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative', zIndex: 3, textAlign: 'center',
        animation: 'wowBadgePop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #ff6b35, #f50)',
          color: '#fff', borderRadius: 100, padding: '20px 40px',
          boxShadow: '0 8px 40px rgba(255,85,0,0.5)', marginBottom: 16,
        }}>
          <div style={{
            fontSize: 24, fontWeight: 900, lineHeight: 1.2,
            background: 'linear-gradient(90deg, #ffd700, #fff, #ffd700)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'wowShimmer 1.5s linear infinite',
          }}>
            {isPack ? data.title : '🎉 تم فتح العرض!'}
          </div>
          {!isPack && (
            <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.9, marginTop: 4 }}>
              {data.tierQty}+ بكمية
            </div>
          )}
        </div>

        <div style={{ animation: 'wowFloatUp 0.5s ease-out 0.3s both' }}>
          <div style={{ color: '#ffd700', fontSize: 36, fontWeight: 900, marginBottom: 4 }}>
            {data.tierPrice.toLocaleString()} <span style={{ fontSize: 18 }}>د.ج</span>
            <span style={{ fontSize: 18, color: '#aaa', textDecoration: 'line-through', marginLeft: 10, fontWeight: 600 }}>
              {data.price.toLocaleString()} د.ج
            </span>
          </div>
          <div style={{ color: '#86efac', fontSize: 18, fontWeight: 700 }}>
            وفر {savingAmt.toLocaleString()} د.ج
          </div>
          <div style={{ marginTop: 16 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.15)',
              color: '#fff', padding: '8px 24px', borderRadius: 999,
              fontSize: 14, fontWeight: 700, backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              ✅ تم تخفيض السعر
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderNotification({ productName, color }) {
  useEffect(() => {
    const ORDERS = [
      { name: 'أمينة', city: 'الجزائر', product: productName, timeAgo: 'منذ دقيقتين', emoji: productName.includes('إطار') ? '🖼️' : '📦' },
      { name: 'مريم', city: 'وهران', product: productName, timeAgo: 'منذ 3 دقائق', emoji: productName.includes('إطار') ? '🖼️' : '📦' },
      { name: 'سارة', city: 'قسنطينة', product: productName, timeAgo: 'منذ لحظات', emoji: productName.includes('map') || productName.includes('خريطة') ? '🗺️' : '📦' },
      { name: 'فاطمة', city: 'عنابة', product: productName, timeAgo: 'منذ 5 دقائق', emoji: '✨' },
      { name: 'نورة', city: 'تيبازة', product: productName, timeAgo: 'منذ دقيقة', emoji: '💫' },
      { name: 'حليمة', city: 'البليدة', product: productName, timeAgo: 'منذ 4 دقائق', emoji: productName.includes('إطار') ? '🖼️' : '📦' },
      { name: 'إيمان', city: 'سطيف', product: productName, timeAgo: 'منذ دقيقتين', emoji: '🌸' },
      { name: 'كوثر', city: 'بجاية', product: productName, timeAgo: 'منذ 6 دقائق', emoji: '💎' },
      { name: 'زهرة', city: 'باتنة', product: productName, timeAgo: 'منذ 3 دقائق', emoji: '⭐' },
      { name: 'نوال', city: 'مستغانم', product: productName, timeAgo: 'منذ لحظات', emoji: '💫' },
      { name: 'رباب', city: 'الشلف', product: productName, timeAgo: 'منذ دقيقة', emoji: '🌸' },
      { name: 'حورية', city: 'تلمسان', product: productName, timeAgo: 'منذ 7 دقائق', emoji: '🌟' },
      { name: 'خديجة', city: 'سيدي بلعباس', product: productName, timeAgo: 'منذ دقيقتين', emoji: '💎' },
      { name: 'لينا', city: 'الجلفة', product: productName, timeAgo: 'منذ 5 دقائق', emoji: '✨' },
      { name: 'آية', city: 'بسكرة', product: productName, timeAgo: 'منذ 4 دقائق', emoji: '⭐' },
      { name: 'ملاك', city: 'المدية', product: productName, timeAgo: 'منذ 3 دقائق', emoji: '💫' },
      { name: 'سلمى', city: 'غرداية', product: productName, timeAgo: 'منذ 6 دقائق', emoji: '🌸' },
    ];

    const style = document.createElement('style');
    style.textContent = `
#orva-notif-container{position:fixed;z-index:99999;pointer-events:none;bottom:90px;left:20px}
.orva-notif-card{
  position:relative;width:340px;max-width:calc(100vw - 40px);
  background:linear-gradient(145deg,#fff 0%,#fef2f2 50%,#fde8e8 100%);
  border:1px solid ${color}22;
  border-radius:20px;overflow:hidden;pointer-events:auto;cursor:default;
  will-change:transform,opacity;font-family:'Tajawal','Segoe UI',system-ui,sans-serif;
  direction:rtl;text-align:right;
  box-shadow:0 12px 40px rgba(0,0,0,0.12),0 4px 12px rgba(0,0,0,0.06),0 0 0 1px ${color}11;
}
.orva-notif-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3.5px;
  background:linear-gradient(90deg,${color} 0%,${hexToRgba(color,0.6)} 25%,${darken(color)} 50%,${hexToRgba(color,0.6)} 75%,${color} 100%);
  background-size:300% 100%;animation:orva-flow 4s ease-in-out infinite;z-index:2;
}
@keyframes orva-flow{0%{background-position:100% 0}50%{background-position:0% 0}100%{background-position:100% 0}}
.orva-notif-header{
  display:flex;align-items:center;gap:7px;padding:10px 16px 0;
  font-size:11.5px;font-weight:700;color:${color};letter-spacing:0.2px;
}
.orva-notif-header svg{width:14px;height:14px;flex-shrink:0;fill:${color}}
.orva-notif-header-text{opacity:0.85}
.orva-live-dot{
  width:7px;height:7px;border-radius:50%;background:${color};margin-right:auto;position:relative;
}
.orva-live-dot::after{
  content:'';position:absolute;inset:-3px;border-radius:50%;
  background:${color};opacity:0.3;animation:orva-ring 2s ease-in-out infinite;
}
@keyframes orva-ring{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(2);opacity:0}}
.orva-notif-inner{display:flex;align-items:center;gap:14px;padding:12px 16px 14px}
.orva-notif-icon{
  flex-shrink:0;width:54px;height:54px;border-radius:16px;
  background:linear-gradient(145deg,${darken(color)},${color});
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 6px 20px ${hexToRgba(color,0.35)},inset 0 1px 1px rgba(255,255,255,0.1);
  font-size:26px;line-height:1;
}
.orva-notif-body{flex:1;min-width:0}
.orva-notif-title{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:0 0 3px;font-size:14.5px;line-height:1.45;color:#1d1d1f}
.orva-notif-name{font-weight:800;white-space:nowrap}
.orva-notif-city{font-weight:500;color:#6e6e73;white-space:nowrap;font-size:13px}
.orva-notif-product{display:flex;align-items:center;gap:5px;margin:4px 0 0;font-size:13px;font-weight:700;color:${color};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.orva-notif-product span{font-size:16px}
.orva-notif-meta{display:flex;align-items:center;gap:7px;margin-top:6px;font-size:11.5px;color:#8e8e93;font-weight:500}
.orva-notif-verified{
  display:inline-flex;align-items:center;gap:4px;padding:2.5px 8px;border-radius:8px;
  background:linear-gradient(135deg,${hexToRgba(color,0.1)},${hexToRgba(color,0.06)});
  font-size:10.5px;font-weight:800;color:${color};border:1px solid ${hexToRgba(color,0.12)};
}
.orva-notif-close{
  position:absolute;top:10px;left:10px;width:24px;height:24px;
  display:flex;align-items:center;justify-content:center;border:none;
  background:${hexToRgba(color,0.05)};color:#8e8e93;font-size:14px;line-height:1;
  cursor:pointer;border-radius:8px;opacity:0;transition:all 0.2s ease;padding:0;
}
.orva-notif-card:hover .orva-notif-close{opacity:1}
.orva-notif-close:hover{background:${hexToRgba(color,0.1)};color:${color}}
.orva-notif-progress{
  position:absolute;bottom:0;left:0;right:0;height:3px;
  background:${hexToRgba(color,0.05)};
}
.orva-notif-bar{
  height:100%;
  background:linear-gradient(90deg,${hexToRgba(color,0.6)},${color},${darken(color)});
  background-size:200% 100%;
  animation:orva-bar-shrink 5s linear forwards,orva-bar-glow 2s ease-in-out infinite;
}
@keyframes orva-bar-shrink{from{width:100%}to{width:0%}}
@keyframes orva-bar-glow{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}
.orva-slide-in{animation:orva-enter 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards}
.orva-slide-out{animation:orva-exit 0.45s cubic-bezier(0.55,0,1,0.45) forwards}
@keyframes orva-enter{
  0%{transform:translateY(110%) scale(0.88);opacity:0}
  50%{transform:translateY(-4%) scale(1.01);opacity:1}
  70%{transform:translateY(2%) scale(0.995)}
  100%{transform:translateY(0) scale(1);opacity:1}
}
@keyframes orva-exit{
  0%{transform:translateY(0) scale(1);opacity:1}
  100%{transform:translateY(110%) scale(0.88);opacity:0}
}
.orva-notif-body>*{
  opacity:0;transform:translateX(14px);
  animation:orva-reveal 0.45s ease forwards;
}
.orva-notif-body>:nth-child(1){animation-delay:0.2s}
.orva-notif-body>:nth-child(2){animation-delay:0.32s}
.orva-notif-body>:nth-child(3){animation-delay:0.44s}
@keyframes orva-reveal{to{opacity:1;transform:translateX(0)}}
@media(max-width:480px){
  #orva-notif-container{left:10px;right:10px;bottom:80px}
  .orva-notif-card{width:100%;max-width:100%;border-radius:16px}
  .orva-notif-icon{width:46px;height:46px;border-radius:13px;font-size:22px}
  .orva-notif-header{font-size:10.5px;padding:8px 14px 0}
  .orva-notif-inner{padding:10px 14px 12px;gap:10px}
  .orva-notif-title{font-size:13.5px}
  .orva-notif-product{font-size:12px}
  .orva-notif-meta{font-size:10.5px}
  .orva-notif-close{opacity:1}
}
@media(prefers-reduced-motion:reduce){
  .orva-slide-in,.orva-slide-out{animation-duration:.01ms!important}
  .orva-notif-card::before,.orva-notif-bar,.orva-live-dot::after{animation:none}
  .orva-notif-body>*{animation:none;opacity:1;transform:none}
}
`;
    document.head.appendChild(style);

    let container = document.getElementById('orva-notif-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'orva-notif-container';
      document.body.appendChild(container);
    }

    let lastIndex = -1;
    let currentCard = null;
    let dismissTimer = null;

    function pickOrder() {
      if (ORDERS.length === 0) return null;
      if (ORDERS.length === 1) return ORDERS[0];
      let idx;
      do { idx = Math.floor(Math.random() * ORDERS.length); } while (idx === lastIndex);
      lastIndex = idx;
      return ORDERS[idx];
    }

    function buildCard(order) {
      const card = document.createElement('div');
      card.className = 'orva-notif-card orva-slide-in';
      card.setAttribute('role', 'status');
      card.setAttribute('aria-live', 'polite');
      card.innerHTML =
        '<div class="orva-notif-header">' +
          '<svg viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 0-2.5 2.5V5h-.25A2.25 2.25 0 0 0 3 7.25v5.5A2.25 2.25 0 0 0 5.25 15h5.5A2.25 2.25 0 0 0 13 12.75v-5.5A2.25 2.25 0 0 0 10.75 5H10.5V3.5A2.5 2.5 0 0 0 8 1zm0 1a1.5 1.5 0 0 1 1.5 1.5V5h-3V3.5A1.5 1.5 0 0 1 8 2z"/></svg>' +
          '<span class="orva-notif-header-text">طلب جديد الآن</span>' +
          '<span class="orva-live-dot"></span>' +
        '</div>' +
        '<div class="orva-notif-inner">' +
          '<div class="orva-notif-icon">' + order.emoji + '</div>' +
          '<div class="orva-notif-body">' +
            '<p class="orva-notif-title">' +
              '<span class="orva-notif-name">' + order.name + '</span>' +
              '<span class="orva-notif-city">من ' + order.city + '</span>' +
            '</p>' +
            '<span class="orva-notif-product"><span>' + order.emoji + '</span> ' + order.product + '</span>' +
            '<div class="orva-notif-meta">' +
              '<svg style="width:13px;height:13px;opacity:0.6" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.5v4l3.5 2.1-.5.8L7.5 9V4.5h1z"/></svg>' +
              '<span>' + order.timeAgo + '</span>' +
              '<span style="opacity:0.2;margin:0 2px">·</span>' +
              '<span class="orva-notif-verified">✓ طلب مؤكد</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<button class="orva-notif-close" aria-label="إغلاق">' +
          '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"/></svg>' +
        '</button>' +
        '<div class="orva-notif-progress"><div class="orva-notif-bar"></div></div>';
      return card;
    }

    function dismissCurrent(cb) {
      if (!currentCard) { if (cb) cb(); return; }
      clearTimeout(dismissTimer);
      currentCard.classList.remove('orva-slide-in');
      currentCard.classList.add('orva-slide-out');
      const card = currentCard;
      currentCard = null;
      let done = false;
      function finish() { if (done) return; done = true; if (card.parentNode) card.parentNode.removeChild(card); if (cb) cb(); }
      card.addEventListener('animationend', finish, { once: true });
      setTimeout(finish, 500);
    }

    function showNotification() {
      const order = pickOrder();
      if (!order) return;
      dismissCurrent(function () {
        const card = buildCard(order);
        container.appendChild(card);
        currentCard = card;
        card.querySelector('.orva-notif-close').addEventListener('click', function (e) { e.stopPropagation(); dismissCurrent(); });
        card.addEventListener('mouseenter', function () { clearTimeout(dismissTimer); });
        card.addEventListener('mouseleave', function () { scheduleDismiss(); });
        scheduleDismiss();
      });
    }

    function scheduleDismiss() {
      clearTimeout(dismissTimer);
      dismissTimer = setTimeout(function () { dismissCurrent(); }, 5000);
    }

    const initialTimer = setTimeout(function () { showNotification(); }, 3000);
    const cycleTimer = setInterval(function () { showNotification(); }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
      clearTimeout(dismissTimer);
      if (currentCard && currentCard.parentNode) currentCard.parentNode.removeChild(currentCard);
      if (container && container.parentNode) container.parentNode.removeChild(container);
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }, [productName, color]);

  return null;
}
