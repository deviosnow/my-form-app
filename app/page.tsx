"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  // Trạng thái điều khiển việc ẩn/hiện của Popup
  const [isOpen, setIsOpen] = useState(false);
  
  // Dữ liệu form nhập liệu
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Đang gửi...");
    
    // Giả lập gửi dữ liệu thành công sau 1 giây
    setTimeout(() => {
      setStatus("Gửi thành công!");
      setFormData({ name: "", email: "" });
      // Đóng popup sau khi gửi thành công (tùy chọn)
      setTimeout(() => {
        setIsOpen(false);
        setStatus("");
      }, 1500);
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      {/* 1. Phần nội dung chính của trang (H1, P trong div, Button mở popup) */}
      <div className="max-w-xl text-center space-y-6 bg-white p-10 rounded-2xl shadow-md">
        <h1 className="text-4xl font-extrabold text-slate-800">
          Chào mừng đến với Website của tôi
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Đây là trang web mẫu sử dụng Next.js và Tailwind CSS. Bạn có thể bấm vào nút bên dưới để mở cửa sổ nhập liệu tương tác với giao diện được khóa nền hoàn hảo.
        </p>
        
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition active:scale-95"
        >
          Mở Form Nhập Liệu
        </button>
      </div>

      {/* 2. Cửa sổ Popup & Khóa nền (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Lớp nền tối (Backdrop) - Bấm vào đây hoặc khóa tương tác nền */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)} // Bấm ra ngoài nền để đóng popup
          />

          {/* Hộp chứa nội dung Form Popup */}
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Nhập thông tin của bạn</h2>
              {/* Nút đóng (X) */}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ tên</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ tên..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email..."
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Gửi đi
                </button>
              </div>
            </form>

            {status && <p className="mt-4 text-center text-sm font-medium text-blue-600">{status}</p>}
          </div>

        </div>
      )}
    </main>
  );
}