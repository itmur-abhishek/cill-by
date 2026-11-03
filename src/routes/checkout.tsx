import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct, whatsappLink } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Chil by Penguin" },
      { name: "description", content: "Place your Chil by Penguin order via WhatsApp." },
      { property: "og:title", content: "Checkout — Chil by Penguin" },
      { property: "og:description", content: "Place your Chil by Penguin order via WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

const field = "w-full rounded-xl border bg-background px-4 py-3";

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as {
      name: string;
      phone: string;
      email?: string;
      address: string;
      city: string;
      pin: string;
    };
    const id = `CHIL-${Date.now().toString(36).toUpperCase()}`;
    const items = lines.map((l) => {
      const p = getProduct(l.slug)!;
      return `• ${p.name} (${p.size}) × ${l.qty} = ${formatINR(p.price * l.qty)}`;
    });
    const msg = [
      `New order request ${id}`,
      ...items,
      `Subtotal: ${formatINR(subtotal)}`,
      "",
      `Name: ${f.name}`,
      `Mobile: ${f.phone}`,
      f.email ? `Email: ${f.email}` : "",
      `Address: ${f.address}, ${f.city} - ${f.pin}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank");
    clear();
    setOrderId(id);
  };

  if (orderId)
    return (
      <div className="px-6 pt-40 pb-24 text-center">
        <h1 className="text-4xl font-extrabold">Almost done!</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your order request <strong className="text-foreground">{orderId}</strong> opened in
          WhatsApp. Send the message and we'll confirm your order and delivery.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Back home
        </Link>
      </div>
    );

  if (lines.length === 0)
    return (
      <div className="px-6 pt-40 pb-24 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link
          to="/products/$slug"
          params={{ slug: "chil-blueberry" }}
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          Shop Chil Blueberry
        </Link>
      </div>
    );

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="space-y-4">
          <h1 className="text-4xl font-extrabold">Checkout</h1>
          <input required name="name" placeholder="Full name" className={field} />
          <input
            required
            name="phone"
            type="tel"
            pattern="[0-9+ ]{10,14}"
            placeholder="Mobile number"
            className={field}
          />
          <input name="email" type="email" placeholder="Email (optional)" className={field} />
          <textarea
            required
            name="address"
            rows={3}
            placeholder="Complete delivery address"
            className={field}
          />
          <div className="grid grid-cols-2 gap-4">
            <input required name="city" placeholder="City" className={field} />
            <input
              required
              name="pin"
              pattern="[0-9]{6}"
              placeholder="PIN code"
              className={field}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Your order is sent to us on WhatsApp. We'll confirm availability, delivery time and
            payment with you there.
          </p>
          <button className="w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground">
            Place order via WhatsApp
          </button>
        </form>
        <aside className="h-fit rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="text-xl font-bold">Order summary</h2>
          {lines.map((l) => {
            const p = getProduct(l.slug)!;
            return (
              <div key={l.slug} className="mt-4 flex justify-between text-sm">
                <span>
                  {p.name} × {l.qty}
                </span>
                <span>{formatINR(p.price * l.qty)}</span>
              </div>
            );
          })}
          <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
