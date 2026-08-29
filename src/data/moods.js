export const moods = [
  {
    id: "mood-1", name: "Happy", emoji: "😊", color: "bg-yellow-400", description: "Food to celebrate and keep the good vibes going.",
    recommendations: [
      { dishName: "Margherita Pizza", recipeId: "recipe-6", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format&q=80", reason: "Because pizza is happiness in a circle." },
      { dishName: "Chocolate Lava Cake", recipeId: "recipe-15", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop&auto=format&q=80", reason: "Sweet treats for a sweet mood." },
      { dishName: "Street Tacos", recipeId: "recipe-11", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop&auto=format&q=80", reason: "Fun, flavorful, and easy to eat." }
    ]
  },
  {
    id: "mood-2", name: "Calm", emoji: "😌", color: "bg-blue-300", description: "Soothing and light meals for a peaceful day.",
    recommendations: [
      { dishName: "Mediterranean Grain Bowl", recipeId: "recipe-13", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80", reason: "Light, fresh, and perfectly balanced." },
      { dishName: "Mushroom Risotto", recipeId: "recipe-19", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop&auto=format&q=80", reason: "Earthy flavors and a creamy, comforting texture." },
      { dishName: "Idli Sambar", recipeId: "recipe-4", image: "https://images.unsplash.com/photo-1589301760435-2d423b8f7a03?w=600&h=400&fit=crop&auto=format&q=80", reason: "A light and easily digestible comfort meal." }
    ]
  },
  {
    id: "mood-3", name: "Energetic", emoji: "⚡", color: "bg-orange-500", description: "Fuel up with high-protein and energizing dishes.",
    recommendations: [
      { dishName: "Chicken Shawarma", recipeId: "recipe-18", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc0f1?w=600&h=400&fit=crop&auto=format&q=80", reason: "Packed with protein to keep you going." },
      { dishName: "Spicy Tonkotsu Ramen", recipeId: "recipe-7", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format&q=80", reason: "Carbs and rich broth for ultimate energy." },
      { dishName: "Paneer Tikka", recipeId: "recipe-17", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=600&h=400&fit=crop&auto=format&q=80", reason: "A spicy, protein-packed kick." }
    ]
  },
  {
    id: "mood-4", name: "Lazy", emoji: "🛋️", color: "bg-gray-400", description: "Minimal effort, maximum flavor.",
    recommendations: [
      { dishName: "Classic Mac & Cheese", recipeId: "recipe-14", image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=600&h=400&fit=crop&auto=format&q=80", reason: "The ultimate easy comfort food." },
      { dishName: "Masala Khichdi", recipeId: "recipe-20", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop&auto=format&q=80", reason: "One-pot wonder that warms the soul." },
      { dishName: "Creamy Garlic Pasta", recipeId: "recipe-5", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format&q=80", reason: "Quick, simple, and satisfying." }
    ]
  },
  {
    id: "mood-5", name: "Comfort Seeking", emoji: "🧸", color: "bg-amber-700", description: "Food that feels like a warm hug.",
    recommendations: [
      { dishName: "Butter Chicken", recipeId: "recipe-2", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae328?w=600&h=400&fit=crop&auto=format&q=80", reason: "Rich, creamy, and deeply comforting." },
      { dishName: "Hyderabadi Biryani", recipeId: "recipe-1", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80", reason: "Aromatic and filling weekend comfort." },
      { dishName: "Classic Mac & Cheese", recipeId: "recipe-14", image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=600&h=400&fit=crop&auto=format&q=80", reason: "Cheesy goodness that fixes everything." }
    ]
  },
  {
    id: "mood-6", name: "Focused", emoji: "🎯", color: "bg-indigo-500", description: "Brain food to keep you sharp.",
    recommendations: [
      { dishName: "Salmon Sushi Rolls", recipeId: "recipe-8", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop&auto=format&q=80", reason: "Omega-3s for brain power." },
      { dishName: "Mediterranean Grain Bowl", recipeId: "recipe-13", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80", reason: "Sustained energy without the crash." },
      { dishName: "Bibimbap", recipeId: "recipe-10", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop&auto=format&q=80", reason: "Balanced nutrients to fuel your focus." }
    ]
  },
  {
    id: "mood-7", name: "Celebrating", emoji: "🎉", color: "bg-pink-500", description: "Festive dishes for special occasions.",
    recommendations: [
      { dishName: "Hyderabadi Biryani", recipeId: "recipe-1", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80", reason: "The king of celebratory meals." },
      { dishName: "Gulab Jamun", recipeId: "recipe-16", image: "https://images.unsplash.com/photo-1666190100906-2bb8d5cf1e0f?w=600&h=400&fit=crop&auto=format&q=80", reason: "No celebration is complete without it." },
      { dishName: "Chocolate Lava Cake", recipeId: "recipe-15", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop&auto=format&q=80", reason: "A decadent end to a great day." }
    ]
  },
  {
    id: "mood-8", name: "Moody", emoji: "🌧️", color: "bg-slate-600", description: "Rich, deep flavors for when you're in your feelings.",
    recommendations: [
      { dishName: "Spicy Tonkotsu Ramen", recipeId: "recipe-7", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format&q=80", reason: "A warm, spicy broth to lift your spirits." },
      { dishName: "Korean Fried Chicken", recipeId: "recipe-9", image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=600&h=400&fit=crop&auto=format&q=80", reason: "Crunchy, sweet, and spicy satisfaction." },
      { dishName: "Mushroom Risotto", recipeId: "recipe-19", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop&auto=format&q=80", reason: "Rich, brooding flavors that match your mood." }
    ]
  },
  {
    id: "mood-9", name: "Healthy", emoji: "🥗", color: "bg-green-500", description: "Clean eating that actually tastes good.",
    recommendations: [
      { dishName: "Mediterranean Grain Bowl", recipeId: "recipe-13", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80", reason: "Fresh veggies and wholesome grains." },
      { dishName: "Idli Sambar", recipeId: "recipe-4", image: "https://images.unsplash.com/photo-1589301760435-2d423b8f7a03?w=600&h=400&fit=crop&auto=format&q=80", reason: "Fermented goodness that's light on the stomach." },
      { dishName: "Salmon Sushi Rolls", recipeId: "recipe-8", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop&auto=format&q=80", reason: "Lean protein and fresh ingredients." }
    ]
  },
  {
    id: "mood-10", name: "Hungry", emoji: "🤤", color: "bg-red-600", description: "Big portions for big appetites.",
    recommendations: [
      { dishName: "Hyderabadi Biryani", recipeId: "recipe-1", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80", reason: "A feast that will definitely fill you up." },
      { dishName: "Korean Fried Chicken", recipeId: "recipe-9", image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=600&h=400&fit=crop&auto=format&q=80", reason: "Generous portions of crispy goodness." },
      { dishName: "Margherita Pizza", recipeId: "recipe-6", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop&auto=format&q=80", reason: "Eat the whole thing, we won't tell." }
    ]
  },
  {
    id: "mood-11", name: "Romantic", emoji: "❤️", color: "bg-rose-500", description: "Impress your date with these elegant dishes.",
    recommendations: [
      { dishName: "Mushroom Risotto", recipeId: "recipe-19", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop&auto=format&q=80", reason: "Requires patience and love to make." },
      { dishName: "Creamy Garlic Pasta", recipeId: "recipe-5", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format&q=80", reason: "Simple but sophisticated." },
      { dishName: "Chocolate Lava Cake", recipeId: "recipe-15", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop&auto=format&q=80", reason: "The perfect shared dessert." }
    ]
  },
  {
    id: "mood-12", name: "Adventurous", emoji: "🌍", color: "bg-teal-500", description: "Try something new and exciting.",
    recommendations: [
      { dishName: "Thai Green Curry", recipeId: "recipe-12", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop&auto=format&q=80", reason: "Complex, exotic flavors." },
      { dishName: "Bibimbap", recipeId: "recipe-10", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop&auto=format&q=80", reason: "Mix it up and explore the textures." },
      { dishName: "Spicy Tonkotsu Ramen", recipeId: "recipe-7", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format&q=80", reason: "A culinary journey in a bowl." }
    ]
  }
];
