
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaItem } from './MediaCard';
import { highlightThemes, HighlightTheme } from './HighlightsView';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

interface CreateHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
}

const CreateHighlightModal: React.FC<CreateHighlightModalProps> = ({ isOpen, onClose, mediaItems }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<HighlightTheme>('travel');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Get unique locations from media items
  const locations = [...new Set(mediaItems
    .filter(item => item.location)
    .map(item => item.location || ''))];
  
  const handleCreate = () => {
    // In a real app, we'd call an API to create the highlight
    
    // For the demo, just show a success message
    toast.success('Highlight created successfully!', {
      description: `"${title}" has been added to your highlights.`
    });
    
    // Reset form and close modal
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedTheme('travel');
    setSelectedLocation('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Highlight</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Highlight Title</Label>
            <Input
              id="title"
              placeholder="Summer in Paris"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="A short description of your travel highlight"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Select Location</Label>
            <div className="grid grid-cols-2 gap-2">
              {locations.length > 0 ? (
                locations.map(location => (
                  <Button
                    key={location}
                    type="button"
                    variant={selectedLocation === location ? "default" : "outline"}
                    className={selectedLocation === location ? "button-gradient" : ""}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </Button>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2">
                  No locations found in your media. Upload photos with location data.
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Choose Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(highlightThemes).map(([key, theme]) => {
                const ThemeIcon = theme.icon;
                const isSelected = selectedTheme === key;
                
                return (
                  <div
                    key={key}
                    className={`flex flex-col items-center p-3 rounded-md cursor-pointer border-2 transition-all ${
                      isSelected 
                        ? `border-wander-purple bg-${highlightThemes[key as HighlightTheme].secondary}` 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                    onClick={() => setSelectedTheme(key as HighlightTheme)}
                  >
                    <div className={`relative rounded-full p-2 mb-1 bg-gradient-to-br ${theme.primary}`}>
                      <ThemeIcon size={16} className="text-white" />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 bg-wander-purple text-white rounded-full w-4 h-4 flex items-center justify-center">
                          <Check size={10} />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center">{theme.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleCreate} 
            disabled={!title || !selectedLocation}
            className="button-gradient"
          >
            Create Highlight
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHighlightModal;
