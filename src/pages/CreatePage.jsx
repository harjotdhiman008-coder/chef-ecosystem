import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, BookOpen, Video, MessageSquare, Star, Users, 
  Upload, Plus, X, Utensils, Coins, ChevronLeft, CheckCircle2, Sparkles, Database 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { useTheme } from '../contexts/ThemeContext';
import { createNewRecipe } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import MasterChefCapIcon from '../components/decorative/MasterChefCapIcon';

const createOptions = [
  { id: 'recipe', icon: BookOpen, label: 'Recipe', desc: 'Share your complete culinary masterpiece.', color: 'bg-orange-100 text-orange-600' },
  { id: 'video', icon: Video, label: 'Video', desc: 'Show us how it is done step-by-step.', color: 'bg-red-100 text-red-600' },
  { id: 'photo', icon: Camera, label: 'Photo', desc: 'A quick snap of what you are cooking.', color: 'bg-blue-100 text-blue-600' },
  { id: 'thread', icon: MessageSquare, label: 'Cook Thread', desc: 'Document your cooking process live.', color: 'bg-purple-100 text-purple-600' },
  { id: 'review', icon: Star, label: 'Review', desc: 'Tried a dish or kitchen gadget? Rate it.', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'community', icon: Users, label: 'Community Post', desc: 'Start a discussion in your food circle.', color: 'bg-green-100 text-green-600' }
];

