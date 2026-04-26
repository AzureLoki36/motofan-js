"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { CartItem } from "@/lib/shop-types";

interface CartCtx {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  update: (productId: string, quantity: number) => void;
  clear: () => void;
  total: number;
}

const CartContext = createContext<CartCtx>({
  items: [], add: () => {}, remove: () => {}, update: () => {}, clear: () => {}, total: 0,
});

const STORAGE_KEY = "motofan-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      const next = existing
        ? prev.map((i) => i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i)
        : [...prev, item];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((productId: string) => {
    persist(items.filter((i) => i.productId !== productId));
  }, [items]);

  const update = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) { remove(productId); return; }
    persist(items.map((i) => i.productId === productId ? { ...i, quantity } : i));
  }, [items, remove]);

  const clear = useCallback(() => persist([]), []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
