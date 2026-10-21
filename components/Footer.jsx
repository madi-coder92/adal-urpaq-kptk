"use client";
import { useLang } from "./Providers";
import { config } from "../lib/config";

export default function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="bg-ink pb-12 pt-4 text-white/80">
      <div className="mx-auto max-w-6xl border-t border-white/15 px-4 pt-8">
        <p className="font-display font-bold text-white">ADAL URPAQ | {lang === "kz" ? "Адал КПТК" : "Честный КПТК"}</p>
        <p className="mt-2 text-sm">{config.collegeFull[lang]}</p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-sun">
          {config.hashtags.map((x) => <span key={x}>{x}</span>)}
        </p>
        <p className="mt-4 text-sm">{t.footer.made} {config.author}</p>
        <p className="mt-1 max-w-2xl text-sm text-white/60">{t.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
