import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct } from "@/lib/store";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const title = p ? `${p.name} ${p.tagline} — Chil by Penguin` : "Product — Chil by Penguin";
    const desc = p?.description ?? "Chil by Penguin sparkling fruit drinks.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="px-6 py-40 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <Link to="/" className="mt-4 inline-block underline">
        Go home
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-hero px-6 pt-32 pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <img
            src={p.images[img]}
            alt={p.name}
            className="aspect-[4/5] w-full rounded-[2rem] bg-cream object-contain p-3 shadow-soft"
          />
          <div className="mt-4 flex gap-3">
            {p.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                aria-label={`Image ${i + 1}`}
                className={`overflow-hidden rounded-2xl ring-2 transition ${i === img ? "ring-gold" : "ring-transparent opacity-60"}`}
              >
                <img src={src} alt="" className="size-20 bg-cream object-contain p-1" />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-card p-8 text-card-foreground shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {p.tagline}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">{p.name}</h1>
            <p className="mt-4 text-3xl font-bold">{formatINR(p.price)}</p>
            <p className="text-sm text-muted-foreground">{p.size}</p>
            <p className="mt-6 text-muted-foreground">{p.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border px-3 py-2">
                <button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="size-4" />
                </button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button aria-label="Increase" onClick={() => setQty(qty + 1)}>
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => add(p.slug, qty)}
                className="rounded-full border-2 border-primary py-3 font-semibold transition hover:bg-muted"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  add(p.slug, qty);
                  setOpen(false);
                  navigate({ to: "/checkout" });
                }}
                className="rounded-full bg-primary py-3 font-semibold text-primary-foreground"
              >
                Buy Now
              </button>
            </div>
            <dl className="mt-8 space-y-4 border-t pt-6 text-sm">
              <div>
                <dt className="font-semibold">Highlights</dt>
                <dd className="text-muted-foreground">{p.highlights.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-semibold">Ingredients & nutrition</dt>
                <dd className="text-muted-foreground">
                  As printed on the jar label. Full details coming soon.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Packaging</dt>
                <dd className="text-muted-foreground">{p.size}</dd>
              </div>
              <div className="flex gap-2">
                <Truck className="size-4 shrink-0" />
                <dd className="text-muted-foreground">
                  Delivery in Bhubaneswar. We'll confirm your delivery time on WhatsApp.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
