"use client";

import { useState } from "react";
import { Calendar, Phone, Mail, Briefcase, MessageSquare, CheckCircle, Loader2 } from "lucide-react";

const PREFERRED_TIMES = [
  "Sáng (8h–12h) các ngày trong tuần",
  "Chiều (13h–17h) các ngày trong tuần",
  "Tối (19h–21h) các ngày trong tuần",
  "Cuối tuần buổi sáng",
  "Cuối tuần buổi chiều",
  "Linh hoạt — tôi theo lịch của bạn",
];

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", business: "", preferredTime: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E85D04]/15 mb-2">
          <CheckCircle size={32} className="text-[#E85D04]" />
        </div>
        <h3 className="text-xl font-bold text-white">Đã nhận được yêu cầu của bạn!</h3>
        <p className="text-gray-400 max-w-sm mx-auto">
          Thiên Huệ sẽ liên hệ lại với bạn trong vòng <span className="text-[#E85D04] font-semibold">24 giờ</span> để xác nhận lịch hẹn.
        </p>
        <p className="text-sm text-gray-500">Email xác nhận đã được gửi về hộp thư của bạn.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Họ và tên <span className="text-[#E85D04]">*</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nguyễn Văn A"
          required
          className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#E85D04] focus:outline-none transition-colors"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            <Mail size={14} className="inline mr-1" />Email <span className="text-[#E85D04]">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#E85D04] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            <Phone size={14} className="inline mr-1" />Số điện thoại <span className="text-[#E85D04]">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="0912 345 678"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#E85D04] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Business */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          <Briefcase size={14} className="inline mr-1" />Lĩnh vực kinh doanh / Công việc <span className="text-[#E85D04]">*</span>
        </label>
        <input
          name="business"
          value={form.business}
          onChange={handleChange}
          placeholder="VD: Chủ shop thời trang online, Quản lý kinh doanh, ..."
          required
          className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#E85D04] focus:outline-none transition-colors"
        />
      </div>

      {/* Preferred time */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          <Calendar size={14} className="inline mr-1" />Thời gian bạn muốn gặp <span className="text-[#E85D04]">*</span>
        </label>
        <select
          name="preferredTime"
          value={form.preferredTime}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white focus:border-[#E85D04] focus:outline-none transition-colors"
        >
          <option value="" disabled>Chọn khung giờ phù hợp</option>
          {PREFERRED_TIMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          <MessageSquare size={14} className="inline mr-1" />Vấn đề bạn muốn giải quyết <span className="text-[#E85D04]">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Mô tả ngắn quy trình hiện tại của bạn và bạn muốn AI giúp gì... (VD: Mỗi ngày mất 2h gửi báo cáo thủ công, muốn tự động hoá)"
          required
          className="w-full px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder-gray-600 focus:border-[#E85D04] focus:outline-none transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, #E85D04, #F97316)" }}
      >
        {loading ? (
          <><Loader2 size={18} className="animate-spin" /> Đang gửi...</>
        ) : (
          <><Calendar size={18} /> Đặt lịch tư vấn 1-1</>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        Miễn phí tư vấn sơ bộ 15 phút — không cam kết mua gì. Thiên Huệ sẽ liên hệ trong 24h.
      </p>
    </form>
  );
}
