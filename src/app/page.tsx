import type { Metadata } from "next";
import { content } from "@/content/page";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { ProofSection } from "@/components/sections/ProofSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeadForm } from "@/components/sections/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = content.meta;

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero {...content.hero} />
        <BenefitsGrid {...content.benefits} />
        <ProofSection {...content.proof} />
        <HowItWorks {...content.howItWorks} />
        <LeadForm {...content.form} />
        <FAQ {...content.faq} />
      </main>
      <Footer />
    </>
  );
}
