import React from 'react';
import { Check, X, Eye, MapPin, Calendar, User, Building2, Clock } from 'lucide-react';

const statusStyles = {
  pending:  'bg-amber-50  text-amber-700  border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50    text-red-600    border-red-200',
};

const StatusBadge = ({ status = 'pending' }) => (
  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusStyles[status] ?? statusStyles.pending}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

const InfoRow = ({ icon: Icon, text }) =>
  text ? (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <Icon size={12} className="flex-shrink-0 text-gray-400" />
      <span className="truncate">{text}</span>
    </div>
  ) : null;

const ApprovalCard = ({ item, type = 'job', onApprove, onReject, onView }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3">
    {/* Header */}
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[#0F172A] truncate">{item.title}</h3>
        {type === 'job' && item.company && (
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
            <Building2 size={11} />
            <span>{item.company}</span>
          </div>
        )}
      </div>
      <StatusBadge status={item.status} />
    </div>

    {/* Details */}
    <div className="space-y-1.5">
      <InfoRow icon={MapPin}    text={item.location} />
      <InfoRow icon={Calendar}  text={item.date} />
      <InfoRow icon={User}      text={item.postedBy   ? `Posted by: ${item.postedBy}`   : null} />
      <InfoRow icon={User}      text={item.organizer  ? `Organizer: ${item.organizer}`  : null} />
      <InfoRow icon={Clock}     text={item.deadline   ? `Deadline: ${item.deadline}`    : null} />
      {item.type && (
        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium">
          {item.type}
        </span>
      )}
    </div>

    {/* Description */}
    {item.description && (
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{item.description}</p>
    )}

    {/* Actions */}
    <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-auto">
      <button
        onClick={() => onApprove(item.id)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700
          hover:bg-emerald-100 rounded-lg text-xs font-medium transition-colors"
      >
        <Check size={12} /> Approve
      </button>
      <button
        onClick={() => onReject(item.id)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600
          hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
      >
        <X size={12} /> Reject
      </button>
      <button
        onClick={() => onView(item)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#1E40AF]
          hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors ml-auto"
      >
        <Eye size={12} /> View Details
      </button>
    </div>
  </div>
);

export default ApprovalCard;

