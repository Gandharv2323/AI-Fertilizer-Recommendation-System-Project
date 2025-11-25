import React, { useState } from 'react';
import { Sprout, TrendingUp, Loader2 } from 'lucide-react';
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
      alert('Recommendation saved successfully! 💾');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full mb-4 shadow-lg animate-bounce-slow">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-700 to-emerald-700 bg-clip-text text-transparent mb-2">
            AI Fertilizer Recommendation System
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Powered by K-Nearest Neighbors Algorithm
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input Form */}
        <div className="space-y-6">
          <InputForm onSubmit={handleRecommendation} loading={loading} />
          
          {/* Historical Data Insights */}
          <HistoricalDataInsights />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {loading && (
            <div className="card flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Calculating optimal fertilizer mix...</p>
              </div>
            </div>
          )}

          {!loading && recommendation && (
            <>
              <ResultsCard 
                recommendation={recommendation} 
                onSave={saveRecommendation}
              />
              
              <Chart recommendation={recommendation} />
            </>
          )}

          {!loading && !recommendation && (
            <div className="card text-center py-20">
              <div className="text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Ready to Optimize Your Harvest?
              </h3>
              <p className="text-gray-500">
                Enter your crop and soil data to get personalized fertilizer recommendations
              </p>
            </div>
          )}

          {/* Saved Recommendations */}
          {savedRecommendations.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Recent Recommendations</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {savedRecommendations.map((rec) => (
                  <div key={rec.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-primary-700">{rec.crop}</span>
                        <span className="text-gray-500 ml-2">({rec.yield} t/ha)</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(rec.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      DAP: {rec.DAP} | Urea: {rec.Urea} | MOP: {rec.MOP}
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
        {crop: "Wheat", soilN: 120, soilP: 50, soilK: 40, yield: 4.2, dap: 100, urea: 200, mop: 150},
        {crop: "Maize", soilN: 90, soilP: 45, soilK: 30, yield: 5.0, dap: 80, urea: 180, mop: 140},
        {crop: "Rice", soilN: 110, soilP: 60, soilK: 50, yield: 6.0, dap: 120, urea: 220, mop: 160},
        {crop: "Wheat", soilN: 130, soilP: 55, soilK: 45, yield: 4.8, dap: 105, urea: 210, mop: 155},
        {crop: "Maize", soilN: 100, soilP: 48, soilK: 35, yield: 5.5, dap: 90, urea: 190, mop: 145}
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
