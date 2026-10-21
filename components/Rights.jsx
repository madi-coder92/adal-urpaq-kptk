"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./Providers";

export default function Rights() {
  const { t } = useLang();
  const r = t.rights;
  const [open, setOpen] = useState(0);
  return (
    <section id="rights" className="scroll-mt-16 bg-mist py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{r.title}</h2>
        <p className="mt-3 text-ink/75">{r.lead}</p>
        <ul className="mt-8 space-y-3">
          {r.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="rounded-2xl bg-white ring-1 ring-ink/10">
                <h3>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={`right-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold"
                  >
                    <span>{it.t}</span>
                    <motion.span aria-hidden animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl leading-none text-sky">+</motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`right-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-3 px-5 pb-5 text-ink/85">
                        <p>{it.b}</p>
                        <p className="rounded-xl bg-sun/25 p-3 text-sm font-semibold">{it.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-ink/70">{r.legal}</p>
      </div>
    </section>
  );
}
