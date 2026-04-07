import React, { useEffect, useMemo, useState } from 'react';
import {
  Users, GraduationCap, Briefcase, Calendar,
  Clock, CheckCircle2, ArrowRight, TrendingUp, Download,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/admin/DashboardCard';
import ActiveInactiveChart from '../../components/admin/charts/ActiveInactiveChart';
import AlumniByYearChart from '../../components/admin/charts/AlumniByYearChart';
import AlumniSectorChart from '../../components/admin/charts/AlumniSectorChart';
import MentorshipImpactChart from '../../components/admin/charts/MentorshipImpactChart';
import { useToast } from '../../context/ToastContext';
import adminApi from '../../services/adminApi';

const quickLinks = [
  { label: 'Review Pending Jobs',   path: '/admin/jobs',    color: 'text-amber-600',   bg: 'bg-amber-50',   count: '12 pending' },
  { label: 'Review Pending Events', path: '/admin/events',  color: 'text-rose-600',    bg: 'bg-rose-50',    count: '5 pending' },
  { label: 'Manage Students',       path: '/admin/students',color: 'text-blue-600',    bg: 'bg-blue-50',    count: '1,284 total' },
  { label: 'View Reports',          path: '/admin/reports', color: 'text-purple-600',  bg: 'bg-purple-50',  count: 'Analytics' },
];

const timeAgo = (value) => {
  const now = Date.now();
  const then = new Date(value).getTime();
  const mins = Math.max(1, Math.floor((now - then) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} day ago`;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboardRes, analyticsRes] = await Promise.all([
          adminApi.getDashboard(),
          adminApi.getAnalytics(),
        ]);

        setStatsData(dashboardRes.data.stats);
        setActivities(dashboardRes.data.recentActivity || []);
        setAnalytics(analyticsRes.data.analytics);
      } catch {
        toast('Unable to load dashboard data.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [toast]);

  const stats = useMemo(() => {
    if (!statsData) return [];

    return [
      {
        title: 'Total Students',
        value: statsData.totalStudents,
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        subtitle: 'Registered on platform',
      },
      {
        title: 'Total Alumni',
        value: statsData.totalAlumni,
        icon: GraduationCap,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        subtitle: 'Active profiles',
      },
      {
        title: 'Jobs Posted',
        value: statsData.totalJobs,
        icon: Briefcase,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        subtitle: 'All job posts',
      },
      {
        title: 'Events Created',
        value: statsData.totalEvents,
        icon: Calendar,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        subtitle: 'All events',
      },
      {
        title: 'Pending Job Approvals',
        value: statsData.pendingJobs,
        icon: Clock,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        subtitle: 'Awaiting your review',
      },
      {
        title: 'Pending Event Approvals',
        value: statsData.pendingEvents,
        icon: CheckCircle2,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        subtitle: 'Awaiting your review',
      },
    ];
  }, [statsData]);

  const triggerExport = async (format) => {
    try {
      const response = await adminApi.exportData(format);

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(response.data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'admin-export.json';
        anchor.click();
        URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'admin-export.csv';
        anchor.click();
        URL.revokeObjectURL(url);
      }

      toast(`Exported analytics in ${format.toUpperCase()} format`, 'success');
    } catch {
      toast('Failed to export analytics data.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-[#1E40AF] via-[#2563eb] to-[#1d4ed8] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome back, Admin! 👋</h2>
            <p className="text-blue-200 text-sm mt-1">
              Here's what's happening at APCOER today.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium">
            <Calendar size={15} />
            <span>March 17, 2026</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => triggerExport('json')}
            className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-xs font-medium hover:bg-white/30"
          >
            <Download size={13} /> Export JSON
          </button>
          <button
            onClick={() => triggerExport('csv')}
            className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-xs font-medium hover:bg-white/30"
          >
            <Download size={13} /> Export CSV
          </button>
        </div>

        {/* Quick action chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {quickLinks.map((l) => (
            <button
              key={l.path}
              onClick={() => navigate(l.path)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              {l.label}
              <span className="opacity-70">· {l.path === '/admin/jobs' ? `${statsData?.pendingJobs ?? 0} pending` : l.path === '/admin/events' ? `${statsData?.pendingEvents ?? 0} pending` : l.count}</span>
              <ArrowRight size={11} />
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl border border-gray-100 bg-white animate-pulse" />
          ))
        ) : (
          stats.map((s, i) => <DashboardCard key={i} {...s} />)
        )}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#0F172A]">Recent Activity</h3>
            <span className="text-xs text-gray-400">Today</span>
          </div>
          <div className="space-y-4">
            {(activities.length ? activities : [{ message: 'No recent activity found.', createdAt: new Date() }]).map((a, idx) => (
              <div key={`${a.message}-${idx}`} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${a.type === 'student' ? 'bg-blue-500' : a.type === 'job' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{a.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{timeAgo(a.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch-wise students */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#0F172A]">Students by Branch</h3>
            <TrendingUp size={14} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { branch: 'Students', count: statsData?.totalStudents || 0, pct: 100 },
              { branch: 'Alumni', count: statsData?.totalAlumni || 0, pct: statsData?.totalStudents ? Math.min(100, Math.round(((statsData?.totalAlumni || 0) / statsData.totalStudents) * 100)) : 0 },
              { branch: 'Jobs', count: statsData?.totalJobs || 0, pct: statsData?.totalJobs ? 100 : 0 },
              { branch: 'Events', count: statsData?.totalEvents || 0, pct: statsData?.totalEvents ? 100 : 0 },
            ].map(({ branch, count, pct }) => (
              <div key={branch}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-gray-600 truncate max-w-[140px]">{branch}</span>
                  <span className="font-semibold text-gray-800 ml-2">{count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-[#1E40AF] to-[#3b82f6] h-1.5 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Placement rate highlight */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Pending Review Ratio</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-[#1E40AF]">
                {statsData
                  ? Math.round(((statsData.pendingJobs + statsData.pendingEvents) / Math.max(1, statsData.totalJobs + statsData.totalEvents)) * 100)
                  : 0}
                %
              </span>
              <span className="text-xs text-amber-600 font-medium mb-0.5">Needs action</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <AlumniByYearChart data={analytics?.alumniByYear || []} />
        <AlumniSectorChart data={analytics?.alumniBySector || []} />
        <ActiveInactiveChart data={analytics?.activeVsInactive} />
        <MentorshipImpactChart mentorshipStats={analytics?.mentorshipStats} />
      </div>

      {analytics?.mentorshipStats?.topMentors?.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800">Top Mentors Leaderboard</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {analytics.mentorshipStats.topMentors.map((mentor, index) => (
              <div key={mentor.alumniId} className="rounded-xl border border-slate-100 px-4 py-3">
                <p className="text-xs text-slate-500">Rank #{index + 1}</p>
                <p className="font-semibold text-slate-800">{mentor.name}</p>
                <p className="text-sm text-slate-500">{mentor.company || 'N/A'}</p>
                <p className="mt-1 text-sm font-medium text-blue-700">
                  Students mentored: {mentor.mentoredStudents}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboard;

