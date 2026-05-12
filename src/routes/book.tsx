import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Section, Eyebrow, GoldStroke } from "@/components/site/Section";
import { ChevronLeft, ChevronRight, Check, Clock, User, Phone, Trash2 } from "lucide-react seed".replace(" seed", "")  as any; // placeholder fix

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — Meraki Karting" },
      { name: "description", content: "Reserve your karting slot. Pick a date, time, and tier. Pending until staff confirms." },
    ],
  }),
  component: BookPage,
  ssr: false,
});

type Tier = { id: "sprint" | "pro"; name: string; minutes: number; price: string };
const TIERS: Tier[] = [
  { id: "sprint", name: "Sprint", minutes: 15, price: "UGX 75,000" },
  { id: "pro", name: "Pro", minutes: 30, price: "UGX 100,000" },
];

type Status = "pending" | "confirmed" | "rejected";
type Booking = {
  id: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:MM
  minutes: number;
  tier: Tier["id"];
  name: string;
  phone: string;
  status: Status;
  createdAt: number;
};

const STORAGE_KEY = "meraki.bookings.v1";
const OPEN_HOUR = 10;
const CLOSE_HOUR = 22;
const SLOT_MIN = 15;

function pad(n: number) { return n.toString().padStart(2, "0"); }
function ymd(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function toMin(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function fromMin(m: number) { return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`; }

function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveBookings(b: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(b));
}

function buildSlots(): string[] {
  const out: string[] = [];
  for (let m = OPEN_HOUR * 60; m < CLOSE_HOUR * 60; m += SLOT_MIN) out.push(fromMin(m));
  return out;
}

function overlaps(date: string, startMin: number, endMin: number, bookings: Booking[]) {
  return bookings.find((b) => {
    if (b.date !== date || b.status === "rejected") return false;
    const s = toMin(b.start);
    const e = s + b.minutes;
    return startMin < e && s < endMin;
  });
}

function BookPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => { setBookings(loadBookings()); }, []);

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [selectedDate, setSelectedDate] = useState<string>(() => ymd(new Date()));
  const [tier, setTier] = useState<Tier>(TIERS[0]);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [showAdmin, setShowAdmin] = useState(false);

  const slots = useMemo(() => buildSlots(), []);

  const dayCells = useMemo(() => {
    const first = new Date(month);
    const startOffset = (first.getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells: { date: Date | null; key: string }[] = [];
    for (let i = 0; i < startOffset; i++) cells.push({ date: null, key: `e${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(month.getFullYear(), month.getMonth(), d);
      cells.push({ date: dt, key: ymd(dt) });
    }
    while (cells.length % 7) cells.push({ date: null, key: `t${cells.length}` });
    return cells;
  }, [month]);

  const dayLoad = (dateStr: string) => {
    const active = bookings.filter((b) => b.date === dateStr && b.status !== "rejected");
    const totalMinUsed = active.reduce((a, b) => a + b.minutes, 0);
    const capacity = (CLOSE_HOUR - OPEN_HOUR) * 60;
    return { count: active.length, ratio: totalMinUsed / capacity };
  };

  const slotStatus = (s: string): "free" | "pending" | "confirmed" => {
    const start = toMin(s);
    const end = start + tier.minutes;
    const hit = overlaps(selectedDate, start, end, bookings);
    if (!hit) return "free";
    return hit.status === "confirmed" ? "confirmed" : "pending";
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot || !form.name || !form.phone) return;
    const newB: Booking = {
      id: Math.random().toString(36).slice(2),
      date: selectedDate,
      start: slot,
      minutes: tier.minutes,
      tier: tier.id,
      name: form.name,
      phone: form.phone,
      status: "pending",
      createdAt: Date.now(),
    };
    const next = [...bookings, newB];
    setBookings(next);
    saveBookings(next);
    setSlot(null);
    setForm({ name: "", phone: "" });
    const text = `Hi Meraki!%0ANew booking request%0AName: ${newB.name}%0APhone: ${newB.phone}%0ATier: ${tier.name} (${tier.minutes}min)%0ADate: ${newB.date}%0ATime: ${newB.start}`;
    window.open(`https://wa.me/256763170060?text=${text}`, "_blank");
  };

  const updateStatus = (id: string, status: Status) => {
    const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(next); saveBookings(next);
  };
  const remove = (id: string) => {
    const next = bookings.filter((b) => b.id !== id);
    setBookings(next); saveBookings(next);
  };

  const monthLabel = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const isPastDate = (d: Date) => d < today;

  return (
    <>
      <section className="mesh-bg pt-32 pb-16 -mt-16">
        <div className="container-prose pt-12 text-center">
          <Eyebrow>Reserve</Eyebrow>
          <h1 className="headline-display text-5xl md:text-7xl">Book a Session</h1>
          <GoldStroke className="mx-auto mt-6" />
          <p className="text-[color:var(--color-text-muted)] mt-6 max-w-xl mx-auto">
            Pick a date, choose your tier, and lock in a free time slot. Bookings start as <span className="text-[color:var(--color-accent-gold)]">pending</span> until staff confirm.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10">
          {/* Calendar */}
          <div className="bg-[color:var(--color-bg-card)] p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="p-2 hover:bg-white/5"><ChevronLeft /></button>
              <div className="font-display italic font-black text-2xl">{monthLabel}</div>
              <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="p-2 hover:bg-white/5"><ChevronRight /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-widest text-[color:var(--color-text-muted)] mb-2">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <div key={d} className="text-center py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {dayCells.map((c) => {
                if (!c.date) return <div key={c.key} />;
                const ds = ymd(c.date);
                const past = isPastDate(c.date);
                const selected = ds === selectedDate;
                const { count, ratio } = dayLoad(ds);
                const heat = ratio > 0.66 ? "bg-[color:var(--color-accent-red)]/30" : ratio > 0.33 ? "bg-[color:var(--color-accent-gold)]/20" : count > 0 ? "bg-white/5" : "";
                return (
                  <button
                    key={c.key}
                    disabled={past}
                    onClick={() => { setSelectedDate(ds); setSlot(null); }}
                    className={`aspect-square flex flex-col items-center justify-center text-sm border transition ${selected ? "border-[color:var(--color-accent-gold)] bg-[color:var(--color-accent-gold)]/10" : "border-transparent"} ${past ? "opacity-30 cursor-not-allowed" : "hover:border-white/30"} ${heat}`}
                  >
                    <span className={selected ? "text-[color:var(--color-accent-gold)] font-bold" : ""}>{c.date.getDate()}</span>
                    {count > 0 && <span className="text-[9px] text-[color:var(--color-text-muted)] mt-0.5">{count}</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-6 text-xs text-[color:var(--color-text-muted)]">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-white/5 inline-block" /> Light</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[color:var(--color-accent-gold)]/30 inline-block" /> Filling</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[color:var(--color-accent-red)]/40 inline-block" /> Busy</span>
            </div>
          </div>

          {/* Slot picker + form */}
          <div>
            <Eyebrow>Tier</Eyebrow>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setTier(t); setSlot(null); }}
                  className={`p-4 text-left border transition ${tier.id === t.id ? "border-[color:var(--color-accent-gold)] bg-[color:var(--color-accent-gold)]/5" : "border-[color:var(--color-border)] hover:border-white/30"}`}
                >
                  <div className="font-display italic font-black text-xl">{t.name}</div>
                  <div className="text-xs text-[color:var(--color-text-muted)] uppercase tracking-widest mt-1">{t.minutes} min</div>
                  <div className="text-[color:var(--color-accent-gold)] font-accent text-2xl mt-2">{t.price}</div>
                </button>
              ))}
            </div>

            <Eyebrow>Times — {new Date(selectedDate + "T00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</Eyebrow>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
              {slots.map((s) => {
                const status = slotStatus(s);
                const disabled = status !== "free";
                const selected = slot === s;
                return (
                  <button
                    key={s}
                    disabled={disabled}
                    onClick={() => setSlot(s)}
                    title={status}
                    className={`text-xs py-2 border transition ${
                      selected ? "border-[color:var(--color-accent-gold)] bg-[color:var(--color-accent-gold)] text-[#1A0A14] font-bold" :
                      status === "confirmed" ? "border-transparent bg-[color:var(--color-accent-red)]/30 text-white/40 line-through cursor-not-allowed" :
                      status === "pending" ? "border-transparent bg-[color:var(--color-accent-gold)]/15 text-white/50 cursor-not-allowed" :
                      "border-[color:var(--color-border)] hover:border-[color:var(--color-accent-gold)]"
                    }`}
                  >{s}</button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-[color:var(--color-text-muted)] mb-6">
              <span className="flex items-center gap-2"><span className="w-3 h-3 border border-[color:var(--color-border)] inline-block" /> Free</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[color:var(--color-accent-gold)]/30 inline-block" /> Pending</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[color:var(--color-accent-red)]/40 inline-block" /> Confirmed</span>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="block text-xs text-[color:var(--color-text-muted)] uppercase tracking-widest mb-1">Your Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[color:var(--color-bg-card)] px-4 py-3 text-white outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]" />
              </div>
              <div>
                <label className="block text-xs text-[color:var(--color-text-muted)] uppercase tracking-widest mb-1">WhatsApp Number</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[color:var(--color-bg-card)] px-4 py-3 text-white outline-none border border-transparent focus:border-[color:var(--color-accent-gold)]" />
              </div>
              <button
                type="submit"
                disabled={!slot}
                className="w-full px-6 py-4 font-bold bg-gradient-accent text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {slot ? `Request ${tier.name} @ ${slot}` : "Pick a time slot"}
              </button>
              <p className="text-xs text-[color:var(--color-text-muted)] text-center">A WhatsApp message will open so staff can confirm your booking.</p>
            </form>
          </div>
        </div>
      </Section>

      <Section light>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Eyebrow>Reservations</Eyebrow>
            <h2 className="headline-display text-3xl md:text-4xl text-[#1A0A14]">All bookings</h2>
          </div>
          <button onClick={() => setShowAdmin((v) => !v)} className="text-xs uppercase tracking-widest border border-[#1A0A14]/20 px-3 py-2 text-[#1A0A14] hover:bg-[#1A0A14] hover:text-white">
            {showAdmin ? "Hide" : "Staff"} controls
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-[#1A0A14]/60">No bookings yet — be the first to reserve.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-[#1A0A14]">
              <thead className="text-xs uppercase tracking-widest text-[#1A0A14]/60">
                <tr><th className="text-left py-2">Date</th><th className="text-left">Time</th><th className="text-left">Tier</th><th className="text-left">Name</th><th className="text-left">Phone</th><th className="text-left">Status</th>{showAdmin && <th />}</tr>
              </thead>
              <tbody>
                {[...bookings].sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start)).map((b) => (
                  <tr key={b.id} className="border-t border-[#1A0A14]/10">
                    <td className="py-3">{b.date}</td>
                    <td>{b.start} <span className="text-[#1A0A14]/40">({b.minutes}m)</span></td>
                    <td className="capitalize">{b.tier}</td>
                    <td>{b.name}</td>
                    <td>{b.phone}</td>
                    <td>
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${
                        b.status === "confirmed" ? "bg-green-600 text-white" :
                        b.status === "rejected" ? "bg-[#1A0A14]/20 text-[#1A0A14]/60 line-through" :
                        "bg-[color:var(--color-accent-gold)] text-[#1A0A14]"
                      }`}>{b.status}</span>
                    </td>
                    {showAdmin && (
                      <td className="text-right">
                        <div className="flex gap-1 justify-end">
                          {b.status !== "confirmed" && <button onClick={()=>updateStatus(b.id,"confirmed")} className="p-1.5 bg-green-600 text-white" title="Confirm"><Check size={14}/></button>}
                          {b.status !== "rejected" && <button onClick={()=>updateStatus(b.id,"rejected")} className="p-1.5 bg-[#1A0A14] text-white" title="Reject"><Clock size={14}/></button>}
                          <button onClick={()=>remove(b.id)} className="p-1.5 bg-[color:var(--color-accent-red)] text-white" title="Delete"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
}
