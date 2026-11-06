import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { TitleWithTess } from "./Tess";

type SectionProps = {
  id: string;
  children: ReactNode;
  /** Λεπτή γραμμή στο πάνω μέρος, όπως ο αρμός ενός ψηφιδωτού */
  divider?: boolean;
  /** Σκούρα (πετρόλ) ενότητα */
  dark?: boolean;
  className?: string;
};

export function Section({ id, children, divider, dark, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-[clamp(4.2rem,8vw,6.5rem)] ${divider ? "border-t border-line" : ""} ${
        dark ? "dark-section" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

type HeadProps = { kicker?: string; title: string; lead?: string; light?: boolean };

export function SectionHead({ kicker, title, lead, light }: HeadProps) {
  return (
    <Reveal className="mb-[2.6rem] max-w-[640px]">
      {kicker ? (
        <p className="kicker" style={light ? { color: "var(--color-terra-soft)" } : undefined}>
          {kicker}
        </p>
      ) : null}
      <h2>
        <TitleWithTess>{title}</TitleWithTess>
      </h2>
      {lead ? <p className={light ? undefined : "text-muted"}>{lead}</p> : null}
    </Reveal>
  );
}
