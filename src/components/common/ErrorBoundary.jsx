import React from 'react';
import { RefreshCw, ChefHat, AlertTriangle, Home } from 'lucide-react';
import MasterChefCapIcon from '../decorative/MasterChefCapIcon';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[The Clover Kitchen Error]', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.removeItem('clover_pantry_items');
    localStorage.removeItem('clover_supabase_url');
    localStorage.removeItem('clover_supabase_key');
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#141212] text-[#F7EEDB] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#1A1616] border border-[#D6A84F]/40 shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#D6A84F]/20 border border-[#D6A84F]/50 flex items-center justify-center mx-auto text-gold">
              <MasterChefCapIcon className="w-9 h-9" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-white">
              Something went slightly off the stove!
            </h2>

            <p className="text-xs text-[#D8CABB]/70 leading-relaxed">
              {this.state.error?.message || 'A momentary kitchen glitch occurred. Let’s get your recipes cooking again.'}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-[#D6A84F] text-[#141212] font-extrabold text-xs hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Kitchen</span>
              </button>

              <button
                onClick={this.handleReset}
                className="py-3 px-4 rounded-xl bg-[#221B1B] border border-[#3A3030] text-[#D8CABB] text-xs font-bold hover:text-white transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
