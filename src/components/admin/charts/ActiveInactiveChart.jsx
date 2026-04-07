import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const ActiveInactiveChart = ({ data }) => {
  const chartData = [
    { name: 'Active', value: data?.active || 0 },
    { name: 'Inactive', value: data?.inactive || 0 },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">Active Vs Inactive Alumni</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              innerRadius={60}
              paddingAngle={2}
              label
            >
              <Cell fill="#22C55E" />
              <Cell fill="#F97316" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveInactiveChart;
