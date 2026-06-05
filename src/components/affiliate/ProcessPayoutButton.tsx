"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

interface Props {
  payoutId: string;
  onProcessed?: () => void;
}

export default function ProcessPayoutButton({ payoutId, onProcessed }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleProcess = async () => {
    if (loading || done) return;
    if (!confirm("Xác nhận đã chuyển tiền thành công?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate/process-payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payout_id: payoutId }),
      });
      if (res.ok) {
        setDone(true);
        onProcessed?.();
      } else {
        const data = await res.json();
        alert(data.error || "Có lỗi xảy ra");
      }
    } catch {
      alert("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <span className="flex items-center gap-1 text-xs text-green-400">
        <CheckCircle size={13} /> Đã hoàn tất
      </span>
    );
  }

  return (
    <button
      onClick={handleProcess}
      disabled={loading}
      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
      style={{ background: "rgba(232,93,4,0.1)", color: "#E85D04" }}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
      Đã chuyển tiền
    </button>
  );
}
