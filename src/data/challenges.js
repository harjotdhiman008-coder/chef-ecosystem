export const challenges = [
  {
    id: "challenge-1", name: "30-Minute Meals", description: "Whip up a delicious, complete meal from scratch in under 30 minutes.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Must be a complete meal", "Total prep and cook time strictly under 30 mins", "Must include a video showing the process"],
    participants: 1250, startDate: "2023-11-01T00:00:00Z", endDate: "2023-11-15T00:00:00Z", status: "active",
    prize: "1000 ChefCoins & 'Speed Chef' Badge", entries: 342, category: "Speed", difficulty: "Medium"
  },
  {
    id: "challenge-2", name: "Veganuary Extravaganza", description: "Create an innovative, fully plant-based dish that surprises non-vegans.",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["100% Vegan ingredients", "Must mimic a traditional meat/dairy dish or be highly creative", "Provide full ingredient list"],
    participants: 2100, startDate: "2024-01-01T00:00:00Z", endDate: "2024-01-31T00:00:00Z", status: "upcoming",
    prize: "2000 ChefCoins", entries: 0, category: "Dietary", difficulty: "Hard"
  },
  {
    id: "challenge-3", name: "The Perfect Dough", description: "Show us your best homemade bread, pizza dough, or pasta from scratch.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Dough must be made from scratch", "Share the hydration ratio and flour types used", "Post a picture of the crumb structure"],
    participants: 850, startDate: "2023-10-15T00:00:00Z", endDate: "2023-10-31T00:00:00Z", status: "completed",
    prize: "500 ChefCoins", entries: 215, category: "Baking", difficulty: "Medium"
  },
  {
    id: "challenge-4", name: "Spice Route Master", description: "Use at least 5 different whole spices to create a deeply flavorful curry.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Must use whole spices, not just pre-ground powders", "Explain the flavor profile of the dish", "Vegetarian or meat allowed"],
    participants: 1500, startDate: "2023-11-10T00:00:00Z", endDate: "2023-11-25T00:00:00Z", status: "active",
    prize: "1500 ChefCoins & Featured Post", entries: 120, category: "Flavor", difficulty: "Hard"
  },
  {
    id: "challenge-5", name: "Breakfast of Champions", description: "Elevate your morning routine with a stunning and nutritious breakfast.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Must be a breakfast item", "Points for aesthetic presentation", "Must include a healthy element"],
    participants: 3200, startDate: "2023-12-01T00:00:00Z", endDate: "2023-12-14T00:00:00Z", status: "upcoming",
    prize: "800 ChefCoins", entries: 0, category: "Meals", difficulty: "Easy"
  },
  {
    id: "challenge-6", name: "Street Food Reimagined", description: "Take a popular street food and give it a gourmet twist at home.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["State the original street food inspiration", "Highlight the gourmet elements you added", "Maintain the soul of the original dish"],
    participants: 900, startDate: "2023-09-01T00:00:00Z", endDate: "2023-09-30T00:00:00Z", status: "completed",
    prize: "1200 ChefCoins", entries: 450, category: "Creative", difficulty: "Hard"
  },
  {
    id: "challenge-7", name: "One-Pot Wonders", description: "Create a flavorful meal using only one pot, pan, or wok. Less washing up, more flavor!",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Strictly ONE cooking vessel allowed", "No pre-cooking components in other pans", "Show the final dish in the pot"],
    participants: 4100, startDate: "2023-11-05T00:00:00Z", endDate: "2023-11-20T00:00:00Z", status: "active",
    prize: "1000 ChefCoins", entries: 890, category: "Convenience", difficulty: "Easy"
  },
  {
    id: "challenge-8", name: "The Chocolate Art", description: "Temper chocolate and create a visually stunning dessert.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Chocolate must be correctly tempered", "Dessert must have multiple textural components", "High-quality photos required"],
    participants: 600, startDate: "2024-02-01T00:00:00Z", endDate: "2024-02-14T00:00:00Z", status: "upcoming",
    prize: "2500 ChefCoins & 'Chocolatier' Badge", entries: 0, category: "Dessert", difficulty: "Hard"
  },
  {
    id: "challenge-9", name: "Ugly Delicious", description: "Food that looks terrible but tastes absolutely incredible. Don't worry about plating!",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["No fancy plating allowed", "Focus purely on taste description and ingredients", "Must be a genuine recipe, not a mess on purpose"],
    participants: 2800, startDate: "2023-10-01T00:00:00Z", endDate: "2023-10-15T00:00:00Z", status: "completed",
    prize: "500 ChefCoins", entries: 620, category: "Fun", difficulty: "Easy"
  },
  {
    id: "challenge-10", name: "Zero Waste Kitchen", description: "Use food scraps (peels, stems, bones) to create a delicious stock, dish, or condiment.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80",
    rules: ["Primary ingredient must be something usually thrown away", "Explain your zero-waste process", "Dish must be edible and tasty"],
    participants: 1100, startDate: "2023-11-15T00:00:00Z", endDate: "2023-11-30T00:00:00Z", status: "active",
    prize: "1500 ChefCoins & 'Eco Chef' Badge", entries: 45, category: "Sustainability", difficulty: "Medium"
  }
];
