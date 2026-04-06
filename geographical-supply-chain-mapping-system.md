# Geographical Supply Chain Mapping System - Documentation

## Tổng quan

Hệ thống Geographical Supply Chain Mapping được phát triển để **xây dựng bản đồ kỹ thuật chi tiết với thông tin sản xuất, cung ứng và nguồn gốc** cho sản phẩm A. Đây là câu trả lời hoàn chỉnh cho yêu cầu xây dựng bản đồ và gán nơi sản xuất, nơi cung ứng, nguồn gốc với thông tin kỹ thuật chi tiết.

## 🗺️ Hệ thống Bản đồ Chuỗi Cung ứng

### 1. **Geographical Mapping Architecture**
```javascript
class GeographicalSupplyChainMapper {
    supplyChainDatabase: Map<productId, SupplyChain>
    manufacturerDatabase: Map<manufacturerId, Manufacturer>
    supplierDatabase: Map<supplierId, Supplier>
    locationDatabase: Map<locationId, Location>
    transportationRoutes: Map<routeId, Route>
    technicalSpecifications: Map<locationId, TechnicalSpecs>
    certificationDatabase: Map<locationId, Certification[]>
}
```

### 2. **Supply Chain Structure**

#### A. Manufacturing Locations
```javascript
manufacturing: [
    {
        locationId: 'loc_jp_osaka',
        name: 'Osaka Manufacturing Plant',
        address: '123 Industrial Ave, Osaka, Japan',
        coordinates: { lat: 34.6937, lng: 135.5023 },
        capabilities: ['cold_heading', 'thread_rolling', 'heat_treatment'],
        capacity: { daily: 10000, monthly: 250000, annually: 3000000 },
        qualityLevel: 'premium',
        certifications: ['ISO 9001', 'ISO 14001', 'IATF 16949'],
        technicalSpecs: {
            tolerances: { dimensional: '±0.01mm', surface: 'Ra 0.8' },
            materialProperties: { hardness: 'HRC 45-50', tensile: '800 MPa' }
        }
    }
]
```

#### B. Supplier Network
```javascript
suppliers: [
    {
        supplierId: 'sup_steel_jp',
        name: 'Nippon Steel Corporation',
        material: 'Steel',
        percentage: 70,
        locations: [
            {
                locationId: 'sup_loc_steel_jp_tokyo',
                name: 'Tokyo Steel Mill',
                coordinates: { lat: 35.6762, lng: 139.6503 },
                qualityLevel: 'premium',
                reliabilityScore: 0.95,
                leadTime: { standard: 14, expedited: 7 }
            }
        ],
        technicalSpecs: {
            materialGrade: 'Grade_A',
            chemicalComposition: { C: '0.2%', Mn: '1.2%', Si: '0.3%' },
            testingStandards: ['JIS G3101', 'ASTM A36']
        }
    }
]
```

#### C. Raw Material Sources
```javascript
rawMaterialSources: [
    {
        sourceId: 'source_iron_au',
        name: 'Australian Iron Ore Mine',
        type: 'mine',
        material: 'Iron Ore',
        location: {
            locationId: 'source_loc_iron_au_wa',
            name: 'Western Australia Mine',
            coordinates: { lat: -23.6980, lng: 119.2362 },
            country: 'Australia',
            region: 'Western Australia'
        },
        annualCapacity: 50000000,
        qualitySpecs: { purity: 0.98, consistency: 0.95 },
        environmentalImpact: { carbonIntensity: 0.5, waterUsage: 1000 },
        politicalStability: 0.90
    }
]
```

#### D. Transportation Routes
```javascript
transportation: [
    {
        from: { lat: -23.6980, lng: 119.2362 }, // Australia mine
        to: { lat: 35.6762, lng: 139.6503 },    // Tokyo steel mill
        distance: 6845.2,
        type: 'raw_material',
        methods: [
            { method: 'sea', time: 228, cost: 342.26, footprint: 102.68 },
            { method: 'air', time: 13.7, cost: 3422.6, footprint: 3422.6 }
        ],
        risks: { weather: 0.1, infrastructure: 0.05, political: 0.02 }
    }
]
```

## 🎯 Interactive Mapping Features

### 1. **Real-time Map Visualization**
- **Leaflet Integration**: Interactive world map with zoom/pan
- **Multi-layer Markers**: Different colors for location types
- **Route Visualization**: Animated transportation routes
- **Popup Information**: Detailed info on click
- **Filter System**: Filter by location type

### 2. **Location Type Classification**
```javascript
locationTypes = {
    manufacturing: { color: '#4caf50', icon: 'fa-industry' },
    suppliers: { color: '#2196f3', icon: 'fa-truck' },
    distribution: { color: '#ff9800', icon: 'fa-warehouse' },
    raw_materials: { color: '#9c27b0', icon: 'fa-mountain' }
}
```

### 3. **Route Analysis**
- **Distance Calculation**: Haversine formula for accurate distances
- **Multi-modal Transport**: Sea, air, rail, truck options
- **Cost Analysis**: Per-method cost breakdown
- **Carbon Footprint**: Environmental impact assessment
- **Risk Assessment**: Route-specific risk factors

