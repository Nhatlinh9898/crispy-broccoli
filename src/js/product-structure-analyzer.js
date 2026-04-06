/**
 * Product Structure Analysis System
 * Hệ thống Phân tích Cấu trúc Sản phẩm Chi tiết
 * 
 * Xác định chính xác thành phần cấu tạo của sản phẩm A
 */

class ProductStructureAnalyzer {
    constructor() {
        this.structureDatabase = new Map();
        this.componentHierarchy = new Map();
        this.manufacturingRules = new Map();
        this.materialDatabase = new Map();
        this.assemblyInstructions = new Map();
        this.qualityStandards = new Map();
    }

    /**
     * Khởi tạo hệ thống phân tích cấu trúc
     */
    async initialize(productDatabase) {
        this.productDatabase = productDatabase;
        await this.buildStructureDatabase();
        await this.loadManufacturingRules();
        await this.loadMaterialDatabase();
        await this.loadQualityStandards();
        
        console.log('✅ Product Structure Analyzer đã khởi tạo');
    }

    /**
     * Xây dựng database cấu trúc sản phẩm
     */
    async buildStructureDatabase() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const structure = this.analyzeProductStructure(product);
            this.structureDatabase.set(product.id, structure);
        });

        console.log(`📊 Đã phân tích cấu trúc cho ${this.structureDatabase.size} sản phẩm`);
    }

    /**
     * Phân tích cấu trúc chi tiết của sản phẩm
     */
    analyzeProductStructure(product) {
        const structure = {
            productId: product.id,
            productName: product.name,
            category: product.category_id,
            subcategory: product.subcategory,
            
            // Phân tích thành phần chính
            primaryComponents: this.identifyPrimaryComponents(product),
            
            // Phân tích vật liệu
            materials: this.identifyMaterials(product),
            
            // Phân tích quy trình sản xuất
            manufacturingProcess: this.identifyManufacturingProcess(product),
            
            // Phân tích tiêu chuẩn chất lượng
            qualityStandards: this.identifyQualityStandards(product),
            
            // Phân tích cấu trúc lắp ráp
            assemblyStructure: this.identifyAssemblyStructure(product),
            
            // Phân tích dependencies
            dependencies: this.identifyDependencies(product),
            
            // Confidence score cho phân tích
            analysisConfidence: 0.0,
            
            // Nguồn dữ liệu phân tích
            dataSource: this.identifyDataSource(product)
        };

        // Tính confidence score
        structure.analysisConfidence = this.calculateAnalysisConfidence(structure);
        
        return structure;
    }

    /**
     * Xác định thành phần chính của sản phẩm
     */
    identifyPrimaryComponents(product) {
        const components = [];
        const category = product.category_id;
        const specifications = product.specifications || {};
        
        // Phân tích dựa trên category
        const categoryComponents = this.getCategoryComponents(category);
        
        // Phân tích dựa trên specifications
        const specComponents = this.getSpecificationComponents(specifications);
        
        // Phân tích dựa trên tên sản phẩm
        const nameComponents = this.getNameComponents(product.name, product.name_en);
        
        // Merge và deduplicate
        const allComponents = [...categoryComponents, ...specComponents, ...nameComponents];
        const uniqueComponents = this.deduplicateComponents(allComponents);
        
        // Sort by importance
        uniqueComponents.sort((a, b) => b.importance - a.importance);
        
        return uniqueComponents;
    }

    /**
     * Lấy components theo category
     */
    getCategoryComponents(category) {
        const componentMap = {
            'cat_mechanical_fasteners': [
                { name: 'Thân bu lông', material: 'Steel', importance: 0.9, confidence: 0.95 },
                { name: 'Ren bu lông', material: 'Steel', importance: 0.8, confidence: 0.95 },
                { name: 'Lớp mạ', material: 'Zinc', importance: 0.6, confidence: 0.9 },
                { name: 'Vật liệu nền', material: 'Carbon Steel', importance: 0.7, confidence: 0.95 }
            ],
            'cat_mechanical_bearings': [
                { name: 'Vòng bi trong', material: 'Chrome Steel', importance: 0.9, confidence: 0.95 },
                { name: 'Vòng bi ngoài', material: 'Chrome Steel', importance: 0.9, confidence: 0.95 },
                { name: 'Bi thép', material: 'Chrome Steel', importance: 0.8, confidence: 0.95 },
                { name: 'Cage/Keep', material: 'Steel/Brass', importance: 0.6, confidence: 0.9 },
                { name: 'Chất bôi trơn', material: 'Grease/Oil', importance: 0.5, confidence: 0.85 }
            ],
            'cat_electronic_passive': [
                { name: 'Thân linh kiện', material: 'Ceramic/Metal', importance: 0.8, confidence: 0.9 },
                { name: 'Điện cực', material: 'Copper/Aluminum', importance: 0.7, confidence: 0.9 },
                { name: 'Chất dielectric', material: 'Ceramic/Film', importance: 0.6, confidence: 0.85 },
                { name: 'Dẫn nối', material: 'Copper', importance: 0.5, confidence: 0.9 },
                { name: 'Lớp cách điện', material: 'Epoxy', importance: 0.4, confidence: 0.85 }
            ]
        };

        return componentMap[category] || [];
    }

    /**
     * Lấy components từ specifications
     */
    getSpecificationComponents(specifications) {
        const components = [];
        
        Object.entries(specifications).forEach(([key, value]) => {
            if (typeof value === 'object') {
                Object.entries(value).forEach(([subKey, subValue]) => {
                    const component = this.extractComponentFromSpec(`${key}.${subKey}`, subValue);
                    if (component) components.push(component);
                });
            } else {
                const component = this.extractComponentFromSpec(key, value);
                if (component) components.push(component);
            }
        });

        return components;
    }

    /**
     * Trích xuất component từ specification
     */
    extractComponentFromSpec(specKey, specValue) {
        const componentRules = {
            'material': (value) => ({
                name: 'Vật liệu chính',
                material: value,
                importance: 0.9,
                confidence: 0.95,
                source: 'specification',
                specKey: specKey
            }),
            'coating': (value) => ({
                name: 'Lớp phủ bề mặt',
                material: value,
                importance: 0.6,
                confidence: 0.9,
                source: 'specification',
                specKey: specKey
            }),
            'strength_grade': (value) => ({
                name: 'Cấp độ bền',
                material: 'Steel',
                importance: 0.7,
                confidence: 0.85,
                source: 'specification',
                specKey: specKey,
                grade: value
            }),
            'thread_type': (value) => ({
                name: 'Kiểu ren',
                material: 'Steel',
                importance: 0.5,
                confidence: 0.9,
                source: 'specification',
                specKey: specKey,
                type: value
            })
        };

        const rule = componentRules[specKey.toLowerCase()];
        return rule ? rule(specValue) : null;
    }

    /**
     * Lấy components từ tên sản phẩm
     */
    getNameComponents(nameVi, nameEn) {
        const components = [];
        
        // Phân tích tên tiếng Việt
        const viComponents = this.parseVietnameseProductName(nameVi);
        
        // Phân tích tên tiếng Anh
        const enComponents = this.parseEnglishProductName(nameEn);
        
        return [...viComponents, ...enComponents];
    }

    /**
     * Phân tích tên sản phẩm tiếng Việt
     */
    parseVietnameseProductName(name) {
        const components = [];
        const patterns = {
            'bu lông': { name: 'Bu lông', material: 'Steel', importance: 0.9, confidence: 0.8 },
            'ốc vít': { name: 'Ốc vít', material: 'Steel', importance: 0.9, confidence: 0.8 },
            'vòng bi': { name: 'Vòng bi', material: 'Chrome Steel', importance: 0.9, confidence: 0.8 },
            'đồng trục': { name: 'Đồng trục', material: 'Bronze', importance: 0.9, confidence: 0.8 },
            'tụ điện': { name: 'Tụ điện', material: 'Ceramic', importance: 0.8, confidence: 0.7 },
            'điện trở': { name: 'Điện trở', material: 'Carbon', importance: 0.8, confidence: 0.7 },
            'lục giác': { name: 'Đầu lục giác', material: 'Steel', importance: 0.6, confidence: 0.7 },
            'tứ giác': { name: 'Đầu tứ giác', material: 'Steel', importance: 0.6, confidence: 0.7 },
            'mạ kẽm': { name: 'Lớp mạ kẽm', material: 'Zinc', importance: 0.5, confidence: 0.8 },
            'inox': { name: 'Vật liệu inox', material: 'Stainless Steel', importance: 0.7, confidence: 0.8 }
        };

        Object.entries(patterns).forEach(([pattern, component]) => {
            if (name.toLowerCase().includes(pattern)) {
                components.push({
                    ...component,
                    source: 'product_name',
                    pattern: pattern
                });
            }
        });

        return components;
    }

    /**
     * Phân tích tên sản phẩm tiếng Anh
     */
    parseEnglishProductName(name) {
        const components = [];
        const patterns = {
            'bolt': { name: 'Bolt', material: 'Steel', importance: 0.9, confidence: 0.8 },
            'screw': { name: 'Screw', material: 'Steel', importance: 0.9, confidence: 0.8 },
            'bearing': { name: 'Bearing', material: 'Chrome Steel', importance: 0.9, confidence: 0.8 },
            'bushing': { name: 'Bushing', material: 'Bronze', importance: 0.9, confidence: 0.8 },
            'capacitor': { name: 'Capacitor', material: 'Ceramic', importance: 0.8, confidence: 0.7 },
            'resistor': { name: 'Resistor', material: 'Carbon', importance: 0.8, confidence: 0.7 },
            'hex': { name: 'Hex head', material: 'Steel', importance: 0.6, confidence: 0.7 },
            'socket': { name: 'Socket head', material: 'Steel', importance: 0.6, confidence: 0.7 },
            'zinc': { name: 'Zinc plated', material: 'Zinc', importance: 0.5, confidence: 0.8 },
            'stainless': { name: 'Stainless steel', material: 'Stainless Steel', importance: 0.7, confidence: 0.8 }
        };

        Object.entries(patterns).forEach(([pattern, component]) => {
            if (name.toLowerCase().includes(pattern)) {
                components.push({
                    ...component,
                    source: 'product_name_en',
                    pattern: pattern
                });
            }
        });

        return components;
    }

    /**
     * Xác định vật liệu
     */
    identifyMaterials(product) {
        const materials = new Set();
        
        // Từ specifications
        if (product.specifications) {
            this.extractMaterialsFromSpecs(product.specifications, materials);
        }
        
        // Từ components
        const structure = this.structureDatabase.get(product.id);
        if (structure && structure.primaryComponents) {
            structure.primaryComponents.forEach(comp => {
                if (comp.material) materials.add(comp.material);
            });
        }
        
        // Từ category
        const categoryMaterials = this.getCategoryMaterials(product.category_id);
        categoryMaterials.forEach(mat => materials.add(mat));
        
        return Array.from(materials).map(material => ({
            material: material,
            percentage: this.calculateMaterialPercentage(material, product),
            confidence: this.getMaterialConfidence(material, product)
        }));
    }

    /**
     * Trích xuất vật liệu từ specifications
     */
    extractMaterialsFromSpecs(specs, materials) {
        const materialKeywords = [
            'steel', 'iron', 'aluminum', 'copper', 'brass', 'bronze',
            'zinc', 'chrome', 'nickel', 'titanium', 'plastic', 'ceramic',
            'thép', 'sắt', 'nhôm', 'đồng', 'kẽm', 'inox', 'gốm'
        ];

        const extractFromObject = (obj, path = '') => {
            Object.entries(obj).forEach(([key, value]) => {
                const currentPath = path ? `${path}.${key}` : key;
                
                if (typeof value === 'object' && value !== null) {
                    extractFromObject(value, currentPath);
                } else {
                    const valueStr = value.toString().toLowerCase();
                    materialKeywords.forEach(keyword => {
                        if (valueStr.includes(keyword)) {
                            materials.add(this.capitalizeFirst(keyword));
                        }
                    });
                }
            });
        };

        extractFromObject(specs);
    }

    /**
     * Lấy vật liệu theo category
     */
    getCategoryMaterials(category) {
        const categoryMaterials = {
            'cat_mechanical_fasteners': ['Steel', 'Zinc', 'Stainless Steel', 'Brass'],
            'cat_mechanical_bearings': ['Chrome Steel', 'Stainless Steel', 'Brass', 'Bronze'],
            'cat_electronic_passive': ['Ceramic', 'Aluminum', 'Tantalum', 'Copper', 'Carbon'],
            'cat_electronic_active': ['Silicon', 'Germanium', 'Gallium'],
            'cat_electromechanical': ['Copper', 'Steel', 'Plastic', 'Ceramic']
        };

        return categoryMaterials[category] || ['Steel', 'Plastic'];
    }

    /**
     * Xác định quy trình sản xuất
     */
    identifyManufacturingProcess(product) {
        const category = product.category_id;
        const materials = this.identifyMaterials(product);
        const specifications = product.specifications || {};
        
        const process = {
            primaryProcess: this.getPrimaryProcess(category),
            secondaryProcesses: this.getSecondaryProcesses(category, materials),
            qualityControlSteps: this.getQualityControlSteps(category),
            equipment: this.getRequiredEquipment(category, specifications),
            parameters: this.getProcessParameters(category, specifications),
            estimatedTime: this.estimateProcessingTime(category, specifications)
        };

        return process;
    }

    /**
     * Lấy quy trình chính
     */
    getPrimaryProcess(category) {
        const processes = {
            'cat_mechanical_fasteners': 'Cold Heading / Thread Rolling',
            'cat_mechanical_bearings': 'Precision Grinding / Assembly',
            'cat_electronic_passive': 'Sintering / Coating',
            'cat_electronic_active': 'Wafer Fabrication / Packaging',
            'cat_electromechanical': 'Stamping / Assembly'
        };

        return processes[category] || 'General Manufacturing';
    }

    /**
     * Lấy quy trình phụ
     */
    getSecondaryProcesses(category, materials) {
        const baseProcesses = {
            'cat_mechanical_fasteners': [
                'Heat Treatment', 'Surface Treatment', 'Inspection', 'Packaging'
            ],
            'cat_mechanical_bearings': [
                'Heat Treatment', 'Grinding', 'Cleaning', 'Lubrication', 'Inspection'
            ],
            'cat_electronic_passive': [
                'Printing', 'Firing', 'Termination', 'Testing', 'Marking'
            ]
        };

        const processes = baseProcesses[category] || ['Inspection', 'Packaging'];
        
        // Thêm processes dựa trên vật liệu
        materials.forEach(mat => {
            if (mat.material.includes('Steel')) {
                processes.push('Heat Treatment');
            }
            if (mat.material.includes('Zinc')) {
                processes.push('Plating');
            }
        });

        return [...new Set(processes)];
    }

    /**
     * Xác định tiêu chuẩn chất lượng
     */
    identifyQualityStandards(product) {
        const standards = {
            international: this.getInternationalStandards(product),
            industry: this.getIndustryStandards(product),
            manufacturer: this.getManufacturerStandards(product),
            regulatory: this.getRegulatoryStandards(product)
        };

        return standards;
    }

    /**
     * Lấy tiêu chuẩn quốc tế
     */
    getInternationalStandards(product) {
        const category = product.category_id;
        const specStandards = this.extractStandardsFromSpecs(product.specifications || {});
        
        const baseStandards = {
            'cat_mechanical_fasteners': ['ISO 898', 'ISO 4014', 'ISO 4017'],
            'cat_mechanical_bearings': ['ISO 15', 'ISO 281', 'ISO 492'],
            'cat_electronic_passive': ['IEC 60068', 'IEC 60384'],
            'cat_electronic_active': ['JEDEC', 'MIL-STD']
        };

        return [...new Set([...(baseStandards[category] || []), ...specStandards])];
    }

    /**
     * Trích xuất standards từ specifications
     */
    extractStandardsFromSpecs(specs) {
        const standards = [];
        const standardPatterns = [
            /ISO\s*\d+/, /JIS\s*\d+/, /DIN\s*\d+/, /ANSI\s*\d+/, 
            /ASTM\s*\d+/, /IEC\s*\d+/, /MIL-STD\s*\d+/
        ];

        const extractFromObject = (obj) => {
            Object.values(obj).forEach(value => {
                if (typeof value === 'string') {
                    standardPatterns.forEach(pattern => {
                        const match = value.match(pattern);
                        if (match) standards.push(match[0]);
                    });
                } else if (typeof value === 'object' && value !== null) {
                    extractFromObject(value);
                }
            });
        };

        extractFromObject(specs);
        return [...new Set(standards)];
    }

    /**
     * Xác định cấu trúc lắp ráp
     */
    identifyAssemblyStructure(product) {
        const structure = {
            assemblyType: this.getAssemblyType(product),
            components: this.getAssemblyComponents(product),
            sequence: this.getAssemblySequence(product),
            tools: this.getAssemblyTools(product),
            complexity: this.calculateAssemblyComplexity(product)
        };

        return structure;
    }

    /**
     * Lấy loại lắp ráp
     */
    getAssemblyType(product) {
        const category = product.category_id;
        const name = (product.name + ' ' + product.name_en).toLowerCase();
        
        if (name.includes('assembly') || name.includes('kit')) {
            return 'Multi-component Assembly';
        }
        
        const types = {
            'cat_mechanical_fasteners': 'Single Component',
            'cat_mechanical_bearings': 'Precision Assembly',
            'cat_electronic_passive': 'Single Component',
            'cat_electromechanical': 'Complex Assembly'
        };

        return types[category] || 'Single Component';
    }

    /**
     * Xác định dependencies
     */
    identifyDependencies(product) {
        const dependencies = {
            materialDependencies: this.getMaterialDependencies(product),
            processDependencies: this.getProcessDependencies(product),
            supplierDependencies: this.getSupplierDependencies(product),
            equipmentDependencies: this.getEquipmentDependencies(product)
        };

        return dependencies;
    }

    /**
     * Tính confidence score cho phân tích
     */
    calculateAnalysisConfidence(structure) {
        let totalConfidence = 0;
        let factors = 0;

        // Confidence từ primary components
        if (structure.primaryComponents.length > 0) {
            const avgCompConfidence = structure.primaryComponents.reduce((sum, comp) => 
                sum + comp.confidence, 0) / structure.primaryComponents.length;
            totalConfidence += avgCompConfidence * 0.4;
            factors += 0.4;
        }

        // Confidence từ materials
        if (structure.materials.length > 0) {
            const avgMatConfidence = structure.materials.reduce((sum, mat) => 
                sum + mat.confidence, 0) / structure.materials.length;
            totalConfidence += avgMatConfidence * 0.3;
            factors += 0.3;
        }

        // Confidence từ specifications
        if (structure.dataSource.includes('specification')) {
            totalConfidence += 0.95 * 0.2;
            factors += 0.2;
        } else {
            totalConfidence += 0.7 * 0.2;
            factors += 0.2;
        }

        // Confidence từ category knowledge
        totalConfidence += 0.9 * 0.1;
        factors += 0.1;

        return factors > 0 ? totalConfidence / factors : 0;
    }

    /**
     * Xác định nguồn dữ liệu
     */
    identifyDataSource(product) {
        const sources = [];
        
        if (product.specifications && Object.keys(product.specifications).length > 0) {
            sources.push('specification');
        }
        
        if (product.name && product.name.length > 0) {
            sources.push('product_name');
        }
        
        if (product.name_en && product.name_en.length > 0) {
            sources.push('product_name_en');
        }
        
        sources.push('category_knowledge');
        
        return sources;
    }

    /**
     * Utility functions
     */
    deduplicateComponents(components) {
        const seen = new Set();
        return components.filter(comp => {
            const key = `${comp.name}-${comp.material}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    calculateMaterialPercentage(material, product) {
        // Simplified calculation - in real system would use more complex logic
        const structure = this.structureDatabase.get(product.id);
        if (!structure || !structure.primaryComponents) return 50;

        const materialComponents = structure.primaryComponents.filter(comp => 
            comp.material === material
        );

        return materialComponents.length > 0 ? 
            (materialComponents.length / structure.primaryComponents.length) * 100 : 10;
    }

    getMaterialConfidence(material, product) {
        const structure = this.structureDatabase.get(product.id);
        if (!structure) return 0.5;

        const materialComponents = structure.primaryComponents.filter(comp => 
            comp.material === material
        );

        if (materialComponents.length === 0) return 0.3;

        const avgConfidence = materialComponents.reduce((sum, comp) => 
            sum + comp.confidence, 0) / materialComponents.length;

        return avgConfidence;
    }

    /**
     * Get detailed structure analysis for product
     */
    getProductStructure(productId) {
        return this.structureDatabase.get(productId);
    }

    /**
     * Get component breakdown with confidence
     */
    getComponentBreakdown(productId) {
        const structure = this.structureDatabase.get(productId);
        if (!structure) return null;

        return {
            primaryComponents: structure.primaryComponents,
            materials: structure.materials,
            confidence: structure.analysisConfidence,
            dataSource: structure.dataSource
        };
    }

    /**
     * Validate structure analysis
     */
    validateStructure(productId) {
        const structure = this.structureDatabase.get(productId);
        if (!structure) return { valid: false, errors: ['Product not found'] };

        const errors = [];
        const warnings = [];

        // Validate primary components
        if (structure.primaryComponents.length === 0) {
            errors.push('No primary components identified');
        }

        // Validate materials
        if (structure.materials.length === 0) {
            warnings.push('No materials identified');
        }

        // Validate confidence
        if (structure.analysisConfidence < 0.5) {
            warnings.push('Low analysis confidence');
        }

        return {
            valid: errors.length === 0,
            errors: errors,
            warnings: warnings,
            confidence: structure.analysisConfidence
        };
    }
}

// Export để sử dụng
window.ProductStructureAnalyzer = ProductStructureAnalyzer;
