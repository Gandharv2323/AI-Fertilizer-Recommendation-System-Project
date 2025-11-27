import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart2, PieChart as PieChartIcon, Layers, DollarSign, Activity } from 'lucide-react';

const Chart = ({ recommendation }) => {
  if (!recommendation) return null;

  const { DAP, Urea, MOP } = recommendation;

  // Data for Bar Chart
  const barData = [
    { name: 'DAP', quantity: parseFloat(DAP), fill: '#2196F3' }, // Blue
    { name: 'Urea', quantity: parseFloat(Urea), fill: '#4CAF50' }, // Green
    { name: 'MOP', quantity: parseFloat(MOP), fill: '#9C27B0' }, // Purple
  ];

  // Data for Pie Chart
  const pieData = [
    { name: 'DAP', value: parseFloat(DAP) },
    { name: 'Urea', value: parseFloat(Urea) },
    { name: 'MOP', value: parseFloat(MOP) },
  ];

  const COLORS = ['#2196F3', '#4CAF50', '#9C27B0'];

  // Calculate Totals
  const totalFertilizer = (parseFloat(DAP) + parseFloat(Urea) + parseFloat(MOP)).toFixed(2);
  const totalCost = (
    (parseFloat(DAP) / 50 * 1350) +
    (parseFloat(Urea) / 45 * 267) +
    (parseFloat(MOP) / 50 * 1300)
  ).toFixed(2);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Visual Analysis Header */}
      <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-4">
        <div className="bg-[#E3F2FD] p-2 rounded-lg">
          <BarChart2 className="w-6 h-6 text-[#1565C0]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Visual Analysis</h2>
          <p className="text-sm text-gray-500">Fertilizer distribution breakdown</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card-clean">
          <h3 className="section-title text-sm">
            Recommended Quantities (kg/ha)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="quantity" radius={[4, 4, 0, 0]} barSize={50}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card-clean">
          <h3 className="section-title text-sm">
            Fertilizer Mix Composition
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px', color: '#333' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Fertilizer */}
        <div className="card-clean flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fertilizer</p>
            <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalFertilizer}</p>
            <p className="text-xs text-gray-400">kg/ha</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Total Cost */}
        <div className="card-clean flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</p>
            <p className="text-2xl font-bold text-[#2E7D32] mt-1">₹{totalCost}</p>
            <p className="text-xs text-gray-400">per hectare</p>
          </div>
          
        </div>

        {/* Application Split */}
        <div className="card-clean flex items-center justify-between p-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Application</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">2-3</p>
            <p className="text-xs text-gray-400">split doses</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-full">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
