import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";
import { Trophy, Cake, Building2, PartyPopper } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Race Days — Meraki Karting" },
      { name: "description", content: "National championships, birthdays, corporate days, and public race nights at Meraki Karting." },
      { property: "og:title", content: "Race Days & Events — Meraki Karting" },
      { property: "og:description", content: "Host your event at Uganda's premier karting venue." },
      { property: "og:image", content: "https://images.quicket.co.za/0454878_0.jpeg" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [form, setForm] = useState({ name: "", phone: "", type: "Birthday", date: "", size: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Meraki!%0AEvent Inquiry%0AName: ${form.name}%0APhone: ${form.phone}%0AType: ${form.type}%0ADate: ${form.date}%0AGroup size: ${form.size}%0A%0A${form.message}`;
    window.open(`https://wa.me/256763170060?text=${text}`, "_blank");
  };

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden -mt-16">
        <img src="https://images.quicket.co.za/0454878_0.jpeg" alt="Race day at Meraki" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,10,20,0.3), rgba(26,10,20,0.92))" }} />
        <div className="container-prose relative z-10 pb-14">
          <Eyebrow>Events</Eyebrow>
          <h1 className="headline-display text-5xl md:text-7xl">Race Days & Events</h1>
          <GoldStroke className="mt-6" />
        </div>
      </section>

      <Section>
        <Eyebrow>What we host</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl mb-12">Big races. Bigger memories.</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: <Trophy />, t: "National Championship", b: "Uganda's official karting championship season." },
            { icon: <Cake />, t: "Birthday Packages", b: "Custom packages for kids and adults — race, food, photos." },
            { icon: <Building2 />, t: "Corporate Race Days", b: "Team-building with adrenaline. Private track hire available." },
            { icon: <PartyPopper />, t: "Open Public Sessions", b: "Drop in any time during open hours and race." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl p-8 bg-[color:var(--color-bg-card)] relative">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-accent rounded-t-2xl" />
              <div className="text-[color:var(--color-accent-gold)] mb-4">{c.icon}</div>
              <h3 className="font-display italic font-black text-2xl mb-2">{c.t}</h3>
              <p className="text-[color:var(--color-text-muted)]">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section light>
        <Eyebrow>Past Events</Eyebrow>
        <h2 className="headline-display text-4xl md:text-5xl text-[#1A0A14] mb-10">Moments from the track.</h2>
        <div className="columns-2 md:columns-3 gap-4 [&>img]:mb-4">
          {[
            "https://images.quicket.co.za/0454876_0.png",
            "https://images.quicket.co.za/0454878_0.jpeg",
            "https://images.quicket.co.za/0454873_0.png",
            "https://images.quicket.co.za/0454878_0.jpeg",
            "https://images.quicket.co.za/0454876_0.png",
            "https://images.quicket.co.za/0454873_0.png",
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="w-full rounded-xl break-inside-avoid" />
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl mx-auto">
          <Eyebrow>Host Your Event</Eyebrow>
          <h2 className="headline-display text-4xl md:text-5xl mb-8">Plan your race day.</h2>
          <form onSubmit={submit} className="space-y-4">
            {[
              ["name", "Your Name", "text"],
              ["phone", "WhatsApp Number", "tel"],
              ["date", "Preferred Date", "date"],
              ["size", "Group Size", "number"],
            ].map(([k, label, type]) => (
              <div key={k}>
                <label className="block text-sm text-[color:var(--color-text-muted)] mb-1">{label}</label>
                <input
                  required
                  type={type}
                  value={(form as any)[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="w-full bg-[color:var(--color-bg-card)] rounded-lg px-4 py-3 text-white placeholder-white/40 outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm text-[color:var(--color-text-muted)] mb-1">Event Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-[color:var(--color-bg-card)] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]"
              >
                {["Birthday", "Corporate", "Private Hire", "Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[color:var(--color-text-muted)] mb-1">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[color:var(--color-bg-card)] rounded-lg px-4 py-3 text-white outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]"
              />
            </div>
            <button type="submit" className="w-full px-6 py-4 rounded-full font-bold bg-gradient-accent text-white">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
