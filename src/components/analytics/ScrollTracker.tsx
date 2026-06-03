"use client";
import { useEffect, useRef } from "react";

const THRESHOLDS = [25, 50, 75, 100];

export default function ScrollTracker() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      THRESHOLDS.forEach((t) => {
        if (scrolled >= t && !fired.current.has(t)) {
          fired.current.add(t);
          if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "scroll", { percent_scrolled: t });
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
