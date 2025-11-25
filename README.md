# 🌾 AI Fertilizer Recommendation System

**A Full-Stack Agricultural Intelligence Application**

Advanced Object-Oriented Programming (OOP) project demonstrating fertilizer recommendations using K-Nearest Neighbors (KNN) algorithm with real-time web interface.


## 📋 Quick Overview

| Component | Technology | Status |
|-----------|-----------|--------|
| **Backend API** | Node.js + Express | ✅ Port 8080 |
| **Frontend UI** | React + Vite + Tailwind | ✅ Port 3000 |
| **Core Engine** | C++ (Advanced OOP) | ✅ 310 lines, 10 classes |
| **Algorithm** | KNN (k=3) | ✅ 25 historical records |
| **Dataset** | Wheat, Maize, Rice | ✅ Indian pricing |


## 🚀 Quick Start

### Prerequisites

### Installation & Run

```powershell
# 1. Install backend dependencies
npm install

# 2. Start backend server (Terminal 1)
npm start
# Backend runs on http://localhost:8080

# 3. Install frontend dependencies (Terminal 2)
cd fertilizer-frontend
npm install

# 4. Start frontend dev server
npm run dev
# Frontend runs on http://localhost:3000

# 5. (Optional) Compile C++ version
g++ -o cp_oops_advanced.exe cp_oops.cpp -std=c++11
.\cp_oops_advanced.exe
```

### Open in Browser
Navigate to **http://localhost:3000** to use the web application.


## ✨ Features

### 🎯 **Core Capabilities**

### 💻 **Technical Highlights**

### 🧪 **Quality Assurance**


## 🎓 Learning Objectives

This project demonstrates:

1. **Object-Oriented Programming (OOP)**
   - ✅ Encapsulation (private members, getters/setters)
   - ✅ Inheritance (Crop → WheatCrop, MaizeCrop, RiceCrop)
   - ✅ Polymorphism (virtual functions, dynamic binding)
   - ✅ Abstraction (pure virtual functions, interfaces)
   - ✅ Composition (FarmManager has-a relationships)

2. **Full-Stack Development**
   - Backend API design and implementation
   - Frontend component architecture
   - REST API integration
   - State management in React

3. **Machine Learning Concepts**
   - K-Nearest Neighbors (KNN) algorithm
   - Euclidean distance calculation
   - Feature normalization
   - Dataset management

4. **Software Engineering Best Practices**
   - Modular code organization
   - Separation of concerns
   - Documentation standards
   - Testing methodologies


## 📊 Dataset Information

### Historical Training Data (25 Records)

| Crop | Records | NPK Range | Yield Range |
|------|---------|-----------|-------------|
| **Wheat** | 10 samples | N: 75-140, P: 20-60, K: 12-50 | 2.0-5.2 t/ha |
| **Maize** | 8 samples | N: 70-110, P: 30-55, K: 20-40 | 3.5-6.2 t/ha |
| **Rice** | 7 samples | N: 85-130, P: 45-70, K: 35-60 | 4.2-7.0 t/ha |

### Fertilizer Pricing (Indian Market - Nov 2025)

| Fertilizer | Purpose | Price |
|------------|---------|-------|
| **DAP** (Diammonium Phosphate) | Nitrogen + Phosphorus | ₹27/kg (₹1,350/50kg bag) |
| **Urea** | Primary Nitrogen source | ₹6/kg (₹267/45kg bag, subsidized) |
| **MOP** (Muriate of Potash) | Potassium source | ₹26/kg (₹1,300/50kg bag) |


## 🔬 Algorithm: K-Nearest Neighbors (KNN)

### How It Works

1. **Input Collection**
   - Crop type (Wheat/Maize/Rice)
   - Target yield (t/ha)
   - Current soil nutrients (N, P, K in kg/ha)

2. **Distance Calculation**
   ```
   Distance = √[(N_input - N_historical)² + (P_input - P_historical)² + 
               (K_input - K_historical)² + (Yield_input - Yield_historical)²]
   ```

3. **Neighbor Selection**
   - Filter dataset by crop type
   - Calculate distances to all historical records
   - Sort by distance and select k=3 nearest neighbors

4. **Recommendation Generation**
   - Average fertilizer values from 3 nearest neighbors
   - Return DAP, Urea, and MOP amounts in kg/ha
   - Calculate total cost using Indian pricing

### Example

**Input:** Wheat, Yield=3.5 t/ha, N=95, P=30, K=20

**Process:**

**Output:** DAP: 75 kg/ha, Urea: 150 kg/ha, MOP: 100 kg/ha


## 🎯 API Endpoints

### Backend API (Port 8080)

#### 1. Get Recommendation
```http
POST /api/recommend
Content-Type: application/json

{
  "crop": "Wheat",
  "yield": 4.5,
  "N": 120,
  "P": 50,
  "K": 40
}
```

**Response:**
```json
{
  "crop": "Wheat",
  "yield": 4.5,
  "N": 120,
  "P": 50,
  "K": 40,
  "DAP": "102.50",
  "Urea": "205.00",
  "MOP": "152.50",
  "k": 3,
  "neighbors": [...]
}
```

#### 2. Health Check
```http
GET /api/health
```

#### 3. Historical Data
```http
GET /api/historical-data
```

### Run Automated Tests

```powershell
# Comprehensive test suite (100 tests)
node test_knn_system.js

# Output variety checker (10 tests)
node test_knn_variety.js
```

### Test Categories


## 🎨 Customization

### Update Dataset

Edit `backend-server.js` (lines 10-40) to add more historical records:

```javascript
const dataset = [
    {crop: "Wheat", soilN: 120, soilP: 50, soilK: 40, yield: 4.2, 
     dap: 100, urea: 200, mop: 150},
    // Add more records...
];
```

### Modify KNN Parameters

Change `k` value in `getRecommendation()` function:

```javascript
function getRecommendation(crop, targetYield, N, P, K, k = 3) {
    // k=3 means use 3 nearest neighbors
    // Change to k=5 for more averaging, k=1 for closest match only
}
```

### Frontend Styling

Edit `fertilizer-frontend/tailwind.config.js` for theme customization.


## 🐛 Troubleshooting

### Backend Won't Start
```powershell
# Check if port 8080 is in use
netstat -ano | findstr ":8080"

# Kill process if needed
taskkill /PID <process_id> /F
```

### Frontend Connection Error

### C++ Compilation Issues
```powershell
# Install MinGW if not present
# Use C++11 standard flag
g++ -o cp_oops_advanced.exe cp_oops.cpp -std=c++11
```
