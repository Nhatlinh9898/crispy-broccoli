/**
 * Complete Product Database Generator
 * Generates all 327 products with full detailed information
 */

class ProductGenerator {
    constructor() {
        this.categories = {
            mechanical_fasteners: {
                id: "cat_mechanical_fasteners",
                name: "Bu lông, Ốc vít",
                name_en: "Bolts & Screws",
                name_ja: "ボルト・ネジ",
                products: 89
            },
            mechanical_bearings: {
                id: "cat_mechanical_bearings", 
                name: "Vòng bi, Đồng trục",
                name_en: "Bearings & Bushings",
                name_ja: "ベアリング・ブッシュ",
                products: 67
            },
            electronic_passive: {
                id: "cat_electronic_passive",
                name: "Linh kiện điện tử thụ động",
                name_en: "Passive Electronic Components", 
                name_ja: "受動電子部品",
                products: 124
            },
            electronic_active: {
                id: "cat_electronic_active",
                name: "Linh kiện điện tử chủ động",
                name_en: "Active Electronic Components",
                name_ja: "能動電子部品", 
                products: 47
            }
        };

        this.manufacturers = {
            nitto_seiko: {
                id: "mfr_nitto_seiko",
                name: "Nitto Seiko",
                name_en: "Nitto Seiko Co., Ltd.",
                name_ja: "日精株式会社",
                country: "Japan",
                reliability: 4.8,
                lead_time: 14
            },
            nsk: {
                id: "mfr_nsk",
                name: "NSK Ltd.",
                name_en: "NSK Ltd.", 
                name_ja: "日本精工株式会社",
                country: "Japan",
                reliability: 4.9,
                lead_time: 21
            },
            murata: {
                id: "mfr_murata",
                name: "Murata Manufacturing",
                name_en: "Murata Manufacturing Co., Ltd.",
                name_ja: "村田製作所",
                country: "Japan", 
                reliability: 4.7,
                lead_time: 28
            }
        };

        this.productTemplates = {
            hex_bolts: {
                sizes: ["M4", "M5", "M6", "M8", "M10", "M12", "M16", "M20"],
                lengths: {
                    "M4": [8, 10, 12, 16, 20],
                    "M5": [10, 12, 16, 20, 25],
                    "M6": [12, 16, 20, 25, 30, 40],
                    "M8": [16, 20, 25, 30, 40, 50],
                    "M10": [20, 25, 30, 40, 50, 60],
                    "M12": [25, 30, 40, 50, 60, 80],
                    "M16": [30, 40, 50, 60, 80, 100],
                    "M20": [40, 50, 60, 80, 100, 120]
                },
                grades: ["4.8", "8.8", "10.9", "12.9"],
                coatings: ["White Zinc Plated", "Black Zinc Plated", "Hot Dip Galvanized", "Stainless Steel"]
            },
            ball_bearings: {
                series: ["6000", "6001", "6002", "6003", "6004", "6200", "6201", "6202", "6203", "6204"],
                seals: ["2RS", "2RZ", "Open"],
                precision: ["ABEC 1", "ABEC 3", "ABEC 5", "ABEC 7"]
            },
            resistors: {
                values: ["100Ω", "220Ω", "470Ω", "1kΩ", "2.2kΩ", "4.7kΩ", "10kΩ", "22kΩ", "47kΩ", "100kΩ"],
                powers: ["1/8W", "1/4W", "1/2W", "1W"],
                tolerances: ["±1%", "±5%", "±10%"],
                types: ["Carbon Film", "Metal Film", "Thick Film", "Wirewound"]
            }
        };
    }

