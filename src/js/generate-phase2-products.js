const AgricultureMachineryDronesGenerator = require('./agriculture-phase2-machinery-drones.js');

// Generate Phase 2 products
const phase2Generator = new AgricultureMachineryDronesGenerator();
const phase2Data = phase2Generator.exportPhase2Products();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(phase2Data, null, 2);
fs.writeFileSync('agriculture-phase2-machinery-drones.json', jsonData);

console.log('✅ Phase 2 products saved to agriculture-phase2-machinery-drones.json');
console.log(`📊 Generated ${phase2Data.metadata.total_products} products across ${phase2Data.metadata.categories} categories`);
