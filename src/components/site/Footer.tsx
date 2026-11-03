import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/store";

export function Footer() {
  return (
    <footer className="bg-plum px-6 py-16 text-plum-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-bold">
            Chil <span className="font-normal opacity-60">by Penguin</span>
          </p>
          <p className="mt-3 max-w-sm opacity-70">
            Sparkling fruit drinks with real fruit bits, sweetened with Mishri.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-gold">Explore</p>
          <a href="/#products" className="block opacity-75 hover:opacity-100">
            Our Products
          </a>
          <Link
            to="/products/$slug"
            params={{ slug: "chil-blueberry" }}
            className="block opacity-75 hover:opacity-100"
          >
            Chil Blueberry
          </Link>
          <a href="/#story" className="block opacity-75 hover:opacity-100">
            Our Story
          </a>
          <a href="/#contact" className="block opacity-75 hover:opacity-100">
            Contact
          </a>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-gold">Reach us</p>
          <p className="flex gap-2 opacity-75">
            <MapPin className="size-4 shrink-0" />
            {BUSINESS.address}
          </p>
          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
            className="flex gap-2 opacity-75 hover:opacity-100"
          >
            <Phone className="size-4" />
            {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 opacity-75 hover:opacity-100"
          >
            <Instagram className="size-4" />
            @chilbypenguin
          </a>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-plum-foreground/10 pt-6 text-xs opacity-50">
        © {new Date().getFullYear()} Chil by Penguin. All rights reserved.
      </p>
    </footer>
  );
}
