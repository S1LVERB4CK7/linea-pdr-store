import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-[90px]">
      <Link href="/" className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors">
        ← Back to home
      </Link>

      <h1 className="text-[32px] font-display font-semibold mt-4 mb-2">{category.name}</h1>
      <p className="text-[#6b7178] mb-10">{category.count}</p>

      <div className="rounded-brand border border-dashed border-silver bg-graySoft/50 py-20 text-center">
        <p className="text-[15px] text-[#6b7178]">
          Products for this category are being added. Check back soon.
        </p>
      </div>
    </section>
  );
}