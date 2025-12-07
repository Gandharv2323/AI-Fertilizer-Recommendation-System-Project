#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <iomanip>
#include <string>
#include <unordered_map>
#include <queue>
#include <stack>
using namespace std;

// ========== DATA STRUCTURE 1: ARRAY-BASED NUTRIENT TRACKER ==========
class NutrientArray {
private:
    double nutrients[3]; // N, P, K
    int size;
public:
    NutrientArray() : size(3) {
        nutrients[0] = nutrients[1] = nutrients[2] = 0;
    }
    
    void set(int index, double value) {
        if (index >= 0 && index < size) nutrients[index] = value;
    }
    
    double get(int index) const {
        return (index >= 0 && index < size) ? nutrients[index] : 0;
    }
    
    void display() const {
        cout << "[ARRAY DS] N=" << nutrients[0] << ", P=" << nutrients[1] 
             << ", K=" << nutrients[2] << endl;
    }
};

// ========== DATA STRUCTURE 2: SINGLY LINKED LIST FOR FARM RECORDS ==========
class FarmRecord {
public:
    string farmName;
    double area;
    FarmRecord* next;
    
    FarmRecord(string name, double a) : farmName(name), area(a), next(nullptr) {}
};

class FarmRecordList {
private:
    FarmRecord* head;
public:
    FarmRecordList() : head(nullptr) {}
    
    ~FarmRecordList() {
        while (head) {
            FarmRecord* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    void addRecord(string name, double area) {
        FarmRecord* newRec = new FarmRecord(name, area);
        newRec->next = head;
        head = newRec;
        cout << "[LINKED LIST DS] Added farm: " << name << endl;
    }
    
    void displayAll() const {
        cout << "[LINKED LIST DS] Farm Records:\n";
        FarmRecord* curr = head;
        while (curr) {
            cout << "  - " << curr->farmName << " (" << curr->area << " ha)\n";
            curr = curr->next;
        }
    }
};

// ========== DATA STRUCTURE 3: STACK FOR OPERATION HISTORY ==========
class OperationStack {
private:
    stack<string> operations;
public:
    void push(string op) {
        operations.push(op);
        cout << "[STACK DS] Operation logged: " << op << endl;
    }
    
    void showHistory() {
        cout << "[STACK DS] Recent Operations (LIFO):\n";
        stack<string> temp = operations;
        while (!temp.empty()) {
            cout << "  - " << temp.top() << endl;
            temp.pop();
        }
    }
};

// ========== DATA STRUCTURE 4: HASH MAP FOR CROP DATABASE ==========
class CropDatabase {
private:
    unordered_map<string, double> cropYieldMap;
public:
    CropDatabase() {
        cropYieldMap["Wheat"] = 4.5;
        cropYieldMap["Maize"] = 5.2;
        cropYieldMap["Rice"] = 6.0;
        cropYieldMap["Cotton"] = 3.8;
        cout << "[HASH MAP DS] Crop database initialized with 4 crops\n";
    }
    
    void addCrop(string name, double avgYield) {
        cropYieldMap[name] = avgYield;
        cout << "[HASH MAP DS] Added " << name << " with avg yield " << avgYield << " t/ha\n";
    }
    
    double getAvgYield(string name) {
        return cropYieldMap.count(name) ? cropYieldMap[name] : 0.0;
    }
    
    void displayAll() const {
        cout << "[HASH MAP DS] Crop Database:\n";
        for (const auto& entry : cropYieldMap) {
            cout << "  " << entry.first << ": " << entry.second << " t/ha\n";
        }
    }
};

// ========== DATA STRUCTURE 5: BINARY SEARCH TREE FOR YIELD RECORDS ==========
class YieldNode {
public:
    double yield;
    string cropName;
    YieldNode* left;
    YieldNode* right;
    
    YieldNode(double y, string c) : yield(y), cropName(c), left(nullptr), right(nullptr) {}
};

class YieldBST {
private:
    YieldNode* root;
    
    YieldNode* insert(YieldNode* node, double y, string c) {
        if (!node) return new YieldNode(y, c);
        if (y < node->yield) node->left = insert(node->left, y, c);
        else node->right = insert(node->right, y, c);
        return node;
    }
    
    void inorder(YieldNode* node) const {
        if (!node) return;
        inorder(node->left);
        cout << "  " << node->cropName << ": " << node->yield << " t/ha\n";
        inorder(node->right);
    }
    
    void cleanup(YieldNode* node) {
        if (!node) return;
        cleanup(node->left);
        cleanup(node->right);
        delete node;
    }
    
public:
    YieldBST() : root(nullptr) {}
    
    ~YieldBST() {
        cleanup(root);
    }
    
    void addYield(double y, string c) {
        root = insert(root, y, c);
        cout << "[BST DS] Added " << c << " yield: " << y << " t/ha\n";
    }
    
    void displaySorted() const {
        cout << "[BST DS] Yields (sorted by value):\n";
        inorder(root);
    }
};

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
    
    // Data structure instances
    NutrientArray nutrientTracker;
    FarmRecordList farmRecords;
    OperationStack opHistory;
    CropDatabase cropDB;
    YieldBST yieldTree;
    
public:
    FarmManager() : farmSoil(nullptr), farmCrop(nullptr), aiEngine(nullptr) {
        cout << "[COMPOSITION] FarmManager created with internal components\n";
        cout << "\n========== INITIALIZING DATA STRUCTURES ==========\n";
        
        // Initialize data structures with sample data
        farmRecords.addRecord("Green Valley Farm", 50.5);
        farmRecords.addRecord("Sunrise Orchards", 30.2);
        
        opHistory.push("System Initialized");
        
        yieldTree.addYield(4.2, "Wheat");
        yieldTree.addYield(5.5, "Maize");
        yieldTree.addYield(6.0, "Rice");
        yieldTree.addYield(3.8, "Cotton");
        
        cout << "==================================================\n\n";
        
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
        
        // Store in array data structure
        nutrientTracker.set(0, n);
        nutrientTracker.set(1, p);
        nutrientTracker.set(2, k);
        nutrientTracker.display();
        
        opHistory.push("Set soil NPK values");
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
        
        // Add to BST and log operation
        yieldTree.addYield(targetYield, cropType);
        opHistory.push("Set crop: " + cropType);
        
        // Check against crop database
        double avgYield = cropDB.getAvgYield(cropType);
        if (avgYield > 0) {
            cout << "[HASH MAP DS] Average yield for " << cropType << ": " << avgYield << " t/ha\n";
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
        
        opHistory.push("Generated recommendation");
    }
    
    void showDataStructures() {
        cout << "\n========== DATA STRUCTURES DEMONSTRATION ==========\n";
        nutrientTracker.display();
        farmRecords.displayAll();
        cropDB.displayAll();
        yieldTree.displaySorted();
        opHistory.showHistory();
        cout << "===================================================\n\n";
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
    
    // Display all data structures
    manager.showDataStructures();
    
    cout << "\n========== DATA STRUCTURES SUMMARY ==========\n";
    cout << "✓ ARRAY: Used for NPK nutrient tracking\n";
    cout << "✓ LINKED LIST: Manages farm records\n";
    cout << "✓ STACK: Tracks operation history (LIFO)\n";
    cout << "✓ HASH MAP: Fast crop database lookups\n";
    cout << "✓ BINARY SEARCH TREE: Sorted yield records\n";
    cout << "=============================================\n";
    
    return 0;
}