"use client";

import { useState } from "react";
import { XCircle, Loader2 } from "lucide-react";

interface Props {
  conversionId: string;
  onRejected?: () => void;
}

export default function RejectConversionButton({ conversionId, onRejected }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleReject = async () => {
    if (loading || done) return;
    if (!confirm("Từ chối conversion này?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/affiliate/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversion_id: conversionId }),
      });
      if (res.ok) {
        setDone(true);
        onRejected?.();
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
      <span className="flex items-center gap-1 text-xs text-gray-500">
        <XCircle size={13} /> Đã từ chối
      </span>
    );
  }

  return (
    <button
      onClick={handleReject}
      disabled={loading}
      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
      style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
      Từ chối
    </button>
  );
}
