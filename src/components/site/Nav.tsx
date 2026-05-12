import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/sessions", label: "Sessions" },
  { to: "/track", label: "Track" },
  { to: "/events", label: "Events" },
  { to: "/book", label: "Book" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(26,10,20,0.85)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container-prose flex items-center justify-between h-16">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display italic font-black tracking-tight text-lg">MERAKI KARTING</span>
          <span className="bg-gradient-accent h-[2px] w-16 mt-1 rounded-full" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              activeProps={{ className: "text-white" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="https://wa.me/256763170060?text=Hi!%20I'd%20like%20to%20book%20a%20karting%20session."
            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-accent hover:opacity-90 transition"
          >
            Book Now
          </a>
        </div>
        <button className="md:hidden text-white" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#1A0A14] z-40">
          <nav className="container-prose py-10 flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-3xl font-display italic font-black text-white"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://wa.me/256763170060"
              className="mt-6 text-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-accent"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