## 🔬 Technical Specifications by Location

### 1. **Manufacturing Specifications**
```javascript
locationSpecs: {
    'loc_jp_osaka': {
        manufacturingSpecs: {
            tolerances: {
                dimensional: '±0.01mm',
                surface: 'Ra 0.8μm',
                angular: '±0.5°'
            },
            surfaceFinish: {
                roughness: 'Ra 0.8',
                coating: 'Zinc 8μm',
                hardness: 'HRC 45-50'
            },
            materialProperties: {
                tensile: '800 MPa',
                yield: '640 MPa',
                elongation: '12%',
                hardness: 'HRC 45-50'
            }
        },
        qualityStandards: ['ISO 898', 'JIS B1181', 'ASTM A193'],
        testingMethods: ['tensile_test', 'hardness_test', 'dimensional_inspection']
    }
}
```

### 2. **Quality Metrics by Location**
```javascript
qualityMetrics: {
    'loc_jp_osaka': {
        defectRate: 0.005,        // 0.5%
        firstPassYield: 0.985,     // 98.5%
        reworkRate: 0.015,         // 1.5%
        customerComplaints: 0.001, // 0.1%
        warrantyClaims: 0.002,     // 0.2%
        qualityScore: 0.95
    }
}
```

### 3. **Certifications by Location**
```javascript
certifications: {
    'loc_jp_osaka': {
        quality: ['ISO 9001', 'IATF 16949'],
        environmental: ['ISO 14001', 'ISO 50001'],
        safety: ['OHSAS 18001', 'ISO 45001'],
        industry: ['JIS Q 9100', 'AS9100'],
        international: ['ISO 9001', 'ISO 14001'],
        validity: { 'ISO 9001': '2025-12-31', 'IATF 16949': '2024-06-30' },
        auditResults: { lastAudit: '2024-03-15', score: 95, findings: 2 }
    }
}
```

## 📊 Advanced Analytics

### 1. **Carbon Footprint Analysis**
```javascript
carbonFootprint: {
    total: 45.2,
    unit: 'kg CO2e per unit',
    breakdown: {
        rawMaterialExtraction: 15.3,
        transportation: 12.8,
        manufacturing: 14.1,
        distribution: 2.3,
        packaging: 0.7
    },
    benchmarks: {
        industry: 52.1,
        best: 32.8,
        target: 40.0
    },
    reduction: [
        'Optimize transportation routes',
        'Use renewable energy in manufacturing',
        'Reduce packaging weight'
    ]
}
```

### 2. **Lead Time Analysis**
```javascript
leadTimes: {
    rawMaterialToManufacturing: 14,
    manufacturing: 7,
    manufacturingToDistribution: 3,
    distributionToCustomer: 2,
    total: 26,
    variability: 0.2,
    optimization: [
        'Reduce supplier lead time by 20%',
        'Implement just-in-time manufacturing',
        'Optimize distribution network'
    ]
}
```

### 3. **Risk Assessment**
```javascript
risks: {
    geographical: {
        naturalDisaster: 0.15,
        politicalInstability: 0.05,
        climateChange: 0.08
    },
    supplier: {
        financial: 0.12,
        operational: 0.08,
        quality: 0.05
    },
    transportation: {
        infrastructure: 0.06,
        weather: 0.10,
        regulatory: 0.03
    },
    overall: 0.08
}
```

## 🎨 Interactive Dashboard Features

### 1. **Multi-tab Interface**
- **Supply Chain Map**: Interactive geographical visualization
- **Manufacturing**: Detailed manufacturing location info
- **Suppliers**: Supplier network analysis
- **Technical Specs**: Location-specific specifications
- **Quality Metrics**: Quality and risk assessment

### 2. **Real-time Filtering**
- **Product Selection**: Choose product to analyze
- **Location Type Filter**: Filter by manufacturing/supplier/distribution
- **Material Filter**: Filter suppliers by material type
- **Quality Level Filter**: Filter by quality standards

### 3. **Data Visualization**
- **Interactive Maps**: Click for detailed information
- **Quality Charts**: Bar charts for quality metrics
- **Carbon Footprint Charts**: Doughnut charts for environmental impact
- **Lead Time Charts**: Bar charts for supply chain timing

## 🔧 Implementation Details

### 1. **Map Integration**
```javascript
// Initialize Leaflet map
map = L.map('supplyChainMap').setView([25, 0], 2);

// Add manufacturing locations
supplyChain.manufacturing.forEach(location => {
    const marker = L.marker([location.coordinates.lat, location.coordinates.lng])
        .bindPopup(createManufacturingPopup(location))
        .addTo(map);
});

// Add transportation routes
supplyChain.transportation.forEach(route => {
    const polyline = L.polyline([
        [route.from.lat, route.from.lng],
        [route.to.lat, route.to.lng]
    ], {
        color: getRouteColor(route.type),
        weight: 3,
        opacity: 0.7
    }).addTo(map);
});
```

### 2. **Distance Calculation**
```javascript
// Haversine formula for accurate distance
calculateDistance(coords1, coords2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(coords2.lat - coords1.lat);
    const dLon = this.toRad(coords2.lng - coords1.lng);
    const lat1 = this.toRad(coords1.lat);
    const lat2 = this.toRad(coords2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
}
```

