const AgricultureSensorsIrrigationGenerator = require('./agriculture-phase1-sensors-irrigation.js');

// Generate Phase 1 products
const phase1Generator = new AgricultureSensorsIrrigationGenerator();
const phase1Data = phase1Generator.exportPhase1Products();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(phase1Data, null, 2);
fs.writeFileSync('agriculture-phase1-sensors-irrigation.json', jsonData);

console.log('✅ Phase 1 products saved to agriculture-phase1-sensors-irrigation.json');
console.log(`📊 Generated ${phase1Data.metadata.total_products} products across ${phase1Data.metadata.categories} categories`);
