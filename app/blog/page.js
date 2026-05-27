import Link from 'next/link';
import { getAllPosts } from './data';

export const metadata = {
  title: 'المدونة — ibishop',
  description: 'مقالات تعليمية وعلاجية للأرطوفونيا وصعوبات التعلم. نصائح واستراتيجيات للأهل والأخصائيين.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>المدونة</h1>
        <p style={{ color: '#8e8e93', fontSize: 15 }}>مقالات تعليمية وعلاجية لأخصائيي الأرطوفونيا والأهل</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            style={{
              display: 'flex', flexDirection: 'column', background: '#fff',
              borderRadius: 16, overflow: 'hidden', textDecoration: 'none',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
            <div style={{ height: 180, background: 'linear-gradient(135deg, #E54E19, #4CAF50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
              📖
            </div>
            <div style={{ padding: '16px 20px 20px' }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.5, color: '#1d1d1f', marginBottom: 8 }}>{post.title}</h2>
              <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.6 }}>{post.excerpt}</p>
              <span style={{ display: 'inline-block', marginTop: 12, color: '#E54E19', fontWeight: 700, fontSize: 14 }}>اقرأ المزيد ←</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
