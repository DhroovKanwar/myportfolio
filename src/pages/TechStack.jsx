import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import TechStackSection from "@/components/sections/TechStackSection";
import TechMarquee from "@/components/sections/TechMarquee";

export default function TechStack() {
  return (
    <>
      <SEO title="Tech Stack" description="The modern technologies powering Dhruv Digital Solutions: React, Laravel, PHP, JavaScript, TypeScript, Tailwind CSS, MySQL, Git, GitHub, Axios, REST API, Vite, OpenAI/LLMs and Twilio." path="/tech-stack" />
      <PageHeader
        overline="Tech Stack"
        title={<>A modern stack, <br /><span className="text-gradient">mastered.</span></>}
        description="Twelve core technologies I use daily to build fast, scalable and maintainable products from front to back."
      />
      <Section tight>
        <TechStackSection />
      </Section>
      <TechMarquee />
    </>
  );
}
