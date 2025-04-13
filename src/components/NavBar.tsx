
import React from 'react';
import { MapPin, User, MessageCircle } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <header className="w-full py-4 px-6">
      <div className="container max-w-6xl mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-wander-orange via-wander-purple to-wander-blue bg-clip-text text-transparent">
              WanderMatch
            </div>
          </div>
          
          <div className="flex gap-1 sm:gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MapPin className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MessageCircle className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
