import Link from 'next/link';

type Category = {
  id?: string;
  name: string;
  slug: string;
  count: string;
};

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="max-w-[1320px] mx-auto px-8 py-24">
      <div className="text-center mb-10">
        <p className="text-[13px] uppercase tracking-widest text-blue font-semibold mb-3">
          Shop by category
        </p>
        <h2 className="text-[32px] font-display font-semibold max-w-[600px] mx-auto">
          Everything the bay needs, organized the way you already think about it.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categoria/${c.slug}`}
            className="group rounded-brand border border-silver bg-white p-6 hover:shadow-card hover:-translate-y-1 transition-all"
          >
            <h3 className="text-[17px] font-semibold group-hover:text-blue transition-colors">
              {c.name}
            </h3>
            <p className="text-[13.5px] text-[#6b7178] mt-1">{c.count}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}