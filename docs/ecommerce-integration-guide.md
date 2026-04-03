# Hướng dẫn Tích hợp Dữ liệu Thương mại Điện tử

## Tổng quan

File `ecommerce-products.json` chứa dữ liệu sản phẩm chuẩn để tích hợp với các nền tảng thương mại điện tử. Dữ liệu được cấu trúc theo chuẩn REST API và có thể dễ dàng tích hợp với các hệ thống phổ biến.

## Cấu trúc Dữ liệu

### 1. Metadata
```json
{
  "metadata": {
    "version": "1.0",
    "generated_date": "2025-04-03T10:46:00Z",
    "total_products": 15,
    "categories": 4,
    "source": "部品分類マスタ (分類見直し版)"
  }
}
```

### 2. Categories
```json
{
  "categories": [
    {
      "id": "cat_mechanical",
      "name": "Linh kiện cơ khí",
      "name_en": "Mechanical Parts",
      "description": "Các linh kiện cơ khí, fastener, vòng bi và kết cấu",
      "icon": "fas fa-cogs",
      "product_count": 8
    }
  ]
}
```

### 3. Products
```json
{
  "products": [
    {
      "id": "M001-001",
      "sku": "M001-001",
      "name": "Bu lông lục giác M6x20",
      "name_en": "Hex Bolt M6x20",
      "description": "Mô tả chi tiết sản phẩm",
      "category_id": "cat_mechanical",
      "brand": "Nitto Seiko",
      "specifications": { ... },
      "pricing": { ... },
      "inventory": { ... },
      "images": [ ... ],
      "seo": { ... },
      "shipping": { ... },
      "ratings": { ... }
    }
  ]
}
```

## Các Nền tảng Hỗ trợ

### 1. Shopify
```javascript
// Shopify Product Import
const shopifyProduct = {
  title: product.name,
  body_html: product.description,
  vendor: product.manufacturer,
  product_type: product.subcategory,
  variants: [{
    sku: product.sku,
    price: product.pricing.retail_price / 1000, // Convert to thousands VND
    inventory_management: "shopify",
    inventory_quantity: product.inventory.in_stock,
    weight: product.shipping.weight,
    weight_unit: "g"
  }],
  images: product.images.map(img => ({
    src: img.url,
    alt: img.alt
  })),
  tags: [product.category, product.subcategory, product.brand]
};
```

### 2. WooCommerce (WordPress)
```php
// WooCommerce Product Import
$wc_product = [
  'name' => $product['name'],
  'description' => $product['description'],
  'sku' => $product['sku'],
  'regular_price' => $product['pricing']['retail_price'],
  'manage_stock' => true,
  'stock_quantity' => $product['inventory']['in_stock'],
  'weight' => $product['shipping']['weight'],
  'categories' => [$product['category_id']],
  'attributes' => array_map(function($attr) {
    return [
      'name' => $attr['name'],
      'options' => [$attr['value']],
      'visible' => true,
      'variation' => false
    ];
  }, $product['attributes'])
];
```

### 3. Magento
```xml
<!-- Magento Product Import XML -->
<product>
  <sku>${product.sku}</sku>
  <name>${product.name}</name>
  <description>${product.description}</description>
  <price>${product.pricing.retail_price}</price>
  <special_price>${product.pricing.wholesale_price}</special_price>
  <stock_data>
    <qty>${product.inventory.in_stock}</qty>
    <is_in_stock>${product.inventory.available ? 1 : 0}</is_in_stock>
  </stock_data>
  <weight>${product.shipping.weight}</weight>
  <category_ids>${product.category_id}</category_ids>
</product>
```

### 4. Laravel E-commerce
```php
// Laravel Model
class Product extends Model
{
    protected $fillable = [
        'id', 'sku', 'name', 'description', 'category_id',
        'brand', 'manufacturer', 'origin', 'specifications',
        'pricing', 'inventory', 'images', 'seo', 'shipping'
    ];

    protected $casts = [
        'specifications' => 'json',
        'pricing' => 'json',
        'inventory' => 'json',
        'images' => 'json',
        'seo' => 'json',
        'shipping' => 'json'
    ];
}
```

## API Endpoints

### 1. Lấy danh sách sản phẩm
```
GET /api/v1/products
GET /api/v1/products?category=cat_mechanical
GET /api/v1/products?limit=10&offset=0
```

