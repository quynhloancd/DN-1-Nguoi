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
  { icon: Clock, emoji: "😫", title: "Nghe AI hoài mà không biết áp dụng vào đâu", desc: "Mỗi ngày nghe nhân viên trẻ nhắc đến AI, ChatGPT, n8n… mà không biết cái nào dùng được ngay cho công việc của mình." },
  { icon: TrendingDown, emoji: "📉", title: "Tự mày mò mất hàng tháng, không ra kết quả", desc: "Xem video YouTube, đọc tài liệu tiếng Anh, thử đủ thứ tool — tốn thời gian mà không áp dụng được vào việc thực tế." },
  { icon: User, emoji: "😰", title: "Sợ bị bỏ lại phía sau trong kỷ nguyên AI", desc: "Người trẻ hơn đang làm việc nhanh hơn gấp 3 nhờ AI. Nếu không bắt kịp, khoảng cách sẽ ngày càng xa." },
  { icon: Heart, emoji: "⏰", title: "Không có thời gian học từ đầu", desc: "Bận việc, bận gia đình. Không thể dành hàng tháng ngồi học lý thuyết từ A-Z. Cần cái gì dùng được ngay." },
];

const steps = [
  {
    num: 1, icon: Gift, color: "#E85D04", title: "NHẬN CHECKLIST MIỄN PHÍ",
    subtitle: "5 việc đang làm tay có thể giao cho AI ngay hôm nay",
    points: ["Cụ thể, thực tế — không lý thuyết", "Áp dụng được ngay trong ngày đầu tiên", "Dành cho người 35-50 tuổi đang kinh doanh hoặc đi làm", "Không cần biết code, không cần hiểu AI sâu"],
    quote: "Bắt đầu từ việc nhỏ nhất — thấy kết quả ngay để có động lực tiếp tục",
  },
  {
    num: 2, icon: Bot, color: "#F97316", title: "CÀI WORKFLOW N8N SẴN",
    subtitle: "Bộ workflow đóng gói sẵn — cài xong dùng ngay",
    points: ["Tự động hoá các tác vụ lặp đi lặp lại mỗi ngày", "Hướng dẫn từng bước cho người không biết code", "Tiết kiệm 5-10 giờ/tuần ngay từ tháng đầu", "Hỗ trợ thiết lập 1-1 nếu gặp khó khăn"],
    quote: "149.000đ — giá một buổi cà phê, tiết kiệm được 40 tiếng/tháng",
  },
  {
    num: 3, icon: BookOpen, color: "#E85D04", title: "HỌC AI ỨNG DỤNG CHUYÊN SÂU",
    subtitle: "Khóa học AI ứng dụng vào kinh doanh/công việc uy tín",
    points: ["Được Thiên Huệ cá nhân giới thiệu — đã kiểm chứng hiệu quả", "Hoa hồng 30-50% trả thẳng vào tài khoản bạn", "Nội dung thực tế, không hàn lâm, có mentor hỗ trợ", "Phù hợp người 35-50 tuổi bận rộn"],
    quote: "Khi bạn đã tin tưởng — tôi giới thiệu thứ tôi đã dùng và thấy hiệu quả",
  },
  {
    num: 4, icon: Award, color: "#F97316", title: "TƯ VẤN 1-1 SETUP HỆ THỐNG AI",
    subtitle: "Thiết lập hệ thống AI riêng cho shop/doanh nghiệp của bạn",
    points: ["Phân tích quy trình hiện tại, chỉ ra chỗ AI có thể thay thế", "Setup workflow n8n tùy chỉnh theo yêu cầu cụ thể", "Đào tạo team sử dụng thành thục trong 1 buổi", "Theo dõi và hỗ trợ sau setup 30 ngày"],
    quote: "1-3 triệu/buổi — ROI rõ ràng khi tiết kiệm được 20-50 giờ nhân công mỗi tháng",
  },
];

