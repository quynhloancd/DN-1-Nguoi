import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getBaseUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `?i?u Kho?n S? D?ng | ${siteConfig.name}`,
  description: `?i?u kho?n s? d?ng kho tool AI ${siteConfig.name} � ${siteConfig.domain}. Tu�n th? Ngh? ??nh 52/2013/N?-CP v? th??ng m?i ?i?n t?.`,
  alternates: {
    canonical: `${getBaseUrl()}/terms`,
  },
  openGraph: {
    title: `?i?u Kho?n S? D?ng � ${siteConfig.name}`,
    description: `?i?u kho?n s? d?ng kho tool AI ${siteConfig.name}`,
  },
};

const sections = [
  {
    id: "gioi-thieu",
    title: "1. Gi?i thi?u",
    content: [
      `Ch�o m?ng b?n ??n v?i ${siteConfig.domain} ("Kho Tool AI") � kho tool AI thu?c s? h?u v� v?n h�nh b?i Doanh Nghi?p 1 Ng??i ("ch�ng t�i", "c?a ch�ng t�i").`,
      `Kho Tool AI ho?t ??ng theo m� h�nh s�n giao d?ch th??ng m?i ?i?n t? cung c?p d?ch v? n?i dung s? (tool AI, combo s?n ph?m s?), tu�n th? Ngh? ??nh 52/2013/N?-CP ng�y 16 th�ng 5 n?m 2013 c?a Ch�nh ph? v? th??ng m?i ?i?n t? v� c�c v?n b?n h??ng d?n thi h�nh.`,
      "B?ng vi?c truy c?p, ??ng k� t�i kho?n ho?c s? d?ng b?t k? d?ch v? n�o tr�n Kho Tool AI, b?n x�c nh?n ?� ??c, hi?u v� ??ng � tu�n th? to�n b? c�c ?i?u kho?n ???c quy ??nh trong v?n b?n n�y.",
      "N?u b?n kh�ng ??ng � v?i b?t k? ?i?u kho?n n�o, vui l�ng ng?ng s? d?ng Kho Tool AI ngay l?p t?c.",
    ],
  },
  {
    id: "dieu-khoan-su-dung",
    title: "2. ?i?u kho?n s? d?ng",
    content: [
      "?? s? d?ng ??y ?? c�c t�nh n?ng c?a Kho Tool AI, b?n c?n ??ng k� t�i kho?n v?i th�ng tin ch�nh x�c, ??y ?? v� c?p nh?t. Khi s? d?ng Kho Tool AI, b?n cam k?t:",
    ],
    list: [
      "?? 16 tu?i tr? l�n ho?c c� s? ??ng � c?a cha m?/ng??i gi�m h? h?p ph�p",
      "Cung c?p th�ng tin ??ng k� ch�nh x�c, trung th?c v� c?p nh?t khi c� thay ??i",
      "Ch?u tr�ch nhi?m b?o m?t th�ng tin ??ng nh?p (email, m?t kh?u) v� m?i ho?t ??ng di?n ra d??i t�i kho?n c?a m�nh",
      "Kh�ng chia s?, chuy?n nh??ng ho?c cho ph�p ng??i kh�c s? d?ng t�i kho?n c?a m�nh",
      "M?i c� nh�n ch? ???c ??ng k� v� duy tr� m?t t�i kho?n duy nh?t",
      "Kh�ng s? d?ng Kho Tool AI cho m?c ?�ch b?t h?p ph�p, gian l?n ho?c vi ph?m quy?n l?i c?a b�n th? ba",
      "Kh�ng can thi?p, ph� ho?i ho?c g�y ?nh h??ng ??n ho?t ??ng b�nh th??ng c?a Kho Tool AI",
      "Th�ng b�o ngay cho ch�ng t�i n?u ph�t hi?n truy c?p tr�i ph�p v�o t�i kho?n",
    ],
    extra: [
      "Ch�ng t�i c� quy?n t?m kho�, h?n ch? ho?c xo� v?nh vi?n t�i kho?n vi ph?m ?i?u kho?n m� kh�ng c?n th�ng b�o tr??c trong tr??ng h?p vi ph?m nghi�m tr?ng.",
    ],
  },
  {
    id: "so-huu-tri-tue",
    title: "3. Quy?n s? h?u tr� tu?",
    content: [
      `T?t c? n?i dung tr�n Kho Tool AI bao g?m nh?ng kh�ng gi?i h?n: video t�i li?u h??ng d?n, v?n b?n, h�nh ?nh, �m thanh, template, m� ngu?n, thi?t k? giao di?n, logo v� th??ng hi?u "Doanh Nghi?p 1 Ng??i" l� t�i s?n tr� tu? c?a ${siteConfig.owner.name} ho?c c�c ??i t�c ???c u? quy?n h?p ph�p, ???c b?o h? theo Lu?t S? h?u tr� tu? Vi?t Nam n?m 2005 (s?a ??i, b? sung n?m 2009, 2019, 2022).`,
    ],
    list: [
      "B?n ???c c?p quy?n s? d?ng c� nh�n, kh�ng ??c quy?n, kh�ng chuy?n nh??ng ?? truy c?p tool AI / s?n ph?m s? ?� mua",
      "Nghi�m c?m sao ch�p, t�i t?o, ph�n ph?i, b�n l?i, cho thu�, chia s? c�ng khai ho?c ph�t t�n tool AI v� t�i li?u h??ng d?n d??i m?i h�nh th?c",
      "Nghi�m c?m ghi m�n h�nh, t?i xu?ng tr�i ph�p, s? d?ng c�ng c? b�n th? ba ?? tr�ch xu?t, crawl ho?c scrape n?i dung",
      "Nghi�m c?m s? d?ng tool AI / s?n ph?m s? cho m?c ?�ch th??ng m?i m� kh�ng c� s? cho ph�p b?ng v?n b?n c?a ch�ng t�i",
      "Vi ph?m quy?n s? h?u tr� tu? s? d?n ??n kho� t�i kho?n v?nh vi?n, kh�ng ho�n ti?n, v� c� th? b? x? l� theo quy ??nh ph�p lu?t Vi?t Nam",
    ],
  },
  {
    id: "thanh-toan-hoan-tien",
    title: "4. Thanh to�n & ho�n ti?n",
    content: [
      "Khi mua tool AI ho?c combo s?n ph?m s? tr�n Kho Tool AI, b?n ??ng � v?i c�c ?i?u kho?n thanh to�n v� ho�n ti?n sau ?�y, ph� h?p v?i ?i?u 36 Ngh? ??nh 52/2013/N?-CP:",
    ],
    list: [
      "Gi� tool AI v� combo s?n ph?m s? ???c ni�m y?t b?ng Vi?t Nam ??ng (VND) v� ?� bao g?m thu? GTGT (n?u c�)",
      "Ph??ng th?c thanh to�n: chuy?n kho?n ng�n h�ng n?i ??a ho?c qua c?ng thanh to�n tr?c tuy?n ???c t�ch h?p tr�n Kho Tool AI",
      "Quy?n truy c?p tool AI / s?n ph?m s? ???c k�ch ho?t ngay sau khi h? th?ng x�c nh?n thanh to�n th�nh c�ng",
      "S?n ph?m s? (tool AI, combo) kh�ng ho�n ti?n sau khi ?� nh?n link / t�i li?u h??ng d?n",
      "H? tr? k? thu?t v� h??ng d?n s? d?ng qua Zalo group trong 30 ng�y k? t? ng�y mua",
      "Tr??ng h?p l?i k? thu?t nghi�m tr?ng t? ph�a Kho Tool AI khi?n b?n kh�ng th? truy c?p s?n ph?m, ch�ng t�i s? h? tr? x? l� ho?c b?i ho�n ph� h?p",
      "Ch�ng t�i c� quy?n thay ??i gi� d?ch v? sau khi th�ng b�o tr??c 7 ng�y. Gi� m?i kh�ng �p d?ng cho c�c ??n h�ng ?� thanh to�n",
    ],
    extra: [
      `Y�u c?u ho�n ti?n ???c g?i qua email ${siteConfig.supportEmail} v� s? ???c x? l� trong v�ng 7 ng�y l�m vi?c.`,
    ],
  },
  {
    id: "quyen-nghia-vu-nguoi-dung",
    title: "5. Quy?n v� ngh?a v? ng??i d�ng",
    content: ["Khi s? d?ng Kho Tool AI, b?n c� c�c quy?n v� ngh?a v? sau:"],
    subsections: [
      {
        subtitle: "5.1. Quy?n c?a kh�ch h�ng",
        list: [
          "Truy c?p v� s? d?ng tool AI / s?n ph?m s? ?� mua trong th?i h?n cho ph�p",
          "Nh?n h? tr? k? thu?t khi g?p s? c? truy c?p ho?c s? d?ng s?n ph?m",
          "Tham gia c?ng ??ng Doanh Nghi?p 1 Ng??i, ??t c�u h?i v� trao ??i ki?n th?c",
          "Nh?n quy?n truy c?p tool v� t�i li?u h??ng d?n ?i k�m s?n ph?m ?� mua",
          "???c h? tr? qua Zalo group trong 30 ng�y theo ch�nh s�ch n�u t?i M?c 4",
          "Y�u c?u xo� t�i kho?n v� d? li?u c� nh�n theo quy ??nh ph�p lu?t",
          "Khi?u n?i, ph?n �nh v? ch?t l??ng d?ch v? qua c�c k�nh li�n h? ch�nh th?c",
        ],
      },
      {
        subtitle: "5.2. Ngh?a v? c?a kh�ch h�ng",
        list: [
          "Tu�n th? c�c ?i?u kho?n s? d?ng v� quy t?c ?ng x? c?ng ??ng",
          "T�n tr?ng quy?n s? h?u tr� tu? c?a Kho Tool AI v� c�c b�n li�n quan",
          "Kh�ng l?m d?ng h? th?ng ho�n ti?n ho?c khuy?n m�i",
          "Kh�ng ??ng t?i n?i dung vi ph?m ph�p lu?t, x�c ph?m, qu?y r?i ho?c spam trong c?ng ??ng",
          "Kh�ng m?o danh ng??i kh�c ho?c cung c?p th�ng tin sai l?ch",
          "Ch?u tr�ch nhi?m v? m?i ho?t ??ng di?n ra d??i t�i kho?n c?a m�nh",
        ],
      },
    ],
  },
  {
    id: "quyen-nghia-vu-nen-tang",
    title: "6. Quy?n v� ngh?a v? Kho Tool AI",
    content: [],
    subsections: [
      {
        subtitle: "6.1. Quy?n c?a Kho Tool AI",
        list: [
          "Qu?n l�, v?n h�nh v� ph�t tri?n Kho Tool AI theo ??nh h??ng c?a m�nh",
          "T?m kho� ho?c ch?m d?t t�i kho?n kh�ch h�ng vi ph?m ?i?u kho?n",
          "Thay ??i, c?p nh?t ho?c ng?ng cung c?p b?t k? t�nh n?ng ho?c s?n ph?m n�o sau khi th�ng b�o h?p l�",
          "Thu th?p v� s? d?ng d? li?u kh�ch h�ng theo Ch�nh s�ch B?o m?t ?� c�ng b?",
          "T? ch?i cung c?p d?ch v? cho c�c tr??ng h?p vi ph?m ph�p lu?t ho?c ?i?u kho?n s? d?ng",
        ],
      },
      {
        subtitle: "6.2. Ngh?a v? c?a Kho Tool AI",
        list: [
          "Cung c?p tool AI / s?n ph?m s? ?�ng v?i m� t? v� cam k?t ?� c�ng b?",
          "B?o v? th�ng tin c� nh�n v� d? li?u kh�ch h�ng theo quy ??nh ph�p lu?t",
          "H? tr? gi?i quy?t khi?u n?i, ph?n �nh c?a kh�ch h�ng trong th?i gian h?p l�",
          "Th�ng b�o k?p th?i v? c�c thay ??i quan tr?ng ?nh h??ng ??n quy?n l?i kh�ch h�ng",
          "Tu�n th? quy ??nh ph�p lu?t Vi?t Nam v? th??ng m?i ?i?n t? v� b?o v? ng??i ti�u d�ng",
          "C�ng b? ??y ?? th�ng tin v? d?ch v?, gi� c? v� ch�nh s�ch theo ?i?u 29 Ngh? ??nh 52/2013/N?-CP",
        ],
      },
    ],
  },
  {
    id: "bao-mat-thong-tin",
    title: "7. B?o m?t th�ng tin",
    content: [
      "Ch�ng t�i cam k?t b?o v? th�ng tin c� nh�n c?a b?n theo c�c quy ??nh c?a ph�p lu?t Vi?t Nam v? b?o v? d? li?u c� nh�n. Chi ti?t ???c quy ??nh t?i Ch�nh s�ch B?o m?t c?a Kho Tool AI.",
    ],
    list: [
      "Th�ng tin c� nh�n ???c thu th?p, x? l� v� l?u tr? theo ?�ng m?c ?�ch ?� th�ng b�o",
      "�p d?ng c�c bi?n ph�p k? thu?t v� t? ch?c ph� h?p ?? b?o v? d? li?u: m� ho� HTTPS, x�c th?c an to�n, ph�n quy?n truy c?p",
      "Kh�ng b�n, trao ??i ho?c cho thu� th�ng tin c� nh�n cho b�n th? ba v� m?c ?�ch th??ng m?i",
      "Ch? chia s? d? li?u v?i c�c nh� cung c?p d?ch v? ?�ng tin c?y c?n thi?t cho vi?c v?n h�nh Kho Tool AI",
      "Ng??i d�ng c� quy?n truy c?p, ch?nh s?a, y�u c?u xo� d? li?u c� nh�n c?a m�nh",
    ],
    extra: [
      "?? bi?t th�m chi ti?t, vui l�ng tham kh?o Ch�nh s�ch B?o m?t t?i trang ri�ng c?a ch�ng t�i.",
    ],
  },
  {
    id: "gioi-han-trach-nhiem",
    title: "8. Gi?i h?n tr�ch nhi?m",
    content: [
      'Kho Tool AI v� to�n b? s?n ph?m s? ???c cung c?p tr�n c? s? "nguy�n tr?ng" (as-is) v� "s?n c�" (as-available). Trong ph?m vi ph�p lu?t cho ph�p:',
    ],
    list: [
      "Ch�ng t�i kh�ng ??m b?o Kho Tool AI ho?t ??ng li�n t?c, kh�ng gi�n ?o?n ho?c ho�n to�n kh�ng c� l?i k? thu?t",
      "Ch�ng t�i kh�ng ch?u tr�ch nhi?m v? k?t qu? c? th? t? vi?c �p d?ng tool AI, v� k?t qu? ph? thu?c v�o n? l?c v� ho�n c?nh c� nh�n c?a m?i kh�ch h�ng",
      "Ch�ng t�i kh�ng ch?u tr�ch nhi?m v? thi?t h?i gi�n ti?p, ng?u nhi�n, ??c bi?t ho?c mang t�nh h?u qu? ph�t sinh t? vi?c s? d?ng ho?c kh�ng th? s? d?ng Kho Tool AI",
      "Ch�ng t�i kh�ng ch?u tr�ch nhi?m v? n?i dung, s?n ph?m ho?c d?ch v? c?a b�n th? ba ???c li�n k?t tr�n Kho Tool AI",
      "Tr�ch nhi?m b?i th??ng t?i ?a c?a ch�ng t�i trong m?i tr??ng h?p kh�ng v??t qu� t?ng s? ti?n b?n ?� thanh to�n cho d?ch v? li�n quan trong 12 th�ng g?n nh?t",
    ],
  },
  {
    id: "thay-doi-dieu-khoan",
    title: "9. Thay ??i ?i?u kho?n",
    content: [
      "Ch�ng t�i c� quy?n s?a ??i, b? sung ho?c c?p nh?t c�c ?i?u kho?n S? d?ng n�y v�o b?t k? th?i ?i?m n�o. Khi c� thay ??i:",
    ],
    list: [
      "Phi�n b?n m?i s? ???c ??ng t?i tr�n Kho Tool AI k�m ng�y c?p nh?t",
      "Thay ??i quan tr?ng s? ???c th�ng b�o qua email ??ng k� ho?c th�ng b�o tr�n Kho Tool AI tr??c �t nh?t 7 ng�y",
      "Vi?c ti?p t?c s? d?ng Kho Tool AI sau ng�y thay ??i c� hi?u l?c ??ng ngh?a v?i vi?c b?n ch?p nh?n c�c ?i?u kho?n m?i",
      "N?u kh�ng ??ng � v?i ?i?u kho?n m?i, b?n c� quy?n ng?ng s? d?ng Kho Tool AI v� y�u c?u xo� t�i kho?n",
    ],
  },
  {
    id: "lien-he",
    title: "10. Li�n h?",
    content: [
      "M?i c�u h?i, g�p �, khi?u n?i ho?c y�u c?u li�n quan ??n ?i?u kho?n S? d?ng n�y, vui l�ng li�n h? v?i ch�ng t�i qua c�c k�nh sau:",
    ],
  },
];

