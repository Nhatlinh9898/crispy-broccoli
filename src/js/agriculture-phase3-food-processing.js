/**
 * Phase 3: Food Processing Equipment Generator
 * Thiết bị chế biến thực phẩm
 */

class FoodProcessingEquipmentGenerator {
    constructor() {
        this.categories = {
            // Thiết bị chế biến chính
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
            
            // Hệ thống thanh trùng
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
            
            // Thiết bị sấy
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
            
            // Hệ thống lạnh
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
            
            // Kiểm tra chất lượng
            quality_control: { 
                id: "cat_quality_control", 
                name: "Kiểm tra chất lượng", 
                name_en: "Quality Control", 
                name_ja: "品質管理", 
                products: 40 
            },
            metal_detectors: { 
                id: "cat_metal_detectors", 
                name: "Máy dò kim loại", 
                name_en: "Metal Detectors", 
                name_ja: "金属探知機", 
                products: 30 
            },
            x_ray_inspectors: { 
                id: "cat_x_ray_inspectors", 
                name: "Máy kiểm tra X-ray", 
                name_en: "X-ray Inspectors", 
                name_ja: "X線検査機", 
                products: 25 
            }
        };

        this.manufacturers = {
            // Thiết bị chế biến thực phẩm hàng đầu
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
            buhler: { 
                id: "mfr_buhler", 
                name: "Bühler", 
                name_en: "Bühler AG", 
                name_ja: "ビューラー", 
                country: "Switzerland", 
                reliability: 4.8, 
                lead_time: 32 
            },
            fmc: { 
                id: "mfr_fmc", 
                name: "FMC", 
                name_en: "FMC Technologies", 
                name_ja: "FMCテクノロジーズ", 
                country: "USA", 
                reliability: 4.6, 
                lead_time: 30 
            },
            marel: { 
                id: "mfr_marel", 
                name: "Marel", 
                name_en: "Marel hf.", 
                name_ja: "マレル", 
                country: "Iceland", 
                reliability: 4.7, 
                lead_time: 28 
            },
            heat_and_control: { 
                id: "mfr_heat_and_control", 
                name: "Heat and Control", 
                name_en: "Heat and Control Inc.", 
                name_ja: "ヒート・アンド・コントロール", 
                country: "USA", 
                reliability: 4.5, 
                lead_time: 25 
            },
            coperion: { 
                id: "mfr_coperion", 
                name: "Coperion", 
                name_en: "Coperion GmbH", 
                name_ja: "コペリオン", 
                country: "Germany", 
                reliability: 4.7, 
                lead_time: 30 
            },
            loma: { 
                id: "mfr_loma", 
                name: "Loma", 
                name_en: "Loma Systems", 
                name_ja: "ロマシステムズ", 
                country: "UK", 
                reliability: 4.6, 
                lead_time: 22 
            },
            anritsu: { 
                id: "mfr_anritsu", 
                name: "Anritsu", 
                name_en: "Anritsu Infivis", 
                name_ja: "アンリツ", 
                country: "Japan", 
                reliability: 4.8, 
                lead_time: 20 
            },
            mettler_toledo: { 
                id: "mfr_mettler_toledo", 
                name: "Mettler Toledo", 
                name_en: "Mettler-Toledo International", 
                name_ja: "メトラートレド", 
                country: "Switzerland", 
                reliability: 4.9, 
                lead_time: 18 
            },
            bosch: { 
                id: "mfr_bosch", 
                name: "Bosch", 
                name_en: "Bosch Packaging Technology", 
                name_ja: "ボッシュ", 
                country: "Germany", 
                reliability: 4.8, 
                lead_time: 25 
            }
        };

        this.productTemplates = {
            food_processors: {
                types: ["Cutting", "Slicing", "Dicing", "Grinding", "Mixing", "Blending"],
                capacities: ["50-100 kg/h", "100-500 kg/h", "500-2000 kg/h", "2000-5000 kg/h"],
                power_ratings: ["1-5 kW", "5-15 kW", "15-50 kW", "50-100 kW"],
                materials: ["Stainless Steel 304", "Stainless Steel 316", "Food Grade Plastic", "Titanium"],
                control_types: ["Manual", "Semi-automatic", "Fully automatic", "PLC controlled"]
            },
            
            mixers_grinders: {
                types: ["Ribbon Mixer", "Planetary Mixer", "Screw Mixer", "Paddle Mixer", "Hammer Mill", "Colloid Mill"],
                capacities: ["100L", "200L", "500L", "1000L", "2000L", "5000L"],
                mixing_speeds: ["10-50 RPM", "20-100 RPM", "50-200 RPM", "100-500 RPM"],
                power_requirements: ["3-10 kW", "10-30 kW", "30-75 kW", "75-150 kW"],
                heating_cooling: ["Ambient", "Heated", "Cooled", "Heated & Cooled"],
                vacuum_capability: ["No", "Optional", "Standard", "Advanced"]
            },
            
            packaging_machines: {
                types: ["Form-Fill-Seal", "Vertical Form-Fill-Seal", "Horizontal Flow Wrapper", "Case Packer", "Palletizer"],
                packaging_materials: ["PET", "PP", "PE", "Aluminum", "Paper", "Multi-layer"],
                speeds: ["10-50 packs/min", "50-100 packs/min", "100-200 packs/min", "200-500 packs/min"],
                product_types: ["Liquid", "Powder", "Granular", "Solid", "Viscous"],
                sealing_methods: ["Heat sealing", "Ultrasonic", "Induction", "Adhesive"],
                automation_levels: ["Manual", "Semi-automatic", "Fully automatic", "Robot integrated"]
            },
            
            pasteurizers: {
                types: ["HTST", "Batch", "Tunnel", "Plate", "Tubular"],
                capacities: ["100-500 L/h", "500-2000 L/h", "2000-10000 L/h", "10000-50000 L/h"],
                temperature_ranges: ["60-85°C", "72-95°C", "85-140°C", "100-150°C"],
                holding_times: ["15-30s", "20-45s", "30-60s", "2-5min"],
                heating_methods: ["Steam", "Hot water", "Electric", "Microwave"],
                control_systems: ["Manual", "Automatic", "PLC", "SCADA integrated"]
            },
            
            sterilizers: {
                types: ["Steam", "Autoclave", "Retort", "Dry heat", "Chemical"],
                capacities: ["50-100L", "100-500L", "500-2000L", "2000-10000L"],
                temperatures: ["121°C", "134°C", "140°C", "160°C"],
                pressures: ["1 bar", "2 bar", "3 bar", "4 bar"],
                cycle_times: ["30-60 min", "45-90 min", "60-120 min", "90-180 min"],
                loading_types: ["Static", "Dynamic", "Rotary", "Basket"]
            },
            
            drying_equipment: {
                types: ["Tray Dryer", "Rotary Dryer", "Fluid Bed Dryer", "Spray Dryer", "Drum Dryer"],
                capacities: ["50-200 kg/h", "200-500 kg/h", "500-2000 kg/h", "2000-10000 kg/h"],
                drying_methods: ["Hot air", "Vacuum", "Microwave", "Infrared", "Freeze"],
                temperature_ranges: ["30-80°C", "40-120°C", "60-150°C", "80-200°C"],
            humidity_control: ["No", "Basic", "Advanced", "Precision"],
                energy_sources: ["Electric", "Gas", "Steam", "Oil", "Hybrid"]
            },
            
            freeze_dryers: {
                types: ["Batch", "Continuous", "Pilot", "Industrial"],
                capacities: ["10-50 kg", "50-200 kg", "200-500 kg", "500-2000 kg"],
                shelf_temperatures: ["-40 to 20°C", "-50 to 30°C", "-60 to 40°C", "-70 to 50°C"],
                vacuum_levels: ["100-200 mbar", "50-100 mbar", "10-50 mbar", "1-10 mbar"],
                cycle_times: ["12-24h", "18-36h", "24-48h", "36-72h"],
                condenser_capacities: ["50 kg", "100 kg", "200 kg", "500 kg"]
            },
            
            refrigeration_systems: {
                types: ["Compressor", "Absorption", "Cascade", "Hybrid"],
                cooling_capacities: ["5-20 kW", "20-50 kW", "50-200 kW", "200-500 kW"],
                refrigerants: ["R134a", "R404A", "R717", "CO2", "Natural"],
                temperature_ranges: ["0 to 10°C", "-5 to 5°C", "-20 to 0°C", "-40 to -20°C"],
                control_methods: ["Mechanical", "Electronic", "PLC", "Smart control"],
                efficiency_ratings: ["Standard", "High efficiency", "Premium", "Ultra efficient"]
            },
            
            cold_storage: {
                types: ["Blast Freezer", "Storage Freezer", "Cold Room", "Refrigerated Warehouse"],
                capacities: ["10-50 m³", "50-200 m³", "200-1000 m³", "1000-5000 m³"],
                temperatures: ["-30°C", "-20°C", "0°C", "4°C"],
                humidity_ranges: ["30-60%", "40-70%", "50-80%", "60-90%"],
                door_types: ["Hinged", "Sliding", "Roll-up", "Automatic"],
                monitoring_systems: ["Basic", "Advanced", "Remote", "IoT integrated"]
            },
            
            quality_control: {
                types: ["Vision System", "Weight Checker", "Contamination Detector", "Fill Level Inspector"],
                inspection_speeds: ["10-50 items/min", "50-100 items/min", "100-200 items/min", "200-500 items/min"],
                detection_methods: ["Optical", "X-ray", "Ultrasonic", "Magnetic", "Weight-based"],
                product_types: ["Solid", "Liquid", "Powder", "Granular", "Viscous"],
                rejection_systems: ["Air blast", "Pusher", "Arm reject", "Divert gate"],
                data_logging: ["Basic", "Advanced", "Statistical", "Real-time analytics"]
            },
            
            metal_detectors: {
                types: ["Conveyor", "Pipeline", "Pharmaceutical", "Gravity Fall"],
                sensitivities: ["Fe 1.0mm", "Fe 0.8mm", "Fe 0.5mm", "Fe 0.3mm"],
                aperture_sizes: ["200x100mm", "300x150mm", "400x200mm", "500x250mm"],
                product_types: ["Food", "Pharmaceutical", "Textile", "Plastic"],
                rejection_systems: ["Air blast", "Pusher", "Arm", "Divert"],
                certification_levels: ["Basic", "HACCP", "FDA", "IFS"]
            },
            
            x_ray_inspectors: {
                types: ["Conveyor", "Bulk", "Pipeline", "Jar inspection"],
                x_ray_sources: ["50W", "100W", "150W", "200W"],
                detection_capabilities: ["Metal", "Glass", "Stone", "Dense plastic", "Bone"],
                product_sizes: ["Small", "Medium", "Large", "Variable"],
                inspection_speeds: ["10-30 m/min", "30-60 m/min", "60-120 m/min", "120-240 m/min"],
                image_processing: ["Basic", "Advanced", "AI enhanced", "Deep learning"]
            }
        };
    }

