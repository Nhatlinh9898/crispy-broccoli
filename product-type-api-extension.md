# Product Type API Extension Specification

## 🎯 Overview

API extension để hỗ trợ 5 loại sản phẩm mới: Software, Dịch vụ, Sản phẩm số, Bao bì, và Năng lượng, với các endpoints và tính năng đặc thù cho từng loại.

---

## 📡 API Endpoints Mới

### **1. Product Type Management**

#### **GET /api/v2/product-types**
```javascript
// Response
{
  "product_types": [
    {
      "id": "software",
      "name": "Software Products",
      "description": "Software applications and digital tools",
      "categories": ["mobile_app", "desktop_app", "web_app", "enterprise_software"],
      "template_count": 4,
      "total_products": 15420,
      "compliance_standards": ["GDPR", "CCPA", "SOC2", "ISO27001"],
      "content_requirements": {
        "technical_accuracy": "very_high",
        "user_friendly": "high",
        "security_information": "required"
      }
    },
    {
      "id": "services",
      "name": "Professional Services",
      "description": "Consulting and professional service offerings",
      "categories": ["consulting", "training", "maintenance", "professional_services"],
      "template_count": 4,
      "total_products": 8750,
      "compliance_standards": ["ISO9001", "SOC2", "HIPAA", "GDPR"]
    },
    {
      "id": "digital_products",
      "name": "Digital Products",
      "description": "Digital content and educational products",
      "categories": ["online_course", "ebook", "digital_template", "digital_asset"],
      "template_count": 4,
      "total_products": 12300,
      "compliance_standards": ["DMCA", "GDPR", "CCPA", "COPPA"]
    }
  ]
}
```

#### **GET /api/v2/product-types/{type_id}**
```javascript
// Response for software
{
  "id": "software",
  "name": "Software Products",
  "config": {
    "supported_formats": ["ios", "android", "web", "desktop"],
    "security_requirements": ["encryption", "authentication", "privacy_policy"],
    "technical_specs": ["system_requirements", "performance_metrics", "api_documentation"],
    "update_frequency": "weekly",
    "version_control": "required"
  },
  "templates": [
    {
      "id": "mobile_app",
      "name": "Mobile Application Template",
      "sections": 10,
      "variables": {
        "required": 8,
        "optional": 15
      },
      "special_features": ["app_store_optimization", "compatibility_checking", "performance_monitoring"]
    }
  ],
  "integration_partners": [
    {
      "partner": "Apple App Store",
      "integration_type": "api",
      "capabilities": ["app_metadata", "review_analysis", "download_tracking"]
    },
    {
      "partner": "Google Play Store",
      "integration_type": "api",
      "capabilities": ["app_listing", "analytics", "beta_testing"]
    }
  ]
}
```

### **2. Software-Specific Endpoints**

#### **POST /api/v2/software/compatibility-check**
```javascript
// Request Body
{
  "product_data": {
    "platforms": [
      {
        "platform_name": "iOS",
        "min_os_version": "15.0",
        "device_requirements": "iPhone 8 or newer",
        "storage_space": "500MB",
        "ram_requirement": "2GB"
      }
    ],
    "technical_specs": {
      "app_size": "450MB",
      "network_requirements": "WiFi or cellular",
      "permissions": ["camera", "location", "photos"]
    }
  },
  "target_device": {
    "platform": "iOS",
    "os_version": "16.1",
    "device_model": "iPhone 14 Pro",
    "available_storage": "128GB",
    "available_ram": "6GB"
  }
}

// Response
{
  "compatibility_result": {
    "overall_compatibility": "compatible",
    "compatibility_score": 95,
    "warnings": [
      {
        "category": "storage",
        "message": "App requires 500MB, device has 128GB available",
        "severity": "info"
      }
    ],
    "recommendations": [
      "App should work well on this device",
      "Consider optimizing app size for older devices"
    ],
    "feature_compatibility": {
      "camera": "fully_supported",
      "location": "fully_supported", 
      "photos": "fully_supported"
    }
  }
}
```

