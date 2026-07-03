import Link from 'next/link';
import { notFound } from 'next/navigation';

const C = '#3a59d1';
const C_LIGHT = '#e8edfc';
const C_DARK = '#1a237e';

const w1_warmup = [
  { n: 'رفع الركبتين', d: '30 ثانية' },
  { n: 'العقب إلى الأرداف', d: '30 ثانية' },
  { n: 'لمس القدم المعاكسة باليد (وقوفاً)', d: '10 مرات كل جانب' },
];
const w2_warmup = [
  { n: 'الجري في المكان', d: '30 ثانية' },
  { n: 'القرفصاء', d: '30 ثانية' },
  { n: 'تدوير الذراعين — حركة بطيئة 15 ث أمام + 15 ث خلف', d: '' },
];
const w3_warmup = [
  { n: 'نط الحبل (مع أو بدونه)', d: '30 ثانية' },
  { n: 'مقفز (jumping jack)', d: '30 ثانية' },
  { n: 'تأرجح الذراعين أماماً بارتفاع الكتفين', d: 'x20' },
];

const posts = {
  'برنامج-تمارين-منزلية': {
    title: 'برنامج تمارين منزلية',
    lang: 'ar',
    dir: 'rtl',
    sections: [
      {
        t: 'intro',
        c: `لمساعدتك على البقاء نشيطة، يقدم لك فريق أورفا سبورت هذه البرامج الثلاثة للتمارين المنزلية. يمكنك تكرار كل برنامج مرة في الأسبوع للتعود على التمارين.

التوصيات الحالية للنشاط البدني للأشخاص هي 150 دقيقة من التمارين المعتدلة أسبوعياً. يعتبر التمرين معتدلاً عندما تشعرين بضيق في التنفس ولكن لا تزالين قادرة على التحدث.

في الأسبوع الأول، الهدف هو ببساطة البدء في الحركة. مع تقدم الأسابيع، يُنصح بزيادة الشدة تدريجياً.`,
      },
      {
        t: 'disclaimer',
        c: `استشيري فريقك الطبي قبل البدء في برنامج تمارين، خاصة إذا كنتِ تشكين في التمارين المقترحة. راقبي نسبة السكر في الدم أثناء التمرين ولمدة 24 ساعة بعده.`,
      },
      // ===== PROGRAMME 1 =====
      { t: 'st', title: 'البرنامج 1' },
      {
        t: 'wu', title: 'التمرين 1', warmup: w1_warmup,
        circuits: [
          { name: 'الدائرة 1 — 3 جولات | راحة 30-60 ثانية بين التمارين', ex: [
            { n: 'القرفصاء (squat)', r: 'x12' },
            { n: 'الضغط (push-up)', r: 'x8-10' },
            { n: 'تمارين البطن (crunch)', r: 'x12' },
          ]},
          { name: 'الدائرة 2 — 3 جولات | راحة 30-60 ثانية بين التمارين', ex: [
            { n: 'الاندفاع للأمام (lunge)', r: 'x20 إجمالي' },
            { n: 'ثني المرفقين + دفع الوزن للأعلى (مع حمل)', r: 'x12' },
            { n: 'متسلق الجبال (mountain climber)', r: '20 ثانية' },
          ]},
        ],
      },
      {
        t: 'wu', title: 'التمرين 2', warmup: w2_warmup,
        circuits: [
          { name: 'الدائرة 1 — 3 جولات | راحة 30-60 ثانية', ex: [
            { n: 'رفع الأرض برجل واحدة (يد نحو القدم المعاكسة)', r: 'x10 كل جانب' },
            { n: 'ضغط الصدر (مع حمل)', r: 'x12' },
            { n: 'مشي الدب', r: '25 ثانية' },
          ]},
          { name: 'الدائرة 2 — 3 جولات | راحة 30-60 ثانية', ex: [
            { n: 'جسر الأرداف (glute bridge)', r: 'x15' },
            { n: 'خطوة جانب + ركبة للكتف', r: 'x15 كل جانب' },
            { n: 'اللوح الخشبي (planche)', r: '30 ثانية' },
          ]},
        ],
      },
      {
        t: 'wu', title: 'التمرين 3', warmup: w3_warmup,
        circuits: [
          { name: 'الدائرة 1 — 3 جولات | راحة 30-60 ثانية', ex: [
            { n: 'الاندفاع + رفع اليدين للأعلى', r: 'x10 كل جانب' },
            { n: 'اليرقة (chenille)', r: 'x15' },
            { n: 'الحشرة الميتة', r: 'x8 كل جانب' },
          ]},
          { name: 'الدائرة 2 — 3 جولات | راحة 30-60 ثانية', ex: [
            { n: 'خطوات سريعة في المكان', r: '40 ثانية' },
            { n: 'قرفصاء + دفع الوزن للأعلى (مع حمل)', r: 'x15' },
            { n: 'اللوح الخشبي على المرفقين أو اليدين', r: '30 ثانية' },
          ]},
        ],
      },
      // ===== PROGRAMME 2 =====
      { t: 'st', title: 'البرنامج 2' },
      {
        t: 'wu_prog', title: 'التمرين 1', warmup: w1_warmup,
        note: '5 تمارين في كل دائرة. أدّ كل تمرين لمدة محددة ثم انتقلي إلى التالي. كرّري الدائرة 4 مرات مع إضافة 10 ثوانٍ لكل تمرين في كل جولة.',
        example: 'الجولة 1 = 30 ث/تمرين ← الجولة 2 = 40 ث/تمرين ← الجولة 3 = 50 ث/تمرين ← الجولة 4 = 60 ث/تمرين',
        circuits: [
          { name: 'الدائرة 1 — 4 جولات (تصاعدي 30←60 ث)', ex: [
            { n: 'ربع قرفصاء', r: '' },
            { n: 'التجديف (بحبل مطاطي أو انحناء بأوزان)', r: '' },
            { n: 'نصف قرفصاء برجل واحدة', r: '' },
            { n: 'دراجة البطن (bicyclette)', r: '' },
            { n: 'لمس أصابع القدم على منصة (أو درجة سلم)', r: '' },
          ]},
          { name: 'الدائرة 2 — 4 جولات (تصاعدي 30←60 ث)', ex: [
            { n: 'الاندفاع للأمام', r: '' },
            { n: 'الضغط (push-up)', r: '' },
            { n: 'جسر الأرداف برجل واحدة', r: '' },
            { n: 'متسلق الجبال (mountain climber)', r: '' },
            { n: 'قرفصاء قفزي (squat sauté)', r: '' },
          ]},
        ],
      },
      {
        t: 'wu_prog', title: 'التمرين 2', warmup: w2_warmup,
        note: '5 تمارين في كل دائرة. كرّري الدائرة 4 مرات مع إضافة 10 ثوانٍ لكل تمرين في كل جولة.',
        example: 'الجولة 1 = 30 ث/تمرين ← الجولة 2 = 40 ث ← الجولة 3 = 50 ث ← الجولة 4 = 60 ث',
        circuits: [
          { name: 'الدائرة 1 — 4 جولات (تصاعدي 30←60 ث)', ex: [
            { n: 'قرفصاء السومو (sumo squat)', r: '' },
            { n: 'ضغط الكتفين جالساً (أو واقفاً)', r: '' },
            { n: 'اندفاع جانبي', r: '' },
            { n: 'لوح مع رفع الساق بالتناوب', r: '' },
            { n: 'رفع الساق أماماً + لمس القدم (standing leg raise)', r: '' },
          ]},
          { name: 'الدائرة 2 — 4 جولات (تصاعدي 30←60 ث)', ex: [
            { n: 'اندفاع ثابت (برجل واحدة)', r: '' },
            { n: 'غاطس (dips) على مقعد أو أريكة — ليس على كرسي', r: '' },
            { n: 'صعود على منصة (step up) برجل واحدة', r: '' },
            { n: 'لوح مفتوح (planche jack — فتح وضم الرجلين)', r: '' },
            { n: 'ركض سريع في المكان (skipping)', r: '' },
          ]},
        ],
      },
      {
        t: 'wu_prog', title: 'التمرين 3', warmup: w3_warmup,
        note: '5 تمارين في كل دائرة. كرّري الدائرة 4 مرات مع إضافة 10 ثوانٍ لكل تمرين في كل جولة.',
        example: 'الجولة 1 = 30 ث/تمرين ← الجولة 2 = 40 ث ← الجولة 3 = 50 ث ← الجولة 4 = 60 ث',
        circuits: [
          { name: 'الدائرة 1 — 4 جولات (تصاعدي 30←60 ث)', ex: [
            { n: 'جسر الأرداف (glute bridge)', r: '' },
            { n: 'تمديد المرفقين بانحناء الجذع للأمام', r: '' },
            { n: 'التوازن على رجل واحدة', r: '' },
            { n: 'رفع الساقين بالتناوب (استلقاء)', r: '' },
            { n: 'العقب إلى الأرداف', r: '' },
          ]},
          { name: 'الدائرة 2 — 4 جولات (تصاعدي 30←60 ث)', ex: [
            { n: 'اندفاع خلفي (برجل واحدة)', r: '' },
            { n: 'ثني المرفقين (bicep curl)', r: '' },
            { n: 'قفز على رجل واحدة في المكان', r: '' },
            { n: 'روسين توويست (Russian twist)', r: '' },
            { n: 'مقفز متقاطع (cross jacks)', r: '' },
          ]},
        ],
      },
      // ===== PROGRAMME 3 =====
      { t: 'st', title: 'البرنامج 3' },
      {
        t: 'wu_hiit', title: 'التمرين 1', warmup: w1_warmup,
        note: 'تمرينان في كل دائرة. أدّ التمرين الأول 20 ثانية، ارتاحي 10 ثوانٍ. أدّ التمرين الثاني 20 ثانية، ارتاحي 10 ثوانٍ. كرّري كل دائرة 4 مرات.',
        circuits: [
          { name: 'الدائرة 1 — 4 جولات (20ث عمل / 10ث راحة)', ex: [
            { n: 'القرفصاء (squat)' },
            { n: 'مرفق إلى ركبة (coude à genou)' },
          ]},
          { name: 'الدائرة 2 — 4 جولات', ex: [
            { n: 'اندفاع خلفي' },
            { n: 'تأرجح الذراعين أماماً بارتفاع الكتفين' },
          ]},
          { name: 'الدائرة 3 — 4 جولات', ex: [
            { n: 'نط الحبل (مع أو بدونه)' },
            { n: 'اللوح الخشبي (planche)' },
          ]},
          { name: 'الدائرة 4 — 4 جولات', ex: [
            { n: 'مشي الدب' },
            { n: 'تمارين البطن (crunch)' },
          ]},
        ],
      },
      {
        t: 'wu_hiit', title: 'التمرين 2', warmup: w2_warmup,
        note: 'تمرينان في كل دائرة. 20ث عمل / 10ث راحة. كرّري كل دائرة 4 مرات.',
        circuits: [
          { name: 'الدائرة 1 — 4 جولات', ex: [
            { n: 'قرفصاء قفزي (squat sauté)' },
            { n: 'التجديف (بحبل مطاطي أو انحناء بأوزان)' },
          ]},
          { name: 'الدائرة 2 — 4 جولات', ex: [
            { n: 'مقفز (jumping jack)' },
            { n: 'صعود على منصة (step up) برجل واحدة' },
          ]},
          { name: 'الدائرة 3 — 4 جولات', ex: [
            { n: 'رفع الساقين بالتناوب (استلقاء)' },
            { n: 'متسلق الجبال (mountain climber)' },
          ]},
          { name: 'الدائرة 4 — 4 جولات', ex: [
            { n: 'ثني المرفقين' },
            { n: 'لوح مفتوح (planche jack)' },
          ]},
        ],
      },
      {
        t: 'wu_hiit', title: 'التمرين 3', warmup: w3_warmup,
        note: 'تمرينان في كل دائرة. 20ث عمل / 10ث راحة. كرّري كل دائرة 4 مرات.',
        circuits: [
          { name: 'الدائرة 1 — 4 جولات', ex: [
            { n: 'رفع الركبتين' },
            { n: 'قرفصاء السومو (sumo squat)' },
          ]},
          { name: 'الدائرة 2 — 4 جولات', ex: [
            { n: 'جسر الأرداف (glute bridge)' },
            { n: 'الضغط (push-up)' },
          ]},
          { name: 'الدائرة 3 — 4 جولات', ex: [
            { n: 'العقب إلى الأرداف' },
            { n: 'ضغط الكتفين جالساً (أو واقفاً)' },
          ]},
          { name: 'الدائرة 4 — 4 جولات', ex: [
            { n: 'غاطس (dips) على مقعد — ليس على كرسي' },
            { n: 'دراجة البطن (bicyclette)' },
          ]},
        ],
      },
      // ===== STRETCHES =====
      { t: 'st', title: 'تمارين التمدد بعد التمرين' },
      {
        t: 'stretches_ar',
        c: `يمكنك أداؤها حتى في الأيام التي لا تتمرنين فيها. مثالية لزيادة مرونتك. أدّ كل تمرين تمدد مرتين لمدة 30-60 ثانية لكل طرف. لا ترتدي. ابحثي عن نقطة عدم الراحة (وليس الألم) وحافظي على الوضعية.`,
        lower: [
          'عضلات الفخذ الأمامية (quadriceps)',
          'عضلات الفخذ الخلفية (ischio-jambiers)',
          'عضلات الأرداف',
          'عضلات الساق (gastrocnémiens / soléaire)',
          'عضلة الكمثري (piriforme)',
          'عضلة ثني الورك',
          'عضلات الفخذ الداخلية (adducteurs)',
          'الرباط الحرقفي الظنبوبي (bandelette ilio-tibiale)',
        ],
        upper: [
          'الصدر',
          'أعلى الظهر',
          'أسفل الظهر',
          'الظهر العريض (grand dorsal)',
          'عضلات الكتف (deltoïdes)',
          'عضلات البطن',
          'العضلة ذات الرأسين (biceps)',
          'العضلة ثلاثية الرؤوس (triceps)',
          'الرسغين (المثبتات والباسطات)',
        ],
      },
      // ===== ADAPTATIONS =====
      { t: 'st', title: 'كيف تعدّل التمارين حسب مستواك' },
      {
        t: 'adapt_tips',
        items: [
          { title: 'السرعة', desc: 'اضبطي شدة التمرين بأدائه بسرعة أكبر أو أقل. يمكن رفع الركبتين ببطء في البداية ثم التسريع تدريجياً.' },
          { title: 'نطاق الحركة', desc: 'مع تعودك على التمارين، حاولي التحرك بكامل نطاق الحركة — انزلي أكثر في القرفصاء والاندفاع والضغط.' },
          { title: 'تقليل فترات الراحة', desc: 'استريحي عند الحاجة بين التمارين. مع الوقت، حاولي تقليل فترات الراحة.' },
          { title: 'إضافة مقاومة', desc: 'إذا كان لديكِ معدات (أوزان، أربطة مطاطية)، استخدميها. وإلا، استخدمي علب الطعام أو قوارير الماء.' },
        ],
      },
      {
        t: 'adapt_table',
        exercises: [
          { n: 'متسلق الجبال (mountain climber)', d: 'مائلة، اليدين على ظهر الأريكة', i: 'على الأرض في وضع اللوح', a: 'وضع اللوح الكامل' },
          { n: 'اليرقة (chenille)', d: 'امشي بقدر ما تستطيعين', i: 'وضع اللوح', a: 'أضيفي ضغطة (push-up)' },
          { n: 'التوازن على رجل واحدة', d: 'بالقرب من حائط أو كرسي', i: 'اليدين على الخصر', a: 'أغلقي عينيك' },
          { n: 'الاندفاع للأمام', d: 'تمسكي (حائط/كرسي)', i: 'بدون تمسك', a: 'أضيفي حملاً' },
          { n: 'اندفاع ثابت', d: 'تمسكي (حائط/كرسي)', i: 'بدون تمسك', a: 'أضيفي حملاً' },
          { n: 'قرفصاء برجل واحدة', d: 'تمسكي بالحائط — ربع قرفصاء فقط', i: 'بدون تمسك — ربع قرفصاء', a: 'نصف قرفصاء بدون تمسك' },
          { n: 'القرفصاء (squat)', d: 'كرسي خلفك', i: 'بدون كرسي', a: 'أضيفي حملاً' },
          { n: 'ربع قرفصاء', d: 'حركة بطيئة ومتحكم بها', i: 'أضيفي حملاً', a: 'أضيفي حملاً أكبر' },
          { n: 'اللوح الخشبي', d: 'مائل، اليدين على الأريكة', i: 'على الركبتين', a: 'على الساعدين والقدمين' },
          { n: 'لوح — مرفقين إلى يدين', d: 'لوح عادي (ركبتين أو قدمين)', i: 'المس الأرض أمامك ثم عد للمرفقين', a: 'تبديل المرفقين واليدين' },
          { n: 'الضغط (push-up)', d: 'وقوفاً، اليدين على الحائط', i: 'على الأرض على الركبتين', a: 'على اليدين والقدمين' },
          { n: 'الغاطس (dips)', d: 'القدمان قرب الجسم', i: 'الرجلان ممتدتان، العقبان على الأرض', a: 'أضيفي حملاً على الفخذين' },
          { n: 'رفع الأرض برجل واحدة', d: 'تمسكي بالحائط للتوازن', i: '', a: '' },
        ],
      },
      {
        t: 'cta_ar',
        title: '📩 استلمي البرنامج الكامل بصيغة PDF',
        desc: 'سجّلي الآن لاستلام البرامج الثلاثة مفصلة بصيغة PDF عبر واتساب، مع نصائح حصرية من أورفا سبورت.',
        waText: 'مرحبا%20أورفا%20!%20أريد%20استلام%20البرنامج%20الكامل%20PDF%20%F0%9F%92%AA',
      },
    ],
  },
};

