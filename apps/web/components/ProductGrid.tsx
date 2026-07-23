"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatMoney } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  if (products.length === 0) {
    return (
      <div className="rounded-brand border border-dashed border-silver bg-graySoft/50 py-20 text-center">
        <p className="text-[15px] text-[#6b7178]">Products are being added. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => {
        const priceCents = Math.round((p.promotion_price ?? p.price) * 100);
        const wishlisted = isWishlisted(p.slug);
        return (
          <div key={p.id} className="rounded-brand border border-silver p-5 flex flex-col">
            <Link href={`/produto/${p.slug}`} className="block mb-4">
              <div className="aspect-[4/3] rounded-2xl bg-graySoft mb-4" />
              <p className="font-medium mb-1">{p.name}</p>
              {p.promotion_price ? (
                <p className="text-sm">
                  <span className="font-semibold">{formatMoney(priceCents)}</span>{" "}
                  <span className="text-[#9aa0a8] line-through">{formatMoney(Math.round(p.price * 100))}</span>
                </p>
              ) : (
                <p className="text-sm font-semibold">{formatMoney(priceCents)}</p>
              )}
            </Link>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() =>
                  addToCart({ sku: p.slug, name: p.name, priceCents, currency: "USD" })
                }
                className="flex-1 h-10 rounded-xl bg-ink text-white text-[13px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={() =>
                  toggleWishlist({ sku: p.slug, name: p.name, priceCents, currency: "USD" })
                }
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                  wishlisted ? "border-ink bg-ink" : "border-silver hover:border-ink"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#fff" : "none"} stroke={wishlisted ? "#fff" : "#111"} strokeWidth={1.8}>
                  <path d="M12 20s-7-4.35-9.5-8.5C.7 8 2.4 4.5 6 4.5c2 0 3.5 1.2 4.5 2.5 1-1.3 2.5-2.5 4.5-2.5 3.6 0 5.3 3.5 3.5 7C19 15.65 12 20 12 20z" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
