# AI Agent Knowledge Base - Hệ thống Tạo Bài viết Tự động

## 🎯 Tổng quan

Knowledge base này là tài liệu tham khảo toàn diện cho AI agents, bao gồm kiến thức kỹ thuật, best practices, troubleshooting guides, và các tài nguyên cần thiết để làm chủ hệ thống tạo bài viết tự động.

---

## 📚 Core Concepts

### 1. Template System Architecture

#### **Components Overview**
```
┌─────────────────┐
│   Templates      │ ← 11 template types
├─────────────────┤
│   Generator      │ ← ArticleGenerator, EnhancedArticleGenerator
├─────────────────┤
│   Data Sources   │ ← ecommerce-products.json
├─────────────────┤
│   Variables      │ ← Dynamic content extraction
├─────────────────┤
│   Formatters     │ ← Content type processors
└─────────────────┘
```

#### **Class Hierarchy**
```javascript
class ArticleGenerator {
    // Basic functionality
    initialize()
    determineProductType()
    extractVariables()
    generateArticle()
}

class EnhancedArticleGenerator extends ArticleGenerator {
    // Advanced features
    generateEnhancedArticle()
    exportArticles()
    getArticleStatistics()
    addInteractiveElements()
}
```

### 2. Template Structure

#### **Standard Template Format**
```json
{
  "template_name": {
    "name": "Template Display Name",
    "category": "Category",
    "priority": 1,
    "structure": {
      "sections": [
        {
          "id": "section_id",
          "title": "Section Title",
          "content_type": "dynamic|table|list|cards...",
          "template": "Content with {variables}",
          "variables": ["variable1", "variable2"]
        }
      ]
    }
  }
}
```

#### **Content Types**
- **dynamic**: Basic text with variable replacement
- **table**: Structured data in table format
- **list**: Ordered/unordered lists
- **cards**: Card-based content layout
- **steps**: Sequential instruction steps
- **checklist**: Interactive checklist items
- **formula**: Mathematical formulas with explanations
- **troubleshooting**: Problem-solution tables
- **comparison**: Side-by-side comparisons

---

## 🔧 Technical Reference

### 1. Template Types Deep Dive

#### **Bolt Template**
```javascript
// Key variables for bolt template
variables = {
    product_name: "Bu lông lục giác M6x20",
    standard: "JIS B1181",
    material: "Thép carbon",
    coating: "Kẽm nóng",
    size: "M6",
    strength: "4.8",
    structure_description: "Dynamic based on bolt type"
}
```

#### **Resistor Template**
```javascript
// Key variables for resistor template
variables = {
    resistance: "10kΩ",
    power: "1/4W",
    tolerance: "±5%",
    temp_coefficient: "±100ppm/°C",
    package_size: "0603",
    material: "Nickel barrier"
}
```

#### **Capacitor Template**
```javascript
// Key variables for capacitor template
variables = {
    capacitance: "100nF",
    voltage_rating: "50V",
    tolerance: "±10%",
    dielectric: "X7R",
    package_size: "0805",
    temp_range: "-55°C to +125°C"
}
```

#### **Inductor Template**
```javascript
// Key variables for inductor template
variables = {
    inductance: "10µH",
    current_rating: "100mA",
    tolerance: "±5%",
    quality_factor: "50",
    frequency_range: "1kHz-10MHz",
    dc_resistance: "0.1Ω"
}
```

#### **Diode Template**
```javascript
// Key variables for diode template
variables = {
    forward_voltage: "0.7V",
    max_forward_current: "1A",
    max_reverse_voltage: "50V",
    reverse_leakage: "1µA",
    recovery_time: "50ns"
}
```

#### **Transistor Template**
```javascript
// Key variables for transistor template
variables = {
    current_gain: "100",
    max_collector_current: "100mA",
    max_voltage_ce: "30V",
    power_dissipation: "0.5W",
    transition_frequency: "100MHz"
}
```

