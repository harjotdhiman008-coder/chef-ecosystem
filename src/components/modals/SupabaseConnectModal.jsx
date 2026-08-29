import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, CheckCircle2, AlertCircle, Sparkles, Copy, 
  ExternalLink, Key, Globe, Trash2, X, RefreshCw 
} from 'lucide-react';
import { 
  isSupabaseConfigured, getActiveSupabaseConfig, 
  saveSupabaseConfig, clearSupabaseConfig, testSupabaseConnection 
} from '../../lib/supabaseClient';
import { useTheme } from '../../contexts/ThemeContext';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';

export default function SupabaseConnectModal({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const activeConfig = getActiveSupabaseConfig();

  const [url, setUrl] = useState(activeConfig.url || '');
  const [key, setKey] = useState(activeConfig.key || '');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const isConnected = isSupabaseConfigured();

  const handleTest = async () => {
    if (!url.trim() || !key.trim()) {
      setTestResult({ success: false, message: 'Please enter both Supabase Project URL and Anon API Key' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    const res = await testSupabaseConnection(url.trim(), key.trim());
    setTesting(false);
    setTestResult(res);
  };

  const handleSave = () => {
    if (!url.trim() || !key.trim()) {
      setTestResult({ success: false, message: 'Please enter both URL and Key before saving' });
      return;
    }
    saveSupabaseConfig(url, key);
  };

  const handleDisconnect = () => {
    clearSupabaseConfig();
  };

  const handleCopySql = () => {
    const sqlSchema = `-- Supabase SQL Schema for The Clover Kitchen
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.recipes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    cuisine_id TEXT,
    image TEXT,
    description TEXT,
    prep_time INTEGER DEFAULT 20,
    cook_time INTEGER DEFAULT 30,
    total_time INTEGER DEFAULT 50,
    servings INTEGER DEFAULT 4,
    difficulty TEXT DEFAULT 'medium',
    calories INTEGER DEFAULT 500,
    protein INTEGER DEFAULT 25,
    carbs INTEGER DEFAULT 45,
    fat INTEGER DEFAULT 18,
    rating NUMERIC(3, 1) DEFAULT 4.8,
    saves INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    creator_id TEXT,
    creator_name TEXT,
    creator_avatar TEXT,
    tags TEXT[] DEFAULT '{}',
    ingredients JSONB DEFAULT '[]'::jsonb,
    instructions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.pantry_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    ingredient_name TEXT NOT NULL,
    category TEXT DEFAULT 'staple',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY DEFAULT ('post-' || substr(md5(random()::text), 1, 8)),
    creator_id TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    creator_avatar TEXT,
    type TEXT DEFAULT 'recipe',
    content TEXT NOT NULL,
    image TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    chef_coins_earned INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.marketplace_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(3, 1) DEFAULT 4.9,
    seller_name TEXT,
    cuisine TEXT DEFAULT 'North Indian',
    is_veg BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all" ON public.recipes FOR ALL USING (true);
CREATE POLICY "Allow public all" ON public.pantry_items FOR ALL USING (true);
CREATE POLICY "Allow public all" ON public.posts FOR ALL USING (true);
CREATE POLICY "Allow public all" ON public.marketplace_items FOR ALL USING (true);
`;
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto ${
              isDark 
                ? 'bg-[#181414] border-[#382D2D] text-[#F7EEDB]' 
                : 'bg-white border-[#E5D7C5] text-[#1E1B18]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D6A84F]/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#D6A84F]/20 border border-[#D6A84F]/40 flex items-center justify-center text-gold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Supabase Database Sync</h3>
                  <p className={`text-xs ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6B5E50]'}`}>
                    Store recipes, active pantry items, and social feed in PostgreSQL
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gold hover:bg-[#D6A84F]/15 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Connection Status Badge */}
            <div className={`p-4 rounded-2xl border mb-6 flex items-center justify-between gap-3 ${
              isConnected 
                ? 'bg-green-500/10 border-green-500/30 text-green-500' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600'
            }`}>
              <div className="flex items-center gap-2.5">
                {isConnected ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    {isConnected ? '🟢 Supabase Active & Connected' : '🟡 Running in Local Storage Mode'}
                  </p>
                  <p className={`text-[11px] ${isDark ? 'text-[#D8CABB]/70' : 'text-[#5C5042]'}`}>
                    {isConnected
                      ? 'Live queries enabled for recipes, pantry, and feed'
                      : 'Add your project credentials below to enable cloud persistence'}
                  </p>
                </div>
              </div>
            </div>

            {/* Credential Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                  isDark ? 'text-[#D8CABB]' : 'text-[#4A3F33]'
                }`}>
                  <Globe className="w-3.5 h-3.5 text-gold" />
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://xyzabcdefghijklm.supabase.co"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                    isDark 
                      ? 'bg-[#121010] border-[#332A2A] text-white placeholder-[#6B5F54]' 
                      : 'bg-[#FAF6F0] border-[#DFCFC0] text-charcoal placeholder-[#9C8F80]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                  isDark ? 'text-[#D8CABB]' : 'text-[#4A3F33]'
                }`}>
                  <Key className="w-3.5 h-3.5 text-gold" />
                  Supabase Anon / Public API Key
                </label>
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono border focus:outline-none focus:ring-1 focus:ring-[#D6A84F] ${
                    isDark 
                      ? 'bg-[#121010] border-[#332A2A] text-white placeholder-[#6B5F54]' 
                      : 'bg-[#FAF6F0] border-[#DFCFC0] text-charcoal placeholder-[#9C8F80]'
                  }`}
                />
              </div>
            </div>

            {/* Test Result Message */}
            {testResult && (
              <div className={`p-3 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2 ${
                testResult.success 
                  ? 'bg-green-500/15 text-green-500 border border-green-500/30' 
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
              }`}>
                {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{testResult.message}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <button
                type="button"
                onClick={handleTest}
                disabled={testing}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#1E1A1A] border border-[#3A3030] text-[#D8CABB] hover:border-[#D6A84F] hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>{testing ? 'Pinging...' : 'Test Connection'}</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold bg-[#D6A84F] text-[#141212] hover:bg-yellow-400 transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save & Connect</span>
              </button>

              {isConnected && (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="p-2.5 rounded-xl text-xs font-bold bg-red-950/40 text-red-400 border border-red-800/40 hover:bg-red-900/40 transition-colors"
                  title="Disconnect Supabase"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* SQL Schema Copy Section */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#121010] border-[#292222]' : 'bg-[#F7EFE3] border-[#DDD0BD]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  Supabase SQL Schema
                </span>
                <button
                  onClick={handleCopySql}
                  className="px-2.5 py-1 rounded-lg bg-[#D6A84F] text-[#141212] font-extrabold text-[10px] flex items-center gap-1 hover:bg-yellow-400 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#D8CABB]/60' : 'text-[#6C5E50]'}`}>
                Click <strong>"Copy SQL"</strong> and run it in your <strong>Supabase Dashboard → SQL Editor</strong> to create tables with public access in 10 seconds!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
