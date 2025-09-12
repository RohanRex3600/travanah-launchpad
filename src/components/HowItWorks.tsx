import { MessageSquare, Users, MapPin } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Ask a Question",
    description: "Can't find what you're looking for on a map? Type your question, anything from \"Where's the best chai?\" to \"Is the market crowded now?\"."
  },
  {
    icon: Users,
    title: "Get Community Answers",
    description: "Get live, relevant answers and suggestions from a network of locals and fellow explorers who are in the know, right now."
  },
  {
    icon: MapPin,
    title: "Discover & Explore",
    description: "Use the insights from real people to make informed decisions and discover hidden gems that you won't find in guidebooks."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How Travanah Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your answer is just three simple steps away.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-medium group-hover:shadow-strong transition-smooth group-hover:scale-110">
                    <IconComponent className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-travanah-teal-light rounded-full flex items-center justify-center text-white font-bold text-sm shadow-soft">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;