import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Mrs_Saint_Delafield } from "next/font/google";
import { Providers } from "@/components/providers";
import { INSTAGRAM_URL, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const signature = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

const title = "Little Lulli — Laços bordados à mão";
const description =
  "Ateliê de laços infantis bordados à mão, ponto a ponto, com amor e cuidado. Pequenas joias para acompanhar toda a infância. Encomende pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "laços infantis",
    "laços bordados à mão",
    "laços artesanais",
    "presilhas bordadas",
    "acessórios infantis",
    "laço de cabelo menina",
    "Little Lulli",
  ],
  openGraph: {
    title,
    description: "Pequenas joias bordadas à mão para toda a infância.",
    type: "website",
    locale: "pt_BR",
    siteName: "Little Lulli",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Pequenas joias bordadas à mão para toda a infância.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf6f1",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Little Lulli",
  description,
  url: SITE_URL,
  image: `${SITE_URL}/colecao-1.jpeg`,
  telephone: `+${WHATSAPP_NUMBER}`,
  sameAs: [INSTAGRAM_URL],
};

// Runs before paint: skip the intro curtain if it was already seen this session.
const introScript = `try{if(sessionStorage.getItem("lulli-intro")){document.documentElement.dataset.intro="skip"}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrumentSans.variable} ${signature.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`[data-intro-curtain]{display:none}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-dvh bg-linen text-cocoa">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-sm focus:text-linen"
        >
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
