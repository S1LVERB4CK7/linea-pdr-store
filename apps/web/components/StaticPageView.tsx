import Link from "next/link";
import type { StaticPage } from "@/lib/staticContent";

export function StaticPageView({ page }: { page: StaticPage }) {
  return (
    <section className="max-w-[720px] mx-auto px-8 py-[90px]">
      <Link href="/" className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors">
        ← Back to home
      </Link>

      <h1 className="text-[32px] font-display font-semibold mt-4 mb-2">{page.title}</h1>
      {page.updated && <p className="text-[13px] text-[#6b7178] mb-10">{page.updated}</p>}

      <div className="flex flex-col gap-8">
        {page.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-[16px] font-semibold mb-2">{s.heading}</h2>
            <p className="text-[#44494f] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
