"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckSquare, Video, Wrench, CalendarDays, Lock } from "lucide-react";

const resources = [
  {
    icon: CheckSquare,
    title: "Checklist 5 bÆ°á»›c dÃ¹ng AI lÃ m content bÃ¡n hÃ ng",
  },
  {
    icon: Video,
    title: "10 prompt táº¡o video AI (copy-paste Ä‘Æ°á»£c ngay)",
  },
  {
    icon: Wrench,
    title: "Danh sÃ¡ch tool AI miá»…n phÃ­ cho ngÆ°á»i má»›i",
  },
  {
    icon: CalendarDays,
    title: "Template káº¿ hoáº¡ch ná»™i dung 7 ngÃ y",
  },
];

export default function TaiNguyenMienPhiPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zalo, setZalo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          zalo,
          source: "tai-nguyen-mien-phi",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "CÃ³ lá»—i xáº£y ra. Vui lÃ²ng thá»­ láº¡i.");
      }

      router.push("/cam-on");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "CÃ³ lá»—i xáº£y ra. Vui lÃ²ng thá»­ láº¡i.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#1C2A44]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C2A44] border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="ThiÃªn Huá»‡ AI"
              width={32}
              height={32}
              className="rounded-lg object-contain"
            />
            <span className="text-sm font-bold text-white hidden sm:block">ThiÃªn Huá»‡ AI</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#1C2A44] pt-14">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Nháº­n bá»™ tÃ i nguyÃªn AI miá»…n phÃ­ Ä‘á»ƒ báº¯t Ä‘áº§u
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-8">
            4 tÃ i nguyÃªn thá»±c chiáº¿n cho ngÆ°á»i kinh doanh online muá»‘n dÃ¹ng AI ngay hÃ´m nay
          </p>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden">
            <Image
              src="/áº¢NH/thien-hue-ai-workspace-banner.jpg"
              alt="ThiÃªn Huá»‡ - workspace AI"
              width={640}
              height={360}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 space-y-10">

        {/* 4 Resources */}
        <section>
          <h2 className="text-xl font-extrabold text-center mb-6">
            Báº¡n sáº½ nháº­n Ä‘Æ°á»£c 4 tÃ i nguyÃªn nÃ y:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-orange-50">
                  <item.icon size={20} className="text-[#F97316]" />
                </div>
                <p className="text-sm font-semibold leading-snug text-[#1C2A44] pt-1">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md max-w-lg mx-auto p-6 sm:p-8">
            <h2 className="text-xl font-extrabold mb-5 text-center">
              Äiá»n thÃ´ng tin Ä‘á»ƒ nháº­n ngay
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  TÃªn cá»§a báº¡n <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="VÃ­ dá»¥: Nguyá»…n Thá»‹ Lan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="zalo">
                  Sá»‘ Zalo{" "}
                  <span className="text-gray-400 font-normal">(khÃ´ng báº¯t buá»™c)</span>
                </label>
                <input
                  id="zalo"
                  type="tel"
                  placeholder="Äá»ƒ nháº­n há»— trá»£ nhanh hÆ¡n"
                  value={zalo}
                  onChange={(e) => setZalo(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "#F97316" }}
              >
                {loading ? "Äang gá»­i..." : "Nháº­n tÃ i nguyÃªn miá»…n phÃ­"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-gray-500 text-sm">
              <Lock size={13} />
              <span>ThÃ´ng tin cá»§a báº¡n Ä‘Æ°á»£c báº£o máº­t. KhÃ´ng spam.</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

