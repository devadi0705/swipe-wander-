
import React, { useState } from 'react';
import { Play, Edit3, Trash2, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MediaItem {
  id: string;
  file: File;
  type: 'image' | 'video';
  url: string;
  location?: string;
  date: Date;
  caption?: string;
  notes?: string;
}

interface MediaCardProps {
  item: MediaItem;
  onDelete: (id: string) => void;
  onEditNotes: (id: string, notes: string) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onDelete, onEditNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');

  const handleEdit = () => {
    if (isEditing) {
      onEditNotes(item.id, notes);
    }
    setIsEditing(!isEditing);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-md transition-transform hover:shadow-lg hover:scale-[1.01]">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {item.type === 'image' ? (
          <img 
            src={item.url} 
            alt={item.caption || 'Travel photo'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <video 
              src={item.url} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="icon" variant="secondary" className="rounded-full bg-white/70 hover:bg-white">
                <Play className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {item.caption && (
          <h3 className="text-base font-medium mb-2">{item.caption}</h3>
        )}
        
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
          {item.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> 
              <span>{item.location}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> 
            <span>{formatDate(item.date)}</span>
          </div>
        </div>
        
        {isEditing ? (
          <textarea 
            className="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this moment..."
            rows={3}
          />
        ) : (
          notes && <p className="text-sm text-gray-700 mb-2">{notes}</p>
        )}
        
        <div className="flex justify-end gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleEdit}
          >
            <Edit3 className="h-4 w-4 mr-1" /> 
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-destructive border-destructive hover:bg-destructive/10"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> 
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
