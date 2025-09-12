import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import misalPavImage from "@/assets/misal-pav.jpg";
import ganpatiFestivalImage from "@/assets/ganpati-festival.jpg";
import goaBeachImage from "@/assets/goa-beach-shack.jpg";

const questions = [
  {
    id: 1,
    image: misalPavImage,
    title: "Best Misal Pav near Matunga station?",
    answer: "Definitely try Ramashray, it's legendary! But if the queue is long, Aaswad is just around the corner and almost as good...",
    answerCount: 6,
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    image: ganpatiFestivalImage,
    title: "GSB Mandal darshan is over. Any others open near Matunga?",
    answer: "GSB was only for 5 days! Head to Lalbaugcha Raja, it's still open. Take a local to Parel station, it's a 10 min walk from there...",
    answerCount: 4,
    location: "Mumbai, Maharashtra"
  },
  {
    id: 3,
    image: goaBeachImage,
    title: "Looking for a quiet beach shack in North Goa with live music.",
    answer: "Forget Baga/Calangute. Head to Ashvem. La Plage is great but pricey. Try the smaller shacks next to it for a more chill vibe...",
    answerCount: 8,
    location: "North Goa"
  }
];

const CommunityQuestions = () => {
  return (
    <section id="community-questions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See What People Are Asking
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real questions from users, answered by the community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {questions.map((question) => (
            <Card 
              key={question.id} 
              className="group overflow-hidden shadow-soft hover:shadow-medium transition-smooth card-gradient border-0"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={question.image}
                  alt={question.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-travanah-navy">
                    {question.location}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {question.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  "{question.answer}"
                </p>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{question.answerCount} answers</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-smooth group"
                >
                  View all
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityQuestions;