# Multi-Industry API Design Specification

## 🎯 Overview

API design để hỗ trợ multi-industry content generation system với khả năng mở rộng linh hoạt cho 6 ngành hàng và các ngành tương lai.

---

## 🏗️ Architecture Overview

### **Core Components**
```
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Authentication │ Rate Limiting │ Validation │ Logging      │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                 Business Logic Layer                         │
├─────────────────────────────────────────────────────────────┤
│  Template Engine │ Industry Manager │ Content Generator    │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                   Data Access Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Template Store │ Product Data │ Industry Config │ Cache     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### **1. Industry Management**

#### **GET /api/v1/industries**
```javascript
// Response
{
  "industries": [
    {
      "id": "consumer_electronics",
      "name": "Consumer Electronics",
      "description": "Electronic devices for consumer use",
      "product_types": ["smartphone", "appliance", "accessory"],
      "status": "active",
      "template_count": 12,
      "compliance_standards": ["CE", "FCC", "RoHS"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 6
  }
}
```

#### **GET /api/v1/industries/{industry_id}**
```javascript
// Response
{
  "id": "consumer_electronics",
  "name": "Consumer Electronics",
  "description": "Electronic devices for consumer use",
  "config": {
    "product_types": ["smartphone", "appliance", "accessory"],
    "compliance_standards": ["CE", "FCC", "RoHS"],
    "required_sections": ["overview", "specifications", "safety"],
    "content_requirements": {
      "technical_accuracy": "high",
      "user_friendly": "high"
    }
  },
  "templates": [
    {
      "id": "smartphone",
      "name": "Smartphone Component Template",
      "section_count": 10,
      "variables": {
        "required": 8,
        "optional": 12
      }
    }
  ]
}
```

### **2. Template Management**

#### **GET /api/v1/industries/{industry_id}/templates**
```javascript
// Query Parameters
// ?product_type=smartphone&sections=overview,specifications&format=detailed

// Response
{
  "templates": [
    {
      "id": "smartphone",
      "name": "Smartphone Component Template",
      "description": "Template for smartphone components",
      "sections": [
        {
          "id": "overview",
          "title": "Product Overview",
          "content_type": "markdown",
          "required_variables": ["product_name", "component_type"],
          "optional_variables": ["key_benefits", "features"]
        }
      ],
      "metadata": {
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-20T14:22:00Z",
        "version": "1.2.0",
        "usage_count": 1250
      }
    }
  ]
}
```

#### **POST /api/v1/industries/{industry_id}/templates**
```javascript
// Request Body
{
  "name": "New Template",
  "description": "Template description",
  "product_type": "new_product_type",
  "sections": [
    {
      "id": "overview",
      "title": "Product Overview",
      "content": "## {{product_name}}\n\n{{description}}",
      "variables": ["product_name", "description"],
      "required": true
    }
  ],
  "validation_rules": {
    "required_sections": ["overview"],
    "variable_validation": {
      "product_name": {
        "type": "string",
        "min_length": 3,
        "max_length": 100
      }
    }
  }
}

// Response
{
  "template_id": "new_template_123",
  "status": "created",
  "validation_status": "passed"
}
```

### **3. Content Generation**

#### **POST /api/v1/generate**
```javascript
// Request Body
{
  "industry_id": "consumer_electronics",
  "template_id": "smartphone",
  "product_data": {
    "product_name": "iPhone 15 Pro Max Case",
    "component_type": "Protective Case",
    "device_models": "iPhone 15 Pro Max",
    "dimensions": "159.9 x 76.7 x 8.25 mm",
    "weight": "45g",
    "material": "Polycarbonate with TPU bumpers",
    "color_options": "Black, Blue, Clear, Pink",
    "warranty_period": "1 year",
    "features": [
      {
        "name": "Military-grade protection",
        "description": "MIL-STD-810H certified drop protection"
      }
    ]
  },
  "generation_options": {
    "format": "markdown",
    "language": "en",
    "include_sections": ["all"],
    "custom_sections": [],
    "validation_level": "strict",
    "seo_optimization": true
  }
}

// Response
{
  "generation_id": "gen_123456",
  "status": "completed",
  "content": {
    "markdown": "# iPhone 15 Pro Max Case\n\n...",
    "html": "<h1>iPhone 15 Pro Max Case</h1>...",
    "word_count": 1250,
    "section_count": 10
  },
  "metadata": {
    "generation_time": "2.3s",
    "template_version": "1.2.0",
    "validation_passed": true,
    "seo_score": 92
  }
}
```

#### **POST /api/v1/generate/batch**
```javascript
// Request Body
{
  "industry_id": "consumer_electronics",
  "template_id": "smartphone",
  "products": [
    {
      "product_id": "prod_001",
      "product_data": { /* product data */ }
    },
    {
      "product_id": "prod_002", 
      "product_data": { /* product data */ }
    }
  ],
  "batch_options": {
    "parallel_processing": true,
    "max_concurrent": 5,
    "callback_url": "https://your-api.com/webhook",
    "output_format": "json"
  }
}

// Response
{
  "batch_id": "batch_789",
  "status": "processing",
  "estimated_completion": "2024-01-20T15:45:00Z",
  "product_count": 100
}
```

### **4. Product Data Management**

#### **POST /api/v1/products/validate**
```javascript
// Request Body
{
  "industry_id": "consumer_electronics",
  "template_id": "smartphone",
  "product_data": {
    "product_name": "Test Product",
    "component_type": "Test Component"
  }
}

// Response
{
  "validation_status": "passed",
  "missing_variables": [],
  "invalid_variables": [],
  "warnings": [
    {
      "field": "warranty_period",
      "message": "Recommended to include warranty information"
    }
  ],
  "completeness_score": 85
}
```

#### **GET /api/v1/products/suggest/{industry_id}/{template_id}**
```javascript
// Query Parameters
// ?product_name=iPhone%20case&partial_data=true

// Response
{
  "suggestions": {
    "component_type": "Protective Case",
    "category": "Accessories",
    "typical_features": [
      "Drop protection",
      "Scratch resistance", 
      "Wireless charging compatible"
    ],
    "typical_specifications": {
      "material": "TPU, Polycarbonate",
      "weight_range": "20-60g",
      "warranty_period": "1-2 years"
    }
  }
}
```

### **5. Analytics and Monitoring**

#### **GET /api/v1/analytics/usage**
```javascript
// Query Parameters
// ?industry=consumer_electronics&date_range=2024-01-01,2024-01-31

// Response
{
  "usage_stats": {
    "total_generations": 15420,
    "unique_products": 3250,
    "popular_templates": [
      {
        "template_id": "smartphone",
        "usage_count": 8950,
        "success_rate": 98.5
      }
    ],
    "performance_metrics": {
      "avg_generation_time": "2.1s",
      "success_rate": 97.8,
      "error_rate": 2.2
    }
  }
}
```

#### **GET /api/v1/health**
```javascript
// Response
{
  "status": "healthy",
  "version": "2.1.0",
  "uptime": "15 days 4 hours",
  "services": {
    "template_engine": "healthy",
    "database": "healthy", 
    "cache": "healthy",
    "queue": "healthy"
  },
  "performance": {
    "response_time_p95": "450ms",
    "throughput": "1250 req/min",
    "error_rate": "0.2%"
  }
}
```

---

## 🔐 Authentication & Security

### **API Key Authentication**
```javascript
// Headers
{
  "X-API-Key": "your_api_key_here",
  "X-Request-ID": "unique_request_id",
  "Content-Type": "application/json"
}
```

### **Rate Limiting**
```
- Free Tier: 100 requests/hour
- Basic Tier: 1,000 requests/hour  
- Pro Tier: 10,000 requests/hour
- Enterprise: Unlimited
```

### **Data Validation**
```javascript
// Request Validation Schema
{
  "industry_id": {
    "type": "string",
    "pattern": "^[a-z_]+$",
    "enum": ["consumer_electronics", "automotive", "medical", "aerospace", "industrial_machinery", "construction"]
  },
  "product_data": {
    "type": "object",
    "min_properties": 3,
    "validation": "template_specific"
  }
}
```

---

## 🚀 Advanced Features

### **1. Template Versioning**
```javascript
// GET /api/v1/industries/{industry_id}/templates/{template_id}/versions
{
  "versions": [
    {
      "version": "1.2.0",
      "release_date": "2024-01-20",
      "changes": ["Added safety section", "Updated variables"],
      "deprecated": false
    },
    {
      "version": "1.1.0", 
      "release_date": "2023-12-15",
      "changes": ["Improved compatibility section"],
      "deprecated": true
    }
  ]
}
```

### **2. Custom Section Injection**
```javascript
// POST /api/v1/generate/custom
{
  "industry_id": "consumer_electronics",
  "template_id": "smartphone",
  "product_data": { /* product data */ },
  "custom_sections": [
    {
      "id": "environmental_impact",
      "title": "Environmental Impact",
      "content": "## Environmental Impact\n\n{{eco_rating}}",
      "position": "after_safety"
    }
  ]
}
```

### **3. Multi-language Support**
```javascript
// POST /api/v1/generate
{
  "industry_id": "consumer_electronics",
  "template_id": "smartphone", 
  "product_data": { /* product data */ },
  "generation_options": {
    "language": "ja",
    "localization": {
      "date_format": "YYYY-MM-DD",
      "currency": "JPY",
      "units": "metric"
    }
  }
}
```

### **4. Real-time Generation Status**
```javascript
// WebSocket: wss://api.example.com/ws/generation/{generation_id}
{
  "event": "progress",
  "data": {
    "generation_id": "gen_123456",
    "status": "processing",
    "progress": 65,
    "current_section": "specifications",
    "estimated_remaining": "45s"
  }
}
```

---

## 📊 Performance Optimization

### **Caching Strategy**
```javascript
// Template Cache
{
  "template_versions": {
    "cache_duration": "1h",
    "invalidation": "on_update"
  },
  "generated_content": {
    "cache_duration": "24h", 
    "key_pattern": "{industry}_{template}_{product_hash}"
  }
}
```

### **Batch Processing**
```javascript
// Async Batch Generation
{
  "batch_config": {
    "max_batch_size": 1000,
    "processing_timeout": "30m",
    "retry_attempts": 3,
    "dead_letter_queue": true
  }
}
```

### **Load Balancing**
```javascript
// Service Distribution
{
  "template_engine": {
    "instances": 3,
    "load_balancer": "round_robin"
  },
  "content_generator": {
    "instances": 5,
    "load_balancer": "least_connections"
  }
}
```

---

## 🔧 Integration Examples

### **JavaScript/Node.js Client**
```javascript
class ContentGeneratorClient {
  constructor(apiKey, baseUrl = 'https://api.example.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async generateContent(industryId, templateId, productData, options = {}) {
    const response = await fetch(`${this.baseUrl}/api/v1/generate`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        industry_id: industryId,
        template_id: templateId,
        product_data: productData,
        generation_options: options
      })
    });

    return response.json();
  }

  async validateProductData(industryId, templateId, productData) {
    const response = await fetch(`${this.baseUrl}/api/v1/products/validate`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        industry_id: industryId,
        template_id: templateId,
        product_data: productData
      })
    });

    return response.json();
  }
}

