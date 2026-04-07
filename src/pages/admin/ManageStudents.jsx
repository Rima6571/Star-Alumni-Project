import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import SearchBar from '../../components/admin/SearchBar';
import Modal from '../../components/admin/Modal';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

/* ─── helpers ─────────────────────────────────────────────── */
const getInitials = (n) =>
  n.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const avatarColors = [
  'bg-blue-500', 'bg-purple-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-teal-500',
];
const avatarColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

const PAGE_SIZE = 8;

/* ─── component ────────────────────────────────────────────── */
const ManageStudents = () => {
  const toast = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,       setSearch]       = useState('');
  const [filterBranch, setFilterBranch] = useState('All Branches');
  const [filterYear,   setFilterYear]   = useState('All Years');
  const [page,         setPage]         = useState(1);
  const [deleteModal,  setDeleteModal]  = useState({ open: false, student: null });
  const [viewModal,    setViewModal]    = useState({ open: false, student: null });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const { data } = await adminApi.getStudents();
        setStudents((data.students || []).map((item) => ({
          id: item._id,
          name: item.name,
          email: item.email,
          branch: item.branch || 'N/A',
          year: item.graduationYear || 'N/A',
          phone: item.phone || 'N/A',
        })));
      } catch {
        toast('Unable to load students.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [toast]);

  const branchOptions = useMemo(
    () => ['All Branches', ...new Set(students.map((s) => s.branch).filter(Boolean))],
    [students],
  );

  const yearOptions = useMemo(
    () => ['All Years', ...new Set(students.map((s) => String(s.year)).filter(Boolean))],
    [students],
  );

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)) &&
      (filterBranch === 'All Branches' || s.branch === filterBranch) &&
      (filterYear   === 'All Years'    || s.year.toString() === filterYear)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async () => {
    if (!deleteModal.student) return;

    try {
      await adminApi.deleteUser(deleteModal.student.id);
      setStudents((prev) => prev.filter((s) => s.id !== deleteModal.student.id));
      toast(`${deleteModal.student.name} has been removed.`, 'success');
    } catch {
      toast('Failed to delete student.', 'error');
    } finally {
      setDeleteModal({ open: false, student: null });
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Student',
      render: (val) => (
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full ${avatarColor(val)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {getInitials(val)}
          </div>
          <span className="font-medium text-gray-800">{val}</span>
        </div>
      ),
    },
    { key: 'email', label: 'Email' },
    {
      key: 'branch',
      label: 'Branch',
      render: (val) => (
        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">{val}</span>
      ),
    },
    {
      key: 'year',
      label: 'Grad. Year',
      render: (val) => <span className="font-medium text-gray-600">{val}</span>,
    },
    { key: 'phone', label: 'Phone' },
  ];

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Manage Students</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} student{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">
          <span>Total on platform:</span>
          <span className="font-bold">{students.length}</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Search by name or email…"
            className="flex-1"
          />
          <div className="flex gap-3 flex-shrink-0">
            <select
              value={filterBranch}
              onChange={(e) => { setFilterBranch(e.target.value); setPage(1); }}
              className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF]
                text-gray-700 cursor-pointer"
            >
              {branchOptions.map((b) => <option key={b}>{b}</option>)}
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
        emptyMessage="No students match the current filters."
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        actions={(row) => (
          <>
            <button
              onClick={() => setViewModal({ open: true, student: row })}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700
                hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
            >
              <Eye size={12} /> View
            </button>
            <button
              onClick={() => setDeleteModal({ open: true, student: row })}
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
        onClose={() => setViewModal({ open: false, student: null })}
        title="Student Profile"
        footer={
          <button
            onClick={() => setViewModal({ open: false, student: null })}
            className="px-5 py-2 bg-[#1E40AF] text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        }
      >
        {viewModal.student && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${avatarColor(viewModal.student.name)} flex items-center justify-center text-white text-xl font-bold`}>
                {getInitials(viewModal.student.name)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F172A]">{viewModal.student.name}</h4>
                <p className="text-sm text-gray-500">{viewModal.student.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 text-sm">
              {[
                ['Branch',          viewModal.student.branch],
                ['Graduation Year', viewModal.student.year],
                ['Phone',           viewModal.student.phone],
                ['Student ID',      `APV-${String(viewModal.student.id).padStart(4, '0')}`],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-0.5">{label}</p>
                  <p className="font-semibold text-gray-800">{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, student: null })}
        title="Delete Student"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setDeleteModal({ open: false, student: null })}
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
            <span className="font-semibold text-gray-900">{deleteModal.student?.name}</span>?
            {' '}This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageStudents;

