/**
 * Phase 1: Agriculture Sensors & Irrigation Systems Generator
 * Cảm biến nông nghiệp và Hệ thống tưới tiêu
 */

class AgricultureSensorsIrrigationGenerator {
    constructor() {
        this.categories = {
            // Cảm biến đất
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
            
            // Hệ thống tưới tiêu
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
            }
        };

        this.manufacturers = {
            sensirion: { 
                id: "mfr_sensirion", 
                name: "Sensirion", 
                name_en: "Sensirion AG", 
                name_ja: "センシリオン", 
                country: "Switzerland", 
                reliability: 4.7, 
                lead_time: 20 
            },
            campbell_scientific: { 
                id: "mfr_campbell_scientific", 
                name: "Campbell Scientific", 
                name_en: "Campbell Scientific Inc.", 
                name_ja: "キャンベルサイエンティフィック", 
                country: "USA", 
                reliability: 4.8, 
                lead_time: 25 
            },
            decagon: { 
                id: "mfr_decagon", 
                name: "Decagon", 
                name_en: "Decagon Devices", 
                name_ja: "デカゴン", 
                country: "USA", 
                reliability: 4.6, 
                lead_time: 22 
            },
            rain_bird: { 
                id: "mfr_rain_bird", 
                name: "Rain Bird", 
                name_en: "Rain Bird Corporation", 
                name_ja: "レインバード", 
                country: "USA", 
                reliability: 4.7, 
                lead_time: 18 
            },
            hunter_industries: { 
                id: "mfr_hunter_industries", 
                name: "Hunter Industries", 
                name_en: "Hunter Industries Inc.", 
                name_ja: "ハンターインダストリーズ", 
                country: "USA", 
                reliability: 4.6, 
                lead_time: 20 
            },
            netafim: { 
                id: "mfr_netafim", 
                name: "Netafim", 
                name_en: "Netafim Ltd.", 
                name_ja: "ネタフィム", 
                country: "Israel", 
                reliability: 4.8, 
                lead_time: 25 
            },
            toro: { 
                id: "mfr_toro", 
                name: "Toro", 
                name_en: "The Toro Company", 
                name_ja: "トロ", 
                country: "USA", 
                reliability: 4.7, 
                lead_time: 22 
            }
        };

