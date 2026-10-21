"use client";
import { motion } from "framer-motion";
import { useLang } from "./Providers";
import { config } from "../lib/config";

const COLS = 10;
const ROWS = 6;
const cells = Array.from({ length: COLS * ROWS }, (_, i) => ({ i, lit: (i * 7 + 3) % 11 === 0 || (i * 5) % 13 === 0 }));

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 grid w-full max-w-xl grid-cols-10 gap-1.5 p-4 opacity-30 sm:w-1/2 sm:opacity-70"
        style={{ gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      >
        {cells.map((c) => (
          <motion.span
            key={c.i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: c.i * 0.025, duration: 0.45 }}
            className={`rounded-sm ${c.lit ? "bg-sun" : "bg-white/10"}`}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <p className="inline-block rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/90">{h.tag}</p>
        <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">{h.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{h.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#quiz" className="rounded-xl bg-sun px-6 py-3.5 font-bold text-ink transition hover:brightness-110">{h.cta1}</a>
          <a href="#report" className="rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">{h.cta2}</a>
        </div>
        <p className="mt-5 text-sm text-white/70">{h.note}</p>
        <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-sun">
          {config.hashtags.map((x) => <span key={x}>{x}</span>)}
        </p>
      </div>
    </section>
  );
}
