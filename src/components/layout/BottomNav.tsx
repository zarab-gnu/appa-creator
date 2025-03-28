
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BottomNav = () => {
  const { userProfile } = useAuth();
  const isOrganizer = userProfile?.user_type === 'organizer';
  
  return (
    <nav className="sticky bottom-0 border-t border-border bg-background">
      <div className="flex justify-around">
        <NavLink
          to={isOrganizer ? '/organizer/dashboard' : '/home'}
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 flex-1 ${
              isActive 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 flex-1 ${
              isActive 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Calendar</span>
        </NavLink>
        
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 flex-1 ${
              isActive 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Chat</span>
        </NavLink>
        
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 flex-1 ${
              isActive 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
