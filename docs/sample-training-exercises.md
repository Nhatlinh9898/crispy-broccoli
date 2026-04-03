# Sample Training Exercises & Assignments

## 🎯 Tổng quan

Bài tập thực hành chi tiết sử dụng các sản phẩm mẫu thực tế để đào tạo AI agents và content creators, từ cơ bản đến nâng cao.

---

## 📚 Foundation Level Exercises

### **Exercise 1: Bolt Template Mastery**

#### **Bài tập 1.1: Basic Bolt Content Generation**
```markdown
# Hướng dẫn: Tạo nội dung cho bu lông M8x1.25

## Yêu cầu:
Sử dụng Bolt Template để tạo nội dung hoàn chỉnh cho sản phẩm:
- Tên sản phẩm: Bu lông Inox M8x1.25x20mm
- Chất liệu: Inox 304
- Tiêu chuẩn: ISO 4017
- Ứng dụng: Cơ khí chung

## Dữ liệu đầu vào:
{
  "product_name": "Bu lông Inox M8x1.25x20mm",
  "component_type": "Bu lông",
  "material": "Inox 304",
  "standard": "ISO 4017",
  "application": "Cơ khí chung",
  "thread_specification": "M8x1.25",
  "length": "20mm",
  "head_type": "Lục giác",
  "drive_type": "Ren lục giác",
  "surface_treatment": "Passivation",
  "tensile_strength": "700 MPa",
  "yield_strength": "450 MPa",
  "hardness": "HV 200-240"
}

## Kết quả mong đợi:
✅ Tạo 8 sections hoàn chỉnh
✅ Tính toán torque chính xác
✅ Mô tả kỹ thuật chính xác
✅ Hướng dẫn lắp đặt chi tiết
✅ Thông tin an toàn đầy đủ

## Tiêu chí đánh giá:
- Technical accuracy: 95%+
- Content completeness: 100%
- User friendliness: 90%+
- Safety compliance: 100%
```

#### **Bài tập 1.2: Torque Calculator Implementation**
```javascript
// Exercise: Implement torque calculator for bolt
class BoltTorqueCalculator {
  constructor() {
    this.frictionCoefficients = {
      'dry': 0.20,
      'lubricated': 0.15,
      'galvanized': 0.16
    };
  }

  calculateTorque(boltData) {
    // Formula: T = K × F × d
    // Where:
    // T = Torque (N⋅m)
    // K = Nut factor (friction coefficient)
    // F = Clamp load (N)
    // D = Nominal bolt diameter (m)

    const diameter = this.extractDiameter(boltData.thread_specification);
    const clampLoad = this.calculateClampLoad(boltData);
    const frictionCoeff = this.getFrictionCoefficient(boltData.surface_treatment);

    const torque = frictionCoeff * clampLoad * diameter;
    
    return {
      torque_nm: torque,
      torque_kgcm: torque * 10.2,
      recommended_range: {
        min: torque * 0.8,
        max: torque * 1.2
      },
      calculation_details: {
        diameter_m: diameter,
        clamp_load_n: clampLoad,
        friction_coefficient: frictionCoeff,
        formula_used: "T = K × F × d"
      }
    };
  }

  extractDiameter(threadSpec) {
    // Extract diameter from "M8x1.25" -> 8mm -> 0.008m
    const match = threadSpec.match(/M(\d+)/);
    return match ? parseFloat(match[1]) / 1000 : 0.008;
  }

  calculateClampLoad(boltData) {
    // Simplified calculation based on tensile strength
    const tensileArea = Math.PI * Math.pow(this.extractDiameter(boltData.thread_specification) / 2, 2);
    const proofLoad = boltData.tensile_strength * 0.75; // 75% of tensile strength
    return proofLoad * tensileArea;
  }

  getFrictionCoefficient(surfaceTreatment) {
    const treatment = surfaceTreatment.toLowerCase();
    return this.frictionCoefficients[treatment] || this.frictionCoefficients['dry'];
  }
}

// Test with sample data
const calculator = new BoltTorqueCalculator();
const boltData = {
  thread_specification: "M8x1.25",
  tensile_strength: 700000000, // 700 MPa in N/m²
  surface_treatment: "lubricated"
};

const result = calculator.calculateTorque(boltData);
console.log('Torque calculation result:', result);
```

