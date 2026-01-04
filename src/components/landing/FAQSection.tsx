import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "Is OneTap Sahayak free to use?",
    answer:
      "Yes. Access to essential services like healthcare, government help, and emergency support is always free.",
  },
  {
    id: "item-2",
    question: "What is the Plus plan?",
    answer:
      "Plus is optional. It offers extra convenience such as multiple languages, WhatsApp updates, and continuous follow-ups.",
  },
  {
    id: "item-3",
    question: "Do I need to know how to use smartphones?",
    answer:
      "No. OneTap Sahayak is voice-first and designed for first-time users, elderly people, and anyone uncomfortable with apps.",
  },
  {
    id: "item-4",
    question: "Which services are available?",
    answer:
      "Healthcare, government services, and emergency help are available for everyone. Jobs, education, and legal aid are also supported.",
  },
  {
    id: "item-5",
    question: "Does it support local languages?",
    answer:
      "Yes. You can use OneTap Sahayak in your local language. Multiple languages are available with assisted access.",
  },
  {
    id: "item-6",
    question: "Will I get updates after my request?",
    answer:
      "Yes. If service details change, you will automatically receive updates through notifications or SMS.",
  },
  {
    id: "item-7",
    question: "Can I use it without internet?",
    answer:
      "Yes. Important updates and reminders can be sent via SMS when internet access is poor or unavailable.",
  },
  {
    id: "item-8",
    question: "How does the SOS feature work?",
    answer:
      "SOS mode provides instant access to emergency contacts, location sharing, and voice-guided steps.",
  },
  {
    id: "item-9",
    question: "Is my phone number safe?",
    answer:
      "Yes. Your number is used only for login and updates. It is never shared or used for advertising.",
  },
  {
    id: "item-10",
    question: "Is this a replacement for government offices?",
    answer:
      "No. OneTap Sahayak helps you understand and reach services faster. It works alongside existing systems.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container-mobile">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <h2 className="text-subheading mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Clear answers for real concerns.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-card rounded-xl border border-border px-4 md:px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Footer Microcopy */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Built for real people, real problems, and real-world conditions.
        </p>
      </div>
    </section>
  );
}
