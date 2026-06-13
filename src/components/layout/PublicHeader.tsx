"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserAvatar from "@/components/admin/UserAvatar";
import { siteConfig } from "@/lib/site-config";

interface PublicHeaderProps {
  user?: {
    email?: string;
    avatar_url?: string;
    full_name?: string;
  } | null;
}

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Tool AI", href: "/tool-ai" },
  { label: "Combo", href: "/combo" },
  { label: "Khóa học đề xuất", href: "/khoa-hoc-de-xuat" },
  { label: "Tài nguyên miễn phí", href: "/tai-nguyen-mien-phi" },
  { label: "Cộng đồng", href: "https://zalo.me/g/rwbdziccjrlrzxhsbdja", external: true },
];

export default function PublicHeader({ user }: PublicHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((w) => w[0])
        .slice(-2)
        .join("")
        .toUpperCase()
    : user?.email
      ? user.email[0].toUpperCase()
      : "?";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={siteConfig.owner.avatar}
            alt={siteConfig.name}
            width={32}
            height={32}
            sizes="32px"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="text-sm font-bold text-white leading-tight hidden sm:block">
            {siteConfig.name}
          </span>
        </Link>

        {/* Center Nav Links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Avatar */}
              <UserAvatar
                src={user.avatar_url}
                initials={initials}
                size={32}
                gradient="linear-gradient(135deg, #E85D04, #059669)"
              />
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors hidden sm:block"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold py-1.5 px-4 rounded-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, #FFD814, #FFA41C)",
                  color: "#131921",
                }}
              >
                Đăng ký
              </Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Mở menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-14 left-0 right-0 z-50 border-t"
          style={{
            background: "rgba(10,10,10,0.97)",
            borderColor: "#1a1a1a",
          }}
        >
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors py-2.5 border-b border-gray-800 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors py-2.5 border-b border-gray-800 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
