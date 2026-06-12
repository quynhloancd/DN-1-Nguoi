"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle, ArrowRight, Mail, User,
  MessageSquare, ImageIcon, Video, Calendar,
} from "lucide-react";

const steps = [
  {
    num: 1,
    icon: MessageSquare,
    color: "#E85D04",
    title: "Xác định mục tiêu & lên kế hoạch content",
    desc: "Bán cho ai, đăng gì, đăng khi nào — AI giúp lên kế hoạch content cả tháng chỉ trong 15 phút",
    tools: "Tool miễn phí: ChatGPT, Gemini",
  },
  {
    num: 2,
    icon: ImageIcon,
    color: "#3b82f6",
    title: "Tạo ảnh sản phẩm đẹp",
    desc: "Chụp bằng điện thoại → AI xóa phông, làm đẹp, thêm chữ chuyên nghiệp",
    tools: "Tool miễn phí: Canva AI, RemoveBG, Adobe Express",
  },
  {
    num: 3,
    icon: MessageSquare,
    color: "#a855f7",
    title: "Viết content bán hàng",
    desc: "Caption Facebook, mô tả sản phẩm, kịch bản video ngắn",
    tools: "Tool miễn phí: ChatGPT, Gemini",
  },
  {
    num: 4,
    icon: Video,
    color: "#f59e0b",
    title: "Tạo video ngắn",
    desc: "Ghép ảnh + nhạc + text tự động thành video TikTok/Reels/Facebook",
    tools: "Tool miễn phí: CapCut AI, Canva Video",
  },
  {
    num: 5,
    icon: Calendar,
    color: "#22c55e",
    title: "Lên lịch đăng bài tự động",
    desc: "Lên lịch cả tuần, đăng tự động không cần ngồi canh từng bài",
    tools: "Tool miễn phí: Meta Business Suite",
  },
];

export default function LoTrinhClient() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Vui lòng điền đầy đủ Tên và Email.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, source: "lo-trinh" }),
      });

      if (!res.ok) throw new Error("Lỗi server");

      setStatus("success");
      // Redirect to /cam-on after short delay
      setTimeout(() => {
        window.location.href = "/cam-on";
      }, 800);
    } catch {
      setStatus("error");
      setErrorMsg("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A]">
      {/* Header nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Thiên Huệ AI" width={36} height={36} className="rounded-lg object-contain" />
            <span className="text-sm font-bold text-[#1B2A4A] hidden sm:block">Thiên Huệ AI</span>
          </Link>
          <Link href="/courses" className="text-sm text-gray-500 hover:text-[#E85D04] transition-colors">
            Xem khoá học →
          </Link>
        </div>
      </nav>

      <div className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold"
              style={{ background: "#FFF3E0", color: "#E85D04", border: "1px solid rgba(232,93,4,0.2)" }}>
              ✅ Checklist miễn phí — Dùng được ngay
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
              Đồng nghiệp dùng AI làm được gì{" "}
              <span className="text-[#E85D04]">mà bạn chưa biết?</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
              5 bước đơn giản để chủ shop thời trang tự làm ảnh, video, content bán hàng bằng AI — không cần thuê người, không cần biết kỹ thuật.
            </p>
          </div>

          {/* 5 Steps */}
          <div className="space-y-4 mb-14">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#E85D04]/20 transition-colors"
              >
                {/* Number badge */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0"
                  style={{ background: step.color }}
                >
                  {step.num}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[#1B2A4A] mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{step.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: step.color }}>
                    <CheckCircle size={12} />
                    {step.tools}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-medium">Nhận checklist đầy đủ + prompt mẫu miễn phí</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email form */}
          <div
            className="rounded-2xl p-6 sm:p-8 border"
            style={{ background: "#FFF8F3", borderColor: "rgba(232,93,4,0.2)" }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-extrabold mb-1">
                Nhận checklist đầy đủ + <span className="text-[#E85D04]">prompt mẫu miễn phí</span>
              </h2>
              <p className="text-sm text-gray-600">Điền thông tin bên dưới — mình gửi ngay qua email</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              {/* Name */}
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#E85D04] transition-colors bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#E85D04] transition-colors bg-white"
                  required
                />
              </div>

              {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all"
                style={{ background: status === "success" ? "#22c55e" : "#E85D04" }}
              >
                {status === "loading" ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : status === "success" ? (
                  <><CheckCircle size={16} /> Đang chuyển trang...</>
                ) : (
                  <>Nhận ngay <ArrowRight size={16} /></>
                )}
              </button>

              <p className="text-center text-[11px] text-gray-400">
                🔒 Mình không spam. Hủy đăng ký bất cứ lúc nào.
              </p>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-[#E85D04] hover:underline font-medium">Đăng nhập</Link>
            {" "}để xem toàn bộ khoá học.
          </p>
        </div>
      </div>
    </div>
  );
}
