export function Footer() {
  return (
    <footer className="bg-graySoft border-t border-silver pt-[70px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 pb-14">
          <div>
            <a href="#" className="flex items-center gap-2 font-bold text-[22px] tracking-tight">
              <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-blue to-blue-400" />
              LINEA
            </a>
            <p className="text-[13.5px] text-[#6b7178] leading-relaxed mt-4 mb-5 max-w-[260px]">
              Professional automotive tools and paintless dent repair equipment, engineered
              with working technicians and shipped worldwide.
            </p>
          </div>
          <FooterCol title="Shop" links={["Kits", "Glue System", "Carbon Fiber", "Lights", "Hammers"]} />
          <FooterCol
            title="Company"
            links={["Business Information", "Warranty", "Returns", "Affiliate Program", "Developer API"]}
          />
          <FooterCol title="Support" links={["Help Center", "Track Order", "Shipping Partners", "Become Distributor"]} />
          <FooterCol title="Legal" links={["Privacy", "Terms", "Accepted Payments", "Countries Served"]} />
        </div>
        <div className="border-t border-silver py-5.5 flex items-center justify-between text-[12.5px] text-[#8a9099]">
          <span>© 2026 LINEA Tools. All rights reserved.</span>
          <div className="flex gap-3.5">
            {["IG", "YT", "IN"].map((s) => (
              <a key={s} href="#" className="w-[34px] h-[34px] rounded-xl bg-white border border-silver flex items-center justify-center hover:border-ink transition-colors text-xs">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-[12.5px] font-semibold uppercase tracking-wide mb-4 text-[#4b5057]">{title}</h4>
      {links.map((l) => (
        <a key={l} href="#" className="block text-[13.5px] text-[#6b7178] mb-2.5 hover:text-ink transition-colors">
          {l}
        </a>
      ))}
    </div>
  );
}
