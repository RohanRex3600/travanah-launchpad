import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const EarlyAccess = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the waitlist!",
      description: "We'll notify you when Travanah launches. Thanks for your interest!",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section id="early-access" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-medium border-0 card-gradient">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Get Early Access
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Be among the first to experience Travanah when we launch. 
                Join our waitlist and get exclusive early access.
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 text-base border-2 focus:border-primary transition-smooth"
                  />
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-soft h-12 px-8 group"
                  >
                    {isLoading ? (
                      "Joining..."
                    ) : (
                      <>
                        Join Waitlist
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <p className="text-sm text-muted-foreground mt-4">
                We respect your privacy. No spam, just updates about Travanah.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;