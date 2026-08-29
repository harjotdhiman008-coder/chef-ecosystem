import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables or local storage overrides
const getSupabaseCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('clover_supabase_url') : null;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('clover_supabase_key') : null;

  const url = localUrl || envUrl || '';
  const key = localKey || envKey || '';

  return { url: url.trim(), key: key.trim() };
};

const { url: supabaseUrl, key: supabaseAnonKey } = getSupabaseCredentials();

// Dummy/placeholder fallback client if credentials not configured yet
export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key && url.startsWith('http') && !url.includes('placeholder') && key.length > 20);
};

export const getActiveSupabaseConfig = () => getSupabaseCredentials();

export const saveSupabaseConfig = (url, key) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('clover_supabase_url', url.trim());
    localStorage.setItem('clover_supabase_key', key.trim());
    window.location.reload();
  }
};

export const clearSupabaseConfig = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('clover_supabase_url');
    localStorage.removeItem('clover_supabase_key');
    window.location.reload();
  }
};

// Initialize Supabase Client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Test live connection to Supabase
export const testSupabaseConnection = async (testUrl, testKey) => {
  try {
    const client = createClient(testUrl, testKey);
    // Simple lightweight ping by checking health or querying public table
    const { data, error } = await client.from('recipes').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116' && error.message && !error.message.includes('relation') && !error.message.includes('schema')) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Successfully connected to your Supabase project!' };
  } catch (err) {
    return { success: false, message: err.message || 'Failed to connect to Supabase' };
  }
};
