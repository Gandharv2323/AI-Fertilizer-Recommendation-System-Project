import React, { useState } from 'react';
import { Database, ChevronDown, ChevronUp, Sprout, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const HistoricalDataInsights = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Mock historical data (would come from backend)
  const historicalCases = [
    { id: 1, crop: "Wheat", yield: 4.2, N: 120, P: 50, K: 40, date: "2024-10-15" },
    { id: 2, crop: "Maize", yield: 5.0, N: 90, P: 45, K: 30, date: "2024-09-20" },
    { id: 3, crop: "Rice", yield: 6.0, N: 110, P: 60, K: 50, date: "2024-08-05" },
    { id: 4, crop: "Wheat", yield: 4.8, N: 130, P: 55, K: 45, date: "2024-07-12" },
    { id: 5, crop: "Maize", yield: 5.5, N: 100, P: 48, K: 35, date: "2024-06-30" }
  ];

  return (
    <div className="card-clean">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#FFF3E0] p-2 rounded-lg">
            <Database className="w-5 h-5 text-[#EF6C00]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">Historical Data</h3>
            <p className="text-xs text-gray-500">Reference cases in database</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </div>

      {isOpen && (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {historicalCases.map((item) => (
            <div key={item.id} className="group relative pl-4 border-l-2 border-gray-100 hover:border-[#2E7D32] transition-colors">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-200 group-hover:bg-[#2E7D32] transition-colors" />

              <div className="bg-gray-50 hover:bg-white p-3 rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-[#2E7D32]" />
                    <span className="font-bold text-[#1A1A1A]">{item.crop}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-100">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Yield</p>
                    <p className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-gray-400" />
                      {item.yield} t/ha
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Soil NPK</p>
                    <p className="text-sm font-mono font-medium text-gray-600">
                      {item.N}-{item.P}-{item.K}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#2E7D32] font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  View Details <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}

          <div className="text-center pt-2">
            <button className="text-xs text-gray-500 hover:text-[#2E7D32] font-medium transition-colors">
              View All History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalDataInsights;
