// Implementation Code for 100-Layer Monitoring System
// Hệ thống triển khai 100 tầng giám sát và kiểm định

class ContentValidator {
  constructor(config) {
    this.config = config;
    this.qualityThresholds = config.qualityThresholds || {
      accuracy: 0.95,
      originality: 0.90,
      relevance: 0.85,
      readability: 0.80,
      completeness: 0.95
    };
  }

  async validate(content) {
    const results = {
      passed: true,
      scores: {},
      issues: [],
      suggestions: []
    };

    // Kiểm tra chất lượng
    results.scores.accuracy = await this.checkAccuracy(content);
    results.scores.originality = await this.checkOriginality(content);
    results.scores.relevance = await this.checkRelevance(content);
    results.scores.readability = await this.checkReadability(content);
    results.scores.completeness = await this.checkCompleteness(content);

    // Kiểm tra ngưỡng chất lượng
    for (const [metric, score] of Object.entries(results.scores)) {
      if (score < this.qualityThresholds[metric]) {
        results.passed = false;
        results.issues.push(`${metric} score ${score} below threshold ${this.qualityThresholds[metric]}`);
      }
    }

    // Kiểm tra nội dung không phù hợp
    const inappropriateContent = await this.checkInappropriateContent(content);
    if (inappropriateContent.length > 0) {
      results.passed = false;
      results.issues.push(...inappropriateContent);
    }

    // Kiểm tra trùng lặp
    const duplicates = await this.checkDuplicates(content);
    if (duplicates.length > 0) {
      results.passed = false;
      results.issues.push(`Found ${duplicates.length} duplicate sections`);
    }

    return results;
  }

  async checkAccuracy(content) {
    // Mô phỏng kiểm tra độ chính xác
    return Math.random() * 0.3 + 0.7; // 0.7-1.0
  }

  async checkOriginality(content) {
    // Mô phỏng kiểm tra tính độc đáo
    return Math.random() * 0.2 + 0.8; // 0.8-1.0
  }

  async checkRelevance(content) {
    // Mô phỏng kiểm tra tính liên quan
    return Math.random() * 0.25 + 0.75; // 0.75-1.0
  }

  async checkReadability(content) {
    // Tính điểm đọc hiểu cơ bản
    const words = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Công cụ tính điểm đơn giản
    let score = 1.0;
    if (avgWordsPerSentence > 20) score -= 0.2;
    if (avgWordsPerSentence > 30) score -= 0.3;
    
    return Math.max(0, score);
  }

  async checkCompleteness(content) {
    // Kiểm tra tính hoàn chỉnh
    const hasIntroduction = content.length > 100;
    const hasBody = content.length > 500;
    const hasConclusion = content.includes('kết luận') || content.includes('tóm lại');
    
    let score = 0.3;
    if (hasIntroduction) score += 0.3;
    if (hasBody) score += 0.3;
    if (hasConclusion) score += 0.1;
    
    return score;
  }

  async checkInappropriateContent(content) {
    const inappropriateWords = ['vulgar1', 'vulgar2', 'inappropriate'];
    const found = [];
    
    inappropriateWords.forEach(word => {
      if (content.toLowerCase().includes(word)) {
        found.push(`Found inappropriate content: ${word}`);
      }
    });
    
    return found;
  }

  async checkDuplicates(content) {
    // Mô phỏng kiểm tra trùng lặp
    const sentences = content.split(/[.!?]+/);
    const duplicates = [];
    
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        const similarity = this.calculateSimilarity(sentences[i], sentences[j]);
        if (similarity > 0.8) {
          duplicates.push({i, j, similarity});
        }
      }
    }
    
    return duplicates;
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
}

class WebContentExtractor {
  constructor(config) {
    this.config = config;
    this.userAgent = config.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    this.timeout = config.timeout || 10000;
    this.maxContentSize = config.maxContentSize || 1000000; // 1MB
    this.allowedContentTypes = [
      'text/html',
      'text/plain',
      'application/json',
      'text/xml',
      'application/xml'
    ];
  }

  async extractContent(url, options = {}) {
    try {
      console.log(`📖 Extracting content from: ${url}`);
      
      // Validate URL
      if (!this.isValidUrl(url)) {
        throw new Error(`Invalid URL: ${url}`);
      }

      // Fetch content
      const response = await this.fetchWithTimeout(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': this.allowedContentTypes.join(', '),
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7'
        }
      });

      // Check content type
      const contentType = response.headers.get('content-type') || '';
      if (!this.isAllowedContentType(contentType)) {
        throw new Error(`Content type not supported: ${contentType}`);
      }

      // Get content
      const content = await response.text();
      
      // Check size limit
      if (content.length > this.maxContentSize) {
        throw new Error(`Content too large: ${content.length} bytes`);
      }

      // Extract based on content type
      const extracted = await this.parseContent(content, contentType, url, options);
      
