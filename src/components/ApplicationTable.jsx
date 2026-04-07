const statusClass = {
  Pending: 'bg-amber-50 text-amber-700',
  Shortlisted: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-rose-50 text-rose-700',
};

const ApplicationTable = ({ rows, actionLabel = 'View Job Details', onAction }) => {
  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
      <table className="w-full min-w-[620px]">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Job Title</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Company</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Applied Date</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
            <th className="px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100">
              <td className="px-4 py-3 text-sm text-slate-900">{row.jobTitle || row.eventTitle}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{row.company || '-'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{row.appliedDate || row.date}</td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass[row.status] || 'bg-slate-100 text-slate-700'}`}>
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <button onClick={() => onAction(row)} className="text-college-blue text-sm font-semibold hover:underline">
                  {actionLabel}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;