    // Generate Food Processor
    generateFoodProcessor(type, capacity, power, material, control, index) {
        const id = `FP${String(index + 1).padStart(3, '0')}-001`;
        const sku = `FP${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `GEA-FP-${type}-${capacity}-${power}`;
        
        return {
            id,
            sku,
            name: `Máy chế biến ${type} ${capacity} ${material}`,
            name_en: `${type} Food Processor ${capacity} ${material}`,
            name_ja: `${type}食品加工機 ${capacity} ${material}`,
            short_description: `Máy chế biến ${type} công suất ${power}, dung tích ${capacity}, vật liệu ${material}`,
            short_description_en: `${type} food processor ${power} power, ${capacity} capacity, ${material} construction`,
            short_description_ja: `${type}食品加工機 ${power}出力、${capacity}容量、${material}構造`,
            long_description: this.generateFoodProcessorDescription(type, capacity, power, material),
            long_description_en: this.generateFoodProcessorDescriptionEn(type, capacity, power, material),
            long_description_ja: this.generateFoodProcessorDescriptionJa(type, capacity, power, material),
            category_id: "cat_food_processors",
            subcategory: "Food Processors",
            subcategory_en: "Food Processors",
            subcategory_ja: "食品加工機",
            manufacturer_id: "mfr_gea",
            brand: "GEA",
            part_number: partNumber,
            specifications: this.generateFoodProcessorSpecs(type, capacity, power, material, control),
            pricing: this.generatePricing(this.getFoodProcessorPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateFoodProcessorApplications(type),
            compatibility: this.generateFoodProcessorCompatibility(control),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getFoodProcessorWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateFoodProcessorTags(type, capacity)
        };
    }

    // Generate Mixer/Grinder
    generateMixerGrinder(type, capacity, speed, power, heatingCooling, vacuum, index) {
        const id = `MG${String(index + 1).padStart(3, '0')}-001`;
        const sku = `MG${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `BU-MG-${type}-${capacity}-${speed}`;
        
        return {
            id,
            sku,
            name: `Máy trộn/xay ${type} ${capacity} ${speed}`,
            name_en: `${type} Mixer/Grinder ${capacity} ${speed}`,
            name_ja: `${type}ミキサー・粉砕機 ${capacity} ${speed}`,
            short_description: `Máy trộn/xay ${type} dung tích ${capacity}, tốc độ ${speed}, công suất ${power}`,
            short_description_en: `${type} mixer/grinder ${capacity} capacity, ${speed} speed, ${power} power`,
            short_description_ja: `${type}ミキサー・粉砕機 ${capacity}容量、${speed}速度、${power}出力`,
            long_description: this.generateMixerGrinderDescription(type, capacity, speed, heatingCooling),
            long_description_en: this.generateMixerGrinderDescriptionEn(type, capacity, speed, heatingCooling),
            long_description_ja: this.generateMixerGrinderDescriptionJa(type, capacity, speed, heatingCooling),
            category_id: "cat_mixers_grinders",
            subcategory: "Mixers & Grinders",
            subcategory_en: "Mixers & Grinders",
            subcategory_ja: "ミキサー・粉砕機",
            manufacturer_id: "mfr_buhler",
            brand: "Bühler",
            part_number: partNumber,
            specifications: this.generateMixerGrinderSpecs(type, capacity, speed, power, heatingCooling, vacuum),
            pricing: this.generatePricing(this.getMixerGrinderPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateMixerGrinderApplications(type),
            compatibility: this.generateMixerGrinderCompatibility(vacuum),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getMixerGrinderWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateMixerGrinderTags(type, capacity)
        };
    }

    // Generate Packaging Machine
    generatePackagingMachine(type, material, speed, productType, sealing, automation, index) {
        const id = `PK${String(index + 1).padStart(3, '0')}-001`;
        const sku = `PK${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `KR-PK-${type}-${material}-${speed}`;
        
        return {
            id,
            sku,
            name: `Máy đóng gói ${type} ${material} ${speed}`,
            name_en: `${type} Packaging Machine ${material} ${speed}`,
            name_ja: `${type}包装機 ${material} ${speed}`,
            short_description: `Máy đóng gói ${type} vật liệu ${material}, tốc độ ${speed}, sản phẩm ${productType}`,
            short_description_en: `${type} packaging machine ${material} material, ${speed} speed, ${productType} product`,
            short_description_ja: `${type}包装機 ${material}材料、${speed}速度、${productType}製品`,
            long_description: this.generatePackagingMachineDescription(type, material, speed, sealing),
            long_description_en: this.generatePackagingMachineDescriptionEn(type, material, speed, sealing),
            long_description_ja: this.generatePackagingMachineDescriptionJa(type, material, speed, sealing),
            category_id: "cat_packaging_machines",
            subcategory: "Packaging Machines",
            subcategory_en: "Packaging Machines",
            subcategory_ja: "包装機",
            manufacturer_id: "mfr_krones",
            brand: "Krones",
            part_number: partNumber,
            specifications: this.generatePackagingMachineSpecs(type, material, speed, productType, sealing, automation),
            pricing: this.generatePricing(this.getPackagingMachinePrice(type, speed)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generatePackagingMachineApplications(type),
            compatibility: this.generatePackagingMachineCompatibility(automation),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getPackagingMachineWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generatePackagingMachineTags(type, material)
        };
    }

    // Generate Pasteurizer
    generatePasteurizer(type, capacity, temperature, holdingTime, heating, control, index) {
        const id = `PT${String(index + 1).padStart(3, '0')}-001`;
        const sku = `PT${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `AL-PT-${type}-${capacity}-${temperature}`;
        
        return {
            id,
            sku,
            name: `Máy thanh trùng ${type} ${capacity} ${temperature}`,
            name_en: `${type} Pasteurizer ${capacity} ${temperature}`,
            name_ja: `${type}低温殺菌機 ${capacity} ${temperature}`,
            short_description: `Máy thanh trùng ${type} dung tích ${capacity}, nhiệt độ ${temperature}, giữ ${holdingTime}`,
            short_description_en: `${type} pasteurizer ${capacity} capacity, ${temperature} temperature, ${holdingTime} holding`,
            short_description_ja: `${type}低温殺菌機 ${capacity}容量、${temperature}温度、${holdingTime}保持`,
            long_description: this.generatePasteurizerDescription(type, capacity, temperature, holdingTime),
            long_description_en: this.generatePasteurizerDescriptionEn(type, capacity, temperature, holdingTime),
            long_description_ja: this.generatePasteurizerDescriptionJa(type, capacity, temperature, holdingTime),
            category_id: "cat_pasteurizers",
            subcategory: "Pasteurizers",
            subcategory_en: "Pasteurizers",
            subcategory_ja: "低温殺菌機",
            manufacturer_id: "mfr_alfa_laval",
            brand: "Alfa Laval",
            part_number: partNumber,
            specifications: this.generatePasteurizerSpecs(type, capacity, temperature, holdingTime, heating, control),
            pricing: this.generatePricing(this.getPasteurizerPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generatePasteurizerApplications(type),
            compatibility: this.generatePasteurizerCompatibility(control),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getPasteurizerWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generatePasteurizerTags(type, capacity)
        };
    }

    // Generate Sterilizer
    generateSterilizer(type, capacity, temperature, pressure, cycleTime, loading, index) {
        const id = `ST${String(index + 1).padStart(3, '0')}-001`;
        const sku = `ST${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `SPX-ST-${type}-${capacity}-${temperature}`;
        
        return {
            id,
            sku,
            name: `Máy diệt khuẩn ${type} ${capacity} ${temperature}`,
            name_en: `${type} Sterilizer ${capacity} ${temperature}`,
            name_ja: `${type}殺菌器 ${capacity} ${temperature}`,
            short_description: `Máy diệt khuẩn ${type} dung tích ${capacity}, nhiệt độ ${temperature}, áp suất ${pressure}`,
            short_description_en: `${type} sterilizer ${capacity} capacity, ${temperature} temperature, ${pressure} pressure`,
            short_description_ja: `${type}殺菌器 ${capacity}容量、${temperature}温度、${pressure}圧力`,
            long_description: this.generateSterilizerDescription(type, capacity, temperature, cycleTime),
            long_description_en: this.generateSterilizerDescriptionEn(type, capacity, temperature, cycleTime),
            long_description_ja: this.generateSterilizerDescriptionJa(type, capacity, temperature, cycleTime),
            category_id: "cat_sterilizers",
            subcategory: "Sterilizers",
            subcategory_en: "Sterilizers",
            subcategory_ja: "殺菌器",
            manufacturer_id: "mfr_spx_flow",
            brand: "SPX Flow",
            part_number: partNumber,
            specifications: this.generateSterilizerSpecs(type, capacity, temperature, pressure, cycleTime, loading),
            pricing: this.generatePricing(this.getSterilizerPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateSterilizerApplications(type),
            compatibility: this.generateSterilizerCompatibility(loading),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getSterilizerWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateSterilizerTags(type, capacity)
        };
    }

    // Generate Drying Equipment
    generateDryingEquipment(type, capacity, method, temperature, humidity, energy, index) {
        const id = `DR${String(index + 1).padStart(3, '0')}-001`;
        const sku = `DR${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `HC-DR-${type}-${capacity}-${method}`;
        
        return {
            id,
            sku,
            name: `Thiết bị sấy ${type} ${capacity} ${method}`,
            name_en: `${type} Drying Equipment ${capacity} ${method}`,
            name_ja: `${type}乾燥装置 ${capacity} ${method}`,
            short_description: `Thiết bị sấy ${type} công suất ${capacity}, phương pháp ${method}, nhiệt độ ${temperature}`,
            short_description_en: `${type} drying equipment ${capacity} capacity, ${method} method, ${temperature} temperature`,
            short_description_ja: `${type}乾燥装置 ${capacity}容量、${method}方法、${temperature}温度`,
            long_description: this.generateDryingEquipmentDescription(type, capacity, method, temperature),
            long_description_en: this.generateDryingEquipmentDescriptionEn(type, capacity, method, temperature),
            long_description_ja: this.generateDryingEquipmentDescriptionJa(type, capacity, method, temperature),
            category_id: "cat_drying_equipment",
            subcategory: "Drying Equipment",
            subcategory_en: "Drying Equipment",
            subcategory_ja: "乾燥装置",
            manufacturer_id: "mfr_heat_and_control",
            brand: "Heat and Control",
            part_number: partNumber,
            specifications: this.generateDryingEquipmentSpecs(type, capacity, method, temperature, humidity, energy),
            pricing: this.generatePricing(this.getDryingEquipmentPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateDryingEquipmentApplications(type),
            compatibility: this.generateDryingEquipmentCompatibility(humidity),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getDryingEquipmentWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateDryingEquipmentTags(type, capacity)
        };
    }

    // Generate Freeze Dryer
    generateFreezeDryer(type, capacity, shelfTemp, vacuum, cycleTime, condenser, index) {
        const id = `FD${String(index + 1).padStart(3, '0')}-001`;
        const sku = `FD${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `FD-FD-${type}-${capacity}-${shelfTemp}`;
        
        return {
            id,
            sku,
            name: `Máy sấy thăng hoa ${type} ${capacity} ${shelfTemp}`,
            name_en: `${type} Freeze Dryer ${capacity} ${shelfTemp}`,
            name_ja: `${type}凍結乾燥機 ${capacity} ${shelfTemp}`,
            short_description: `Máy sấy thăng hoa ${type} công suất ${capacity}, nhiệt độ kệ ${shelfTemp}, chân không ${vacuum}`,
            short_description_en: `${type} freeze dryer ${capacity} capacity, ${shelfTemp} shelf temp, ${vacuum} vacuum`,
            short_description_ja: `${type}凍結乾燥機 ${capacity}容量、${shelfTemp}棚温度、${vacuum}真空`,
            long_description: this.generateFreezeDryerDescription(type, capacity, shelfTemp, vacuum),
            long_description_en: this.generateFreezeDryerDescriptionEn(type, capacity, shelfTemp, vacuum),
            long_description_ja: this.generateFreezeDryerDescriptionJa(type, capacity, shelfTemp, vacuum),
            category_id: "cat_freeze_dryers",
            subcategory: "Freeze Dryers",
            subcategory_en: "Freeze Dryers",
            subcategory_ja: "凍結乾燥機",
            manufacturer_id: "mfr_marel",
            brand: "Marel",
            part_number: partNumber,
            specifications: this.generateFreezeDryerSpecs(type, capacity, shelfTemp, vacuum, cycleTime, condenser),
            pricing: this.generatePricing(this.getFreezeDryerPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateFreezeDryerApplications(type),
            compatibility: this.generateFreezeDryerCompatibility(vacuum),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getFreezeDryerWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateFreezeDryerTags(type, capacity)
        };
    }

    // Generate Refrigeration System
    generateRefrigerationSystem(type, capacity, refrigerant, temperature, control, efficiency, index) {
        const id = `RF${String(index + 1).padStart(3, '0')}-001`;
        const sku = `RF${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `RF-RF-${type}-${capacity}-${refrigerant}`;
        
        return {
            id,
            sku,
            name: `Hệ thống lạnh ${type} ${capacity} ${refrigerant}`,
            name_en: `${type} Refrigeration System ${capacity} ${refrigerant}`,
            name_ja: `${type}冷凍システム ${capacity} ${refrigerant}`,
            short_description: `Hệ thống lạnh ${type} công suất ${capacity}, làm lạnh ${refrigerant}, nhiệt độ ${temperature}`,
            short_description_en: `${type} refrigeration system ${capacity} capacity, ${refrigerant} refrigerant, ${temperature} temperature`,
            short_description_ja: `${type}冷凍システム ${capacity}容量、${refrigerant}冷媒、${temperature}温度`,
            long_description: this.generateRefrigerationSystemDescription(type, capacity, refrigerant, temperature),
            long_description_en: this.generateRefrigerationSystemDescriptionEn(type, capacity, refrigerant, temperature),
            long_description_ja: this.generateRefrigerationSystemDescriptionJa(type, capacity, refrigerant, temperature),
            category_id: "cat_refrigeration_systems",
            subcategory: "Refrigeration Systems",
            subcategory_en: "Refrigeration Systems",
            subcategory_ja: "冷凍システム",
            manufacturer_id: "mfr_fmc",
            brand: "FMC",
            part_number: partNumber,
            specifications: this.generateRefrigerationSystemSpecs(type, capacity, refrigerant, temperature, control, efficiency),
            pricing: this.generatePricing(this.getRefrigerationSystemPrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateRefrigerationSystemApplications(type),
            compatibility: this.generateRefrigerationSystemCompatibility(control),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getRefrigerationSystemWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateRefrigerationSystemTags(type, capacity)
        };
    }

    // Generate Cold Storage
    generateColdStorage(type, capacity, temperature, humidity, door, monitoring, index) {
        const id = `CS${String(index + 1).padStart(3, '0')}-001`;
        const sku = `CS${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `CS-CS-${type}-${capacity}-${temperature}`;
        
        return {
            id,
            sku,
            name: `Kho lạnh ${type} ${capacity} ${temperature}`,
            name_en: `${type} Cold Storage ${capacity} ${temperature}`,
            name_ja: `${type}冷蔵倉庫 ${capacity} ${temperature}`,
            short_description: `Kho lạnh ${type} dung tích ${capacity}, nhiệt độ ${temperature}, độ ẩm ${humidity}`,
            short_description_en: `${type} cold storage ${capacity} capacity, ${temperature} temperature, ${humidity} humidity`,
            short_description_ja: `${type}冷蔵倉庫 ${capacity}容量、${temperature}温度、${humidity}湿度`,
            long_description: this.generateColdStorageDescription(type, capacity, temperature, humidity),
            long_description_en: this.generateColdStorageDescriptionEn(type, capacity, temperature, humidity),
            long_description_ja: this.generateColdStorageDescriptionJa(type, capacity, temperature, humidity),
            category_id: "cat_cold_storage",
            subcategory: "Cold Storage",
            subcategory_en: "Cold Storage",
            subcategory_ja: "冷蔵倉庫",
            manufacturer_id: "mfr_bosch",
            brand: "Bosch",
            part_number: partNumber,
            specifications: this.generateColdStorageSpecs(type, capacity, temperature, humidity, door, monitoring),
            pricing: this.generatePricing(this.getColdStoragePrice(type, capacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateColdStorageApplications(type),
            compatibility: this.generateColdStorageCompatibility(monitoring),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getColdStorageWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateColdStorageTags(type, capacity)
        };
    }

    // Generate Quality Control Equipment
    generateQualityControl(type, speed, detection, productType, rejection, logging, index) {
        const id = `QC${String(index + 1).padStart(3, '0')}-001`;
        const sku = `QC${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `MT-QC-${type}-${speed}-${detection}`;
        
        return {
            id,
            sku,
            name: `Thiết bị kiểm tra chất lượng ${type} ${speed} ${detection}`,
            name_en: `${type} Quality Control ${speed} ${detection}`,
            name_ja: `${type}品質管理 ${speed} ${detection}`,
            short_description: `Thiết bị kiểm tra ${type} tốc độ ${speed}, phương pháp ${detection}, sản phẩm ${productType}`,
            short_description_en: `${type} quality control ${speed} speed, ${detection} detection, ${productType} product`,
            short_description_ja: `${type}品質管理 ${speed}速度、${detection}検出、${productType}製品`,
            long_description: this.generateQualityControlDescription(type, speed, detection, productType),
            long_description_en: this.generateQualityControlDescriptionEn(type, speed, detection, productType),
            long_description_ja: this.generateQualityControlDescriptionJa(type, speed, detection, productType),
            category_id: "cat_quality_control",
            subcategory: "Quality Control",
            subcategory_en: "Quality Control",
            subcategory_ja: "品質管理",
            manufacturer_id: "mfr_mettler_toledo",
            brand: "Mettler Toledo",
            part_number: partNumber,
            specifications: this.generateQualityControlSpecs(type, speed, detection, productType, rejection, logging),
            pricing: this.generatePricing(this.getQualityControlPrice(type, speed)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateQualityControlApplications(type),
            compatibility: this.generateQualityControlCompatibility(logging),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getQualityControlWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateQualityControlTags(type, speed)
        };
    }

    // Generate Metal Detector
    generateMetalDetector(type, sensitivity, aperture, productType, rejection, certification, index) {
        const id = `MD${String(index + 1).padStart(3, '0')}-001`;
        const sku = `MD${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `LO-MD-${type}-${sensitivity}-${aperture}`;
        
        return {
            id,
            sku,
            name: `Máy dò kim loại ${type} ${sensitivity} ${aperture}`,
            name_en: `${type} Metal Detector ${sensitivity} ${aperture}`,
            name_ja: `${type}金属探知機 ${sensitivity} ${aperture}`,
            short_description: `Máy dò kim loại ${type} độ nhạy ${sensitivity}, khẩu độ ${aperture}, sản phẩm ${productType}`,
            short_description_en: `${type} metal detector ${sensitivity} sensitivity, ${aperture} aperture, ${productType} product`,
            short_description_ja: `${type}金属探知機 ${sensitivity}感度、${aperture}開口部、${productType}製品`,
            long_description: this.generateMetalDetectorDescription(type, sensitivity, aperture, productType),
            long_description_en: this.generateMetalDetectorDescriptionEn(type, sensitivity, aperture, productType),
            long_description_ja: this.generateMetalDetectorDescriptionJa(type, sensitivity, aperture, productType),
            category_id: "cat_metal_detectors",
            subcategory: "Metal Detectors",
            subcategory_en: "Metal Detectors",
            subcategory_ja: "金属探知機",
            manufacturer_id: "mfr_loma",
            brand: "Loma",
            part_number: partNumber,
            specifications: this.generateMetalDetectorSpecs(type, sensitivity, aperture, productType, rejection, certification),
            pricing: this.generatePricing(this.getMetalDetectorPrice(type, sensitivity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateMetalDetectorApplications(type),
            compatibility: this.generateMetalDetectorCompatibility(rejection),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getMetalDetectorWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateMetalDetectorTags(type, sensitivity)
        };
    }

    // Generate X-ray Inspector
    generateXrayInspector(type, xraySource, detection, productSize, speed, imageProcessing, index) {
        const id = `XR${String(index + 1).padStart(3, '0')}-001`;
        const sku = `XR${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `AN-XR-${type}-${xraySource}-${detection}`;
        
        return {
            id,
            sku,
            name: `Máy kiểm tra X-ray ${type} ${xraySource} ${detection}`,
            name_en: `${type} X-ray Inspector ${xraySource} ${detection}`,
            name_ja: `${type}X線検査機 ${xraySource} ${detection}`,
            short_description: `Máy kiểm tra X-ray ${type} nguồn ${xraySource}, phát hiện ${detection}, tốc độ ${speed}`,
            short_description_en: `${type} X-ray inspector ${xraySource} source, ${detection} detection, ${speed} speed`,
            short_description_ja: `${type}X線検査機 ${xraySource}源、${detection}検出、${speed}速度`,
            long_description: this.generateXrayInspectorDescription(type, xraySource, detection, productSize),
            long_description_en: this.generateXrayInspectorDescriptionEn(type, xraySource, detection, productSize),
            long_description_ja: this.generateXrayInspectorDescriptionJa(type, xraySource, detection, productSize),
            category_id: "cat_x_ray_inspectors",
            subcategory: "X-ray Inspectors",
            subcategory_en: "X-ray Inspectors",
            subcategory_ja: "X線検査機",
            manufacturer_id: "mfr_anritsu",
            brand: "Anritsu",
            part_number: partNumber,
            specifications: this.generateXrayInspectorSpecs(type, xraySource, detection, productSize, speed, imageProcessing),
            pricing: this.generatePricing(this.getXrayInspectorPrice(type, xraySource)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateXrayInspectorApplications(type),
            compatibility: this.generateXrayInspectorCompatibility(imageProcessing),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getXrayInspectorWeight(type)),
            status: "active",
            created_date: "2026-04-06T15:00:00Z",
            updated_date: "2026-04-06T15:00:00Z",
            tags: this.generateXrayInspectorTags(type, detection)
        };
    }

    // Description generation methods
    generateFoodProcessorDescription(type, capacity, power, material) {
        return `Máy chế biến thực phẩm ${type} chuyên dụng công suất ${power}. Dung tích xử lý ${capacity}, vật liệu ${material} cao cấp. Thiết bị hiện đại, hiệu suất cao, an toàn vệ sinh. Phù hợp cho các nhà máy chế biến thực phẩm quy mô vừa và lớn.`;
    }

    generateFoodProcessorDescriptionEn(type, capacity, power, material) {
        return `Professional ${type} food processor with ${power} power. ${capacity} processing capacity, premium ${material} construction. Modern equipment, high efficiency, food safety compliant. Suitable for medium to large food processing plants.`;
    }

    generateFoodProcessorDescriptionJa(type, capacity, power, material) {
        return `${power}出力を備えたプロフェッショナル${type}食品加工機。${capacity}処理容量、プレミアム${material}構造。最新設備、高効率、食品安全準拠。中規模から大規模の食品工場に適しています。`;
    }

    // Specification generation methods
    generateFoodProcessorSpecs(type, capacity, power, material, control) {
        return {
            basic: {
                processor_type: type,
                processing_capacity: capacity,
                power_rating: power,
                construction_material: material,
                control_type: control
            },
            mechanical: {
                cutting_speed: "Variable 100-3000 RPM",
                blade_material: "Stainless steel hardened",
                frame_construction: "Welded steel frame",
                vibration_damping: "Anti-vibration mounts",
                noise_level: "<75 dB"
            },
            electrical: {
                power_supply: "3-phase 380V/50Hz",
                motor_power: power,
                control_voltage: "24V DC",
                safety_interlocks: "Emergency stop, door sensors",
                ip_rating: "IP65"
            },
            hygienic: {
                surface_finish: "Ra <0.8μm",
                cleaning_method: "CIP optional",
                certification: "FDA, EHEDG compliant",
                sanitary_design: "No dead zones, easy clean",
                material_certification: "3.1B certificate"
            },
            performance: {
                processing_capacity: capacity,
                throughput: "Continuous operation",
                efficiency: ">95%",
                maintenance_interval: "500 hours",
                operating_temperature: "0-40°C"
            }
        };
    }

    generateMixerGrinderSpecs(type, capacity, speed, power, heatingCooling, vacuum) {
        return {
            basic: {
                mixer_type: type,
                capacity: capacity,
                mixing_speed: speed,
                power_requirement: power,
                heating_cooling: heatingCooling,
                vacuum_capability: vacuum
            },
            mixing_system: {
                mixing_element: type.includes("Ribbon") ? "Ribbon blender" : "Planetary mixer",
                speed_control: "Variable frequency drive",
                mixing_action: "3D mixing pattern",
                homogeneity: ">98%",
                mixing_time: "5-30 minutes"
            },
            construction: {
                vessel_material: "Stainless steel 316L",
                inner_surface: "Polished Ra <0.4μm",
                jacket_design: heatingCooling.includes("Heated") ? "Double jacket" : "Single wall",
                insulation: "Rock wool 50mm",
                access_ports: "Multiple inspection doors"
            },
            process_control: {
                control_system: "PLC with HMI",
                temperature_control: "PID controller ±1°C",
                vacuum_system: vacuum === "Standard" ? "Rotary vane pump" : "None",
                safety_features: "Pressure relief, temperature alarms",
                data_logging: "Recipe management system"
            },
            utilities: {
                power_requirement: power,
                steam_consumption: heatingCooling.includes("Heated") ? "50-200 kg/h" : "N/A",
                cooling_water: heatingCooling.includes("Cooled") ? "5-20 m³/h" : "N/A",
                compressed_air: "6 bar, 0.5 m³/min",
                floor_space: `${Math.ceil(parseInt(capacity) * 0.5)}m²`
            }
        };
    }

    generatePackagingMachineSpecs(type, material, speed, productType, sealing, automation) {
        return {
            basic: {
                machine_type: type,
                packaging_material: material,
                packaging_speed: speed,
                product_type: productType,
                sealing_method: sealing,
                automation_level: automation
            },
            packaging_system: {
                film_handling: "Automatic splicer",
                forming_method: type.includes("Form") ? "Vertical forming" : "Pre-formed",
                filling_accuracy: "±1%",
                sealing_quality: "100% hermetic seal",
                waste_reduction: "<2%"
            },
            mechanical: {
                frame_construction: "Stainless steel 304",
                sealing_system: sealing === "Heat sealing" ? "Impulse sealer" : "Ultrasonic sealer",
                cutting_system: "Rotary knife",
                conveyor_system: "Servo-driven",
                changeover_time: "<15 minutes"
            },
            control_system: {
                controller: "PLC with touch screen",
        operator_interface: "10\" color HMI",
                recipe_management: "1000+ recipes storage",
                production_tracking: "Real-time monitoring",
                integration_options: "MES, ERP integration"
            },
            performance: {
                packaging_speed: speed,
                efficiency: ">95%",
                uptime: ">98%",
                changeover_efficiency: "Quick change parts",
                quality_control: "Integrated vision system"
            },
            safety: {
                safety_interlocks: "Light curtains, door switches",
                emergency_stop: "Multiple E-stop buttons",
                compliance: "CE, UL, OSHA standards",
                noise_level: "<80 dB",
                energy_consumption: "Optimized energy use"
            }
        };
    }

    // Price calculation methods
    getFoodProcessorPrice(type, capacity) {
        const basePrices = {
            "Cutting": 150000000,
            "Slicing": 200000000,
            "Dicing": 250000000,
            "Grinding": 300000000,
            "Mixing": 180000000,
            "Blending": 220000000
        };
        
        const capacityMultiplier = {
            "50-100 kg/h": 0.6,
            "100-500 kg/h": 1,
            "500-2000 kg/h": 1.8,
            "2000-5000 kg/h": 3
        };
        
        const basePrice = basePrices[type] || 200000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getMixerGrinderPrice(type, capacity) {
        const basePrices = {
            "Ribbon Mixer": 250000000,
            "Planetary Mixer": 300000000,
            "Screw Mixer": 200000000,
            "Paddle Mixer": 220000000,
            "Hammer Mill": 350000000,
            "Colloid Mill": 400000000
        };
        
        const capacityMultiplier = {
            "100L": 0.5,
            "200L": 0.8,
            "500L": 1.2,
            "1000L": 2,
            "2000L": 3.5,
            "5000L": 6
        };
        
        const basePrice = basePrices[type] || 250000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getPackagingMachinePrice(type, speed) {
        const basePrices = {
            "Form-Fill-Seal": 500000000,
            "Vertical Form-Fill-Seal": 450000000,
            "Horizontal Flow Wrapper": 400000000,
            "Case Packer": 600000000,
            "Palletizer": 800000000
        };
        
        const speedMultiplier = {
            "10-50 packs/min": 0.6,
            "50-100 packs/min": 1,
            "100-200 packs/min": 1.5,
            "200-500 packs/min": 2.5
        };
        
        const basePrice = basePrices[type] || 500000000;
        return Math.round(basePrice * (speedMultiplier[speed] || 1));
    }

    getPasteurizerPrice(type, capacity) {
        const basePrices = {
            "HTST": 400000000,
            "Batch": 300000000,
            "Tunnel": 600000000,
            "Plate": 350000000,
            "Tubular": 450000000
        };
        
        const capacityMultiplier = {
            "100-500 L/h": 0.4,
            "500-2000 L/h": 1,
            "2000-10000 L/h": 2.5,
            "10000-50000 L/h": 6
        };
        
        const basePrice = basePrices[type] || 400000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getSterilizerPrice(type, capacity) {
        const basePrices = {
            "Steam": 350000000,
            "Autoclave": 400000000,
            "Retort": 600000000,
            "Dry heat": 300000000,
            "Chemical": 250000000
        };
        
        const capacityMultiplier = {
            "50-100L": 0.5,
            "100-500L": 1,
            "500-2000L": 2.5,
            "2000-10000L": 5
        };
        
        const basePrice = basePrices[type] || 350000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getDryingEquipmentPrice(type, capacity) {
        const basePrices = {
            "Tray Dryer": 200000000,
            "Rotary Dryer": 500000000,
            "Fluid Bed Dryer": 400000000,
            "Spray Dryer": 800000000,
            "Drum Dryer": 350000000
        };
        
        const capacityMultiplier = {
            "50-200 kg/h": 0.5,
            "200-500 kg/h": 1,
            "500-2000 kg/h": 2,
            "2000-10000 kg/h": 4
        };
        
        const basePrice = basePrices[type] || 400000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getFreezeDryerPrice(type, capacity) {
        const basePrices = {
            "Batch": 800000000,
            "Continuous": 1500000000,
            "Pilot": 500000000,
            "Industrial": 2000000000
        };
        
        const capacityMultiplier = {
            "10-50 kg": 0.3,
            "50-200 kg": 1,
            "200-500 kg": 2.5,
            "500-2000 kg": 5
        };
        
        const basePrice = basePrices[type] || 1000000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getRefrigerationSystemPrice(type, capacity) {
        const basePrices = {
            "Compressor": 200000000,
            "Absorption": 300000000,
            "Cascade": 500000000,
            "Hybrid": 400000000
        };
        
        const capacityMultiplier = {
            "5-20 kW": 0.4,
            "20-50 kW": 1,
            "50-200 kW": 2.5,
            "200-500 kW": 5
        };
        
        const basePrice = basePrices[type] || 300000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getColdStoragePrice(type, capacity) {
        const basePrices = {
            "Blast Freezer": 300000000,
            "Storage Freezer": 200000000,
            "Cold Room": 150000000,
            "Refrigerated Warehouse": 1000000000
        };
        
        const capacityMultiplier = {
            "10-50 m³": 0.3,
            "50-200 m³": 1,
            "200-1000 m³": 3,
            "1000-5000 m³": 8
        };
        
        const basePrice = basePrices[type] || 300000000;
        return Math.round(basePrice * (capacityMultiplier[capacity] || 1));
    }

    getQualityControlPrice(type, speed) {
        const basePrices = {
            "Vision System": 400000000,
            "Weight Checker": 150000000,
            "Contamination Detector": 500000000,
            "Fill Level Inspector": 300000000
        };
        
        const speedMultiplier = {
            "10-50 items/min": 0.6,
            "50-100 items/min": 1,
            "100-200 items/min": 1.5,
            "200-500 items/min": 2.5
        };
        
        const basePrice = basePrices[type] || 300000000;
        return Math.round(basePrice * (speedMultiplier[speed] || 1));
    }

    getMetalDetectorPrice(type, sensitivity) {
        const basePrices = {
            "Conveyor": 200000000,
            "Pipeline": 250000000,
            "Pharmaceutical": 350000000,
            "Gravity Fall": 180000000
        };
        
        const sensitivityMultiplier = {
            "Fe 1.0mm": 0.7,
            "Fe 0.8mm": 0.9,
            "Fe 0.5mm": 1.2,
            "Fe 0.3mm": 1.8
        };
        
        const basePrice = basePrices[type] || 200000000;
        return Math.round(basePrice * (sensitivityMultiplier[sensitivity] || 1));
    }

    getXrayInspectorPrice(type, xraySource) {
        const basePrices = {
            "Conveyor": 600000000,
            "Bulk": 800000000,
            "Pipeline": 700000000,
            "Jar inspection": 500000000
        };
        
        const sourceMultiplier = {
            "50W": 0.7,
            "100W": 1,
            "150W": 1.3,
            "200W": 1.6
        };
        
        const basePrice = basePrices[type] || 600000000;
        return Math.round(basePrice * (sourceMultiplier[xraySource] || 1));
    }

    // Weight calculation methods
    getFoodProcessorWeight(type) {
        const weights = {
            "Cutting": 800,
            "Slicing": 1000,
            "Dicing": 1200,
            "Grinding": 1500,
            "Mixing": 900,
            "Blending": 1100
        };
        return weights[type] || 1000;
    }

    getMixerGrinderWeight(type) {
        const weights = {
            "Ribbon Mixer": 2000,
            "Planetary Mixer": 1800,
            "Screw Mixer": 2200,
            "Paddle Mixer": 1900,
            "Hammer Mill": 2500,
            "Colloid Mill": 1500
        };
        return weights[type] || 2000;
    }

    getPackagingMachineWeight(type) {
        const weights = {
            "Form-Fill-Seal": 3000,
            "Vertical Form-Fill-Seal": 2500,
            "Horizontal Flow Wrapper": 2800,
            "Case Packer": 4000,
            "Palletizer": 6000
        };
        return weights[type] || 3000;
    }

    getPasteurizerWeight(type) {
        const weights = {
            "HTST": 2500,
            "Batch": 2000,
            "Tunnel": 4000,
            "Plate": 2200,
            "Tubular": 2800
        };
        return weights[type] || 2500;
    }

    getSterilizerWeight(type) {
        const weights = {
            "Steam": 3000,
            "Autoclave": 3500,
            "Retort": 5000,
            "Dry heat": 2500,
            "Chemical": 2000
        };
        return weights[type] || 3000;
    }

    getDryingEquipmentWeight(type) {
        const weights = {
            "Tray Dryer": 2000,
            "Rotary Dryer": 4000,
            "Fluid Bed Dryer": 3500,
            "Spray Dryer": 5000,
            "Drum Dryer": 3000
        };
        return weights[type] || 3500;
    }

    getFreezeDryerWeight(type) {
        const weights = {
            "Batch": 4000,
            "Continuous": 8000,
            "Pilot": 3000,
            "Industrial": 10000
        };
        return weights[type] || 5000;
    }

    getRefrigerationSystemWeight(type) {
        const weights = {
            "Compressor": 1500,
            "Absorption": 2000,
            "Cascade": 3000,
            "Hybrid": 2500
        };
        return weights[type] || 2000;
    }

    getColdStorageWeight(type) {
        const weights = {
            "Blast Freezer": 3000,
            "Storage Freezer": 2500,
            "Cold Room": 4000,
            "Refrigerated Warehouse": 15000
        };
        return weights[type] || 4000;
    }

    getQualityControlWeight(type) {
        const weights = {
            "Vision System": 800,
            "Weight Checker": 600,
            "Contamination Detector": 1000,
            "Fill Level Inspector": 700
        };
        return weights[type] || 800;
    }

    getMetalDetectorWeight(type) {
        const weights = {
            "Conveyor": 500,
            "Pipeline": 400,
            "Pharmaceutical": 600,
            "Gravity Fall": 300
        };
        return weights[type] || 500;
    }

    getXrayInspectorWeight(type) {
        const weights = {
            "Conveyor": 1200,
            "Bulk": 1500,
            "Pipeline": 1000,
            "Jar inspection": 800
        };
        return weights[type] || 1200;
    }

    // Generate all products for Phase 3
    generateAllPhase3Products() {
        const products = [];
        let productIndexCounter = 0;

        // Generate Food Processors (60 products)
        const foodTypes = ["Cutting", "Slicing", "Dicing", "Grinding", "Mixing", "Blending"];
        const foodCapacities = ["50-100 kg/h", "100-500 kg/h", "500-2000 kg/h", "2000-5000 kg/h"];
        const foodPowers = ["1-5 kW", "5-15 kW", "15-50 kW", "50-100 kW"];
        const foodMaterials = ["Stainless Steel 304", "Stainless Steel 316", "Food Grade Plastic", "Titanium"];
        const foodControls = ["Manual", "Semi-automatic", "Fully automatic", "PLC controlled"];

        for (let i = 0; i < 60; i++) {
            const typeIndex = i % foodTypes.length;
            const capacityIndex = i % foodCapacities.length;
            const powerIndex = i % foodPowers.length;
            const materialIndex = i % foodMaterials.length;
            const controlIndex = i % foodControls.length;
            
            products.push(this.generateFoodProcessor(
                foodTypes[typeIndex],
                foodCapacities[capacityIndex],
                foodPowers[powerIndex],
                foodMaterials[materialIndex],
                foodControls[controlIndex],
                productIndexCounter++
            ));
        }

        // Generate Mixers/Grinders (45 products)
        const mixerTypes = ["Ribbon Mixer", "Planetary Mixer", "Screw Mixer", "Paddle Mixer", "Hammer Mill", "Colloid Mill"];
        const mixerCapacities = ["100L", "200L", "500L", "1000L", "2000L", "5000L"];
        const mixerSpeeds = ["10-50 RPM", "20-100 RPM", "50-200 RPM", "100-500 RPM"];
        const mixerPowers = ["3-10 kW", "10-30 kW", "30-75 kW", "75-150 kW"];
        const mixerHeatingCooling = ["Ambient", "Heated", "Cooled", "Heated & Cooled"];
        const mixerVacuum = ["No", "Optional", "Standard", "Advanced"];

        for (let i = 0; i < 45; i++) {
            const typeIndex = i % mixerTypes.length;
            const capacityIndex = i % mixerCapacities.length;
            const speedIndex = i % mixerSpeeds.length;
            const powerIndex = i % mixerPowers.length;
            const heatingIndex = i % mixerHeatingCooling.length;
            const vacuumIndex = i % mixerVacuum.length;
            
            products.push(this.generateMixerGrinder(
                mixerTypes[typeIndex],
                mixerCapacities[capacityIndex],
                mixerSpeeds[speedIndex],
                mixerPowers[powerIndex],
                mixerHeatingCooling[heatingIndex],
                mixerVacuum[vacuumIndex],
                productIndexCounter++
            ));
        }

        // Generate Packaging Machines (50 products)
        const packagingTypes = ["Form-Fill-Seal", "Vertical Form-Fill-Seal", "Horizontal Flow Wrapper", "Case Packer", "Palletizer"];
        const packagingMaterials = ["PET", "PP", "PE", "Aluminum", "Paper", "Multi-layer"];
        const packagingSpeeds = ["10-50 packs/min", "50-100 packs/min", "100-200 packs/min", "200-500 packs/min"];
        const packagingProducts = ["Liquid", "Powder", "Granular", "Solid", "Viscous"];
        const packagingSealing = ["Heat sealing", "Ultrasonic", "Induction", "Adhesive"];
        const packagingAutomation = ["Manual", "Semi-automatic", "Fully automatic", "Robot integrated"];

        for (let i = 0; i < 50; i++) {
            const typeIndex = i % packagingTypes.length;
            const materialIndex = i % packagingMaterials.length;
            const speedIndex = i % packagingSpeeds.length;
            const productIndex = i % packagingProducts.length;
            const sealingIndex = i % packagingSealing.length;
            const automationIndex = i % packagingAutomation.length;
            
            products.push(this.generatePackagingMachine(
                packagingTypes[typeIndex],
                packagingMaterials[materialIndex],
                packagingSpeeds[speedIndex],
                packagingProducts[productIndex],
                packagingSealing[sealingIndex],
                packagingAutomation[automationIndex],
                productIndexCounter++
            ));
        }

        // Generate Pasteurizers (35 products)
        const pasteurizerTypes = ["HTST", "Batch", "Tunnel", "Plate", "Tubular"];
        const pasteurizerCapacities = ["100-500 L/h", "500-2000 L/h", "2000-10000 L/h", "10000-50000 L/h"];
        const pasteurizerTemperatures = ["60-85°C", "72-95°C", "85-140°C", "100-150°C"];
        const pasteurizerHoldingTimes = ["15-30s", "20-45s", "30-60s", "2-5min"];
        const pasteurizerHeating = ["Steam", "Hot water", "Electric", "Microwave"];
        const pasteurizerControl = ["Manual", "Automatic", "PLC", "SCADA integrated"];

        for (let i = 0; i < 35; i++) {
            const typeIndex = i % pasteurizerTypes.length;
            const capacityIndex = i % pasteurizerCapacities.length;
            const tempIndex = i % pasteurizerTemperatures.length;
            const holdingIndex = i % pasteurizerHoldingTimes.length;
            const heatingIndex = i % pasteurizerHeating.length;
            const controlIndex = i % pasteurizerControl.length;
            
            products.push(this.generatePasteurizer(
                pasteurizerTypes[typeIndex],
                pasteurizerCapacities[capacityIndex],
                pasteurizerTemperatures[tempIndex],
                pasteurizerHoldingTimes[holdingIndex],
                pasteurizerHeating[heatingIndex],
                pasteurizerControl[controlIndex],
                productIndexCounter++
            ));
        }

        // Generate Sterilizers (30 products)
        const sterilizerTypes = ["Steam", "Autoclave", "Retort", "Dry heat", "Chemical"];
        const sterilizerCapacities = ["50-100L", "100-500L", "500-2000L", "2000-10000L"];
        const sterilizerTemperatures = ["121°C", "134°C", "140°C", "160°C"];
        const sterilizerPressures = ["1 bar", "2 bar", "3 bar", "4 bar"];
        const sterilizerCycleTimes = ["30-60 min", "45-90 min", "60-120 min", "90-180 min"];
        const sterilizerLoading = ["Static", "Dynamic", "Rotary", "Basket"];

        for (let i = 0; i < 30; i++) {
            const typeIndex = i % sterilizerTypes.length;
            const capacityIndex = i % sterilizerCapacities.length;
            const tempIndex = i % sterilizerTemperatures.length;
            const pressureIndex = i % sterilizerPressures.length;
            const cycleIndex = i % sterilizerCycleTimes.length;
            const loadingIndex = i % sterilizerLoading.length;
            
            products.push(this.generateSterilizer(
                sterilizerTypes[typeIndex],
                sterilizerCapacities[capacityIndex],
                sterilizerTemperatures[tempIndex],
                sterilizerPressures[pressureIndex],
                sterilizerCycleTimes[cycleIndex],
                sterilizerLoading[loadingIndex],
                productIndexCounter++
            ));
        }

        // Generate Drying Equipment (40 products)
        const dryingTypes = ["Tray Dryer", "Rotary Dryer", "Fluid Bed Dryer", "Spray Dryer", "Drum Dryer"];
        const dryingCapacities = ["50-200 kg/h", "200-500 kg/h", "500-2000 kg/h", "2000-10000 kg/h"];
        const dryingMethods = ["Hot air", "Vacuum", "Microwave", "Infrared", "Freeze"];
        const dryingTemperatures = ["30-80°C", "40-120°C", "60-150°C", "80-200°C"];
        const dryingHumidity = ["No", "Basic", "Advanced", "Precision"];
        const dryingEnergy = ["Electric", "Gas", "Steam", "Oil", "Hybrid"];

        for (let i = 0; i < 40; i++) {
            const typeIndex = i % dryingTypes.length;
            const capacityIndex = i % dryingCapacities.length;
            const methodIndex = i % dryingMethods.length;
            const tempIndex = i % dryingTemperatures.length;
            const humidityIndex = i % dryingHumidity.length;
            const energyIndex = i % dryingEnergy.length;
            
            products.push(this.generateDryingEquipment(
                dryingTypes[typeIndex],
                dryingCapacities[capacityIndex],
                dryingMethods[methodIndex],
                dryingTemperatures[tempIndex],
                dryingHumidity[humidityIndex],
                dryingEnergy[energyIndex],
                productIndexCounter++
            ));
        }

        // Generate Freeze Dryers (25 products)
        const freezeDryerTypes = ["Batch", "Continuous", "Pilot", "Industrial"];
        const freezeDryerCapacities = ["10-50 kg", "50-200 kg", "200-500 kg", "500-2000 kg"];
        const freezeDryerShelfTemps = ["-40 to 20°C", "-50 to 30°C", "-60 to 40°C", "-70 to 50°C"];
        const freezeDryerVacuum = ["100-200 mbar", "50-100 mbar", "10-50 mbar", "1-10 mbar"];
        const freezeDryerCycleTimes = ["12-24h", "18-36h", "24-48h", "36-72h"];
        const freezeDryerCondenser = ["50 kg", "100 kg", "200 kg", "500 kg"];

        for (let i = 0; i < 25; i++) {
            const typeIndex = i % freezeDryerTypes.length;
            const capacityIndex = i % freezeDryerCapacities.length;
            const shelfTempIndex = i % freezeDryerShelfTemps.length;
            const vacuumIndex = i % freezeDryerVacuum.length;
            const cycleIndex = i % freezeDryerCycleTimes.length;
            const condenserIndex = i % freezeDryerCondenser.length;
            
            products.push(this.generateFreezeDryer(
                freezeDryerTypes[typeIndex],
                freezeDryerCapacities[capacityIndex],
                freezeDryerShelfTemps[shelfTempIndex],
                freezeDryerVacuum[vacuumIndex],
                freezeDryerCycleTimes[cycleIndex],
                freezeDryerCondenser[condenserIndex],
                productIndexCounter++
            ));
        }

        // Generate Refrigeration Systems (45 products)
        const refrigerationTypes = ["Compressor", "Absorption", "Cascade", "Hybrid"];
        const refrigerationCapacities = ["5-20 kW", "20-50 kW", "50-200 kW", "200-500 kW"];
        const refrigerationRefrigerants = ["R134a", "R404A", "R717", "CO2", "Natural"];
        const refrigerationTemperatures = ["0 to 10°C", "-5 to 5°C", "-20 to 0°C", "-40 to -20°C"];
        const refrigerationControl = ["Mechanical", "Electronic", "PLC", "Smart control"];
        const refrigerationEfficiency = ["Standard", "High efficiency", "Premium", "Ultra efficient"];

        for (let i = 0; i < 45; i++) {
            const typeIndex = i % refrigerationTypes.length;
            const capacityIndex = i % refrigerationCapacities.length;
            const refrigerantIndex = i % refrigerationRefrigerants.length;
            const tempIndex = i % refrigerationTemperatures.length;
            const controlIndex = i % refrigerationControl.length;
            const efficiencyIndex = i % refrigerationEfficiency.length;
            
            products.push(this.generateRefrigerationSystem(
                refrigerationTypes[typeIndex],
                refrigerationCapacities[capacityIndex],
                refrigerationRefrigerants[refrigerantIndex],
                refrigerationTemperatures[tempIndex],
                refrigerationControl[controlIndex],
                refrigerationEfficiency[efficiencyIndex],
                productIndexCounter++
            ));
        }

        // Generate Cold Storage (35 products)
        const coldStorageTypes = ["Blast Freezer", "Storage Freezer", "Cold Room", "Refrigerated Warehouse"];
        const coldStorageCapacities = ["10-50 m³", "50-200 m³", "200-1000 m³", "1000-5000 m³"];
        const coldStorageTemperatures = ["-30°C", "-20°C", "0°C", "4°C"];
        const coldStorageHumidity = ["30-60%", "40-70%", "50-80%", "60-90%"];
        const coldStorageDoors = ["Hinged", "Sliding", "Roll-up", "Automatic"];
        const coldStorageMonitoring = ["Basic", "Advanced", "Remote", "IoT integrated"];

        for (let i = 0; i < 35; i++) {
            const typeIndex = i % coldStorageTypes.length;
            const capacityIndex = i % coldStorageCapacities.length;
            const tempIndex = i % coldStorageTemperatures.length;
            const humidityIndex = i % coldStorageHumidity.length;
            const doorIndex = i % coldStorageDoors.length;
            const monitoringIndex = i % coldStorageMonitoring.length;
            
            products.push(this.generateColdStorage(
                coldStorageTypes[typeIndex],
                coldStorageCapacities[capacityIndex],
                coldStorageTemperatures[tempIndex],
                coldStorageHumidity[humidityIndex],
                coldStorageDoors[doorIndex],
                coldStorageMonitoring[monitoringIndex],
                productIndexCounter++
            ));
        }

        // Generate Quality Control (40 products)
        const qualityTypes = ["Vision System", "Weight Checker", "Contamination Detector", "Fill Level Inspector"];
        const qualitySpeeds = ["10-50 items/min", "50-100 items/min", "100-200 items/min", "200-500 items/min"];
        const qualityDetection = ["Optical", "X-ray", "Ultrasonic", "Magnetic", "Weight-based"];
        const qualityProducts = ["Solid", "Liquid", "Powder", "Granular", "Viscous"];
        const qualityRejection = ["Air blast", "Pusher", "Arm reject", "Divert gate"];
        const qualityLogging = ["Basic", "Advanced", "Statistical", "Real-time analytics"];

        for (let i = 0; i < 40; i++) {
            const typeIndex = i % qualityTypes.length;
            const speedIndex = i % qualitySpeeds.length;
            const detectionIndex = i % qualityDetection.length;
            const productIndex = i % qualityProducts.length;
            const rejectionIndex = i % qualityRejection.length;
            const loggingIndex = i % qualityLogging.length;
            
            products.push(this.generateQualityControl(
                qualityTypes[typeIndex],
                qualitySpeeds[speedIndex],
                qualityDetection[detectionIndex],
                qualityProducts[productIndex],
                qualityRejection[rejectionIndex],
                qualityLogging[loggingIndex],
                productIndexCounter++
            ));
        }

        // Generate Metal Detectors (30 products)
        const metalTypes = ["Conveyor", "Pipeline", "Pharmaceutical", "Gravity Fall"];
        const metalSensitivities = ["Fe 1.0mm", "Fe 0.8mm", "Fe 0.5mm", "Fe 0.3mm"];
        const metalApertures = ["200x100mm", "300x150mm", "400x200mm", "500x250mm"];
        const metalProducts = ["Food", "Pharmaceutical", "Textile", "Plastic"];
        const metalRejection = ["Air blast", "Pusher", "Arm", "Divert"];
        const metalCertification = ["Basic", "HACCP", "FDA", "IFS"];

        for (let i = 0; i < 30; i++) {
            const typeIndex = i % metalTypes.length;
            const sensitivityIndex = i % metalSensitivities.length;
            const apertureIndex = i % metalApertures.length;
            const productIndex = i % metalProducts.length;
            const rejectionIndex = i % metalRejection.length;
            const certificationIndex = i % metalCertification.length;
            
            products.push(this.generateMetalDetector(
                metalTypes[typeIndex],
                metalSensitivities[sensitivityIndex],
                metalApertures[apertureIndex],
                metalProducts[productIndex],
                metalRejection[rejectionIndex],
                metalCertification[certificationIndex],
                productIndexCounter++
            ));
        }

        // Generate X-ray Inspectors (25 products)
        const xrayTypes = ["Conveyor", "Bulk", "Pipeline", "Jar inspection"];
        const xraySources = ["50W", "100W", "150W", "200W"];
        const xrayDetection = ["Metal", "Glass", "Stone", "Dense plastic", "Bone"];
        const xraySizes = ["Small", "Medium", "Large", "Variable"];
        const xraySpeeds = ["10-30 m/min", "30-60 m/min", "60-120 m/min", "120-240 m/min"];
        const xrayProcessing = ["Basic", "Advanced", "AI enhanced", "Deep learning"];

        for (let i = 0; i < 25; i++) {
            const typeIndex = i % xrayTypes.length;
            const sourceIndex = i % xraySources.length;
            const detectionIndex = i % xrayDetection.length;
            const sizeIndex = i % xraySizes.length;
            const speedIndex = i % xraySpeeds.length;
            const processingIndex = i % xrayProcessing.length;
            
            products.push(this.generateXrayInspector(
                xrayTypes[typeIndex],
                xraySources[sourceIndex],
                xrayDetection[detectionIndex],
                xraySizes[sizeIndex],
                xraySpeeds[speedIndex],
                xrayProcessing[processingIndex],
                productIndexCounter++
            ));
        }

        return products;
    }

    // Export Phase 3 products to JSON
    exportPhase3Products(filename = "agriculture-phase3-food-processing.json") {
        const products = this.generateAllPhase3Products();
        
        const data = {
            metadata: {
                version: "1.0",
                phase: "Phase 3",
                generated_date: "2026-04-06T15:00:00Z",
                total_products: products.length,
                categories: Object.keys(this.categories).length,
                description: "Food Processing Equipment - Phase 3 Implementation"
            },
            categories: this.categories,
            manufacturers: this.manufacturers,
            product_templates: this.productTemplates,
            products: products
        };

        console.log(`=== Phase 3: Food Processing Equipment ===`);
        console.log(`Total Products: ${data.metadata.total_products}`);
        console.log(`Categories: ${data.metadata.categories}`);
        console.log(`Manufacturers: ${Object.keys(this.manufacturers).length}`);
        console.log(`File: ${filename}`);
        
        return data;
    }

    // Common helper methods (reuse from Phase 1 & 2)
    generatePricing(basePrice) {
        return {
            base_price: basePrice,
            currency: "VND",
            discount_tiers: {
                "1-2": 0,
                "3-5": 5,
                "6-10": 10,
                "10+": 15
            },
            warranty_years: 2,
            maintenance_cost_per_year: basePrice * 0.08
        };
    }

    generateInventory() {
        return {
            in_stock: 10,
            reserved: 2,
            available: 8,
            reorder_level: 5,
            reorder_quantity: 15,
            warehouse_location: "C3-12-08",
            lead_time_days: 45
        };
    }

    generateImages(id) {
        return [
            {
                url: `/images/products/${id.toLowerCase()}-main.jpg`,
                alt: `${id} Main Image`,
                type: "main"
            },
            {
                url: `/images/products/${id.toLowerCase()}-detail1.jpg`,
                alt: `${id} Detail 1`,
                type: "detail"
            },
            {
                url: `/images/products/${id.toLowerCase()}-detail2.jpg`,
                alt: `${id} Detail 2`,
                type: "detail"
            }
        ];
    }

    generateDocuments(id) {
        return [
            {
                type: "datasheet",
                url: `/documents/datasheets/${id.toLowerCase()}.pdf`,
                size: "4.5MB",
                language: "vi"
            },
            {
                type: "manual",
                url: `/documents/manuals/${id.toLowerCase()}.pdf`,
                size: "12.2MB",
                language: "vi"
            },
            {
                type: "certificate",
                url: `/documents/certificates/${id.toLowerCase()}.pdf`,
                size: "2.1MB",
                language: "en"
            }
        ];
    }

    generateQuality() {
        return {
            iso_certifications: ["ISO 9001:2015", "ISO 14001:2015", "ISO 22000:2018"],
            quality_standards: ["CE", "FDA", "EHEDG", "3-A"],
            testing_procedures: ["Factory Acceptance Test", "Site Acceptance Test", "Performance Validation"],
            defect_rate: "<0.1%",
            mean_time_between_failures: "20000 hours"
        };
    }

    generateLogistics(weight) {
        return {
            weight: weight,
            dimensions: {
                length: 3000,
                width: 2500,
                height: 2500,
                unit: "mm"
            },
            packaging_type: "Crate/Pallet",
            shipping_class: "Heavy Freight",
            dangerous_goods: false,
            storage_requirements: "Covered, Dry Area"
        };
    }

    // Application and compatibility methods (simplified for brevity)
    generateFoodProcessorApplications(type) {
        const appMap = {
            "Cutting": ["Cắt rau củ", "Chuẩn bị nguyên liệu", "Salad"],
            "Slicing": ["Thái lát", "Đóng gói", "Chế biến sâu"],
            "Dicing": ["Cắt khối", "Súp", "Hầm"],
            "Grinding": ["Xay thịt", "Xay hạt", "Bột"],
            "Mixing": ["Trộn bột", "Gia vị", "Sản phẩm trộn"],
            "Blending": ["Sinh tố", "Súp", "Nước sốt"]
        };
        
        const applications = appMap[type] || ["Chế biến thực phẩm", "Nhà bếp công nghiệp"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} machine`,
            description_ja: `${type}機の${app}アプリケーション`
        }));
    }

    generateFoodProcessorCompatibility(control) {
        const compatMap = {
            "Manual": ["Basic operation", "Simple controls"],
            "Semi-automatic": ["Timer controls", "Basic automation"],
            "Fully automatic": ["PLC integration", "Process control"],
            "PLC controlled": ["SCADA", "MES integration", "Advanced control"]
        };
        return compatMap[control] || ["Standard controls"];
    }

    // Tag generation methods
    generateFoodProcessorTags(type, capacity) {
        return [`food-processor`, type.toLowerCase(), capacity.replace(/\s+/g, '-'), `food-processing`, `industrial-kitchen`];
    }

    generateMixerGrinderTags(type, capacity) {
        return [`mixer-grinder`, type.toLowerCase().replace(/\s+/g, '-'), capacity, `food-processing`, `mixing-equipment`];
    }

    generatePackagingMachineTags(type, material) {
        return [`packaging-machine`, type.toLowerCase().replace(/\s+/g, '-'), material.toLowerCase(), `packaging`, `food-packaging`];
    }

    generatePasteurizerTags(type, capacity) {
        return [`pasteurizer`, type.toLowerCase(), capacity.replace(/\s+/g, '-'), `food-safety`, `pasteurization`];
    }

    generateSterilizerTags(type, capacity) {
        return [`sterilizer`, type.toLowerCase(), capacity.replace(/\s+/g, '-'), `food-safety`, `sterilization`];
    }

    generateDryingEquipmentTags(type, capacity) {
        return [`drying-equipment`, type.toLowerCase().replace(/\s+/g, '-'), capacity.replace(/\s+/g, '-'), `food-drying`, `dehydration`];
    }

    generateFreezeDryerTags(type, capacity) {
        return [`freeze-dryer`, type.toLowerCase(), capacity.replace(/\s+/g, '-'), `lyophilization`, `food-preservation`];
    }

    generateRefrigerationSystemTags(type, capacity) {
        return [`refrigeration`, type.toLowerCase(), capacity.replace(/\s+/g, '-'), `cooling-system`, `cold-storage`];
    }

    generateColdStorageTags(type, capacity) {
        return [`cold-storage`, type.toLowerCase().replace(/\s+/g, '-'), capacity.replace(/\s+/g, '-'), `refrigeration`, `storage`];
    }

    generateQualityControlTags(type, speed) {
        return [`quality-control`, type.toLowerCase().replace(/\s+/g, '-'), speed.replace(/\s+/g, '-'), `inspection`, `food-safety`];
    }

    generateMetalDetectorTags(type, sensitivity) {
        return [`metal-detector`, type.toLowerCase(), sensitivity.replace(/\s+/g, '-'), `contamination-detection`, `food-safety`];
    }

    generateXrayInspectorTags(type, detection) {
        return [`xray-inspector`, type.toLowerCase(), detection.toLowerCase(), `contamination-detection`, `quality-inspection`];
    }

    // Additional description and compatibility methods for other product types
    // (Implementation similar to previous phases - abbreviated for brevity)
    generateMixerGrinderDescription(type, capacity, speed, heatingCooling) {
        return `Máy trộn/xay ${type} công nghiệp dung tích ${capacity}. Tốc độ trộn ${speed}, hệ thống ${heatingCooling}. Hiệu suất cao, độ đồng đều vượt trội. Phù hợp cho ngành thực phẩm, dược phẩm, hóa chất.`;
    }

    generateMixerGrinderDescriptionEn(type, capacity, speed, heatingCooling) {
        return `Industrial ${type} with ${capacity} capacity. ${speed} mixing speed, ${heatingCooling} system. High efficiency, superior uniformity. Suitable for food, pharmaceutical, chemical industries.`;
    }

    generateMixerGrinderDescriptionJa(type, capacity, speed, heatingCooling) {
        return `${capacity}容量を備えた産業用${type}。${speed}混合速度、${heatingCooling}システム。高効率、優れた均一性。食品、医薬品、化学工業に適しています。`;
    }

    generateMixerGrinderApplications(type) {
        const appMap = {
            "Ribbon Mixer": ["Trộn bột", "Hỗn hợp khô", "Bột thực phẩm"],
            "Planetary Mixer": ["Trộn cream", "Bánh", "Sản phẩm viscos"],
            "Screw Mixer": ["Hỗn hợp dung dịch", "Dầu", "Lỏng"],
            "Paddle Mixer": ["Trộn nhẹ", "Công thức nhạy cảm", "Bột mịn"],
            "Hammer Mill": ["Xay mịn", "Bột", "Nguyên liệu cứng"],
            "Colloid Mill": ["Xay siêu mịn", "Nano", "Dược phẩm"]
        };
        
        const applications = appMap[type] || ["Chế biến thực phẩm", "Hóa chất", "Dược phẩm"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} machine`,
            description_ja: `${type}機の${app}アプリケーション`
        }));
    }

    generateMixerGrinderCompatibility(vacuum) {
        const compatMap = {
            "No": ["Standard mixing", "Atmospheric processing"],
            "Optional": ["Vacuum ready", "Flexible configuration"],
            "Standard": ["Vacuum mixing", "Deaeration"],
            "Advanced": ["High vacuum", "Precision control"]
        };
        return compatMap[vacuum] || ["Standard mixing systems"];
    }

    // Additional methods for other product types
    generatePackagingMachineDescription(type, material, speed, sealing) {
        return `Máy đóng gói ${type} chuyên dụng cho vật liệu ${material}. Tốc độ đóng gói ${speed}, phương pháp hàn ${sealing}. Hiệu suất cao, độ tin cậy vượt trội. Phù hợp cho dây chuyền sản xuất tự động.`;
    }

    generatePackagingMachineDescriptionEn(type, material, speed, sealing) {
        return `Professional ${type} packaging machine for ${material} materials. ${speed} packaging speed, ${sealing} sealing method. High efficiency, superior reliability. Suitable for automated production lines.`;
    }

    generatePackagingMachineDescriptionJa(type, material, speed, sealing) {
        return `${material}材料用のプロフェッショナル${type}包装機。${speed}包装速度、${sealing}密封方法。高効率、優れた信頼性。自動化生産ラインに適しています。`;
    }

    generatePackagingMachineApplications(type) {
        const appMap = {
            "Form-Fill-Seal": ["Đóng gói linh hoạt", "Thực phẩm", "Dược phẩm"],
            "Vertical Form-Fill-Seal": ["Bột", "Hạt", "Sản phẩm khô"],
            "Horizontal Flow Wrapper": ["Thanh", "Bánh", "Sản phẩm rắn"],
            "Case Packer": ["Đóng thùng", "Logistics", "Bán lẻ"],
            "Palletizer": ["Palletizing", "Kho bãi", "Xuất khẩu"]
        };
        
        const applications = appMap[type] || ["Đóng gói công nghiệp", "Logistics", "Bán lẻ"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} machine`,
            description_ja: `${type}機の${app}アプリケーション`
        }));
    }

    generatePackagingMachineCompatibility(automation) {
        const compatMap = {
            "Manual": ["Operator control", "Basic operation"],
            "Semi-automatic": ["Timer control", "Basic automation"],
            "Fully automatic": ["PLC integration", "Process control"],
            "Robot integrated": ["Robotics", "Industry 4.0", "Smart factory"]
        };
        return compatMap[automation] || ["Standard control systems"];
    }

    generatePasteurizerDescription(type, capacity, temperature, holdingTime) {
        return `Hệ thống thanh trùng ${type} công suất ${capacity}. Nhiệt độ ${temperature}, thời gian giữ ${holdingTime}. Hiệu suất cao, an toàn thực phẩm. Phù hợp cho sữa, nước ép, đồ uống.`;
    }

    generatePasteurizerDescriptionEn(type, capacity, temperature, holdingTime) {
        return `${type} pasteurization system with ${capacity} capacity. ${temperature} temperature, ${holdingTime} holding time. High efficiency, food safety compliant. Suitable for milk, juice, beverages.`;
    }

    generatePasteurizerDescriptionJa(type, capacity, temperature, holdingTime) {
        return `${capacity}容量を備えた${type}低温殺菌システム。${temperature}温度、${holdingTime}保持時間。高効率、食品安全準拠。牛乳、ジュース、飲料に適しています。`;
    }

    generatePasteurizerApplications(type) {
        const appMap = {
            "HTST": ["Sữa tươi", "Nước ép", "Đồ uống"],
            "Batch": ["Sản phẩm nhỏ", "Nghiên cứu", "Phát triển"],
            "Tunnel": ["Thực phẩm đóng gói", "Bia", "Đồ hộp"],
            "Plate": ["Sữa", "Sữa chua", "Kem"],
            "Tubular": ["Đồ uống đặc", "Sản phẩm viscos", "Thực phẩm chức năng"]
        };
        
        const applications = appMap[type] || ["Thanh trùng thực phẩm", "An toàn thực phẩm"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} system`,
            description_ja: `${type}システムの${app}アプリケーション`
        }));
    }

    generatePasteurizerCompatibility(control) {
        const compatMap = {
            "Manual": ["Basic control", "Operator monitoring"],
            "Automatic": ["Temperature control", "Process automation"],
            "PLC": ["Programmable control", "Data logging"],
            "SCADA integrated": ["Remote monitoring", "Integration", "Advanced control"]
        };
        return compatMap[control] || ["Standard control systems"];
    }

    // Additional methods for remaining product types would follow similar patterns
    // For brevity, implementing essential ones to complete Phase 3
    generateSterilizerDescription(type, capacity, temperature, cycleTime) {
        return `Hệ thống diệt khuẩn ${type} dung tích ${capacity}. Nhiệt độ ${temperature}, chu trình ${cycleTime}. Diệt khuẩn tuyệt đối, an toàn cao. Phù hợp cho thiết bị y tế, thực phẩm đóng hộp.`;
    }

    generateSterilizerDescriptionEn(type, capacity, temperature, cycleTime) {
        return `${type} sterilization system with ${capacity} capacity. ${temperature} temperature, ${cycleTime} cycle. Absolute sterilization, high safety. Suitable for medical equipment, canned foods.`;
    }

    generateSterilizerDescriptionJa(type, capacity, temperature, cycleTime) {
        return `${capacity}容量を備えた${type}殺菌システム。${temperature}温度、${cycleTime}サイクル。絶対殺菌、高安全性。医療機器、缶詰食品に適しています。`;
    }

    generateSterilizerApplications(type) {
        const appMap = {
            "Steam": ["Thiết bị y tế", "Thực phẩm", "Dược phẩm"],
            "Autoclave": ["Lab equipment", "Research", "Sterilization"],
            "Retort": ["Thực phẩm đóng hộp", "Bia", "Đồ hộp"],
            "Dry heat": ["Thủy tinh", "Kim loại", "Lab"],
            "Chemical": ["Bề mặt", "Thiết bị", "Khử trùng"]
        };
        
        const applications = appMap[type] || ["Diệt khuẩn", "Y tế", "Thực phẩm"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} system`,
            description_ja: `${type}システムの${app}アプリケーション`
        }));
    }

    generateSterilizerCompatibility(loading) {
        const compatMap = {
            "Static": ["Batch processing", "Standard loading"],
            "Dynamic": ["Continuous", "Automated loading"],
            "Rotary": ["Enhanced heat transfer", "Uniform sterilization"],
            "Basket": ["Flexible loading", "Various products"]
        };
        return compatMap[loading] || ["Standard loading systems"];
    }

    generateDryingEquipmentDescription(type, capacity, method, temperature) {
        return `Thiết bị sấy ${type} công suất ${capacity}. Phương pháp ${method}, nhiệt độ ${temperature}. Hiệu suất sấy cao, tiết kiệm năng lượng. Phù hợp cho nông sản, thực phẩm.`;
    }

    generateDryingEquipmentDescriptionEn(type, capacity, method, temperature) {
        return `${type} drying equipment with ${capacity} capacity. ${method} method, ${temperature} temperature. High drying efficiency, energy saving. Suitable for agricultural products, foods.`;
    }

    generateDryingEquipmentDescriptionJa(type, capacity, method, temperature) {
        return `${capacity}容量を備えた${type}乾燥装置。${method}方法、${temperature}温度。高い乾燥効率、省エネ。農産物、食品に適しています。`;
    }

    generateDryingEquipmentApplications(type) {
        const appMap = {
            "Tray Dryer": ["Rau củ", "Thịt", "Hải sản"],
            "Rotary Dryer": ["Ngũ cốc", "Hạt", "Sản phẩm rời"],
            "Fluid Bed Dryer": ["Bột", "Hạt nhỏ", "Hóa chất"],
            "Spray Dryer": ["Sữa powder", "Cà phê", "Trà"],
            "Drum Dryer": ["Khoai tây", "Sản phẩm tinh bột", "Mì"]
        };
        
        const applications = appMap[type] || ["Sấy thực phẩm", "Nông sản", "Hóa chất"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} equipment`,
            description_ja: `${type}装置の${app}アプリケーション`
        }));
    }

    generateDryingEquipmentCompatibility(humidity) {
        const compatMap = {
            "No": ["Basic drying", "Simple control"],
            "Basic": ["Humidity monitoring", "Standard control"],
            "Advanced": ["Precise control", "Programmable"],
            "Precision": ["Advanced control", "High accuracy"]
        };
        return compatMap[humidity] || ["Standard drying systems"];
    }

    generateFreezeDryerDescription(type, capacity, shelfTemp, vacuum) {
        return `Máy sấy thăng hoa ${type} công suất ${capacity}. Nhiệt độ kệ ${shelfTemp}, chân không ${vacuum}. Chất lượng sấy cao, giữ nguyên dinh dưỡng. Phù hợp cho dược phẩm, thực phẩm cao cấp.`;
    }

    generateFreezeDryerDescriptionEn(type, capacity, shelfTemp, vacuum) {
        return `${type} freeze dryer with ${capacity} capacity. ${shelfTemp} shelf temperature, ${vacuum} vacuum. High drying quality, preserves nutrients. Suitable for pharmaceuticals, premium foods.`;
    }

    generateFreezeDryerDescriptionJa(type, capacity, shelfTemp, vacuum) {
        return `${capacity}容量を備えた${type}凍結乾燥機。${shelfTemp}棚温度、${vacuum}真空。高い乾燥品質、栄養素を保持。医薬品、高級食品に適しています。`;
    }

    generateFreezeDryerApplications(type) {
        const appMap = {
            "Batch": ["Dược phẩm", "Cà phê đặc sản", "Trái cây"],
            "Continuous": ["Sản xuất lớn", "Công nghiệp", "Quy mô lớn"],
            "Pilot": ["Nghiên cứu", "Phát triển", "Thử nghiệm"],
            "Industrial": ["Sản xuất công nghiệp", "Quy mô lớn", "Tự động"]
        };
        
        const applications = appMap[type] || ["Sấy thăng hoa", "Dược phẩm", "Thực phẩm cao cấp"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} dryer`,
            description_ja: `${type}乾燥機の${app}アプリケーション`
        }));
    }

    generateFreezeDryerCompatibility(vacuum) {
        const compatMap = {
            "100-200 mbar": ["Standard vacuum", "Basic applications"],
            "50-100 mbar": ["High vacuum", "Quality drying"],
            "10-50 mbar": ["Ultra-high vacuum", "Premium products"],
            "1-10 mbar": ["Research grade", "Advanced applications"]
        };
        return compatMap[vacuum] || ["Standard vacuum systems"];
    }

    generateRefrigerationSystemDescription(type, capacity, refrigerant, temperature) {
        return `Hệ thống lạnh ${type} công suất ${capacity}. Chất làm lạnh ${refrigerant}, nhiệt độ ${temperature}. Hiệu suất cao, thân thiện môi trường. Phù hợp cho kho lạnh, siêu thị.`;
    }

    generateRefrigerationSystemDescriptionEn(type, capacity, refrigerant, temperature) {
        return `${type} refrigeration system with ${capacity} capacity. ${refrigerant} refrigerant, ${temperature} temperature. High efficiency, environmentally friendly. Suitable for cold storage, supermarkets.`;
    }

    generateRefrigerationSystemDescriptionJa(type, capacity, refrigerant, temperature) {
        return `${capacity}容量を備えた${type}冷凍システム。${refrigerant}冷媒、${temperature}温度。高効率、環境に優しい。冷蔵倉庫、スーパーマーケットに適しています。`;
    }

    generateRefrigerationSystemApplications(type) {
        const appMap = {
            "Compressor": ["Siêu thị", "Kho lạnh", "Nhà hàng"],
            "Absorption": ["Năng lượng mặt trời", "Gas", " areas không điện"],
            "Cascade": ["Cực lạnh", "-40°C", "Công nghiệp"],
            "Hybrid": ["Tiết kiệm năng lượng", "Linh hoạt", "Đa ứng dụng"]
        };
        
        const applications = appMap[type] || ["Làm lạnh thực phẩm", "Kho lạnh", "Siêu thị"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho hệ thống ${type}`,
            description_en: `${app} application for ${type} system`,
            description_ja: `${type}システムの${app}アプリケーション`
        }));
    }

    generateRefrigerationSystemCompatibility(control) {
        const compatMap = {
            "Mechanical": ["Basic control", "Manual operation"],
            "Electronic": ["Digital control", "Programmable"],
            "PLC": ["Automated control", "Integration"],
            "Smart control": ["IoT", "Remote monitoring", "AI optimization"]
        };
        return compatMap[control] || ["Standard control systems"];
    }

    generateColdStorageDescription(type, capacity, temperature, humidity) {
        return `Kho lạnh ${type} dung tích ${capacity}. Nhiệt độ ${temperature}, độ ẩm ${humidity}. Bảo quản chất lượng, ổn định. Phù hợp cho thực phẩm, dược phẩm.`;
    }

    generateColdStorageDescriptionEn(type, capacity, temperature, humidity) {
        return `${type} cold storage with ${capacity} capacity. ${temperature} temperature, ${humidity} humidity. Quality preservation, stable. Suitable for foods, pharmaceuticals.`;
    }

    generateColdStorageDescriptionJa(type, capacity, temperature, humidity) {
        return `${capacity}容量を備えた${type}冷蔵倉庫。${temperature}温度、${humidity}湿度。品質保存、安定。食品、医薬品に適しています。`;
    }

    generateColdStorageApplications(type) {
        const appMap = {
            "Blast Freezer": ["Đông lạnh nhanh", "Hải sản", "Thịt"],
            "Storage Freezer": ["Lưu trữ dài hạn", "Kho lạnh", "Phân phối"],
            "Cold Room": ["Rau củ", "Trái cây", "Sản phẩm tươi"],
            "Refrigerated Warehouse": ["Logistics", "Phân phối", "Kho trung tâm"]
        };
        
        const applications = appMap[type] || ["Bảo quản lạnh", "Logistics", "Phân phối"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho kho ${type}`,
            description_en: `${app} application for ${type} storage`,
            description_ja: `${type}倉庫の${app}アプリケーション`
        }));
    }

    generateColdStorageCompatibility(monitoring) {
        const compatMap = {
            "Basic": ["Temperature monitoring", "Basic alarms"],
            "Advanced": ["Humidity control", "Data logging"],
            "Remote": ["Remote monitoring", "Alerts"],
            "IoT integrated": ["Smart monitoring", "Predictive maintenance"]
        };
        return compatMap[monitoring] || ["Standard monitoring systems"];
    }

    generateQualityControlDescription(type, speed, detection, productType) {
        return `Thiết bị kiểm tra chất lượng ${type} tốc độ ${speed}. Phát hiện ${detection}, sản phẩm ${productType}. Kiểm tra tự động, độ chính xác cao. Đảm bảo chất lượng sản phẩm.`;
    }

    generateQualityControlDescriptionEn(type, speed, detection, productType) {
        return `${type} quality control equipment with ${speed} speed. ${detection} detection, ${productType} products. Automatic inspection, high accuracy. Ensures product quality.`;
    }

    generateQualityControlDescriptionJa(type, speed, detection, productType) {
        return `${speed}速度を備えた${type}品質管理装置。${detection}検出、${productType}製品。自動検査、高精度。製品品質を確保します。`;
    }

    generateQualityControlApplications(type) {
        const appMap = {
            "Vision System": ["Kiểm tra ngoại quan", "Màu sắc", "Hình dạng"],
            "Weight Checker": ["Cân kiểm tra", "Đóng gói", "Phân phối"],
            "Contamination Detector": ["Kiểm tra tạp chất", "An toàn thực phẩm", "Dược phẩm"],
            "Fill Level Inspector": ["Kiểm tra mức đầy", "Đóng chai", "Đóng hộp"]
        };
        
        const applications = appMap[type] || ["Kiểm tra chất lượng", "An toàn thực phẩm", "Đóng gói"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho thiết bị ${type}`,
            description_en: `${app} application for ${type} equipment`,
            description_ja: `${type}装置の${app}アプリケーション`
        }));
    }

    generateQualityControlCompatibility(logging) {
        const compatMap = {
            "Basic": ["Simple data", "Basic reporting"],
            "Advanced": ["Statistical analysis", "Trend analysis"],
            "Statistical": ["SPC", "Quality metrics"],
            ["Real-time analytics"]: ["Live monitoring", "Predictive quality"]
        };
        return compatMap[logging] || ["Standard data logging"];
    }

    generateMetalDetectorDescription(type, sensitivity, aperture, productType) {
        return `Máy dò kim loại ${type} độ nhạy ${sensitivity}. Khẩu độ ${aperture}, sản phẩm ${productType}. Phát hiện chính xác, đáng tin cậy. Đảm bảo an toàn thực phẩm.`;
    }

    generateMetalDetectorDescriptionEn(type, sensitivity, aperture, productType) {
        return `${type} metal detector with ${sensitivity} sensitivity. ${aperture} aperture, ${productType} products. Accurate detection, reliable. Ensures food safety.`;
    }

    generateMetalDetectorDescriptionJa(type, sensitivity, aperture, productType) {
        return `${sensitivity}感度を備えた${type}金属探知機。${aperture}開口部、${productType}製品。正確な検出、信頼性。食品安全を確保します。`;
    }

    generateMetalDetectorApplications(type) {
        const appMap = {
            "Conveyor": ["Dây chuyền", "Sản xuất hàng loạt", "Tự động"],
            "Pipeline": ["Chất lỏng", "Bột", "Dung dịch"],
            "Pharmaceutical": ["Dược phẩm", "Y tế", "Tiêu chuẩn cao"],
            "Gravity Fall": ["Rơi tự do", "Hạt", "Sản phẩm rời"]
        };
        
        const applications = appMap[type] || ["Dò kim loại", "An toàn thực phẩm", "Kiểm tra"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} detector`,
            description_ja: `${type}探知機の${app}アプリケーション`
        }));
    }

    generateMetalDetectorCompatibility(rejection) {
        const compatMap = {
            "Air blast": ["Light products", "Delicate items"],
            "Pusher": ["Standard products", "Robust items"],
            "Arm": ["Heavy products", "Large items"],
            "Divert": ["Multiple lanes", "Complex systems"]
        };
        return compatMap[rejection] || ["Standard rejection systems"];
    }

    generateXrayInspectorDescription(type, xraySource, detection, productSize) {
        return `Máy kiểm tra X-ray ${type} nguồn ${xraySource}. Phát hiện ${detection}, kích thước ${productSize}. Kiểm tra sâu, đa năng. Đảm bảo chất lượng và an toàn tuyệt đối.`;
    }

    generateXrayInspectorDescriptionEn(type, xraySource, detection, productSize) {
        return `${type} X-ray inspector with ${xraySource} source. ${detection} detection, ${productSize} size. Deep inspection, versatile. Ensures absolute quality and safety.`;
    }

    generateXrayInspectorDescriptionJa(type, xraySource, detection, productSize) {
        return `${xraySource}源を備えた${type}X線検査機。${detection}検出、${productSize}サイズ。深い検査、多目的。絶対的な品質と安全性を確保します。`;
    }

    generateXrayInspectorApplications(type) {
        const appMap = {
            "Conveyor": ["Dây chuyền", "Sản xuất", "Tự động"],
            "Bulk": ["Sản phẩm rời", "Nguyên liệu thô", "Hàng loạt"],
            "Pipeline": ["Chất lỏng", "Dung dịch", "Chất lỏng đặc"],
            "Jar inspection": ["Đóng chai", "Đóng hộp", "Kiểm tra cuối"]
        };
        
        const applications = appMap[type] || ["Kiểm tra X-ray", "An toàn thực phẩm", "Kiểm tra sâu"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type} inspector`,
            description_ja: `${type}検査機の${app}アプリケーション`
        }));
    }

    generateXrayInspectorCompatibility(imageProcessing) {
        const compatMap = {
            "Basic": ["Standard processing", "Basic detection"],
            "Advanced": ["Enhanced detection", "Better accuracy"],
            ["AI enhanced"]: ["Machine learning", "Smart detection"],
            ["Deep learning"]: ["Neural networks", "Advanced AI"]
        };
        return compatMap[imageProcessing] || ["Standard image processing"];
    }

    // Missing specification generation methods
    generatePasteurizerSpecs(type, capacity, temperature, holdingTime, heating, control) {
        return {
            basic: {
                pasteurizer_type: type,
                processing_capacity: capacity,
                pasteurization_temperature: temperature,
                holding_time: holdingTime,
                heating_method: heating,
                control_system: control
            },
            thermal_system: {
                heating_method: heating,
                temperature_control: "PID ±0.5°C",
                heat_exchanger: type === "Plate" ? "Plate heat exchanger" : "Shell & tube",
                insulation: "Rock wool 100mm",
                recovery_system: "Heat recovery 85%"
            },
            process_control: {
                control_type: control,
                temperature_monitoring: "Multiple points",
                flow_control: "Automated valves",
                safety_interlocks: "Temperature, pressure, flow",
                data_logging: "Recipe management"
            },
            construction: {
                frame_material: "Stainless steel 304",
                product_contact: "Stainless steel 316L",
                surface_finish: "Ra <0.4μm",
                design_pressure: "10 bar",
                design_temperature: "150°C"
            },
            performance: {
                processing_capacity: capacity,
                pasteurization_efficiency: ">99.9%",
                energy_consumption: heating === "Steam" ? "50-200 kg/h" : "20-100 kW",
                water_consumption: "5-20 m³/h",
                uptime: ">98%"
            }
        };
    }

    generateSterilizerSpecs(type, capacity, temperature, pressure, cycleTime, loading) {
        return {
            basic: {
                sterilizer_type: type,
                chamber_capacity: capacity,
                sterilization_temperature: temperature,
                operating_pressure: pressure,
                cycle_time: cycleTime,
                loading_type: loading
            },
            sterilization_system: {
                sterilization_method: type,
                temperature_control: "±1°C",
                pressure_control: "±0.1 bar",
                steam_quality: "Dry saturated steam",
                vacuum_system: type === "Autoclave" ? "Built-in vacuum" : "Optional"
            },
            chamber: {
                chamber_material: "Stainless steel 316L",
                chamber_design: loading === "Rotary" ? "Rotary basket" : "Static",
                door_type: "Double door with safety interlock",
                insulation: "Ceramic fiber 150mm",
                jacket_type: "Steam jacket"
            },
            control_system: {
                control_type: "PLC with HMI",
                cycle_programming: "20 programmable cycles",
                monitoring: "Temperature, pressure, time",
                safety_systems: "Multiple safety interlocks",
                documentation: "Automatic cycle recording"
            },
            utilities: {
                steam_requirement: "100-500 kg/h",
                compressed_air: "6 bar, 2 m³/min",
                cooling_water: "10-50 m³/h",
                electrical_power: "10-30 kW",
                floor_space: `${Math.ceil(parseInt(capacity) * 0.3)}m²`
            }
        };
    }

    generateDryingEquipmentSpecs(type, capacity, method, temperature, humidity, energy) {
        return {
            basic: {
                dryer_type: type,
                drying_capacity: capacity,
                drying_method: method,
                operating_temperature: temperature,
                humidity_control: humidity,
                energy_source: energy
            },
            drying_system: {
                drying_method: method,
                air_flow: "Adjustable 0.5-5 m/s",
                temperature_zones: "2-4 zones",
                moisture_control: humidity,
                heat_recovery: "Up to 60%"
            },
            construction: {
                frame_material: "Stainless steel 304",
                insulation: "Rock wool 100mm",
                access_doors: "Multiple inspection doors",
                product_contact: "Food grade materials",
                explosion_proof: method === "Infrared" ? "Yes" : "Optional"
            },
            control_system: {
                controller: "PLC with touch screen",
                temperature_control: "PID ±1°C",
                humidity_control: humidity === "No" ? "N/A" : "Advanced",
                process_recipes: "50+ recipes",
                data_logging: "Real-time monitoring"
            },
            performance: {
                drying_capacity: capacity,
                moisture_removal: "5-50 kg/h",
                energy_efficiency: method === "Microwave" ? "High" : "Standard",
                final_moisture: "<1%",
                batch_time: "2-8 hours"
            }
        };
    }

    generateFreezeDryerSpecs(type, capacity, shelfTemp, vacuum, cycleTime, condenser) {
        return {
            basic: {
                dryer_type: type,
                drying_capacity: capacity,
                shelf_temperature: shelfTemp,
                vacuum_level: vacuum,
                cycle_time: cycleTime,
                condenser_capacity: condenser
            },
            freezing_system: {
                shelf_type: "Aluminum plates with heating/cooling",
                temperature_range: shelfTemp,
                uniformity: "±1°C across shelves",
                loading_method: "Manual/Automatic loading",
                shelf_spacing: "50-100mm adjustable"
            },
            vacuum_system: {
                vacuum_pump: type === "Industrial" ? "Rotary vane + diffusion" : "Rotary vane",
                vacuum_level: vacuum,
                ultimate_vacuum: "<0.1 mbar",
                leak_rate: "<1 x 10⁻³ mbar L/s"
            },
            condenser: {
                condenser_type: "Cascade condenser",
                condenser_capacity: condenser,
                refrigeration: "Two-stage refrigeration",
                defrost_method: "Hot gas defrost",
                ice_buildup: "Automatic monitoring"
            },
            control_system: {
                controller: "PLC with 15\" HMI",
                cycle_programming: "100+ programmable cycles",
                process_monitoring: "Real-time temperature, pressure",
                safety_interlocks: "Multiple safety systems",
                data_acquisition: "Comprehensive data logging"
            }
        };
    }

    generateRefrigerationSystemSpecs(type, capacity, refrigerant, temperature, control, efficiency) {
        return {
            basic: {
                system_type: type,
                cooling_capacity: capacity,
                refrigerant_type: refrigerant,
                operating_temperature: temperature,
                control_method: control,
                efficiency_rating: efficiency
            },
            refrigeration_circuit: {
                compressor_type: type === "Compressor" ? "Screw/Scroll" : "Absorption",
                condenser_type: "Air cooled/Water cooled",
                evaporator_type: "Blast coil/Storage coil",
                expansion_valve: "Electronic expansion valve",
                refrigerant_charge: "50-200 kg"
            },
            control_system: {
                control_type: control,
                temperature_control: "±0.5°C",
                defrost_system: "Automatic defrost",
                alarm_system: "Multiple alarm points",
                remote_monitoring: control === "Smart control" ? "IoT enabled" : "Optional"
            },
            construction: {
                frame_material: "Stainless steel 304",
                panel_insulation: "PU foam 100mm",
                door_type: "Hinged/Sliding doors",
                floor: "Anti-slip stainless steel",
                accessibility: "Easy maintenance access"
            },
            performance: {
                cooling_capacity: capacity,
                cop_value: efficiency === "Ultra efficient" ? ">4.0" : "2.5-3.5",
                pull_down_time: "2-6 hours",
                humidity_control: "30-90% RH",
                air_distribution: "Uniform air flow"
            }
        };
    }

    generateColdStorageSpecs(type, capacity, temperature, humidity, door, monitoring) {
        return {
            basic: {
                storage_type: type,
                storage_capacity: capacity,
                operating_temperature: temperature,
                humidity_range: humidity,
                door_type: door,
                monitoring_system: monitoring
            },
            construction: {
                panel_type: "PU insulated panels",
                panel_thickness: "100-150mm",
                floor_type: "Heated floor for freezer",
                door_type: door,
                lighting: "LED lighting with motion sensor",
                emergency_exit: "Safety exit door"
            },
            refrigeration: {
                system_type: "Remote condensing unit",
                cooling_capacity: this.getColdStorageCoolingCapacity(capacity),
                temperature_control: "±1°C",
                humidity_control: humidity === "30-60%" ? "Dehumidifier" : "Humidifier",
                defrost_system: "Automatic defrost"
            },
            control_system: {
                monitoring: monitoring,
                temperature_recording: "Data logger",
                alarm_system: "Temperature/door/power alarms",
                remote_access: monitoring === "IoT integrated" ? "Web access" : "Optional",
                backup_power: "UPS for control system"
            },
            features: {
                racking_system: "Adjustable pallet racking",
                air_curtain: "Door air curtain",
                anti_slam: "Door closers",
                safety_features: "Emergency lighting, alarm systems",
                accessibility: "Wide doors for forklift access"
            }
        };
    }

    generateQualityControlSpecs(type, speed, detection, productType, rejection, logging) {
        return {
            basic: {
                inspection_type: type,
                inspection_speed: speed,
                detection_method: detection,
                product_type: productType,
                rejection_system: rejection,
                data_logging: logging
            },
            inspection_system: {
                detection_technology: detection,
                inspection_accuracy: detection === "X-ray" ? ">99.9%" : ">99.5%",
                resolution: type === "Vision System" ? "5MP" : "Standard",
                lighting: "LED lighting system",
                camera_system: type === "Vision System" ? "High-speed camera" : "N/A"
            },
            rejection_system: {
                rejection_type: rejection,
                rejection_accuracy: ">99%",
                rejection_speed: "Synchronized with line speed",
                collection_container: "Separate rejection bin",
                reset_time: "<1 second"
            },
            user_interface: {
                display: "10\" color touch screen",
                controls: "Intuitive operator interface",
                recipe_management: "100+ inspection recipes",
                language_options: "Multi-language support"
            },
            connectivity: {
                data_logging: logging,
                communication: "Ethernet/USB/RS485",
                integration: "MES/ERP integration",
                remote_access: "Optional remote monitoring"
            }
        };
    }

    generateMetalDetectorSpecs(type, sensitivity, aperture, productType, rejection, certification) {
        return {
            basic: {
                detector_type: type,
                detection_sensitivity: sensitivity,
                aperture_size: aperture,
                product_type: productType,
                rejection_system: rejection,
                certification_level: certification
            },
            detection_system: {
                detection_technology: "Balanced coil",
                sensitivity: sensitivity,
                frequency_range: "50-1000 kHz",
                phase_angle: "0-360°",
                noise_reduction: "Advanced filtering"
            },
            construction: {
                frame_material: "Stainless steel 304",
                aperture_lining: "Food grade polymer",
                conveyor_type: type === "Conveyor" ? "Modular belt" : "Gravity chute",
                height_adjustment: "Manual/electric adjustment",
                cleaning: "Easy clean design"
            },
            control_system: {
                controller: "Digital signal processor",
                display: "7\" LCD display",
                controls: "Touch screen interface",
                memory: "100+ product settings",
                connectivity: "Ethernet/USB"
            },
            performance: {
                detection_sensitivity: sensitivity,
                false_reject_rate: "<0.1%",
                throughput: type === "Conveyor" ? "30-60 m/min" : "Gravity fed",
                reliability: ">99.9%",
                compliance: certification
            }
        };
    }

    generateXrayInspectorSpecs(type, xraySource, detection, productSize, speed, imageProcessing) {
        return {
            basic: {
                inspector_type: type,
                xray_source: xraySource,
                detection_capabilities: detection,
                product_size: productSize,
                inspection_speed: speed,
                image_processing: imageProcessing
            },
            xray_system: {
                source_power: xraySource,
                generator_type: "Monoblock X-ray generator",
                beam_collimation: "Adjustable collimation",
                detector_type: "High-resolution diode array",
                image_quality: "16-bit grayscale"
            },
            inspection_system: {
                detection_capabilities: detection,
                contaminant_size: "0.2mm minimum",
                density_range: "Low to high density",
                inspection_accuracy: ">99.9%",
                false_positive_rate: "<0.5%"
            },
            software: {
                image_processing: imageProcessing,
                algorithm_type: imageProcessing === "Deep learning" ? "Neural network" : "Traditional",
                user_interface: "Graphical user interface",
                recipe_management: "Unlimited recipes",
                data_analysis: "Statistical process control"
            },
            construction: {
                frame_material: "Stainless steel 304",
                shielding: "Lead shielding for safety",
                interlocks: "Multiple safety interlocks",
                access_doors: "Safety interlocked doors",
                compliance: "FDA, HACCP, IEC 62443"
            }
        };
    }

    // Helper method for cold storage cooling capacity calculation
    getColdStorageCoolingCapacity(capacity) {
        const capacityMap = {
            "10-50 m³": "5-15 kW",
            "50-200 m³": "15-50 kW", 
            "200-1000 m³": "50-200 kW",
            "1000-5000 m³": "200-1000 kW"
        };
        return capacityMap[capacity] || "50-200 kW";
    }
}

// Usage and execution
const phase3Generator = new FoodProcessingEquipmentGenerator();

// Generate and export Phase 3 products
const phase3Data = phase3Generator.exportPhase3Products();

console.log("\n=== Phase 3 Summary ===");
console.log("Categories implemented:");
Object.entries(phase3Generator.categories).forEach(([key, cat]) => {
    console.log(`- ${cat.name}: ${cat.products} products`);
});

console.log("\nManufacturers:");
Object.entries(phase3Generator.manufacturers).forEach(([key, mfr]) => {
    console.log(`- ${mfr.name} (${mfr.country})`);
});

module.exports = FoodProcessingEquipmentGenerator;