const targetAudience = [
  { icon: Briefcase, title: "Chủ shop online / SME", desc: "Muốn tự động hoá đơn hàng, chăm sóc khách hàng và báo cáo mà không cần thuê thêm nhân viên" },
  { icon: ShoppingBag, title: "Quản lý cấp trung", desc: "Muốn xử lý công việc nhanh hơn, báo cáo đẹp hơn và có thêm thời gian cho việc quan trọng hơn" },
  { icon: User, title: "Chủ doanh nghiệp 35-50 tuổi", desc: "Đang kinh doanh ổn định nhưng lo ngại AI đang thay đổi cuộc chơi — muốn chủ động thay vì bị động" },
  { icon: Heart, title: "Người đi làm bận rộn", desc: "Có gia đình, có công việc — không có thời gian mày mò nhưng muốn ứng dụng AI để làm việc hiệu quả hơn" },
  { icon: GraduationCap, title: "Người mới tiếp cận AI", desc: "Biết AI quan trọng nhưng chưa biết bắt đầu từ đâu — cần ai đó chỉ thẳng vào việc cần làm" },
  { icon: Rocket, title: "Người muốn kiếm thêm thu nhập", desc: "Muốn xây thêm nguồn thu từ affiliate, bán sản phẩm số hoặc tư vấn — nhờ vào AI workflow hỗ trợ" },
];

