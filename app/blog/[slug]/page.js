import Link from 'next/link';
import { notFound } from 'next/navigation';

const C = '#3a59d1';
const C_DARK = '#1a237e';

const posts = {
  'برنامج-تمارين-منزلية': {
    title: 'برنامج تمارين منزلية',
    lang: 'ar',
    dir: 'rtl',
    pdf: '/programme-entrainement-maison.pdf',
    intro: `لمساعدتك على البقاء نشيطة، يقدم لك فريق أورفا سبورت هذه البرامج الثلاثة للتمارين المنزلية. يمكنك تكرار كل برنامج مرة في الأسبوع.

التوصيات الحالية للنشاط البدني هي 150 دقيقة من التمارين المعتدلة أسبوعياً. يعتبر التمرين معتدلاً عندما تشعرين بضيق في التنفس ولكن لا تزالين قادرة على التحدث.

في الأسبوع الأول، الهدف هو ببساطة البدء في الحركة. مع تقدم الأسابيع، يُنصح بزيادة الشدة تدريجياً.

يمكنك تحميل البرنامج بصيغة PDF أدناه أو الاطلاع عليه مباشرة في الصفحة.`,
    disclaimer: `استشيري فريقك الطبي قبل البدء في برنامج تمارين، خاصة إذا كنتِ تشكين في التمارين المقترحة. راقبي نسبة السكر في الدم أثناء التمرين ولمدة 24 ساعة بعده.`,
  },
};

export default function BlogPost({ params }) {
  const post = posts[params.slug];
  if (!post) notFound();

  const { title, lang, dir, pdf, intro, disclaimer } = post;

  return (
    <div dir={dir} lang={lang}>
      <div style={{
        background: `linear-gradient(135deg, ${C} 0%, ${C_DARK} 100%)`,
        color: '#fff', borderRadius: 24,
        marginBottom: 32, padding: '40px 16px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
          <Link href="/blog" style={{ color: '#fff', opacity: 0.8, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← العودة إلى المدونة
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>{title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
        {intro.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontSize: 15, lineHeight: 1.9, color: '#1d1d1f', margin: '0 0 16px' }}>{p}</p>
        ))}

        <div style={{
          background: '#fff8e1', borderRadius: 14, padding: '16px 20px',
          marginBottom: 24, border: '1.5px solid #ffc107',
          fontSize: 14, lineHeight: 1.7, color: '#92400e', fontWeight: 600,
        }}>
          ⚠️ {disclaimer}
        </div>

        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <a href={pdf} download
             style={{
               display: 'inline-block', background: C, color: '#fff',
               padding: '14px 32px', borderRadius: 14, textDecoration: 'none',
               fontSize: 16, fontWeight: 900,
             }}>
            📥 تحميل PDF
          </a>
        </div>

        <div style={{
          borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          marginBottom: 40,
        }}>
          <iframe src={pdf} style={{ width: '100%', height: 800, border: 'none' }} title="PDF" />
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${C} 0%, ${C_DARK} 100%)`,
          borderRadius: 24, padding: '40px 32px', textAlign: 'center',
          marginBottom: 40, color: '#fff',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}>
            📩 استلمي البرنامج الكامل بصيغة PDF
          </h2>
          <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.7, margin: '0 0 24px' }}>
            سجّلي الآن لاستلام البرامج الثلاثة مفصلة بصيغة PDF عبر واتساب، مع نصائح حصرية من أورفا سبورت.
          </p>
          <a href="https://wa.me/213552435702?text=مرحبا%20أورفا%20!%20أريد%20استلام%20البرنامج%20الكامل%20PDF%20%F0%9F%92%AA"
             target="_blank" rel="noopener"
             style={{
               display: 'inline-block', background: '#25D366', color: '#fff',
               padding: '16px 36px', borderRadius: 14, textDecoration: 'none',
               fontSize: 17, fontWeight: 900,
             }}>
            📱 استلمي البرنامج عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
