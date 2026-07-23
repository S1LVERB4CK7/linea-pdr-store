import Link from "next/link";

const links = [
  { slug: "sobre", label: "About LINEA", desc: "Our mission, and how we build tools." },
  { slug: "carreiras", label: "Careers", desc: "Open roles and what it's like to work here." },
  { slug: "imprensa", label: "Press", desc: "Media inquiries and company info." },
];

export default function EmpresaPage() {
  return (
    <section className="max-w-[720px] mx-auto px-8 py-[90px]">
      <h1 className="text-[32px] font-display font-semibold mb-2">Company</h1>
      <p className="text-[#6b7178] mb-10">About LINEA, careers, and press.</p>

      <div className="flex flex-col gap-3">
        {links.map((l) => (
          <Link
            key={l.slug}
            href={`/empresa/${l.slug}`}
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
