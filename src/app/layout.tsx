import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farma.sierralog.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sierralog para Farma | Armazenagem com compliance ANVISA",
  description:
    "Armazenagem e distribuição farmacêutica com compliance ANVISA, controle de temperatura e rastreabilidade em Extrema/MG.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Sierralog",
    title: "Sierralog para Farma | Armazenagem com compliance ANVISA",
    description:
      "Armazenagem e distribuição farmacêutica com compliance ANVISA, controle de temperatura e rastreabilidade em Extrema/MG.",
    images: ["/og-farma.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sierralog para Farma | Armazenagem com compliance ANVISA",
    description:
      "Armazenagem e distribuição farmacêutica com compliance ANVISA, controle de temperatura e rastreabilidade em Extrema/MG.",
    images: ["/og-farma.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#001806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {gtmId && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
