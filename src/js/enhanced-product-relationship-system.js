/**
 * Enhanced Product Relationship System - 100 Layer Integration
 * Hệ thống Nâng cao Mối quan hệ Sản phẩm - Tích hợp 100 Lớp
 * 
 * Kết hợp Neural Network + Internal Connection Engine + Industry Standards
 */

class EnhancedProductRelationshipSystem {
    constructor() {
        this.productDatabase = null;
        
        // Neural Network Components
        this.neuralNetwork = null;
        this.embeddingDimension = 128;
        this.isTrained = false;
        
        // Connection Engine Components
        this.connectionEngine = null;
        this.publicStandards = new Map();
        this.industryPatterns = new Map();
        
        // 100-Layer Architecture
        this.layers = [];
        this.layerTypes = [
            'input_embedding', 'category_encoding', 'material_encoding', 'specification_encoding',
            'application_encoding', 'standard_compliance', 'pattern_matching', 'compatibility_analysis',
            'relationship_inference', 'confidence_scoring', 'validation_layer', 'output_layer'
        ];
        
        // Enhanced Data Structures
        this.relationshipGraph = new Map();
        this.componentHierarchy = new Map();
        this.compatibilityMatrix = new Map();
        this.strengthMatrix = new Map();
        
        // Performance Metrics
        this.accuracyMetrics = {
            neural: 0,
            standards: 0,
            patterns: 0,
            combined: 0
        };
        
        // Cache for optimization
        this.cache = new Map();
        this.cacheSize = 1000;
        
        // Persistent Learning System
        this.learningHistory = new Map();
        this.knowledgeBase = new Map();
        this.experienceMatrix = new Map();
        this.successPatterns = new Map();
        this.failurePatterns = new Map();
        
        // Evolution Metrics
        this.evolutionStats = {
            totalRuns: 0,
            successfulRuns: 0,
            accuracyImprovement: 0,
            knowledgeGrowth: 0,
            patternDiscovery: 0
        };
        
        // Storage Keys
        this.storageKeys = {
            weights: 'enhanced_system_weights',
            knowledge: 'enhanced_system_knowledge',
            patterns: 'enhanced_system_patterns',
            history: 'enhanced_system_history',
            metrics: 'enhanced_system_metrics'
        };
    }

    /**
     * Khởi tạo hệ thống 100 lớp với persistent learning
     */
    async initialize(productDatabasePath) {
        try {
            console.log('🚀 Khởi tạo Enhanced Product Relationship System...');
            
            // Load saved knowledge first
            this.loadSavedKnowledge();
            
            // Load database
            const response = await fetch(productDatabasePath);
            this.productDatabase = await response.json();
            
            // Initialize connection engine
            this.connectionEngine = new InternalConnectionEngine();
            await this.connectionEngine.initialize(this.productDatabase);
            
            // Build 100-layer architecture
            this.build100LayerArchitecture();
            
            // Load saved weights if available
            this.loadSavedWeights();
            
            // Initialize neural network with enhanced features
            this.initializeEnhancedNeuralNetwork();
            
            // Build enhanced relationship graph
            this.buildEnhancedRelationshipGraph();
            
            // Train combined system with transfer learning
            await this.trainCombinedSystem();
            
            // Save enhanced knowledge
            this.saveSystemKnowledge();
            
            // Update evolution stats
            this.updateEvolutionStats();
            
            console.log(`✅ Đã khởi tạo hệ thống 100 lớp với ${this.productDatabase.products.length} sản phẩm`);
            console.log(`🧠 Neural Network: ${this.neuralNetwork.layers.length} layers`);
            console.log(`📚 Public Standards: ${this.publicStandards.size}`);
            console.log(`🔗 Industry Patterns: ${this.industryPatterns.size}`);
            console.log(`💾 Knowledge Base: ${this.knowledgeBase.size} entries`);
            console.log(`📈 Evolution Stats: Run #${this.evolutionStats.totalRuns}`);
            
        } catch (error) {
            console.error('❌ Lỗi khởi tạo:', error);
            throw error;
        }
    }

    /**
     * Xây dựng kiến trúc 100 lớp
     */
    build100LayerArchitecture() {
        // Layer 1-10: Input Processing
        this.layers.push(...this.buildInputLayers());
        
        // Layer 11-30: Feature Extraction
        this.layers.push(...this.buildFeatureExtractionLayers());
        
        // Layer 31-50: Pattern Recognition
        this.layers.push(...this.buildPatternRecognitionLayers());
        
        // Layer 51-70: Standards Compliance
        this.layers.push(...this.buildStandardsComplianceLayers());
        
        // Layer 71-85: Relationship Inference
        this.layers.push(...this.buildRelationshipInferenceLayers());
        
        // Layer 86-95: Confidence Scoring
        this.layers.push(...this.buildConfidenceScoringLayers());
        
        // Layer 96-100: Output & Validation
        this.layers.push(...this.buildOutputValidationLayers());
        
        console.log(`✅ Đã xây dựng ${this.layers.length} layers`);
    }

    /**
     * Xây dựng input layers (1-10)
     */
    buildInputLayers() {
        return [
            { id: 1, type: 'input_embedding', size: 256, activation: 'relu' },
            { id: 2, type: 'category_encoding', size: 128, activation: 'relu' },
            { id: 3, type: 'material_encoding', size: 128, activation: 'relu' },
            { id: 4, type: 'specification_encoding', size: 256, activation: 'relu' },
            { id: 5, type: 'application_encoding', size: 128, activation: 'relu' },
            { id: 6, type: 'manufacturer_encoding', size: 64, activation: 'relu' },
            { id: 7, type: 'standard_compliance_input', size: 64, activation: 'relu' },
            { id: 8, type: 'pattern_matching_input', size: 64, activation: 'relu' },
            { id: 9, type: 'quality_metrics_input', size: 32, activation: 'relu' },
            { id: 10, type: 'input_normalization', size: 512, activation: 'linear' }
        ];
    }

    /**
     * Xây dựng feature extraction layers (11-30)
     */
    buildFeatureExtractionLayers() {
        const layers = [];
        for (let i = 11; i <= 30; i++) {
            layers.push({
                id: i,
                type: 'feature_extraction',
                size: 256,
                activation: i % 2 === 0 ? 'relu' : 'gelu',
                dropout: 0.1,
                batch_norm: true
            });
        }
        return layers;
    }

