const UltraExtendedRetailProductsGenerator = require('./ultra-extended-retail-products-generator.js');

// Generate ultra extended retail products
const ultraRetailGenerator = new UltraExtendedRetailProductsGenerator();
const ultraRetailData = ultraRetailGenerator.exportUltraExtendedRetailProducts();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(ultraRetailData, null, 2);
fs.writeFileSync('ultra-extended-retail-products-complete.json', jsonData);

console.log('✅ Ultra Extended Retail Products saved to ultra-extended-retail-products-complete.json');
console.log(`📊 Generated ${ultraRetailData.metadata.total_products} products across ${ultraRetailData.metadata.total_categories} categories`);
console.log(`🛍️ Ultra Extended Categories: Professional Sports, Arts & Crafts, High Technology, Advanced Health, Education, Professional Kitchen, Tech Fashion, Sustainable Products, Premium Toys, Local Products`);
console.log(`🔬 Total brands: ${ultraRetailData.metadata.total_brands}`);
console.log(`📦 Total suppliers: ${ultraRetailData.metadata.total_suppliers}`);
console.log(`🏪 Total retailers: ${ultraRetailData.metadata.total_retailers}`);
console.log(`📈 Product distribution:`);
ultraRetailData.statistics.by_category.forEach(category => {
    console.log(`   - ${category.name}: ${category.product_count} products (${category.percentage})`);
});
