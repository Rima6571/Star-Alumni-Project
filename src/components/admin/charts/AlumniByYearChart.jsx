import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AlumniByYearChart = ({ data = [] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-800">Alumni By Graduation Year</h3>
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: '#475569', fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#0F766E" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AlumniByYearChart;
