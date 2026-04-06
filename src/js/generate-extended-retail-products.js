const ExtendedRetailProductsGenerator = require('./extended-retail-products-generator.js');

// Generate extended retail products
const extendedRetailGenerator = new ExtendedRetailProductsGenerator();
const extendedRetailData = extendedRetailGenerator.exportExtendedRetailProducts();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(extendedRetailData, null, 2);
fs.writeFileSync('extended-retail-products-complete.json', jsonData);

console.log('✅ Extended retail products saved to extended-retail-products-complete.json');
console.log(`📊 Generated ${extendedRetailData.metadata.total_products} products across ${extendedRetailData.metadata.total_categories} categories`);
console.log(`🛍️ Extended Categories: Baby & Kids, Pet Care, Automotive, Smart Tech, Wellness, Solar, Security, Garden, Medical, Camping, Handicrafts, Office`);
console.log(`🔬 Total brands: ${extendedRetailData.metadata.total_brands}`);
console.log(`📦 Total suppliers: ${extendedRetailData.metadata.total_suppliers}`);
console.log(`🏪 Total retailers: ${extendedRetailData.metadata.total_retailers}`);
console.log(`📈 Product distribution:`);
extendedRetailData.statistics.by_category.forEach(category => {
    console.log(`   - ${category.name}: ${category.product_count} products (${category.percentage})`);
});
