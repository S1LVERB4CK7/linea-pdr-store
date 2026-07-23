import Link from "next/link";

const perks = [
  { title: "Volume pricing", desc: "Tiered discounts based on monthly order volume." },
  { title: "Net terms", desc: "Net-30 invoicing available for approved accounts." },
  { title: "Dedicated support", desc: "A direct line to our team for fleet and shop orders." },
  { title: "Priority shipping", desc: "Bulk orders get priority handling from regional hubs." },
];

export default function ProfessionalsPage() {
  return (
    <section className="max-w-[860px] mx-auto px-8 py-[90px]">
      <Link href="/" className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors">
        ← Back to home
      </Link>
      <h1 className="text-[32px] font-display font-semibold mt-4 mb-2">For Professionals</h1>
      <p className="text-[#6b7178] mb-10">
        Distributor and fleet pricing for shops, mobile technicians, and dealership networks in 40+ countries.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {perks.map((p) => (
          <div key={p.title} className="rounded-brand border border-silver p-5">
            <p className="font-medium mb-1">{p.title}</p>
            <p className="text-[13.5px] text-[#6b7178]">{p.desc}</p>
          </div>
        ))}
      </div>

      <Link
        href="/suporte/distribuidor"
        className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
      >
        Become a Distributor
      </Link>
    </section>
  );
}
