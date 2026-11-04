import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Valor Limo — Chicagoland black car service, quoted in writing",
    template: "%s — Valor Limo",
  },
  description: SITE.description,
  openGraph: { title: "Valor Limo", description: SITE.description, type: "website" },
};

export const viewport = { themeColor: "#f8f6f2" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
