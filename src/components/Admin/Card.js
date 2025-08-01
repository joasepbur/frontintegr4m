import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  action,
  padding = 'default',
  className = '',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-card border border-neutral-200 hover:shadow-md transition-all duration-200 ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
            )}
            {subtitle && (
              <p className="text-neutral-600 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          {action && action}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;