### 2. Lấy chi tiết sản phẩm
```
GET /api/v1/products/{id}
```

### 3. Tìm kiếm sản phẩm
```
GET /api/v1/search?q=bu long&category=cat_mechanical
```

### 4. Kiểm tra tồn kho
```
GET /api/v1/inventory/{sku}
```

### 5. Lấy giá sản phẩm
```
GET /api/v1/pricing/{sku}
```

## Integration Code Examples

### 1. JavaScript/Node.js
```javascript
const axios = require('axios');

class EcommerceAPI {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async getProducts(category = null) {
    try {
      const url = category 
        ? `${this.baseURL}/products?category=${category}`
        : `${this.baseURL}/products`;
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      const response = await axios.get(`${this.baseURL}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async searchProducts(query, filters = {}) {
    try {
      const params = new URLSearchParams({
        q: query,
        ...filters
      });
      
      const response = await axios.get(`${this.baseURL}/search?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}

// Usage
const api = new EcommerceAPI('https://your-api.com', 'your-api-key');

// Get all products
api.getProducts().then(products => {
  console.log('Products:', products);
});

// Get products by category
api.getProducts('cat_mechanical').then(products => {
  console.log('Mechanical parts:', products);
});

// Search products
api.searchProducts('bu lông', { category: 'cat_mechanical' }).then(results => {
  console.log('Search results:', results);
});
```

### 2. Python
```python
import requests
import json

class EcommerceAPI:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.api_key = api_key
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def get_products(self, category=None):
        try:
            url = f"{self.base_url}/products"
            if category:
                url += f"?category={category}"
            
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching products: {e}")
            raise
    
    def get_product(self, product_id):
        try:
            url = f"{self.base_url}/products/{product_id}"
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching product: {e}")
            raise
    
    def search_products(self, query, **filters):
        try:
            params = {'q': query, **filters}
            url = f"{self.base_url}/search"
            response = requests.get(url, params=params, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error searching products: {e}")
            raise

# Usage
api = EcommerceAPI('https://your-api.com', 'your-api-key')

# Get all products
products = api.get_products()
print("Products:", products)

# Get products by category
mechanical_parts = api.get_products('cat_mechanical')
print("Mechanical parts:", mechanical_parts)

# Search products
results = api.search_products('bu lông', category='cat_mechanical')
print("Search results:", results)
```

### 3. PHP
```php
<?php
class EcommerceAPI {
    private $baseURL;
    private $apiKey;
    
    public function __construct($baseURL, $apiKey) {
        $this->baseURL = $baseURL;
        $this->apiKey = $apiKey;
    }
    
    private function getHeaders() {
        return [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json'
        ];
    }
    
    public function getProducts($category = null) {
        $url = $this->baseURL . '/products';
        if ($category) {
            $url .= '?category=' . urlencode($category);
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("API request failed with code: $httpCode");
        }
        
        return json_decode($response, true);
    }
    
    public function getProduct($productId) {
        $url = $this->baseURL . '/products/' . urlencode($productId);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("API request failed with code: $httpCode");
        }
        
        return json_decode($response, true);
    }
    
    public function searchProducts($query, $filters = []) {
        $params = ['q' => $query] + $filters;
        $url = $this->baseURL . '/search?' . http_build_query($params);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->getHeaders());
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("API request failed with code: $httpCode");
        }
        
        return json_decode($response, true);
    }
}

// Usage
$api = new EcommerceAPI('https://your-api.com', 'your-api-key');

// Get all products
$products = $api->getProducts();
echo "Products: " . json_encode($products, JSON_PRETTY_PRINT);

// Get products by category
$mechanicalParts = $api->getProducts('cat_mechanical');
echo "Mechanical parts: " . json_encode($mechanicalParts, JSON_PRETTY_PRINT);

// Search products
$results = $api->searchProducts('bu lông', ['category' => 'cat_mechanical']);
echo "Search results: " . json_encode($results, JSON_PRETTY_PRINT);
?>
```

## Database Schema

### 1. Products Table
```sql
CREATE TABLE products (
    id VARCHAR(20) PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    description TEXT,
    description_en TEXT,
    category_id VARCHAR(50),
    subcategory VARCHAR(100),
    brand VARCHAR(100),
    manufacturer VARCHAR(255),
    origin VARCHAR(100),
    specifications JSON,
    pricing JSON,
    inventory JSON,
    images JSON,
    attributes JSON,
    seo JSON,
    shipping JSON,
    ratings JSON,
    availability JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Categories Table
```sql
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    description TEXT,
    icon VARCHAR(100),
    product_count INT DEFAULT 0,
    parent_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Manufacturers Table
```sql
CREATE TABLE manufacturers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    website VARCHAR(255),
    description TEXT,
    specialties JSON,
    certifications JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## SEO Optimization

### 1. URL Structure
- `/products/{product.slug}` - Product detail page
- `/category/{category.id}` - Category page
- `/manufacturer/{manufacturer.id}` - Manufacturer page
- `/search?q={query}` - Search results

### 2. Meta Tags
```html
<title>{product.seo.title}</title>
<meta name="description" content="{product.seo.description}">
<meta name="keywords" content="{product.seo.keywords.join(', ')}">
<link rel="canonical" href="https://yoursite.com/products/{product.seo.slug}">
```

### 3. Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "{product.name}",
  "image": "{product.images[0].url}",
  "description": "{product.description}",
  "sku": "{product.sku}",
  "brand": {
    "@type": "Brand",
    "name": "{product.brand}"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "{product.manufacturer}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{product.pricing.retail_price}",
    "priceCurrency": "VND",
    "availability": "{product.inventory.available ? 'InStock' : 'OutOfStock'}"
  }
}
```

## Performance Optimization

### 1. Caching
- Redis cho product data
- CDN cho images
- Browser caching cho static assets

### 2. Database Indexing
```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_name ON products(name);
```

### 3. Pagination
```javascript
// Pagination implementation
const getPaginatedProducts = async (page = 1, limit = 20, filters = {}) => {
  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM products 
    WHERE ${buildWhereClause(filters)}
    LIMIT ${limit} OFFSET ${offset}
  `;
  
  return await db.query(query);
};
```

## Security Considerations

### 1. API Authentication
- JWT tokens cho API access
- Rate limiting (1000 requests/hour)
- IP whitelisting cho admin access

### 2. Data Validation
```javascript
const validateProduct = (product) => {
  const required = ['id', 'sku', 'name', 'category_id'];
  const missing = required.filter(field => !product[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  // Validate pricing
  if (product.pricing.retail_price <= 0) {
    throw new Error('Retail price must be positive');
  }
  
  // Validate inventory
  if (product.inventory.in_stock < 0) {
    throw new Error('Stock cannot be negative');
  }
};
```

## Testing

### 1. Unit Tests
```javascript
// Jest test example
describe('Product API', () => {
  test('should get product by ID', async () => {
    const product = await api.getProduct('M001-001');
    expect(product.id).toBe('M001-001');
    expect(product.name).toBe('Bu lông lục giác M6x20');
  });
  
  test('should search products', async () => {
    const results = await api.searchProducts('bu lông');
    expect(results.products).toBeDefined();
    expect(results.products.length).toBeGreaterThan(0);
  });
});
```

### 2. Integration Tests
```javascript
// Integration test with real API
describe('Ecommerce Integration', () => {
  test('should sync products to Shopify', async () => {
    const products = await api.getProducts();
    const shopifyProducts = products.map(convertToShopifyFormat);
    
    for (const product of shopifyProducts) {
      const result = await shopifyAPI.createProduct(product);
      expect(result.id).toBeDefined();
    }
  });
});
```

## Deployment

### 1. Environment Variables
```bash
API_BASE_URL=https://your-api.com
API_KEY=your-secret-api-key
DB_HOST=localhost
DB_NAME=ecommerce
DB_USER=username
DB_PASS=password
REDIS_URL=redis://localhost:6379
```

### 2. Docker Configuration
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Support

Để được hỗ trợ tích hợp, vui lòng liên hệ:
- Email: support@yourcompany.com
- Phone: +84-123-456-789
- Documentation: https://docs.yourcompany.com

## License

Dữ liệu này được cung cấp cho mục đích tích hợp thương mại điện tử. Vui lòng tuân thủ các điều khoản sử dụng và không phân phối lại mà không có sự cho phép.