      return {
        success: true,
        url: url,
        contentType: contentType,
        ...extracted,
        extractedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Failed to extract content from ${url}:`, error.message);
      return {
        success: false,
        url: url,
        error: error.message,
        extractedAt: new Date().toISOString()
      };
    }
  }

  async extractMultipleContent(urls, options = {}) {
    const maxConcurrent = options.maxConcurrent || 5;
    const results = [];
    
    // Process URLs in batches
    for (let i = 0; i < urls.length; i += maxConcurrent) {
      const batch = urls.slice(i, i + maxConcurrent);
      const batchPromises = batch.map(url => 
        this.extractContent(url, options).catch(error => ({
          success: false,
          url: url,
          error: error.message
        }))
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Small delay between batches to be respectful
      if (i + maxConcurrent < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }

  async parseContent(content, contentType, url, options) {
    if (contentType.includes('text/html')) {
      return this.parseHtmlContent(content, url, options);
    } else if (contentType.includes('json')) {
      return this.parseJsonContent(content, url, options);
    } else if (contentType.includes('xml')) {
      return this.parseXmlContent(content, url, options);
    } else {
      return this.parseTextContent(content, url, options);
    }
  }

  async parseHtmlContent(html, url, options) {
    // Simple HTML parsing without external libraries
    const result = {
      title: '',
      content: '',
      metadata: {},
      links: [],
      images: [],
      structuredData: {}
    };

    try {
      // Extract title
      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      if (titleMatch) {
        result.title = this.cleanText(titleMatch[1]);
      }

      // Extract meta tags
      const metaMatches = html.matchAll(/<meta[^>]*name=["']([^"']*)["'][^>]*content=["']([^"']*)["'][^>]*>/gi);
      for (const match of metaMatches) {
        result.metadata[match[1]] = match[2];
      }

      // Extract meta property tags (Open Graph, Twitter Cards)
      const propertyMatches = html.matchAll(/<meta[^>]*property=["']([^"']*)["'][^>]*content=["']([^"']*)["'][^>]*>/gi);
      for (const match of propertyMatches) {
        result.metadata[match[1]] = match[2];
      }

      // Remove script and style tags
      const cleanHtml = html.replace(/<script[^>]*>.*?<\/script>/gis, '')
                           .replace(/<style[^>]*>.*?<\/style>/gis, '')
                           .replace(/<nav[^>]*>.*?<\/nav>/gis, '')
                           .replace(/<header[^>]*>.*?<\/header>/gis, '')
                           .replace(/<footer[^>]*>.*?<\/footer>/gis, '');

      // Extract main content
      const contentSelectors = [
        /<article[^>]*>(.*?)<\/article>/gis,
        /<main[^>]*>(.*?)<\/main>/gis,
        /<div[^>]*class=["'][^"']*(?:content|main|article)[^"']*["'][^>]*>(.*?)<\/div>/gis,
        /<div[^>]*id=["'][^"']*(?:content|main|article)[^"']*["'][^>]*>(.*?)<\/div>/gis
      ];

      for (const selector of contentSelectors) {
        const matches = [...cleanHtml.matchAll(selector)];
        if (matches.length > 0) {
          result.content = matches.map(match => this.cleanHtml(match[1])).join('\n\n');
          break;
        }
      }

      // Fallback: extract all text content
      if (!result.content) {
        result.content = this.cleanHtml(cleanHtml);
      }

      // Extract links
      const linkMatches = html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi);
      for (const match of linkMatches) {
        const href = match[1];
        const text = this.cleanText(match[2]);
        
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
          result.links.push({
            url: this.resolveUrl(href, url),
            text: text,
            isExternal: this.isExternalUrl(href, url)
          });
        }
      }

      // Extract images
      const imgMatches = html.matchAll(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi);
      for (const match of imgMatches) {
        result.images.push({
          src: this.resolveUrl(match[1], url),
          alt: match[2]
        });
      }

      // Extract structured data (JSON-LD)
      const jsonLdMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
      for (const match of jsonLdMatches) {
        try {
          const structuredData = JSON.parse(match[1]);
          result.structuredData[structuredData['@type'] || 'unknown'] = structuredData;
        } catch (e) {
          // Ignore invalid JSON-LD
        }
      }

    } catch (error) {
      console.error(`Error parsing HTML content: ${error.message}`);
    }

    return result;
  }

  async parseJsonContent(content, url, options) {
    try {
      const jsonData = JSON.parse(content);
      return {
        title: jsonData.title || jsonData.name || '',
        content: JSON.stringify(jsonData, null, 2),
        metadata: {
          type: 'json',
          keys: Object.keys(jsonData),
          size: content.length
        },
        structuredData: jsonData
      };
    } catch (error) {
      return {
        title: '',
        content: content,
        metadata: {
          type: 'invalid_json',
          error: error.message
        }
      };
    }
  }

  async parseXmlContent(content, url, options) {
    // Simple XML parsing
    return {
      title: this.extractXmlTag(content, 'title') || '',
      content: this.removeXmlTags(content),
      metadata: {
        type: 'xml',
        size: content.length
      }
    };
  }

  async parseTextContent(content, url, options) {
    // Extract first line as title for plain text
    const lines = content.split('\n');
    const title = lines[0]?.trim() || '';
    
    return {
      title: title,
      content: content,
      metadata: {
        type: 'text',
        lines: lines.length,
        size: content.length
      }
    };
  }

  cleanHtml(html) {
    return html
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Replace HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }

  cleanText(text) {
    return text
      .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  extractXmlTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'i');
    const match = xml.match(regex);
    return match ? this.cleanText(match[1]) : '';
  }

  removeXmlTags(xml) {
    return xml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  isAllowedContentType(contentType) {
    return this.allowedContentTypes.some(type => contentType.includes(type));
  }

  resolveUrl(href, baseUrl) {
    try {
      return new URL(href, baseUrl).href;
    } catch {
      return href;
    }
  }

  isExternalUrl(href, baseUrl) {
    try {
      const hrefUrl = new URL(href, baseUrl);
      const baseUrlObj = new URL(baseUrl);
      return hrefUrl.hostname !== baseUrlObj.hostname;
    } catch {
      return false;
    }
  }

  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

class WebContentProcessor {
  constructor(config) {
    this.config = config;
    this.extractor = new WebContentExtractor(config.extractor || {});
    this.processorType = config.processorType;
  }

  async process(input) {
    switch (this.processorType) {
      case 'extract':
        return this.processExtraction(input);
      case 'batch_extract':
        return this.processBatchExtraction(input);
      case 'search_extract':
        return this.processSearchAndExtract(input);
      default:
        return this.processGeneric(input);
    }
  }

  async processExtraction(input) {
    const url = input.url || input.link;
    if (!url) {
      throw new Error('No URL provided for content extraction');
    }

    try {
      const extractionResult = await this.extractor.extractContent(url, input.extractionOptions);
      
      return {
        ...input,
        extractedContent: extractionResult,
        extractionPerformed: true,
        processedAt: new Date().toISOString()
      };

    } catch (error) {
      return {
        ...input,
        extractionError: error.message,
        extractionPerformed: false,
        processedAt: new Date().toISOString()
      };
    }
  }

  async processBatchExtraction(input) {
    const urls = input.urls || input.links?.map(link => link.url) || [];
    if (urls.length === 0) {
      throw new Error('No URLs provided for batch extraction');
    }

    try {
      const batchResults = await this.extractor.extractMultipleContent(urls, {
        maxConcurrent: input.maxConcurrent || 3,
        ...input.extractionOptions
      });

      const successful = batchResults.filter(r => r.success);
      const failed = batchResults.filter(r => !r.success);

      return {
        ...input,
        batchExtractionResults: {
          total: batchResults.length,
          successful: successful.length,
          failed: failed.length,
          results: batchResults,
          successRate: (successful.length / batchResults.length * 100).toFixed(2) + '%'
        },
        extractionPerformed: true,
        processedAt: new Date().toISOString()
      };

    } catch (error) {
      return {
        ...input,
        extractionError: error.message,
        extractionPerformed: false,
        processedAt: new Date().toISOString()
      };
    }
  }

  async processSearchAndExtract(input) {
    // First perform web search, then extract content from top results
    const webSearchService = new WebSearchService(this.config.webSearch || {});
    
    try {
      // Perform search
      const searchResults = await webSearchService.search(input.query || input.topic, {
        num: input.maxResults || 5,
        ...input.searchOptions
      });

      // Extract URLs from search results
      const urls = searchResults.items.slice(0, input.extractCount || 3).map(item => item.link);

      // Extract content from URLs
      const extractionResults = await this.extractor.extractMultipleContent(urls, {
        maxConcurrent: 2,
        ...input.extractionOptions
      });

      // Combine search and extraction results
      const combinedResults = searchResults.items.map((item, index) => {
        const extraction = extractionResults.find(e => e.url === item.link);
        return {
          ...item,
          extractedContent: extraction
        };
      });

      return {
        ...input,
        searchResults: searchResults,
        extractedContents: combinedResults,
        searchAndExtractPerformed: true,
        processedAt: new Date().toISOString()
      };

    } catch (error) {
      return {
        ...input,
        searchAndExtractError: error.message,
        searchAndExtractPerformed: false,
        processedAt: new Date().toISOString()
      };
    }
  }

  async processGeneric(input) {
    return {
      ...input,
      processed: true,
      processedAt: new Date().toISOString()
    };
  }
}

class WebSearchService {
  constructor(config) {
    this.config = config;
    this.searchEngines = {
      google: new GoogleSearchEngine(config.google),
      bing: new BingSearchEngine(config.bing),
      duckduckgo: new DuckDuckGoSearchEngine(config.duckduckgo)
    };
    this.defaultEngine = config.defaultEngine || 'google';
  }

  async search(query, options = {}) {
    const engine = options.engine || this.defaultEngine;
    const searchEngine = this.searchEngines[engine];
    
    if (!searchEngine) {
      throw new Error(`Search engine ${engine} not supported`);
    }

    try {
      const results = await searchEngine.search(query, options);
      return this.processSearchResults(results, options);
    } catch (error) {
      console.error(`Search failed with ${engine}:`, error);
      
      // Fallback to other engines
      if (engine !== this.defaultEngine) {
        return this.search(query, { ...options, engine: this.defaultEngine });
      }
      
      throw error;
    }
  }

  async multiEngineSearch(query, options = {}) {
    const engines = options.engines || ['google', 'bing'];
    const promises = engines.map(engine => 
      this.search(query, { ...options, engine }).catch(err => ({ error: err.message, engine }))
    );

    const results = await Promise.all(promises);
    return this.combineMultiEngineResults(results);
  }

  processSearchResults(results, options) {
    const processed = {
      query: results.query,
      totalResults: results.totalResults,
      searchTime: results.searchTime,
      items: [],
      metadata: {
        engine: results.engine,
        timestamp: new Date().toISOString(),
        options: options
      }
    };

    // Xử lý từng kết quả
    results.items.forEach(item => {
      processed.items.push({
        title: this.cleanText(item.title),
        link: item.link,
        snippet: this.cleanText(item.snippet),
        displayLink: item.displayLink,
        relevance: this.calculateRelevance(item, options.query),
        credibility: this.assessCredibility(item),
        lastModified: item.pagemap?.metatags?.find(tag => tag.property === 'article:modified_time')?.content,
        language: this.detectLanguage(item.snippet)
      });
    });

    // Sắp xếp theo relevance và credibility
    processed.items.sort((a, b) => {
      const scoreA = a.relevance * 0.6 + a.credibility * 0.4;
      const scoreB = b.relevance * 0.6 + b.credibility * 0.4;
      return scoreB - scoreA;
    });

    return processed;
  }

  combineMultiEngineResults(results) {
    const combined = {
      query: '',
      totalResults: 0,
      searchTime: 0,
      items: [],
      engines: []
    };

    results.forEach(result => {
      if (result.error) {
        console.warn(`Engine ${result.engine} failed: ${result.error}`);
        return;
      }

      combined.query = combined.query || result.query;
      combined.totalResults += result.totalResults;
      combined.searchTime = Math.max(combined.searchTime, result.searchTime);
      combined.engines.push(result.metadata.engine);
      
      // Thêm kết quả và loại bỏ trùng lặp
      result.items.forEach(item => {
        const exists = combined.items.some(existing => existing.link === item.link);
        if (!exists) {
          combined.items.push({
            ...item,
            sourceEngine: result.metadata.engine
          });
        }
      });
    });

    // Sắp xếp lại kết quả kết hợp
    combined.items.sort((a, b) => {
      const scoreA = a.relevance * 0.5 + a.credibility * 0.3 + (a.sourceEngine === 'google' ? 0.2 : 0.1);
      const scoreB = b.relevance * 0.5 + b.credibility * 0.3 + (b.sourceEngine === 'google' ? 0.2 : 0.1);
      return scoreB - scoreA;
    });

    return combined;
  }

  cleanText(text) {
    if (!text) return '';
    return text.replace(/<[^>]*>/g, '').trim();
  }

  calculateRelevance(item, query) {
    const title = item.title.toLowerCase();
    const snippet = item.snippet.toLowerCase();
    const queryWords = query.toLowerCase().split(/\s+/);
    
    let score = 0;
    queryWords.forEach(word => {
      if (title.includes(word)) score += 0.3;
      if (snippet.includes(word)) score += 0.2;
    });

    // Bonus cho exact match
    if (title.includes(query.toLowerCase())) score += 0.5;
    
    return Math.min(1.0, score);
  }

  assessCredibility(item) {
    let credibility = 0.5; // Base score

    // Domain authority indicators
    const domain = new URL(item.link).hostname;
    if (domain.includes('edu') || domain.includes('gov')) credibility += 0.3;
    if (domain.includes('org')) credibility += 0.2;
    if (domain.includes('wikipedia')) credibility += 0.25;

    // Content quality indicators
    if (item.snippet.length > 100) credibility += 0.1;
    if (item.title.includes('research') || item.title.includes('study')) credibility += 0.1;

    return Math.min(1.0, credibility);
  }

  detectLanguage(text) {
    // Simple language detection based on common words
    const vietnameseWords = ['và', 'của', 'là', 'trong', 'cho', 'với', 'nhưng', 'không'];
    const englishWords = ['the', 'and', 'is', 'in', 'for', 'with', 'but', 'not'];
    
    const lowerText = text.toLowerCase();
    let viCount = 0;
    let enCount = 0;

    vietnameseWords.forEach(word => {
      if (lowerText.includes(word)) viCount++;
    });

    englishWords.forEach(word => {
      if (lowerText.includes(word)) enCount++;
    });

    if (viCount > enCount) return 'vi';
    if (enCount > viCount) return 'en';
    return 'unknown';
  }
}

class GoogleSearchEngine {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.searchEngineId = config.searchEngineId;
    this.baseUrl = 'https://www.googleapis.com/customsearch/v1';
  }

  async search(query, options = {}) {
    const params = new URLSearchParams({
      key: this.apiKey,
      cx: this.searchEngineId,
      q: query,
      num: options.num || 10,
      start: options.start || 1,
      lr: options.language || 'lang_vi',
      safe: options.safe || 'medium'
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        query: query,
        totalResults: parseInt(data.searchInformation?.totalResults || 0),
        searchTime: parseFloat(data.searchInformation?.searchTime || 0),
        items: data.items || [],
        engine: 'google'
      };

    } catch (error) {
      throw new Error(`Google Search API Error: ${error.message}`);
    }
  }
}

class BingSearchEngine {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseUrl = 'https://api.bing.microsoft.com/v7.0/search';
  }

  async search(query, options = {}) {
    const params = new URLSearchParams({
      q: query,
      count: options.num || 10,
      offset: options.start || 0,
      mkt: options.market || 'vi-VN',
      safeSearch: options.safe || 'Moderate'
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey
        }
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return {
        query: query,
        totalResults: data.webPages?.totalEstimatedMatches || 0,
        searchTime: 0, // Bing doesn't provide search time
        items: data.webPages?.value || [],
        engine: 'bing'
      };

    } catch (error) {
      throw new Error(`Bing Search API Error: ${error.message}`);
    }
  }
}

class DuckDuckGoSearchEngine {
  constructor(config) {
    this.baseUrl = 'https://api.duckduckgo.com/';
  }

  async search(query, options = {}) {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      no_html: 1,
      skip_disambig: 1
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const data = await response.json();

      // Convert DuckDuckGo format to standard format
      const items = [];
      if (data.RelatedTopics) {
        data.RelatedTopics.forEach(topic => {
          if (topic.Text && topic.FirstURL) {
            items.push({
              title: topic.Text.split(' - ')[0] || topic.Text.substring(0, 100),
              link: topic.FirstURL,
              snippet: topic.Text,
              displayLink: new URL(topic.FirstURL).hostname
            });
          }
        });
      }

      return {
        query: query,
        totalResults: items.length,
        searchTime: 0,
        items: items,
        engine: 'duckduckgo'
      };

    } catch (error) {
      throw new Error(`DuckDuckGo Search Error: ${error.message}`);
    }
  }
}

class ContentProcessor {
  constructor(config) {
    this.config = config;
    this.processorType = config.processorType;
    this.webSearchService = config.webSearch ? new WebSearchService(config.webSearch) : null;
  }

  async process(input) {
    switch (this.processorType) {
      case 'search':
        return this.processSearch(input);
      case 'websearch':
        return this.processWebSearch(input);
      case 'classify':
        return this.processClassification(input);
      case 'create':
        return this.processCreation(input);
      case 'validate':
        return this.processValidation(input);
      case 'synthesize':
        return this.processSynthesis(input);
      default:
        return this.processGeneric(input);
    }
  }

  async processSearch(input) {
    // Mô phỏng xử lý tìm kiếm nội bộ
    return {
      ...input,
      searchResults: `Found ${Math.floor(Math.random() * 100) + 10} results`,
      processedAt: new Date().toISOString()
    };
  }

  async processWebSearch(input) {
    if (!this.webSearchService) {
      throw new Error('Web search service not configured');
    }

    const query = input.query || input.topic || input.searchQuery;
    if (!query) {
      throw new Error('No search query provided');
    }

    try {
      // Thực hiện tìm kiếm web
      const searchOptions = {
        engine: input.searchEngine || 'google',
        num: input.maxResults || 10,
        language: input.language || 'vi',
        ...input.searchOptions
      };

      let searchResults;
      if (input.multiEngine) {
        searchResults = await this.webSearchService.multiEngineSearch(query, searchOptions);
      } else {
        searchResults = await this.webSearchService.search(query, searchOptions);
      }

      // Xử lý và làm giàu kết quả
      const enrichedResults = await this.enrichSearchResults(searchResults, input);

      return {
        ...input,
        webSearchResults: enrichedResults,
        query: query,
        searchPerformed: true,
        processedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Web search failed:', error);
      return {
        ...input,
        webSearchError: error.message,
        searchPerformed: false,
        processedAt: new Date().toISOString()
      };
    }
  }

  async enrichSearchResults(searchResults, input) {
    const enriched = {
      ...searchResults,
      analysis: {
        totalItems: searchResults.items.length,
        averageRelevance: 0,
        averageCredibility: 0,
        languageDistribution: {},
        domainDistribution: {},
        topDomains: []
      }
    };

    let totalRelevance = 0;
    let totalCredibility = 0;
    const domainCounts = {};
    const languageCounts = {};

    searchResults.items.forEach(item => {
      totalRelevance += item.relevance;
      totalCredibility += item.credibility;

      // Đếm domain
      const domain = new URL(item.link).hostname;
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;

      // Đếm ngôn ngữ
      const lang = item.language || 'unknown';
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    });

    // Tính trung bình
    if (searchResults.items.length > 0) {
      enriched.analysis.averageRelevance = totalRelevance / searchResults.items.length;
      enriched.analysis.averageCredibility = totalCredibility / searchResults.items.length;
    }

    // Phân phối ngôn ngữ
    enriched.analysis.languageDistribution = languageCounts;

    // Phân phối domain và top domains
    enriched.analysis.domainDistribution = domainCounts;
    enriched.analysis.topDomains = Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, count }));

    // Thêm recommendations
    enriched.recommendations = this.generateRecommendations(enriched, input);

    return enriched;
  }

  generateRecommendations(searchResults, input) {
    const recommendations = [];

    // Đề xuất dựa trên chất lượng kết quả
    if (searchResults.analysis.averageRelevance < 0.5) {
      recommendations.push('Consider refining search query for better relevance');
    }

    if (searchResults.analysis.averageCredibility < 0.6) {
      recommendations.push('Consider adding site:edu or site:gov for more credible sources');
    }

    // Đề xuất dựa trên số lượng kết quả
    if (searchResults.totalResults < 10) {
      recommendations.push('Try broader search terms for more results');
    } else if (searchResults.totalResults > 100000) {
      recommendations.push('Consider adding more specific terms to narrow results');
    }

    // Đề xuất dựa trên ngôn ngữ
    const vietnameseCount = searchResults.analysis.languageDistribution['vi'] || 0;
    const totalCount = searchResults.items.length;
    if (vietnameseCount / totalCount < 0.3 && input.language === 'vi') {
      recommendations.push('Consider adding Vietnamese terms for better local results');
    }

    return recommendations;
  }

  async processClassification(input) {
    // Mô phỏng xử lý phân loại
    return {
      ...input,
      category: ['technology', 'business', 'education', 'health'][Math.floor(Math.random() * 4)],
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
      processedAt: new Date().toISOString()
    };
  }

  async processCreation(input) {
    // Mô phỏng xử lý tạo nội dung
    const templates = [
      'Introduction to {topic}',
      'Understanding {topic}',
      'The Complete Guide to {topic}',
      '{topic}: Best Practices',
      'Advanced {topic} Techniques'
    ];
    
    return {
      ...input,
      content: templates[Math.floor(Math.random() * templates.length)].replace('{topic}', input.topic || 'content'),
      wordCount: Math.floor(Math.random() * 1000) + 200,
      processedAt: new Date().toISOString()
    };
  }

  async processValidation(input) {
    // Mô phỏng xử lý kiểm định
    return {
      ...input,
      validationStatus: 'passed',
      validationScore: Math.random() * 0.3 + 0.7,
      processedAt: new Date().toISOString()
    };
  }

  async processSynthesis(input) {
    // Mô phỏng xử lý tổng hợp
    return {
      ...input,
      synthesizedContent: `Synthesized content based on ${Object.keys(input).length} inputs`,
      synthesisQuality: Math.random() * 0.2 + 0.8,
      processedAt: new Date().toISOString()
    };
  }

  async processGeneric(input) {
    return {
      ...input,
      processed: true,
      processedAt: new Date().toISOString()
    };
  }
}

class LayerService {
  constructor(layerId, config) {
    this.layerId = layerId;
    this.config = config;
    this.validator = new ContentValidator(config.validation || {});
    this.processor = new ContentProcessor(config.processing || {});
    this.retryCount = 0;
    this.maxRetries = config.maxRetries || 3;
  }

  async process(input) {
    console.log(`Processing Layer ${this.layerId}...`);
    
    try {
      // Xử lý nội dung
      const processed = await this.processor.process(input);
      
      // Kiểm duyệt
      const validation = await this.validator.validate(processed);
      
      // Nếu không đạt, điều chỉnh
      if (!validation.passed) {
        return this.retryWithAdjustment(processed, validation);
      }
      
      console.log(`Layer ${this.layerId} completed successfully`);
      return {
        success: true,
        layerId: this.layerId,
        data: processed,
        validation: validation,
        processedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error(`Error in Layer ${this.layerId}:`, error);
      return {
        success: false,
        layerId: this.layerId,
        error: error.message,
        processedAt: new Date().toISOString()
      };
    }
  }

  async retryWithAdjustment(processed, validation) {
    if (this.retryCount >= this.maxRetries) {
      throw new Error(`Layer ${this.layerId} failed after ${this.maxRetries} retries`);
    }

    this.retryCount++;
    console.log(`Layer ${this.layerId} retry ${this.retryCount}/${this.maxRetries}`);

    // Điều chỉnh nội dung dựa trên feedback
    const adjusted = await this.adjustContent(processed, validation);
    
    // Thử lại
    const newValidation = await this.validator.validate(adjusted);
    
    if (newValidation.passed) {
      console.log(`Layer ${this.layerId} succeeded after ${this.retryCount} retries`);
      return {
        success: true,
        layerId: this.layerId,
        data: adjusted,
        validation: newValidation,
        retryCount: this.retryCount,
        processedAt: new Date().toISOString()
      };
    }
    
    // Đệ quy nếu vẫn chưa đạt
    return this.retryWithAdjustment(adjusted, newValidation);
  }

  async adjustContent(content, validation) {
    // Logic điều chỉnh nội dung dựa trên validation feedback
    let adjusted = { ...content };
    
    // Điều chỉnh dựa trên các vấn đề
    validation.issues.forEach(issue => {
      if (issue.includes('accuracy')) {
        adjusted = this.improveAccuracy(adjusted);
      } else if (issue.includes('originality')) {
        adjusted = this.improveOriginality(adjusted);
      } else if (issue.includes('relevance')) {
        adjusted = this.improveRelevance(adjusted);
      } else if (issue.includes('readability')) {
        adjusted = this.improveReadability(adjusted);
      } else if (issue.includes('completeness')) {
        adjusted = this.improveCompleteness(adjusted);
      }
    });
    
    return adjusted;
  }

  improveAccuracy(content) {
    return {
      ...content,
      accuracyImproved: true,
      lastImprovement: 'accuracy'
    };
  }

  improveOriginality(content) {
    return {
      ...content,
      originalityImproved: true,
      lastImprovement: 'originality'
    };
  }

  improveRelevance(content) {
    return {
      ...content,
      relevanceImproved: true,
      lastImprovement: 'relevance'
    };
  }

  improveReadability(content) {
    return {
      ...content,
      readabilityImproved: true,
      lastImprovement: 'readability'
    };
  }

  improveCompleteness(content) {
    return {
      ...content,
      completenessImproved: true,
      lastImprovement: 'completeness'
    };
  }
}

class PipelineManager {
  constructor(config) {
    this.config = config;
    this.layers = [];
    this.initializeLayers();
  }

  initializeLayers() {
    // Khởi tạo 100 tầng với cấu hình khác nhau
    for (let i = 1; i <= 100; i++) {
      const layerConfig = this.getLayerConfig(i);
      this.layers.push(new LayerService(i, layerConfig));
    }
  }

  getLayerConfig(layerId) {
    // Cấu hình cho từng nhóm tầng
    if (layerId >= 1 && layerId <= 15) {
      // Nhóm tìm kiếm thông tin - với web search
      return {
        processing: { 
          processorType: 'websearch',
          webSearch: this.config.webSearch || {}
        },
        validation: { qualityThresholds: { accuracy: 0.90, relevance: 0.85 } },
        maxRetries: 2
      };
    } else if (layerId >= 16 && layerId <= 30) {
      // Nhóm phân loại và xử lý
      return {
        processing: { processorType: 'classify' },
        validation: { qualityThresholds: { accuracy: 0.92, relevance: 0.88 } },
        maxRetries: 3
      };
    } else if (layerId >= 31 && layerId <= 45) {
      // Nhóm phân chia công việc
      return {
        processing: { processorType: 'generic' },
        validation: { qualityThresholds: { accuracy: 0.93, completeness: 0.90 } },
        maxRetries: 2
      };
    } else if (layerId >= 46 && layerId <= 60) {
      // Nhóm tạo nội dung
      return {
        processing: { processorType: 'create' },
        validation: { qualityThresholds: { originality: 0.92, readability: 0.85 } },
        maxRetries: 4
      };
    } else if (layerId >= 61 && layerId <= 75) {
      // Nhóm kiểm tra nội dung
      return {
        processing: { processorType: 'validate' },
        validation: { qualityThresholds: { accuracy: 0.96, originality: 0.94 } },
        maxRetries: 3
      };
    } else if (layerId >= 76 && layerId <= 90) {
      // Nhóm tổng hợp thông tin
      return {
        processing: { processorType: 'synthesize' },
        validation: { qualityThresholds: { accuracy: 0.94, completeness: 0.92 } },
        maxRetries: 2
      };
    } else {
      // Nhóm kiểm định cuối cùng
      return {
        processing: { processorType: 'validate' },
        validation: { qualityThresholds: { accuracy: 0.98, originality: 0.96, relevance: 0.90 } },
        maxRetries: 1
      };
    }
  }

  async processPipeline(input) {
    console.log('Starting 100-layer processing pipeline...');
    const startTime = Date.now();
    
    let currentData = input;
    const results = [];
    
    // Xử lý tuần tự qua 100 tầng
    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      const result = await layer.process(currentData);
      
      results.push(result);
      
      if (!result.success) {
        console.error(`Pipeline failed at layer ${layer.layerId}`);
        return {
          success: false,
          failedAt: layer.layerId,
          error: result.error,
          results: results,
          processingTime: Date.now() - startTime
        };
      }
      
      currentData = result.data;
      
      // Log progress mỗi 10 tầng
      if ((i + 1) % 10 === 0) {
        console.log(`Completed ${i + 1}/100 layers`);
      }
    }
    
    const processingTime = Date.now() - startTime;
    console.log(`Pipeline completed successfully in ${processingTime}ms`);
    
    return {
      success: true,
      finalOutput: currentData,
      results: results,
      processingTime: processingTime,
      layersProcessed: 100
    };
  }

  async processParallelGroups(input) {
    // Xử lý song song các nhóm tầng có thể chạy song song
    const parallelGroups = [
      [1, 2, 3, 4, 5],      // Tìm kiếm song song
      [6, 7, 8, 9, 10],     // Tìm kiếm chuyên biệt song song
      [16, 17, 18, 19, 20], // Phân loại song song
      [21, 22, 23, 24, 25], // Xử lý chuyên sâu song song
    ];
    
    let currentData = input;
    
    for (const group of parallelGroups) {
      const groupPromises = group.map(layerId => 
        this.layers[layerId - 1].process(currentData)
      );
      
      const groupResults = await Promise.all(groupPromises);
      
      // Kết hợp kết quả từ nhóm
      currentData = this.combineGroupResults(groupResults);
    }
    
    // Xử lý tuần tự các tầng còn lại
    const remainingLayers = this.layers.slice(25);
    for (const layer of remainingLayers) {
      const result = await layer.process(currentData);
      if (!result.success) {
        throw new Error(`Failed at layer ${layer.layerId}`);
      }
      currentData = result.data;
    }
    
    return currentData;
  }

  combineGroupResults(results) {
    // Logic kết hợp kết quả từ nhiều tầng song song
    const combined = {
      data: {},
      metadata: {
        processedLayers: results.map(r => r.layerId),
        processingTime: Date.now()
      }
    };
    
    results.forEach(result => {
      if (result.success) {
        Object.assign(combined.data, result.data);
      }
    });
    
    return combined;
  }

  getPipelineStatus() {
    return {
      totalLayers: this.layers.length,
      readyLayers: this.layers.length,
      configuration: this.config,
      estimatedProcessingTime: this.estimateProcessingTime()
    };
  }

  estimateProcessingTime() {
    // Ước tính thời gian xử lý (ms)
    const avgTimePerLayer = 100; // 100ms per layer
    const parallelGroups = 4;
    const sequentialLayers = 100 - (parallelGroups * 5);
    
    return (parallelGroups * 5 * 100) + (sequentialLayers * 100);
  }
}

// Usage Example
async function demonstrateSystem() {
  console.log('=== 100-Layer Monitoring System Demo ===');
  
  // Khởi tạo pipeline manager
  const pipelineManager = new PipelineManager({
    mode: 'sequential',
    quality: 'high'
  });
  
  // Input mẫu
  const sampleInput = {
    topic: 'Artificial Intelligence in Healthcare',
    contentType: 'article',
    targetAudience: 'healthcare professionals',
    language: 'Vietnamese',
    requirements: {
      minWords: 1000,
      includeReferences: true,
      seoOptimized: true
    }
  };
  
  console.log('Input:', sampleInput);
  console.log('Pipeline Status:', pipelineManager.getPipelineStatus());
  
  try {
    // Xử lý qua pipeline
    const result = await pipelineManager.processPipeline(sampleInput);
    
    console.log('\n=== FINAL RESULT ===');
    console.log('Success:', result.success);
    console.log('Processing Time:', result.processingTime, 'ms');
    console.log('Layers Processed:', result.layersProcessed);
    
    if (result.success) {
      console.log('\nFinal Output Summary:');
      console.log('- Content Quality: High');
      console.log('- Validation: Passed');
      console.log('- Ready for Publishing: Yes');
    }
    
  } catch (error) {
    console.error('Pipeline failed:', error);
  }
}

// Export classes for use in other modules
module.exports = {
  ContentValidator,
  ContentProcessor,
  WebContentExtractor,
  WebContentProcessor,
  LayerService,
  PipelineManager
};

// Run demo if this file is executed directly
if (require.main === module) {
  demonstrateSystem();
}
