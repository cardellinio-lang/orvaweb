export const metadata = { title: 'تأكيد الطلب - orva.dz' };

export default function StandaloneLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/fav-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fav-180.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
