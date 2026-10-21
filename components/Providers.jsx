"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { dict } from "../lib/i18n";

const Ctx = createContext({ lang: "ru", setLang: () => {}, t: dict.ru });
export const useLang = () => useContext(Ctx);

export default function Providers({ children }) {
  const [lang, setLang] = useState("ru");
  useEffect(() => {
    try {
      const s = localStorage.getItem("adal-lang");
      if (s === "ru" || s === "kz") setLang(s);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";
    try { localStorage.setItem("adal-lang", lang); } catch {}
  }, [lang]);
  return (
    <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}
