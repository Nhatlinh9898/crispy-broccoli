/**
 * Generate and save the complete database with Flow & Level Sensors
 */

const UltimateProductGenerator = require('./src/js/product-generator-1000.js');
const fs = require('fs');

console.log('🚀 Generating complete database with Flow & Level Sensors...\n');

try {
    const generator = new UltimateProductGenerator();
    const completeDatabase = generator.exportToJSON();
    
    // Save to file
    const filename = 'complete-product-database-with-flow-level.json';
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
    const flowSensors = completeDatabase.products.filter(p => p.category_id === 'cat_flow_sensors');
    const levelSensors = completeDatabase.products.filter(p => p.category_id === 'cat_level_sensors');
    
    console.log('\n💧 Sample Flow Sensors:');
    flowSensors.slice(0, 2).forEach((sensor, index) => {
        console.log(`   ${index + 1}. ${sensor.name_en}`);
        console.log(`      Price: ${sensor.pricing.base_price} VND`);
        console.log(`      Spec: ${sensor.specifications.basic.sensor_type}, ${sensor.specifications.basic.flow_range}`);
    });
    
    console.log('\n📏 Sample Level Sensors:');
    levelSensors.slice(0, 2).forEach((sensor, index) => {
        console.log(`   ${index + 1}. ${sensor.name_en}`);
        console.log(`      Price: ${sensor.pricing.base_price} VND`);
        console.log(`      Spec: ${sensor.specifications.basic.sensor_type}, ${sensor.specifications.basic.measuring_range}`);
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
    
    console.log('\n🎉 Flow & Level Sensors implementation completed successfully!');
    console.log('📝 Ready for integration with the main system.');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
}
