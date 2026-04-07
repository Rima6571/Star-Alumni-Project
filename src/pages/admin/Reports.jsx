import React, { useEffect, useMemo, useState } from 'react';
import {
  Users, GraduationCap, Briefcase, Calendar,
  TrendingUp, Award,
} from 'lucide-react';
import DashboardCard from '../../components/admin/DashboardCard';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

/* ─── data ──────────────────────────────────────────────────── */
const monthlyActivity = [
  { month: 'Oct', jobs: 0, events: 0 },
  { month: 'Nov', jobs: 0, events: 0 },
  { month: 'Dec', jobs: 0, events: 0 },
  { month: 'Jan', jobs: 0, events: 0 },
  { month: 'Feb', jobs: 0, events: 0 },
  { month: 'Mar', jobs: 0, events: 0 },
];

const maxJobs = Math.max(...monthlyActivity.map((m) => m.jobs));

const recentPlacements = [
  { name: 'Ananya Kulkarni',  company: 'Google',    package: '24 LPA', year: 2025 },
  { name: 'Rohan Mehta',      company: 'Microsoft', package: '22 LPA', year: 2025 },
  { name: 'Priya Sharma',     company: 'Amazon',    package: '20 LPA', year: 2025 },
  { name: 'Arjun Patil',      company: 'Flipkart',  package: '18 LPA', year: 2024 },
  { name: 'Sneha Joshi',      company: 'Infosys',   package: '9.5 LPA',year: 2024 },
];

/* ─── component ─────────────────────────────────────────────── */
const Reports = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [branchStats, setBranchStats] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const { data } = await adminApi.getReports();
        setSummary(data.summary);
        setBranchStats(data.branchStats || []);
        setTopCompanies(
          (data.topCompanies || []).map((item, idx) => ({
            ...item,
            color: ['bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'][idx % 6],
          })),
        );
      } catch {
        toast('Unable to load reports.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [toast]);

  const summaryCards = useMemo(
    () => [
      { title: 'Total Students', value: summary?.totalStudents ?? 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { title: 'Total Alumni', value: summary?.totalAlumni ?? 0, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
      { title: 'Job Applications', value: summary?.totalApplications ?? 0, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { title: 'Event Registrations', value: summary?.totalEventRegistrations ?? 0, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    ],
    [summary],
  );

  return (
    <div className="space-y-6">
    {/* Summary cards */}
    <div>
      <h2 className="text-lg font-bold text-[#0F172A] mb-4">Reports & Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl border border-gray-100 bg-white animate-pulse" />
            ))
          : summaryCards.map((c, i) => <DashboardCard key={i} {...c} />)}
      </div>
    </div>

    {/* Monthly activity chart + top companies */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Bar chart – job posts per month */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-[#0F172A]">Monthly Job Posts & Events</h3>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#1E40AF] inline-block" />Jobs</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" />Events</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 h-36">
          {monthlyActivity.map(({ month, jobs, events }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end gap-0.5 justify-center h-28">
                <div
                  className="w-5 bg-[#1E40AF] rounded-t-md transition-all"
                  style={{ height: `${(jobs / maxJobs) * 100}%` }}
                  title={`${jobs} jobs`}
                />
                <div
                  className="w-5 bg-amber-400 rounded-t-md transition-all"
                  style={{ height: `${(events / maxJobs) * 100}%` }}
                  title={`${events} events`}
                />
              </div>
              <span className="text-[10px] text-gray-500 font-medium">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top hiring companies */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#0F172A]">Top Hiring Companies</h3>
          <Award size={15} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          {(topCompanies.length ? topCompanies : [{ company: 'N/A', hires: 0, color: 'bg-gray-300' }]).map(({ company, hires, color }, i) => (
            <div key={company} className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{company}</span>
                  <span className="text-gray-500">{hires}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`${color} h-1.5 rounded-full`}
                    style={{ width: `${(hires / Math.max(1, topCompanies[0]?.hires || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Branch stats + recent placements */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Branch-wise breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Branch-wise Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Branch', 'Students', 'Alumni', 'Coverage'].map((h) => (
                  <th key={h} className="text-left pb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branchStats.map(({ branch, students, alumni, pct }) => (
                <tr key={branch} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-gray-700 text-xs whitespace-nowrap">{branch}</td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{students}</td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{alumni}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-[#1E40AF] h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-gray-500">{pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent placements */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#0F172A]">Notable Placements</h3>
          <TrendingUp size={14} className="text-emerald-500" />
        </div>
        <div className="space-y-3">
          {recentPlacements.map(({ name, company, package: pkg, year }) => (
            <div key={name} className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3b82f6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 leading-tight">{name}</p>
                  <p className="text-xs text-gray-400">{company} · {year}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex-shrink-0">
                {pkg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Reports;
