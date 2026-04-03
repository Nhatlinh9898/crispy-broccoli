# Product Type Integration Guides

## 🎯 Overview

Hướng dẫn chi tiết tích hợp hệ thống content generation với các platforms và services cho 5 loại sản phẩm mới: Software, Dịch vụ, Sản phẩm số, Bao bì, và Năng lượng.

---

## 💻 Software Integration Guides

### **1. Mobile App Store Integration**

#### **Apple App Store Integration**
```javascript
// App Store Content Integration
class AppStoreIntegration {
  constructor(apiKey, appStoreConnectKey) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.appStore = new AppStoreConnectAPI(appStoreConnectKey);
  }

  async syncAppToAppStore(appId, appData) {
    try {
      // Step 1: Generate App Store content
      const content = await this.contentApi.generateContent('software', 'mobile_app', {
        app_name: appData.name,
        platforms: appData.platforms,
        features: appData.features,
        technical_specs: appData.technical_specs
      });

      // Step 2: Format for App Store
      const appStoreContent = this.formatForAppStore(content);

      // Step 3: Upload to App Store Connect
      const result = await this.appStore.updateAppMetadata(appId, {
        name: appStoreContent.name,
        description: appStoreContent.description,
        keywords: appStoreContent.keywords,
        category: appStoreContent.category,
        privacy_policy_url: appStoreContent.privacy_policy_url,
        support_url: appStoreContent.support_url,
        marketing_url: appStoreContent.marketing_url
      });

      // Step 4: Upload screenshots
      if (appData.screenshots) {
        await this.uploadScreenshots(appId, appData.screenshots);
      }

      return {
        success: true,
        app_store_id: result.appId,
        status: 'submitted_for_review'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  formatForAppStore(content) {
    return {
      name: content.product_name,
      description: this.extractDescription(content),
      keywords: this.extractKeywords(content),
      category: this.determineCategory(content),
      privacy_policy_url: content.privacy_policy_url,
      support_url: content.support_url,
      marketing_url: content.marketing_url
    };
  }

  async uploadScreenshots(appId, screenshots) {
    for (const screenshot of screenshots) {
      await this.appStore.uploadScreenshot(appId, screenshot);
    }
  }
}

// Usage
const appStoreIntegration = new AppStoreIntegration(
  'content_api_key',
  'app_store_connect_key'
);

const result = await appStoreIntegration.syncAppToAppStore('1234567890', {
  name: 'TaskMaster Pro',
  platforms: [{ platform_name: 'iOS', min_os_version: '15.0' }],
  features: [
    { name: 'AI Task Prioritization', description: 'Smart task ordering' }
  ],
  screenshots: [
    { device: 'iPhone14', image: 'screenshot1.png' }
  ]
});
```

