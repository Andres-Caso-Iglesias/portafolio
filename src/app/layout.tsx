import type { Metadata } from "next";
import "./globals.css";
import SeoClient from "@/components/SeoClient";

export const metadata: Metadata = {
  title: "Andrés Caso Iglesias | Backend Developer",
  description: "Portfolio de Andrés Caso Iglesias - Backend Developer especializado en C#/.NET, Java y TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-900 text-white antialiased">
        <SeoClient />
        {children}
      </body>
    </html>
  );
}
