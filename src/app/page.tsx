import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import { Services, Care } from "@/components/Services";
import Offer from "@/components/Offer";
import { Process, Why } from "@/components/Process";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="absolute top-0 -left-[9999px] z-99 rounded-br-[14px] bg-petrol px-[1.2rem] py-[.7rem] text-sand focus:left-0"
      >
        Μετάβαση στο περιεχόμενο
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Care />
        <Offer />
        <Process />
        <Why />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
