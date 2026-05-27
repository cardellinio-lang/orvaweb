import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../data';

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} — ibishop`, description: post.excerpt };
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article style={{ maxWidth: 720, margin: '0 auto' }}>
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#E54E19', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>
        ← العودة إلى المدونة
      </Link>

      <div style={{
        width: '100%', height: 240, borderRadius: 20,
        background: 'linear-gradient(135deg, #E54E19, #4CAF50)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 64, marginBottom: 28,
      }}>
        📖
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.4, marginBottom: 24 }}>{post.title}</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {post.sections.map((section, i) => (
          <div key={i}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#E54E19', marginBottom: 8 }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#1d1d1f' }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 40, padding: 20, background: '#faf6f0', borderRadius: 16,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
          🛍️ تصفح المنتجات المناسبة
        </p>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#E54E19', color: '#fff', padding: '12px 28px',
          borderRadius: 12, fontWeight: 800, fontSize: 15,
        }}>
          تسوق الآن
        </Link>
      </div>
    </article>
  );
}
