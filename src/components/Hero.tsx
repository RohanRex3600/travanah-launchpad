import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-landscape.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Beautiful mountain landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Ask Around
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed">
          Ask anything, anywhere. Get real-time answers from locals and fellow explorers 
          to find exactly what you're looking for, right now.
        </p>
        <Button 
          onClick={() => scrollToSection('early-access')}
          size="lg"
          className="bg-white text-travanah-navy hover:bg-white/90 transition-smooth shadow-medium text-lg px-8 py-6 rounded-xl"
        >
          Join the Waitlist
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={() => scrollToSection('community-questions')}
          className="text-white/80 hover:text-white transition-smooth animate-bounce"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;