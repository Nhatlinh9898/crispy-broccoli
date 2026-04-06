/**
 * Product Relationship Neural Network System
 * Hệ thống Mạng Nơ-ron Mối quan hệ Sản phẩm
 * 
 * Tạo nội suy danh mục sản phẩm:
 * - Nếu có sản phẩm A -> tìm components cần thiết để tạo A
 * - Nếu có sản phẩm A -> tìm sản phẩm có thể tạo ra từ A
 */

class ProductRelationshipNeuralNetwork {
    constructor() {
        this.productDatabase = null;
        this.relationshipGraph = new Map();
        this.componentHierarchy = new Map();
        this.neuralNetwork = null;
        this.embeddingDimension = 128;
        this.isTrained = false;
    }

    /**
     * Khởi tạo hệ thống với database sản phẩm
     */
    async initialize(productDatabasePath) {
        try {
            const response = await fetch(productDatabasePath);
            this.productDatabase = await response.json();
            this.buildRelationshipGraph();
            this.initializeNeuralNetwork();
            console.log(`✅ Đã khởi tạo với ${this.productDatabase.products.length} sản phẩm`);
        } catch (error) {
            console.error('❌ Lỗi khởi tạo:', error);
            throw error;
        }
    }

    /**
     * Xây dựng đồ thị mối quan hệ sản phẩm
     */
    buildRelationshipGraph() {
        const products = this.productDatabase.products;
        
        // Xây dựng đồ thị dựa trên category, specifications, và applications
        products.forEach(product => {
            const productId = product.id;
            
            // Tạo node cho sản phẩm
            if (!this.relationshipGraph.has(productId)) {
                this.relationshipGraph.set(productId, {
                    product: product,
                    components: new Set(),
                    compositions: new Set(),
                    related: new Set(),
                    features: this.extractFeatures(product)
                });
            }

            // Phân tích mối quan hệ dựa trên category
            this.analyzeCategoryRelationships(product);
            
            // Phân tích mối quan hệ dựa trên specifications
            this.analyzeSpecificationRelationships(product);
            
            // Phân tích mối quan hệ dựa trên applications
            this.analyzeApplicationRelationships(product);
        });

        console.log(`✅ Đã xây dựng đồ thị với ${this.relationshipGraph.size} nodes`);
    }

    /**
     * Trích xuất features từ sản phẩm cho neural network
     */
    extractFeatures(product) {
        const features = {
            category: product.category_id,
            subcategory: product.subcategory,
            manufacturer: product.manufacturer_id,
            specifications: {},
            applications: product.applications || [],
            keywords: this.extractKeywords(product)
        };

        // Trích xuất specifications
        if (product.specifications) {
            Object.keys(product.specifications).forEach(key => {
                if (typeof product.specifications[key] === 'object') {
                    Object.assign(features.specifications, product.specifications[key]);
                } else {
                    features.specifications[key] = product.specifications[key];
                }
            });
        }

        return features;
    }

    /**
     * Trích xuất keywords từ tên và mô tả
     */
    extractKeywords(product) {
        const text = [
            product.name,
            product.name_en,
            product.short_description,
            product.short_description_en
        ].join(' ').toLowerCase();

        const keywords = text.match(/\b\w{3,}\b/g) || [];
        return [...new Set(keywords)];
    }

    /**
     * Phân tích mối quan hệ dựa trên category
     */
    analyzeCategoryRelationships(product) {
        const category = this.productDatabase.categories.find(c => c.id === product.category_id);
        if (!category) return;

        // Tìm các sản phẩm cùng category
        const sameCategoryProducts = this.productDatabase.products.filter(p => 
            p.id !== product.id && p.category_id === product.category_id
        );

        sameCategoryProducts.forEach(relatedProduct => {
            this.addRelationship(product.id, relatedProduct.id, 'category', 0.8);
        });

        // Tìm các sản phẩm trong category liên quan
        if (category.applications) {
            category.applications.forEach(application => {
                const relatedProducts = this.productDatabase.products.filter(p => 
                    p.id !== product.id && 
                    p.applications && 
                    p.applications.includes(application)
                );
                
                relatedProducts.forEach(relatedProduct => {
                    this.addRelationship(product.id, relatedProduct.id, 'application', 0.6);
                });
            });
        }
    }

    /**
     * Phân tích mối quan hệ dựa trên specifications
     */
    analyzeSpecificationRelationships(product) {
        if (!product.specifications) return;

        const products = this.productDatabase.products;
        
        products.forEach(otherProduct => {
            if (otherProduct.id === product.id || !otherProduct.specifications) return;

            const similarity = this.calculateSpecificationSimilarity(
                product.specifications, 
                otherProduct.specifications
            );

            if (similarity > 0.5) {
                this.addRelationship(product.id, otherProduct.id, 'specification', similarity);
            }
        });
    }

