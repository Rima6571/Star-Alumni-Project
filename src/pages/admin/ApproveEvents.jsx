import React, { useEffect, useState } from 'react';
import ApprovalCard from '../../components/admin/ApprovalCard';
import SearchBar from '../../components/admin/SearchBar';
import Modal from '../../components/admin/Modal';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

/* ─── component ─────────────────────────────────────────────── */
const ApproveEvents = () => {
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,    setSearch]   = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [viewItem,  setViewItem] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data } = await adminApi.getEvents();
        setEvents(
          (data.events || []).map((event) => ({
            id: event._id,
            title: event.title,
            date: event.date ? new Date(event.date).toLocaleDateString() : 'N/A',
            location: event.location,
            organizer: event.createdBy?.name || 'Alumni',
            status: event.reviewStatus || (event.approvedByAdmin ? 'approved' : 'pending'),
            description: event.description,
            expectedAttendees: Array.isArray(event.registeredStudents)
              ? String(event.registeredStudents.length)
              : '0',
          })),
        );
      } catch {
        toast('Unable to load events for approval.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [toast]);

  const updateStatus = async (id, status) => {
    const ev = events.find((e) => e.id === id);
    try {
      if (status === 'approved') {
        await adminApi.approveEvent(id);
      } else {
        await adminApi.rejectEvent(id);
      }

      setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      toast(`"${ev?.title}" has been ${status}.`, status === 'approved' ? 'success' : 'error');
    } catch {
      toast(`Unable to ${status} event.`, 'error');
    }
  };

  const filtered = events.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      e.title.toLowerCase().includes(q) ||
      e.organizer.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q);
    const matchTab = activeTab === 'all' || e.status === activeTab;
    return matchSearch && matchTab;
  });

  const counts = {
    pending:  events.filter((e) => e.status === 'pending').length,
    approved: events.filter((e) => e.status === 'approved').length,
    rejected: events.filter((e) => e.status === 'rejected').length,
  };

  const tabs = [
    { key: 'pending',  label: 'Pending',  count: counts.pending  },
    { key: 'approved', label: 'Approved', count: counts.approved },
    { key: 'rejected', label: 'Rejected', count: counts.rejected },
    { key: 'all',      label: 'All',      count: events.length   },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Approve Events</h2>
          <p className="text-sm text-gray-500 mt-0.5">Review and manage event submission requests</p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-medium">
          <span>{counts.pending} pending review</span>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
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
          placeholder="Search by title, organizer or location…"
        />
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-sm">{loading ? 'Loading events...' : 'No events found.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((ev) => (
            <ApprovalCard
              key={ev.id}
              item={ev}
              type="event"
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
        title="Event Details"
        size="lg"
        footer={
          <>
            {viewItem?.status === 'pending' && (
              <>
                <button
                  onClick={() => { updateStatus(viewItem.id, 'rejected'); setViewItem(null); }}
                  className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-xl hover:bg-red-100 transition-colors"
                >
                  Reject Event
                </button>
                <button
                  onClick={() => { updateStatus(viewItem.id, 'approved'); setViewItem(null); }}
                  className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Approve Event
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
              <h3 className="text-base font-bold text-[#0F172A]">{viewItem.title}</h3>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex-shrink-0
                ${viewItem.status === 'pending'  ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  viewItem.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                   'bg-red-50 text-red-600 border-red-200'}`}>
                {viewItem.status.charAt(0).toUpperCase() + viewItem.status.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 text-sm">
              {[
                ['Date',             viewItem.date],
                ['Location',         viewItem.location],
                ['Organizer',        viewItem.organizer],
                ['Expected Attendees', viewItem.expectedAttendees ?? 'TBD'],
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

export default ApproveEvents;

