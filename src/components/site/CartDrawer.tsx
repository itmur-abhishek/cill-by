import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct } from "@/lib/store";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal } = useCart();
  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-plum/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card p-6 text-card-foreground shadow-soft transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your cart</h2>
          <button
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-muted"
          >
            <X />
          </button>
        </div>
        <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
          {lines.length === 0 && <p className="text-muted-foreground">Your cart is empty.</p>}
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <div key={l.slug} className="flex gap-4 rounded-2xl bg-muted p-3">
                <img src={p.images[0]} alt={p.name} className="size-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.size} · {formatINR(p.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      aria-label="Decrease"
                      onClick={() => setQty(l.slug, l.qty - 1)}
                      className="rounded-full border p-1"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <button
                      aria-label="Increase"
                      onClick={() => setQty(l.slug, l.qty + 1)}
                      className="rounded-full border p-1"
                    >
                      <Plus className="size-3" />
                    </button>
                    <button
                      aria-label="Remove"
                      onClick={() => remove(l.slug)}
                      className="ml-auto p-1 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {lines.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
