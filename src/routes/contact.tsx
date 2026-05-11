import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";
import { MapPin, Phone, Mail, Clock, MessageCircle, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meraki Karting" },
      { name: "description", content: "Get in touch with Meraki Karting. Bugolobi, Kampala. Open Tue–Sun 9AM–7PM." },
      { property: "og:title", content: "Contact Meraki Karting" },
      { property: "og:description", content: "Reach us by WhatsApp, phone, or email — or stop by the track." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  { q: "What ages can race?", a: "Anyone 7 years and up. Pregnant mothers are not allowed for safety." },
  { q: "Do I need experience?", a: "No. We brief every driver before they hit the track." },
  { q: "What should I wear?", a: "Comfortable clothes and closed-toe shoes. Helmets are provided." },
  { q: "Can I book online?", a: "Yes — easiest is WhatsApp. We confirm your slot in minutes." },
  { q: "Do you accept walk-ins?", a: "Yes, but booking ahead guarantees your time slot." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = `Hi Meraki!%0AName: ${form.name}%0APhone: ${form.phone}%0A%0A${form.message}`;
    window.open(`https://wa.me/256763170060?text=${t}`, "_blank");
  };

  return (
    <>
      <section className="mesh-bg pt-40 pb-24 -mt-16">
        <div className="container-prose pt-16 text-center">
          <Eyebrow>Get In Touch</Eyebrow>
          <h1 className="headline-display text-6xl md:text-8xl">Let's Talk.</h1>
          <GoldStroke className="mx-auto mt-6" />
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="headline-display text-3xl md:text-4xl mb-8">Reach us directly.</h2>
            <ul className="space-y-6">
              <li className="flex gap-4"><MapPin className="text-[color:var(--color-accent-gold)] mt-1" /><div><div className="font-semibold">Old Portbell Road</div><div className="text-[color:var(--color-text-muted)] text-sm">Bugolobi, Kampala, Uganda</div></div></li>
              <li className="flex gap-4"><Phone className="text-[color:var(--color-accent-gold)] mt-1" /><div><div className="font-semibold">+256 763 170060</div><div className="text-[color:var(--color-text-muted)] text-sm">Call us anytime during open hours</div></div></li>
              <li className="flex gap-4"><MessageCircle className="text-[color:var(--color-accent-gold)] mt-1" /><div><div className="font-semibold">WhatsApp Booking</div><a href="https://wa.me/256763170060" className="text-[color:var(--color-accent-gold)] text-sm hover:underline">wa.me/256763170060</a></div></li>
              <li className="flex gap-4"><Mail className="text-[color:var(--color-accent-gold)] mt-1" /><div><div className="font-semibold">hello@merakikarting.com</div><div className="text-[color:var(--color-text-muted)] text-sm">For partnerships & press</div></div></li>
              <li className="flex gap-4"><Clock className="text-[color:var(--color-accent-gold)] mt-1" /><div><div className="font-semibold">Tue – Sun · 9AM – 7PM</div><div className="text-[color:var(--color-text-muted)] text-sm">Closed Mondays</div></div></li>
            </ul>
          </div>
          <form onSubmit={submit} className="rounded-2xl bg-[color:var(--color-bg-card)] p-8 space-y-4">
            <h3 className="font-display italic font-black text-2xl mb-2">Send us a message</h3>
            {[["name", "Your Name", "text"], ["phone", "WhatsApp Number", "tel"]].map(([k, l, t]) => (
              <input
                key={k}
                required
                type={t}
                placeholder={l}
                value={(form as any)[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                className="w-full bg-[#1A0A14] rounded-lg px-4 py-3 text-white placeholder-white/40 outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]"
              />
            ))}
            <textarea
              required
              rows={5}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#1A0A14] rounded-lg px-4 py-3 text-white placeholder-white/40 outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]"
            />
            <button className="w-full px-6 py-3.5 rounded-full font-bold bg-gradient-accent text-white">Send via WhatsApp</button>
          </form>
        </div>
      </Section>

      <div className="container-prose pb-12">
        <div className="rounded-2xl overflow-hidden border border-[color:var(--color-border)]">
          <iframe
            title="Meraki location"
            src="https://www.google.com/maps?q=Bugolobi+Kampala+Uganda&output=embed"
            className="w-full h-[420px]"
            loading="lazy"
          />
        </div>
      </div>

      <Section light>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl text-[#1A0A14] mb-10">Quick answers.</h2>
        <div className="max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl bg-white border border-black/5">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex justify-between items-center text-left p-5 text-[#1A0A14] font-semibold"
              >
                {f.q}
                {openIdx === i ? <Minus className="text-[color:var(--color-accent-gold)]" /> : <Plus className="text-[color:var(--color-accent-gold)]" />}
              </button>
              {openIdx === i && <div className="px-5 pb-5 text-[#1A0A14]/70">{f.a}</div>}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
