import React, { useState } from 'react';
import { Send, Leaf, Sprout, Scale, FlaskConical, Beaker } from 'lucide-react';

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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="card-clean">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
          <Leaf className="w-5 h-5 text-[#2E7D32]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Input Parameters</h2>
          <p className="text-sm text-gray-500">Enter crop details and soil composition</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Crop Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-[#2E7D32]" />
            Crop Type
          </label>
          <div className="relative">
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className={`input-field appearance-none ${errors.crop ? 'border-red-500' : ''}`}
              disabled={loading}
            >
              <option value="">Select a crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Rice">Rice</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          {errors.crop && <p className="text-red-500 text-xs mt-1">{errors.crop}</p>}
        </div>

        {/* Target Yield */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2E7D32]" />
            Target Yield (t/ha)
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-[#2E7D32]" />
            Soil Nutrients (N-P-K)
          </label>
          <div className="grid grid-cols-3 gap-4">
            {/* Nitrogen */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nitrogen (N)</label>
              <input
                type="number"
                name="N"
                value={formData.N}
                onChange={handleChange}
                placeholder="120"
                className={`input-field ${errors.N ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>

            {/* Phosphorus */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phosphorus (P)</label>
              <input
                type="number"
                name="P"
                value={formData.P}
                onChange={handleChange}
                placeholder="50"
                className={`input-field ${errors.P ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>

            {/* Potassium */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Potassium (K)</label>
              <input
                type="number"
                name="K"
                value={formData.K}
                onChange={handleChange}
                placeholder="40"
                className={`input-field ${errors.K ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
          </div>
          {(errors.N || errors.P || errors.K) && (
            <p className="text-red-500 text-xs mt-1">Please check nutrient values</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Get Recommendation
            </>
          )}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 bg-[#F7F9FB] border border-gray-200 rounded-lg p-4 flex gap-3">
        <Beaker className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Note:</strong> Ensure soil nutrient levels are accurate (kg/ha or ppm) for precise recommendations.
        </p>
      </div>
    </div>
  );
};

export default InputForm;
