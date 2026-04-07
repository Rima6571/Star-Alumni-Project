import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search…', className = '' }) => (
  <div className={`relative ${className}`}>
    <Search
      size={15}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-8 py-2.5 text-sm bg-white border border-gray-200 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]
        transition-all placeholder:text-gray-400"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={13} />
      </button>
    )}
  </div>
);

export default SearchBar;

