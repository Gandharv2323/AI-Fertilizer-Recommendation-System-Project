import React from 'react';
import { CheckCircle, Save, Droplets, ShoppingBag, DollarSign, ClipboardList } from 'lucide-react';

const ResultsCard = ({ recommendation, onSave }) => {
  if (!recommendation) return null;

  const { crop, yield: targetYield, N, P, K, DAP, Urea, MOP } = recommendation;

  // Convert to numbers (backend returns strings from toFixed)
  const dapAmount = parseFloat(DAP);
  const ureaAmount = parseFloat(Urea);
  const mopAmount = parseFloat(MOP);

  // Cost Calculation (Approximate Indian Market Prices)
  const priceDAP = 1350; // per 50kg bag
  const priceUrea = 267; // per 45kg bag
  const priceMOP = 1300; // per 50kg bag

  // Calculate price per kg
  const pricePerKgDAP = priceDAP / 50; // ₹27/kg
  const pricePerKgUrea = priceUrea / 45; // ₹5.93/kg
  const pricePerKgMOP = priceMOP / 50; // ₹26/kg

  const costDAP = (dapAmount / 50) * priceDAP;
  const costUrea = (ureaAmount / 45) * priceUrea;
  const costMOP = (mopAmount / 50) * priceMOP;
  const totalCost = costDAP + costUrea + costMOP;

  // Bag Calculation
  const bagsDAP = Math.ceil(dapAmount / 50);
  const bagsUrea = Math.ceil(ureaAmount / 45);
  const bagsMOP = Math.ceil(mopAmount / 50);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Recommendation Card */}
      <div className="card-clean border-l-4 border-l-[#2E7D32]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#E8F5E9] p-2 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">Recommendation Results</h2>
              <p className="text-sm text-gray-500">Optimized fertilizer plan based on KNN algorithm (k=3)</p>
            </div>
          </div>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            <Save className="w-4 h-4" />
            Save Report
          </button>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8 bg-[#F7F9FB] p-4 rounded-xl border border-gray-100">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Crop Type</p>
            <p className="text-lg font-bold text-[#1A1A1A]">{crop}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Target Yield</p>
            <p className="text-lg font-bold text-[#1A1A1A]">{targetYield} t/ha</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Soil NPK</p>
            <p className="text-lg font-bold text-[#1A1A1A]">{N} - {P} - {K}</p>
          </div>
        </div>

        {/* Recommended Fertilizers Grid */}
        <h3 className="section-title">
          <Droplets className="w-5 h-5 text-[#2E7D32]" />
          Recommended Fertilizers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* DAP Card */}
          <div className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors bg-white">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-blue-700">DAP</h4>
              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Phosphorus</span>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-[#1A1A1A]">{dapAmount}</span>
              <span className="text-sm text-gray-500 ml-1">kg/ha</span>
            </div>
            <p className="text-xs text-gray-500">Diammonium Phosphate</p>
            <p className="text-xs text-blue-600 mt-2 font-medium">₹{costDAP.toFixed(2)}</p>
          </div>

          {/* Urea Card */}
          <div className="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors bg-white">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-emerald-700">Urea</h4>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">Nitrogen</span>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-[#1A1A1A]">{ureaAmount}</span>
              <span className="text-sm text-gray-500 ml-1">kg/ha</span>
            </div>
            <p className="text-xs text-gray-500">Primary Nitrogen Source</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium">₹{costUrea.toFixed(2)}</p>
          </div>

          {/* MOP Card */}
          <div className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors bg-white">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-purple-700">MOP</h4>
              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">Potassium</span>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-[#1A1A1A]">{mopAmount}</span>
              <span className="text-sm text-gray-500 ml-1">kg/ha</span>
            </div>
            <p className="text-xs text-gray-500">Muriate of Potash</p>
            <p className="text-xs text-purple-600 mt-2 font-medium">₹{costMOP.toFixed(2)}</p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-[#FFFDE7] border border-[#FFF9C4] rounded-xl p-6 mb-6">
          <h3 className="text-sm font-bold text-[#F57F17] mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Cost Estimation (Nov 2025 Prices)
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-[#FFF9C4]/50">
              <span className="text-gray-700">DAP ({dapAmount.toFixed(2)} kg × ₹{pricePerKgDAP.toFixed(2)}/kg)</span>
              <span className="font-mono font-medium text-[#2E7D32]">₹{costDAP.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#FFF9C4]/50">
              <span className="text-gray-700">Urea ({ureaAmount.toFixed(2)} kg × ₹{pricePerKgUrea.toFixed(2)}/kg)</span>
              <span className="font-mono font-medium text-[#2E7D32]">₹{costUrea.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#FFF9C4]/50">
              <span className="text-gray-700">MOP ({mopAmount.toFixed(2)} kg × ₹{pricePerKgMOP.toFixed(2)}/kg)</span>
              <span className="font-mono font-medium text-[#2E7D32]">₹{costMOP.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 mt-2">
              <span className="font-bold text-gray-800">Total Cost per Hectare</span>
              <span className="font-bold text-lg text-[#2E7D32]">₹{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Cost per Acre (÷ 2.47)</span>
              <span>₹{(totalCost / 2.47).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Required Bags */}
        <div className="mb-6">
          <h3 className="section-title">
            <ShoppingBag className="w-5 h-5 text-[#2E7D32]" />
            Required Bags (per hectare)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-xs font-bold text-blue-600 mb-1">DAP</p>
              <p className="text-xl font-bold text-[#1A1A1A]">{bagsDAP} <span className="text-xs font-normal text-gray-500">bags</span></p>
              <p className="text-[10px] text-gray-400 mt-1">50kg bag</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-xs font-bold text-emerald-600 mb-1">Urea</p>
              <p className="text-xl font-bold text-[#1A1A1A]">{bagsUrea} <span className="text-xs font-normal text-gray-500">bags</span></p>
              <p className="text-[10px] text-gray-400 mt-1">45kg bag</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-xs font-bold text-purple-600 mb-1">MOP</p>
              <p className="text-xl font-bold text-[#1A1A1A]">{bagsMOP} <span className="text-xs font-normal text-gray-500">bags</span></p>
              <p className="text-[10px] text-gray-400 mt-1">50kg bag</p>
            </div>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            Current Prices: DAP ₹1,350 | Urea ₹267 | MOP ₹1,300
          </p>
        </div>

        {/* Application Guidelines */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-gray-600" />
            Application Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 flex-shrink-0" />
              Apply fertilizers in split doses for better nutrient uptake efficiency.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 flex-shrink-0" />
              Ensure proper soil moisture before application to prevent root burn.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 flex-shrink-0" />
              Mix fertilizers thoroughly with soil to avoid volatilization losses.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
