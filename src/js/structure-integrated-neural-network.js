/**
 * Enhanced Neural Network với Structure Analysis Integration
 * Hệ thống Neural Network Nâng cao tích hợp Phân tích Cấu trúc Sản phẩm
 */

class StructureIntegratedNeuralNetwork extends AdvancedProductRelationshipNeuralNetwork {
    constructor() {
        super();
        this.structureAnalyzer = new ProductStructureAnalyzer();
        this.structureEmbeddings = new Map();
        this.componentRelationships = new Map();
        this.materialCompatibility = new Map();
        this.processDependencies = new Map();
    }

    /**
     * Khởi tạo với structure analysis
     */
    async initializeWithStructure(productDatabasePath) {
        await this.initializeAdvanced(productDatabasePath);
        
        // Initialize structure analyzer
        await this.structureAnalyzer.initialize(this.productDatabase);
        
        // Build structure-enhanced relationships
        this.buildStructureRelationships();
        
        // Create structure embeddings
        this.createStructureEmbeddings();
        
        // Build material compatibility matrix
        this.buildMaterialCompatibility();
        
        console.log('✅ Structure-Integrated Neural Network đã khởi tạo');
    }

    /**
     * Xây dựng relationships dựa trên structure analysis
     */
    buildStructureRelationships() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const structure = this.structureAnalyzer.getProductStructure(product.id);
            if (!structure) return;

            // Component-based relationships
            structure.primaryComponents.forEach(component => {
                this.addComponentRelationship(product.id, component);
            });

            // Material-based relationships
            structure.materials.forEach(material => {
                this.addMaterialRelationship(product.id, material);
            });

