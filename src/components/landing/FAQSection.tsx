import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "What is OneTap Sahayak?",
    answer:
      "OneTap Sahayak is a voice-first AI assistant that helps people easily access healthcare, government services, education, jobs, legal aid, and emergency support.",
  },
  {
    id: "item-2",
    question: "Is OneTap Sahayak free to use?",
    answer:
      "Yes. All essential services and emergency support are completely free for everyone.",
  },
  {
    id: "item-3",
    question: "How do I use OneTap Sahayak?",
    answer:
      "Just speak your need in your local language. The system understands your request and guides you step by step to the right service.",
  },
  {
    id: "item-4",
    question: "Do I need to know how to use apps or smartphones?",
    answer:
      "No. OneTap Sahayak is designed for first-time users, elderly people, and anyone with low digital literacy. Voice is enough.",
  },
  {
    id: "item-5",
    question: "Which services are supported?",
    answer:
      "Healthcare, government schemes, and emergency help are available for everyone. Education, jobs, and legal aid are also supported.",
  },
  {
    id: "item-6",
    question: "Will I get updates after I request a service?",
    answer:
      "Yes. If timings, eligibility, documents, or deadlines change, you will automatically receive updates through notifications or SMS.",
  },
  {
    id: "item-7",
    question: "Can I use OneTap Sahayak without internet?",
    answer:
      "Yes. Even with low or no internet, you can receive important updates and reminders through SMS.",
  },
  {
    id: "item-8",
    question: "What is the SOS feature?",
    answer:
      "SOS mode gives instant access to emergency contacts, location sharing, and voice-guided instructions during urgent situations.",
  },
  {
    id: "item-9",
    question: "Is my phone number safe and private?",
    answer:
      "Yes. Your phone number is used only for login and service updates. It is never shared or used for advertising.",
  },
  {
    id: "item-10",
    question: "Does OneTap Sahayak replace government offices?",
    answer:
      "No. It works alongside existing systems by helping you understand services and reach the right place faster.",
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