#### **GET /api/v2/software/app-stores/{store_id}/metadata**
```javascript
// Response for App Store
{
  "store_metadata": {
    "required_fields": [
      {
        "field": "app_name",
        "type": "string",
        "max_length": 30,
        "description": "App name as it appears in the store"
      },
      {
        "field": "description",
        "type": "text",
        "max_length": 4000,
        "description": "App description for store listing"
      },
      {
        "field": "keywords",
        "type": "array",
        "max_items": 100,
        "description": "Keywords for App Store optimization"
      },
      {
        "field": "category",
        "type": "enum",
        "options": ["Games", "Business", "Education", "Entertainment", "Utilities"],
        "description": "Primary app category"
      }
    ],
    "optional_fields": [
      {
        "field": "subtitle",
        "type": "string",
        "max_length": 30,
        "description": "App subtitle"
      },
      {
        "field": "promo_text",
        "type": "string",
        "max_length": 170,
        "description": "Promotional text"
      }
    ],
    "content_guidelines": {
      "prohibited_content": ["adult_content", "violence", "hate_speech"],
      "required_disclosures": ["data_collection", "in_app_purchases"],
      "rating_requirements": {
        "age_rating": "4+", "17+", "9+", "12+"
      }
    }
  }
}
```

### **3. Services-Specific Endpoints**

#### **POST /api/v2/services/booking-availability**
```javascript
// Request Body
{
  "service_type": "consulting",
  "service_id": "strategy_consulting",
  "date_range": {
    "start_date": "2024-02-01",
    "end_date": "2024-02-29"
  },
  "duration": 60,
  "timezone": "UTC",
  "preferences": {
    "time_of_day": ["morning", "afternoon"],
    "days_of_week": ["monday", "wednesday", "friday"]
  }
}

// Response
{
  "availability": {
    "available_slots": [
      {
        "date": "2024-02-05",
        "time": "09:00 UTC",
        "duration": 60,
        "consultant": {
          "name": "John Smith",
          "title": "Senior Strategy Consultant",
          "expertise": ["digital_transformation", "market_entry"]
        },
        "booking_url": "https://api.example.com/book/slot_12345"
      },
      {
        "date": "2024-02-07",
        "time": "14:00 UTC",
        "duration": 60,
        "consultant": {
          "name": "Sarah Johnson",
          "title": "Business Strategy Consultant",
          "expertise": ["growth_strategy", "competitive_analysis"]
        },
        "booking_url": "https://api.example.com/book/slot_12346"
      }
    ],
    "unavailable_dates": [
      {
        "date": "2024-02-12",
        "reason": "Consultant unavailable"
      }
    ],
    "alternatives": {
      "similar_services": [
        {
          "service_id": "business_consulting",
          "service_name": "Business Consulting",
          "next_available": "2024-02-03T10:00:00Z"
        }
      ]
    }
  }
}
```

#### **POST /api/v2/services/roi-calculator**
```javascript
// Request Body
{
  "service_type": "consulting",
  "service_config": {
    "project_duration": "6 months",
    "team_size": 5,
    "current_revenue": 1000000,
    "target_growth": 25,
    "industry": "technology"
  },
  "investment": {
    "consulting_fee": 50000,
    "internal_costs": 15000,
    "technology_costs": 10000
  }
}

// Response
{
  "roi_analysis": {
    "projected_benefits": {
      "revenue_increase": {
        "amount": 250000,
        "timeframe": "12 months",
        "confidence": 85
      },
      "cost_savings": {
        "amount": 75000,
        "source": ["process_optimization", "efficiency_improvements"],
        "timeframe": "6 months"
      },
      "intangible_benefits": [
        "improved_decision_making",
        "enhanced_competitive_position",
        "team_capability_development"
      ]
    },
    "roi_metrics": {
      "total_investment": 75000,
      "total_benefits": 325000,
      "net_benefit": 250000,
      "roi_percentage": 333,
      "payback_period": "3 months"
    },
    "risk_factors": [
      {
        "factor": "market_conditions",
        "impact": "medium",
        "mitigation": "regular_market_analysis"
      },
      {
        "factor": "team_adoption",
        "impact": "low",
        "mitigation": "change_management_program"
      }
    ],
    "assumptions": [
      "Market growth rate of 5% annually",
      "Team maintains current productivity",
      "No major economic disruptions"
    ]
  }
}
```

### **4. Digital Products-Specific Endpoints**

#### **GET /api/v2/digital-products/preview/{product_id}**
```javascript
// Response
{
  "preview_content": {
    "product_info": {
      "title": "Advanced JavaScript Development",
      "type": "online_course",
      "duration": "8 weeks",
      "skill_level": "intermediate",
      "instructor": "Michael Chen"
    },
    "free_content": {
      "introductory_video": {
        "url": "https://cdn.example.com/intro_video.mp4",
        "duration": "5:30",
        "thumbnail": "https://cdn.example.com/intro_thumbnail.jpg"
      },
      "sample_lessons": [
        {
          "lesson_id": "lesson_1_preview",
          "title": "JavaScript Fundamentals Review",
          "duration": "15:00",
          "format": "video",
          "preview_percentage": 20
        }
      ],
      "course_outline": {
        "modules": [
          {
            "module_number": 1,
            "title": "Modern JavaScript Concepts",
            "lessons": 8,
            "duration": "2 weeks",
            "preview_available": true
          }
        ]
      }
    },
    "interactive_elements": {
      "quiz_sample": {
        "questions": 3,
        "time_limit": "10 minutes",
        "topics": ["ES6 features", "async programming"]
      },
      "code_playground": {
        "available": true,
        "languages": ["JavaScript", "TypeScript"],
        "features": ["auto_complete", "error_checking"]
      }
    }
  }
}
```

