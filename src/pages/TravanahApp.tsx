import React, { useState, useEffect } from 'react';
import { TravanahHeader } from '@/components/layout/TravanahHeader';
import { QuestionForm } from '@/components/question/QuestionForm';
import { QuestionCard } from '@/components/question/QuestionCard';
import { QuestionDetail } from '@/components/question/QuestionDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Filter, 
  MapPin, 
  TrendingUp, 
  Clock,
  Users,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: '1', name: 'Food & Dining', icon: '🍕', color: '#F59E0B' },
  { id: '2', name: 'Travel & Transportation', icon: '✈️', color: '#3B82F6' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { id: '4', name: 'Entertainment', icon: '🎭', color: '#8B5CF6' },
  { id: '5', name: 'Services', icon: '🔧', color: '#10B981' },
  { id: '6', name: 'Health & Wellness', icon: '🏥', color: '#EF4444' },
  { id: '7', name: 'Education', icon: '📚', color: '#6366F1' },
  { id: '8', name: 'General', icon: '💬', color: '#6B7280' },
];

// Mock data for development
const mockQuestions = [
  {
    id: '1',
    title: 'Best momos place near Connaught Place?',
    content: 'Looking for authentic momos within 2km radius of CP. Prefer vegetarian options with good hygiene standards.',
    author: {
      id: '1',
      username: 'foodie_delhi',
      full_name: 'Rahul Sharma',
      avatar_url: '/api/placeholder/40/40',
      reputation_score: 245
    },
    category: categories[0],
    location_text: 'Connaught Place, Delhi',
    tags: ['momos', 'vegetarian', 'delhi', 'street-food'],
    is_urgent: false,
    created_at: new Date().toISOString(),
    view_count: 23,
    answer_count: 5,
    status: 'open'
  },
  {
    id: '2',
    title: 'Guitar shop recommendations in Mumbai?',
    content: 'Want to buy my first acoustic guitar. Budget around ₹15k. Any reliable shops in Bandra or nearby areas?',
    author: {
      id: '2',
      username: 'music_lover',
      full_name: 'Priya Patel',
      avatar_url: '/api/placeholder/40/40',
      reputation_score: 89
    },
    category: categories[2],
    location_text: 'Bandra, Mumbai',
    tags: ['guitar', 'music', 'shopping', 'mumbai'],
    is_urgent: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    view_count: 15,
    answer_count: 3,
    status: 'open'
  },
  {
    id: '3',
    title: 'URGENT: Late night pharmacy near Koramangala?',
    content: 'Need medicines urgently. Any 24/7 pharmacy open in Koramangala area?',
    author: {
      id: '3',
      username: 'bangalore_resident',
      full_name: 'Ankit Kumar',
      avatar_url: '/api/placeholder/40/40',
      reputation_score: 156
    },
    category: categories[5],
    location_text: 'Koramangala, Bangalore',
    tags: ['pharmacy', 'urgent', 'bangalore', 'healthcare'],
    is_urgent: true,
    created_at: new Date(Date.now() - 1800000).toISOString(),
    view_count: 45,
    answer_count: 8,
    status: 'answered'
  }
];

export const TravanahApp: React.FC = () => {
  const [view, setView] = useState<'feed' | 'ask' | 'question'>('feed');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [questions, setQuestions] = useState(mockQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [locationFilter, setLocationFilter] = useState('');
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Filter and sort questions
  useEffect(() => {
    let filtered = [...questions];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(q => q.category?.id === categoryFilter);
    }

    // Filter by location
    if (locationFilter.trim()) {
      filtered = filtered.filter(q => 
        q.location_text?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Sort questions
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        break;
      case 'answered':
        filtered.sort((a, b) => (b.answer_count || 0) - (a.answer_count || 0));
        break;
      case 'urgent':
        filtered.sort((a, b) => {
          if (a.is_urgent && !b.is_urgent) return -1;
          if (!a.is_urgent && b.is_urgent) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
    }

    setFilteredQuestions(filtered);
  }, [questions, categoryFilter, sortBy, locationFilter]);

  const handleNewQuestion = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to ask a question.",
        variant: "destructive"
      });
      return;
    }
    setView('ask');
  };

  const handleQuestionSubmit = () => {
    setView('feed');
    toast({
      title: "Question Posted! 🎉",
      description: "Your question is now live and the community will help you soon.",
    });
  };

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
    setView('question');
  };

  const handleBackToFeed = () => {
    setView('feed');
    setSelectedQuestion(null);
  };

  const renderFeedView = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      {user && (
        <Card className="bg-gradient-to-br from-travanah-teal/10 to-travanah-teal-light/5 border-travanah-teal/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-travanah-navy">
                  Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Explorer'}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Ready to discover something new or help fellow travelers?
                </p>
              </div>
              <Button 
                onClick={handleNewQuestion}
                className="bg-travanah-teal hover:bg-travanah-teal-dark"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <Card className="lg:w-80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location
              </label>
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Most Recent
                    </div>
                  </SelectItem>
                  <SelectItem value="popular">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Most Popular
                    </div>
                  </SelectItem>
                  <SelectItem value="answered">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Most Answered
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Urgent First
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="flex-1 space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                {...question}
                onClick={() => handleQuestionClick(question)}
              />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No questions found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or be the first to ask!
                </p>
                <Button 
                  onClick={handleNewQuestion}
                  className="bg-travanah-teal hover:bg-travanah-teal-dark"
                >
                  Ask the First Question
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <TravanahHeader 
        onNewQuestion={handleNewQuestion}
        onProfileClick={() => console.log('Profile clicked')}
      />
      
      <main className="container mx-auto px-4 py-6">
        {view === 'feed' && renderFeedView()}
        
        {view === 'ask' && (
          <div className="max-w-4xl mx-auto">
            <QuestionForm onSubmit={handleQuestionSubmit} />
          </div>
        )}
        
        {view === 'question' && selectedQuestion && (
          <div className="max-w-6xl mx-auto">
            <QuestionDetail 
              question={selectedQuestion}
              onBack={handleBackToFeed}
            />
          </div>
        )}
      </main>
    </div>
  );
};