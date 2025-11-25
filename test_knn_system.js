// ============================================================
// AUTOMATED KNN SYSTEM TESTING - 100 Test Cases
// QA Validation for Fertilizer Recommendation System
// ============================================================

const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:8080/api/recommend';
const TOTAL_TESTS = 100;

// Test Results Storage
const results = {
    successful: 0,
    failed: 0,
    errors: [],
    anomalies: [],
    executionTimes: [],
    testCases: [],
    consistencyTests: [],
    edgeCases: []
};

// ============================================================
// TEST DATA GENERATOR
// ============================================================

function generateTestInput(testNumber) {
    const crops = ['Wheat', 'Maize', 'Rice'];
    const testTypes = {
        'realistic': 60,      // 60% realistic cases
        'edge': 20,           // 20% edge cases
        'boundary': 10,       // 10% boundary cases
        'random': 10          // 10% random cases
    };
    
    let input;
    const type = getTestType(testNumber, testTypes);
    
    switch(type) {
        case 'realistic':
            input = generateRealisticCase(crops);
            break;
        case 'edge':
            input = generateEdgeCase(crops);
            break;
        case 'boundary':
            input = generateBoundaryCase(crops);
            break;
        case 'random':
            input = generateRandomCase(crops);
            break;
    }
    
    return { ...input, testNumber, testType: type };
}

function getTestType(testNum, types) {
    if (testNum <= types.realistic) return 'realistic';
    if (testNum <= types.realistic + types.edge) return 'edge';
    if (testNum <= types.realistic + types.edge + types.boundary) return 'boundary';
    return 'random';
}

// Realistic agricultural scenarios
function generateRealisticCase(crops) {
    const crop = crops[Math.floor(Math.random() * crops.length)];
    
    const ranges = {
        'Wheat': { yield: [2, 6], N: [80, 150], P: [30, 70], K: [30, 60] },
        'Maize': { yield: [3, 8], N: [70, 130], P: [30, 60], K: [20, 50] },
        'Rice': { yield: [4, 8], N: [90, 140], P: [40, 80], K: [40, 70] }
    };
    
    const range = ranges[crop];
    return {
        crop,
        yield: randomInRange(range.yield[0], range.yield[1]),
        N: randomInRange(range.N[0], range.N[1]),
        P: randomInRange(range.P[0], range.P[1]),
        K: randomInRange(range.K[0], range.K[1])
    };
}

// Edge cases - extreme but valid values
function generateEdgeCase(crops) {
    const crop = crops[Math.floor(Math.random() * crops.length)];
    const edgeType = Math.floor(Math.random() * 4);
    
    switch(edgeType) {
        case 0: // Very low values
            return { crop, yield: 1, N: 20, P: 5, K: 5 };
        case 1: // Very high values
            return { crop, yield: 10, N: 200, P: 100, K: 100 };
        case 2: // Imbalanced NPK
            return { crop, yield: 5, N: 150, P: 10, K: 10 };
        case 3: // High yield, low NPK
            return { crop, yield: 8, N: 50, P: 20, K: 15 };
    }
}

// Boundary cases - testing limits
function generateBoundaryCase(crops) {
    const crop = crops[Math.floor(Math.random() * crops.length)];
    const boundaryType = Math.floor(Math.random() * 5);
    
    switch(boundaryType) {
        case 0: // Zero yield
            return { crop, yield: 0.1, N: 100, P: 50, K: 40 };
        case 1: // Exact historical match
            return { crop: 'Wheat', yield: 4.2, N: 120, P: 50, K: 40 };
        case 2: // Near zero NPK
            return { crop, yield: 3, N: 1, P: 1, K: 1 };
        case 3: // Maximum recommended
            return { crop, yield: 10, N: 250, P: 150, K: 150 };
        case 4: // Decimal precision
            return { crop, yield: 4.5678, N: 123.456, P: 56.789, K: 45.123 };
    }
}

// Random cases - completely random within valid ranges
function generateRandomCase(crops) {
    return {
        crop: crops[Math.floor(Math.random() * crops.length)],
        yield: randomInRange(0.5, 12),
        N: randomInRange(10, 250),
        P: randomInRange(5, 150),
        K: randomInRange(5, 150)
    };
}

