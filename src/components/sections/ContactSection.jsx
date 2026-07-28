import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, MapPin, Send, CalendarCheck, Loader2, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SocialLinks from "@/components/SocialLinks";
import profile from "@/data/profile.json";
import contactService from "@/services/contactService";
import { revealUp, staggerContainer, viewport } from "@/utils/motion";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  message: z.string().min(10, "Tell me a little more (min 10 chars)"),
});

const PROJECT_TYPES = ["Business Website", "React Frontend", "Laravel Backend", "Full Stack App", "REST API", "Website Redesign", "Landing Page", "Other"];
const BUDGETS = ["< $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–2 weeks", "1 month", "Flexible"];

// const CONTACT_CARDS = [
//   { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, testid: "contact-card-email" },
//   { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, testid: "contact-card-phone" },
//   { icon: MessageCircle, label: "WhatsApp", value: profile.whatsapp, href: profile.whatsappLink, testid: "contact-card-whatsapp" },
//   { icon: MapPin, label: "Location", value: profile.location, href: "#", testid: "contact-card-location" },
// ];

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    testid: "contact-card-email",
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: "#",
    testid: "contact-card-location",
  },
];
function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-destructive">{msg}</p>;
}

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", company: "", projectType: "", budget: "", timeline: "", message: "" },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await contactService.submitInquiry(values);
      toast.success("Inquiry sent successfully!", {
        description: `Thanks ${values.name.split(" ")[0]} — I'll reply within 24 hours. Ref: ${res.data.id}`,
      });
      reset();
    } catch (err) {
      toast.error("Couldn't send your inquiry", {
        description: err?.message || "Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectClass = "h-12 rounded-xl border-border bg-background/60";

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Left: intro + cards */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="lg:col-span-4"
      >
        <motion.p variants={revealUp} className="overline text-accent">Let's build</motion.p>
        <motion.h2 variants={revealUp} className="mt-4 font-display text-4xl font-bold tracking-tighter sm:text-5xl">
          Have a project <br /> in mind?
        </motion.h2>
        <motion.p variants={revealUp} className="mt-6 max-w-md text-muted-foreground">
          Tell me about your business and goals. I'll get back within 24 hours with ideas and a clear plan to move forward.
        </motion.p>

       <motion.div
  variants={revealUp}
  className="mt-8 grid grid-cols-1 gap-4 max-w-xs"
>
          {CONTACT_CARDS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "WhatsApp" ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-testid={c.testid}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-accent/60"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.label}</span>
                <span className="mt-1 block truncate text-sm font-semibold">{c.value}</span>
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div variants={revealUp} className="mt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Find me online</p>
          <SocialLinks className="mt-4" />
        </motion.div>
      </motion.div>

      {/* Right: form */}

      {/*
      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="lg:col-span-8"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-testid="contact-form"
          className="rounded-3xl border border-border bg-card/50 p-6 sm:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-2 block text-sm">Name *</Label>
              <Input id="name" placeholder="Your full name" data-testid="contact-name" className="h-12 rounded-xl bg-background/60" {...register("name")} />
              <FieldError msg={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block text-sm">Email *</Label>
              <Input id="email" type="email" placeholder="you@company.com" data-testid="contact-email" className="h-12 rounded-xl bg-background/60" {...register("email")} />
              <FieldError msg={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-2 block text-sm">Phone</Label>
              <Input id="phone" placeholder="+91 ..." data-testid="contact-phone" className="h-12 rounded-xl bg-background/60" {...register("phone")} />
            </div>
            <div>
              <Label htmlFor="company" className="mb-2 block text-sm">Company</Label>
              <Input id="company" placeholder="Your brand" data-testid="contact-company" className="h-12 rounded-xl bg-background/60" {...register("company")} />
            </div>

            <div>
              <Label className="mb-2 block text-sm">Project Type *</Label>
              <Select value={watch("projectType")} onValueChange={(v) => setValue("projectType", v, { shouldValidate: true })}>
                <SelectTrigger data-testid="contact-project-type" className={selectClass}><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError msg={errors.projectType?.message} />
            </div>
            <div>
              <Label className="mb-2 block text-sm">Budget *</Label>
              <Select value={watch("budget")} onValueChange={(v) => setValue("budget", v, { shouldValidate: true })}>
                <SelectTrigger data-testid="contact-budget" className={selectClass}><SelectValue placeholder="Select budget" /></SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError msg={errors.budget?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-2 block text-sm">Timeline *</Label>
              <Select value={watch("timeline")} onValueChange={(v) => setValue("timeline", v, { shouldValidate: true })}>
                <SelectTrigger data-testid="contact-timeline" className={selectClass}><SelectValue placeholder="Select timeline" /></SelectTrigger>
                <SelectContent>
                  {TIMELINES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <FieldError msg={errors.timeline?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message" className="mb-2 block text-sm">Message *</Label>
              <Textarea id="message" rows={4} placeholder="Tell me about your project, goals and any references..." data-testid="contact-message" className="rounded-xl bg-background/60" {...register("message")} />
              <FieldError msg={errors.message?.message} />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="submit"
              disabled={submitting}
              data-testid="contact-submit-button"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60",
              )}
            >
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Inquiry</>}
            </button>
           <a
              href={profile.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Me
            </a> 
            <a
              href={`mailto:${profile.email}?subject=Free%20Consultation`}
              data-testid="contact-consultation-button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-card"
            >
              <CalendarCheck className="h-4 w-4" /> Book Free Consultation <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </form>
      </motion.div>*/}
    </div>
  );
}
