type Props = { className?: string; title?: string };

/**
 * Λεκτικό σήμα «psifida studio».
 *
 * Χτισμένο με ζωντανό κείμενο στην αυτοφιλοξενούμενη Commissioner 500. Οι
 * αναλογίες είναι μετρημένες πάνω στο master SVG του οδηγού ταυτότητας: η
 * ψηφίδα έχει πλευρά 0,31em, κλίση +10°, στρογγύλεμα 23% και κάθεται στο
 * baseline του «psifida»· το «studio» μπαίνει από κάτω με έντονη αραίωση.
 *
 * Το μέγεθος ελέγχεται από το `font-size` του γονέα — το σήμα κλιμακώνεται
 * σαν εικόνα. Συνολικό πλάτος ≈ 3,5 × font-size.
 */
export default function Wordmark({ className = "", title = "psifida studio" }: Props) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-flex flex-col items-start font-display leading-none font-medium ${className}`}
    >
      <span className="flex items-baseline text-[1em] tracking-[.023em]">
        psifida
        <i
          aria-hidden="true"
          className="ml-[.13em] block size-[.31em] shrink-0 rotate-10 rounded-[23%] bg-terra"
        />
      </span>
      <span className="mt-[.36em] ml-[.195em] text-[.308em] tracking-[.39em]">studio</span>
    </span>
  );
}
