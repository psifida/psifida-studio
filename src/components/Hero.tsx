import Mosaic from "./Mosaic";
import { hero } from "@/lib/content";
import { TitleWithTess } from "./Tess";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-tile relative flex min-h-[min(94vh,860px)] items-center overflow-hidden"
    >
      <Mosaic heroId="hero" />

      <div
        aria-hidden="true"
        /* Πέπλο άμμου πάνω από το ψηφιδωτό: κρατά το κείμενο ευανάγνωστο αριστερά
           και αφήνει το ψηφιδωτό να φανεί καθαρά δεξιά. */
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,239,230,.94)_0%,rgba(245,239,230,.88)_55%,rgba(245,239,230,.6)_100%)] bar:bg-[linear-gradient(102deg,rgba(245,239,230,.96)_0%,rgba(245,239,230,.90)_40%,rgba(245,239,230,.45)_68%,rgba(245,239,230,0)_88%)]"
      />

      <div className="container-brand relative z-[2] pt-26 pb-22">
        <p className="flex items-center gap-[.6em] font-display text-[.82rem] font-medium tracking-[.14em] text-terra-deep uppercase before:block before:h-[.7em] before:w-[.7em] before:rotate-10 before:rounded-[23%] before:bg-terra before:content-['']">
          {hero.eyebrow}
        </p>

        <h1 className="mt-[.5em] mb-[.45em] max-w-[13ch] text-[clamp(2.35rem,5.6vw,4.1rem)]">
          <TitleWithTess>{hero.title}</TitleWithTess>
        </h1>

        <p className="max-w-[34rem] text-[clamp(1.05rem,1.6vw,1.22rem)] text-ink">{hero.sub}</p>

        <div className="mt-7 flex flex-wrap gap-[.9rem]">
          <a className="btn btn-primary" href="#epikoinonia">
            {hero.ctaPrimary}
          </a>
          <a className="btn btn-ghost" href="#ypiresies">
            {hero.ctaSecondary}
          </a>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-[.95rem] text-muted">
          {hero.trust.map((t) => (
            <span
              key={t}
              className="flex items-center gap-[.5em] before:block before:h-[.5em] before:w-[.5em] before:rotate-10 before:rounded-[23%] before:bg-petrol before:opacity-55 before:content-['']"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
