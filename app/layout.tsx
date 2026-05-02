import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little Lulli — Laços Artesanais Infantis",
  description:
    "Laços artesanais feitos com amor e cuidado para deixar sua princesa ainda mais linda. Cada detalhe pensado para encantar. Confira nossas coleções exclusivas.",
  keywords: "laços infantis, laços artesanais, acessórios infantis, laço de cabelo menina, laços handmade, Little Lulli",
  openGraph: {
    title: "Little Lulli — Laços Artesanais Infantis",
    description: "Laços artesanais feitos com amor para sua princesa.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
