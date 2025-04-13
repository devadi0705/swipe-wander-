
import React from 'react';
import { type TravelProfile } from '../utils/mockData';

interface ProfileStatsProps {
  stats: TravelProfile['stats'];
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const statLabels = {
    energy: "Energy Level",
    foodie: "Foodie Factor",
    adventure: "Adventure Seeker",
    nightlife: "Nightlife",
    culture: "Culture Buff"
  };

  // Different colors for each stat
  const statColors = {
    energy: "from-amber-400 to-amber-500",
    foodie: "from-emerald-400 to-emerald-500",
    adventure: "from-wander-blue to-blue-500",
    nightlife: "from-violet-400 to-violet-500",
    culture: "from-rose-400 to-rose-500"
  };

  return (
    <div className="w-full space-y-2">
      <h3 className="text-sm font-medium text-gray-800">Vibe Check</h3>
      <div className="space-y-3">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex items-center text-xs">
            <span className="w-24 text-gray-600">
              {statLabels[key as keyof typeof statLabels]}
            </span>
            <div className="flex-1 ml-2">
              <div className="stat-bar">
                <div 
                  className={`stat-fill bg-gradient-to-r ${statColors[key as keyof typeof statColors]}`} 
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
