"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatMoney } from "@/lib/utils";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotalCents } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-[560px] mx-auto px-8 py-[90px] text-center">
        <h1 className="text-[28px] font-display font-semibold mb-3">Your Cart</h1>
        <p className="text-[#6b7178] mb-8">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[860px] mx-auto px-8 py-[90px]">
      <h1 className="text-[28px] font-display font-semibold mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div
            key={`${item.sku}-${item.size ?? "default"}`}
            className="flex items-center justify-between gap-4 rounded-brand border border-silver p-5"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              {item.size && <p className="text-[13px] text-[#6b7178]">{item.size}</p>}
              <p className="text-[13px] text-[#6b7178]">{formatMoney(item.priceCents, item.currency)} each</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.sku, item.size, Number(e.target.value))}
                className="w-16 h-10 rounded-lg border border-silver text-center text-sm"
              />
              <p className="w-20 text-right font-medium">
                {formatMoney(item.priceCents * item.quantity, item.currency)}
              </p>
              <button
                onClick={() => removeFromCart(item.sku, item.size)}
                className="text-[13px] text-[#6b7178] hover:text-ink transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-brand bg-graySoft p-6">
        <div>
          <p className="text-[13px] text-[#6b7178]">Subtotal</p>
          <p className="text-[22px] font-display font-semibold">{formatMoney(cartTotalCents)}</p>
          <p className="text-[12px] text-[#6b7178] mt-1">Tax calculated at checkout.</p>
        </div>
        <button className="h-12 px-6 rounded-xl bg-ink text-white text-[13.5px] font-medium hover:-translate-y-px hover:shadow-md transition-all">
          Checkout
        </button>
      </div>
    </section>
  );
}
