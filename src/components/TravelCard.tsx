
import React, { useState, useRef } from 'react';
import { Heart, X, Plane } from 'lucide-react';
import ProfileStats from './ProfileStats';
import { type TravelProfile } from '../utils/mockData';

interface TravelCardProps {
  profile: TravelProfile;
  onSwipe: (direction: 'left' | 'right', profileId: string) => void;
  isActive: boolean;
}

const TravelCard: React.FC<TravelCardProps> = ({ profile, onSwipe, isActive }) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isActive) return;
    
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : (e as React.MouseEvent).clientX;
      
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isActive || startX === 0) return;
    
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : (e as React.MouseEvent).clientX;
      
    const diff = clientX - startX;
    setOffsetX(diff);
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isActive || startX === 0) return;
    
    if (swipeDirection) {
      onSwipe(swipeDirection, profile.id);
    }
    
    // Reset
    setStartX(0);
    setOffsetX(0);
    setSwipeDirection(null);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (!isActive) return;
    setSwipeDirection(direction);
    onSwipe(direction, profile.id);
  };

  // Calculate rotation and opacity based on swipe
  const rotation = offsetX * 0.1; // Rotate slightly based on swipe distance
  const opacity = Math.max(1 - Math.abs(offsetX) / 400, 0.5);

  return (
    <div 
      ref={cardRef}
      className={`travel-card ${isActive ? 'z-10 animate-card-pop' : 'z-0'}`}
      style={{
        transform: isActive && !swipeDirection 
          ? `translateX(${offsetX}px) rotate(${rotation}deg)` 
          : swipeDirection === 'right' 
            ? 'translateX(150%) rotate(30deg)' 
            : swipeDirection === 'left' 
              ? 'translateX(-150%) rotate(-30deg)' 
              : 'none',
        opacity: isActive && !swipeDirection ? opacity : 1,
        transition: startX === 0 ? 'transform 0.3s ease, opacity 0.3s ease' : 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="travel-card-content">
        <img 
          src={profile.image} 
          alt={`${profile.name}'s travel photo`} 
          className="travel-card-image"
        />
        
        <div className="absolute top-0 left-0 w-full p-4">
          <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full inline-flex items-center space-x-1">
            <Plane className="w-3 h-3 text-wander-purple" />
            <span className="text-xs font-medium">{profile.dreamDestination}</span>
          </div>
        </div>
        
        <div className="travel-card-info">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{profile.name}, {profile.age}</h2>
              <span className="text-sm text-gray-500">{profile.location}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{profile.bio}</p>
            
            <div className="mb-3 p-2 bg-wander-softPurple rounded-lg">
              <p className="text-xs font-medium text-wander-purple">{profile.prompt}</p>
              <p className="text-sm italic">"{profile.promptAnswer}"</p>
            </div>
          </div>
          
          <ProfileStats stats={profile.stats} />
        </div>
      </div>
      
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full p-6 flex justify-center space-x-6">
          <button 
            onClick={() => handleButtonSwipe('left')}
            className="action-button bg-gray-100"
          >
            <X className="h-8 w-8 text-gray-600" />
          </button>
          
          <button 
            onClick={() => handleButtonSwipe('right')}
            className="action-button bg-gradient-to-r from-wander-purple to-wander-blue"
          >
            <Heart className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelCard;
