#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <iomanip>
#include <string>
using namespace std;

class FarmEntity {
protected:
    string entityType;
    
public:
    FarmEntity(string type) : entityType(type) {}
    virtual ~FarmEntity() {}
    
    virtual void displayInfo() const = 0;
    virtual string getType() const { return entityType; }
};

class Soil : public FarmEntity {
private:
    double nitrogen;
    double phosphorus;
    double potassium;
    
public:
    Soil(double n = 0, double p = 0, double k = 0) 
        : FarmEntity("Soil"), nitrogen(n), phosphorus(p), potassium(k) {}
    
    double getN() const { return nitrogen; }
    double getP() const { return phosphorus; }
    double getK() const { return potassium; }
    
    void setN(double n) { nitrogen = (n >= 0) ? n : 0; }
    void setP(double p) { phosphorus = (p >= 0) ? p : 0; }
    void setK(double k) { potassium = (k >= 0) ? k : 0; }
    
    void displayInfo() const override {
        cout << "Soil NPK: N=" << nitrogen << ", P=" << phosphorus << ", K=" << potassium << " kg/ha\n";
    }
};

class Crop : public FarmEntity {
protected:
    string cropName;
    double targetYield;
    
public:
    Crop(string name = "", double yield = 0) 
        : FarmEntity("Crop"), cropName(name), targetYield(yield) {}
    
    virtual ~Crop() {}
    
    string getName() const { return cropName; }
    double getYield() const { return targetYield; }
    
    void setName(string name) { cropName = name; }
    void setYield(double yield) { targetYield = (yield > 0) ? yield : 0; }
    
    virtual void displayInfo() const override {
        cout << "Crop: " << cropName << " | Target Yield: " << targetYield << " t/ha\n";
    }
    
    virtual double getCropFactor() const { return 1.0; }
};

class WheatCrop : public Crop {
public:
    WheatCrop(double yield) : Crop("Wheat", yield) {}
    
    double getCropFactor() const override { return 1.1; }
    
    void displayInfo() const override {
        cout << "[WheatCrop] " << cropName << " (Premium grain) | Yield: " << targetYield << " t/ha\n";
    }
};

class MaizeCrop : public Crop {
public:
    MaizeCrop(double yield) : Crop("Maize", yield) {}
    
    double getCropFactor() const override { return 0.95; }
    
    void displayInfo() const override {
        cout << "[MaizeCrop] " << cropName << " (Corn variety) | Yield: " << targetYield << " t/ha\n";
    }
};

class RiceCrop : public Crop {
public:
    RiceCrop(double yield) : Crop("Rice", yield) {}
    
    double getCropFactor() const override { return 1.15; }
    
    void displayInfo() const override {
        cout << "[RiceCrop] " << cropName << " (Paddy) | Yield: " << targetYield << " t/ha\n";
    }
};

class HistoricalData {
private:
    string cropType;
    double soilN, soilP, soilK, yieldAchieved;
    double dapUsed, ureaUsed, mopUsed;
    
public:
    HistoricalData(string c, double n, double p, double k, double y, double d, double u, double m)
        : cropType(c), soilN(n), soilP(p), soilK(k), yieldAchieved(y), 
          dapUsed(d), ureaUsed(u), mopUsed(m) {}
    
    string getCrop() const { return cropType; }
    double getSoilN() const { return soilN; }
    double getSoilP() const { return soilP; }
    double getSoilK() const { return soilK; }
    double getYield() const { return yieldAchieved; }
    double getDAP() const { return dapUsed; }
    double getUrea() const { return ureaUsed; }
    double getMOP() const { return mopUsed; }
};

class RecommendationStrategy {
public:
    virtual ~RecommendationStrategy() {}
    
    virtual void generateRecommendation(const Soil& soil, const Crop& crop, 
                                       const vector<HistoricalData>& data, int k) = 0;
};

class KNNRecommendation : public RecommendationStrategy {
private:
    double calculateDistance(const Soil& soil, const Crop& crop, const HistoricalData& record) {
        return sqrt(pow(soil.getN() - record.getSoilN(), 2) +
                   pow(soil.getP() - record.getSoilP(), 2) +
                   pow(soil.getK() - record.getSoilK(), 2) +
                   pow(crop.getYield() - record.getYield(), 2));
    }
    
public:
    void generateRecommendation(const Soil& soil, const Crop& crop, 
                               const vector<HistoricalData>& data, int k) override {
        cout << "\n[POLYMORPHISM] Calling KNN recommendation strategy dynamically...\n";
        
        vector<pair<double, int>> distances;
        
        for (size_t i = 0; i < data.size(); i++) {
            if (data[i].getCrop() == crop.getName()) {
                double dist = calculateDistance(soil, crop, data[i]);
                distances.push_back({dist, i});
            }
        }
        
        sort(distances.begin(), distances.end());
        
        double sumDAP = 0, sumUrea = 0, sumMOP = 0;
        int count = min(k, (int)distances.size());
        
        for (int i = 0; i < count; i++) {
            int idx = distances[i].second;
            sumDAP += data[idx].getDAP();
            sumUrea += data[idx].getUrea();
            sumMOP += data[idx].getMOP();
        }
        
        double factor = crop.getCropFactor();
        
        cout << "\n========== AI FERTILIZER RECOMMENDATION (KNN) ==========\n";
        cout << fixed << setprecision(2);
        cout << "Crop Factor Applied: " << factor << "x (Polymorphic behavior)\n";
        cout << "Neighbors Used: " << count << " nearest samples\n";
        cout << "\nRecommended Fertilizer Quantities:\n";
        cout << "  DAP  : " << (sumDAP / count) * factor << " kg/ha\n";
        cout << "  Urea : " << (sumUrea / count) * factor << " kg/ha\n";
        cout << "  MOP  : " << (sumMOP / count) * factor << " kg/ha\n";
        cout << "========================================================\n\n";
    }
};

