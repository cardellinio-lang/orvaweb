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
  if (!hex) return '#80040c';
  hex = hex.replace('#', '');
  const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(161,5,16,${alpha})`;
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
  const [deliveryType, setDeliveryType] = useState('home');
  const [error, setError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liveCount, setLiveCount] = useState(14 + Math.floor(Math.random() * 6));
  const c = product.color || '#a10510';
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

  const selectedWilaya = wilayas.find(w => w.id === Number(wilayaId));
  const delivery = selectedWilaya ? (deliveryType === 'office' ? selectedWilaya.priceOffice : selectedWilaya.price) : 0;
  const total = product.price * qty + delivery;
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

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
      <div style={{ background: c, color: '#fff', borderRadius: 0, padding: '14px 20px', textAlign: 'center', fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 26 }}>🚚</span>
        الدفع عند الاستلام
      </div>

      {/* Social proof */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{
          width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'inline-block',
          animation: 'blinkPulse 1.5s ease-in-out infinite',
          boxShadow: '0 0 8px rgba(34,197,94,0.6)',
        }} />
        <span style={{ fontSize: 15, fontWeight: 800, color: '#16a34a' }}>{liveCount} شخص يشترون الآن</span>
      </div>

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
                  <span style={{ fontSize: 28, fontWeight: 800, color: c }}>
                    {product.price.toLocaleString()} <span style={{ fontSize: 16 }}>د.ج</span>
                  </span>
                </div>
                {discount > 0 && <span style={{ display: 'inline-block', background: c, color: '#fff', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 800, marginTop: 8 }}>🔥 خصم {discount}%</span>}
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
                    <div style={{ fontSize: 16, fontWeight: 700, color: c }}>× {product.price.toLocaleString()} د.ج</div>
                  </div>
                </div>

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
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#6e6e73' }}>{product.price.toLocaleString()} د.ج</span>
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
                      <span style={{ fontSize: 20, fontWeight: 900, color: '#c2185b' }}>{delivery > 0 ? `${total.toLocaleString()} د.ج` : `${(product.price * qty).toLocaleString()} د.ج`}</span>
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
      {scrolled && (
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
    </div>
  );
}
