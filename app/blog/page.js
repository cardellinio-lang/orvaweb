import Link from 'next/link';

export const metadata = {
  title: 'المدونة — أورفا سبورت',
  description: 'برامج تمارين منزلية كاملة، نصائح رياضية وصحية للنساء.',
};

const C = '#3a59d1';

export default function BlogPage() {
  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${C} 0%, #1a237e 100%)`,
        color: '#fff', borderRadius: 24, padding: '48px 32px',
        marginBottom: 40, textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 12px' }}>🏋️‍♀️ مدونة أورفا سبورت</h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, maxWidth: 600, margin: '0 auto' }}>
          برامج تمارين منزلية، نصائح لياقة بدنية، وصحتك العامة لتبقي نشيطة ومليئة بالحيوية.
        </p>
      </div>

      <Link href="/blog/برنامج-تمارين-منزلية" style={{ textDecoration: 'none' }}>
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1d1d1f', margin: '0 0 8px' }}>برنامج تمارين منزلية</h2>
            <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.6, margin: '0 0 16px' }}>
              3 برامج كاملة ب 9 تمارين متنوعة — للتحميل والمشاهدة بصيغة PDF.
            </p>
            <span style={{ color: C, fontWeight: 800, fontSize: 14 }}>اقرأي المقال ←</span>
          </div>
        </div>
      </Link>

      <div style={{
        marginTop: 48, background: '#f5f5f7', borderRadius: 24, padding: '40px 32px',
        textAlign: 'center', border: `2px solid ${C}22`,
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1d1d1f', margin: '0 0 8px' }}>
          📩 استلمي البرنامج الكامل بصيغة PDF
        </h2>
        <p style={{ fontSize: 14, color: '#6e6e73', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7 }}>
          سجّلي الآن لاستلام البرامج الثلاثة مفصلة بصيغة PDF عبر واتساب، مع نصائح حصرية من أورفا سبورت.
        </p>
        <a href="https://wa.me/213552435702?text=مرحبا%20أورفا%20!%20أريد%20استلام%20البرنامج%20الكامل%20PDF%20%F0%9F%92%AA"
           target="_blank" rel="noopener"
           style={{
             display: 'inline-block', background: '#25D366', color: '#fff',
             padding: '16px 40px', borderRadius: 14, textDecoration: 'none',
             fontSize: 18, fontWeight: 900,
           }}>
          📱 استلمي عبر واتساب
        </a>
      </div>
    </div>
  );
}
