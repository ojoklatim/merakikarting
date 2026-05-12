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

const pricingData = [
  {
    category: "Single Racer Karts",
    types: [
      { 
        name: "Cadets", 
        weekday: { "15min": "50,000", "30min": "75,000" }, 
        weekend: { "15min": "65,000", "30min": "100,000" } 
      },
      { 
        name: "Pro-Racer", 
        weekday: { "15min": "50,000", "30min": "75,000" }, 
        weekend: { "15min": "65,000", "30min": "100,000" } 
      },
    ]
  },
  {
    category: "Two Seater Karts",
    types: [
      { 
        name: "Individual & Marshall", 
        weekday: { "15min": "50,000", "30min": "75,000" }, 
        weekend: { "15min": "65,000", "30min": "100,000" } 
      },
      { 
        name: "Self Driven", 
        weekday: { "15min": "100,000", "30min": "150,000" }, 
        weekend: { "15min": "130,000", "30min": "200,000" } 
      },
    ]
  }
];

function SessionsPage() {
  return (
    <>
      <PageHero eyebrow="Sessions" title="Choose Your Race" />

      <Section>
        <div className="text-center mb-16">
          <Eyebrow>Standard Pricing</Eyebrow>
          <h2 className="headline-display text-4xl md:text-6xl">Find your perfect race.</h2>
          <p className="text-[color:var(--color-text-muted)] mt-4">All sessions have a 30-day validity.</p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {pricingData.map((cat) => (
            <div key={cat.category}>
              <h3 className="font-display italic font-black text-3xl mb-8 text-center md:text-left border-l-4 border-[color:var(--color-accent-gold)] pl-4">{cat.category}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {cat.types.map((t) => (
                  <div key={t.name} className="bg-[color:var(--color-bg-card)] rounded-2xl overflow-hidden border border-[color:var(--color-border)]">
                    <div className="bg-gradient-accent p-4">
                      <h4 className="font-display italic font-black text-2xl text-white">{t.name}</h4>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-text-muted)]">Tue – Thu</div>
                          <div>
                            <div className="text-sm text-white/60">15 Minutes</div>
                            <div className="text-2xl font-accent text-[color:var(--color-accent-gold)]">UGX {t.weekday["15min"]}</div>
                          </div>
                          <div>
                            <div className="text-sm text-white/60">30 Minutes</div>
                            <div className="text-2xl font-accent text-[color:var(--color-accent-gold)]">UGX {t.weekday["30min"]}</div>
                          </div>
                        </div>
                        <div className="space-y-4 border-l border-[color:var(--color-border)] pl-4">
                          <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-accent-gold)]">Fri – Sun</div>
                          <div>
                            <div className="text-sm text-white/60">15 Minutes</div>
                            <div className="text-2xl font-accent text-white">UGX {t.weekend["15min"]}</div>
                          </div>
                          <div>
                            <div className="text-sm text-white/60">30 Minutes</div>
                            <div className="text-2xl font-accent text-white">UGX {t.weekend["30min"]}</div>
                          </div>
                        </div>
                      </div>
                      <a href="/book" className="block text-center px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 transition rounded-full text-sm font-bold uppercase tracking-widest">
                        Book {t.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* GrandPrix Section */}
          <div className="relative rounded-2xl bg-[color:var(--color-bg-card)] border-2 border-[color:var(--color-accent-gold)] overflow-hidden">
            <div className="grid md:grid-cols-[1fr_auto] items-center">
              <div className="p-8 md:p-12">
                <div className="inline-block px-3 py-1 bg-[color:var(--color-accent-gold)] text-[#1A0A14] text-[10px] font-black uppercase tracking-widest mb-4">Group Event</div>
                <h3 className="headline-display text-5xl md:text-6xl mb-4">GrandPrix</h3>
                <p className="text-[color:var(--color-text-muted)] mb-8 text-lg max-w-md">
                  The ultimate group competition. Required: 6–8 people. 
                  Includes Warm-up, Practice, Qualifiers, and a Final Race.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-text-muted)] mb-1">Format</div>
                    <div className="text-lg font-bold">4-Stage Race</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-text-muted)] mb-1">Pricing</div>
                    <div className="text-3xl font-accent text-[color:var(--color-accent-gold)]">UGX 150,000 <span className="text-sm opacity-60">/ Person</span></div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-accent p-8 md:p-12 h-full flex flex-col justify-center items-center text-center">
                <Trophy size={48} className="text-white mb-6" />
                <a href="https://wa.me/256763170060?text=Hi!%20I'd%20like%20to%20book%20a%20GrandPrix%20session%20for%20a%20group." className="px-8 py-4 bg-[#1A0A14] text-white font-bold rounded-full hover:bg-black transition whitespace-nowrap">
                  Book GrandPrix
                </a>
              </div>
            </div>
          </div>
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
