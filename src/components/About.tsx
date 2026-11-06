import Reveal from "./Reveal";
import { Section } from "./Section";
import { about } from "@/lib/content";
import { TitleWithTess } from "./Tess";

/** Μετατρέπει τα **έντονα** σε <strong> χωρίς να επιτρέπει HTML από το περιεχόμενο. */
function withStrong(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-petrol">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function About() {
  return (
    <Section id="gnorimia">
      <div className="container-brand">
        <Reveal className="grid items-start gap-9 rounded-[20px] border border-line bg-paper p-[clamp(1.6rem,4vw,2.6rem)] sm:grid-cols-[120px_1fr]">
          <div
            role="img"
            aria-label={"Χριστίνα Νέστωρ"}
            className="flex size-24 items-center justify-center rounded-full bg-petrol sm:size-30"
          >
            <i
              aria-hidden="true"
              className="size-[34px] rotate-10 rounded-[23%] bg-terra sm:size-[42px]"
            />
          </div>

          <div>
            <h2>
              <TitleWithTess>{about.title}</TitleWithTess>
            </h2>
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i ? "mt-[.8em]" : undefined}>
                {withStrong(p)}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
