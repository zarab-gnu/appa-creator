
import React from 'react';
import { Settings, Award, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { userProfile, signOut } = useAuth();
  
  // Sample profile data (to be replaced with real data as it becomes available)
  const profile = {
    name: userProfile?.name || 'New User',
    bio: userProfile?.bio || 'Passionate about helping others and making a difference in my community',
    avatar: userProfile?.profile_image_url || 'https://placehold.co/150x150?text=VC',
    stats: {
      hours: 0,
      events: 0,
      streak: 0
    },
    badges: [
      { id: 1, name: 'First Timer', icon: '🌱', description: 'Completed your first volunteer event' },
      { id: 2, name: 'Environment Hero', icon: '🌎', description: 'Participated in 5 environmental events' },
      { id: 3, name: 'Team Player', icon: '👥', description: 'Volunteered in a group event' }
    ],
    skills: userProfile?.skills || ['Teaching', 'Writing', 'Environmental Cleanup'],
    interests: userProfile?.interests || ['Education', 'Environment', 'Animal Welfare']
  };
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <MobileLayout title="Profile">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img 
            src={profile.avatar} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-sm text-muted-foreground text-center mt-1 max-w-xs">{profile.bio}</p>
        
        <div className="flex justify-around w-full mt-6">
          <div className="text-center">
            <p className="text-xl font-bold">{profile.stats.hours}</p>
            <p className="text-xs text-muted-foreground">Hours</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{profile.stats.events}</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{profile.stats.streak}</p>
            <p className="text-xs text-muted-foreground">Week Streak</p>
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold flex items-center mb-4">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Badges
          </h2>
          
          <div className="grid grid-cols-3 gap-2">
            {profile.badges.map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <p className="text-xs font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1 mb-4">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
          
          <h2 className="text-lg font-semibold mb-3">Interests</h2>
          <div className="flex flex-wrap gap-1">
            {profile.interests.map((interest, index) => (
              <span key={index} className="skill-badge bg-accent text-accent-foreground">{interest}</span>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-between">
          <span className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-between text-destructive border-destructive/30"
          onClick={handleSignOut}
        >
          <span className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