#### **POST /api/v2/digital-products/licensing-check**
```javascript
// Request Body
{
  "product_id": "advanced_js_course",
  "license_type": "commercial",
  "usage_context": {
    "organization_type": "educational_institution",
    "student_count": 500,
    "usage_type": "curriculum_integration",
    "duration": "academic_year"
  },
  "distribution_plan": {
    "platform": "lms",
    "geographic_scope": "campus_wide",
    "modifications": "none"
  }
}

// Response
{
  "licensing_result": {
    "license_compatibility": "compatible",
    "recommended_license": {
      "type": "educational_license",
      "price": "$2,500 per year",
      "features": [
        "unlimited_student_access",
        "instructor_support",
        "assessment_tools",
        "certificate_generation"
      ],
      "restrictions": [
        "no_resale_allowed",
        "campus_distribution_only",
        "attribution_required"
      ]
    },
    "compliance_check": {
      "copyright_clearance": "passed",
      "dmca_compliance": "compliant",
      "educational_fair_use": "applicable",
      "attribution_requirements": "instructor_name_included"
    },
    "usage_restrictions": {
      "geographic": "campus_only",
      "time_limit": "academic_year_only",
      "user_limit": "500_students",
      "modification_rights": "none"
    },
    "next_steps": [
      "Contact licensing team for custom agreement",
      "Review educational pricing options",
      "Schedule demo for LMS integration"
    ]
  }
}
```

### **5. Multi-Format Content Generation**

#### **POST /api/v2/generate/multi-format**
```javascript
// Request Body
{
  "product_type": "software",
  "template_id": "mobile_app",
  "product_data": {
    "app_name": "TaskMaster Pro",
    "platforms": [
      {
        "platform_name": "iOS",
        "min_os_version": "15.0",
        "app_size": "45MB"
      }
    ]
  },
  "output_formats": [
    {
      "format": "markdown",
      "purpose": "documentation"
    },
    {
      "format": "html",
      "purpose": "website",
      "options": {
        "theme": "modern",
        "responsive": true,
        "interactive_elements": true
      }
    },
    {
      "format": "json",
      "purpose": "api_integration",
      "options": {
        "structured_data": true,
        "metadata": true
      }
    },
    {
      "format": "pdf",
      "purpose": "printable_guide",
      "options": {
        "page_size": "A4",
        "include_toc": true,
        "branding": true
      }
    }
  ],
  "localization": {
    "languages": ["en", "ja", "zh"],
    "currency": "USD",
    "date_format": "ISO8601"
  }
}

// Response
{
  "generation_results": {
    "job_id": "gen_multi_789",
    "status": "completed",
    "outputs": [
      {
        "format": "markdown",
        "file_url": "https://cdn.example.com/content/markdown/taskmaster_pro.md",
        "file_size": "15KB",
        "word_count": 1250
      },
      {
        "format": "html",
        "file_url": "https://cdn.example.com/content/html/taskmaster_pro.html",
        "file_size": "45KB",
        "interactive_elements": 8
      },
      {
        "format": "json",
        "file_url": "https://cdn.example.com/content/json/taskmaster_pro.json",
        "file_size": "8KB",
        "structured": true
      },
      {
        "format": "pdf",
        "file_url": "https://cdn.example.com/content/pdf/taskmaster_pro.pdf",
        "file_size": "125KB",
        "pages": 12
      }
    ],
    "localization_results": {
      "en": {
        "status": "completed",
        "quality_score": 98
      },
      "ja": {
        "status": "completed",
        "quality_score": 92
      },
      "zh": {
        "status": "completed",
        "quality_score": 90
      }
    },
    "generation_metadata": {
      "total_time": "3.2s",
      "template_version": "2.1.0",
      "validation_passed": true
    }
  }
}
```

### **6. Analytics & Insights**