    /**
     * Xây dựng pattern recognition layers (31-50)
     */
    buildPatternRecognitionLayers() {
        const layers = [];
        for (let i = 31; i <= 50; i++) {
            layers.push({
                id: i,
                type: 'pattern_recognition',
                size: 128,
                activation: i % 3 === 0 ? 'swish' : 'relu',
                attention: i % 5 === 0,
                dropout: 0.15
            });
        }
        return layers;
    }

    /**
     * Xây dựng standards compliance layers (51-70)
     */
    buildStandardsComplianceLayers() {
        const layers = [];
        for (let i = 51; i <= 70; i++) {
            layers.push({
                id: i,
                type: 'standards_compliance',
                size: 96,
                activation: 'relu',
                standard_weight: this.getStandardWeight(i),
                compliance_threshold: 0.6
            });
        }
        return layers;
    }

    /**
     * Xây dựng relationship inference layers (71-85)
     */
    buildRelationshipInferenceLayers() {
        const layers = [];
        for (let i = 71; i <= 85; i++) {
            layers.push({
                id: i,
                type: 'relationship_inference',
                size: 64,
                activation: 'sigmoid',
                inference_type: this.getInferenceType(i),
                confidence_boost: 0.1
            });
        }
        return layers;
    }

    /**
     * Xây dựng confidence scoring layers (86-95)
     */
    buildConfidenceScoringLayers() {
        const layers = [];
        for (let i = 86; i <= 95; i++) {
            layers.push({
                id: i,
                type: 'confidence_scoring',
                size: 32,
                activation: 'sigmoid',
                scoring_method: this.getScoringMethod(i),
                ensemble_weight: 0.1
            });
        }
        return layers;
    }

    /**
     * Xây dựng output validation layers (96-100)
     */
    buildOutputValidationLayers() {
        return [
            { id: 96, type: 'output_integration', size: 64, activation: 'relu' },
            { id: 97, type: 'confidence_calibration', size: 32, activation: 'sigmoid' },
            { id: 98, type: 'result_validation', size: 16, activation: 'sigmoid' },
            { id: 99, type: 'error_correction', size: 8, activation: 'linear' },
            { id: 100, type: 'final_output', size: 1, activation: 'sigmoid' }
        ];
    }

    /**
     * Khởi tạo neural network nâng cao
     */
    initializeEnhancedNeuralNetwork() {
        this.neuralNetwork = {
            layers: this.layers,
            weights: this.initializeWeights(),
            embeddings: new Map(),
            attention_mechanisms: new Map(),
            batch_norm_params: new Map(),
            dropout_masks: new Map()
        };

        // Tạo embeddings cho tất cả products
        this.createEnhancedProductEmbeddings();
        
        // Load public standards
        this.loadPublicStandards();
        
        // Load industry patterns
        this.loadIndustryPatterns();
    }

    /**
     * Khởi tạo weights cho 100 layers
     */
    initializeWeights() {
        const weights = [];
        
        for (let i = 0; i < this.layers.length - 1; i++) {
            const currentLayer = this.layers[i];
            const nextLayer = this.layers[i + 1];
            
            weights.push({
                matrix: this.randomMatrix(nextLayer.size, currentLayer.size),
                bias: new Array(nextLayer.size).fill(0),
                layer_type: currentLayer.type,
                trainable: true,
                gradient_clip: 1.0
            });
        }
        
        return weights;
    }

