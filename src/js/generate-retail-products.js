const RetailProductsGenerator = require('./retail-products-generator.js');

// Generate retail products
const retailGenerator = new RetailProductsGenerator();
const retailData = retailGenerator.exportRetailProducts();

// Save to JSON file
const fs = require('fs');
const jsonData = JSON.stringify(retailData, null, 2);
fs.writeFileSync('retail-products-complete.json', jsonData);

console.log('✅ Retail products saved to retail-products-complete.json');
console.log(`📊 Generated ${retailData.metadata.total_products} products across ${retailData.metadata.total_categories} categories`);
console.log(`🛍️ Categories: Đồ gia dụng, Đồ điện tử, Thời trang, Sức khỏe & Làm đẹp, Thể thao, Sách, Đồ chơi, Nội thất, Thực phẩm`);
console.log(`🔬 Total brands: ${retailData.metadata.total_brands}`);
console.log(`📦 Total suppliers: ${retailData.metadata.total_suppliers}`);
console.log(`🏪 Total retailers: ${retailData.metadata.total_retailers}`);
console.log(`📈 Product distribution:`);
retailData.statistics.by_category.forEach(category => {
    console.log(`   - ${category.name}: ${category.product_count} products (${category.percentage})`);
});
