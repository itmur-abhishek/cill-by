import { Link } from "@tanstack/react-router";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#products", label: "Our Products" },
  { href: "/#story", label: "Our Story" },
  { href: "/#why", label: "Why Chil" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("chil-theme", next ? "dark" : "light");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass shadow-soft text-foreground" : "text-plum-foreground"
        }`}
      >
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          Chil <span className="font-normal opacity-70">by Penguin</span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="opacity-80 transition hover:opacity-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="rounded-full p-2 transition hover:bg-foreground/10"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button
            aria-label="Open cart"
            onClick={() => setOpen(true)}
            className="relative rounded-full p-2 transition hover:bg-foreground/10"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMenu(!menu)}
            className="rounded-full p-2 md:hidden"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {menu && (
        <ul className="glass mx-auto mt-2 max-w-6xl space-y-1 rounded-3xl p-4 text-foreground md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                className="block rounded-xl px-3 py-2 hover:bg-foreground/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
