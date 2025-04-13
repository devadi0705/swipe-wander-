
import React from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { PartyPopper, MessageSquare } from 'lucide-react';
import { type TravelProfile } from '../utils/mockData';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TravelProfile | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, profile }) => {
  if (!profile) return null;

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
        </div>
        
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-full bg-wander-softPurple animate-pulse">
              <PartyPopper className="h-8 w-8 text-wander-purple" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">It's a Match!</h2>
          <p className="text-gray-600 mb-6">
            You and {profile.name} are ready to wander together! Time to plan your adventure to {profile.dreamDestination}.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button className="button-gradient">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send a Message
            </Button>
            <Button variant="outline" onClick={onClose}>
              Keep Exploring
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchModal;