    generateHexBolt(size, length, grade, coating, index) {
        const id = `M${String(index + 1).padStart(3, '0')}-001`;
        const sku = `M${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `NS-HB-${size}-${length}-${grade.replace('.', '')}-${this.getCoatingCode(coating)}`;
        
        return {
            id,
            sku,
            name: `Bu lông lục giác ${size}x${length}`,
            name_en: `Hex Bolt ${size}x${length}`,
            name_ja: `六角ボルト ${size}x${length}`,
            short_description: `Bu lông lục giác ${size}x${length} tiêu chuẩn JIS B1181, độ bền ${grade}`,
            short_description_en: `Hex Bolt ${size}x${length} JIS B1181 standard, ${grade} strength grade`,
            short_description_ja: `JIS B1181六角ボルト ${size}x${length}、${grade}強度等級`,
            long_description: this.generateBoltDescription(size, length, grade, coating),
            long_description_en: this.generateBoltDescriptionEn(size, length, grade, coating),
            long_description_ja: this.generateBoltDescriptionJa(size, length, grade, coating),
            category_id: "cat_mechanical_fasteners",
            subcategory: "Hex Bolts",
            subcategory_en: "Hex Bolts", 
            subcategory_ja: "六角ボルト",
            manufacturer_id: "mfr_nitto_seiko",
            brand: "Nitto Seiko",
            part_number: partNumber,
            specifications: this.generateBoltSpecs(size, length, grade, coating),
            pricing: this.generatePricing(this.getBoltPrice(size, grade)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateBoltApplications(grade),
            compatibility: this.generateBoltCompatibility(size),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getBoltWeight(size)),
            status: "active",
            created_date: "2021-05-10T00:00:00Z",
            updated_date: "2026-04-06T10:56:00Z",
            tags: this.generateBoltTags(size, grade, coating)
        };
    }

    generateBallBearing(series, seal, precision, index) {
        const id = `B${String(index + 1).padStart(3, '0')}-001`;
        const sku = `B${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `NSK-${series}-${seal}`;
        
        const dimensions = this.getBearingDimensions(series);
        
        return {
            id,
            sku,
            name: `Vòng bi bi tròn ${series}-${seal}`,
            name_en: `Ball Bearing ${series}-${seal}`,
            name_ja: `ボールベアリング ${series}-${seal}`,
            short_description: `Vòng bi bi tròn ${series} ${seal}, độ chính xác ${precision}`,
            short_description_en: `Ball bearing ${series} ${seal}, ${precision} precision`,
            short_description_ja: `ボールベアリング ${series} ${seal}、${precision}精度`,
            long_description: this.generateBearingDescription(series, seal, precision),
            long_description_en: this.generateBearingDescriptionEn(series, seal, precision),
            long_description_ja: this.generateBearingDescriptionJa(series, seal, precision),
            category_id: "cat_mechanical_bearings",
            subcategory: "Ball Bearings",
            subcategory_en: "Ball Bearings",
            subcategory_ja: "ボールベアリング",
            manufacturer_id: "mfr_nsk",
            brand: "NSK Ltd.",
            part_number: partNumber,
            specifications: this.generateBearingSpecs(series, seal, precision, dimensions),
            pricing: this.generatePricing(this.getBearingPrice(series)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateBearingApplications(),
            compatibility: this.generateBearingCompatibility(series),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getBearingWeight(series)),
            status: "active",
            created_date: "2021-05-10T00:00:00Z",
            updated_date: "2026-04-06T10:56:00Z",
            tags: this.generateBearingTags(series, seal)
        };
    }

    generateResistor(value, power, tolerance, type, index) {
        const id = `R${String(index + 1).padStart(3, '0')}-001`;
        const sku = `R${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `MR-RES-${value}-${power}-${tolerance}-${type}`;
        
        return {
            id,
            sku,
            name: `Điện trở ${value} ${power} ${tolerance} ${type}`,
            name_en: `Resistor ${value} ${power} ${tolerance} ${type}`,
            name_ja: `抵抗器 ${value} ${power} ${tolerance} ${type}`,
            short_description: `Điện trở ${value} công suất ${power}, dung sai ${tolerance}, loại ${type}`,
            short_description_en: `${value} resistor, ${power} power, ${tolerance} tolerance, ${type} type`,
            short_description_ja: `${value}抵抗器、${power}電力、${tolerance}許容差、${type}タイプ`,
            long_description: this.generateResistorDescription(value, power, tolerance, type),
            long_description_en: this.generateResistorDescriptionEn(value, power, tolerance, type),
            long_description_ja: this.generateResistorDescriptionJa(value, power, tolerance, type),
            category_id: "cat_electronic_passive",
            subcategory: "Resistors",
            subcategory_en: "Resistors",
            subcategory_ja: "抵抗器",
            manufacturer_id: "mfr_murata",
            brand: "Murata Manufacturing",
            part_number: partNumber,
            specifications: this.generateResistorSpecs(value, power, tolerance, type),
            pricing: this.generatePricing(this.getResistorPrice(value, power)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateResistorApplications(type),
            compatibility: this.generateResistorCompatibility(value),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getResistorWeight()),
            status: "active",
            created_date: "2021-05-10T00:00:00Z",
            updated_date: "2026-04-06T10:56:00Z",
            tags: this.generateResistorTags(value, type)
        };
    }

    generateCapacitor(type, value, voltage, index) {
        const id = `C${String(index + 1).padStart(3, '0')}-001`;
        const sku = `C${String(index + 1).padStart(3, '0')}-001`;
        const partNumber = `MR-CAP-${type}-${value}-${voltage}`;
        
        return {
            id,
            sku,
            name: `Tụ điện ${type} ${value} ${voltage}`,
            name_en: `${type} Capacitor ${value} ${voltage}`,
            name_ja: `${type}コンデンサ ${value} ${voltage}`,
            short_description: `Tụ điện ${type} dung lượng ${value}, điện áp làm việc ${voltage}`,
            short_description_en: `${type} capacitor ${value} capacitance, ${voltage} working voltage`,
            short_description_ja: `${type}コンデンサ ${value}容量、${voltage}動作電圧`,
            long_description: this.generateCapacitorDescription(type, value, voltage),
            long_description_en: this.generateCapacitorDescriptionEn(type, value, voltage),
            long_description_ja: this.generateCapacitorDescriptionJa(type, value, voltage),
            category_id: "cat_electronic_active",
            subcategory: "Capacitors",
            subcategory_en: "Capacitors",
            subcategory_ja: "コンデンサ",
            manufacturer_id: "mfr_murata",
            brand: "Murata Manufacturing",
            part_number: partNumber,
            specifications: this.generateCapacitorSpecs(type, value, voltage),
            pricing: this.generatePricing(this.getCapacitorPrice(type, value)),
            inventory: this.generateInventory(),
            images: this.generateImages(id),
            documents: this.generateDocuments(id),
            applications: this.generateCapacitorApplications(type),
            compatibility: this.generateCapacitorCompatibility(type, value),
            quality: this.generateQuality(),
            logistics: this.generateLogistics(this.getCapacitorWeight(type)),
            status: "active",
            created_date: "2021-05-10T00:00:00Z",
            updated_date: "2026-04-06T10:56:00Z",
            tags: this.generateCapacitorTags(type, value)
        };
    }

    // Generate all products
    generateAllProducts() {
        const products = [];
        let productIndex = 0;

        // Generate hex bolts (89 products)
        for (const size of this.productTemplates.hex_bolts.sizes) {
            for (const length of this.productTemplates.hex_bolts.lengths[size]) {
                for (const grade of this.productTemplates.hex_bolts.grades) {
                    for (const coating of this.productTemplates.hex_bolts.coatings) {
                        if (productIndex < 89) {
                            products.push(this.generateHexBolt(size, length, grade, coating, productIndex));
                            productIndex++;
                        }
                    }
                }
            }
        }

        // Generate ball bearings (67 products)
        productIndex = 0;
        for (const series of this.productTemplates.ball_bearings.series) {
            for (const seal of this.productTemplates.ball_bearings.seals) {
                for (const precision of this.productTemplates.ball_bearings.precision) {
                    if (productIndex < 67) {
                        products.push(this.generateBallBearing(series, seal, precision, productIndex));
                        productIndex++;
                    }
                }
            }
        }

        // Generate resistors (124 products)
        productIndex = 0;
        for (const value of this.productTemplates.resistors.values) {
            for (const power of this.productTemplates.resistors.powers) {
                for (const tolerance of this.productTemplates.resistors.tolerances) {
                    for (const type of this.productTemplates.resistors.types) {
                        if (productIndex < 124) {
                            products.push(this.generateResistor(value, power, tolerance, type, productIndex));
                            productIndex++;
                        }
                    }
                }
            }
        }

        // Generate capacitors (47 products)
        productIndex = 0;
        const capacitorTypes = ["Ceramic", "Electrolytic", "Tantalum", "Film"];
        const capacitorValues = ["10pF", "100pF", "1nF", "10nF", "100nF", "1µF", "10µF", "100µF"];
        const voltages = ["16V", "25V", "50V", "100V", "250V"];
        
        for (const type of capacitorTypes) {
            for (const value of capacitorValues) {
                for (const voltage of voltages) {
                    if (productIndex < 47) {
                        products.push(this.generateCapacitor(type, value, voltage, productIndex));
                        productIndex++;
                    }
                }
            }
        }

        return products;
    }

    // Helper methods
    getCoatingCode(coating) {
        const codes = {
            "White Zinc Plated": "ZP",
            "Black Zinc Plated": "BZ",
            "Hot Dip Galvanized": "HDG",
            "Stainless Steel": "SS"
        };
        return codes[coating] || "ZP";
    }

    generateBoltDescription(size, length, grade, coating) {
        return `Bu lông lục giác ${size}x${length} được sản xuất theo tiêu chuẩn JIS B1181, sử dụng vật liệu ${this.getBoltMaterial(grade)}, được xử lý nhiệt để đạt độ bền ${grade}. Bề mặt được ${this.getCoatingDescription(coating)} chống gỉ sét, phù hợp cho các ứng dụng kết cấu cơ khí, máy móc công nghiệp và thiết bị tự động hóa. Sản phẩm có thể chịu tải trọng kéo tối đa ${this.getBoltMaxLoad(size, grade)}kg và mô-men xoắn ${this.getBoltMaxTorque(size, grade)} Nm.`;
    }

    generateBoltDescriptionEn(size, length, grade, coating) {
        return `${size}x${length} hex bolt manufactured according to JIS B1181 standard, made of ${this.getBoltMaterial(grade)}, heat-treated to achieve ${grade} strength grade. ${this.getCoatingDescription(coating)} surface for rust resistance, suitable for mechanical structure, industrial machinery and automation equipment applications. Product can withstand maximum tensile load of ${this.getBoltMaxLoad(size, grade)}kg and torque of ${this.getBoltMaxTorque(size, grade)} Nm.`;
    }

    generateBoltDescriptionJa(size, length, grade, coating) {
        return `JIS B1181規格に従って製造された${size}x${length}六角ボルト、${this.getBoltMaterial(grade)}を使用し、熱処理により${grade}強度等級を達成。${this.getCoatingDescription(coating)}表面で耐食性に優れ、機械構造、産業機械、自動化設備の用途に適用。最大引張荷重${this.getBoltMaxLoad(size, grade)}kg、トルク${this.getBoltMaxTorque(size, grade)}Nmに耐える。`;
    }

    getCoatingDescription(coating) {
        const descriptions = {
            "White Zinc Plated": "mạ kẽm trắng",
            "Black Zinc Plated": "mạ kẽm đen", 
            "Hot Dip Galvanized": "mạ kẽm nóng",
            "Stainless Steel": "làm từ inox"
        };
        return descriptions[coating] || "mạ kẽm trắng";
    }

    getBoltMaterial(grade) {
        const materials = {
            "4.8": "Carbon Steel SWRM8",
            "8.8": "Carbon Steel SWRM8", 
            "10.9": "Alloy Steel SCM435",
            "12.9": "Alloy Steel SCM440"
        };
        return materials[grade] || "Carbon Steel SWRM8";
    }

    getBoltMaxLoad(size, grade) {
        const baseLoads = {"M4": 200, "M5": 320, "M6": 460, "M8": 850, "M10": 1330, "M12": 1940, "M16": 3580, "M20": 5620};
        const gradeMultipliers = {"4.8": 0.6, "8.8": 1.0, "10.9": 1.2, "12.9": 1.4};
        return Math.round(baseLoads[size] * gradeMultipliers[grade]);
    }

    getBoltMaxTorque(size, grade) {
        const baseTorques = {"M4": 1.5, "M5": 3.2, "M6": 5.5, "M8": 13, "M10": 25, "M12": 44, "M16": 110, "M20": 200};
        const gradeMultipliers = {"4.8": 0.7, "8.8": 1.0, "10.9": 1.3, "12.9": 1.5};
        return (baseTorques[size] * gradeMultipliers[grade]).toFixed(1);
    }

    getBearingDimensions(series) {
        const dimensions = {
            "6000": {inner: "10mm", outer: "26mm", width: "8mm"},
            "6001": {inner: "12mm", outer: "28mm", width: "8mm"},
            "6002": {inner: "15mm", outer: "32mm", width: "9mm"},
            "6003": {inner: "17mm", outer: "35mm", width: "10mm"},
            "6004": {inner: "20mm", outer: "42mm", width: "12mm"},
            "6200": {inner: "10mm", outer: "30mm", width: "9mm"},
            "6201": {inner: "12mm", outer: "32mm", width: "10mm"},
            "6202": {inner: "15mm", outer: "35mm", width: "11mm"},
            "6203": {inner: "17mm", outer: "40mm", width: "12mm"},
            "6204": {inner: "20mm", outer: "47mm", width: "14mm"}
        };
        return dimensions[series] || {inner: "10mm", outer: "26mm", width: "8mm"};
    }

    generateBearingDescription(series, seal, precision) {
        return `Vòng bi bi tròn ${series} ${seal} là vòng bi công suất cao, độ chính xác ${precision}, được sản xuất theo tiêu chuẩn JIS B1518. Vòng bi có khả năng chịu tải trọng hướng tâm cao, tốc độ hoạt động ổn định, phù hợp cho các ứng dụng động cơ công nghiệp, máy móc chính xác và thiết bị tự động hóa. Thiết kế ${seal} giúp bảo vệ vòng bi khỏi bụi bẩn và hơi ẩm.`;
    }

    generateBearingDescriptionEn(series, seal, precision) {
        return `${series} ${seal} ball bearing is a high-capacity bearing with ${precision} precision, manufactured according to JIS B1518 standard. The bearing has high radial load capacity, stable operating speed, suitable for industrial motor, precision machinery and automation equipment applications. ${seal} design helps protect the bearing from dust and moisture.`;
    }

    generateBearingDescriptionJa(series, seal, precision) {
        return `${series} ${seal}ボールベアリングは高容量ベアリングであり、${precision}精度を持ち、JIS B1518規格に従って製造されている。高いラジアル荷重容量、安定した動作速度を持ち、産業用モーター、精密機械、自動化設備の用途に適用。${seal}設計はベアリングを埃や湿気から保護する。`;
    }

    generateResistorDescription(value, power, tolerance, type) {
        return `Điện trở ${value} công suất ${power} là linh kiện điện tử thụ động cơ bản, được sản xuất bằng công nghệ ${type}, dung sai ${tolerance}. Sản phẩm phù hợp cho các mạch điện tử, mạch điều khiển, và ứng dụng công nghiệp. Điện trở có độ ổn định cao, nhiệt độ làm việc từ -55°C đến 155°C, phù hợp cho môi trường công nghiệp khắc nghiệt.`;
    }

    generateResistorDescriptionEn(value, power, tolerance, type) {
        return `${value} ${power} resistor is a basic passive electronic component, manufactured using ${type} technology, ${tolerance} tolerance. Suitable for electronic circuits, control circuits, and industrial applications. The resistor has high stability, operating temperature from -55°C to 155°C, suitable for harsh industrial environments.`;
    }

    generateResistorDescriptionJa(value, power, tolerance, type) {
        return `${value} ${power}抵抗器は基本的な受動電子部品であり、${type}技術で製造され、${tolerance}許容差を持つ。電子回路、制御回路、産業用途に適用。高い安定性を持ち、-55°Cから155°Cの動作温度で、過酷な産業環境に適している。`;
    }

    generateCapacitorDescription(type, value, voltage) {
        return `Tụ điện ${type} dung lượng ${value} điện áp ${voltage} là linh kiện điện tử chủ động quan trọng, được sử dụng để lưu trữ và giải phóng năng lượng điện. Sản phẩm có ESR thấp, tuổi thọ cao, phù hợp cho các mạch lọc, mạch dao động, và ứng dụng nguồn điện. Hoạt động ổn định trong dải nhiệt độ rộng, phù hợp cho thiết bị công nghiệp.`;
    }

    generateCapacitorDescriptionEn(type, value, voltage) {
        return `${type} capacitor ${value} ${voltage} is an important active electronic component, used to store and release electrical energy. The product has low ESR, high lifetime, suitable for filter circuits, oscillator circuits, and power supply applications. Stable operation in wide temperature range, suitable for industrial equipment.`;
    }

    generateCapacitorDescriptionJa(type, value, voltage) {
        return `${type}コンデンサ ${value} ${voltage}は重要な能動電子部品であり、電気エネルギーの蓄積と放出に使用される。低ESR、高寿命を持ち、フィルター回路、発振回路、電源用途に適用。広い温度範囲で安定動作し、産業設備に適している。`;
    }

    generateBoltSpecs(size, length, grade, coating) {
        return {
            basic: {
                standard: "JIS B1181",
                material: this.getBoltMaterial(grade),
                strength_grade: grade,
                coating: coating,
                thread_type: "Metric Coarse",
                thread_pitch: this.getThreadPitch(size)
            },
            dimensions: {
                diameter: size,
                length: `${length}mm`,
                head_height: this.getHeadHeight(size),
                head_width: this.getHeadWidth(size),
                thread_length: this.getThreadLength(size, length)
            },
            mechanical: {
                tensile_strength: this.getTensileStrength(grade),
                yield_strength: this.getYieldStrength(grade),
                hardness: this.getHardness(grade),
                max_torque: `${this.getBoltMaxTorque(size, grade)} Nm`,
                max_load: `${this.getBoltMaxLoad(size, grade)} kg`
            }
        };
    }

    generateBearingSpecs(series, seal, precision, dimensions) {
        return {
            basic: {
                series: series,
                seal_type: seal,
                precision: precision,
                standard: "JIS B1518",
                bearing_type: "Deep Groove Ball Bearing"
            },
            dimensions: {
                inner_diameter: dimensions.inner,
                outer_diameter: dimensions.outer,
                width: dimensions.width,
                bore_tolerance: "H7",
                outer_tolerance: "h6"
            },
            mechanical: {
                dynamic_load_rating: this.getBearingDynamicLoad(series),
                static_load_rating: this.getBearingStaticLoad(series),
                limiting_speed: this.getBearingSpeed(series),
                operating_temperature: "-30°C to 120°C",
                material: "Chrome Steel GCr15"
            }
        };
    }

    generateResistorSpecs(value, power, tolerance, type) {
        return {
            basic: {
                resistance: value,
                power_rating: power,
                tolerance: tolerance,
                type: type,
                mounting: "Through Hole"
            },
            electrical: {
                max_voltage: "250V",
                temperature_coefficient: "±100ppm/°C",
                operating_temperature: "-55°C to 155°C",
                insulation_resistance: "1000MΩ"
            },
            physical: {
                body_length: this.getResistorLength(power),
                body_diameter: this.getResistorDiameter(power),
                lead_diameter: "0.6mm",
                lead_length: "25mm"
            }
        };
    }

    generateCapacitorSpecs(type, value, voltage) {
        return {
            basic: {
                capacitance: value,
                voltage_rating: voltage,
                type: type,
                tolerance: "±10%",
                mounting: "Through Hole"
            },
            electrical: {
                esr: this.getCapacitorESR(type),
                leakage_current: this.getCapacitorLeakage(type),
                ripple_current: this.getCapacitorRipple(type),
                operating_temperature: "-40°C to 105°C"
            },
            physical: {
                body_length: this.getCapacitorLength(type),
                body_diameter: this.getCapacitorDiameter(type),
                lead_spacing: "5mm",
                lead_diameter: "0.8mm"
            }
        };
    }

    // Additional helper methods
    getThreadPitch(size) {
        const pitches = {"M4": "0.7mm", "M5": "0.8mm", "M6": "1.0mm", "M8": "1.25mm", "M10": "1.5mm", "M12": "1.75mm", "M16": "2.0mm", "M20": "2.5mm"};
        return pitches[size] || "1.0mm";
    }

    getHeadHeight(size) {
        const heights = {"M4": "2.8mm", "M5": "3.5mm", "M6": "4.0mm", "M8": "5.5mm", "M10": "7.0mm", "M12": "8.0mm", "M16": "11.0mm", "M20": "13.0mm"};
        return heights[size] || "4.0mm";
    }

    getHeadWidth(size) {
        const widths = {"M4": "7mm", "M5": "8mm", "M6": "10mm", "M8": "13mm", "M10": "17mm", "M12": "19mm", "M16": "24mm", "M20": "30mm"};
        return widths[size] || "10mm";
    }

    getThreadLength(size, length) {
        const threadLengths = {"M4": Math.min(length - 4, 12), "M5": Math.min(length - 5, 16), "M6": Math.min(length - 6, 20), "M8": Math.min(length - 8, 28), "M10": Math.min(length - 10, 35), "M12": Math.min(length - 12, 40), "M16": Math.min(length - 16, 50), "M20": Math.min(length - 20, 60)};
        return `${threadLengths[size]}mm`;
    }

    getTensileStrength(grade) {
        const strengths = {"4.8": "400 MPa", "8.8": "800 MPa", "10.9": "1040 MPa", "12.9": "1220 MPa"};
        return strengths[grade] || "800 MPa";
    }

    getYieldStrength(grade) {
        const strengths = {"4.8": "320 MPa", "8.8": "640 MPa", "10.9": "940 MPa", "12.9": "1100 MPa"};
        return strengths[grade] || "640 MPa";
    }

    getHardness(grade) {
        const hardnesses = {"4.8": "HRC 14-22", "8.8": "HRC 24-34", "10.9": "HRC 32-39", "12.9": "HRC 38-45"};
        return hardnesses[grade] || "HRC 24-34";
    }

    getBearingDynamicLoad(series) {
        const loads = {
            "6000": "4.6 kN", "6001": "5.3 kN", "6002": "6.8 kN", "6003": "7.2 kN", "6004": "9.4 kN",
            "6200": "5.1 kN", "6201": "6.8 kN", "6202": "7.8 kN", "6203": "9.5 kN", "6204": "12.7 kN"
        };
        return loads[series] || "5.0 kN";
    }

    getBearingStaticLoad(series) {
        const loads = {
            "6000": "2.0 kN", "6001": "2.5 kN", "6002": "3.2 kN", "6003": "3.6 kN", "6004": "5.0 kN",
            "6200": "2.4 kN", "6201": "3.2 kN", "6202": "3.8 kN", "6203": "4.8 kN", "6204": "6.3 kN"
        };
        return loads[series] || "2.5 kN";
    }

    getBearingSpeed(series) {
        const speeds = {
            "6000": "45,000 rpm", "6001": "43,000 rpm", "6002": "38,000 rpm", "6003": "36,000 rpm", "6004": "30,000 rpm",
            "6200": "38,000 rpm", "6201": "36,000 rpm", "6202": "32,000 rpm", "6203": "28,000 rpm", "6204": "24,000 rpm"
        };
        return speeds[series] || "30,000 rpm";
    }

    getResistorLength(power) {
        const lengths = {"1/8W": "3.2mm", "1/4W": "6.5mm", "1/2W": "8.5mm", "1W": "11mm"};
        return lengths[power] || "6.5mm";
    }

    getResistorDiameter(power) {
        const diameters = {"1/8W": "1.8mm", "1/4W": "2.5mm", "1/2W": "3.2mm", "1W": "4.5mm"};
        return diameters[power] || "2.5mm";
    }

    getCapacitorESR(type) {
        const esr = {"Ceramic": "0.01Ω", "Electrolytic": "0.1Ω", "Tantalum": "0.05Ω", "Film": "0.02Ω"};
        return esr[type] || "0.1Ω";
    }

    getCapacitorLeakage(type) {
        const leakage = {"Ceramic": "0.01µA", "Electrolytic": "0.5µA", "Tantalum": "0.1µA", "Film": "0.02µA"};
        return leakage[type] || "0.5µA";
    }

    getCapacitorRipple(type) {
        const ripple = {"Ceramic": "100mA", "Electrolytic": "50mA", "Tantalum": "80mA", "Film": "120mA"};
        return ripple[type] || "50mA";
    }

    getCapacitorLength(type) {
        const lengths = {"Ceramic": "4.5mm", "Electrolytic": "8mm", "Tantalum": "6mm", "Film": "7mm"};
        return lengths[type] || "8mm";
    }

    getCapacitorDiameter(type) {
        const diameters = {"Ceramic": "3mm", "Electrolytic": "5mm", "Tantalum": "4mm", "Film": "4.5mm"};
        return diameters[type] || "5mm";
    }

    getBoltPrice(size, grade) {
        const basePrices = {"M4": 120, "M5": 180, "M6": 250, "M8": 450, "M10": 780, "M12": 1200, "M16": 2800, "M20": 5200};
        const gradeMultipliers = {"4.8": 0.8, "8.8": 1.0, "10.9": 1.3, "12.9": 1.6};
        return Math.round(basePrices[size] * gradeMultipliers[grade]);
    }

    getBearingPrice(series) {
        const prices = {
            "6000": 8500, "6001": 9200, "6002": 10800, "6003": 12500, "6004": 15800,
            "6200": 9800, "6201": 11500, "6202": 13200, "6203": 16800, "6204": 22500
        };
        return prices[series] || 10000;
    }

    getResistorPrice(value, power) {
        const basePrice = power === "1/8W" ? 150 : power === "1/4W" ? 220 : power === "1/2W" ? 380 : 650;
        return basePrice;
    }

    getCapacitorPrice(type, value) {
        const basePrices = {"Ceramic": 280, "Electrolytic": 450, "Tantalum": 680, "Film": 520};
        return basePrices[type] || 450;
    }

    getBoltWeight(size) {
        const weights = {"M4": 1.2, "M5": 2.5, "M6": 4.5, "M8": 8.2, "M10": 15.8, "M12": 28.5, "M16": 65.2, "M20": 125.8};
        return weights[size] || 4.5;
    }

    getBearingWeight(series) {
        const weights = {
            "6000": 19, "6001": 22, "6002": 32, "6003": 36, "6004": 55,
            "6200": 26, "6201": 32, "6202": 42, "6203": 63, "6204": 85
        };
        return weights[series] || 30;
    }

    getResistorWeight() {
        return 0.5;
    }

    getCapacitorWeight(type) {
        const weights = {"Ceramic": 0.3, "Electrolytic": 0.8, "Tantalum": 0.5, "Film": 0.6};
        return weights[type] || 0.8;
    }

    generatePricing(basePrice) {
        const moq = this.getMOQ(basePrice);
        return {
            base_price: basePrice,
            currency: "VND",
            unit: "cái",
            tiers: [
                {quantity: moq, price: basePrice, discount: 0},
                {quantity: moq * 5, price: Math.round(basePrice * 0.95), discount: 5},
                {quantity: moq * 20, price: Math.round(basePrice * 0.88), discount: 12},
                {quantity: moq * 100, price: Math.round(basePrice * 0.82), discount: 18}
            ],
            moq: moq,
            lead_time: 14
        };
    }

    getMOQ(price) {
        if (price < 50) return 1000;
        if (price < 100) return 500;
        if (price < 200) return 100;
        return 50;
    }

    generateInventory() {
        return {
            total_stock: Math.floor(Math.random() * 50000) + 10000,
            available_stock: Math.floor(Math.random() * 45000) + 5000,
            reserved_stock: Math.floor(Math.random() * 5000),
            warehouse_locations: ["WH-A-01", "WH-B-02", "WH-C-03"],
            reorder_level: 1000,
            max_stock: 50000,
            last_updated: "2026-04-06T10:56:00Z"
        };
    }

    generateImages(productId) {
        return {
            main: `https://example.com/images/products/${productId}-main.jpg`,
            thumbnails: [
                `https://example.com/images/products/${productId}-thumb-1.jpg`,
                `https://example.com/images/products/${productId}-thumb-2.jpg`,
                `https://example.com/images/products/${productId}-thumb-3.jpg`
            ],
            technical: [
                `https://example.com/images/products/${productId}-dimension.jpg`,
                `https://example.com/images/products/${productId}-application.jpg`
            ],
            alt_texts: {
                main: "Sản phẩm chi tiết",
                thumb1: "Chi tiết sản phẩm 1",
                thumb2: "Chi tiết sản phẩm 2", 
                thumb3: "Chi tiết sản phẩm 3"
            }
        };
    }

