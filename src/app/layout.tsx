import type { Metadata, Viewport } from "next";

/* Commissioner (τίτλοι) & Inter (κείμενο) — αυτοφιλοξενούμενες μέσω Fontsource.
   Τα αρχεία έχουν unicode-range, οπότε ο browser κατεβάζει μόνο τα ελληνικά
   και τα λατινικά υποσύνολα. Καμία κλήση σε εξωτερικό διακομιστή. */
import "@fontsource/commissioner/500.css";
import "@fontsource/commissioner/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Ιστοσελίδες & εφαρμογές για μικρές επιχειρήσεις | Καλαμάτα`,
    template: `%s | ${site.name}`,
  },
  description:
    "Ιστοσελίδες, e-shops και εφαρμογές για μικρές επιχειρήσεις, με απλά ελληνικά και καθαρές τιμές. Ψηφίδα Studio — Χριστίνα Νέστωρ, Καλαμάτα.",
  keywords: [
    "κατασκευή ιστοσελίδων Καλαμάτα",
    "ιστοσελίδες μικρές επιχειρήσεις",
    "e-shop Καλαμάτα",
    "web design Μεσσηνία",
    "εφαρμογές για επιχειρήσεις",
    "Ψηφίδα Studio",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Ιστοσελίδες και εφαρμογές για μικρές επιχειρήσεις. Απλά ελληνικά, καθαρές τιμές, ένας άνθρωπος που σηκώνει το τηλέφωνο.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Ιστοσελίδες και εφαρμογές για μικρές επιχειρήσεις. Καλαμάτα.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5EFE6",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.latinName,
  alternateName: site.name,
  description: "Ιστοσελίδες, e-shops και εφαρμογές για μικρές επιχειρήσεις.",
  founder: { "@type": "Person", name: site.owner },
  telephone: site.phoneHref,
  email: site.email,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: "GR",
  openingHours: "Mo-Fr 10:00-18:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
