const MentorshipCard = ({ request, onAccept, onDecline }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{request.studentName}</h3>
          <p className="text-sm text-slate-600">
            {request.branch} | {request.year}
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">Pending</span>
      </div>

      <p className="mt-3 text-sm text-slate-600">{request.message}</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onAccept(request)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Accept Request
        </button>
        <button
          type="button"
          onClick={() => onDecline(request)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Decline Request
        </button>
      </div>
    </article>
  );
};

export default MentorshipCard;

