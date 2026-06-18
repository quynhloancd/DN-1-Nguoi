import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/* Brand icon inline (lucide bản này không có icon mạng xã hội) */
const FacebookIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 17} height={p.size ?? 17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
);
const YoutubeIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 17} height={p.size ?? 17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
  </svg>
);
const ZaloIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 17} height={p.size ?? 17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.78 1.47 5.25 3.77 6.86-.13.93-.5 2.2-1.3 3.34 1.6-.32 3.1-.98 4.1-1.6.99.26 2.04.4 3.13.4 5.52 0 10-3.94 10-8.8S17.52 2 12 2z" />
  </svg>
);

/**
 * Footer cho các trang marketing công khai (qua PublicPageShell).
 * Thương hiệu Doanh Nghiệp 1 Người — nền navy đồng bộ các khối tối.
 */

const ZALO_GROUP = "https://zalo.me/g/rwbdziccjrlrzxhsbdja";

const exploreLinks = [
  { label: "Tool AI", href: "/tool-ai" },
  { label: "Khoá học đề xuất", href: "/khoa-hoc-de-xuat" },
  { label: "Blog", href: "/blog" },
  { label: "Tài nguyên miễn phí", href: "/tai-nguyen-mien-phi" },
];

const supportLinks = [
  { label: "Cộng đồng Zalo", href: ZALO_GROUP, external: true },
  { label: "Tư vấn 1-1", href: "/tuvan", external: false },
  { label: "Liên hệ", href: siteConfig.socials.zalo, external: true },
];

export default function PublicFooter() {
  const socials = [
    { href: siteConfig.socials.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: siteConfig.socials.youtube, Icon: YoutubeIcon, label: "YouTube" },
    { href: siteConfig.socials.zalo, Icon: ZaloIcon, label: "Zalo" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#1C2A44] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/anh/logo.png"
                alt={siteConfig.name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="text-white font-bold text-base leading-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Kho tool AI thực chiến cho người kinh doanh online một mình — tự làm content,
              ảnh, video &amp; quy trình bán hàng, không cần thuê team, không cần biết code.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-[#F97316] hover:text-white text-gray-300 transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Khám phá */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Khám phá</h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-[#F97316] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Hỗ trợ</h3>
            <ul className="space-y-2.5">
              {supportLinks.map((l) =>
                l.external ? (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-[#F97316] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-[#F97316] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* CTA tài nguyên */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Nhận tài nguyên miễn phí</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Bộ tool + prompt mẫu giúp bạn bắt đầu làm content bằng AI ngay hôm nay.
            </p>
            <Link
              href="/tai-nguyen-mien-phi"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-colors hover:brightness-95"
              style={{ background: "#F97316" }}
            >
              Nhận miễn phí <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">{siteConfig.footer.copyright}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
