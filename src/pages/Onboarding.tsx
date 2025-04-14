
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flag, 
  Trees, 
  Landmark, 
  Backpack, 
  Wine, 
  TreePine, 
  Building2, 
  Sunrise, 
  Music, 
  Utensils, 
  Camera, 
  Headphones, 
  Book, 
  Candy 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Destination = 'Delhi' | 'Goa' | 'Kerala' | 'Rajasthan' | 'custom';
type TravelStyle = 'backpacker' | 'luxe' | 'nature' | 'urban';
type TravelVibe = 'sunrise' | 'festival' | 'foodie' | 'insta';
type TripDuration = 'weekend' | 'week' | 'month' | 'unlimited';
type MustPackItem = 'camera' | 'headphones' | 'journal' | 'snacks';

interface OnboardingState {
  destination: Destination | null;
  customDestination: string;
  travelStyle: TravelStyle | null;
  travelVibe: TravelVibe | null;
  tripDuration: TripDuration | null;
  mustPackItem: MustPackItem | null;
  step: number;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<OnboardingState>({
    destination: null,
    customDestination: '',
    travelStyle: null,
    travelVibe: null,
    tripDuration: null,
    mustPackItem: null,
    step: 0
  });

  const handleNext = () => {
    if (state.step === 0 && !state.destination && !state.customDestination) {
      toast.error("Please select a destination or type your own");
      return;
    }

    if (state.step === 1 && !state.travelStyle) {
      toast.error("Please select your travel style");
      return;
    }

    if (state.step === 2 && !state.travelVibe) {
      toast.error("Please select your travel vibe");
      return;
    }

    if (state.step === 3 && !state.tripDuration) {
      toast.error("Please select your trip duration");
      return;
    }

    if (state.step === 4 && !state.mustPackItem) {
      toast.error("Please select your must-pack item");
      return;
    }

    if (state.step === 4) {
      toast.success("Onboarding complete! Welcome to WanderMatch!");
      navigate('/');
      return;
    }

    setState({ ...state, step: state.step + 1 });
  };

  const selectDestination = (destination: Destination) => {
    setState({ 
      ...state, 
      destination: destination === 'custom' ? null : destination, 
      customDestination: destination === 'custom' ? state.customDestination : '' 
    });
  };

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return <DestinationStep 
          selected={state.destination} 
          customDestination={state.customDestination}
          onSelect={selectDestination}
          onCustomChange={(value) => setState({...state, customDestination: value})}
        />;
      case 1:
        return <TravelStyleStep 
          selected={state.travelStyle}
          onSelect={(style) => setState({...state, travelStyle: style})}
        />;
      case 2:
        return <TravelVibeStep 
          selected={state.travelVibe}
          onSelect={(vibe) => setState({...state, travelVibe: vibe})}
        />;
      case 3:
        return <TripDurationStep 
          selected={state.tripDuration}
          onSelect={(duration) => setState({...state, tripDuration: duration})}
        />;
      case 4:
        return <MustPackItemStep 
          selected={state.mustPackItem}
          onSelect={(item) => setState({...state, mustPackItem: item})}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-wander-softPeach">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {renderStep()}

