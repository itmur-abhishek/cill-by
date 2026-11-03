/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./store";

export type CartLine = { slug: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "chil-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // Ignore unavailable or restricted storage access in non-browser environments.
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const setQty = (slug: string, qty: number) =>
    setLines((ls) =>
      qty <= 0
        ? ls.filter((l) => l.slug !== slug)
        : ls.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  const add = (slug: string, qty = 1) => {
    setLines((ls) => {
      const ex = ls.find((l) => l.slug === slug);
      return ex
        ? ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
        : [...ls, { slug, qty }];
    });
    setOpen(true);
  };
  const remove = (slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);

  return (
    <Ctx.Provider
      value={{
        lines,
        count,
        subtotal,
        open,
        setOpen,
        add,
        setQty,
        remove,
        clear: () => setLines([]),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
