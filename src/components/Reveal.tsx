"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Καθυστέρηση εμφάνισης σε δευτερόλεπτα (κλιμακωτό reveal) */
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
};

/**
 * Εμφανίζει το περιεχόμενο όταν μπει στο viewport.
 * Σέβεται το prefers-reduced-motion μέσω του CSS.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv ${className}`}
      style={{ ...style, ...(delay ? { ["--d" as string]: `${delay}s` } : {}) }}
    >
      {children}
    </Tag>
  );
}
