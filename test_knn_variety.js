// Comprehensive KNN Testing Script - Testing Output Variety
// This script tests the FIXED KNN algorithm to prove different inputs yield different outputs

const axios = require('axios');

const API_URL = 'http://localhost:8080/api/recommend';

// Test cases covering diverse scenarios
const testCases = [
    // Wheat - Low NPK, Low Yield
    { name: "Wheat Low NPK/Yield", crop: "Wheat", yield: 2.0, N: 75, P: 20, K: 12 },
    
    // Wheat - Medium NPK, Medium Yield (your original test)
    { name: "Wheat Medium NPK/Yield", crop: "Wheat", yield: 3.5, N: 95, P: 30, K: 20 },
    
    // Wheat - High NPK, High Yield
    { name: "Wheat High NPK/Yield", crop: "Wheat", yield: 5.0, N: 140, P: 60, K: 50 },
    
    // Wheat - Your exact input
    { name: "Wheat Your Input", crop: "Wheat", yield: 5.0, N: 80, P: 25, K: 10 },
    
    // Maize - Low
    { name: "Maize Low NPK/Yield", crop: "Maize", yield: 3.5, N: 70, P: 30, K: 20 },
    
    // Maize - Medium
    { name: "Maize Medium NPK/Yield", crop: "Maize", yield: 5.0, N: 90, P: 45, K: 30 },
    
    // Maize - High
    { name: "Maize High NPK/Yield", crop: "Maize", yield: 6.5, N: 110, P: 55, K: 40 },
    
    // Rice - Low
    { name: "Rice Low NPK/Yield", crop: "Rice", yield: 4.0, N: 85, P: 45, K: 35 },
    
    // Rice - Medium
    { name: "Rice Medium NPK/Yield", crop: "Rice", yield: 5.5, N: 105, P: 58, K: 48 },
    
    // Rice - High
    { name: "Rice High NPK/Yield", crop: "Rice", yield: 7.0, N: 130, P: 70, K: 60 }
];

async function runTest(testCase) {
    try {
        const response = await axios.post(API_URL, {
            crop: testCase.crop,
            yield: testCase.yield,
            N: testCase.N,
            P: testCase.P,
            K: testCase.K
        });
        
        return {
            success: true,
            name: testCase.name,
            input: testCase,
            output: response.data
        };
    } catch (error) {
        return {
            success: false,
            name: testCase.name,
            input: testCase,
            error: error.message
        };
    }
}

async function runAllTests() {
    console.log("╔══════════════════════════════════════════════════════════════════╗");
    console.log("║  KNN OUTPUT VARIETY TEST - Verifying Different Inputs → Different Outputs  ║");
    console.log("╚══════════════════════════════════════════════════════════════════╝\n");
    
    console.log(`📊 Dataset: 25 historical records (10 Wheat, 8 Maize, 7 Rice)`);
    console.log(`🔍 Algorithm: KNN with k=3\n`);
    console.log("─".repeat(100) + "\n");
    
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`Test ${i + 1}/${testCases.length}: ${testCase.name}`);
        console.log(`  Input: ${testCase.crop} | Yield=${testCase.yield} | N=${testCase.N}, P=${testCase.P}, K=${testCase.K}`);
        
        const result = await runTest(testCase);
        results.push(result);
        
        if (result.success) {
            console.log(`  ✓ Output: DAP=${result.output.DAP} kg/ha, Urea=${result.output.Urea} kg/ha, MOP=${result.output.MOP} kg/ha`);
            console.log(`  ✓ Used k=${result.output.k} neighbors\n`);
        } else {
            console.log(`  ✗ ERROR: ${result.error}\n`);
        }
    }
    
    console.log("═".repeat(100));
    console.log("\n📈 VARIETY ANALYSIS - Checking for Unique Outputs\n");
    
    // Group by crop and check uniqueness
    const wheatResults = results.filter(r => r.success && r.input.crop === "Wheat");
    const maizeResults = results.filter(r => r.success && r.input.crop === "Maize");
    const riceResults = results.filter(r => r.success && r.input.crop === "Rice");
    
    console.log("🌾 WHEAT Results:");
    wheatResults.forEach(r => {
        console.log(`   ${r.name}: DAP=${r.output.DAP}, Urea=${r.output.Urea}, MOP=${r.output.MOP}`);
    });
    
    console.log("\n🌽 MAIZE Results:");
    maizeResults.forEach(r => {
        console.log(`   ${r.name}: DAP=${r.output.DAP}, Urea=${r.output.Urea}, MOP=${r.output.MOP}`);
    });
    
    console.log("\n🌾 RICE Results:");
    riceResults.forEach(r => {
        console.log(`   ${r.name}: DAP=${r.output.DAP}, Urea=${r.output.Urea}, MOP=${r.output.MOP}`);
    });
    
    // Check uniqueness
    const uniqueOutputs = new Set(results.filter(r => r.success).map(r => 
        `${r.output.DAP}-${r.output.Urea}-${r.output.MOP}`
    ));
    
    console.log("\n" + "═".repeat(100));
    console.log("\n🎯 FINAL VERDICT:\n");
    console.log(`   Total Tests: ${results.length}`);
    console.log(`   Successful: ${results.filter(r => r.success).length}`);
    console.log(`   Failed: ${results.filter(r => !r.success).length}`);
    console.log(`   Unique Outputs: ${uniqueOutputs.size} (out of ${results.filter(r => r.success).length} successful tests)`);
    
    if (uniqueOutputs.size === 1) {
        console.log("\n   ❌ BUG CONFIRMED: All outputs are identical!");
        console.log("   Problem: KNN is not differentiating between different inputs");
    } else if (uniqueOutputs.size >= results.filter(r => r.success).length * 0.7) {
        console.log("\n   ✅ BUG FIXED: High variety in outputs!");
        console.log("   ✅ KNN is correctly producing different recommendations for different inputs");
    } else {
        console.log("\n   ⚠️  PARTIAL VARIETY: Some outputs are similar");
        console.log("   This may be expected if inputs are close to each other");
    }
    
    console.log("\n" + "═".repeat(100) + "\n");
    
    // Highlight your specific test case
    const yourTest = results.find(r => r.name === "Wheat Your Input");
    if (yourTest && yourTest.success) {
        console.log("🔍 YOUR SPECIFIC TEST (Wheat, Yield=5, N=80, P=25, K=10):\n");
        console.log(`   DAP: ${yourTest.output.DAP} kg/ha`);
        console.log(`   Urea: ${yourTest.output.Urea} kg/ha`);
        console.log(`   MOP: ${yourTest.output.MOP} kg/ha`);
        console.log(`   k=${yourTest.output.k} neighbors used`);
        console.log("\n   This should NOW be different from the old output:");
        console.log("   Old (buggy): DAP=102.50, Urea=205.00, MOP=152.50");
        
        if (yourTest.output.DAP === "102.50" && yourTest.output.Urea === "205.00" && yourTest.output.MOP === "152.50") {
            console.log("   ❌ Still showing old values - bug may persist!");
        } else {
            console.log("   ✅ New values confirmed - bug is FIXED!");
        }
    }
}

// Run the tests
runAllTests().catch(err => {
    console.error("❌ Test execution failed:", err.message);
    process.exit(1);
});
