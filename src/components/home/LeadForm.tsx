"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        router.push("/cam-on");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "C� l?i x?y ra. Vui l�ng th? l?i.");
        setStatus("error");
      }
    } catch {
      setError("L?i k?t n?i. Vui l�ng th? l?i.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-md w-full">
      <h3 className="text-xl font-bold text-[#1C2A44] mb-2 text-center">
        Nh?n t�i nguy�n mi?n ph�
      </h3>
      <p className="text-sm text-gray-500 text-center mb-6">
        ?i?n th�ng tin ?? nh?n ngay b? t�i nguy�n AI
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            T�n c?a b?n <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguy?n V?n A"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#F97316] hover:bg-[#ea6c0a] text-white font-bold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {status === "loading" ? "?ang x? l�..." : "Nh?n mi?n ph�"}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
        Th�ng tin c?a b?n ???c b?o m?t tuy?t ??i.
      </p>
    </div>
  );
}
