import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";
import { Star } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Meraki Karting" },
      { name: "description", content: "We're fuelling Uganda's motorsport future. Meet the team behind Meraki Karting." },
      { property: "og:title", content: "About Meraki Karting" },
      { property: "og:description", content: "Our story, mission, and the people building Uganda's motorsport future." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mesh-bg pt-40 pb-28 -mt-16">
        <div className="container-prose pt-16 text-center max-w-4xl">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="headline-display text-5xl md:text-8xl">
            We're fuelling Uganda's <span className="text-gradient-accent">motorsport future.</span>
          </h1>
          <GoldStroke className="mx-auto mt-8" />
        </div>
      </section>

      <Section light>
        <div className="max-w-3xl mx-auto text-[#1A0A14] text-lg leading-relaxed space-y-6">
          <p>
            Meraki — a Greek word meaning to do something with soul, creativity, and love.
            That's exactly what we set out to do when we built Uganda's first proper go-karting venue.
          </p>
          <p>
            Founded in 2022 by motorsport enthusiasts who grew tired of watching the sport from
            afar, Meraki Karting opened its doors in Bugolobi with one mission: bring world-class
            karting to East Africa, and make it accessible to everyone.
          </p>
          <p>
            Today, we host the official Uganda National Karting Championship, run weekly community
            race nights, and welcome thousands of first-time drivers each year. We've been featured
            on NTV Uganda and grown a community of over 8,900 racers and fans.
          </p>
          <p className="font-display italic font-black text-3xl text-center !mt-12">
            "Speed is universal. Joy is universal. We just built the place where they meet."
          </p>
        </div>
      </Section>

      <Section>
        <Eyebrow>What we stand for</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl mb-12">Mission · Vision · Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Mission", b: "To grow Uganda's motorsport scene by giving everyone access to safe, world-class karting." },
            { t: "Vision", b: "A future where Ugandan racers compete on the world stage — and Meraki is where they started." },
            { t: "Values", b: "Safety first. Hospitality always. Speed unapologetically." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-[color:var(--color-bg-card)] p-8 relative">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-accent rounded-t-2xl" />
              <h3 className="font-display italic font-black text-2xl mb-3 text-[color:var(--color-accent-gold)]">{c.t}</h3>
              <p className="text-[color:var(--color-text-muted)]">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-gradient-hero py-24">
        <div className="container-prose text-center">
          <div className="font-accent text-8xl md:text-9xl text-[color:var(--color-accent-red)]">4.4 ★</div>
          <div className="text-[color:var(--color-text-muted)] uppercase tracking-widest text-sm mt-2">Google Reviews</div>
          <div className="grid md:grid-cols-3 gap-6 mt-14 max-w-5xl mx-auto text-left">
            {[
              { n: "Aisha K.", r: "Best afternoon out in Kampala. Karts were quick, staff were brilliant. Booking again." },
              { n: "David M.", r: "Took my whole team here for a corporate day. Everyone was buzzing. 10/10 organisation." },
              { n: "Patrick L.", r: "Track is the real deal. As close to motorsport as you'll find in Uganda right now." },
            ].map((r) => (
              <div key={r.n} className="rounded-2xl bg-[color:var(--color-bg-card)] p-6">
                <div className="flex text-[color:var(--color-accent-gold)] mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-white/90 italic">"{r.r}"</p>
                <div className="mt-4 text-sm text-[color:var(--color-text-muted)]">— {r.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section light>
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow>In the Media</Eyebrow>
          <h2 className="headline-display text-4xl md:text-5xl text-[#1A0A14] mb-8">Featured on NTV Uganda</h2>
          <p className="text-[#1A0A14]/70 mb-6">Watch our coverage of the National Karting Championship season.</p>
          <a href="#" className="inline-block px-6 py-3 rounded-full font-semibold border-2 border-[#1A0A14] text-[#1A0A14] hover:bg-[#1A0A14] hover:text-white transition">
            Watch the Feature
          </a>
        </div>
      </Section>
    </>
  );
}
