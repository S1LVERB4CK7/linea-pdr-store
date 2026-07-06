"use client";

import { useState } from "react";

const navLinks = [

const navLinks = [
  { label: "Kits", href: "#" },
  { label: "Glue System", href: "#" },
  { label: "Carbon Fiber", href: "#" },
  { label: "Lights", href: "#" },
  { label: "Hammers", href: "#" },
  { label: "Accessories", href: "#" },
  { label: "New Products", href: "#", accent: true },
  { label: "Best Sellers", href: "#" },
  { label: "Promotions", href: "#" },
  { label: "Professionals", href: "#" },
];

const searchSuggestions = [
  "Line-board kit",
  "Glue tabs",
  "Carbon fiber tools",
  "LED reflection lamp",
  "PDR hammer set",
  "Bridge puller",
  "Hot glue gun",
  "Hail dent kit",
];

export function Header() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredSuggestions = query.trim()
    ? searchSuggestions.filter((s) =>
        s.toLowerCase().includes(query.trim().toLowerCase())
      )
    : searchSuggestions.slice(0, 5);

  const showDropdown = isFocused;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-silver">
      <div className="max-w-[1320px] mx-auto px-8 h-[76px] flex items-center justify-between gap-8">
        <a href="#" className="flex items-center gap-2 font-bold text-[22px] tracking-tight shrink-0">
          <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-blue to-blue-400" />
          LINEA
        </a>

        <div className="flex-1 max-w-[520px] relative hidden md:block">
          <svg className="absolute left-[17px] top-1/2 -translate-y-1/2 opacity-40 z-10" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search kits, glue tabs, lighting boards…"
            className="w-full h-[46px] rounded-2xl border border-silver bg-graySoft pl-[46px] pr-5 text-sm focus:outline-none focus:border-blue focus:ring-4 focus:ring-blue/10 focus:bg-white transition-all"
          />

          {showDropdown && (
            <div className="absolute top-[52px] left-0 right-0 bg-white border border-silver rounded-2xl shadow-lg overflow-hidden z-20">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="w-full text-left px-5 py-2.5 text-sm text-[#44494f] hover:bg-graySoft transition-colors"
                  >
                    {s}
                  </button>
                ))
              ) : (
                <p className="px-5 py-3 text-sm text-[#44494f]">
                  Nenhum resultado pra "{query}"
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <IconButton title="Support">
            <circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 4" /><circle cx="12" cy="17" r=".5" fill="#111" />
          </IconButton>
          <IconButton title="Wishlist">
            <path d="M12 20s-7-4.35-9.5-8.5C.7 8 2.4 4.5 6 4.5c2 0 3.5 1.2 4.5 2.5 1-1.3 2.5-2.5 4.5-2.5 3.6 0 5.3 3.5 3.5 7C19 15.65 12 20 12 20z" />
          </IconButton>
          <IconButton title="Cart" badge={3}>
            <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2l2.2 11.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
          </IconButton>
          <a href="#" className="flex items-center gap-2 h-11 pl-2 pr-4 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all ml-1">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8}>
              <circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.5-4 4.5-6 7-6s5.5 2 7 6" />
            </svg>
            My Account
          </a>
        </div>
      </div>

      <nav className="border-t border-silver">
        <div className="max-w-[1320px] mx-auto px-8 h-[52px] flex items-center gap-8 overflow-x-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                link.accent ? "text-blue font-semibold" : "text-[#44494f] hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function IconButton({
  children,
  title,
  badge,
}: {
  children: React.ReactNode;
  title: string;
  badge?: number;
}) {
  return (
    <a href="#" title={title} className="relative w-11 h-11 rounded-xl flex items-center justify-center hover:bg-graySoft transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8}>
        {children}
      </svg>
      {badge ? (
        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue text-white text-[10px] font-semibold flex items-center justify-center">
          {badge}
        </span>
      ) : null}
    </a>
  );
}
