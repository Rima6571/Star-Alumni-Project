import { FiMessageSquare, FiUserPlus } from 'react-icons/fi';

const StudentCard = ({ student, onMentor, onMessage, onView }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <img
          src={student.photo || 'https://i.pravatar.cc/100?img=10'}
          alt={student.name}
          className="h-14 w-14 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900">{student.name}</h3>
          <p className="text-sm text-slate-600">{student.branch}</p>
          <p className="text-xs text-slate-500">Class of {student.graduationYear}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(student.skills || []).slice(0, 4).map((skill) => (
          <span key={skill} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onView(student)}
          className="rounded-lg border border-slate-200 px-2 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          View Profile
        </button>
        <button
          type="button"
          onClick={() => onMentor(student)}
          className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-700 px-2 py-2 text-xs font-medium text-white hover:bg-blue-800"
        >
          <FiUserPlus /> Offer
        </button>
        <button
          type="button"
          onClick={() => onMessage(student)}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-2 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <FiMessageSquare /> Message
        </button>
      </div>
    </article>
  );
};

export default StudentCard;

