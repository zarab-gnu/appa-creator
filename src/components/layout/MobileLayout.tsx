
import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  title?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  hideNav = false,
  title
}) => {
  const location = useLocation();
  const isOrganizerRoute = location.pathname.startsWith('/organizer');

  return (
    <div className="mobile-container">
      {title && (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
          <h1 className="text-lg font-semibold text-center">{title}</h1>
        </header>
      )}
      <main className={`mobile-page ${title ? 'pt-2' : ''}`}>
        {children}
      </main>
      {!hideNav && <BottomNav isOrganizer={isOrganizerRoute} />}
    </div>
  );
};

export default MobileLayout;
