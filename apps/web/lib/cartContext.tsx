"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  sku: string;
  name: string;
  priceCents: number;
  currency: string;
  size?: string;
  quantity: number;
}

export interface WishlistItem {
  sku: string;
  name: string;
  priceCents: number;
  currency: string;
}

interface CartContextValue {
  items: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (sku: string, size?: string) => void;
  updateQuantity: (sku: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (sku: string) => boolean;
  cartCount: number;
  cartTotalCents: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage("linea:cart", []));
    setWishlist(readStorage("linea:wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("linea:cart", JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("linea:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  function addToCart(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === item.sku && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.sku === item.sku && i.size === item.size ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function removeFromCart(sku: string, size?: string) {
    setItems((prev) => prev.filter((i) => !(i.sku === sku && i.size === size)));
  }

  function updateQuantity(sku: string, size: string | undefined, quantity: number) {
    if (quantity <= 0) return removeFromCart(sku, size);
    setItems((prev) =>
      prev.map((i) => (i.sku === sku && i.size === size ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  function toggleWishlist(item: WishlistItem) {
    setWishlist((prev) =>
      prev.some((i) => i.sku === item.sku)
        ? prev.filter((i) => i.sku !== item.sku)
        : [...prev, item]
    );
  }

  function isWishlisted(sku: string) {
    return wishlist.some((i) => i.sku === sku);
  }

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        cartTotalCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
