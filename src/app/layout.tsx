import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { site } from "@/data/site";
import { originConfigurato, siteUrl } from "@/lib/site-url";
import "./globals.css";
import "./superfici.css";

/*
 * A grotesque pair, not the serif-and-sans formula.
 *
 * Bricolage carries width and optical-size axes and is used only where it is
 * large enough for them to show; Instrument Sans is the text face, chosen for
 * how it holds up small on black, where thin letterforms simply vanish.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const titolo = `${site.nome} — Cucina contemporanea italiana`;
const descrizione =
  "Un concept digitale per un ristorante italiano contemporaneo: cucina stagionale, territorio, menu e prenotazioni.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: titolo,
  description: descrizione,
  applicationName: site.nome,
  authors: [{ name: "Michele Modica" }],
  /* Only once NEXT_PUBLIC_SITE_URL names a host that actually exists. */
  alternates: originConfigurato ? { canonical: "/" } : undefined,
  openGraph: {
    title: titolo,
    description: descrizione,
    siteName: site.nome,
    locale: "it_IT",
    type: "website",
    url: "/",
    /*
     * Pointed at the .png route rather than at Next's `opengraph-image`
     * convention. The convention writes an extension-less file into the
     * export, and a static host infers the content type from the extension —
     * crawlers would be handed application/octet-stream and drop the card.
     */
    images: [
      { url: "/opengraph-image.png", width: 1200, height: 630, alt: titolo },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titolo,
    description: descrizione,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
  /*
   * No Restaurant structured data. Every field that makes the schema useful —
   * address, telephone, opening hours, menu URL, acceptsReservations — would
   * assert that a restaurant which does not exist can be visited and booked.
   * Emitting it to look thorough is exactly the fabrication the rest of this
   * project refuses, so the honest answer is none.
   */
};

/*
 * The browser chrome takes the room's own ground. It has to be the exact
 * value the page uses, or the strip above the masthead reads as a seam.
 */
export const viewport: Viewport = {
  themeColor: "#0e0b09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * The font variables belong on <html>, not on <body>. --font-titolo and
     * --font-testo are declared in @theme (i.e. on :root) as
     * `var(--font-bricolage), …`, and a custom property substitutes its var()
     * references on the element where it is declared. With the classes on
     * <body>, --font-bricolage is undefined at :root, --font-titolo resolves to
     * the guaranteed-invalid value, and the whole page silently falls back to
     * the system stack.
     */
    <html lang="it" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        <a href="#contenuto" className="salta">
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}
