// Node.js Bridge Server for C++ Backend
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Historical dataset - Expanded with 25 diverse records
const dataset = [
    // Wheat records (10 samples with varying NPK levels)
    {crop: "Wheat", soilN: 120, soilP: 50, soilK: 40, yield: 4.2, dap: 100, urea: 200, mop: 150},
    {crop: "Wheat", soilN: 130, soilP: 55, soilK: 45, yield: 4.8, dap: 105, urea: 210, mop: 155},
    {crop: "Wheat", soilN: 80, soilP: 25, soilK: 15, yield: 2.5, dap: 60, urea: 120, mop: 80},
    {crop: "Wheat", soilN: 95, soilP: 30, soilK: 20, yield: 3.2, dap: 75, urea: 150, mop: 100},
    {crop: "Wheat", soilN: 110, soilP: 45, soilK: 35, yield: 3.8, dap: 90, urea: 180, mop: 130},
    {crop: "Wheat", soilN: 140, soilP: 60, soilK: 50, yield: 5.2, dap: 110, urea: 220, mop: 165},
    {crop: "Wheat", soilN: 75, soilP: 20, soilK: 12, yield: 2.0, dap: 50, urea: 100, mop: 70},
    {crop: "Wheat", soilN: 105, soilP: 40, soilK: 30, yield: 3.5, dap: 85, urea: 170, mop: 120},
    {crop: "Wheat", soilN: 125, soilP: 52, soilK: 42, yield: 4.5, dap: 102, urea: 205, mop: 152},
    {crop: "Wheat", soilN: 88, soilP: 28, soilK: 18, yield: 2.8, dap: 68, urea: 135, mop: 90},
    
    // Maize records (8 samples)
    {crop: "Maize", soilN: 90, soilP: 45, soilK: 30, yield: 5.0, dap: 80, urea: 180, mop: 140},
    {crop: "Maize", soilN: 100, soilP: 48, soilK: 35, yield: 5.5, dap: 90, urea: 190, mop: 145},
    {crop: "Maize", soilN: 70, soilP: 30, soilK: 20, yield: 3.5, dap: 60, urea: 140, mop: 100},
    {crop: "Maize", soilN: 85, soilP: 40, soilK: 28, yield: 4.5, dap: 75, urea: 170, mop: 130},
    {crop: "Maize", soilN: 110, soilP: 55, soilK: 40, yield: 6.2, dap: 95, urea: 200, mop: 155},
    {crop: "Maize", soilN: 95, soilP: 50, soilK: 32, yield: 5.2, dap: 85, urea: 185, mop: 142},
    {crop: "Maize", soilN: 80, soilP: 38, soilK: 25, yield: 4.0, dap: 70, urea: 160, mop: 120},
    {crop: "Maize", soilN: 105, soilP: 52, soilK: 38, yield: 5.8, dap: 92, urea: 195, mop: 150},
    
    // Rice records (7 samples)
    {crop: "Rice", soilN: 110, soilP: 60, soilK: 50, yield: 6.0, dap: 120, urea: 220, mop: 160},
    {crop: "Rice", soilN: 95, soilP: 50, soilK: 40, yield: 4.8, dap: 100, urea: 190, mop: 140},
    {crop: "Rice", soilN: 120, soilP: 65, soilK: 55, yield: 6.5, dap: 130, urea: 235, mop: 170},
    {crop: "Rice", soilN: 85, soilP: 45, soilK: 35, yield: 4.2, dap: 90, urea: 180, mop: 130},
    {crop: "Rice", soilN: 105, soilP: 58, soilK: 48, yield: 5.5, dap: 115, urea: 210, mop: 155},
    {crop: "Rice", soilN: 130, soilP: 70, soilK: 60, yield: 7.0, dap: 140, urea: 250, mop: 180},
    {crop: "Rice", soilN: 100, soilP: 55, soilK: 45, yield: 5.2, dap: 110, urea: 205, mop: 150}
];

// KNN Algorithm (same as C++ implementation)
function calculateDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point1.N - point2.soilN, 2) +
        Math.pow(point1.P - point2.soilP, 2) +
        Math.pow(point1.K - point2.soilK, 2) +
        Math.pow(point1.yield - point2.yield, 2)
    );
}

function getRecommendation(crop, targetYield, N, P, K, k = 3) {
    const inputPoint = { N, P, K, yield: targetYield };
    
    // FILTER by crop type FIRST - this was missing!
    const cropFilteredData = dataset.filter(data => data.crop === crop);
    
    // If no data for this crop, use all data as fallback
    const dataToUse = cropFilteredData.length > 0 ? cropFilteredData : dataset;
    
    // Calculate distances
    const distances = dataToUse.map((data, index) => ({
        distance: calculateDistance(inputPoint, data),
        index: index,
        data: data
    }));

    // Sort by distance
    distances.sort((a, b) => a.distance - b.distance);

    // Get k nearest neighbors (limit to available data)
    const actualK = Math.min(k, distances.length);
    let sumDAP = 0, sumUrea = 0, sumMOP = 0;
    const neighbors = [];
    
    for (let i = 0; i < actualK; i++) {
        const data = distances[i].data;
        sumDAP += data.dap;
        sumUrea += data.urea;
        sumMOP += data.mop;
        neighbors.push({
            ...data,
            distance: distances[i].distance.toFixed(2)
        });
    }

    return {
        crop: crop,
        yield: targetYield,
        N: N,
        P: P,
        K: K,
        DAP: (sumDAP / actualK).toFixed(2),
        Urea: (sumUrea / actualK).toFixed(2),
        MOP: (sumMOP / actualK).toFixed(2),
        neighbors: neighbors,
        k: actualK
    };
}

// API Endpoint
app.post('/api/recommend', (req, res) => {
    try {
        const { crop, yield: targetYield, N, P, K } = req.body;

        // Validation
        if (!crop || !targetYield || N === undefined || P === undefined || K === undefined) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Please provide: crop, yield, N, P, K'
            });
        }

        // Get recommendation
        const recommendation = getRecommendation(
            crop,
            parseFloat(targetYield),
            parseFloat(N),
            parseFloat(P),
            parseFloat(K)
        );

        res.json(recommendation);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Fertilizer Recommendation API is running',
        timestamp: new Date().toISOString()
    });
});

// Get historical data
app.get('/api/historical-data', (req, res) => {
    res.json(dataset);
});

const PORT = process.env.PORT || 8080;
// Optional display host name (for console output). To use a custom hostname like
// "api.local" map it to 127.0.0.1 in your OS hosts file and set API_HOST accordingly.
const DISPLAY_HOST = process.env.API_HOST || 'localhost';


app.listen(PORT, () => {
    console.log(`🚀 Backend API Server running on http://${DISPLAY_HOST}:${PORT}`);
    console.log(`📊 Endpoints:`);


    console.log(`   POST http://${DISPLAY_HOST}:${PORT}/api/recommend`);
    console.log(`   GET  http://${DISPLAY_HOST}:${PORT}/api/health`);
    console.log(`   GET  http://${DISPLAY_HOST}:${PORT}/api/historical-data`);
});
