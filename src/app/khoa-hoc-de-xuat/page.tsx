import Link from "next/link";

interface Course {
  title: string;
  teacher: string;
  suitable_for: string;
  outcomes: string[];
  price: string;
  affiliate_note: boolean;
}

const COURSES: Course[] = [
  {
    title: "Kh�a h?c AI Automation v?i n8n",
    teacher: "Th?y ??ng Kh??ng",
    suitable_for: "Ng??i mu?n t? ??ng h�a workflow, ch? shop online, freelancer",
    outcomes: [
      "T?o workflow n8n t? c? b?n ??n n�ng cao",
      "T? ??ng h�a ??ng content, tr? l?i kh�ch",
      "Ti?t ki?m 5-10h/tu?n",
    ],
    price: "Li�n h?",
    affiliate_note: true,
  },
  {
    title: "L�m Video AI v?i Runway, Kling, Hailuo",
    teacher: "C?ng ??ng AI Vi?t Nam",
    suitable_for: "Creator, ng??i b�n h�ng mu?n l�m video nhanh b?ng AI",
    outcomes: [
      "T?o video AI chuy�n nghi?p",
      "L�m thumbnail, storyboard",
      "Workflow l�m video h�ng lo?t",
    ],
    price: "t? 500.000?",
    affiliate_note: true,
  },
  {
    title: "Content Marketing v?i AI",
    teacher: "Chuy�n gia Marketing",
    suitable_for: "Ng??i l�m marketing, ch? shop, solopreneur",
    outcomes: [
      "Vi?t caption b�n h�ng b?ng AI",
      "L�n l?ch content 1 th�ng trong 2h",
      "T?o hook v� CTA hi?u qu?",
    ],
    price: "t? 299.000?",
    affiliate_note: true,
  },
  {
    title: "Kinh doanh Online 1 Ng??i v?i AI",
    teacher: "Thi�n Hu? (?? xu?t)",
    suitable_for: "Ng??i mu?n kh?i nghi?p online, ch? shop nh?",
    outcomes: [
      "Ch?n s?n ph?m v� niche ph� h?p",
      "T? t?o content AI m?i ng�y",
      "X�y d?ng ph?u b�n h�ng ??n gi?n",
    ],
    price: "t? 199.000?",
    affiliate_note: true,
  },
];

export default function KhoaHocDeXuatPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Kh�a h?c AI / Automation ???c ?? xu?t
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          M�nh tuy?n ch?n m?t s? kh�a h?c AI, automation, content, video t? c�c
          Th?y/c?ng ??ng uy t�n. N?u b?n mu?n h?c b�i b?n h?n, c� th? tham
          kh?o t?i ?�y.
        </p>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          * ?�y l� trang kh�a h?c ?? xu?t / affiliate. Khi b?n ??ng k� qua
          link, m�nh c� th? nh?n hoa h?ng gi?i thi?u.
        </p>
      </section>

      {/* Course Grid */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-slate-400 text-sm">Thumbnail kh�a h?c</span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-semibold text-slate-800 text-base leading-snug mb-1">
                  {course.title}
                </h3>

                {/* Teacher */}
                <p className="text-xs text-slate-400 mb-4">{course.teacher}</p>

                {/* Suitable For */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Ph� h?p v?i ai
                  </p>
                  <p className="text-sm text-slate-500">{course.suitable_for}</p>
                </div>

                {/* Outcomes */}
                <div className="mb-4 flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    H?c xong l�m ???c
                  </p>
                  <ul className="space-y-1">
                    {course.outcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">?</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-[#F97316] mb-4">
                  {course.price}
                </p>

                {/* CTA Button */}
                <a
                  href="#"
                  className="block text-center text-sm font-semibold bg-[#F97316] text-white rounded-lg py-2.5 hover:bg-orange-600 transition-colors mb-3"
                >
                  Xem kh�a h?c
                </a>

                {/* Affiliate Tag */}
                {course.affiliate_note && (
                  <p className="text-xs text-slate-400 text-center">
                    ?? Link gi?i thi?u / affiliate
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-[#E2E8F0] py-14 px-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
          Mu?n d�ng tool AI ngay kh�ng c?n h?c nhi?u?
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Kho Tool AI c� s?n prompt, workflow, h??ng d?n chi ti?t � d�ng ???c ngay.
        </p>
        <Link
          href="/tool-ai"
          className="inline-block px-6 py-3 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          Xem kho Tool AI
        </Link>
      </section>
    </div>
  );
}
