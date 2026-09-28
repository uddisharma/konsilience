import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AiSection from "@/components/sections/AiSection";
import Awards from "@/components/sections/Awards";
import CaseStudies from "@/components/sections/CaseStudies";
import Clients from "@/components/sections/Clients";
import Compliance from "@/components/sections/Compliance";
import Faq from "@/components/sections/Faq";
import GrowthCta from "@/components/sections/GrowthCta";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import StrategyCta from "@/components/sections/StrategyCta";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <GrowthCta />
        <Stats />
        <AiSection />
        <Testimonials />
        <Clients />
        <Awards />
        <Compliance />
        <StrategyCta />
        <Partners />
        <Industries />
        <Faq />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
