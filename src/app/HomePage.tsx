"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import {
  ArrowRight, Play, Star, ChevronDown, CheckCircle,
  Users, Video, BookOpen, Bot, Clock, TrendingDown,
  User, Briefcase, Heart, GraduationCap, ShoppingBag, Rocket,
  Mail, Phone, Zap, Shield, Gift, Menu, X,
  MessageCircle, Award, Eye, Sparkles, Download,
} from "lucide-react";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

/* ─── Data ───────────────────────────────────────────────────── */

const painPoints = [
  { icon: Clock, emoji: "🥵", title: "Một mình ôm hết mọi việc", desc: "Vừa làm sản phẩm, vừa marketing, vừa chăm sóc khách. Ngày 14 tiếng vẫn không xuể, không còn thời gian cho bản thân." },
  { icon: TrendingDown, emoji: "💸", title: "Doanh thu trần — không scale được", desc: "Muốn tăng doanh thu phải làm thêm. Muốn nghỉ là mất tiền. Không thể vắng mặt 1 ngày." },
  { icon: User, emoji: "🤯", title: "Có ý tưởng AI nhưng không biết bắt đầu", desc: "Nghe ChatGPT, Claude, AI Agent... nhưng không biết áp dụng cụ thể vào việc của mình ra sao." },
  { icon: Heart, emoji: "📵", title: "Trực tin nhắn — chốt đơn 24/7", desc: "Khách hỏi giữa đêm vẫn phải trả lời, đi du lịch cũng phải cầm điện thoại. Không có hệ thống tự động." },
];

const steps = [
  {
    num: 1, icon: Bot, color: "#FBBF24", title: "AI TOOLS — LÀM CHỦ CÔNG CỤ AI",
    subtitle: "Biến ChatGPT, Claude, Gemini thành trợ lý cá nhân",
    points: ["Prompt đúng cách — tiết kiệm 80% thời gian", "Tự động hóa email, research, viết content", "Dùng AI tạo hình ảnh, video, voice", "Không cần biết code — ai cũng làm được"],
    quote: "AI là nhân viên đầu tiên của doanh nghiệp 1 người",
  },
  {
    num: 2, icon: Eye, color: "#84CC16", title: "CONTENT MARKETING & PERSONAL BRANDING",
    subtitle: "Xây thương hiệu cá nhân — khách tự tìm đến bạn",
    points: ["Định vị rõ ràng — chuyên gia trong ngách của bạn", "Content marketing đều đặn bằng AI hỗ trợ", "Tăng tín nhiệm qua Facebook, TikTok, YouTube", "Không cần chạy quảng cáo vẫn có khách"],
    quote: "Thương hiệu cá nhân = tài sản lớn nhất của solo entrepreneur",
  },
  {
    num: 3, icon: ShoppingBag, color: "#FBBF24", title: "BÁN HÀNG ONLINE & SẢN PHẨM SỐ",
    subtitle: "Biến chuyên môn thành sản phẩm bán 24/7",
    points: ["Bán hàng online: dropship, affiliate, sản phẩm vật lý", "Đóng gói kiến thức thành khóa học, ebook, template", "Landing page chốt đơn chuyển đổi cao", "Một sản phẩm — bán hàng nghìn lần"],
    quote: "Đổi từ bán giờ → bán sản phẩm = thêm thu nhập thật sự",
  },
  {
    num: 4, icon: Rocket, color: "#84CC16", title: "AUTOMATION — HỆ THỐNG AI TỰ ĐỘNG",
    subtitle: "Bán hàng — chăm khách — vận hành 24/7 không cần bạn",
    points: ["AI Agent trả tin nhắn, chốt đơn tự động", "Email marketing nurture lead tự động", "Workflow Zapier, Make, n8n — kết nối các app", "Bạn ngủ — hệ thống vẫn kiếm tiền"],
    quote: "Doanh nghiệp 1 người = 1 người + 10 AI Agent làm việc thay",
  },
];

