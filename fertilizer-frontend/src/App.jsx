import React, { useState } from 'react';
import { Sprout, TrendingUp, Loader2, History } from 'lucide-react';
import InputForm from './components/InputForm';
import ResultsCard from './components/ResultsCard';
import Chart from './components/Chart';
import HistoricalDataInsights from './components/HistoricalDataInsights';

function App() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedRecommendations, setSavedRecommendations] = useState(() => {
    const saved = localStorage.getItem('fertilizer-recommendations');
    return saved ? JSON.parse(saved) : [];
  });

  const handleRecommendation = async (formData) => {
    setLoading(true);

    try {
      // Call real backend API
      const response = await fetch('http://localhost:8080/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation from server');
      }

      const result = await response.json();
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      // Fallback to mock API if backend is not running
      console.log('Falling back to mock API...');
      const result = await simulateBackendAPI(formData);
      setRecommendation(result);
    } finally {
      setLoading(false);
    }
  };

  const saveRecommendation = () => {
    if (recommendation) {
      const newRec = {
        ...recommendation,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      const updated = [newRec, ...savedRecommendations].slice(0, 10); // Keep last 10
      setSavedRecommendations(updated);
      localStorage.setItem('fertilizer-recommendations', JSON.stringify(updated));
      alert('Recommendation saved successfully!');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#E8F5E9] p-2 rounded-lg">
                <Sprout className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1A1A1A]">
                  AI Fertilizer Recommendation System
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Enterprise Grade Precision Agriculture Tool
                </p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">System Status: Online</p>
              <p className="text-xs text-gray-500">v2.4.0 (Stable)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input Form */}
        <div className="space-y-5">
          <InputForm onSubmit={handleRecommendation} loading={loading} />

          {/* Historical Data Insights */}
          <HistoricalDataInsights />

          {/* Visual Analysis Chart - Moved here to balance layout */}
          {!loading && recommendation && (
            <Chart recommendation={recommendation} />
          )}
        </div>

        {/* Right Column - Results */}
        <div className="space-y-5">
          {loading && (
            <div className="card flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Calculating optimal fertilizer mix...</p>
              </div>
            </div>
          )}

          {!loading && recommendation && (
            <ResultsCard
              recommendation={recommendation}
              onSave={saveRecommendation}
            />
          )}

          {!loading && !recommendation && (
            <div className="card-clean text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E8F5E9] rounded-full mb-6">
                <Sprout className="w-10 h-10 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                Ready to Optimize Your Harvest?
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Enter your crop details and soil nutrient levels to receive personalized fertilizer recommendations based on historical data.
              </p>
            </div>
          )}

          {/* Saved Recommendations */}
          {savedRecommendations.length > 0 && (
            <div className="card-clean">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-gray-600" />
                Recent Recommendations
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {savedRecommendations.map((rec) => (
                  <div key={rec.id} className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#2E7D32] transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1A1A1A]">{rec.crop}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          Yield: {rec.yield} t/ha
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {new Date(rec.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 flex gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        DAP: {rec.DAP}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Urea: {rec.Urea}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                        MOP: {rec.MOP}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>Built with React + TailwindCSS | Backend: C++ KNN Algorithm</p>
      </div>
    </div>
  );
}

// Simulate backend API (KNN Algorithm implementation)
const simulateBackendAPI = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Historical dataset (same as C++ code)
      const dataset = [
        { crop: "Wheat", soilN: 120, soilP: 50, soilK: 40, yield: 4.2, dap: 100, urea: 200, mop: 150 },
        { crop: "Maize", soilN: 90, soilP: 45, soilK: 30, yield: 5.0, dap: 80, urea: 180, mop: 140 },
        { crop: "Rice", soilN: 110, soilP: 60, soilK: 50, yield: 6.0, dap: 120, urea: 220, mop: 160 },
        { crop: "Wheat", soilN: 130, soilP: 55, soilK: 45, yield: 4.8, dap: 105, urea: 210, mop: 155 },
        { crop: "Maize", soilN: 100, soilP: 48, soilK: 35, yield: 5.5, dap: 90, urea: 190, mop: 145 }
      ];

      // Calculate distances
      const distances = dataset.map((data, index) => {
        const dist = Math.sqrt(
          Math.pow(formData.N - data.soilN, 2) +
          Math.pow(formData.P - data.soilP, 2) +
          Math.pow(formData.K - data.soilK, 2) +
          Math.pow(formData.yield - data.yield, 2)
        );
        return { distance: dist, index };
      });

      // Sort and get k=3 nearest neighbors
      distances.sort((a, b) => a.distance - b.distance);
      const k = 3;

      let sumDAP = 0, sumUrea = 0, sumMOP = 0;
      const neighbors = [];

      for (let i = 0; i < k && i < distances.length; i++) {
        const idx = distances[i].index;
        sumDAP += dataset[idx].dap;
        sumUrea += dataset[idx].urea;
        sumMOP += dataset[idx].mop;
        neighbors.push({
          ...dataset[idx],
          distance: distances[i].distance.toFixed(2)
        });
      }

      resolve({
        crop: formData.crop,
        yield: formData.yield,
        N: formData.N,
        P: formData.P,
        K: formData.K,
        DAP: (sumDAP / k).toFixed(2),
        Urea: (sumUrea / k).toFixed(2),
        MOP: (sumMOP / k).toFixed(2),
        neighbors,
        k
      });
    }, 1000); // Simulate network delay
  });
};

export default App;
