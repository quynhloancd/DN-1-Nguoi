"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle, XCircle, ArrowRight, FileText, MessageSquare, Users,
  ShoppingCart, Star,
} from "lucide-react";

const problems = [
  "Muốn có video thời trang đẹp nhưng không biết quay",
  "Thuê người chụp tốn tiền mà không ưng",
  "Thấy shop khác có video đẹp mà không biết họ làm thế nào",
];

const benefits = [
  "Chỉ cần thay bộ đồ — AI tạo video thời trang xịn cho bạn",
  "Có video đăng TikTok, Reels, Facebook ngay trong ngày",
  "Không tốn tiền thuê người, không cần máy quay chuyên nghiệp",
];

const included = [
  { icon: FileText, title: "File hướng dẫn từng bước bằng hình ảnh", desc: "Làm theo là được — không cần đọc nhiều" },
  { icon: MessageSquare, title: "Prompt mẫu dùng ngay", desc: "Copy vào AI là ra kết quả — không cần mày mò" },
  { icon: Users, title: "Vào group Zalo hỗ trợ", desc: "Hỏi gì có người hỗ trợ, nhận thêm tài liệu miễn phí" },
];

export default function SalesPageClient() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_slug: "huong-dan-video-thoi-trang",
          amount: 100000,
          redirect_url: `${window.location.origin}/cam-on`,
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      alert("Không thể kết nối cổng thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1B2A4A]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Thiên Huệ AI" width={36} height={36} className="rounded-lg object-contain" />
            <span className="text-sm font-bold hidden sm:block">Thiên Huệ AI</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold text-[#E85D04]">
            ☕ 100.000đ
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold"
              style={{ background: "#FFF3E0", color: "#E85D04", border: "1px solid rgba(232,93,4,0.2)" }}>
              📦 Bộ hướng dẫn · Chỉ 100.000đ
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
              Chủ shop thời trang — chỉ cần thay bộ đồ,{" "}
              <span className="text-[#E85D04]">AI tạo video xịn</span> cho bạn đăng ngay
            </h1>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              File hướng dẫn hình ảnh từng bước · Prompt mẫu · Group Zalo hỗ trợ
            </p>
          </div>

          {/* Problems vs Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {/* Problems */}
            <div className="rounded-2xl p-5 border border-red-100 bg-red-50">
              <h3 className="font-bold text-sm text-red-600 mb-3 uppercase tracking-wide">Trước đây</h3>
              <div className="space-y-3">
                {problems.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl p-5 border border-green-100 bg-green-50">
              <h3 className="font-bold text-sm text-green-600 mb-3 uppercase tracking-wide">Sau khi có hướng dẫn</h3>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's included */}
          <div className="rounded-2xl p-6 border border-gray-100 bg-[#F8F9FA] mb-8">
            <h2 className="font-extrabold text-lg mb-4">📦 Bạn nhận được:</h2>
            <div className="space-y-4">
              {included.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(232,93,4,0.1)" }}>
                    <item.icon size={18} className="text-[#E85D04]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div
            className="rounded-2xl p-6 sm:p-8 text-center border"
            style={{ background: "#1B2A4A", borderColor: "#1B2A4A" }}
          >
            <div className="text-3xl mb-3">☕</div>
            <p className="text-white text-base leading-relaxed mb-2">
              <em>&quot;Mời mình ly cafe (100k), mình sẽ gởi bạn file hướng dẫn đầy đủ và chi tiết nhé 😊&quot;</em>
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
              <span className="text-gray-300 text-xs">Nhận ngay sau thanh toán</span>
            </div>

            <button
              onClick={handleBuy}
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: "#E85D04" }}
            >
              {loading ? (
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <><ShoppingCart size={18} /> Mua ngay — 100.000đ <ArrowRight size={16} /></>
              )}
            </button>

            <p className="text-gray-400 text-xs mt-3">
              🔒 Thanh toán an toàn qua PayOS · Nhận file ngay trong ngày
            </p>
          </div>

          {/* PS */}
          <div className="mt-6 p-4 rounded-xl border border-[#E85D04]/20 bg-[#FFF3E0]">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-[#E85D04]">P/S:</strong> Nếu bạn làm thử thấy muốn có tool tự động hơn — mình có tool hoàn chỉnh chỉ cần nhập thông tin là ra video, không cần làm thủ công. Giá 500k. Bạn mua file 100k trước xem có hợp không rồi tính tiếp cũng được.
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            <Link href="/" className="hover:text-[#E85D04] transition-colors">← Về trang chủ</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
