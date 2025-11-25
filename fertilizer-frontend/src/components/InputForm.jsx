import React, { useState } from 'react';
import { Send, Leaf } from 'lucide-react';

const InputForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    crop: '',
    yield: '',
    N: '',
    P: '',
    K: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.crop) newErrors.crop = 'Please select a crop';
    if (!formData.yield || formData.yield <= 0) newErrors.yield = 'Please enter a valid yield';
    if (!formData.N || formData.N < 0) newErrors.N = 'Please enter a valid nitrogen value';
    if (!formData.P || formData.P < 0) newErrors.P = 'Please enter a valid phosphorus value';
    if (!formData.K || formData.K < 0) newErrors.K = 'Please enter a valid potassium value';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        crop: formData.crop,
        yield: parseFloat(formData.yield),
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K)
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Input Parameters</h2>
          <p className="text-sm text-gray-500">Enter your crop and soil data</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Crop Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🌾 Crop Type
          </label>
          <select
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className={`input-field ${errors.crop ? 'border-red-500' : ''}`}
            disabled={loading}
          >
            <option value="">Select a crop</option>
            <option value="Wheat">🌾 Wheat</option>
            <option value="Maize">🌽 Maize</option>
            <option value="Rice">🍚 Rice</option>
          </select>
          {errors.crop && <p className="text-red-500 text-xs mt-1">{errors.crop}</p>}
        </div>

        {/* Target Yield */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📊 Target Yield (t/ha)
          </label>
          <input
            type="number"
            name="yield"
            value={formData.yield}
            onChange={handleChange}
            placeholder="e.g., 4.5"
            step="0.1"
            min="0"
            className={`input-field ${errors.yield ? 'border-red-500' : ''}`}
            disabled={loading}
          />
          {errors.yield && <p className="text-red-500 text-xs mt-1">{errors.yield}</p>}
        </div>

        {/* Soil Nutrients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Nitrogen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-blue-600">N</span> Nitrogen
            </label>
            <input
              type="number"
              name="N"
              value={formData.N}
              onChange={handleChange}
              placeholder="120"
              step="0.1"
              min="0"
              className={`input-field ${errors.N ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.N && <p className="text-red-500 text-xs mt-1">{errors.N}</p>}
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-orange-600">P</span> Phosphorus
            </label>
            <input
              type="number"
              name="P"
              value={formData.P}
              onChange={handleChange}
              placeholder="50"
              step="0.1"
              min="0"
              className={`input-field ${errors.P ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.P && <p className="text-red-500 text-xs mt-1">{errors.P}</p>}
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-purple-600">K</span> Potassium
            </label>
            <input
              type="number"
              name="K"
              value={formData.K}
              onChange={handleChange}
              placeholder="40"
              step="0.1"
              min="0"
              className={`input-field ${errors.K ? 'border-red-500' : ''}`}
              disabled={loading}
            />
            {errors.K && <p className="text-red-500 text-xs mt-1">{errors.K}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Get Recommendation
            </>
          )}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-800">
          <strong>💡 Tip:</strong> Enter accurate soil nutrient levels for the most precise fertilizer recommendations. 
          Values should be in kg/ha or ppm based on your soil test results.
        </p>
      </div>
    </div>
  );
};

export default InputForm;
