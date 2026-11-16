import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Lấy Token và Chat ID từ biến môi trường (Bảo mật tuyệt đối)
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Chưa cấu hình Telegram Token hoặc Chat ID trong biến môi trường!");
      return NextResponse.json(
        { success: false, error: "Lỗi cấu hình server" },
        { status: 500 }
      );
    }

    // Soạn nội dung tin nhắn gửi về Telegram
    const message = `🔔 *Có thông tin form mới từ Website!*\n\n👤 *Họ tên:* ${name}\n📧 *Email:* ${email}\n🕒 *Thời gian:* ${new Date().toLocaleString("vi-VN")}`;

    // Gọi API chính thức của Telegram để gửi tin nhắn
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown", // Dùng Markdown để in đậm đẹp mắt
      }),
    });

    const telegramResult = await telegramResponse.json();

  if (!telegramResult.ok) {
      console.error("Telegram Error:", telegramResult);
      return NextResponse.json(
        { success: false, error: `Telegram lỗi: ${telegramResult.description}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Đã gửi thông tin về Telegram thành công!" 
    });

  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi xử lý dữ liệu" }, 
      { status: 500 }
    );
  }
}