#### **IC Template**
```javascript
// Key variables for IC template
variables = {
    supply_voltage: "5V",
    current_consumption: "10mA",
    clock_frequency: "16MHz",
    package_type: "DIP-8",
    pin_count: "8"
}
```

#### **Sensor Template**
```javascript
// Key variables for sensor template
variables = {
    measurement_range: "0-100°C",
    accuracy: "±1°C",
    resolution: "0.1°C",
    response_time: "100ms",
    operating_voltage: "3.3V-5V"
}
```

#### **Connector Template**
```javascript
// Key variables for connector template
variables = {
    pin_count: "4",
    voltage_rating: "250V",
    current_rating: "5A",
    contact_resistance: "10mΩ",
    contact_material: "Brass"
}
```

### 2. Variable Extraction Logic

#### **Product Type Determination**
```javascript
determineProductType(product) {
    const name = (product.name || '').toLowerCase();
    const category = (product.category || '').toLowerCase();
    
    // Check for capacitors
    if (name.includes('tụ') || name.includes('capacitor')) {
        return 'capacitor';
    }
    
    // Check for inductors
    if (name.includes('cuộn') || name.includes('inductor')) {
        return 'inductor';
    }
    
    // Check for diodes
    if (name.includes('diode') || name.includes('điốt')) {
        return 'diode';
    }
    
    // Check for transistors
    if (name.includes('transistor') || name.includes('bjt')) {
        return 'transistor';
    }
    
    // Check for ICs
    if (name.includes('ic') || name.includes('chip')) {
        return 'ic';
    }
    
    // Check for sensors
    if (name.includes('sensor') || name.includes('cảm biến')) {
        return 'sensor';
    }
    
    // Check for connectors
    if (name.includes('connector') || name.includes('đầu nối')) {
        return 'connector';
    }
    
    // Check for bolts and screws
    if (name.includes('bu lông') || name.includes('ốc vít')) {
        return 'bolt';
    }
    
    // Check for resistors
    if (name.includes('điện trở') || name.includes('resistor')) {
        return 'resistor';
    }
    
    // Check for bearings
    if (name.includes('vòng bi') || name.includes('bearing')) {
        return 'bearing';
    }
    
    return 'generic';
}
```

#### **Variable Mapping**
```javascript
extractVariables(product, templateType) {
    const baseVariables = {
        product_name: product.name || 'Linh kiện',
        product_name_lower: (product.name || 'Linh kiện').toLowerCase(),
        product_code: product.id || product.sku || 'N/A',
        category: product.category || 'Chưa phân loại',
        subcategory: product.subcategory || 'Chưa phân loại',
        specifications: product.specifications || 'N/A',
        last_updated: product.last_updated || 'N/A',
        brand: product.brand || 'N/A',
        manufacturer: product.manufacturer || 'N/A',
        origin: product.origin || 'N/A'
    };
    
    // Add type-specific variables
    return addTypeSpecificVariables(baseVariables, product, templateType);
}
```

### 3. Content Generation Process

#### **Step-by-Step Process**
1. **Product Type Detection**: Analyze product name and category
2. **Template Selection**: Choose appropriate template based on type
3. **Variable Extraction**: Extract and map variables from product data
4. **Content Generation**: Process each section with variables
5. **Interactive Elements**: Add calculators, tooltips, expandable sections
6. **SEO Optimization**: Generate metadata and structured data
7. **Quality Control**: Validate technical accuracy
8. **Output Formatting**: Format for display or export

#### **Content Type Processors**
```javascript
generateSectionContent(section, variables, product) {
    switch (section.content_type) {
        case 'dynamic':
            return replaceVariables(section.template, variables);
            
        case 'table':
            return generateTableContent(section, variables, product);
            
        case 'highlight_box':
            return generateHighlightBoxContent(section, variables, product);
            
        case 'formula':
            return generateFormulaContent(section, variables, product);
            
        case 'troubleshooting':
            return generateTroubleshootingContent(section, variables, product);
            
        default:
            return replaceVariables(section.template, variables);
    }
}
```

