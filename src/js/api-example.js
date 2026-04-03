/**
 * API Example for E-commerce Integration
 * Demonstrates how to use the product data for e-commerce platforms
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load product data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'ecommerce-products.json'), 'utf8'));

// API Routes

/**
 * GET /api/v1/products
 * Get all products with optional filtering
 */
app.get('/api/v1/products', (req, res) => {
    try {
        const { category, limit = 20, offset = 0, sort = 'name' } = req.query;
        
        let products = productsData.products;
        
        // Filter by category
        if (category) {
            products = products.filter(p => p.category_id === category);
        }
        
        // Sort products
        products.sort((a, b) => {
            switch(sort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return a.pricing.retail_price - b.pricing.retail_price;
                case 'rating':
                    return b.ratings.average_rating - a.ratings.average_rating;
                case 'stock':
                    return b.inventory.in_stock - a.inventory.in_stock;
                default:
                    return a.name.localeCompare(b.name);
            }
        });
        
        // Pagination
        const startIndex = parseInt(offset);
        const endIndex = startIndex + parseInt(limit);
        const paginatedProducts = products.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            data: {
                products: paginatedProducts,
                pagination: {
                    total: products.length,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    has_more: endIndex < products.length
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/products/:id
 * Get product by ID
 */
app.get('/api/v1/products/:id', (req, res) => {
    try {
        const product = productsData.products.find(p => p.id === req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/categories
 * Get all categories
 */
app.get('/api/v1/categories', (req, res) => {
    try {
        res.json({
            success: true,
            data: productsData.categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/manufacturers
 * Get all manufacturers
 */
app.get('/api/v1/manufacturers', (req, res) => {
    try {
        res.json({
            success: true,
            data: productsData.manufacturers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/search
 * Search products
 */
app.get('/api/v1/search', (req, res) => {
    try {
        const { q, category, min_price, max_price, in_stock } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required'
            });
        }
        
        let products = productsData.products;
        
        // Text search
        const searchQuery = q.toLowerCase();
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.name_en.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.description_en.toLowerCase().includes(searchQuery) ||
            p.sku.toLowerCase().includes(searchQuery)
        );
        
        // Filter by category
        if (category) {
            products = products.filter(p => p.category_id === category);
        }
        
        // Filter by price range
        if (min_price) {
            products = products.filter(p => p.pricing.retail_price >= parseFloat(min_price));
        }
        if (max_price) {
            products = products.filter(p => p.pricing.retail_price <= parseFloat(max_price));
        }
        
        // Filter by stock availability
        if (in_stock === 'true') {
            products = products.filter(p => p.inventory.available && p.inventory.in_stock > 0);
        }
        
        res.json({
            success: true,
            data: {
                query: q,
                filters: { category, min_price, max_price, in_stock },
                products: products,
                total: products.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/inventory/:sku
 * Get inventory information for a product
 */
app.get('/api/v1/inventory/:sku', (req, res) => {
    try {
        const product = productsData.products.find(p => p.sku === req.params.sku);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            data: {
                sku: product.sku,
                name: product.name,
                in_stock: product.inventory.in_stock,
                available: product.inventory.available,
                stock_status: product.inventory.stock_status,
                warehouse_location: product.inventory.warehouse_location,
                lead_time: product.inventory.lead_time
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/pricing/:sku
 * Get pricing information for a product
 */
app.get('/api/v1/pricing/:sku', (req, res) => {
    try {
        const product = productsData.products.find(p => p.sku === req.params.sku);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            data: {
                sku: product.sku,
                name: product.name,
                retail_price: product.pricing.retail_price,
                wholesale_price: product.pricing.wholesale_price,
                currency: product.pricing.currency,
                min_order_quantity: product.pricing.min_order_quantity,
                price_unit: product.pricing.price_unit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/products/:id/related
 * Get related products
 */
app.get('/api/v1/products/:id/related', (req, res) => {
    try {
        const product = productsData.products.find(p => p.id === req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        
        // Find related products (same category, different product)
        const relatedProducts = productsData.products
            .filter(p => p.category_id === product.category_id && p.id !== product.id)
            .slice(0, 8); // Limit to 8 related products
        
        res.json({
            success: true,
            data: {
                product_id: product.id,
                related_products: relatedProducts
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/manufacturer/:id/products
 * Get products by manufacturer
 */
app.get('/api/v1/manufacturer/:id/products', (req, res) => {
    try {
        const manufacturer = productsData.manufacturers.find(m => m.id === req.params.id);
        
        if (!manufacturer) {
            return res.status(404).json({
                success: false,
                error: 'Manufacturer not found'
            });
        }
        
        const manufacturerProducts = productsData.products
            .filter(p => p.manufacturer === manufacturer.name);
        
        res.json({
            success: true,
            data: {
                manufacturer: manufacturer,
                products: manufacturerProducts,
                total: manufacturerProducts.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/v1/stats
 * Get system statistics
 */
app.get('/api/v1/stats', (req, res) => {
    try {
        const stats = {
            total_products: productsData.products.length,
            total_categories: productsData.categories.length,
            total_manufacturers: productsData.manufacturers.length,
            products_in_stock: productsData.products.filter(p => p.inventory.available).length,
            out_of_stock: productsData.products.filter(p => !p.inventory.available).length,
            average_rating: (productsData.products.reduce((sum, p) => sum + p.ratings.average_rating, 0) / productsData.products.length).toFixed(2),
            price_range: {
                min: Math.min(...productsData.products.map(p => p.pricing.retail_price)),
                max: Math.max(...productsData.products.map(p => p.pricing.retail_price))
            }
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`E-commerce API Server running on port ${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`  GET /api/v1/products`);
    console.log(`  GET /api/v1/products/:id`);
    console.log(`  GET /api/v1/categories`);
    console.log(`  GET /api/v1/manufacturers`);
    console.log(`  GET /api/v1/search`);
    console.log(`  GET /api/v1/inventory/:sku`);
    console.log(`  GET /api/v1/pricing/:sku`);
    console.log(`  GET /api/v1/products/:id/related`);
    console.log(`  GET /api/v1/manufacturer/:id/products`);
    console.log(`  GET /api/v1/stats`);
});

module.exports = app;
