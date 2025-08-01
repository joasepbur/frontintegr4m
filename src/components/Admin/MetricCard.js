import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  color = 'primary', 
  description,
  size = 'default',
  className = ''
}) => {
  const sizeClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return <FiArrowUp className="mr-1" />;
    if (changeType === 'negative') return <FiArrowDown className="mr-1" />;
    return null;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success-600';
    if (changeType === 'negative') return 'text-error-600';
    return 'text-neutral-600';
  };

  return (
    <div className={`bg-white rounded-xl shadow-card border border-neutral-200 hover:shadow-md transition-all duration-200 ${sizeClasses[size]} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <span className={`text-${color}-600 text-xl`}>{icon}</span>
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            {change}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-neutral-800 mb-1">{value}</h3>
        <p className="text-neutral-600 font-medium">{title}</p>
        {description && (
          <p className="text-neutral-500 text-sm mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;