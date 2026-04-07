import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color = 'college-blue', delay = 0 }) => {
  const colorMap = {
    'college-blue': {
      bg: 'bg-blue-50',
      icon: 'bg-college-blue text-white',
      border: 'border-blue-100',
      hover: 'hover:border-college-blue/30',
    },
    'accent-gold': {
      bg: 'bg-amber-50',
      icon: 'bg-accent-gold text-dark-blue',
      border: 'border-amber-100',
      hover: 'hover:border-accent-gold/40',
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-600 text-white',
      border: 'border-green-100',
      hover: 'hover:border-green-300',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-600 text-white',
      border: 'border-purple-100',
      hover: 'hover:border-purple-300',
    },
  };

  const styles = colorMap[color] || colorMap['college-blue'];

  return (
    <div
      className={`group relative bg-white rounded-2xl p-6 border ${styles.border} ${styles.hover} card-hover cursor-default shadow-sm hover:shadow-lg transition-all duration-300`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 ${styles.icon} rounded-xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-dark-blue mb-2 group-hover:text-college-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

      {/* Bottom highlight on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-college-blue to-accent-gold rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default FeatureCard;