#### **GET /api/v2/analytics/product-type/{type_id}**
```javascript
// Response for software
{
  "analytics": {
    "overview": {
      "total_products": 15420,
      "active_products": 12850,
      "new_products_this_month": 245,
      "updated_products_this_month": 189
    },
    "category_distribution": [
      {
        "category": "mobile_app",
        "count": 8750,
        "percentage": 56.7,
        "growth_rate": 12.3
      },
      {
        "category": "web_app",
        "count": 4200,
        "percentage": 27.2,
        "growth_rate": 18.7
      }
    ],
    "performance_metrics": {
      "average_generation_time": "2.1s",
      "template_usage": {
        "mobile_app": 58.3,
        "web_app": 27.1,
        "desktop_app": 9.2,
        "enterprise_software": 5.4
      },
      "quality_scores": {
        "technical_accuracy": 96.2,
        "user_friendliness": 94.8,
        "compliance": 98.1
      }
    },
    "trending_topics": [
      {
        "topic": "AI_integration",
        "mention_count": 1250,
        "growth_rate": 45.2
      },
      {
        "topic": "cross_platform",
        "mention_count": 980,
        "growth_rate": 32.1
      }
    ]
  }
}
```

---

## 🔧 Enhanced Features

### **1. Smart Content Recommendations**

#### **GET /api/v2/recommendations/content/{product_type_id}**
```javascript
// Response
{
  "recommendations": {
    "content_suggestions": [
      {
        "section": "technical_specifications",
        "suggestion": "Add performance benchmarking data",
        "reason": "85% of top-rated apps include performance metrics",
        "priority": "high",
        "implementation_effort": "medium"
      },
      {
        "section": "user_guide",
        "suggestion": "Include video tutorial links",
        "reason": "Video tutorials increase user engagement by 40%",
        "priority": "medium",
        "implementation_effort": "low"
      }
    ],
    "feature_recommendations": [
      {
        "feature": "interactive_demo",
        "benefit": "Increases conversion rate by 25%",
        "implementation_complexity": "medium"
      }
    ],
    "seo_optimizations": [
      {
        "optimization": "add_schema_markup",
        "impact": "Improves search visibility by 30%",
        "implementation_time": "2 hours"
      }
    ]
  }
}
```

### **2. Compliance Automation**

#### **POST /api/v2/compliance/validate**
```javascript
// Request Body
{
  "product_type": "software",
  "content": {
    "privacy_policy": "Full privacy policy text...",
    "data_collection": ["email", "usage_analytics", "device_info"],
    "third_party_integrations": ["google_analytics", "facebook_sdk"]
  },
  "target_markets": ["EU", "California", "Japan"],
  "compliance_standards": ["GDPR", "CCPA", "APPI"]
}

// Response
{
  "compliance_results": {
    "overall_status": "compliant",
    "score": 92,
    "market_compliance": [
      {
        "market": "EU",
        "standard": "GDPR",
        "status": "compliant",
        "score": 95,
        "issues": []
      },
      {
        "market": "California",
        "standard": "CCPA",
        "status": "compliant",
        "score": 88,
        "warnings": [
          {
            "category": "data_retention",
            "message": "Consider specifying data retention periods",
            "severity": "low"
          }
        ]
      }
    ],
    "required_disclosures": [
      {
        "disclosure": "data_processing_purposes",
        "status": "included",
        "location": "privacy_policy_section_3"
      }
    ],
    "missing_elements": [],
    "recommendations": [
      "Add cookie consent mechanism",
      "Implement data deletion process documentation"
    ]
  }
}
```

### **3. Performance Monitoring**

#### **GET /api/v2/monitoring/performance/{generation_id}**
```javascript
// Response
{
  "performance_data": {
    "generation_metrics": {
      "total_time": "2.34s",
      "template_processing": "0.89s",
      "content_generation": "1.12s",
      "format_conversion": "0.33s",
      "validation": "0.15s"
    },
    "quality_metrics": {
      "content_quality_score": 94.2,
      "technical_accuracy": 96.8,
      "readability_score": 91.5,
      "seo_score": 88.3
    },
    "resource_usage": {
      "memory_peak": "256MB",
      "cpu_usage": "45%",
      "api_calls": 12,
      "cache_hits": 8
    },
    "optimization_suggestions": [
      {
        "area": "template_processing",
        "suggestion": "Cache template variables",
        "potential_improvement": "15% faster"
      }
    ]
  }
}
```

---

## 🔐 Enhanced Security

### **1. API Key Management**

