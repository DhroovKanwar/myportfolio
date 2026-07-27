import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faq from "@/data/faq.json";
import { staggerContainer, revealUp, viewport } from "@/utils/motion";

export default function FaqSection() {
  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="mx-auto max-w-3xl"
    >
      <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
        {faq.map((item, i) => (
          <motion.div key={i} variants={revealUp}>
            <AccordionItem value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="py-6 text-left font-display text-lg font-semibold tracking-tight hover:no-underline sm:text-xl [&[data-state=open]>svg]:text-accent"
              >
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
