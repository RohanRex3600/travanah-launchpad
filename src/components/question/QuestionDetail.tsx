import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Clock, 
  Eye, 
  AlertCircle,
  ThumbsUp,
  ArrowLeft,
  Bot,
  Users
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface QuestionDetailProps {
  question: {
    id: string;
    title: string;
    content: string;
    author: {
      id: string;
      username?: string;
      full_name?: string;
      avatar_url?: string;
      reputation_score?: number;
    };
    category?: {
      name: string;
      icon: string;
      color: string;
    };
    location_text?: string;
    tags?: string[];
    is_urgent?: boolean;
    created_at: string;
    view_count?: number;
    status?: string;
  };
  onBack?: () => void;
}

// Mock AI Answer Component
const AIAnswer: React.FC = () => (
  <Card className="border-travanah-teal/20 bg-gradient-to-br from-travanah-teal/5 to-transparent">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-travanah-teal rounded-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <CardTitle className="text-lg">AI-Powered Answer</CardTitle>
          <p className="text-sm text-muted-foreground">
            Compiled from community insights and web research
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p>
            Based on community feedback and current information, here are the best options for your query:
          </p>
          <div className="bg-background/80 rounded-lg p-4 border">
            <h4 className="font-semibold text-travanah-navy mb-2">Top Recommendations:</h4>
            <ul className="space-y-2">
              <li>• <strong>Local favorite:</strong> Mentioned by 8 community members</li>
              <li>• <strong>Highly rated:</strong> 4.7/5 stars with recent reviews</li>
              <li>• <strong>Best value:</strong> Recommended for budget-conscious visitors</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h5 className="font-medium text-travanah-navy mb-2">Route & Location:</h5>
            <div className="bg-muted/50 rounded-lg p-4 border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>📍 15 min walk from your location</span>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                View on Maps
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              👍 Helpful (24)
            </Button>
            <Button variant="outline" size="sm">
              💬 Comment
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated 2 minutes ago
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Mock Community Answers Component
const CommunityAnswers: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="hover:shadow-soft transition-smooth">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={`/api/placeholder/40/40?text=U${i}`} />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Local Expert {i}</span>
                <Badge variant="secondary" className="text-xs">
                  Verified Local
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ThumbsUp className="w-3 h-3" />
                  {50 + i * 10}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                I've been living in this area for {5 + i} years and I can definitely recommend this place. 
                The quality is excellent and the prices are reasonable. Best time to visit is during weekdays.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    👍 {15 + i * 5}
                  </Button>
                  <Button variant="ghost" size="sm">
                    👎 {i}
                  </Button>
                  <Button variant="ghost" size="sm">
                    💬 Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="text-travanah-teal">
                    💝 Tip
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {i} hour{i !== 1 ? 's' : ''} ago
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
    
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="text-center">
          <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-3">
            Know something about this? Share your local knowledge!
          </p>
          <Button variant="outline" className="border-travanah-teal text-travanah-teal hover:bg-travanah-teal hover:text-white">
            Write an Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const QuestionDetail: React.FC<QuestionDetailProps> = ({
  question,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Questions
      </Button>

      {/* Question Details */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                {question.is_urgent && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Urgent
                  </Badge>
                )}
                {question.category && (
                  <Badge 
                    variant="outline" 
                    style={{ borderColor: question.category.color }}
                    className="flex items-center gap-1"
                  >
                    <span>{question.category.icon}</span>
                    {question.category.name}
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-2xl text-foreground mb-4">
                {question.title}
              </CardTitle>
              
              <p className="text-foreground leading-relaxed">
                {question.content}
              </p>
              
              {question.tags && question.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={question.author.avatar_url} />
                  <AvatarFallback>
                    {question.author.full_name?.charAt(0) || question.author.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {question.author.full_name || question.author.username || 'Anonymous'}
                  </p>
                  {question.author.reputation_score && question.author.reputation_score > 0 && (
                    <div className="flex items-center gap-1 text-xs text-travanah-teal">
                      <ThumbsUp className="w-3 h-3" />
                      {question.author.reputation_score} reputation
                    </div>
                  )}
                </div>
              </div>
              
              {question.location_text && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{question.location_text}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{question.view_count || 0} views</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Answers Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AI Answer
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Community ({3})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="mt-6">
          <AIAnswer />
        </TabsContent>
        
        <TabsContent value="community" className="mt-6">
          <CommunityAnswers />
        </TabsContent>
      </Tabs>
    </div>
  );
};