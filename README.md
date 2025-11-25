# 🌾 AI Fertilizer Recommendation System

**A Full-Stack Agricultural Intelligence Application**

Advanced Object-Oriented Programming (OOP) project demonstrating fertilizer recommendations using K-Nearest Neighbors (KNN) algorithm with real-time web interface.

---

## 📋 Quick Overview

| Component | Technology | Status |
|-----------|-----------|--------|
| **Backend API** | Node.js + Express | ✅ Port 8080 |
| **Frontend UI** | React + Vite + Tailwind | ✅ Port 3000 |
| **Core Engine** | C++ (Advanced OOP) | ✅ 310 lines, 10 classes |
| **Algorithm** | KNN (k=3) | ✅ 25 historical records |
| **Dataset** | Wheat, Maize, Rice | ✅ Indian pricing |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ (for backend & frontend)
- **C++ Compiler** (g++ with C++11 support)
- **npm** or **yarn**

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

---

## 📁 Project Structure

```
oop_cp/
├── 📄 README.md                          # This file - Project overview
├── 📄 backend-server.js                  # Node.js REST API server
├── 📄 cp_oops.cpp                        # C++ OOP implementation (310 lines)
├── 📄 cp_oops_advanced.exe               # Compiled C++ executable
├── 📄 package.json                       # Backend dependencies
├── 📄 test_knn_system.js                 # Automated test suite (100 tests)
├── 📄 test_knn_variety.js                # Output variety checker (10 tests)
│
├── 📂 fertilizer-frontend/               # React web application
│   ├── 📂 src/
│   │   ├── 📂 components/                # UI components
│   │   │   ├── InputForm.jsx            # User input form
│   │   │   ├── ResultsCard.jsx          # Recommendation display
│   │   │   ├── Chart.jsx                # Data visualization
│   │   │   └── HistoricalDataInsights.jsx
│   │   ├── 📂 api/
│   │   │   └── fertilizerAPI.js         # API integration
│   │   ├── App.jsx                       # Main application
│   │   ├── main.jsx                      # Entry point
│   │   └── index.css                     # Global styles
│   ├── 📄 index.html                     # HTML template
│   ├── 📄 vite.config.js                 # Vite configuration
│   ├── 📄 tailwind.config.js             # Tailwind CSS config
│   └── 📄 README.md                      # Frontend documentation
│
└── 📂 docs/                               # 📚 Complete Documentation Hub
    ├── 📄 PRESENTATION_GUIDE.md          # Presentation script (700+ lines)
    ├── 📄 DEMO_INPUTS_FOR_PRESENTATION.md # Demo scenarios & Q&A
    ├── 📄 OOP_ADVANCED_EXPLANATION.md    # OOP concepts deep dive
    ├── 📄 OOP_PROJECT_GUIDE.md           # Project guide & architecture
    ├── 📄 OOP_VISUAL_GUIDE.md            # Visual diagrams & flowcharts
    ├── 📄 BACKEND_FRONTEND_CONNECTION.md # Integration documentation
    ├── 📄 PROJECT_STATUS_REPORT.md       # Current system status
    └── 📄 CLEANUP_PLAN.md                # Maintenance & cleanup audit
```

---

## ✨ Features

### 🎯 **Core Capabilities**
- **Smart Recommendations** - KNN algorithm finds 3 nearest historical matches
- **Real-time Calculations** - Instant fertilizer suggestions (DAP, Urea, MOP)
- **Indian Pricing** - Accurate ₹/kg rates with subsidy information
- **Multi-Crop Support** - Wheat, Maize, and Rice optimized datasets

### 💻 **Technical Highlights**
- **Advanced C++ OOP** - All 5 principles: Encapsulation, Inheritance, Polymorphism, Abstraction, Composition
- **REST API** - Express.js backend with CORS support
- **Modern Frontend** - React 18 + Vite + TailwindCSS
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Data Visualization** - Interactive charts using Recharts library

### 🧪 **Quality Assurance**
- Automated test suite (100 test cases)
- Output variety validation
- Historical data insights panel
- Error handling & validation

---

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

---

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

