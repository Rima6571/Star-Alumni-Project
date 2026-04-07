import { useEffect, useMemo, useState } from 'react';
import AlumniCard from '../../components/AlumniCard';
import LoadingState from '../../components/LoadingState';
import { alumniApi, mentorshipApi } from '../../services/api';
import { alumniList as fallbackAlumni } from '../../data/studentMockData';
import { useToast } from '../../components/ToastProvider';

const extractAlumni = (response, fallback) => {
  const data = response?.data;
  if (Array.isArray(data?.alumni)) return data.alumni;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return fallback;
};

const mapAlumniForUi = (item) => ({
  ...item,
  id: item._id || item.id,
  photo: item.photo || item.profileImage || 'https://i.pravatar.cc/120?img=22',
  industry: item.industry || item.company || 'General',
  location: item.location || 'India',
});

const ITEMS_PER_PAGE = 6;

const FindAlumni = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ company: '', industry: '', location: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await alumniApi.getAlumni();
        setAlumni(extractAlumni(response, fallbackAlumni).map(mapAlumniForUi));
      } catch {
        setAlumni(fallbackAlumni);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return alumni.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.industry.toLowerCase().includes(query) ||
        String(item.graduationYear).includes(query);
      const matchCompany = !filters.company || item.company === filters.company;
      const matchIndustry = !filters.industry || item.industry === filters.industry;
      const matchLocation = !filters.location || item.location === filters.location;
      return matchSearch && matchCompany && matchIndustry && matchLocation;
    });
  }, [alumni, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pagedAlumni = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const uniqueOptions = (key) => [...new Set(alumni.map((item) => item[key]))];

  const handleMentorship = async (alum) => {
    try {
      await mentorshipApi.requestMentorship({
        alumniId: alum.id,
        message: `Hello ${alum.name}, I would like to request mentorship guidance.`,
      });
      showToast(`Mentorship requested from ${alum.name}`, 'success');
    } catch {
      showToast(`Mentorship request sent to ${alum.name} (offline mode)`, 'info');
    }
  };

  if (loading) return <LoadingState label="Searching alumni network..." />;

  return (
    <section className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Find Alumni</h1>
        <p className="text-sm text-slate-600 mt-1">Search by name, company, industry, or graduation year and build your network.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, Company, Industry, Graduation Year"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-college-blue/30"
        />

        <div className="grid md:grid-cols-3 gap-3">
          {['company', 'industry', 'location'].map((key) => (
            <select
              key={key}
              value={filters[key]}
              onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            >
              <option value="">All {key}</option>
              {uniqueOptions(key).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pagedAlumni.map((item) => (
          <AlumniCard
            key={item.id}
            alumni={item}
            onConnect={() => showToast(`Connection request sent to ${item.name}`, 'success')}
            onMentorship={handleMentorship}
            onMessage={() => showToast(`Open Messages to chat with ${item.name}`, 'info')}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindAlumni;