          <div className="mt-8">
            <Button 
              onClick={handleNext}
              className="w-full py-6 text-lg rounded-full bg-wander-orange hover:bg-wander-orange/90"
            >
              {state.step === 4 ? 'Complete' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DestinationStepProps {
  selected: Destination | null;
  customDestination: string;
  onSelect: (destination: Destination) => void;
  onCustomChange: (value: string) => void;
}

const DestinationStep: React.FC<DestinationStepProps> = ({ 
  selected, customDestination, onSelect, onCustomChange 
}) => {
  const destinations: {id: Destination, name: string, icon: React.ReactNode, image: string}[] = [
    {
      id: 'Delhi',
      name: 'Delhi',
      icon: <Landmark className="h-5 w-5 text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070'
    },
    {
      id: 'Goa',
      name: 'Goa',
      icon: <Trees className="h-5 w-5 text-green-600" />,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074'
    },
    {
      id: 'Kerala',
      name: 'Kerala',
      icon: <Trees className="h-5 w-5 text-emerald-600" />,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070'
    },
    {
      id: 'Rajasthan',
      name: 'Rajasthan',
      icon: <Landmark className="h-5 w-5 text-orange-600" />,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070'
    }
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Which place in India is calling your name right now?</h1>
      <p className="text-center mb-8 text-lg font-medium text-gray-600">
        Goa's beaches or Rajasthan's palaces? Where would you rather be?
      </p>
      <p className="text-center italic mb-8 text-wander-purple">
        🎵 "Pack your bags, it's time to go—pick the place that steals the show!"
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {destinations.map((dest) => (
          <div 
            key={dest.id}
            onClick={() => onSelect(dest.id)}
            className={`
              relative cursor-pointer rounded-3xl overflow-hidden transition-all
              ${selected === dest.id ? 'ring-4 ring-wander-purple' : ''}
            `}
          >
            <div className="aspect-square overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center">
                <span className="mr-2">{dest.icon}</span>
                <span className="text-xl font-semibold text-white">{dest.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div 
          className={`
            border border-gray-300 rounded-full py-3 px-6 cursor-pointer
            ${!selected && customDestination ? 'ring-2 ring-wander-purple' : ''}
          `}
          onClick={() => onSelect('custom')}
        >
          <Input
            type="text"
            placeholder="Or type your own"
            value={customDestination}
            onChange={(e) => {
              onSelect('custom');
              onCustomChange(e.target.value);
            }}
            className="border-none focus:ring-0 text-center"
          />
        </div>
      </div>
    </div>
  );
};

interface TravelStyleStepProps {
  selected: TravelStyle | null;
  onSelect: (style: TravelStyle) => void;
}

const TravelStyleStep: React.FC<TravelStyleStepProps> = ({ selected, onSelect }) => {
  const styles: {id: TravelStyle, name: string, icon: React.ReactNode, description: string}[] = [
    {
      id: 'backpacker',
      name: 'Backpacker budget',
      icon: <Backpack size={24} className="text-wander-orange" />,
      description: 'Hostels, street food, and local experiences'
    },
    {
      id: 'luxe',
      name: 'Luxe & relaxed',
      icon: <Wine size={24} className="text-wander-purple" />,
      description: 'Fine dining, spa days, and premium accommodations'
    },
    {
      id: 'nature',
      name: 'Nature & hiking',
      icon: <TreePine size={24} className="text-green-600" />,
      description: 'Trails, wildlife, and outdoor adventures'
    },
    {
      id: 'urban',
      name: 'Urban explorer',
      icon: <Building2 size={24} className="text-blue-600" />,
      description: 'City tours, museums, and cultural hotspots'
    }
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">What's your travel style?</h1>
      <p className="text-center italic mb-8 text-wander-purple">
        🎵 "Are you chasing stars or sipping wine at bars?"
      </p>

      <div className="space-y-4">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`
              flex items-center p-5 rounded-2xl transition-all cursor-pointer
              ${selected === style.id 
                ? 'bg-gradient-to-r from-wander-purple/20 to-wander-blue/20 ring-2 ring-wander-purple' 
                : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${selected === style.id ? 'bg-wander-softPurple' : 'bg-gray-100'}
            `}>
              {style.icon}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TravelVibeStepProps {
  selected: TravelVibe | null;
  onSelect: (vibe: TravelVibe) => void;
}

const TravelVibeStep: React.FC<TravelVibeStepProps> = ({ selected, onSelect }) => {
  const vibes: {id: TravelVibe, name: string, icon: React.ReactNode, color: string}[] = [
    {
      id: 'sunrise',
      name: 'Sunrise hikes',
      icon: <Sunrise size={32} />,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      id: 'festival',
      name: 'Festival nights',
      icon: <Music size={32} />,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'foodie',
      name: 'Foodie trails',
      icon: <Utensils size={32} />,
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      id: 'insta',
      name: 'Insta moments',
      icon: <Camera size={32} />,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    }
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">What vibe fits your ideal trip?</h1>
      <p className="text-center italic mb-8 text-wander-purple">
        🎵 "Set the vibe, choose your tribe, and let's make memories that thrive!"
      </p>

      <div className="grid grid-cols-2 gap-4">
        {vibes.map((vibe) => (
          <div
            key={vibe.id}
            onClick={() => onSelect(vibe.id)}
            className={`
              flex flex-col items-center p-6 border-2 rounded-2xl transition-all cursor-pointer
              ${selected === vibe.id 
                ? 'ring-2 ring-wander-purple border-wander-purple' 
                : `${vibe.color} hover:opacity-90`}
            `}
          >
            {vibe.icon}
            <h3 className="mt-3 font-semibold text-center">{vibe.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TripDurationStepProps {
  selected: TripDuration | null;
  onSelect: (duration: TripDuration) => void;
}

const TripDurationStep: React.FC<TripDurationStepProps> = ({ selected, onSelect }) => {
  const durations: {id: TripDuration, label: string}[] = [
    { id: 'weekend', label: 'A weekend' },
    { id: 'week', label: '1–2 weeks' },
    { id: 'month', label: 'A month' },
    { id: 'unlimited', label: 'As long as it takes' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">How long are you usually away?</h1>
      <p className="text-center italic mb-8 text-wander-purple">
        🎵 "Short trip, long haul, wander 'til the world feels small."
      </p>

      <div className="space-y-4">
        {durations.map((duration) => (
          <div
            key={duration.id}
            onClick={() => onSelect(duration.id)}
            className={`
              p-5 rounded-xl text-center transition-all cursor-pointer border-2
              ${selected === duration.id 
                ? 'bg-gradient-to-r from-wander-purple/10 to-wander-blue/10 border-wander-purple' 
                : 'bg-white border-gray-200 hover:bg-gray-50'}
            `}
          >
            <span className="text-lg font-medium">{duration.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface MustPackItemStepProps {
  selected: MustPackItem | null;
  onSelect: (item: MustPackItem) => void;
}

const MustPackItemStep: React.FC<MustPackItemStepProps> = ({ selected, onSelect }) => {
  const items: {id: MustPackItem, name: string, icon: React.ReactNode}[] = [
    {
      id: 'camera',
      name: 'Camera',
      icon: <Camera size={32} className="text-gray-700" />
    },
    {
      id: 'headphones',
      name: 'Headphones',
      icon: <Headphones size={32} className="text-gray-700" />
    },
    {
      id: 'journal',
      name: 'Journal',
      icon: <Book size={32} className="text-gray-700" />
    },
    {
      id: 'snacks',
      name: 'Snacks',
      icon: <Candy size={32} className="text-gray-700" />
    }
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">What's your must-pack item?</h1>
      <p className="text-center italic mb-8 text-wander-purple">
        🎵 "Suitcase packed with dreams and snacks—what's the one thing that always comes back?"
      </p>

      <div className="grid grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              flex flex-col items-center p-6 rounded-2xl transition-all cursor-pointer
              ${selected === item.id 
                ? 'bg-gradient-to-r from-wander-purple/20 to-wander-blue/20 ring-2 ring-wander-purple' 
                : 'bg-white shadow-sm hover:shadow'}
            `}
          >
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center mb-3
              ${selected === item.id ? 'bg-wander-softPurple' : 'bg-gray-100'}
            `}>
              {item.icon}
            </div>
            <h3 className="font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
