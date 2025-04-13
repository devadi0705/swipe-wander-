
import React, { useState } from 'react';
import { Users, MapPin, Calendar, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for potential travel matches
const potentialMatches = [
  {
    id: 1,
    name: 'Emma',
    age: 28,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    location: 'San Francisco',
    travelPlans: {
      destination: 'Tokyo, Japan',
      dates: 'June 10-20, 2024',
      interests: ['Food', 'Art', 'Photography']
    },
    compatibility: 92
  },
  {
    id: 2,
    name: 'Daniel',
    age: 31,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    location: 'New York',
    travelPlans: {
      destination: 'Kyoto, Japan',
      dates: 'June 15-25, 2024',
      interests: ['Temples', 'Hiking', 'Local Culture']
    },
    compatibility: 87
  },
  {
    id: 3,
    name: 'Sophia',
    age: 26,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'London',
    travelPlans: {
      destination: 'Tokyo, Japan',
      dates: 'June 5-15, 2024',
      interests: ['Nightlife', 'Shopping', 'Museums']
    },
    compatibility: 82
  }
];

const TravelMatchFinder: React.FC = () => {
  const [destination, setDestination] = useState('Tokyo, Japan');
  const [dates, setDates] = useState('June 10-20, 2024');
  const [showMatches, setShowMatches] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMatches(true);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-wander-purple" />
          Find Travel Companions
        </h2>
        
        <p className="text-gray-600 mb-4">
          Connect with other travelers planning similar trips and find your perfect travel match!
        </p>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <Label htmlFor="destination">Where are you going?</Label>
            <div className="flex items-center mt-1">
              <MapPin className="absolute ml-3 h-4 w-4 text-gray-500" />
              <Input 
                id="destination"
                className="pl-10"
                placeholder="Tokyo, Japan"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="dates">When are you traveling?</Label>
            <div className="flex items-center mt-1">
              <Calendar className="absolute ml-3 h-4 w-4 text-gray-500" />
              <Input 
                id="dates"
                className="pl-10"
                placeholder="June 10-20, 2024"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full button-gradient">
            <Search className="mr-2 h-4 w-4" />
            Find Travel Matches
          </Button>
        </form>
      </div>
      
      {showMatches && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Potential Travel Companions</h2>
          <p className="text-sm text-gray-600 mb-6">
            These travelers have compatible plans for {destination} around your dates
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potentialMatches.map(match => (
              <div key={match.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={match.image} 
                      alt={match.name} 
                      className="h-16 w-16 rounded-full object-cover border-2 border-wander-purple"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{match.name}, {match.age}</h3>
                    <p className="text-xs text-gray-500">{match.location}</p>
                    <div className="mt-1 flex items-center">
                      <div className="bg-wander-softPurple text-wander-purple text-xs rounded-full px-2 py-0.5 flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {match.compatibility}% match
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <div className="mb-2">
                    <div className="flex items-center text-sm mb-1">
                      <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                      <span className="text-gray-700">{match.travelPlans.destination}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 text-gray-500 mr-1" />
                      <span className="text-gray-700">{match.travelPlans.dates}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3 mb-4">
                    {match.travelPlans.interests.map((interest, i) => (
                      <span 
                        key={i} 
                        className="bg-gray-100 text-gray-700 text-xs rounded-full px-2 py-0.5"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  
                  <Button className="w-full" size="sm">View Profile</Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">View More Matches</Button>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-wander-purple/10 to-wander-blue/10 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Why Find a Travel Companion?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
              <Users className="h-5 w-5 text-wander-purple" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Shared Experiences</h3>
              <p className="text-sm text-gray-700">Create lasting memories with like-minded travelers</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
              <MapPin className="h-5 w-5 text-wander-purple" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Local Insights</h3>
              <p className="text-sm text-gray-700">Discover hidden gems from experienced travelers</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
              <Heart className="h-5 w-5 text-wander-purple" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Travel Chemistry</h3>
              <p className="text-sm text-gray-700">Find companions who match your travel style</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelMatchFinder;
