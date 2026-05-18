import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SeoClient from "@/components/SeoClient";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cabinetGrotesk.variable}>
      <body className="bg-slate-900 text-white antialiased font-sans">
        <SeoClient />
        {children}
      </body>
    </html>
  );
}
