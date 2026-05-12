import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";
import { MapPin, Bike, Bus, Car } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "The MasterKraft Circuit — Meraki Karting" },
      { name: "description", content: "One track. Engineered for excitement. Home of Uganda's National Karting Championship." },
      { property: "og:title", content: "The MasterKraft Circuit" },
      { property: "og:description", content: "Track specs, location, and championship pedigree." },
      { property: "og:image", content: "https://images.quicket.co.za/0454876_0.png" },
    ],
  }),
  component: TrackPage,
});

const blocks = [
  { eyebrow: "Location", title: "Bugolobi, Kampala", body: "Located on Old Portbell Road in the heart of Kampala — easy access from the city.", img: "https://images.quicket.co.za/0454873_0.png" },
  { eyebrow: "Surface", title: "Pro-grade tarmac", body: "Smooth, grippy tarmac engineered for karting. Excellent traction in dry and wet.", img: "https://images.quicket.co.za/0454876_0.png" },
  { eyebrow: "Safety", title: "FIA-aligned barriers", body: "Tyre walls, run-off zones, and trained marshals on every shift.", img: "https://images.quicket.co.za/0454878_0.jpeg" },
  { eyebrow: "Fleet", title: "Performance karts", body: "A modern fleet maintained to the highest standard, suitable for ages 7 and up.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB34eFOPY4sF8LBWkRziDOTXQtRT1Y6CIuZQ&s" },
];

function TrackPage() {
  return (
    <>
      <section className="relative h-[80vh] min-h-[500px] flex items-end overflow-hidden -mt-16">
        <img src="https://images.quicket.co.za/0454876_0.png" alt="MasterKraft Circuit aerial" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,10,20,0.4) 0%, rgba(26,10,20,0.95) 100%)" }} />
        <div className="container-prose relative z-10 pb-16">
          <Eyebrow>The Circuit</Eyebrow>
          <h1 className="headline-display text-5xl md:text-8xl">The MasterKraft Circuit</h1>
          <GoldStroke className="mt-6" />
        </div>
      </section>

      <Section>
        {blocks.map((b, i) => (
          <div key={b.eyebrow} className={`grid md:grid-cols-2 gap-12 items-center mb-24 last:mb-0 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
            <div className="[direction:ltr]">
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <h2 className="headline-display text-4xl md:text-5xl mb-6">{b.title}</h2>
              <p className="text-lg text-[color:var(--color-text-muted)] max-w-md">{b.body}</p>
            </div>
            <img src={b.img} alt={b.title} className="rounded-2xl w-full aspect-[4/3] object-cover [direction:ltr]" />
          </div>
        ))}
      </Section>

      <section className="bg-gradient-hero py-28">
        <div className="container-prose text-center max-w-3xl">
          <Eyebrow>Championship Pedigree</Eyebrow>
          <p className="headline-display text-3xl md:text-5xl italic mt-6">
            "Home of Uganda's National Karting Championship — season after season."
          </p>
          <div className="gold-stroke mx-auto mt-8" />
          <div className="mt-8 inline-block px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full border border-[color:var(--color-accent-gold)]/40 text-[color:var(--color-accent-gold)]">
            As featured on NTV Uganda
          </div>
        </div>
      </section>

      <Section light>
        <Eyebrow>Getting Here</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl text-[#1A0A14] mb-10">Easy to find. Hard to leave.</h2>
        <div className="rounded-2xl overflow-hidden border border-black/10 mb-8">
          <iframe
            title="Meraki Karting location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.027627930574!2d32.618452732831244!3d0.3179018523151721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db9b05ca242a5%3A0x6bf4857eac843e90!2sMeraki%20Karting!5e0!3m2!1sen!2sug!4v1778580976789!5m2!1sen!2sug"
            className="w-full h-[400px]"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: <Car />, t: "By Car", b: "Free parking on-site." },
            { icon: <Bike />, t: "Boda Boda", b: "Drop-off at the main gate." },
            { icon: <Bus />, t: "Matatu", b: "Bugolobi-bound taxis stop nearby." },
          ].map((i) => (
            <div key={i.t} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-[color:var(--color-accent-red)]">{i.icon}</div>
              <div className="font-bold mt-3 text-[#1A0A14]">{i.t}</div>
              <div className="text-sm text-[#1A0A14]/70 mt-1">{i.b}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border-2 border-[color:var(--color-accent-gold)] bg-[color:var(--color-accent-gold)]/10 p-6 flex gap-4 items-start">
          <MapPin className="text-[color:var(--color-accent-red)] shrink-0 mt-1" />
          <div className="text-[#1A0A14]">
            <div className="font-bold">Look for these landmarks:</div>
            <div className="text-sm mt-1">Opposite the Shell petrol station · Past Silver Springs Hotel · Old Portbell Road, Bugolobi</div>
          </div>
        </div>
      </Section>
    </>
  );
}
