import Reveal from "./Reveal";
import { Section, SectionHead } from "./Section";
import { process, why } from "@/lib/content";

export function Process() {
  return (
    <Section id="diadikasia">
      <div className="container-brand">
        <SectionHead kicker={process.kicker} title={process.title} />

        <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[1.2rem]">
          {process.steps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={0.05 + i * 0.08}
              className="rounded-[18px] border border-line bg-paper p-[1.6rem_1.5rem]"
            >
              <div
                aria-hidden="true"
                className="mb-[1.1rem] flex size-[46px] rotate-10 items-center justify-center rounded-[23%] bg-petrol"
              >
                <span className="-rotate-10 font-display text-[1.15rem] font-bold text-sand">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-[.4rem]">{step.title}</h3>
              <p className="text-[.95rem] text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function Why() {
  return (
    <Section id="giati" divider>
      <div className="container-brand">
        <SectionHead kicker={why.kicker} title={why.title} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(255px,1fr))] gap-[1.2rem]">
          {why.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.05 + i * 0.08}
              className="border-t-[3px] border-terra pt-[1.1rem]"
            >
              <h3 className="mb-[.4rem]">{item.title}</h3>
              <p className="text-[.97rem] text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
