import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CommunityQuestions from "@/components/CommunityQuestions";
import HowItWorks from "@/components/HowItWorks";
import EarlyAccess from "@/components/EarlyAccess";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CommunityQuestions />
      <HowItWorks />
      <EarlyAccess />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;