---

## 📖 Technical Knowledge Base

### 1. Linh kiện Cơ khí

#### **Bu lông và Ốc vít**
- **Tiêu chuẩn:** JIS B1181, ISO 4017, ANSI/ASME B18.2.1, DIN 933
- **Vật liệu:** Thép carbon (S45C), Thép không gỉ (SUS304), Thép hợp kim (SCM435)
- **Lớp phủ:** Kẽm nóng, kẽm điện, phosphate, chrome
- **Cường độ:** Class 4.8, 8.8, 10.9, 12.9
- **Loại đầu:** Lục giác, Phillips, Hex socket, Torx

#### **Vòng bi**
- **Loại:** Bi sâu, con lăn, tiếp xúc góc, trượt
- **Vật liệu:** Thép vòng bi (SAE 52100), Thép không gỉ (AISI 440C), Gốm (Si₃N₄)
- **Độ chính xác:** ABEC-1, ABEC-3, ABEC-5, ABEC-7
- **Dựng khe:** C3, C4, CN, C9
- **Bôi trơn:** Dầu, mỡ, bôi trơn khô

### 2. Linh kiện Điện tử

#### **Điện trở**
- **Công thức Ohm's Law:** V = I × R
- **Công suất:** P = I² × R = V²/R
- **Loại:** Carbon film, Metal film, Wirewound, SMD
- **Dung sai:** ±1%, ±5%, ±10%
- **Kích thước:** Through-hole, 0402, 0603, 0805, 1206
- **Hệ số nhiệt độ:** ±50, ±100, ±200 ppm/°C

#### **Tụ điện**
- **Công thức:** Q = C × V, E = ½ × C × V²
- **Loại:** Ceramic, Electrolytic, Film, Tantalum
- **Điện môi:** X7R, X5R, Y5V, C0G/NP0
- **Điện áp làm việc:** 6.3V, 16V, 25V, 50V, 100V+
- **Dung sai:** ±5%, ±10%, ±20%
- **Nhiệt độ:** -55°C to +125°C (standard)

#### **Cuộn cảm**
- **Công thức:** V = L × (dI/dt), E = ½ × L × I²
- **Loại:** Không lõi, Ferrite, Sắt, Không khí
- **Vật liệu lõi:** Ferrite, Sắt silicon, Không khí, Bột sắt
- **Q Factor:** 10-1000 (tùy thuộc vào loại)
- **Tần số hoạt động:** 1kHz-100MHz
- **Điện trở DC:** 0.01Ω-10Ω

#### **Diode**
- **Đặc tính V-I:** I = I_s × (e^(V/(n×V_T)) - 1)
- **Loại:** Chỉnh lưu, Zener, Schottky, LED, Photodiode
- **Điện áp forward:** 0.3V (Germanium), 0.7V (Silicon), 1.2V (LED)
- **Dòng điện reverse:** <1µA (typical)
- **Thời gian phục hồi:** 50ns-100ns (fast), 1µs-10µs (standard)

#### **Transistor**
- **BJT:** I_c = β × I_b
- **MOSFET:** I_d = (1/2) × μ × C_ox × (W/L) × (V_gs - V_th)²
- **Loại:** BJT, MOSFET, JFET, IGBT
- **Cấu hình:** Common emitter, common collector, common base
- **Hệ số khuếch đại (β):** 10-1000
- **Tần số chuyển đổi:** 1MHz-100MHz

#### **IC (Integrated Circuit)**
- **Logic Levels:** TTL (0-0.8V/2.0-5V), CMOS (0-1.5V/3.5-5V)
- **Giao tiếp:** I2C, SPI, UART, GPIO
- **Điện áp hoạt động:** 3.3V, 5V, 12V
- **Package:** DIP, SOIC, QFP, BGA
- **Nhiệt độ hoạt động:** -40°C to +85°C (commercial)