            // Process-based relationships
            this.addProcessRelationship(product.id, structure.manufacturingProcess);
        });

        console.log(`🔗 Đã xây dựng ${this.componentRelationships.size} component relationships`);
    }

    /**
     * Thêm component relationship
     */
    addComponentRelationship(productId, component) {
        if (!this.componentRelationships.has(productId)) {
            this.componentRelationships.set(productId, new Map());
        }

        const componentMap = this.componentRelationships.get(productId);
        const key = `${component.name}-${component.material}`;
        
        componentMap.set(key, {
            component: component,
            confidence: component.confidence,
            importance: component.importance,
            source: component.source
        });
    }

    /**
     * Thêm material relationship
     */
    addMaterialRelationship(productId, material) {
        if (!this.materialCompatibility.has(productId)) {
            this.materialCompatibility.set(productId, new Set());
        }

        this.materialCompatibility.get(productId).add(material.material);
    }

    /**
     * Thêm process relationship
     */
    addProcessRelationship(productId, process) {
        if (!this.processDependencies.has(productId)) {
            this.processDependencies.set(productId, process);
        }
    }

    /**
     * Tạo structure embeddings
     */
    createStructureEmbeddings() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const embedding = this.createStructureEmbedding(product.id);
            this.structureEmbeddings.set(product.id, embedding);
        });

        console.log(`📊 Đã tạo ${this.structureEmbeddings.size} structure embeddings`);
    }

    /**
     * Tạo embedding cho structure
     */
    createStructureEmbedding(productId) {
        const structure = this.structureAnalyzer.getProductStructure(productId);
        if (!structure) {
            return new Array(256).fill(0); // Default embedding
        }

        const embedding = new Array(256).fill(0);
        let index = 0;

        // Component embeddings (0-99)
        structure.primaryComponents.slice(0, 10).forEach((comp, i) => {
            const compEmbedding = this.getComponentEmbedding(comp);
            for (let j = 0; j < 10 && index < 100; j++, index++) {
                embedding[index] = compEmbedding[j];
            }
        });

        // Material embeddings (100-149)
        structure.materials.slice(0, 5).forEach((mat, i) => {
            const matEmbedding = this.getMaterialEmbedding(mat);
            for (let j = 0; j < 10 && index < 150; j++, index++) {
                embedding[index] = matEmbedding[j];
            }
        });

        // Process embeddings (150-199)
        const processEmbedding = this.getProcessEmbedding(structure.manufacturingProcess);
        for (let j = 0; j < 50 && index < 200; j++, index++) {
            embedding[index] = processEmbedding[j];
        }

        // Quality standard embeddings (200-255)
        const qualityEmbedding = this.getQualityEmbedding(structure.qualityStandards);
        for (let j = 0; j < 56 && index < 256; j++, index++) {
            embedding[index] = qualityEmbedding[j];
        }

        return embedding;
    }

    /**
     * Lấy component embedding
     */
    getComponentEmbedding(component) {
        const embedding = new Array(10).fill(0);
        
        // Component name hash
        const nameHash = this.hashString(component.name);
        embedding[0] = (nameHash % 1000) / 1000.0;
        
        // Material hash
        const materialHash = this.hashString(component.material);
        embedding[1] = (materialHash % 1000) / 1000.0;
        
        // Importance and confidence
        embedding[2] = component.importance;
        embedding[3] = component.confidence;
        
        // Source encoding
        const sourceMap = {
            'specification': 0.9,
            'product_name': 0.7,
            'product_name_en': 0.7,
            'category_knowledge': 0.5
        };
        embedding[4] = sourceMap[component.source] || 0.5;
        
        // Additional features
        embedding[5] = component.name.length / 50.0; // Normalized length
        embedding[6] = component.material.length / 20.0; // Normalized length
        embedding[7] = this.getMaterialType(component.material);
        embedding[8] = this.getComponentType(component.name);
        embedding[9] = this.calculateComponentComplexity(component);
        
        return embedding;
    }

    /**
     * Lấy material embedding
     */
    getMaterialEmbedding(material) {
        const embedding = new Array(10).fill(0);
        
        // Material hash
        const materialHash = this.hashString(material.material);
        embedding[0] = (materialHash % 1000) / 1000.0;
        
        // Percentage
        embedding[1] = material.percentage / 100.0;
        
        // Confidence
        embedding[2] = material.confidence;
        
        // Material properties
        const properties = this.getMaterialProperties(material.material);
        embedding[3] = properties.density;
        embedding[4] = properties.hardness;
        embedding[5] = properties.conductivity;
        embedding[6] = properties.corrosion_resistance;
        embedding[7] = properties.cost_factor;
        embedding[8] = properties.availability;
        embedding[9] = properties.processing_difficulty;
        
        return embedding;
    }

    /**
     * Lấy process embedding
     */
    getProcessEmbedding(process) {
        const embedding = new Array(50).fill(0);
        let index = 0;

        // Primary process (0-9)
        const primaryHash = this.hashString(process.primaryProcess);
        for (let i = 0; i < 10; i++) {
            embedding[index++] = ((primaryHash + i) % 1000) / 1000.0;
        }

        // Secondary processes (10-29)
        process.secondaryProcesses.slice(0, 10).forEach((secProcess, i) => {
            const secHash = this.hashString(secProcess);
            for (let j = 0; j < 2 && index < 30; j++) {
                embedding[index++] = ((secHash + j) % 1000) / 1000.0;
            }
        });

        // Equipment (30-39)
        process.equipment.slice(0, 5).forEach((equip, i) => {
            const equipHash = this.hashString(equip);
            embedding[index++] = (equipHash % 1000) / 1000.0;
        });

        // Parameters (40-49)
        Object.values(process.parameters).slice(0, 10).forEach((param, i) => {
            embedding[index++] = this.normalizeParameter(param);
        });

        return embedding;
    }

    /**
     * Lấy quality standard embedding
     */
    getQualityEmbedding(standards) {
        const embedding = new Array(56).fill(0);
        let index = 0;

        // International standards (0-13)
        standards.international.slice(0, 7).forEach((standard, i) => {
            const stdHash = this.hashString(standard);
            for (let j = 0; j < 2 && index < 14; j++) {
                embedding[index++] = ((stdHash + j) % 1000) / 1000.0;
            }
        });

        // Industry standards (14-27)
        standards.industry.slice(0, 7).forEach((standard, i) => {
            const stdHash = this.hashString(standard);
            for (let j = 0; j < 2 && index < 28; j++) {
                embedding[index++] = ((stdHash + j) % 1000) / 1000.0;
            }
        });

        // Manufacturer standards (28-41)
        standards.manufacturer.slice(0, 7).forEach((standard, i) => {
            const stdHash = this.hashString(standard);
            for (let j = 0; j < 2 && index < 42; j++) {
                embedding[index++] = ((stdHash + j) % 1000) / 1000.0;
            }
        });

        // Regulatory standards (42-55)
        standards.regulatory.slice(0, 7).forEach((standard, i) => {
            const stdHash = this.hashString(standard);
            for (let j = 0; j < 2 && index < 56; j++) {
                embedding[index++] = ((stdHash + j) % 1000) / 1000.0;
            }
        });

        return embedding;
    }

    /**
     * Build material compatibility matrix
     */
    buildMaterialCompatibility() {
        const materials = this.getAllMaterials();
        
        materials.forEach(mat1 => {
            if (!this.materialCompatibility.has(mat1)) {
                this.materialCompatibility.set(mat1, new Map());
            }
            
            materials.forEach(mat2 => {
                if (mat1 !== mat2) {
                    const compatibility = this.calculateMaterialCompatibility(mat1, mat2);
                    this.materialCompatibility.get(mat1).set(mat2, compatibility);
                }
            });
        });

        console.log(`🔬 Đã xây dựng material compatibility matrix cho ${materials.length} materials`);
    }

    /**
     * Tính material compatibility
     */
    calculateMaterialCompatibility(mat1, mat2) {
        const rules = {
            // Steel compatibility
            'Steel-Steel': 0.95,
            'Steel-Zinc': 0.85,
            'Steel-Stainless Steel': 0.90,
            'Steel-Brass': 0.75,
            'Steel-Bronze': 0.80,
            
            // Aluminum compatibility
            'Aluminum-Aluminum': 0.95,
            'Aluminum-Steel': 0.60,
            'Aluminum-Stainless Steel': 0.65,
            'Aluminum-Copper': 0.85,
            
            // Copper compatibility
            'Copper-Copper': 0.95,
            'Copper-Brass': 0.90,
            'Copper-Bronze': 0.85,
            'Copper-Aluminum': 0.85,
            'Copper-Steel': 0.70,
            
            // Ceramic compatibility
            'Ceramic-Ceramic': 0.95,
            'Ceramic-Metal': 0.40,
            
            // Plastic compatibility
            'Plastic-Plastic': 0.85,
            'Plastic-Metal': 0.30,
            
            // Default compatibility
            'default': 0.50
        };

        const key1 = `${mat1}-${mat2}`;
        const key2 = `${mat2}-${mat1}`;
        
        return rules[key1] || rules[key2] || rules.default;
    }

    /**
     * Advanced component detection với structure analysis
     */
    findComponentsWithStructure(productId) {
        const product = this.relationshipGraph.get(productId);
        if (!product) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        const components = [];
        const visited = new Set();
        const productStructure = this.structureAnalyzer.getProductStructure(productId);

        // Enhanced DFS với structure-based scoring
        this.findComponentsStructureDFS(productId, components, visited, 0, productStructure);

        // Sort by structure-enhanced confidence
        components.sort((a, b) => b.structureConfidence - a.structureConfidence);

        return {
            product: product.product,
            components: components,
            totalFound: components.length,
            structureAnalysis: {
                productStructure: productStructure,
                confidence: productStructure ? productStructure.analysisConfidence : 0,
                dataSource: productStructure ? productStructure.dataSource : []
            }
        };
    }

    /**
     * Structure-enhanced DFS
     */
    findComponentsStructureDFS(productId, components, visited, depth, parentStructure) {
        if (depth > 3 || visited.has(productId)) return;
        
        visited.add(productId);
        const node = this.relationshipGraph.get(productId);
        if (!node) return;

        node.related.forEach(relationship => {
            const relatedNode = this.relationshipGraph.get(relationship.productId);
            if (!relatedNode) return;

            // Structure-based component detection
            if (this.isComponentByStructure(relationship, node, relatedNode, parentStructure)) {
                const componentStructure = this.structureAnalyzer.getProductStructure(relationship.productId);
                
                const component = {
                    component: relatedNode.product,
                    confidence: relationship.weight * this.getComponentConfidence(node, relatedNode),
                    transformerConfidence: this.calculateTransformerConfidence(node, relatedNode),
                    gnnConfidence: this.calculateGNNConfidence(node, relatedNode),
                    structureConfidence: 0,
                    materialCompatibility: this.calculateStructureCompatibility(parentStructure, componentStructure),
                    processCompatibility: this.calculateProcessCompatibility(parentStructure, componentStructure),
                    relationship: relationship.type,
                    depth: depth,
                    structureAnalysis: {
                        components: componentStructure ? componentStructure.primaryComponents : [],
                        materials: componentStructure ? componentStructure.materials : [],
                        confidence: componentStructure ? componentStructure.analysisConfidence : 0
                    }
                };

                // Calculate structure-enhanced confidence
                component.structureConfidence = this.calculateStructureConfidence(component, parentStructure, componentStructure);

                components.push(component);
            }

            this.findComponentsStructureDFS(relationship.productId, components, visited, depth + 1, parentStructure);
        });
    }

    /**
     * Component detection dựa trên structure
     */
    isComponentByStructure(relationship, productNode, componentNode, productStructure) {
        if (!productStructure) return false;

        const componentStructure = this.structureAnalyzer.getProductStructure(componentNode.product.id);
        if (!componentStructure) return false;

        // Check material compatibility
        const materialComp = this.calculateStructureCompatibility(productStructure, componentStructure);
        if (materialComp < 0.3) return false;

        // Check process compatibility
        const processComp = this.calculateProcessCompatibility(productStructure, componentStructure);
        if (processComp < 0.3) return false;

        // Check complexity hierarchy
        const complexityRatio = this.calculateComplexityRatio(productStructure, componentStructure);
        if (complexityRatio < 1.2) return false; // Component should be simpler

        // Check assembly structure
        if (productStructure.assemblyStructure.complexity > componentStructure.assemblyStructure.complexity) {
            return true;
        }

        return false;
    }

    /**
     * Tính structure compatibility
     */
    calculateStructureCompatibility(structure1, structure2) {
        if (!structure1 || !structure2) return 0.5;

        let compatibility = 0;
        let factors = 0;

        // Material compatibility
        const matComp = this.calculateMaterialStructureCompatibility(structure1.materials, structure2.materials);
        compatibility += matComp;
        factors += 1;

        // Process compatibility
        const processComp = this.calculateProcessStructureCompatibility(structure1.manufacturingProcess, structure2.manufacturingProcess);
        compatibility += processComp;
        factors += 1;

        // Quality standard compatibility
        const qualityComp = this.calculateQualityCompatibility(structure1.qualityStandards, structure2.qualityStandards);
        compatibility += qualityComp;
        factors += 1;

        return factors > 0 ? compatibility / factors : 0.5;
    }

    /**
     * Material structure compatibility
     */
    calculateMaterialStructureCompatibility(materials1, materials2) {
        if (!materials1 || !materials2) return 0.5;

        let totalCompatibility = 0;
        let comparisons = 0;

        materials1.forEach(mat1 => {
            materials2.forEach(mat2 => {
                const compatibility = this.materialCompatibility
                    .get(mat1.material)?.get(mat2.material) || 0.5;
                totalCompatibility += compatibility * mat1.percentage * mat2.percentage;
                comparisons++;
            });
        });

        return comparisons > 0 ? totalCompatibility / comparisons : 0.5;
    }

    /**
     * Process structure compatibility
     */
    calculateProcessStructureCompatibility(process1, process2) {
        if (!process1 || !process2) return 0.5;

        let compatibility = 0;
        let factors = 0;

        // Primary process compatibility
        if (process1.primaryProcess === process2.primaryProcess) {
            compatibility += 0.8;
        } else if (this.areProcessesCompatible(process1.primaryProcess, process2.primaryProcess)) {
            compatibility += 0.6;
        } else {
            compatibility += 0.3;
        }
        factors += 1;

        // Secondary process overlap
        const commonProcesses = process1.secondaryProcesses.filter(proc => 
            process2.secondaryProcesses.includes(proc)
        );
        const processOverlap = commonProcesses.length / 
            Math.max(process1.secondaryProcesses.length, process2.secondaryProcesses.length);
        compatibility += processOverlap * 0.7;
        factors += 1;

        return factors > 0 ? compatibility / factors : 0.5;
    }

    /**
     * Quality standard compatibility
     */
    calculateQualityCompatibility(standards1, standards2) {
        if (!standards1 || !standards2) return 0.5;

        let compatibility = 0;
        let factors = 0;

        // International standards overlap
        const commonInternational = standards1.international.filter(std => 
            standards2.international.includes(std)
        );
        const internationalOverlap = commonInternational.length / 
            Math.max(standards1.international.length, standards2.international.length);
        compatibility += internationalOverlap * 0.8;
        factors += 1;

        // Industry standards overlap
        const commonIndustry = standards1.industry.filter(std => 
            standards2.industry.includes(std)
        );
        const industryOverlap = commonIndustry.length / 
            Math.max(standards1.industry.length, standards2.industry.length);
        compatibility += industryOverlap * 0.7;
        factors += 1;

        return factors > 0 ? compatibility / factors : 0.5;
    }

    /**
     * Calculate structure-enhanced confidence
     */
    calculateStructureConfidence(component, parentStructure, componentStructure) {
        if (!parentStructure || !componentStructure) {
            return component.confidence;
        }

        // Base confidence from ensemble
        let baseConfidence = component.confidence * 0.4;
        
        // Structure compatibility weight
        const structureComp = component.materialCompatibility * 0.3;
        
        // Process compatibility weight
        const processComp = component.processCompatibility * 0.2;
        
        // Structure analysis confidence
        const structureAnalysisConfidence = componentStructure.analysisConfidence * 0.1;

        return baseConfidence + structureComp + processComp + structureAnalysisConfidence;
    }

    /**
     * Get detailed structure analysis
     */
    getDetailedStructureAnalysis(productId) {
        const structure = this.structureAnalyzer.getProductStructure(productId);
        const validation = this.structureAnalyzer.validateStructure(productId);
        
        return {
            structure: structure,
            validation: validation,
            embedding: this.structureEmbeddings.get(productId),
            relationships: {
                components: this.componentRelationships.get(productId),
                materials: this.materialCompatibility.get(productId),
                processes: this.processDependencies.get(productId)
            }
        };
    }

    /**
     * Utility functions
     */
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    getMaterialProperties(material) {
        const properties = {
            'Steel': { density: 0.8, hardness: 0.7, conductivity: 0.3, corrosion_resistance: 0.4, cost_factor: 0.5, availability: 0.9, processing_difficulty: 0.6 },
            'Stainless Steel': { density: 0.8, hardness: 0.8, conductivity: 0.2, corrosion_resistance: 0.9, cost_factor: 0.7, availability: 0.8, processing_difficulty: 0.7 },
            'Aluminum': { density: 0.3, hardness: 0.4, conductivity: 0.8, corrosion_resistance: 0.7, cost_factor: 0.6, availability: 0.9, processing_difficulty: 0.4 },
            'Copper': { density: 0.7, hardness: 0.3, conductivity: 0.9, corrosion_resistance: 0.6, cost_factor: 0.8, availability: 0.8, processing_difficulty: 0.5 },
            'Brass': { density: 0.7, hardness: 0.5, conductivity: 0.7, corrosion_resistance: 0.7, cost_factor: 0.7, availability: 0.8, processing_difficulty: 0.5 },
            'Bronze': { density: 0.8, hardness: 0.6, conductivity: 0.6, corrosion_resistance: 0.8, cost_factor: 0.8, availability: 0.7, processing_difficulty: 0.6 },
            'Ceramic': { density: 0.6, hardness: 0.9, conductivity: 0.1, corrosion_resistance: 0.9, cost_factor: 0.6, availability: 0.7, processing_difficulty: 0.8 },
            'Zinc': { density: 0.5, hardness: 0.3, conductivity: 0.4, corrosion_resistance: 0.8, cost_factor: 0.4, availability: 0.9, processing_difficulty: 0.3 }
        };

        return properties[material] || {
            density: 0.5, hardness: 0.5, conductivity: 0.5, 
            corrosion_resistance: 0.5, cost_factor: 0.5, 
            availability: 0.5, processing_difficulty: 0.5
        };
    }

    getMaterialType(material) {
        const types = {
            'Steel': 0.8, 'Stainless Steel': 0.8, 'Iron': 0.8,
            'Aluminum': 0.6, 'Copper': 0.6, 'Brass': 0.6, 'Bronze': 0.6,
            'Ceramic': 0.4, 'Plastic': 0.3
        };

        for (const [type, value] of Object.entries(types)) {
            if (material.includes(type)) return value;
        }

        return 0.5;
    }

    getComponentType(name) {
        const types = {
            'bu lông': 0.9, 'bolt': 0.9, 'ốc vít': 0.9, 'screw': 0.9,
            'vòng bi': 0.8, 'bearing': 0.8, 'đồng trục': 0.8, 'bushing': 0.8,
            'tụ điện': 0.7, 'capacitor': 0.7, 'điện trở': 0.7, 'resistor': 0.7
        };

        const lowerName = name.toLowerCase();
        for (const [type, value] of Object.entries(types)) {
            if (lowerName.includes(type)) return value;
        }

        return 0.5;
    }

    calculateComponentComplexity(component) {
        let complexity = 0.3; // Base complexity
        
        // Material complexity
        complexity += this.getMaterialProperties(component.material).processing_difficulty * 0.3;
        
        // Importance factor
        complexity += component.importance * 0.2;
        
        // Source reliability
        const sourceReliability = {
            'specification': 0.9,
            'product_name': 0.7,
            'category_knowledge': 0.5
        };
        complexity += (sourceReliability[component.source] || 0.5) * 0.2;

        return Math.min(complexity, 1.0);
    }

    normalizeParameter(param) {
        if (typeof param === 'number') {
            return Math.min(param / 1000, 1.0); // Normalize to 0-1
        }
        if (typeof param === 'string') {
            return this.hashString(param) % 1000 / 1000.0;
        }
        return 0.5;
    }

    areProcessesCompatible(proc1, proc2) {
        const compatibleGroups = [
            ['Cold Heading', 'Thread Rolling', 'Stamping'],
            ['Precision Grinding', 'Fine Grinding', 'Lapping'],
            ['Sintering', 'Firing', 'Curing'],
            ['Assembly', 'Sub-assembly', 'Final Assembly']
        ];

        return compatibleGroups.some(group => 
            group.includes(proc1) && group.includes(proc2)
        );
    }

    calculateComplexityRatio(structure1, structure2) {
        const complexity1 = structure1.assemblyStructure.complexity;
        const complexity2 = structure2.assemblyStructure.complexity;
        
        return complexity1 / complexity2;
    }

    getAllMaterials() {
        const materials = new Set();
        
        this.productDatabase.products.forEach(product => {
            const structure = this.structureAnalyzer.getProductStructure(product.id);
            if (structure && structure.materials) {
                structure.materials.forEach(mat => {
                    materials.add(mat.material);
                });
            }
        });

        return Array.from(materials);
    }
}

// Export để sử dụng
window.StructureIntegratedNeuralNetwork = StructureIntegratedNeuralNetwork;
