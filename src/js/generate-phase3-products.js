const FoodProcessingEquipmentGenerator = require('./agriculture-phase3-food-processing.js');

// Generate Phase 3 products
const phase3Generator = new FoodProcessingEquipmentGenerator();
const phase3Data = phase3Generator.exportPhase3Products();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(phase3Data, null, 2);
fs.writeFileSync('agriculture-phase3-food-processing.json', jsonData);

console.log('✅ Phase 3 products saved to agriculture-phase3-food-processing.json');
console.log(`📊 Generated ${phase3Data.metadata.total_products} products across ${phase3Data.metadata.categories} categories`);