#### **Bài tập 1.3: Safety Compliance Check**
```markdown
# Exercise: Safety Compliance Validation

## Yêu cầu:
Kiểm tra và đảm bảo nội dung tuân thủ các tiêu chuẩn an toàn:

## Checklist kiểm tra:
1. **Technical Specifications**
   - [ ] Tất cả thông số kỹ thuật chính xác
   - [ ] Đơn vị đo lường chuẩn hóa
   - [ ] Giá trị dung sai hợp lý

2. **Safety Warnings**
   - [ ] Cảnh báo torque quá tải
   - [ ] Cảnh báo vật liệu mỏi
   - [ ] Cảnh báo môi trường ăn mòn

3. **Installation Guidelines**
   - [ ] Hướng dẫn lắp đặt an toàn
   - [ ] Kiểm tra torque phù hợp
   - [ ] Quy trình kiểm tra chất lượng

4. **Material Compliance**
   - [ ] Chất liệu phù hợp ứng dụng
   - [ ] Chứng chỉ chất lượng (nếu có)
   - [ ] Thông tin tái chế

## Kết quả mong đợi:
Tạo báo cáo compliance với:
- Tổng số lỗi: 0
- Cảnh báo: <5
- Đề xuất cải tiến: >3
```

### **Exercise 2: Resistor Template Deep Dive**

#### **Bài tập 2.1: Ohm's Law Calculator**
```javascript
// Exercise: Advanced Ohm's Law calculator
class ResistorCalculator {
  constructor() {
    this.smdCodes = {
      '0402': { power: 0.0625, voltage: 25 },
      '0603': { power: 0.1, voltage: 50 },
      '0805': { power: 0.125, voltage: 75 },
      '1206': { power: 0.25, voltage: 150 },
      '2512': { power: 1.0, voltage: 200 }
    };
  }

  calculateAllParameters(resistorData) {
    const results = {
      basic: this.calculateBasicParameters(resistorData),
      power: this.calculatePowerParameters(resistorData),
      tolerance: this.analyzeTolerance(resistorData),
      smd: this.analyzeSMD(resistorData),
      applications: this.recommendApplications(resistorData)
    };

    return results;
  }

  calculateBasicParameters(data) {
    const resistance = parseFloat(data.resistance);
    const voltage = parseFloat(data.voltage) || 0;
    const current = parseFloat(data.current) || 0;

    return {
      resistance: resistance,
      voltage: voltage,
      current: current,
      power: voltage * current,
      calculated_current: voltage / resistance,
      calculated_voltage: current * resistance,
      calculated_power: Math.pow(voltage, 2) / resistance,
      ohms_law_applied: {
        V: voltage,
        I: current,
        R: resistance,
        P: voltage * current
      }
    };
  }

  calculatePowerParameters(data) {
    const resistance = parseFloat(data.resistance);
    const ratedPower = parseFloat(data.power_rating);
    const operatingVoltage = parseFloat(data.voltage) || 0;
    const actualPower = Math.pow(operatingVoltage, 2) / resistance;

    return {
      rated_power: ratedPower,
      actual_power: actualPower,
      power_margin: ((ratedPower - actualPower) / ratedPower) * 100,
      derating_required: actualPower > (ratedPower * 0.8),
      max_safe_voltage: Math.sqrt(ratedPower * resistance),
      thermal_analysis: {
        temperature_rise: actualPower * 2, // Simplified: 2°C per mW
        max_safe_temperature: 155, // Standard for resistors
        ambient_temperature_limit: 155 - (actualPower * 2)
      }
    };
  }

  analyzeTolerance(data) {
    const nominalValue = parseFloat(data.resistance);
    const tolerance = parseFloat(data.tolerance) || 5;
    const toleranceValue = nominalValue * (tolerance / 100);

    return {
      nominal_value: nominalValue,
      tolerance_percentage: tolerance,
      tolerance_value: toleranceValue,
      min_resistance: nominalValue - toleranceValue,
      max_resistance: nominalValue + toleranceValue,
      tolerance_color_code: this.getToleranceColorCode(tolerance),
      precision_level: this.getPrecisionLevel(tolerance)
    };
  }

  getToleranceColorCode(tolerance) {
    const colorCodes = {
      0.1: 'Violet',
      0.25: 'Blue',
      0.5: 'Green',
      1: 'Brown',
      2: 'Red',
      5: 'Gold',
      10: 'Silver'
    };
    return colorCodes[tolerance] || 'Gold';
  }

  getPrecisionLevel(tolerance) {
    if (tolerance <= 0.1) return 'Precision';
    if (tolerance <= 1) return 'High Precision';
    if (tolerance <= 5) return 'Standard';
    return 'General Purpose';
  }

  recommendApplications(data) {
    const resistance = parseFloat(data.resistance);
    const power = parseFloat(data.power_rating);
    const tolerance = parseFloat(data.tolerance) || 5;

    const applications = [];

    // Current limiting applications
    if (resistance >= 1 && resistance <= 1000 && power >= 0.125) {
      applications.push({
        application: 'Current Limiting',
        description: 'LED current limiting, circuit protection',
        suitability: 'Excellent'
      });
    }

    // Voltage divider applications
    if (tolerance <= 1 && resistance >= 100 && resistance <= 100000) {
      applications.push({
        application: 'Voltage Divider',
        description: 'Reference voltage generation, sensor interfaces',
        suitability: 'Excellent'
      });
    }

    // Pull-up/Pull-down applications
    if (resistance >= 1000 && resistance <= 100000 && power >= 0.0625) {
      applications.push({
        application: 'Pull-up/Pull-down',
        description: 'Digital logic level definition, bus termination',
        suitability: 'Good'
      });
    }

    // High power applications
    if (power >= 0.5) {
      applications.push({
        application: 'Power Dissipation',
        description: 'Load resistors, braking resistors, heating elements',
        suitability: 'Good'
      });
    }

    return applications;
  }
}

// Test with sample data
const calculator = new ResistorCalculator();
const resistorData = {
  resistance: 10000, // 10kΩ
  tolerance: 1, // 1%
  power_rating: 0.25, // 1/4W
  voltage: 5, // 5V
  package: '0805'
};

const results = calculator.calculateAllParameters(resistorData);
console.log('Resistor analysis results:', JSON.stringify(results, null, 2));
```

