"use client";

import { useState, type FormEvent } from "react";
import { site, contact } from "@/lib/content";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const reach = String(data.get("contact") ?? "").trim();
    const msg = String(data.get("msg") ?? "").trim();

    const body = `Όνομα: ${name}\nΕπικοινωνία: ${reach}\n\n${msg}`;
    const href =
      `mailto:${site.email}` +
      `?subject=${encodeURIComponent(`Νέο μήνυμα από psifida.com — ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[20px] border border-line-dark bg-petrol-deep p-[clamp(1.4rem,3vw,2rem)]"
    >
      <div className="grid gap-4 bar:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={labelClass}>
            Ονοματεπώνυμο
          </label>
          <input id="f-name" name="name" type="text" autoComplete="name" required className="form-field" />
        </div>
        <div>
          <label htmlFor="f-tel" className={labelClass}>
            Τηλέφωνο ή email
          </label>
          <input id="f-tel" name="contact" type="text" autoComplete="tel" required className="form-field" />
        </div>
      </div>

      <label htmlFor="f-msg" className={labelClass}>
        Τι χρειάζεσαι;
      </label>
      <textarea
        id="f-msg"
        name="msg"
        required
        placeholder={contact.placeholder}
        className="form-field min-h-[120px] resize-y"
      />

      <button className="btn btn-primary" type="submit">
        Στείλε το μήνυμα
      </button>

      <small className="mt-[.7rem] block text-[.83rem] text-on-dark-muted">
        {sent ? (
          <>
            Άνοιξε το πρόγραμμα email σου. Αν δεν άνοιξε, γράψε μου απευθείας στο{" "}
            <a href={`mailto:${site.email}`} className="underline decoration-terra">
              {site.email}
            </a>
            .
          </>
        ) : (
          contact.formNote
        )}
      </small>
    </form>
  );
}

const labelClass = "mb-[.35rem] block font-display text-[.92rem] font-medium text-[#CFE0DD]";
