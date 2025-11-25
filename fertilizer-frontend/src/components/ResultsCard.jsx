import React from 'react';
import { CheckCircle, TrendingUp, Save, Info } from 'lucide-react';

const ResultsCard = ({ recommendation, onSave }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Recommendation Results</h2>
            <p className="text-sm text-gray-500">Based on KNN Algorithm (k={recommendation.k})</p>
          </div>
        </div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          title="Save this recommendation"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </button>
      </div>

      {/* Crop Info */}
      <div className="bg-gradient-to-r from-primary-50 to-emerald-50 rounded-xl p-4 mb-6 border border-primary-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Crop Type</p>
            <p className="text-2xl font-bold text-primary-700">{recommendation.crop}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Target Yield</p>
            <p className="text-2xl font-bold text-primary-700">{recommendation.yield} t/ha</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Soil NPK</p>
            <p className="text-lg font-semibold text-gray-700">
              {recommendation.N} - {recommendation.P} - {recommendation.K}
            </p>
          </div>
        </div>
      </div>

      {/* Fertilizer Recommendations */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          Recommended Fertilizers
        </h3>

        {/* DAP */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">DAP (Diammonium Phosphate)</p>
              <p className="text-xs text-blue-600">Provides both Nitrogen and Phosphorus</p>
              <p className="text-xs text-blue-500 mt-1">₹27/kg | ₹1,350 per 50kg bag</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-700">{recommendation.DAP}</p>
              <p className="text-sm text-blue-600">kg/ha</p>
              <p className="text-xs text-blue-700 font-semibold mt-1">₹{(parseFloat(recommendation.DAP) * 27).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Urea */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-green-700 font-medium mb-1">Urea</p>
              <p className="text-xs text-green-600">Primary source of Nitrogen</p>
              <p className="text-xs text-green-500 mt-1">₹6/kg | ₹267 per 45kg bag (Subsidized)</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-700">{recommendation.Urea}</p>
              <p className="text-sm text-green-600">kg/ha</p>
              <p className="text-xs text-green-700 font-semibold mt-1">₹{(parseFloat(recommendation.Urea) * 6).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* MOP */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-purple-700 font-medium mb-1">MOP (Muriate of Potash)</p>
              <p className="text-xs text-purple-600">Primary source of Potassium</p>
              <p className="text-xs text-purple-500 mt-1">₹26/kg | ₹1,300 per 50kg bag</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-700">{recommendation.MOP}</p>
              <p className="text-sm text-purple-600">kg/ha</p>
              <p className="text-xs text-purple-700 font-semibold mt-1">₹{(parseFloat(recommendation.MOP) * 26).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nearest Neighbors Info */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start gap-2 mb-3">
          <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Based on {recommendation.k} Most Similar Historical Cases:
            </p>
            <div className="space-y-2">
              {recommendation.neighbors.map((neighbor, index) => (
                <div key={index} className="text-xs text-gray-600 bg-white rounded p-2 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      #{index + 1}: {neighbor.crop} (Yield: {neighbor.yield} t/ha)
                    </span>
                    <span className="text-gray-400">
                      Distance: {neighbor.distance}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-500">
                    NPK: {neighbor.soilN}-{neighbor.soilP}-{neighbor.soilK} → 
                    DAP: {neighbor.dap}, Urea: {neighbor.urea}, MOP: {neighbor.mop}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Tips */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800 font-semibold mb-2">📋 Application Guidelines:</p>
        <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
          <li>Apply fertilizers in split doses for better nutrient uptake</li>
          <li>Consider soil moisture and weather conditions before application</li>
          <li>Monitor crop response and adjust subsequent applications if needed</li>
          <li>Conduct soil tests periodically to track nutrient levels</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultsCard;