    generateDocuments(productId) {
        return {
            datasheet: `https://example.com/docs/${productId}-datasheet.pdf`,
            technical_spec: `https://example.com/docs/${productId}-spec.pdf`,
            installation_guide: `https://example.com/docs/${productId}-install.pdf`,
            safety_data: `https://example.com/docs/${productId}-safety.pdf`,
            certificate: `https://example.com/docs/${productId}-cert.pdf`
        };
    }

    generateBoltApplications(grade) {
        const baseApplications = [
            "Kết cấu cơ khí công nghiệp",
            "Máy móc sản xuất",
            "Thiết bị tự động hóa",
            "Động cơ công nghiệp",
            "Hệ thống truyền động"
        ];
        
        if (grade === "10.9" || grade === "12.9") {
            baseApplications.push("Thiết bị chịu tải nặng", "Cấu trúc thép", "Cầu đường");
        }
        
        return baseApplications;
    }

    generateBearingApplications() {
        return [
            "Động cơ công nghiệp",
            "Máy móc chính xác",
            "Thiết bị tự động hóa",
            "Máy bơm công nghiệp",
            "Hộp số công nghiệp",
            "Thiết bị y tế",
            "Máy công cụ"
        ];
    }

    generateResistorApplications(type) {
        return [
            "Mạch điện tử công nghiệp",
            "Mạch điều khiển tự động",
            "Bo mạch điện tử",
            "Thiết bị đo lường",
            "Mạch nguồn"
        ];
    }

