import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import FaqSection from "@/components/sections/FaqSection";

export default function FAQ() {
  return (
    <>
      <SEO title="FAQ" description="Answers to common questions about technologies, timelines, Laravel backends, maintenance and how to get started with Dhruv Codes." path="/faq" />
      <PageHeader
        overline="FAQ"
        title={<>Everything you <br /><span className="text-gradient">need to know.</span></>}
        description="Still curious? Reach out any time — I'm happy to talk through your project."
      />
      <Section tight>
        <FaqSection />
      </Section>
    </>
  );
}