#### **Cảm biến**
- **Cảm biến nhiệt độ:** Thermistor, RTD, Thermocouple, IC sensor
- **Cảm biến ánh sáng:** LDR, Photodiode, Phototransistor
- **Cảm biến áp suất:** Piezoresistive, Capacitive, Optical
- **Độ chính xác:** ±0.1°C (high-end), ±1°C (standard)
- **Độ phân giải:** 8-bit, 12-bit, 16-bit, 24-bit ADC

---

## 🛠️ Implementation Guide

### 1. Environment Setup

#### **Required Dependencies**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "fs": "^0.0.1-security"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### **Development Environment**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/article-generator/system.git
cd system

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. API Implementation

#### **RESTful Endpoints**
```javascript
// GET /api/v1/products
app.get('/api/v1/products', async (req, res) => {
    try {
        const { category, limit = 20, offset = 0 } = req.query;
        const products = await getProducts(category, limit, offset);
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/v1/articles
app.post('/api/v1/articles', async (req, res) => {
    try {
        const { product_id, template_type, options } = req.body;
        const article = await generateArticle(product_id, template_type, options);
        res.json({ success: true, data: article });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
```

#### **Error Handling**
```javascript
class APIError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }
}

function errorHandler(err, req, res, next) {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
            code: err.code
        });
    }
    
    console.error(err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
}
```

### 3. Database Integration

#### **MongoDB Schema**
```javascript
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    sku: { type: String, required: true },
    name: { type: String, required: true },
    category: String,
    subcategory: String,
    specifications: mongoose.Schema.Types.Mixed,
    pricing: {
        retail_price: Number,
        wholesale_price: Number,
        currency: String
    },
    inventory: {
        in_stock: Number,
        available: Boolean
    },
    images: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const articleSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    template_type: String,
    title: String,
    content: String,
    metadata: mongoose.Schema.Types.Mixed,
    created_at: { type: Date, default: Date.now },
    generated_by: String
});
```

#### **Query Optimization**
```javascript
// Indexes for performance
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "name": "text" });
db.products.createIndex({ "sku": 1 });

// Aggregation pipeline for statistics
const stats = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
]);
```

---

## 🐛 Troubleshooting Guide

### 1. Common Issues

#### **Template Not Found**
```
Problem: No template found for product type
Error: "No template found for product type: xyz"
```

**Causes:**
- Product type determination logic incorrect
- Template file missing or corrupted
- Case sensitivity in type names

**Solutions:**
1. Check product name and category in data
2. Verify template exists in templates file
3. Update type determination logic
4. Add fallback to generic template

#### **Variable Replacement Failed**
```
Problem: Variables not replaced in content
Symptom: Content shows {variable_name} instead of actual values
```

**Causes:**
- Variable names don't match between template and data
- Product data missing required fields
- Case sensitivity in variable names

**Solutions:**
1. Verify variable names in template
2. Check product data structure
3. Add default values for missing variables
4. Use case-insensitive matching

#### **Performance Issues**
```
Problem: Slow article generation
Symptom: Response time > 5 seconds
```

**Causes:**
- Large template files
- Inefficient variable extraction
- No caching mechanism
- Database queries not optimized

**Solutions:**
1. Implement caching layer
2. Optimize variable extraction
3. Use lazy loading for templates
4. Add database indexes

### 2. Debugging Techniques

#### **Logging Strategy**
```javascript
class Logger {
    static debug(message, data = {}) {
        console.log(`[DEBUG] ${message}`, data);
    }
    
    static info(message, data = {}) {
        console.log(`[INFO] ${message}`, data);
    }
    
    static error(message, error = {}) {
        console.error(`[ERROR] ${message}`, error);
    }
    
    static performance(operation, startTime) {
        const duration = performance.now() - startTime;
        console.log(`[PERF] ${operation}: ${duration.toFixed(2)}ms`);
    }
}
```