---

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
- Find 3 closest Wheat records in historical data
- Example neighbors: Record #4 (distance: 12.3), Record #8 (distance: 15.7), Record #3 (distance: 18.2)
- Average their fertilizer values

**Output:** DAP: 75 kg/ha, Urea: 150 kg/ha, MOP: 100 kg/ha

---

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

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

### 📖 **User Guides**
- **[OOP Project Guide](docs/OOP_PROJECT_GUIDE.md)** - Complete project overview and architecture
- **[OOP Visual Guide](docs/OOP_VISUAL_GUIDE.md)** - Diagrams, flowcharts, and visual explanations
- **[Backend-Frontend Connection](docs/BACKEND_FRONTEND_CONNECTION.md)** - Integration guide

### 🎓 **Educational Resources**
- **[OOP Advanced Explanation](docs/OOP_ADVANCED_EXPLANATION.md)** - Deep dive into all OOP concepts with examples
- **[Presentation Guide](docs/PRESENTATION_GUIDE.md)** - Complete 700+ line presentation script
- **[Demo Inputs](docs/DEMO_INPUTS_FOR_PRESENTATION.md)** - Demo scenarios and Q&A preparation

### 🔧 **Technical Documentation**
- **[Project Status Report](docs/PROJECT_STATUS_REPORT.md)** - Current system status and verification
- **[Cleanup Plan](docs/CLEANUP_PLAN.md)** - Maintenance audit and file organization

### 💻 **Frontend Documentation**
- **[Frontend README](fertilizer-frontend/README.md)** - React app setup, customization, and deployment
- **[Pricing Info](fertilizer-frontend/PRICING_INFO.md)** - Detailed fertilizer pricing data

---

## 🧪 Testing

### Run Automated Tests

```powershell
# Comprehensive test suite (100 tests)
node test_knn_system.js

# Output variety checker (10 tests)
node test_knn_variety.js
```

### Test Categories
- **Realistic scenarios** (60 tests) - Normal farming conditions
- **Edge cases** (20 tests) - Boundary values
- **Boundary tests** (10 tests) - Extreme values
- **Random tests** (10 tests) - Varied random inputs

---

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

---

## 🐛 Troubleshooting

### Backend Won't Start
```powershell
# Check if port 8080 is in use
netstat -ano | findstr ":8080"

# Kill process if needed
taskkill /PID <process_id> /F
```

### Frontend Connection Error
- Ensure backend is running on port 8080
- Check `fertilizerAPI.js` has correct API_BASE_URL
- Verify CORS is enabled in backend-server.js

### C++ Compilation Issues
```powershell
# Install MinGW if not present
# Use C++11 standard flag
g++ -o cp_oops_advanced.exe cp_oops.cpp -std=c++11
```

---

## 📈 Future Enhancements

- [ ] Add more crops (Cotton, Sugarcane, Vegetables)
- [ ] Implement weather-based recommendations
- [ ] Add soil pH consideration
- [ ] Create mobile app version
- [ ] Integrate with government agriculture APIs
- [ ] Add multi-language support (Hindi, Marathi, etc.)
- [ ] Implement user authentication and history tracking
- [ ] Add export to PDF functionality

---

## 🤝 Contributing

This is an academic project. Feel free to fork and enhance!

### Development Setup
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of an Object-Oriented Programming course.

---

## 👨‍💻 Author

**Academic Project**  
Course: Object-Oriented Programming  
Institution: [Your Institution]  
Date: November 2025

---

## 🙏 Acknowledgments

- Indian Council of Agricultural Research (ICAR) for fertilizer pricing data
- Agricultural universities for NPK recommendation guidelines
- Open-source community for React, Vite, and TailwindCSS
- All contributors to the Node.js and Express ecosystems

---

## 📞 Support & Contact

For questions, issues, or suggestions:
- 📧 Email: [Your email]
- 📂 Documentation: See `/docs` folder
- 🐛 Issues: Use GitHub issues (if applicable)

---

**⭐ If this project helped you understand OOP concepts or full-stack development, please star it!**

---

<div align="center">
  <strong>Built with ❤️ for modern agriculture and smart farming initiatives</strong>
  <br><br>
  🌾 Happy Farming! 🚜
</div>