    generateCapacitorApplications(type) {
        const applications = {
            "Ceramic": ["Mạch lọc tần số cao", "Mạch ghép", "Mạch dao động"],
            "Electrolytic": ["Mạch lọc nguồn", "Mạch lưu trữ năng lượng", "Mạch thời gian"],
            "Tantalum": ["Mạch compact", "Thiết bị di động", "Mạch chính xác cao"],
            "Film": ["Mạch âm thanh", "Mạch tần số thấp", "Mạch độ tin cậy cao"]
        };
        return applications[type] || ["Mạch điện tử cơ bản"];
    }

    generateBoltCompatibility(size) {
        return {
            compatible_nuts: [`Đai ốc ${size}`, `Lock nut ${size}`, `Flange nut ${size}`],
            compatible_washers: [`Đệm ${size}`, `Spring washer ${size}`, `Flat washer ${size}`],
            compatible_tools: [`Cờ lê ${size}`, `Tua vít ${size}`, `Máy bắt vít ${size}`],
            thread_standard: "Metric ISO"
        };
    }

    generateBearingCompatibility(series) {
        return {
            compatible_shafts: [`Trục ${this.getBearingDimensions(series).inner}`],
            compatible_housings: [`Vỏ lỗ ${this.getBearingDimensions(series).outer}`],
            mounting_methods: ["Press fit", "Adapter sleeve", "Tapered bore"],
            lubrication: ["Grease", "Oil"],
            seals_available: ["2RS", "2RZ", "Open"]
        };
    }

