"use client";

import { useState } from "react";
import { featuredProduct as p } from "@/lib/data";
import { SectionHead } from "./SectionHead";

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export function ProductSpotlight() {
  const [size, setSize] = useState(1);
  const installment = p.priceCents / 3 / 100;

  return (
    <section className="pb-[100px]">
      <div className="max-w-[1320px] mx-auto px-8">
        <SectionHead kicker="Featured tool" title="Product page, built for a decision — not a scroll." />

        <div className="bg-graySoft rounded-3xl p-8 md:p-12 grid md:grid-cols-[0.9fr_1.1fr] gap-13">
          <div>
            <div className="relative aspect-[1/0.85] rounded-2xl overflow-hidden shadow-md mb-3.5 bg-gradient-to-br from-[#1B1E22] to-[#0E0F11]">
              <div className="absolute bottom-4 right-4 bg-white/95 text-[11.5px] font-semibold px-3 py-2 rounded-full flex items-center gap-1.5">
                🔍 Hover to zoom · 360° · Video
              </div>
            </div>
            <div className="flex gap-2.5">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className={`w-16 h-16 rounded-xl bg-[#e2e6ec] border-2 transition-colors ${
                    i === 0 ? "border-blue" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11.5px] text-[#8a9099] tracking-wide mb-2.5">
              SKU {p.sku} &nbsp;·&nbsp; Available in {p.countries} countries
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] bg-green/10 px-2.5 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              {p.stock}
            </div>
            <h3 className="font-bold text-[26px] md:text-[28px] tracking-tight mb-2.5">{p.name}</h3>
            <div className="flex items-center gap-2 mb-5.5">
              <span className="text-[#F5A524] text-sm tracking-wide">★★★★★</span>
              <span className="text-[12.5px] text-[#8a9099]">
                {p.rating} ({p.reviewCount} professional reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="font-bold text-[32px] tracking-tight">{formatMoney(p.priceCents, p.currency)}</span>
              <span className="text-base text-[#9aa0a8] line-through">{formatMoney(p.wasCents, p.currency)}</span>
              <span className="text-xs font-bold text-white bg-blue px-2 py-0.5 rounded-md">
                −{Math.round((1 - p.priceCents / p.wasCents) * 100)}%
              </span>
            </div>
            <p className="text-[13px] text-[#6b7178] mb-6">
              or <strong className="text-ink">3× {formatMoney(Math.round(installment * 100), p.currency)}</strong> interest-free · converted at today's rate
            </p>

            <div className="mb-6.5">
              <div className="text-[12.5px] font-semibold mb-2.5">Size</div>
              <div className="flex gap-2.5">
                {p.sizes.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setSize(i)}
                    className={`h-[38px] px-4 rounded-xl border-[1.5px] text-[13px] font-medium transition-colors ${
                      i === size ? "border-ink bg-ink text-white" : "border-silver bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 mb-5">
              <button className="flex-[1.4] h-[52px] rounded-2xl bg-ink text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform">
                Add to Cart
              </button>
              <button className="flex-1 h-[52px] rounded-2xl border-[1.5px] border-silver text-sm font-semibold hover:border-ink transition-colors">
                Buy Now
              </button>
              <button className="w-[52px] h-[52px] rounded-2xl border-[1.5px] border-silver flex items-center justify-center shrink-0 hover:border-ink transition-colors" title="Wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8}>
                  <path d="M12 20s-7-4.35-9.5-8.5C.7 8 2.4 4.5 6 4.5c2 0 3.5 1.2 4.5 2.5 1-1.3 2.5-2.5 4.5-2.5 3.6 0 5.3 3.5 3.5 7C19 15.65 12 20 12 20z" />
                </svg>
              </button>
            </div>

            <div className="flex gap-4.5 pt-5 border-t border-silver text-xs text-[#6b7178]">
              <div>🚚 Ships from EU &amp; US hubs</div>
              <div>📦 Est. delivery 3–6 days</div>
              <div>💱 Tax calculated at checkout</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
