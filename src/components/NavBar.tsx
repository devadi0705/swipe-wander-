
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Home,
  Image,
  CalendarDays,
  Heart,
  MessageCircle,
  Menu,
  X,
  User,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Matches', path: '/matches', icon: <Heart className="h-5 w-5" /> },
    { name: 'Messages', path: '/matches', icon: <MessageCircle className="h-5 w-5" /> },
    { name: 'Gallery', path: '/gallery', icon: <Image className="h-5 w-5" /> },
    { name: 'Plan', path: '/plan', icon: <CalendarDays className="h-5 w-5" /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-wander-purple to-wander-blue bg-clip-text text-transparent font-extrabold text-xl">
              WanderMatch
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "flex items-center space-x-1",
                    location.pathname === item.path && "bg-gray-100"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/onboarding">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 shadow-md">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md",
                  location.pathname === item.path ? "bg-gray-100" : "hover:bg-gray-50"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="border-t my-2"></div>
            <Link 
              to="/onboarding" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <button 
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 w-full text-left"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
