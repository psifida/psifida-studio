# Ψηφίδα Studio — psifida.com

Το site-portfolio του studio. Next.js (App Router) + Tailwind CSS 4, φιλοξενία στο Vercel.

## Πού αλλάζω τι

| Θέλω να αλλάξω | Αρχείο |
|---|---|
| Κείμενα, τιμές, τηλέφωνο, διεύθυνση, προσφορά, FAQ | `src/lib/content.ts` |
| Χρώματα και γραμματοσειρές (design tokens) | `src/app/globals.css` (μπλοκ `@theme`) |
| Τίτλο σελίδας, περιγραφή, SEO, JSON-LD | `src/app/layout.tsx` |
| Εικόνα κοινοποίησης σε Facebook/LinkedIn | `src/app/opengraph-image.tsx` |
| Σειρά ενοτήτων | `src/app/page.tsx` |

Σχεδόν πάντα αρκεί το `src/lib/content.ts`.

## Εντολές

```bash
npm install     # μία φορά
npm run dev     # τοπικά στο http://localhost:3000
npm run build   # έλεγχος πριν το ανέβασμα
```

Κάθε push στο Vercel χτίζει και ανεβάζει αυτόματα.

## Σημειώσεις

- Οι γραμματοσειρές (Commissioner, Inter) είναι αυτοφιλοξενούμενες μέσω των πακέτων
  `@fontsource/*`. Καμία κλήση στο Google Fonts — ο browser κατεβάζει μόνο τα ελληνικά
  και τα λατινικά υποσύνολα (unicode-range).
- Το λεκτικό σήμα (`src/components/Wordmark.tsx`) είναι χτισμένο με κείμενο σε
  Commissioner 500, με τις αναλογίες μετρημένες πάνω στο master SVG του logo kit.
  Για έντυπα χρησιμοποιείται πάντα το SVG σε καμπύλες.
- Το ψηφιδωτό του hero (`src/components/Mosaic.tsx`) φορτώνει το three.js μόνο στον browser
  και σταματά όταν το hero βγει από την οθόνη. Σέβεται το `prefers-reduced-motion`.
- Η φόρμα επικοινωνίας ανοίγει το πρόγραμμα email του επισκέπτη (mailto) — δεν αποθηκεύεται
  τίποτα και δεν χρειάζεται server. Αν αργότερα χρειαστεί κανονική αποστολή, μπαίνει ένα
  Route Handler στο `src/app/api/`.
- Λογότυπα και favicons: `public/` και `src/app/favicon.ico`.
