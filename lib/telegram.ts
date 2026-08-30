/**
 * Optional Telegram Bot Notification helper.
 * If TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are provided in environment variables,
 * sends a formatted HTML notification message to the coffee shop owner/staff when a guest reserves a table.
 */
export async function sendTelegramReservationNotification(reservation: {
  name: string;
  phone: string;
  guests: number;
  date: string | Date;
  note?: string | null;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('[Telegram Bot] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured. Skipping notification.');
    return;
  }

  const formattedDate = new Date(reservation.date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const messageText = `
<b>☕ Новая бронь стола в The Coffee Belt!</b>

👤 <b>Имя:</b> ${escapeHtml(reservation.name)}
📞 <b>Телефон:</b> ${escapeHtml(reservation.phone)}
👥 <b>Гостей:</b> ${reservation.guests} чел.
📅 <b>Дата и время:</b> ${formattedDate}
📝 <b>Пожелания:</b> ${reservation.note ? escapeHtml(reservation.note) : '—'}

<i>Проверьте админ-панель сайта для подтверждения.</i>
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error('[Telegram Bot] Failed to send message:', errData);
    } else {
      console.log('[Telegram Bot] Reservation notification sent successfully!');
    }
  } catch (error) {
    console.error('[Telegram Bot] Error sending notification:', error);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
