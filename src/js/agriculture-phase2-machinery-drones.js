/**
 * Phase 2: Agricultural Machinery & Drones Generator
 * Máy móc nông nghiệp và Drone nông nghiệp
 */

class AgricultureMachineryDronesGenerator {
    constructor() {
        this.categories = {
            // Máy móc nông nghiệp
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
            tillage_equipment: { 
                id: "cat_tillage_equipment", 
                name: "Máy cày xới", 
                name_en: "Tillage Equipment", 
                name_ja: "耕運機械", 
                products: 45 
            },
            sprayers: { 
                id: "cat_sprayers", 
                name: "Máy phun", 
                name_en: "Sprayers", 
                name_ja: "散布機", 
                products: 30 
            },
            
            // Drone nông nghiệp
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
            mapping_drones: { 
                id: "cat_mapping_drones", 
                name: "Drone bản đồ hóa", 
                name_en: "Mapping Drones", 
                name_ja: "マッピングドローン", 
                products: 20 
            }
        };

        this.manufacturers = {
            // Máy móc nông nghiệp
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
            kubota: { 
                id: "mfr_kubota", 
                name: "Kubota", 
                name_en: "Kubota Corporation", 
                name_ja: "クボタ", 
                country: "Japan", 
                reliability: 4.7, 
                lead_time: 28 
            },
            new_holland: { 
                id: "mfr_new_holland", 
                name: "New Holland", 
                name_en: "New Holland Agriculture", 
                name_ja: "ニューホランド", 
                country: "Italy", 
                reliability: 4.6, 
                lead_time: 30 
            },
            case_ih: { 
                id: "mfr_case_ih", 
                name: "Case IH", 
                name_en: "Case IH", 
                name_ja: "ケースIH", 
                country: "USA", 
                reliability: 4.7, 
                lead_time: 33 
            },
            massey_ferguson: { 
                id: "mfr_massey_ferguson", 
                name: "Massey Ferguson", 
                name_en: "Massey Ferguson", 
                name_ja: "マッシーファーガソン", 
                country: "USA", 
                reliability: 4.5, 
                lead_time: 35 
            },
            
            // Drone nông nghiệp
            dji: { 
                id: "mfr_dji", 
                name: "DJI", 
                name_en: "DJI Technology", 
                name_ja: "DJI", 
                country: "China", 
                reliability: 4.7, 
                lead_time: 15 
            },
            yuneec: { 
                id: "mfr_yuneec", 
                name: "Yuneec", 
                name_en: "Yuneec International", 
                name_ja: "ユニテック", 
                country: "China", 
                reliability: 4.5, 
                lead_time: 20 
            },
            sensefly: { 
                id: "mfr_sensefly", 
                name: "SenseFly", 
                name_en: "SenseFly SA", 
                name_ja: "センスフライ", 
                country: "Switzerland", 
                reliability: 4.6, 
                lead_time: 25 
            },
            parrot: { 
                id: "mfr_parrot", 
                name: "Parrot", 
                name_en: "Parrot Drones", 
                name_ja: "パロット", 
                country: "France", 
                reliability: 4.4, 
                lead_time: 22 
            },
            agrobotix: { 
                id: "mfr_agrobotix", 
                name: "Agrobotix", 
                name_en: "Agrobotix Inc.", 
                name_ja: "アグロボティクス", 
                country: "USA", 
                reliability: 4.5, 
                lead_time: 28 
            },
            sentera: { 
                id: "mfr_sentera", 
                name: "Sentera", 
                name_en: "Sentera Inc.", 
                name_ja: "センテラ", 
                country: "USA", 
                reliability: 4.6, 
                lead_time: 20 
            }
        };

        this.productTemplates = {
            tractors: {
                types: ["Utility", "Row Crop", "4WD", "Compact", "Orchard", "Vineyard"],
                power_ratings: ["50-100 HP", "100-200 HP", "200-400 HP", "20-50 HP", "70-120 HP", "80-150 HP"],
                transmissions: ["Manual", "Power Shift", "CVT", "Hydrostatic", "Shuttle"],
                cabin_types: ["Open", "AC Cabin", "Premium Cabin", "Climate Controlled"],
                drive_types: ["2WD", "4WD", "MFWD"],
                fuel_types: ["Diesel", "Bio-diesel", "Hybrid", "Electric"]
            },
            
            harvesters: {
                types: ["Combine", "Forage", "Potato", "Sugar Beet", "Cotton", "Fruit"],
                cutting_widths: ["3-4m", "4-6m", "6-8m", "2-3m", "5-7m"],
                grain_tank_capacities: ["6000L", "8000L", "10000L", "12000L", "4000L"],
                engine_power: ["200 HP", "300 HP", "400 HP", "500 HP", "150 HP"],
                header_types: ["Corn", "Wheat", "Rice", "Soybean", "Multi-crop"],
                unloading_rates: ["60 L/s", "80 L/s", "100 L/s", "120 L/s"]
            },
            
            planters: {
                types: ["Row Crop", "Air Seeder", "Grain Drill", "Precision", "No-till"],
                row_numbers: ["4 rows", "6 rows", "8 rows", "12 rows", "16 rows", "24 rows"],
                row_spacing: ["70cm", "75cm", "80cm", "90cm", "100cm"],
                seed_rates: ["Variable", "Fixed", "Precision"],
                fertilizer_integration: ["Yes", "No", "Optional"],
                monitoring_systems: ["Basic", "Advanced", "GPS", "Auto-section"]
            },
            
            tillage_equipment: {
                types: ["Moldboard Plow", "Disc Harrow", "Cultivator", "Rotary Tiller", "Subsoiler"],
                working_widths: ["2-3m", "3-4m", "4-5m", "5-6m", "6-8m"],
                depth_adjustment: ["Manual", "Hydraulic", "Automatic"],
                mounting_types: ["3-point Hitch", "Tractor Mounted", "Trailed"],
                number_of_shanks: ["4", "6", "8", "10", "12", "16"],
                disc_sizes: ["18 inch", "20 inch", "22 inch", "24 inch", "26 inch"]
            },
            
            sprayers: {
                types: ["Self-propelled", "Tractor Mounted", "Trailed", "Handheld", "ATV Mounted"],
                tank_capacities: ["300L", "500L", "1000L", "1500L", "2000L", "3000L"],
                boom_widths: ["12m", "15m", "18m", "21m", "24m", "30m"],
                pump_types: ["Piston", "Diaphragm", "Centrifugal", "Roller"],
                application_rates: ["Variable", "Fixed", "GPS-controlled"],
                nozzle_types: ["Flat Fan", "Cone", "Air Induction", "Drift Reduction"]
            },
            
            agricultural_drones: {
                types: ["Multi-rotor", "Fixed-wing", "Hybrid", "VTOL"],
                flight_times: ["20-30 min", "45-60 min", "30-45 min", "60-90 min"],
                payloads: ["5-10 kg", "10-20 kg", "20-30 kg", "2-5 kg"],
                applications: ["Spraying", "Monitoring", "Mapping", "Seeding", "Inspection"],
                control_ranges: ["2km", "5km", "10km", "20km"],
                gps_accuracy: ["±1m", "±0.5m", "±0.1m", "RTK"]
            },
            
            spraying_drones: {
                types: ["Octocopter", "Hexacopter", "Quadcopter", "Fixed-wing"],
                tank_capacities: ["5L", "10L", "16L", "20L", "30L"],
                spray_widths: ["2-3m", "3-4m", "4-5m", "5-6m"],
                flow_rates: ["1-2 L/min", "2-3 L/min", "3-4 L/min", "4-5 L/min"],
                battery_lives: ["15 min", "20 min", "25 min", "30 min"],
                charging_times: ["30 min", "45 min", "60 min", "90 min"]
            },
            
            monitoring_drones: {
                types: ["Quadcopter", "Fixed-wing", "VTOL", "Hybrid"],
                camera_specs: ["RGB 20MP", "Multispectral", "Thermal", "LiDAR", "Hyperspectral"],
                flight_times: ["25 min", "35 min", "45 min", "60 min"],
                coverage_areas: ["50 ha/day", "100 ha/day", "200 ha/day", "500 ha/day"],
                data_transmission: ["Real-time", "Post-flight", "Live streaming"],
                image_resolution: ["4K", "8K", "16MP", "42MP"]
            },
            
            mapping_drones: {
                types: ["Fixed-wing", "VTOL", "Quadcopter", "Hybrid"],
                mapping_accuracy: ["±5cm", "±3cm", "±1cm", "±0.5cm"],
                flight_planning: ["Automated", "Manual", "AI-optimized"],
                processing_times: ["2 hours", "4 hours", "8 hours", "24 hours"],
                output_formats: ["DEM", "DSM", "Orthomosaic", "3D Model", "Point Cloud"],
                gcp_requirements: ["None", "5-10", "10-20", "20+"]
            }
        };
    }

