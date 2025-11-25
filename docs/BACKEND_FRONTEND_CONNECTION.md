# 🔗 Backend-Frontend Connection Guide

## 📋 Overview

This guide shows how to connect the C++ backend logic to the React frontend using a Node.js bridge server.

---

## 🏗️ Architecture

```
┌─────────────────┐      HTTP API      ┌──────────────────┐
│  React Frontend │ ◄─────────────────► │  Node.js Server  │
│  (Port 3000)    │   JSON Requests    │  (Port 8080)     │
└─────────────────┘                     └──────────────────┘
                                               │
                                               │ Uses same
                                               │ KNN Algorithm
                                               ▼
                                        ┌──────────────────┐
                                        │  C++ Logic       │
                                        │  (Translated)    │
                                        └──────────────────┘
```

---

## 🚀 Quick Start

### **Step 1: Install Backend Dependencies**

```bash
cd c:\Users\shind\OneDrive\Dokumen\OOPS\oop_cp
npm install
```

This installs:
- `express` - Web server framework
- `cors` - Enable cross-origin requests

---

### **Step 2: Start the Backend Server**

Open a **new terminal** and run:

```bash
cd c:\Users\shind\OneDrive\Dokumen\OOPS\oop_cp
npm start
```

You should see:
```
🚀 Backend API Server running on http://localhost:8080
📊 Endpoints:
   POST http://localhost:8080/api/recommend
   GET  http://localhost:8080/api/health
   GET  http://localhost:8080/api/historical-data
```

---

### **Step 3: Start the Frontend**

Open **another terminal** and run:

```bash
cd c:\Users\shind\OneDrive\Dokumen\OOPS\oop_cp\fertilizer-frontend
npm run dev
```

Frontend will run on: http://localhost:3000

---

### **Step 4: Test the Connection**

1. Open http://localhost:3000 in browser
2. Fill the form with crop data
3. Click "Get Recommendation"
4. The frontend now calls the backend API!

---

## 📡 API Endpoints

### **POST /api/recommend**

Get fertilizer recommendation

**Request:**
```json
POST http://localhost:8080/api/recommend
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
  "DAP": "101.67",
  "Urea": "203.33",
  "MOP": "150.00",
  "neighbors": [
    {
      "crop": "Wheat",
      "soilN": 120,
      "soilP": 50,
      "soilK": 40,
      "yield": 4.2,
      "dap": 100,
      "urea": 200,
      "mop": 150,
      "distance": "0.30"
    },
    // ... 2 more neighbors
  ],
  "k": 3
}
```

---

### **GET /api/health**

Check if server is running

**Request:**
```
GET http://localhost:8080/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Fertilizer Recommendation API is running",
  "timestamp": "2025-11-10T..."
}
```

---

### **GET /api/historical-data**

Get the historical dataset

**Request:**
```
GET http://localhost:8080/api/historical-data
```

**Response:**
```json
[
  {
    "crop": "Wheat",
    "soilN": 120,
    "soilP": 50,
    "soilK": 40,
    "yield": 4.2,
    "dap": 100,
    "urea": 200,
    "mop": 150
  },
  // ... more data
]
```

---

## 🧪 Testing the API

### **Using PowerShell:**

```powershell
# Test health endpoint
Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method GET

# Test recommendation endpoint
$body = @{
    crop = "Wheat"
    yield = 4.5
    N = 120
    P = 50
    K = 40
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/recommend" -Method POST -Body $body -ContentType "application/json"
```

### **Using Browser:**

Open: http://localhost:8080/api/health

---

## 🔄 How It Works

### **1. Frontend Makes Request**

```javascript
// In App.jsx
const response = await fetch('http://localhost:8080/api/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

const result = await response.json();
```

### **2. Backend Processes**

```javascript
// In backend-server.js
app.post('/api/recommend', (req, res) => {
  const { crop, yield, N, P, K } = req.body;
  
  // Run KNN algorithm (same as C++)
  const recommendation = getRecommendation(crop, yield, N, P, K);
  
  res.json(recommendation);
});
```

### **3. Frontend Displays**

Results are shown with charts, costs, and recommendations

---

## 🛡️ Fallback Mechanism

The frontend has automatic fallback:

```javascript
try {
  // Try backend API first
  const response = await fetch('http://localhost:8080/api/recommend');
  // ...
} catch (error) {
  // If backend is down, use mock API
  console.log('Falling back to mock API...');
  const result = await simulateBackendAPI(formData);
}
```

**Benefits:**
- ✅ Works even if backend is offline
- ✅ No errors shown to user
- ✅ Seamless development experience

---

## 📁 Project Structure

```
oop_cp/
├── cp_oops.cpp              # Original C++ console app
├── backend-server.js        # Node.js API server (NEW)
├── package.json             # Backend dependencies (NEW)
└── fertilizer-frontend/
    ├── src/
    │   ├── App.jsx          # Updated to call backend API
    │   └── ...
    └── package.json
```

---

## 🔧 Troubleshooting

### **Issue: Backend not starting**

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd c:\Users\shind\OneDrive\Dokumen\OOPS\oop_cp
npm install
```

---

### **Issue: CORS error in browser**

**Error:** `Access to fetch blocked by CORS policy`

**Solution:** Backend already has CORS enabled. Make sure backend is running on port 8080.

---

### **Issue: Connection refused**

**Error:** `Failed to fetch`

**Solution:** 
1. Check backend is running: http://localhost:8080/api/health
2. Check port 8080 is not used by another app
3. Frontend will automatically fallback to mock API

---

### **Issue: Port already in use**

**Error:** `Port 8080 is already in use`

**Solution:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change port in backend-server.js (line 90)
const PORT = 8081;  // Use different port
```

---

## 🎯 Running Both Servers

You need **TWO terminals**:

### **Terminal 1: Backend**
```bash
cd c:\Users\shind\OneDrive\Dokumen\OOPS\oop_cp
npm start
```
Keep this running on port 8080

### **Terminal 2: Frontend**
```bash
cd fertilizer-frontend
npm run dev
```
Keep this running on port 3000

---

## 📊 Verification Checklist

✅ Backend server running (http://localhost:8080/api/health shows OK)  
✅ Frontend server running (http://localhost:3000 loads)  
✅ API calls working (check browser console for successful responses)  
✅ Recommendations displaying with data from backend  

---

## 🚀 Production Deployment

For production, you would:

1. **Deploy Backend:**
   - Use services like Heroku, AWS, Azure
   - Set environment variable: `PORT=80`
   - Update frontend API URL

2. **Deploy Frontend:**
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, etc.
   - Update API URL to production backend

3. **Update Frontend API URL:**
```javascript
// In App.jsx, change:
const API_URL = process.env.VITE_API_URL || 'http://localhost:8080';
const response = await fetch(`${API_URL}/api/recommend`, ...);
```

---

## 📝 Summary

✅ **Backend:** Node.js server on port 8080  
✅ **Frontend:** React app on port 3000  
✅ **Connection:** HTTP REST API with JSON  
✅ **Algorithm:** Same KNN logic as C++ version  
✅ **Fallback:** Works offline with mock data  

---

**🎉 Your backend and frontend are now connected! 🔗**
