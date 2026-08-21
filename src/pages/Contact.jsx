import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import ContactSection from "@/components/sections/ContactSection";

export default function Contact() {
  return (
    <>
      <SEO title="Contact" description="Start a project with Dhruv Digital Solutions. Send an inquiry, message on WhatsApp or book a free consultation." path="/contact" />
      <PageHeader
        overline="Contact"
        title={<>Let's build <br /><span className="text-gradient">something great.</span></>}
        description="Send me the details of your project and I'll reply within 24 hours with a clear plan and next steps."
      />
      <Section tight>
        <ContactSection />
      </Section>
    </>
  );
}
