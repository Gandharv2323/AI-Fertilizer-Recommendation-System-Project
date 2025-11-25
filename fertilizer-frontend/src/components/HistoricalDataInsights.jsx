import React from 'react';
import { Database, TrendingUp } from 'lucide-react';

const HistoricalDataInsights = () => {
  // Historical dataset (same as backend)
  const dataset = [
    {crop: "Wheat", soilN: 120, soilP: 50, soilK: 40, yield: 4.2, dap: 100, urea: 200, mop: 150},
    {crop: "Maize", soilN: 90, soilP: 45, soilK: 30, yield: 5.0, dap: 80, urea: 180, mop: 140},
    {crop: "Rice", soilN: 110, soilP: 60, soilK: 50, yield: 6.0, dap: 120, urea: 220, mop: 160},
    {crop: "Wheat", soilN: 130, soilP: 55, soilK: 45, yield: 4.8, dap: 105, urea: 210, mop: 155},
    {crop: "Maize", soilN: 100, soilP: 48, soilK: 35, yield: 5.5, dap: 90, urea: 190, mop: 145}
  ];

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Historical Data Insights</h2>
          <p className="text-xs text-gray-500">{dataset.length} reference cases in database</p>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {dataset.map((data, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {data.crop === 'Wheat' ? '🌾' : data.crop === 'Maize' ? '🌽' : '🍚'}
                </span>
                <div>
                  <p className="font-semibold text-gray-800">{data.crop}</p>
                  <p className="text-xs text-gray-500">Yield: {data.yield} t/ha</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                <TrendingUp className="w-3 h-3" />
                Case #{index + 1}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded p-2">
                <p className="text-gray-500 mb-1">Soil NPK</p>
                <p className="font-semibold text-gray-700">
                  <span className="text-blue-600">{data.soilN}</span> - 
                  <span className="text-orange-600">{data.soilP}</span> - 
                  <span className="text-purple-600">{data.soilK}</span>
                </p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="text-gray-500 mb-1">Fertilizers (kg/ha)</p>
                <p className="font-semibold text-gray-700">
                  D:{data.dap} U:{data.urea} M:{data.mop}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
        <p className="text-xs text-emerald-800">
          <strong>ℹ️ How it works:</strong> The KNN algorithm finds the 3 most similar historical cases 
          to your input based on soil nutrients and target yield, then averages their fertilizer recommendations.
        </p>
      </div>
    </div>
  );
};

export default HistoricalDataInsights;
