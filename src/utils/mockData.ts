
export type TravelProfile = {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  prompt: string;
  promptAnswer: string;
  dreamDestination: string;
  image: string;
  stats: {
    energy: number;
    foodie: number;
    adventure: number;
    nightlife: number;
    culture: number;
  };
};

export const travelProfiles: TravelProfile[] = [
  {
    id: "1",
    name: "Sophia",
    age: 28,
    location: "San Francisco",
    bio: "Digital nomad looking for hiking companions and city explorers!",
    prompt: "My travel style in three words:",
    promptAnswer: "Spontaneous, local, authentic",
    dreamDestination: "New Zealand",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    stats: {
      energy: 80,
      foodie: 90,
      adventure: 85,
      nightlife: 60,
      culture: 95
    }
  },
  {
    id: "2",
    name: "Daniel",
    age: 31,
    location: "London",
    bio: "Photographer seeking epic landscapes and hidden cafes.",
    prompt: "I always pack:",
    promptAnswer: "My camera, a local phrase book, and an open mind",
    dreamDestination: "Patagonia",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    stats: {
      energy: 70,
      foodie: 85,
      adventure: 90,
      nightlife: 40,
      culture: 80
    }
  },
  {
    id: "3",
    name: "Emma",
    age: 26,
    location: "Sydney",
    bio: "Ocean lover & foodie with a passion for sustainable travel.",
    prompt: "Next on my travel bucket list:",
    promptAnswer: "Japanese hot springs in winter",
    dreamDestination: "Costa Rica",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    stats: {
      energy: 75,
      foodie: 95,
      adventure: 70,
      nightlife: 65,
      culture: 85
    }
  },
  {
    id: "4",
    name: "Miguel",
    age: 29,
    location: "Barcelona",
    bio: "History buff and street food enthusiast.",
    prompt: "My perfect travel day ends with:",
    promptAnswer: "Sunset drinks with new friends and live music",
    dreamDestination: "Mexico City",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    stats: {
      energy: 85,
      foodie: 100,
      adventure: 65,
      nightlife: 90,
      culture: 100
    }
  },
  {
    id: "5",
    name: "Aisha",
    age: 27,
    location: "Dubai",
    bio: "Adventure seeker who loves both luxury hotels and camping under stars.",
    prompt: "Travel motto I live by:",
    promptAnswer: "Take the scenic route",
    dreamDestination: "Bali",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    stats: {
      energy: 95,
      foodie: 80,
      adventure: 100,
      nightlife: 75,
      culture: 85
    }
  }
];
