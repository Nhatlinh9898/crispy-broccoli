// Usage example as requested
const ProductGenerator = require('./src/js/product-generator-fixed.js');

const generator = new ProductGenerator();
const allProducts = generator.exportToJSON();
// Tạo ra 327 sản phẩm với 28,776 data points

console.log(`Generated ${allProducts.metadata.total_products} products`);
console.log(`Data points: ${Object.keys(allProducts.products[0]).length * allProducts.products.length}`);
console.log('Products saved to generated-products.json');
