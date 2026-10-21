"use client";
import { useLang } from "./Providers";

export default function Pilot() {
  const { t } = useLang();
  const p = t.pilot;
  return (
    <section id="pilot" className="scroll-mt-16 bg-ink py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{p.title}</h2>
        <p className="mt-3 max-w-xl text-white/80">{p.lead}</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ol className="space-y-4">
            {p.steps.map((s) => (
              <li key={s.time} className="flex gap-4">
                <span className="mt-0.5 h-fit rounded-lg bg-sun px-2.5 py-1 text-sm font-bold text-ink">{s.time}</span>
                <div>
                  <p className="font-bold">{s.t}</p>
                  <p className="text-white/75">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-3xl bg-white/10 p-6">
            <h3 className="font-display text-xl font-bold">{p.scaleTitle}</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-white/85">
              {p.scale.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
