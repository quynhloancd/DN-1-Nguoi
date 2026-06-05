"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, Menu, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NotificationDropdown from "@/components/layout/NotificationDropdown";
import UserAvatar from "@/components/admin/UserAvatar";
import SearchModal, { useSearchShortcut } from "@/components/layout/SearchModal";
import { useMobileSidebar } from "@/components/layout/MobileSidebarContext";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions/auth";

interface PromotionItem {
  label: string;
  text: string;
  link?: string;
}

interface TopBarProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  notification?: { label: string; text: string };
  promotions?: PromotionItem[];
}

interface UserProfile {
  full_name: string | null;
  avatar_url: string | null;
  role: string;
}

export default function TopBar({ title, subtitle, onMenuClick, notification, promotions }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchShortcut(() => setSearchOpen(true));
  const { toggle: toggleMobileSidebar } = useMobileSidebar();
  const [promoIndex, setPromoIndex] = useState(0);

  // Auto-rotate promotions every 5s
  useEffect(() => {
    if (!promotions || promotions.length <= 1) return;
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promotions]);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch user profile
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setEmail(user.email ?? "");
      supabase
        .from("profiles")
        .select("full_name, avatar_url, role")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data as UserProfile);
        });
    });
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }
    if (avatarMenuOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [avatarMenuOpen]);

  const handleMenuClick = onMenuClick || toggleMobileSidebar;

  const displayName = profile?.full_name || email.split("@")[0] || "Tài khoản";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30" style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)" }}>
      {/* Promotion Bar — dynamic rotating banners */}
      {promotions && promotions.length > 0 && (() => {
        const current = promotions[promoIndex % promotions.length];
        const inner = (
          <div className="notification-bar flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-1.5 sm:py-2 px-3 sm:px-4 text-sm">
            <Bell size={13} className="text-[#E85D04] shrink-0" />
            <span className="text-gray-400 text-xs">
              Doanh Nghiệp 1 Người vừa cập nhật:
            </span>
            <span className="badge-green shrink-0">{current.label}</span>
            <span className="text-white text-xs font-medium">{current.text}</span>
            {promotions.length > 1 && (
              <div className="hidden sm:flex gap-1 ml-1">
                {promotions.map((_, i) => (
                  <button
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ background: i === promoIndex % promotions.length ? "#E85D04" : "#333" }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPromoIndex(i); }}
                  />
                ))}
              </div>
            )}
          </div>
        );
        return current.link ? (
          <a href={current.link} className="block hover:opacity-90 transition-opacity">{inner}</a>
        ) : inner;
      })()}

      {/* Legacy notification support */}
      {!promotions?.length && notification && (
        <div className="notification-bar flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-1.5 sm:py-2 px-3 sm:px-4 text-sm">
          <Bell size={13} className="text-[#E85D04] shrink-0" />
          <span className="text-gray-400 text-xs">
            Doanh Nghiệp 1 Người vừa cập nhật:
          </span>
          <span className="badge-green shrink-0">{notification.label}</span>
          <span className="text-white text-xs font-medium">{notification.text}</span>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <button onClick={handleMenuClick}
            aria-label="Mở menu"
            className="text-gray-500 hover:text-[#1B2A4A] transition-colors lg:hidden">
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-[#1B2A4A] leading-tight truncate">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500 leading-tight truncate hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 cursor-pointer hover:bg-[#F0F1F3] transition-colors"
            style={{ background: "#F8F9FA", border: "1px solid #E5E7EB", minWidth: 180 }}
            onClick={() => setSearchOpen(true)}>
            <Search size={14} />
            <span>Tìm kiếm...</span>
            <kbd className="ml-auto text-[10px] text-gray-500 bg-[#E5E7EB] px-1.5 py-0.5 rounded">⌘K</kbd>
          </div>

          {/* Mobile search button */}
          <button
            className="md:hidden text-gray-500 hover:text-[#1B2A4A] transition-colors p-1.5"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
          </button>

          {/* Notification Bell */}
          <NotificationDropdown />

          {/* User Avatar + Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E85D04]/50"
            >
              <UserAvatar
                src={profile?.avatar_url}
                initials={initials}
                size={32}
                gradient="linear-gradient(135deg, #E85D04, #059669)"
              />
            </button>

            {/* Dropdown Menu */}
            {avatarMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-2xl z-50 py-1 overflow-hidden"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                }}
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={profile?.avatar_url}
                      initials={initials}
                      size={36}
                      gradient="linear-gradient(135deg, #E85D04, #059669)"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#1B2A4A] truncate">
                        {displayName}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {email || "Đang tải..."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F8F9FA] hover:text-[#1B2A4A] transition-colors"
                    onClick={() => setAvatarMenuOpen(false)}
                  >
                    <Settings size={15} className="text-gray-500" />
                    Cài đặt tài khoản
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#F8F9FA] hover:text-[#1B2A4A] transition-colors"
                    onClick={() => setAvatarMenuOpen(false)}
                  >
                    <User size={15} className="text-gray-500" />
                    Tổng quan
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-[#E5E7EB] py-1">
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors w-full"
                    >
                      <LogOut size={15} />
                      Đăng xuất
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
