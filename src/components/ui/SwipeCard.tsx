
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight 
}) => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const startXRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    
    // Only allow horizontal swiping
    cardRef.current.style.transform = `translateX(${diff}px) rotate(${diff * 0.05}deg)`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const currentX = e.changedTouches[0].clientX;
    const diff = currentX - startXRef.current;
    
    // If swiped far enough, trigger swipe action
    if (Math.abs(diff) > 100) {
      if (diff > 0) {
        setSwipeDirection('right');
        setTimeout(() => {
          onSwipeRight && onSwipeRight();
        }, 300);
      } else {
        setSwipeDirection('left');
        setTimeout(() => {
          onSwipeLeft && onSwipeLeft();
        }, 300);
      }
    } else {
      // Reset position if not swiped far enough
      cardRef.current.style.transform = '';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`swipe-card ${swipeDirection === 'left' ? 'swipe-left' : ''} ${swipeDirection === 'right' ? 'swipe-right' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Card className="opportunity-card border-0 shadow-lg">
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default SwipeCard;