    // Generate Tractor
    generateTractor(type, power, transmission, cabin, drive, fuel, index) {
        const id = `TR${String(index + 1).padStart(3, '0')}-001`;
        const sku = `TR${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `JD-TR-${type}-${power}-${drive}`;
        
        return {
            id,
            sku,
            name: `Máy kéo ${type} ${power} ${drive}`,
            name_en: `${type} Tractor ${power} ${drive}`,
            name_ja: `${type}トラクター ${power} ${drive}`,
            short_description: `Máy kéo ${type} công suất ${power}, hộp số ${transmission}, cabin ${cabin}`,
            short_description_en: `${type} tractor ${power} power, ${transmission} transmission, ${cabin} cabin`,
            short_description_ja: `${type}トラクター ${power}出力、${transmission}変速機、${cabin}キャビン`,
            long_description: this.generateTractorDescription(type, power, transmission, cabin, drive),
            long_description_en: this.generateTractorDescriptionEn(type, power, transmission, cabin, drive),
            long_description_ja: this.generateTractorDescriptionJa(type, power, transmission, cabin, drive),
            category_id: "cat_tractors",
            subcategory: "Tractors",
            subcategory_en: "Tractors",
            subcategory_ja: "トラクター",
            manufacturer_id: "mfr_john_deere",
            brand: "John Deere",
            part_number: partNumber,
            specifications: this.generateTractorSpecs(type, power, transmission, cabin, drive, fuel),
            pricing: this.generatePricing(this.getTractorPrice(type, power)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateTractorApplications(type),
            compatibility: this.generateTractorCompatibility(transmission),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getTractorWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateTractorTags(type, power)
        };
    }

    // Generate Harvester
    generateHarvester(type, cuttingWidth, grainTank, enginePower, header, unloadingRate, index) {
        const id = `HV${String(index + 1).padStart(3, '0')}-001`;
        const sku = `HV${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `CNH-HV-${type}-${cuttingWidth}-${enginePower}`;
        
        return {
            id,
            sku,
            name: `Máy gặt ${type} ${cuttingWidth} ${enginePower}`,
            name_en: `${type} Harvester ${cuttingWidth} ${enginePower}`,
            name_ja: `${type}収穫機 ${cuttingWidth} ${enginePower}`,
            short_description: `Máy gặt ${type} rộng ${cuttingWidth}, thùng chứa ${grainTank}, động cơ ${enginePower}`,
            short_description_en: `${type} harvester ${cuttingWidth} width, ${grainTank} grain tank, ${enginePower} engine`,
            short_description_ja: `${type}収穫機 ${cuttingWidth}幅、${grainTank}穀物タンク、${enginePower}エンジン`,
            long_description: this.generateHarvesterDescription(type, cuttingWidth, grainTank, enginePower),
            long_description_en: this.generateHarvesterDescriptionEn(type, cuttingWidth, grainTank, enginePower),
            long_description_ja: this.generateHarvesterDescriptionJa(type, cuttingWidth, grainTank, enginePower),
            category_id: "cat_harvesters",
            subcategory: "Harvesters",
            subcategory_en: "Harvesters",
            subcategory_ja: "収穫機",
            manufacturer_id: "mfr_cnh_industrial",
            brand: "CNH Industrial",
            part_number: partNumber,
            specifications: this.generateHarvesterSpecs(type, cuttingWidth, grainTank, enginePower, header, unloadingRate),
            pricing: this.generatePricing(this.getHarvesterPrice(type, enginePower)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateHarvesterApplications(type),
            compatibility: this.generateHarvesterCompatibility(header),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getHarvesterWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateHarvesterTags(type, cuttingWidth)
        };
    }

    // Generate Planter
    generatePlanter(type, rows, spacing, seedRate, fertilizer, monitoring, index) {
        const id = `PL${String(index + 1).padStart(3, '0')}-001`;
        const sku = `PL${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `AGCO-PL-${type}-${rows}-${spacing}`;
        
        return {
            id,
            sku,
            name: `Máy trồng ${type} ${rows} ${spacing}`,
            name_en: `${type} Planter ${rows} ${spacing}`,
            name_ja: `${type}植え付け機 ${rows} ${spacing}`,
            short_description: `Máy trồng ${type} ${rows}, khoảng cách ${spacing}, tốc độ gieo ${seedRate}`,
            short_description_en: `${type} planter ${rows}, ${spacing} spacing, ${seedRate} seed rate`,
            short_description_ja: `${type}植え付け機 ${rows}、${spacing}間隔、${seedRate}播種率`,
            long_description: this.generatePlanterDescription(type, rows, spacing, seedRate, fertilizer),
            long_description_en: this.generatePlanterDescriptionEn(type, rows, spacing, seedRate, fertilizer),
            long_description_ja: this.generatePlanterDescriptionJa(type, rows, spacing, seedRate, fertilizer),
            category_id: "cat_planters",
            subcategory: "Planters",
            subcategory_en: "Planters",
            subcategory_ja: "植え付け機",
            manufacturer_id: "mfr_agco",
            brand: "AGCO",
            part_number: partNumber,
            specifications: this.generatePlanterSpecs(type, rows, spacing, seedRate, fertilizer, monitoring),
            pricing: this.generatePricing(this.getPlanterPrice(type, rows)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generatePlanterApplications(type),
            compatibility: this.generatePlanterCompatibility(monitoring),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getPlanterWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generatePlanterTags(type, rows)
        };
    }

    // Generate Agricultural Drone
    generateAgriculturalDrone(type, flightTime, payload, application, range, gps, index) {
        const id = `AD${String(index + 1).padStart(3, '0')}-001`;
        const sku = `AD${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `DJI-AD-${type}-${payload}-${application}`;
        
        return {
            id,
            sku,
            name: `Drone nông nghiệp ${type} ${payload} ${application}`,
            name_en: `${type} Agricultural Drone ${payload} ${application}`,
            name_ja: `${type}農業用ドローン ${payload} ${application}`,
            short_description: `Drone ${type} tải trọng ${payload}, bay ${flightTime}, ứng dụng ${application}`,
            short_description_en: `${type} drone ${payload} payload, ${flightTime} flight time, ${application} application`,
            short_description_ja: `${type}ドローン ${payload}ペイロード、${flightTime}飛行時間、${application}アプリケーション`,
            long_description: this.generateAgriculturalDroneDescription(type, flightTime, payload, application),
            long_description_en: this.generateAgriculturalDroneDescriptionEn(type, flightTime, payload, application),
            long_description_ja: this.generateAgriculturalDroneDescriptionJa(type, flightTime, payload, application),
            category_id: "cat_agricultural_drones",
            subcategory: "Agricultural Drones",
            subcategory_en: "Agricultural Drones",
            subcategory_ja: "農業用ドローン",
            manufacturer_id: "mfr_dji",
            brand: "DJI",
            part_number: partNumber,
            specifications: this.generateAgriculturalDroneSpecs(type, flightTime, payload, application, range, gps),
            pricing: this.generatePricing(this.getAgriculturalDronePrice(type, payload)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateAgriculturalDroneApplications(application),
            compatibility: this.generateAgriculturalDroneCompatibility(gps),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getAgriculturalDroneWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateAgriculturalDroneTags(type, application)
        };
    }

    // Generate Spraying Drone
    generateSprayingDrone(type, tankCapacity, sprayWidth, flowRate, batteryLife, charging, index) {
        const id = `SD${String(index + 1).padStart(3, '0')}-001`;
        const sku = `SD${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `YUN-SD-${type}-${tankCapacity}-${sprayWidth}`;
        
        return {
            id,
            sku,
            name: `Drone phun ${type} ${tankCapacity} ${sprayWidth}`,
            name_en: `${type} Spraying Drone ${tankCapacity} ${sprayWidth}`,
            name_ja: `${type}散布ドローン ${tankCapacity} ${sprayWidth}`,
            short_description: `Drone phun ${type} bình ${tankCapacity}, rộng ${sprayWidth}, lưu lượng ${flowRate}`,
            short_description_en: `${type} spraying drone ${tankCapacity} tank, ${sprayWidth} width, ${flowRate} flow rate`,
            short_description_ja: `${type}散布ドローン ${tankCapacity}タンク、${sprayWidth}幅、${flowRate}流量`,
            long_description: this.generateSprayingDroneDescription(type, tankCapacity, sprayWidth, flowRate),
            long_description_en: this.generateSprayingDroneDescriptionEn(type, tankCapacity, sprayWidth, flowRate),
            long_description_ja: this.generateSprayingDroneDescriptionJa(type, tankCapacity, sprayWidth, flowRate),
            category_id: "cat_spraying_drones",
            subcategory: "Spraying Drones",
            subcategory_en: "Spraying Drones",
            subcategory_ja: "散布ドローン",
            manufacturer_id: "mfr_yuneec",
            brand: "Yuneec",
            part_number: partNumber,
            specifications: this.generateSprayingDroneSpecs(type, tankCapacity, sprayWidth, flowRate, batteryLife, charging),
            pricing: this.generatePricing(this.getSprayingDronePrice(type, tankCapacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateSprayingDroneApplications(),
            compatibility: this.generateSprayingDroneCompatibility(),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getSprayingDroneWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateSprayingDroneTags(type, tankCapacity)
        };
    }

    // Description generation methods
    generateTractorDescription(type, power, transmission, cabin, drive) {
        return `Máy kéo ${type} công suất ${power} mạnh mẽ với hệ thống truyền động ${transmission}. Cabin ${cabin} hiện đại, tiện nghi. Hệ dẫn động ${drive} vượt trội cho mọi địa hình. Thiết kế bền bỉ, hiệu suất cao, phù hợp cho nông nghiệp quy mô lớn và nhỏ.`;
    }

    generateTractorDescriptionEn(type, power, transmission, cabin, drive) {
        return `Powerful ${type} tractor with ${power} engine power and ${transmission} transmission. Modern ${cabin} with premium comfort. Superior ${drive} drive system for all terrain. Durable design, high efficiency, suitable for large and small scale agriculture.`;
    }

    generateTractorDescriptionJa(type, power, transmission, cabin, drive) {
        return `${power}エンジン出力と${transmission}変速機を搭載した強力な${type}トラクター。プレミアムな快適性を備えたモダンな${cabin}。全地形対応の優れた${drive}駆動システム。耐久性のある設計、高効率、大規模および小規模農業に適しています。`;
    }

    // Specification generation methods
    generateTractorSpecs(type, power, transmission, cabin, drive, fuel) {
        return {
            basic: {
                tractor_type: type,
                engine_power: power,
                transmission: transmission,
                cabin_type: cabin,
                drive_type: drive,
                fuel_type: fuel
            },
            engine: {
                displacement: this.getEngineDisplacement(power),
                cylinders: "4-6 cylinders",
                aspiration: "Turbocharged",
                emission_standard: "Tier 4 Final",
                fuel_consumption: "8-15 L/h"
            },
            transmission: {
                type: transmission,
                gears: "12-24 speeds",
                pto_speed: "540/1000 RPM",
                hydraulic_flow: "80-120 L/min",
                brake_type: "Oil-immersed multi-disc"
            },
            dimensions: {
                length: "4000-6000mm",
                width: "2000-3000mm", 
                height: "2500-3500mm",
                wheelbase: "2200-3200mm",
                ground_clearance: "300-500mm"
            },
            performance: {
                max_speed: "30-40 km/h",
                lifting_capacity: "2000-8000 kg",
                drawbar_power: "85-95% of engine power",
                turning_radius: "4.5-7.5m"
            }
        };
    }

    generateHarvesterSpecs(type, cuttingWidth, grainTank, enginePower, header, unloadingRate) {
        return {
            basic: {
                harvester_type: type,
                cutting_width: cuttingWidth,
                grain_tank_capacity: grainTank,
                engine_power: enginePower,
                header_type: header,
                unloading_rate: unloadingRate
            },
            engine: {
                power: enginePower,
                displacement: "7-12L",
                cylinders: "6-8 cylinders",
                fuel_consumption: "25-40 L/h",
                emission_standard: "Tier 4 Final"
            },
            harvesting: {
                cutting_width: cuttingWidth,
                header_types: [header],
                grain_loss: "<1%",
                cleaning_efficiency: ">98%",
                straw_quality: "Excellent"
            },
            capacity: {
                grain_tank: grainTank,
                unloading_rate: unloadingRate,
                fuel_tank: "400-800L",
                operating_hours: "8-12 hours"
            },
            dimensions: {
                length: "8000-12000mm",
                width: cuttingWidth,
                height: "3500-4500mm",
                weight: "10000-15000 kg"
            }
        };
    }

    generatePlanterSpecs(type, rows, spacing, seedRate, fertilizer, monitoring) {
        return {
            basic: {
                planter_type: type,
                number_of_rows: rows,
                row_spacing: spacing,
                seed_rate: seedRate,
                fertilizer_integration: fertilizer,
                monitoring_system: monitoring
            },
            seeding: {
                seed_metering: "Precision vacuum",
                singulation_accuracy: ">99%",
                population_control: "Variable rate",
                seed_depth_control: "Automatic"
            },
            frame: {
                construction: "Steel frame",
                folding: "Hydraulic folding",
                transport_width: "3-4m",
                ground_clearance: "500-800mm",
            },
            monitoring: {
                system: monitoring,
                gps_integration: "Yes",
                section_control: "Automatic",
                data_logging: "Real-time"
            },
            capacity: {
                seed_hoppers: "200-500L per row",
                fertilizer_hoppers: "Optional 100-300L",
                working_speed: "6-12 km/h",
                daily_capacity: "50-200 ha"
            }
        };
    }

    generateAgriculturalDroneSpecs(type, flightTime, payload, application, range, gps) {
        return {
            basic: {
                drone_type: type,
                flight_time: flightTime,
                payload_capacity: payload,
                primary_application: application,
                control_range: range,
                gps_accuracy: gps
            },
            airframe: {
                frame_material: "Carbon fiber/Aluminum",
                motors: "Brushless DC",
                propellers: "Carbon fiber",
                landing_gear: "Retractable/Fixed",
                ip_rating: "IP43"
            },
            flight_performance: {
                max_speed: "50-80 km/h",
                cruise_speed: "30-50 km/h",
                operating_altitude: "2-200m",
                wind_resistance: "8-12 m/s",
                temperature_range: "-10 to 40°C"
            },
            control_system: {
                flight_controller: "Advanced autopilot",
                gps: gps.includes("RTK") ? "RTK GPS" : "Standard GPS",
                communication: "Radio/4G/WiFi",
                flight_modes: ["Auto", "Manual", "Return to Home"]
            },
            battery: {
                type: "Li-Po",
                capacity: "20000-40000 mAh",
                voltage: "22.2-48V",
                charging_time: "60-90 minutes",
                battery_life: "300-500 cycles"
            }
        };
    }

    generateSprayingDroneSpecs(type, tankCapacity, sprayWidth, flowRate, batteryLife, charging) {
        return {
            basic: {
                drone_type: type,
                tank_capacity: tankCapacity,
                spray_width: sprayWidth,
                flow_rate: flowRate,
                battery_life: batteryLife,
                charging_time: charging
            },
            spraying_system: {
                pump_type: "Diaphragm pump",
                nozzle_configuration: "Multi-nozzle array",
                spray_pattern: "Adjustable cone/fan",
                flow_control: "Variable rate",
                tank_material: "Chemical-resistant polymer"
            },
            flight_performance: {
                flight_time: batteryLife,
                operating_speed: "5-10 m/s",
                spray_height: "1-3m above canopy",
                coverage_rate: "5-15 ha/hour",
                wind_resistance: "6-8 m/s"
            },
            control: {
                flight_planning: "Automated waypoint",
                obstacle_avoidance: "Ultrasonic/Visual",
                real_time_monitoring: "Yes",
            data_logging: "Flight and spray data"
            },
            safety: {
                emergency_landing: "Automatic",
                low_battery_return: "Yes",
                fail_safe_systems: "Redundant flight controls",
                maintenance_alerts: "Scheduled reminders"
            }
        };
    }

    // Price calculation methods
    getTractorPrice(type, power) {
        const basePrices = {
            "Utility": 250000000,
            "Row Crop": 350000000,
            "4WD": 450000000,
            "Compact": 150000000,
            "Orchard": 300000000,
            "Vineyard": 320000000
        };
        
        const powerMultiplier = {
            "50-100 HP": 0.8,
            "100-200 HP": 1,
            "200-400 HP": 1.5,
            "20-50 HP": 0.6,
            "70-120 HP": 0.9,
            "80-150 HP": 1.1
        };
        
        const basePrice = basePrices[type] || 300000000;
        return Math.round(basePrice * (powerMultiplier[power] || 1));
    }

    getHarvesterPrice(type, enginePower) {
        const basePrices = {
            "Combine": 800000000,
            "Forage": 600000000,
            "Potato": 700000000,
            "Sugar Beet": 750000000,
            "Cotton": 650000000,
            "Fruit": 500000000
        };
        
        const powerMultiplier = {
            "200 HP": 0.8,
            "300 HP": 1,
            "400 HP": 1.3,
            "500 HP": 1.5,
            "150 HP": 0.7
        };
        
        const basePrice = basePrices[type] || 650000000;
        return Math.round(basePrice * (powerMultiplier[enginePower] || 1));
    }

    getPlanterPrice(type, rows) {
        const basePrices = {
            "Row Crop": 200000000,
            "Air Seeder": 250000000,
            "Grain Drill": 150000000,
            "Precision": 300000000,
            "No-till": 220000000
        };
        
        const rowMultiplier = {
            "4 rows": 0.6,
            "6 rows": 0.8,
            "8 rows": 1,
            "12 rows": 1.3,
            "16 rows": 1.5,
            "24 rows": 2
        };
        
        const basePrice = basePrices[type] || 200000000;
        return Math.round(basePrice * (rowMultiplier[rows] || 1));
    }

    getAgriculturalDronePrice(type, payload) {
        const basePrices = {
            "Multi-rotor": 80000000,
            "Fixed-wing": 120000000,
            "Hybrid": 150000000,
            "VTOL": 140000000
        };
        
        const payloadMultiplier = {
            "5-10 kg": 0.8,
            "10-20 kg": 1,
            "20-30 kg": 1.3,
            "2-5 kg": 0.6
        };
        
        const basePrice = basePrices[type] || 100000000;
        return Math.round(basePrice * (payloadMultiplier[payload] || 1));
    }

    getSprayingDronePrice(type, tankCapacity) {
        const basePrices = {
            "Octocopter": 120000000,
            "Hexacopter": 100000000,
            "Quadcopter": 80000000,
            "Fixed-wing": 150000000
        };
        
        const tankMultiplier = {
            "5L": 0.7,
            "10L": 0.9,
            "16L": 1,
            "20L": 1.2,
            "30L": 1.5
        };
        
        const basePrice = basePrices[type] || 100000000;
        return Math.round(basePrice * (tankMultiplier[tankCapacity] || 1));
    }

    // Weight calculation methods
    getTractorWeight(type) {
        const weights = {
            "Utility": 3500,
            "Row Crop": 4500,
            "4WD": 6000,
            "Compact": 2000,
            "Orchard": 3000,
            "Vineyard": 3200
        };
        return weights[type] || 4000;
    }

    getHarvesterWeight(type) {
        const weights = {
            "Combine": 12000,
            "Forage": 10000,
            "Potato": 11000,
            "Sugar Beet": 11500,
            "Cotton": 9000,
            "Fruit": 8000
        };
        return weights[type] || 10000;
    }

    getPlanterWeight(type) {
        const weights = {
            "Row Crop": 3000,
            "Air Seeder": 4000,
            "Grain Drill": 2500,
            "Precision": 3500,
            "No-till": 3200
        };
        return weights[type] || 3000;
    }

    getAgriculturalDroneWeight(type) {
        const weights = {
            "Multi-rotor": 25,
            "Fixed-wing": 15,
            "Hybrid": 30,
            "VTOL": 28
        };
        return weights[type] || 20;
    }

    getSprayingDroneWeight(type) {
        const weights = {
            "Octocopter": 35,
            "Hexacopter": 28,
            "Quadcopter": 20,
            "Fixed-wing": 25
        };
        return weights[type] || 25;
    }

    // Helper methods
    getEngineDisplacement(power) {
        const displacementMap = {
            "50-100 HP": "3-4L",
            "100-200 HP": "4-6L", 
            "200-400 HP": "6-9L",
            "20-50 HP": "2-3L",
            "70-120 HP": "3.5-4.5L",
            "80-150 HP": "4-5.5L"
        };
        return displacementMap[power] || "4-6L";
    }

    // Generate all products for Phase 2
    generateAllPhase2Products() {
        const products = [];
        let productIndex = 0;

        // Generate Tractors (50 products)
        const tractorTypes = ["Utility", "Row Crop", "4WD", "Compact", "Orchard", "Vineyard"];
        const tractorPowers = ["50-100 HP", "100-200 HP", "200-400 HP", "20-50 HP", "70-120 HP", "80-150 HP"];
        const tractorTransmissions = ["Manual", "Power Shift", "CVT", "Hydrostatic", "Shuttle"];
        const tractorCabins = ["Open", "AC Cabin", "Premium Cabin", "Climate Controlled"];
        const tractorDrives = ["2WD", "4WD", "MFWD"];
        const tractorFuels = ["Diesel", "Bio-diesel", "Hybrid", "Electric"];

        for (let i = 0; i < 50; i++) {
            const typeIndex = i % tractorTypes.length;
            const powerIndex = i % tractorPowers.length;
            const transmissionIndex = i % tractorTransmissions.length;
            const cabinIndex = i % tractorCabins.length;
            const driveIndex = i % tractorDrives.length;
            const fuelIndex = i % tractorFuels.length;
            
            products.push(this.generateTractor(
                tractorTypes[typeIndex],
                tractorPowers[powerIndex],
                tractorTransmissions[transmissionIndex],
                tractorCabins[cabinIndex],
                tractorDrives[driveIndex],
                tractorFuels[fuelIndex],
                productIndex++
            ));
        }

        // Generate Harvesters (40 products)
        const harvesterTypes = ["Combine", "Forage", "Potato", "Sugar Beet", "Cotton", "Fruit"];
        const cuttingWidths = ["3-4m", "4-6m", "6-8m", "2-3m", "5-7m"];
        const grainTanks = ["6000L", "8000L", "10000L", "12000L", "4000L"];
        const enginePowers = ["200 HP", "300 HP", "400 HP", "500 HP", "150 HP"];
        const headerTypes = ["Corn", "Wheat", "Rice", "Soybean", "Multi-crop"];
        const unloadingRates = ["60 L/s", "80 L/s", "100 L/s", "120 L/s"];

        for (let i = 0; i < 40; i++) {
            const typeIndex = i % harvesterTypes.length;
            const widthIndex = i % cuttingWidths.length;
            const tankIndex = i % grainTanks.length;
            const powerIndex = i % enginePowers.length;
            const headerIndex = i % headerTypes.length;
            const unloadingIndex = i % unloadingRates.length;
            
            products.push(this.generateHarvester(
                harvesterTypes[typeIndex],
                cuttingWidths[widthIndex],
                grainTanks[tankIndex],
                enginePowers[powerIndex],
                headerTypes[headerIndex],
                unloadingRates[unloadingIndex],
                productIndex++
            ));
        }

        // Generate Planters (35 products)
        const planterTypes = ["Row Crop", "Air Seeder", "Grain Drill", "Precision", "No-till"];
        const rowNumbers = ["4 rows", "6 rows", "8 rows", "12 rows", "16 rows", "24 rows"];
        const rowSpacings = ["70cm", "75cm", "80cm", "90cm", "100cm"];
        const seedRates = ["Variable", "Fixed", "Precision"];
        const fertilizerIntegrations = ["Yes", "No", "Optional"];
        const monitoringSystems = ["Basic", "Advanced", "GPS", "Auto-section"];

        for (let i = 0; i < 35; i++) {
            const typeIndex = i % planterTypes.length;
            const rowsIndex = i % rowNumbers.length;
            const spacingIndex = i % rowSpacings.length;
            const seedRateIndex = i % seedRates.length;
            const fertilizerIndex = i % fertilizerIntegrations.length;
            const monitoringIndex = i % monitoringSystems.length;
            
            products.push(this.generatePlanter(
                planterTypes[typeIndex],
                rowNumbers[rowsIndex],
                rowSpacings[spacingIndex],
                seedRates[seedRateIndex],
                fertilizerIntegrations[fertilizerIndex],
                monitoringSystems[monitoringIndex],
                productIndex++
            ));
        }

        // Generate Agricultural Drones (30 products)
        const droneTypes = ["Multi-rotor", "Fixed-wing", "Hybrid", "VTOL"];
        const flightTimes = ["20-30 min", "45-60 min", "30-45 min", "60-90 min"];
        const payloads = ["5-10 kg", "10-20 kg", "20-30 kg", "2-5 kg"];
        const applications = ["Spraying", "Monitoring", "Mapping", "Seeding", "Inspection"];
        const controlRanges = ["2km", "5km", "10km", "20km"];
        const gpsAccuracies = ["±1m", "±0.5m", "±0.1m", "RTK"];

        for (let i = 0; i < 30; i++) {
            const typeIndex = i % droneTypes.length;
            const flightIndex = i % flightTimes.length;
            const payloadIndex = i % payloads.length;
            const applicationIndex = i % applications.length;
            const rangeIndex = i % controlRanges.length;
            const gpsIndex = i % gpsAccuracies.length;
            
            products.push(this.generateAgriculturalDrone(
                droneTypes[typeIndex],
                flightTimes[flightIndex],
                payloads[payloadIndex],
                applications[applicationIndex],
                controlRanges[rangeIndex],
                gpsAccuracies[gpsIndex],
                productIndex++
            ));
        }

        // Generate Spraying Drones (25 products)
        const sprayingTypes = ["Octocopter", "Hexacopter", "Quadcopter", "Fixed-wing"];
        const tankCapacities = ["5L", "10L", "16L", "20L", "30L"];
        const sprayWidths = ["2-3m", "3-4m", "4-5m", "5-6m"];
        const flowRates = ["1-2 L/min", "2-3 L/min", "3-4 L/min", "4-5 L/min"];
        const batteryLives = ["15 min", "20 min", "25 min", "30 min"];
        const chargingTimes = ["30 min", "45 min", "60 min", "90 min"];

        for (let i = 0; i < 25; i++) {
            const typeIndex = i % sprayingTypes.length;
            const tankIndex = i % tankCapacities.length;
            const widthIndex = i % sprayWidths.length;
            const flowIndex = i % flowRates.length;
            const batteryIndex = i % batteryLives.length;
            const chargingIndex = i % chargingTimes.length;
            
            products.push(this.generateSprayingDrone(
                sprayingTypes[typeIndex],
                tankCapacities[tankIndex],
                sprayWidths[widthIndex],
                flowRates[flowIndex],
                batteryLives[batteryIndex],
                chargingTimes[chargingIndex],
                productIndex++
            ));
        }

        // Generate Tillage Equipment (45 products)
        const tillageTypes = ["Moldboard Plow", "Disc Harrow", "Cultivator", "Rotary Tiller", "Subsoiler"];
        const workingWidths = ["2-3m", "3-4m", "4-5m", "5-6m", "6-8m"];
        const depthAdjustments = ["Manual", "Hydraulic", "Automatic"];
        const mountingTypes = ["3-point Hitch", "Tractor Mounted", "Trailed"];
        const shankNumbers = ["4", "6", "8", "10", "12", "16"];
        const discSizes = ["18 inch", "20 inch", "22 inch", "24 inch", "26 inch"];

        for (let i = 0; i < 45; i++) {
            const typeIndex = i % tillageTypes.length;
            const widthIndex = i % workingWidths.length;
            const depthIndex = i % depthAdjustments.length;
            const mountingIndex = i % mountingTypes.length;
            const shankIndex = i % shankNumbers.length;
            const discIndex = i % discSizes.length;
            
            products.push(this.generateTillageEquipment(
                tillageTypes[typeIndex],
                workingWidths[widthIndex],
                depthAdjustments[depthIndex],
                mountingTypes[mountingIndex],
                shankNumbers[shankIndex],
                discSizes[discIndex],
                productIndex++
            ));
        }

        // Generate Sprayers (30 products)
        const sprayerTypes = ["Self-propelled", "Tractor Mounted", "Trailed", "Handheld", "ATV Mounted"];
        const tankCapacitiesSprayer = ["300L", "500L", "1000L", "1500L", "2000L", "3000L"];
        const boomWidths = ["12m", "15m", "18m", "21m", "24m", "30m"];
        const pumpTypes = ["Piston", "Diaphragm", "Centrifugal", "Roller"];
        const applicationRates = ["Variable", "Fixed", "GPS-controlled"];
        const nozzleTypes = ["Flat Fan", "Cone", "Air Induction", "Drift Reduction"];

        for (let i = 0; i < 30; i++) {
            const typeIndex = i % sprayerTypes.length;
            const tankIndex = i % tankCapacitiesSprayer.length;
            const boomIndex = i % boomWidths.length;
            const pumpIndex = i % pumpTypes.length;
            const rateIndex = i % applicationRates.length;
            const nozzleIndex = i % nozzleTypes.length;
            
            products.push(this.generateSprayer(
                sprayerTypes[typeIndex],
                tankCapacitiesSprayer[tankIndex],
                boomWidths[boomIndex],
                pumpTypes[pumpIndex],
                applicationRates[rateIndex],
                nozzleTypes[nozzleIndex],
                productIndex++
            ));
        }

        // Generate Monitoring Drones (20 products)
        const monitoringTypes = ["Quadcopter", "Fixed-wing", "VTOL", "Hybrid"];
        const cameraSpecs = ["RGB 20MP", "Multispectral", "Thermal", "LiDAR", "Hyperspectral"];
        const monitoringFlightTimes = ["25 min", "35 min", "45 min", "60 min"];
        const coverageAreas = ["50 ha/day", "100 ha/day", "200 ha/day", "500 ha/day"];
        const dataTransmissions = ["Real-time", "Post-flight", "Live streaming"];
        const imageResolutions = ["4K", "8K", "16MP", "42MP"];

        for (let i = 0; i < 20; i++) {
            const typeIndex = i % monitoringTypes.length;
            const cameraIndex = i % cameraSpecs.length;
            const flightIndex = i % monitoringFlightTimes.length;
            const coverageIndex = i % coverageAreas.length;
            const transmissionIndex = i % dataTransmissions.length;
            const resolutionIndex = i % imageResolutions.length;
            
            products.push(this.generateMonitoringDrone(
                monitoringTypes[typeIndex],
                cameraSpecs[cameraIndex],
                monitoringFlightTimes[flightIndex],
                coverageAreas[coverageIndex],
                dataTransmissions[transmissionIndex],
                imageResolutions[resolutionIndex],
                productIndex++
            ));
        }

        // Generate Mapping Drones (20 products)
        const mappingTypes = ["Fixed-wing", "VTOL", "Quadcopter", "Hybrid"];
        const mappingAccuracies = ["±5cm", "±3cm", "±1cm", "±0.5cm"];
        const flightPlannings = ["Automated", "Manual", "AI-optimized"];
        const processingTimes = ["2 hours", "4 hours", "8 hours", "24 hours"];
        const outputFormats = ["DEM", "DSM", "Orthomosaic", "3D Model", "Point Cloud"];
        const gcpRequirements = ["None", "5-10", "10-20", "20+"];

        for (let i = 0; i < 20; i++) {
            const typeIndex = i % mappingTypes.length;
            const accuracyIndex = i % mappingAccuracies.length;
            const planningIndex = i % flightPlannings.length;
            const processingIndex = i % processingTimes.length;
            const outputIndex = i % outputFormats.length;
            const gcpIndex = i % gcpRequirements.length;
            
            products.push(this.generateMappingDrone(
                mappingTypes[typeIndex],
                mappingAccuracies[accuracyIndex],
                flightPlannings[planningIndex],
                processingTimes[processingIndex],
                outputFormats[outputIndex],
                gcpRequirements[gcpIndex],
                productIndex++
            ));
        }

        return products;
    }

    // Additional generator methods for other product types
    generateTillageEquipment(type, width, depth, mounting, shanks, discSize, index) {
        const id = `TE${String(index + 1).padStart(3, '0')}-001`;
        const sku = `TE${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `KB-TE-${type}-${width}-${shanks}`;
        
        return {
            id,
            sku,
            name: `Máy ${type} ${width} ${shanks} shank`,
            name_en: `${type} ${width} ${shanks} shank`,
            name_ja: `${type} ${width} ${shanks}シャンク`,
            short_description: `Máy ${type} rộng ${width}, ${shanks} shank, điều chỉnh ${depth}`,
            short_description_en: `${type} ${width} width, ${shanks} shanks, ${depth} adjustment`,
            short_description_ja: `${type} ${width}幅、${shanks}シャンク、${depth}調整`,
            long_description: this.generateTillageEquipmentDescription(type, width, depth, shanks),
            long_description_en: this.generateTillageEquipmentDescriptionEn(type, width, depth, shanks),
            long_description_ja: this.generateTillageEquipmentDescriptionJa(type, width, depth, shanks),
            category_id: "cat_tillage_equipment",
            subcategory: "Tillage Equipment",
            subcategory_en: "Tillage Equipment",
            subcategory_ja: "耕運機械",
            manufacturer_id: "mfr_kubota",
            brand: "Kubota",
            part_number: partNumber,
            specifications: this.generateTillageEquipmentSpecs(type, width, depth, mounting, shanks, discSize),
            pricing: this.generatePricing(this.getTillageEquipmentPrice(type, width)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateTillageEquipmentApplications(type),
            compatibility: this.generateTillageEquipmentCompatibility(mounting),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getTillageEquipmentWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateTillageEquipmentTags(type, width)
        };
    }

    generateSprayer(type, tankCapacity, boomWidth, pumpType, applicationRate, nozzleType, index) {
        const id = `SP${String(index + 1).padStart(3, '0')}-001`;
        const sku = `SP${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `NH-SP-${type}-${tankCapacity}-${boomWidth}`;
        
        return {
            id,
            sku,
            name: `Máy phun ${type} ${tankCapacity} ${boomWidth}`,
            name_en: `${type} Sprayer ${tankCapacity} ${boomWidth}`,
            name_ja: `${type}散布機 ${tankCapacity} ${boomWidth}`,
            short_description: `Máy phun ${type} bình ${tankCapacity}, tay phun ${boomWidth}, bơm ${pumpType}`,
            short_description_en: `${type} sprayer ${tankCapacity} tank, ${boomWidth} boom, ${pumpType} pump`,
            short_description_ja: `${type}散布機 ${tankCapacity}タンク、${boomWidth}ブーム、${pumpType}ポンプ`,
            long_description: this.generateSprayerDescription(type, tankCapacity, boomWidth, pumpType),
            long_description_en: this.generateSprayerDescriptionEn(type, tankCapacity, boomWidth, pumpType),
            long_description_ja: this.generateSprayerDescriptionJa(type, tankCapacity, boomWidth, pumpType),
            category_id: "cat_sprayers",
            subcategory: "Sprayers",
            subcategory_en: "Sprayers",
            subcategory_ja: "散布機",
            manufacturer_id: "mfr_new_holland",
            brand: "New Holland",
            part_number: partNumber,
            specifications: this.generateSprayerSpecs(type, tankCapacity, boomWidth, pumpType, applicationRate, nozzleType),
            pricing: this.generatePricing(this.getSprayerPrice(type, tankCapacity)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateSprayerApplications(type),
            compatibility: this.generateSprayerCompatibility(applicationRate),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getSprayerWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateSprayerTags(type, tankCapacity)
        };
    }

    generateMonitoringDrone(type, camera, flightTime, coverage, transmission, resolution, index) {
        const id = `MD${String(index + 1).padStart(3, '0')}-001`;
        const sku = `MD${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `SF-MD-${type}-${camera}-${resolution}`;
        
        return {
            id,
            sku,
            name: `Drone giám sát ${type} ${camera} ${resolution}`,
            name_en: `${type} Monitoring Drone ${camera} ${resolution}`,
            name_ja: `${type}監視ドローン ${camera} ${resolution}`,
            short_description: `Drone giám sát ${type} camera ${camera}, bay ${flightTime}, phủ ${coverage}`,
            short_description_en: `${type} monitoring drone ${camera} camera, ${flightTime} flight, ${coverage} coverage`,
            short_description_ja: `${type}監視ドローン ${camera}カメラ、${flightTime}飛行、${coverage}カバレッジ`,
            long_description: this.generateMonitoringDroneDescription(type, camera, flightTime, coverage),
            long_description_en: this.generateMonitoringDroneDescriptionEn(type, camera, flightTime, coverage),
            long_description_ja: this.generateMonitoringDroneDescriptionJa(type, camera, flightTime, coverage),
            category_id: "cat_monitoring_drones",
            subcategory: "Monitoring Drones",
            subcategory_en: "Monitoring Drones",
            subcategory_ja: "監視ドローン",
            manufacturer_id: "mfr_sensefly",
            brand: "SenseFly",
            part_number: partNumber,
            specifications: this.generateMonitoringDroneSpecs(type, camera, flightTime, coverage, transmission, resolution),
            pricing: this.generatePricing(this.getMonitoringDronePrice(type, camera)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateMonitoringDroneApplications(camera),
            compatibility: this.generateMonitoringDroneCompatibility(transmission),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getMonitoringDroneWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateMonitoringDroneTags(type, camera)
        };
    }

    generateMappingDrone(type, accuracy, planning, processing, output, gcp, index) {
        const id = `MP${String(index + 1).padStart(3, '0')}-001`;
        const sku = `MP${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `PA-MP-${type}-${accuracy}-${output}`;
        
        return {
            id,
            sku,
            name: `Drone bản đồ ${type} ${accuracy} ${output}`,
            name_en: `${type} Mapping Drone ${accuracy} ${output}`,
            name_ja: `${type}マッピングドローン ${accuracy} ${output}`,
            short_description: `Drone bản đồ ${type} chính xác ${accuracy}, xử lý ${processing}`,
            short_description_en: `${type} mapping drone ${accuracy} accuracy, ${processing} processing`,
            short_description_ja: `${type}マッピングドローン ${accuracy}精度、${processing}処理`,
            long_description: this.generateMappingDroneDescription(type, accuracy, planning, processing),
            long_description_en: this.generateMappingDroneDescriptionEn(type, accuracy, planning, processing),
            long_description_ja: this.generateMappingDroneDescriptionJa(type, accuracy, planning, processing),
            category_id: "cat_mapping_drones",
            subcategory: "Mapping Drones",
            subcategory_en: "Mapping Drones",
            subcategory_ja: "マッピングドローン",
            manufacturer_id: "mfr_parrot",
            brand: "Parrot",
            part_number: partNumber,
            specifications: this.generateMappingDroneSpecs(type, accuracy, planning, processing, output, gcp),
            pricing: this.generatePricing(this.getMappingDronePrice(type, accuracy)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateMappingDroneApplications(output),
            compatibility: this.generateMappingDroneCompatibility(planning),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getMappingDroneWeight(type)),
            status: "active",
            created_date: "2026-04-06T14:00:00Z",
            updated_date: "2026-04-06T14:00:00Z",
            tags: this.generateMappingDroneTags(type, accuracy)
        };
    }

    // Additional description and specification methods
    generateTillageEquipmentDescription(type, width, depth, shanks) {
        return `Máy ${type} chuyên nghiệp rộng ${width} với ${shanks} shank. Điều chỉnh độ sâu ${depth}. Hiệu suất cao, độ bền vượt trội. Phù hợp cho mọi loại đất và quy mô nông nghiệp.`;
    }

    generateTillageEquipmentDescriptionEn(type, width, depth, shanks) {
        return `Professional ${type} with ${width} working width and ${shanks} shanks. ${depth} depth adjustment. High efficiency, superior durability. Suitable for all soil types and farm scales.`;
    }

    generateTillageEquipmentDescriptionJa(type, width, depth, shanks) {
        return `${width}作業幅と${shanks}シャンクを備えたプロフェッショナル${type}。${depth}深さ調整。高効率、優れた耐久性。すべての土壌タイプと農場規模に適しています。`;
    }

    generateSprayerDescription(type, tankCapacity, boomWidth, pumpType) {
        return `Máy phun ${type} hiệu suất cao. Bình chứa ${tankCapacity}, tay phun ${boomWidth}, bơm ${pumpType} mạnh mẽ. Độ phủ đồng đều, tiết kiệm hóa chất. Phù hợp cho các trang trại quy mô lớn.`;
    }

    generateSprayerDescriptionEn(type, tankCapacity, boomWidth, pumpType) {
        return `High-performance ${type} sprayer. ${tankCapacity} tank, ${boomWidth} boom, powerful ${pumpType} pump. Even coverage, chemical saving. Suitable for large-scale farms.`;
    }

    generateSprayerDescriptionJa(type, tankCapacity, boomWidth, pumpType) {
        return `高性能${type}散布機。${tankCapacity}タンク、${boomWidth}ブーム、強力な${pumpType}ポンプ。均一なカバレッジ、化学薬品の節約。大規模農場に適しています。`;
    }

    generateMonitoringDroneDescription(type, camera, flightTime, coverage) {
        return `Drone giám sát ${type} với camera ${camera} chất lượng cao. Bay ${flightTime}, phủ ${coverage}. Thu thập dữ liệu thời gian thực, phân tích nhanh. Hỗ trợ quản lý nông nghiệp chính xác.`;
    }

    generateMonitoringDroneDescriptionEn(type, camera, flightTime, coverage) {
        return `${type} monitoring drone with high-quality ${camera} camera. ${flightTime} flight time, ${coverage} coverage. Real-time data collection, fast analysis. Supports precision agriculture management.`;
    }

    generateMonitoringDroneDescriptionJa(type, camera, flightTime, coverage) {
        return `高品質な${camera}カメラを搭載した${type}監視ドローン。${flightTime}飛行時間、${coverage}カバレッジ。リアルタイムデータ収集、高速分析。精密農業管理をサポートします。`;
    }

    generateMappingDroneDescription(type, accuracy, planning, processing) {
        return `Drone bản đồ ${type} chính xác ${accuracy}. Lập kế hoạch ${planning} tự động, xử lý ${processing}. Tạo bản đồ chi tiết, độ chính xác cao. Tối ưu cho quy hoạch và quản lý đất đai.`;
    }

    generateMappingDroneDescriptionEn(type, accuracy, planning, processing) {
        return `${type} mapping drone with ${accuracy} accuracy. ${planning} flight planning, ${processing} processing. Creates detailed, high-precision maps. Optimized for land planning and management.`;
    }

    generateMappingDroneDescriptionJa(type, accuracy, planning, processing) {
        return `${accuracy}精度の${type}マッピングドローン。${planning}飛行計画、${processing}処理。詳細で高精度な地図を作成します。土地計画と管理に最適化されています。`;
    }

    // Additional specification methods
    generateTillageEquipmentSpecs(type, width, depth, mounting, shanks, discSize) {
        return {
            basic: {
                equipment_type: type,
                working_width: width,
                depth_adjustment: depth,
                mounting_type: mounting,
                number_of_shanks: shanks,
                disc_size: discSize
            },
            construction: {
                frame_material: "High-strength steel",
                shank_material: "Hardened steel",
                disc_material: "Boron steel",
                bearings: "Sealed ball bearings",
                finish: "Corrosion-resistant coating"
            },
            performance: {
                working_depth: "10-50cm",
                ground_speed: "6-12 km/h",
                power_requirement: "50-150 HP",
                soil_types: ["Light", "Medium", "Heavy"],
                maintenance_interval: "100 hours"
            },
            dimensions: {
                working_width: width,
                transport_width: "3-4m",
                transport_height: "2.5-3m",
                weight: this.getTillageEquipmentWeight(type),
                hitch_category: "Category 3-4"
            }
        };
    }

    generateSprayerSpecs(type, tankCapacity, boomWidth, pumpType, applicationRate, nozzleType) {
        return {
            basic: {
                sprayer_type: type,
                tank_capacity: tankCapacity,
                boom_width: boomWidth,
                pump_type: pumpType,
                application_rate: applicationRate,
                nozzle_type: nozzleType
            },
            tank_system: {
                material: "Polyethylene/Stainless steel",
                agitation: "Mechanical/Hydraulic",
                filling_system: "Suction/Hydrofill",
                level_indicators: "Visual/Electronic",
                drainage: "Quick drain valve"
            },
            boom_system: {
                width: boomWidth,
                sections: "5-7 sections",
                height_adjustment: "Hydraulic",
                breakaway_system: "Automatic",
                suspension: "Shock absorber"
            },
            pumping_system: {
                pump_type: pumpType,
                max_flow_rate: "100-300 L/min",
                max_pressure: "5-10 bar",
                agitation_flow: "50-150 L/min",
                control_system: "Section control"
            },
            application: {
                application_rate: applicationRate,
                nozzle_spacing: "50cm",
                spray_pattern: nozzleType,
                drift_reduction: "Air induction",
                gps_integration: "Yes"
            }
        };
    }

    generateMonitoringDroneSpecs(type, camera, flightTime, coverage, transmission, resolution) {
        return {
            basic: {
                drone_type: type,
                camera_specification: camera,
                flight_time: flightTime,
                coverage_area: coverage,
                data_transmission: transmission,
                image_resolution: resolution
            },
            camera_system: {
                sensor_type: camera,
                resolution: resolution,
                gimbal: "3-axis stabilized",
                storage: "SD card 128GB+",
                video_recording: "4K/30fps"
            },
            flight_performance: {
                max_flight_time: flightTime,
                cruise_speed: "40-60 km/h",
                operating_altitude: "50-200m",
                wind_resistance: "10-15 m/s",
                temperature_range: "-10 to 45°C"
            },
            data_management: {
                transmission: transmission,
                real_time_streaming: "Yes",
                geo_tagging: "Automatic",
                image_processing: "On-board/Cloud",
                data_formats: ["JPEG", "RAW", "TIFF"]
            },
            control_system: {
                flight_modes: ["Waypoint", "Orbit", "Follow me"],
                obstacle_avoidance: "Multi-sensor",
                return_to_home: "Automatic",
                gps: "RTK/PPK optional"
            }
        };
    }

    generateMappingDroneSpecs(type, accuracy, planning, processing, output, gcp) {
        return {
            basic: {
                drone_type: type,
                mapping_accuracy: accuracy,
                flight_planning: planning,
                processing_time: processing,
                output_format: output,
                gcp_requirements: gcp
            },
            mapping_system: {
                accuracy: accuracy,
                ground_sampling_distance: "1-5cm/pixel",
                overlap: "Front 80%, Side 70%",
                flight_altitude: "50-150m AGL",
                coverage_per_flight: "50-200 ha"
            },
            processing: {
                processing_time: processing,
                software_included: "Yes",
                cloud_processing: "Optional",
                quality_control: "Automated",
                deliverables: [output]
            },
            accuracy_control: {
                gps_system: "RTK/PPK",
                gcp_requirements: gcp,
                expected_accuracy: accuracy,
                quality_assurance: "ISO certified",
                calibration: "Automatic"
            },
            applications: {
                surveying: "Topographic maps",
                agriculture: "Crop health analysis",
                construction: "Site monitoring",
                mining: "Volume calculation"
            }
        };
    }

    // Additional price and weight methods
    getTillageEquipmentPrice(type, width) {
        const basePrices = {
            "Moldboard Plow": 80000000,
            "Disc Harrow": 120000000,
            "Cultivator": 100000000,
            "Rotary Tiller": 150000000,
            "Subsoiler": 90000000
        };
        
        const widthMultiplier = {
            "2-3m": 0.7,
            "3-4m": 1,
            "4-5m": 1.3,
            "5-6m": 1.6,
            "6-8m": 2
        };
        
        const basePrice = basePrices[type] || 100000000;
        return Math.round(basePrice * (widthMultiplier[width] || 1));
    }

    getSprayerPrice(type, tankCapacity) {
        const basePrices = {
            "Self-propelled": 500000000,
            "Tractor Mounted": 150000000,
            "Trailed": 200000000,
            "Handheld": 50000000,
            "ATV Mounted": 80000000
        };
        
        const tankMultiplier = {
            "300L": 0.5,
            "500L": 0.8,
            "1000L": 1,
            "1500L": 1.3,
            "2000L": 1.6,
            "3000L": 2
        };
        
        const basePrice = basePrices[type] || 200000000;
        return Math.round(basePrice * (tankMultiplier[tankCapacity] || 1));
    }

    getMonitoringDronePrice(type, camera) {
        const basePrices = {
            "Quadcopter": 100000000,
            "Fixed-wing": 150000000,
            "VTOL": 180000000,
            "Hybrid": 200000000
        };
        
        const cameraMultiplier = {
            "RGB 20MP": 0.8,
            "Multispectral": 1.2,
            "Thermal": 1.5,
            "LiDAR": 2,
            "Hyperspectral": 2.5
        };
        
        const basePrice = basePrices[type] || 150000000;
        return Math.round(basePrice * (cameraMultiplier[camera] || 1));
    }

    getMappingDronePrice(type, accuracy) {
        const basePrices = {
            "Fixed-wing": 180000000,
            "VTOL": 200000000,
            "Quadcopter": 120000000,
            "Hybrid": 220000000
        };
        
        const accuracyMultiplier = {
            "±5cm": 0.8,
            "±3cm": 1,
            "±1cm": 1.3,
            "±0.5cm": 1.6
        };
        
        const basePrice = basePrices[type] || 180000000;
        return Math.round(basePrice * (accuracyMultiplier[accuracy] || 1));
    }

    getTillageEquipmentWeight(type) {
        const weights = {
            "Moldboard Plow": 800,
            "Disc Harrow": 1200,
            "Cultivator": 600,
            "Rotary Tiller": 400,
            "Subsoiler": 1000
        };
        return weights[type] || 800;
    }

    getSprayerWeight(type) {
        const weights = {
            "Self-propelled": 5000,
            "Tractor Mounted": 800,
            "Trailed": 1500,
            "Handheld": 20,
            "ATV Mounted": 200
        };
        return weights[type] || 1000;
    }

    getMonitoringDroneWeight(type) {
        const weights = {
            "Quadcopter": 8,
            "Fixed-wing": 5,
            "VTOL": 10,
            "Hybrid": 12
        };
        return weights[type] || 8;
    }

    getMappingDroneWeight(type) {
        const weights = {
            "Fixed-wing": 6,
            "VTOL": 8,
            "Quadcopter": 7,
            "Hybrid": 9
        };
        return weights[type] || 7;
    }

    // Export Phase 2 products to JSON
    exportPhase2Products(filename = "agriculture-phase2-machinery-drones.json") {
        const products = this.generateAllPhase2Products();
        
        const data = {
            metadata: {
                version: "1.0",
                phase: "Phase 2",
                generated_date: "2026-04-06T14:00:00Z",
                total_products: products.length,
                categories: Object.keys(this.categories).length,
                description: "Agricultural Machinery & Drones - Phase 2 Implementation"
            },
            categories: this.categories,
            manufacturers: this.manufacturers,
            product_templates: this.productTemplates,
            products: products
        };

        console.log(`=== Phase 2: Agricultural Machinery & Drones ===`);
        console.log(`Total Products: ${data.metadata.total_products}`);
        console.log(`Categories: ${data.metadata.categories}`);
        console.log(`Manufacturers: ${Object.keys(this.manufacturers).length}`);
        console.log(`File: ${filename}`);
        
        return data;
    }

    // Common helper methods (reuse from Phase 1)
    generatePricing(basePrice) {
        return {
            base_price: basePrice,
            currency: "VND",
            discount_tiers: {
                "1-5": 0,
                "6-10": 5,
                "11-20": 10,
                "20+": 15
            },
            warranty_years: 2,
            maintenance_cost_per_year: basePrice * 0.05
        };
    }

    generateInventory() {
        return {
            in_stock: 25,
            reserved: 5,
            available: 20,
            reorder_level: 10,
            reorder_quantity: 30,
            warehouse_location: "B2-08-15",
            lead_time_days: 30
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
                size: "3.5MB",
                language: "vi"
            },
            {
                type: "manual",
                url: `/documents/manuals/${id.toLowerCase()}.pdf`,
                size: "8.2MB",
                language: "vi"
            },
            {
                type: "certificate",
                url: `/documents/certificates/${id.toLowerCase()}.pdf`,
                size: "1.5MB",
                language: "en"
            }
        ];
    }

    generateQuality() {
        return {
            iso_certifications: ["ISO 9001:2015", "ISO 14001:2015"],
            quality_standards: ["CE", "EPA", "OSHA"],
            testing_procedures: ["Factory Test", "Field Test", "Safety Certification"],
            defect_rate: "<0.5%",
            mean_time_between_failures: "10000 hours"
        };
    }

    generateLogistics(weight) {
        return {
            weight: weight,
            dimensions: {
                length: 5000,
                width: 3000,
                height: 3000,
                unit: "mm"
            },
            packaging_type: "Crate/Pallet",
            shipping_class: "Heavy Freight",
            dangerous_goods: false,
            storage_requirements: "Covered, Dry Area"
        };
    }

    // Application and compatibility methods for all product types
    generateTractorApplications(type) {
        const appMap = {
            "Utility": ["Nông nghiệp đa năng", "Vận tải", "Cày xới"],
            "Row Crop": ["Trồng cây hàng", "Cây lương thực", "Cây công nghiệp"],
            "4WD": ["Địa hình khó", "Trồng cây ăn quả", "Nông nghiệp chính xác"],
            "Compact": ["Nông trại nhỏ", "Vườn cây", "Cây cảnh"],
            "Orchard": ["Vườn cây ăn quả", "Nho", "Cây ăn trái"],
            "Vineyard": ["Trồng nho", "Nho cao cấp", "Rượu vang"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Công nghiệp", "Vận tải"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy kéo ${type}`,
            description_en: `${app} application for ${type} tractor`,
            description_ja: `${type}トラクターの${app}アプリケーション`
        }));
    }

    generateHarvesterApplications(type) {
        const appMap = {
            "Combine": ["Gặt lúa", "Gặt ngô", "Gặt lúa mì"],
            "Forage": ["Thu hoạch thức ăn gia súc", "Cỏ", "Silage"],
            "Potato": ["Thu hoạch khoai tây", "Rau củ", "Củ cải"],
            "Sugar Beet": ["Thu hoạch củ cải đường", "Công nghiệp đường"],
            "Cotton": ["Thu hoạch bông", "Dệt may"],
            "Fruit": ["Thu hoạch trái cây", "Trái cây mềm", "Quả mọng"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Công nghiệp chế biến"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy gặt ${type}`,
            description_en: `${app} application for ${type} harvester`,
            description_ja: `${type}収穫機の${app}アプリケーション`
        }));
    }

    generatePlanterApplications(type) {
        const appMap = {
            "Row Crop": ["Trồng ngô", "Trồng đậu tương", "Trồng lúa mì"],
            "Air Seeder": ["Trồng lớn", "Trồng đồng ruộng", "Nông nghiệp quy mô lớn"],
            "Grain Drill": ["Trồng lúa", "Trồng lúa mì", "Trồng ngũ cốc"],
            "Precision": ["Nông nghiệp chính xác", "Trồng công nghệ cao", "GIS-based"],
            "No-till": ["Nông nghiệp bảo tồn", "Canh tác không cày", "Bảo vệ đất"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Trồng trọt", "Công nghệ cao"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy trồng ${type}`,
            description_en: `${app} application for ${type} planter`,
            description_ja: `${type}植え付け機の${app}アプリケーション`
        }));
    }

    generateAgriculturalDroneApplications(application) {
        const appMap = {
            "Spraying": ["Phun thuốc bảo vệ thực vật", "Phun phân bón lá", "Phun điều hòa sinh trưởng"],
            "Monitoring": ["Giám sát sức khỏe cây", "Phát hiện stress", "Đánh giá tăng trưởng"],
            "Mapping": ["Sơ đồ trang trại", "Phân tích địa hình", "Quy hoạch sử dụng đất"],
            "Seeding": ["Gieo hạt trực tiếp", "Phát tán hạt", "Tái trồng rừng"],
            "Inspection": ["Kiểm tra cơ sở hạ tầng", "Giám sát tưới tiêu", "An toàn trang trại"]
        };
        
        const applications = appMap[application] || ["Nông nghiệp thông minh", "Công nghệ cao"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho drone ${application}`,
            description_en: `${app} application for ${application} drone`,
            description_ja: `${application}ドローンの${app}アプリケーション`
        }));
    }

    generateSprayingDroneApplications() {
        const applications = ["Phun thuốc trừ sâu", "Phun phân bón", "Phun điều hòa", "Bảo vệ thực vật", "Nông nghiệp hữu cơ"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho drone phun`,
            description_en: `${app} application for spraying drone`,
            description_ja: `散布ドローンの${app}アプリケーション`
        }));
    }

    generateTillageEquipmentApplications(type) {
        const appMap = {
            "Moldboard Plow": ["Cày sâu", "Chuẩn bị đất", "Cải tạo đất"],
            "Disc Harrow": ["Bừa đất", "Cắt rễ cây", "Chuẩn bị bề mặt"],
            "Cultivator": ["Xới đất", "Dọn cỏ", "Chuẩn bị luống"],
            "Rotary Tiller": ["Xới đất mịn", "Chuẩn bị vườn", "Trộn phân"],
            "Subsoiler": ["Xới sâu", "Cắt lớp đất compact", "Cải thiện thoát nước"]
        };
        
        const applications = appMap[type] || ["Chuẩn bị đất", "Cày xới", "Cải tạo đất"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy ${type}`,
            description_en: `${app} application for ${type}`,
            description_ja: `${type}の${app}アプリケーション`
        }));
    }

    generateSprayerApplications(type) {
        const appMap = {
            "Self-propelled": ["Trồng lớn", "Nông nghiệp quy mô lớn", "Cây công nghiệp"],
            "Tractor Mounted": ["Trồng vừa", "Nông trại gia đình", "Đa canh"],
            "Trailed": ["Trồng chuyên sâu", "Cây ăn quả", "Vườn cây"],
            "Handheld": ["Vườn nhỏ", "Cây cảnh", "Phun chính xác"],
            "ATV Mounted": ["Địa hình đồi", "Trồng trên đồi", "Kiểm soát cỏ dại"]
        };
        
        const applications = appMap[type] || ["Bảo vệ thực vật", "Phun thuốc", "Nông nghiệp"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho máy phun ${type}`,
            description_en: `${app} application for ${type} sprayer`,
            description_ja: `${type}散布機の${app}アプリケーション`
        }));
    }

    generateMonitoringDroneApplications(camera) {
        const appMap = {
            "RGB 20MP": ["Giám sát trực quan", "Đánh giá tăng trưởng", "Phát hiện vấn đề"],
            "Multispectral": ["Phân tích sức khỏe cây", "Đánh giá dinh dưỡng", "Phát hiện stress"],
            "Thermal": ["Giám sát nhiệt độ", "Phát hiện khô hạn", "Quản lý tưới"],
            "LiDAR": ["Sơ đồ 3D", "Phân tích địa hình", "Khối lượng cây trồng"],
            "Hyperspectral": ["Phân tích chi tiết", "Phát hiện bệnh", "Nghiên cứu cao cấp"]
        };
        
        const applications = appMap[camera] || ["Giám sát nông nghiệp", "Phân tích cây trồng"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho camera ${camera}`,
            description_en: `${app} application for ${camera} camera`,
            description_ja: `${camera}カメラの${app}アプリケーション`
        }));
    }

    generateMappingDroneApplications(output) {
        const appMap = {
            "DEM": ["Phân tích địa hình", "Thoát nước", "Quy hoạch"],
            "DSM": ["Sơ đồ bề mặt", "Kiến trúc cảnh quan", "Quy hoạch sử dụng đất"],
            "Orthomosaic": ["Bản đồ chi tiết", "Giám sát cây trồng", "Phân tích sức khỏe"],
            "3D Model": ["Mô hình 3D", "Trực quan hóa", "Phân tích khối lượng"],
            "Point Cloud": ["Phân tích chi tiết", "LiDAR processing", "Nghiên cứu"]
        };
        
        const applications = appMap[output] || ["Bản đồ hóa", "Phân tích địa hình", "Quy hoạch"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho bản đồ ${output}`,
            description_en: `${app} application for ${output} mapping`,
            description_ja: `${output}マッピングの${app}アプリケーション`
        }));
    }

    // Compatibility methods
    generateTractorCompatibility(transmission) {
        const compatMap = {
            "Manual": ["Standard implements", "Basic attachments", "Manual control"],
            "Power Shift": ["Advanced implements", "GPS systems", "Auto-guidance"],
            "CVT": ["Precision implements", "Variable rate applications", "Advanced control"],
            "Hydrostatic": ["Maneuverable implements", "Specialty applications", "Fine control"],
            "Shuttle": ["Forward-reverse implements", "Loader applications", "Versatile control"]
        };
        return compatMap[transmission] || ["Standard implements", "Most attachments"];
    }

    generateHarvesterCompatibility(header) {
        const compatMap = {
            "Corn": ["Corn headers", "Row crop headers", "Multi-crop adapters"],
            "Wheat": ["Grain headers", "Draper headers", "Flex headers"],
            "Rice": ["Rice headers", "Specialized headers", "Wet condition headers"],
            "Soybean": ["Soybean headers", "Flex headers", "Row crop headers"],
            "Multi-crop": ["Various headers", "Adapters", "Universal systems"]
        };
        return compatMap[header] || ["Standard headers", "Adapter systems"];
    }

    generatePlanterCompatibility(monitoring) {
        const compatMap = {
            "Basic": ["Manual control", "Simple displays", "Basic data"],
            "Advanced": ["GPS integration", "Rate controllers", "Data logging"],
            "GPS": ["RTK systems", "Auto-steer", "Section control"],
            "Auto-section": ["Variable rate", "Section control", "Advanced monitoring"]
        };
        return compatMap[monitoring] || ["Standard control systems", "Basic monitoring"];
    }

    generateAgriculturalDroneCompatibility(gps) {
        const compatMap = {
            "±1m": ["Standard GPS", "Basic navigation", "General mapping"],
            "±0.5m": ["Enhanced GPS", "Precision agriculture", "Detailed mapping"],
            "±0.1m": ["High-precision GPS", "Professional surveying", "Research applications"],
            "RTK": ["RTK base stations", "Survey-grade accuracy", "Professional mapping"]
        };
        return compatMap[gps] || ["Standard GPS systems", "Basic navigation"];
    }

    generateSprayingDroneCompatibility() {
        return ["Agricultural chemicals", "Liquid fertilizers", "Biological agents", "Water-based solutions"];
    }

    generateTillageEquipmentCompatibility(mounting) {
        const compatMap = {
            "3-point Hitch": ["Category 1-4 hitches", "Standard tractors", "Most implements"],
            "Tractor Mounted": ["Direct mount", "Specific models", "Custom applications"],
            "Trailed": ["Pintle hitch", "Drawbar", "Various tractors"]
        };
        return compatMap[mounting] || ["Standard mounting systems"];
    }

    generateSprayerCompatibility(applicationRate) {
        const compatMap = {
            "Variable": ["GPS systems", "Rate controllers", "Section control"],
            "Fixed": ["Manual control", "Basic systems", "Simple applications"],
            "GPS-controlled": ["RTK GPS", "Auto-guidance", "Precision systems"]
        };
        return compatMap[applicationRate] || ["Standard control systems"];
    }

    generateMonitoringDroneCompatibility(transmission) {
        const compatMap = {
            "Real-time": ["4G/5G networks", "Live streaming", "Immediate analysis"],
            "Post-flight": ["Data processing", "Cloud storage", "Batch analysis"],
            "Live streaming": ["High-speed networks", "Real-time monitoring", "Instant feedback"]
        };
        return compatMap[transmission] || ["Standard data transmission"];
    }

    generateMappingDroneCompatibility(planning) {
        const compatMap = {
            "Automated": ["Flight planning software", "Cloud platforms", "AI optimization"],
            "Manual": ["Manual control", "Custom waypoints", "Pilot control"],
            "AI-optimized": ["Machine learning", "Advanced algorithms", "Smart planning"]
        };
        return compatMap[planning] || ["Standard flight planning"];
    }

    // Tag generation methods
    generateTractorTags(type, power) {
        return [`tractor`, type.toLowerCase(), power.toLowerCase().replace(/\s+/g, '-'), `agriculture`, `farm-machinery`];
    }

    generateHarvesterTags(type, cuttingWidth) {
        return [`harvester`, type.toLowerCase(), cuttingWidth.replace(/\s+/g, '-'), `agriculture`, `harvesting`];
    }

    generatePlanterTags(type, rows) {
        return [`planter`, type.toLowerCase(), rows.replace(/\s+/g, '-'), `agriculture`, `seeding`];
    }

    generateAgriculturalDroneTags(type, application) {
        return [`drone`, type.toLowerCase(), application.toLowerCase(), `agriculture`, `precision-farming`];
    }

    generateSprayingDroneTags(type, tankCapacity) {
        return [`spraying-drone`, type.toLowerCase(), tankCapacity.replace(/\s+/g, '-'), `agriculture`, `crop-protection`];
    }

    generateTillageEquipmentTags(type, width) {
        return [`tillage`, type.toLowerCase().replace(/\s+/g, '-'), width.replace(/\s+/g, '-'), `agriculture`, `soil-preparation`];
    }

    generateSprayerTags(type, tankCapacity) {
        return [`sprayer`, type.toLowerCase(), tankCapacity.replace(/\s+/g, '-'), `agriculture`, `crop-protection`];
    }

    generateMonitoringDroneTags(type, camera) {
        return [`monitoring-drone`, type.toLowerCase(), camera.toLowerCase().replace(/\s+/g, '-'), `agriculture`, `crop-monitoring`];
    }

    generateMappingDroneTags(type, accuracy) {
        return [`mapping-drone`, type.toLowerCase(), accuracy.replace(/\s+/g, '-'), `agriculture`, `precision-mapping`];
    }

    // Additional description methods for completeness
    generateHarvesterDescription(type, cuttingWidth, grainTank, enginePower) {
        return `Máy gặt ${type} chuyên nghiệp rộng ${cuttingWidth}. Thùng chứa ${grainTank}, động cơ ${enginePower} mạnh mẽ. Hiệu suất cao, tổn thất thấp. Phù hợp cho nông nghiệp quy mô lớn và chuyên nghiệp.`;
    }

    generateHarvesterDescriptionEn(type, cuttingWidth, grainTank, enginePower) {
        return `Professional ${type} harvester with ${cuttingWidth} cutting width. ${grainTank} grain tank, powerful ${enginePower} engine. High efficiency, low losses. Suitable for large-scale and professional agriculture.`;
    }

    generateHarvesterDescriptionJa(type, cuttingWidth, grainTank, enginePower) {
        return `${cuttingWidth}刈り取り幅を備えたプロフェッショナル${type}収穫機。${grainTank}穀物タンク、強力な${enginePower}エンジン。高効率、低損失。大規模およびプロフェッショナル農業に適しています。`;
    }

    generatePlanterDescription(type, rows, spacing, seedRate, fertilizer) {
        return `Máy trồng ${type} ${rows} khoảng cách ${spacing}. Gieo hạt ${seedRate}, tích hợp phân bón ${fertilizer}. Độ chính xác cao, hiệu suất vượt trội. Tối ưu cho nông nghiệp chính xác.`;
    }

    generatePlanterDescriptionEn(type, rows, spacing, seedRate, fertilizer) {
        return `${type} planter with ${rows} and ${spacing} spacing. ${seedRate} seed rate, ${fertilizer} fertilizer integration. High precision, superior performance. Optimized for precision agriculture.`;
    }

    generatePlanterDescriptionJa(type, rows, spacing, seedRate, fertilizer) {
        return `${rows}と${spacing}間隔を備えた${type}植え付け機。${seedRate}播種率、${fertilizer}肥料統合。高精度、優れた性能。精密農業に最適化されています。`;
    }

    generateAgriculturalDroneDescription(type, flightTime, payload, application) {
        return `Drone nông nghiệp ${type} chuyên dụng. Bay ${flightTime}, tải trọng ${payload}. Ứng dụng ${application} hiệu quả. Hệ thống điều khiển thông minh, độ chính xác cao. Phù hợp cho nông nghiệp hiện đại.`;
    }

    generateAgriculturalDroneDescriptionEn(type, flightTime, payload, application) {
        return `Specialized ${type} agricultural drone. ${flightTime} flight time, ${payload} payload. Efficient ${application} application. Smart control system, high precision. Suitable for modern agriculture.`;
    }

    generateAgriculturalDroneDescriptionJa(type, flightTime, payload, application) {
        return `専用${type}農業用ドローン。${flightTime}飛行時間、${payload}ペイロード。効率的な${application}アプリケーション。スマート制御システム、高精度。現代農業に適しています。`;
    }

    generateSprayingDroneDescription(type, tankCapacity, sprayWidth, flowRate) {
        return `Drone phun ${type} hiệu suất cao. Bình chứa ${tankCapacity}, phun rộng ${sprayWidth}, lưu lượng ${flowRate}. Phun đồng đều, tiết kiệm thuốc. An toàn, hiệu quả, bảo vệ môi trường.`;
    }

    generateSprayingDroneDescriptionEn(type, tankCapacity, sprayWidth, flowRate) {
        return `High-performance ${type} spraying drone. ${tankCapacity} tank, ${sprayWidth} spray width, ${flowRate} flow rate. Even spraying, chemical saving. Safe, effective, environmentally friendly.`;
    }

    generateSprayingDroneDescriptionJa(type, tankCapacity, sprayWidth, flowRate) {
        return `高性能${type}散布ドローン。${tankCapacity}タンク、${sprayWidth}散布幅、${flowRate}流量。均一な散布、化学薬品の節約。安全、効果的、環境に優しい。`;
    }
}

// Usage and execution
const phase2Generator = new AgricultureMachineryDronesGenerator();

// Generate and export Phase 2 products
const phase2Data = phase2Generator.exportPhase2Products();

console.log("\n=== Phase 2 Summary ===");
console.log("Categories implemented:");
Object.entries(phase2Generator.categories).forEach(([key, cat]) => {
    console.log(`- ${cat.name}: ${cat.products} products`);
});

console.log("\nManufacturers:");
Object.entries(phase2Generator.manufacturers).forEach(([key, mfr]) => {
    console.log(`- ${mfr.name} (${mfr.country})`);
});

module.exports = AgricultureMachineryDronesGenerator;
