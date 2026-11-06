"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { nav } from "@/lib/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-sand/[.86] backdrop-blur-[10px] transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-line shadow-[0_6px_24px_-18px_rgba(30,78,90,.35)]"
          : "border-transparent"
      }`}
    >
      <div className="container-brand flex h-[76px] items-center justify-between gap-4">
        <a href="#" className="text-[2.35rem] text-petrol" aria-label="Ψηφίδα Studio — αρχική">
          <Wordmark />
        </a>

        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-petrol text-petrol bar:hidden"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Κλείσιμο μενού" : "Μενού"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-0.5 w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:block before:h-0.5 before:w-5 before:bg-current before:content-[''] after:absolute after:top-1.5 after:left-0 after:block after:h-0.5 after:w-5 after:bg-current after:content-['']" />
        </button>

        <nav
          id="main-nav"
          aria-label="Κύριο μενού"
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[76px] right-0 left-0 flex-col items-stretch gap-0.5 border-b border-line bg-sand px-[clamp(1.1rem,4vw,2rem)] pt-4 pb-6 bar:static bar:flex bar:flex-row bar:items-center bar:gap-7 bar:border-0 bar:bg-transparent bar:p-0`}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName === "A") setOpen(false);
          }}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-line py-3 font-display text-[.98rem] font-medium text-petrol no-underline bar:border-b-2 bar:border-transparent bar:py-[.3rem] bar:hover:border-terra"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#epikoinonia"
            className="btn btn-primary mt-3 text-center text-[.95rem] bar:mt-0 bar:px-[1.1rem] bar:py-[.6rem]"
          >
            Ζήτα εκτίμηση
          </a>
        </nav>
      </div>
    </header>
  );
}
