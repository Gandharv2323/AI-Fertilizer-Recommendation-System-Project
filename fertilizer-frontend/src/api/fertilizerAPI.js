import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Get fertilizer recommendation from C++ backend
 * @param {Object} data - Input data { crop, yield, N, P, K }
 * @returns {Promise} - Recommendation response
 */
export const getRecommendation = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get recommendation');
  }
};

/**
 * Get historical dataset from backend
 * @returns {Promise} - Historical data array
 */
export const getHistoricalData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/historical-data`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch historical data');
  }
};

/**
 * Mock API for development (uses KNN algorithm locally)
 * Remove this and use the above functions when C++ backend is ready
 */
export const mockGetRecommendation = (formData) => {
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

      // Calculate distances (KNN algorithm)
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

export default {
  getRecommendation,
  getHistoricalData,
  mockGetRecommendation
};