---

## 🚀 Intermediate Level Exercises

### **Exercise 3: Mobile App Template Optimization**

#### **Bài tập 3.1: App Store Optimization (ASO)**
```javascript
// Exercise: App Store Optimization Generator
class ASOContentGenerator {
  constructor() {
    this.keywordDensity = 0.03; // 3% keyword density
    this.titleMaxLength = 30;
    this.subtitleMaxLength = 30;
    this.descriptionMaxLength = 4000;
  }

  generateASOContent(appData) {
    return {
      title: this.generateOptimizedTitle(appData),
      subtitle: this.generateSubtitle(appData),
      description: this.generateOptimizedDescription(appData),
      keywords: this.generateKeywords(appData),
      what_is_new: this.generateWhatsNew(appData),
      privacy_policy: this.generatePrivacyPolicy(appData),
      marketing_points: this.generateMarketingPoints(appData)
    };
  }

  generateOptimizedTitle(appData) {
    const baseTitle = appData.app_name;
    const primaryKeyword = appData.primary_keyword;
    const secondaryKeyword = appData.secondary_keyword;

    // Try different title combinations
    const titleOptions = [
      `${baseTitle} - ${primaryKeyword}`,
      `${primaryKeyword} ${baseTitle}`,
      `${baseTitle}: ${secondaryKeyword}`,
      `${primaryKeyword} & ${secondaryKeyword}`
    ];

    // Select best title (under character limit)
    const validTitles = titleOptions.filter(title => title.length <= this.titleMaxLength);
    
    return validTitles.length > 0 ? validTitles[0] : baseTitle.substring(0, this.titleMaxLength);
  }

  generateOptimizedDescription(appData) {
    const sections = [
      this.generateOpeningSection(appData),
      this.generateFeaturesSection(appData),
      this.generateBenefitsSection(appData),
      this.generateUseCasesSection(appData),
      this.generateSocialProof(appData),
      this.generateCallToAction(appData)
    ];

    const fullDescription = sections.join('\n\n');
    
    // Ensure within character limit
    if (fullDescription.length <= this.descriptionMaxLength) {
      return fullDescription;
    }

    // Truncate while preserving structure
    return this.truncateIntelligently(fullDescription, this.descriptionMaxLength);
  }

  generateOpeningSection(appData) {
    const templates = [
      `${appData.app_name} is the ultimate ${appData.category} app designed for ${appData.target_audience}.`,
      `Discover the power of ${appData.primary_keyword} with ${appData.app_name}, the leading ${appData.category} solution.`,
      `Transform your ${appData.use_case} experience with ${appData.app_name} - the most innovative ${appData.category} app.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  generateFeaturesSection(appData) {
    let features = "KEY FEATURES:\n\n";
    
    appData.features.forEach((feature, index) => {
      const bullet = this.getFeatureBullet(index);
      features += `${bullet} ${feature.name}: ${feature.description}\n`;
      
      // Add technical details if available
      if (feature.technical_details) {
        features += `   • ${feature.technical_details}\n`;
      }
    });

    return features;
  }

  generateBenefitsSection(appData) {
    let benefits = "WHY YOU'LL LOVE IT:\n\n";
    
    appData.benefits.forEach((benefit, index) => {
      benefits += `✓ ${benefit.title}: ${benefit.description}\n`;
      
      // Add measurable outcome if available
      if (benefit.measurable_outcome) {
        benefits += `  → ${benefit.measurable_outcome}\n`;
      }
    });

    return benefits;
  }

  generateKeywords(appData) {
    const keywords = new Set();
    
    // Add app name variations
    keywords.add(appData.app_name.toLowerCase());
    keywords.add(appData.app_name.replace(/\s+/g, '').toLowerCase());
    
    // Add primary and secondary keywords
    keywords.add(appData.primary_keyword.toLowerCase());
    keywords.add(appData.secondary_keyword.toLowerCase());
    
    // Add category keywords
    keywords.add(appData.category.toLowerCase());
    
    // Add feature-based keywords
    appData.features.forEach(feature => {
      keywords.add(feature.name.toLowerCase());
      feature.tags?.forEach(tag => keywords.add(tag.toLowerCase()));
    });
    
    // Add use case keywords
    appData.use_cases?.forEach(useCase => {
      keywords.add(useCase.toLowerCase());
    });
    
    // Add competitor keywords (for comparison)
    appData.competitors?.forEach(competitor => {
      keywords.add(`alternative to ${competitor.toLowerCase()}`);
      keywords.add(`${competitor.toLowerCase()} replacement`);
    });
    
    return Array.from(keywords).slice(0, 100); // App Store limit
  }

  getFeatureBullet(index) {
    const bullets = ['🌟', '⚡', '🎯', '🚀', '💡', '🔥', '⭐', '🎨', '🔧', '📱'];
    return bullets[index % bullets.length];
  }

  truncateIntelligently(text, maxLength) {
    if (text.length <= maxLength) return text;
    
    // Find the last complete sentence before the limit
    const truncated = text.substring(0, maxLength);
    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?')
    );
    
    if (lastSentenceEnd > maxLength * 0.8) {
      return truncated.substring(0, lastSentenceEnd + 1);
    }
    
    // Fallback: truncate at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
  }
}

