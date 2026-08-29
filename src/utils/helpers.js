export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const formatCurrency = (amount) => {
  return '₹' + amount.toLocaleString('en-IN');
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getChefLevel = (coins) => {
  const levels = [
    { level: 7, name: 'Chef Legend', min: 10000 },
    { level: 6, name: 'Master Creator', min: 5000 },
    { level: 5, name: 'Community Chef', min: 2500 },
    { level: 4, name: 'Food Creator', min: 1000 },
    { level: 3, name: 'Recipe Maker', min: 500 },
    { level: 2, name: 'Kitchen Explorer', min: 100 },
    { level: 1, name: 'Home Cook', min: 0 },
  ];
  return levels.find((l) => coins >= l.min) || levels[levels.length - 1];
};

export const timeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const getImageUrl = (query, w = 400, h = 300) => {
  return `https://images.unsplash.com/photo-${query}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
