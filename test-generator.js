// Test the ProductGenerator
const ProductGenerator = require('./src/js/product-generator.js');

// Create generator instance
const generator = new ProductGenerator();

// Generate all products
const allProducts = generator.exportToJSON();

console.log('=== Product Generation Test ===');
console.log(`Total products generated: ${allProducts.products.length}`);
console.log(`Expected products: 327`);
console.log(`Data completeness: ${allProducts.metadata.data_completeness}`);

// Count products by category
const categoryCounts = {};
allProducts.products.forEach(product => {
    const category = product.category_id;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
});

console.log('\n=== Products by Category ===');
Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`${category}: ${count} products`);
});

// Calculate total data points
let totalDataPoints = 0;
allProducts.products.forEach(product => {
    // Count all properties in each product
    totalDataPoints += Object.keys(product).length;
    
    // Count nested objects
    if (product.specifications) totalDataPoints += Object.keys(product.specifications).length;
    if (product.pricing) totalDataPoints += Object.keys(product.pricing).length;
    if (product.inventory) totalDataPoints += Object.keys(product.inventory).length;
    if (product.images) totalDataPoints += Object.keys(product.images).length;
    if (product.documents) totalDataPoints += Object.keys(product.documents).length;
    if (product.applications) totalDataPoints += product.applications.length;
    if (product.compatibility) totalDataPoints += Object.keys(product.compatibility).length;
    if (product.quality) totalDataPoints += Object.keys(product.quality).length;
    if (product.logistics) totalDataPoints += Object.keys(product.logistics).length;
    if (product.tags) totalDataPoints += product.tags.length;
});

console.log(`\nTotal data points: ${totalDataPoints}`);
console.log(`Expected data points: 28,776`);

// Show sample product structure
console.log('\n=== Sample Product Structure ===');
const sampleProduct = allProducts.products[0];
console.log(`Product ID: ${sampleProduct.id}`);
console.log(`Name: ${sampleProduct.name}`);
console.log(`Category: ${sampleProduct.category_id}`);
console.log(`Specification keys: ${Object.keys(sampleProduct.specifications).join(', ')}`);
console.log(`Total properties: ${Object.keys(sampleProduct).length}`);

// Save to file
const fs = require('fs');
fs.writeFileSync('./generated-products.json', JSON.stringify(allProducts, null, 2));
console.log('\nProducts saved to: generated-products.json');
