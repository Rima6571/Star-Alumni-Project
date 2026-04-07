import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MentorshipImpactChart = ({ mentorshipStats }) => {
  const data = [
    { label: 'Pending', value: mentorshipStats?.pending || 0 },
    { label: 'Accepted', value: mentorshipStats?.accepted || 0 },
    { label: 'Rejected', value: mentorshipStats?.rejected || 0 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Mentorship Impact</h3>
        <span className="text-xs font-medium text-emerald-600">
          Success {mentorshipStats?.successRate || 0}%
        </span>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="label" tick={{ fill: '#475569', fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: '#475569', fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#1D4ED8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MentorshipImpactChart;