    generateResistorCompatibility(value) {
        return {
            compatible_circuits: ["Mạch điện tử", "Mạch analog", "Mạch số"],
            voltage_range: "0-250V",
            mounting_types: ["Through Hole", "Surface Mount"],
            operating_conditions: "Industrial, Commercial"
        };
    }

    generateCapacitorCompatibility(type, value) {
        return {
            compatible_circuits: ["Mạch lọc", "Mạch dao động", "Mạch thời gian"],
            voltage_range: type === "Electrolytic" ? "Polarized" : "Non-polarized",
            mounting_types: ["Through Hole", "Surface Mount"],
            series_parallel: "Both supported"
        };
    }

    generateQuality() {
        return {
            certification: ["ISO 9001:2015", "IATF 16949"],
            inspection_level: "AQL 0.65",
            test_methods: ["Dimensional inspection", "Performance test", "Quality control"],
            defect_rate: "0.1%",
            warranty_period: 24,
            quality_grade: "A+"
        };
    }

    generateLogistics(weight) {
        return {
            weight: `${weight}g`,
            package_type: "Carton box",
            package_quantity: 1000,
            dimensions: {
                length: "200mm",
                width: "150mm", 
                height: "100mm"
            },
            shipping_class: "Standard",
            hazardous: false,
            storage_conditions: "Dry, room temperature",
            shelf_life: "Unlimited"
        };
    }

