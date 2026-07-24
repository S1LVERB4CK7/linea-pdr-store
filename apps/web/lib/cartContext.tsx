"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useAuth } from "./authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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

// --- chamadas à API (só usadas quando o usuário está logado) ---

interface ApiCartItem {
  quantity: number;
  size: string;
  product: { sku: string; name: string; priceCents: number; currency: string };
}
interface ApiWishlistItem {
  product: { sku: string; name: string; priceCents: number; currency: string };
}

async function apiRequest<T>(path: string, token: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) return null;
    if (res.status === 204) return null;
    return (await res.json()) as T;
  } catch {
    // rede indisponível — mantém o estado local como fallback silencioso
    return null;
  }
}

function toCartItem(i: ApiCartItem): CartItem {
  return {
    sku: i.product.sku,
    name: i.product.name,
    priceCents: i.product.priceCents,
    currency: i.product.currency,
    size: i.size || undefined,
    quantity: i.quantity,
  };
}

function toWishlistItem(i: ApiWishlistItem): WishlistItem {
  return {
    sku: i.product.sku,
    name: i.product.name,
    priceCents: i.product.priceCents,
    currency: i.product.currency,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const syncedTokenRef = useRef<string | null>(null);

  // visitante: carrega do localStorage
  useEffect(() => {
    setItems(readStorage("linea:cart", []));
    setWishlist(readStorage("linea:wishlist", []));
    setHydrated(true);
  }, []);

  // visitante: persiste no localStorage (só quando não há sessão — ver efeito abaixo)
  useEffect(() => {
    if (hydrated && !accessToken) localStorage.setItem("linea:cart", JSON.stringify(items));
  }, [items, hydrated, accessToken]);

  useEffect(() => {
    if (hydrated && !accessToken) localStorage.setItem("linea:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated, accessToken]);

  // ao logar: empurra o carrinho/wishlist de visitante pro backend uma vez,
  // depois passa a usar o backend como fonte de verdade
  useEffect(() => {
    if (!accessToken || !hydrated || syncedTokenRef.current === accessToken) return;
    syncedTokenRef.current = accessToken;

    (async () => {
      const guestCart = readStorage<CartItem[]>("linea:cart", []);
      const guestWishlist = readStorage<WishlistItem[]>("linea:wishlist", []);

      for (const item of guestCart) {
        await apiRequest("/api/cart", accessToken, {
          method: "POST",
          body: JSON.stringify({ productId: item.sku, size: item.size, quantity: item.quantity }),
        });
      }
      for (const item of guestWishlist) {
        await apiRequest("/api/wishlist", accessToken, {
          method: "POST",
          body: JSON.stringify({ productId: item.sku }),
        });
      }
      if (guestCart.length || guestWishlist.length) {
        localStorage.removeItem("linea:cart");
        localStorage.removeItem("linea:wishlist");
      }

      const cartData = await apiRequest<{ items: ApiCartItem[] }>("/api/cart", accessToken);
      const wishlistData = await apiRequest<{ items: ApiWishlistItem[] }>("/api/wishlist", accessToken);
      setItems((cartData?.items ?? []).map(toCartItem));
      setWishlist((wishlistData?.items ?? []).map(toWishlistItem));
    })();
  }, [accessToken, hydrated]);

  // ao deslogar: volta a operar em cima do localStorage (vazio, tipicamente)
  useEffect(() => {
    if (!accessToken && syncedTokenRef.current) {
      syncedTokenRef.current = null;
      setItems(readStorage("linea:cart", []));
      setWishlist(readStorage("linea:wishlist", []));
    }
  }, [accessToken]);

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

    if (accessToken) {
      apiRequest("/api/cart", accessToken, {
        method: "POST",
        body: JSON.stringify({ productId: item.sku, size: item.size, quantity }),
      });
    }
  }

  function removeFromCart(sku: string, size?: string) {
    setItems((prev) => prev.filter((i) => !(i.sku === sku && i.size === size)));

    if (accessToken) {
      const qs = size ? `?size=${encodeURIComponent(size)}` : "";
      apiRequest(`/api/cart/${encodeURIComponent(sku)}${qs}`, accessToken, { method: "DELETE" });
    }
  }

  function updateQuantity(sku: string, size: string | undefined, quantity: number) {
    if (quantity <= 0) return removeFromCart(sku, size);

    setItems((prev) => prev.map((i) => (i.sku === sku && i.size === size ? { ...i, quantity } : i)));

    if (accessToken) {
      const qs = size ? `?size=${encodeURIComponent(size)}` : "";
      apiRequest(`/api/cart/${encodeURIComponent(sku)}${qs}`, accessToken, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
    }
  }

  function clearCart() {
    setItems([]);
    if (accessToken) {
      apiRequest("/api/cart", accessToken, { method: "DELETE" });
    }
  }

  function toggleWishlist(item: WishlistItem) {
    const alreadyIn = wishlist.some((i) => i.sku === item.sku);

    setWishlist((prev) => (alreadyIn ? prev.filter((i) => i.sku !== item.sku) : [...prev, item]));

    if (accessToken) {
      if (alreadyIn) {
        apiRequest(`/api/wishlist/${encodeURIComponent(item.sku)}`, accessToken, { method: "DELETE" });
      } else {
        apiRequest("/api/wishlist", accessToken, {
          method: "POST",
          body: JSON.stringify({ productId: item.sku }),
        });
      }
    }
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
