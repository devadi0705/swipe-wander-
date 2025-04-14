
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { PartyPopper, MessageSquare, X, Heart, Sparkles } from 'lucide-react';
import { type TravelProfile } from '../utils/mockData';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TravelProfile | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, profile }) => {
  const navigate = useNavigate();
  
  if (!profile) return null;

  const handleSendMessage = () => {
    navigate(`/chat/${profile.id}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <img 
            src={profile.image} 
            alt={`${profile.name}'s travel photo`}
            className="w-full h-48 object-cover"
          />
          <button onClick={onClose} className="absolute top-2 right-2 bg-black/30 rounded-full p-1 z-20">
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-full bg-wander-softPurple animate-pulse flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-wander-purple" /> 
              <PartyPopper className="h-6 w-6 text-wander-purple ml-1" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
          <p className="text-gray-600 mb-4">
            You and {profile.name} have liked each other! Time to plan your adventure to {profile.dreamDestination}.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="Your profile" 
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full border border-white"></div>
            </div>
            
            <div className="flex items-center justify-center">
              <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
            </div>
            
            <div className="relative">
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 h-3 w-3 rounded-full border border-white"></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button className="button-gradient" onClick={handleSendMessage}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send a Message
            </Button>
            <Button variant="outline" onClick={onClose}>
              Keep Exploring
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            {Math.floor(Math.random() * 50) + 10}% of matches exchange at least 4 messages
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchModal;
