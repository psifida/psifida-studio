import Reveal from "./Reveal";
import { Section } from "./Section";
import { offer } from "@/lib/content";
import { TitleWithTess } from "./Tess";

export default function Offer() {
  return (
    <Section id="prosfora" dark>
      <div className="container-brand grid items-center gap-8 bar:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="kicker" style={{ color: "var(--color-terra-soft)" }}>
            {offer.kicker}
          </p>
          <h2>
            <TitleWithTess>{offer.title}</TitleWithTess>
          </h2>
          <p>{offer.body}</p>

          <p className="mt-4 font-display text-[clamp(2rem,4.6vw,3rem)] font-bold text-[#F6D9CE]">
            {offer.price}{" "}
            <s className="ml-[.35em] text-[.55em] font-medium opacity-45">{offer.priceWas}</s>
          </p>

          <div
            className="mt-4 flex items-center gap-2 text-[.95rem] text-[#BFD3D0]"
            aria-label={`Διαθέσιμες θέσεις: ${offer.seats} από ${offer.seats}`}
          >
            {Array.from({ length: offer.seats }).map((_, i) => (
              <i key={i} aria-hidden="true" className="size-4 rotate-10 rounded-[23%] bg-terra" />
            ))}
            <span>{offer.seatsLabel}</span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            className="btn btn-primary px-[1.9rem] py-[1.1rem] text-[1.1rem]"
            href="#epikoinonia"
          >
            {offer.cta}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
