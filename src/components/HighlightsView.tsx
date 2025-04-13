import React, { useState } from 'react';
import { MediaItem } from './MediaCard';
import { 
  Plane, Mountain, Waves, Coffee, Utensils, 
  Map, Camera, Star, Heart, Trees 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import HighlightStory from './HighlightStory';

// Define the highlight theme colors
export const highlightThemes = {
  beach: {
    primary: 'from-blue-400 to-cyan-300',
    secondary: 'bg-cyan-50',
    icon: Waves,
    name: 'Beach Getaway'
  },
  city: {
    primary: 'from-gray-700 to-gray-500',
    secondary: 'bg-gray-50',
    icon: Coffee,
    name: 'Urban Adventure'
  },
  mountain: {
    primary: 'from-emerald-600 to-green-400',
    secondary: 'bg-green-50',
    icon: Mountain,
    name: 'Mountain Escape'
  },
  tropical: {
    primary: 'from-orange-400 to-amber-300',
    secondary: 'bg-amber-50',
    icon: Trees,
    name: 'Tropical Paradise'
  },
  food: {
    primary: 'from-red-500 to-orange-400',
    secondary: 'bg-orange-50',
    icon: Utensils,
    name: 'Culinary Journey'
  },
  travel: {
    primary: 'from-wander-purple to-wander-blue',
    secondary: 'bg-wander-softPurple',
    icon: Plane,
    name: 'Adventure'
  }
};

export type HighlightTheme = keyof typeof highlightThemes;

export interface Highlight {
  id: string;
  title: string;
  description?: string;
  theme: HighlightTheme;
  coverImage: string;
  items: MediaItem[];
  location?: string;
  date?: Date;
  isNew?: boolean; // To track if the highlight is new/unread
}

// Mock data for highlights
const mockHighlights: Highlight[] = [
  {
    id: '1',
    title: 'Bali Getaway',
    description: 'Exploring the beaches and culture of Bali',
    theme: 'tropical',
    coverImage: 'https://source.unsplash.com/random/300×300/?bali',
    location: 'Bali, Indonesia',
    date: new Date('2023-06-15'),
    items: [],
    isNew: true
  },
  {
    id: '2',
    title: 'Tokyo Adventure',
    description: 'Bright lights and amazing food',
    theme: 'city',
    coverImage: 'https://source.unsplash.com/random/300×300/?tokyo',
    location: 'Tokyo, Japan',
    date: new Date('2023-08-10'),
    items: []
  },
  {
    id: '3',
    title: 'Swiss Alps',
    description: 'Hiking through breathtaking mountains',
    theme: 'mountain',
    coverImage: 'https://source.unsplash.com/random/300×300/?swiss+alps',
    location: 'Switzerland',
    date: new Date('2023-07-22'),
    items: []
  }
];

interface HighlightsViewProps {
  mediaItems: MediaItem[];
}

const HighlightsView: React.FC<HighlightsViewProps> = ({ mediaItems }) => {
  // In a real app, we'd fetch highlights from an API
  const [highlights, setHighlights] = useState<Highlight[]>(mockHighlights);
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(null);
  
  // Group media items by their location attribute
  const enrichHighlights = () => {
    // This would be where we'd match media items to highlights based on location/date
    return highlights.map(highlight => {
      const matchingItems = mediaItems.filter(item => 
        item.location?.includes(highlight.location?.split(',')[0] || '')
      );
      
      return {
        ...highlight,
        items: matchingItems.length > 0 ? matchingItems : highlight.items
      };
    });
  };
  
  const enrichedHighlights = enrichHighlights();
  
  return (
    <div>
      {activeHighlight ? (
        <HighlightStory 
          highlight={activeHighlight} 
          onClose={() => setActiveHighlight(null)} 
        />
      ) : (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-white to-wander-softPurple py-6 px-4 rounded-xl">
            <h2 className="text-2xl font-medium mb-6 text-center">Your Travel Stories</h2>
            
            {/* Instagram-style highlight circles */}
            <div className="flex justify-center space-x-4 overflow-x-auto py-4 px-2">
              {enrichedHighlights.map(highlight => {
                const ThemeIcon = highlightThemes[highlight.theme].icon;
                
                return (
                  <div 
                    key={highlight.id}
                    onClick={() => setActiveHighlight(highlight)}
                    className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                  >
                    <div className={`relative mb-2 ${highlight.isNew ? 'animate-pulse' : ''}`}>
                      {/* Gradient ring for new/unread highlights */}
                      {highlight.isNew && (
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-wander-purple to-wander-orange animate-pulse"></div>
                      )}
                      
                      {/* Highlight circle */}
                      <div className={`h-16 w-16 rounded-full border-2 border-white overflow-hidden relative ${
                        highlight.isNew ? 'z-10' : ''
                      }`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${highlightThemes[highlight.theme].primary}`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ThemeIcon className="text-white" size={28} />
                        </div>
                      </div>
                    </div>
                    
                    <span className="text-xs font-medium text-center max-w-[70px] truncate">
                      {highlight.title}
                    </span>
                  </div>
                );
              })}
              
              {/* Add new highlight button */}
              <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105">
                <div className="h-16 w-16 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center mb-2">
                  <span className="text-2xl text-gray-400">+</span>
                </div>
                <span className="text-xs font-medium text-center max-w-[70px]">
                  New Story
                </span>
              </div>
            </div>
          </div>
          
          {/* Grid view of highlights (keeping this as a secondary view) */}
          <div>
            <h3 className="text-xl font-medium mb-4">All Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {enrichedHighlights.map(highlight => {
                const ThemeIcon = highlightThemes[highlight.theme].icon;
                
                return (
                  <Card 
                    key={highlight.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setActiveHighlight(highlight)}
                  >
                    <div className="aspect-square overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${highlightThemes[highlight.theme].primary} opacity-70`}></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                        <div className="h-16 w-16 rounded-full border-2 border-white flex items-center justify-center mb-2">
                          <ThemeIcon size={32} />
                        </div>
                        <h3 className="font-medium text-center">{highlight.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="text-xs text-gray-500 flex items-center justify-between">
                        <span>{highlight.location}</span>
                        <span>
                          {highlight.items.length} {highlight.items.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {enrichedHighlights.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <Map size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">No highlights yet</p>
                  <p className="text-sm">Create your first travel highlight to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightsView;
