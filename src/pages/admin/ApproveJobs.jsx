import React, { useEffect, useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import ApprovalCard from '../../components/admin/ApprovalCard';
import SearchBar from '../../components/admin/SearchBar';
import Modal from '../../components/admin/Modal';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

/* ─── component ─────────────────────────────────────────────── */
const ApproveJobs = () => {
  const toast = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,     setSearch]     = useState('');
  const [activeTab,  setActiveTab]  = useState('pending');
  const [viewItem,   setViewItem]   = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data } = await adminApi.getJobs();
        setJobs(
          (data.jobs || []).map((job) => ({
            id: job._id,
            title: job.title,
            company: job.company,
            location: job.location,
            postedBy: job.postedBy?.name || 'Alumni',
            type: job.jobType || 'Job',
            deadline: job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A',
            status: job.reviewStatus || (job.approvedByAdmin ? 'approved' : 'pending'),
            description: job.description,
          })),
        );
      } catch {
        toast('Unable to load jobs for approval.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [toast]);

  const updateStatus = async (id, status) => {
    const job = jobs.find((j) => j.id === id);
    try {
      if (status === 'approved') {
        await adminApi.approveJob(id);
      } else {
        await adminApi.rejectJob(id);
      }

      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
      toast(`"${job?.title}" has been ${status}.`, status === 'approved' ? 'success' : 'error');
    } catch {
      toast(`Unable to ${status} job.`, 'error');
    }
  };

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch =
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.postedBy.toLowerCase().includes(q);
    const matchTab = activeTab === 'all' || j.status === activeTab;
    return matchSearch && matchTab;
  });

  const counts = {
    pending:  jobs.filter((j) => j.status === 'pending').length,
    approved: jobs.filter((j) => j.status === 'approved').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
  };

  const tabs = [
    { key: 'pending',  label: 'Pending',  count: counts.pending  },
    { key: 'approved', label: 'Approved', count: counts.approved },
    { key: 'rejected', label: 'Rejected', count: counts.rejected },
    { key: 'all',      label: 'All',      count: jobs.length     },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Approve Jobs</h2>
          <p className="text-sm text-gray-500 mt-0.5">Review and manage job post requests</p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg font-medium">
          <span>{counts.pending} pending review</span>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                ${activeTab === t.key
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold
                ${activeTab === t.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title, company or posted by…"
        />
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm">{loading ? 'Loading jobs...' : 'No job posts found.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <ApprovalCard
              key={job.id}
              item={job}
              type="job"
              onApprove={(id) => updateStatus(id, 'approved')}
              onReject={(id) => updateStatus(id, 'rejected')}
              onView={setViewItem}
            />
          ))}
        </div>
      )}

      {/* View Details Modal */}
      <Modal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Job Post Details"
        size="lg"
        footer={
          <>
            {viewItem?.status === 'pending' && (
              <>
                <button
                  onClick={() => { updateStatus(viewItem.id, 'rejected'); setViewItem(null); }}
                  className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-xl hover:bg-red-100 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => { updateStatus(viewItem.id, 'approved'); setViewItem(null); }}
                  className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Approve
                </button>
              </>
            )}
            <button
              onClick={() => setViewItem(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </>
        }
      >
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">{viewItem.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{viewItem.company} · {viewItem.location}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex-shrink-0
                ${viewItem.status === 'pending'  ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  viewItem.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                   'bg-red-50 text-red-600 border-red-200'}`}>
                {viewItem.status.charAt(0).toUpperCase() + viewItem.status.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 text-sm">
              {[
                ['Type',        viewItem.type],
                ['Deadline',    viewItem.deadline],
                ['Posted By',   viewItem.postedBy],
                ['Location',    viewItem.location],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">{label}</p>
                  <p className="font-semibold text-gray-800">{val}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">{viewItem.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApproveJobs;

