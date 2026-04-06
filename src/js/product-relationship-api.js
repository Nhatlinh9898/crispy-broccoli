/**
 * Product Relationship API Interface
 * Giao diện API cho hệ thống Mối quan hệ Sản phẩm
 */

class ProductRelationshipAPI {
    constructor() {
        this.neuralNetwork = null;
        this.isInitialized = false;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    /**
     * Khởi tạo API với neural network
     */
    async initialize(neuralNetworkInstance) {
        this.neuralNetwork = neuralNetworkInstance;
        this.isInitialized = true;
        console.log('✅ Product Relationship API đã khởi tạo');
    }

    /**
     * API endpoint: Tìm components cho sản phẩm
     * GET /api/products/{productId}/components
     */
    async getComponentsForProduct(productId) {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            // Check cache
            const cacheKey = `components_${productId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                return cached;
            }

            const result = this.neuralNetwork.findComponentsForProduct(productId);
            
            if (result.error) {
                return this.errorResponse(result.error, 404);
            }

            const response = {
                success: true,
                data: result,
                timestamp: new Date().toISOString(),
                query: {
                    productId: productId,
                    type: 'components_for_product'
                }
            };

            // Cache result
            this.setCache(cacheKey, response);
            
            return response;

        } catch (error) {
            console.error('Lỗi khi tìm components:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * API endpoint: Tìm sản phẩm từ component
     * GET /api/components/{componentId}/products
     */
    async getProductsFromComponent(componentId) {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            // Check cache
            const cacheKey = `products_${componentId}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) {
                return cached;
            }

            const result = this.neuralNetwork.findProductsFromComponent(componentId);
            
            if (result.error) {
                return this.errorResponse(result.error, 404);
            }

            const response = {
                success: true,
                data: result,
                timestamp: new Date().toISOString(),
                query: {
                    componentId: componentId,
                    type: 'products_from_component'
                }
            };

            // Cache result
            this.setCache(cacheKey, response);
            
            return response;

        } catch (error) {
            console.error('Lỗi khi tìm sản phẩm:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * API endpoint: Batch query cho nhiều sản phẩm
     * POST /api/batch/components
     */
    async batchGetComponents(productIds) {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            const results = {};
            const errors = {};

            for (const productId of productIds) {
                try {
                    const result = await this.getComponentsForProduct(productId);
                    if (result.success) {
                        results[productId] = result.data;
                    } else {
                        errors[productId] = result.message;
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
                    summary: {
                        total: productIds.length,
                        successful: Object.keys(results).length,
                        failed: Object.keys(errors).length
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi batch query:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * API endpoint: Batch query products from components
     * POST /api/batch/products
     */
    async batchGetProducts(componentIds) {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            const results = {};
            const errors = {};

            for (const componentId of componentIds) {
                try {
                    const result = await this.getProductsFromComponent(componentId);
                    if (result.success) {
                        results[componentId] = result.data;
                    } else {
                        errors[componentId] = result.message;
                    }
                } catch (error) {
                    errors[componentId] = error.message;
                }
            }

            return {
                success: true,
                data: {
                    results: results,
                    errors: errors,
                    summary: {
                        total: componentIds.length,
                        successful: Object.keys(results).length,
                        failed: Object.keys(errors).length
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi batch query:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * API endpoint: Tìm kiếm sản phẩm theo tên
     * GET /api/search/products?q={query}
     */
    async searchProducts(query, limit = 10) {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            const products = this.neuralNetwork.productDatabase.products;
            const results = [];

            const queryLower = query.toLowerCase();
            
            for (const product of products) {
                let score = 0;
                
                // Tìm trong tên
                if (product.name.toLowerCase().includes(queryLower)) {
                    score += 10;
                }
                if (product.name_en && product.name_en.toLowerCase().includes(queryLower)) {
                    score += 8;
                }
                
                // Tìm trong mô tả
                if (product.short_description && product.short_description.toLowerCase().includes(queryLower)) {
                    score += 5;
                }
                if (product.short_description_en && product.short_description_en.toLowerCase().includes(queryLower)) {
                    score += 4;
                }
                
                // Tìm trong applications
                if (product.applications) {
                    for (const app of product.applications) {
                        if (app.toLowerCase().includes(queryLower)) {
                            score += 3;
                            break;
                        }
                    }
                }
                
                // Tìm trong specifications
                if (product.specifications) {
                    const specText = JSON.stringify(product.specifications).toLowerCase();
                    if (specText.includes(queryLower)) {
                        score += 2;
                    }
                }
                
                if (score > 0) {
                    results.push({
                        product: product,
                        score: score,
                        matches: this.getMatchDetails(product, queryLower)
                    });
                }
            }
            
            // Sắp xếp theo score
            results.sort((a, b) => b.score - a.score);
            
            return {
                success: true,
                data: {
                    query: query,
                    results: results.slice(0, limit),
                    total: results.length,
                    limit: limit
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Lấy chi tiết matches
     */
    getMatchDetails(product, query) {
        const matches = [];
        
        if (product.name.toLowerCase().includes(query)) {
            matches.push('name');
        }
        if (product.name_en && product.name_en.toLowerCase().includes(query)) {
            matches.push('name_en');
        }
        if (product.short_description && product.short_description.toLowerCase().includes(query)) {
            matches.push('description');
        }
        if (product.applications && product.applications.some(app => app.toLowerCase().includes(query))) {
            matches.push('applications');
        }
        
        return matches;
    }

    /**
     * API endpoint: Lấy thông tin hệ thống
     * GET /api/system/info
     */
    async getSystemInfo() {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            const info = this.neuralNetwork.getSystemInfo();
            
            return {
                success: true,
                data: {
                    ...info,
                    api: {
                        version: '1.0.0',
                        endpoints: [
                            'GET /api/products/{id}/components',
                            'GET /api/components/{id}/products',
                            'POST /api/batch/components',
                            'POST /api/batch/products',
                            'GET /api/search/products',
                            'GET /api/system/info',
                            'GET /api/graph/export'
                        ],
                        cache: {
                            size: this.cache.size,
                            timeout: this.cacheTimeout
                        }
                    }
                },
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi lấy thông tin hệ thống:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * API endpoint: Export đồ thị mối quan hệ
     * GET /api/graph/export
     */
    async exportGraph() {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            const graph = this.neuralNetwork.exportRelationshipGraph();
            
            return {
                success: true,
                data: graph,
                timestamp: new Date().toISOString(),
                format: 'json',
                nodes: graph.nodes.length,
                edges: graph.edges.length
            };

        } catch (error) {
            console.error('Lỗi export đồ thị:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * API endpoint: Lấy thống kê mối quan hệ
     * GET /api/stats/relationships
     */
    async getRelationshipStats() {
        if (!this.isInitialized) {
            return this.errorResponse('API chưa được khởi tạo', 503);
        }

        try {
            const graph = this.neuralNetwork.relationshipGraph;
            const stats = {
                totalNodes: graph.size,
                relationshipTypes: new Map(),
                categoryDistribution: new Map(),
                averageConnections: 0,
                maxConnections: 0,
                minConnections: Infinity
            };

            let totalConnections = 0;
            
            graph.forEach((node, productId) => {
                const connections = node.related.size;
                totalConnections += connections;
                
                stats.maxConnections = Math.max(stats.maxConnections, connections);
                stats.minConnections = Math.min(stats.minConnections, connections);
                
                // Category distribution
                const category = node.product.category_id;
                stats.categoryDistribution.set(category, 
                    (stats.categoryDistribution.get(category) || 0) + 1
                );
                
                // Relationship types
                node.related.forEach(rel => {
                    stats.relationshipTypes.set(rel.type,
                        (stats.relationshipTypes.get(rel.type) || 0) + 1
                    );
                });
            });
            
            stats.averageConnections = totalConnections / graph.size;
            
            // Convert Maps to objects
            stats.relationshipTypes = Object.fromEntries(stats.relationshipTypes);
            stats.categoryDistribution = Object.fromEntries(stats.categoryDistribution);

            return {
                success: true,
                data: stats,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Lỗi lấy thống kê:', error);
            return this.errorResponse('Lỗi server nội bộ', 500);
        }
    }

    /**
     * Cache utilities
     */
    setCache(key, value) {
        this.cache.set(key, {
            data: value,
            timestamp: Date.now()
        });
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }
        
        if (cached) {
            this.cache.delete(key);
        }
        
        return null;
    }

    clearCache() {
        this.cache.clear();
        console.log('🗑️ Cache đã được xóa');
    }

    /**
     * Error response helper
     */
    errorResponse(message, status = 500) {
        return {
            success: false,
            error: {
                message: message,
                status: status,
                timestamp: new Date().toISOString()
            }
        };
    }

    /**
     * Validate product ID
     */
    validateProductId(productId) {
        if (!productId || typeof productId !== 'string') {
            return false;
        }
        
        // Check if product exists
        return this.neuralNetwork.productDatabase.products.some(p => p.id === productId);
    }

    /**
     * Get product by ID
     */
    getProductById(productId) {
        return this.neuralNetwork.productDatabase.products.find(p => p.id === productId);
    }

    /**
     * Get products by category
     */
    getProductsByCategory(categoryId) {
        return this.neuralNetwork.productDatabase.products.filter(p => p.category_id === categoryId);
    }

    /**
     * Get categories
     */
    getCategories() {
        return this.neuralNetwork.productDatabase.categories;
    }

    /**
     * Get manufacturers
     */
    getManufacturers() {
        return this.neuralNetwork.productDatabase.manufacturers;
    }
}

// Export để sử dụng
window.ProductRelationshipAPI = ProductRelationshipAPI;
