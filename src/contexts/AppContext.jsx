import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext();

const initialState = {
  user: {
    id: 'user-1',
    name: 'Alex Kumar',
    username: '@alexcooks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
    bio: 'Home cook exploring the world one dish at a time 🍳',
    level: 4,
    levelName: 'Food Creator',
    chefCoins: 1248,
    lifetimeCoins: 3420,
    followers: 892,
    following: 234,
    recipesCount: 24,
    postsCount: 67,
    joinedCommunities: ['comm-1', 'comm-3', 'comm-5'],
  },
  savedRecipes: ['recipe-1', 'recipe-5', 'recipe-8'],
  likedPosts: ['post-2', 'post-5'],
  following: ['creator-1', 'creator-3', 'creator-7'],
  cart: [],
  notifications: [],
  transactions: [
    { id: 'tx-1', type: 'earn', amount: 50, description: 'Recipe reached 1,000 views', date: '2026-08-28T10:00:00' },
    { id: 'tx-2', type: 'earn', amount: 20, description: 'Your recipe received 100 saves', date: '2026-08-27T15:30:00' },
    { id: 'tx-3', type: 'spend', amount: 300, description: 'Grocery redemption on Blinkit', date: '2026-08-25T09:00:00' },
    { id: 'tx-4', type: 'earn', amount: 100, description: 'Completed 7-Day Breakfast Challenge', date: '2026-08-23T18:00:00' },
    { id: 'tx-5', type: 'earn', amount: 35, description: 'Community contribution bonus', date: '2026-08-22T12:00:00' },
  ],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_SAVE_RECIPE':
      return {
        ...state,
        savedRecipes: state.savedRecipes.includes(action.payload)
          ? state.savedRecipes.filter((id) => id !== action.payload)
          : [...state.savedRecipes, action.payload],
      };
    case 'TOGGLE_LIKE_POST':
      return {
        ...state,
        likedPosts: state.likedPosts.includes(action.payload)
          ? state.likedPosts.filter((id) => id !== action.payload)
          : [...state.likedPosts, action.payload],
      };
    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        following: state.following.includes(action.payload)
          ? state.following.filter((id) => id !== action.payload)
          : [...state.following, action.payload],
      };
    case 'ADD_COINS':
      return {
        ...state,
        user: {
          ...state.user,
          chefCoins: state.user.chefCoins + action.payload,
          lifetimeCoins: state.user.lifetimeCoins + action.payload,
        },
      };
    case 'SPEND_COINS':
      return {
        ...state,
        user: {
          ...state.user,
          chefCoins: Math.max(0, state.user.chefCoins - action.payload),
        },
      };
    case 'JOIN_COMMUNITY':
      return {
        ...state,
        user: {
          ...state.user,
          joinedCommunities: state.user.joinedCommunities.includes(action.payload)
            ? state.user.joinedCommunities.filter((id) => id !== action.payload)
            : [...state.user.joinedCommunities, action.payload],
        },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleSaveRecipe = useCallback((id) => dispatch({ type: 'TOGGLE_SAVE_RECIPE', payload: id }), []);
  const toggleLikePost = useCallback((id) => dispatch({ type: 'TOGGLE_LIKE_POST', payload: id }), []);
  const toggleFollow = useCallback((id) => dispatch({ type: 'TOGGLE_FOLLOW', payload: id }), []);
  const addCoins = useCallback((amount) => dispatch({ type: 'ADD_COINS', payload: amount }), []);
  const spendCoins = useCallback((amount) => dispatch({ type: 'SPEND_COINS', payload: amount }), []);
  const joinCommunity = useCallback((id) => dispatch({ type: 'JOIN_COMMUNITY', payload: id }), []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSaveRecipe,
        toggleLikePost,
        toggleFollow,
        addCoins,
        spendCoins,
        joinCommunity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
