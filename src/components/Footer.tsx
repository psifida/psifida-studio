import Wordmark from "./Wordmark";
import { site, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line pt-[2.6rem] pb-[2.2rem] text-[.93rem] text-muted">
      <div className="container-brand flex flex-wrap items-center justify-between gap-8">
        <a href="#" className="text-[1.99rem] text-petrol" aria-label={site.name}>
          <Wordmark />
        </a>

        <nav aria-label="Υποσέλιδο" className="flex flex-wrap gap-[1.3rem]">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-muted no-underline hover:text-petrol">
              {item.label}
            </a>
          ))}
          <a href="#epikoinonia" className="text-muted no-underline hover:text-petrol">
            Επικοινωνία
          </a>
        </nav>

        <p>
          © {new Date().getFullYear()} {site.name} · {site.owner} · {site.address.city}
        </p>
      </div>
    </footer>
  );
}
