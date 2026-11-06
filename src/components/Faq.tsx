import Reveal from "./Reveal";
import { Section, SectionHead } from "./Section";
import { faq } from "@/lib/content";

export default function Faq() {
  return (
    <Section id="faq" divider>
      <div className="container-brand">
        <SectionHead kicker={faq.kicker} title={faq.title} />

        <Reveal className="faq-list max-w-[760px]">
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                <i aria-hidden="true" />
                {item.q}
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
