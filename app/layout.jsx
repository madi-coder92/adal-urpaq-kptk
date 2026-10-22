import "./globals.css";
import { Unbounded, Manrope } from "next/font/google";
import Providers from "../components/Providers";

const display = Unbounded({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: "ADAL URPAQ | Честный КПТК",
  description:
    "Антикоррупционный проект студентов ККЦТД: квиз «Адал Азамат», локальный генератор обращений и права студента. #SaryarqaJastary #AdalUrpaq #ЖастарЖастарға",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "ADAL URPAQ | Честный ККЦТД",
    description: "Квиз, обращение за 2 минуты и права студента. Без сбора данных.",
    type: "website",
  },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#14123F" };

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
