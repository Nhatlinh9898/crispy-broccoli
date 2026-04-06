/**
 * Generate and save the complete database with PLC & HMI
 */

const UltimateProductGenerator = require('./src/js/product-generator-1000.js');
const fs = require('fs');

console.log('🚀 Generating complete database with PLC & HMI...\n');

try {
    const generator = new UltimateProductGenerator();
    const completeDatabase = generator.exportToJSON();
    
    // Save to file
    const filename = 'complete-product-database-with-plc-hmi.json';
    fs.writeFileSync(filename, JSON.stringify(completeDatabase, null, 2));
    
    console.log('✅ Database generated successfully!');
    console.log(`📊 Total products: ${completeDatabase.metadata.total_products}`);
    console.log(`💾 Saved to: ${filename}`);
    
    // Show summary by category
    const categoryCounts = {};
    completeDatabase.products.forEach(product => {
        const categoryId = product.category_id;
        const categoryName = product.subcategory_en || categoryId;
        categoryCounts[categoryId] = {
            name: categoryName,
            count: (categoryCounts[categoryId]?.count || 0) + 1
        };
    });
    
    console.log('\n📈 Products by category:');
    Object.entries(categoryCounts)
        .sort(([,a], [,b]) => b.count - a.count)
        .forEach(([id, info]) => {
            console.log(`   ${info.name}: ${info.count} products`);
        });
    
    // Show some sample products from each new category
    const plcs = completeDatabase.products.filter(p => p.category_id === 'cat_plcs');
    const hmis = completeDatabase.products.filter(p => p.category_id === 'cat_hmis');
    
    console.log('\n🔧 Sample PLCs:');
    plcs.slice(0, 2).forEach((plc, index) => {
        console.log(`   ${index + 1}. ${plc.name_en}`);
        console.log(`      Price: ${plc.pricing.base_price.toLocaleString()} VND`);
        console.log(`      Spec: ${plc.specifications.basic.plc_series}, ${plc.specifications.basic.io_points}, ${plc.specifications.basic.communication}`);
    });
    
    console.log('\n🖥️ Sample HMIs:');
    hmis.slice(0, 2).forEach((hmi, index) => {
        console.log(`   ${index + 1}. ${hmi.name_en}`);
        console.log(`      Price: ${hmi.pricing.base_price.toLocaleString()} VND`);
        console.log(`      Spec: ${hmi.specifications.basic.hmi_type}, ${hmi.specifications.basic.display_size}, ${hmi.specifications.basic.resolution}`);
    });
    
    // Progress toward 1000+ products
    const totalProducts = completeDatabase.metadata.total_products;
    const targetProducts = 1000;
    const progress = ((totalProducts / targetProducts) * 100).toFixed(1);
    const remaining = targetProducts - totalProducts;
    
    console.log('\n📊 Progress toward 1000+ products:');
    console.log(`   Current total: ${totalProducts} products`);
    console.log(`   Progress: ${progress}%`);
    console.log(`   Remaining needed: ${remaining} products`);
    
    console.log('\n🎉 PLC & HMI implementation completed successfully!');
    console.log('📝 Ready for integration with the main system.');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
}
