import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Camera, CalendarDays, MapPin, BookOpen, Plus } from 'lucide-react';
import { toast } from 'sonner';

import NavBar from '@/components/NavBar';
import MediaUploader from '@/components/MediaUploader';
import MediaCard, { MediaItem } from '@/components/MediaCard';
import MediaGallery from '@/components/MediaGallery';
import HighlightsView from '@/components/HighlightsView';
import CreateHighlightModal from '@/components/CreateHighlightModal';

// Mock function to simulate AI generating captions
const generateCaption = (file: File): string => {
  // In a real app, this would call an AI service
  const locations = [
    'Paris, France', 
    'Tokyo, Japan', 
    'New York City, USA', 
    'Bali, Indonesia',
    'Cape Town, South Africa'
  ];
  
  const activities = [
    'enjoying sunset views', 
    'exploring local markets', 
    'hiking mountain trails',
    'relaxing at the beach',
    'discovering street art'
  ];
  
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  
  return `${randomActivity} in ${randomLocation}`;
};

export type ViewMode = 'grid' | 'organized' | 'highlights';

const Gallery: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [groupBy, setGroupBy] = useState<'date' | 'location'>('date');
  const [isCreateHighlightOpen, setIsCreateHighlightOpen] = useState(false);
  
  const handleMediaUpload = async (files: File[]) => {
    setIsUploading(true);
    
    try {
      const newItems: MediaItem[] = await Promise.all(files.map(async (file) => {
        // Create object URL for preview
        const url = URL.createObjectURL(file);
        
        // Determine media type
        const isVideo = file.type.startsWith('video/');
        
        // Extract date from file or use current date
        const date = new Date(); // In a real app, extract from EXIF data if available
        
        // Generate caption using AI (mocked)
        const caption = generateCaption(file);
        
        // Extract location (mocked - would use EXIF data in real app)
        const location = caption.split(' in ')[1];
        
        return {
          id: uuidv4(),
          file,
          type: isVideo ? 'video' : 'image',
          url,
          date,
          caption,
          location,
          notes: ''
        };
      }));
      
      setMediaItems(prev => [...newItems, ...prev]);
    } catch (error) {
      toast.error('There was a problem uploading your media');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDeleteItem = (id: string) => {
    setMediaItems(prev => {
      const itemToDelete = prev.find(item => item.id === id);
      if (itemToDelete) {
        // Revoke object URL to prevent memory leaks
        URL.revokeObjectURL(itemToDelete.url);
      }
      return prev.filter(item => item.id !== id);
    });
    toast.success('Media deleted successfully');
  };
  
  const handleEditNotes = (id: string, notes: string) => {
    setMediaItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, notes } : item
      )
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Travel Memories</h1>
            <p className="text-gray-600">Capture and organize your journey highlights</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'button-gradient' : ''}
            >
              <Camera className="mr-2 h-4 w-4" />
              All Media
            </Button>
            <Button 
              variant={viewMode === 'organized' ? 'default' : 'outline'} 
              onClick={() => setViewMode('organized')}
              className={viewMode === 'organized' ? 'button-gradient' : ''}
            >
              {groupBy === 'date' ? (
                <CalendarDays className="mr-2 h-4 w-4" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              Organized View
            </Button>
            <Button 
              variant={viewMode === 'highlights' ? 'default' : 'outline'} 
              onClick={() => setViewMode('highlights')}
              className={viewMode === 'highlights' ? 'button-gradient' : ''}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Highlights
            </Button>
            
            {viewMode === 'highlights' && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setIsCreateHighlightOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" />
                New Highlight
              </Button>
            )}
            
            {viewMode === 'organized' && (
              <div className="ml-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setGroupBy(groupBy === 'date' ? 'location' : 'date')}
                >
                  {groupBy === 'date' ? (
                    <>
                      <MapPin className="mr-2 h-4 w-4" />
                      Group by Location
                    </>
                  ) : (
                    <>
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Group by Date
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <MediaUploader onMediaUpload={handleMediaUpload} />
        </div>
        
        {isUploading && (
          <div className="w-full p-4 mb-8 bg-blue-50 text-blue-700 rounded-md text-center">
            Processing your media... This might take a moment.
          </div>
        )}
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map(item => (
              <MediaCard 
                key={item.id} 
                item={item} 
                onDelete={handleDeleteItem}
                onEditNotes={handleEditNotes}
              />
            ))}
            
            {mediaItems.length === 0 && !isUploading && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg mb-2">Your gallery is empty</p>
                <p className="text-sm">Upload some travel photos and videos to get started</p>
              </div>
            )}
          </div>
        ) : viewMode === 'organized' ? (
          <MediaGallery items={mediaItems} groupBy={groupBy} />
        ) : (
          <HighlightsView mediaItems={mediaItems} />
        )}
      </main>

      <CreateHighlightModal 
        isOpen={isCreateHighlightOpen} 
        onClose={() => setIsCreateHighlightOpen(false)}
        mediaItems={mediaItems}
      />
    </div>
  );
};

export default Gallery;
