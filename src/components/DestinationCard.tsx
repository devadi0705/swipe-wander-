
import React, { useState } from 'react';
import { Globe, Calendar, ThermometerSun, Waves, Mountain, Music, Trophy, Passport } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for recommended destinations
const recommendedDestinations = [
  {
    id: 1,
    name: 'Kyoto, Japan',
    description: 'Experience cherry blossom season and traditional culture',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    tags: ['Cultural', 'Spring', 'Moderate Budget'],
    score: 98
  },
  {
    id: 2,
    name: 'Lisbon, Portugal',
    description: 'Perfect weather, beautiful beaches, and amazing cuisine',
    image: 'https://images.unsplash.com/photo-1518730518541-d0843268c287',
    tags: ['Beach', 'Summer', 'Budget Friendly'],
    score: 92
  },
  {
    id: 3,
    name: 'Queenstown, New Zealand',
    description: 'Adventure activities and breathtaking landscapes',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad',
    tags: ['Adventure', 'Fall', 'Luxury'],
    score: 94
  }
];

const DestinationCard: React.FC = () => {
  const [preferences, setPreferences] = useState({
    climate: '',
    activity: '',
    dates: '',
    visaRequirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="mr-2 text-wander-purple" />
            Personalized Recommendations
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="climate">Preferred Climate</Label>
              <div className="flex items-center mt-1">
                <ThermometerSun className="mr-2 h-4 w-4 text-gray-500" />
                <Input 
                  id="climate"
                  name="climate"
                  placeholder="Warm, tropical, snowy..."
                  value={preferences.climate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="activity">Main Activity Interest</Label>
              <div className="flex items-center mt-1">
                <Mountain className="mr-2 h-4 w-4 text-gray-500" />
                <Input 
                  id="activity"
                  name="activity"
                  placeholder="Beach, hiking, city exploring..."
                  value={preferences.activity}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="dates">Travel Dates</Label>
              <div className="flex items-center mt-1">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <Input 
                  id="dates"
                  name="dates"
                  placeholder="May 2023, Summer 2023..."
                  value={preferences.dates}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="visaRequirements">Visa Requirements</Label>
              <div className="flex items-center mt-1">
                <Passport className="mr-2 h-4 w-4 text-gray-500" />
                <Input 
                  id="visaRequirements"
                  name="visaRequirements"
                  placeholder="Visa-free preferred, EU only..."
                  value={preferences.visaRequirements}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="w-full button-gradient">
                Get Personalized Recommendations
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Music className="mr-2 text-wander-purple" />
              Event-Based Recommendations
            </h2>
            <p className="text-gray-600 mb-4">Discover destinations with exciting events happening soon</p>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="border border-gray-100 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="font-medium">Carnival in Rio de Janeiro</div>
                <div className="text-sm text-gray-500">February 10-15, 2024</div>
              </div>
              <div className="border border-gray-100 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="font-medium">Cherry Blossom Festival in Kyoto</div>
                <div className="text-sm text-gray-500">Late March-Early April 2024</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Waves className="mr-2 text-wander-purple" />
              Seasonal Highlights
            </h2>
            <p className="text-gray-600">Perfect destinations for the current season</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <span>Greek Islands</span>
                <span className="text-sm text-wander-purple">Perfect weather now</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <span>Scottish Highlands</span>
                <span className="text-sm text-wander-purple">Fewer tourists</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <span>Bali, Indonesia</span>
                <span className="text-sm text-wander-purple">Dry season</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Top Recommendations for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedDestinations.map(destination => (
            <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <div className="flex items-center bg-wander-softPurple text-wander-purple rounded-full px-2 py-1 text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    {destination.score}% match
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1 mb-3">{destination.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
