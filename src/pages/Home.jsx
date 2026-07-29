import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import TechMarquee from "@/components/sections/TechMarquee";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import SocialSection from "@/components/sections/SocialSection";
import ContactSection from "@/components/sections/ContactSection";
import profile from "@/data/profile.json";

const SectionLink = ({ to, label }) => (
  <Link to={to} className="group inline-flex items-center gap-2 font-mono text-sm text-accent">
    {label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Link>
);

export default function Home() {
  return (
    <>
      <SEO title="Senior Full Stack Developer" description="Dhruv Codes builds premium React frontends and Laravel backends that convert visitors into customers for startups and growing brands." path="/" />

      <Hero />

      <Section tight>
        <StatsStrip />
      </Section>

      <TechMarquee />

      {/* About preview */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading overline="About" title={<>A senior developer who <span className="text-gradient">ships results</span></>} />
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/85">{profile.bio[0]}</p>
              <p className="mt-4 text-muted-foreground">{profile.bio[1]}</p>
              <div className="mt-6"><SectionLink to="/about" label="More about me" /></div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Featured work */}
      <Section>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading overline="Selected Work" title="Demo projects that sell" lead="Realistic business websites showing the range and quality I deliver — from bakeries to real estate." />
          <SectionLink to="/portfolio" label="View all 8 projects" />
        </div>
        <PortfolioSection limit={4} showFilter={false} />
      </Section>

      {/* Services */}
      <Section className="bg-card/20">
        <div className="mb-12">
          <SectionHeading overline="Services" title="Everything to launch & grow" lead="Full-service development from a single, senior partner — front to back." />
        </div>
        <ServicesSection />
      </Section>

      {/* Tech stack */}
      <Section>
        <div className="mb-12">
          <SectionHeading overline="Tech Stack" title="Tools I build with" lead="A modern, battle-tested stack for fast, scalable and maintainable products." />
        </div>
        <TechStackSection />
      </Section>

      {/* Process */}
      <Section className="bg-card/20">
        <div className="mb-14">
          <SectionHeading overline="Work Process" title="From idea to launch" lead="A clear, collaborative process so you always know what's happening and what's next." />
        </div>
        <ProcessSection />
      </Section>

      {/* Pricing */}
      {/* <Section>
        <div className="mb-14 text-center">
          <SectionHeading align="center" overline="Pricing" title="Simple, transparent pricing" lead="Pick a starting point — every project is tailored to your goals." />
        </div>
        <PricingSection />
      </Section> */}

      {/* Testimonials */}
      <Section className="bg-card/20">
        <div className="mb-12">
          <SectionHeading overline="Testimonials" title="Loved by clients worldwide" lead="Real words from founders and business owners I've partnered with." />
        </div>
        <TestimonialsSection />
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mb-12 text-center">
          <SectionHeading align="center" overline="FAQ" title="Questions, answered" />
        </div>
        <FaqSection />
      </Section>

      {/* Social */}
      <Section className="bg-card/20">
        <div className="mb-12">
          <SectionHeading overline="Social Presence" title="Follow the journey" lead="Behind-the-scenes builds, design experiments and open-source work." />
        </div>
        <SocialSection />
      </Section>

      {/* Contact */}
      <Section id="contact">
        <ContactSection />
      </Section>
    </>
  );
}
