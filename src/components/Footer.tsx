import { MapPin, Mail, Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="about" className="bg-travanah-navy text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TRAVANAH</span>
            </div>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Your travel companion for real-time, community-driven answers. 
              Ask around, explore more, and discover the world through local insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-smooth">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-white/60 hover:text-white transition-smooth text-left"
                >
                  How it Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('community-questions')}
                  className="text-white/60 hover:text-white transition-smooth text-left"
                >
                  Community
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-white/60 hover:text-white transition-smooth text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('early-access')}
                  className="text-white/60 hover:text-white transition-smooth text-left"
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:hello@travanah.shop" 
                className="flex items-center space-x-2 text-white/60 hover:text-white transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>hello@travanah.shop</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 Travanah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;