import Reveal from "./Reveal";
import { Section } from "./Section";
import ContactForm from "./ContactForm";
import { site, contact } from "@/lib/content";
import { TitleWithTess } from "./Tess";

const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
  `${site.address.street}, ${site.address.city} ${site.address.postalCode}`,
)}`;

export default function Contact() {
  return (
    <Section id="epikoinonia" dark>
      <div className="container-brand grid items-start gap-[clamp(2rem,5vw,4rem)] bar:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="kicker" style={{ color: "var(--color-terra-soft)" }}>
            {contact.kicker}
          </p>
          <h2>
            <TitleWithTess>{contact.title}</TitleWithTess>
          </h2>
          <p>{contact.lead}</p>

          <a
            href={`tel:${site.phoneHref}`}
            className="mt-2 mb-[.2rem] inline-block border-b-[3px] border-terra font-display text-[clamp(1.5rem,3vw,2rem)] font-bold no-underline"
          >
            {site.phone}
          </a>

          <ul className="mt-[1.4rem] grid list-none gap-[.55rem] text-on-dark">
            <li>
              <a href={`mailto:${site.email}`} className="decoration-terra">
                {site.email}
              </a>
            </li>
            <li>
              <a href={mapsUrl} rel="noopener" target="_blank" className="decoration-terra">
                {site.address.street}, {site.address.city} {site.address.postalCode}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
