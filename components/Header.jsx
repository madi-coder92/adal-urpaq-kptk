"use client";
import { useLang } from "./Providers";

const links = ["quiz", "report", "rights", "pilot"];

export default function Header() {
  const { lang, setLang, t } = useLang();
  return (
    <header className="sticky top-0 z-40 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <a href="#top" className="font-display text-sm font-bold">ADAL URPAQ</a>
        <nav className="no-scrollbar flex flex-1 gap-1 overflow-x-auto text-sm" aria-label="Menu">
          {links.map((k) => (
            <a key={k} href={`#${k}`} className="whitespace-nowrap rounded-full px-3 py-1.5 text-white/80 hover:bg-white/10 hover:text-white">
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div role="group" aria-label="Language" className="flex rounded-full bg-white/10 p-0.5 text-xs font-bold">
          {["ru", "kz"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`rounded-full px-3 py-1.5 ${lang === l ? "bg-sun text-ink" : "text-white/80"}`}
            >
              {l === "ru" ? "РУС" : "ҚАЗ"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
