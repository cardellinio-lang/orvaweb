import Link from 'next/link';

export const metadata = {
  title: 'Blog — Orva Sport',
  description: 'Programme d\'entraînement à la maison — 3 programmes complets pour rester actif.',
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
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 12px' }}>🏋️ Blog Orva Sport</h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.9, maxWidth: 600, margin: '0 auto' }}>
          Programmes d&apos;entraînement à la maison, conseils fitness et bien-être.
        </p>
      </div>

      <Link href="/blog/programme-entrainement-maison" style={{ textDecoration: 'none' }}>
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1d1d1f', margin: '0 0 8px' }}>Programme d&apos;entraînement à la maison</h2>
            <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.6, margin: '0 0 16px' }}>
              3 programmes complets avec 9 exercices variés — à télécharger et consulter en PDF.
            </p>
            <span style={{ color: C, fontWeight: 800, fontSize: 14 }}>Lire l&apos;article →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
