
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/NavBar';
import { travelProfiles } from '@/utils/mockData';

const Matches: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState(travelProfiles);

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matches..."
                className="pl-9 w-[200px]"
              />
            </div>
          </div>
        </div>
        
        <div className="grid gap-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map(match => (
              <Link
                key={match.id}
                to={`/chat/${match.id}`}
                className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <img 
                  src={match.image} 
                  alt={match.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-wander-purple"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{match.name}</h3>
                    <span className="text-sm text-gray-500">{match.age}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{match.location}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-wander-softPurple w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <MessageSquare className="text-wander-purple h-5 w-5" />
                  </div>
                  <ChevronRight className="text-gray-400 h-5 w-5" />
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600">No matches found</h3>
              <p className="text-gray-500">Try adjusting your search or keep swiping to find more matches!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matches;
