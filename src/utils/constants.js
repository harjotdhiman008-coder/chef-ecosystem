export const COLORS = {
  deepRed: '#7A1820',
  darkBurgundy: '#551118',
  cream: '#F5EBDD',
  warmIvory: '#FFF8EE',
  charcoal: '#171515',
  softCharcoal: '#242020',
  gold: '#D6A84F',
  white: '#FFFFFF',
  mutedCream: '#D8CABB',
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const CHEF_LEVELS = [
  { level: 1, name: 'Home Cook', minCoins: 0 },
  { level: 2, name: 'Kitchen Explorer', minCoins: 100 },
  { level: 3, name: 'Recipe Maker', minCoins: 500 },
  { level: 4, name: 'Food Creator', minCoins: 1000 },
  { level: 5, name: 'Community Chef', minCoins: 2500 },
  { level: 6, name: 'Master Creator', minCoins: 5000 },
  { level: 7, name: 'Chef Legend', minCoins: 10000 },
];

export const DIFFICULTY_LABELS = {
  easy: { label: 'Easy', color: 'text-green-600 bg-green-50' },
  medium: { label: 'Medium', color: 'text-gold bg-yellow-50' },
  hard: { label: 'Hard', color: 'text-deep-red bg-red-50' },
};

export const NAV_ITEMS = [
  { label: 'Discover', path: '/discover' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Feed', path: '/feed' },
  { label: 'Communities', path: '/communities' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Mood', path: '/mood' },
  { label: 'Create', path: '/create' },
];

export const MOBILE_NAV_ITEMS = [
  { label: 'Home', path: '/', icon: 'Home' },
  { label: 'Discover', path: '/discover', icon: 'Compass' },
  { label: 'Create', path: '/create', icon: 'PlusCircle' },
  { label: 'Communities', path: '/communities', icon: 'Users' },
  { label: 'Profile', path: '/profile', icon: 'User' },
];