        this.productTemplates = {
            soil_sensors: {
                types: ["Moisture", "pH", "Temperature", "EC", "Nitrogen", "Phosphorus", "Potassium"],
                measurement_ranges: {
                    "Moisture": "0-100%",
                    "pH": "0-14 pH", 
                    "Temperature": "-20 to 60°C",
                    "EC": "0-5 mS/cm",
                    "Nitrogen": "0-200 mg/kg",
                    "Phosphorus": "0-100 mg/kg",
                    "Potassium": "0-300 mg/kg"
                },
                accuracies: {
                    "Moisture": "±2%",
                    "pH": "±0.1 pH",
                    "Temperature": "±0.5°C",
                    "EC": "±0.05 mS/cm",
                    "Nitrogen": "±5 mg/kg",
                    "Phosphorus": "±3 mg/kg",
                    "Potassium": "±8 mg/kg"
                },
                outputs: ["4-20mA", "0-10V", "Digital", "LoRa", "Zigbee", "WiFi"],
                power_sources: ["Battery", "Solar", "Mains", "DC 12V"],
                installation_types: ["In-soil", "Surface", "Portable", "Fixed"]
            },
            
            weather_sensors: {
                types: ["Temperature & Humidity", "Rain Gauge", "Wind Speed", "Wind Direction", "Solar Radiation", "Barometric Pressure", "Leaf Wetness"],
                measurement_ranges: {
                    "Temperature & Humidity": "-40 to 85°C, 0-100%RH",
                    "Rain Gauge": "0-200mm/h",
                    "Wind Speed": "0-60 m/s",
                    "Wind Direction": "0-360°",
                    "Solar Radiation": "0-2000 W/m²",
                    "Barometric Pressure": "300-1100 hPa",
                    "Leaf Wetness": "0-15"
                },
                accuracies: {
                    "Temperature & Humidity": "±0.3°C, ±2%RH",
                    "Rain Gauge": "±0.2mm",
                    "Wind Speed": "±0.1 m/s",
                    "Wind Direction": "±2°",
                    "Solar Radiation": "±5%",
                    "Barometric Pressure": "±0.5 hPa",
                    "Leaf Wetness": "±1"
                },
                mounting_types: ["Pole Mount", "Wall Mount", "Tripod", "Rooftop"],
                data_logging: ["Internal", "External", "Cloud", "None"]
            },
            
            plant_sensors: {
                types: ["NDVI", "Chlorophyll", "Leaf Temperature", "Stomatal Conductance", "Plant Height", "Fruit Size", "Disease Detection"],
                measurement_ranges: {
                    "NDVI": "-1 to 1",
                    "Chlorophyll": "0-100 SPAD",
                    "Leaf Temperature": "-10 to 60°C",
                    "Stomatal Conductance": "0-1000 mmol/m²s",
                    "Plant Height": "0-500cm",
                    "Fruit Size": "0-300mm",
                    "Disease Detection": "0-100%"
                },
                accuracies: {
                    "NDVI": "±0.02",
                    "Chlorophyll": "±1 SPAD",
                    "Leaf Temperature": "±0.2°C",
                    "Stomatal Conductance": "±5%",
                    "Plant Height": "±1cm",
                    "Fruit Size": "±0.5mm",
                    "Disease Detection": "±5%"
                },
                mounting_methods: ["Handheld", "Fixed", "Drone-mounted", "Robot-mounted"],
                connectivity: ["Bluetooth", "WiFi", "LoRa", "Cellular"]
            },
            
            irrigation_systems: {
                types: ["Drip", "Sprinkler", "Flood", "Micro-spray", "Subsurface"],
                flow_rates: {
                    "Drip": "1-10 L/h per emitter",
                    "Sprinkler": "100-5000 L/h",
                    "Flood": "10000-50000 L/h",
                    "Micro-spray": "20-100 L/h",
                    "Subsurface": "0.5-5 L/h"
                },
                pressure_ranges: {
                    "Drip": "1-3 bar",
                    "Sprinkler": "2-8 bar",
                    "Flood": "0.5-2 bar",
                    "Micro-spray": "1.5-4 bar",
                    "Subsurface": "0.5-2 bar"
                },
                control_methods: ["Manual", "Timer", "Sensor-based", "Smart", "Remote"],
                coverage_areas: ["1-10m²", "10-100m²", "100-1000m²", "1000-10000m²"],
                pipe_materials: ["PVC", "HDPE", "LDPE", "Steel", "Copper"]
            },
            
            drip_irrigation: {
                types: ["Inline", "Online", "Subsurface", "Micro-tube"],
                emitter_types: ["Pressure Compensating", "Non-compensating", "Adjustable", "Vortex"],
                flow_rates: ["0.5 L/h", "1 L/h", "2 L/h", "4 L/h", "8 L/h"],
                spacings: ["30cm", "50cm", "75cm", "100cm", "150cm"],
                filter_requirements: ["Screen Filter", "Disc Filter", "Sand Filter", "Media Filter"],
                automation_levels: ["Manual", "Semi-automatic", "Fully automatic", "AI-controlled"]
            },
            
            sprinkler_systems: {
                types: ["Impact", "Gear Drive", "Pop-up", "Rotary", "Stationary"],
                spray_patterns: ["Full Circle", "Half Circle", "Quarter Circle", "Adjustable"],
                spray_distances: ["5-10m", "10-15m", "15-20m", "20-30m"],
                flow_rates: ["500-1000 L/h", "1000-2000 L/h", "2000-4000 L/h"],
                operating_pressures: ["2-4 bar", "3-5 bar", "4-7 bar"],
                nozzle_sizes: ["2mm", "3mm", "4mm", "5mm", "6mm", "8mm"]
            }
        };
    }

    // Generate Soil Sensor
    generateSoilSensor(type, measurementRange, accuracy, output, powerSource, installation, index) {
        const id = `SS${String(index + 1).padStart(3, '0')}-001`;
        const sku = `SS${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `SR-SS-${type}-${output}`;
        
        return {
            id,
            sku,
            name: `Cảm biến đất ${type} ${measurementRange}`,
            name_en: `${type} Soil Sensor ${measurementRange}`,
            name_ja: `${type}土壌センサー ${measurementRange}`,
            short_description: `Cảm biến đất ${type} dải đo ${measurementRange}, độ chính xác ${accuracy}, đầu ra ${output}`,
            short_description_en: `${type} soil sensor ${measurementRange} range, ${accuracy} accuracy, ${output} output`,
            short_description_ja: `${type}土壌センサー ${measurementRange}範囲、${accuracy}精度、${output}出力`,
            long_description: this.generateSoilSensorDescription(type, measurementRange, accuracy, output),
            long_description_en: this.generateSoilSensorDescriptionEn(type, measurementRange, accuracy, output),
            long_description_ja: this.generateSoilSensorDescriptionJa(type, measurementRange, accuracy, output),
            category_id: "cat_soil_sensors",
            subcategory: "Soil Sensors",
            subcategory_en: "Soil Sensors",
            subcategory_ja: "土壌センサー",
            manufacturer_id: "mfr_sensirion",
            brand: "Sensirion",
            part_number: partNumber,
            specifications: this.generateSoilSensorSpecs(type, measurementRange, accuracy, output, powerSource, installation),
            pricing: this.generatePricing(this.getSoilSensorPrice(type)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateSoilSensorApplications(type),
            compatibility: this.generateSoilSensorCompatibility(output),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getSoilSensorWeight()),
            status: "active",
            created_date: "2026-04-06T13:00:00Z",
            updated_date: "2026-04-06T13:00:00Z",
            tags: this.generateSoilSensorTags(type, measurementRange)
        };
    }

    // Generate Weather Sensor
    generateWeatherSensor(type, measurementRange, accuracy, mounting, logging, index) {
        const id = `WS${String(index + 1).padStart(3, '0')}-001`;
        const sku = `WS${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `CS-WS-${type}-${mounting}`;
        
        return {
            id,
            sku,
            name: `Cảm biến thời tiết ${type} ${measurementRange}`,
            name_en: `${type} Weather Sensor ${measurementRange}`,
            name_ja: `${type}気象センサー ${measurementRange}`,
            short_description: `Cảm biến thời tiết ${type} dải đo ${measurementRange}, độ chính xác ${accuracy}, lắp đặt ${mounting}`,
            short_description_en: `${type} weather sensor ${measurementRange} range, ${accuracy} accuracy, ${mounting} mounting`,
            short_description_ja: `${type}気象センサー ${measurementRange}範囲、${accuracy}精度、${mounting}マウント`,
            long_description: this.generateWeatherSensorDescription(type, measurementRange, accuracy, mounting),
            long_description_en: this.generateWeatherSensorDescriptionEn(type, measurementRange, accuracy, mounting),
            long_description_ja: this.generateWeatherSensorDescriptionJa(type, measurementRange, accuracy, mounting),
            category_id: "cat_weather_sensors",
            subcategory: "Weather Sensors",
            subcategory_en: "Weather Sensors",
            subcategory_ja: "気象センサー",
            manufacturer_id: "mfr_campbell_scientific",
            brand: "Campbell Scientific",
            part_number: partNumber,
            specifications: this.generateWeatherSensorSpecs(type, measurementRange, accuracy, mounting, logging),
            pricing: this.generatePricing(this.getWeatherSensorPrice(type)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateWeatherSensorApplications(type),
            compatibility: this.generateWeatherSensorCompatibility(),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getWeatherSensorWeight()),
            status: "active",
            created_date: "2026-04-06T13:00:00Z",
            updated_date: "2026-04-06T13:00:00Z",
            tags: this.generateWeatherSensorTags(type, measurementRange)
        };
    }

    // Generate Plant Sensor
    generatePlantSensor(type, measurementRange, accuracy, mounting, connectivity, index) {
        const id = `PS${String(index + 1).padStart(3, '0')}-001`;
        const sku = `PS${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `DD-PS-${type}-${mounting}`;
        
        return {
            id,
            sku,
            name: `Cảm biến cây trồng ${type} ${measurementRange}`,
            name_en: `${type} Plant Sensor ${measurementRange}`,
            name_ja: `${type}植物センサー ${measurementRange}`,
            short_description: `Cảm biến cây trồng ${type} dải đo ${measurementRange}, độ chính xác ${accuracy}, lắp đặt ${mounting}`,
            short_description_en: `${type} plant sensor ${measurementRange} range, ${accuracy} accuracy, ${mounting} mounting`,
            short_description_ja: `${type}植物センサー ${measurementRange}範囲、${accuracy}精度、${mounting}マウント`,
            long_description: this.generatePlantSensorDescription(type, measurementRange, accuracy, mounting),
            long_description_en: this.generatePlantSensorDescriptionEn(type, measurementRange, accuracy, mounting),
            long_description_ja: this.generatePlantSensorDescriptionJa(type, measurementRange, accuracy, mounting),
            category_id: "cat_plant_sensors",
            subcategory: "Plant Sensors",
            subcategory_en: "Plant Sensors",
            subcategory_ja: "植物センサー",
            manufacturer_id: "mfr_decagon",
            brand: "Decagon",
            part_number: partNumber,
            specifications: this.generatePlantSensorSpecs(type, measurementRange, accuracy, mounting, connectivity),
            pricing: this.generatePricing(this.getPlantSensorPrice(type)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generatePlantSensorApplications(type),
            compatibility: this.generatePlantSensorCompatibility(connectivity),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getPlantSensorWeight()),
            status: "active",
            created_date: "2026-04-06T13:00:00Z",
            updated_date: "2026-04-06T13:00:00Z",
            tags: this.generatePlantSensorTags(type, measurementRange)
        };
    }

    // Generate Irrigation System
    generateIrrigationSystem(type, flowRate, pressure, control, coverage, material, index) {
        const id = `IR${String(index + 1).padStart(3, '0')}-001`;
        const sku = `IR${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `RB-IR-${type}-${control}-${coverage}`;
        
        return {
            id,
            sku,
            name: `Hệ thống tưới ${type} ${flowRate} ${coverage}`,
            name_en: `${type} Irrigation System ${flowRate} ${coverage}`,
            name_ja: `${type}灌漑システム ${flowRate} ${coverage}`,
            short_description: `Hệ thống tưới ${type} lưu lượng ${flowRate}, áp suất ${pressure}, điều khiển ${control}`,
            short_description_en: `${type} irrigation system ${flowRate} flow rate, ${pressure} pressure, ${control} control`,
            short_description_ja: `${type}灌漑システム ${flowRate}流量、${pressure}圧力、${control}制御`,
            long_description: this.generateIrrigationSystemDescription(type, flowRate, pressure, control, coverage),
            long_description_en: this.generateIrrigationSystemDescriptionEn(type, flowRate, pressure, control, coverage),
            long_description_ja: this.generateIrrigationSystemDescriptionJa(type, flowRate, pressure, control, coverage),
            category_id: "cat_irrigation_systems",
            subcategory: "Irrigation Systems",
            subcategory_en: "Irrigation Systems",
            subcategory_ja: "灌漑システム",
            manufacturer_id: "mfr_rain_bird",
            brand: "Rain Bird",
            part_number: partNumber,
            specifications: this.generateIrrigationSystemSpecs(type, flowRate, pressure, control, coverage, material),
            pricing: this.generatePricing(this.getIrrigationSystemPrice(type, coverage)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateIrrigationSystemApplications(type),
            compatibility: this.generateIrrigationSystemCompatibility(control),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getIrrigationSystemWeight(type)),
            status: "active",
            created_date: "2026-04-06T13:00:00Z",
            updated_date: "2026-04-06T13:00:00Z",
            tags: this.generateIrrigationSystemTags(type, flowRate)
        };
    }

    // Generate Drip Irrigation
    generateDripIrrigation(type, emitterType, flowRate, spacing, filter, automation, index) {
        const id = `DI${String(index + 1).padStart(3, '0')}-001`;
        const sku = `DI${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `NF-DI-${type}-${emitterType}-${flowRate}`;
        
        return {
            id,
            sku,
            name: `Tưới nhỏ giọt ${type} ${emitterType} ${flowRate}`,
            name_en: `${type} Drip Irrigation ${emitterType} ${flowRate}`,
            name_ja: `${type}点滴灌漑 ${emitterType} ${flowRate}`,
            short_description: `Hệ thống tưới nhỏ giọt ${type} emitter ${emitterType}, lưu lượng ${flowRate}, khoảng cách ${spacing}`,
            short_description_en: `${type} drip irrigation ${emitterType} emitter, ${flowRate} flow rate, ${spacing} spacing`,
            short_description_ja: `${type}点滴灌漑 ${emitterType}エミッター、${flowRate}流量、${spacing}間隔`,
            long_description: this.generateDripIrrigationDescription(type, emitterType, flowRate, spacing, filter),
            long_description_en: this.generateDripIrrigationDescriptionEn(type, emitterType, flowRate, spacing, filter),
            long_description_ja: this.generateDripIrrigationDescriptionJa(type, emitterType, flowRate, spacing, filter),
            category_id: "cat_drip_irrigation",
            subcategory: "Drip Irrigation",
            subcategory_en: "Drip Irrigation",
            subcategory_ja: "点滴灌漑",
            manufacturer_id: "mfr_netafim",
            brand: "Netafim",
            part_number: partNumber,
            specifications: this.generateDripIrrigationSpecs(type, emitterType, flowRate, spacing, filter, automation),
            pricing: this.generatePricing(this.getDripIrrigationPrice(type, flowRate)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateDripIrrigationApplications(type),
            compatibility: this.generateDripIrrigationCompatibility(automation),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getDripIrrigationWeight()),
            status: "active",
            created_date: "2026-04-06T13:00:00Z",
            updated_date: "2026-04-06T13:00:00Z",
            tags: this.generateDripIrrigationTags(type, emitterType)
        };
    }

    // Generate Sprinkler System
    generateSprinklerSystem(type, pattern, distance, flowRate, pressure, nozzleSize, index) {
        const id = `SP${String(index + 1).padStart(3, '0')}-001`;
        const sku = `SP${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `HU-SP-${type}-${pattern}-${distance}`;
        
        return {
            id,
            sku,
            name: `Phun sương ${type} ${pattern} ${distance}`,
            name_en: `${type} Sprinkler ${pattern} ${distance}`,
            name_ja: `${type}散水 ${pattern} ${distance}`,
            short_description: `Hệ thống phun sương ${type} kiểu ${pattern}, tầm xa ${distance}, lưu lượng ${flowRate}`,
            short_description_en: `${type} sprinkler system ${pattern} pattern, ${distance} distance, ${flowRate} flow rate`,
            short_description_ja: `${type}散水システム ${pattern}パターン、${distance}距離、${flowRate}流量`,
            long_description: this.generateSprinklerSystemDescription(type, pattern, distance, flowRate, pressure),
            long_description_en: this.generateSprinklerSystemDescriptionEn(type, pattern, distance, flowRate, pressure),
            long_description_ja: this.generateSprinklerSystemDescriptionJa(type, pattern, distance, flowRate, pressure),
            category_id: "cat_sprinkler_systems",
            subcategory: "Sprinkler Systems",
            subcategory_en: "Sprinkler Systems",
            subcategory_ja: "散水システム",
            manufacturer_id: "mfr_hunter_industries",
            brand: "Hunter Industries",
            part_number: partNumber,
            specifications: this.generateSprinklerSystemSpecs(type, pattern, distance, flowRate, pressure, nozzleSize),
            pricing: this.generatePricing(this.getSprinklerSystemPrice(type, distance)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateSprinklerSystemApplications(type),
            compatibility: this.generateSprinklerSystemCompatibility(),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getSprinklerSystemWeight(type)),
            status: "active",
            created_date: "2026-04-06T13:00:00Z",
            updated_date: "2026-04-06T13:00:00Z",
            tags: this.generateSprinklerSystemTags(type, pattern)
        };
    }

    // Helper methods for generating descriptions and specifications
    generateSoilSensorDescription(type, range, accuracy, output) {
        return `Cảm biến đất ${type} chuyên dụng cho nông nghiệp chính xác. Đo chính xác ${range} với độ chính xác ${accuracy}. Đầu ra ${output} tương thích với hầu hết các hệ thống điều khiển. Bền bỉ, chống nước, phù hợp với mọi điều kiện thời tiết. Lý tưởng cho nông nghiệp thông minh và nông nghiệp 4.0.`;
    }

    generateSoilSensorDescriptionEn(type, range, accuracy, output) {
        return `Professional ${type} soil sensor for precision agriculture. Accurately measures ${range} with ${accuracy} accuracy. ${output} output compatible with most control systems. Durable, waterproof, suitable for all weather conditions. Ideal for smart farming and Agriculture 4.0.`;
    }

    generateSoilSensorDescriptionJa(type, range, accuracy, output) {
        return `精密農業用のプロフェッショナル${type}土壌センサー。${range}を${accuracy}の精度で正確に測定。${output}出力はほとんどの制御システムと互換性があります。耐久性があり、防水で、すべての天候条件に適しています。スマートファーミングと農業4.0に最適です。`;
    }

    generateSoilSensorSpecs(type, range, accuracy, output, power, installation) {
        return {
            basic: {
                sensor_type: type,
                measurement_range: range,
                accuracy: accuracy,
                output_signal: output,
                power_source: power,
                installation_type: installation
            },
            electrical: {
                operating_voltage: "12V DC",
                current_consumption: "50mA max",
                output_load: "500Ω max",
                isolation_voltage: "500V",
                response_time: "<2s"
            },
            physical: {
                dimensions: "150 x 50 x 30mm",
                weight: 200,
                housing_material: "UV-resistant ABS",
                ip_rating: "IP68",
                cable_length: "5m standard"
            },
            environmental: {
                operating_temperature: "-20 to 60°C",
                storage_temperature: "-30 to 70°C",
                humidity_range: "0-100%RH",
                waterproof_rating: "Submersible"
            }
        };
    }

    // Price calculation methods
    getSoilSensorPrice(type) {
        const basePrices = {
            "Moisture": 850000,
            "pH": 1200000,
            "Temperature": 650000,
            "EC": 950000,
            "Nitrogen": 1500000,
            "Phosphorus": 1400000,
            "Potassium": 1450000
        };
        return basePrices[type] || 1000000;
    }

    getWeatherSensorPrice(type) {
        const basePrices = {
            "Temperature & Humidity": 750000,
            "Rain Gauge": 850000,
            "Wind Speed": 950000,
            "Wind Direction": 900000,
            "Solar Radiation": 1200000,
            "Barometric Pressure": 800000,
            "Leaf Wetness": 1100000
        };
        return basePrices[type] || 900000;
    }

    getPlantSensorPrice(type) {
        const basePrices = {
            "NDVI": 2500000,
            "Chlorophyll": 1800000,
            "Leaf Temperature": 950000,
            "Stomatal Conductance": 2200000,
            "Plant Height": 1600000,
            "Fruit Size": 1400000,
            "Disease Detection": 3500000
        };
        return basePrices[type] || 2000000;
    }

    getIrrigationSystemPrice(type, coverage) {
        const basePrices = {
            "Drip": 2500000,
            "Sprinkler": 3500000,
            "Flood": 2000000,
            "Micro-spray": 3000000,
            "Subsurface": 4000000
        };
        const coverageMultiplier = {
            "1-10m²": 0.5,
            "10-100m²": 1,
            "100-1000m²": 2,
            "1000-10000m²": 5
        };
        return Math.round(basePrices[type] * (coverageMultiplier[coverage] || 1));
    }

    getDripIrrigationPrice(type, flowRate) {
        const basePrices = {
            "Inline": 1500000,
            "Online": 1800000,
            "Subsurface": 2500000,
            "Micro-tube": 1200000
        };
        const flowMultiplier = {
            "0.5 L/h": 0.8,
            "1 L/h": 1,
            "2 L/h": 1.2,
            "4 L/h": 1.5,
            "8 L/h": 2
        };
        return Math.round(basePrices[type] * (flowMultiplier[flowRate] || 1));
    }

    getSprinklerSystemPrice(type, distance) {
        const basePrices = {
            "Impact": 800000,
            "Gear Drive": 1200000,
            "Pop-up": 1500000,
            "Rotary": 2000000,
            "Stationary": 600000
        };
        const distanceMultiplier = {
            "5-10m": 0.7,
            "10-15m": 1,
            "15-20m": 1.3,
            "20-30m": 1.8
        };
        return Math.round(basePrices[type] * (distanceMultiplier[distance] || 1));
    }

    // Weight calculation methods
    getSoilSensorWeight() { return 200; }
    getWeatherSensorWeight() { return 500; }
    getPlantSensorWeight() { return 150; }
    getIrrigationSystemWeight(type) { 
        const weights = { "Drip": 2000, "Sprinkler": 5000, "Flood": 10000, "Micro-spray": 3000, "Subsurface": 2500 };
        return weights[type] || 3000;
    }
    getDripIrrigationWeight() { return 1500; }
    getSprinklerSystemWeight(type) { 
        const weights = { "Impact": 800, "Gear Drive": 1200, "Pop-up": 1500, "Rotary": 2000, "Stationary": 600 };
        return weights[type] || 1000;
    }

    // Generate all products for Phase 1
    generateAllPhase1Products() {
        const products = [];
        let productIndex = 0;

        // Generate Soil Sensors (45 products)
        const soilTypes = ["Moisture", "pH", "Temperature", "EC", "Nitrogen", "Phosphorus", "Potassium"];
        const soilRanges = ["0-100%", "0-14 pH", "-20 to 60°C", "0-5 mS/cm", "0-200 mg/kg", "0-100 mg/kg", "0-300 mg/kg"];
        const soilAccuracies = ["±2%", "±0.1 pH", "±0.5°C", "±0.05 mS/cm", "±5 mg/kg", "±3 mg/kg", "±8 mg/kg"];
        const soilOutputs = ["4-20mA", "0-10V", "Digital", "LoRa", "Zigbee", "WiFi"];
        const soilPowers = ["Battery", "Solar", "Mains", "DC 12V"];
        const soilInstallations = ["In-soil", "Surface", "Portable", "Fixed"];

        for (let i = 0; i < 45; i++) {
            const typeIndex = i % soilTypes.length;
            const outputIndex = i % soilOutputs.length;
            const powerIndex = i % soilPowers.length;
            const installIndex = i % soilInstallations.length;
            
            products.push(this.generateSoilSensor(
                soilTypes[typeIndex],
                soilRanges[typeIndex],
                soilAccuracies[typeIndex],
                soilOutputs[outputIndex],
                soilPowers[powerIndex],
                soilInstallations[installIndex],
                productIndex++
            ));
        }

        // Generate Weather Sensors (35 products)
        const weatherTypes = ["Temperature & Humidity", "Rain Gauge", "Wind Speed", "Wind Direction", "Solar Radiation", "Barometric Pressure", "Leaf Wetness"];
        const weatherRanges = ["-40 to 85°C, 0-100%RH", "0-200mm/h", "0-60 m/s", "0-360°", "0-2000 W/m²", "300-1100 hPa", "0-15"];
        const weatherAccuracies = ["±0.3°C, ±2%RH", "±0.2mm", "±0.1 m/s", "±2°", "±5%", "±0.5 hPa", "±1"];
        const weatherMountings = ["Pole Mount", "Wall Mount", "Tripod", "Rooftop"];
        const weatherLoggings = ["Internal", "External", "Cloud", "None"];

        for (let i = 0; i < 35; i++) {
            const typeIndex = i % weatherTypes.length;
            const mountingIndex = i % weatherMountings.length;
            const loggingIndex = i % weatherLoggings.length;
            
            products.push(this.generateWeatherSensor(
                weatherTypes[typeIndex],
                weatherRanges[typeIndex],
                weatherAccuracies[typeIndex],
                weatherMountings[mountingIndex],
                weatherLoggings[loggingIndex],
                productIndex++
            ));
        }

        // Generate Plant Sensors (30 products)
        const plantTypes = ["NDVI", "Chlorophyll", "Leaf Temperature", "Stomatal Conductance", "Plant Height", "Fruit Size", "Disease Detection"];
        const plantRanges = ["-1 to 1", "0-100 SPAD", "-10 to 60°C", "0-1000 mmol/m²s", "0-500cm", "0-300mm", "0-100%"];
        const plantAccuracies = ["±0.02", "±1 SPAD", "±0.2°C", "±5%", "±1cm", "±0.5mm", "±5%"];
        const plantMountings = ["Handheld", "Fixed", "Drone-mounted", "Robot-mounted"];
        const plantConnectivities = ["Bluetooth", "WiFi", "LoRa", "Cellular"];

        for (let i = 0; i < 30; i++) {
            const typeIndex = i % plantTypes.length;
            const mountingIndex = i % plantMountings.length;
            const connectivityIndex = i % plantConnectivities.length;
            
            products.push(this.generatePlantSensor(
                plantTypes[typeIndex],
                plantRanges[typeIndex],
                plantAccuracies[typeIndex],
                plantMountings[mountingIndex],
                plantConnectivities[connectivityIndex],
                productIndex++
            ));
        }

        // Generate Irrigation Systems (55 products)
        const irrigationTypes = ["Drip", "Sprinkler", "Flood", "Micro-spray", "Subsurface"];
        const irrigationFlows = ["1-10 L/h per emitter", "100-5000 L/h", "10000-50000 L/h", "20-100 L/h", "0.5-5 L/h"];
        const irrigationPressures = ["1-3 bar", "2-8 bar", "0.5-2 bar", "1.5-4 bar", "0.5-2 bar"];
        const irrigationControls = ["Manual", "Timer", "Sensor-based", "Smart", "Remote"];
        const irrigationCoverages = ["1-10m²", "10-100m²", "100-1000m²", "1000-10000m²"];
        const irrigationMaterials = ["PVC", "HDPE", "LDPE", "Steel", "Copper"];

        for (let i = 0; i < 55; i++) {
            const typeIndex = i % irrigationTypes.length;
            const controlIndex = i % irrigationControls.length;
            const coverageIndex = i % irrigationCoverages.length;
            const materialIndex = i % irrigationMaterials.length;
            
            products.push(this.generateIrrigationSystem(
                irrigationTypes[typeIndex],
                irrigationFlows[typeIndex],
                irrigationPressures[typeIndex],
                irrigationControls[controlIndex],
                irrigationCoverages[coverageIndex],
                irrigationMaterials[materialIndex],
                productIndex++
            ));
        }

        // Generate Drip Irrigation (40 products)
        const dripTypes = ["Inline", "Online", "Subsurface", "Micro-tube"];
        const dripEmitters = ["Pressure Compensating", "Non-compensating", "Adjustable", "Vortex"];
        const dripFlows = ["0.5 L/h", "1 L/h", "2 L/h", "4 L/h", "8 L/h"];
        const dripSpacings = ["30cm", "50cm", "75cm", "100cm", "150cm"];
        const dripFilters = ["Screen Filter", "Disc Filter", "Sand Filter", "Media Filter"];
        const dripAutomations = ["Manual", "Semi-automatic", "Fully automatic", "AI-controlled"];

        for (let i = 0; i < 40; i++) {
            const typeIndex = i % dripTypes.length;
            const emitterIndex = i % dripEmitters.length;
            const flowIndex = i % dripFlows.length;
            const spacingIndex = i % dripSpacings.length;
            const filterIndex = i % dripFilters.length;
            const automationIndex = i % dripAutomations.length;
            
            products.push(this.generateDripIrrigation(
                dripTypes[typeIndex],
                dripEmitters[emitterIndex],
                dripFlows[flowIndex],
                dripSpacings[spacingIndex],
                dripFilters[filterIndex],
                dripAutomations[automationIndex],
                productIndex++
            ));
        }

        // Generate Sprinkler Systems (35 products)
        const sprinklerTypes = ["Impact", "Gear Drive", "Pop-up", "Rotary", "Stationary"];
        const sprinklerPatterns = ["Full Circle", "Half Circle", "Quarter Circle", "Adjustable"];
        const sprinklerDistances = ["5-10m", "10-15m", "15-20m", "20-30m"];
        const sprinklerFlows = ["500-1000 L/h", "1000-2000 L/h", "2000-4000 L/h"];
        const sprinklerPressures = ["2-4 bar", "3-5 bar", "4-7 bar"];
        const sprinklerNozzles = ["2mm", "3mm", "4mm", "5mm", "6mm", "8mm"];

        for (let i = 0; i < 35; i++) {
            const typeIndex = i % sprinklerTypes.length;
            const patternIndex = i % sprinklerPatterns.length;
            const distanceIndex = i % sprinklerDistances.length;
            const flowIndex = i % sprinklerFlows.length;
            const pressureIndex = i % sprinklerPressures.length;
            const nozzleIndex = i % sprinklerNozzles.length;
            
            products.push(this.generateSprinklerSystem(
                sprinklerTypes[typeIndex],
                sprinklerPatterns[patternIndex],
                sprinklerDistances[distanceIndex],
                sprinklerFlows[flowIndex],
                sprinklerPressures[pressureIndex],
                sprinklerNozzles[nozzleIndex],
                productIndex++
            ));
        }

        return products;
    }

    // Export Phase 1 products to JSON
    exportPhase1Products(filename = "agriculture-phase1-sensors-irrigation.json") {
        const products = this.generateAllPhase1Products();
        
        const data = {
            metadata: {
                version: "1.0",
                phase: "Phase 1",
                generated_date: "2026-04-06T13:00:00Z",
                total_products: products.length,
                categories: Object.keys(this.categories).length,
                description: "Agriculture Sensors & Irrigation Systems - Phase 1 Implementation"
            },
            categories: this.categories,
            manufacturers: this.manufacturers,
            product_templates: this.productTemplates,
            products: products
        };

        console.log(`=== Phase 1: Agriculture Sensors & Irrigation Systems ===`);
        console.log(`Total Products: ${data.metadata.total_products}`);
        console.log(`Categories: ${data.metadata.categories}`);
        console.log(`Manufacturers: ${Object.keys(this.manufacturers).length}`);
        console.log(`File: ${filename}`);
        
        return data;
    }

    // Common helper methods (reuse from existing generators)
    generatePricing(basePrice) {
        return {
            base_price: basePrice,
            currency: "VND",
            discount_tiers: {
                "1-10": 0,
                "11-50": 5,
                "51-100": 10,
                "100+": 15
            },
            warranty_years: 2,
            maintenance_cost_per_year: basePrice * 0.1
        };
    }

    generateInventory() {
        return {
            in_stock: 150,
            reserved: 25,
            available: 125,
            reorder_level: 50,
            reorder_quantity: 200,
            warehouse_location: "A1-15-03",
            lead_time_days: 20
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
                size: "2.5MB",
                language: "vi"
            },
            {
                type: "manual",
                url: `/documents/manuals/${id.toLowerCase()}.pdf`,
                size: "5.2MB",
                language: "vi"
            },
            {
                type: "certificate",
                url: `/documents/certificates/${id.toLowerCase()}.pdf`,
                size: "1.1MB",
                language: "en"
            }
        ];
    }

    generateApplications(type) {
        const appMap = {
            "Moisture": ["Nông nghiệp thông minh", "Quản lý tưới", "Giám sát độ ẩm đất"],
            "pH": ["Kiểm tra pH đất", "Cân bằng dinh dưỡng", "Tối ưu hóa tăng trưởng"],
            "Temperature": ["Giám sát nhiệt độ đất", "Bảo vệ rễ cây", "Quản lý mùa vụ"],
            "NDVI": ["Đánh giá sức khỏe cây", "Dự báo năng suất", "Phát hiện stress"],
            "Chlorophyll": ["Đo lường diệp lục", "Đánh giá dinh dưỡng", "Tối ưu bón phân"],
            "Drip": ["Tưới tiết kiệm", "Nông nghiệp chính xác", "Cây ăn trái"],
            "Sprinkler": ["Tưới diện rộng", "Cây trồng đồng ruộng", "Vườn cây ăn trái"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Công nghiệp", "Nghiên cứu"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho sản phẩm ${type}`,
            description_en: `${app} application for ${type} product`,
            description_ja: `${type}製品の${app}アプリケーション`
        }));
    }

    generateCompatibility(output) {
        const compatMap = {
            "4-20mA": ["PLC", "DCS", "SCADA", "HMI"],
            "0-10V": ["PLC", "DCS", "Data Logger", "Controller"],
            "Digital": ["Arduino", "Raspberry Pi", "Microcontroller", "IoT Gateway"],
            "LoRa": ["LoRaWAN Gateway", "IoT Platform", "Cloud Server"],
            "Zigbee": ["Zigbee Coordinator", "Smart Home Hub", "IoT Gateway"],
            "WiFi": ["WiFi Router", "Cloud Server", "Mobile App", "Web Dashboard"]
        };
        
        return compatMap[output] || ["Universal", "Standard Interface"];
    }

    generateQuality() {
        return {
            iso_certifications: ["ISO 9001:2015", "ISO 14001:2015"],
            quality_standards: ["CE", "RoHS", "REACH"],
            testing_procedures: ["Factory Test", "Field Test", "Third-party Certification"],
            defect_rate: "<0.1%",
            mean_time_between_failures: "50000 hours"
        };
    }

    generateLogistics(weight) {
        return {
            weight: weight,
            dimensions: {
                length: 200,
                width: 150,
                height: 100,
                unit: "mm"
            },
            packaging_type: "Cardboard Box",
            shipping_class: "Standard",
            dangerous_goods: false,
            storage_requirements: "Dry, Room Temperature"
        };
    }

    // Tag generation methods
    generateSoilSensorTags(type, range) {
        return [`soil-sensor`, type.toLowerCase(), `agriculture`, `smart-farming`, `precision-agriculture`, range.replace(/\s+/g, '-').toLowerCase()];
    }

    generateWeatherSensorTags(type, range) {
        return [`weather-sensor`, type.toLowerCase().replace(/\s+/g, '-'), `meteorology`, `agriculture`, `climate-monitoring`, range.replace(/\s+/g, '-').toLowerCase()];
    }

    generatePlantSensorTags(type, range) {
        return [`plant-sensor`, type.toLowerCase(), `crop-monitoring`, `precision-agriculture`, `smart-farming`, range.replace(/\s+/g, '-').toLowerCase()];
    }

    generateIrrigationSystemTags(type, flow) {
        return [`irrigation`, type.toLowerCase(), `water-management`, `agriculture`, `smart-irrigation`, flow.replace(/\s+/g, '-').toLowerCase()];
    }

    generateDripIrrigationTags(type, emitter) {
        return [`drip-irrigation`, type.toLowerCase(), emitter.toLowerCase().replace(/\s+/g, '-'), `water-efficiency`, `precision-irrigation`];
    }

    generateSprinklerSystemTags(type, pattern) {
        return [`sprinkler`, type.toLowerCase(), pattern.toLowerCase().replace(/\s+/g, '-'), `irrigation-system`, `water-distribution`];
    }

    // Additional description generation methods for other product types
    generateWeatherSensorDescription(type, range, accuracy, mounting) {
        return `Cảm biến thời tiết ${type} chuyên nghiệp. Đo chính xác ${range} với độ chính xác ${accuracy}. Lắp đặt ${mounting} dễ dàng. Chống chịu thời tiết khắc nghiệt. Dữ liệu chính xác cho nông nghiệp và nghiên cứu khí hậu.`;
    }

    generateWeatherSensorDescriptionEn(type, range, accuracy, mounting) {
        return `Professional ${type} weather sensor. Accurately measures ${range} with ${accuracy} accuracy. Easy ${mounting} installation. Weather-resistant design. Accurate data for agriculture and climate research.`;
    }

    generateWeatherSensorDescriptionJa(type, range, accuracy, mounting) {
        return `プロフェッショナル${type}気象センサー。${range}を${accuracy}の精度で正確に測定。${mounting}設置が簡単。過酷な天候に耐える設計。農業と気候研究のための正確なデータ。`;
    }

    generatePlantSensorDescription(type, range, accuracy, mounting) {
        return `Cảm biến cây trồng ${type} công nghệ cao. Đo chính xác ${range} với độ chính xác ${accuracy}. Lắp đặt ${mounting} linh hoạt. Giúp tối ưu hóa chăm sóc cây trồng và tăng năng suất.`;
    }

    generatePlantSensorDescriptionEn(type, range, accuracy, mounting) {
        return `High-tech ${type} plant sensor. Accurately measures ${range} with ${accuracy} accuracy. Flexible ${mounting} mounting. Helps optimize crop care and increase yield.`;
    }

    generatePlantSensorDescriptionJa(type, range, accuracy, mounting) {
        return `ハイテク${type}植物センサー。${range}を${accuracy}の精度で正確に測定。柔軟な${mounting}マウント。作物のケアを最適化し、収量を増やすのに役立ちます。`;
    }

    generateIrrigationSystemDescription(type, flow, pressure, control, coverage) {
        return `Hệ thống tưới ${type} hiệu quả cao. Lưu lượng ${flow}, áp suất ${pressure}. Điều khiển ${control} thông minh. Phù hợp cho diện tích ${coverage}. Tiết kiệm nước và tối ưu hóa tưới tiêu.`;
    }

    generateIrrigationSystemDescriptionEn(type, flow, pressure, control, coverage) {
        return `High-efficiency ${type} irrigation system. ${flow} flow rate, ${pressure} pressure. Smart ${control} control. Suitable for ${coverage} areas. Water-saving and optimized irrigation.`;
    }

    generateIrrigationSystemDescriptionJa(type, flow, pressure, control, coverage) {
        return `高効率${type}灌漑システム。${flow}流量、${pressure}圧力。スマート${control}制御。${coverage}エリアに適しています。節水と最適化された灌漑。`;
    }

    generateDripIrrigationDescription(type, emitter, flow, spacing, filter) {
        return `Hệ thống tưới nhỏ giọt ${type} với emitter ${emitter}. Lưu lượng ${flow}, khoảng cách ${spacing}. Bộ lọc ${filter} bảo vệ hệ thống. Tiết kiệm nước đến 70% so với tưới truyền thống.`;
    }

    generateDripIrrigationDescriptionEn(type, emitter, flow, spacing, filter) {
        return `${type} drip irrigation system with ${emitter} emitter. ${flow} flow rate, ${spacing} spacing. ${filter} filter system protection. Saves up to 70% water compared to traditional irrigation.`;
    }

    generateDripIrrigationDescriptionJa(type, emitter, flow, spacing, filter) {
        return `${emitter}エミッター付き${type}点滴灌漑システム。${flow}流量、${spacing}間隔。${filter}フィルターシステム保護。従来の灌漑と比較して最大70%の節水。`;
    }

    generateSprinklerSystemDescription(type, pattern, distance, flow, pressure) {
        return `Hệ thống phun sương ${type} kiểu ${pattern}. Tầm xa ${distance}, lưu lượng ${flow}. Áp suất hoạt động ${pressure}. Phù hợp cho đồng ruộng và sân golf.`;
    }

    generateSprinklerSystemDescriptionEn(type, pattern, distance, flow, pressure) {
        return `${type} sprinkler system with ${pattern} pattern. ${distance} distance, ${flow} flow rate. ${pressure} operating pressure. Suitable for fields and golf courses.`;
    }

    generateSprinklerSystemDescriptionJa(type, pattern, distance, flow, pressure) {
        return `${pattern}パターンの${type}散水システム。${distance}距離、${flow}流量。${pressure}動作圧力。畑とゴルフコースに適しています。`;
    }

    // Specification generation methods for other product types
    generateWeatherSensorSpecs(type, range, accuracy, mounting, logging) {
        return {
            basic: {
                sensor_type: type,
                measurement_range: range,
                accuracy: accuracy,
                mounting_type: mounting,
                data_logging: logging
            },
            electrical: {
                operating_voltage: "12V DC",
                current_consumption: "100mA max",
                communication: "RS485/Modbus",
                output_signals: ["4-20mA", "0-10V", "Digital"],
                power_consumption: "1.2W max"
            },
            physical: {
                dimensions: "200 x 150 x 100mm",
                weight: 500,
                housing_material: "Aluminum + UV-resistant plastic",
                ip_rating: "IP66",
                cable_length: "10m standard"
            },
            environmental: {
                operating_temperature: "-40 to 85°C",
                storage_temperature: "-50 to 95°C",
                humidity_range: "0-100%RH",
                wind_resistance: "200 km/h"
            }
        };
    }

    generatePlantSensorSpecs(type, range, accuracy, mounting, connectivity) {
        return {
            basic: {
                sensor_type: type,
                measurement_range: range,
                accuracy: accuracy,
                mounting_method: mounting,
                connectivity: connectivity
            },
            electrical: {
                operating_voltage: "3.3V-5V DC",
                current_consumption: "50mA max",
                wireless_range: "100m line of sight",
                battery_life: "6 months",
                charging_time: "4 hours"
            },
            physical: {
                dimensions: "120 x 60 x 30mm",
                weight: 150,
                housing_material: "ABS plastic",
                ip_rating: "IP67",
                display: "LCD 128x64"
            },
            performance: {
                response_time: "<1s",
                sampling_rate: "1 Hz",
                data_storage: "32MB internal",
                update_frequency: "Real-time"
            }
        };
    }

    generateIrrigationSystemSpecs(type, flow, pressure, control, coverage, material) {
        return {
            basic: {
                system_type: type,
                flow_rate: flow,
                operating_pressure: pressure,
                control_method: control,
                coverage_area: coverage,
                pipe_material: material
            },
            hydraulic: {
                max_flow: flow,
                working_pressure: pressure,
                pressure_loss: "<5%",
                flow_uniformity: ">90%",
                filter_requirements: "120 mesh"
            },
            control: {
                control_type: control,
                automation_level: "Full automation",
                remote_access: "WiFi/4G",
                scheduling: "Programmable",
                sensors_integration: "Soil moisture, Weather"
            },
            installation: {
                installation_type: "Above ground/Below ground",
                tools_required: "Standard tools",
                installation_time: "1-2 days",
                maintenance_interval: "Monthly"
            }
        };
    }

    generateDripIrrigationSpecs(type, emitter, flow, spacing, filter, automation) {
        return {
            basic: {
                system_type: type,
                emitter_type: emitter,
                flow_rate: flow,
                emitter_spacing: spacing,
                filter_type: filter,
                automation_level: automation
            },
            hydraulic: {
                operating_pressure: "1-3 bar",
                flow_uniformity: ">95%",
                pressure_compensation: emitter.includes("Pressure"),
                flushing_velocity: "0.5 m/s",
                clogging_resistance: "High"
            },
            components: {
                pipe_diameter: "16mm",
                emitter_spacing: spacing,
                filter_specification: "120 mesh",
                pressure_regulator: "Included",
                air_release_valve: "Automatic"
            },
            performance: {
                water_efficiency: "95%",
                fertilizer_efficiency: "90%",
                energy_consumption: "Low",
                maintenance_requirement: "Low"
            }
        };
    }

    generateSprinklerSystemSpecs(type, pattern, distance, flow, pressure, nozzle) {
        return {
            basic: {
                sprinkler_type: type,
                spray_pattern: pattern,
                throw_distance: distance,
                flow_rate: flow,
                operating_pressure: pressure,
                nozzle_size: nozzle
            },
            hydraulic: {
                working_pressure: pressure,
                flow_rate: flow,
                coverage_radius: distance,
                precipitation_rate: "10-30mm/h",
                distribution_uniformity: ">85%"
            },
            mechanical: {
                material: "Brass/Stainless steel",
                bearing_type: "Sealed ball bearing",
                rotation_speed: "1-5 RPM",
                nozzle_material: "Brass",
                adjustment_range: "0-360°"
            },
            installation: {
                connection_type: "Riser/In-ground",
                installation_height: "30-100cm",
                recommended_spacing: distance,
                pipe_size: "25-50mm",
                foundation: "Concrete base"
            }
        };
    }

    // Compatibility generation methods for other product types
    generateWeatherSensorCompatibility() {
        return ["Weather Stations", "Agricultural Monitoring Systems", "SCADA", "IoT Platforms", "Data Loggers"];
    }

    generatePlantSensorCompatibility(connectivity) {
        const compatMap = {
            "Bluetooth": ["Smartphone", "Tablet", "Laptop", "IoT Gateway"],
            "WiFi": ["WiFi Router", "Cloud Server", "Mobile App", "Web Dashboard"],
            "LoRa": ["LoRaWAN Gateway", "IoT Platform", "Cloud Server"],
            "Cellular": ["4G/5G Network", "Cloud Server", "Mobile App", "Web Dashboard"]
        };
        return compatMap[connectivity] || ["Universal Interface"];
    }

    generateIrrigationSystemCompatibility(control) {
        const compatMap = {
            "Manual": ["Manual Valves", "Ball Valves", "Gate Valves"],
            "Timer": ["Irrigation Controllers", "Timers", "Schedulers"],
            "Sensor-based": ["Soil Moisture Sensors", "Weather Stations", "Flow Meters"],
            "Smart": ["Smart Controllers", "IoT Platforms", "Mobile Apps", "Cloud Systems"],
            "Remote": ["Remote Control Systems", "Web Interface", "Mobile Apps"]
        };
        return compatMap[control] || ["Standard Control Interface"];
    }

    generateDripIrrigationCompatibility(automation) {
        const compatMap = {
            "Manual": ["Manual Valves", "Ball Valves"],
            "Semi-automatic": ["Timer Controllers", "Basic Automation"],
            "Fully automatic": ["Smart Controllers", "Sensor Integration"],
            "AI-controlled": ["AI Platforms", "Machine Learning Systems", "Advanced Analytics"]
        };
        return compatMap[automation] || ["Standard Irrigation Interface"];
    }

    generateSprinklerSystemCompatibility() {
        return ["Irrigation Controllers", "Smart Systems", "Weather-based Control", "Flow Management Systems"];
    }

    // Application generation methods for other product types
    generateWeatherSensorApplications(type) {
        const appMap = {
            "Temperature & Humidity": ["Giám sát khí hậu", "Dự báo thời tiết", "Quản lý nhà kính"],
            "Rain Gauge": ["Đo lượng mưa", "Quản lý tưới", "Cảnh báo lũ"],
            "Wind Speed": ["Giám sát gió", "Bảo vệ cây trồng", "An toàn máy bay"],
            "Wind Direction": ["Phân tích gió", "Hướng phun thuốc", "Thiết kế nhà kính"],
            "Solar Radiation": ["Đo bức xạ", "Quản lý năng lượng", "Tính toán quang hợp"],
            "Barometric Pressure": ["Dự báo thời tiết", "Giám sát khí áp", "Cảnh báo bão"],
            "Leaf Wetness": ["Phát hiện bệnh", "Quản lý nấm", "Cảnh báo sâu bệnh"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Khí tượng học", "Nghiên cứu môi trường"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho cảm biến ${type}`,
            description_en: `${app} application for ${type} sensor`,
            description_ja: `${type}センサーの${app}アプリケーション`
        }));
    }

    generatePlantSensorApplications(type) {
        const appMap = {
            "NDVI": ["Đánh giá sức khỏe cây", "Dự báo năng suất", "Phát hiện stress"],
            "Chlorophyll": ["Đo lường diệp lục", "Đánh giá dinh dưỡng", "Tối ưu bón phân"],
            "Leaf Temperature": ["Giám sát nhiệt độ lá", "Phát hiện stress nước", "Quản lý tưới"],
            "Stomatal Conductance": ["Đo độ dẫn khí", "Quản lý nước", "Hiệu suất quang hợp"],
            "Plant Height": ["Theo dõi tăng trưởng", "Dự báo năng suất", "Quản lý không gian"],
            "Fruit Size": ["Đo kích th quả", "Dự báo thu hoạch", "Phân loại sản phẩm"],
            "Disease Detection": ["Phát hiện bệnh sớm", "Cảnh báo sâu bệnh", "Quản lý dịch hại"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp chính xác", "Nghiên cứu cây trồng", "Quản lý nông trại"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho cảm biến ${type}`,
            description_en: `${app} application for ${type} sensor`,
            description_ja: `${type}センサーの${app}アプリケーション`
        }));
    }

    generateIrrigationSystemApplications(type) {
        const appMap = {
            "Drip": ["Nông nghiệp chính xác", "Cây ăn trái", "Vườn rau", "Nônghouse"],
            "Sprinkler": ["Đồng ruộng", "Sân golf", "Công viên", "Sân thể thao"],
            "Flood": ["Lúa nước", "Cây trồng đồng ruộng", "Tưới lũ"],
            "Micro-spray": ["Vườn cây", "Nhà kính", "Cây cảnh", "Sân vườn"],
            "Subsurface": ["Nông nghiệp tiết kiệm nước", "Khu vực khô hạn", "Cây công nghiệp"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Cảnh quan", "Thể thao"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho hệ thống tưới ${type}`,
            description_en: `${app} application for ${type} irrigation system`,
            description_ja: `${type}灌漑システムの${app}アプリケーション`
        }));
    }

    generateDripIrrigationApplications(type) {
        const appMap = {
            "Inline": ["Nông nghiệp quy mô lớn", "Cây công nghiệp", "Nho"],
            "Online": ["Vườn rau", "Cây ăn quả", "Nhà kính"],
            "Subsurface": ["Nông nghiệp tiết kiệm nước", "Khu vực đô thị", "Cây công nghiệp"],
            "Micro-tube": ["Chậu cây", "Vườn treo", "Cây cảnh"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp chính xác", "Tiết kiệm nước", "Nônghouse"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho tưới nhỏ giọt ${type}`,
            description_en: `${app} application for ${type} drip irrigation`,
            description_ja: `${type}点滴灌漑の${app}アプリケーション`
        }));
    }

    generateSprinklerSystemApplications(type) {
        const appMap = {
            "Impact": ["Đồng ruộng lớn", "Sân golf", "Công viên"],
            "Gear Drive": ["Sân thể thao", "Sân vườn", "Khu dân cư"],
            "Pop-up": ["Sân cỏ", "Vườn hoa", "Cảnh quan"],
            "Rotary": ["Nông nghiệp", "Sân golf", "Công viên lớn"],
            "Stationary": ["Khu vực nhỏ", "Vườn nhà", "Chậu cây"]
        };
        
        const applications = appMap[type] || ["Tưới tiêu", "Cảnh quan", "Thể thao"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho phun sương ${type}`,
            description_en: `${app} application for ${type} sprinkler`,
            description_ja: `${type}散水の${app}アプリケーション`
        }));
    }

    generateSoilSensorApplications(type) {
        const appMap = {
            "Moisture": ["Nông nghiệp thông minh", "Quản lý tưới", "Giám sát độ ẩm đất"],
            "pH": ["Kiểm tra pH đất", "Cân bằng dinh dưỡng", "Tối ưu hóa tăng trưởng"],
            "Temperature": ["Giám sát nhiệt độ đất", "Bảo vệ rễ cây", "Quản lý mùa vụ"],
            "EC": ["Đo độ dẫn điện", "Quản lý muối", "Kiểm tra dinh dưỡng"],
            "Nitrogen": ["Đo đạm đất", "Tối ưu bón phân", "Quản lý dinh dưỡng"],
            "Phosphorus": ["Đo lân đất", "Cân bằng phân bón", "Tăng trưởng rễ"],
            "Potassium": ["Đo kali đất", "Cường độ cây", "Chống chịu bệnh"]
        };
        
        const applications = appMap[type] || ["Nông nghiệp", "Công nghiệp", "Nghiên cứu"];
        return applications.map(app => ({
            name: app,
            name_en: app,
            name_ja: app,
            description: `Ứng dụng ${app} cho cảm biến ${type}`,
            description_en: `${app} application for ${type} sensor`,
            description_ja: `${type}センサーの${app}アプリケーション`
        }));
    }

    generateSoilSensorCompatibility(output) {
        const compatMap = {
            "4-20mA": ["PLC", "DCS", "SCADA", "HMI"],
            "0-10V": ["PLC", "DCS", "Data Logger", "Controller"],
            "Digital": ["Arduino", "Raspberry Pi", "Microcontroller", "IoT Gateway"],
            "LoRa": ["LoRaWAN Gateway", "IoT Platform", "Cloud Server"],
            "Zigbee": ["Zigbee Coordinator", "Smart Home Hub", "IoT Gateway"],
            "WiFi": ["WiFi Router", "Cloud Server", "Mobile App", "Web Dashboard"]
        };
        
        return compatMap[output] || ["Universal", "Standard Interface"];
    }
}

// Usage and execution
const phase1Generator = new AgricultureSensorsIrrigationGenerator();

// Generate and export Phase 1 products
const phase1Data = phase1Generator.exportPhase1Products();

console.log("\n=== Phase 1 Summary ===");
console.log("Categories implemented:");
Object.entries(phase1Generator.categories).forEach(([key, cat]) => {
    console.log(`- ${cat.name}: ${cat.products} products`);
});

console.log("\nManufacturers:");
Object.entries(phase1Generator.manufacturers).forEach(([key, mfr]) => {
    console.log(`- ${mfr.name} (${mfr.country})`);
});

module.exports = AgricultureSensorsIrrigationGenerator;
