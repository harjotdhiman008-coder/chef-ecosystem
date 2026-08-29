export const cookThreads = [
  {
    id: "thread-1", originalCreatorId: "creator-1", originalCreatorName: "Chef Priya", originalCreatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Secret to the Perfect Biryani Rice?", description: "I've been trying to get my basmati rice perfectly fluffy for biryani, but it always ends up a bit mushy. What's your secret ratio and technique?",
    recipeId: "recipe-1", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: ["Basmati Rice", "Water", "Whole Spices", "Salt"], cuisine: "North Indian", cookTime: "30 mins",
    replies: [
      { id: "reply-1-1", creatorName: "Ravi's Kitchen", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80", content: "Always soak the rice for exactly 30 minutes before boiling. And add a teaspoon of ghee to the boiling water!", image: null, timestamp: "2023-10-25T14:30:00Z", likes: 45 },
      { id: "reply-1-2", creatorName: "Zara Patel", creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format&q=80", content: "Don't overcook it! Boil it only until 70% done (it should still have a bite) before layering.", image: null, timestamp: "2023-10-25T15:15:00Z", likes: 32 }
    ],
    likes: 120, comments: 2, shares: 15, views: 1500, timestamp: "2023-10-25T10:00:00Z"
  },
  {
    id: "thread-2", originalCreatorId: "creator-4", originalCreatorName: "Marco DeLuca", originalCreatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Carbonara: Guanciale vs Pancetta", description: "Let's settle this debate. Which one do you prefer for a true Carbonara?",
    recipeId: null, image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: true,
    ingredients: ["Pasta", "Eggs", "Pecorino", "Guanciale or Pancetta", "Black Pepper"], cuisine: "Italian", cookTime: "20 mins",
    replies: [
      { id: "reply-2-1", creatorName: "Chef Priya", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Guanciale for the authentic flavor! The fat renders perfectly.", image: null, timestamp: "2023-10-26T09:00:00Z", likes: 88 },
      { id: "reply-2-2", creatorName: "Tom Wilson", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80", content: "Honestly, pancetta is easier to find where I live and it still tastes amazing.", image: null, timestamp: "2023-10-26T10:30:00Z", likes: 12 }
    ],
    likes: 340, comments: 2, shares: 50, views: 4200, timestamp: "2023-10-26T08:00:00Z"
  },
  {
    id: "thread-3", originalCreatorId: "creator-2", originalCreatorName: "Arjun Malhotra", originalCreatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Sourdough Starter is Sluggish", description: "My starter has been really inactive the last few days. It's getting cooler here. Any tips to revive it?",
    recipeId: null, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: ["Flour", "Water"], cuisine: "Continental", cookTime: "N/A",
    replies: [
      { id: "reply-3-1", creatorName: "The Spice Lab", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Try feeding it with some rye flour. It usually gives it a good boost!", image: null, timestamp: "2023-10-27T11:20:00Z", likes: 25 },
      { id: "reply-3-2", creatorName: "Kabir Singh", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Keep it in a slightly warmer spot, like on top of the fridge or in the oven with just the light on.", image: null, timestamp: "2023-10-27T12:00:00Z", likes: 40 }
    ],
    likes: 85, comments: 2, shares: 5, views: 800, timestamp: "2023-10-27T10:00:00Z"
  },
  {
    id: "thread-4", originalCreatorId: "creator-8", originalCreatorName: "Min-jun Park", originalCreatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Best Gochujang Brands?", description: "I want to make authentic Korean Fried Chicken. Which Gochujang brands do you recommend?",
    recipeId: "recipe-9", image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: ["Gochujang", "Chicken", "Soy Sauce", "Garlic", "Ginger"], cuisine: "Korean", cookTime: "45 mins",
    replies: [
      { id: "reply-4-1", creatorName: "Sakura Kitchen", creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format&q=80", content: "Chung Jung One is a solid, easily available choice!", image: null, timestamp: "2023-10-28T14:00:00Z", likes: 55 },
      { id: "reply-4-2", creatorName: "The Spice Lab", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "I second that! CJ Haechandle is also very good.", image: null, timestamp: "2023-10-28T15:30:00Z", likes: 30 }
    ],
    likes: 150, comments: 2, shares: 20, views: 2100, timestamp: "2023-10-28T12:00:00Z"
  },
  {
    id: "thread-5", originalCreatorId: "creator-13", originalCreatorName: "Preethi Reddy", originalCreatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Crispy Dosa Tips?", description: "How do you get that restaurant-style crispy texture on your homemade dosas?",
    recipeId: "recipe-3", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: true,
    ingredients: ["Dosa Batter", "Oil or Ghee"], cuisine: "South Indian", cookTime: "10 mins",
    replies: [
      { id: "reply-5-1", creatorName: "Ananya Iyer", creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format&q=80", content: "Add a handful of poha (flattened rice) when soaking the rice and dal. It makes a huge difference!", image: null, timestamp: "2023-10-29T10:00:00Z", likes: 120 },
      { id: "reply-5-2", creatorName: "Zara Patel", creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format&q=80", content: "Make sure your tawa is hot enough before pouring, and smear a little oil/ghee around the edges while cooking.", image: null, timestamp: "2023-10-29T11:15:00Z", likes: 85 }
    ],
    likes: 280, comments: 2, shares: 45, views: 3500, timestamp: "2023-10-29T08:30:00Z"
  },
  {
    id: "thread-6", originalCreatorId: "creator-11", originalCreatorName: "Kabir Singh", originalCreatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Healthy Snacks for Late Night Cravings", description: "What are your go-to healthy snacks when you get hungry at midnight?",
    recipeId: null, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: [], cuisine: "Healthy", cookTime: "5 mins",
    replies: [
      { id: "reply-6-1", creatorName: "Ananya Iyer", creatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format&q=80", content: "Roasted makhanas (fox nuts) with a little salt and pepper!", image: null, timestamp: "2023-10-30T09:00:00Z", likes: 65 },
      { id: "reply-6-2", creatorName: "Chef Priya", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Apple slices with almond butter. Hits the sweet spot.", image: null, timestamp: "2023-10-30T10:30:00Z", likes: 45 },
      { id: "reply-6-3", creatorName: "Tom Wilson", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80", content: "Greek yogurt with some berries.", image: null, timestamp: "2023-10-30T11:00:00Z", likes: 30 }
    ],
    likes: 190, comments: 3, shares: 25, views: 2800, timestamp: "2023-10-30T07:00:00Z"
  },
  {
    id: "thread-7", originalCreatorId: "creator-3", originalCreatorName: "Sakura Kitchen", originalCreatorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Rolling Sushi Tightly", description: "My sushi rolls always end up loose and fall apart when I cut them. Any advice?",
    recipeId: "recipe-8", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: ["Sushi Rice", "Nori", "Fish", "Vegetables"], cuisine: "Japanese", cookTime: "50 mins",
    replies: [
      { id: "reply-7-1", creatorName: "Noodle Master", creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=80", content: "Don't overstuff them! Less is more when it comes to fillings.", image: null, timestamp: "2023-10-31T15:00:00Z", likes: 70 },
      { id: "reply-7-2", creatorName: "The Spice Lab", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Use a bamboo mat and apply even, firm pressure as you roll.", image: null, timestamp: "2023-10-31T16:20:00Z", likes: 40 }
    ],
    likes: 110, comments: 2, shares: 10, views: 1600, timestamp: "2023-10-31T13:00:00Z"
  },
  {
    id: "thread-8", originalCreatorId: "creator-10", originalCreatorName: "Sofia Martinez", originalCreatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Corn vs Flour Tortillas?", description: "Which do you prefer for your everyday tacos and why?",
    recipeId: "recipe-11", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: ["Tortillas", "Meat", "Salsa"], cuisine: "Mexican", cookTime: "25 mins",
    replies: [
      { id: "reply-8-1", creatorName: "Tom Wilson", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80", content: "Flour for burritos, corn for tacos. Always.", image: null, timestamp: "2023-11-01T18:00:00Z", likes: 150 },
      { id: "reply-8-2", creatorName: "Marco DeLuca", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80", content: "Corn has so much more flavor! Just warm them up properly so they don't break.", image: null, timestamp: "2023-11-01T19:30:00Z", likes: 90 }
    ],
    likes: 240, comments: 2, shares: 30, views: 3100, timestamp: "2023-11-01T16:00:00Z"
  },
  {
    id: "thread-9", originalCreatorId: "creator-15", originalCreatorName: "Fatima Al-Hassan", originalCreatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Smooth Hummus Secret", description: "How do you get your hummus incredibly smooth and creamy? Mine always has a slight texture.",
    recipeId: null, image: "https://images.unsplash.com/photo-1547424850-a4e4ce564e3c?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: true,
    ingredients: ["Chickpeas", "Tahini", "Garlic", "Lemon", "Olive Oil"], cuisine: "Middle Eastern", cookTime: "15 mins",
    replies: [
      { id: "reply-9-1", creatorName: "The Spice Lab", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Peel the chickpeas! It takes time but it's worth it.", image: null, timestamp: "2023-11-02T10:00:00Z", likes: 80 },
      { id: "reply-9-2", creatorName: "Chef Priya", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80", content: "Add a little bit of ice water while blending. It emulsifies the tahini and makes it super fluffy.", image: null, timestamp: "2023-11-02T11:15:00Z", likes: 110 }
    ],
    likes: 180, comments: 2, shares: 40, views: 2500, timestamp: "2023-11-02T08:30:00Z"
  },
  {
    id: "thread-10", originalCreatorId: "creator-12", originalCreatorName: "Noodle Master", originalCreatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=80",
    title: "Wok Hei at Home?", description: "Is it possible to achieve true 'Wok Hei' (breath of the wok) on a standard home electric stove?",
    recipeId: null, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop&auto=format&q=80", videoIndicator: false,
    ingredients: ["Noodles", "Vegetables", "Soy Sauce", "Oil"], cuisine: "Chinese", cookTime: "10 mins",
    replies: [
      { id: "reply-10-1", creatorName: "Ravi's Kitchen", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80", content: "It's tough on electric. Try using a cast iron skillet instead of a wok to retain maximum heat, and cook in small batches.", image: null, timestamp: "2023-11-03T14:00:00Z", likes: 95 },
      { id: "reply-10-2", creatorName: "Min-jun Park", creatorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=80", content: "You can also use a small kitchen torch right on the surface of the food while tossing it to simulate that char!", image: null, timestamp: "2023-11-03T15:30:00Z", likes: 60 }
    ],
    likes: 210, comments: 2, shares: 35, views: 2900, timestamp: "2023-11-03T12:00:00Z"
  }
];
