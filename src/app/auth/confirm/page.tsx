"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "verifying" | "success" | "error";

function ConfirmInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");
  const [error, setError] = useState("");
  const started = useRef(false);

  const tokenHash = sp.get("token_hash");
  const type = sp.get("type") || "signup";
  const rawNext = sp.get("next") || "/dashboard";
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("://")
      ? rawNext
      : "/dashboard";

  useEffect(() => {
    // Chỉ chạy 1 lần, và chỉ khi trình duyệt thật thực thi JS (email scanner
    // prefetch chỉ GET HTML, không chạy JS → token một-lần không bị tiêu thụ).
    if (started.current) return;
    started.current = true;

    if (!tokenHash) {
      setStatus("error");
      setError("Liên kết không hợp lệ. Thiếu mã xác thực.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token_hash: tokenHash, type }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.success) {
          setStatus("success");
          setTimeout(() => router.push(next), 1200);
        } else {
          setStatus("error");
          setError(data?.error || "Link xác thực không hợp lệ hoặc đã hết hạn.");
        }
      } catch {
        setStatus("error");
        setError("Lỗi kết nối. Vui lòng thử lại.");
      }
    })();
  }, [tokenHash, type, next, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0a0a0a" }}>
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
      >
        {status === "verifying" && (
          <>
            <div className="flex justify-center mb-5">
              <div
                className="w-12 h-12 rounded-full border-4 animate-spin"
                style={{ borderColor: "#2a2a2a", borderTopColor: "#F97316" }}
              />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Đang xác thực tài khoản…</h1>
            <p className="text-sm text-gray-400">Vui lòng đợi trong giây lát.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div
              className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
            >
              ✓
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Xác thực thành công! 🎉</h1>
            <p className="text-sm text-gray-400">Đang chuyển bạn vào hệ thống…</p>
          </>
        )}

        {status === "error" && (
          <>
            <div
              className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}
            >
              !
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Không thể xác thực</h1>
            <p className="text-sm text-gray-400 mb-6">{error}</p>
            <a
              href="/login"
              className="inline-block w-full py-3 px-6 rounded-xl font-bold text-white transition-colors"
              style={{ background: "#F97316" }}
            >
              Về trang đăng nhập
            </a>
            <p className="text-xs text-gray-500 mt-4">
              Nếu link đã hết hạn, hãy đăng nhập và bấm “Gửi lại email xác nhận”.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
          <div
            className="w-12 h-12 rounded-full border-4 animate-spin"
            style={{ borderColor: "#2a2a2a", borderTopColor: "#F97316" }}
          />
        </div>
      }
    >
      <ConfirmInner />
    </Suspense>
  );
}