#### **Unit Testing**
```javascript
describe('ArticleGenerator', () => {
    test('should determine product type correctly', () => {
        const generator = new ArticleGenerator();
        
        expect(generator.determineProductType({ name: 'Bu lông M6x20' })).toBe('bolt');
        expect(generator.determineProductType({ name: 'Điện trở 10kΩ' })).toBe('resistor');
        expect(generator.determineProductType({ name: 'Unknown product' })).toBe('generic');
    });
    
    test('should extract variables correctly', () => {
        const generator = new ArticleGenerator();
        const product = {
            name: 'Bu lông M6x20',
            id: 'B001',
            category: 'Cơ khí'
        };
        
        const variables = generator.extractVariables(product, 'bolt');
        
        expect(variables.product_name).toBe('Bu lông M6x20');
        expect(variables.product_code).toBe('B001');
        expect(variables.category).toBe('Cơ khí');
    });
});
```

#### **Integration Testing**
```javascript
describe('API Integration', () => {
    test('should generate article via API', async () => {
        const response = await request(app)
            .post('/api/v1/articles')
            .send({
                product_id: 'B001',
                template_type: 'bolt'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBeDefined();
        expect(response.body.data.content).toBeDefined();
    });
});
```

---

## 📊 Performance Optimization

### 1. Caching Strategies

#### **Memory Cache**
```javascript
class CacheManager {
    constructor() {
        this.cache = new Map();
        this.maxSize = 1000;
        this.ttl = 3600000; // 1 hour
    }
    
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }
}
```

#### **Redis Cache**
```javascript
const Redis = require('redis');
const client = Redis.createClient();

class RedisCache {
    async set(key, value, ttl = 3600) {
        await client.setex(key, ttl, JSON.stringify(value));
    }
    
    async get(key) {
        const value = await client.get(key);
        return value ? JSON.parse(value) : null;
    }
    
    async del(key) {
        await client.del(key);
    }
}
```

### 2. Database Optimization

#### **Connection Pooling**
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
});
```

#### **Query Optimization**
```javascript
// Use indexes effectively
const optimizedQuery = `
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category = ?
    ORDER BY p.name
    LIMIT ? OFFSET ?
`;

// Use prepared statements
const [rows] = await pool.execute(optimizedQuery, [category, limit, offset]);
```

### 3. Frontend Optimization

#### **Lazy Loading**
```javascript
class LazyLoader {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadContent(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        });
    }
    
    observe(element) {
        this.observer.observe(element);
    }
    
    async loadContent(element) {
        const content = await this.fetchContent(element.dataset.url);
        element.innerHTML = content;
    }
}
```

#### **Virtual Scrolling**
```javascript
class VirtualScroller {
    constructor(container, itemHeight, renderItem) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.renderItem = renderItem;
        this.visibleItems = Math.ceil(container.clientHeight / itemHeight);
        this.scrollTop = 0;
        
        this.setupScrollListener();
    }
    
    setupScrollListener() {
        this.container.addEventListener('scroll', () => {
            this.updateVisibleItems();
        });
    }
    
    updateVisibleItems() {
        const startIndex = Math.floor(this.container.scrollTop / this.itemHeight);
        const endIndex = startIndex + this.visibleItems;
        
        // Render only visible items
        for (let i = startIndex; i <= endIndex; i++) {
            this.renderItem(i);
        }
    }
}
```

---

## 🔒 Security Considerations

### 1. Input Validation

#### **Parameter Validation**
```javascript
const Joi = require('joi');

const articleRequestSchema = Joi.object({
    product_id: Joi.string().required(),
    template_type: Joi.string().valid('bolt', 'resistor', 'bearing', 'capacitor', 'inductor', 'diode', 'transistor', 'ic', 'sensor', 'connector', 'generic'),
    options: Joi.object({
        language: Joi.string().valid('vi', 'en'),
        format: Joi.string().valid('html', 'json', 'markdown'),
        include_interactive: Joi.boolean()
    }).optional()
});

function validateRequest(req, res, next) {
    const { error } = articleRequestSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    next();
}
```

#### **SQL Injection Prevention**
```javascript
// Use parameterized queries
const getProductById = async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
};

