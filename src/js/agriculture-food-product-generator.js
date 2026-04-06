/**
 * Agriculture & Food Product Generator Extension
 * Mở rộng Product Generator cho ngành nông nghiệp, thực phẩm và nguyên vật liệu
 */

class AgricultureFoodProductGenerator {
    constructor() {
        this.categories = {
            // Cảm biến Nông nghiệp
            soil_sensors: { 
                id: "cat_soil_sensors", 
                name: "Cảm biến đất", 
                name_en: "Soil Sensors", 
                name_ja: "土壌センサー", 
                products: 45 
            },
            weather_sensors: { 
                id: "cat_weather_sensors", 
                name: "Cảm biến thời tiết", 
                name_en: "Weather Sensors", 
                name_ja: "気象センサー", 
                products: 35 
            },
            plant_sensors: { 
                id: "cat_plant_sensors", 
                name: "Cảm biến cây trồng", 
                name_en: "Plant Sensors", 
                name_ja: "植物センサー", 
                products: 30 
            },
            
            // Hệ thống Tưới tiêu
            irrigation_systems: { 
                id: "cat_irrigation_systems", 
                name: "Hệ thống tưới tiêu", 
                name_en: "Irrigation Systems", 
                name_ja: "灌漑システム", 
                products: 55 
            },
            drip_irrigation: { 
                id: "cat_drip_irrigation", 
                name: "Tưới nhỏ giọt", 
                name_en: "Drip Irrigation", 
                name_ja: "点滴灌漑", 
                products: 40 
            },
            sprinkler_systems: { 
                id: "cat_sprinkler_systems", 
                name: "Tưới phun sương", 
                name_en: "Sprinkler Systems", 
                name_ja: "散水システム", 
                products: 35 
            },
            
            // Máy móc Nông nghiệp
            tractors: { 
                id: "cat_tractors", 
                name: "Máy kéo", 
                name_en: "Tractors", 
                name_ja: "トラクター", 
                products: 50 
            },
            harvesters: { 
                id: "cat_harvesters", 
                name: "Máy gặt", 
                name_en: "Harvesters", 
                name_ja: "収穫機", 
                products: 40 
            },
            planters: { 
                id: "cat_planters", 
                name: "Máy trồng", 
                name_en: "Planters", 
                name_ja: "植え付け機", 
                products: 35 
            },
            
            // Drone Nông nghiệp
            agricultural_drones: { 
                id: "cat_agricultural_drones", 
                name: "Drone nông nghiệp", 
                name_en: "Agricultural Drones", 
                name_ja: "農業用ドローン", 
                products: 30 
            },
            spraying_drones: { 
                id: "cat_spraying_drones", 
                name: "Drone phun thuốc", 
                name_en: "Spraying Drones", 
                name_ja: "散布ドローン", 
                products: 25 
            },
            monitoring_drones: { 
                id: "cat_monitoring_drones", 
                name: "Drone giám sát", 
                name_en: "Monitoring Drones", 
                name_ja: "監視ドローン", 
                products: 20 
            },
            
            // Nhà kính thông minh
            greenhouse_control: { 
                id: "cat_greenhouse_control", 
                name: "Điều khiển nhà kính", 
                name_en: "Greenhouse Control", 
                name_ja: "温室制御", 
                products: 45 
            },
            climate_control: { 
                id: "cat_climate_control", 
                name: "Điều khiển khí hậu", 
                name_en: "Climate Control", 
                name_ja: "気候制御", 
                products: 35 
            },
            hydroponic_systems: { 
                id: "cat_hydroponic_systems", 
                name: "Hệ thống thủy canh", 
                name_en: "Hydroponic Systems", 
                name_ja: "水耕システム", 
                products: 40 
            },
            
            // Thiết bị Chế biến Thực phẩm
            food_processors: { 
                id: "cat_food_processors", 
                name: "Máy chế biến thực phẩm", 
                name_en: "Food Processors", 
                name_ja: "食品加工機", 
                products: 60 
            },
            mixers_grinders: { 
                id: "cat_mixers_grinders", 
                name: "Máy trộn, xay", 
                name_en: "Mixers & Grinders", 
                name_ja: "ミキサー・粉砕機", 
                products: 45 
            },
            packaging_machines: { 
                id: "cat_packaging_machines", 
                name: "Máy đóng gói", 
                name_en: "Packaging Machines", 
                name_ja: "包装機", 
                products: 50 
            },
            
            // Hệ thống Thanh trùng
            pasteurizers: { 
                id: "cat_pasteurizers", 
                name: "Hệ thống thanh trùng", 
                name_en: "Pasteurizers", 
                name_ja: "低温殺菌機", 
                products: 35 
            },
            sterilizers: { 
                id: "cat_sterilizers", 
                name: "Hệ thống diệt khuẩn", 
                name_en: "Sterilizers", 
                name_ja: "殺菌器", 
                products: 30 
            },
            
            // Thiết bị Sấy
            drying_equipment: { 
                id: "cat_drying_equipment", 
                name: "Thiết bị sấy", 
                name_en: "Drying Equipment", 
                name_ja: "乾燥装置", 
                products: 40 
            },
            freeze_dryers: { 
                id: "cat_freeze_dryers", 
                name: "Máy sấy thăng hoa", 
                name_en: "Freeze Dryers", 
                name_ja: "凍結乾燥機", 
                products: 25 
            },
            
            // Hệ thống Lạnh
            refrigeration_systems: { 
                id: "cat_refrigeration_systems", 
                name: "Hệ thống lạnh", 
                name_en: "Refrigeration Systems", 
                name_ja: "冷凍システム", 
                products: 45 
            },
            cold_storage: { 
                id: "cat_cold_storage", 
                name: "Kho lạnh", 
                name_en: "Cold Storage", 
                name_ja: "冷蔵倉庫", 
                products: 35 
            },
            
            // Kiểm tra Chất lượng
            quality_control: { 
                id: "cat_quality_control", 
                name: "Kiểm tra chất lượng", 
                name_en: "Quality Control", 
                name_ja: "品質管理", 
                products: 40 
            },
            metal_detectors: { 
                id: "cat_metal_detectors", 
                name: "Machine dò kim loại", 
                name_en: "Metal Detectors", 
                name_ja: "金属探知機", 
                products: 30 
            },
            
            // Phân bón
            fertilizers: { 
                id: "cat_fertilizers", 
                name: "Phân bón", 
                name_en: "Fertilizers", 
                name_ja: "肥料", 
                products: 80 
            },
            npk_fertilizers: { 
                id: "cat_npk_fertilizers", 
                name: "Phân NPK", 
                name_en: "NPK Fertilizers", 
                name_ja: "NPK肥料", 
                products: 50 
            },
            organic_fertilizers: { 
                id: "cat_organic_fertilizers", 
                name: "Phân hữu cơ", 
                name_en: "Organic Fertilizers", 
                name_ja: "有機肥料", 
                products: 30 
            },
            
            // Bảo vệ Thực vật
            pesticides: { 
                id: "cat_pesticides", 
                name: "Thuốc bảo vệ thực vật", 
                name_en: "Pesticides", 
                name_ja: "農薬", 
                products: 70 
            },
            herbicides: { 
                id: "cat_herbicides", 
                name: "Thuốc diệt cỏ", 
                name_en: "Herbicides", 
                name_ja: "除草剤", 
                products: 40 
            },
            fungicides: { 
                id: "cat_fungicides", 
                name: "Thuốc diệt nấm", 
                name_en: "Fungicides", 
                name_ja: "殺菌剤", 
                products: 30 
            },
            
            // Vật tư Đóng gói
            packaging_materials: { 
                id: "cat_packaging_materials", 
                name: "Vật tư đóng gói", 
                name_en: "Packaging Materials", 
                name_ja: "包装資材", 
                products: 60 
            },
            food_packaging: { 
                id: "cat_food_packaging", 
                name: "Bao bì thực phẩm", 
                name_en: "Food Packaging", 
                name_ja: "食品包装", 
                products: 45 
            },
            
            // Hóa chất Công nghiệp
            industrial_chemicals: { 
                id: "cat_industrial_chemicals", 
                name: "Hóa chất công nghiệp", 
                name_en: "Industrial Chemicals", 
                name_ja: "工業薬品", 
                products: 80 
            },
            cleaning_chemicals: { 
                id: "cat_cleaning_chemicals", 
                name: "Hóa chất tẩy rửa", 
                name_en: "Cleaning Chemicals", 
                name_ja: "洗浄剤", 
                products: 50 
            }
        };

        this.manufacturers = {
            // Nông nghiệp
            john_deere: { 
                id: "mfr_john_deere", 
                name: "John Deere", 
                name_en: "John Deere & Company", 
                name_ja: "ジョンディア", 
                country: "USA", 
                reliability: 4.8, 
                lead_time: 30 
            },
            cnh_industrial: { 
                id: "mfr_cnh_industrial", 
                name: "CNH Industrial", 
                name_en: "CNH Industrial N.V.", 
                name_ja: "CNHインダストリアル", 
                country: "Italy", 
                reliability: 4.7, 
                lead_time: 35 
            },
            agco: { 
                id: "mfr_agco", 
                name: "AGCO", 
                name_en: "AGCO Corporation", 
                name_ja: "AGCO", 
                country: "USA", 
                reliability: 4.6, 
                lead_time: 32 
            },
            yara: { 
                id: "mfr_yara", 
                name: "Yara", 
                name_en: "Yara International", 
                name_ja: "ヤラ", 
                country: "Norway", 
                reliability: 4.7, 
                lead_time: 20 
            },
            syngenta: { 
                id: "mfr_syngenta", 
                name: "Syngenta", 
                name_en: "Syngenta AG", 
                name_ja: "シンジェンタ", 
                country: "Switzerland", 
                reliability: 4.6, 
                lead_time: 25 
            },
            
            // Thực phẩm
            gea: { 
                id: "mfr_gea", 
                name: "GEA", 
                name_en: "GEA Group AG", 
                name_ja: "GEAグループ", 
                country: "Germany", 
                reliability: 4.8, 
                lead_time: 28 
            },
            tetra_pak: { 
                id: "mfr_tetra_pak", 
                name: "Tetra Pak", 
                name_en: "Tetra Pak International S.A.", 
                name_ja: "テトラパック", 
                country: "Sweden", 
                reliability: 4.9, 
                lead_time: 25 
            },
            spx_flow: { 
                id: "mfr_spx_flow", 
                name: "SPX Flow", 
                name_en: "SPX Flow Inc.", 
                name_ja: "SPXフロー", 
                country: "USA", 
                reliability: 4.7, 
                lead_time: 30 
            },
            krones: { 
                id: "mfr_krones", 
                name: "Krones", 
                name_en: "Krones AG", 
                name_ja: "クロネス", 
                country: "Germany", 
                reliability: 4.8, 
                lead_time: 35 
            },
            alfa_laval: { 
                id: "mfr_alfa_laval", 
                name: "Alfa Laval", 
                name_en: "Alfa Laval AB", 
                name_ja: "アルファラバル", 
                country: "Sweden", 
                reliability: 4.7, 
                lead_time: 28 
            },
            
            // Hóa chất & Vật tư
            basf: { 
                id: "mfr_basf", 
                name: "BASF", 
                name_en: "BASF SE", 
                name_ja: "BASF", 
                country: "Germany", 
                reliability: 4.8, 
                lead_time: 22 
            },
            dow_chemical: { 
                id: "mfr_dow_chemical", 
                name: "Dow Chemical", 
                name_en: "Dow Chemical Company", 
                name_ja: "ダウケミカル", 
                country: "USA", 
                reliability: 4.6, 
                lead_time: 25 
            },
            dupont: { 
                id: "mfr_dupont", 
                name: "DuPont", 
                name_en: "DuPont de Nemours", 
                name_ja: "デュポン", 
                country: "USA", 
                reliability: 4.7, 
                lead_time: 24 
            },
            three_m: { 
                id: "mfr_three_m", 
                name: "3M", 
                name_en: "3M Company", 
                name_ja: "スリーエム", 
                country: "USA", 
                reliability: 4.8, 
                lead_time: 20 
            }
        };

        this.productTemplates = {
            // Cảm biến đất
            soil_sensors: {
                types: ["Moisture", "pH", "Temperature", "EC", "Nitrogen"],
                measurement_ranges: ["0-100%", "0-14 pH", "-20 to 60°C", "0-5 mS/cm", "0-200 mg/kg"],
                accuracies: ["±2%", "±0.1 pH", "±0.5°C", "±0.05 mS/cm", "±5 mg/kg"],
                outputs: ["4-20mA", "0-10V", "Digital", "LoRa", "Zigbee"]
            },
            
            // Hệ thống tưới
            irrigation_systems: {
                types: ["Drip", "Sprinkler", "Flood", "Micro-spray"],
                flow_rates: ["10-100 L/h", "100-1000 L/h", "1000-10000 L/h"],
                pressure_ranges: ["1-3 bar", "2-5 bar", "3-8 bar"],
                control_methods: ["Manual", "Timer", "Sensor-based", "Smart"]
            },
            
            // Máy móc nông nghiệp
            tractors: {
                types: ["Utility", "Row Crop", "4WD", "Compact"],
                power_ratings: ["50-100 HP", "100-200 HP", "200-400 HP", "20-50 HP"],
                transmissions: ["Manual", "Power Shift", "CVT", "Hydrostatic"],
                cabin_types: ["Open", "AC Cabin", "Premium Cabin"]
            },
            
            // Drone nông nghiệp
            agricultural_drones: {
                types: ["Multi-rotor", "Fixed-wing", "Hybrid"],
                flight_times: ["20-30 min", "45-60 min", "30-45 min"],
                payloads: ["5-10 kg", "10-20 kg", "2-5 kg"],
                applications: ["Spraying", "Monitoring", "Mapping", "Seeding"]
            },
            
            // Máy chế biến thực phẩm
            food_processors: {
                types: ["Grinder", "Mixer", "Cutter", "Separator"],
                capacities: ["50-100 kg/h", "100-500 kg/h", "500-2000 kg/h"],
                power_ratings: ["1-5 kW", "5-15 kW", "15-50 kW"],
                materials: ["Stainless Steel 304", "Stainless Steel 316", "Food Grade Plastic"]
            },
            
            // Phân bón
            fertilizers: {
                types: ["NPK", "Urea", "Ammonium Nitrate", "Organic"],
                npk_ratios: ["20-20-20", "16-16-16", "15-5-25", "10-10-10"],
                forms: ["Granular", "Liquid", "Powder", "Slow-release"],
                applications: ["Base", "Top-dress", "Fertigation", "Foliar"]
            }
        };
    }

