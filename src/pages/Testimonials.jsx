import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SocialSection from "@/components/sections/SocialSection";

export default function Testimonials() {
  return (
    <>
      <SEO title="Testimonials" description="What founders and business owners say about working with Dhruv Digital Solutions — premium results, clear communication and reliable delivery." path="/testimonials" />
      <PageHeader
        overline="Testimonials"
        title={<>Trusted by brands <br /><span className="text-gradient">that grew.</span></>}
        description="Real feedback from clients across bakeries, resorts, agencies, gyms and real estate."
      />
      <Section tight>
        <TestimonialsSection />
      </Section>
      <Section className="bg-card/20">
        <div className="mb-12">
          <SectionHeading overline="Social Presence" title="Follow along" lead="See the process and latest work across my channels." />
        </div>
        <SocialSection />
      </Section>
    </>
  );
}
