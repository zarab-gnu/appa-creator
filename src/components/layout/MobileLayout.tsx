
import React, { ReactNode } from 'react';
import BottomNav from './BottomNav';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  showBottomNav?: boolean;
  hideNav?: boolean;
  headerRight?: ReactNode;
}

const MobileLayout = ({
  children,
  title,
  showBackButton = false,
  showBottomNav = true,
  hideNav = false,
  headerRight
}: MobileLayoutProps) => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="mobile-container">
      {(title || showBackButton || headerRight) && (
        <header className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={goBack}
                className="mr-2 p-1 rounded-full hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </div>
          
          {headerRight && (
            <div className="ml-auto">
              {headerRight}
            </div>
          )}
        </header>
      )}
      
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
      
      {showBottomNav && !hideNav && <BottomNav />}
    </div>
  );
};

export default MobileLayout;
