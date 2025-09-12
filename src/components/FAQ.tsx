import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Travanah?",
    answer: "Travanah is a travel community platform where you can ask questions about any location and get real-time answers from locals and fellow travelers. Whether you're looking for the best food spots, checking if a place is crowded, or need directions, our community has you covered."
  },
  {
    question: "How does it work?",
    answer: "Simply ask a question about any location or travel topic. Our community of locals and experienced travelers will provide you with real-time, relevant answers. You can also help others by answering questions about places you know well."
  },
  {
    question: "Is it free to use?",
    answer: "Yes! Travanah will be free to use for asking and answering questions. We believe travel information should be accessible to everyone."
  },
  {
    question: "When will Travanah launch?",
    answer: "We're currently in development and will be launching soon. Join our waitlist to be among the first to know when we go live and get exclusive early access."
  },
  {
    question: "What makes Travanah different from other travel apps?",
    answer: "Unlike other travel apps that show static information, Travanah provides real-time, community-driven answers. You get current, local insights that you won't find in guidebooks or traditional travel apps."
  },
  {
    question: "Can I contribute to the community?",
    answer: "Absolutely! We encourage users to both ask and answer questions. The more our community grows, the better the experience becomes for everyone. Share your local knowledge and travel experiences to help fellow explorers."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Travanah.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 shadow-soft card-gradient"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary transition-smooth py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;