import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/home/LeadForm";

/* â”€â”€â”€ Mock data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const painPoints = [
  { emoji: "ðŸ˜“", text: "HÃ´m nay chÆ°a biáº¿t Ä‘Äƒng gÃ¬" },
  { emoji: "ðŸ“¸", text: "CÃ³ sáº£n pháº©m nhÆ°ng áº£nh/video chÆ°a Ä‘á»§ cuá»‘n" },
  { emoji: "ðŸ’¸", text: "ThuÃª ngÆ°á»i lÃ m content tá»‘n tiá»n mÃ  váº«n pháº£i sá»­a Ä‘i sá»­a láº¡i" },
  { emoji: "ðŸ¤”", text: "Muá»‘n dÃ¹ng AI nhÆ°ng khÃ´ng biáº¿t tool nÃ o Ä‘Ã¡ng dÃ¹ng" },
  { emoji: "ðŸ› ï¸", text: "CÃ³ quÃ¡ nhiá»u cÃ´ng cá»¥, nhÆ°ng thiáº¿u quy trÃ¬nh Ä‘Æ¡n giáº£n Ä‘á»ƒ ra káº¿t quáº£" },
];

const features = [
  { emoji: "ðŸ”—", title: "Link tool sáºµn sÃ ng", desc: "Truy cáº­p ngay, khÃ´ng cáº§n tÃ¬m kiáº¿m lung tung." },
  { emoji: "ðŸ’¬", title: "Prompt máº«u copy-paste ngay", desc: "Prompt Ä‘Ã£ Ä‘Æ°á»£c test vÃ  tá»‘i Æ°u cho tá»«ng tool." },
  { emoji: "ðŸ“‹", title: "HÆ°á»›ng dáº«n tá»«ng bÆ°á»›c", desc: "Video vÃ  tÃ i liá»‡u chi tiáº¿t dá»… lÃ m theo ngay láº§n Ä‘áº§u." },
  { emoji: "ðŸ‘¥", title: "Group Zalo há»— trá»£", desc: "Cá»™ng Ä‘á»“ng há»— trá»£, giáº£i Ä‘Ã¡p tháº¯c máº¯c nhanh chÃ³ng." },
];

const featuredTools = [
  {
    slug: "tool-tao-video-thoi-trang-google-flow",
    name: "Tool Táº¡o Video Thá»i Trang vá»›i Google Flow",
    desc: "Táº¡o video thá»i trang chuyÃªn nghiá»‡p tá»± Ä‘á»™ng chá»‰ vá»›i vÃ i thao tÃ¡c â€” khÃ´ng cáº§n quay, khÃ´ng cáº§n dá»±ng.",
    price: "150.000Ä‘",
    badge: "Ná»•i báº­t",
    badgeColor: "#F97316",
  },
  {
    slug: "tool-tao-video-hang-loat",
    name: "Tool Táº¡o Video HÃ ng Loáº¡t Cá»±c Nhanh",
    desc: "Sáº£n xuáº¥t hÃ ng chá»¥c video sáº£n pháº©m trong vÃ i phÃºt â€” lÃ½ tÆ°á»Ÿng cho shop bÃ¡n hÃ ng online.",
    price: "350.000Ä‘",
    badge: "BÃ¡n cháº¡y",
    badgeColor: "#16a34a",
  },
  {
    slug: "tool-kol-podcast-ai",
    name: "Tool KOL Podcast AI",
    desc: "Táº¡o podcast vÃ  video KOL báº±ng AI â€” xÃ¢y dá»±ng thÆ°Æ¡ng hiá»‡u cÃ¡ nhÃ¢n mÃ  khÃ´ng cáº§n lÃªn sÃ³ng tháº­t.",
    price: "299.000Ä‘",
    badge: "Má»›i",
    badgeColor: "#7c3aed",
  },
];

const combos = [
  {
    slug: "combo",
    name: "Combo NgÆ°á»i Má»›i",
    price: "199.000Ä‘",
    desc: "DÃ nh cho ngÆ°á»i má»›i, 2-3 tool dá»… dÃ¹ng nháº¥t Ä‘á»ƒ báº¯t Ä‘áº§u lÃ m content ngay.",
    badge: null,
    highlight: false,
    navy: false,
  },
  {
    slug: "combo",
    name: "Combo Video AI",
    price: "499.000Ä‘",
    desc: "Tool video thá»i trang, hÃ ng loáº¡t, storyboard, KOL â€” Ä‘á»§ bá»™ Ä‘á»ƒ lÃ m video chuyÃªn nghiá»‡p.",
    badge: "Äá» xuáº¥t",
    highlight: true,
    navy: false,
  },
  {
    slug: "combo",
    name: "Combo Doanh Nghiá»‡p 1 NgÆ°á»i",
    price: "999.000Ä‘+",
    desc: "Bá»™ tool Ä‘áº§y Ä‘á»§ tá»± váº­n hÃ nh content â€” dÃ nh cho ngÆ°á»i muá»‘n há»‡ thá»‘ng hÃ³a hoÃ n toÃ n.",
    badge: null,
    highlight: false,
    navy: true,
  },
];

const freeResources = [
  "Checklist 5 bÆ°á»›c dÃ¹ng AI lÃ m content bÃ¡n hÃ ng",
  "10 prompt táº¡o video AI",
  "Danh sÃ¡ch tool AI miá»…n phÃ­ cho ngÆ°á»i má»›i",
  "Template káº¿ hoáº¡ch ná»™i dung 7 ngÃ y",
];

/* â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen text-[#1C2A44] overflow-x-hidden">

      {/* â•â•â• KHá»I 1 â€” HERO â•â•â• */}
      <section className="bg-[#1C2A44] pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text trÃ¡i */}
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15] text-white mb-5">
                Kho{" "}
                <span style={{ color: "#F97316" }}>tool AI</span>{" "}
                cho ngÆ°á»i kinh doanh online má»™t mÃ¬nh
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                Tá»± lÃ m content, áº£nh, video vÃ  workflow bÃ¡n hÃ ng báº±ng AI â€” khÃ´ng cáº§n thuÃª team, khÃ´ng cáº§n biáº¿t code.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tool-ai"
                  className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-bold py-3.5 px-7 rounded-xl transition-colors text-base"
                >
                  Xem kho Tool AI
                </Link>
                <Link
                  href="/tai-nguyen-mien-phi"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-semibold py-3.5 px-7 rounded-xl transition-colors text-base"
                >
                  Nháº­n tÃ i nguyÃªn miá»…n phÃ­
                </Link>
              </div>
            </div>

            {/* áº¢nh pháº£i */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/anh/one-person-business-ai-system.jpg"
                  alt="Há»‡ thá»‘ng AI cho doanh nghiá»‡p 1 ngÆ°á»i"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â• KHá»I 2 â€” Ná»–I ÄAU â•â•â• */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14">
            Má»™t mÃ¬nh lÃ m online, báº¡n Ä‘ang pháº£i gá»“ng quÃ¡ nhiá»u viá»‡c?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl p-5 border"
                style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}
              >
                <span className="text-3xl shrink-0">{p.emoji}</span>
                <p className="text-base font-medium text-[#1C2A44] leading-snug mt-1">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â• KHá»I 3 â€” GIáº¢I PHÃP â•â•â• */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "#F8FAFC" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-4">
            KhÃ´ng cáº§n há»c AI quÃ¡ sÃ¢u. Chá»‰ cáº§n Ä‘Ãºng tool, Ä‘Ãºng prompt, Ä‘Ãºng quy trÃ¬nh.
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-base leading-relaxed">
            Má»—i tool trÃªn Doanh Nghiá»‡p 1 NgÆ°á»i Ä‘Æ°á»£c Ä‘Ã³ng gÃ³i theo hÆ°á»›ng dÃ¹ng Ä‘Æ°á»£c ngay: link tool, prompt máº«u, hÆ°á»›ng dáº«n tá»«ng bÆ°á»›c, video/demo vÃ  group Zalo há»— trá»£.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-base mb-2 text-[#1C2A44]">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â• KHá»I 4 â€” TOOL Ná»”I Báº¬T â•â•â• */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14">
            Tool AI Ä‘ang bÃ¡n cháº¡y
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredTools.map((tool, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-5xl">ðŸ¤–</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {/* Badge */}
                  <span
                    className="inline-block self-start text-xs font-bold px-2.5 py-1 rounded-md mb-3 text-white"
                    style={{ background: tool.badgeColor }}
                  >
                    {tool.badge}
                  </span>
                  <h3 className="font-bold text-base text-[#1C2A44] mb-2 leading-snug">{tool.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{tool.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-extrabold" style={{ color: "#F97316" }}>{tool.price}</span>
                    <Link
                      href={`/tool-ai/${tool.slug}`}
                      className="text-sm font-semibold text-[#1C2A44] border border-gray-200 hover:border-[#F97316] hover:text-[#F97316] px-4 py-2 rounded-lg transition-colors"
                    >
                      Xem chi tiáº¿t
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/tool-ai"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#F97316] hover:underline"
            >
              Xem toÃ n bá»™ kho Tool AI â†’
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â• KHá»I 5 â€” COMBO Äá»€ XUáº¤T â•â•â• */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: "#F8FAFC" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14">
            Combo tiáº¿t kiá»‡m hÆ¡n mua láº»
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {combos.map((c, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 flex flex-col border ${
                  c.navy
                    ? "bg-[#1C2A44] border-[#1C2A44]"
                    : c.highlight
                    ? "bg-white border-[#F97316]"
                    : "bg-white border-gray-100"
                } shadow-sm`}
              >
                {c.badge && (
                  <span
                    className="inline-block self-start text-xs font-bold px-2.5 py-1 rounded-md mb-3 text-white"
                    style={{ background: "#F97316" }}
                  >
                    {c.badge}
                  </span>
                )}
                <h3
                  className={`font-extrabold text-xl mb-1 ${c.navy ? "text-white" : "text-[#1C2A44]"}`}
                >
                  {c.name}
                </h3>
                <p
                  className="text-2xl font-extrabold mb-3"
                  style={{ color: "#F97316" }}
                >
                  {c.price}
                </p>
                <p
                  className={`text-sm leading-relaxed flex-1 mb-6 ${c.navy ? "text-gray-300" : "text-gray-500"}`}
                >
                  {c.desc}
                </p>
                <Link
                  href={`/${c.slug}`}
                  className={`inline-flex items-center justify-center font-bold py-3 px-6 rounded-xl transition-colors text-sm ${
                    c.navy
                      ? "bg-[#F97316] hover:bg-[#ea6c0a] text-white"
                      : c.highlight
                      ? "bg-[#F97316] hover:bg-[#ea6c0a] text-white"
                      : "border border-gray-200 hover:border-[#F97316] text-[#1C2A44] hover:text-[#F97316]"
                  }`}
                >
                  Xem combo
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/combo"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#F97316] hover:underline"
            >
              Xem táº¥t cáº£ combo â†’
            </Link>
          </div>
        </div>
      </section>

      {/* â•â•â• KHá»I 6 â€” TÃ€I NGUYÃŠN MIá»„N PHÃ â•â•â• */}
      <section className="bg-[#1C2A44] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-white mb-10 sm:mb-14">
            Nháº­n bá»™ tÃ i nguyÃªn AI miá»…n phÃ­
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Checklist trÃ¡i */}
            <div className="space-y-4">
              {freeResources.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-xl" style={{ color: "#F97316" }}>âœ“</span>
                  <p className="text-white text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            {/* Form pháº£i */}
            <div className="flex justify-center lg:justify-end">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â• KHá»I 7 â€” GIá»šI THIá»†U THIÃŠN HUá»† â•â•â• */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* áº¢nh */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/anh/thien-hue-working.jpg"
                  alt="ThiÃªn Huá»‡ Ä‘ang lÃ m viá»‡c vá»›i AI"
                  fill
                  sizes="(max-width: 1024px) 320px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2A44] mb-5 leading-snug">
                MÃ¬nh lÃ  ThiÃªn Huá»‡ â€” ngÆ°á»i gom tool vÃ  quy trÃ¬nh Ä‘á»ƒ báº¡n dÃ¹ng AI dá»… hÆ¡n
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                MÃ¬nh khÃ´ng dáº¡y lÃ½ thuyáº¿t AI phá»©c táº¡p. MÃ¬nh test tool, gom prompt, Ä‘Ã³ng gÃ³i quy trÃ¬nh vÃ  hÆ°á»›ng dáº«n láº¡i báº±ng cÃ¡ch dá»… hiá»ƒu Ä‘á»ƒ ngÆ°á»i kinh doanh online má»™t mÃ¬nh cÃ³ thá»ƒ tá»± lÃ m content, áº£nh, video vÃ  workflow bÃ¡n hÃ ng nhanh hÆ¡n.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


