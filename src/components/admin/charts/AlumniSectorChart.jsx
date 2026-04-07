import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0EA5E9', '#14B8A6', '#F59E0B', '#6366F1'];

const AlumniSectorChart = ({ data = [] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-800">Alumni By Sector</h3>
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="sector"
            outerRadius={100}
            innerRadius={52}
            paddingAngle={2}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.sector}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AlumniSectorChart;
