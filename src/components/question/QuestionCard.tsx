import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  MessageSquare, 
  Eye, 
  AlertCircle,
  ThumbsUp
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface QuestionCardProps {
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
  answer_count?: number;
  status?: string;
  onClick?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  title,
  content,
  author,
  category,
  location_text,
  tags = [],
  is_urgent = false,
  created_at,
  view_count = 0,
  answer_count = 0,
  status = 'open',
  onClick
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'text-green-600';
      case 'closed': return 'text-gray-500';
      default: return 'text-travanah-teal';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'answered': return 'Answered';
      case 'closed': return 'Closed';
      default: return 'Open';
    }
  };

  return (
    <Card 
      className="cursor-pointer transition-smooth hover:shadow-medium group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {is_urgent && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Urgent
                </Badge>
              )}
              {category && (
                <Badge 
                  variant="outline" 
                  style={{ borderColor: category.color }}
                  className="flex items-center gap-1"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Badge>
              )}
              <Badge variant="outline" className={getStatusColor(status)}>
                {getStatusText(status)}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground group-hover:text-travanah-teal transition-smooth line-clamp-2">
              {title}
            </h3>
            
            <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
              {content}
            </p>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={author.avatar_url} />
                <AvatarFallback className="text-xs">
                  {author.full_name?.charAt(0) || author.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="truncate max-w-24">
                {author.full_name || author.username || 'Anonymous'}
              </span>
              {author.reputation_score && author.reputation_score > 0 && (
                <div className="flex items-center gap-1 text-xs text-travanah-teal">
                  <ThumbsUp className="w-3 h-3" />
                  {author.reputation_score}
                </div>
              )}
            </div>
            
            {location_text && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate max-w-32">{location_text}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{view_count}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{answer_count}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};