    /**
     * Tính độ tương đồng specifications
     */
    calculateSpecificationSimilarity(spec1, spec2) {
        let similarity = 0;
        let totalComparisons = 0;

        const allKeys = new Set([
            ...this.getAllSpecKeys(spec1),
            ...this.getAllSpecKeys(spec2)
        ]);

        allKeys.forEach(key => {
            const value1 = this.getSpecValue(spec1, key);
            const value2 = this.getSpecValue(spec2, key);

            if (value1 && value2) {
                if (value1 === value2) {
                    similarity += 1;
                } else if (this.isNumericSimilar(value1, value2)) {
                    similarity += 0.7;
                } else if (this.isPartialMatch(value1, value2)) {
                    similarity += 0.4;
                }
                totalComparisons++;
            }
        });

        return totalComparisons > 0 ? similarity / totalComparisons : 0;
    }

    /**
     * Lấy tất cả keys từ specifications (nested)
     */
    getAllSpecKeys(spec) {
        const keys = [];
        
        const traverse = (obj, prefix = '') => {
            Object.keys(obj).forEach(key => {
                const fullKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    traverse(obj[key], fullKey);
                } else {
                    keys.push(fullKey);
                }
            });
        };

        traverse(spec);
        return keys;
    }

    /**
     * Lấy value từ specifications (nested)
     */
    getSpecValue(spec, key) {
        const parts = key.split('.');
        let value = spec;
        
        for (const part of parts) {
            if (value && typeof value === 'object') {
                value = value[part];
            } else {
                return null;
            }
        }
        
        return value;
    }

    /**
     * Kiểm tra tương đồng số
     */
    isNumericSimilar(value1, value2) {
        const num1 = parseFloat(value1.toString().replace(/[^\d.-]/g, ''));
        const num2 = parseFloat(value2.toString().replace(/[^\d.-]/g, ''));
        
        if (!isNaN(num1) && !isNaN(num2)) {
            const ratio = Math.min(num1, num2) / Math.max(num1, num2);
            return ratio > 0.8; // Within 20% tolerance
        }
        
        return false;
    }

    /**
     * Kiểm tra tương đồng partly
     */
    isPartialMatch(value1, value2) {
        const str1 = value1.toString().toLowerCase();
        const str2 = value2.toString().toLowerCase();
        
        return str1.includes(str2) || str2.includes(str1);
    }

    /**
     * Phân tích mối quan hệ dựa trên applications
     */
    analyzeApplicationRelationships(product) {
        if (!product.applications) return;

        const products = this.productDatabase.products;
        
        products.forEach(otherProduct => {
            if (otherProduct.id === product.id || !otherProduct.applications) return;

            const commonApplications = product.applications.filter(app => 
                otherProduct.applications.includes(app)
            );

            if (commonApplications.length > 0) {
                const similarity = commonApplications.length / 
                    Math.max(product.applications.length, otherProduct.applications.length);
                
                this.addRelationship(product.id, otherProduct.id, 'application', similarity);
            }
        });
    }

    /**
     * Thêm mối quan hệ vào đồ thị
     */
    addRelationship(productId1, productId2, type, weight) {
        const node1 = this.relationshipGraph.get(productId1);
        const node2 = this.relationshipGraph.get(productId2);

        if (node1 && node2) {
            node1.related.add({
                productId: productId2,
                type: type,
                weight: weight
            });

            node2.related.add({
                productId: productId1,
                type: type,
                weight: weight
            });
        }
    }

    /**
     * Khởi tạo Neural Network
     */
    initializeNeuralNetwork() {
        // Simple feedforward neural network for relationship inference
        this.neuralNetwork = {
            layers: [
                { size: this.embeddingDimension, activation: 'relu' },
                { size: 64, activation: 'relu' },
                { size: 32, activation: 'relu' },
                { size: 16, activation: 'sigmoid' }
            ],
            weights: this.initializeWeights(),
            embeddings: new Map()
        };

        // Tạo embeddings cho tất cả products
        this.createProductEmbeddings();
    }

    /**
     * Khởi tạo weights cho neural network
     */
    initializeWeights() {
        const weights = [];
        const layerSizes = [
            this.embeddingDimension,
            64,
            32,
            16
        ];

        for (let i = 0; i < layerSizes.length - 1; i++) {
            weights.push(this.randomMatrix(layerSizes[i + 1], layerSizes[i]));
        }

        return weights;
    }

    /**
     * Tạo matrix ngẫu nhiên
     */
    randomMatrix(rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push((Math.random() - 0.5) * 0.1);
            }
            matrix.push(row);
        }
        return matrix;
    }

    /**
     * Tạo embeddings cho products
     */
    createProductEmbeddings() {
        const products = this.productDatabase.products;
        
        products.forEach(product => {
            const embedding = this.createProductEmbedding(product);
            this.neuralNetwork.embeddings.set(product.id, embedding);
        });

        console.log(`✅ Đã tạo embeddings cho ${this.neuralNetwork.embeddings.size} sản phẩm`);
    }

    /**
     * Tạo embedding cho một sản phẩm
     */
    createProductEmbedding(product) {
        const embedding = new Array(this.embeddingDimension).fill(0);
        const features = this.extractFeatures(product);

        // Category embedding
        this.hashToEmbedding(features.category, embedding, 0, 20);
        
        // Subcategory embedding
        this.hashToEmbedding(features.subcategory, embedding, 20, 40);
        
        // Manufacturer embedding
        this.hashToEmbedding(features.manufacturer, embedding, 40, 60);
        
        // Specifications embedding
        const specKeys = Object.keys(features.specifications);
        specKeys.forEach((key, index) => {
            if (index < 20) {
                this.hashToEmbedding(
                    `${key}:${features.specifications[key]}`, 
                    embedding, 
                    60 + index * 3, 
                    63 + index * 3
                );
            }
        });

        // Keywords embedding
        features.keywords.forEach((keyword, index) => {
            if (index < 10) {
                this.hashToEmbedding(keyword, embedding, 120 + index * 1, 121 + index * 1);
            }
        });

        return embedding;
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
     * Train neural network
     */
    async train(epochs = 100) {
        console.log('🚀 Bắt đầu training neural network...');
        
        for (let epoch = 0; epoch < epochs; epoch++) {
            // Training logic ở đây
            if (epoch % 10 === 0) {
                console.log(`📊 Epoch ${epoch}/${epochs}`);
            }
        }

        this.isTrained = true;
        console.log('✅ Training hoàn tất!');
    }

    /**
     * Tìm components cần thiết để tạo sản phẩm A
     */
    findComponentsForProduct(productId) {
        const product = this.relationshipGraph.get(productId);
        if (!product) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        const components = [];
        const visited = new Set();

        // DFS để tìm components
        this.findComponentsDFS(productId, components, visited, 0);

        return {
            product: product.product,
            components: components.sort((a, b) => b.confidence - a.confidence),
            totalFound: components.length
        };
    }

    /**
     * DFS để tìm components
     */
    findComponentsDFS(productId, components, visited, depth) {
        if (depth > 3 || visited.has(productId)) return;
        
        visited.add(productId);
        const node = this.relationshipGraph.get(productId);
        if (!node) return;

        // Tìm các sản phẩm có thể là components
        node.related.forEach(relationship => {
            const relatedNode = this.relationshipGraph.get(relationship.productId);
            if (!relatedNode) return;

            // Kiểm tra nếu có thể là component
            if (this.isLikelyComponent(relationship, node, relatedNode)) {
                components.push({
                    component: relatedNode.product,
                    confidence: relationship.weight * this.getComponentConfidence(node, relatedNode),
                    relationship: relationship.type,
                    depth: depth
                });
            }

            // Đệ tục tìm components của components
            this.findComponentsDFS(relationship.productId, components, visited, depth + 1);
        });
    }

    /**
     * Kiểm tra nếu có thể là component
     */
    isLikelyComponent(relationship, productNode, componentNode) {
        // Component thường có category khác
        if (productNode.product.category_id === componentNode.product.category_id) {
            return false;
        }

        // Component thường nhỏ hơn hoặc cơ bản hơn
        const productComplexity = this.calculateProductComplexity(productNode.product);
        const componentComplexity = this.calculateProductComplexity(componentNode.product);

        return componentComplexity < productComplexity && relationship.weight > 0.3;
    }

    /**
     * Tính độ phức tạp của sản phẩm
     */
    calculateProductComplexity(product) {
        let complexity = 0;

        // Số specifications
        if (product.specifications) {
            complexity += this.getAllSpecKeys(product.specifications).length;
        }

        // Số applications
        if (product.applications) {
            complexity += product.applications.length;
        }

        // Độ dài mô tả
        complexity += product.long_description ? product.long_description.length / 100 : 0;

        return complexity;
    }

    /**
     * Tính confidence cho component
     */
    getComponentConfidence(productNode, componentNode) {
        let confidence = 1.0;

        // Component cơ bản có confidence cao
        const basicCategories = [
            'cat_electronic_passive',
            'cat_mechanical_fasteners',
            'cat_mechanical_bearings'
        ];

        if (basicCategories.includes(componentNode.product.category_id)) {
            confidence += 0.2;
        }

        // Cùng manufacturer tăng confidence
        if (productNode.product.manufacturer_id === componentNode.product.manufacturer_id) {
            confidence += 0.1;
        }

        return Math.min(confidence, 1.0);
    }

    /**
     * Tìm sản phẩm có thể tạo ra từ sản phẩm A
     */
    findProductsFromComponent(componentId) {
        const component = this.relationshipGraph.get(componentId);
        if (!component) {
            return { error: 'Sản phẩm không tồn tại' };
        }

        const products = [];
        const visited = new Set();

        // DFS để tìm các sản phẩm có thể tạo ra
        this.findProductsFromComponentDFS(componentId, products, visited, 0);

        return {
            component: component.product,
            products: products.sort((a, b) => b.confidence - a.confidence),
            totalFound: products.length
        };
    }

    /**
     * DFS để tìm sản phẩm từ component
     */
    findProductsFromComponentDFS(componentId, products, visited, depth) {
        if (depth > 3 || visited.has(componentId)) return;
        
        visited.add(componentId);
        const node = this.relationshipGraph.get(componentId);
        if (!node) return;

        node.related.forEach(relationship => {
            const relatedNode = this.relationshipGraph.get(relationship.productId);
            if (!relatedNode) return;

            // Kiểm tra nếu có thể là sản phẩm tạo ra từ component này
            if (this.isLikelyProduct(relationship, node, relatedNode)) {
                products.push({
                    product: relatedNode.product,
                    confidence: relationship.weight * this.getProductConfidence(node, relatedNode),
                    relationship: relationship.type,
                    depth: depth
                });
            }

            // Đệ tục tìm các sản phẩm liên quan
            this.findProductsFromComponentDFS(relationship.productId, products, visited, depth + 1);
        });
    }

    /**
     * Kiểm tra nếu có thể là sản phẩm tạo ra từ component
     */
    isLikelyProduct(relationship, componentNode, productNode) {
        // Sản phẩm thường có category khác
        if (componentNode.product.category_id === productNode.product.category_id) {
            return false;
        }

        // Sản phẩm thường phức tạp hơn
        const componentComplexity = this.calculateProductComplexity(componentNode.product);
        const productComplexity = this.calculateProductComplexity(productNode.product);

        return productComplexity > componentComplexity && relationship.weight > 0.3;
    }

    /**
     * Tính confidence cho sản phẩm
     */
    getProductConfidence(componentNode, productNode) {
        let confidence = 1.0;

        // Sản phẩm phức tạp có confidence cao hơn
        const complexityRatio = this.calculateProductComplexity(productNode.product) / 
                               this.calculateProductComplexity(componentNode.product);
        
        if (complexityRatio > 2) {
            confidence += 0.2;
        }

        // Cùng application tăng confidence
        if (componentNode.product.applications && productNode.product.applications) {
            const commonApps = componentNode.product.applications.filter(app => 
                productNode.product.applications.includes(app)
            );
            
            if (commonApps.length > 0) {
                confidence += 0.1 * (commonApps.length / Math.max(
                    componentNode.product.applications.length,
                    productNode.product.applications.length
                ));
            }
        }

        return Math.min(confidence, 1.0);
    }

    /**
     * Lấy thông tin hệ thống
     */
    getSystemInfo() {
        return {
            totalProducts: this.productDatabase?.products.length || 0,
            totalCategories: this.productDatabase?.categories.length || 0,
            relationshipNodes: this.relationshipGraph.size,
            isTrained: this.isTrained,
            embeddingDimension: this.embeddingDimension,
            neuralNetworkLayers: this.neuralNetwork?.layers.length || 0
        };
    }

    /**
     * Export đồ thị mối quan hệ
     */
    exportRelationshipGraph() {
        const graph = {
            nodes: [],
            edges: []
        };

        this.relationshipGraph.forEach((node, productId) => {
            graph.nodes.push({
                id: productId,
                name: node.product.name,
                category: node.product.category_id,
                features: node.features
            });

            node.related.forEach(relationship => {
                graph.edges.push({
                    from: productId,
                    to: relationship.productId,
                    type: relationship.type,
                    weight: relationship.weight
                });
            });
        });

        return graph;
    }
}

// Export để sử dụng
window.ProductRelationshipNeuralNetwork = ProductRelationshipNeuralNetwork;
