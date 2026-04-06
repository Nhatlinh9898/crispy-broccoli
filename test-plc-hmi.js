/**
 * Test the PLC & HMI implementation
 */

const UltimateProductGenerator = require('./src/js/product-generator-1000.js');

console.log('🚀 Testing PLC & HMI implementation...\n');

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
    
    // Show sample PLCs
    const plcs = database.products.filter(p => p.category_id === 'cat_plcs');
    console.log('\n🔧 Sample PLCs:');
    plcs.slice(0, 3).forEach((plc, index) => {
        console.log(`   ${index + 1}. ${plc.name_en} - ${plc.pricing.base_price.toLocaleString()} VND`);
        console.log(`      Spec: ${plc.specifications.basic.plc_series}, ${plc.specifications.basic.io_points}, ${plc.specifications.basic.communication}`);
    });
    
    // Show sample HMIs
    const hmis = database.products.filter(p => p.category_id === 'cat_hmis');
    console.log('\n🖥️ Sample HMIs:');
    hmis.slice(0, 3).forEach((hmi, index) => {
        console.log(`   ${index + 1}. ${hmi.name_en} - ${hmi.pricing.base_price.toLocaleString()} VND`);
        console.log(`      Spec: ${hmi.specifications.basic.hmi_type}, ${hmi.specifications.basic.display_size}, ${hmi.specifications.basic.resolution}`);
    });
    
    // Verify we have the expected number of PLCs and HMIs
    const expectedPLCs = 45;
    const expectedHMIs = 35;
    
    console.log('\n✅ Verification:');
    console.log(`   PLCs generated: ${plcs.length}/${expectedPLCs} ${plcs.length === expectedPLCs ? '✅' : '❌'}`);
    console.log(`   HMIs generated: ${hmis.length}/${expectedHMIs} ${hmis.length === expectedHMIs ? '✅' : '❌'}`);
    
    // Calculate progress toward 1000+ products
    const totalProducts = database.metadata.total_products;
    const targetProducts = 1000;
    const progress = ((totalProducts / targetProducts) * 100).toFixed(1);
    const remaining = targetProducts - totalProducts;
    
    console.log('\n📊 Progress toward 1000+ products:');
    console.log(`   Current total: ${totalProducts} products`);
    console.log(`   Progress: ${progress}%`);
    console.log(`   Remaining needed: ${remaining} products`);
    
    if (plcs.length === expectedPLCs && hmis.length === expectedHMIs) {
        console.log('\n🎉 PLC & HMI implementation completed successfully!');
    } else {
        console.log('\n❌ Some products may be missing.');
    }
    
} catch (error) {
    console.error('❌ Error testing generator:', error.message);
    console.error(error.stack);
}
