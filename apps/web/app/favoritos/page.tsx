"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatMoney } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <section className="max-w-[560px] mx-auto px-8 py-[90px] text-center">
        <h1 className="text-[28px] font-display font-semibold mb-3">Wishlist</h1>
        <p className="text-[#6b7178] mb-8">Save your favorite tools here once you find them.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[860px] mx-auto px-8 py-[90px]">
      <h1 className="text-[28px] font-display font-semibold mb-8">Wishlist</h1>

      <div className="flex flex-col gap-4">
        {wishlist.map((item) => (
          <div
            key={item.sku}
            className="flex items-center justify-between gap-4 rounded-brand border border-silver p-5"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-[13px] text-[#6b7178]">{formatMoney(item.priceCents, item.currency)}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart({ sku: item.sku, name: item.name, priceCents: item.priceCents, currency: item.currency })}
                className="h-10 px-4 rounded-xl bg-ink text-white text-[13px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(item)}
                className="text-[13px] text-[#6b7178] hover:text-ink transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
