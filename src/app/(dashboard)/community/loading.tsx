import TopBar from "@/components/layout/TopBar";

export default function Loading() {
  return (
    <div>
      <TopBar title="Cộng đồng" subtitle="Đang tải..." />

      <div className="flex gap-0 animate-pulse">
        {/* Main feed */}
        <div className="flex-1 p-4 sm:p-6 max-w-2xl mx-auto space-y-4">
          {/* Create post box */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{ background: "#F8F9FA", border: "1px solid #E5E7EB" }}
          >
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 h-20 bg-gray-200 rounded-xl" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded-lg" />
            </div>
          </div>

          {/* Post cards */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl p-5 space-y-3"
              style={{ background: "#F8F9FA", border: "1px solid #E5E7EB" }}
            >
              {/* Author row */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-200 rounded w-32" />
                  <div className="h-2 bg-gray-200 rounded w-20" />
                </div>
              </div>
              {/* Post text lines */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
                {i % 2 === 0 && (
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                )}
              </div>
              {/* Tags */}
              <div className="flex gap-1.5">
                <div className="h-5 bg-gray-200 rounded-full w-16" />
                <div className="h-5 bg-gray-200 rounded-full w-20" />
              </div>
              {/* Reactions */}
              <div className="flex gap-4 pt-2 border-t border-[#E5E7EB]">
                <div className="h-4 bg-gray-200 rounded w-10" />
                <div className="h-4 bg-gray-200 rounded w-10" />
                <div className="h-4 bg-gray-200 rounded w-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar — visible on xl+ */}
        <aside
          className="hidden xl:block w-72 p-4 border-l border-[#E5E7EB] shrink-0 space-y-4"
          style={{ background: "#F8F9FA" }}
        >
          {/* XP card */}
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-7 bg-gray-200 rounded w-28" />
            <div className="h-3 bg-gray-200 rounded w-36" />
            <div className="h-2 bg-gray-200 rounded-full" />
            <div className="h-2 bg-gray-200 rounded w-40" />
          </div>

          {/* Leaderboard card */}
          <div
            className="rounded-xl p-4 space-y-3"
            style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2.5 p-2">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-12" />
              </div>
            ))}
          </div>

          {/* Weekly challenge card */}
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-28" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((d) => (
                <div key={d} className="flex-1 h-6 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
