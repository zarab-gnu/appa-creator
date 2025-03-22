
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageSquare, User, PlusCircle } from 'lucide-react';

interface BottomNavProps {
  isOrganizer?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ isOrganizer = false }) => {
  const location = useLocation();
  
  const navItems = isOrganizer 
    ? [
        { icon: Home, path: '/organizer/dashboard', label: 'Dashboard' },
        { icon: User, path: '/organizer/volunteers', label: 'Volunteers' },
        { icon: PlusCircle, path: '/organizer/create', label: 'Create' },
        { icon: Calendar, path: '/organizer/analytics', label: 'Analytics' },
        { icon: MessageSquare, path: '/chat', label: 'Chat' },
      ]
    : [
        { icon: Home, path: '/home', label: 'Home' },
        { icon: Calendar, path: '/calendar', label: 'Calendar' },
        { icon: MessageSquare, path: '/chat', label: 'Messages' },
        { icon: User, path: '/profile', label: 'Profile' },
      ];
  
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-1/5 text-xs ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