// Test with sample app data
const asoGenerator = new ASOContentGenerator();
const appData = {
  app_name: 'TaskMaster Pro',
  category: 'Productivity',
  target_audience: 'professionals and teams',
  primary_keyword: 'Task Management',
  secondary_keyword: 'Productivity',
  use_case: 'daily task organization',
  features: [
    {
      name: 'AI-Powered Prioritization',
      description: 'Smart task ordering based on importance and deadlines',
      technical_details: 'Uses machine learning algorithms',
      tags: ['ai', 'smart', 'automation']
    },
    {
      name: 'Team Collaboration',
      description: 'Real-time task sharing and updates',
      tags: ['team', 'collaboration', 'sync']
    }
  ],
  benefits: [
    {
      title: 'Increased Productivity',
      description: 'Get 40% more done with smart organization',
      measurable_outcome: 'Average user saves 2 hours daily'
    }
  ],
  use_cases: ['project management', 'personal organization', 'team coordination'],
  competitors: ['Todoist', 'Trello', 'Asana']
};

const asoContent = asoGenerator.generateASOContent(appData);
console.log('Generated ASO content:', JSON.stringify(asoContent, null, 2));
```

#### **Bài tập 3.2: Multi-Platform Content Adaptation**
```javascript
// Exercise: Multi-platform content adaptation
class PlatformContentAdapter {
  constructor() {
    this.platforms = {
      ios: {
        tone: 'professional',
        features: ['security', 'integration', 'design'],
        limitations: ['no_background_processing', 'app_store_review'],
        emphasis: ['privacy', 'user_experience', 'apple_ecosystem']
      },
      android: {
        tone: 'flexible',
        features: ['customization', 'file_access', 'multitasking'],
        limitations: ['fragmentation', 'security_concerns'],
        emphasis: ['customization', 'openness', 'google_services']
      },
      web: {
        tone: 'accessible',
        features: ['cross_platform', 'no_install', 'updates'],
        limitations: ['offline_limited', 'browser_compatibility'],
        emphasis: ['convenience', 'accessibility', 'real_time_sync']
      }
    };
  }

  adaptContentForPlatform(baseContent, platform) {
    const platformConfig = this.platforms[platform];
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    return {
      overview: this.adaptOverview(baseContent.overview, platformConfig),
      features: this.adaptFeatures(baseContent.features, platformConfig),
      technical_specs: this.adaptTechnicalSpecs(baseContent.technical_specs, platformConfig),
      installation: this.adaptInstallation(baseContent.installation, platformConfig),
      compatibility: this.adaptCompatibility(baseContent.compatibility, platformConfig)
    };
  }

