
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Globe, ArrowDownToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import TravelCard from '@/components/TravelCard';
import MatchModal from '@/components/MatchModal';
import { travelProfiles, TravelProfile } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [profiles, setProfiles] = useState<TravelProfile[]>(travelProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<TravelProfile | null>(null);
  const [isAppView, setIsAppView] = useState(false);

  const handleSwipe = (direction: 'left' | 'right', profileId: string) => {
    // If it's a right swipe, we have a match!
    if (direction === 'right') {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setMatchedProfile(profile);
        // 50% chance to show the match modal for demonstration purposes
        if (Math.random() > 0.5) {
          setTimeout(() => {
            setShowMatch(true);
          }, 500);
        } else {
          // If no modal, show a toast
          toast.success(`You liked ${profile.name}!`, {
            description: `Keep swiping to find more travel buddies!`,
          });
        }
      }
    }

    // Move to next card after a short delay
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % profiles.length);
    }, 300);
  };

  const closeMatchModal = () => {
    setShowMatch(false);
  };

  // For simple demo cycling of cards
  useEffect(() => {
    if (isAppView && profiles.length > 0 && currentIndex >= profiles.length) {
      // Restart with the original set
      setCurrentIndex(0);
    }
  }, [currentIndex, profiles.length, isAppView]);

  if (!isAppView) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <section className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden px-6">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-wander-purple/10 via-wander-blue/10 to-wander-orange/10"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-wander-orange/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-wander-purple/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-wander-blue/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
            
            <div className="max-w-2xl mx-auto text-center z-10">
              <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-wander-orange via-wander-purple to-wander-blue bg-clip-text text-transparent">
                Swipe Your Way to Adventure
              </h1>
              <p className="text-xl mb-8 text-gray-700 max-w-xl mx-auto">
                Find travel companions who match your vibe. No stress, just tap, match, and explore!
              </p>
              
              <Button 
                size="lg" 
                onClick={() => setIsAppView(true)} 
                className="button-gradient text-lg px-8 py-6 rounded-full"
              >
                Start Wandering
              </Button>
            </div>
            
            <div className="absolute bottom-12 w-full flex justify-center animate-bounce">
              <ArrowDownToLine className="h-6 w-6 text-gray-500" />
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How WanderMatch Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-wander-softPurple flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-wander-purple">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Travel Profile</h3>
                  <p className="text-gray-600">Share your travel style, bucket list destinations, and what makes you an awesome travel buddy.</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-wander-softPurple flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-wander-purple">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Swipe Through Travelers</h3>
                  <p className="text-gray-600">Find fellow adventurers who match your vibe with our fun, visual card-swiping interface.</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-wander-softPurple flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-wander-purple">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Match & Plan Together</h3>
                  <p className="text-gray-600">When it's a match, start chatting and planning your next great adventure together!</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="py-16 px-6 bg-gradient-to-r from-wander-purple/90 to-wander-blue/90 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Travel Match?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of travelers finding adventure buddies around the world.
              </p>
              <Button 
                size="lg" 
                onClick={() => setIsAppView(true)}
                className="bg-white text-wander-purple hover:bg-white/90 text-lg"
              >
                <Globe className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </div>
          </section>
        </main>
        
        {/* Simple Footer */}
        <footer className="py-8 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} WanderMatch. Find your travel companion.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  // App View (Card Swiping Interface)
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-1 flex flex-col">
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <div className="card-swiper">
            {profiles.map((profile, index) => (
              <TravelCard
                key={profile.id}
                profile={profile}
                onSwipe={handleSwipe}
                isActive={currentIndex === index}
              />
            ))}
            
            {/* Fallback message when all cards have been swiped */}
            {currentIndex >= profiles.length && (
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-2">No more profiles!</h3>
                <p className="text-gray-600 mb-4">Check back soon for more travel buddies.</p>
                <Button 
                  onClick={() => setCurrentIndex(0)}
                  className="button-gradient"
                >
                  Start Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <MatchModal
        isOpen={showMatch}
        onClose={closeMatchModal}
        profile={matchedProfile}
      />
    </div>
  );
};

export default Index;
