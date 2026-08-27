// Этот файл — серверная функция. Она получает данные из формы на сайте
// и отправляет их тебе в Telegram через бота.
//
// Ничего в этом файле редактировать не нужно.
// Нужно только задать 2 переменные окружения в панели Vercel:
//   TELEGRAM_BOT_TOKEN — токен бота (получаешь у @BotFather)
//   TELEGRAM_CHAT_ID   — твой chat id (получаешь у @userinfobot)
// Как это сделать — см. README.md, шаг 4.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, phone, car, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: "Заполните имя и телефон" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({
      ok: false,
      error: "Бот не настроен. Задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в настройках проекта на Vercel."
    });
  }

  const text =
    `🚘 Новая заявка — Ascend Motors\n\n` +
    `Имя: ${name}\n` +
    `Телефон: ${phone}\n` +
    (car ? `Интересует: ${car}\n` : "") +
    (message ? `Комментарий: ${message}\n` : "");

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      return res.status(500).json({ ok: false, error: "Telegram отклонил сообщение", details: tgData });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Не удалось отправить сообщение" });
  }
}
