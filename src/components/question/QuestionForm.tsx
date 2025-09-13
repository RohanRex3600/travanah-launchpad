import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';

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

interface QuestionFormProps {
  onSubmit?: () => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(10);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a question.",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and description.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('questions')
        .insert({
          author_id: user.id,
          title: title.trim(),
          content: content.trim(),
          category_id: category || null,
          location_text: location.trim() || null,
          search_radius: searchRadius * 1000, // Convert km to meters
          tags,
          is_urgent: isUrgent,
        });

      if (error) throw error;

      toast({
        title: "Question Posted! 🎉",
        description: "Your question has been shared with the community.",
      });

      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setLocation('');
      setSearchRadius(10);
      setTags([]);
      setIsUrgent(false);

      onSubmit?.();
    } catch (error) {
      console.error('Error posting question:', error);
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-travanah-navy">Ask the Community</CardTitle>
        <p className="text-muted-foreground">
          Get answers from locals and AI-powered insights
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Question Title *
            </label>
            <Input
              placeholder="What would you like to know?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              className="transition-smooth"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/200 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="transition-smooth">
                <SelectValue placeholder="Select a category (optional)" />
              </SelectTrigger>
              <SelectContent>
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

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              <MapPin className="inline-block w-4 h-4 mr-1" />
              Location
            </label>
            <Input
              placeholder="Enter your location (city, area, landmark)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="transition-smooth"
            />
          </div>

          {/* Search Radius */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Search Radius: {searchRadius} km
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Description *
            </label>
            <Textarea
              placeholder="Provide more details about what you're looking for..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={1000}
              className="transition-smooth"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {content.length}/1000 characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Tags (max 5)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            {tags.length < 5 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  maxLength={20}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addTag}
                  disabled={!newTag.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Urgent toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="urgent"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="rounded border-input"
            />
            <label htmlFor="urgent" className="text-sm font-medium">
              Mark as urgent
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-travanah-teal hover:bg-travanah-teal-dark transition-smooth"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            size="lg"
          >
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};