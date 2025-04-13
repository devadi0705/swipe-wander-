
import React, { useState } from 'react';
import { PiggyBank, Wallet, Plane, Home, Utensils, Ticket, PlaneTakeoff, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data for budget breakdown
const mockBudgetBreakdown = {
  transportation: { percentage: 30, amount: 900 },
  accommodation: { percentage: 35, amount: 1050 },
  food: { percentage: 20, amount: 600 },
  activities: { percentage: 15, amount: 450 }
};

const BudgetPlanner: React.FC = () => {
  const [planType, setPlanType] = useState<'budget-first' | 'destination-first'>('budget-first');
  const [budget, setBudget] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PiggyBank className="mr-2 text-wander-purple" />
          Smart Budget Planning
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Button 
            variant={planType === 'budget-first' ? 'default' : 'outline'}
            onClick={() => setPlanType('budget-first')}
            className={planType === 'budget-first' ? 'button-gradient' : ''}
          >
            <Wallet className="mr-2 h-4 w-4" />
            Budget-First Approach
          </Button>
          
          <Button 
            variant={planType === 'destination-first' ? 'default' : 'outline'}
            onClick={() => setPlanType('destination-first')}
            className={planType === 'destination-first' ? 'button-gradient' : ''}
          >
            <PlaneTakeoff className="mr-2 h-4 w-4" />
            Destination-First Approach
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {planType === 'budget-first' ? (
            <>
              <div>
                <Label htmlFor="budget">Your Total Budget</Label>
                <div className="flex items-center mt-1">
                  <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                  <Input 
                    id="budget"
                    placeholder="3000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    type="number"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="travel-dates">Travel Dates</Label>
                <div className="flex items-center mt-1">
                  <Input 
                    id="travel-dates"
                    placeholder="May 10-20, 2024"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full button-gradient mt-4">
                Show Where I Can Go
              </Button>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="destination">Your Desired Destination</Label>
                <div className="flex items-center mt-1">
                  <Input 
                    id="destination"
                    placeholder="Japan"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="travel-dates">Travel Dates</Label>
                <div className="flex items-center mt-1">
                  <Input 
                    id="travel-dates"
                    placeholder="May 10-20, 2024"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full button-gradient mt-4">
                Calculate Needed Budget
              </Button>
            </>
          )}
        </form>
      </div>
      
      {showResults && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            {planType === 'budget-first' 
              ? 'Destinations Within Your Budget' 
              : `Budget Needed for ${destination}`}
          </h2>
          
          {planType === 'budget-first' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">Thailand</h3>
                <p className="text-sm text-gray-600">10-day adventure, all inclusive</p>
                <div className="mt-2 flex items-center text-wander-purple">
                  <span className="font-semibold">${budget}</span>
                  <span className="text-xs ml-1">estimated total</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">Mexico</h3>
                <p className="text-sm text-gray-600">8-day beach vacation</p>
                <div className="mt-2 flex items-center text-wander-purple">
                  <span className="font-semibold">${budget}</span>
                  <span className="text-xs ml-1">estimated total</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">Portugal</h3>
                <p className="text-sm text-gray-600">7-day cultural experience</p>
                <div className="mt-2 flex items-center text-wander-purple">
                  <span className="font-semibold">${budget}</span>
                  <span className="text-xs ml-1">estimated total</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Estimated Budget Needed</p>
                <h2 className="text-4xl font-bold text-wander-purple">$3,000</h2>
                <p className="text-sm text-gray-500">for a 10-day trip to {destination}</p>
              </div>
            </div>
          )}
          
          <h3 className="font-medium mb-4">Budget Breakdown</h3>
          
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Plane className="h-4 w-4 text-wander-purple mr-2" />
                  <span className="text-sm font-medium">Transportation</span>
                </div>
                <span className="text-sm font-medium">${mockBudgetBreakdown.transportation.amount}</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div 
                  style={{ width: `${mockBudgetBreakdown.transportation.percentage}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-wander-purple to-wander-blue">
                </div>
              </div>
              <span className="text-xs text-gray-500">{mockBudgetBreakdown.transportation.percentage}% of total</span>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Home className="h-4 w-4 text-wander-purple mr-2" />
                  <span className="text-sm font-medium">Accommodation</span>
                </div>
                <span className="text-sm font-medium">${mockBudgetBreakdown.accommodation.amount}</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div 
                  style={{ width: `${mockBudgetBreakdown.accommodation.percentage}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-wander-purple to-wander-blue">
                </div>
              </div>
              <span className="text-xs text-gray-500">{mockBudgetBreakdown.accommodation.percentage}% of total</span>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 text-wander-purple mr-2" />
                  <span className="text-sm font-medium">Food</span>
                </div>
                <span className="text-sm font-medium">${mockBudgetBreakdown.food.amount}</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div 
                  style={{ width: `${mockBudgetBreakdown.food.percentage}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-wander-purple to-wander-blue">
                </div>
              </div>
              <span className="text-xs text-gray-500">{mockBudgetBreakdown.food.percentage}% of total</span>
            </div>
            
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Ticket className="h-4 w-4 text-wander-purple mr-2" />
                  <span className="text-sm font-medium">Activities</span>
                </div>
                <span className="text-sm font-medium">${mockBudgetBreakdown.activities.amount}</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div 
                  style={{ width: `${mockBudgetBreakdown.activities.percentage}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-wander-purple to-wander-blue">
                </div>
              </div>
              <span className="text-xs text-gray-500">{mockBudgetBreakdown.activities.percentage}% of total</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;
