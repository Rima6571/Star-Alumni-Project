import React from 'react';
import { Quote, Building2, Linkedin } from 'lucide-react';

const SuccessStoryCard = ({ alumni }) => {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-college-blue/20 card-hover transition-all duration-300 flex flex-col">
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-accent-gold/60" />
      </div>

      {/* Quote text */}
      <p className="text-gray-600 text-sm leading-relaxed italic mb-6 flex-1">
        "{alumni.quote}"
      </p>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-college-blue to-blue-300 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {alumni.avatar ? (
                <img
                  src={alumni.avatar}
                  alt={alumni.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                alumni.name.charAt(0)
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-gold rounded-full flex items-center justify-center">
              <span className="text-dark-blue text-xs font-bold">✓</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-dark-blue text-sm group-hover:text-college-blue transition-colors truncate">
              {alumni.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
              <Building2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{alumni.role} at {alumni.company}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Batch of {alumni.batch}</p>
          </div>

          {/* LinkedIn icon */}
          {alumni.linkedin && (
            <a
              href={alumni.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;

