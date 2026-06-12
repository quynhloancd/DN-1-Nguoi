import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getBaseUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Ch�nh S�ch B?o M?t | ${siteConfig.name}`,
  description: `Ch�nh s�ch b?o m?t v� b?o v? d? li?u c� nh�n c?a kho tool AI ${siteConfig.name}, tu�n th? Lu?t An ninh m?ng 2018 v� Ngh? ??nh 13/2023/N?-CP.`,
  alternates: {
    canonical: `${getBaseUrl()}/privacy`,
  },
  openGraph: {
    title: `Ch�nh S�ch B?o M?t � ${siteConfig.name}`,
    description: `Ch�nh s�ch b?o m?t v� b?o v? d? li?u c� nh�n c?a kho tool AI ${siteConfig.name}`,
  },
};

const sections = [
  {
    id: "thu-thap",
    title: "1. Thu th?p th�ng tin",
    content: [
      "Khi b?n s? d?ng kho tool AI doanhnghiep1nguoi.online, ch�ng t�i thu th?p c�c lo?i th�ng tin c� nh�n sau ?�y, ph� h?p v?i quy ??nh t?i ?i?u 2 Ngh? ??nh 13/2023/N?-CP v? b?o v? d? li?u c� nh�n:",
    ],
    subsections: [
      {
        label: "a) Th�ng tin b?n cung c?p tr?c ti?p:",
        items: [
          "H? v� t�n ??y ??",
          "??a ch? email",
          "S? ?i?n tho?i",
          "Th�ng tin thanh to�n (???c x? l� qua c?ng thanh to�n b�n th? ba -- ch�ng t�i kh�ng l?u tr? th�ng tin th? ng�n h�ng ho?c s? t�i kho?n)",
        ],
      },
      {
        label: "b) Th�ng tin ???c thu th?p t? ??ng:",
        items: [
          "L?ch s? mua h�ng: tool AI / s?n ph?m s? ?� mua, quy?n truy c?p tool ?� k�ch ho?t, t�i li?u h??ng d?n ?� truy c?p",
          "D? li?u ho?t ??ng: t?n su?t truy c?p, th?i gian s? d?ng, t??ng t�c trong c?ng ??ng",
          "Th�ng tin k? thu?t: ??a ch? IP, lo?i tr�nh duy?t (User-Agent), h? ?i?u h�nh, thi?t b? truy c?p",
          "D? li?u cookie v� m� theo d�i (xem m?c 5)",
        ],
      },
    ],
  },
  {
    id: "muc-dich",
    title: "2. M?c ?�ch s? d?ng th�ng tin",
    content: [
      "Theo ?i?u 3 Ngh? ??nh 13/2023/N?-CP, ch�ng t�i ch? x? l� d? li?u c� nh�n khi c� m?c ?�ch r� r�ng. C? th?, th�ng tin c?a b?n ???c s? d?ng cho c�c m?c ?�ch sau:",
    ],
    subsections: [
      {
        label: "a) Cung c?p d?ch v?:",
        items: [
          "T?o v� qu?n l� t�i kho?n ng??i d�ng",
          "C?p quy?n truy c?p tool AI / s?n ph?m s? ?� mua",
          "Theo d�i l?ch s? mua h�ng v� c?p quy?n truy c?p tool",
          "X? l� ??n h�ng v� thanh to�n",
        ],
      },
      {
        label: "b) C?i thi?n tr?i nghi?m:",
        items: [
          "Ph�n t�ch h�nh vi s? d?ng ?? t?i ?u n?i dung v� giao di?n kho tool AI",
          "?? xu?t tool AI v� s?n ph?m ph� h?p v?i nhu c?u c?a b?n",
        ],
      },
      {
        label: "c) Truy?n th�ng v� h? tr?:",
        items: [
          "G?i email x�c nh?n ??n h�ng, th�ng b�o tool AI m?i, c?p nh?t t�i li?u h??ng d?n m?i",
          "G?i th�ng tin khuy?n m�i v� ch??ng tr�nh ?u ?�i (b?n c� th? hu? ??ng k� b?t c? l�c n�o)",
          "Ph?n h?i c�u h?i v� y�u c?u h? tr? k? thu?t",
        ],
      },
      {
        label: "d) An ninh v� ph�p l�:",
        items: [
          "Ph�t hi?n v� ng?n ch?n ho?t ??ng gian l?n, truy c?p tr�i ph�p",
          "Tu�n th? c�c y�u c?u c?a Lu?t An ninh m?ng 2018 v� c�c quy ??nh ph�p lu?t hi?n h�nh",
          "Theo d�i v� t�nh hoa h?ng cho ch??ng tr�nh ??i t�c gi?i thi?u (affiliate)",
        ],
      },
    ],
  },
  {
    id: "chia-se",
    title: "3. Chia s? th�ng tin v?i b�n th? ba",
    content: [
      "Ch�ng t�i cam k?t kh�ng b�n, trao ??i ho?c cho thu� th�ng tin c� nh�n c?a b?n cho b?t k? b�n th? ba n�o v� m?c ?�ch th??ng m?i.",
      "Theo ?i?u 17 Ngh? ??nh 13/2023/N?-CP, ch�ng t�i ch? chia s? d? li?u v?i c�c nh� cung c?p d?ch v? ?�ng tin c?y sau ?�y ?? v?n h�nh kho tool AI:",
    ],
    subsections: [
      {
        label: "a) Nh� cung c?p h? t?ng v� d?ch v?:",
        items: [
          "Supabase: l?u tr? c? s? d? li?u, x�c th?c ng??i d�ng v� qu?n l� phi�n ??ng nh?p (trung t�m d? li?u t?i Singapore)",
          "Vercel: hosting v� ph�n ph?i n?n t?ng web, x? l� y�u c?u HTTP (trung t�m d? li?u to�n c?u)",
          "Amazon Web Services (AWS SES): g?i email giao d?ch v� email ti?p th?",
          "Cloudflare: b?o m?t, CDN v� t?i ?u hi?u su?t website",
        ],
      },
      {
        label: "b) D?ch v? ph�n t�ch v� ti?p th?:",
        items: [
          "Facebook Pixel (Meta): theo d�i hi?u qu? qu?ng c�o v� ph�n t�ch h�nh vi kh�ch h�ng tr�n kho tool AI",
          "YouTube (Google): nh�ng video t�i li?u h??ng d?n, c� th? thu th?p d? li?u theo ch�nh s�ch ri�ng c?a Google",
        ],
      },
    ],
    extra: [
      "T?t c? c�c nh� cung c?p d?ch v? tr�n ??u tu�n th? c�c ti�u chu?n b?o m?t qu?c t? (SOC 2, ISO 27001) v� cam k?t b?o v? d? li?u c� nh�n.",
      "Ch�ng t�i c� th? ti?t l? th�ng tin c� nh�n khi ???c y�u c?u b?i c? quan nh� n??c c� th?m quy?n theo quy ??nh t?i Lu?t An ninh m?ng 2018.",
    ],
  },
  {
    id: "bao-mat",
    title: "4. B?o m?t d? li?u",
    content: [
      "Theo ?i?u 26 Ngh? ??nh 13/2023/N?-CP, ch�ng t�i �p d?ng c�c bi?n ph�p k? thu?t v� t? ch?c ph� h?p ?? b?o v? th�ng tin c� nh�n c?a b?n:",
    ],
    subsections: [
      {
        label: "a) Bi?n ph�p k? thu?t:",
        items: [
          "M� ho� d? li?u truy?n t?i qua giao th?c HTTPS (TLS 1.3)",
          "Supabase Row Level Security (RLS): ??m b?o m?i ng??i d�ng ch? truy c?p ???c d? li?u c?a ch�nh m�nh",
          "M?t kh?u ???c b?m (bcrypt hash) v� kh�ng bao gi? l?u d??i d?ng v?n b?n thu?n",
          "X�c th?c hai y?u t? (2FA) cho t�i kho?n qu?n tr?",
        ],
      },
      {
        label: "b) Bi?n ph�p t? ch?c:",
        items: [
          "Gi?i h?n quy?n truy c?p: ch? nh�n vi�n ???c u? quy?n m?i c� quy?n truy c?p d? li?u c� nh�n",
          "Gi�m s�t h? th?ng li�n t?c ?? ph�t hi?n v� x? l� s?m c�c m?i ?e do? b?o m?t",
          "Sao l?u d? li?u ??nh k? ?? ??m b?o kh? n?ng kh�i ph?c khi c� s? c?",
          "Ki?m tra v� c?p nh?t c�c bi?n ph�p b?o m?t th??ng xuy�n",
        ],
      },
    ],
  },
  {
    id: "cookie",
    title: "5. Cookie v� c�ng ngh? theo d�i",
    content: [
      "Ch�ng t�i s? d?ng cookie v� c�c c�ng ngh? t??ng t? ?? c?i thi?n tr?i nghi?m c?a b?n tr�n kho tool AI. Theo Ngh? ??nh 13/2023/N?-CP, b?n c� quy?n ???c th�ng b�o v� l?a ch?n v? vi?c s? d?ng cookie.",
    ],
    subsections: [
      {
        label: "a) C�c lo?i cookie ch�ng t�i s? d?ng:",
        items: [
          "Cookie thi?t y?u (Session cookie): duy tr� tr?ng th�i ??ng nh?p, b?o m?t phi�n l�m vi?c. Cookie n�y t? ??ng xo� khi b?n ?�ng tr�nh duy?t",
          "Cookie ph�n t�ch (Analytics): thu th?p d? li?u ?n danh v? c�ch b?n s? d?ng kho tool AI ?? c?i thi?n d?ch v?",
          "Cookie affiliate: theo d�i ngu?n gi?i thi?u ?? t�nh hoa h?ng cho ??i t�c. Cookie n�y c� th?i h?n 30 ng�y",
          "Facebook Pixel: theo d�i chuy?n ??i t? qu?ng c�o Facebook, ?o l??ng hi?u qu? chi?n d?ch ti?p th?",
        ],
      },
      {
        label: "b) Qu?n l� cookie:",
        items: [
          "B?n c� th? qu?n l� c�i ??t cookie th�ng qua banner ??ng � cookie tr�n kho tool AI ho?c th�ng qua c�i ??t tr�nh duy?t",
          "V� hi?u ho� cookie thi?t y?u c� th? ?nh h??ng ??n kh? n?ng s? d?ng m?t s? t�nh n?ng",
          "B?n c� th? t? ch?i cookie ph�n t�ch v� ti?p th? m� kh�ng ?nh h??ng ??n tr?i nghi?m mua h�ng c? b?n",
        ],
      },
    ],
  },
  {
    id: "quyen",
    title: "6. Quy?n c?a ng??i d�ng",
    content: [
      "Theo ?i?u 9 Ngh? ??nh 13/2023/N?-CP v� quy ??nh c?a Lu?t An ninh m?ng 2018, b?n c� c�c quy?n sau ??i v?i d? li?u c� nh�n c?a m�nh:",
    ],
    subsections: [
      {
        label: "a) Quy?n xem v� truy c?p d? li?u:",
        items: [
          "Xem to�n b? d? li?u c� nh�n m� ch�ng t�i l?u tr? v? b?n",
          "Y�u c?u b?n sao d? li?u c� nh�n ? ??nh d?ng c� th? ??c ???c (quy?n di chuy?n d? li?u)",
        ],
      },
      {
        label: "b) Quy?n ch?nh s?a d? li?u:",
        items: [
          "C?p nh?t ho?c s?a ??i th�ng tin c� nh�n kh�ng ch�nh x�c ho?c kh�ng ??y ??",
          "Thay ??i th�ng tin li�n h? (email, s? ?i?n tho?i) qua trang C�i ??t t�i kho?n",
        ],
      },
      {
        label: "c) Quy?n xo� d? li?u:",
        items: [
          "Y�u c?u xo� to�n b? d? li?u c� nh�n kh?i h? th?ng",
          "Sau khi nh?n y�u c?u, ch�ng t�i s? xo� ho?c ?n danh ho� d? li?u trong v�ng 30 ng�y",
          "M?t s? d? li?u c� th? ???c gi? l?i n?u ph�p lu?t y�u c?u (v� d?: ho� ??n thanh to�n theo Lu?t K? to�n)",
        ],
      },
      {
        label: "d) Quy?n kh�c:",
        items: [
          "Quy?n h?n ch? x? l�: y�u c?u ng?ng x? l� d? li?u trong m?t s? tr??ng h?p nh?t ??nh",
          "Quy?n ph?n ??i: ph?n ??i vi?c s? d?ng d? li?u cho m?c ?�ch ti?p th? tr?c ti?p",
          "Quy?n r�t l?i s? ??ng �: r�t l?i s? ??ng � ?� cung c?p tr??c ?� b?t c? l�c n�o",
          "Quy?n khi?u n?i: khi?u n?i ??n c? quan b?o v? d? li?u c� nh�n n?u cho r?ng quy?n c?a b?n b? vi ph?m",
        ],
      },
    ],
    extra: [
      `?? th?c hi?n b?t k? quy?n n�o n�u tr�n, vui l�ng li�n h? ch�ng t�i qua email ${siteConfig.supportEmail}. Ch�ng t�i s? x�c minh danh t�nh v� ph?n h?i trong v�ng 72 gi?, x? l� ho�n t?t trong v�ng 30 ng�y k? t? ng�y nh?n ???c y�u c?u h?p l?.`,
    ],
  },
  {
    id: "luu-tru",
    title: "7. Th?i gian l?u tr? d? li?u",
    content: [
      "Theo ?i?u 16 Ngh? ??nh 13/2023/N?-CP, ch�ng t�i ch? l?u tr? d? li?u c� nh�n trong th?i gian c?n thi?t cho m?c ?�ch ?� n�u:",
    ],
    subsections: [
      {
        label: "Th?i gian l?u tr? c? th?:",
        items: [
          "D? li?u t�i kho?n (t�n, email, s? ?i?n tho?i): trong su?t th?i gian t�i kho?n c�n ho?t ??ng v� 30 ng�y sau khi y�u c?u xo�",
          "L?ch s? mua h�ng v� quy?n truy c?p tool: trong su?t th?i gian t�i kho?n ho?t ??ng ?? ??m b?o quy?n truy c?p s?n ph?m s?",
          "D? li?u thanh to�n v� ho� ??n: l?u tr? t?i thi?u 10 n?m theo quy ??nh c?a Lu?t K? to�n Vi?t Nam",
          "Nh?t k� truy c?p (IP, User-Agent): l?u tr? t?i ?a 12 th�ng cho m?c ?�ch b?o m?t",
          "D? li?u cookie ph�n t�ch: t?i ?a 26 th�ng",
        ],
      },
    ],
    extra: [
      "Sau khi h?t th?i gian l?u tr?, d? li?u s? ???c xo� v?nh vi?n ho?c ?n danh ho� ?? kh�ng th? nh?n d?ng c� nh�n.",
    ],
  },
  {
    id: "thay-doi",
    title: "8. Thay ??i ch�nh s�ch b?o m?t",
    content: [
      "Ch�ng t�i c� th? c?p nh?t ch�nh s�ch b?o m?t n�y theo th?i gian ?? ph?n �nh c�c thay ??i trong ho?t ??ng ho?c y�u c?u ph�p l� m?i.",
      "Khi c� thay ??i quan tr?ng, ch�ng t�i s?:",
    ],
    list: [
      "Th�ng b�o cho b?n qua email ?� ??ng k� �t nh?t 7 ng�y tr??c khi thay ??i c� hi?u l?c",
      "??ng th�ng b�o r� r�ng tr�n kho tool AI",
      "C?p nh?t ng�y \"C?p nh?t l?n cu?i\" ? ??u trang ch�nh s�ch",
    ],
    extra: [
      "Vi?c ti?p t?c s? d?ng kho tool AI sau khi ch�nh s�ch ???c c?p nh?t ??ng ngh?a v?i vi?c b?n ch?p nh?n c�c thay ??i. Ch�ng t�i khuy?n kh�ch b?n xem l?i ch�nh s�ch n�y ??nh k?.",
    ],
  },
  {
    id: "lien-he",
    title: "9. Li�n h?",
    content: [
      "N?u b?n c� b?t k? c�u h?i, y�u c?u ho?c khi?u n?i n�o li�n quan ??n ch�nh s�ch b?o m?t ho?c c�ch ch�ng t�i x? l� d? li?u c� nh�n, vui l�ng li�n h?:",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#FFFFFF" }}
    >
      {/* Header */}
      <div className="border-b border-[#E5E7EB] px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#E85D04] hover:text-[#e6be5a] transition-colors mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Quay v? trang ch?
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Ch�nh S�ch B?o M?t
          </h1>
          <p className="text-gray-500 text-sm">
            C?p nh?t l?n cu?i: 18 th�ng 5, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Introduction */}
          <div className="space-y-3">
            <p className="text-gray-300 leading-relaxed">
              Ch�o m?ng b?n ??n v?i{" "}
              <span className="text-white font-medium">{siteConfig.domain}</span>{" "}
              -- kho tool AI thu?c s? h?u v� v?n h�nh b?i{" "}
              <span className="text-white font-medium">Doanh Nghi?p 1 Ng??i</span>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Ch�ng t�i t�n tr?ng quy?n ri�ng t? c?a b?n v� cam k?t b?o v? th�ng
              tin c� nh�n m� b?n cung c?p khi s? d?ng d?ch v?. Ch�nh s�ch b?o m?t
              n�y ???c x�y d?ng ph� h?p v?i{" "}
              <span className="text-white font-medium">Lu?t An ninh m?ng 2018</span>{" "}
              (Lu?t s? 24/2018/QH14) v�{" "}
              <span className="text-white font-medium">
                Ngh? ??nh 13/2023/N?-CP
              </span>{" "}
              v? b?o v? d? li?u c� nh�n, nh?m gi?i th�ch c�ch ch�ng t�i thu th?p,
              s? d?ng, l?u tr? v� b?o v? d? li?u c� nh�n c?a b?n.
            </p>
            <p className="text-gray-300 leading-relaxed">
              B?ng vi?c truy c?p v� s? d?ng kho tool AI, b?n x�c nh?n ?� ??c, hi?u v�
              ??ng � v?i c�c ?i?u kho?n trong ch�nh s�ch b?o m?t n�y.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              M?c l?c
            </h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-[#E85D04] hover:text-[#e6be5a] transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                {section.title}
              </h2>

              {section.content?.map((paragraph, i) => (
                <p key={i} className="text-gray-300 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}

              {/* Simple list (for sections like "thay-doi") */}
              {section.list && (
                <ul className="space-y-2 my-4 ml-1">
                  {section.list.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-gray-300 leading-relaxed"
                    >
                      <span className="text-[#E85D04] mt-1.5 shrink-0">
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="currentColor"
                        >
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Subsections with lettered labels */}
              {section.subsections?.map((sub, si) => (
                <div key={si} className="mb-5">
                  <h3 className="text-sm font-semibold text-white mb-2 mt-4">
                    {sub.label}
                  </h3>
                  <ul className="space-y-2 ml-1">
                    {sub.items.map((item, ii) => (
                      <li
                        key={ii}
                        className="flex gap-3 text-gray-300 leading-relaxed"
                      >
                        <span className="text-[#E85D04] mt-1.5 shrink-0">
                          <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="currentColor"
                          >
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {section.extra?.map((paragraph, i) => (
                <p key={i} className="text-gray-300 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}

              {/* Contact info for the last section */}
              {section.id === "lien-he" && (
                <div className="card-dark p-5 mt-4 space-y-3">
                  <p className="text-gray-300">
                    <span className="text-gray-500">N?n t?ng:</span>{" "}
                    <span className="text-white font-medium">
                      {siteConfig.name}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Ng??i ch?u tr�ch nhi?m b?o v? d? li?u:</span>{" "}
                    <span className="text-white font-medium">
                      {siteConfig.owner.name}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Website:</span>{" "}
                    <Link href="/" className="text-[#E85D04] hover:underline">
                      {siteConfig.domain}
                    </Link>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Email:</span>{" "}
                    <a
                      href={`mailto:${siteConfig.supportEmail}`}
                      className="text-[#E85D04] hover:underline"
                    >
                      {siteConfig.supportEmail}
                    </a>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Zalo:</span>{" "}
                    <a
                      href={siteConfig.socials.zalo}
                      className="text-[#E85D04] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteConfig.socials.zalo.replace(/.*\//, "").replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                    </a>
                  </p>
                </div>
              )}
            </section>
          ))}

          {/* Legal basis note */}
          <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] p-5">
            <p className="text-sm text-gray-500 leading-relaxed">
              <span className="text-white font-medium">C? s? ph�p l�:</span>{" "}
              Ch�nh s�ch b?o m?t n�y ???c x�y d?ng tu�n th? Lu?t An ninh m?ng 2018
              (Lu?t s? 24/2018/QH14), Ngh? ??nh 13/2023/N?-CP v? b?o v? d? li?u
              c� nh�n, v� c�c quy ??nh ph�p lu?t li�n quan c?a n??c C?ng ho� X� h?i
              Ch? ngh?a Vi?t Nam. M?i tranh ch?p ph�t sinh s? ???c gi?i quy?t theo
              ph�p lu?t Vi?t Nam.
            </p>
          </div>

          {/* Related links */}
          <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
            <Link
              href="/terms"
              className="text-sm text-[#E85D04] hover:underline"
            >
              ?i?u kho?n d?ch v? &rarr;
            </Link>
            <Link
              href="/"
              className="text-sm text-[#E85D04] hover:underline"
            >
              &larr; Quay v? trang ch?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
