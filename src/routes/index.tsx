import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Flag, Users, Trophy, ArrowRight } from "lucide-react";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meraki Karting — Feel The Rush | Uganda's Premier Karting Venue" },
      { name: "description", content: "Bugolobi's go-karting arena — built for speed, open to everyone. Book your session today." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden mesh-bg -mt-16 pt-16">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 24px)"
        }} />
        <div className="container-prose relative z-10 grid md:grid-cols-2 gap-10 items-center py-20">
          <div className="fade-up">
            <Eyebrow>Uganda's Premier Karting Venue</Eyebrow>
            <h1 className="headline-display text-6xl md:text-8xl">
              Feel<br />
              <span className="text-gradient-accent">The Rush.</span>
            </h1>
            <div className="gold-stroke mt-6 mb-8" style={{ width: 180 }} />
            <p className="text-lg text-[color:var(--color-text-muted)] max-w-md">
              Bugolobi's go-karting arena — built for speed, open to everyone.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/sessions" className="px-7 py-3.5 rounded-full font-semibold bg-gradient-accent text-white hover:opacity-90 transition">
                Book a Session
              </Link>
              <Link to="/track" className="px-7 py-3.5 rounded-full font-semibold border border-[color:var(--color-accent-gold)] text-[color:var(--color-accent-gold)] hover:bg-[color:var(--color-accent-gold)]/10 transition inline-flex items-center gap-2">
                Explore the Track <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img
              src="https://images.quicket.co.za/0454873_0.png"
              alt="Meraki karting driver"
              className="rounded-2xl object-cover w-full aspect-[4/5] shadow-2xl"
              style={{ boxShadow: "0 30px 80px -20px rgba(212,0,31,0.4)" }}
            />
          </div>
        </div>
        <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* STATS */}
      <section id="stats" className="bg-[color:var(--color-bg-surface)] py-10 border-y border-[color:var(--color-border)]">
        <div className="container-prose grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["6", "Days / Week"],
            ["15 min", "From UGX 75K"],
            ["4.4 ★", "Google Rating"],
            ["Est. 2022", "Kampala, Uganda"],
          ].map(([big, small], i) => (
            <div key={i} className="relative">
              <div className="font-accent text-4xl md:text-5xl text-white">{big}</div>
              <div className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)] mt-2">{small}</div>
              {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-[color:var(--color-accent-gold)]/40 to-transparent" />}
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY (light) */}
      <Section light>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="headline-display text-5xl md:text-6xl text-[#1A0A14]">
              Born from a passion for speed.
            </h2>
            <GoldStroke className="mt-6 mb-8" />
            <p className="text-lg text-[#1A0A14]/80 mb-4">
              Founded by motorsport enthusiasts to bring world-class karting to Uganda.
              Home to national championships and a place for everyone — from first-timers
              to seasoned racers.
            </p>
            <p className="text-lg text-[#1A0A14]/80">
              We built Meraki to share the thrill of motorsport with the next generation
              of Ugandan racers.
            </p>
          </div>
          <img
            src="https://images.quicket.co.za/0454873_0.png"
            alt="Meraki venue"
            className="rounded-2xl w-full aspect-[4/3] object-cover"
          />
        </div>
      </Section>

      {/* WHY MERAKI */}
      <Section>
        <Eyebrow>Why Meraki</Eyebrow>
        <h2 className="headline-display text-4xl md:text-6xl mb-16 max-w-3xl">
          More than a track. <span className="text-gradient-accent">An experience.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Flag />, title: "Pro-Grade Karts", body: "Fleet optimized for maximum performance and safety." },
            { icon: <Users />, title: "Everyone Welcome", body: "Ages 7+ (excluding pregnant mothers). No experience needed." },
            { icon: <Trophy />, title: "Championship Pedigree", body: "Official host of Uganda's National Karting Championship." },
          ].map((c) => (
            <div key={c.title} className="relative rounded-2xl p-8 bg-[color:var(--color-bg-card)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-accent" />
              <div className="text-[color:var(--color-accent-gold)] mb-4">{c.icon}</div>
              <h3 className="font-display italic font-black text-2xl mb-3">{c.title}</h3>
              <p className="text-[color:var(--color-text-muted)]">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TRACK PREVIEW */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.quicket.co.za/0454876_0.png"
          alt="MasterKraft Circuit"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,10,20,0.5), rgba(26,10,20,0.85))" }} />
        <div className="relative z-10 text-center container-prose">
          <Eyebrow>The Circuit</Eyebrow>
          <h2 className="headline-display text-5xl md:text-7xl mb-6">The MasterKraft Circuit</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            One track. Engineered for maximum excitement. Every corner designed to test your limits.
          </p>
          <Link to="/track" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-white text-[#1A0A14] hover:bg-[color:var(--color-accent-gold)] transition">
            See The Track <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* COMMUNITY */}
      <Section>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Join the Community</Eyebrow>
          <h2 className="headline-display text-4xl md:text-6xl">
            8,900+ followers <br /><span className="text-gradient-accent">and counting.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "https://images.quicket.co.za/0454876_0.png",
            "https://images.quicket.co.za/0454878_0.jpeg",
            "https://images.quicket.co.za/0454873_0.png",
            "https://images.quicket.co.za/0454878_0.jpeg",
            "https://images.quicket.co.za/0454876_0.png",
            "https://images.quicket.co.za/0454873_0.png",
          ].map((src, i) => (
            <a key={i} href="https://instagram.com/merakikarting" className="group relative block aspect-square overflow-hidden rounded-xl">
              <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#1A0A14]/0 group-hover:bg-[#1A0A14]/40 transition" />
            </a>
          ))}
        </div>
      </Section>

      {/* BOOKING CTA */}
      <section className="bg-gradient-accent py-20">
        <div className="container-prose text-center">
          <h2 className="headline-display text-5xl md:text-7xl text-white">Ready to Race?</h2>
          <p className="text-white/90 mt-6 text-lg">
            Open Tue–Sun · 9AM–7PM · Old Portbell Road, Bugolobi
          </p>
          <a
            href="https://wa.me/256763170060?text=Hi!%20I'd%20like%20to%20book%20a%20karting%20session."
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-[#1A0A14] text-white hover:bg-black transition"
          >
            WhatsApp Us to Book
          </a>
        </div>
      </section>
    </>
  );
}
