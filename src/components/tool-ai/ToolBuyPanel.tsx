"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Bank = { bankName: string; bankCode: string; account: string; accountName: string };

type PendingInfo = { order_code: string; amount: number } | null;

export default function ToolBuyPanel({
  toolId,
  amount,
  ctaText,
  isLoggedIn,
  initialPending,
  bank,
}: {
  toolId: string;
  amount: number;
  ctaText: string;
  isLoggedIn: boolean;
  initialPending: PendingInfo;
  bank: Bank;
}) {
  const [pending, setPending] = useState<PendingInfo>(initialPending);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

  // Khi đang chờ xác nhận: poll trạng thái mỗi 5s, xác nhận xong tự mở khóa.
  useEffect(() => {
    if (!pending) return;
    const code = pending.order_code;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/tools/order-status?code=${encodeURIComponent(code)}`);
        const data = await res.json();
        if (data?.confirmed) {
          clearInterval(id);
          window.location.reload();
        }
      } catch {}
    }, 5000);
    return () => clearInterval(id);
  }, [pending]);

  async function handleBuy() {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tools/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool_id: toolId }),
      });
      const data = await res.json();
      if (res.ok && data.pending) {
        setPending({ order_code: data.order_code, amount: data.amount });
      } else if (data.alreadyOwned) {
        window.location.reload();
      } else {
        setError(data.error || "Không thể tạo đơn. Vui lòng thử lại.");
      }
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string, key: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 1500);
    });
  }

  // ── Chưa đăng nhập ─────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-6 text-center">
        <div className="text-3xl mb-2">🔒</div>
        <p className="text-[#1C2A44] font-semibold mb-1">Nội dung dành cho thành viên</p>
        <p className="text-sm text-gray-500 mb-4">Đăng nhập để mua và sử dụng tool này.</p>
        <Link
          href="/login"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white"
          style={{ background: "#F97316" }}
        >
          Đăng nhập / Đăng ký
        </Link>
      </div>
    );
  }

  // ── Đã có đơn chờ xác nhận → hiện thông tin chuyển khoản ───────
  if (pending) {
    return (
      <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-6">
        <p className="font-bold text-[#1C2A44] mb-1">Đơn đã được ghi nhận — chờ xác nhận thanh toán</p>
        <p className="text-sm text-gray-600 mb-4">
          Vui lòng chuyển khoản đúng <b>số tiền</b> và <b>nội dung</b> bên dưới. Hệ thống tự động
          xác nhận sau khi nhận được tiền — tool sẽ <b>tự mở khóa</b> cho bạn (thường trong vài phút).
        </p>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 text-sm">
          <Row label="Ngân hàng" value={bank.bankName} />
          <Row label="Số tài khoản" value={bank.account} onCopy={() => copy(bank.account, "acc")} copied={copied === "acc"} />
          <Row label="Chủ tài khoản" value={bank.accountName} />
          <Row
            label="Số tiền"
            value={fmt(pending.amount)}
            highlight
            onCopy={() => copy(String(pending.amount), "amt")}
            copied={copied === "amt"}
          />
          <Row
            label="Nội dung CK"
            value={pending.order_code}
            highlight
            onCopy={() => copy(pending.order_code, "code")}
            copied={copied === "code"}
          />
        </div>
        <p className="text-xs text-gray-500 mt-3">
          ⚠️ Ghi đúng nội dung <b>{pending.order_code}</b> để được duyệt nhanh. Cần hỗ trợ? Nhắn Zalo.
        </p>
        <Link
          href="/tool-cua-toi"
          className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: "#F97316" }}
        >
          Tôi đã chuyển khoản → Xem Tool của tôi
        </Link>
      </div>
    );
  }

  // ── Chưa mua → nút Mua ─────────────────────────────────────────
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-6 text-center">
      <div className="text-3xl mb-2">🔒</div>
      <p className="text-[#1C2A44] font-semibold mb-1">Mua để mở khóa tool</p>
      <p className="text-2xl font-extrabold mb-4" style={{ color: "#F97316" }}>{fmt(amount)}</p>
      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
      <button
        onClick={handleBuy}
        disabled={loading}
        className="inline-block px-10 py-3 rounded-xl font-bold text-white text-base disabled:opacity-60"
        style={{ background: "#F97316" }}
      >
        {loading ? "Đang xử lý..." : ctaText || "Mua ngay"}
      </button>
      <p className="text-xs text-gray-500 mt-3">
        Thanh toán chuyển khoản — admin xác nhận là dùng được ngay.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="text-gray-500">{label}</span>
      <span className="flex items-center gap-2">
        <span className={highlight ? "font-bold text-[#F97316]" : "font-medium text-[#1C2A44]"}>
          {value}
        </span>
        {onCopy && (
          <button
            onClick={onCopy}
            className="text-xs px-2 py-0.5 rounded border border-gray-300 text-gray-500 hover:bg-gray-50"
          >
            {copied ? "Đã chép" : "Chép"}
          </button>
        )}
      </span>
    </div>
  );
}
