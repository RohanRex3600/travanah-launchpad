import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 transition-smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TRAVANAH</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              About
            </button>
            <Button 
              onClick={() => scrollToSection('early-access')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-soft"
            >
              Get Early Access
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-muted-foreground hover:text-foreground transition-smooth"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-left text-muted-foreground hover:text-foreground transition-smooth"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-muted-foreground hover:text-foreground transition-smooth"
              >
                About
              </button>
              <Button 
                onClick={() => scrollToSection('early-access')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-soft w-fit"
              >
                Get Early Access
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;