    generateBoltTags(size, grade, coating) {
        return [
            `bu-long-${size}`,
            `hex-bolt`,
            `grade-${grade}`,
            coating.toLowerCase().replace(/\s+/g, '-'),
            "jis-b1181",
            "industrial-fastener",
            "mechanical-fastener"
        ];
    }

    generateBearingTags(series, seal) {
        return [
            `vong-bi-${series}`,
            `ball-bearing-${series}`,
            seal.toLowerCase(),
            "mechanical-bearing",
            "industrial-bearing"
        ];
    }

    generateResistorTags(value, type) {
        return [
            `dien-tro-${value}`,
            `resistor-${value}`,
            type.toLowerCase().replace(/\s+/g, '-'),
            "passive-component",
            "electronic-component"
        ];
    }

    generateCapacitorTags(type, value) {
        return [
            `tu-dien-${type.toLowerCase()}`,
            `capacitor-${type.toLowerCase()}`,
            `capacitance-${value}`,
            "active-component",
            "electronic-component"
        ];
    }

    // Export to JSON
    exportToJSON() {
        const allProducts = this.generateAllProducts();
        
        return {
            metadata: {
                version: "2.0",
                generated_date: "2026-04-06T10:56:00Z",
                total_products: allProducts.length,
                generation_method: "Automated generation with realistic industrial data",
                data_completeness: "100%",
                description: "Complete database with all products fully detailed"
            },
            products: allProducts
        };
    }
}

// Usage example:
const generator = new ProductGenerator();
const completeDatabase = generator.exportToJSON();

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductGenerator;
}

// For browser usage
if (typeof window !== 'undefined') {
    window.ProductGenerator = ProductGenerator;
}
