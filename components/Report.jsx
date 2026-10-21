"use client";
import { useMemo, useState } from "react";
import { useLang } from "./Providers";
import { buildReport } from "../lib/report";
import { copyText, downloadText } from "../lib/utils";

const empty = { type: 0, to: 0, when: "", where: "", what: "", person: "", evidence: [], mode: "anon", contact: "" };
const field = "mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-sky";

export default function Report() {
  const { lang, t } = useLang();
  const r = t.report;
  const [f, setF] = useState(empty);
  const [copied, setCopied] = useState(false);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleEv = (i) => set("evidence", f.evidence.includes(i) ? f.evidence.filter((x) => x !== i) : [...f.evidence, i]);

  const text = useMemo(() => (f.what.trim() ? buildReport(lang, r, f) : ""), [lang, r, f]);

  const copy = async () => {
    if (text && (await copyText(text))) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="report" className="scroll-mt-16 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{r.title}</h2>
        <p className="mt-3 max-w-xl text-ink/75">{r.lead}</p>
        <p className="mt-4 inline-block rounded-xl bg-mint/15 px-4 py-2 text-sm font-semibold">{r.privacy}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <label className="block font-bold">{r.fType}
              <select className={field} value={f.type} onChange={(e) => set("type", Number(e.target.value))}>
                {r.types.map((x, i) => <option key={i} value={i}>{x}</option>)}
              </select>
            </label>
            <label className="block font-bold">{r.fTo}
              <select className={field} value={f.to} onChange={(e) => set("to", Number(e.target.value))}>
                {r.toLabels.map((x, i) => <option key={i} value={i}>{x}</option>)}
              </select>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block font-bold">{r.fWhen}
                <input className={field} value={f.when} placeholder={r.fWhenPh} onChange={(e) => set("when", e.target.value)} />
              </label>
              <label className="block font-bold">{r.fWhere}
                <input className={field} value={f.where} placeholder={r.fWherePh} onChange={(e) => set("where", e.target.value)} />
              </label>
            </div>
            <label className="block font-bold">{r.fWhat}
              <textarea className={field} rows={5} value={f.what} placeholder={r.fWhatPh} onChange={(e) => set("what", e.target.value)} />
            </label>
            <label className="block font-bold">{r.fPerson}
              <input className={field} value={f.person} placeholder={r.fPersonPh} onChange={(e) => set("person", e.target.value)} />
            </label>
            <fieldset>
              <legend className="font-bold">{r.fEvidence}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.evidence.map((x, i) => (
                  <label key={i} className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-semibold ${f.evidence.includes(i) ? "border-sky bg-sky/10" : "border-ink/15"}`}>
                    <input type="checkbox" className="sr-only" checked={f.evidence.includes(i)} onChange={() => toggleEv(i)} />
                    {x}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-bold">{r.fMode}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {["anon", "contact"].map((m) => (
                  <label key={m} className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-semibold ${f.mode === m ? "border-sky bg-sky/10" : "border-ink/15"}`}>
                    <input type="radio" name="mode" className="sr-only" checked={f.mode === m} onChange={() => set("mode", m)} />
                    {r[m]}
                  </label>
                ))}
              </div>
              {f.mode === "contact" && (
                <input className={field} value={f.contact} placeholder={r.contactPh} onChange={(e) => set("contact", e.target.value)} aria-label={r.contactPh} />
              )}
            </fieldset>
          </div>

          <div>
            <div className="rounded-3xl bg-mist p-5 sm:p-6">
              <h3 className="font-bold">{r.outTitle}</h3>
              {text ? (
                <pre className="mt-3 max-h-[28rem] overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-white p-4 font-body text-sm leading-relaxed">{text}</pre>
              ) : (
                <p className="mt-3 rounded-2xl border-2 border-dashed border-ink/20 p-6 text-ink/60">{r.empty}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={copy} disabled={!text} className="rounded-xl bg-ink px-5 py-3 font-bold text-white disabled:opacity-40">{copied ? r.copied : r.copy}</button>
                <button onClick={() => downloadText("obrashenie.txt", text)} disabled={!text} className="rounded-xl bg-sun px-5 py-3 font-bold text-ink disabled:opacity-40">{r.download}</button>
                <button onClick={() => setF(empty)} className="rounded-xl border-2 border-ink/20 px-5 py-3 font-bold">{r.reset}</button>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-bold">{r.tipsTitle}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/80">
                {r.tips.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
