import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SeoClient from "@/components/SeoClient";
import { Chat } from "@/components/chat/Chat";
import { LanguageProvider, getLangFromCookie, type LocaleData } from "@/lib/i18n";
import locales from "@/i18n/locales.json";

const cabinetGrotesk = localFont({
  src: [
    { path: "../../public/fonts/CabinetGrotesk-Thin.otf", weight: "100" },
    { path: "../../public/fonts/CabinetGrotesk-Extralight.otf", weight: "200" },
    { path: "../../public/fonts/CabinetGrotesk-Light.otf", weight: "300" },
    { path: "../../public/fonts/CabinetGrotesk-Regular.otf", weight: "400" },
    { path: "../../public/fonts/CabinetGrotesk-Medium.otf", weight: "500" },
    { path: "../../public/fonts/CabinetGrotesk-Bold.otf", weight: "700" },
    { path: "../../public/fonts/CabinetGrotesk-Extrabold.otf", weight: "800" },
    { path: "../../public/fonts/CabinetGrotesk-Black.otf", weight: "900" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andrés Caso Iglesias | Developer",
  description: "Portfolio de Andrés Caso Iglesias - Developer especializado en C#/.NET, Java y TypeScript",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLangFromCookie();
  const initialLocales = locales as unknown as LocaleData;

  return (
    <html lang={lang} className={cabinetGrotesk.variable} suppressHydrationWarning>
      <body className="bg-slate-900 text-white antialiased font-sans">
        <SeoClient />
        <LanguageProvider initialLang={lang} initialLocales={initialLocales}>
          {children}
        </LanguageProvider>
        <Chat />
      </body>
    </html>
  );
}