#### **Google Play Store Integration**
```javascript
// Google Play Store Integration
class GooglePlayIntegration {
  constructor(apiKey, playDeveloperApiKey) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.playConsole = new PlayDeveloperAPI(playDeveloperApiKey);
  }

  async publishToGooglePlay(packageName, appData) {
    try {
      // Generate Play Store content
      const content = await this.contentApi.generateContent('software', 'mobile_app', appData);

      // Format for Google Play
      const playStoreContent = this.formatForPlayStore(content);

      // Create or update store listing
      await this.playConsole.updateStoreListing(packageName, {
        title: playStoreContent.title,
        full_description: playStoreContent.full_description,
        short_description: playStoreContent.short_description,
        screenshots: appData.screenshots
      });

      // Submit for review
      const release = await this.playConsole.createRelease(packageName, {
        track: 'production',
        status: 'completed',
        release_notes: playStoreContent.release_notes
      });

      return {
        success: true,
        release_id: release.id,
        status: 'submitted'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### **2. Software Documentation Integration**

#### **GitHub Documentation Integration**
```javascript
// GitHub Docs Integration
class GitHubDocsIntegration {
  constructor(apiKey, githubToken) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.github = new GitHubAPI(githubToken);
  }

  async generateSoftwareDocs(repoOwner, repoName, softwareData) {
    try {
      // Generate comprehensive documentation
      const docs = await this.contentApi.generateContent('software', 'web_app', {
        ...softwareData,
        documentation_type: 'comprehensive'
      });

      // Create documentation structure
      const docStructure = this.createDocStructure(docs);

      // Upload to GitHub repository
      for (const doc of docStructure) {
        await this.github.createOrUpdateFile(
          repoOwner,
          repoName,
          doc.path,
          doc.content,
          `Update documentation: ${doc.title}`
        );
      }

      // Update README
      await this.updateReadme(repoOwner, repoName, docs);

      return {
        success: true,
        files_created: docStructure.length,
        repository_url: `https://github.com/${repoOwner}/${repoName}`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  createDocStructure(docs) {
    return [
      {
        path: 'docs/README.md',
        title: 'Documentation Overview',
        content: docs.sections.overview
      },
      {
        path: 'docs/INSTALLATION.md',
        title: 'Installation Guide',
        content: docs.sections.installation
      },
      {
        path: 'docs/API.md',
        title: 'API Documentation',
        content: docs.sections.api_documentation
      },
      {
        path: 'docs/TROUBLESHOOTING.md',
        title: 'Troubleshooting',
        content: docs.sections.troubleshooting
      }
    ];
  }
}
```

---

## 🤝 Services Integration Guides

### **1. Calendar & Booking Integration**

#### **Google Calendar Integration**
```javascript
// Google Calendar Booking Integration
class GoogleCalendarBooking {
  constructor(apiKey, googleCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.calendar = new GoogleCalendarAPI(googleCredentials);
  }

  async createServiceBooking(serviceData, customerData) {
    try {
      // Step 1: Generate service content
      const serviceContent = await this.contentApi.generateContent('services', 'consulting', {
        service_name: serviceData.name,
        service_type: serviceData.type,
        duration: serviceData.duration,
        pricing: serviceData.pricing
      });

      // Step 2: Check availability
      const availability = await this.checkAvailability(serviceData);

      if (!availability.available) {
        return { success: false, message: 'No available slots' };
      }

      // Step 3: Create calendar event
      const event = await this.calendar.createEvent({
        summary: `${serviceData.name} - ${customerData.name}`,
        description: this.createEventDescription(serviceContent, customerData),
        start: availability.start_time,
        end: availability.end_time,
        attendees: [
          { email: customerData.email },
          { email: serviceData.consultant_email }
        ]
      });

      // Step 4: Generate confirmation content
      const confirmation = await this.contentApi.generateContent('services', 'consulting', {
        ...serviceData,
        booking_details: {
          event_id: event.id,
          meeting_link: event.hangoutLink,
          calendar_url: event.htmlLink
        }
      });

      // Step 5: Send confirmation email
      await this.sendConfirmationEmail(customerData.email, confirmation);

      return {
        success: true,
        event_id: event.id,
        calendar_url: event.htmlLink,
        meeting_link: event.hangoutLink
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async checkAvailability(serviceData) {
    const calendarId = serviceData.consultant_calendar_id;
    const timeMin = new Date();
    const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    const events = await this.calendar.listEvents(calendarId, {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    // Find available slots
    const availableSlots = this.findAvailableSlots(events, serviceData.duration);

    return {
      available: availableSlots.length > 0,
      available_slots: availableSlots
    };
  }

  findAvailableSlots(events, duration) {
    const slots = [];
    const now = new Date();
    
    // Check next 30 days for availability
    for (let day = 0; day < 30; day++) {
      const currentDate = new Date(now.getTime() + day * 24 * 60 * 60 * 1000);
      
      // Check business hours (9 AM - 5 PM)
      for (let hour = 9; hour <= 17; hour++) {
        const slotStart = new Date(currentDate);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);
        
        if (this.isSlotAvailable(events, slotStart, slotEnd)) {
          slots.push({
            start_time: slotStart,
            end_time: slotEnd
          });
        }
      }
    }
    
    return slots;
  }

  isSlotAvailable(events, start, end) {
    return !events.some(event => {
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      
      return (start < eventEnd && end > eventStart);
    });
  }
}
```

#### **Zoom Integration**
```javascript
// Zoom Meeting Integration
class ZoomMeetingIntegration {
  constructor(apiKey, zoomCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.zoom = new ZoomAPI(zoomCredentials);
  }

  async createServiceMeeting(serviceData, customerData) {
    try {
      // Generate service content
      const serviceContent = await this.contentApi.generateContent('services', 'consulting', serviceData);

      // Create Zoom meeting
      const meeting = await this.zoom.createMeeting({
        topic: `${serviceData.name} - ${customerData.name}`,
        type: 2, // Scheduled meeting
        start_time: serviceData.scheduled_time,
        duration: serviceData.duration,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: true,
          waiting_room: true
        }
      });

      // Generate meeting preparation content
      const prepContent = await this.contentApi.generateContent('services', 'consulting', {
        ...serviceData,
        meeting_details: {
          meeting_id: meeting.id,
          join_url: meeting.join_url,
          password: meeting.password
        }
      });

      // Send meeting invitation
      await this.sendMeetingInvitation(customerData.email, meeting, prepContent);

      return {
        success: true,
        meeting_id: meeting.id,
        join_url: meeting.join_url,
        password: meeting.password
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### **2. CRM Integration**

#### **Salesforce Integration**
```javascript
// Salesforce Service Integration
class SalesforceServiceIntegration {
  constructor(apiKey, salesforceCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.salesforce = new SalesforceAPI(salesforceCredentials);
  }

  async createServiceOpportunity(serviceData, customerData) {
    try {
      // Generate service description
      const serviceContent = await this.contentApi.generateContent('services', 'consulting', {
        service_name: serviceData.name,
        service_type: serviceData.type,
        scope: serviceData.scope,
        deliverables: serviceData.deliverables
      });

      // Create or update customer account
      const account = await this.salesforce.upsert('Account', {
        Name: customerData.company,
        Industry: customerData.industry,
        AnnualRevenue: customerData.revenue,
        Phone: customerData.phone,
        Website: customerData.website
      });

      // Create opportunity
      const opportunity = await this.salesforce.create('Opportunity', {
        Name: `${serviceData.name} - ${customerData.company}`,
        AccountId: account.Id,
        StageName: 'Prospecting',
        CloseDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        Amount: serviceData.pricing.total_value,
        Description: serviceContent.sections.overview,
        LeadSource: 'Generated Content'
      });

      // Create service line items
      for (const deliverable of serviceData.deliverables) {
        await this.salesforce.create('OpportunityLineItem', {
          OpportunityId: opportunity.Id,
          Quantity: deliverable.quantity || 1,
          UnitPrice: deliverable.price,
          Description: deliverable.description
        });
      }

      // Create follow-up tasks
      await this.salesforce.create('Task', {
        WhatId: opportunity.Id,
        Subject: 'Follow up on service proposal',
        ActivityDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        Status: 'Not Started',
        Priority: 'Normal'
      });

      return {
        success: true,
        opportunity_id: opportunity.Id,
        account_id: account.Id
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

---

## 📚 Digital Products Integration Guides

### **1. Learning Management System Integration**

#### **Moodle Integration**
```javascript
// Moodle LMS Integration
class MoodleIntegration {
  constructor(apiKey, moodleCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.moodle = new MoodleAPI(moodleCredentials);
  }

  async createOnlineCourse(courseData) {
    try {
      // Generate course content
      const courseContent = await this.contentApi.generateContent('digital_products', 'online_course', {
        course_title: courseData.title,
        course_category: courseData.category,
        target_audience: courseData.target_audience,
        learning_objectives: courseData.learning_objectives
      });

      // Create Moodle course
      const moodleCourse = await this.moodle.createCourse({
        fullname: courseData.title,
        shortname: courseData.short_name,
        categoryid: courseData.moodle_category_id,
        summary: courseContent.sections.overview,
        format: 'topics',
        showgrades: true,
        showreports: true
      });

      // Create course sections based on modules
      for (const [index, module] of courseContent.sections.curriculum.modules.entries()) {
        await this.moodle.createCourseSection(moodleCourse.id, index + 1, module.title);

        // Add lessons to section
        for (const lesson of module.lessons) {
          await this.createLesson(moodleCourse.id, index + 1, lesson);
        }
      }

      // Enroll instructor
      await this.moodle.enrolUser(moodleCourse.id, courseData.instructor_moodle_id, 'editingteacher');

      // Create assessments
      await this.createAssessments(moodleCourse.id, courseContent.sections.assessments);

      // Generate certificate template
      if (courseContent.sections.certification) {
        await this.createCertificate(moodleCourse.id, courseContent.sections.certification);
      }

      return {
        success: true,
        moodle_course_id: moodleCourse.id,
        course_url: `${this.moodle.baseUrl}/course/view.php?id=${moodleCourse.id}`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createLesson(courseId, sectionId, lessonData) {
    // Create lesson page
    const page = await this.moodle.createPage(courseId, {
      name: lessonData.title,
      content: lessonData.content,
      section: sectionId
    });

    // Add video if available
    if (lessonData.video_url) {
      await this.moodle.addVideoResource(courseId, sectionId, {
        name: `${lessonData.title} - Video`,
        url: lessonData.video_url
      });
    }

    // Add quiz if available
    if (lessonData.quiz) {
      await this.createQuiz(courseId, sectionId, lessonData.quiz);
    }

    return page;
  }

  async createAssessments(courseId, assessments) {
    for (const assessment of assessments) {
      if (assessment.type === 'quiz') {
        await this.createQuiz(courseId, null, assessment);
      } else if (assessment.type === 'assignment') {
        await this.createAssignment(courseId, assessment);
      }
    }
  }
}
```

#### **Canvas Integration**
```javascript
// Canvas LMS Integration
class CanvasIntegration {
  constructor(apiKey, canvasToken) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.canvas = new CanvasAPI(canvasToken);
  }

  async publishCourseToCanvas(courseData, canvasAccountId) {
    try {
      // Generate course content
      const courseContent = await this.contentApi.generateContent('digital_products', 'online_course', courseData);

      // Create Canvas course
      const canvasCourse = await this.canvas.createCourse(canvasAccountId, {
        name: courseData.title,
        course_code: courseData.course_code,
        description: courseContent.sections.overview,
        is_public: true,
        self_enrollment: true
      });

      // Create modules
      for (const module of courseContent.sections.curriculum.modules) {
        const canvasModule = await this.canvas.createModule(canvasCourse.id, {
          name: module.title,
          position: module.module_number
        });

        // Add module items
        for (const lesson of module.lessons) {
          await this.addModuleItem(canvasCourse.id, canvasModule.id, lesson);
        }
      }

      // Create assignments
      for (const assignment of courseContent.sections.assessments) {
        await this.canvas.createAssignment(canvasCourse.id, {
          name: assignment.title,
          description: assignment.description,
          points_possible: assignment.points,
          due_at: assignment.due_date,
          submission_types: ['online_text_entry', 'online_upload']
        });
      }

      // Publish course
      await this.canvas.publishCourse(canvasCourse.id);

      return {
        success: true,
        canvas_course_id: canvasCourse.id,
        course_url: canvasCourse.enrollment_url
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### **2. E-commerce Platform Integration**

#### **Shopify Digital Products**
```javascript
// Shopify Digital Products Integration
class ShopifyDigitalProducts {
  constructor(apiKey, shopifyCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.shopify = new ShopifyAPI(shopifyCredentials);
  }

  async createDigitalProduct(productData) {
    try {
      // Generate product content
      const productContent = await this.contentApi.generateContent('digital_products', 'online_course', {
        course_title: productData.title,
        course_category: productData.category,
        learning_objectives: productData.objectives
      });

      // Create Shopify product
      const shopifyProduct = await this.shopify.createProduct({
        title: productData.title,
        body_html: this.formatDescription(productContent),
        product_type: 'Digital Course',
        vendor: productData.instructor,
        tags: this.generateTags(productContent),
        variants: [
          {
            title: 'Digital Access',
            price: productData.price,
            sku: productData.sku,
            inventory_policy: 'deny',
            inventory_quantity: 999999, // Unlimited for digital
            requires_shipping: false,
            taxable: false,
            weight: 0
          }
        ]
      });

      // Set up digital delivery
      await this.setupDigitalDelivery(shopifyProduct.id, productData);

      // Create collection for organization
      await this.addToCollection(shopifyProduct.id, productData.category);

      return {
        success: true,
        shopify_product_id: shopifyProduct.id,
        product_url: `https://${this.shopify.shop}/products/${shopifyProduct.handle}`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async setupDigitalDelivery(productId, productData) {
    // Create digital download link
    const downloadLink = await this.generateSecureDownloadLink(productData);

    // Set up automatic fulfillment
    await this.shopify.createProductVariantFulfillmentService(productId, {
        digital_download: {
          content_type: 'application/pdf',
          download_limit: 5,
          download_expiry_days: 365
        }
      });

    return downloadLink;
  }
}
```

---

## 📦 Packaging Integration Guides

### **1. Packaging Design Integration**

#### **ArtiosCAD Integration**
```javascript
// ArtiosCAD Packaging Design Integration
class ArtiosCADIntegration {
  constructor(apiKey, artioscadCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.artioscad = new ArtiosCADAPI(artioscadCredentials);
  }

  async generatePackagingSpecs(packagingData) {
    try {
      // Generate packaging content
      const packagingContent = await this.contentApi.generateContent('packaging', 'primary_packaging', {
        product_name: packagingData.product_name,
        packaging_type: packagingData.type,
        material: packagingData.material,
        dimensions: packagingData.dimensions
      });

      // Create structural design
      const structuralDesign = await this.artioscad.createStructuralDesign({
        name: packagingData.product_name,
        type: packagingData.type,
        dimensions: packagingData.dimensions,
        material: packagingData.material,
        design_rules: this.extractDesignRules(packagingContent)
      });

      // Generate graphic design brief
      const graphicBrief = await this.generateGraphicBrief(packagingContent, packagingData);

      // Create production specifications
      const productionSpecs = await this.createProductionSpecs(packagingContent, structuralDesign);

      return {
        success: true,
        structural_design_id: structuralDesign.id,
        graphic_brief: graphicBrief,
        production_specs: productionSpecs,
        compliance_info: packagingContent.sections.compliance
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  extractDesignRules(content) {
    return {
      material_constraints: content.sections.material_specifications,
      structural_requirements: content.sections.design_requirements,
      compliance_standards: content.sections.compliance
    };
  }

  async createProductionSpecs(content, design) {
    return {
      material_specifications: content.sections.material_specifications,
      printing_requirements: {
        colors: content.sections.branding.color_requirements,
        finishes: content.sections.branding.finish_options
      },
      structural_specifications: design.specifications,
      quality_control: content.sections.quality_assurance,
      packaging_requirements: content.sections.shipping_requirements
    };
  }
}
```

### **2. Compliance & Certification Integration**

#### **FDA Compliance Integration**
```javascript
// FDA Compliance Integration
class FDAComplianceIntegration {
  constructor(apiKey, fdaCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.fda = new FDAAPI(fdaCredentials);
  }

  async generateComplianceDocumentation(packagingData) {
    try {
      // Generate compliance content
      const complianceContent = await this.contentApi.generateContent('packaging', 'primary_packaging', {
        ...packagingData,
        compliance_focus: 'fda_regulations'
      });

      // Check FDA requirements
      const fdaRequirements = await this.fda.getRequirements(packagingData.product_category);

      // Validate compliance
      const complianceCheck = await this.validateCompliance(complianceContent, fdaRequirements);

      // Generate compliance documentation
      const complianceDocs = await this.generateComplianceDocs(complianceContent, complianceCheck);

      return {
        success: true,
        compliance_status: complianceCheck.status,
        documentation: complianceDocs,
        required_certifications: complianceCheck.certifications,
        next_steps: complianceCheck.next_steps
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async validateCompliance(content, requirements) {
    const validation = {
      status: 'compliant',
      issues: [],
      certifications: [],
      next_steps: []
    };

    // Check material compliance
    for (const material of content.sections.material_specifications.materials) {
      const materialCompliance = await this.fda.checkMaterialCompliance(material);
      if (!materialCompliance.compliant) {
        validation.issues.push({
          type: 'material',
          material: material.name,
          issue: materialCompliance.issue,
          solution: materialCompliance.solution
        });
        validation.status = 'non_compliant';
      }
    }

    // Check labeling requirements
    const labelingCompliance = await this.validateLabeling(content.sections.labeling, requirements.labeling);
    if (!labelingCompliance.compliant) {
      validation.issues.push(...labelingCompliance.issues);
      validation.status = 'non_compliant';
    }

    return validation;
  }
}
```

---

## ⚡ Energy Products Integration Guides

### **1. Solar System Design Integration**

#### **PVsyst Integration**
```javascript
// PVsyst Solar Design Integration
class PVsystIntegration {
  constructor(apiKey, pvsystCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.pvsyst = new PVsystAPI(pvsystCredentials);
  }

  async generateSolarSystemDesign(systemData) {
    try {
      // Generate solar system content
      const systemContent = await this.contentApi.generateContent('energy', 'solar_panel', {
        system_name: systemData.name,
        system_capacity: systemData.capacity,
        location: systemData.location,
        application_type: systemData.application_type
      });

      // Create PVsyst project
      const pvsystProject = await this.pvsyst.createProject({
        name: systemData.name,
        location: systemData.location,
        system_type: systemData.system_type,
        capacity: systemData.capacity
      });

      // Design system layout
      const systemLayout = await this.pvsyst.designSystem(pvsystProject.id, {
        panel_type: systemData.panel_type,
        inverter_type: systemData.inverter_type,
        mounting_system: systemData.mounting_system,
        shading_analysis: true
      });

      // Generate performance simulation
      const performance = await this.pvsyst.runSimulation(pvsystProject.id);

      // Create technical documentation
      const technicalDocs = await this.generateTechnicalDocs(systemContent, systemLayout, performance);

      return {
        success: true,
        project_id: pvsystProject.id,
        system_layout: systemLayout,
        performance_simulation: performance,
        technical_documentation: technicalDocs
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async generateTechnicalDocs(content, layout, performance) {
    return {
      system_overview: content.sections.overview,
      technical_specifications: content.sections.technical_specs,
      installation_guide: content.sections.installation,
      performance_analysis: performance.results,
      economic_analysis: performance.economics,
      environmental_impact: performance.environmental,
      maintenance_schedule: content.sections.maintenance
    };
  }
}
```

### **2. Energy Storage Integration**

#### **Battery Management System Integration**
```javascript
// Battery Management System Integration
class BatteryManagementIntegration {
  constructor(apiKey, bmsCredentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.bms = new BMSAPI(bmsCredentials);
  }

  async generateBatterySystemConfig(batteryData) {
    try {
      // Generate battery system content
      const batteryContent = await this.contentApi.generateContent('energy', 'energy_storage', {
        system_name: batteryData.name,
        battery_type: batteryData.type,
        capacity: batteryData.capacity,
        application: batteryData.application
      });

      // Configure battery management system
      const bmsConfig = await this.bms.configureSystem({
        battery_type: batteryData.type,
        capacity: batteryData.capacity,
        charge_controller: batteryData.charge_controller,
        inverter: batteryData.inverter,
        monitoring_system: batteryData.monitoring
      });

      // Generate safety documentation
      const safetyDocs = await this.generateSafetyDocumentation(batteryContent, bmsConfig);

      // Create maintenance procedures
      const maintenanceProcedures = await this.createMaintenanceProcedures(batteryContent, bmsConfig);

      return {
        success: true,
        bms_configuration: bmsConfig,
        safety_documentation: safetyDocs,
        maintenance_procedures: maintenanceProcedures,
        technical_specifications: batteryContent.sections.technical_specs
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

---

## 🔧 Integration Best Practices

### **1. Error Handling & Resilience**

```javascript
// Robust Error Handling
class IntegrationBase {
  constructor(apiKey, credentials) {
    this.contentApi = new ContentGeneratorAPI(apiKey);
    this.credentials = credentials;
    this.retryConfig = {
      maxRetries: 3,
      retryDelay: 1000,
      backoffMultiplier: 2
    };
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const result = await operation();
        return { success: true, data: result };
      } catch (error) {
        lastError = error;
        
        if (attempt < this.retryConfig.maxRetries && this.isRetryableError(error)) {
          const delay = this.retryConfig.retryDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt - 1);
          await this.sleep(delay);
          continue;
        }
        
        break;
      }
    }
    
    return { 
      success: false, 
      error: lastError.message,
      context: context
    };
  }

  isRetryableError(error) {
    const retryableErrors = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'EAI_AGAIN'
    ];
    
    return retryableErrors.includes(error.code) || 
           (error.response && error.response.status >= 500);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### **2. Data Validation & Sanitization**

```javascript
// Data Validation
class DataValidator {
  static validateSoftwareData(data) {
    const errors = [];
    
    if (!data.app_name || data.app_name.length < 3) {
      errors.push('App name must be at least 3 characters long');
    }
    
    if (!data.platforms || data.platforms.length === 0) {
      errors.push('At least one platform must be specified');
    }
    
    for (const platform of data.platforms) {
      if (!platform.platform_name) {
        errors.push('Platform name is required');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  static sanitizeContent(content) {
    // Remove potentially harmful content
    const sanitized = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
    
    return sanitized;
  }
}
```

### **3. Performance Optimization**

```javascript
// Caching Strategy
class ContentCache {
  constructor(redisClient) {
    this.redis = redisClient;
    this.defaultTTL = 3600; // 1 hour
  }

  async getCachedContent(key) {
    try {
      const cached = await this.redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async setCachedContent(key, content, ttl = this.defaultTTL) {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(content));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  generateCacheKey(productType, templateId, dataHash) {
    return `${productType}:${templateId}:${dataHash}`;
  }
}
```

---

## 📊 Monitoring & Analytics

### **1. Integration Performance Monitoring**

```javascript
// Performance Monitoring
class IntegrationMonitor {
  constructor(metricsCollector) {
    this.metrics = metricsCollector;
  }

  async trackIntegrationMetrics(integrationType, operation, duration, success) {
    const metrics = {
      integration_type: integrationType,
      operation: operation,
      duration: duration,
      success: success,
      timestamp: new Date().toISOString()
    };

    await this.metrics.record('integration_performance', metrics);
  }

  async trackErrorMetrics(integrationType, error, context) {
    const errorMetrics = {
      integration_type: integrationType,
      error_type: error.name,
      error_message: error.message,
      context: context,
      timestamp: new Date().toISOString()
    };

    await this.metrics.record('integration_errors', errorMetrics);
  }
}
```

### **2. Usage Analytics**

```javascript
// Usage Analytics
class UsageAnalytics {
  constructor(analyticsClient) {
    this.analytics = analyticsClient;
  }

  async trackProductTypeUsage(productType, operation, userId) {
    const event = {
      event_type: 'product_type_usage',
      product_type: productType,
      operation: operation,
      user_id: userId,
      timestamp: new Date().toISOString()
    };

    await this.analytics.track(event);
  }

  async trackTemplateUsage(templateId, productType, qualityScore) {
    const event = {
      event_type: 'template_usage',
      template_id: templateId,
      product_type: productType,
      quality_score: qualityScore,
      timestamp: new Date().toISOString()
    };

    await this.analytics.track(event);
  }
}
```

---

*Integration guides này cung cấp comprehensive examples và best practices để tích hợp hệ thống content generation với các platforms và services phổ biến cho 5 loại sản phẩm mới.*
