import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import AboutSection from "@/components/sections/AboutSection";
import StatsStrip from "@/components/sections/StatsStrip";
import TechStackSection from "@/components/sections/TechStackSection";

export default function About() {
  return (
    <>
      <SEO title="About" description="Meet Dhruv Kanwar — a senior full stack developer specialising in React, Laravel, PHP, JavaScript and modern business websites." path="/about" />
      <PageHeader
        overline="About Me"
        title={<>Full stack craft, <br /><span className="text-gradient">business-first thinking.</span></>}
        description="I'm Dhruv — I design and build premium websites and web apps that look world-class and drive real business results."
      />
      <Section tight><StatsStrip /></Section>
      <Section><AboutSection /></Section>
      <Section className="bg-card/20">
        <div className="mb-12"><SectionHeading overline="Capabilities" title="The stack behind the work" /></div>
        <TechStackSection />
      </Section>
    </>
  );
}