// Usage
const client = new ContentGeneratorClient('your_api_key');
const content = await client.generateContent(
  'consumer_electronics',
  'smartphone',
  {
    product_name: 'iPhone 15 Pro Max Case',
    component_type: 'Protective Case'
  }
);
```

### **Python Client**
```python
import requests
from typing import Dict, Any

class ContentGeneratorAPI:
    def __init__(self, api_key: str, base_url: str = "https://api.example.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        }

    def generate_content(self, industry_id: str, template_id: str, 
                         product_data: Dict[str, Any], options: Dict[str, Any] = None) -> Dict[str, Any]:
        payload = {
            "industry_id": industry_id,
            "template_id": template_id,
            "product_data": product_data,
            "generation_options": options or {}
        }
        
        response = requests.post(
            f"{self.base_url}/api/v1/generate",
            json=payload,
            headers=self.headers
        )
        
        return response.json()

# Usage
api = ContentGeneratorAPI("your_api_key")
content = api.generate_content(
    "consumer_electronics",
    "smartphone", 
    {
        "product_name": "iPhone 15 Pro Max Case",
        "component_type": "Protective Case"
    }
)
```

---

## 📈 Monitoring & Analytics

### **Key Metrics**
- **Generation Speed**: Average time per article
- **Success Rate**: Percentage of successful generations
- **Template Usage**: Most/least used templates
- **Industry Distribution**: Usage by industry
- **Error Analysis**: Common errors and patterns

### **Alerting**
- **Performance Alerts**: Generation time > 5s
- **Error Rate Alerts**: Error rate > 5%
- **Capacity Alerts**: Queue depth > 1000
- **Service Health**: Service downtime > 1m

---

*API specification này cung cấp foundation vững chắc để mở rộng hệ thống content generation sang multiple industries với khả năng scale và maintainability cao.*