export default function CreatePage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(null);

  // Recipe Form State
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('North Indian');
  const [difficulty, setDifficulty] = useState('medium');
  const [prepTime, setPrepTime] = useState('20');
  const [cookTime, setCookTime] = useState('30');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  const addIngredient = () => setIngredients([...ingredients, '']);
  const updateIngredient = (index, value) => {
    const newArr = [...ingredients];
    newArr[index] = value;
    setIngredients(newArr);
  };
  const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

  const addInstruction = () => setInstructions([...instructions, '']);
  const updateInstruction = (index, value) => {
    const newArr = [...instructions];
    newArr[index] = value;
    setInstructions(newArr);
  };
  const removeInstruction = (index) => setInstructions(instructions.filter((_, i) => i !== index));

  const handlePublishRecipe = async () => {
    if (!recipeName.trim()) {
      alert('Please enter a recipe name');
      return;
    }

    setSubmitting(true);
    const parsedIngredients = ingredients
      .filter(i => i.trim())
      .map(i => ({ name: i.trim(), amount: '1', unit: 'item', checked: false }));

    const parsedInstructions = instructions
      .filter(i => i.trim())
      .map((desc, idx) => ({ step: idx + 1, title: `Step ${idx + 1}`, description: desc.trim() }));

    const newRecipe = {
      id: `recipe-${Date.now()}`,
      name: recipeName.trim(),
      description: description.trim() || 'A delicious homemade recipe shared with love.',
      cuisine,
      difficulty,
      prepTime: Number(prepTime) || 20,
      cookTime: Number(cookTime) || 30,
      ingredients: parsedIngredients.length > 0 ? parsedIngredients : [{ name: 'Spices & Love', amount: '1', unit: 'dash', checked: false }],
      instructions: parsedInstructions.length > 0 ? parsedInstructions : [{ step: 1, title: 'Cook and Enjoy', description: 'Prepare with passion and serve hot!' }],
      creatorName: 'You (Chef)',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80'
    };

    const res = await createNewRecipe(newRecipe);
    setSubmitting(false);

    if (res.success) {
      setPublishSuccess({
        id: newRecipe.id,
        name: newRecipe.name,
        isSupabase: isSupabaseConfigured()
      });
    }
  };

  return (
    <div className={`min-h-screen pb-24 pt-12 font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#121010] text-[#F7EEDB]' : 'bg-[#FAF6F0] text-[#1E1B18]'
    }`}>
      <div className="max-container section-padding max-w-4xl">
        
        <AnimatePresence mode="wait">
          {!selectedType ? (
            <motion.div key="selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-xs font-bold text-[#D6A84F] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CREATOR STUDIO</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gold mb-2">What would you like to create?</h1>
                <p className={`text-sm sm:text-base ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5F51]'}`}>
                  Share your culinary craft and earn MasterChef Cap Coins.
                </p>
              </div>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createOptions.map(opt => {
                  const Icon = opt.icon;
                  return (
                    <motion.button
                      key={opt.id}
                      variants={staggerItem}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedType(opt.id)}
                      className={`p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all text-left flex flex-col items-start ${
                        isDark 
                          ? 'bg-[#1A1616] border-[#332B2B] hover:border-[#D6A84F]/50' 
                          : 'bg-white border-[#E5D7C5] hover:border-[#D6A84F]'
                      }`}
                    >
                      <div className={cn("p-4 rounded-xl mb-4", opt.color)}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-serif text-xl font-bold mb-1">{opt.label}</h3>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5F51]'}`}>{opt.desc}</p>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`rounded-3xl border shadow-2xl overflow-hidden ${
              isDark ? 'bg-[#181414] border-[#332A2A]' : 'bg-white border-[#E5D7C5]'
            }`}>
              <div className="p-6 border-b border-[#D6A84F]/20 flex items-center justify-between">
                <button onClick={() => setSelectedType(null)} className="flex items-center gap-2 text-gold font-bold text-xs hover:underline">
                  <ChevronLeft className="w-4 h-4" /> Back to options
                </button>
                <span className="font-serif font-bold text-lg capitalize flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" /> Create {selectedType}
                </span>
              </div>

              <div className="p-6 md:p-8">
                {selectedType === 'recipe' && (
                  <div className="space-y-8">
                    {/* Dish Photo Placeholder */}
                    <div className={`w-full h-56 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition cursor-pointer ${
                      isDark ? 'border-[#382E2E] bg-[#121010] hover:border-[#D6A84F]' : 'border-[#DFD1BF] bg-[#FAF6F0] hover:border-[#D6A84F]'
                    }`}>
                      <Camera className="w-10 h-10 mb-2 text-gold opacity-70" />
                      <span className="font-bold text-sm">Upload Dish Image</span>
                      <span className={`text-xs mt-0.5 ${isDark ? 'text-[#D8CABB]/50' : 'text-[#7A6D5F]'}`}>High-res food photography performs best</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gold">Recipe Name *</label>
                        <input 
                          type="text" 
                          value={recipeName}
                          onChange={(e) => setRecipeName(e.target.value)}
                          placeholder="e.g., Dum Handi Paneer Biryani" 
                          className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                            isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                          }`} 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gold">Description</label>
                        <textarea 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Tell the story, secret spices, and heritage behind this dish..." 
                          rows="3" 
                          className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] resize-none ${
                            isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                          }`}
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gold">Cuisine</label>
                          <select 
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                            className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                              isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                            }`}
                          >
                            <option>North Indian</option>
                            <option>South Indian</option>
                            <option>Mughlai & Awadhi</option>
                            <option>Coastal & Malabar</option>
                            <option>Street Food & Chaat</option>
                            <option>Italian</option>
                            <option>Asian & Korean</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gold">Difficulty</label>
                          <select 
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                              isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                            }`}
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">MasterChef Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gold">Prep Time (min)</label>
                          <input 
                            type="number" 
                            value={prepTime}
                            onChange={(e) => setPrepTime(e.target.value)}
                            placeholder="15" 
                            className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                              isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                            }`} 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-gold">Cook Time (min)</label>
                          <input 
                            type="number" 
                            value={cookTime}
                            onChange={(e) => setCookTime(e.target.value)}
                            placeholder="45" 
                            className={`w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                              isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                            }`} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Ingredients Checklist */}
                    <div className="pt-6 border-t border-[#D6A84F]/20">
                      <h3 className="text-lg font-serif font-bold mb-3 flex items-center gap-2 text-gold">
                        <Utensils className="w-4 h-4"/> Ingredients
                      </h3>
                      <div className="space-y-2.5 mb-3">
                        {ingredients.map((ing, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={ing}
                              onChange={(e) => updateIngredient(idx, e.target.value)}
                              placeholder="e.g., 200g Fresh Malai Paneer or 2 cups Basmati Rice" 
                              className={`flex-1 rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                                isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                              }`}
                            />
                            {ingredients.length > 1 && (
                              <button onClick={() => removeIngredient(idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition">
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button onClick={addIngredient} className="text-gold font-bold text-xs flex items-center gap-1 hover:underline">
                        <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Another Ingredient
                      </button>
                    </div>

                    {/* Instructions */}
                    <div className="pt-6 border-t border-[#D6A84F]/20">
                      <h3 className="text-lg font-serif font-bold mb-3 text-gold">Step-by-Step Instructions</h3>
                      <div className="space-y-3 mb-3">
                        {instructions.map((inst, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="bg-[#D6A84F] text-[#141212] w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                              {idx + 1}
                            </div>
                            <textarea 
                              value={inst}
                              onChange={(e) => updateInstruction(idx, e.target.value)}
                              placeholder={`Describe step ${idx + 1}...`} 
                              rows="2"
                              className={`flex-1 rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] resize-none ${
                                isDark ? 'bg-[#121010] border-[#332A2A] text-white' : 'bg-[#FAF6F0] border-[#E0D3C2] text-charcoal'
                              }`}
                            ></textarea>
                            {instructions.length > 1 && (
                              <button onClick={() => removeInstruction(idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition mt-1">
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button onClick={addInstruction} className="text-gold font-bold text-xs flex items-center gap-1 hover:underline">
                        <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Another Step
                      </button>
                    </div>

                    {/* Estimated Reward Banner */}
                    <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                      isDark ? 'bg-[#221B1B] border-[#D6A84F]/40' : 'bg-[#FFF8EE] border-[#D6A84F]/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D6A84F]/20 border border-[#D6A84F]/40 flex items-center justify-center text-gold">
                          <MasterChefCapIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-sm">Estimated Creator Reward</div>
                          <div className={`text-xs ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5E50]'}`}>
                            Earned upon publishing and community saves
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-extrabold text-gold flex items-center gap-1">
                        <span>+50 Coins</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                      onClick={handlePublishRecipe}
                      disabled={submitting}
                      className="w-full bg-[#D6A84F] hover:bg-yellow-400 text-[#141212] font-extrabold py-4 rounded-2xl text-base transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{submitting ? 'Syncing with Supabase...' : 'Put It on the Table (Publish Recipe)'}</span>
                    </button>
                  </div>
                )}

                {selectedType !== 'recipe' && (
                  <div className="text-center py-16">
                    <Sparkles className="w-10 h-10 text-gold mx-auto mb-3" />
                    <h3 className="text-xl font-serif font-bold mb-1">Creator Tools Active</h3>
                    <p className={`text-xs max-w-sm mx-auto mb-6 ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5F51]'}`}>
                      You can share recipe posts directly into the social feed and Supabase database.
                    </p>
                    <button
                      onClick={() => setSelectedType('recipe')}
                      className="px-6 py-2.5 rounded-xl bg-[#D6A84F] text-[#141212] font-bold text-xs"
                    >
                      Publish a Recipe
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Modal */}
      {publishSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-8 rounded-3xl border text-center max-w-md w-full shadow-2xl ${
              isDark ? 'bg-[#1A1616] border-[#D6A84F]/40' : 'bg-white border-[#D6A84F]'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold mb-2">Recipe Published!</h3>
            <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-[#D8CABB]/70' : 'text-[#6C5F51]'}`}>
              "{publishSuccess.name}" is now live {publishSuccess.isSupabase ? 'and synced with your Supabase database!' : 'on The Clover Kitchen!'}
            </p>

            <div className="p-4 rounded-2xl bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center gap-2 mb-6">
              <MasterChefCapIcon className="w-5 h-5" />
              <span className="font-extrabold text-sm text-gold">+50 MasterChef Coins Credited</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPublishSuccess(null);
                  setSelectedType(null);
                }}
                className="flex-1 py-3 rounded-xl border border-[#D6A84F]/40 text-xs font-bold hover:bg-[#D6A84F]/10"
              >
                Create Another
              </button>
              <button
                onClick={() => navigate('/discover')}
                className="flex-1 py-3 rounded-xl bg-[#D6A84F] text-[#141212] text-xs font-extrabold hover:bg-yellow-400"
              >
                View Recipes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
