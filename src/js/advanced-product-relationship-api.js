/**
 * Enhanced API cho Advanced Neural Networks
 * Giao diện API nâng cao cho hệ thống Neural Networks
 */

class AdvancedProductRelationshipAPI extends ProductRelationshipAPI {
    constructor() {
        super();
        this.advancedNeuralNetwork = null;
        this.modelMetrics = new Map();
        this.performanceTracker = new Map();
    }

    /**
     * Khởi tạo với advanced neural network
     */
    async initializeAdvanced(neuralNetworkInstance) {
        this.advancedNeuralNetwork = neuralNetworkInstance;
        await this.initialize(neuralNetworkInstance);
        console.log('✅ Advanced Product Relationship API đã khởi tạo');
    }

    /**
     * Advanced components query với ensemble predictions
     */
    async getComponentsAdvanced(productId) {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const cacheKey = `advanced_components_${productId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                return cached;
            }

            const startTime = performance.now();
            const result = this.advancedNeuralNetwork.findComponentsAdvanced(productId);
            const endTime = performance.now();

            if (result.error) {
                return this.errorResponse(result.error, 404);
            }

            const response = {
                success: true,
                data: result,
                performance: {
                    processingTime: endTime - startTime,
                    modelContributions: result.modelContributions,
                    averageConfidence: result.components.reduce((sum, c) => sum + c.ensembleConfidence, 0) / result.components.length
                },
                timestamp: new Date().toISOString(),
                query: {
                    productId: productId,
                    type: 'advanced_components_for_product',
                    models: ['basic', 'transformer', 'gnn', 'ensemble']
                }
            };

            this.setCache(cacheKey, response);
            this.trackPerformance('advanced_components', endTime - startTime);
            
            return response;

        } catch (error) {
            console.error('Lỗi khi tìm advanced components:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Advanced products query với ensemble predictions
     */
    async getProductsAdvanced(componentId) {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const cacheKey = `advanced_products_${componentId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                return cached;
            }

            const startTime = performance.now();
            const result = this.advancedNeuralNetwork.findProductsAdvanced(componentId);
            const endTime = performance.now();

            if (result.error) {
                return this.errorResponse(result.error, 404);
            }

            const response = {
                success: true,
                data: result,
                performance: {
                    processingTime: endTime - startTime,
                    modelContributions: result.modelContributions,
                    averageConfidence: result.products.reduce((sum, p) => sum + p.ensembleConfidence, 0) / result.products.length
                },
                timestamp: new Date().toISOString(),
                query: {
                    componentId: componentId,
                    type: 'advanced_products_from_component',
                    models: ['basic', 'transformer', 'gnn', 'ensemble']
                }
            };

            this.setCache(cacheKey, response);
            this.trackPerformance('advanced_products', endTime - startTime);
            
            return response;

        } catch (error) {
            console.error('Lỗi khi tìm advanced products:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Batch advanced query
     */
    async batchGetComponentsAdvanced(productIds) {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const results = {};
            const errors = {};
            const performanceMetrics = [];

            for (const productId of productIds) {
                try {
                    const startTime = performance.now();
                    const result = await this.getComponentsAdvanced(productId);
                    const endTime = performance.now();

                    if (result.success) {
                        results[productId] = result.data;
                        performanceMetrics.push({
                            productId: productId,
                            processingTime: endTime - startTime,
                            componentsFound: result.data.components.length,
                            averageConfidence: result.performance.averageConfidence
                        });
                    } else {
                        errors[productId] = result.error.message;
                    }
                } catch (error) {
                    errors[productId] = error.message;
                }
            }

            return {
                success: true,
                data: {
                    results: results,
                    errors: errors,
                    performance: {
                        summary: {
                            total: productIds.length,
                            successful: Object.keys(results).length,
                            failed: Object.keys(errors).length,
                            averageProcessingTime: performanceMetrics.reduce((sum, m) => sum + m.processingTime, 0) / performanceMetrics.length,
                            totalComponentsFound: performanceMetrics.reduce((sum, m) => sum + m.componentsFound, 0),
                            overallAverageConfidence: performanceMetrics.reduce((sum, m) => sum + m.averageConfidence, 0) / performanceMetrics.length
                        },
                        details: performanceMetrics
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi batch advanced query:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Semantic search với Transformer embeddings
     */
    async semanticSearch(query, limit = 10, filters = {}) {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const startTime = performance.now();
            
            // Tạo query embedding với Transformer
            const queryEmbedding = this.createQueryEmbedding(query);
            
            // Tìm similarity với tất cả products
            const products = this.advancedNeuralNetwork.productDatabase.products;
            const similarities = [];

            for (const product of products) {
                // Apply filters
                if (!this.passesFilters(product, filters)) {
                    continue;
                }

                const productEmbedding = this.advancedNeuralNetwork.transformerEmbeddings.get(product.id) ||
                                       this.advancedNeuralNetwork.createTransformerEmbedding(product);
                
                this.advancedNeuralNetwork.transformerEmbeddings.set(product.id, productEmbedding);

                const similarity = this.advancedNeuralNetwork.cosineSimilarity(queryEmbedding, productEmbedding);
                
                if (similarity > 0.3) { // Threshold
                    similarities.push({
                        product: product,
                        similarity: similarity,
                        matches: this.getSemanticMatches(product, query)
                    });
                }
            }

            // Sort by similarity
            similarities.sort((a, b) => b.similarity - a.similarity);
            
            const endTime = performance.now();

            return {
                success: true,
                data: {
                    query: query,
                    filters: filters,
                    results: similarities.slice(0, limit),
                    total: similarities.length,
                    limit: limit,
                    performance: {
                        processingTime: endTime - startTime,
                        averageSimilarity: similarities.slice(0, limit).reduce((sum, s) => sum + s.similarity, 0) / Math.min(similarities.length, limit)
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi semantic search:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Tạo query embedding
     */
    createQueryEmbedding(query) {
        const queryTokens = query.toLowerCase().split(/\s+/).filter(token => token.length > 2);
        const querySequence = queryTokens.map(token => `[QUERY]${token}`);
        
        // Sử dụng Transformer model để tạo embedding
        const embedding = new Array(this.advancedNeuralNetwork.transformerModel.embeddingDim).fill(0);
        
        querySequence.forEach((token, index) => {
            const tokenEmbedding = this.advancedNeuralNetwork.getTokenEmbedding(token);
            for (let i = 0; i < embedding.length; i++) {
                embedding[i] += tokenEmbedding[i] / querySequence.length;
            }
        });
        
        return embedding;
    }

    /**
     * Kiểm tra filters
     */
    passesFilters(product, filters) {
        if (filters.category && product.category_id !== filters.category) {
            return false;
        }
        
        if (filters.manufacturer && product.manufacturer_id !== filters.manufacturer) {
            return false;
        }
        
        if (filters.applications && filters.applications.length > 0) {
            const hasApp = filters.applications.some(app => 
                product.applications && product.applications.includes(app)
            );
            if (!hasApp) return false;
        }
        
        return true;
    }

    /**
     * Lấy semantic matches
     */
    getSemanticMatches(product, query) {
        const matches = [];
        const queryLower = query.toLowerCase();
        
        // Check name matches
        if (product.name.toLowerCase().includes(queryLower)) {
            matches.push('name');
        }
        if (product.name_en && product.name_en.toLowerCase().includes(queryLower)) {
            matches.push('name_en');
        }
        
        // Check description matches
        if (product.short_description && product.short_description.toLowerCase().includes(queryLower)) {
            matches.push('description');
        }
        
        // Check application matches
        if (product.applications) {
            const appMatches = product.applications.filter(app => 
                app.toLowerCase().includes(queryLower)
            );
            if (appMatches.length > 0) {
                matches.push('applications');
            }
        }
        
        return matches;
    }

    /**
     * Graph-based recommendation
     */
    async getGraphRecommendations(productId, depth = 2, limit = 10) {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const startTime = performance.now();
            
            const recommendations = [];
            const visited = new Set();
            
            // Graph traversal với GNN embeddings
            this.graphTraversal(productId, recommendations, visited, depth, 0);
            
            // Sort by GNN confidence
            recommendations.sort((a, b) => b.gnnConfidence - a.gnnConfidence);
            
            const endTime = performance.now();

            return {
                success: true,
                data: {
                    productId: productId,
                    recommendations: recommendations.slice(0, limit),
                    totalFound: recommendations.length,
                    depth: depth,
                    performance: {
                        processingTime: endTime - startTime,
                        averageGNNConfidence: recommendations.slice(0, limit).reduce((sum, r) => sum + r.gnnConfidence, 0) / Math.min(recommendations.length, limit)
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi graph recommendations:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Graph traversal với GNN
     */
    graphTraversal(nodeId, recommendations, visited, maxDepth, currentDepth) {
        if (currentDepth >= maxDepth || visited.has(nodeId)) {
            return;
        }
        
        visited.add(nodeId);
        const node = this.advancedNeuralNetwork.relationshipGraph.get(nodeId);
        if (!node) return;

        node.related.forEach(relationship => {
            const relatedNode = this.advancedNeuralNetwork.relationshipGraph.get(relationship.productId);
            if (!relatedNode || visited.has(relationship.productId)) return;

            // Calculate GNN confidence
            const gnnConfidence = this.advancedNeuralNetwork.calculateGNNConfidence(node, relatedNode);
            
            recommendations.push({
                product: relatedNode.product,
                gnnConfidence: gnnConfidence,
                relationship: relationship.type,
                depth: currentDepth + 1,
                path: this.buildPath(nodeId, relationship.productId)
            });

            // Recursive traversal
            this.graphTraversal(relationship.productId, recommendations, visited, maxDepth, currentDepth + 1);
        });
    }

    /**
     * Xây dựng path trong graph
     */
    buildPath(fromId, toId) {
        return [fromId, toId];
    }

    /**
     * Model performance analysis
     */
    async getModelPerformance() {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const performance = {
                basic: this.getModelMetrics('basic'),
                transformer: this.getModelMetrics('transformer'),
                gnn: this.getModelMetrics('gnn'),
                ensemble: this.getModelMetrics('ensemble')
            };

            return {
                success: true,
                data: {
                    performance: performance,
                    comparison: this.compareModelPerformance(performance),
                    recommendations: this.getOptimizationRecommendations(performance)
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi model performance analysis:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Lấy metrics cho model
     */
    getModelMetrics(modelType) {
        const metrics = this.performanceTracker.get(modelType) || {
            totalQueries: 0,
            averageProcessingTime: 0,
            averageConfidence: 0,
            errorRate: 0
        };

        return metrics;
    }

    /**
     * So sánh performance giữa các models
     */
    compareModelPerformance(performance) {
        const comparison = {};
        
        Object.keys(performance).forEach(model => {
            comparison[model] = {
                speed: performance[model].averageProcessingTime,
                accuracy: performance[model].averageConfidence,
                reliability: 1 - performance[model].errorRate
            };
        });

        return comparison;
    }

    /**
     * Lấy optimization recommendations
     */
    getOptimizationRecommendations(performance) {
        const recommendations = [];

        // Speed recommendations
        const slowestModel = Object.keys(performance).reduce((slowest, model) => 
            performance[model].averageProcessingTime > performance[slowest].averageProcessingTime ? model : slowest
        );

        if (performance[slowestModel].averageProcessingTime > 200) {
            recommendations.push({
                type: 'speed',
                model: slowestModel,
                suggestion: `Optimize ${slowestModel} model for faster processing`
            });
        }

        // Accuracy recommendations
        const leastAccurateModel = Object.keys(performance).reduce((least, model) => 
            performance[model].averageConfidence < performance[least].averageConfidence ? model : least
        );

        if (performance[leastAccurateModel].averageConfidence < 0.7) {
            recommendations.push({
                type: 'accuracy',
                model: leastAccurateModel,
                suggestion: `Improve ${leastAccurateModel} model training for better accuracy`
            });
        }

        return recommendations;
    }

    /**
     * Track performance
     */
    trackPerformance(modelType, processingTime, confidence = null) {
        if (!this.performanceTracker.has(modelType)) {
            this.performanceTracker.set(modelType, {
                totalQueries: 0,
                totalProcessingTime: 0,
                totalConfidence: 0,
                errors: 0
            });
        }

        const metrics = this.performanceTracker.get(modelType);
        metrics.totalQueries++;
        metrics.totalProcessingTime += processingTime;
        
        if (confidence !== null) {
            metrics.totalConfidence += confidence;
        }

        metrics.averageProcessingTime = metrics.totalProcessingTime / metrics.totalQueries;
        metrics.averageConfidence = metrics.totalConfidence / metrics.totalQueries;
        metrics.errorRate = metrics.errors / metrics.totalQueries;
    }

    /**
     * Advanced system info
     */
    async getAdvancedSystemInfo() {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const basicInfo = await this.getSystemInfo();
            const advancedInfo = this.advancedNeuralNetwork.getAdvancedSystemInfo();
            const performance = await this.getModelPerformance();

            return {
                success: true,
                data: {
                    ...basicInfo.data,
                    advanced: advancedInfo.advanced,
                    performance: performance.data,
                    api: {
                        ...basicInfo.data.api,
                        advancedEndpoints: [
                            'GET /api/advanced/products/{id}/components',
                            'GET /api/advanced/components/{id}/products',
                            'POST /api/advanced/batch/components',
                            'GET /api/advanced/semantic/search',
                            'GET /api/advanced/graph/recommendations',
                            'GET /api/advanced/models/performance'
                        ]
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi lấy advanced system info:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Export advanced graph với embeddings
     */
    async exportAdvancedGraph() {
        if (!this.advancedNeuralNetwork) {
            return this.errorResponse('Advanced Neural Network chưa được khởi tạo', 503);
        }

        try {
            const basicGraph = this.advancedNeuralNetwork.exportRelationshipGraph();
            
            // Add embeddings to graph
            const advancedGraph = {
                ...basicGraph,
                embeddings: {
                    transformer: Array.from(this.advancedNeuralNetwork.transformerEmbeddings.entries()),
                    graph: Array.from(this.advancedNeuralNetwork.graphEmbeddings.entries()),
                    ensemble: Array.from(this.advancedNeuralNetwork.ensemblePredictions.entries())
                },
                modelInfo: this.advancedNeuralNetwork.getAdvancedSystemInfo().advanced
            };

            return {
                success: true,
                data: advancedGraph,
                timestamp: new Date().toISOString(),
                format: 'json',
                nodes: advancedGraph.nodes.length,
                edges: advancedGraph.edges.length,
                embeddings: {
                    transformer: advancedGraph.embeddings.transformer.length,
                    graph: advancedGraph.embeddings.graph.length,
                    ensemble: advancedGraph.embeddings.ensemble.length
                }
            };

        } catch (error) {
            console.error('Lỗi export advanced graph:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Clear advanced cache
     */
    clearAdvancedCache() {
        this.clearCache();
        this.advancedNeuralNetwork.transformerEmbeddings.clear();
        this.advancedNeuralNetwork.graphEmbeddings.clear();
        this.advancedNeuralNetwork.ensemblePredictions.clear();
        this.performanceTracker.clear();
        
        console.log('🗑️ Advanced cache đã được xóa');
    }
}

// Export để sử dụng
window.AdvancedProductRelationshipAPI = AdvancedProductRelationshipAPI;
