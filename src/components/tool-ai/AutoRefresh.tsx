"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Tự động làm mới trang (router.refresh) định kỳ — dùng cho trang "Tool của
 * tôi" khi còn đơn chờ xác nhận, để tự cập nhật sang "đã mở khóa" khi SePay
 * xác nhận thanh toán mà không cần khách bấm F5.
 */
export default function AutoRefresh({ seconds = 8 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(id);
  }, [router, seconds]);
  return null;
}