function randomInRange(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// ============================================================
// KNN MODEL TESTING
// ============================================================

async function testKNNModel(input) {
    const startTime = Date.now();
    
    try {
        const response = await axios.post(API_URL, {
            crop: input.crop,
            yield: input.yield,
            N: input.N,
            P: input.P,
            K: input.K
        }, {
            timeout: 5000,
            headers: { 'Content-Type': 'application/json' }
        });
        
        const executionTime = Date.now() - startTime;
        
        return {
            success: true,
            input,
            output: response.data,
            executionTime,
            statusCode: response.status
        };
    } catch (error) {
        const executionTime = Date.now() - startTime;
        
        return {
            success: false,
            input,
            error: error.message,
            executionTime,
            statusCode: error.response?.status || 0
        };
    }
}

// ============================================================
// VALIDATION CHECKS
// ============================================================

function validateOutput(result) {
    const validations = {
        hasOutput: false,
        validNumbers: false,
        positiveValues: false,
        reasonableRange: false,
        hasNeighbors: false,
        consistentCrop: false,
        noNaN: false,
        noNull: false
    };
    
    if (!result.success) return validations;
    
    const output = result.output;
    
    // Check output exists
    validations.hasOutput = output && typeof output === 'object';
    
    // Check for NaN and null
    validations.noNaN = !Object.values(output).some(v => 
        typeof v === 'number' && isNaN(v)
    );
    validations.noNull = !Object.values(output).some(v => v === null);
    
    // Check numeric fields
    const dap = parseFloat(output.DAP);
    const urea = parseFloat(output.Urea);
    const mop = parseFloat(output.MOP);
    
    validations.validNumbers = !isNaN(dap) && !isNaN(urea) && !isNaN(mop);
    
    // Check positive values
    validations.positiveValues = dap >= 0 && urea >= 0 && mop >= 0;
    
    // Check reasonable range (0-500 kg/ha is reasonable for fertilizers)
    validations.reasonableRange = 
        dap <= 500 && urea <= 500 && mop <= 500;
    
    // Check neighbors array
    validations.hasNeighbors = 
        Array.isArray(output.neighbors) && output.neighbors.length > 0;
    
    // Check crop consistency
    validations.consistentCrop = output.crop === result.input.crop;
    
    return validations;
}

function checkConsistency(result1, result2) {
    // Check if similar inputs produce similar outputs
    const input1 = result1.input;
    const input2 = result2.input;
    
    if (input1.crop !== input2.crop) return null;
    
    // Calculate input similarity (Euclidean distance)
    const inputDistance = Math.sqrt(
        Math.pow(input1.N - input2.N, 2) +
        Math.pow(input1.P - input2.P, 2) +
        Math.pow(input1.K - input2.K, 2) +
        Math.pow(input1.yield - input2.yield, 2)
    );
    
    // Calculate output difference
    const dap1 = parseFloat(result1.output.DAP);
    const dap2 = parseFloat(result2.output.DAP);
    const urea1 = parseFloat(result1.output.Urea);
    const urea2 = parseFloat(result2.output.Urea);
    const mop1 = parseFloat(result1.output.MOP);
    const mop2 = parseFloat(result2.output.MOP);
    
    const outputDistance = Math.sqrt(
        Math.pow(dap1 - dap2, 2) +
        Math.pow(urea1 - urea2, 2) +
        Math.pow(mop1 - mop2, 2)
    );
    
    return {
        inputDistance,
        outputDistance,
        consistent: inputDistance < 20 ? outputDistance < 50 : true
    };
}

function detectAnomalies(result) {
    const anomalies = [];
    
    if (!result.success) return anomalies;
    
    const output = result.output;
    const dap = parseFloat(output.DAP);
    const urea = parseFloat(output.Urea);
    const mop = parseFloat(output.MOP);
    
    // Check for unusual patterns
    if (dap === 0 && urea === 0 && mop === 0) {
        anomalies.push('All fertilizers returned zero');
    }
    
    if (dap > 300 || urea > 300 || mop > 300) {
        anomalies.push('Extremely high fertilizer recommendation');
    }
    
    if (dap === urea && urea === mop) {
        anomalies.push('All fertilizers have identical values');
    }
    
    // Check if neighbors exist but are too far
    if (output.neighbors && output.neighbors.length > 0) {
        const distances = output.neighbors.map(n => parseFloat(n.distance));
        const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
        
        if (avgDistance > 100) {
            anomalies.push('Neighbors are very distant (poor match)');
        }
    }
    
    // Check execution time
    if (result.executionTime > 1000) {
        anomalies.push('Slow response time (>1 second)');
    }
    
    return anomalies;
}

// ============================================================
// MAIN TEST EXECUTION
// ============================================================

async function runAllTests() {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║   AUTOMATED KNN SYSTEM TESTING - 100 TEST CASES       ║');
    console.log('║   Fertilizer Recommendation System QA Validation      ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    console.log('🚀 Starting comprehensive testing...\n');
    console.log(`📊 Total Test Cases: ${TOTAL_TESTS}`);
    console.log(`🎯 API Endpoint: ${API_URL}\n`);
    
    // Generate all test inputs
    console.log('📝 Generating test inputs...');
    const testInputs = [];
    for (let i = 1; i <= TOTAL_TESTS; i++) {
        testInputs.push(generateTestInput(i));
    }
    console.log(`✅ Generated ${testInputs.length} test cases\n`);
    
    // Run tests with progress indicator
    console.log('🧪 Running tests...\n');
    const progressBar = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let progressIndex = 0;
    
    for (let i = 0; i < testInputs.length; i++) {
        const input = testInputs[i];
        
        // Show progress
        process.stdout.write(`\r${progressBar[progressIndex]} Testing ${i + 1}/${TOTAL_TESTS}... `);
        progressIndex = (progressIndex + 1) % progressBar.length;
        
        // Run test
        const result = await testKNNModel(input);
        results.testCases.push(result);
        
        // Validate
        const validation = validateOutput(result);
        result.validation = validation;
        
        // Check for anomalies
        const anomalies = detectAnomalies(result);
        if (anomalies.length > 0) {
            results.anomalies.push({ testNumber: i + 1, input, anomalies });
        }
        
        // Track results
        if (result.success) {
            results.successful++;
            results.executionTimes.push(result.executionTime);
        } else {
            results.failed++;
            results.errors.push({
                testNumber: i + 1,
                input,
                error: result.error
            });
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    console.log('\r✅ Testing complete!                    \n');
    
    // Consistency tests
    console.log('🔍 Running consistency checks...');
    for (let i = 0; i < Math.min(20, results.successful); i++) {
        const idx1 = Math.floor(Math.random() * results.testCases.length);
        const idx2 = Math.floor(Math.random() * results.testCases.length);
        
        if (idx1 !== idx2 && results.testCases[idx1].success && results.testCases[idx2].success) {
            const consistency = checkConsistency(results.testCases[idx1], results.testCases[idx2]);
            if (consistency) {
                results.consistencyTests.push(consistency);
            }
        }
    }
    console.log(`✅ Completed ${results.consistencyTests.length} consistency checks\n`);
    
    // Generate report
    generateReport();
}

// ============================================================
// REPORT GENERATION
// ============================================================

function generateReport() {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║                   TEST RESULTS SUMMARY                 ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    // Success Rate
    const successRate = ((results.successful / TOTAL_TESTS) * 100).toFixed(2);
    console.log('📊 OVERALL RESULTS:');
    console.log(`   ✅ Successful: ${results.successful}/${TOTAL_TESTS} (${successRate}%)`);
    console.log(`   ❌ Failed: ${results.failed}/${TOTAL_TESTS}`);
    console.log(`   ⚠️  Anomalies: ${results.anomalies.length}\n`);
    
    // Performance Stats
    if (results.executionTimes.length > 0) {
        const avgTime = (results.executionTimes.reduce((a, b) => a + b, 0) / results.executionTimes.length).toFixed(2);
        const minTime = Math.min(...results.executionTimes);
        const maxTime = Math.max(...results.executionTimes);
        
        console.log('⚡ PERFORMANCE:');
        console.log(`   Average Response Time: ${avgTime}ms`);
        console.log(`   Fastest Response: ${minTime}ms`);
        console.log(`   Slowest Response: ${maxTime}ms\n`);
    }
    
    // Validation Summary
    const validationStats = calculateValidationStats();
    console.log('✓ VALIDATION CHECKS:');
    Object.keys(validationStats).forEach(key => {
        const stat = validationStats[key];
        const icon = stat.rate > 95 ? '✅' : stat.rate > 80 ? '⚠️' : '❌';
        console.log(`   ${icon} ${key}: ${stat.passed}/${stat.total} (${stat.rate.toFixed(1)}%)`);
    });
    console.log('');
    
    // Consistency Results
    if (results.consistencyTests.length > 0) {
        const consistent = results.consistencyTests.filter(c => c.consistent).length;
        const consistencyRate = ((consistent / results.consistencyTests.length) * 100).toFixed(2);
        console.log('🔗 CONSISTENCY:');
        console.log(`   Similar inputs → Similar outputs: ${consistent}/${results.consistencyTests.length} (${consistencyRate}%)\n`);
    }
    
    // Error Details
    if (results.errors.length > 0) {
        console.log('❌ ERRORS ENCOUNTERED:');
        const errorTypes = {};
        results.errors.forEach(e => {
            errorTypes[e.error] = (errorTypes[e.error] || 0) + 1;
        });
        Object.keys(errorTypes).forEach(error => {
            console.log(`   • ${error}: ${errorTypes[error]} occurrence(s)`);
        });
        console.log('');
    }
    
    // Anomalies
    if (results.anomalies.length > 0) {
        console.log('⚠️  ANOMALIES DETECTED:');
        const anomalyTypes = {};
        results.anomalies.forEach(a => {
            a.anomalies.forEach(anomaly => {
                anomalyTypes[anomaly] = (anomalyTypes[anomaly] || 0) + 1;
            });
        });
        Object.keys(anomalyTypes).forEach(anomaly => {
            console.log(`   • ${anomaly}: ${anomalyTypes[anomaly]} occurrence(s)`);
        });
        console.log('');
    }
    
    // Test Distribution
    console.log('📋 TEST DISTRIBUTION:');
    const testTypes = {};
    results.testCases.forEach(tc => {
        testTypes[tc.input.testType] = (testTypes[tc.input.testType] || 0) + 1;
    });
    Object.keys(testTypes).forEach(type => {
        console.log(`   • ${type}: ${testTypes[type]} tests`);
    });
    console.log('');
    
    // Recommendations
    console.log('💡 RECOMMENDATIONS:\n');
    
    if (successRate >= 99) {
        console.log('   ✅ EXCELLENT: System is highly stable and reliable!');
    } else if (successRate >= 95) {
        console.log('   ✅ GOOD: System is stable with minor issues.');
    } else if (successRate >= 80) {
        console.log('   ⚠️  FAIR: System needs some improvements.');
    } else {
        console.log('   ❌ POOR: System requires significant debugging.');
    }
    
    if (results.anomalies.length > 10) {
        console.log('   ⚠️  High number of anomalies detected. Review edge cases.');
    }
    
    if (results.executionTimes.length > 0) {
        const avgTime = results.executionTimes.reduce((a, b) => a + b, 0) / results.executionTimes.length;
        if (avgTime > 500) {
            console.log('   ⚠️  Slow response times. Consider optimization.');
        } else if (avgTime < 100) {
            console.log('   ✅ Excellent response times!');
        }
    }
    
    if (results.consistencyTests.length > 0) {
        const consistent = results.consistencyTests.filter(c => c.consistent).length;
        const consistencyRate = (consistent / results.consistencyTests.length) * 100;
        if (consistencyRate < 80) {
            console.log('   ⚠️  Low consistency. Review KNN algorithm logic.');
        }
    }
    
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║                  TESTING COMPLETED                     ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
    // Save detailed results to file
    const fs = require('fs');
    fs.writeFileSync('test_results.json', JSON.stringify(results, null, 2));
    console.log('📄 Detailed results saved to: test_results.json\n');
}

function calculateValidationStats() {
    const stats = {};
    const validationKeys = [
        'hasOutput', 'validNumbers', 'positiveValues', 'reasonableRange',
        'hasNeighbors', 'consistentCrop', 'noNaN', 'noNull'
    ];
    
    validationKeys.forEach(key => {
        const total = results.testCases.filter(tc => tc.validation).length;
        const passed = results.testCases.filter(tc => tc.validation && tc.validation[key]).length;
        stats[key] = {
            passed,
            total,
            rate: total > 0 ? (passed / total) * 100 : 0
        };
    });
    
    return stats;
}

// ============================================================
// RUN TESTS
// ============================================================

runAllTests().catch(error => {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
});