    // Tính tổng số sản phẩm
    getTotalProducts() {
        return Object.values(this.categories).reduce((total, category) => total + category.products, 0);
    }

    // Lấy thông tin category
    getCategory(categoryId) {
        return this.categories[categoryId];
    }

    // Lấy thông tin manufacturer
    getManufacturer(manufacturerId) {
        return this.manufacturers[manufacturerId];
    }

    // Tạo sản phẩm mẫu
    generateSampleProduct(categoryId, manufacturerId) {
        const category = this.getCategory(categoryId);
        const manufacturer = this.getManufacturer(manufacturerId);
        
        if (!category || !manufacturer) {
            return null;
        }

        return {
            id: `${categoryId.substring(4)}001-001`,
            sku: `${categoryId.substring(4)}001-001`,
            name: `Sản phẩm mẫu ${category.name}`,
            name_en: `Sample Product ${category.name_en}`,
            name_ja: `サンプル製品 ${category.name_ja}`,
            category_id: categoryId,
            manufacturer_id: manufacturerId,
            brand: manufacturer.name,
            status: "active",
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString()
        };
    }

    // Export ra file JSON
    exportToFile(filename = "agriculture-food-products.json") {
        const data = {
            metadata: {
                version: "1.0",
                generated_date: new Date().toISOString(),
                total_products: this.getTotalProducts(),
                total_categories: Object.keys(this.categories).length,
                total_manufacturers: Object.keys(this.manufacturers).length,
                description: "Agriculture & Food Product Database Generator"
            },
            categories: this.categories,
            manufacturers: this.manufacturers,
            product_templates: this.productTemplates
        };

        // Trong môi trường thực tế, sẽ dùng fs.writeFileSync
        console.log(`Exporting to ${filename}:`);
        console.log(`- Total Products: ${data.metadata.total_products}`);
        console.log(`- Total Categories: ${data.metadata.total_categories}`);
        console.log(`- Total Manufacturers: ${data.metadata.total_manufacturers}`);
        
        return data;
    }
}

// Sử dụng
const agriFoodGenerator = new AgricultureFoodProductGenerator();
console.log("=== Agriculture & Food Product Generator ===");
console.log(`Total Products: ${agriFoodGenerator.getTotalProducts()}`);
console.log(`Total Categories: ${Object.keys(agriFoodGenerator.categories).length}`);
console.log(`Total Manufacturers: ${Object.keys(agriFoodGenerator.manufacturers).length}`);

// Export data
const exportData = agriFoodGenerator.exportToFile();

module.exports = AgricultureFoodProductGenerator;
