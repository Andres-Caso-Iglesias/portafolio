import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrés Caso Iglesias | Junior Backend Developer",
  description: "Portfolio de Andrés Caso Iglesias - Junior Backend Developer especializado en C#/.NET, Java y TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}