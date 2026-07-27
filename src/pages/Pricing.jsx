import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import PricingSection from "@/components/sections/PricingSection";
import FaqSection from "@/components/sections/FaqSection";

export default function Pricing() {
  return (
    <>
      <SEO title="Pricing" description="Simple, transparent pricing — Starter, Business and Premium packages for websites and full stack platforms." path="/pricing" />
      <PageHeader
        overline="Pricing"
        title={<>Premium work, <br /><span className="text-gradient">honest pricing.</span></>}
        description="Choose a starting point below. Every project is scoped and tailored to your exact goals — no hidden fees."
      />
      <Section tight>
        <PricingSection />
      </Section>
      <Section className="bg-card/20">
        <div className="mb-12 text-center">
          <SectionHeading align="center" overline="FAQ" title="Pricing questions" />
        </div>
        <FaqSection />
      </Section>
    </>
  );
}
