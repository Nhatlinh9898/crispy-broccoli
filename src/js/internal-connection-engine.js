/**
 * Internal Connection Engine
 * Xây dựng kết nối chính xác chỉ sử dụng data nội bộ
 */

class InternalConnectionEngine {
    constructor() {
        this.productDatabase = null;
        this.connectionRules = new Map();
        this.compatibilityMatrix = new Map();
        this.industryKnowledge = this.buildIndustryKnowledge();
        this.materialDatabase = this.buildMaterialDatabase();
        this.applicationMapping = this.buildApplicationMapping();
        
        // Public data sources
        this.publicStandards = new Map();
        this.industryPatterns = new Map();
        this.materialCompatibility = new Map();
        this.applicationStandards = new Map();
    }

    /**
     * Khởi tạo với database có sẵn
     */
    async initialize(productDatabase) {
        this.productDatabase = productDatabase;
        this.buildInternalRules();
        this.buildCompatibilityMatrix();
        console.log('✅ Internal Connection Engine initialized');
    }

    /**
     * Xây dựng kiến thức ngành từ data có sẵn
     */
    buildIndustryKnowledge() {
        return {
            // Mechanical relationships
            mechanical: {
                fasteners: {
                    typical_components: ['washers', 'nuts', 'thread_lockers'],
                    materials: ['steel', 'stainless_steel', 'brass'],
                    applications: ['automotive', 'machinery', 'construction']
                },
                bearings: {
                    typical_components: ['bearing_housings', 'seals', 'lubricants'],
                    materials: ['chrome_steel', 'ceramic', 'stainless_steel'],
                    applications: ['motors', 'gearboxes', 'pumps']
                }
            },
            // Electronic relationships
            electronic: {
                passive: {
                    typical_components: ['pcb', 'connectors', 'heat_sinks'],
                    materials: ['copper', 'aluminum', 'ceramic'],
                    applications: ['circuits', 'power_supplies', 'sensors']
                }
            }
        };
    }

    /**
     * Xây dựng database vật liệu
     */
    buildMaterialDatabase() {
        return {
            steel: {
                properties: ['high_strength', 'magnetic', 'corrosion_resistant'],
                compatible_with: ['stainless_steel', 'brass', 'aluminum'],
                typical_use: ['fasteners', 'bearings', 'structural']
            },
            stainless_steel: {
                properties: ['corrosion_resistant', 'food_grade', 'high_strength'],
                compatible_with: ['steel', 'brass', 'plastic'],
                typical_use: ['fasteners', 'medical', 'food_industry']
            },
            brass: {
                properties: ['corrosion_resistant', 'conductive', 'decorative'],
                compatible_with: ['steel', 'stainless_steel', 'copper'],
                typical_use: ['fasteners', 'connectors', 'decorative']
            },
            copper: {
                properties: ['conductive', 'thermal_conductive', 'malleable'],
                compatible_with: ['brass', 'aluminum', 'silver'],
                typical_use: ['electronics', 'wiring', 'heat_sinks']
            },
            aluminum: {
                properties: ['lightweight', 'corrosion_resistant', 'conductive'],
                compatible_with: ['steel', 'copper', 'plastic'],
                typical_use: ['enclosures', 'heat_sinks', 'structural']
            },
            ceramic: {
                properties: ['insulating', 'heat_resistant', 'hard'],
                compatible_with: ['metal', 'glass', 'plastic'],
                typical_use: ['insulators', 'bearings', 'electronics']
            },
            plastic: {
                properties: ['lightweight', 'insulating', 'corrosion_resistant'],
                compatible_with: ['metal', 'rubber', 'glass'],
                typical_use: ['enclosures', 'insulators', 'seals']
            }
        };
    }

    /**
     * Xây dựng mapping ứng dụng
     */
    buildApplicationMapping() {
        return {
            automotive: {
                requirements: ['high_strength', 'vibration_resistant', 'temperature_resistant'],
                typical_components: ['fasteners', 'bearings', 'seals', 'sensors'],
                quality_standards: ['IATF_16949', 'ISO_9001']
            },
            machinery: {
                requirements: ['durability', 'precision', 'load_capacity'],
                typical_components: ['bearings', 'fasteners', 'gears', 'motors'],
                quality_standards: ['ISO_9001', 'CE']
            },
            electronics: {
                requirements: ['precision', 'insulation', 'thermal_management'],
                typical_components: ['resistors', 'capacitors', 'connectors', 'pcb'],
                quality_standards: ['RoHS', 'CE', 'UL']
            },
            construction: {
                requirements: ['weather_resistant', 'load_bearing', 'corrosion_resistant'],
                typical_components: ['fasteners', 'anchors', 'structural'],
                quality_standards: ['ASTM', 'ISO_9001']
            }
        };
    }