/* Fallback courses used while API data loads */
const fallbackCourses = [
  { emoji: "📋", title: "Checklist: 5 Việc Giao Cho AI Ngay Hôm Nay", badge: "Miễn phí", desc: "Danh sách 5 việc đang làm tay mà bạn có thể giao ngay cho AI — không cần biết code, áp dụng được trong ngày đầu tiên.", stats: "Tải về miễn phí | ⚡ Dùng được ngay", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
  { emoji: "⚙️", title: "Bộ Workflow n8n Cơ Bản", badge: "Hot", desc: "Workflow tự động hoá đóng gói sẵn — cài xong dùng ngay, có hướng dẫn từng bước cho người không biết code.", stats: "149.000đ | ⭐ 4.9/5 | 🛠️ Hỗ trợ setup", slug: "workflow-n8n-co-ban", thumbnail: null as string | null, price: 149000, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
  { emoji: "🎓", title: "Khóa Học AI Ứng Dụng Kinh Doanh", badge: "Affiliate", desc: "Khóa học AI ứng dụng thực tế vào kinh doanh và công việc — được Thiên Huệ cá nhân kiểm chứng và giới thiệu.", stats: "Hoa hồng 30-50% | 🏆 Đối tác uy tín", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
  { emoji: "💼", title: "Tư Vấn 1-1 Setup Hệ Thống AI", badge: "VIP", desc: "Thiết lập workflow AI tùy chỉnh cho shop/doanh nghiệp của bạn — phân tích quy trình, setup, đào tạo team.", stats: "1-3 triệu/buổi | 📅 Đặt lịch tư vấn", slug: null as string | null, thumbnail: null as string | null, price: 0, sale_price: null as number | null, lessonCount: 0, chapterCount: 0, _static: true },
];

const testimonials = [
  { name: "Minh Tuấn", role: "Chủ shop thời trang online, 43 tuổi", result: "⏱️ Tiết kiệm 12h/tuần", text: "Trước đây tôi mất cả buổi chiều để gửi báo cáo đơn hàng và chăm sóc khách. Sau khi cài workflow n8n của Thiên Huệ, mọi thứ tự động hoàn toàn. Tôi giờ có buổi chiều để chơi với con.", avatar: "MT" },
  { name: "Lan Anh", role: "Trưởng phòng kinh doanh, 38 tuổi", result: "📊 Báo cáo tự động", text: "Tôi nghe AI mãi mà không biết áp dụng vào đâu. Thiên Huệ chỉ thẳng vào 3 workflow cụ thể cho công việc của tôi. Giờ báo cáo tuần tự chạy, tôi chỉ cần review.", avatar: "LA" },
  { name: "Hùng", role: "Chủ shop online, 42 tuổi", result: "🤖 Chốt đơn tự động", text: "Tôi 42 tuổi, không rành công nghệ. Vậy mà sau 2 buổi tư vấn 1-1, hệ thống của tôi đã tự động trả lời khách, tạo đơn và thông báo. Không nghĩ AI lại dễ vậy.", avatar: "HG" },
  { name: "Thu Hà", role: "Kế toán doanh nghiệp nhỏ, 47 tuổi", result: "💰 Tiết kiệm 8h/tháng", text: "Workflow tổng hợp dữ liệu kế toán tiết kiệm tôi 8 tiếng mỗi tháng. Giá 149k mà thu lại giá trị gấp nhiều lần. Cảm ơn Thiên Huệ đã đóng gói sẵn, dễ cài dễ dùng.", avatar: "TH" },
  { name: "Bảo Ngọc", role: "Quản lý chuỗi F&B, 40 tuổi", result: "📱 Quản lý tự động", text: "Trước tôi phải tổng hợp doanh thu 3 cơ sở thủ công mỗi ngày. Giờ workflow tự kéo data, gộp báo cáo, gửi về điện thoại lúc 7 giờ sáng. Tuyệt vời!", avatar: "BN" },
  { name: "Văn Đức", role: "Chủ đại lý bảo hiểm, 45 tuổi", result: "📧 Email tự động", text: "Chuỗi email nurture khách hàng chạy tự động, tôi chỉ cần check kết quả. Doanh thu tăng 20% mà không tốn thêm thời gian tư vấn thủ công.", avatar: "VĐ" },
];

const faqs = [
  { q: "Tôi 40-50 tuổi, không rành công nghệ — có dùng được không?", a: "Hoàn toàn được! Thiên Huệ thiết kế workflow dành riêng cho người 35-50 tuổi bận rộn, không có nền tảng kỹ thuật. Mọi thứ đều có hướng dẫn từng bước, dùng được ngay mà không cần hiểu bên trong." },
  { q: "n8n là gì? Tôi cần cài đặt phức tạp không?", a: "n8n là công cụ tự động hoá kéo-thả, không cần code. Bộ workflow của Thiên Huệ đã được đóng gói sẵn — bạn chỉ cần làm theo hướng dẫn từng bước là xong, thường dưới 30 phút." },
  { q: "Bộ workflow n8n 149k gồm những gì?", a: "Bao gồm: file workflow n8n sẵn sàng import, hướng dẫn từng bước bằng video tiếng Việt, tài liệu cấu hình, và hỗ trợ qua Zalo nếu gặp khó khăn khi cài đặt." },
  { q: "Khóa học AI được giới thiệu là khóa học gì?", a: "Thiên Huệ chỉ giới thiệu các khóa học AI ứng dụng thực tế mà bản thân đã học và thấy hiệu quả — dành cho người kinh doanh và đi làm, không phải dạng học thuật. Hoa hồng 30-50% được trả minh bạch." },
  { q: "Tư vấn 1-1 dành cho ai? Chi phí như thế nào?", a: "Dành cho chủ shop, doanh nghiệp nhỏ muốn setup hệ thống AI tùy chỉnh. Chi phí 1-3 triệu/buổi tuỳ phạm vi. Bao gồm: phân tích quy trình, setup workflow, đào tạo team, hỗ trợ 30 ngày sau." },
  { q: "Tôi cần bao nhiêu thời gian để thấy kết quả?", a: "Sau ngày đầu tiên bạn đã có thể tiết kiệm được thời gian với checklist miễn phí. Sau khi cài workflow n8n, thường tiết kiệm được 5-10 giờ/tuần ngay từ tuần đầu tiên." },
];

const statsBar = [
  { value: "200+", label: "Người đã áp dụng" },
  { value: "5-10h", label: "Tiết kiệm mỗi tuần" },
  { value: "149k", label: "Workflow khởi đầu" },
  { value: "4.9/5", label: "Đánh giá hài lòng" },
];

const freeOfferItems = [
  { icon: Zap, title: "VIỆC 1-2: Tự động hoá email & tin nhắn", desc: "Trả lời khách hàng, gửi báo giá, follow-up — không cần ngồi gõ thủ công mỗi ngày." },
  { icon: Bot, title: "VIỆC 3-4: Tổng hợp báo cáo tự động", desc: "Kéo dữ liệu từ nhiều nguồn, tổng hợp và gửi báo cáo mỗi sáng — không cần làm tay." },
  { icon: TrendingDown, title: "VIỆC 5: Lên lịch & nhắc việc thông minh", desc: "AI quản lý lịch, nhắc deadline, điều phối công việc team — không cần nhắc đi nhắc lại." },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error" | "verify">("idle");
  const [formError, setFormError] = useState("");
  const OFFER_DEADLINE = new Date("2026-06-30T23:59:59+07:00").getTime();
  const calcCountdown = () => {
    const diff = Math.max(0, OFFER_DEADLINE - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { h, m, s };
  };
  const [countdown, setCountdown] = useState(calcCountdown());
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

  // Countdown timer — counts down to OFFER_DEADLINE
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(() => {
        return calcCountdown();
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
    { label: "Khoá học", href: "#courses" },
    { label: "Lộ trình", href: "#roadmap" },
    { label: "Học viên", href: "#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Cộng đồng", href: "/community" },
    { label: "Tư vấn 1-1", href: "/consulting" },
  ];

  return (
    <div className="bg-white min-h-screen text-[#1B2A4A] overflow-x-hidden">

      {/* ═══ HEADER ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt={siteConfig.name} width={44} height={44} sizes="44px" className="w-11 h-11 object-contain" />
            <span className="text-sm font-bold text-[#1B2A4A] leading-tight hidden sm:block">{siteConfig.name}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-gray-600 hover:text-[#1B2A4A] transition-colors">{l.label}</a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-[#1B2A4A] transition-colors">Đăng nhập</Link>
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-sm py-2 px-5">
              <Gift size={14} /> Nhận quà miễn phí
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-gray-600 p-2">
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMobileMenu(false)} className="block text-sm text-gray-700 py-2">{l.label}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm text-gray-600">Đăng nhập</Link>
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
          style={{ background: "radial-gradient(circle, #E85D04, transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-8 text-xs sm:text-sm font-medium"
            style={{ background: "#FFF3E0", border: "1px solid rgba(232,93,4,0.25)", color: "#E85D04" }}>
            <Zap size={14} /> Hơn 200 người 35-50 tuổi đã ứng dụng AI vào công việc cùng Thiên Huệ AI
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-4 sm:mb-6">
            Ứng Dụng{" "}
            <span className="text-[#E85D04]">AI Vào Công Việc</span>
            {" "}—{" "}
            <span className="text-[#F97316]">Dùng Được Ngay</span>
            , Không Cần Code
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
            <strong className="text-[#1B2A4A]">Thiên Huệ AI</strong> giúp người 35–50 tuổi đang kinh doanh hoặc đi làm ứng dụng AI vào công việc thực tế — thông qua các tool và workflow đóng gói sẵn, mà không cần biết code hay mất hàng tháng tự mày mò.
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-sm sm:text-base py-3 sm:py-3.5 px-5 sm:px-8 justify-center"
              style={{ background: "#E85D04" }}>
              <Download size={16} /> Nhận Checklist Miễn Phí Ngay
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 mt-6 sm:mt-10 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Users size={14} className="text-[#E85D04]" /> 200+ người áp dụng</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#F97316]" /> Tiết kiệm 5-10h/tuần</span>
            <span className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
              <span className="ml-1">4.9/5 (50+ đánh giá)</span>
            </span>
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#E85D04]" /> Không cần code</span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: PAIN POINTS ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Bạn có đang mắc kẹt với <span className="text-[#E85D04]">những điều này?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {painPoints.map((p, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-red-500/20 transition-colors">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-gray-600">
            👇 <em>Tin tốt là: Tất cả những điều này đều có thể giải quyết — bằng AI, đúng phương pháp.</em>
          </p>
        </div>
      </section>

      {/* ═══ SECTION 3: SOLUTION — 4 BƯỚC ═══ */}
      <section id="roadmap" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Lộ Trình <span className="text-[#E85D04]">4 Bước</span> Cùng Thiên Huệ
            </h2>
            <p className="text-gray-600">Từ checklist miễn phí → Workflow tự động → Thu nhập bền vững</p>
          </div>

          <div className="space-y-5">
            {steps.map((s) => (
              <div key={s.num} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
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

                  <p className="text-gray-700 font-medium mb-4">{s.subtitle}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {s.points.map((pt, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
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
              <Download size={18} /> Đăng ký nhận Bí Mật Video AI Triệu View
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: ABOUT LÊ ĐĂNG KHƯƠNG ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Thiên Huệ <span className="text-[#E85D04]">Là Ai?</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Photo */}
            <div className="lg:col-span-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-gray-200">
                <Image
                  src={siteConfig.owner.avatar}
                  alt={siteConfig.owner.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
                  <div className="text-lg font-bold">{siteConfig.owner.name}</div>
                  <div className="text-sm text-[#E85D04]">Doanh Nghiệp 1 Người</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                Chuyên gia AI Workflow cho người <span className="text-[#E85D04]">kinh doanh & đi làm 35-50 tuổi</span>
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Tôi là <strong className="text-[#1B2A4A]">Thiên Huệ AI</strong> — không phải dân IT, bắt đầu tìm hiểu AI chưa đến 1 năm, muộn hơn nhiều người xung quanh. Tôi thấy mọi thứ đang thay đổi quá nhanh và nhận ra nếu không bắt đầu ngay, khoảng cách sẽ ngày càng xa — đây cũng chính là nỗi sợ của rất nhiều người 35–50 tuổi đang bận rộn với công việc và gia đình.
              </p>

              <div className="space-y-3">
                {[
                  { icon: "🧪", text: "Đã thử đủ thứ tool AI — tự đúc kết lại thành workflow thực tế, dùng được ngay" },
                  { icon: "📦", text: "Đóng gói workflow thành sản phẩm đơn giản — không cần hiểu sâu bên trong" },
                  { icon: "👥", text: "200+ người 35-50 tuổi đã áp dụng — tiết kiệm 5-10 giờ/tuần ngay từ đầu" },
                  { icon: "🤝", text: "Tư vấn 1-1 thiết lập hệ thống AI riêng cho shop và doanh nghiệp nhỏ" },
                  { icon: "💡", text: "Phương pháp: chỉ thẳng vào việc cần làm — không lý thuyết, không dài dòng" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[#E85D04] pl-4 italic text-gray-600 text-sm">
                &quot;Tôi muốn giúp những người bận rộn như bạn — không có thời gian mày mò — có thể ứng dụng AI thực tế vào công việc trong vài giờ, không phải vài tháng. Đó là lý do Doanh Nghiệp 1 Người ra đời.&quot;
              </blockquote>

              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ background: "#1877F2", color: "#fff" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Chat với {siteConfig.owner.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: WHO IS THIS FOR ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Dành cho bạn nếu <span className="text-[#E85D04]">bạn đang ở đây...</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {targetAudience.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#E85D04]/10 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "#FFF3E0" }}>
                  <t.icon size={20} className="text-[#E85D04]" />
                </div>
                <h3 className="font-bold mb-2">{t.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: KHOÁ HỌC (dynamic from DB) ═══ */}
      <section id="courses" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Sản Phẩm Của <span className="text-[#E85D04]">Doanh Nghiệp 1 Người</span>
            </h2>
            <p className="text-gray-600">Đóng gói sẵn — cài xong dùng ngay, không lý thuyết suông</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dynamicCourses.map((c, i) => (
              <div key={c.slug ?? i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:border-[#E85D04]/30 transition-colors">
                {/* Thumbnail (from DB) */}
                {c.thumbnail && !c._static && (
                  <div className="relative aspect-video bg-[#F8F9FA] overflow-hidden">
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
                            background: c.badge === "Coming Soon" ? "rgba(249,115,22,0.1)" : c.badge === "Miễn phí" ? "rgba(34,197,94,0.1)" : "rgba(232,93,4,0.1)",
                            color: c.badge === "Coming Soon" ? "#F97316" : c.badge === "Miễn phí" ? "#22c55e" : "#E85D04",
                          }}>
                          {c.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{c.desc}</p>
                  <div className="text-xs text-gray-500 mb-4">{c.stats}</div>
                  {c.slug ? (
                    <Link href={`/courses/${c.slug}`} className="btn-green text-sm py-2.5 justify-center">
                      Xem chi tiết <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <Link href="/register" className="inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold border border-[#E85D04]/30 text-[#E85D04] hover:bg-[#E85D04]/5 transition-colors">
                      Đăng ký nhận thông báo <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View all courses link */}
          <div className="text-center mt-8">
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-[#E85D04] hover:text-[#F97316] transition-colors">
              Xem tất cả khoá học <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-6">
            Người Thật, Kết Quả Thật <span className="text-[#E85D04]">Từ Workflow AI</span>
          </h2>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {statsBar.map((s, i) => (
              <div key={i} className="text-center bg-white border border-gray-100 rounded-xl py-5 px-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#E85D04]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(j => <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #E85D04, #F97316)", color: "#fff" }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                  <span className="text-xs font-medium text-[#E85D04] shrink-0">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FREE OFFER ═══ */}
      <section id="free-offer" className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden scroll-mt-20 bg-[#F8F9FA]">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at center, #E85D04, transparent 70%)" }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-bold"
              style={{ background: "#FFF3E0", color: "#E85D04" }}>
              <Gift size={16} /> TẶNG MIỄN PHÍ TỪ THIÊN HUỆ
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Checklist: <span className="text-[#E85D04]">5 Việc Giao Cho AI Ngay Hôm Nay</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              5 việc đang làm tay mà bạn có thể giao ngay cho AI — không cần code, dùng được trong ngày đầu tiên
            </p>
          </div>

          {/* Banner image — priority: this is the LCP element */}
          <div className="mb-10 rounded-2xl overflow-hidden border border-[#E85D04]/20">
            <Image
              src="/images/hero/offer-banner.jpg"
              alt="Bí Mật Video AI Triệu View - Khoá học miễn phí"
              width={1200}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Value badge + countdown */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <span className="text-sm font-bold px-4 py-2 rounded-full"
              style={{ background: "#FFF3E0", color: "#E85D04", border: "1px solid rgba(232,93,4,0.2)" }}>
              🎁 Hoàn toàn miễn phí — Không cần thẻ tín dụng
            </span>
            <span className="text-sm font-mono text-[#F97316]">
              ⏰ Ưu đãi early bird kết thúc sau: {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - content */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">📦 Bên trong cẩm nang có gì?</h3>

              {freeOfferItems.map((item, i) => (
                <div key={i} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "#FFF3E0" }}>
                    <item.icon size={18} className="text-[#E85D04]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]" /> Đã giúp <strong className="text-[#1B2A4A]">200+ người</strong> tiết kiệm 5-10 giờ/tuần</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]" /> Dành cho người <strong className="text-[#1B2A4A]">không rành công nghệ</strong> — 35-50 tuổi</div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]" /> Đánh giá <strong className="text-[#1B2A4A]">4.9/5</strong> từ người đã dùng thực tế</div>
              </div>
            </div>

            {/* Right - CTA box */}
            <div className="bg-white border-2 border-[#E85D04]/30 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <Gift size={40} className="text-[#E85D04] mb-4" />
              <h3 className="text-xl font-bold mb-3">NHẬN CHECKLIST NGAY HÔM NAY</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Tạo tài khoản miễn phí để nhận ngay checklist &quot;5 Việc Giao Cho AI Ngay Hôm Nay&quot; — thực tế, dùng được ngay
              </p>

              {formStatus === "verify" ? (
                <div className="w-full">
                  <CheckCircle size={48} className="text-[#22c55e] mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">Đăng ký thành công! 🎉</h4>
                  <p className="text-sm text-gray-600 mb-4">Vui lòng kiểm tra email để xác thực tài khoản, sau đó đăng nhập.</p>
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
      <section id="faq" className="py-12 sm:py-24 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-14">
            Câu Hỏi <span className="text-[#E85D04]">Thường Gặp</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4">{f.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-gray-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: FINAL CTA ═══ */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#1B2A4A]">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(circle at center, #E85D04, transparent 60%)" }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white">
            Sẵn Sàng <span className="text-[#E85D04]">Ứng Dụng AI</span> Vào Công Việc?
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Tham gia cùng 200+ người 35-50 tuổi đang tiết kiệm 5-10 giờ/tuần nhờ workflow AI đóng gói sẵn của Thiên Huệ.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-300">
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
            <span className="ml-1">4.9/5 từ người dùng thực tế</span>
            <span className="mx-2">|</span>
            <span>👥 200+ người đã áp dụng thành công</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowLeadModal(true)} className="btn-green text-base py-3.5 px-8 justify-center"
              style={{ background: "#E85D04" }}>
              <Download size={18} /> Nhận Checklist Miễn Phí Ngay
            </button>
            <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-lg text-base font-semibold border border-white/20 hover:border-white/40 text-white transition-colors">
              <MessageCircle size={16} className="text-[#E85D04]" /> Tư vấn trực tiếp
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-gray-100 py-12 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Col 1: About */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Image src="/images/logo.png" alt={siteConfig.name} width={36} height={36} sizes="36px" className="w-9 h-9 object-contain" />
                <span className="font-bold text-sm text-[#1B2A4A]">{siteConfig.name}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#roadmap" className="hover:text-[#1B2A4A] transition-colors">Giới thiệu</a></li>
                <li><Link href="/blog" className="hover:text-[#1B2A4A] transition-colors">Blog</Link></li>
                <li><a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B2A4A] transition-colors">Liên hệ</a></li>
              </ul>
            </div>

            {/* Col 2: Products */}
            <div>
              <h4 className="font-bold text-sm mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => setShowLeadModal(true)} className="hover:text-[#1B2A4A] transition-colors text-left">Checklist Miễn Phí</button></li>
                <li><Link href="/courses" className="hover:text-[#1B2A4A] transition-colors">Workflow n8n Cơ Bản</Link></li>
                <li><Link href="/courses" className="hover:text-[#1B2A4A] transition-colors">Khóa Học AI Affiliate</Link></li>
                <li><a href={siteConfig.socials.zalo} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B2A4A] transition-colors">Tư Vấn 1-1</a></li>
                <li><Link href="/pricing" className="hover:text-[#1B2A4A] transition-colors">Bảng giá</Link></li>
              </ul>
            </div>

            {/* Col 3: Links */}
            <div>
              <h4 className="font-bold text-sm mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/community" className="hover:text-[#1B2A4A] transition-colors">Cộng đồng</Link></li>
                <li><Link href="/consulting" className="hover:text-[#1B2A4A] transition-colors">Tư vấn 1-1</Link></li>
                <li><Link href="/events" className="hover:text-[#1B2A4A] transition-colors">Sự kiện</Link></li>
                <li><a href="#faq" className="hover:text-[#1B2A4A] transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div>
              <h4 className="font-bold text-sm mb-4">Đăng ký nhận tin</h4>
              <p className="text-xs text-gray-500 mb-3">Nhận tip AI workflow + case study thực tế mỗi tuần</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email của bạn" className="input-dark flex-1 text-sm py-2 px-3" />
                <button type="submit" className="btn-green text-xs py-2 px-3 shrink-0">Đăng ký</button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>{siteConfig.footer.copyright}</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-[#1B2A4A] transition-colors">Chính sách bảo mật</a>
              <a href="/terms" className="hover:text-[#1B2A4A] transition-colors">Điều khoản dịch vụ</a>
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
            className="btn-success py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full shadow-lg flex-1 max-w-sm justify-center"
            style={{ background: "#E85D04", boxShadow: "0 4px 20px rgba(232,93,4,0.3)" }}>
            <Download size={16} /> Nhận Checklist AI Miễn Phí Ngay
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
          <div className="relative w-full max-w-md bg-white border border-[#E85D04]/30 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button onClick={() => formStatus !== "loading" && setShowLeadModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#1B2A4A] transition-colors z-10 p-1 rounded-lg hover:bg-white/5">
              <X size={18} />
            </button>

            {/* Header glow */}
            <div className="absolute top-0 left-0 right-0 h-32 opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top, #E85D04, transparent 80%)" }} />

            <div className="relative p-6 sm:p-8">
              {/* Verify email state */}
              {formStatus === "verify" ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                    style={{ background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.2)" }}>
                    <Mail size={32} className="text-[#E85D04]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Kiểm tra email của bạn</h3>
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    Chúng tôi đã gửi email xác thực đến:
                  </p>
                  <p className="text-[#E85D04] font-semibold mb-4">{formData.email}</p>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Vui lòng mở email và nhấn <span className="text-gray-700 font-medium">&quot;Xác thực tài khoản&quot;</span> để kích hoạt.
                    Kiểm tra cả thư mục <span className="text-gray-700 font-medium">Spam</span> nếu không thấy.
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
                    <Image src={siteConfig.owner.avatar} alt={siteConfig.owner.name} width={56} height={56} sizes="56px" className="w-14 h-14 rounded-2xl mb-3 object-cover inline-block" />
                    <h3 className="text-xl font-bold mb-1">Tạo tài khoản miễn phí</h3>
                    <p className="text-sm text-gray-600">
                      Đăng ký để nhận <span className="text-[#E85D04] font-semibold">&quot;Checklist: 5 Việc Giao Cho AI Ngay Hôm Nay&quot;</span>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên</label>
                      <input type="text" required value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="input-dark w-full" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" required value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="input-dark w-full" placeholder="ban@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu</label>
                      <PasswordInput name="popup_password"
                        placeholder="Tối thiểu 8 ký tự"
                        minLength={8} />
                      {/* Hidden input to sync password to state */}
                    </div>

                    <p className="text-xs text-gray-500 pt-1">
                      Bằng cách đăng ký, bạn đồng ý với{" "}
                      <Link href="/terms" target="_blank" className="text-[#E85D04] hover:underline">Điều khoản dịch vụ</Link> và{" "}
                      <Link href="/privacy" target="_blank" className="text-[#E85D04] hover:underline">Chính sách bảo mật</Link>
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
                    <Link href="/login" className="text-[#E85D04] font-medium hover:underline"
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
