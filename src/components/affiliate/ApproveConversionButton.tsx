"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

interface Props {
  conversionId: string;
  onApproved?: () => void;
}

export default function ApproveConversionButton({ conversionId, onApproved }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleApprove = async () => {
    if (loading || done) return;
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversion_id: conversionId }),
      });
      if (res.ok) {
        setDone(true);
        onApproved?.();
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
        <CheckCircle size={13} /> Đã duyệt
      </span>
    );
  }

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
      style={{ background: "rgba(232,93,4,0.15)", color: "#E85D04" }}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
      Duyệt
    </button>
  );
}
