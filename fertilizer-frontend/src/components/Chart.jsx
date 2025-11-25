import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const Chart = ({ recommendation }) => {
  // Data for bar chart
  const barData = [
    {
      name: 'DAP',
      'Recommended': parseFloat(recommendation.DAP),
      fill: '#3b82f6'
    },
    {
      name: 'Urea',
      'Recommended': parseFloat(recommendation.Urea),
      fill: '#22c55e'
    },
    {
      name: 'MOP',
      'Recommended': parseFloat(recommendation.MOP),
      fill: '#a855f7'
    }
  ];

  // Data for pie chart (fertilizer composition)
  const total = parseFloat(recommendation.DAP) + parseFloat(recommendation.Urea) + parseFloat(recommendation.MOP);
  const pieData = [
    { name: 'DAP', value: parseFloat(recommendation.DAP), percentage: ((parseFloat(recommendation.DAP) / total) * 100).toFixed(1) },
    { name: 'Urea', value: parseFloat(recommendation.Urea), percentage: ((parseFloat(recommendation.Urea) / total) * 100).toFixed(1) },
    { name: 'MOP', value: parseFloat(recommendation.MOP), percentage: ((parseFloat(recommendation.MOP) / total) * 100).toFixed(1) }
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#a855f7'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-primary-600">
            {payload[0].value.toFixed(2)} kg/ha
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Visual Analysis</h2>
          <p className="text-sm text-gray-500">Fertilizer distribution breakdown</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recommended Quantities (kg/ha)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Recommended" radius={[8, 8, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Fertilizer Mix Composition</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value.toFixed(2)} kg/ha`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="space-y-3">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.value.toFixed(2)} kg/ha ({item.percentage}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-xs text-blue-600 mb-1">Total Fertilizer</p>
          <p className="text-lg font-bold text-blue-700">{total.toFixed(2)}</p>
          <p className="text-xs text-blue-500">kg/ha</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-xs text-green-600 mb-1">Total Cost</p>
          <p className="text-lg font-bold text-green-700">
            ₹{(parseFloat(recommendation.DAP) * 27 + parseFloat(recommendation.Urea) * 6 + parseFloat(recommendation.MOP) * 26).toFixed(2)}
          </p>
          <p className="text-xs text-green-500">per hectare</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <p className="text-xs text-purple-600 mb-1">Application</p>
          <p className="text-lg font-bold text-purple-700">2-3</p>
          <p className="text-xs text-purple-500">split doses</p>
        </div>
      </div>

      {/* Detailed Cost Breakdown */}
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          💰 Cost Breakdown (Indian Prices - Nov 2025)
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              <span className="font-medium">DAP:</span> {recommendation.DAP} kg × ₹27/kg
            </span>
            <span className="font-bold text-blue-700">
              ₹{(parseFloat(recommendation.DAP) * 27).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              <span className="font-medium">Urea:</span> {recommendation.Urea} kg × ₹6/kg
            </span>
            <span className="font-bold text-green-700">
              ₹{(parseFloat(recommendation.Urea) * 6).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              <span className="font-medium">MOP:</span> {recommendation.MOP} kg × ₹26/kg
            </span>
            <span className="font-bold text-purple-700">
              ₹{(parseFloat(recommendation.MOP) * 26).toFixed(2)}
            </span>
          </div>
          <div className="border-t border-amber-300 pt-2 flex justify-between items-center">
            <span className="font-semibold text-gray-800">Total Cost per Hectare:</span>
            <span className="text-xl font-bold text-orange-700">
              ₹{(parseFloat(recommendation.DAP) * 27 + parseFloat(recommendation.Urea) * 6 + parseFloat(recommendation.MOP) * 26).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 pt-1">
            <span>Cost per Acre (÷ 2.47):</span>
            <span className="font-semibold text-orange-600">
              ₹{((parseFloat(recommendation.DAP) * 27 + parseFloat(recommendation.Urea) * 6 + parseFloat(recommendation.MOP) * 26) / 2.47).toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Bags Calculation */}
        <div className="mt-4 pt-3 border-t border-amber-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">📦 Required Bags (per hectare):</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white rounded p-2 text-center">
              <p className="text-blue-600 font-medium">DAP</p>
              <p className="font-bold text-gray-800">{Math.ceil(parseFloat(recommendation.DAP) / 50)} bags</p>
              <p className="text-gray-500">(50 kg)</p>
            </div>
            <div className="bg-white rounded p-2 text-center">
              <p className="text-green-600 font-medium">Urea</p>
              <p className="font-bold text-gray-800">{Math.ceil(parseFloat(recommendation.Urea) / 45)} bags</p>
              <p className="text-gray-500">(45 kg)</p>
            </div>
            <div className="bg-white rounded p-2 text-center">
              <p className="text-purple-600 font-medium">MOP</p>
              <p className="font-bold text-gray-800">{Math.ceil(parseFloat(recommendation.MOP) / 50)} bags</p>
              <p className="text-gray-500">(50 kg)</p>
            </div>
          </div>
        </div>

        {/* Price Reference */}
        <div className="mt-3 pt-3 border-t border-amber-200">
          <p className="text-xs text-amber-800">
            <strong>💡 Current Prices:</strong> DAP ₹1,350/50kg bag | Urea ₹267/45kg bag | MOP ₹1,300/50kg bag
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