    /**
     * Xây dựng quy tắc nội bộ từ data có sẵn
     */
    buildInternalRules() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const rules = this.extractRulesFromProduct(product);
            this.connectionRules.set(product.id, rules);
        });

        console.log(`✅ Built ${this.connectionRules.size} internal rules`);
    }

    /**
     * Trích xuất quy tắc từ sản phẩm
     */
    extractRulesFromProduct(product) {
        const rules = {
            category: product.category_id,
            applications: product.applications || [],
            materials: this.extractMaterials(product),
            specifications: this.extractKeySpecifications(product),
            relationships: []
        };

        // Phân tích tên để tìm relationships
        const nameAnalysis = this.analyzeProductName(product.name);
        rules.relationships = nameAnalysis.relationships;

        return rules;
    }

    /**
     * Trích xuất vật liệu từ specifications
     */
    extractMaterials(product) {
        const materials = [];
        
        if (product.specifications) {
            // Tìm material trong specifications
            Object.keys(product.specifications).forEach(key => {
                const value = product.specifications[key];
                if (typeof value === 'string') {
                    const materialMatches = value.match(/(steel|stainless|brass|copper|aluminum|ceramic|plastic|rubber)/gi);
                    if (materialMatches) {
                        materials.push(...materialMatches.map(m => m.toLowerCase()));
                    }
                }
            });
        }

        // Phân tích từ tên sản phẩm
        const nameMaterials = this.analyzeProductNameForMaterials(product.name);
        materials.push(...nameMaterials);

        return [...new Set(materials)];
    }

    /**
     * Phân tích tên sản phẩm để tìm vật liệu
     */
    analyzeProductNameForMaterials(name) {
        const materials = [];
        const materialKeywords = {
            'steel': ['steel', 'thép'],
            'stainless_steel': ['stainless', 'inox'],
            'brass': ['brass', 'đồng'],
            'copper': ['copper', 'đồng đỏ'],
            'aluminum': ['aluminum', 'nhôm'],
            'ceramic': ['ceramic', 'gốm'],
            'plastic': ['plastic', 'nhựa'],
            'rubber': ['rubber', 'cao su']
        };

        Object.keys(materialKeywords).forEach(material => {
            materialKeywords[material].forEach(keyword => {
                if (name.toLowerCase().includes(keyword.toLowerCase())) {
                    materials.push(material);
                }
            });
        });

        return materials;
    }

    /**
     * Phân tích tên sản phẩm
     */
    analyzeProductName(name) {
        const relationships = [];
        
        // Component relationships
        if (name.includes('Bolt') || name.includes('Bu lông')) {
            relationships.push('requires_nut', 'requires_washer');
        }
        if (name.includes('Nut') || name.includes('Đai ốc')) {
            relationships.push('used_with_bolt');
        }
        if (name.includes('Bearing') || name.includes('Vòng bi')) {
            relationships.push('requires_housing', 'requires_lubrication');
        }
        if (name.includes('Resistor') || name.includes('Điện trở')) {
            relationships.push('used_in_circuit', 'requires_soldering');
        }
        if (name.includes('Capacitor') || name.includes('Tụ điện')) {
            relationships.push('used_in_circuit', 'requires_voltage_rating');
        }

        return { relationships };
    }

    /**
     * Trích xuất specifications chính
     */
    extractKeySpecifications(product) {
        const keySpecs = {};
        
        if (product.specifications) {
            // Lấy các specs quan trọng
            const importantSpecs = ['size', 'material', 'rating', 'voltage', 'current', 'power'];
            
            importantSpecs.forEach(spec => {
                if (product.specifications[spec]) {
                    keySpecs[spec] = product.specifications[spec];
                }
            });

            // Tìm trong nested specs
            Object.keys(product.specifications).forEach(key => {
                const value = product.specifications[key];
                if (typeof value === 'object') {
                    Object.keys(value).forEach(subKey => {
                        if (importantSpecs.includes(subKey)) {
                            keySpecs[subKey] = value[subKey];
                        }
                    });
                }
            });
        }

        return keySpecs;
    }

    /**
     * Xây dựng matrix tương thích từ public data
     */
    buildCompatibilityMatrix() {
        const products = this.productDatabase.products;
        
        // Sử dụng public standards và industry knowledge
        this.loadPublicStandards();
        this.loadIndustryPatterns();
        
        products.forEach(product => {
            const compatibilities = this.calculateCompatibilities(product);
            this.compatibilityMatrix.set(product.id, compatibilities);
        });

        console.log(`✅ Built compatibility matrix for ${this.compatibilityMatrix.size} products`);
        console.log(`📊 Using ${this.publicStandards.size} public standards`);
        console.log(`🔗 Applied ${this.industryPatterns.size} industry patterns`);
    }

    /**
     * Tính độ tương thích
     */
    calculateCompatibilities(product) {
        const compatibilities = new Map();
        const products = this.productDatabase.products;
        
        products.forEach(otherProduct => {
            if (product.id === otherProduct.id) return;
            
            const compatibility = this.calculateProductCompatibility(product, otherProduct);
            if (compatibility.score > 0.3) {
                compatibilities.set(otherProduct.id, compatibility);
            }
        });

        return compatibilities;
    }

    /**
     * Tính độ tương thích giữa 2 sản phẩm
     */
    calculateProductCompatibility(product1, product2) {
        let score = 0;
        let reasons = [];

        // Category compatibility
        if (this.areCategoriesCompatible(product1.category_id, product2.category_id)) {
            score += 0.3;
            reasons.push('category_compatible');
        }

        // Material compatibility
        const materialCompatibility = this.calculateMaterialCompatibility(product1, product2);
        if (materialCompatibility.score > 0) {
            score += materialCompatibility.score * 0.4;
            reasons.push(...materialCompatibility.reasons);
        }

        // Application compatibility
        const appCompatibility = this.calculateApplicationCompatibility(product1, product2);
        if (appCompatibility.score > 0) {
            score += appCompatibility.score * 0.3;
            reasons.push(...appCompatibility.reasons);
        }

        return { score, reasons };
    }

    /**
     * Kiểm tra category tương thích
     */
    areCategoriesCompatible(cat1, cat2) {
        // Mechanical components thường tương thích với nhau
        const mechanicalCategories = ['cat_mechanical_fasteners', 'cat_mechanical_bearings'];
        if (mechanicalCategories.includes(cat1) && mechanicalCategories.includes(cat2)) {
            return true;
        }

        // Electronic components thường tương thích với nhau
        const electronicCategories = ['cat_electronic_passive', 'cat_electronic_active'];
        if (electronicCategories.includes(cat1) && electronicCategories.includes(cat2)) {
            return true;
        }

        return false;
    }

    /**
     * Tính tương thích vật liệu
     */
    calculateMaterialCompatibility(product1, product2) {
        const materials1 = this.extractMaterials(product1);
        const materials2 = this.extractMaterials(product2);
        
        let score = 0;
        const reasons = [];

        materials1.forEach(material1 => {
            materials2.forEach(material2 => {
                const materialInfo = this.materialDatabase[material1];
                if (materialInfo && materialInfo.compatible_with.includes(material2)) {
                    score += 0.5;
                    reasons.push(`material_compatible_${material1}_${material2}`);
                }
            });
        });

        return { score: Math.min(score, 1), reasons };
    }

    /**
     * Tính tương thích ứng dụng
     */
    calculateApplicationCompatibility(product1, product2) {
        const apps1 = product1.applications || [];
        const apps2 = product2.applications || [];
        
        const commonApps = apps1.filter(app => apps2.includes(app));
        
        if (commonApps.length > 0) {
            return {
                score: commonApps.length / Math.max(apps1.length, apps2.length),
                reasons: commonApps.map(app => `common_application_${app}`)
            };
        }

        return { score: 0, reasons: [] };
    }

    /**
     * Tìm components cho sản phẩm
     */
    findComponents(productId) {
        const product = this.productDatabase.products.find(p => p.id === productId);
        if (!product) return { error: 'Product not found' };

        const components = [];
        const compatibilities = this.compatibilityMatrix.get(productId);

        if (compatibilities) {
            compatibilities.forEach((compatibility, candidateId) => {
                const candidate = this.productDatabase.products.find(p => p.id === candidateId);
                if (candidate && this.isLikelyComponent(product, candidate, compatibility)) {
                    components.push({
                        product: candidate,
                        confidence: compatibility.score,
                        reasons: compatibility.reasons
                    });
                }
            });
        }

        return {
            product: product,
            components: components.sort((a, b) => b.confidence - a.confidence),
            totalFound: components.length
        };
    }

    /**
     * Kiểm tra có phải là component không
     */
    isLikelyComponent(product, candidate, compatibility) {
        // Component thường có category khác
        if (product.category_id === candidate.category_id) return false;

        // Component thường đơn giản hơn
        const productComplexity = this.calculateComplexity(product);
        const candidateComplexity = this.calculateComplexity(candidate);

        return candidateComplexity < productComplexity && compatibility.score > 0.4;
    }

    /**
     * Tính độ phức tạp
     */
    calculateComplexity(product) {
        let complexity = 0;
        
        // Số specifications
        if (product.specifications) {
            complexity += Object.keys(product.specifications).length;
        }

        // Số applications
        if (product.applications) {
            complexity += product.applications.length;
        }

        // Độ dài mô tả
        complexity += (product.long_description || '').length / 100;

        return complexity;
    }

    /**
     * Tìm sản phẩm từ component
     */
    findProductsFromComponent(componentId) {
        const component = this.productDatabase.products.find(p => p.id === componentId);
        if (!component) return { error: 'Component not found' };

        const products = [];
        
        this.productDatabase.products.forEach(product => {
            if (product.id === componentId) return;

            const compatibilities = this.compatibilityMatrix.get(product.id);
            if (compatibilities && compatibilities.has(componentId)) {
                const compatibility = compatibilities.get(componentId);
                if (this.isLikelyProduct(component, product, compatibility)) {
                    products.push({
                        product: product,
                        confidence: compatibility.score,
                        reasons: compatibility.reasons
                    });
                }
            }
        });

        return {
            component: component,
            products: products.sort((a, b) => b.confidence - a.confidence),
            totalFound: products.length
        };
    }

    /**
     * Kiểm tra có phải là sản phẩm không
     */
    isLikelyProduct(component, product, compatibility) {
        // Sản phẩm thường phức tạp hơn
        const componentComplexity = this.calculateComplexity(component);
        const productComplexity = this.calculateComplexity(product);

        return productComplexity > componentComplexity && compatibility.score > 0.4;
    }

    /**
     * Lấy thông tin hệ thống
     */
    getSystemInfo() {
        return {
            totalProducts: this.productDatabase?.products.length || 0,
            connectionRules: this.connectionRules.size,
            compatibilityMatrix: this.compatibilityMatrix.size,
            industryKnowledge: Object.keys(this.industryKnowledge).length,
            materialDatabase: Object.keys(this.materialDatabase).length,
            publicStandards: this.publicStandards.size,
            industryPatterns: this.industryPatterns.size,
            materialCompatibility: this.materialCompatibility.size
        };
    }

    /**
     * Load public standards (ISO, ASTM, IEC, etc.)
     */
    loadPublicStandards() {
        // ISO Standards
        this.publicStandards.set('ISO_9001', {
            type: 'quality_management',
            applies_to: ['all_categories'],
            requirements: ['documentation', 'process_control', 'quality_assurance'],
            compatibility_boost: 0.1
        });

        this.publicStandards.set('ISO_4287', {
            type: 'surface_texture',
            applies_to: ['mechanical'],
            requirements: ['surface_roughness', 'measurement_method'],
            compatibility_boost: 0.15
        });

        this.publicStandards.set('ISO_2768', {
            type: 'general_tolerances',
            applies_to: ['mechanical'],
            requirements: ['linear_tolerance', 'angular_tolerance'],
            compatibility_boost: 0.1
        });

        // ASTM Standards
        this.publicStandards.set('ASTM_A193', {
            type: 'bolting_materials',
            applies_to: ['fasteners'],
            requirements: ['high_temperature', 'chemical_composition'],
            compatibility_boost: 0.2
        });

        this.publicStandards.set('ASTM_B117', {
            type: 'salt_spray_testing',
            applies_to: ['coated_parts'],
            requirements: ['corrosion_resistance', 'testing_duration'],
            compatibility_boost: 0.15
        });

        // IEC Standards
        this.publicStandards.set('IEC_60062', {
            type: 'resistor_color_code',
            applies_to: ['electronic_passive'],
            requirements: ['color_bands', 'tolerance_marking'],
            compatibility_boost: 0.1
        });

        // JIS Standards (Japanese Industrial Standards)
        this.publicStandards.set('JIS_B0202', {
            type: 'metric_threads',
            applies_to: ['fasteners'],
            requirements: ['thread_pitch', 'tolerance_class'],
            compatibility_boost: 0.2
        });

        // DIN Standards (German)
        this.publicStandards.set('DIN_934', {
            type: 'hex_nuts',
            applies_to: ['fasteners'],
            requirements: ['dimensions', 'thread_specification'],
            compatibility_boost: 0.15
        });
    }

    /**
     * Load industry patterns from public knowledge
     */
    loadIndustryPatterns() {
        // Automotive industry patterns
        this.industryPatterns.set('automotive_fastening', {
            pattern: 'bolt_nut_washer_assembly',
            components: ['bolt', 'nut', 'washer', 'lock_washer'],
            materials: ['steel_zinc_plated', 'stainless_steel'],
            standards: ['ISO_898', 'ASTM_A193'],
            confidence_boost: 0.25
        });

        this.industryPatterns.set('automotive_bearing', {
            pattern: 'bearing_housing_seal',
            components: ['bearing', 'housing', 'seal', 'lubricant'],
            materials: ['chrome_steel', 'rubber', 'steel'],
            standards: ['ISO_281', 'DIN_616'],
            confidence_boost: 0.3
        });

        // Electronics industry patterns
        this.industryPatterns.set('pcb_assembly', {
            pattern: 'component_soldering',
            components: ['resistor', 'capacitor', 'pcb', 'solder'],
            materials: ['copper', 'solder_alloy', 'fiberglass'],
            standards: ['IEC_60068', 'IPC_A610'],
            confidence_boost: 0.2
        });

        // Machinery industry patterns
        this.industryPatterns.set('power_transmission', {
            pattern: 'bearing_shaft_coupling',
            components: ['bearing', 'shaft', 'coupling', 'seal'],
            materials: ['steel', 'cast_iron', 'rubber'],
            standards: ['ISO_281', 'DIN_748'],
            confidence_boost: 0.25
        });

        // Construction industry patterns
        this.industryPatterns.set('structural_fastening', {
            pattern: 'anchor_bolt_washer',
            components: ['anchor_bolt', 'washer', 'nut', 'grout'],
            materials: ['steel_galvanized', 'concrete'],
            standards: ['ASTM_A193', 'ASTM_F1554'],
            confidence_boost: 0.2
        });
    }

    /**
     * Load material compatibility from public data
     */
    loadMaterialCompatibility() {
        // Galvanic corrosion data (public electrochemical series)
        this.materialCompatibility.set('steel_brass', {
            compatibility: 'good',
            galvanic_potential: 0.15,
            risk_level: 'low',
            applications: ['fasteners', 'plumbing']
        });

        this.materialCompatibility.set('steel_copper', {
            compatibility: 'fair',
            galvanic_potential: 0.35,
            risk_level: 'moderate',
            applications: ['electrical', 'roofing']
        });

        this.materialCompatibility.set('stainless_steel_aluminum', {
            compatibility: 'poor',
            galvanic_potential: 0.65,
            risk_level: 'high',
            applications: ['avoid_direct_contact']
        });

        this.materialCompatibility.set('brass_copper', {
            compatibility: 'excellent',
            galvanic_potential: 0.05,
            risk_level: 'very_low',
            applications: ['plumbing', 'electrical']
        });

        // Thermal expansion compatibility
        this.materialCompatibility.set('steel_aluminum', {
            thermal_expansion_diff: 0.000012,
            compatibility: 'good',
            applications: ['heat_exchangers', 'automotive']
        });
    }

    /**
     * Apply public standards to compatibility calculation
     */
    applyPublicStandards(product1, product2, currentScore) {
        let boostedScore = currentScore;
        const appliedStandards = [];

        // Check if both products follow same standard
        this.publicStandards.forEach((standard, standardId) => {
            if (this.productsFollowStandard(product1, standardId) && 
                this.productsFollowStandard(product2, standardId)) {
                boostedScore += standard.compatibility_boost;
                appliedStandards.push(standardId);
            }
        });

        return { score: Math.min(boostedScore, 1.0), appliedStandards };
    }

    /**
     * Check if product follows specific standard
     */
    productsFollowStandard(product, standardId) {
        const standard = this.publicStandards.get(standardId);
        if (!standard) return false;

        // Check category applicability
        if (!standard.applies_to.includes('all_categories') && 
            !standard.applies_to.includes(product.category_id)) {
            return false;
        }

        // Check specifications for standard compliance
        if (product.specifications) {
            return this.checkSpecificationCompliance(product.specifications, standard);
        }

        return false;
    }

    /**
     * Check specification compliance with standard
     */
    checkSpecificationCompliance(specs, standard) {
        let compliantCount = 0;
        let totalRequirements = standard.requirements.length;

        standard.requirements.forEach(requirement => {
            if (this.specificationContainsRequirement(specs, requirement)) {
                compliantCount++;
            }
        });

        return compliantCount / totalRequirements >= 0.6; // 60% compliance threshold
    }

    /**
     * Check if specification contains requirement
     */
    specificationContainsRequirement(specs, requirement) {
        const specText = JSON.stringify(specs).toLowerCase();
        const reqText = requirement.toLowerCase();
        
        return specText.includes(reqText);
    }

    /**
     * Apply industry patterns to boost confidence
     */
    applyIndustryPatterns(product1, product2, currentScore) {
        let boostedScore = currentScore;
        const appliedPatterns = [];

        this.industryPatterns.forEach((pattern, patternId) => {
            if (this.productsMatchPattern(product1, product2, pattern)) {
                boostedScore += pattern.confidence_boost;
                appliedPatterns.push(patternId);
            }
        });

        return { score: Math.min(boostedScore, 1.0), appliedPatterns };
    }

    /**
     * Check if products match industry pattern
     */
    productsMatchPattern(product1, product2, pattern) {
        const products = [product1, product2];
        const patternComponents = pattern.components;

        // Check if both products are in pattern components
        const productCategories = products.map(p => this.getProductCategoryName(p));
        const matches = productCategories.filter(cat => 
            patternComponents.some(comp => cat.includes(comp))
        );

        return matches.length >= 2;
    }

    /**
     * Get product category name from product
     */
    getProductCategoryName(product) {
        const name = product.name.toLowerCase();
        
        if (name.includes('bolt') || name.includes('bu lông')) return 'bolt';
        if (name.includes('nut') || name.includes('đai ốc')) return 'nut';
        if (name.includes('washer') || name.includes('vòng đệm')) return 'washer';
        if (name.includes('bearing') || name.includes('vòng bi')) return 'bearing';
        if (name.includes('resistor') || name.includes('điện trở')) return 'resistor';
        if (name.includes('capacitor') || name.includes('tụ')) return 'capacitor';
        
        return product.category_id;
    }

    /**
     * Enhanced compatibility calculation with public data
     */
    calculateProductCompatibility(product1, product2) {
        let score = 0;
        let reasons = [];
        let appliedStandards = [];
        let appliedPatterns = [];

        // Basic compatibility
        if (this.areCategoriesCompatible(product1.category_id, product2.category_id)) {
            score += 0.3;
            reasons.push('category_compatible');
        }

        // Material compatibility
        const materialCompatibility = this.calculateMaterialCompatibility(product1, product2);
        if (materialCompatibility.score > 0) {
            score += materialCompatibility.score * 0.4;
            reasons.push(...materialCompatibility.reasons);
        }

        // Application compatibility
        const appCompatibility = this.calculateApplicationCompatibility(product1, product2);
        if (appCompatibility.score > 0) {
            score += appCompatibility.score * 0.3;
            reasons.push(...appCompatibility.reasons);
        }

        // Apply public standards
        const standardsResult = this.applyPublicStandards(product1, product2, score);
        score = standardsResult.score;
        appliedStandards = standardsResult.appliedStandards;
        reasons.push(...appliedStandards.map(s => `standard_${s}`));

        // Apply industry patterns
        const patternsResult = this.applyIndustryPatterns(product1, product2, score);
        score = patternsResult.score;
        appliedPatterns = patternsResult.appliedPatterns;
        reasons.push(...appliedPatterns.map(p => `pattern_${p}`));

        return { 
            score, 
            reasons,
            appliedStandards,
            appliedPatterns
        };
    }
}

// Export để sử dụng
window.InternalConnectionEngine = InternalConnectionEngine;
