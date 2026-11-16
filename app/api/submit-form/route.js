import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { success: false, error: "Thiếu biến môi trường Telegram trên Server." },
        { status: 500 }
      );
    }

    const message = `🔔 *Có thông tin form mới!*\n\n👤 *Họ tên:* ${name}\n📧 *Email:* ${email}`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const telegramResult = await telegramResponse.json();

    // Nếu Telegram không đồng ý, trả thẳng lỗi chi tiết ra giao diện web
    if (!telegramResult.ok) {
      console.error("Telegram API Error:", telegramResult);
      return NextResponse.json(
        { success: false, error: `Telegram từ chối: ${telegramResult.description}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Đã gửi thông tin về Telegram thành công!" 
    });

  } catch (error) {
    console.error("System Error:", error);
    return NextResponse.json(
      { success: false, error: `Lỗi hệ thống: ${error.message}` }, 
      { status: 500 }
    );
  }
}