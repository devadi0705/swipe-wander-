import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { highlightThemes, Highlight } from './HighlightsView';

interface HighlightStoryProps {
  highlight: Highlight;
  onClose: () => void;
}

const HighlightStory: React.FC<HighlightStoryProps> = ({ highlight, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // If there are no items, use a fallback
  const items = highlight.items.length > 0 ? 
    highlight.items : 
    [{ id: 'fallback', type: 'image', url: highlight.coverImage } as any];
  
  // Auto-advance timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + 2;
          
          // Move to next slide when progress completes
          if (newProgress >= 100 && currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
            return 0;
          }
          
          return newProgress;
        });
      } else if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setProgress(0);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [currentIndex, items.length, progress]);
  
  // Reset progress when changing slides manually
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);
  
  const themeConfig = highlightThemes[highlight.theme];
  
  // Navigation handlers
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-md mx-auto">
        {/* Progress indicators */}
        <div className="absolute top-4 left-0 right-0 z-10 flex px-2 gap-1">
          {items.map((_, idx) => (
            <div key={idx} className="h-1 bg-gray-500 bg-opacity-50 flex-1 rounded-full overflow-hidden">
              {idx === currentIndex && (
                <div 
                  className="h-full bg-white transition-transform duration-100 origin-left" 
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              )}
              {idx < currentIndex && (
                <div className="h-full bg-white w-full" />
              )}
            </div>
          ))}
        </div>
        
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-10 text-white p-1 rounded-full"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
        
        {/* Story content */}
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {items.map((item, index) => {
              const currentItem = items[index];
              return (
                <CarouselItem key={item.id} className="h-full">
                  <div className="w-full h-full flex flex-col">
                    <div className="relative flex-1 bg-black">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={item.caption || 'Highlight image'} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video 
                          src={item.url}
                          className="w-full h-full object-contain"
                          autoPlay
                          muted
                          loop
                        />
                      )}
                      
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="text-white">
                          {index === 0 && (
                            <h2 className="text-2xl font-bold mb-1">{highlight.title}</h2>
                          )}
                          <p className="text-sm opacity-90">{item.caption || highlight.description}</p>
                          {item.location && (
                            <p className="text-xs opacity-80 mt-1">{item.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          {/* Custom navigation controls that cover left/right sides */}
          <div className="absolute top-0 left-0 bottom-0 w-1/4" onClick={goToPrevious}></div>
          <div className="absolute top-0 right-0 bottom-0 w-1/4" onClick={goToNext}></div>
        </Carousel>
      </div>
    </div>
  );
};

export default HighlightStory;
