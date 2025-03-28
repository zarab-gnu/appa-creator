
import React, { useState, useRef, ReactNode } from 'react';

interface SwipeCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ 
  children, 
  onSwipeLeft,
  onSwipeRight
}) => {
  const [startX, setStartX] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    updateCardPosition(diff);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    const currentX = e.clientX;
    const diff = currentX - startX;
    updateCardPosition(diff);
  };
  
  const updateCardPosition = (diff: number) => {
    setCurrentOffset(diff);
    
    if (cardRef.current) {
      const rotate = diff / 10;
      cardRef.current.style.transform = `translateX(${diff}px) rotate(${rotate}deg)`;
      
      // Update opacity of overlays based on swipe direction
      if (diff > 50) {
        setDirection('right');
      } else if (diff < -50) {
        setDirection('left');
      } else {
        setDirection(null);
      }
    }
  };
  
  const handleTouchEnd = () => {
    finishSwipe();
  };
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    finishSwipe();
  };
  
  const finishSwipe = () => {
    if (cardRef.current) {
      if (currentOffset > 100) {
        // Swipe right
        cardRef.current.classList.add('swipe-right');
        if (onSwipeRight) {
          onSwipeRight();
        }
      } else if (currentOffset < -100) {
        // Swipe left
        cardRef.current.classList.add('swipe-left');
        if (onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Return to center
        cardRef.current.style.transform = 'translateX(0) rotate(0)';
      }
      
      setCurrentOffset(0);
      setDirection(null);
    }
  };
  
  return (
    <div className="swipe-card-container">
      <div
        ref={cardRef}
        className="swipe-card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {children}
        
        {direction === 'left' && (
          <div className="absolute top-8 left-8 transform -rotate-12 bg-destructive text-destructive-foreground py-1 px-4 rounded-lg text-xl font-bold opacity-80">
            SKIP
          </div>
        )}
        
        {direction === 'right' && (
          <div className="absolute top-8 right-8 transform rotate-12 bg-primary text-primary-foreground py-1 px-4 rounded-lg text-xl font-bold opacity-80">
            JOIN
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeCard;
