export async function sendAdminNotification(orderDetails) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const message =
    `🛒 *Nouvelle commande !*\n\n` +
    `📦 *${orderDetails.product}*\n` +
    `📐 Qte: ${orderDetails.qty} x ${orderDetails.price.toLocaleString()} DZD = ${(orderDetails.qty * orderDetails.price).toLocaleString()} DZD\n` +
    `👤 ${orderDetails.customer}\n` +
    `📞 ${orderDetails.phone}\n` +
    `📍 ${orderDetails.wilaya} - ${orderDetails.commune}\n` +
    `🏠 ${orderDetails.address || '—'}\n` +
    (orderDetails.customNames ? `💑 ${orderDetails.customNames}\n` : '') +
    (orderDetails.customDate ? `📅 ${orderDetails.customDate}\n` : '') +
    `🚚 ${orderDetails.deliveryType === 'home' ? 'Domicile' : 'Bureau'}\n` +
    `📦 Livraison: ${orderDetails.deliveryPrice.toLocaleString()} DZD\n` +
    `💰 *Total: ${orderDetails.total.toLocaleString()} DZD*`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
    });
  } catch (e) {
    console.error('Telegram notification failed:', e);
  }
}
