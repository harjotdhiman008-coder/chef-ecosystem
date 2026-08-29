import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { recipes as fallbackRecipes } from '../data/recipes';
import { posts as fallbackPosts } from '../data/posts';
import { marketplaceItems as fallbackMarketplace } from '../data/marketplace';
import { communities as fallbackCommunities } from '../data/communities';

/**
 * High-level Supabase Data Service Layer
 * Automatically falls back to high-fidelity mock data if Supabase credentials are not connected.
 */

// ==================== RECIPES ====================
export const fetchAllRecipes = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map(item => ({
          ...item,
          prepTime: item.prep_time || item.prepTime,
          cookTime: item.cook_time || item.cookTime,
          totalTime: item.total_time || item.totalTime,
          cuisineId: item.cuisine_id || item.cuisineId,
          creatorId: item.creator_id || item.creatorId,
          creatorName: item.creator_name || item.creatorName,
          creatorAvatar: item.creator_avatar || item.creatorAvatar,
          hasVideo: item.has_video || item.hasVideo,
        }));
      }
    } catch (err) {
      console.warn('[Supabase] Falling back to local recipes:', err.message);
    }
  }
  return fallbackRecipes;
};

export const createNewRecipe = async (recipeData) => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const id = recipeData.id || `recipe-${Date.now()}`;
      const payload = {
        id,
        name: recipeData.name,
        cuisine: recipeData.cuisine || 'North Indian',
        cuisine_id: recipeData.cuisineId || 'cuisine-1',
        image: recipeData.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80',
        description: recipeData.description,
        prep_time: Number(recipeData.prepTime) || 20,
        cook_time: Number(recipeData.cookTime) || 30,
        total_time: (Number(recipeData.prepTime) || 20) + (Number(recipeData.cookTime) || 30),
        servings: Number(recipeData.servings) || 4,
        difficulty: recipeData.difficulty || 'medium',
        calories: Number(recipeData.calories) || 500,
        protein: Number(recipeData.protein) || 25,
        carbs: Number(recipeData.carbs) || 45,
        fat: Number(recipeData.fat) || 18,
        rating: 5.0,
        saves: 1,
        views: 1,
        likes: 1,
        creator_id: recipeData.creatorId || 'creator-user',
        creator_name: recipeData.creatorName || 'You (Chef)',
        creator_avatar: recipeData.creatorAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
        tags: recipeData.tags || ['#Homemade', '#ChefEcosystem'],
        ingredients: recipeData.ingredients || [],
        instructions: recipeData.instructions || [],
      };

      const { data, error } = await supabase.from('recipes').insert([payload]).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('[Supabase] Recipe creation failed:', err.message);
      return { success: false, error: err.message };
    }
  }
  return { success: true, localOnly: true, data: recipeData };
};

// ==================== PANTRY INGREDIENTS ====================
export const fetchUserPantry = async (userId = 'current-user') => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('pantry_items')
        .select('ingredient_name')
        .eq('user_id', userId);

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map(d => d.ingredient_name);
      }
    } catch (err) {
      console.warn('[Supabase] Pantry fetch fallback:', err.message);
    }
  }
  // Local storage fallback
  const local = localStorage.getItem('clover_pantry_items');
  return local ? JSON.parse(local) : ['Rice', 'Onion', 'Tomato', 'Ginger Garlic Paste', 'Desi Ghee'];
};

export const syncUserPantry = async (userId = 'current-user', ingredients = []) => {
  // Always persist in localStorage
  localStorage.setItem('clover_pantry_items', JSON.stringify(ingredients));

  if (isSupabaseConfigured() && supabase) {
    try {
      // Clear previous items and batch insert active ingredients
      await supabase.from('pantry_items').delete().eq('user_id', userId);
      if (ingredients.length > 0) {
        const rows = ingredients.map(name => ({
          user_id: userId,
          ingredient_name: name,
          category: 'staple'
        }));
        await supabase.from('pantry_items').insert(rows);
      }
      return { success: true };
    } catch (err) {
      console.warn('[Supabase] Pantry sync warning:', err.message);
    }
  }
  return { success: true, localOnly: true };
};

// ==================== SOCIAL FEED ====================
export const fetchFeedPosts = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map(item => ({
          ...item,
          creatorId: item.creator_id,
          creatorName: item.creator_name,
          creatorAvatar: item.creator_avatar,
          creatorLevel: item.creator_level,
          creatorBadge: item.creator_badge,
          recipeId: item.recipe_id,
          chefCoinsEarned: item.chef_coins_earned,
        }));
      }
    } catch (err) {
      console.warn('[Supabase] Feed fallback:', err.message);
    }
  }
  return fallbackPosts;
};

// ==================== MARKETPLACE ====================
export const fetchMarketplace = async () => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data.map(item => ({
          ...item,
          sellerId: item.seller_id,
          sellerName: item.seller_name,
          sellerAvatar: item.seller_avatar,
          sellerRating: item.seller_rating,
          isVeg: item.is_veg,
          portionSize: item.portion_size,
          prepTime: item.prep_time,
          deliveryType: item.delivery_type,
        }));
      }
    } catch (err) {
      console.warn('[Supabase] Marketplace fallback:', err.message);
    }
  }
  return fallbackMarketplace;
};
