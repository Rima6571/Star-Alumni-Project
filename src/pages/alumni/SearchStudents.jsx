import { useEffect, useMemo, useState } from 'react';
import FormInput from '../../components/FormInput';
import LoadingState from '../../components/LoadingState';
import StudentCard from '../../components/StudentCard';
import { useToast } from '../../components/ToastProvider';
import { alumniApi } from '../../services/alumniApi';
import { mockStudents } from './mockData';

const PAGE_SIZE = 6;
const extractStudents = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.students)) return data.students;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapStudentForUi = (student) => ({
  ...student,
  id: student._id || student.id,
  photo: student.photo || student.profileImage || 'https://i.pravatar.cc/100?img=10',
  skills: Array.isArray(student.skills) ? student.skills : [],
});

const SearchStudents = () => {
  const { pushToast } = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    branch: '',
    graduationYear: '',
    skills: '',
  });

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      try {
        const response = await alumniApi.getStudents(filters);
        setStudents(extractStudents(response, mockStudents).map(mapStudentForUi));
      } catch {
        setStudents(mockStudents);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const skillMatch = filters.skills
        ? (student.skills || []).join(' ').toLowerCase().includes(filters.skills.toLowerCase())
        : true;

      return (
        student.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        student.branch.toLowerCase().includes(filters.branch.toLowerCase()) &&
        String(student.graduationYear).includes(filters.graduationYear) &&
        skillMatch
      );
    });
  }, [students, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const paginatedStudents = filteredStudents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  if (loading) return <LoadingState label="Searching students..." />;

  return (
    <section className="space-y-6">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Search Students</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FormInput label="Name" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Search by name" />
          <FormInput label="Branch" name="branch" value={filters.branch} onChange={handleFilterChange} placeholder="Computer Engineering" />
          <FormInput label="Graduation Year" name="graduationYear" value={filters.graduationYear} onChange={handleFilterChange} placeholder="2026" />
          <FormInput label="Skills" name="skills" value={filters.skills} onChange={handleFilterChange} placeholder="React, Node.js" />
        </div>
      </article>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginatedStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onView={() => pushToast(`Opening profile for ${student.name}`, 'info')}
            onMentor={() => pushToast(`Mentorship offer sent to ${student.name}`, 'success')}
            onMessage={() => pushToast(`Messaging ${student.name}`, 'info')}
          />
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <p className="text-slate-600">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchStudents;
