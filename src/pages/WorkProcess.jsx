import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ProcessSection from "@/components/sections/ProcessSection";

export default function WorkProcess() {
  return (
    <>
      <SEO title="Work Process" description="A clear seven-step process — Discovery, Planning, UI/UX, Development, Testing, Deployment and Support — for a smooth, transparent project." path="/process" />
      <PageHeader
        overline="Work Process"
        title={<>How great work <br /><span className="text-gradient">gets shipped.</span></>}
        description="Seven collaborative steps that take your idea from a first conversation to a polished, live product — and beyond."
      />
      <Section tight>
        <ProcessSection />
      </Section>
    </>
  );
}
