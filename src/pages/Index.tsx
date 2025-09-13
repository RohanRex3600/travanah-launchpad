import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Bot, MapPin, Zap, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-travanah-teal to-travanah-teal-light rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-travanah-navy">Travanah</h1>
              <p className="text-xs text-muted-foreground -mt-1">Community Q&A</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/app">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/app">
              <Button className="bg-travanah-teal hover:bg-travanah-teal-dark">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 hero-gradient text-white">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            🚀 Now Live - Join the Community
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ask Anything,<br />
            <span className="text-travanah-teal-light">Get Real Answers</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with locals and AI-powered insights. From finding the best momos to buying your first guitar - 
            get authentic answers from people who know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" className="bg-white text-travanah-navy hover:bg-white/90">
                Start Asking Questions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-travanah-navy">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-travanah-navy mb-4">
              Why Choose Travanah?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              More than just Q&A - it's your local community guide powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-travanah-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-travanah-teal" />
                </div>
                <CardTitle>Real People, Real Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get authentic answers from locals who've actually been there, done that. 
                  No fake reviews, just genuine experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-travanah-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-travanah-teal" />
                </div>
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI combines community answers with web research to give you 
                  comprehensive insights and routes via Google Maps.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-travanah-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-travanah-teal" />
                </div>
                <CardTitle>Location-Based Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Questions reach the right people in your area. Set your radius 
                  and get answers from locals who know your neighborhood.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-travanah-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-travanah-teal" />
                </div>
                <CardTitle>Instant Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get notified when someone asks something you can answer. 
                  Help your community and earn reputation points.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-travanah-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-travanah-teal" />
                </div>
                <CardTitle>Tip & Appreciate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Show appreciation for great answers with tips and upvotes. 
                  Build a reputation as a helpful community member.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-travanah-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-travanah-teal" />
                </div>
                <CardTitle>Beyond Just Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From food and shopping to services and entertainment - 
                  ask about anything, anywhere. Your local knowledge hub.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-travanah-teal/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-travanah-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of people helping each other discover the best their cities have to offer.
          </p>
          <Link to="/app">
            <Button size="lg" className="bg-travanah-teal hover:bg-travanah-teal-dark">
              Join Travanah Community
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-travanah-teal to-travanah-teal-light rounded"></div>
              <span className="text-sm text-muted-foreground">
                © 2024 Travanah. Made with ❤️ for communities.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-travanah-teal transition-smooth">Privacy</a>
              <a href="#" className="hover:text-travanah-teal transition-smooth">Terms</a>
              <a href="#" className="hover:text-travanah-teal transition-smooth">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;