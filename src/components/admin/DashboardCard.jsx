import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
  trend,
  trendValue,
  subtitle,
  accent = false,
}) => {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm border transition-all duration-200 hover:shadow-md
        ${accent
          ? 'bg-gradient-to-br from-[#1E40AF] to-[#2563eb] border-blue-600 text-white'
          : 'bg-white border-gray-100'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wide mb-1.5 truncate
            ${accent ? 'text-blue-200' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold leading-none ${accent ? 'text-white' : 'text-[#0F172A]'}`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-xs mt-1 truncate ${accent ? 'text-blue-200' : 'text-gray-400'}`}>
              {subtitle}
            </p>
          )}
          {trendValue !== undefined && (
            <div
              className={`flex items-center gap-1 mt-2 text-xs font-medium
                ${accent
                  ? 'text-blue-100'
                  : trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}
            >
              {trend === 'up'
                ? <TrendingUp size={12} />
                : <TrendingDown size={12} />}
              <span>{trendValue}% from last month</span>
            </div>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
            ${accent ? 'bg-white/20' : bg}`}
        >
          <Icon size={22} className={accent ? 'text-white' : color} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

