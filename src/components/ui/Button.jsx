import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers'; // Assuming this exists, fallback used if not

// Fallback cn if utility doesn't exist yet
const classNames = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed focus-ring hover:-translate-y-0.5';
  
  const variants = {
    primary: 'bg-[#7A1820] text-white hover:bg-[#551118]', // deep-red
    secondary: 'border-2 border-[#171515] text-[#171515] hover:bg-[#171515] hover:text-white', // charcoal
    ghost: 'text-[#171515] hover:bg-[#F5EBDD]', // charcoal text, cream hover
    gold: 'bg-[#D6A84F] text-[#171515] hover:bg-yellow-600',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const isIconOnly = !children;
  const paddingAdjustment = isIconOnly ? (size === 'sm' ? 'p-2' : size === 'md' ? 'p-3' : 'p-4') : '';

  return (
    <button
      disabled={disabled || loading}
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        paddingAdjustment,
        className
      )}
      {...rest}
    >
      {loading && (
        <Loader2 className="animate-spin mr-2" size={iconSizes[size]} />
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={isIconOnly ? '' : 'mr-2'} size={iconSizes[size]} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={isIconOnly ? '' : 'ml-2'} size={iconSizes[size]} />
      )}
    </button>
  );
};

export default React.memo(Button);
