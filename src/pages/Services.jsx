import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";

export default function Services() {
  return (
    <>
      <SEO title="Services" description="Business websites, React frontends, Laravel backends, full stack apps, REST APIs, admin panels, landing pages, redesigns and maintenance." path="/services" />
      <PageHeader
        overline="Services"
        title={<>One partner, <br /><span className="text-gradient">the full stack.</span></>}
        description="From a single landing page to a complete full stack platform with a custom backend — here's how I can help your business grow."
      />
      <Section tight>
        <ServicesSection />
      </Section>
      <Section className="bg-card/20">
        <div className="mb-14 text-center">
          <SectionHeading align="center" overline="Pricing" title="Find the right package" lead="Transparent starting points, tailored to your project." />
        </div>
        <PricingSection />
      </Section>
    </>
  );
}