### 3. **Risk Assessment Algorithm**
```javascript
assessSupplyChainRisks(product) {
    const risks = {
        geographical: this.assessGeographicalRisks(product),
        supplier: this.assessSupplierRisks(product),
        transportation: this.assessTransportationRisks(product),
        quality: this.assessQualityRisks(product),
        regulatory: this.assessRegulatoryRisks(product),
        environmental: this.assessEnvironmentalRisks(product),
        financial: this.assessFinancialRisks(product)
    };

    risks.overall = this.calculateOverallRisk(risks);
    return risks;
}
```

## 📈 Business Benefits

### 1. **Supply Chain Transparency**
- **Complete Visibility**: End-to-end supply chain mapping
- **Real-time Tracking**: Live location and status updates
- **Risk Mitigation**: Proactive risk identification and management
- **Compliance**: Regulatory compliance tracking

### 2. **Quality Management**
- **Location-specific Standards**: Different quality levels by location
- **Certification Tracking**: Monitor certification validity and audits
- **Performance Metrics**: Quality KPIs by location
- **Continuous Improvement**: Identify areas for quality enhancement

### 3. **Environmental Impact**
- **Carbon Footprint Tracking**: Measure and monitor environmental impact
- **Sustainability Metrics**: Track sustainability KPIs
- **Optimization Opportunities**: Identify areas for reduction
- **Regulatory Compliance**: Environmental compliance tracking

### 4. **Cost Optimization**
- **Transportation Analysis**: Optimize routes and methods
- **Supplier Evaluation**: Cost-benefit analysis by supplier
- **Lead Time Reduction**: Identify bottlenecks and optimization opportunities
- **Inventory Management**: Optimize inventory levels by location

## 🚀 Use Cases & Examples

### Example 1: Bolt M6x20 Supply Chain
```
Supply Chain Map for M001-001:

🏭 Manufacturing:
├── Osaka Plant, Japan (Primary)
│   ├── Quality: Premium (ISO 9001, IATF 16949)
│   ├── Capacity: 3M units/year
│   ├── Specs: ±0.01mm tolerance
│   └── Quality Score: 95%

🚚 Suppliers:
├── Nippon Steel (70%)
│   ├── Tokyo Steel Mill
│   ├── Reliability: 95%
│   └── Lead Time: 14 days
├── Zinc Plating (30%)
│   ├── Shanghai Plant
│   ├── Reliability: 89%
│   └── Lead Time: 7 days

⛏️ Raw Materials:
├── Iron Ore (Australia)
│   ├── Western Australia Mine
│   ├── Political Stability: 90%
│   └── Carbon: 15.3 kg CO2e/unit

🚢 Transportation:
├── Australia → Japan: 6,845km (Sea: 228h, $342)
├── Japan → Vietnam: 3,100km (Sea: 103h, $155)
└── Vietnam → Customer: Local (Truck: 2h, $25)

📊 Metrics:
├── Carbon Footprint: 45.2 kg CO2e/unit
├── Total Lead Time: 26 days
├── Quality Score: 94.2%
└── Overall Risk: 8% (Low)
```

### Example 2: Risk Assessment Dashboard
```
Risk Analysis by Location:

🏭 Osaka Plant (Japan):
├── Geographical Risk: 3% (Low)
├── Supplier Risk: 8% (Low)
├── Quality Risk: 2% (Very Low)
└── Overall Risk: 4.3% (Low)

🏭 HCMC Facility (Vietnam):
├── Geographical Risk: 12% (Medium)
├── Supplier Risk: 15% (Medium)
├── Quality Risk: 5% (Low)
└── Overall Risk: 10.7% (Medium)

⚠️ Mitigation Strategies:
├── Diversify supplier base
├── Implement backup manufacturing
├── Increase safety stock
└── Monitor political stability
```

## 🔮 Future Enhancements

### 1. **Real-time Integration**
- **IoT Sensors**: Real-time location and condition tracking
- **Blockchain**: Immutable supply chain records
- **AI Predictions**: Predictive risk assessment
- **Automated Alerts**: Real-time risk notifications

### 2. **Advanced Analytics**
- **Machine Learning**: Pattern recognition and prediction
- **Digital Twins**: Virtual supply chain simulation
- **Optimization Algorithms**: Automated route and supplier optimization
- **Scenario Analysis**: What-if analysis for planning

### 3. **Mobile Integration**
- **Mobile Apps**: Field access to supply chain data
- **AR/VR**: Immersive supply chain visualization
- **Voice Commands**: Hands-free operation
- **Offline Mode**: Access without internet

---

**Hệ thống Geographical Supply Chain Mapping cung cấp giải pháp hoàn chỉnh để xây dựng bản đồ kỹ thuật chi tiết, giúp doanh nghiệp có cái nhìn toàn diện về chuỗi cung ứng, từ nguồn nguyên liệu thô đến sản phẩm cuối cùng, với đầy đủ thông tin kỹ thuật, chất lượng và rủi ro tại từng địa điểm.**
