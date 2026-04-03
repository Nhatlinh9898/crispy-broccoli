/**
 * Enhanced Article Generator System
 * Advanced features: multi-language, interactive elements, SEO optimization
 */

class EnhancedArticleGenerator extends ArticleGenerator {
    constructor() {
        super();
        this.enhancedFeatures = {
            multiLanguage: true,
            interactiveElements: true,
            seoOptimization: true,
            responsiveDesign: true,
            advancedFormatting: true
        };
        this.currentLanguage = 'vi';
        this.interactiveData = new Map();
    }

    /**
     * Initialize enhanced generator with additional features
     */
    async initializeEnhanced() {
        try {
            // Load enhanced templates
            const templatesResponse = await fetch('enhanced-article-templates.json');
            this.templates = await templatesResponse.json();
            
            // Load product data
            const productsResponse = await fetch('ecommerce-products.json');
            this.productData = await productsResponse.json();
            
            console.log('Enhanced Article Generator initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize Enhanced Article Generator:', error);
            return false;
        }
    }

    /**
     * Enhanced product type determination with more categories
     */
    determineProductType(product) {
        const name = (product.name || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        
        // Check for capacitors
        if (name.includes('tụ') || name.includes('capacitor') || 
            name.includes('コンデンサ') || name.includes('capacitance')) {
            return 'capacitor';
        }
        
        // Check for inductors
        if (name.includes('cuộn') || name.includes('inductor') || 
            name.includes('インダクタ') || name.includes('coil')) {
            return 'inductor';
        }
        
        // Check for diodes
        if (name.includes('diode') || name.includes('ダイオード') || 
            name.includes('điốt') || name.includes('rectifier')) {
            return 'diode';
        }
        
        // Check for transistors
        if (name.includes('transistor') || name.includes('トランジスタ') || 
            name.includes('bjt') || name.includes('mosfet')) {
            return 'transistor';
        }
        
        // Check for ICs
        if (name.includes('ic') || name.includes('chip') || 
            name.includes('integrated') || name.includes('プロセッサ') ||
            name.includes('microcontroller') || name.includes('cpu')) {
            return 'ic';
        }
        
        // Check for sensors
        if (name.includes('sensor') || name.includes('cảm biến') || 
            name.includes('センサ') || name.includes('temperature') ||
            name.includes('pressure') || name.includes('light')) {
            return 'sensor';
        }
        
        // Check for connectors
        if (name.includes('connector') || name.includes('jack') || 
            name.includes('plug') || name.includes('socket') ||
            name.includes('コネクタ') || name.includes('đầu nối')) {
            return 'connector';
        }
        
        // Check for bolts and screws
        if (name.includes('ボルト') || name.includes('bu lông') || 
            name.includes('ネジ') || name.includes('ốc vít') ||
            name.includes('bolt') || name.includes('screw')) {
            return 'bolt';
        }
        
        // Check for resistors
        if (name.includes('抵抗') || name.includes('điện trở') ||
            name.includes('resistor') || name.includes('resistance')) {
            return 'resistor';
        }
        
        // Check for bearings
        if (name.includes('ベアリング') || name.includes('vòng bi') ||
            name.includes('bearing') || name.includes('ball bearing')) {
            return 'bearing';
        }
        
        // Check for electronic components
        if (category.includes('電子') || category.includes('điện tử') ||
            category.includes('electronic')) {
            return 'electronic';
        }
        
        // Check for mechanical components
        if (category.includes('機械') || category.includes('cơ khí') ||
            category.includes('mechanical')) {
            return 'mechanical';
        }
        
        return 'generic';
    }

    /**
     * Enhanced variable extraction with more detailed data
     */
    extractVariables(product, templateType) {
        const variables = {
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
        switch (templateType) {
            case 'capacitor':
                variables.capacitance = product.specifications?.capacitance || '100nF';
                variables.voltage_rating = product.specifications?.voltage_rating || '50V';
                variables.tolerance = product.specifications?.tolerance || '±10%';
                variables.dielectric = product.specifications?.dielectric || 'X7R';
                variables.package_size = product.specifications?.package || '0805';
                variables.temp_range = product.specifications?.operating_temperature || '-55°C to +125°C';
                break;

            case 'inductor':
                variables.inductance = product.specifications?.inductance || '10µH';
                variables.current_rating = product.specifications?.current_rating || '100mA';
                variables.tolerance = product.specifications?.tolerance || '±5%';
                variables.quality_factor = product.specifications?.q_factor || '50';
                variables.frequency_range = product.specifications?.frequency_range || '1kHz-10MHz';
                variables.dc_resistance = product.specifications?.dc_resistance || '0.1Ω';
                break;

            case 'diode':
                variables.forward_voltage = product.specifications?.forward_voltage || '0.7V';
                variables.max_forward_current = product.specifications?.max_forward_current || '1A';
                variables.max_reverse_voltage = product.specifications?.max_reverse_voltage || '50V';
                variables.reverse_leakage = product.specifications?.reverse_leakage || '1µA';
                variables.recovery_time = product.specifications?.recovery_time || '50ns';
                variables.temp_range = product.specifications?.operating_temperature || '-40°C to +125°C';
                break;

            case 'transistor':
                variables.current_gain = product.specifications?.current_gain || '100';
                variables.max_collector_current = product.specifications?.max_collector_current || '100mA';
                variables.max_voltage_ce = product.specifications?.max_voltage_ce || '30V';
                variables.power_dissipation = product.specifications?.power_dissipation || '0.5W';
                variables.transition_frequency = product.specifications?.transition_frequency || '100MHz';
                variables.temp_range = product.specifications?.operating_temperature || '-55°C to +150°C';
                break;

            case 'ic':
                variables.supply_voltage = product.specifications?.supply_voltage || '5V';
                variables.current_consumption = product.specifications?.current_consumption || '10mA';
                variables.clock_frequency = product.specifications?.clock_frequency || '16MHz';
                variables.package_type = product.specifications?.package || 'DIP-8';
                variables.pin_count = product.specifications?.pin_count || '8';
                variables.temp_range = product.specifications?.operating_temperature || '-40°C to +85°C';
                break;

            case 'sensor':
                variables.measurement_range = product.specifications?.measurement_range || '0-100°C';
                variables.accuracy = product.specifications?.accuracy || '±1°C';
                variables.resolution = product.specifications?.resolution || '0.1°C';
                variables.response_time = product.specifications?.response_time || '100ms';
                variables.operating_voltage = product.specifications?.operating_voltage || '3.3V-5V';
                variables.temp_range = product.specifications?.operating_temperature || '-40°C to +85°C';
                break;

            case 'connector':
                variables.pin_count = product.specifications?.pin_count || '4';
                variables.voltage_rating = product.specifications?.voltage_rating || '250V';
                variables.current_rating = product.specifications?.current_rating || '5A';
                variables.contact_resistance = product.specifications?.contact_resistance || '10mΩ';
                variables.contact_material = product.specifications?.contact_material || 'Brass';
                variables.temp_range = product.specifications?.operating_temperature || '-40°C to +105°C';
                break;

            case 'bolt':
                variables.standard = product.specifications?.standard || 'JIS B1181';
                variables.material = product.specifications?.material || 'Thép carbon';
                variables.coating = product.specifications?.coating || 'Kẽm nóng';
                variables.size = product.specifications?.diameter || 'M6';
                variables.strength = product.specifications?.strength_class || '4.8';
                
                // Determine structure description
                const name = (product.name || '').toLowerCase();
                if (name.includes('phillips') || name.includes('cross')) {
                    variables.structure_description = this.templates.content_generators.dynamic_content.structure_description.phillips_screw;
                } else if (name.includes('hex socket') || name.includes('allen')) {
                    variables.structure_description = this.templates.content_generators.dynamic_content.structure_description.hex_socket;
                } else {
                    variables.structure_description = this.templates.content_generators.dynamic_content.structure_description.hex_bolt;
                }
                break;

            case 'resistor':
                variables.resistance = product.specifications?.resistance || '10kΩ';
                variables.power = product.specifications?.power_rating || '1/4W';
                variables.tolerance = product.specifications?.tolerance || '±5%';
                variables.temp_coefficient = product.specifications?.temperature_coefficient || '±100ppm/°C';
                variables.package_size = product.specifications?.package || '0603';
                variables.material = product.specifications?.termination || 'Nickel barrier';
                break;

            case 'bearing':
                variables.bearing_structure = this.generateBearingStructure();
                variables.specifications = this.formatBearingSpecs(product.specifications);
                break;
        }

        // Add component role
        const productType = this.determineProductType(product);
        variables.component_role = this.templates.content_generators.dynamic_content.component_role[productType] || 
                                 this.templates.content_generators.dynamic_content.component_role.default;

        return variables;
    }

    /**
     * Generate enhanced section content with interactive elements
     */
    generateSectionContent(section, variables, product) {
        let content = '';
        
        switch (section.content_type) {
            case 'dynamic':
                content = this.replaceVariables(section.template, variables);
                break;
                
            case 'table':
                content = this.generateTableContent(section, variables, product);
                break;
                
            case 'highlight_box':
                content = this.generateHighlightBoxContent(section, variables, product);
                break;
                
            case 'list':
                content = this.generateListContent(section, variables, product);
                break;
                
            case 'comparison':
                content = this.generateComparisonContent(section, variables, product);
                break;
                
            case 'cards':
                content = this.generateCardsContent(section, variables, product);
                break;
                
            case 'steps':
                content = this.generateStepsContent(section, variables, product);
                break;
                
            case 'checklist':
                content = this.generateChecklistContent(section, variables, product);
                break;
                
            case 'formula':
                content = this.generateFormulaContent(section, variables, product);
                break;
                
            case 'explanation':
                content = this.generateExplanationContent(section, variables, product);
                break;
                
            case 'application_cards':
                content = this.generateApplicationCardsContent(section, variables, product);
                break;
                
            case 'design_steps':
                content = this.generateDesignStepsContent(section, variables, product);
                break;
                
            case 'troubleshooting':
                content = this.generateTroubleshootingContent(section, variables, product);
                break;
                
            case 'summary':
                content = this.replaceVariables(section.template, variables);
                break;
                
            case 'spec_list':
                content = this.generateSpecListContent(section, variables, product);
                break;
                
            case 'application_list':
                content = this.generateApplicationListContent(section, variables, product);
                break;
                
            case 'usage_steps':
                content = this.generateUsageStepsContent(section, variables, product);
                break;
                
            case 'maintenance_checklist':
                content = this.generateMaintenanceChecklistContent(section, variables, product);
                break;
                
            case 'comparison_table':
                content = this.generateComparisonTableContent(section, variables, product);
                break;
                
            case 'material_cards':
                content = this.generateMaterialCardsContent(section, variables, product);
                break;
                
            case 'maintenance_guide':
                content = this.generateMaintenanceGuideContent(section, variables, product);
                break;
                
            case 'installation_steps':
                content = this.generateInstallationStepsContent(section, variables, product);
                break;
                
            case 'troubleshooting_guide':
                content = this.generateTroubleshootingGuideContent(section, variables, product);
                break;
                
            case 'special_cards':
                content = this.generateSpecialCardsContent(section, variables, product);
                break;
                
            case 'interface_cards':
                content = this.generateInterfaceCardsContent(section, variables, product);
                break;
                
            case 'configuration_cards':
                content = this.generateConfigurationCardsContent(section, variables, product);
                break;
                
            case 'warning_box':
                content = this.generateWarningBoxContent(section, variables, product);
                break;
                
            case 'assembly_guide':
                content = this.generateAssemblyGuideContent(section, variables, product);
                break;
                
            case 'contact_cards':
                content = this.generateContactCardsContent(section, variables, product);
                break;
                
            case 'signal_conditioning':
                content = this.generateSignalConditioningContent(section, variables, product);
                break;
                
            case 'calibration_procedures':
                content = this.generateCalibrationProceduresContent(section, variables, product);
                break;
                
            default:
                content = this.replaceVariables(section.template, variables);
        }
        
        // Add interactive elements if enabled
        if (this.enhancedFeatures.interactiveElements) {
            content = this.addInteractiveElements(content, section, variables, product);
        }
        
        return content;
    }

    /**
     * Generate spec list content
     */
    generateSpecListContent(section, variables, product) {
        if (section.spec_fields) {
            let html = '<div class="spec-list">\n';
            section.spec_fields.forEach(field => {
                const content = this.replaceVariables(field, variables);
                html += `<div class="spec-item">${content}</div>\n`;
            });
            html += '</div>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate application list content
     */
    generateApplicationListContent(section, variables, product) {
        if (section.applications_data) {
            let html = '<ul class="application-list">\n';
            section.applications_data.forEach(app => {
                html += `<li>${app}</li>\n`;
            });
            html += '</ul>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate usage steps content
     */
    generateUsageStepsContent(section, variables, product) {
        if (section.usage_steps) {
            let html = '<ol class="usage-steps">\n';
            section.usage_steps.forEach(step => {
                html += `<li>${step}</li>\n`;
            });
            html += '</ol>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate maintenance checklist content
     */
    generateMaintenanceChecklistContent(section, variables, product) {
        if (section.maintenance_data) {
            let html = '<div class="maintenance-checklist">\n<h4>Các hoạt động bảo trì:</h4>\n<ul>\n';
            section.maintenance_data.forEach(item => {
                html += `<li class="checklist-item">
                    <input type="checkbox" id="check-${item.replace(/\s+/g, '-')}">
                    <label for="check-${item.replace(/\s+/g, '-')}">${item}</label>
                </li>\n`;
            });
            html += '</ul>\n</div>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate comparison table content
     */
    generateComparisonTableContent(section, variables, product) {
        if (section.classification_data) {
            let html = '<table class="comparison-table">\n<thead>\n<tr>\n<th>Loại</th>\n<th>Đặc tính</th>\n<th>Ứng dụng</th>\n</tr>\n</thead>\n<tbody>\n';
            
            section.classification_data.forEach(item => {
                html += '<tr>\n';
                html += `<td>${item.type}</td>\n`;
                html += `<td>${item.properties}</td>\n`;
                html += `<td>${item.applications}</td>\n`;
                html += '</tr>\n';
            });
            
            html += '</tbody>\n</table>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate material cards content
     */
    generateMaterialCardsContent(section, variables, product) {
        if (section.materials_data) {
            let html = '';
            Object.values(section.materials_data).forEach(material => {
                html += '<div class="material-card">\n';
                html += `<h4>${material.name}</h4>\n`;
                html += `<p><strong>Đặc tính:</strong> ${material.properties}</p>\n`;
                html += `<p><strong>Ứng dụng:</strong> ${material.applications}</p>\n`;
                html += '</div>\n';
            });
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate warning box content
     */
    generateWarningBoxContent(section, variables, product) {
        if (section.safety_data) {
            let html = '<div class="warning-box">\n<h4><i class="fas fa-exclamation-triangle mr-2"></i>Lưu ý An toàn</h4>\n<ul>\n';
            section.safety_data.forEach(item => {
                html += `<li class="warning-item"><i class="fas fa-exclamation-triangle mr-2"></i>${item}</li>\n`;
            });
            html += '</ul>\n</div>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Add interactive elements to content
     */
    addInteractiveElements(content, section, variables, product) {
        // Add expandable sections
        content = this.addExpandableSections(content);
        
        // Add tooltips
        content = this.addTooltips(content);
        
        // Add interactive diagrams
        content = this.addInteractiveDiagrams(content, section, variables);
        
        // Add calculator tools
        content = this.addCalculatorTools(content, section, variables);
        
        return content;
    }

    /**
     * Add expandable sections
     */
    addExpandableSections(content) {
        // Find technical specifications and make them expandable
        content = content.replace(
            /<div class="spec-highlight">([\s\S]*?)<\/div>/g,
            '<div class="spec-expandable">\n<button class="expand-btn" onclick="toggleExpand(this)"><i class="fas fa-chevron-down mr-2"></i>Xem chi tiết</button>\n<div class="expand-content" style="display: none;">$1</div>\n</div>'
        );
        
        return content;
    }

    /**
     * Add tooltips
     */
    addTooltips(content) {
        // Add tooltips for technical terms
        const technicalTerms = {
            'JIS': 'Japanese Industrial Standards',
            'ISO': 'International Organization for Standardization',
            'ANSI': 'American National Standards Institute',
            'SMD': 'Surface Mount Device',
            'SUS304': 'Stainless Steel 304',
            'ABEC': 'Annular Bearing Engineers Committee'
        };
        
        Object.keys(technicalTerms).forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'g');
            content = content.replace(regex, `<span class="tooltip" data-tooltip="${technicalTerms[term]}">${term}</span>`);
        });
        
        return content;
    }

    /**
     * Add interactive diagrams
     */
    addInteractiveDiagrams(content, section, variables, product) {
        if (section.id === 'principle' && variables.product_name_lower.includes('điện trở')) {
            content += `
                <div class="interactive-diagram">
                    <h4><i class="fas fa-calculator mr-2"></i>Ohm's Law Calculator</h4>
                    <div class="calculator">
                        <div class="input-group">
                            <label>Điện áp (V):</label>
                            <input type="number" id="voltage" placeholder="Enter voltage" onchange="calculateOhmsLaw()">
                        </div>
                        <div class="input-group">
                            <label>Điện trở (Ω):</label>
                            <input type="number" id="resistance" placeholder="Enter resistance" onchange="calculateOhmsLaw()">
                        </div>
                        <div class="input-group">
                            <label>Dòng điện (A):</label>
                            <input type="number" id="current" placeholder="Enter current" onchange="calculateOhmsLaw()">
                        </div>
                        <div class="result">
                            <p>Kết quả: <span id="ohm-result">Nhập 2 giá trị để tính</span></p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return content;
    }

    /**
     * Add calculator tools
     */
    addCalculatorTools(content, section, variables, product) {
        // Add power calculator for resistors
        if (variables.power && variables.resistance) {
            content += `
                <div class="power-calculator">
                    <h4><i class="fas fa-bolt mr-2"></i>Power Calculator</h4>
                    <div class="calc-inputs">
                        <div class="input-group">
                            <label>Điện trở (Ω):</label>
                            <input type="number" id="calc-resistance" value="${variables.resistance}" onchange="calculatePower()">
                        </div>
                        <div class="input-group">
                            <label>Dòng điện (A):</label>
                            <input type="number" id="calc-current" placeholder="Enter current" onchange="calculatePower()">
                        </div>
                    </div>
                    <div class="calc-results">
                        <p>Công suất: <span id="power-result">-</span> W</p>
                        <p>Đề xuất công suất: <span id="recommended-power">-</span> W</p>
                    </div>
                </div>
            `;
        }
        
        return content;
    }

    /**
     * Generate enhanced article with SEO optimization
     */
    generateEnhancedArticle(product) {
        const cacheKey = `${product.id || product.sku || 'unknown'}_enhanced_article`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const productType = this.determineProductType(product);
        const template = this.templates.templates[productType] || this.templates.templates.generic;
        
        if (!template) {
            throw new Error(`No template found for product type: ${productType}`);
        }
        
        // Extract variables
        const variables = this.extractVariables(product, productType);
        
        // Generate article sections
        let articleHTML = '';
        let tocItems = [];
        let structuredData = [];
        
        template.structure.sections.forEach(section => {
            const sectionHTML = this.generateSectionContent(section, variables, product);
            
            // Add section to article
            articleHTML += `<section id="${section.id}" class="article-section">\n`;
            articleHTML += `<h2>${section.title}</h2>\n`;
            articleHTML += sectionHTML + '\n';
            articleHTML += '</section>\n';
            
            // Add to table of contents
            tocItems.push({
                id: section.id,
                title: section.title,
                level: 2
            });
            
            // Add structured data for SEO
            structuredData.push({
                '@type': 'Section',
                name: section.title,
                id: section.id
            });
        });
        
        // Generate complete article HTML
        const completeArticle = {
            product_id: product.id || product.sku,
            product_name: product.name,
            product_type: productType,
            title: this.generateArticleTitle(product, productType),
            subtitle: this.generateArticleSubtitle(product, productType),
            content: articleHTML,
            table_of_contents: tocItems,
            structured_data: structuredData,
            seo_metadata: this.generateSEOMetadata(product, productType, variables),
            interactive_elements: this.getInteractiveElements(),
            generated_at: new Date().toISOString(),
            variables: variables,
            enhanced_features: true
        };
        
        // Cache the result
        this.cache.set(cacheKey, completeArticle);
        
        return completeArticle;
    }

    /**
     * Generate SEO metadata
     */
    generateSEOMetadata(product, productType, variables) {
        return {
            title: this.generateArticleTitle(product, productType),
            description: this.generateArticleSubtitle(product, productType),
            keywords: this.generateKeywords(product, productType, variables),
            canonical_url: `/products/${product.id || product.sku}`,
            meta_tags: {
                'og:title': this.generateArticleTitle(product, productType),
                'og:description': this.generateArticleSubtitle(product, productType),
                'og:type': 'article',
                'og:image': this.getProductImage(product),
                'twitter:card': 'summary_large_image',
                'twitter:title': this.generateArticleTitle(product, productType),
                'twitter:description': this.generateArticleSubtitle(product, productType),
                'twitter:image': this.getProductImage(product)
            },
            structured_data: this.generateStructuredData(product, productType, variables)
        };
    }

    /**
     * Generate keywords for SEO
     */
    generateKeywords(product, productType, variables) {
        const keywords = [
            product.name,
            product.category,
            productType,
            variables.brand || '',
            variables.manufacturer || '',
            'hướng dẫn sử dụng',
            'thông số kỹ thuật',
            'ứng dụng thực tế',
            'bảo trì',
            'lựa chọn'
        ].filter(Boolean);
        
        return keywords.join(', ');
    }

    /**
     * Generate structured data for SEO
     */
    generateStructuredData(product, productType, variables) {
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: this.generateArticleTitle(product, productType),
            description: this.generateArticleSubtitle(product, productType),
            author: {
                '@type': 'Organization',
                name: 'Technical Documentation Team'
            },
            publisher: {
                '@type': 'Organization',
                name: 'Parts Classification System'
            },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `/products/${product.id || product.sku}`
            },
            image: this.getProductImage(product),
            articleSection: productType,
            keywords: this.generateKeywords(product, productType, variables)
        };
    }

    /**
     * Get product image
     */
    getProductImage(product) {
        if (product.images && product.images.length > 0) {
            return product.images[0].url;
        }
        
        // Generate placeholder image URL
        return `https://picsum.photos/seed/${product.id || product.sku}/800/600.jpg`;
    }

    /**
     * Get interactive elements
     */
    getInteractiveElements() {
        return [
            {
                type: 'calculator',
                name: 'Ohm\'s Law Calculator',
                sections: ['principle']
            },
            {
                type: 'expandable',
                name: 'Expandable Specifications',
                sections: ['specifications']
            },
            {
                type: 'tooltip',
                name: 'Technical Term Tooltips',
                sections: ['all']
            }
        ];
    }

    /**
     * Generate batch articles with enhanced features
     */
    generateBatchEnhancedArticles(products) {
        const articles = [];
        
        products.forEach(product => {
            try {
                const article = this.generateEnhancedArticle(product);
                articles.push(article);
            } catch (error) {
                console.error(`Failed to generate enhanced article for product ${product.id || product.sku}:`, error);
            }
        });
        
        return articles;
    }

    /**
     * Export articles in different formats
     */
    exportArticles(articles, format = 'json') {
        switch (format) {
            case 'json':
                return JSON.stringify(articles, null, 2);
                
            case 'html':
                return this.exportToHTML(articles);
                
            case 'markdown':
                return this.exportToMarkdown(articles);
                
            case 'csv':
                return this.exportToCSV(articles);
                
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
    }

    /**
     * Export articles to HTML
     */
    exportToHTML(articles) {
        let html = '<!DOCTYPE html>\n<html lang="vi">\n<head>\n';
        html += '<meta charset="UTF-8">\n';
        html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        html += '<title>Product Articles</title>\n';
        html += '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">\n';
        html += '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">\n';
        html += '<style>\n';
        html += '.article-content { line-height: 1.8; }\n';
        html += '.spec-table { width: 100%; border-collapse: collapse; }\n';
        html += '.spec-table th, .spec-table td { border: 1px solid #e5e7eb; padding: 0.75rem; }\n';
        html += '.spec-table th { background-color: #f9fafb; }\n';
        html += '.spec-highlight { background-color: #fef3c7; padding: 1rem; margin: 1rem 0; }\n';
        html += '.application-card { background-color: #f0f9ff; padding: 1rem; margin: 1rem 0; }\n';
        html += '.tooltip { position: relative; cursor: help; }\n';
        html += '.tooltip:hover::after { content: attr(data-tooltip); position: absolute; background: #333; color: white; padding: 0.5rem; border-radius: 0.25rem; z-index: 1000; }\n';
        html += '</style>\n</head>\n<body>\n';
        html += '<div class="container mx-auto px-4 py-8">\n';
        
        articles.forEach(article => {
            html += `<article class="mb-8">\n`;
            html += `<h1>${article.title}</h1>\n`;
            html += `<p class="text-gray-600 mb-4">${article.subtitle}</p>\n`;
            html += `<div class="article-content">${article.content}</div>\n`;
            html += '</article>\n';
        });
        
        html += '</div>\n</body>\n</html>';
        
        return html;
    }

    /**
     * Export articles to Markdown
     */
    exportToMarkdown(articles) {
        let markdown = '# Product Articles\n\n';
        
        articles.forEach(article => {
            markdown += `## ${article.title}\n\n`;
            markdown += `${article.subtitle}\n\n`;
            
            // Convert HTML to basic Markdown
            let content = article.content;
            content = content.replace(/<h2>/g, '## ');
            content = content.replace(/<\/h2>/g, '\n\n');
            content = content.replace(/<h3>/g, '### ');
            content = content.replace(/<\/h3>/g, '\n\n');
            content = content.replace(/<p>/g, '');
            content = content.replace(/<\/p>/g, '\n\n');
            content = content.replace(/<ul>/g, '\n');
            content = content.replace(/<\/ul>/g, '\n');
            content = content.replace(/<li>/g, '- ');
            content = content.replace(/<\/li>/g, '\n');
            content = content.replace(/<strong>/g, '**');
            content = content.replace(/<\/strong>/g, '**');
            content = content.replace(/<em>/g, '*');
            content = content.replace(/<\/em>/g, '*');
            
            markdown += content + '\n\n---\n\n';
        });
        
        return markdown;
    }

    /**
     * Export articles to CSV
     */
    exportToCSV(articles) {
        const headers = ['Product ID', 'Product Name', 'Product Type', 'Title', 'Subtitle', 'Generated At'];
        const csvRows = [headers.join(',')];
        
        articles.forEach(article => {
            const row = [
                article.product_id,
                article.product_name,
                article.product_type,
                article.title,
                article.subtitle,
                article.generated_at
            ].map(field => `"${field}"`);
            
            csvRows.push(row.join(','));
        });
        
        return csvRows.join('\n');
    }

    /**
     * Get statistics about generated articles
     */
    getArticleStatistics() {
        const stats = {
            total_articles: this.cache.size,
            articles_by_type: {},
            enhanced_features_used: this.enhancedFeatures,
            cache_hit_rate: 0,
            average_sections_per_article: 0,
            total_interactive_elements: 0
        };
        
        // Count articles by type
        this.cache.forEach(article => {
            const type = article.product_type;
            stats.articles_by_type[type] = (stats.articles_by_type[type] || 0) + 1;
            stats.total_interactive_elements += article.interactive_elements.length;
        });
        
        return stats;
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedArticleGenerator;
} else {
    window.EnhancedArticleGenerator = EnhancedArticleGenerator;
}
