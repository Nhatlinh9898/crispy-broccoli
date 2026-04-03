/**
 * Article Generator System
 * Automatically generates articles for products based on templates
 */

class ArticleGenerator {
    constructor() {
        this.templates = null;
        this.productData = null;
        this.cache = new Map();
    }

    /**
     * Initialize the generator with templates and product data
     */
    async initialize() {
        try {
            // Load templates
            const templatesResponse = await fetch('article-templates.json');
            this.templates = await templatesResponse.json();
            
            // Load product data
            const productsResponse = await fetch('ecommerce-products.json');
            this.productData = await productsResponse.json();
            
            console.log('Article Generator initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize Article Generator:', error);
            return false;
        }
    }

    /**
     * Determine product type based on product data
     */
    determineProductType(product) {
        const name = (product.name || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        
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
     * Extract variables from product data
     */
    extractVariables(product, templateType) {
        const variables = {
            product_name: product.name || 'Linh kiện',
            product_name_lower: (product.name || 'Linh kiện').toLowerCase(),
            product_code: product.id || product.sku || 'N/A',
            category: product.category || 'Chưa phân loại',
            subcategory: product.subcategory || 'Chưa phân loại',
            specifications: product.specifications || 'N/A',
            last_updated: product.last_updated || 'N/A'
        };

        // Add type-specific variables
        switch (templateType) {
            case 'bolt':
                variables.standard = product.specifications?.standard || 'JIS B1181';
                variables.material = product.specifications?.material || 'Thép carbon';
                variables.coating = product.specifications?.coating || 'Kẽm nóng';
                variables.size = product.specifications?.diameter || 'N/A';
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
     * Generate bearing structure description
     */
    generateBearingStructure() {
        const components = this.templates.templates.bearing.structure.sections.find(s => s.id === 'structure').structure_components;
        return components.map(comp => `• ${comp}`).join('\n');
    }

    /**
     * Format bearing specifications
     */
    formatBearingSpecs(specs) {
        if (!specs) return 'Thông số tiêu chuẩn';
        
        const specList = [
            specs.type || 'Bi sâu',
            specs.bore ? `Đường kính trong: ${specs.bore}` : '',
            specs.outer_diameter ? `Đường kính ngoài: ${specs.outer_diameter}` : '',
            specs.width ? `Độ dày: ${specs.width}` : ''
        ].filter(Boolean);
        
        return specList.join(', ');
    }

    /**
     * Replace variables in template content
     */
    replaceVariables(template, variables) {
        let content = template;
        
        // Replace simple variables
        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            content = content.replace(regex, variables[key]);
        });
        
        return content;
    }

    /**
     * Generate content based on section type
     */
    generateSectionContent(section, variables, product) {
        switch (section.content_type) {
            case 'dynamic':
                return this.replaceVariables(section.template, variables);
                
            case 'table':
                return this.generateTableContent(section, variables, product);
                
            case 'highlight_box':
                return this.generateHighlightBox(section, variables, product);
                
            case 'list':
                return this.generateListContent(section, variables, product);
                
            case 'comparison':
                return this.generateComparisonContent(section, variables, product);
                
            case 'cards':
                return this.generateCardsContent(section, variables, product);
                
            case 'steps':
                return this.generateStepsContent(section, variables, product);
                
            case 'checklist':
                return this.generateChecklistContent(section, variables, product);
                
            case 'formula':
                return this.generateFormulaContent(section, variables, product);
                
            case 'explanation':
                return this.generateExplanationContent(section, variables, product);
                
            case 'application_cards':
                return this.generateApplicationCardsContent(section, variables, product);
                
            case 'design_steps':
                return this.generateDesignStepsContent(section, variables, product);
                
            case 'troubleshooting':
                return this.generateTroubleshootingContent(section, variables, product);
                
            case 'summary':
                return this.replaceVariables(section.template, variables);
                
            default:
                return this.replaceVariables(section.template, variables);
        }
    }

    /**
     * Generate table content
     */
    generateTableContent(section, variables, product) {
        if (section.table_structure) {
            const { headers, rows } = section.table_structure;
            
            let html = '<table class="spec-table">\n<thead>\n<tr>\n';
            headers.forEach(header => {
                html += `<th>${header}</th>\n`;
            });
            html += '</tr>\n</thead>\n<tbody>\n';
            
            rows.forEach(row => {
                html += '<tr>\n';
                row.forEach(cell => {
                    const content = this.replaceVariables(cell, variables);
                    html += `<td>${content}</td>\n`;
                });
                html += '</tr>\n';
            });
            
            html += '</tbody>\n</table>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate highlight box content
     */
    generateHighlightBoxContent(section, variables, product) {
        if (section.spec_fields) {
            let html = '<div class="spec-highlight">\n<h4>Thông số cơ bản:</h4>\n<ul>\n';
            
            section.spec_fields.forEach(field => {
                const content = this.replaceVariables(field, variables);
                html += `<li>${content}</li>\n`;
            });
            
            html += '</ul>\n</div>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate list content
     */
    generateListContent(section, variables, product) {
        if (section.standards_data) {
            let html = '<ul>\n';
            section.standards_data.forEach(item => {
                html += `<li>${item}</li>\n`;
            });
            html += '</ul>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate comparison content
     */
    generateComparisonContent(section, variables, product) {
        if (section.materials_data) {
            let html = '<table class="comparison-table">\n<thead>\n<tr>\n<th>Vật liệu</th>\n<th>Đặc tính</th>\n<th>Ứng dụng</th>\n</tr>\n</thead>\n<tbody>\n';
            
            Object.values(section.materials_data).forEach(material => {
                html += `<tr>\n<td>${material.name}</td>\n<td>${material.properties}</td>\n<td>${material.applications}</td>\n</tr>\n`;
            });
            
            html += '</tbody>\n</table>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate cards content
     */
    generateCardsContent(section, variables, product) {
        if (section.applications_data) {
            let html = '';
            section.applications_data.forEach(app => {
                html += '<div class="application-card">\n';
                html += `<h4>${app.industry}</h4>\n<ul>\n`;
                app.uses.forEach(use => {
                    html += `<li>${use}</li>\n`;
                });
                html += '</ul>\n</div>\n';
            });
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate steps content
     */
    generateStepsContent(section, variables, product) {
        if (section.steps_data) {
            let html = '<ol>\n';
            section.steps_data.forEach(step => {
                html += `<li>${step}</li>\n`;
            });
            html += '</ol>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate checklist content
     */
    generateChecklistContent(section, variables, product) {
        if (section.checklist_data) {
            let html = '<ul>\n';
            section.checklist_data.forEach(item => {
                html += `<li>${item}</li>\n`;
            });
            html += '</ul>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate formula content
     */
    generateFormulaContent(section, variables, product) {
        if (section.formula_content) {
            let html = '';
            
            if (section.formula_content.ohm_law_formula) {
                html += `<div style="text-align: center; margin: 2rem 0; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem;">\n`;
                html += `<strong style="font-size: 1.2rem;">${section.formula_content.ohm_law_formula}</strong>\n`;
                html += '</div>\n';
            }
            
            if (section.formula_content.ohm_law_explanation) {
                html += '<p>\n';
                section.formula_content.ohm_law_explanation.forEach(item => {
                    html += `${item}\n`;
                });
                html += '</p>\n';
            }
            
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate explanation content
     */
    generateExplanationContent(section, variables, product) {
        if (section.color_code_data) {
            let html = '<ol>\n';
            section.color_code_data.forEach(item => {
                html += `<li>${item}</li>\n`;
            });
            html += '</ol>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate application cards content
     */
    generateApplicationCardsContent(section, variables, product) {
        if (section.applications_data) {
            let html = '';
            section.applications_data.forEach(app => {
                html += '<div class="application-card">\n';
                html += `<h4>Ứng dụng ${app.category.toLowerCase()}:</h4>\n<ul>\n`;
                app.uses.forEach(use => {
                    html += `<li>${use}</li>\n`;
                });
                html += '</ul>\n</div>\n';
            });
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate design steps content
     */
    generateDesignStepsContent(section, variables, product) {
        if (section.design_steps) {
            let html = '<ol>\n';
            section.design_steps.forEach(step => {
                html += `<li>${step}</li>\n`;
            });
            html += '</ol>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate troubleshooting content
     */
    generateTroubleshootingContent(section, variables, product) {
        if (section.issues_data) {
            let html = '<table class="troubleshooting-table">\n<thead>\n<tr>\n<th>Vấn đề</th>\n<th>Nguyên nhân</th>\n<th>Giải pháp</th>\n</tr>\n</thead>\n<tbody>\n';
            
            section.issues_data.forEach(issue => {
                html += '<tr>\n';
                html += `<td>${issue.problem}</td>\n`;
                html += `<td>${Array.isArray(issue.cause) ? issue.cause.join(', ') : issue.cause}</td>\n`;
                html += `<td>${Array.isArray(issue.solution) ? issue.solution.join(', ') : issue.solution}</td>\n`;
                html += '</tr>\n';
            });
            
            html += '</tbody>\n</table>';
            return html;
        }
        
        return this.replaceVariables(section.template, variables);
    }

    /**
     * Generate complete article for a product
     */
    generateArticle(product) {
        const cacheKey = `${product.id || product.sku || 'unknown'}_article`;
        
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
        
        template.structure.sections.forEach(section => {
            const sectionHTML = this.generateSectionContent(section, variables, product);
            
            // Add section to article
            articleHTML += `<h2 id="${section.id}">${section.title}</h2>\n`;
            articleHTML += sectionHTML + '\n';
            
            // Add to table of contents
            tocItems.push({
                id: section.id,
                title: section.title,
                level: 2
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
            generated_at: new Date().toISOString(),
            variables: variables
        };
        
        // Cache the result
        this.cache.set(cacheKey, completeArticle);
        
        return completeArticle;
    }

    /**
     * Generate article title
     */
    generateArticleTitle(product, productType) {
        const name = product.name || 'Linh kiện';
        
        switch (productType) {
            case 'bolt':
                return `${name}: Hướng dẫn Chuyên sâu về Ứng dụng và Lựa chọn`;
            case 'resistor':
                return `${name}: Phân tích Kỹ thuật và Ứng dụng trong Mạch điện tử`;
            case 'bearing':
                return `${name}: Tổng quan về Kỹ thuật và Bảo trì`;
            default:
                return `${name}: Tổng quan Thông tin và Hướng dẫn Sử dụng`;
        }
    }

    /**
     * Generate article subtitle
     */
    generateArticleSubtitle(product, productType) {
        const name = product.name || 'Linh kiện';
        const category = product.category || 'Chưa phân loại';
        
        switch (productType) {
            case 'bolt':
                return `Khám phá chi tiết về các loại bu lông, tiêu chuẩn kỹ thuật, vật liệu và ứng dụng thực tế trong công nghiệp.`;
            case 'resistor':
                return `Phân tích sâu về đặc tính điện, công suất, dung sai và ứng dụng của điện resist trong các mạch điện tử hiện đại.`;
            case 'bearing':
                return `Tìm hiểu về cấu trúc, vật liệu, phương pháp lắp đặt và bảo trì vòng bi trong các hệ thống cơ khí.`;
            default:
                return `Thông tin chi tiết về ${name}, thuộc danh mục ${category}, bao gồm thông số kỹ thuật và ứng dụng thực tế.`;
        }
    }

    /**
     * Generate articles for multiple products
     */
    generateBatchArticles(products) {
        const articles = [];
        
        products.forEach(product => {
            try {
                const article = this.generateArticle(product);
                articles.push(article);
            } catch (error) {
                console.error(`Failed to generate article for product ${product.id || product.sku}:`, error);
            }
        });
        
        return articles;
    }

    /**
     * Generate article for product by ID
     */
    async generateArticleById(productId) {
        if (!this.productData) {
            await this.initialize();
        }
        
        const product = this.productData.products.find(p => 
            p.id === productId || p.sku === productId
        );
        
        if (!product) {
            throw new Error(`Product not found: ${productId}`);
        }
        
        return this.generateArticle(product);
    }

    /**
     * Get available template types
     */
    getAvailableTemplateTypes() {
        return Object.keys(this.templates.templates);
    }

    /**
     * Get template for specific type
     */
    getTemplate(type) {
        return this.templates.templates[type];
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get cache statistics
     */
    getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticleGenerator;
} else {
    window.ArticleGenerator = ArticleGenerator;
}
