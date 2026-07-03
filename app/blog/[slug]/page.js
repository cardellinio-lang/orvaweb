import Link from 'next/link';

const C = '#3a59d1';
const C_DARK = '#1a237e';

export default function BlogPost() {
  const pdf = '/programme-entrainement-maison.pdf';

  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${C} 0%, ${C_DARK} 100%)`,
        color: '#fff', borderRadius: 24,
        marginBottom: 32, padding: '40px 16px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
          <Link href="/blog" style={{ color: '#fff', opacity: 0.8, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← Retour au blog
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>Programme d&apos;entraînement à la maison</h1>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <a href={pdf} download
             style={{
               display: 'inline-block', background: C, color: '#fff',
               padding: '14px 32px', borderRadius: 14, textDecoration: 'none',
               fontSize: 16, fontWeight: 900,
             }}>
            📥 Télécharger le PDF
          </a>
        </div>

        <div style={{
          borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          marginBottom: 40,
        }}>
          <iframe src={pdf} style={{ width: '100%', height: 800, border: 'none' }} title="PDF" />
        </div>
      </div>
    </div>
  );
}
