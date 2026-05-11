import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";
import { Check, X, Phone, Calendar, Flag, Trophy } from "lucide-react";

export const Route = createFileRoute("/sessions")({
  head: () => ({
    meta: [
      { title: "Sessions & Pricing — Meraki Karting" },
      { name: "description", content: "Choose your race. Sprint, Pro, and Group sessions at Meraki Karting in Bugolobi, Kampala." },
      { property: "og:title", content: "Sessions & Pricing — Meraki Karting" },
      { property: "og:description", content: "From UGX 75,000. Book your karting session today." },
    ],
  }),
  component: SessionsPage,
});

function PageHero({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="mesh-bg pt-32 pb-20 -mt-16">
      <div className="container-prose pt-16 text-center">
        <div className="eyebrow mb-4">{eyebrow}</div>
        <h1 className="headline-display text-5xl md:text-7xl">{title}</h1>
        <div className="gold-stroke mx-auto mt-6" />
      </div>
    </section>
  );
}

const tiers = [
  { name: "Sprint", time: "15 min", price: "UGX 75,000", best: "First-timers", featured: false },
  { name: "Pro", time: "30 min", price: "UGX 100,000", best: "Competitive racers", featured: true },
  { name: "Group", time: "Custom", price: "Call us", best: "6+ people", featured: false },
];

function SessionsPage() {
  return (
    <>
      <PageHero eyebrow="Sessions" title="Choose Your Race" />

      <Section>
        <div className="text-center mb-16">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="headline-display text-4xl md:text-6xl">Find your perfect race.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 bg-[color:var(--color-bg-card)] transition hover:-translate-y-1 ${t.featured ? "md:scale-105 ring-1 ring-[color:var(--color-accent-gold)]/40" : ""}`}
              style={t.featured ? { boxShadow: "0 25px 60px -20px rgba(212,0,31,0.5)" } : {}}
            >
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-accent rounded-t-2xl" />
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-accent text-white">
                  Most Popular
                </div>
              )}
              <h3 className="font-display italic font-black text-3xl">{t.name}</h3>
              <div className="text-[color:var(--color-text-muted)] mt-1 text-sm uppercase tracking-widest">{t.time}</div>
              <div className="font-accent text-5xl mt-6 text-[color:var(--color-accent-gold)]">{t.price}</div>
              <div className="text-sm text-[color:var(--color-text-muted)] mt-2">Best for {t.best}</div>
              <a href="https://wa.me/256763170060" className="mt-8 block text-center px-6 py-3 rounded-full font-semibold bg-gradient-accent text-white">
                Book {t.name}
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section light>
        <Eyebrow>What's Included</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl text-[#1A0A14] mb-10">Everything for the perfect race day.</h2>
        <ul className="grid sm:grid-cols-2 gap-4 text-[#1A0A14]">
          {["Safety helmet provided", "Race briefing", "Lap timing", "Pit lane access", "Photo opportunities", "Trained marshals"].map((i) => (
            <li key={i} className="flex items-center gap-3 text-lg">
              <Check className="text-[color:var(--color-accent-red)]" /> {i}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Eyebrow>Track Rules</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl mb-10">Race smart. Race safe.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[color:var(--color-bg-card)] p-8">
            <h3 className="font-display italic text-2xl text-[color:var(--color-accent-gold)] mb-4">DO</h3>
            <ul className="space-y-3">
              {["Follow marshal instructions", "Wear closed-toe shoes", "Stay in your lane", "Have fun"].map((i) => (
                <li key={i} className="flex gap-3"><Check className="text-green-400 shrink-0" /> {i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-[color:var(--color-bg-card)] p-8">
            <h3 className="font-display italic text-2xl text-[color:var(--color-accent-red)] mb-4">DON'T</h3>
            <ul className="space-y-3">
              {["Bump other karts", "Race under the influence", "Bring loose items on track", "Ignore flag signals"].map((i) => (
                <li key={i} className="flex gap-3"><X className="text-[color:var(--color-accent-red)] shrink-0" /> {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section light>
        <Eyebrow>How to Book</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl text-[#1A0A14] mb-12">Four simple steps.</h2>
        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[3px] bg-gradient-accent opacity-40" />
          {[
            { icon: <Phone />, t: "Call / WhatsApp" },
            { icon: <Calendar />, t: "Confirm Date & Time" },
            { icon: <Flag />, t: "Arrive & Gear Up" },
            { icon: <Trophy />, t: "Race!" },
          ].map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-accent text-white flex items-center justify-center relative z-10">
                {s.icon}
              </div>
              <div className="mt-4 font-semibold text-[#1A0A14]">{s.t}</div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-gradient-hero py-24">
        <div className="container-prose text-center">
          <h2 className="headline-display text-4xl md:text-6xl">Racing is <span className="text-gradient-accent">better together.</span></h2>
          <p className="text-[color:var(--color-text-muted)] mt-6 text-lg">Birthday parties · Corporate team days · Private track hire</p>
          <a href="https://wa.me/256763170060" className="mt-8 inline-block px-8 py-4 rounded-full font-bold bg-gradient-accent text-white">
            Plan a Group Event
          </a>
        </div>
      </section>
    </>
  );
}