const containerStyle = {
  maxWidth: 800, margin: '0 auto', padding: '0 16px',
};

function ExerciseItem({ n, r, dir }) {
  return (
    <div style={{
      display: 'flex', flexDirection: dir === 'rtl' ? 'row-reverse' : 'row',
      alignItems: 'center', gap: 12,
      background: '#fff', borderRadius: 12, padding: '12px 16px',
      boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: C, flexShrink: 0 }} />
      <div style={{ flex: 1, fontWeight: 700, fontSize: 15, color: '#1d1d1f' }}>{n}</div>
      {r ? <div style={{ fontWeight: 800, fontSize: 14, color: C, flexShrink: 0 }}>{r}</div> : null}
    </div>
  );
}

function StretchItem({ n, dir }) {
  return (
    <div style={{
      display: 'flex', flexDirection: dir === 'rtl' ? 'row-reverse' : 'row',
      alignItems: 'center', gap: 10, padding: '10px 14px',
      background: '#fff', borderRadius: 10,
      boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: C, flexShrink: 0 }} />
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>{n}</span>
    </div>
  );
}

function AdaptTable({ exercises, dir }) {
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0 32px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <thead>
          <tr style={{ background: C, color: '#fff' }}>
            <th style={{ padding: '12px 14px', textAlign: dir === 'rtl' ? 'right' : 'left', fontWeight: 800 }}>التمرين</th>
            <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800 }}>مبتدئ</th>
            <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800 }}>متوسط</th>
            <th style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800 }}>متقدم</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((ex, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1d1d1f' }}>{ex.n}</td>
              <td style={{ padding: '12px 14px', color: '#6e6e73', textAlign: 'center', fontSize: 12 }}>{ex.d}</td>
              <td style={{ padding: '12px 14px', color: '#6e6e73', textAlign: 'center', fontSize: 12 }}>{ex.i}</td>
              <td style={{ padding: '12px 14px', color: '#6e6e73', textAlign: 'center', fontSize: 12 }}>{ex.a}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogPost({ params }) {
  const post = posts[params.slug];
  if (!post) notFound();

  const { title, lang, dir, sections } = post;

  return (
    <div dir={dir} lang={lang}>
      <div style={{
        background: `linear-gradient(135deg, ${C} 0%, ${C_DARK} 100%)`,
        color: '#fff', borderRadius: 24,
        marginBottom: 32, padding: '40px 16px',
      }}>
        <div style={{ ...containerStyle }}>
          <Link href="/blog" style={{ color: '#fff', opacity: 0.8, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← العودة إلى المدونة
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>{title}</h1>
        </div>
      </div>

      <div style={containerStyle}>
        {sections.map((section, i) => {
          const k = `s${i}`;

          if (section.t === 'intro') {
            return (
              <div key={k} style={{ fontSize: 15, lineHeight: 1.9, color: '#1d1d1f', marginBottom: 24 }}>
                {section.c.split('\n\n').map((p, j) => (
                  <p key={j} style={{ margin: '0 0 16px' }}>{p}</p>
                ))}
              </div>
            );
          }

          if (section.t === 'disclaimer') {
            return (
              <div key={k} style={{
                background: '#fff8e1', borderRadius: 14, padding: '16px 20px',
                marginBottom: 24, border: '1.5px solid #ffc107',
                fontSize: 14, lineHeight: 1.7, color: '#92400e', fontWeight: 600,
              }}>
                ⚠️ {section.c}
              </div>
            );
          }

          if (section.t === 'st') {
            return (
              <h2 key={k} style={{ fontSize: 22, fontWeight: 900, color: C, margin: '32px 0 16px' }}>
                {section.title}
              </h2>
            );
          }

          if (section.t === 'wu') {
            return (
              <div key={k} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1d1d1f', margin: '0 0 16px' }}>{section.title}</h3>
                <div style={{ background: C_LIGHT, borderRadius: 16, padding: 20, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: C, margin: '0 0 12px' }}>🔥 الإحماء — 3 مرات، راحة 30 ثانية بين التمارين</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.warmup.map((ex, j) => (
                      <ExerciseItem key={j} n={ex.n} r={ex.d} dir={dir} />
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, marginTop: 8 }}>→ راحة 1-2 دقيقة قبل الدائرة</div>
                </div>
                {section.circuits.map((circuit, j) => (
                  <div key={j} style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: C, margin: '0 0 12px' }}>💪 {circuit.name}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {circuit.ex.map((ex, k) => (
                        <ExerciseItem key={k} n={ex.n} r={ex.r} dir={dir} />
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, textAlign: 'center', marginTop: 8 }}>→ تمارين تمدد بعد الانتهاء (انظري نهاية الوثيقة)</div>
              </div>
            );
          }

          if (section.t === 'wu_prog') {
            return (
              <div key={k} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1d1d1f', margin: '0 0 16px' }}>{section.title}</h3>
                <div style={{ background: C_LIGHT, borderRadius: 16, padding: 20, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: C, margin: '0 0 12px' }}>🔥 الإحماء — 3 مرات، راحة 30 ثانية بين التمارين</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.warmup.map((ex, j) => (
                      <ExerciseItem key={j} n={ex.n} r={ex.d} dir={dir} />
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, marginTop: 8 }}>→ راحة 1-2 دقيقة قبل الدائرة</div>
                </div>
                <div style={{ background: '#e3f2fd', borderRadius: 12, padding: '14px 18px', marginBottom: 16, fontSize: 13, color: '#1565c0', lineHeight: 1.7 }}>
                  <strong>📋 الطريقة:</strong> {section.note}<br />
                  <strong>مثال:</strong> {section.example}
                </div>
                {section.circuits.map((circuit, j) => (
                  <div key={j} style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: C, margin: '0 0 12px' }}>💪 {circuit.name}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {circuit.ex.map((ex, k) => (
                        <ExerciseItem key={k} n={ex.n} r={ex.r} dir={dir} />
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, textAlign: 'center', marginTop: 8 }}>→ تمارين تمدد بعد الانتهاء</div>
              </div>
            );
          }

          if (section.t === 'wu_hiit') {
            return (
              <div key={k} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1d1d1f', margin: '0 0 16px' }}>{section.title}</h3>
                <div style={{ background: C_LIGHT, borderRadius: 16, padding: 20, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: C, margin: '0 0 12px' }}>🔥 الإحماء — 3 مرات، راحة 30 ثانية بين التمارين</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.warmup.map((ex, j) => (
                      <ExerciseItem key={j} n={ex.n} r={ex.d} dir={dir} />
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, marginTop: 8 }}>→ راحة 1-2 دقيقة قبل الدائرة</div>
                </div>
                <div style={{ background: '#fce4ec', borderRadius: 12, padding: '14px 18px', marginBottom: 16, fontSize: 13, color: '#c62828', lineHeight: 1.7 }}>
                  <strong>⚡ الطريقة:</strong> {section.note}
                </div>
                {section.circuits.map((circuit, j) => (
                  <div key={j} style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: C, margin: '0 0 12px' }}>💪 {circuit.name}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {circuit.ex.map((ex, k) => (
                        <ExerciseItem key={k} n={ex.n} dir={dir} />
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 13, color: '#6e6e73', fontWeight: 600, textAlign: 'center', marginTop: 8 }}>→ تمارين تمدد بعد الانتهاء</div>
              </div>
            );
          }

          if (section.t === 'stretches_ar') {
            return (
              <div key={k} style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6e6e73', marginBottom: 16 }}>{section.c}</p>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1d1d1f', marginBottom: 12 }}>الجزء السفلي</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8, marginBottom: 16 }}>
                  {section.lower.map((s, j) => <StretchItem key={j} n={s} dir={dir} />)}
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1d1d1f', marginBottom: 12 }}>الجزء العلوي</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                  {section.upper.map((s, j) => <StretchItem key={j} n={s} dir={dir} />)}
                </div>
              </div>
            );
          }

          if (section.t === 'adapt_tips') {
            return (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {section.items.map((item, j) => (
                  <div key={j} style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <h4 style={{ fontSize: 15, fontWeight: 900, color: C, margin: '0 0 4px' }}>{item.title}</h4>
                    <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            );
          }

          if (section.t === 'adapt_table') {
            return (
              <div key={k}>
                <p style={{ fontSize: 14, color: '#6e6e73', marginBottom: 12 }}>
                  إليك كيفية تعديل بعض التمارين حسب مستواك:
                </p>
                <AdaptTable exercises={section.exercises} dir={dir} />
              </div>
            );
          }

          if (section.t === 'cta_ar') {
            return (
              <div key={k} style={{
                background: `linear-gradient(135deg, ${C} 0%, ${C_DARK} 100%)`,
                borderRadius: 24, padding: '40px 32px', textAlign: 'center',
                marginBottom: 40, color: '#fff',
              }}>
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}>{section.title}</h2>
                <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.7, margin: '0 0 24px' }}>{section.desc}</p>
                <a href={`https://wa.me/213552435702?text=${section.waText}`}
                   target="_blank" rel="noopener"
                   style={{
                     display: 'inline-block', background: '#25D366', color: '#fff',
                     padding: '16px 36px', borderRadius: 14, textDecoration: 'none',
                     fontSize: 17, fontWeight: 900,
                   }}>
                  📱 استلمي البرنامج عبر واتساب
                </a>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