// Avoid string concatenation
// BAD: `SELECT * FROM products WHERE id = '${id}'`
// GOOD: 'SELECT * FROM products WHERE id = ?', [id]
```

### 2. Rate Limiting

#### **API Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/api/', limiter);
```

#### **User-based Rate Limiting**
```javascript
const userRateLimit = new Map();

function checkUserRateLimit(userId, limit = 1000, windowMs = 3600000) {
    const now = Date.now();
    const userLimit = userRateLimit.get(userId);
    
    if (!userLimit || now - userLimit.resetTime > windowMs) {
        userRateLimit.set(userId, { count: 1, resetTime: now });
        return true;
    }
    
    if (userLimit.count >= limit) {
        return false;
    }
    
    userLimit.count++;
    return true;
}
```

### 3. Authentication & Authorization

#### **JWT Authentication**
```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, error: 'Token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}
```

#### **Role-based Access Control**
```javascript
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: 'Insufficient permissions' });
        }
        next();
    };
}

// Usage
app.post('/api/v1/articles', authenticateToken, authorizeRole(['admin', 'editor']), generateArticle);
```

---

## 📱 Mobile Optimization

### 1. Responsive Design

#### **CSS Media Queries**
```css
/* Mobile-first approach */
.article-content {
    font-size: 16px;
    line-height: 1.6;
}

/* Tablet */
@media (min-width: 768px) {
    .article-content {
        font-size: 18px;
        line-height: 1.7;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .article-content {
        font-size: 20px;
        line-height: 1.8;
        max-width: 800px;
        margin: 0 auto;
    }
}
```

#### **Touch-friendly Interface**
```css
.button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 24px;
    font-size: 16px;
}

.interactive-element {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

@media (hover: hover) {
    .interactive-element:hover {
        background-color: #f0f0f0;
    }
}
```

### 2. Performance Optimization

#### **Image Optimization**
```javascript
function optimizeImage(url, maxWidth = 800) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const scale = Math.min(maxWidth / img.width, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = url;
    });
}
```

#### **Lazy Loading Images**
```html
<img 
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
    data-src="https://example.com/image.jpg"
    loading="lazy"
    alt="Product image"
    class="lazy-image"
>
```

---

## 🌐 Internationalization

### 1. Multi-language Support

#### **Language Detection**
```javascript
function detectLanguage(userAgent, acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0]);
    const supportedLanguages = ['vi', 'en', 'ja'];
    
    for (const lang of languages) {
        if (supportedLanguages.includes(lang)) {
            return lang;
        }
    }
    
    return 'en'; // default language
}
```

#### **Translation System**
```javascript
const translations = {
    vi: {
        'product_name': 'Tên sản phẩm',
        'specifications': 'Thông số kỹ thuật',
        'applications': 'Ứng dụng'
    },
    en: {
        'product_name': 'Product Name',
        'specifications': 'Specifications',
        'applications': 'Applications'
    },
    ja: {
        'product_name': '製品名',
        'specifications': '仕様',
        'applications': '応用'
    }
};

function translate(key, language = 'en') {
    return translations[language]?.[key] || key;
}
```

### 2. Cultural Considerations

#### **Number Formatting**
```javascript
function formatNumber(number, locale = 'en-US') {
    return new Intl.NumberFormat(locale).format(number);
}

// Examples
formatNumber(1234.56, 'en-US'); // "1,234.56"
formatNumber(1234.56, 'vi-VN'); // "1.234,56"
formatNumber(1234.56, 'ja-JP'); // "1,234.56"
```

#### **Date Formatting**
```javascript
function formatDate(date, locale = 'en-US') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}
```

---

## 📈 Analytics & Monitoring

### 1. Performance Metrics

