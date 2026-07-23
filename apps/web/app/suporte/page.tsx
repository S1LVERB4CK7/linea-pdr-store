import Link from "next/link";

const links = [
  { slug: "rastreio", label: "Track Order", desc: "Check the status of an existing order." },
  { slug: "distribuidor", label: "Become a Distributor", desc: "Volume pricing for shops and fleets." },
];

export default function SupportPage() {
  return (
    <section className="max-w-[720px] mx-auto px-8 py-[90px]">
      <h1 className="text-[32px] font-display font-semibold mb-2">Support Center</h1>
      <p className="text-[#6b7178] mb-10">Order tracking, distributor info, and help.</p>

      <div className="flex flex-col gap-3">
        {links.map((l) => (
          <Link
            key={l.slug}
            href={`/suporte/${l.slug}`}
            className="rounded-brand border border-silver p-5 hover:border-ink transition-colors"
          >
            <p className="font-medium mb-1">{l.label}</p>
            <p className="text-[13.5px] text-[#6b7178]">{l.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
