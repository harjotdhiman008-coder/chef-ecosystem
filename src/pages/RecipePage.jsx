import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, ChefHat, Users, Star, Bookmark, Share2, Heart, 
  Play, Pause, X, ChevronRight, ChevronLeft, CheckCircle2,
  Utensils, MessageSquare, Flame
} from 'lucide-react';
import { pageTransition, staggerContainer, staggerItem, fadeInUp } from '../utils/animations';
import { cn, formatNumber, timeAgo } from '../utils/helpers';

import { recipes as importedRecipes } from '../data/recipes';

const fallbackRecipe = {
  id: 'recipe-1',
  name: 'Hyderabadi Dum Biryani',
  title: 'Hyderabadi Dum Biryani',
  description: 'A masterpiece of royal Indian culinary tradition. Tender marinated meat layered with aged basmati rice, saffron-infused milk, caramelized onions (birista), and pure desi ghee, slow-cooked on dum.',
  image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?auto=format&fit=crop&w=1600&q=80',
  prepTime: 30,
  cookTime: 60,
  totalTime: 90,
  servings: 6,
  difficulty: 'Expert',
  rating: 4.9,
  saves: 15400,
  cuisine: 'North Indian',
  creator: { name: 'Chef Priya', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80', handle: '@chefpriya', level: 7 },
  nutrition: { calories: 650, protein: 34, carbs: 65, fat: 22, fiber: 4, sugar: 3 },
  ingredients: [
    { id: 'i1', text: '2 cups Aged Basmati Rice (soaked for 30 mins)', name: 'Aged Basmati Rice' },
    { id: 'i2', text: '600g Tender Chicken or Mutton pieces', name: 'Chicken / Mutton' },
    { id: 'i3', text: '1.5 cups Golden Fried Crispy Onions (Birista)', name: 'Crispy Fried Onions' },
    { id: 'i4', text: '1 cup Fresh Whisked Curd (Dahi)', name: 'Fresh Curd' },
    { id: 'i5', text: '2 tbsp Fresh Ginger Garlic Paste', name: 'Ginger Garlic Paste' },
    { id: 'i6', text: '2 tbsp Shahi Biryani Masala & whole spices', name: 'Shahi Biryani Masala' },
    { id: 'i7', text: '4 tbsp Pure Desi Ghee', name: 'Desi Ghee' },
    { id: 'i8', text: '1 pinch Pure Kashmiri Saffron in warm milk', name: 'Kashmiri Saffron' }
  ],
  instructions: [
    { id: 's1', title: 'Marinate the Meat', text: 'Marinate the chicken or mutton with thick curd, ginger-garlic paste, biryani spices, mint, coriander, fried onions, and desi ghee. Let it rest for at least 2 hours.', duration: 120 },
    { id: 's2', title: 'Cook Aromatic Rice', text: 'Boil soaked basmati rice in salted water with whole spices (cardamom, cinnamon, bay leaf, shahi jeera) until 70% cooked. Drain immediately.', duration: 15 },
    { id: 's3', title: 'Layer the Handi', text: 'Spread the marinated meat at the base of a heavy-bottomed pot. Layer hot basmati rice over the meat. Drizzle saffron milk, kewra water, and pure desi ghee on top.', duration: 10 },
    { id: 's4', title: 'Dum Cooking', text: 'Seal the pot with dough or foil. Cook on high heat for 5 minutes, then place over a heavy tawa and cook on dum on low heat for 45 minutes.', duration: 50 },
    { id: 's5', title: 'Rest and Serve', text: 'Let the biryani rest for 15 minutes before unsealing. Gently fluff the layers and serve steaming hot with burani raita and mirchi ka salan.', duration: 15 }
  ]
};

const mockComments = [
  { id: 1, user: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=s', text: 'Made this for our anniversary. The duxelles was incredible! Worth the effort.', rating: 5, time: '2 days ago' },
  { id: 2, user: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?u=m', text: 'Tricky with the puff pastry, make sure it stays cold! Great recipe overall.', rating: 4, time: '1 week ago' }
];

// Circular Progress Component
const NutritionRing = ({ label, value, max, color, unit }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center mb-2">
        <svg className="transform -rotate-90 w-full h-full">
          <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-soft-charcoal/10" />
          <circle 
            cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            className={color} strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center flex flex-col">
          <span className="text-sm font-bold text-charcoal">{value}</span>
          <span className="text-[10px] text-soft-charcoal leading-none">{unit}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-soft-charcoal">{label}</span>
    </div>
  );
};

export default function RecipePage() {
  const { recipeId } = useParams();
  const recipe = importedRecipes.find(r => r.id === recipeId) || fallbackRecipe;
  
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const toggleIngredient = (id) => {
    const newSet = new Set(checkedIngredients);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setCheckedIngredients(newSet);
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setTimerActive(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit" className="bg-cream min-h-screen pb-20">
      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/30" />
      </div>

      <main className="max-container -mt-20 relative z-10 px-4 md:px-8">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-6xl text-dark-burgundy mb-4">{recipe.title}</h1>
              <p className="text-lg text-soft-charcoal/80 mb-6 max-w-2xl">{recipe.description}</p>
              
              <div className="flex items-center gap-6">
                <Link to={`/creator/${recipe.creator.handle}`} className="flex items-center gap-3 group">
                  <img src={recipe.creator.avatar} alt={recipe.creator.name} className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-gold transition-colors" />
                  <div>
                    <div className="font-medium text-charcoal group-hover:text-gold transition-colors">{recipe.creator.name}</div>
                    <div className="text-sm text-soft-charcoal">Lv. {recipe.creator.level} Master Chef</div>
                  </div>
                </Link>
                <div className="h-10 w-px bg-soft-charcoal/20 hidden md:block"></div>
                <div className="flex items-center gap-1 text-gold">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-xl font-bold">{recipe.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col gap-4 w-full md:w-auto">
              <button className="flex-1 md:w-48 bg-dark-burgundy hover:bg-charcoal text-white rounded-xl py-4 px-6 font-bold flex items-center justify-center gap-2 transition-colors"
                onClick={() => setCookingMode(true)}
              >
                <Play className="w-5 h-5" /> Start Cooking
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-soft-charcoal/5 hover:bg-soft-charcoal/10 rounded-xl p-4 flex items-center justify-center text-charcoal transition-colors">
                  <Bookmark className="w-6 h-6" />
                </button>
                <button className="flex-1 bg-soft-charcoal/5 hover:bg-soft-charcoal/10 rounded-xl p-4 flex items-center justify-center text-charcoal transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-soft-charcoal/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-xl text-gold"><Clock className="w-6 h-6" /></div>
              <div><div className="text-sm text-soft-charcoal">Prep Time</div><div className="font-bold text-charcoal">{recipe.prepTime} mins</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-dark-burgundy/10 rounded-xl text-dark-burgundy"><Flame className="w-6 h-6" /></div>
              <div><div className="text-sm text-soft-charcoal">Cook Time</div><div className="font-bold text-charcoal">{recipe.cookTime} mins</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Users className="w-6 h-6" /></div>
              <div><div className="text-sm text-soft-charcoal">Servings</div><div className="font-bold text-charcoal">{recipe.servings}</div></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500"><ChefHat className="w-6 h-6" /></div>
              <div><div className="text-sm text-soft-charcoal">Difficulty</div><div className="font-bold text-charcoal">{recipe.difficulty}</div></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Ingredients & Nutrition */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-soft-charcoal/5 mb-8">
                <h3 className="font-serif text-2xl text-dark-burgundy mb-6">Nutrition Per Serving</h3>
                <div className="grid grid-cols-3 gap-y-6">
                  <NutritionRing label="Calories" value={recipe.nutrition.calories} max={1000} color="text-orange-500" unit="kcal" />
                  <NutritionRing label="Protein" value={recipe.nutrition.protein} max={100} color="text-red-500" unit="g" />
                  <NutritionRing label="Carbs" value={recipe.nutrition.carbs} max={100} color="text-blue-500" unit="g" />
                  <NutritionRing label="Fat" value={recipe.nutrition.fat} max={100} color="text-yellow-500" unit="g" />
                  <NutritionRing label="Fiber" value={recipe.nutrition.fiber} max={30} color="text-green-500" unit="g" />
                  <NutritionRing label="Sugar" value={recipe.nutrition.sugar} max={50} color="text-pink-500" unit="g" />
                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-soft-charcoal/5">
                <h3 className="font-serif text-2xl text-dark-burgundy mb-6 flex justify-between items-center">
                  Ingredients
                  <span className="text-sm font-sans font-normal text-soft-charcoal">{checkedIngredients.size}/{recipe.ingredients.length}</span>
                </h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map(ing => (
                    <li key={ing.id} className="flex items-start gap-3 cursor-pointer group" onClick={() => toggleIngredient(ing.id)}>
                      <div className={cn("w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors", checkedIngredients.has(ing.id) ? "bg-dark-burgundy border-dark-burgundy text-white" : "border-soft-charcoal/30 group-hover:border-dark-burgundy")}>
                        {checkedIngredients.has(ing.id) && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span className={cn("text-lg transition-all", checkedIngredients.has(ing.id) ? "text-soft-charcoal/50 line-through" : "text-charcoal")}>{ing.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:w-2/3">
            <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-soft-charcoal/5">
              <h3 className="font-serif text-3xl text-dark-burgundy mb-8">Instructions</h3>
              <div className="space-y-12">
                {recipe.instructions.map((step, idx) => (
                  <div key={step.id} className="relative pl-12 md:pl-16">
                    {/* Step Number */}
                    <div className="absolute left-0 top-0 w-10 h-10 bg-gold/20 text-gold font-serif text-xl font-bold rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                    {/* Connector Line */}
                    {idx !== recipe.instructions.length - 1 && (
                      <div className="absolute left-5 top-12 bottom-[-48px] w-px bg-soft-charcoal/10" />
                    )}
                    
                    <h4 className="text-xl font-bold text-charcoal mb-3">{step.title}</h4>
                    <p className="text-lg text-soft-charcoal leading-relaxed mb-4">{step.text}</p>
                    
                    {step.duration && (
                      <div className="inline-flex items-center gap-2 bg-soft-charcoal/5 px-4 py-2 rounded-lg text-sm font-medium text-charcoal">
                        <Clock className="w-4 h-4 text-gold" />
                        {step.duration} mins
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            {/* Reviews Section */}
            <section className="mt-12">
              <h3 className="font-serif text-2xl text-dark-burgundy mb-6">Reviews & Comments</h3>
              <div className="space-y-6">
                {mockComments.map(c => (
                  <div key={c.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.user} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-bold text-charcoal">{c.user}</div>
                          <div className="text-sm text-soft-charcoal">{c.time}</div>
                        </div>
                      </div>
                      <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-4 h-4", i < c.rating ? "fill-current" : "")} />)}
                      </div>
                    </div>
                    <p className="text-soft-charcoal">{c.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Fullscreen Cooking Mode Overlay */}
      <AnimatePresence>
        {cookingMode && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-charcoal text-white overflow-hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <div>
                <h2 className="font-serif text-2xl text-gold">{recipe.title}</h2>
                <div className="text-sm text-white/50">Step {currentStep + 1} of {recipe.instructions.length}</div>
              </div>
              <button onClick={() => setCookingMode(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              <div className="w-1/4 bg-black/20 p-6 overflow-y-auto border-r border-white/10 hidden md:block">
                <h3 className="font-bold text-lg mb-4 text-gold">Ingredients</h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map(ing => (
                    <li key={ing.id} className="flex items-start gap-2 cursor-pointer" onClick={() => toggleIngredient(ing.id)}>
                      <div className={cn("w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 border", checkedIngredients.has(ing.id) ? "bg-gold border-gold" : "border-white/30")}>
                        {checkedIngredients.has(ing.id) && <CheckCircle2 className="w-4 h-4 text-charcoal" />}
                      </div>
                      <span className={cn("text-sm transition-all", checkedIngredients.has(ing.id) ? "text-white/30 line-through" : "text-white/90")}>{ing.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                <div className="max-w-3xl text-center">
                  <h3 className="font-serif text-4xl text-gold mb-6">{recipe.instructions[currentStep].title}</h3>
                  <p className="text-3xl md:text-5xl leading-tight font-light mb-12">{recipe.instructions[currentStep].text}</p>
                  
                  {recipe.instructions[currentStep].duration && (
                    <div className="flex flex-col items-center gap-4">
                      {timerActive || timeLeft > 0 ? (
                        <div className="text-7xl font-mono font-bold text-gold">{formatTime(timeLeft)}</div>
                      ) : (
                        <button 
                          onClick={() => startTimer(recipe.instructions[currentStep].duration)}
                          className="bg-gold text-charcoal px-8 py-4 rounded-full text-xl font-bold flex items-center gap-3 hover:bg-white transition-colors"
                        >
                          <Clock className="w-6 h-6" /> Start {recipe.instructions[currentStep].duration}m Timer
                        </button>
                      )}
                      {(timerActive || timeLeft > 0) && (
                        <div className="flex gap-4">
                          <button onClick={() => setTimerActive(!timerActive)} className="px-6 py-2 bg-white/20 rounded-full">{timerActive ? 'Pause' : 'Resume'}</button>
                          <button onClick={() => {setTimerActive(false); setTimeLeft(0);}} className="px-6 py-2 bg-red-500/20 text-red-400 rounded-full">Reset</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Navigation */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
                  <button 
                    disabled={currentStep === 0}
                    onClick={() => {setCurrentStep(s => s - 1); setTimerActive(false); setTimeLeft(0);}}
                    className="p-4 bg-white/10 rounded-full disabled:opacity-30 hover:bg-white/20 transition-colors"
                  ><ChevronLeft className="w-8 h-8" /></button>
                  <button 
                    disabled={currentStep === recipe.instructions.length - 1}
                    onClick={() => {setCurrentStep(s => s + 1); setTimerActive(false); setTimeLeft(0);}}
                    className="p-4 bg-gold text-charcoal rounded-full disabled:opacity-30 hover:bg-white transition-colors"
                  ><ChevronRight className="w-8 h-8" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