#### **Response Time Tracking**
```javascript
class PerformanceTracker {
    constructor() {
        this.metrics = new Map();
    }
    
    startTimer(operation) {
        this.metrics.set(operation, {
            startTime: performance.now(),
            count: (this.metrics.get(operation)?.count || 0) + 1
        });
    }
    
    endTimer(operation) {
        const metric = this.metrics.get(operation);
        if (metric) {
            const duration = performance.now() - metric.startTime;
            metric.totalTime = (metric.totalTime || 0) + duration;
            metric.averageTime = metric.totalTime / metric.count;
        }
    }
    
    getMetrics() {
        const result = {};
        for (const [operation, metric] of this.metrics) {
            result[operation] = {
                count: metric.count,
                averageTime: metric.averageTime,
                totalTime: metric.totalTime
            };
        }
        return result;
    }
}
```

#### **Error Tracking**
```javascript
class ErrorTracker {
    constructor() {
        this.errors = [];
    }
    
    track(error, context = {}) {
        this.errors.push({
            message: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
        
        // Send to error reporting service
        this.reportError(error, context);
    }
    
    async reportError(error, context) {
        try {
            await fetch('/api/v1/errors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: error.message,
                    stack: error.stack,
                    context,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (reportingError) {
            console.error('Failed to report error:', reportingError);
        }
    }
}
```

### 2. User Analytics

#### **Page View Tracking**
```javascript
function trackPageView(page, userId = null) {
    const data = {
        page,
        userId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    
    // Send to analytics service
    fetch('/api/v1/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
```

#### **User Interaction Tracking**
```javascript
function trackInteraction(action, element, properties = {}) {
    const data = {
        action,
        element,
        properties,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        userId: getUserId()
    };
    
    fetch('/api/v1/analytics/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
```

---

## 🚀 Deployment Guide

### 1. Production Deployment

#### **Docker Configuration**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### **Docker Compose**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=database
      - REDIS_HOST=redis
    depends_on:
      - database
      - redis

  database:
    image: postgres:13
    environment:
      - POSTGRES_DB=article_generator
      - POSTGRES_USER=app_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### **Environment Variables**
```bash
# Production environment
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=app_user
DB_PASSWORD=secure_password
DB_NAME=article_generator
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key
API_RATE_LIMIT=1000
LOG_LEVEL=info
```

### 2. CI/CD Pipeline

#### **GitHub Actions**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/article-generator:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Add deployment commands here
```

---

## 📞 Support & Resources

### 1. Help Resources

#### **Documentation Structure**
```
docs/
├── api/                    # API documentation
├── templates/              # Template development guide
├── integration/            # Integration guides
├── troubleshooting/         # Common issues and solutions
├── best-practices/         # Development best practices
└── examples/              # Code examples
```

#### **Community Support**
- **Discord Server:** https://discord.gg/article-generator
- **GitHub Discussions:** https://github.com/article-generator/discussions
- **Stack Overflow:** Tag with `article-generator`
- **Reddit:** r/ArticleGenerator

### 2. Contact Information

#### **Technical Support**
- **Email:** support@article-generator.ai
- **Response Time:** 24-48 hours
- **Available:** Monday-Friday, 9AM-5PM UTC

#### **Emergency Support**
- **Email:** emergency@article-generator.ai
- **Response Time:** 2-4 hours
- **Available:** 24/7 for critical issues

#### **Partnership Inquiries**
- **Email:** partners@article-generator.ai
- **Response Time:** 48-72 hours
- **Available:** Business hours

---

## 📝 Update Log

### Version 1.0 (2025-04-03)
- Initial release with 11 templates
- Basic and enhanced generators
- Demo interfaces
- Integration guides
- Training documentation
- Assessment toolkit

### Version 1.1 (Planned)
- Additional templates for specialized industries
- Machine learning integration
- Advanced analytics dashboard
- Multi-language support expansion
- Performance improvements

### Version 2.0 (Planned)
- Cloud-native architecture
- Microservices deployment
- Advanced AI features
- Real-time collaboration
- Enterprise features

---

*Knowledge base này sẽ được cập nhật thường xuyên để phản ánh các thay đổi, cải tiến và best practices mới nhất trong hệ thống. Hãy kiểm tra phiên bản mới nhất để có thông tin chi tiết và chính xác nhất.*
