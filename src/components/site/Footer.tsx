import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#1A0A14] text-white pt-16">
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-accent" />
      <div className="container-prose grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
        <div>
          <div className="font-display italic font-black text-xl">MERAKI KARTING</div>
          <div className="gold-stroke mt-2 mb-4" />
          <p className="text-sm text-[color:var(--color-text-muted)]">
            Uganda's premier karting venue. Built for speed, open to everyone.
          </p>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/sessions", "Sessions"],
              ["/track", "The Track"],
              ["/events", "Events"],
              ["/about", "About"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><MapPin size={16} className="text-[color:var(--color-accent-gold)] mt-0.5" /> Old Portbell Rd, Bugolobi, Kampala</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-[color:var(--color-accent-gold)]" /> +256 763 170060</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-[color:var(--color-accent-gold)]" /> hello@merakikarting.com</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Follow</h4>
          <div className="flex gap-3">
            <a href="https://instagram.com/merakikarting" aria-label="Instagram" className="p-2 rounded-full border border-[color:var(--color-border)] hover:bg-white/5"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-[color:var(--color-border)] hover:bg-white/5"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
      <div className="container-prose border-t border-[color:var(--color-border)] py-6 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
        <span>© 2025 Meraki Karting Uganda. All rights reserved.</span>
        <span>Bugolobi · Open Tue–Sun · 9AM–7PM</span>
      </div>
      <div className="checkered-strip" />
    </footer>
  );
}