  adaptOverview(overview, platformConfig) {
    let adapted = overview;
    
    // Adjust tone
    if (platformConfig.tone === 'professional') {
      adapted = adapted.replace(/awesome/g, 'professional');
      adapted = adapted.replace(/cool/g, 'sophisticated');
    } else if (platformConfig.tone === 'flexible') {
      adapted = adapted.replace(/strict/g, 'flexible');
      adapted = adapted.replace(/limited/g, 'customizable');
    }
    
    // Add platform-specific emphasis
    const emphasisSection = platformConfig.emphasis.map(point => 
      `• ${this.formatEmphasis(point)}`
    ).join('\n');
    
    return `${adapted}\n\nPLATFORM ADVANTAGES:\n${emphasisSection}`;
  }

  adaptFeatures(features, platformConfig) {
    return features.map(feature => {
      const adaptedFeature = { ...feature };
      
      // Highlight platform-relevant features
      if (platformConfig.features.some(relevant => 
        feature.name.toLowerCase().includes(relevant))) {
        adaptedFeature.platform_highlight = true;
        adaptedFeature.description = this.enhanceDescription(
          feature.description, 
          platformConfig.emphasis
        );
      }
      
      // Address platform limitations
      platformConfig.limitations.forEach(limitation => {
        if (this.isFeatureAffected(feature, limitation)) {
          adaptedFeature.limitations = adaptedFeature.limitations || [];
          adaptedFeature.limitations.push(this.formatLimitation(limitation));
        }
      });
      
      return adaptedFeature;
    });
  }

  adaptTechnicalSpecs(specs, platformConfig) {
    const adapted = { ...specs };
    
    // Add platform-specific requirements
    if (platformConfig.platform === 'ios') {
      adapted.ios_requirements = {
        min_ios_version: '14.0+',
        ram_required: '2GB+',
        storage_required: '500MB+',
        processor_required: 'A12 Bionic or newer'
      };
    } else if (platformConfig.platform === 'android') {
      adapted.android_requirements = {
        min_android_version: '8.0+ (API 26)',
        ram_required: '3GB+',
        storage_required: '1GB+',
        processor_required: 'ARMv8 or newer'
      };
    } else if (platformConfig.platform === 'web') {
      adapted.web_requirements = {
        supported_browsers: ['Chrome 90+', 'Firefox 88+', 'Safari 14+'],
        internet_required: 'Broadband connection recommended',
        javascript_required: 'Enabled',
        cookies_required: 'Enabled'
      };
    }
    
    return adapted;
  }

  enhanceDescription(description, emphasis) {
    let enhanced = description;
    
    emphasis.forEach(point => {
      if (point.includes('privacy')) {
        enhanced += ' Your privacy is our top priority.';
      } else if (point.includes('customization')) {
        enhanced += ' Customize every aspect to fit your needs.';
      } else if (point.includes('convenience')) {
        enhanced += ' Access everything instantly, anywhere.';
      }
    });
    
    return enhanced;
  }

