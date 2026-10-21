"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./Providers";
import { quiz } from "../lib/quiz";
import { config } from "../lib/config";
import { copyText } from "../lib/utils";

export default function Quiz() {
  const { lang, t } = useLang();
  const q = t.quiz;
  const total = quiz.length;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(null);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const b = localStorage.getItem("adal-best");
      if (b !== null) setBest(Number(b));
    } catch {}
  }, []);

  const item = quiz[i];
  const c = item[lang];

  const answer = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === item.correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else setStreak(0);
  };

  const next = () => {
    if (i + 1 >= total) {
      setDone(true);
      setBest((prev) => {
        const nb = prev === null ? score : Math.max(prev, score);
        try { localStorage.setItem("adal-best", String(nb)); } catch {}
        return nb;
      });
    } else {
      setI(i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setI(0); setPicked(null); setScore(0); setStreak(0); setDone(false); setCopied(false);
  };

  const rank = [...q.ranks].reverse().find((r) => score >= r.min) || q.ranks[0];

  const share = async () => {
    const text = q.shareText
      .replace("{score}", score)
      .replace("{total}", total)
      .replace("{rank}", rank.name)
      .replace("{tags}", config.hashtags.join(" "));
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="quiz" className="scroll-mt-16 bg-mist py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{q.title}</h2>
        <p className="mt-3 max-w-xl text-ink/75">{q.lead}</p>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink/10 sm:p-8">
          {!done ? (
            <>
              <div className="flex items-center justify-between text-sm font-semibold text-ink/70">
                <span>{q.q} {i + 1} {q.of} {total}</span>
                <span>{q.score}: {score} &nbsp; {q.streak}: {streak}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + (picked !== null ? 1 : 0)}>
                <motion.div className="h-full bg-sky" animate={{ width: `${((i + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={`${i}-${lang}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  <h3 className="mt-6 text-xl font-bold leading-snug">{c.q}</h3>
                  <div className="mt-5 grid gap-3">
                    {c.o.map((opt, idx) => {
                      const isRight = idx === item.correct;
                      const isPicked = picked === idx;
                      let cls = "border-ink/15 hover:border-sky hover:bg-sky/5";
                      if (picked !== null) {
                        if (isRight) cls = "border-mint bg-mint/15";
                        else if (isPicked) cls = "border-coral bg-coral/10";
                        else cls = "border-ink/10 opacity-60";
                      }
                      return (
                        <button key={idx} onClick={() => answer(idx)} disabled={picked !== null}
                          className={`rounded-2xl border-2 p-4 text-left font-semibold transition ${cls}`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <AnimatePresence>
                    {picked !== null && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5" aria-live="polite">
                        <p className={`font-bold ${picked === item.correct ? "text-mint" : "text-coral"}`}>
                          {picked === item.correct ? q.right : q.wrong}
                        </p>
                        <p className="mt-1 text-ink/80">{c.why}</p>
                        <button onClick={next} className="mt-4 rounded-xl bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90">
                          {i + 1 >= total ? q.finish : q.next}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <p className="text-sm font-semibold text-ink/70">{q.resultLead}</p>
              <p className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">{rank.name}</p>
              <p className="mt-3 text-lg font-bold text-sky">{score} {q.of} {total}</p>
              <p className="mx-auto mt-3 max-w-md text-ink/80">{rank.text}</p>
              {best !== null && <p className="mt-4 text-sm text-ink/60">{q.best}: {best} {q.of} {total}</p>}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={share} className="rounded-xl bg-sun px-6 py-3 font-bold text-ink hover:brightness-110">
                  {copied ? q.copied : q.share}
                </button>
                <button onClick={restart} className="rounded-xl border-2 border-ink/20 px-6 py-3 font-bold hover:bg-mist">{q.again}</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
