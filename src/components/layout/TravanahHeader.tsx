import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Bell, 
  Plus,
  User,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

interface TravanahHeaderProps {
  onNewQuestion?: () => void;
  onProfileClick?: () => void;
}

export const TravanahHeader: React.FC<TravanahHeaderProps> = ({
  onNewQuestion,
  onProfileClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-travanah-teal to-travanah-teal-light rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-travanah-navy">Travanah</h1>
            <p className="text-xs text-muted-foreground -mt-1">Community Q&A</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, topics, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus:bg-background transition-smooth"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Ask Question Button */}
              <Button
                onClick={onNewQuestion}
                className="bg-travanah-teal hover:bg-travanah-teal-dark transition-smooth flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Ask Question</span>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                >
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>My Questions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost">Sign In</Button>
              <Button className="bg-travanah-teal hover:bg-travanah-teal-dark">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};