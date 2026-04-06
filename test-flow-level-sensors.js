/**
 * Test the Flow & Level Sensors implementation
 */

const UltimateProductGenerator = require('./src/js/product-generator-1000.js');

console.log('🚀 Testing Flow & Level Sensors implementation...\n');

try {
    const generator = new UltimateProductGenerator();
    const database = generator.exportToJSON();
    
    console.log('✅ Generator initialized successfully!');
    console.log(`📊 Total products generated: ${database.metadata.total_products}`);
    
    // Count products by category
    const categoryCounts = {};
    database.products.forEach(product => {
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
    
    // Show sample Flow Sensors
    const flowSensors = database.products.filter(p => p.category_id === 'cat_flow_sensors');
    console.log('\n💧 Sample Flow Sensors:');
    flowSensors.slice(0, 3).forEach((sensor, index) => {
        console.log(`   ${index + 1}. ${sensor.name_en} - ${sensor.pricing.base_price} VND`);
        console.log(`      Spec: ${sensor.specifications.basic.sensor_type}, ${sensor.specifications.basic.flow_range}`);
    });
    
    // Show sample Level Sensors
    const levelSensors = database.products.filter(p => p.category_id === 'cat_level_sensors');
    console.log('\n📏 Sample Level Sensors:');
    levelSensors.slice(0, 3).forEach((sensor, index) => {
        console.log(`   ${index + 1}. ${sensor.name_en} - ${sensor.pricing.base_price} VND`);
        console.log(`      Spec: ${sensor.specifications.basic.sensor_type}, ${sensor.specifications.basic.measuring_range}`);
    });
    
    // Verify we have the expected number of flow and level sensors
    const expectedFlowSensors = 30;
    const expectedLevelSensors = 25;
    
    console.log('\n✅ Verification:');
    console.log(`   Flow Sensors generated: ${flowSensors.length}/${expectedFlowSensors} ${flowSensors.length === expectedFlowSensors ? '✅' : '❌'}`);
    console.log(`   Level Sensors generated: ${levelSensors.length}/${expectedLevelSensors} ${levelSensors.length === expectedLevelSensors ? '✅' : '❌'}`);
    
    // Calculate progress toward 1000+ products
    const totalProducts = database.metadata.total_products;
    const targetProducts = 1000;
    const progress = ((totalProducts / targetProducts) * 100).toFixed(1);
    const remaining = targetProducts - totalProducts;
    
    console.log('\n📊 Progress toward 1000+ products:');
    console.log(`   Current total: ${totalProducts} products`);
    console.log(`   Progress: ${progress}%`);
    console.log(`   Remaining needed: ${remaining} products`);
    
    if (flowSensors.length === expectedFlowSensors && levelSensors.length === expectedLevelSensors) {
        console.log('\n🎉 Flow & Level Sensors implementation completed successfully!');
    } else {
        console.log('\n❌ Some products may be missing.');
    }
    
} catch (error) {
    console.error('❌ Error testing generator:', error.message);
    console.error(error.stack);
}
