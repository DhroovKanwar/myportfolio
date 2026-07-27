import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import PortfolioSection from "@/components/sections/PortfolioSection";

export default function Portfolio() {
  return (
    <>
      <SEO title="Portfolio" description="Explore premium demo websites — Bakery, Car Service, Hotel, Restaurant, Marketing Agency, Gym, Salon and Real Estate — built with React and Laravel-ready architecture." path="/portfolio" />
      <PageHeader
        overline="Selected Work"
        title={<>Websites that <span className="text-gradient">win clients.</span></>}
        description="Eight realistic business demos across industries. Filter by category, explore the details, and request a similar build for your brand."
      />
      <Section tight>
        <PortfolioSection />
      </Section>
    </>
  );
}
