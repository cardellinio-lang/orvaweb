'use client';
import { useState, useEffect, useCallback } from 'react';

export default function AdminPage() {
  const [pwd, setPwd] = useState('');
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(null);
  const [msg, setMsg] = useState('');

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-password': pwd,
  }), [pwd]);

  useEffect(() => {
    const saved = sessionStorage.getItem('orva_admin_pwd');
    if (saved) { setPwd(saved); setAuthed(true); }
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch('/api/products', { headers: headers() })
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authed]);

  const login = async () => {
    const res = await fetch('/api/admin/verify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd }),
    });
    if (!res.ok) { setMsg('❌ كلمة المرور خاطئة'); return; }
    sessionStorage.setItem('orva_admin_pwd', pwd);
    setAuthed(true);
    setMsg('');
  };

  const updateTheme = async (productId, theme, color) => {
    setSaving(productId);
    setMsg('');
    try {
      const data = {};
      if (theme !== undefined) data.theme = theme;
      if (color !== undefined) data.color = color;
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(data),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'خطأ'); }
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === productId ? updated : p));
      setMsg('✅ تم الحفظ');
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
    setSaving(null);
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, background: '#fff', borderRadius: 16 }}>
        <h1 style={{ fontFamily: 'Cairo', fontSize: 24, textAlign: 'center', marginBottom: 24 }}>🔐 دخول المشرف</h1>
        <input type="password" value={pwd} onChange={e => setPwd(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && login()}
               placeholder="كلمة المرور"
               style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #d2d2d7', borderRadius: 12, fontSize: 16, marginBottom: 16 }} />
        <button onClick={login}
                style={{ width: '100%', padding: '14px', background: '#3a59d1', color: '#fff', fontSize: 16, fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer' }}>
          دخول
        </button>
        {msg && <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>{msg}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Cairo', fontSize: 22 }}>🎨 تخصيص الألوان</h1>
        <button onClick={() => { sessionStorage.removeItem('orva_admin_pwd'); setAuthed(false); setPwd(''); }}
                style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #d2d2d7', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
          خروج
        </button>
      </div>
      {msg && <p style={{ textAlign: 'center', marginBottom: 16, fontSize: 14 }}>{msg}</p>}

      {loading ? (
        <p style={{ textAlign: 'center', color: '#8e8e93' }}>جاري التحميل...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {products.map(product => {
            const t = (typeof product.theme === 'object' && product.theme) ? product.theme : {};
            const c = product.color || '#3a59d1';
            return (
              <ProductCard key={product.id} product={product} theme={t} color={c}
                           saving={saving === product.id}
                           onSave={(theme, color) => updateTheme(product.id, theme, color)} />
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, theme, color, saving, onSave }) {
  const [btnBg, setBtnBg] = useState(theme.btnBg || color || '#3a59d1');
  const [btnText, setBtnText] = useState(theme.btnText || '#ffffff');
  const [btnHover, setBtnHover] = useState(theme.btnHover || '');
  const [priColor, setPriColor] = useState(color || '#3a59d1');

  const handleSave = () => {
    const newTheme = {};
    if (btnBg !== (product.color || '#3a59d1')) newTheme.btnBg = btnBg;
    if (btnText !== '#ffffff') newTheme.btnText = btnText;
    if (btnHover) newTheme.btnHover = btnHover;
    const newColor = priColor !== '#3a59d1' ? priColor : undefined;
    onSave(newTheme, newColor);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {product.images && JSON.parse(product.images)[0] && (
          <img src={JSON.parse(product.images)[0]} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
        )}
        <div>
          <div style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: 16 }}>{product.name}</div>
          <div style={{ fontSize: 13, color: '#8e8e93' }}>{product.price.toLocaleString()} د.ج — {product.slug}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        <ColorField label="اللون الأساسي" value={priColor} onChange={setPriColor} />
        <ColorField label="خلفية الزر" value={btnBg} onChange={setBtnBg} />
        <ColorField label="نص الزر" value={btnText} onChange={setBtnText} />
        <ColorField label="الزر عند التمرير" value={btnHover} onChange={setBtnHover} placeholder={darken(btnBg)} />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={handleSave} disabled={saving}
                style={{ padding: '12px 24px', background: '#3a59d1', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'جاري الحفظ...' : '💾 حفظ'}
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, background: btnBg, display: 'inline-block', border: '1px solid #e8e8ed' }} />
          <span style={{ width: 32, height: 32, borderRadius: 8, background: btnText, display: 'inline-block', border: '1px solid #e8e8ed' }} />
          <span style={{ width: 32, height: 32, borderRadius: 8, background: btnHover || darken(btnBg), display: 'inline-block', border: '1px solid #e8e8ed' }} />
        </div>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ fontSize: 12, color: '#6e6e73', display: 'block', marginBottom: 4 }}>{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
               style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid #d2d2d7', padding: 2, cursor: 'pointer', background: 'none' }} />
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
               placeholder={placeholder}
               style={{ flex: 1, padding: '8px 10px', border: '1.5px solid #d2d2d7', borderRadius: 8, fontSize: 13, fontFamily: 'monospace' }} />
      </div>
    </div>
  );
}

function darken(hex, amount = 30) {
  if (!hex) return '#c2185b';
  hex = hex.replace('#', '');
  const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
