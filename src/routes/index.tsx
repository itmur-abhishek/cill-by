import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Citrus,
  Droplets,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Leaf,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import heroJar from "@/assets/chil-blueberry-original.jpeg";
import lifestyle from "@/assets/lifestyle.jpg";
import brandBrochure from "@/assets/chil-brand-brochure.jpeg";
import berry from "@/assets/blueberry.png";
import { useCart } from "@/lib/cart";
import { BUSINESS, PRODUCTS, formatINR, whatsappLink } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chil by Penguin — Blueberry Sparkling Fruit Drink" },
      {
        name: "description",
        content:
          "Meet Chil Blueberry: a sparkling fruit drink with real blueberry bits, added Vitamin C and sweetened with Mishri.",
      },
      { property: "og:title", content: "Chil by Penguin — Feel the freshness" },
      {
        property: "og:description",
        content: "Sparkling blueberry drink with real fruit bits, sweetened with Mishri.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const berries = [
  { x: "8%", y: "22%", s: 70, d: 0, depth: 30 },
  { x: "18%", y: "72%", s: 110, d: 1.2, depth: 50 },
  { x: "82%", y: "18%", s: 60, d: 0.6, depth: 20 },
  { x: "88%", y: "70%", s: 90, d: 2, depth: 40 },
  { x: "48%", y: "88%", s: 50, d: 1.6, depth: 15 },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("animate-rise")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Hero() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const on = () => setScroll(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section
      id="home"
      onMouseMove={(e) =>
        setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
      }
      className="bg-hero relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 text-plum-foreground"
    >
      {berries.map((b, i) => (
        <img
          key={i}
          src={berry}
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-10 select-none"
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            transform: `translate(${m.x * b.depth}px, ${m.y * b.depth - scroll * (b.depth / 100)}px)`,
            filter: b.s < 65 ? "blur(2px)" : undefined,
            transition: "transform 0.3s ease-out",
          }}
        />
      ))}
      <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-plum-foreground/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <Sparkles className="size-3.5" /> Sparkling Fruit Drink
          </p>
          <h1 className="text-5xl font-extrabold leading-[0.95] md:text-7xl">
            Feel the freshness.
            <br />
            <span className="text-gold">Taste the difference.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg opacity-80">
            Meet Chil Blueberry — a sparkling fruit drink loaded with real blueberry bits for a
            refreshing experience in every sip.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-gold-foreground shadow-glow transition hover:scale-105"
            >
              Explore Our Drink <ArrowRight className="size-4" />
            </a>
            <Link
              to="/products/$slug"
              params={{ slug: "chil-blueberry" }}
              className="rounded-full border border-plum-foreground/30 px-7 py-3.5 font-semibold transition hover:bg-plum-foreground/10"
            >
              Order Now
            </Link>
          </div>
        </div>
        <div
          className="relative mx-auto w-full max-w-md animate-rise [animation-delay:200ms]"
          style={{
            transform: `perspective(1000px) rotateY(${m.x * 10}deg) rotateX(${-m.y * 8}deg) translateY(${scroll * -0.15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="absolute -inset-8 rounded-full bg-accent/40 blur-3xl" />
          <img
            src={heroJar}
            alt="Chil Blueberry sparkling fruit drink jar"
            width={1024}
            height={1280}
            className="relative max-h-[680px] w-full rounded-[2.5rem] object-contain shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { add } = useCart();
  return (
    <section id="products" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal className="max-w-2xl text-4xl font-extrabold md:text-6xl">
          Meet your new favourite refreshment.
        </h2>
        <div className="mt-14 grid gap-8">
          {PRODUCTS.map((p) => (
            <article
              data-reveal
              key={p.slug}
              className="group grid overflow-hidden rounded-[2rem] bg-card shadow-soft md:grid-cols-2"
            >
              <div className="overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="h-full max-h-[560px] min-h-[360px] w-full bg-cream object-contain p-4 transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {p.tagline}
                </p>
                <h3 className="mt-2 text-4xl font-extrabold">{p.name}</h3>
                <p className="mt-4 text-muted-foreground">{p.description}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-muted px-4 py-2 font-medium">
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{formatINR(p.price)}</p>
                    <p className="text-sm text-muted-foreground">{p.size}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => add(p.slug)}
                    className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-full border px-6 py-3 font-semibold transition hover:bg-muted"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Citrus, t: "Real Fruit Bits", d: "Experience blueberry bits in every sip." },
  { icon: Droplets, t: "Added Vitamin C", d: "Vitamin C included in the product." },
  { icon: Sparkles, t: "Refreshing Taste", d: "A sparkling fruit drink experience." },
  { icon: Leaf, t: "Sweetened with Mishri", d: "Made with Mishri instead of refined sugar." },
];

function Why() {
  return (
    <section id="why" className="bg-plum px-6 py-28 text-plum-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal className="text-4xl font-extrabold md:text-6xl">
          Real fruit. <span className="text-gold">Real goodness.</span>
        </h2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              data-reveal
              key={f.t}
              style={{ animationDelay: `${i * 100}ms` }}
              className="group rounded-3xl border border-plum-foreground/10 bg-plum-foreground/5 p-7 transition duration-500 hover:-translate-y-2 hover:bg-plum-foreground/10"
            >
              <f.icon
                className="size-10 text-gold transition group-hover:scale-110"
                strokeWidth={1.4}
              />
              <h3 className="mt-8 text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-sm opacity-70">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        <img
          data-reveal
          src={lifestyle}
          alt="Chil Blueberry served with fresh blueberries"
          loading="lazy"
          width={1280}
          height={960}
          className="rounded-[2rem] shadow-soft"
        />
        <div data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our Story</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">Meet Chil by Penguin</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Chil is about a simple idea: a sparkling drink you can actually see the fruit in. Real
            blueberry bits, a lively fizz and Mishri for sweetness — made to cool you down, wherever
            you are.
          </p>
          <p className="mt-4 text-sm italic text-muted-foreground">
            Our full brand story is coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}

function BrandBoard() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-card p-4 shadow-soft md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              The Chil identity
            </p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">A little more Chil.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A look at the brand world, packaging direction and playful penguin personality.
          </p>
        </div>
        <img
          data-reveal
          src={brandBrochure}
          alt="Chil by Penguin brand brochure and product identity reference"
          loading="lazy"
          width={1320}
          height={880}
          className="w-full rounded-2xl object-contain"
        />
      </div>
    </section>
  );
}

function Fresh() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
      className="bg-hero relative overflow-hidden px-6 py-32 text-center text-plum-foreground"
    >
      {[...Array(9)].map((_, i) => (
        <img
          key={i}
          src={berry}
          alt=""
          aria-hidden
          className="absolute animate-float"
          style={{
            left: `${(i * 37) % 95}%`,
            top: `${(i * 53) % 85}%`,
            width: 40 + (i % 4) * 25,
            animationDelay: `${i * 0.5}s`,
            translate: `${m.x * (20 + i * 8)}px ${m.y * (20 + i * 8)}px`,
            transition: "translate 0.4s ease-out",
            opacity: 0.9,
          }}
        />
      ))}
      <h2 data-reveal className="relative text-5xl font-extrabold md:text-8xl">
        Freshness
        <br />
        <span className="text-gold">you can see.</span>
      </h2>
      <p className="relative mx-auto mt-6 max-w-md opacity-80">
        Every jar is full of real blueberry bits that dance in the fizz.
      </p>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    window.open(
      whatsappLink(
        `Business inquiry from ${f.get("name")} (${f.get("phone")}):\n${f.get("message")}`,
      ),
      "_blank",
    );
    setSent(true);
  };
  const tel = `tel:${BUSINESS.phone.replace(/\s/g, "")}`;
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal className="text-4xl font-extrabold md:text-6xl">
          Say hello.
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-3xl bg-card p-7 shadow-soft">
              <p className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-accent" />
                {BUSINESS.address}
              </p>
              <p className="mt-3 flex gap-3">
                <Phone className="size-5 text-accent" />
                {BUSINESS.phone}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={tel}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Call Now
                </a>
                <a
                  href={whatsappLink("Hi Chil by Penguin!")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border px-5 py-2.5 text-sm font-semibold"
                >
                  Get Directions
                </a>
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
                >
                  <Instagram className="size-4" />
                  Follow on Instagram
                </a>
              </div>
            </div>
            <iframe
              title="Map"
              src={BUSINESS.embedUrl}
              loading="lazy"
              className="h-72 w-full rounded-3xl border-0 shadow-soft"
            />
          </div>
          <form onSubmit={submit} className="space-y-4 rounded-3xl bg-card p-7 shadow-soft">
            <h3 className="text-2xl font-bold">Business inquiry</h3>
            <input
              required
              name="name"
              placeholder="Your name"
              className="w-full rounded-xl border bg-background px-4 py-3"
            />
            <input
              required
              name="phone"
              type="tel"
              placeholder="Mobile number"
              className="w-full rounded-xl border bg-background px-4 py-3"
            />
            <textarea
              required
              name="message"
              rows={5}
              placeholder="How can we help?"
              className="w-full rounded-xl border bg-background px-4 py-3"
            />
            <button className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">
              Send via WhatsApp
            </button>
            {sent && (
              <p className="text-sm text-muted-foreground">
                WhatsApp opened with your message — just hit send.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <Hero />
      <Products />
      <Why />
      <Story />
      <BrandBoard />
      <Fresh />
      <Contact />
    </>
  );
}
