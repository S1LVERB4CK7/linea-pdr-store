import { categories } from "@/lib/data";
import { SectionHead } from "./SectionHead";

export function Categories() {
  return (
    <section className="pb-[90px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <SectionHead kicker="Shop by category" title="Everything the bay needs, organized the way you already think about it." />
        <div className="grid md:grid-cols-4 gap-4.5">
          {categories.map((c) => (
            <a
              key={c.name}
              href="#"
              className="group relative rounded-brand bg-white border border-silver p-6.5 h-[168px] flex flex-col justify-between overflow-hidden hover:shadow-[0_12px_40px_rgba(17,17,17,0.08)] hover:-translate-y-1 hover:border-transparent transition-all"
            >
              <div className="w-[42px] h-[42px] rounded-xl bg-graySoft flex items-center justify-center group-hover:bg-blue transition-colors">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8} className="group-hover:stroke-white transition-colors">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
                </svg>
              </div>
              <div>
                <div className="text-[15px] font-semibold">{c.name}</div>
                <div className="text-xs text-[#8a9099] mt-0.5">{c.count}</div>
              </div>
              <svg className="absolute top-6 right-6 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2}>
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