class FarmManager {
private:
    Soil* farmSoil;
    Crop* farmCrop;
    vector<HistoricalData> historicalDatabase;
    RecommendationStrategy* aiEngine;
    
public:
    FarmManager() : farmSoil(nullptr), farmCrop(nullptr), aiEngine(nullptr) {
        cout << "[COMPOSITION] FarmManager created with internal components\n";
        
        historicalDatabase.push_back(HistoricalData("Wheat", 120, 50, 40, 4.2, 100, 200, 150));
        historicalDatabase.push_back(HistoricalData("Maize", 90, 45, 30, 5.0, 80, 180, 140));
        historicalDatabase.push_back(HistoricalData("Rice", 110, 60, 50, 6.0, 120, 220, 160));
        historicalDatabase.push_back(HistoricalData("Wheat", 130, 55, 45, 4.8, 105, 210, 155));
        historicalDatabase.push_back(HistoricalData("Maize", 100, 48, 35, 5.5, 90, 190, 145));
        
        aiEngine = new KNNRecommendation();
    }
    
    ~FarmManager() {
        delete farmSoil;
        delete farmCrop;
        delete aiEngine;
        cout << "[ENCAPSULATION] FarmManager destroyed, resources cleaned\n";
    }
    
    void setSoil(double n, double p, double k) {
        delete farmSoil;
        farmSoil = new Soil(n, p, k);
        cout << "[ENCAPSULATION] Soil data set with private member access\n";
    }
    
    void setCrop(string cropType, double targetYield) {
        delete farmCrop;
        
        cout << "[POLYMORPHISM] Creating crop object dynamically based on type...\n";
        
        if (cropType == "Wheat") {
            farmCrop = new WheatCrop(targetYield);
        } else if (cropType == "Maize") {
            farmCrop = new MaizeCrop(targetYield);
        } else if (cropType == "Rice") {
            farmCrop = new RiceCrop(targetYield);
        } else {
            farmCrop = new Crop(cropType, targetYield);
        }
    }
    
    void displayFarmInfo() const {
        cout << "\n========== FARM INFORMATION ==========\n";
        if (farmSoil) {
            cout << "[POLYMORPHISM] Calling virtual displayInfo() for Soil:\n";
            farmSoil->displayInfo();
        }
        if (farmCrop) {
            cout << "[POLYMORPHISM] Calling virtual displayInfo() for Crop:\n";
            farmCrop->displayInfo();
        }
        cout << "======================================\n";
    }
    
    void generateRecommendation(int k = 3) {
        if (!farmSoil || !farmCrop || !aiEngine) {
            cout << "Error: Farm data not set properly!\n";
            return;
        }
        
        cout << "[ABSTRACTION] Using AI engine through abstract interface...\n";
        aiEngine->generateRecommendation(*farmSoil, *farmCrop, historicalDatabase, k);
    }
};

int main() {
    cout << "========== ADVANCED OOP FERTILIZER RECOMMENDATION SYSTEM ==========\n\n";
    cout << "Demonstrating: Encapsulation, Inheritance, Polymorphism, Abstraction\n\n";
    
    FarmManager manager;
    
    string cropName;
    double targetYield, nitrogen, phosphorus, potassium;
    
    cout << "Enter crop name (Wheat/Maize/Rice): ";
    cin >> cropName;
    cout << "Enter target yield (t/ha): ";
    cin >> targetYield;
    cout << "Enter soil Nitrogen (N) kg/ha: ";
    cin >> nitrogen;
    cout << "Enter soil Phosphorus (P2O5) kg/ha: ";
    cin >> phosphorus;
    cout << "Enter soil Potassium (K2O) kg/ha: ";
    cin >> potassium;
    
    cout << "\n[ENCAPSULATION] Setting farm data through controlled setters...\n";
    manager.setSoil(nitrogen, phosphorus, potassium);
    manager.setCrop(cropName, targetYield);
    
    manager.displayFarmInfo();
    
    manager.generateRecommendation(3);
    
    return 0;
}