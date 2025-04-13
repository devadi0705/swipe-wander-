
import React, { useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { MediaItem } from './MediaCard';

interface MediaGalleryProps {
  items: MediaItem[];
  groupBy: 'date' | 'location';
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ items, groupBy }) => {
  // Group media items by location or date
  const groupedItems = React.useMemo(() => {
    const grouped: { [key: string]: MediaItem[] } = {};
    
    items.forEach(item => {
      let groupKey;
      
      if (groupBy === 'location') {
        groupKey = item.location || 'Unknown Location';
      } else { // groupBy === 'date'
        // Group by date (year-month format)
        const date = new Date(item.date);
        groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }
      
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      
      grouped[groupKey].push(item);
    });
    
    return grouped;
  }, [items, groupBy]);

  // Format group titles
  const formatGroupTitle = (key: string) => {
    if (groupBy === 'location') {
      return key;
    } else {
      // Format date groups
      const [year, month] = key.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
    }
  };
  
  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([groupKey, groupItems]) => (
        <div key={groupKey} className="space-y-4">
          <div className="flex items-center gap-2">
            {groupBy === 'location' ? (
              <MapPin className="h-5 w-5 text-wander-purple" />
            ) : (
              <CalendarDays className="h-5 w-5 text-wander-purple" />
            )}
            <h2 className="text-xl font-semibold">{formatGroupTitle(groupKey)}</h2>
            <span className="text-sm text-gray-500">({groupItems.length} items)</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow">
                <div className="aspect-video relative">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.caption || "Travel memory"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative bg-black w-full h-full">
                      <video 
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  {item.caption && (
                    <p className="font-medium">{item.caption}</p>
                  )}
                  {item.notes && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {Object.keys(groupedItems).length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p>No media items to display</p>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
