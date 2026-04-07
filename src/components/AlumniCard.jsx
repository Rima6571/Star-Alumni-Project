import { FiMapPin, FiMessageSquare, FiUserPlus } from 'react-icons/fi';
import { RiGraduationCapLine } from 'react-icons/ri';

const AlumniCard = ({ alumni, onConnect, onMentorship, onMessage }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-lg transition-all">
      <div className="flex items-start gap-3">
        <img src={alumni.photo} alt={alumni.name} className="h-14 w-14 rounded-xl object-cover" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{alumni.name}</h3>
          <p className="text-sm text-slate-600">{alumni.jobTitle}</p>
          <p className="text-sm text-college-blue font-medium">{alumni.company}</p>
          <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1"><RiGraduationCapLine /> {alumni.graduationYear}</span>
            <span className="inline-flex items-center gap-1"><FiMapPin /> {alumni.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium hover:bg-slate-200">View Profile</button>
        <button onClick={() => onConnect(alumni)} className="px-3 py-1.5 rounded-lg bg-blue-50 text-college-blue text-xs font-semibold inline-flex items-center gap-1 hover:bg-blue-100">
          <FiUserPlus /> Connect
        </button>
        <button onClick={() => onMentorship(alumni)} className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100">Request Mentorship</button>
        <button onClick={() => onMessage(alumni)} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold inline-flex items-center gap-1 hover:bg-emerald-100">
          <FiMessageSquare /> Message
        </button>
      </div>
    </div>
  );
};

export default AlumniCard;

