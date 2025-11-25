# AI Fertilizer Recommendation System - Frontend

A modern, responsive web frontend for the C++ AI Fertilizer Recommendation Engine using React + Vite + TailwindCSS.

## 🌟 Features

- **Modern UI/UX** - Beautiful gradient design with smooth animations
- **Interactive Forms** - Easy-to-use input validation for crop and soil data
- **Real-time Recommendations** - Instant fertilizer suggestions using KNN algorithm
- **Visual Analytics** - Interactive charts (Bar & Pie) using Recharts
- **Historical Insights** - View and compare with historical dataset
- **Save Feature** - Store recommendations in localStorage
- **Fully Responsive** - Works on desktop, tablet, and mobile
- **Error Handling** - Comprehensive validation and error messages

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- (Optional) C++ backend server running on port 8080

### Installation

1. **Install dependencies:**
```bash
cd fertilizer-frontend
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open your browser:**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
fertilizer-frontend/
├── src/
│   ├── components/
│   │   ├── InputForm.jsx           # User input form component
│   │   ├── ResultsCard.jsx         # Recommendation results display
│   │   ├── Chart.jsx               # Bar & Pie charts visualization
│   │   └── HistoricalDataInsights.jsx  # Historical data panel
│   ├── api/
│   │   └── fertilizerAPI.js        # API integration & mock KNN algorithm
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles with Tailwind
├── public/
│   └── index.html                  # HTML template
├── index.html                      # Vite HTML entry
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── postcss.config.js               # PostCSS configuration
```

## 🔧 Configuration

### API Integration

The app can work in two modes:

**1. Mock Mode (Default)** - Uses local JavaScript KNN implementation:
- Runs entirely in browser
- No backend required
- Perfect for testing and development

**2. Backend Mode** - Connects to C++ REST API:
- Edit `src/api/fertilizerAPI.js`
- Update `API_BASE_URL` to your C++ server
- Replace mock calls with real API calls

### Backend API Specification

If you want to connect a real C++ backend:

**Endpoint:** `POST /api/recommend`

**Request Body:**
```json
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
  "DAP": 102.5,
  "Urea": 206.67,
  "MOP": 152.33,
  "k": 3,
  "neighbors": [...]
}
```

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.js` to customize colors:
```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#22c55e',  // Change primary color
        // ... other shades
      }
    }
  }
}
```

### Dataset

Update the historical dataset in:
- `src/App.jsx` (line ~90)
- `src/components/HistoricalDataInsights.jsx` (line ~6)
- `src/api/fertilizerAPI.js` (line ~35)

## 🧪 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Charting library
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📊 Algorithm

The frontend implements the same **K-Nearest Neighbors (KNN)** algorithm as the C++ backend:

1. Calculate Euclidean distance between input and historical data points
2. Sort by distance and select k=3 nearest neighbors
3. Average the fertilizer values from those neighbors
4. Return DAP, Urea, and MOP recommendations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Usage Example

1. Select crop type: **Wheat**
2. Enter target yield: **4.8 t/ha**
3. Enter soil nutrients:
   - Nitrogen (N): **120**
   - Phosphorus (P): **50**
   - Potassium (K): **40**
4. Click **"Get Recommendation"**
5. View results: DAP, Urea, MOP amounts
6. See visual charts and save if needed

## 🐛 Troubleshooting

**Issue:** Port 3000 already in use
```bash
# Solution: Change port in vite.config.js or kill process
npx kill-port 3000
```

**Issue:** Tailwind styles not loading
```bash
# Solution: Rebuild with clean cache
rm -rf node_modules .vite
npm install
npm run dev
```

**Issue:** Charts not rendering
```bash
# Solution: Ensure recharts is installed
npm install recharts --save
```

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 👨‍💻 Developer

Built with ❤️ for modern agriculture and smart farming initiatives

---

**Ready to deploy?** Build with `npm run build` and deploy the `dist/` folder to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)
