import Reveal from "./Reveal";
import { Section, SectionHead } from "./Section";
import { services, care } from "@/lib/content";

export function Services() {
  return (
    <Section id="ypiresies" divider>
      <div className="container-brand">
        <SectionHead kicker={services.kicker} title={services.title} lead={services.lead} />

        {/* 240px ελάχιστο πλάτος ώστε και οι 4 υπηρεσίες να χωρούν σε μία σειρά
            στο desktop — χωρίς ορφανή κάρτα στη δεύτερη γραμμή. */}
        <div className="cards cards--rows-4">
          {services.items.map((item, i) => (
            <Reveal key={item.title} as="article" className="card" delay={0.05 + i * 0.07}>
              {"badge" in item && item.badge ? (
                <span className="absolute -top-[13px] left-[1.4rem] rounded-full bg-terra px-[.8rem] py-[.28rem] font-display text-[.78rem] font-medium text-on-terra">
                  {item.badge}
                </span>
              ) : null}
              <h3 className="mb-[.35rem]">{item.title}</h3>
              <p className="text-[.9rem] text-muted">{item.tag}</p>
              <p className="card-price">
                {item.price}
                <small>{item.priceNote}</small>
              </p>
              <ul className="tl mt-[.9rem] text-[.93rem] text-ink">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="mt-[1.6rem] text-[.9rem] text-muted">
          {services.note}
        </Reveal>
      </div>
    </Section>
  );
}

export function Care() {
  return (
    <Section id="frontida" divider>
      <div className="container-brand">
        <SectionHead kicker={care.kicker} title={care.title} lead={care.lead} />

        <div className="cards cards--wide cards--rows-3">
          {care.items.map((item, i) => (
            <Reveal key={item.title} as="article" className="card" delay={0.05 + i * 0.07}>
              <h3 className="mb-[.35rem]">{item.title}</h3>
              <p className="text-[.9rem] text-muted">{item.tag}</p>
              <p className="card-price !text-[1.35rem]">
                {item.price}
                <small>{item.priceNote}</small>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
