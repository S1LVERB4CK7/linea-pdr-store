import { reviews } from "@/lib/data";
import { SectionHead } from "./SectionHead";

export function Trust() {
  return (
    <section className="pb-[100px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <SectionHead kicker="Trusted on the shop floor" title="What professional technicians say." />
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="border border-silver rounded-brand p-6.5 hover:shadow-md transition-shadow">
              <div className="text-[#F5A524] text-[13px] mb-3.5 tracking-wide">★★★★★</div>
              <p className="text-sm leading-relaxed text-[#3a3f45] mb-4.5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-blue to-blue-400" />
                <div>
                  <strong className="text-[13px] block">{r.name}</strong>
                  <span className="text-[11.5px] text-[#8a9099]">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
