const FertilizersChemicalsGenerator = require('./agriculture-phase4-fertilizers-chemicals.js');

// Generate Phase 4 products
const phase4Generator = new FertilizersChemicalsGenerator();
const phase4Data = phase4Generator.exportPhase4Products();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(phase4Data, null, 2);
fs.writeFileSync('agriculture-phase4-fertilizers-chemicals.json', jsonData);

console.log('✅ Phase 4 products saved to agriculture-phase4-fertilizers-chemicals.json');
console.log(`📊 Generated ${phase4Data.metadata.total_products} products across ${phase4Data.metadata.categories} categories`);
console.log(`🌱 Categories: Phân bón, Thuốc bảo vệ thực vật, Chất điều hòa tăng trưởng, Hóa chất xử lý, Phụ gia`);
console.log(`🔬 Total specifications: ${Object.keys(phase4Data.statistics.by_type).length} types`);
console.log(`📈 Product distribution:`);
Object.entries(phase4Data.statistics.by_category).forEach(([key, stats]) => {
    console.log(`   - ${stats.name}: ${stats.product_count} products (${stats.percentage})`);
});
