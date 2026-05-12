import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/sessions", label: "Sessions", num: "02" },
  { to: "/track", label: "Track", num: "03" },
  { to: "/events", label: "Events", num: "04" },
  { to: "/book", label: "Book", num: "05" },
  { to: "/about", label: "About", num: "06" },
  { to: "/contact", label: "Contact", num: "07" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(26,10,20,0.85)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="container-prose flex items-center justify-between h-16">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display italic font-black tracking-tight text-lg">MERAKI KARTING</span>
          <span className="bg-gradient-accent h-[2px] w-16 mt-1" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              activeProps={{ className: "text-[color:var(--color-accent-gold)]" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            to="/book"
            className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-gradient-accent hover:opacity-90 transition"
          >
            Book Now
          </Link>
        </div>
        <button className="md:hidden text-white p-2 -mr-2" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#1A0A14] z-40 overflow-y-auto">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-accent" />

          <div className="container-prose pt-8 pb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-text-muted)] mb-4">Menu</div>
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  className="group flex items-baseline gap-4 py-4 border-b border-[color:var(--color-border)] hover:pl-2 transition-all"
                  activeProps={{ className: "text-[color:var(--color-accent-gold)]" }}
                >
                  <span className="text-xs font-mono text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-accent-gold)] w-6">{l.num}</span>
                  <span className="text-3xl font-display italic font-black text-white group-[.active]:text-[color:var(--color-accent-gold)]">{l.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="container-prose py-6">
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="block text-center px-6 py-4 font-bold text-white bg-gradient-accent mb-3"
            >
              Reserve a Slot
            </Link>
            <a
              href="https://wa.me/256763170060?text=Hi!%20I'd%20like%20to%20book%20a%20karting%20session."
              className="flex items-center justify-center gap-2 px-6 py-4 font-semibold text-white border border-[color:var(--color-border)]"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          <div className="container-prose pb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-text-muted)] mb-3">Visit</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2"><MapPin size={16} className="text-[color:var(--color-accent-gold)] mt-0.5 shrink-0" /><span>Old Portbell Rd, Bugolobi, Kampala</span></li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-[color:var(--color-accent-gold)] shrink-0" /><span>+256 763 170060</span></li>
            </ul>
          </div>

          <div className="container-prose pb-10 flex items-center justify-between border-t border-[color:var(--color-border)] pt-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]">Open Tue–Sun · 9AM–7PM</span>
            <div className="flex gap-2">
              <a href="https://instagram.com/merakikarting" aria-label="Instagram" className="p-2 border border-[color:var(--color-border)] hover:bg-white/5"><Instagram size={16} /></a>
              <a href="#" aria-label="Facebook" className="p-2 border border-[color:var(--color-border)] hover:bg-white/5"><Facebook size={16} /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