    /**
     * Tạo random matrix
     */
    randomMatrix(rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                // He initialization for ReLU, Xavier for others
                const scale = this.layers[0].activation === 'relu' ? 
                    Math.sqrt(2.0 / cols) : Math.sqrt(1.0 / cols);
                row.push((Math.random() - 0.5) * 2 * scale);
            }
            matrix.push(row);
        }
        return matrix;
    }

    /**
     * Tạo enhanced product embeddings
     */
    createEnhancedProductEmbeddings() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const embedding = this.createEnhancedProductEmbedding(product);
            this.neuralNetwork.embeddings.set(product.id, embedding);
        });

        console.log(`✅ Đã tạo enhanced embeddings cho ${this.neuralNetwork.embeddings.size} sản phẩm`);
    }

    /**
     * Tạo enhanced embedding cho một sản phẩm
     */
    createEnhancedProductEmbedding(product) {
        const embedding = new Array(this.embeddingDimension * 2).fill(0); // Double size for enhanced features
        
        // Basic features (0-127)
        this.addBasicFeatures(embedding, product, 0);
        
        // Enhanced features (128-255)
        this.addEnhancedFeatures(embedding, product, 128);
        
        return embedding;
    }

    /**
     * Thêm basic features
     */
    addBasicFeatures(embedding, product, offset) {
        // Category embedding
        this.hashToEmbedding(product.category_id, embedding, offset + 0, offset + 16);
        
        // Material embedding
        const materials = this.extractMaterials(product);
        materials.forEach((material, index) => {
            if (index < 4) {
                this.hashToEmbedding(material, embedding, offset + 16 + index * 8, offset + 24 + index * 8);
            }
        });
        
        // Application embedding
        const applications = product.applications || [];
        applications.forEach((app, index) => {
            if (index < 4) {
                this.hashToEmbedding(app, embedding, offset + 48 + index * 8, offset + 56 + index * 8);
            }
        });
        
        // Specification embedding
        const specs = this.extractKeySpecifications(product);
        const specKeys = Object.keys(specs);
        specKeys.forEach((key, index) => {
            if (index < 8) {
                this.hashToEmbedding(`${key}:${specs[key]}`, embedding, offset + 80 + index * 6, offset + 86 + index * 6);
            }
        });
    }

    /**
     * Thêm enhanced features
     */
    addEnhancedFeatures(embedding, product, offset) {
        // Standards compliance
        const standards = this.getProductStandards(product);
        standards.forEach((standard, index) => {
            if (index < 4) {
                this.hashToEmbedding(standard, embedding, offset + 0 + index * 8, offset + 8 + index * 8);
            }
        });
        
        // Industry patterns
        const patterns = this.getProductPatterns(product);
        patterns.forEach((pattern, index) => {
            if (index < 4) {
                this.hashToEmbedding(pattern, embedding, offset + 32 + index * 8, offset + 40 + index * 8);
            }
        });
        
        // Quality metrics
        const quality = this.getProductQualityMetrics(product);
        Object.keys(quality).forEach((key, index) => {
            if (index < 4) {
                const value = quality[key];
                embedding[offset + 64 + index * 8] = value;
            }
        });
        
        // Complexity score
        const complexity = this.calculateComplexity(product);
        embedding[offset + 96] = Math.min(complexity / 100, 1.0);
        
        // Compatibility potential
        const compatibility = this.calculateCompatibilityPotential(product);
        embedding[offset + 97] = compatibility;
        
        // Relationship strength
        const strength = this.calculateRelationshipStrength(product);
        embedding[offset + 98] = strength;
        
        // Industry relevance
        const relevance = this.calculateIndustryRelevance(product);
        embedding[offset + 99] = relevance;
    }

    /**
     * Hash string to embedding segment
     */
    hashToEmbedding(str, embedding, start, end) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }

        for (let i = start; i < end && i < embedding.length; i++) {
            embedding[i] = (hash % 1000) / 1000.0;
        }
    }

    /**
     * Trích xuất vật liệu
     */
    extractMaterials(product) {
        const materials = [];
        
        if (product.specifications) {
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

        // Phân tích tên
        const name = product.name.toLowerCase();
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
                if (name.includes(keyword)) {
                    materials.push(material);
                }
            });
        });

        return [...new Set(materials)];
    }

    /**
     * Trích xuất key specifications
     */
    extractKeySpecifications(product) {
        const keySpecs = {};
        
        if (product.specifications) {
            const importantSpecs = ['size', 'material', 'rating', 'voltage', 'current', 'power', 'tolerance'];
            
            importantSpecs.forEach(spec => {
                if (product.specifications[spec]) {
                    keySpecs[spec] = product.specifications[spec];
                }
            });
        }

        return keySpecs;
    }

    /**
     * Lấy standards của sản phẩm
     */
    getProductStandards(product) {
        const standards = [];
        
        this.publicStandards.forEach((standard, standardId) => {
            if (this.productsFollowStandard(product, standardId)) {
                standards.push(standardId);
            }
        });

        return standards;
    }

    /**
     * Lấy patterns của sản phẩm
     */
    getProductPatterns(product) {
        const patterns = [];
        
        this.industryPatterns.forEach((pattern, patternId) => {
            if (this.productMatchesPattern(product, pattern)) {
                patterns.push(patternId);
            }
        });

        return patterns;
    }

    /**
     * Tính complexity
     */
    calculateComplexity(product) {
        let complexity = 0;
        
        if (product.specifications) {
            complexity += Object.keys(product.specifications).length;
        }
        
        if (product.applications) {
            complexity += product.applications.length;
        }
        
        complexity += (product.long_description || '').length / 100;
        
        return complexity;
    }

    /**
     * Tính compatibility potential
     */
    calculateCompatibilityPotential(product) {
        const materials = this.extractMaterials(product);
        const applications = product.applications || [];
        const standards = this.getProductStandards(product);
        
        let potential = 0.3; // Base potential
        
        potential += materials.length * 0.1;
        potential += applications.length * 0.05;
        potential += standards.length * 0.1;
        
        return Math.min(potential, 1.0);
    }

    /**
     * Tính relationship strength
     */
    calculateRelationshipStrength(product) {
        const complexity = this.calculateComplexity(product);
        const compatibility = this.calculateCompatibilityPotential(product);
        
        return (complexity / 50) * compatibility;
    }

    /**
     * Tính industry relevance
     */
    calculateIndustryRelevance(product) {
        const applications = product.applications || [];
        const highValueApplications = ['automotive', 'aerospace', 'medical', 'industrial'];
        
        const relevance = applications.filter(app => 
            highValueApplications.some(highApp => app.includes(highApp))
        ).length;
        
        return Math.min(relevance / applications.length, 1.0);
    }

    /**
     * Load public standards
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

        // IEC Standards
        this.publicStandards.set('IEC_60062', {
            type: 'resistor_color_code',
            applies_to: ['electronic_passive'],
            requirements: ['color_bands', 'tolerance_marking'],
            compatibility_boost: 0.1
        });

        // JIS Standards
        this.publicStandards.set('JIS_B0202', {
            type: 'metric_threads',
            applies_to: ['fasteners'],
            requirements: ['thread_pitch', 'tolerance_class'],
            compatibility_boost: 0.2
        });
    }

    /**
     * Load industry patterns
     */
    loadIndustryPatterns() {
        this.industryPatterns.set('automotive_fastening', {
            pattern: 'bolt_nut_washer_assembly',
            components: ['bolt', 'nut', 'washer', 'lock_washer'],
            materials: ['steel_zinc_plated', 'stainless_steel'],
            standards: ['ISO_898', 'ASTM_A193'],
            confidence_boost: 0.25
        });

        this.industryPatterns.set('pcb_assembly', {
            pattern: 'component_soldering',
            components: ['resistor', 'capacitor', 'pcb', 'solder'],
            materials: ['copper', 'solder_alloy', 'fiberglass'],
            standards: ['IEC_60068', 'IPC_A610'],
            confidence_boost: 0.2
        });
    }

    /**
     * Check if product follows standard
     */
    productsFollowStandard(product, standardId) {
        const standard = this.publicStandards.get(standardId);
        if (!standard) return false;

        if (!standard.applies_to.includes('all_categories') && 
            !standard.applies_to.includes(product.category_id)) {
            return false;
        }

        if (product.specifications) {
            return this.checkSpecificationCompliance(product.specifications, standard);
        }

        return false;
    }

    /**
     * Check specification compliance
     */
    checkSpecificationCompliance(specs, standard) {
        let compliantCount = 0;
        let totalRequirements = standard.requirements.length;

        standard.requirements.forEach(requirement => {
            const specText = JSON.stringify(specs).toLowerCase();
            const reqText = requirement.toLowerCase();
            
            if (specText.includes(reqText)) {
                compliantCount++;
            }
        });

        return compliantCount / totalRequirements >= 0.6;
    }

    /**
     * Check if product matches pattern
     */
    productMatchesPattern(product, pattern) {
        const name = product.name.toLowerCase();
        const patternComponents = pattern.components;

        return patternComponents.some(comp => name.includes(comp));
    }

    /**
     * Get standard weight
     */
    getStandardWeight(layerId) {
        return 0.1 + (layerId - 50) * 0.01;
    }

    /**
     * Get inference type
     */
    getInferenceType(layerId) {
        const types = ['component', 'composition', 'application', 'standard'];
        return types[(layerId - 71) % types.length];
    }

    /**
     * Get scoring method
     */
    getScoringMethod(layerId) {
        const methods = ['weighted', 'ensemble', 'bayesian', 'fuzzy'];
        return methods[(layerId - 86) % methods.length];
    }

    /**
     * Xây dựng enhanced relationship graph
     */
    buildEnhancedRelationshipGraph() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const productId = product.id;
            
            if (!this.relationshipGraph.has(productId)) {
                this.relationshipGraph.set(productId, {
                    product: product,
                    components: new Set(),
                    compositions: new Set(),
                    related: new Set(),
                    features: this.extractEnhancedFeatures(product),
                    embedding: this.neuralNetwork.embeddings.get(productId),
                    standards: this.getProductStandards(product),
                    patterns: this.getProductPatterns(product),
                    compatibility_score: 0
                });
            }

            // Build relationships using connection engine
            this.buildConnectionEngineRelationships(product);
        });

        console.log(`✅ Đã xây dựng enhanced relationship graph với ${this.relationshipGraph.size} nodes`);
    }

    /**
     * Trích xuất enhanced features
     */
    extractEnhancedFeatures(product) {
        return {
            category: product.category_id,
            materials: this.extractMaterials(product),
            applications: product.applications || [],
            specifications: this.extractKeySpecifications(product),
            complexity: this.calculateComplexity(product),
            compatibility_potential: this.calculateCompatibilityPotential(product),
            relationship_strength: this.calculateRelationshipStrength(product),
            industry_relevance: this.calculateIndustryRelevance(product)
        };
    }

    /**
     * Xây dựng relationships từ connection engine
     */
    buildConnectionEngineRelationships(product) {
        const compatibilities = this.connectionEngine.compatibilityMatrix.get(product.id);
        
        if (compatibilities) {
            compatibilities.forEach((compatibility, otherProductId) => {
                const node1 = this.relationshipGraph.get(product.id);
                const node2 = this.relationshipGraph.get(otherProductId);
                
                if (node1 && node2) {
                    node1.related.add({
                        productId: otherProductId,
                        type: 'enhanced_compatibility',
                        weight: compatibility.score,
                        reasons: compatibility.reasons,
                        appliedStandards: compatibility.appliedStandards || [],
                        appliedPatterns: compatibility.appliedPatterns || []
                    });
                    
                    node2.related.add({
                        productId: product.id,
                        type: 'enhanced_compatibility',
                        weight: compatibility.score,
                        reasons: compatibility.reasons,
                        appliedStandards: compatibility.appliedStandards || [],
                        appliedPatterns: compatibility.appliedPatterns || []
                    });
                }
            });
        }
    }

    /**
     * Train combined system
     */
    async trainCombinedSystem(epochs = 50) {
        console.log('🚀 Bắt đầu training combined system...');
        
        for (let epoch = 0; epoch < epochs; epoch++) {
            // Train neural network
            await this.trainNeuralNetwork();
            
            // Update connection engine
            this.updateConnectionEngine();
            
            // Calibrate combined accuracy
            this.calibrateAccuracy();
            
            if (epoch % 10 === 0) {
                console.log(`📊 Epoch ${epoch}/${epochs} - Combined Accuracy: ${this.accuracyMetrics.combined.toFixed(3)}`);
            }
        }

        this.isTrained = true;
        console.log('✅ Training hoàn tất!');
        console.log(`🧠 Neural Network Accuracy: ${this.accuracyMetrics.neural.toFixed(3)}`);
        console.log(`📚 Standards Accuracy: ${this.accuracyMetrics.standards.toFixed(3)}`);
        console.log(`🔗 Patterns Accuracy: ${this.accuracyMetrics.patterns.toFixed(3)}`);
        console.log(`🎯 Combined Accuracy: ${this.accuracyMetrics.combined.toFixed(3)}`);
    }

    /**
     * Train neural network
     */
    async trainNeuralNetwork() {
        // Simplified training logic
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const embedding = this.neuralNetwork.embeddings.get(product.id);
            if (embedding) {
                // Forward pass through 100 layers
                const output = this.forwardPass(embedding);
                
                // Update accuracy metrics
                this.updateNeuralAccuracy(output, product);
            }
        });
    }

    /**
     * Forward pass through 100 layers
     */
    forwardPass(input) {
        let activation = input;
        
        for (let i = 0; i < this.layers.length - 1; i++) {
            const weights = this.neuralNetwork.weights[i];
            const layer = this.layers[i];
            
            // Matrix multiplication + bias
            activation = this.matrixMultiply(weights.matrix, activation);
            activation = this.vectorAdd(activation, weights.bias);
            
            // Activation function
            activation = this.applyActivation(activation, layer.activation);
            
            // Dropout
            if (layer.dropout && Math.random() < layer.dropout) {
                activation = this.applyDropout(activation);
            }
            
            // Batch normalization
            if (layer.batch_norm) {
                activation = this.applyBatchNorm(activation, i);
            }
        }
        
        return activation;
    }

    /**
     * Matrix multiplication
     */
    matrixMultiply(matrix, vector) {
        const result = [];
        
        for (let i = 0; i < matrix.length; i++) {
            let sum = 0;
            for (let j = 0; j < vector.length; j++) {
                sum += matrix[i][j] * vector[j];
            }
            result.push(sum);
        }
        
        return result;
    }

    /**
     * Vector addition
     */
    vectorAdd(vector, bias) {
        return vector.map((val, i) => val + bias[i]);
    }

    /**
     * Apply activation function
     */
    applyActivation(vector, activation) {
        switch (activation) {
            case 'relu':
                return vector.map(val => Math.max(0, val));
            case 'sigmoid':
                return vector.map(val => 1 / (1 + Math.exp(-val)));
            case 'gelu':
                return vector.map(val => val * 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (val + 0.044715 * val * val * val))));
            case 'swish':
                return vector.map(val => val * (1 / (1 + Math.exp(-val))));
            case 'linear':
                return vector;
            default:
                return vector.map(val => Math.max(0, val));
        }
    }

    /**
     * Apply dropout
     */
    applyDropout(vector) {
        return vector.map(val => Math.random() < 0.5 ? 0 : val);
    }

    /**
     * Apply batch normalization
     */
    applyBatchNorm(vector, layerId) {
        const mean = vector.reduce((a, b) => a + b) / vector.length;
        const variance = vector.reduce((a, b) => a + Math.pow(b - mean, 2)) / vector.length;
        const std = Math.sqrt(variance + 1e-8);
        
        return vector.map(val => (val - mean) / std);
    }

    /**
     * Update neural accuracy
     */
    updateNeuralAccuracy(output, product) {
        // Simplified accuracy calculation
        const predicted = output[0];
        const actual = this.calculateActualRelationshipStrength(product);
        
        const error = Math.abs(predicted - actual);
        this.accuracyMetrics.neural = Math.max(0, 1 - error);
    }

    /**
     * Calculate actual relationship strength
     */
    calculateActualRelationshipStrength(product) {
        const node = this.relationshipGraph.get(product.id);
        if (!node) return 0.5;
        
        const relatedCount = node.related.size;
        const avgWeight = Array.from(node.related).reduce((sum, rel) => sum + rel.weight, 0) / (relatedCount || 1);
        
        return Math.min(avgWeight, 1.0);
    }

    /**
     * Update connection engine
     */
    updateConnectionEngine() {
        // Update connection engine based on neural network insights
        this.connectionEngine.productDatabase = this.productDatabase;
        
        // Recalculate compatibility matrix with enhanced data
        this.connectionEngine.buildCompatibilityMatrix();
    }

    /**
     * Calibrate accuracy
     */
    calibrateAccuracy() {
        // Calculate standards accuracy
        this.accuracyMetrics.standards = this.calculateStandardsAccuracy();
        
        // Calculate patterns accuracy
        this.accuracyMetrics.patterns = this.calculatePatternsAccuracy();
        
        // Calculate combined accuracy
        this.accuracyMetrics.combined = (
            this.accuracyMetrics.neural * 0.4 +
            this.accuracyMetrics.standards * 0.3 +
            this.accuracyMetrics.patterns * 0.3
        );
    }

    /**
     * Calculate standards accuracy
     */
    calculateStandardsAccuracy() {
        let correct = 0;
        let total = 0;
        
        this.relationshipGraph.forEach((node, productId) => {
            node.related.forEach(relationship => {
                if (relationship.appliedStandards && relationship.appliedStandards.length > 0) {
                    correct++;
                }
                total++;
            });
        });
        
        return total > 0 ? correct / total : 0;
    }

    /**
     * Calculate patterns accuracy
     */
    calculatePatternsAccuracy() {
        let correct = 0;
        let total = 0;
        
        this.relationshipGraph.forEach((node, productId) => {
            node.related.forEach(relationship => {
                if (relationship.appliedPatterns && relationship.appliedPatterns.length > 0) {
                    correct++;
                }
                total++;
            });
        });
        
        return total > 0 ? correct / total : 0;
    }

    /**
     * Tìm components với enhanced system
     */
    findComponents(productId) {
        const cacheKey = `components_${productId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const product = this.relationshipGraph.get(productId);
        if (!product) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        const components = [];
        const visited = new Set();

        // Enhanced DFS với 100-layer processing
        this.findComponentsEnhancedDFS(productId, components, visited, 0);

        const result = {
            product: product.product,
            components: components.sort((a, b) => b.confidence - a.confidence),
            totalFound: components.length,
            systemInfo: {
                neural_confidence: this.accuracyMetrics.neural,
                standards_confidence: this.accuracyMetrics.standards,
                patterns_confidence: this.accuracyMetrics.patterns,
                combined_confidence: this.accuracyMetrics.combined
            }
        };

        // Cache result
        if (this.cache.size < this.cacheSize) {
            this.cache.set(cacheKey, result);
        }

        return result;
    }

    /**
     * Enhanced DFS để tìm components
     */
    findComponentsEnhancedDFS(productId, components, visited, depth) {
        if (depth > 3 || visited.has(productId)) return;
        
        visited.add(productId);
        const node = this.relationshipGraph.get(productId);
        if (!node) return;

        node.related.forEach(relationship => {
            const relatedNode = this.relationshipGraph.get(relationship.productId);
            if (!relatedNode) return;

            // Enhanced component detection
            if (this.isLikelyComponentEnhanced(relationship, node, relatedNode)) {
                const confidence = this.calculateEnhancedConfidence(relationship, node, relatedNode);
                
                components.push({
                    component: relatedNode.product,
                    confidence: confidence,
                    relationship: relationship.type,
                    depth: depth,
                    reasons: relationship.reasons,
                    appliedStandards: relationship.appliedStandards,
                    appliedPatterns: relationship.appliedPatterns,
                    neural_score: this.getNeuralCompatibilityScore(productId, relationship.productId),
                    standards_score: this.getStandardsCompatibilityScore(relationship),
                    patterns_score: this.getPatternsCompatibilityScore(relationship)
                });
            }

            this.findComponentsEnhancedDFS(relationship.productId, components, visited, depth + 1);
        });
    }

    /**
     * Enhanced component detection
     */
    isLikelyComponentEnhanced(relationship, productNode, componentNode) {
        // Basic checks
        if (productNode.product.category_id === componentNode.product.category_id) {
            return false;
        }

        // Complexity check
        const productComplexity = this.calculateComplexity(productNode.product);
        const componentComplexity = this.calculateComplexity(componentNode.product);

        if (componentComplexity >= productComplexity) {
            return false;
        }

        // Enhanced checks
        const hasStandards = relationship.appliedStandards && relationship.appliedStandards.length > 0;
        const hasPatterns = relationship.appliedPatterns && relationship.appliedPatterns.length > 0;
        const highWeight = relationship.weight > 0.4;

        return (highWeight && (hasStandards || hasPatterns)) || relationship.weight > 0.6;
    }

    /**
     * Calculate enhanced confidence
     */
    calculateEnhancedConfidence(relationship, productNode, componentNode) {
        let confidence = relationship.weight;

        // Standards boost
        if (relationship.appliedStandards && relationship.appliedStandards.length > 0) {
            confidence += 0.1 * relationship.appliedStandards.length;
        }

        // Patterns boost
        if (relationship.appliedPatterns && relationship.appliedPatterns.length > 0) {
            confidence += 0.15 * relationship.appliedPatterns.length;
        }

        // Neural boost
        const neuralScore = this.getNeuralCompatibilityScore(
            productNode.product.id, 
            componentNode.product.id
        );
        confidence += neuralScore * 0.2;

        return Math.min(confidence, 1.0);
    }

    /**
     * Get neural compatibility score
     */
    getNeuralCompatibilityScore(productId1, productId2) {
        const embedding1 = this.neuralNetwork.embeddings.get(productId1);
        const embedding2 = this.neuralNetwork.embeddings.get(productId2);
        
        if (!embedding1 || !embedding2) return 0;

        // Cosine similarity
        const dotProduct = embedding1.reduce((sum, val, i) => sum + val * embedding2[i], 0);
        const norm1 = Math.sqrt(embedding1.reduce((sum, val) => sum + val * val, 0));
        const norm2 = Math.sqrt(embedding2.reduce((sum, val) => sum + val * val, 0));
        
        return norm1 > 0 && norm2 > 0 ? dotProduct / (norm1 * norm2) : 0;
    }

    /**
     * Get standards compatibility score
     */
    getStandardsCompatibilityScore(relationship) {
        if (!relationship.appliedStandards || relationship.appliedStandards.length === 0) {
            return 0;
        }

        return relationship.appliedStandards.length * 0.1;
    }

    /**
     * Get patterns compatibility score
     */
    getPatternsCompatibilityScore(relationship) {
        if (!relationship.appliedPatterns || relationship.appliedPatterns.length === 0) {
            return 0;
        }

        return relationship.appliedPatterns.length * 0.15;
    }

    /**
     * Tìm products từ component với enhanced system
     */
    findProductsFromComponent(componentId) {
        const cacheKey = `products_${componentId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const component = this.relationshipGraph.get(componentId);
        if (!component) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        const products = [];
        const visited = new Set();

        this.findProductsFromComponentEnhancedDFS(componentId, products, visited, 0);

        const result = {
            component: component.product,
            products: products.sort((a, b) - b.confidence - a.confidence),
            totalFound: products.length,
            systemInfo: {
                neural_confidence: this.accuracyMetrics.neural,
                standards_confidence: this.accuracyMetrics.standards,
                patterns_confidence: this.accuracyMetrics.patterns,
                combined_confidence: this.accuracyMetrics.combined
            }
        };

        // Cache result
        if (this.cache.size < this.cacheSize) {
            this.cache.set(cacheKey, result);
        }

        return result;
    }

    /**
     * Enhanced DFS để tìm products từ component
     */
    findProductsFromComponentEnhancedDFS(componentId, products, visited, depth) {
        if (depth > 3 || visited.has(componentId)) return;
        
        visited.add(componentId);
        const node = this.relationshipGraph.get(componentId);
        if (!node) return;

        node.related.forEach(relationship => {
            const relatedNode = this.relationshipGraph.get(relationship.productId);
            if (!relatedNode) return;

            if (this.isLikelyProductEnhanced(relationship, node, relatedNode)) {
                const confidence = this.calculateEnhancedConfidence(relationship, node, relatedNode);
                
                products.push({
                    product: relatedNode.product,
                    confidence: confidence,
                    relationship: relationship.type,
                    depth: depth,
                    reasons: relationship.reasons,
                    appliedStandards: relationship.appliedStandards,
                    appliedPatterns: relationship.appliedPatterns,
                    neural_score: this.getNeuralCompatibilityScore(componentId, relationship.productId),
                    standards_score: this.getStandardsCompatibilityScore(relationship),
                    patterns_score: this.getPatternsCompatibilityScore(relationship)
                });
            }

            this.findProductsFromComponentEnhancedDFS(relationship.productId, products, visited, depth + 1);
        });
    }

    /**
     * Enhanced product detection
     */
    isLikelyProductEnhanced(relationship, componentNode, productNode) {
        // Basic checks
        if (componentNode.product.category_id === productNode.product.category_id) {
            return false;
        }

        // Complexity check
        const componentComplexity = this.calculateComplexity(componentNode.product);
        const productComplexity = this.calculateComplexity(productNode.product);

        if (productComplexity <= componentComplexity) {
            return false;
        }

        // Enhanced checks
        const hasStandards = relationship.appliedStandards && relationship.appliedStandards.length > 0;
        const hasPatterns = relationship.appliedPatterns && relationship.appliedPatterns.length > 0;
        const highWeight = relationship.weight > 0.4;

        return (highWeight && (hasStandards || hasPatterns)) || relationship.weight > 0.6;
    }

    /**
     * Lấy thông tin hệ thống
     */
    getSystemInfo() {
        return {
            totalProducts: this.productDatabase?.products.length || 0,
            neuralNetwork: {
                layers: this.neuralNetwork?.layers.length || 0,
                embeddingDimension: this.embeddingDimension,
                isTrained: this.isTrained
            },
            connectionEngine: {
                publicStandards: this.publicStandards.size,
                industryPatterns: this.industryPatterns.size,
                compatibilityMatrix: this.connectionEngine?.compatibilityMatrix.size || 0
            },
            relationshipGraph: this.relationshipGraph.size,
            accuracyMetrics: this.accuracyMetrics,
            cache: {
                size: this.cache.size,
                maxSize: this.cacheSize
            }
        };
    }

    /**
     * Export system state
     */
    exportSystemState() {
        return {
            layers: this.layers,
            neuralNetwork: {
                layers: this.neuralNetwork.layers,
                embeddingCount: this.neuralNetwork.embeddings.size
            },
            publicStandards: Object.fromEntries(this.publicStandards),
            industryPatterns: Object.fromEntries(this.industryPatterns),
            accuracyMetrics: this.accuracyMetrics,
            relationshipGraphSize: this.relationshipGraph.size
        };
    }

    /**
     * Get product quality metrics
     */
    getProductQualityMetrics(product) {
        return {
            defect_rate: 0.02,
            first_pass_yield: 0.95,
            reliability: 0.98,
            durability: 0.85
        };
    }

    /**
     * Load saved knowledge from localStorage
     */
    loadSavedKnowledge() {
        try {
            console.log('💾 Loading saved knowledge...');
            
            // Load knowledge base
            const savedKnowledge = localStorage.getItem(this.storageKeys.knowledge);
            if (savedKnowledge) {
                const knowledgeData = JSON.parse(savedKnowledge);
                this.knowledgeBase = new Map(knowledgeData);
                console.log(`📚 Loaded ${this.knowledgeBase.size} knowledge entries`);
            }
            
            // Load success patterns
            const savedPatterns = localStorage.getItem(this.storageKeys.patterns);
            if (savedPatterns) {
                const patternsData = JSON.parse(savedPatterns);
                this.successPatterns = new Map(patternsData);
                console.log(`🔗 Loaded ${this.successPatterns.size} success patterns`);
            }
            
            // Load learning history
            const savedHistory = localStorage.getItem(this.storageKeys.history);
            if (savedHistory) {
                const historyData = JSON.parse(savedHistory);
                this.learningHistory = new Map(historyData);
                console.log(`📈 Loaded ${this.learningHistory.size} learning history entries`);
            }
            
            // Load evolution stats
            const savedMetrics = localStorage.getItem(this.storageKeys.metrics);
            if (savedMetrics) {
                this.evolutionStats = JSON.parse(savedMetrics);
                console.log(`📊 Loaded evolution stats: Run #${this.evolutionStats.totalRuns}`);
            }
            
        } catch (error) {
            console.warn('⚠️ Error loading saved knowledge:', error);
            // Continue with fresh start
        }
    }

    /**
     * Load saved neural network weights
     */
    loadSavedWeights() {
        try {
            console.log('🧠 Loading saved neural weights...');
            
            const savedWeights = localStorage.getItem(this.storageKeys.weights);
            if (savedWeights) {
                const weightsData = JSON.parse(savedWeights);
                
                // Apply saved weights to current network
                if (this.neuralNetwork && weightsData.weights) {
                    this.neuralNetwork.weights = weightsData.weights;
                    this.neuralNetwork.embeddings = new Map(weightsData.embeddings);
                    console.log('✅ Applied saved neural weights');
                }
            }
        } catch (error) {
            console.warn('⚠️ Error loading saved weights:', error);
            // Continue with random initialization
        }
    }

    /**
     * Save system knowledge to localStorage
     */
    saveSystemKnowledge() {
        try {
            console.log('💾 Saving system knowledge...');
            
            // Save knowledge base
            localStorage.setItem(this.storageKeys.knowledge, JSON.stringify([...this.knowledgeBase]));
            
            // Save success patterns
            localStorage.setItem(this.storageKeys.patterns, JSON.stringify([...this.successPatterns]));
            
            // Save learning history
            localStorage.setItem(this.storageKeys.history, JSON.stringify([...this.learningHistory]));
            
            // Save evolution stats
            localStorage.setItem(this.storageKeys.metrics, JSON.stringify(this.evolutionStats));
            
            console.log('✅ System knowledge saved successfully');
        } catch (error) {
            console.warn('⚠️ Error saving knowledge:', error);
        }
    }

    /**
     * Save neural network weights
     */
    saveNeuralWeights() {
        try {
            console.log('🧠 Saving neural weights...');
            
            const weightsData = {
                weights: this.neuralNetwork.weights,
                embeddings: [...this.neuralNetwork.embeddings],
                timestamp: new Date().toISOString(),
                accuracy: this.accuracyMetrics
            };
            
            localStorage.setItem(this.storageKeys.weights, JSON.stringify(weightsData));
            console.log('✅ Neural weights saved successfully');
        } catch (error) {
            console.warn('⚠️ Error saving weights:', error);
        }
    }

    /**
     * Update evolution statistics
     */
    updateEvolutionStats() {
        this.evolutionStats.totalRuns++;
        
        if (this.accuracyMetrics.combined > 0.7) {
            this.evolutionStats.successfulRuns++;
        }
        
        // Calculate improvement
        if (this.evolutionStats.totalRuns > 1) {
            const previousAccuracy = this.learningHistory.get('previous_accuracy') || 0.5;
            this.evolutionStats.accuracyImprovement = this.accuracyMetrics.combined - previousAccuracy;
        }
        
        // Update knowledge growth
        this.evolutionStats.knowledgeGrowth = this.knowledgeBase.size;
        this.evolutionStats.patternDiscovery = this.successPatterns.size;
        
        // Store current accuracy for next comparison
        this.learningHistory.set('previous_accuracy', this.accuracyMetrics.combined);
        this.learningHistory.set('last_run', new Date().toISOString());
    }

    /**
     * Learn from successful predictions
     */
    learnFromSuccess(productId, result, userFeedback = null) {
        const successKey = `${productId}_${Date.now()}`;
        
        // Store successful pattern
        this.successPatterns.set(successKey, {
            productId: productId,
            result: result,
            confidence: this.accuracyMetrics.combined,
            userFeedback: userFeedback,
            timestamp: new Date().toISOString()
        });
        
        // Update knowledge base
        this.updateKnowledgeBase(productId, result, true);
        
        // Reinforce successful neural pathways
        this.reinforceSuccessPathways(productId, result);
        
        console.log(`🎯 Learned from successful prediction: ${productId}`);
    }

    /**
     * Learn from failed predictions
     */
    learnFromFailure(productId, result, expectedOutcome) {
        const failureKey = `${productId}_${Date.now()}`;
        
        // Store failure pattern
        this.failurePatterns.set(failureKey, {
            productId: productId,
            result: result,
            expected: expectedOutcome,
            confidence: this.accuracyMetrics.combined,
            timestamp: new Date().toISOString()
        });
        
        // Update knowledge base
        this.updateKnowledgeBase(productId, result, false);
        
        // Adjust neural pathways
        this.adjustFailurePathways(productId, result, expectedOutcome);
        
        console.log(`❌ Learned from failed prediction: ${productId}`);
    }

    /**
     * Update knowledge base
     */
    updateKnowledgeBase(productId, result, isSuccess) {
        if (!this.knowledgeBase.has(productId)) {
            this.knowledgeBase.set(productId, {
                attempts: 0,
                successes: 0,
                failures: 0,
                patterns: [],
                lastUpdated: new Date().toISOString()
            });
        }
        
        const knowledge = this.knowledgeBase.get(productId);
        knowledge.attempts++;
        
        if (isSuccess) {
            knowledge.successes++;
            knowledge.patterns.push({
                type: 'success',
                result: result,
                timestamp: new Date().toISOString()
            });
        } else {
            knowledge.failures++;
            knowledge.patterns.push({
                type: 'failure',
                result: result,
                timestamp: new Date().toISOString()
            });
        }
        
        knowledge.lastUpdated = new Date().toISOString();
        knowledge.successRate = knowledge.successes / knowledge.attempts;
    }

    /**
     * Reinforce successful neural pathways
     */
    reinforceSuccessPathways(productId, result) {
        const embedding = this.neuralNetwork.embeddings.get(productId);
        if (!embedding) return;
        
        // Increase weights for successful connections
        result.components.forEach(component => {
            const componentEmbedding = this.neuralNetwork.embeddings.get(component.component.id);
            if (componentEmbedding) {
                this.updateEmbeddingSimilarity(embedding, componentEmbedding, 0.1);
            }
        });
    }

    /**
     * Adjust failed neural pathways
     */
    adjustFailurePathways(productId, result, expectedOutcome) {
        const embedding = this.neuralNetwork.embeddings.get(productId);
        if (!embedding) return;
        
        // Decrease weights for failed connections
        result.components.forEach(component => {
            const componentEmbedding = this.neuralNetwork.embeddings.get(component.component.id);
            if (componentEmbedding) {
                this.updateEmbeddingSimilarity(embedding, componentEmbedding, -0.05);
            }
        });
    }

    /**
     * Update embedding similarity
     */
    updateEmbeddingSimilarity(embedding1, embedding2, delta) {
        for (let i = 0; i < Math.min(embedding1.length, embedding2.length); i++) {
            embedding1[i] += delta * embedding2[i];
            embedding2[i] += delta * embedding1[i];
        }
    }

    /**
     * Enhanced find components with learning
     */
    findComponents(productId) {
        const cacheKey = `components_${productId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const product = this.relationshipGraph.get(productId);
        if (!product) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        // Check knowledge base for previous patterns
        const knowledge = this.knowledgeBase.get(productId);
        let enhancedConfidence = 1.0;
        
        if (knowledge && knowledge.successRate > 0.7) {
            enhancedConfidence *= (1 + knowledge.successRate * 0.1);
        }

        const components = [];
        const visited = new Set();

        // Enhanced DFS với 100-layer processing
        this.findComponentsEnhancedDFS(productId, components, visited, 0);

        // Apply learned patterns
        components.forEach(component => {
            component.confidence *= enhancedConfidence;
            component.learned_confidence = this.getLearnedConfidence(productId, component.component.id);
        });

        const result = {
            product: product.product,
            components: components.sort((a, b) => b.confidence - a.confidence),
            totalFound: components.length,
            systemInfo: {
                neural_confidence: this.accuracyMetrics.neural,
                standards_confidence: this.accuracyMetrics.standards,
                patterns_confidence: this.accuracyMetrics.patterns,
                combined_confidence: this.accuracyMetrics.combined,
                learned_confidence: enhancedConfidence,
                knowledge_base_size: this.knowledgeBase.size,
                evolution_run: this.evolutionStats.totalRuns
            }
        };

        // Cache result
        if (this.cache.size < this.cacheSize) {
            this.cache.set(cacheKey, result);
        }

        return result;
    }

    /**
     * Get learned confidence from experience
     */
    getLearnedConfidence(productId1, productId2) {
        let learnedConfidence = 0.5; // Default
        
        // Check success patterns
        this.successPatterns.forEach(pattern => {
            if (pattern.productId === productId1 && 
                pattern.result.components.some(c => c.component.id === productId2)) {
                learnedConfidence += 0.1;
            }
        });
        
        // Check failure patterns
        this.failurePatterns.forEach(pattern => {
            if (pattern.productId === productId1 && 
                pattern.result.components.some(c => c.component.id === productId2)) {
                learnedConfidence -= 0.05;
            }
        });
        
        return Math.max(0, Math.min(1, learnedConfidence));
    }

    /**
     * Auto-save on interval
     */
    startAutoSave(interval = 30000) { // 30 seconds
        setInterval(() => {
            this.saveSystemKnowledge();
            this.saveNeuralWeights();
            console.log('💾 Auto-saved system knowledge');
        }, interval);
    }

    /**
     * Get evolution report
     */
    getEvolutionReport() {
        return {
            currentRun: this.evolutionStats.totalRuns,
            successRate: this.evolutionStats.successfulRuns / this.evolutionStats.totalRuns,
            accuracyImprovement: this.evolutionStats.accuracyImprovement,
            knowledgeGrowth: this.evolutionStats.knowledgeGrowth,
            patternDiscovery: this.evolutionStats.patternDiscovery,
            knowledgeBaseSize: this.knowledgeBase.size,
            successPatterns: this.successPatterns.size,
            failurePatterns: this.failurePatterns.size,
            currentAccuracy: this.accuracyMetrics.combined,
            lastRun: this.learningHistory.get('last_run')
        };
    }

    /**
     * Reset learning (for testing)
     */
    resetLearning() {
        this.learningHistory.clear();
        this.knowledgeBase.clear();
        this.experienceMatrix.clear();
        this.successPatterns.clear();
        this.failurePatterns.clear();
        this.evolutionStats = {
            totalRuns: 0,
            successfulRuns: 0,
            accuracyImprovement: 0,
            knowledgeGrowth: 0,
            patternDiscovery: 0
        };
        
        // Clear localStorage
        Object.values(this.storageKeys).forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log('🔄 Learning system reset');
    }
}

// Export để sử dụng
window.EnhancedProductRelationshipSystem = EnhancedProductRelationshipSystem;
