import Link from "next/link";

const footerLinks = {
  company: [
    { label: "About LINEA", href: "/empresa/sobre" },
    { label: "Careers", href: "/empresa/carreiras" },
    { label: "Press", href: "/empresa/imprensa" },
  ],
  support: [
    { label: "Help Center", href: "/suporte" },
    { label: "Track Order", href: "/suporte/rastreio" },
    { label: "Become a Distributor", href: "/suporte/distribuidor" },
  ],
  legal: [
    { label: "Terms of Service", href: "/legal/termos" },
    { label: "Privacy Policy", href: "/legal/privacidade" },
    { label: "Refund Policy", href: "/legal/reembolso" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-silver bg-graySoft/30">
      <div className="max-w-[1320px] mx-auto px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-[15px] font-semibold mb-4">LINEA</h3>
          <p className="text-[13.5px] text-[#6b7178] leading-relaxed">
            Professional PDR and automotive tools, shipped worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-[13.5px] font-semibold mb-3 text-ink">Company</h4>
          <ul className="space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13.5px] font-semibold mb-3 text-ink">Support</h4>
          <ul className="space-y-2">
            {footerLinks.support.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13.5px] font-semibold mb-3 text-ink">Legal</h4>
          <ul className="space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13.5px] text-[#6b7178] hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-silver">
        <div className="max-w-[1320px] mx-auto px-8 py-6 text-[13px] text-[#6b7178] flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} LINEA. All rights reserved.</span>
          <span>Secure payments · Global shipping · SSL encrypted</span>
        </div>
      </div>
    </footer>
  );
}