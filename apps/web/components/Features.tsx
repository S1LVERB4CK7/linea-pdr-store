const features = [
  {
    title: "Worldwide Delivery",
    text: "Dispatched from regional hubs to 40+ countries with tracked, insured freight.",
    path: "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
    extra: <circle cx="12" cy="12" r="9" />,
  },
  {
    title: "Secure Payments",
    text: "Stripe-backed checkout with local currency, tax and installment support.",
    path: "M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z M9 12l2 2 4-4",
  },
  {
    title: "Fast Shipping",
    text: "Priority lanes on best-sellers — most orders leave the warehouse same day.",
    path: "M13 2 3 14h7l-1 8 10-12h-7z",
  },
  {
    title: "Professional Quality",
    text: "Specced with working technicians — every tool is shop-floor tested first.",
    path: "M12 2l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16l-5.6 3.1 1.4-6.3L3 8.5l6.4-.6z",
  },
];

export function Features() {
  return (
    <section className="py-[90px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-graySoft rounded-brand p-7 border border-transparent hover:border-silver hover:-translate-y-1 transition-all">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4.5 shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8}>
                  {f.extra}
                  <path d={f.path} />
                </svg>
              </div>
              <h3 className="text-[15.5px] font-semibold mb-1.5">{f.title}</h3>
              <p className="text-[13.5px] text-[#6b7178] leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
