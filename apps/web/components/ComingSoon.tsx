import Link from "next/link";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="max-w-[1320px] mx-auto px-8 py-[120px] text-center">
      <div className="w-14 h-14 rounded-2xl bg-graySoft flex items-center justify-center mx-auto mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      </div>
      <h1 className="text-[28px] font-display font-semibold mb-3">{title}</h1>
      <p className="text-[#6b7178] max-w-[440px] mx-auto mb-8">
        {description ?? "This page is coming soon. We're building it right now."}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
      >
        Back to home
      </Link>
    </section>
  );
}