const targetAudience = [
  { icon: User, title: "Freelancer & Solo Entrepreneur", desc: "Muốn scale doanh thu mà không phải thuê thêm người, làm 1 mình hiệu quả gấp 10" },
  { icon: Briefcase, title: "Chủ shop / Kinh doanh online", desc: "Muốn AI Agent chốt đơn 24/7, không phải ôm điện thoại trả tin nhắn cả ngày" },
  { icon: Award, title: "Chuyên gia / Coach / Consultant", desc: "Muốn đóng gói chuyên môn thành khóa học, ebook bán tự động không giới hạn" },
  { icon: GraduationCap, title: "Giáo viên / Người dạy nghề", desc: "Muốn chuyển từ dạy 1-1 sang bán khóa học online — scale doanh thu không scale thời gian" },
  { icon: Heart, title: "Mẹ bỉm sữa / Người làm tại nhà", desc: "Muốn xây nguồn thu nhập online linh hoạt, làm việc theo giờ riêng" },
  { icon: Rocket, title: "Nhân viên muốn ra riêng", desc: "Muốn khởi nghiệp solo với chi phí thấp, dùng AI thay vì thuê nhân viên" },
];

/* Fallback courses used while API data loads */
const fallbackCourses = [
  { emoji: "🤖", title: "AI Tools Cho Người Mới", badge: "Bắt đầu", desc: "Học cách dùng ChatGPT, Claude, Gemini hiệu quả cho công việc kinh doanh hằng ngày.", stats: "Đang phát triển | 🎯 Khoá học nền tảng", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
  { emoji: "🎯", title: "Thương Hiệu Cá Nhân Solo", badge: "Hot", desc: "Định vị bản thân thành chuyên gia, xây dựng uy tín trên social media một cách bền vững.", stats: "Đang phát triển | 📈 Khoá học chuyên sâu", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
  { emoji: "📦", title: "Tạo Sản Phẩm Số Đầu Tiên", badge: "Flagship", desc: "Biến chuyên môn của bạn thành khóa học, ebook, template bán tự động 24/7.", stats: "Đang phát triển | 💎 Lộ trình A-Z", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
  { emoji: "⚙️", title: "Automation & AI Agent", badge: "Coming Soon", desc: "Xây hệ thống bán hàng — chăm sóc khách — vận hành tự động bằng AI Agent và workflow.", stats: "⏰ Ra mắt Q3/2026 | 🎁 Early bird", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
];

const testimonials = [
  { name: "Học viên A", role: "Freelancer Design", result: "⏱ Tiết kiệm 6h/ngày", text: "Trước đây tôi làm 12 tiếng/ngày, giờ chỉ 6 tiếng nhờ AI hỗ trợ research, viết content, gửi báo giá. Doanh thu vẫn tăng 30%.", avatar: "HA" },
  { name: "Học viên B", role: "Chủ shop quần áo", result: "🤖 Chốt đơn 24/7", text: "AI Agent trả tin nhắn khách thay tôi — kể cả lúc tôi ngủ. Đi du lịch 1 tuần đơn vẫn về đều, doanh thu không giảm.", avatar: "HB" },
  { name: "Học viên C", role: "Coach phát triển bản thân", result: "💰 Bán khóa học tự động", text: "Đóng gói chuyên môn thành khóa học digital, landing page bán hàng tự động. Mỗi tháng có doanh thu thụ động đều đặn.", avatar: "HC" },
  { name: "Học viên D", role: "Mẹ bỉm sữa", result: "🏠 Làm việc tại nhà", text: "Vừa chăm con vừa kinh doanh online nhờ hệ thống AI tự động. Linh hoạt thời gian mà thu nhập ổn định.", avatar: "HD" },
  { name: "Học viên E", role: "Nhân viên văn phòng ra riêng", result: "🚀 Khởi nghiệp solo", text: "Nghỉ việc tự kinh doanh chỉ với laptop + ChatGPT. Không cần thuê ai, không cần văn phòng, chi phí tối thiểu.", avatar: "HE" },
  { name: "Học viên F", role: "Giáo viên dạy thêm", result: "📚 Chuyển từ 1-1 sang khóa học", text: "Trước dạy từng người, giờ thu sẵn khóa học bán online. Doanh thu tăng x5 mà thời gian dạy ít hơn.", avatar: "HF" },
];

const faqs = [
  { q: "Tôi không rành công nghệ, có học được AI không?", a: "Hoàn toàn được! Khóa học được thiết kế từ A-Z cho người không có nền tảng kỹ thuật. Chỉ cần biết dùng máy tính cơ bản và email là bạn có thể bắt đầu ngay. Mỗi bước đều có video hướng dẫn chi tiết." },
  { q: "Doanh nghiệp 1 người là gì? Có khác freelancer không?", a: "Doanh nghiệp 1 người = 1 người + hệ thống AI tự động làm thay. Khác freelancer ở chỗ: freelancer bán giờ (làm bao nhiêu nhận bấy nhiêu), còn doanh nghiệp 1 người xây sản phẩm + hệ thống → có thể bán mãi mãi mà không cần làm thêm." },
  { q: "Tôi cần đầu tư bao nhiêu để bắt đầu?", a: "Chi phí khởi đầu rất thấp: ~$20/tháng cho ChatGPT/Claude + domain + hosting. Khóa học có nhiều mức giá tùy nhu cầu, từ free đến nâng cao. Không cần đầu tư lớn như mở văn phòng truyền thống." },
  { q: "AI có thay thế hoàn toàn nhân viên không?", a: "AI thay được 70-80% các công việc lặp đi lặp lại như chốt đơn, gửi email, làm content. 20-30% còn lại (chiến lược, sáng tạo, quyết định) vẫn cần con người — đó là phần bạn tập trung làm." },
  { q: "Có cần biết code để dùng AI Agent không?", a: "KHÔNG cần. Khóa học dạy bạn dùng các no-code platform như Zapier, Make, n8n để dựng AI Agent bằng kéo-thả. Phù hợp người không biết lập trình." },
  { q: "Tôi cần bao nhiêu thời gian mỗi ngày để học?", a: "30-60 phút/ngày là đủ. Khóa học thiết kế theo dạng module ngắn, bạn có thể học khi nào rảnh — sáng sớm, giờ nghỉ trưa, hay tối trước khi ngủ." },
  { q: "Có hỗ trợ sau khi mua khóa học không?", a: "Có. Mỗi khóa học đi kèm cộng đồng học viên + Q&A định kỳ. Bạn có thể đặt câu hỏi và nhận hỗ trợ trong suốt quá trình áp dụng." },
];

const statsBar = [
  { value: "Mới ra mắt", label: "Đang phát triển" },
  { value: "AI-First", label: "Phương pháp đào tạo" },
  { value: "100%", label: "Online & Tự học" },
  { value: "Lifetime", label: "Quyền truy cập" },
];

const freeOfferItems = [
  { icon: Bot, title: "PHẦN 1: 20 PROMPT AI HIỆU QUẢ NHẤT", desc: "Bộ sưu tập 20 prompt ChatGPT/Claude đã được test cho công việc kinh doanh: content marketing, email khách hàng, research thị trường." },
  { icon: Zap, title: "PHẦN 2: BLUEPRINT AUTOMATION CƠ BẢN", desc: "Sơ đồ kết nối ChatGPT + Zapier + Google Sheets để tự động hóa quy trình: nhận lead → gửi welcome email → theo dõi khách hàng." },
  { icon: TrendingDown, title: "PHẦN 3: CASE STUDY DOANH NGHIỆP 1 NGƯỜI", desc: "Phân tích chi tiết các mô hình kinh doanh 1 người thành công: chi phí, doanh thu, công cụ AI đã dùng — học để áp dụng vào ngách của bạn." },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error" | "verify">("idle");
  const [formError, setFormError] = useState("");
  const [countdown, setCountdown] = useState({ h: 23, m: 59, s: 59 });
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Dynamic courses from API
  type DynCourse = typeof fallbackCourses[number];
  const [dynamicCourses, setDynamicCourses] = useState<DynCourse[]>(fallbackCourses);

  useEffect(() => {
    fetch("/api/courses/public")
      .then((r) => r.json())
      .then((data: { slug: string; title: string; description: string | null; price: number; sale_price: number | null; thumbnail: string | null; lessonCount: number; chapterCount: number }[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped: DynCourse[] = data.map((c) => ({
          emoji: "",
          title: c.title,
          badge: c.price === 0 ? "Miễn phí" : c.sale_price ? "Sale" : "",
          desc: c.description ?? "",
          stats: `${c.lessonCount} bài học | ${c.chapterCount} chương`,
          slug: c.slug,
          thumbnail: c.thumbnail,
          price: c.price,
          sale_price: c.sale_price,
          lessonCount: c.lessonCount,
          chapterCount: c.chapterCount,
          _static: false,
        }));
        setDynamicCourses(mapped);
      })
      .catch(() => {/* keep fallback */});
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        if (s > 0) { s--; }
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        else { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormError("");

    const fd = new FormData(e.currentTarget);
    const password = fd.get("popup_password") as string;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("verify");
      } else {
        setFormError(data.error || "Có lỗi xảy ra.");
        setFormStatus("idle");
      }
    } catch {
      setFormError("Lỗi kết nối. Vui lòng thử lại.");
      setFormStatus("idle");
    }
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  const navLinks = [
    { label: "Sản phẩm", href: "#courses" },
    { label: "Khóa Học", href: "#roadmap" },
    { label: "Công cụ (Tool)", href: "#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Cộng Đồng", href: "/community" },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">

      {/* ═══ HEADER ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/92 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src={siteConfig.owner.avatar} alt={siteConfig.owner.name} width={36} height={36} className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <div className="text-sm font-bold leading-tight">{siteConfig.name}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Đăng nhập</Link>
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-sm py-2 px-5">
              <Gift size={14} /> Nhận quà miễn phí
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-gray-400 p-2">
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#111] border-t border-white/5 px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMobileMenu(false)} className="block text-sm text-gray-300 py-2">{l.label}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm text-gray-400">Đăng nhập</Link>
              <button onClick={() => { setShowLeadModal(true); setMobileMenu(false); }} className="btn-green text-sm py-2 px-4">
                <Gift size={14} /> Nhận quà miễn phí
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="pt-24 sm:pt-36 pb-12 sm:pb-24 relative">
        {/* Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[80px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #FBBF24, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-8 text-xs sm:text-sm font-medium"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#FBBF24" }}>
            <Sparkles size={14} /> Phương pháp kinh doanh thông minh với AI — mới ra mắt 2026
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-4 sm:mb-6">
            Xây{" "}
            <span className="text-[#FBBF24]">Doanh Nghiệp 1 Người</span>
            {" "}— Hệ Thống{" "}
            <span className="text-[#84CC16]">Kinh Doanh Tự Động</span>
            {" "}1 Mình Với <span className="text-[#FBBF24]">AI</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
            Học cách dùng <strong className="text-white">AI làm nhân viên</strong> — tự động hóa marketing, bán hàng, chăm sóc khách 24/7. Một mình bạn vẫn xây được doanh nghiệp tinh gọn, scale doanh thu mà không cần thuê người hay mở văn phòng.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-sm sm:text-base py-3 sm:py-3.5 px-5 sm:px-8 justify-center">
              <Download size={16} /> Nhận miễn phí Bộ Kit Khởi Đầu DN1N
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Bot size={14} className="text-[#FBBF24]" /> AI-First Approach</span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#84CC16]" /> Phương pháp đã kiểm chứng</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#FBBF24]" /> Học mọi lúc, mọi nơi</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-[#FBBF24]" /> Lifetime Access</span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: PAIN POINTS ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Bạn có đang mắc kẹt với <span className="text-[#FBBF24]">những điều này?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {painPoints.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-red-500/20 transition-colors">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-gray-400">
            👇 <em>Tin tốt là: Tất cả những điều này đều có thể giải quyết — bằng AI, đúng phương pháp.</em>
          </p>
        </div>
      </section>

      {/* ═══ SECTION 3: SOLUTION — 4 BƯỚC ═══ */}
      <section id="roadmap" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Lộ Trình <span className="text-[#FBBF24]">4 Bước</span> Xây Doanh Nghiệp 1 Người
            </h2>
            <p className="text-gray-400">Từ con số 0 → Hệ thống AI tự động → Doanh thu thụ động</p>
          </div>

          <div className="space-y-5">
            {steps.map((s) => (
              <div key={s.num} className="bg-[#111] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                {/* Step number bg */}
                <div className="absolute top-4 right-6 text-[80px] font-extrabold leading-none opacity-5" style={{ color: s.color }}>
                  {s.num}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}20` }}>
                      <s.icon size={20} style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>Bước {s.num}</div>
                      <h3 className="text-xl font-extrabold">{s.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-300 font-medium mb-4">{s.subtitle}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {s.points.map((pt, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle size={15} className="text-[#22c55e] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm italic" style={{ color: s.color }}>→ &quot;{s.quote}&quot;</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-base py-3.5 px-8 justify-center inline-flex">
              <Download size={18} /> Nhận miễn phí Bộ Kit Khởi Đầu DN1N
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: ABOUT BRAND ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Tại Sao Chọn <span className="text-[#FBBF24]">{siteConfig.owner.name}?</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Visual */}
            <div className="lg:col-span-2">
              <div className="lg:aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10 flex items-center justify-center py-10 lg:py-0"
                style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)" }}>
                <div className="text-center p-6">
                  <Image src={siteConfig.owner.avatar} alt={siteConfig.owner.name} width={128} height={128} className="block w-32 h-32 rounded-2xl mx-auto mb-5 object-cover" />
                  <div className="text-2xl font-bold mb-1">{siteConfig.owner.name}</div>
                  <div className="text-sm text-[#FBBF24]">Hệ thống đào tạo Solo Business</div>
                  <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                    <span className="px-3 py-1 rounded-full bg-white/5">🤖 AI-First</span>
                    <span className="px-3 py-1 rounded-full bg-white/5">⚡ Tinh gọn</span>
                    <span className="px-3 py-1 rounded-full bg-white/5">🚀 Tự động</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                Nền tảng đào tạo dành riêng cho <span className="text-[#FBBF24]">Solo Entrepreneur Việt Nam</span>
              </h3>

              <p className="text-gray-400 leading-relaxed">
                <strong className="text-white">{siteConfig.owner.name}</strong> là cộng đồng & hệ thống đào tạo dành cho những người muốn xây dựng doanh nghiệp tinh gọn — không cần thuê nhân viên, không cần mở văn phòng, tận dụng AI để tự động hóa mọi quy trình.
              </p>

              <div className="space-y-3">
                {[
                  { icon: "🤖", text: "Tập trung 100% vào AI thực dụng — không lý thuyết suông" },
                  { icon: "🎯", text: "Lộ trình cụ thể từ A-Z cho người mới hoàn toàn" },
                  { icon: "⚡", text: "Học là làm được ngay — mỗi bài đều có template, prompt sẵn sàng" },
                  { icon: "💎", text: "Cập nhật liên tục theo công nghệ AI mới nhất 2026" },
                  { icon: "🤝", text: "Cộng đồng học viên hỗ trợ lẫn nhau xây hệ thống tự động" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[#FBBF24] pl-4 italic text-gray-400 text-sm">
                &quot;Sứ mệnh: Giúp 10,000 người Việt xây doanh nghiệp 1 người thành công — sống tự do thời gian, tự do tài chính và không phụ thuộc vào công việc văn phòng truyền thống.&quot;
              </blockquote>

              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ background: "#1877F2", color: "#fff" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Theo dõi {siteConfig.owner.name} trên Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: WHO IS THIS FOR ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Lộ trình này <span className="text-[#84CC16]">dành cho bạn</span> nếu...
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {targetAudience.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#84CC16]/20 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(132,204,22,0.1)" }}>
                  <t.icon size={20} className="text-[#84CC16]" />
                </div>
                <h3 className="font-bold mb-2">{t.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: KHOÁ HỌC (dynamic from DB) ═══ */}
      <section id="courses" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Khoá Học <span className="text-[#FBBF24]">{siteConfig.owner.name}</span>
            </h2>
            <p className="text-gray-400">Được thiết kế để bạn áp dụng ngay — không lý thuyết suông</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dynamicCourses.map((c, i) => (
              <div key={c.slug ?? i} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-[#FBBF24]/20 transition-colors">
                {/* Thumbnail (from DB) */}
                {c.thumbnail && !c._static && (
                  <div className="relative aspect-video bg-[#0d0d0d] overflow-hidden">
                    <Image
                      src={c.thumbnail}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {c.price > 0 && c.sale_price !== null && c.sale_price < c.price && (
                      <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-[11px] font-bold bg-red-500 text-white">
                        -{Math.round(((c.price - c.sale_price) / c.price) * 100)}%
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {c._static && c.emoji && <span className="text-3xl">{c.emoji}</span>}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{c.title}</h3>
                      </div>
                      {c.badge && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                          style={{
                            background: c.badge === "Coming Soon" ? "rgba(132,204,22,0.1)" : c.badge === "Miễn phí" ? "rgba(34,197,94,0.1)" : "rgba(251,191,36,0.1)",
                            color: c.badge === "Coming Soon" ? "#84CC16" : c.badge === "Miễn phí" ? "#22c55e" : "#FBBF24",
                          }}>
                          {c.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{c.desc}</p>
                  <div className="text-xs text-gray-500 mb-4">{c.stats}</div>
                  {c.slug ? (
                    <Link href={`/courses/${c.slug}`} className="btn-green text-sm py-2.5 justify-center">
                      Xem chi tiết <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <Link href="/register" className="inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold border border-[#84CC16]/30 text-[#84CC16] hover:bg-[#84CC16]/5 transition-colors">
                      Đăng ký nhận thông báo <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View all courses link */}
          <div className="text-center mt-8">
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-[#FBBF24] hover:text-[#FFD814] transition-colors">
              Xem tất cả khoá học <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-6">
            Solo Entrepreneur Đã <span className="text-[#84CC16]">Thay Đổi Cuộc Đời</span>
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">* Testimonial mẫu — sẽ thay bằng học viên thật sau khi mở khóa</p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {statsBar.map((s, i) => (
              <div key={i} className="text-center bg-[#111] border border-white/5 rounded-xl py-5 px-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FBBF24]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/5 rounded-2xl p-5">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(j => <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #FBBF24, #84CC16)", color: "#0a0a0a" }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                  <span className="text-xs font-medium text-[#84CC16] shrink-0">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FREE OFFER ═══ */}
      <section id="free-offer" className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden scroll-mt-20">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at center, #FBBF24, transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-bold"
              style={{ background: "rgba(251,191,36,0.15)", color: "#FBBF24" }}>
              <Gift size={16} /> TẶNG MIỄN PHÍ — BỘ KIT KHỞI ĐẦU
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              &quot;Bộ Kit <span className="text-[#FBBF24]">Doanh Nghiệp 1 Người</span> Với AI&quot;
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cẩm Nang Khởi Đầu Giúp Bạn Tự Động Hóa Công Việc Kinh Doanh Với AI — Áp Dụng Ngay Trong 7 Ngày
            </p>
          </div>

          {/* Banner image */}
          <div className="mb-10 rounded-2xl overflow-hidden border border-[#FBBF24]/20">
            <Image
              src="/images/hero/offer-banner.jpg"
              alt="Bí Mật Video AI Triệu View - Khoá học miễn phí"
              width={1200}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Value badge + countdown */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <span className="text-sm font-bold px-4 py-2 rounded-full"
              style={{ background: "rgba(251,191,36,0.1)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.2)" }}>
              💎 Trị giá 2.990.000đ — Miễn phí
            </span>
            <span className="text-sm font-mono text-[#84CC16]">
              ⏰ Ưu đãi kết thúc sau: {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - content */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">📦 Bên trong cẩm nang có gì?</h3>

              {freeOfferItems.map((item, i) => (
                <div key={i} className="flex gap-4 bg-[#111] border border-white/5 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(251,191,36,0.1)" }}>
                    <item.icon size={18} className="text-[#FBBF24]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]" /> Phương pháp <strong className="text-white">AI-First</strong> — học là làm được ngay</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]" /> Tài liệu <strong className="text-white">100% miễn phí</strong> — không yêu cầu thẻ tín dụng</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]" /> Tặng <strong className="text-white">template + prompt</strong> sẵn sàng áp dụng</div>
              </div>
            </div>

            {/* Right - CTA box */}
            <div className="bg-[#111] border-2 border-[#FBBF24]/30 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <Gift size={40} className="text-[#FBBF24] mb-4" />
              <h3 className="text-xl font-bold mb-3">NHẬN CẨM NANG NGAY HÔM NAY</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Đăng ký miễn phí để nhận ngay khoá học &quot;Bí Mật Video AI Triệu View&quot; + bộ tài liệu độc quyền trị giá 2.990.000đ
              </p>

              {formStatus === "verify" ? (
                <div className="w-full">
                  <CheckCircle size={48} className="text-[#22c55e] mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">Đăng ký thành công! 🎉</h4>
                  <p className="text-sm text-gray-400 mb-4">Vui lòng kiểm tra email để xác thực tài khoản, sau đó đăng nhập.</p>
                  <Link href="/login" className="btn-green w-full justify-center py-3 text-base">
                    Đăng nhập <ArrowRight size={18} />
                  </Link>
                </div>
              ) : (
                <button onClick={() => setShowLeadModal(true)}
                  className="btn-green w-full justify-center py-3.5 text-base">
                  <Download size={18} /> ĐĂNG KÝ NHẬN MIỄN PHÍ →
                </button>
              )}

              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><Shield size={10} /> Bảo mật tuyệt đối</span>
                <span className="flex items-center gap-1"><Zap size={10} /> Gửi trong 2 phút</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Câu Hỏi <span className="text-[#FBBF24]">Thường Gặp</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4">{f.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: FINAL CTA ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(circle at center, #FBBF24, transparent 60%)" }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Sẵn Sàng <span className="text-[#FBBF24]">Bứt Phá</span> Cùng {siteConfig.owner.name}?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Tham gia cộng đồng solo entrepreneur Việt Nam đang xây dựng doanh nghiệp tinh gọn với AI — tự động hóa, tự do thời gian, tự do tài chính.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-500">
            <Sparkles size={14} className="text-[#FBBF24]" />
            <span>Mới ra mắt 2026 — Tham gia early adopter</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-base py-3.5 px-8 justify-center">
              <Download size={18} /> Nhận miễn phí Bộ Kit Khởi Đầu
            </button>
            <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-lg text-base font-semibold border border-white/10 hover:border-white/20 transition-colors">
              <MessageCircle size={16} className="text-[#FBBF24]" /> Tư vấn trực tiếp
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/5 py-12 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Col 1: About */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Image src={siteConfig.owner.avatar} alt={siteConfig.owner.name} width={32} height={32} className="w-8 h-8 rounded-lg object-cover" />
                <span className="font-bold text-sm">{siteConfig.owner.name}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Giới thiệu</a></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>

            {/* Col 2: Courses */}
            <div>
              <h4 className="font-bold text-sm mb-4">Khoá học</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/courses" className="hover:text-white transition-colors">AI Tools Cho Người Mới</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Thương Hiệu Cá Nhân Solo</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Tạo Sản Phẩm Số</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Automation & AI Agent</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Xem tất cả →</Link></li>
              </ul>
            </div>

            {/* Col 3: Links */}
            <div>
              <h4 className="font-bold text-sm mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/community" className="hover:text-white transition-colors">Cộng đồng</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Sự kiện</Link></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="font-bold text-sm mb-4">Đăng ký nhận tin</h4>
              <p className="text-xs text-gray-500 mb-3">Nhận tip AI + Automation cho solo business mỗi tuần</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email của bạn" className="input-dark flex-1 text-sm py-2 px-3" />
                <button type="submit" className="btn-green text-xs py-2 px-3 shrink-0">Đăng ký</button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} {siteConfig.owner.name} | {siteConfig.domain}</p>
            <div className="flex gap-4">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Chính sách bảo mật</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY FLOATING CTA BAR ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]"
        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.9) 30%)" }}>
        <div className="max-w-lg mx-auto px-4 pb-4 pt-6 flex items-center justify-center gap-2">
          {/* Left arrows */}
          <div className="flex items-center gap-0.5 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="blink-arrow">
              <path d="M13 5l7 7-7 7" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="blink-arrow-delay">
              <path d="M13 5l7 7-7 7" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <button onClick={() => setShowLeadModal(true)}
            className="btn-success py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full shadow-lg shadow-green-500/25 flex-1 max-w-sm justify-center">
            <Download size={16} /> Nhận miễn phí Bộ Kit Khởi Đầu DN1N
          </button>

          {/* Right arrows */}
          <div className="flex items-center gap-0.5 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="blink-arrow-delay" style={{ transform: "scaleX(-1)" }}>
              <path d="M13 5l7 7-7 7" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="blink-arrow" style={{ transform: "scaleX(-1)" }}>
              <path d="M13 5l7 7-7 7" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ═══ ĐĂNG KÝ POPUP MODAL ═══ */}
      {showLeadModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => formStatus !== "loading" && setShowLeadModal(false)} />
          <div className="relative w-full max-w-md bg-[#111] border border-[#FBBF24]/30 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button onClick={() => formStatus !== "loading" && setShowLeadModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 p-1 rounded-lg hover:bg-white/5">
              <X size={18} />
            </button>

            {/* Header glow */}
            <div className="absolute top-0 left-0 right-0 h-32 opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top, #FBBF24, transparent 80%)" }} />

            <div className="relative p-6 sm:p-8">
              {/* Verify email state */}
              {formStatus === "verify" ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                    style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}>
                    <Mail size={32} className="text-[#D4A843]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Kiểm tra email của bạn</h3>
                  <p className="text-sm text-gray-400 mb-2 leading-relaxed">
                    Chúng tôi đã gửi email xác thực đến:
                  </p>
                  <p className="text-[#D4A843] font-semibold mb-4">{formData.email}</p>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Vui lòng mở email và nhấn <span className="text-gray-300 font-medium">&quot;Xác thực tài khoản&quot;</span> để kích hoạt.
                    Kiểm tra cả thư mục <span className="text-gray-300 font-medium">Spam</span> nếu không thấy.
                  </p>
                  <Link href="/login" className="btn-green w-full justify-center py-3 text-base"
                    onClick={() => setShowLeadModal(false)}>
                    Đã xác thực? Đăng nhập
                  </Link>
                  <p className="text-xs text-gray-500 mt-3">Link xác thực có hiệu lực trong 24 giờ.</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <Image src={siteConfig.owner.avatar} alt={siteConfig.owner.name} width={56} height={56} className="w-14 h-14 rounded-2xl mb-3 object-cover inline-block" />
                    <h3 className="text-xl font-bold mb-1">Tạo tài khoản miễn phí</h3>
                    <p className="text-sm text-gray-400">
                      Đăng ký để nhận <span className="text-[#FBBF24] font-semibold">&quot;Bộ Kit Khởi Đầu DN1N&quot;</span>
                    </p>
                  </div>

                  {/* Error */}
                  {formError && (
                    <div className="mb-4 p-3 rounded-lg text-sm text-red-400 border border-red-400/20"
                      style={{ background: "rgba(239,68,68,0.08)" }}>
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Họ và tên</label>
                      <input type="text" required value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="input-dark w-full" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Số điện thoại <span className="text-red-400">*</span>
                      </label>
                      <input type="tel" required value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        pattern="^(0|\+84)[0-9]{9}$"
                        title="Nhập số điện thoại hợp lệ (VD: 0912345678)"
                        className="input-dark w-full" placeholder="0912345678" />
                      <p className="text-[10px] text-gray-500 mt-1">Định dạng: 09xx hoặc +84xxx (10 số)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                      <input type="email" required value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="input-dark w-full" placeholder="ban@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Mật khẩu</label>
                      <PasswordInput name="popup_password"
                        placeholder="Tối thiểu 8 ký tự"
                        minLength={8} />
                      {/* Hidden input to sync password to state */}
                    </div>

                    <p className="text-xs text-gray-500 pt-1">
                      Bằng cách đăng ký, bạn đồng ý với{" "}
                      <a href="#" className="text-[#D4A843] hover:underline">Điều khoản dịch vụ</a> và{" "}
                      <a href="#" className="text-[#D4A843] hover:underline">Chính sách bảo mật</a>
                    </p>
                    <button type="submit" disabled={formStatus === "loading"}
                      className="btn-green w-full justify-center py-2.5 mt-2 disabled:opacity-50">
                      {formStatus === "loading" ? "Đang xử lý..." : "Đăng ký — Hoàn toàn miễn phí"}
                    </button>
                  </form>

                  {/* Social Login */}
                  <div className="mt-5">
                    <SocialLoginButtons />
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-5">
                    Đã có tài khoản?{" "}
                    <Link href="/login" className="text-[#D4A843] font-medium hover:underline"
                      onClick={() => setShowLeadModal(false)}>
                      Đăng nhập
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
