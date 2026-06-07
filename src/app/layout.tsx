import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Chat } from "@/components/chat/Chat";
import { LanguageProvider, type LocaleData } from "@/lib/i18n";
import { getLangFromCookie } from "@/lib/i18n-server";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://andres-caso-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andres Caso Iglesias - Senior Backend Developer",
    template: "%s - Andres Caso Iglesias",
  },
  description: "Senior Backend Developer con 20 anos de experiencia en liderazgo operativo, transicion a desarrollo backend. Master en Ciberseguridad e IA. NestJS, Spring Boot, TypeORM, React, Next.js.",
  keywords: [
    "Backend Developer",
    "Senior Developer",
    "Cybersecurity",
    "NIS2",
    "NestJS",
    "Spring Boot",
    "TypeScript",
    "Next.js",
    "React",
    "Pentesting",
    "eJPT",
    "Andres Caso Iglesias",
  ],
  authors: [
    {
      name: "Andres Caso Iglesias",
      url: siteUrl,
    },
  ],
  creator: "Andres Caso Iglesias",
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Andres Caso Iglesias Portfolio",
    title: "Andres Caso Iglesias - Senior Backend Developer",
    description: "Senior Backend Developer con experiencia en ciberseguridad, NestJS, Spring Boot, y liderazgo tecnico.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Andres Caso Iglesias - Senior Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andres Caso Iglesias - Senior Backend Developer",
    description: "Senior Backend Developer con experiencia en ciberseguridad, NestJS, Spring Boot, y liderazgo tecnico.",
    images: ["/opengraph-image"],
    creator: "@andrescaso",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      es: siteUrl,
      en: `${siteUrl}/?lang=en`,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
        <LanguageProvider initialLang={lang} initialLocales={initialLocales}>
          {children}
          <Chat />
        </LanguageProvider>
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Andres Caso Iglesias",
              jobTitle: "Senior Backend Developer",
              url: siteUrl,
              sameAs: [
                "https://www.linkedin.com/in/andres-caso-iglesias",
                "https://github.com/andres-caso-portfolio",
              ],
              knowsAbout: [
                "Backend Development",
                "Cybersecurity",
                "NIS2",
                "NestJS",
                "Spring Boot",
                "TypeScript",
                "Next.js",
                "React",
                "Pentesting",
                "eJPT",
                "Hospitality Management",
                "Logistics",
              ],
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Universidad [nombre real]",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Mecalux (Residencia Tecnica)",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
