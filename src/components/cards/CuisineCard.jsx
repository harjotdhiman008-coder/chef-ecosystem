import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

const CuisineCard = ({ cuisine, className }) => {
  const { id, name, region, dishCount, image, description } = cuisine;

  return (
    <Link
      to={`/discover/${id}`}
      className={cn('group block rounded-xl overflow-hidden card-hover bg-white shadow-sm', className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image || 'https://images.unsplash.com/photo-1490818387583-1b5ba4597b87?w=800&h=600&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <ArrowRight className="text-white w-6 h-6 transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-xl font-bold text-charcoal mb-1">{name}</h3>
        <p className="text-sm text-charcoal/60 mb-2">{region}</p>
        <div className="text-xs font-medium text-deep-red bg-deep-red/10 inline-block px-2 py-1 rounded-md">
          {dishCount} Dishes
        </div>
      </div>
    </Link>
  );
};

export default CuisineCard;
