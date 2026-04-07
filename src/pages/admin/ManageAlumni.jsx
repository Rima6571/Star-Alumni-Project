import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Trash2, ExternalLink } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import SearchBar from '../../components/admin/SearchBar';
import Modal from '../../components/admin/Modal';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

/* ─── helpers ──────────────────────────────────────────────── */
const getInitials = (n) =>
  n.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
const avatarColors = [
  'bg-violet-500', 'bg-indigo-500', 'bg-cyan-600',
  'bg-teal-500',   'bg-pink-500',   'bg-orange-500',
];
const avatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

const PAGE_SIZE   = 8;

/* ─── component ─────────────────────────────────────────────── */
const ManageAlumni = () => {
  const toast = useToast();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,         setSearch]        = useState('');
  const [filterCompany,  setFilterCompany] = useState('All Companies');
  const [filterYear,     setFilterYear]    = useState('All Years');
  const [page,           setPage]          = useState(1);
  const [viewModal,      setViewModal]     = useState({ open: false, alumni: null });
  const [deleteModal,    setDeleteModal]   = useState({ open: false, alumni: null });

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        const { data } = await adminApi.getAlumni();
        setAlumni((data.alumni || []).map((item) => ({
          id: item._id,
          name: item.name,
          email: item.email,
          company: item.company || 'N/A',
          title: item.jobTitle || 'N/A',
          year: item.graduationYear || 'N/A',
          location: item.location || 'N/A',
          phone: item.phone || 'N/A',
        })));
      } catch {
        toast('Unable to load alumni.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadAlumni();
  }, [toast]);

  const companyOptions = useMemo(
    () => ['All Companies', ...new Set(alumni.map((a) => a.company).filter(Boolean))],
    [alumni],
  );

  const yearOptions = useMemo(
    () => ['All Years', ...new Set(alumni.map((a) => String(a.year)).filter(Boolean))],
    [alumni],
  );

  const filtered = alumni.filter((a) => {
    const q = search.toLowerCase();
    return (
      (a.name.toLowerCase().includes(q) ||
       a.email.toLowerCase().includes(q) ||
       a.company.toLowerCase().includes(q)) &&
      (filterCompany === 'All Companies' || a.company === filterCompany) &&
      (filterYear    === 'All Years'     || a.year.toString() === filterYear)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async () => {
    if (!deleteModal.alumni) return;

    try {
      await adminApi.deleteUser(deleteModal.alumni.id);
      setAlumni((prev) => prev.filter((a) => a.id !== deleteModal.alumni.id));
      toast(`${deleteModal.alumni.name} has been removed.`, 'success');
    } catch {
      toast('Failed to delete alumni.', 'error');
    } finally {
      setDeleteModal({ open: false, alumni: null });
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Alumni',
      render: (val) => (
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full ${avatarColor(val)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {getInitials(val)}
          </div>
          <span className="font-medium text-gray-800">{val}</span>
        </div>
      ),
    },
    {
      key: 'company',
      label: 'Company',
      render: (val) => (
        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">{val}</span>
      ),
    },
    { key: 'title', label: 'Job Title' },
    {
      key: 'year',
      label: 'Grad. Year',
      render: (val) => <span className="font-medium text-gray-600">{val}</span>,
    },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Manage Alumni</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} alumni found
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg font-medium">
          <span>Total alumni:</span>
          <span className="font-bold">{alumni.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Search by name, email or company…"
            className="flex-1"
          />
          <div className="flex gap-3 flex-shrink-0">
            <select
              value={filterCompany}
              onChange={(e) => { setFilterCompany(e.target.value); setPage(1); }}
              className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]
                text-gray-700 cursor-pointer"
            >
              {companyOptions.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              value={filterYear}
              onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}
              className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]
                text-gray-700 cursor-pointer"
            >
              {yearOptions.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={pageData}
        loading={loading}
        emptyMessage="No alumni match the current filters."
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        actions={(row) => (
          <>
            <button
              onClick={() => setViewModal({ open: true, alumni: row })}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700
                hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
            >
              <Eye size={12} /> View
            </button>
            <button
              onClick={() => setDeleteModal({ open: true, alumni: row })}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-600
                hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
            >
              <Trash2 size={12} /> Delete
            </button>
          </>
        )}
      />

      {/* ── View Modal ── */}
      <Modal
        isOpen={viewModal.open}
        onClose={() => setViewModal({ open: false, alumni: null })}
        title="Alumni Profile"
        footer={
          <button
            onClick={() => setViewModal({ open: false, alumni: null })}
            className="px-5 py-2 bg-[#1E40AF] text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        }
      >
        {viewModal.alumni && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${avatarColor(viewModal.alumni.name)} flex items-center justify-center text-white text-xl font-bold`}>
                {getInitials(viewModal.alumni.name)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F172A]">{viewModal.alumni.name}</h4>
                <p className="text-sm text-gray-500">{viewModal.alumni.title} @ {viewModal.alumni.company}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 text-sm">
              {[
                ['Email',           viewModal.alumni.email],
                ['Phone',           viewModal.alumni.phone],
                ['Company',         viewModal.alumni.company],
                ['Job Title',       viewModal.alumni.title],
                ['Location',        viewModal.alumni.location],
                ['Graduation Year', viewModal.alumni.year],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">{label}</p>
                  <p className="font-semibold text-gray-800 truncate">{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, alumni: null })}
        title="Delete Alumni"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setDeleteModal({ open: false, alumni: null })}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to permanently delete{' '}
            <span className="font-semibold text-gray-900">{deleteModal.alumni?.name}</span>?
            {' '}This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAlumni;

