
import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Globe, 
  Compass, 
  Calendar, 
  PiggyBank, 
  Clock, 
  MapPin,
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NavBar from '@/components/NavBar';
import DestinationCard from '@/components/DestinationCard';
import BudgetPlanner from '@/components/BudgetPlanner';
import ItineraryBuilder from '@/components/ItineraryBuilder';
import TravelMatchFinder from '@/components/TravelMatchFinder';

const Plan: React.FC = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleGeneratePlan = () => {
    setIsLoading(true);
    toast.info("Generating your personalized travel plan...");
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Your travel plan is ready!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Travel Planner</h1>
            <p className="text-gray-600">Plan your next adventure with AI-powered recommendations</p>
          </div>
          
          <Button 
            onClick={handleGeneratePlan}
            className="button-gradient"
            disabled={isLoading}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Generating Plan..." : "Generate Travel Plan"}
          </Button>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="destinations" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="destinations">
                <Compass className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Destinations</span>
              </TabsTrigger>
              <TabsTrigger value="budget">
                <PiggyBank className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Budget</span>
              </TabsTrigger>
              <TabsTrigger value="itinerary">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Itinerary</span>
              </TabsTrigger>
              <TabsTrigger value="matches">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Find Matches</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="destinations" className="space-y-6">
              <DestinationCard />
            </TabsContent>
            
            <TabsContent value="budget" className="space-y-6">
              <BudgetPlanner />
            </TabsContent>
            
            <TabsContent value="itinerary" className="space-y-6">
              <ItineraryBuilder />
            </TabsContent>
            
            <TabsContent value="matches" className="space-y-6">
              <TravelMatchFinder />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Plan;