export default function TermsPage() {
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Quay v? trang ch?
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2A4A] mb-2">
            ?i?u Kho?n S? D?ng
          </h1>
          <p className="text-gray-500 text-sm">
            C?p nh?t l?n cu?i: 18/05/2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-10">
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
              <h2 className="text-lg sm:text-xl font-bold text-[#1B2A4A] mb-4">
                {section.title}
              </h2>

              {section.content?.map((paragraph, i) => (
                <p key={i} className="text-gray-300 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}

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

              {/* Subsections (for sections 5 & 6) */}
              {section.subsections?.map((sub, si) => (
                <div key={si} className="mt-5 mb-4">
                  <h3 className="text-base font-semibold text-[#1B2A4A] mb-3">
                    {sub.subtitle}
                  </h3>
                  <ul className="space-y-2 ml-1">
                    {sub.list.map((item, i) => (
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
                </div>
              ))}

              {section.extra?.map((paragraph, i) => (
                <p key={i} className="text-gray-500 leading-relaxed mb-3 text-sm italic">
                  {paragraph}
                </p>
              ))}

              {/* Contact info for the last section */}
              {section.id === "lien-he" && (
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] p-5 mt-4 space-y-3">
                  <p className="text-gray-300">
                    <span className="text-gray-500">N?n t?ng:</span>{" "}
                    <span className="text-[#1B2A4A] font-medium">
                      {siteConfig.name}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Ng??i ??i di?n:</span>{" "}
                    <span className="text-[#1B2A4A] font-medium">
                      {siteConfig.owner.name}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Website:</span>{" "}
                    <Link
                      href="/"
                      className="text-[#E85D04] hover:underline"
                    >
                      {siteConfig.domain}
                    </Link>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Email h? tr?:</span>{" "}
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E85D04] hover:underline"
                    >
                      {siteConfig.socials.zalo.replace(/.*\//, "").replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                    </a>
                  </p>
                </div>
              )}
            </section>
          ))}

          {/* Related links */}
          <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
            <Link
              href="/privacy"
              className="text-sm text-[#E85D04] hover:underline"
            >
              Ch�nh s�ch b?o m?t &rarr;
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