#### **POST /api/v2/auth/api-keys**
```javascript
// Request Body
{
  "key_name": "Mobile App Generator",
  "permissions": [
    "software:read",
    "software:generate",
    "analytics:read"
  ],
  "rate_limits": {
    "requests_per_hour": 1000,
    "requests_per_day": 10000
  },
  "ip_restrictions": ["192.168.1.0/24", "10.0.0.0/8"],
  "expiry_date": "2024-12-31T23:59:59Z"
}

// Response
{
  "api_key": "ak_live_2h8y7x6w5v4u3i2o1p0",
  "key_id": "key_123456789",
  "status": "active",
  "created_at": "2024-01-20T10:30:00Z",
  "permissions": [
    "software:read",
    "software:generate",
    "analytics:read"
  ]
}
```

### **2. Webhook Security**

#### **POST /api/v2/webhooks/register**
```javascript
// Request Body
{
  "webhook_url": "https://your-app.com/webhooks/content-generated",
  "events": [
    "content.completed",
    "content.failed",
    "template.updated"
  ],
  "secret": "your_webhook_secret",
  "retry_policy": {
    "max_retries": 3,
    "retry_delay": 60
  },
  "filters": {
    "product_types": ["software", "digital_products"],
    "min_quality_score": 90
  }
}

// Response
{
  "webhook_id": "wh_123456789",
  "status": "active",
  "verification_token": "verify_abc123",
  "test_url": "https://api.example.com/webhooks/test/wh_123456789"
}
```

---

## 📊 Integration Examples

### **1. Mobile App Store Integration**

```javascript
class AppStoreContentGenerator {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async generateAppStoreContent(appData) {
    // Step 1: Generate base content
    const contentResponse = await fetch(`${this.baseUrl}/api/v2/generate/multi-format`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_type: 'software',
        template_id: 'mobile_app',
        product_data: appData,
        output_formats: [
          { format: 'json', purpose: 'api_integration' },
          { format: 'html', purpose: 'preview' }
        ]
      })
    });

    const content = await contentResponse.json();

    // Step 2: Check store compatibility
    const compatibilityResponse = await fetch(`${this.baseUrl}/api/v2/software/compatibility-check`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_data: appData,
        target_device: appData.target_device
      })
    });

    const compatibility = await compatibilityResponse.json();

    // Step 3: Validate compliance
    const complianceResponse = await fetch(`${this.baseUrl}/api/v2/compliance/validate`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_type: 'software',
        content: content.outputs[0].content,
        target_markets: ['US', 'EU', 'JP']
      })
    });

    const compliance = await complianceResponse.json();

    return {
      content: content.outputs[0],
      compatibility,
      compliance,
      ready_for_submission: compliance.overall_status === 'compliant'
    };
  }
}

// Usage
const generator = new AppStoreContentGenerator('your_api_key');
const appContent = await generator.generateAppStoreContent({
  app_name: 'TaskMaster Pro',
  platforms: [{ platform_name: 'iOS', min_os_version: '15.0' }],
  target_device: { platform: 'iOS', os_version: '16.1' }
});
```

### **2. Service Booking Integration**

```javascript
class ServiceBookingSystem {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async createServiceBooking(serviceType, preferences) {
    // Step 1: Check availability
    const availabilityResponse = await fetch(`${this.baseUrl}/api/v2/services/booking-availability`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_type: serviceType,
        date_range: preferences.date_range,
        duration: preferences.duration,
        timezone: preferences.timezone
      })
    });

    const availability = await availabilityResponse.json();

    if (availability.available_slots.length === 0) {
      return { status: 'no_availability', alternatives: availability.alternatives };
    }

    // Step 2: Generate booking confirmation content
    const contentResponse = await fetch(`${this.baseUrl}/api/v2/generate`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_type: 'services',
        template_id: 'consulting',
        product_data: {
          service_name: availability.available_slots[0].consultant.name,
          booking_details: availability.available_slots[0]
        }
      })
    });

    const content = await contentResponse.json();

    // Step 3: Create booking
    const bookingResponse = await fetch(availability.available_slots[0].booking_url, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_info: preferences.customer_info,
        special_requirements: preferences.special_requirements
      })
    });

    const booking = await bookingResponse.json();

    return {
      booking,
      confirmation_content: content.content,
      next_steps: content.next_steps
    };
  }
}

// Usage
const bookingSystem = new ServiceBookingSystem('your_api_key');
const booking = await bookingSystem.createServiceBooking('consulting', {
  date_range: { start_date: '2024-02-01', end_date: '2024-02-29' },
  duration: 60,
  timezone: 'UTC',
  customer_info: { name: 'John Doe', email: 'john@example.com' }
});
```

---

*API specification này cung cấp comprehensive endpoints để hỗ trợ 5 loại sản phẩm mới với các tính năng đặc thù và integration capabilities mạnh mẽ.*
