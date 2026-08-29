import React from 'react';
import { Users, Trophy } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ChallengeCard = ({ challenge, className }) => {
  const { id, name, description, image, participants, status, prize, entries, category, difficulty } = challenge;

  const statusColors = {
    active: 'bg-green-500 text-white',
    upcoming: 'bg-blue-500 text-white',
    completed: 'bg-gray-500 text-white'
  };

  return (
    <div className={cn('bg-white rounded-2xl shadow-sm card-hover overflow-hidden flex flex-col', className)}>
      <div className="relative h-40 w-full overflow-hidden group">
        <img
          src={image || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={cn("absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", statusColors[status] || 'bg-gray-500 text-white')}>
          {status}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-semibold text-white text-lg line-clamp-1">{name}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-sm text-charcoal/70 line-clamp-2 mb-4 flex-1">{description}</p>
        
        <div className="bg-yellow-50 p-3 rounded-xl flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Trophy className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="text-[10px] text-yellow-800 uppercase tracking-wide font-semibold">Prize</p>
            <p className="text-sm font-bold text-yellow-900">{prize}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-charcoal/60 mb-4 font-medium">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{participants} joined</span>
          </div>
          <div>
            <span>{entries} entries</span>
          </div>
        </div>

        {status === 'active' && (
          <button className="w-full py-2 bg-charcoal text-white text-sm font-medium rounded-xl hover:bg-soft-charcoal transition-colors shadow-sm">
            Join Challenge
          </button>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
