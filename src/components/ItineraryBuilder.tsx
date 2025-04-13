
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Coffee, Utensils, Sunset, Moon, MapPinned } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock itinerary data
const mockItinerary = [
  {
    day: 1,
    date: "June 10, 2024",
    location: "Tokyo, Japan",
    activities: [
      { time: "08:00 AM", title: "Breakfast at hotel", type: "meal", icon: Coffee },
      { time: "10:00 AM", title: "Visit Senso-ji Temple", type: "must-see", icon: Star },
      { time: "01:00 PM", title: "Lunch at Tsukiji Market", type: "meal", icon: Utensils },
      { time: "03:00 PM", title: "Explore Harajuku", type: "activity", icon: MapPinned },
      { time: "07:00 PM", title: "Dinner in Shibuya", type: "meal", icon: Utensils },
      { time: "09:00 PM", title: "Tokyo Tower night view", type: "hidden-gem", icon: Moon }
    ]
  },
  {
    day: 2,
    date: "June 11, 2024",
    location: "Tokyo, Japan",
    activities: [
      { time: "09:00 AM", title: "Breakfast at local cafe", type: "meal", icon: Coffee },
      { time: "10:30 AM", title: "TeamLab Borderless Museum", type: "must-see", icon: Star },
      { time: "02:00 PM", title: "Lunch at hidden ramen spot", type: "hidden-gem", icon: Utensils },
      { time: "04:00 PM", title: "Free time in Akihabara", type: "free-time", icon: Clock },
      { time: "06:30 PM", title: "Sunset at Shinjuku Gyoen", type: "hidden-gem", icon: Sunset },
      { time: "08:00 PM", title: "Dinner & drinks in Shinjuku", type: "meal", icon: Utensils }
    ]
  }
];

const ItineraryBuilder: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [preferences, setPreferences] = useState({
    pace: 'balanced',
    focus: 'mix'
  });
  
  const [showItinerary, setShowItinerary] = useState(true);
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-wander-purple" />
            Create Your Perfect Itinerary
          </h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-wander-purple"
                  placeholder="Tokyo, Japan"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Travel Dates</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-wander-purple"
                  placeholder="June 10-15, 2024"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Customize Your Pace</h3>
          
          <div className="flex space-x-2 mb-6">
            <Button
              variant={preferences.pace === 'relaxed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, pace: 'relaxed'})}
              className={preferences.pace === 'relaxed' ? 'button-gradient' : ''}
            >
              Relaxed
            </Button>
            <Button
              variant={preferences.pace === 'balanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, pace: 'balanced'})}
              className={preferences.pace === 'balanced' ? 'button-gradient' : ''}
            >
              Balanced
            </Button>
            <Button
              variant={preferences.pace === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, pace: 'active'})}
              className={preferences.pace === 'active' ? 'button-gradient' : ''}
            >
              Active
            </Button>
          </div>
          
          <h3 className="font-medium mb-3">Activity Focus</h3>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={preferences.focus === 'mix' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, focus: 'mix'})}
              className={preferences.focus === 'mix' ? 'button-gradient' : ''}
            >
              Balanced Mix
            </Button>
            <Button
              variant={preferences.focus === 'culture' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, focus: 'culture'})}
              className={preferences.focus === 'culture' ? 'button-gradient' : ''}
            >
              Cultural
            </Button>
            <Button
              variant={preferences.focus === 'adventure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, focus: 'adventure'})}
              className={preferences.focus === 'adventure' ? 'button-gradient' : ''}
            >
              Adventure
            </Button>
            <Button
              variant={preferences.focus === 'foodie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreferences({...preferences, focus: 'foodie'})}
              className={preferences.focus === 'foodie' ? 'button-gradient' : ''}
            >
              Foodie
            </Button>
          </div>
          
          <Button className="w-full button-gradient">
            Generate Itinerary
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="mr-2 text-wander-purple" />
            Key Features
          </h2>
          
          <ul className="space-y-4 flex-1">
            <li className="flex items-start">
              <div className="bg-wander-softPurple p-1 rounded-full mr-3 mt-0.5">
                <Star className="h-4 w-4 text-wander-purple" />
              </div>
              <div>
                <h3 className="font-medium">AI-Generated Daily Schedules</h3>
                <p className="text-sm text-gray-600">Perfectly balanced itineraries created based on your preferences</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="bg-wander-softPurple p-1 rounded-full mr-3 mt-0.5">
                <Star className="h-4 w-4 text-wander-purple" />
              </div>
              <div>
                <h3 className="font-medium">Must-See Attractions & Hidden Gems</h3>
                <p className="text-sm text-gray-600">A perfect mix of popular sites and local discoveries</p>
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="bg-wander-softPurple p-1 rounded-full mr-3 mt-0.5">
                <Star className="h-4 w-4 text-wander-purple" />
              </div>
              <div>
                <h3 className="font-medium">Structured Activities & Free Time</h3>
                <p className="text-sm text-gray-600">Balanced schedules with room for spontaneous adventures</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 p-4 bg-wander-softPurple rounded-lg">
            <p className="text-sm italic text-wander-purple">
              "The AI itinerary saved our trip! Perfect balance of activities and exactly matched our interests."
            </p>
            <p className="text-xs text-right mt-2">— Sarah from Boston</p>
          </div>
        </div>
      </div>
      
      {showItinerary && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Your Tokyo Itinerary</h2>
          
          <div className="space-y-8">
            {mockItinerary.map((day) => (
              <div key={day.day} className="border-l-2 border-wander-purple pl-6 pb-2">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-wander-purple to-wander-blue text-white rounded-full p-2 -ml-9 shadow-md">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Day {day.day} - {day.date}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {day.location}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-20 text-xs text-gray-500 pt-1">
                        {activity.time}
                      </div>
                      <div className="flex-shrink-0 w-8">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center 
                          ${activity.type === 'must-see' ? 'bg-yellow-100 text-yellow-600' :
                            activity.type === 'hidden-gem' ? 'bg-indigo-100 text-indigo-600' :
                            activity.type === 'meal' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'}`}>
                          <activity.icon className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="flex-grow ml-2">
                        <p className={`text-sm mb-0.5 ${activity.type === 'must-see' ? 'font-medium' : ''}`}>
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.type === 'must-see' ? 'Must-see attraction' :
                            activity.type === 'hidden-gem' ? 'Local hidden gem' :
                            activity.type === 'free-time' ? 'Free time for exploration' :
                            ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button className="button-gradient">
              <Calendar className="mr-2 h-4 w-4" />
              Add to My Calendar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder;