  formatEmphasis(point) {
    const formatted = point.replace(/_/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  formatLimitation(limitation) {
    return limitation.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  isFeatureAffected(feature, limitation) {
    const featureLower = feature.name.toLowerCase();
    const limitationLower = limitation.toLowerCase();
    
    // Simple keyword matching - can be enhanced
    return featureLower.includes(limitationLower.replace('_limited', ''));
  }
}

// Test with sample content
const adapter = new PlatformContentAdapter();
const baseContent = {
  overview: "TaskMaster Pro is an awesome task management app with cool features.",
  features: [
    {
      name: 'AI Task Prioritization',
      description: 'Smart task ordering using machine learning'
    },
    {
      name: 'File Access',
      description: 'Access and organize files within tasks'
    }
  ],
  technical_specs: {
    memory_usage: '256MB RAM',
    storage_required: '500MB'
  }
};

// Generate platform-specific content
const iosContent = adapter.adaptContentForPlatform(baseContent, 'ios');
const androidContent = adapter.adaptContentForPlatform(baseContent, 'android');
const webContent = adapter.adaptContentForPlatform(baseContent, 'web');

console.log('iOS Content:', JSON.stringify(iosContent, null, 2));
console.log('Android Content:', JSON.stringify(androidContent, null, 2));
console.log('Web Content:', JSON.stringify(webContent, null, 2));
```

---

## 🎓 Advanced Level Exercises

### **Exercise 4: Consulting Service ROI Analysis**

#### **Bài tập 4.1: Advanced ROI Calculator**
```javascript
// Exercise: Comprehensive ROI Analysis for Consulting Services
class ConsultingROICalculator {
  constructor() {
    this.industryMultipliers = {
      'technology': 1.5,
      'healthcare': 1.3,
      'finance': 1.4,
      'manufacturing': 1.2,
      'retail': 1.1,
      'other': 1.0
    };
    
    this.riskFactors = {
      'market_volatility': 0.1,
      'implementation_complexity': 0.15,
      'team_adoption': 0.05,
      'technology_changes': 0.08
    };
  }

  calculateComprehensiveROI(serviceData, clientData) {
    const analysis = {
      financial_projections: this.calculateFinancialProjections(serviceData, clientData),
      risk_assessment: this.assessRisks(serviceData, clientData),
      sensitivity_analysis: this.performSensitivityAnalysis(serviceData, clientData),
      non_financial_benefits: this.calculateNonFinancialBenefits(serviceData, clientData),
      implementation_timeline: this.createImplementationTimeline(serviceData),
      recommendations: this.generateRecommendations(serviceData, clientData)
    };

    return analysis;
  }

  calculateFinancialProjections(serviceData, clientData) {
    const baseROI = this.calculateBaseROI(serviceData, clientData);
    const industryAdjustment = this.getIndustryMultiplier(clientData.industry);
    
    // Year-by-year projections
    const projections = [];
    let cumulativeBenefits = 0;
    
    for (let year = 1; year <= 5; year++) {
      const yearBenefits = this.calculateYearlyBenefits(serviceData, clientData, year);
      const yearCosts = this.calculateYearlyCosts(serviceData, year);
      const netBenefit = yearBenefits - yearCosts;
      
      cumulativeBenefits += netBenefit;
      
      projections.push({
        year: year,
        benefits: yearBenefits,
        costs: yearCosts,
        net_benefit: netBenefit,
        cumulative_benefit: cumulativeBenefits,
        roi_percentage: ((cumulativeBenefits / serviceData.total_investment) * 100).toFixed(1),
        payback_period: cumulativeBenefits > 0 ? year : null
      });
    }

    return {
      base_roi: baseROI,
      industry_adjusted_roi: baseROI * industryAdjustment,
      projections: projections,
      total_5_year_benefit: cumulativeBenefits,
      average_annual_roi: ((cumulativeBenefits / serviceData.total_investment) / 5 * 100).toFixed(1)
    };
  }

  calculateBaseROI(serviceData, clientData) {
    // Revenue increase calculation
    const revenueIncrease = clientData.current_revenue * 
      (serviceData.expected_revenue_growth / 100);
    
    // Cost savings calculation
    const costSavings = clientData.current_annual_costs * 
      (serviceData.expected_cost_savings / 100);
    
    // Productivity gains
    const productivityGain = clientData.employee_count * 
      clientData.average_salary * 
      (serviceData.expected_productivity_improvement / 100);
    
    const totalAnnualBenefit = revenueIncrease + costSavings + productivityGain;
    
    return {
      annual_benefit: totalAnnualBenefit,
      revenue_increase: revenueIncrease,
      cost_savings: costSavings,
      productivity_gain: productivityGain,
      roi_percentage: ((totalAnnualBenefit / serviceData.total_investment) * 100).toFixed(1),
      payback_period_months: Math.ceil(serviceData.total_investment / (totalAnnualBenefit / 12))
    };
  }

  calculateYearlyBenefits(serviceData, clientData, year) {
    const baseBenefits = this.calculateBaseROI(serviceData, clientData);
    
    // Apply growth and decay factors
    let growthFactor = 1.0;
    
    if (year <= 2) {
      // Ramp-up period
      growthFactor = 0.5 + (year * 0.25);
    } else if (year <= 4) {
      // Peak performance
      growthFactor = 1.0;
    } else {
      // Slight decay
      growthFactor = 0.95;
    }
    
    return baseBenefits.annual_benefit * growthFactor;
  }

  calculateYearlyCosts(serviceData, year) {
    let costs = serviceData.ongoing_costs || 0;
    
    // Add maintenance and support costs
    if (year > 1) {
      costs += serviceData.maintenance_costs || (serviceData.total_investment * 0.1);
    }
    
    return costs;
  }

  assessRisks(serviceData, clientData) {
    const risks = [];
    
    // Market risk
    if (clientData.industry === 'technology') {
      risks.push({
        type: 'market',
        probability: 'medium',
        impact: 'high',
        description: 'Rapid technology changes may reduce solution effectiveness',
        mitigation: 'Regular technology updates and flexibility built into solution'
      });
    }
    
    // Implementation risk
    if (serviceData.complexity === 'high') {
      risks.push({
        type: 'implementation',
        probability: 'medium',
        impact: 'medium',
        description: 'Complex implementation may face delays',
        mitigation: 'Phased implementation approach with dedicated project management'
      });
    }
    
    // Adoption risk
    if (clientData.employee_count > 1000) {
      risks.push({
        type: 'adoption',
        probability: 'low',
        impact: 'high',
        description: 'Large organization may have slower adoption',
        mitigation: 'Comprehensive change management and training program'
      });
    }
    
    // Calculate overall risk score
    const riskScore = this.calculateRiskScore(risks);
    
    return {
      identified_risks: risks,
      overall_risk_score: riskScore,
      risk_adjusted_roi: this.adjustROIForRisk(serviceData, clientData, riskScore),
      recommended_mitigations: this.generateMitigationPlan(risks)
    };
  }

  calculateRiskScore(risks) {
    let totalScore = 0;
    
    risks.forEach(risk => {
      const probabilityScore = this.getProbabilityScore(risk.probability);
      const impactScore = this.getImpactScore(risk.impact);
      totalScore += probabilityScore * impactScore;
    });
    
    return totalScore / risks.length;
  }

  getProbabilityScore(probability) {
    const scores = {
      'low': 0.3,
      'medium': 0.6,
      'high': 0.9
    };
    return scores[probability] || 0.5;
  }

  getImpactScore(impact) {
    const scores = {
      'low': 0.3,
      'medium': 0.6,
      'high': 0.9
    };
    return scores[impact] || 0.5;
  }

  adjustROIForRisk(serviceData, clientData, riskScore) {
    const baseROI = this.calculateBaseROI(serviceData, clientData);
    const riskAdjustment = 1 - (riskScore * 0.3); // Reduce ROI by up to 30% based on risk
    
    return baseROI.roi_percentage * riskAdjustment;
  }

  performSensitivityAnalysis(serviceData, clientData) {
    const scenarios = [
      { name: 'Best Case', revenue_growth: 1.2, cost_savings: 1.2, productivity: 1.15 },
      { name: 'Expected Case', revenue_growth: 1.0, cost_savings: 1.0, productivity: 1.0 },
      { name: 'Worst Case', revenue_growth: 0.8, cost_savings: 0.8, productivity: 0.85 }
    ];
    
    return scenarios.map(scenario => {
      const adjustedServiceData = {
        ...serviceData,
        expected_revenue_growth: serviceData.expected_revenue_growth * scenario.revenue_growth,
        expected_cost_savings: serviceData.expected_cost_savings * scenario.cost_savings,
        expected_productivity_improvement: serviceData.expected_productivity_improvement * scenario.productivity
      };
      
      const roi = this.calculateBaseROI(adjustedServiceData, clientData);
      
      return {
        scenario: scenario.name,
        roi_percentage: roi.roi_percentage,
        annual_benefit: roi.annual_benefit,
        payback_period: roi.payback_period_months
      };
    });
  }

  calculateNonFinancialBenefits(serviceData, clientData) {
    return {
      strategic_benefits: [
        'Improved competitive positioning',
        'Enhanced decision-making capabilities',
        'Better risk management',
        'Increased innovation capacity'
      ],
      operational_benefits: [
        'Streamlined processes',
        'Reduced manual errors',
        'Faster time-to-market',
        'Improved customer satisfaction'
      ],
      cultural_benefits: [
        'Enhanced employee engagement',
        'Improved collaboration',
        'Knowledge sharing',
        'Continuous learning culture'
      ],
      intangible_value: this.calculateIntangibleValue(serviceData, clientData)
    };
  }

  calculateIntangibleValue(serviceData, clientData) {
    // Simplified calculation of intangible benefits
    const employeeValue = clientData.employee_count * 50000; // $50k per employee per year
    const brandValue = clientData.current_revenue * 0.1; // 10% of revenue as brand value
    const innovationValue = serviceData.innovation_potential ? clientData.current_revenue * 0.05 : 0;
    
    return {
      employee_engagement_value: employeeValue * 0.1, // 10% improvement
      brand_enhancement_value: brandValue * 0.05, // 5% improvement
      innovation_capacity_value: innovationValue,
      total_intangible_value: (employeeValue * 0.1) + (brandValue * 0.05) + innovationValue
    };
  }

  generateRecommendations(serviceData, clientData) {
    const recommendations = [];
    
    // Investment recommendations
    if (serviceData.total_investment > clientData.current_revenue * 0.1) {
      recommendations.push({
        category: 'investment',
        priority: 'high',
        recommendation: 'Consider phased implementation to manage cash flow impact',
        rationale: 'Investment exceeds 10% of current revenue'
      });
    }
    
    // Timeline recommendations
    if (serviceData.duration > 6) {
      recommendations.push({
        category: 'timeline',
        priority: 'medium',
        recommendation: 'Break project into phases with measurable milestones',
        rationale: 'Longer projects benefit from phased approach'
      });
    }
    
    // Risk mitigation recommendations
    const riskAssessment = this.assessRisks(serviceData, clientData);
    if (riskAssessment.overall_risk_score > 0.6) {
      recommendations.push({
        category: 'risk',
        priority: 'high',
        recommendation: 'Implement comprehensive risk mitigation plan',
        rationale: 'High overall risk score requires proactive management'
      });
    }
    
    return recommendations;
  }
}

// Test with comprehensive data
const roiCalculator = new ConsultingROICalculator();
const serviceData = {
  name: 'Digital Transformation Consulting',
  total_investment: 250000,
  duration: 6, // months
  complexity: 'high',
  expected_revenue_growth: 15, // percentage
  expected_cost_savings: 20, // percentage
  expected_productivity_improvement: 25, // percentage
  ongoing_costs: 50000, // annual
  maintenance_costs: 25000, // annual
  innovation_potential: true
};

const clientData = {
  industry: 'technology',
  current_revenue: 5000000,
  current_annual_costs: 3000000,
  employee_count: 150,
  average_salary: 75000
};

const comprehensiveROI = roiCalculator.calculateComprehensiveROI(serviceData, clientData);
console.log('Comprehensive ROI Analysis:', JSON.stringify(comprehensiveROI, null, 2));
```

---

## 📋 Assessment Templates

### **Template 1: Foundation Level Assessment**
```markdown
# Foundation Level Assessment - Component Content Generation

## Student: [Student Name]
## Date: [Assessment Date]
## Time Limit: 2 hours

### Part 1: Technical Knowledge (30 minutes)

**Question 1:** Given a bolt M10x1.5x50mm with tensile strength 800 MPa, calculate:
- Recommended torque range (Nm)
- Clamp load (N)
- Proof load (N)

**Question 2:** Explain the difference between proof load and tensile strength.

**Question 3:** List 5 critical safety warnings for bolt installation.

### Part 2: Content Generation (60 minutes)

**Task:** Create complete content for the following product using Bolt Template:

```
Product Data:
- Name: Bu lông Inox M10x1.5x50mm
- Material: Inox 316
- Standard: ISO 4017
- Application: Marine industry
- Coating: PTFE
- Tensile Strength: 800 MPa
- Yield Strength: 600 MPa
```

**Requirements:**
- Generate all 8 sections
- Include torque calculator
- Add safety warnings
- Ensure technical accuracy

### Part 3: Quality Control (30 minutes)

**Task:** Review the following generated content and identify errors:

[Sample content with intentional errors]

**Identify:**
- Technical errors
- Missing information
- Safety issues
- Improvement opportunities

## Scoring Rubric

| Category | Points | Criteria |
|----------|--------|----------|
| Technical Knowledge | 25 | Accuracy of calculations and concepts |
| Content Generation | 45 | Completeness, accuracy, user-friendliness |
| Quality Control | 20 | Error identification and improvement suggestions |
| Time Management | 10 | Completion within time limit |

**Passing Score: 70/100**
```

### **Template 2: Advanced Level Assessment**
```markdown
# Advanced Level Assessment - Multi-Template Integration

## Student: [Student Name]
## Date: [Assessment Date]
## Time Limit: 4 hours

### Part 1: System Design (60 minutes)

**Task:** Design a content generation system for a company that sells:
- Industrial components (bolts, bearings)
- Mobile apps
- Consulting services

**Requirements:**
- Template selection strategy
- Integration approach
- Quality control processes
- Scalability considerations

### Part 2: Complex Content Generation (90 minutes)

**Task:** Generate integrated content package for:

```
Company: TechSolutions Inc.
Products:
1. Smart Bolt Sensor (IoT-enabled bolt)
2. Bolt Monitoring App (Mobile)
3. Installation Consulting Service
```

**Requirements:**
- Use appropriate templates for each product
- Ensure consistency across products
- Create cross-product references
- Optimize for target audience

### Part 3: Innovation Challenge (60 minutes)

**Task:** Design a new template for "IoT-Enabled Industrial Components"

**Requirements:**
- Template structure (10+ sections)
- Variable definitions
- Integration capabilities
- Innovation justification

### Part 4: Business Case (30 minutes)

**Task:** Create ROI analysis for implementing the new system

**Requirements:**
- Cost-benefit analysis
- Implementation timeline
- Risk assessment
- Success metrics

## Scoring Rubric

| Category | Points | Criteria |
|----------|--------|----------|
| System Design | 25 | Architecture quality and scalability |
| Content Generation | 35 | Integration and quality |
| Innovation | 25 | Creativity and practicality |
| Business Case | 15 | Analysis completeness and accuracy |

**Passing Score: 80/100**
```

---

*Các bài tập này cung cấp lộ trình thực hành từ cơ bản đến nâng cao, sử dụng các sản phẩm mẫu thực tế để đảm bảo tính ứng dụng cao và hiệu quả đào tạo tối ưu.*
