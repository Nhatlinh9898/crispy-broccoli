// Content Data Analyzer
// Phân tích và xử lý data từ nội dung đã tạo để viết tài liệu

class ContentDataAnalyzer {
  constructor(config = {}) {
    this.config = {
      dataSources: {
        systemData: config.systemDataPath || './data/system/content/',
        userData: config.userDataPath || './data/user/content/',
        processedData: config.processedDataPath || './data/processed/content/',
        cacheData: config.cacheDataPath || './data/cache/content/'
      },
      analysisOptions: {
        extractTopics: config.extractTopics !== false,
        extractKeywords: config.extractKeywords !== false,
        analyzeSentiment: config.analyzeSentiment !== false,
        generateSummary: config.generateSummary !== false,
        findRelationships: config.findRelationships !== false,
        categorizeContent: config.categorizeContent !== false,
        detectLanguage: config.detectLanguage !== false,
        extractEntities: config.extractEntities !== false
      },
      processingOptions: {
        batchSize: config.batchSize || 100,
        parallelProcessing: config.parallelProcessing !== false,
        enableCaching: config.enableCaching !== false,
        updateFrequency: config.updateFrequency || 3600000, // 1 hour
        maxCacheSize: config.maxCacheSize || 1000
      },
      outputOptions: {
        generateReports: config.generateReports !== false,
        exportFormats: config.exportFormats || ['json', 'csv', 'markdown'],
        includeVisualizations: config.includeVisualizations !== false,
        includeStatistics: config.includeStatistics !== false
      }
    };
    
    this.contentIndex = new Map();
    this.analysisCache = new Map();
    this.relationshipGraph = new Map();
    this.topicModel = new Map();
    this.processingQueue = [];
    this.statistics = {
      totalContent: 0,
      totalWords: 0,
      totalTopics: 0,
      totalRelationships: 0,
      lastAnalysis: null,
      processingTime: 0
    };
  }

  // Initialize content analyzer
  async initialize() {
    console.log('🔍 Initializing Content Data Analyzer...');
    
    // Ensure directories exist
    await this.ensureDirectories();
    
    // Load existing content index
    await this.loadContentIndex();
    
    // Initialize analysis models
    await this.initializeAnalysisModels();
    
    // Start periodic analysis updates
    this.startPeriodicUpdates();
    
    console.log('✅ Content Data Analyzer initialized');
    return true;
  }

  // Ensure directories exist
  async ensureDirectories() {
    const paths = Object.values(this.config.dataSources);
    
    for (const path of paths) {
      await this.createDirectory(path);
    }
  }

  // Create directory
  async createDirectory(path) {
    if (typeof window !== 'undefined') {
      const storageKey = `content_dir_${path.replace(/[^a-zA-Z0-9]/g, '_')}`;
      if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, JSON.stringify({}));
      }
    } else {
      console.log(`Creating directory: ${path}`);
    }
  }

  // Load content index
  async loadContentIndex() {
    console.log('📚 Loading content index...');
    
    // In browser environment, load from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('content_index');
      if (stored) {
        const indexData = JSON.parse(stored);
        this.contentIndex = new Map(Object.entries(indexData));
        console.log(`   Loaded ${this.contentIndex.size} content items`);
      }
    }
    
    // Load content from system data
    await this.scanSystemContent();
    
    // Load content from user data
    await this.scanUserContent();
    
    console.log(`   Total content items: ${this.contentIndex.size}`);
  }

  // Scan system content
  async scanSystemContent() {
    console.log('🏢 Scanning system content...');
    
    const systemContent = await this.getContentFromPath(this.config.dataSources.systemData);
    
    for (const content of systemContent) {
      const contentId = this.generateContentId(content, 'system');
      const indexedContent = {
        id: contentId,
        ...content,
        source: 'system',
        indexedAt: Date.now(),
        analyzed: false,
        analysis: null
      };
      
      this.contentIndex.set(contentId, indexedContent);
    }
    
    console.log(`   Found ${systemContent.length} system content items`);
  }

  // Scan user content
  async scanUserContent() {
    console.log('👤 Scanning user content...');
    
    const userContent = await this.getContentFromPath(this.config.dataSources.userData);
    
    for (const content of userContent) {
      const contentId = this.generateContentId(content, 'user');
      const indexedContent = {
        id: contentId,
        ...content,
        source: 'user',
        indexedAt: Date.now(),
        analyzed: false,
        analysis: null
      };
      
      this.contentIndex.set(contentId, indexedContent);
    }
    
    console.log(`   Found ${userContent.length} user content items`);
  }

  // Get content from path
  async getContentFromPath(path) {
    // Simulate content retrieval
    const contentItems = [];
    
    // Generate sample content based on path
    if (path.includes('system')) {
      contentItems.push(
        {
          title: 'Hệ thống 100 tầng giám sát',
          content: 'Hệ thống 100 tầng được thiết kế để giám sát và kiểm định nội dung tự động...',
          type: 'documentation',
          category: 'system_design',
          createdAt: Date.now() - 86400000, // 1 day ago
          wordCount: 1500,
          language: 'vi'
        },
        {
          title: 'Tích hợp tìm kiếm web',
          content: 'Tích hợp khả năng tìm kiếm thông tin từ Google, Bing và các nguồn khác...',
          type: 'feature',
          category: 'web_search',
          createdAt: Date.now() - 172800000, // 2 days ago
          wordCount: 800,
          language: 'vi'
        },
        {
          title: 'Xử lý hình ảnh sản phẩm',
          content: 'Hệ thống xử lý hình ảnh sản phẩm với khả năng phân tích chất lượng và phù hợp...',
          type: 'feature',
          category: 'image_processing',
          createdAt: Date.now() - 259200000, // 3 days ago
          wordCount: 1200,
          language: 'vi'
        }
      );
    }
    
    if (path.includes('user')) {
      contentItems.push(
        {
          title: 'Báo cáo dự án AI',
          content: 'Báo cáo chi tiết về việc triển khai hệ thống AI cho xử lý nội dung...',
          type: 'report',
          category: 'ai_project',
          createdAt: Date.now() - 3600000, // 1 hour ago
          wordCount: 2000,
          language: 'vi'
        },
        {
          title: 'Phân tích dữ liệu khách hàng',
          content: 'Phân tích chi tiết dữ liệu khách hàng để cải thiện dịch vụ và sản phẩm...',
          type: 'analysis',
          category: 'customer_data',
          createdAt: Date.now() - 7200000, // 2 hours ago
          wordCount: 1800,
          language: 'vi'
        }
      );
    }
    
    return contentItems;
  }

  // Generate content ID
  generateContentId(content, source) {
    const timestamp = Date.now();
    const title = content.title.replace(/[^a-zA-Z0-9]/g, '_');
    return `${source}_${timestamp}_${title}`;
  }

  // Initialize analysis models
  async initializeAnalysisModels() {
    console.log('🤖 Initializing analysis models...');
    
    // Initialize topic model
    this.topicModel = new Map([
      ['system_design', { keywords: ['hệ thống', 'kiến trúc', 'tầng', 'giám sát', 'kiểm định'], weight: 1.0 }],
      ['web_search', { keywords: ['tìm kiếm', 'google', 'bing', 'web', 'thông tin'], weight: 0.9 }],
      ['image_processing', { keywords: ['hình ảnh', 'ảnh', 'xử lý', 'phân tích', 'chất lượng'], weight: 0.8 }],
      ['ai_project', { keywords: ['ai', 'trí tuệ nhân tạo', 'machine learning', 'neural network'], weight: 0.9 }],
      ['customer_data', { keywords: ['khách hàng', 'dữ liệu', 'phân tích', 'báo cáo'], weight: 0.7 }],
      ['content_creation', { keywords: ['nội dung', 'viết', 'tạo', 'bài viết', 'tài liệu'], weight: 0.8 }]
    ]);
    
    console.log(`   Initialized ${this.topicModel.size} topic models`);
  }

  // Start periodic updates
  startPeriodicUpdates() {
    setInterval(async () => {
      await this.updateAnalysis();
    }, this.config.processingOptions.updateFrequency);
  }

  // Analyze all content
  async analyzeAllContent() {
    console.log('🔍 Analyzing all content...');
    const startTime = Date.now();
    
    const unanalyzedContent = Array.from(this.contentIndex.values())
      .filter(content => !content.analyzed);
    
    console.log(`   Found ${unanalyzedContent.length} unanalyzed items`);
    
    if (this.config.processingOptions.parallelProcessing) {
      await this.analyzeContentBatch(unanalyzedContent);
    } else {
      await this.analyzeContentSequential(unanalyzedContent);
    }
    
    this.statistics.lastAnalysis = Date.now();
    this.statistics.processingTime = Date.now() - startTime;
    
    console.log(`   Analysis completed in ${this.statistics.processingTime}ms`);
    
    return this.getAnalysisResults();
  }

  // Analyze content in batch
  async analyzeContentBatch(contentItems) {
    const batchSize = this.config.processingOptions.batchSize;
    
    for (let i = 0; i < contentItems.length; i += batchSize) {
      const batch = contentItems.slice(i, i + batchSize);
      
      const batchPromises = batch.map(content => 
        this.analyzeSingleContent(content)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      // Update content with analysis results
      batchResults.forEach((result, index) => {
        const content = batch[index];
        
        if (result.status === 'fulfilled') {
          content.analyzed = true;
          content.analysis = result.value;
        } else {
          content.analyzed = true;
          content.analysis = { error: result.reason.message };
        }
      });
      
      // Save progress
      await this.saveContentIndex();
      
      console.log(`   Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(contentItems.length / batchSize)}`);
    }
  }

  // Analyze content sequentially
  async analyzeContentSequential(contentItems) {
    for (let i = 0; i < contentItems.length; i++) {
      const content = contentItems[i];
      
      try {
        content.analyzed = true;
        content.analysis = await this.analyzeSingleContent(content);
      } catch (error) {
        content.analyzed = true;
        content.analysis = { error: error.message };
      }
      
      if (i % 10 === 0) {
        await this.saveContentIndex();
        console.log(`   Processed ${i + 1}/${contentItems.length} items`);
      }
    }
    
    await this.saveContentIndex();
  }

  // Analyze single content item
  async analyzeSingleContent(content) {
    const cacheKey = `analysis_${content.id}`;
    
    // Check cache first
    if (this.config.processingOptions.enableCaching) {
      const cached = this.analysisCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < 3600000) { // 1 hour cache
        return cached.analysis;
      }
    }
    
    const analysis = {
      contentId: content.id,
      title: content.title,
      analyzedAt: Date.now(),
      topics: [],
      keywords: [],
      sentiment: null,
      summary: '',
      entities: [],
      relationships: [],
      category: content.category,
      language: content.language,
      quality: null,
      statistics: {}
    };
    
    try {
      // Extract topics
      if (this.config.analysisOptions.extractTopics) {
        analysis.topics = await this.extractTopics(content);
      }
      
      // Extract keywords
      if (this.config.analysisOptions.extractKeywords) {
        analysis.keywords = await this.extractKeywords(content);
      }
      
      // Analyze sentiment
      if (this.config.analysisOptions.analyzeSentiment) {
        analysis.sentiment = await this.analyzeSentiment(content);
      }
      
      // Generate summary
      if (this.config.analysisOptions.generateSummary) {
        analysis.summary = await this.generateSummary(content);
      }
      
      // Extract entities
      if (this.config.analysisOptions.extractEntities) {
        analysis.entities = await this.extractEntities(content);
      }
      
      // Detect language
      if (this.config.analysisOptions.detectLanguage) {
        analysis.language = await this.detectLanguage(content);
      }
      
      // Categorize content
      if (this.config.analysisOptions.categorizeContent) {
        analysis.category = await this.categorizeContent(content);
      }
      
      // Generate statistics
      analysis.statistics = await this.generateContentStatistics(content);
      
      // Assess quality
      analysis.quality = await this.assessContentQuality(content, analysis);
      
      // Cache results
      if (this.config.processingOptions.enableCaching) {
        this.analysisCache.set(cacheKey, {
          analysis: analysis,
          timestamp: Date.now()
        });
        
        // Limit cache size
        if (this.analysisCache.size > this.config.processingOptions.maxCacheSize) {
          const firstKey = this.analysisCache.keys().next().value;
          this.analysisCache.delete(firstKey);
        }
      }
      
      return analysis;
      
    } catch (error) {
      console.error(`Error analyzing content ${content.id}:`, error);
      throw error;
    }
  }

  // Extract topics
  async extractTopics(content) {
    const topics = [];
    const contentText = (content.title + ' ' + content.content).toLowerCase();
    
    for (const [topicName, topicData] of this.topicModel) {
      let score = 0;
      const keywords = topicData.keywords;
      
      for (const keyword of keywords) {
        const regex = new RegExp(keyword, 'gi');
        const matches = contentText.match(regex);
        if (matches) {
          score += matches.length;
        }
      }
      
      if (score > 0) {
        topics.push({
          name: topicName,
          score: score * topicData.weight,
          keywords: keywords.filter(k => contentText.includes(k)),
          relevance: Math.min(score * topicData.weight / 10, 1.0)
        });
      }
    }
    
    // Sort by relevance and return top 5
    return topics
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5);
  }

  // Extract keywords
  async extractKeywords(content) {
    const text = content.content.toLowerCase();
    const words = text.split(/\s+/);
    
    // Filter out common words
    const stopWords = new Set([
      'và', 'của', 'cho', 'với', 'trên', 'dưới', 'đến', 'từ', 'ở', 'là', 'có',
      'không', 'được', 'thực', 'hiện', 'các', 'này', 'đó', 'một', 'hai', 'ba'
    ]);
    
    // Count word frequency
    const wordFrequency = new Map();
    
    for (const word of words) {
      const cleanWord = word.replace(/[^a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/g, '');
      
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        wordFrequency.set(cleanWord, (wordFrequency.get(cleanWord) || 0) + 1);
      }
    }
    
    // Sort by frequency and return top 10
    return Array.from(wordFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, frequency]) => ({
        word: word,
        frequency: frequency,
        importance: frequency / words.length
      }));
  }

  // Analyze sentiment
  async analyzeSentiment(content) {
    const text = content.content.toLowerCase();
    
    // Simple sentiment analysis based on keywords
    const positiveWords = ['tốt', 'hay', 'đẹp', 'hiệu quả', 'thành công', 'tuyệt vời', 'xuất sắc'];
    const negativeWords = ['kém', 'xấu', 'tệ', 'thất bại', 'lỗi', 'vấn đề', 'khó khăn'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    for (const word of positiveWords) {
      const regex = new RegExp(word, 'gi');
      const matches = text.match(regex);
      if (matches) {
        positiveScore += matches.length;
      }
    }
    
    for (const word of negativeWords) {
      const regex = new RegExp(word, 'gi');
      const matches = text.match(regex);
      if (matches) {
        negativeScore += matches.length;
      }
    }
    
    const totalScore = positiveScore + negativeScore;
    
    if (totalScore === 0) {
      return { sentiment: 'neutral', score: 0, confidence: 0.5 };
    }
    
    const sentimentScore = (positiveScore - negativeScore) / totalScore;
    
    let sentiment = 'neutral';
    if (sentimentScore > 0.2) sentiment = 'positive';
    else if (sentimentScore < -0.2) sentiment = 'negative';
    
    return {
      sentiment: sentiment,
      score: sentimentScore,
      confidence: Math.min(totalScore / 10, 1.0),
      positiveWords: positiveScore,
      negativeWords: negativeScore
    };
  }

  // Generate summary
  async generateSummary(content) {
    const sentences = content.content.split(/[.!?]+/);
    
    // Filter out very short sentences
    const validSentences = sentences.filter(s => s.trim().length > 20);
    
    if (validSentences.length <= 3) {
      return content.content.substring(0, 200) + '...';
    }
    
    // Simple extractive summarization - take first, middle, and last sentences
    const firstSentence = validSentences[0].trim();
    const middleIndex = Math.floor(validSentences.length / 2);
    const middleSentence = validSentences[middleIndex].trim();
    const lastSentence = validSentences[validSentences.length - 1].trim();
    
    return `${firstSentence}. ${middleSentence}. ${lastSentence}.`;
  }

  // Extract entities
  async extractEntities(content) {
    const text = content.content;
    const entities = [];
    
    // Extract dates
    const dateRegex = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}|\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}/g;
    const dates = text.match(dateRegex) || [];
    dates.forEach(date => {
      entities.push({ type: 'date', value: date, confidence: 0.9 });
    });
    
    // Extract numbers
    const numberRegex = /\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b/g;
    const numbers = text.match(numberRegex) || [];
    numbers.forEach(number => {
      entities.push({ type: 'number', value: number, confidence: 0.8 });
    });
    
    // Extract email-like patterns
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex) || [];
    emails.forEach(email => {
      entities.push({ type: 'email', value: email, confidence: 0.95 });
    });
    
    return entities;
  }

  // Detect language
  async detectLanguage(content) {
    const text = content.content;
    
    // Simple language detection based on character patterns
    const vietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/gi;
    const englishChars = /[a-zA-Z]/g;
    
    const vietnameseMatches = (text.match(vietnameseChars) || []).length;
    const englishMatches = (text.match(englishChars) || []).length;
    
    if (vietnameseMatches > englishMatches * 0.1) {
      return { language: 'vi', confidence: 0.9 };
    } else if (englishMatches > 0) {
      return { language: 'en', confidence: 0.8 };
    }
    
    return { language: 'unknown', confidence: 0.5 };
  }

  // Categorize content
  async categorizeContent(content) {
    const analysis = await this.extractTopics(content);
    
    if (analysis.length > 0) {
      return {
        primary: analysis[0].name,
        secondary: analysis.slice(1, 3).map(t => t.name),
        confidence: analysis[0].relevance
      };
    }
    
    return {
      primary: content.category || 'general',
      secondary: [],
      confidence: 0.5
    };
  }

  // Generate content statistics
  async generateContentStatistics(content) {
    const text = content.content;
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/);
    const paragraphs = text.split(/\n\s*\n/);
    
    return {
      wordCount: words.length,
      characterCount: text.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      averageWordsPerSentence: words.length / sentences.length,
      averageWordsPerParagraph: words.length / paragraphs.length,
      readabilityScore: this.calculateReadabilityScore(content)
    };
  }

  // Calculate readability score
  calculateReadabilityScore(content) {
    const words = content.content.split(/\s+/);
    const sentences = content.content.split(/[.!?]+/);
    
    if (sentences.length === 0) return 0;
    
    const averageWordsPerSentence = words.length / sentences.length;
    const averageCharactersPerWord = content.content.length / words.length;
    
    // Simple readability score (0-100, higher is better)
    let score = 100;
    
    // Penalize very long sentences
    if (averageWordsPerSentence > 20) {
      score -= (averageWordsPerSentence - 20) * 2;
    }
    
    // Penalize very long words
    if (averageCharactersPerWord > 8) {
      score -= (averageCharactersPerWord - 8) * 3;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  // Assess content quality
  async assessContentQuality(content, analysis) {
    let score = 50; // Base score
    
    // Length scoring
    if (content.wordCount > 100) score += 10;
    if (content.wordCount > 500) score += 10;
    if (content.wordCount > 1000) score += 10;
    
    // Structure scoring
    if (analysis.statistics.paragraphCount > 1) score += 5;
    if (analysis.statistics.sentenceCount > 5) score += 5;
    
    // Readability scoring
    score += analysis.statistics.readabilityScore * 0.2;
    
    // Topic relevance scoring
    if (analysis.topics.length > 0) {
      score += analysis.topics[0].relevance * 15;
    }
    
    // Sentiment scoring (neutral to slightly positive is good)
    if (analysis.sentiment) {
      if (analysis.sentiment.sentiment === 'neutral') score += 10;
      else if (analysis.sentiment.sentiment === 'positive') score += 5;
    }
    
    return {
      score: Math.max(0, Math.min(100, score)),
      grade: this.getQualityGrade(score),
      factors: {
        length: content.wordCount > 100 ? 'good' : 'short',
        structure: analysis.statistics.paragraphCount > 1 ? 'good' : 'poor',
        readability: analysis.statistics.readabilityScore > 70 ? 'good' : 'needs_improvement',
        topic_relevance: analysis.topics.length > 0 ? 'good' : 'poor'
      }
    };
  }

  // Get quality grade
  getQualityGrade(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    if (score >= 40) return 'poor';
    return 'very_poor';
  }

  // Find relationships between content
  async findContentRelationships() {
    console.log('🔗 Finding content relationships...');
    
    const contentItems = Array.from(this.contentIndex.values());
    const relationships = [];
    
    for (let i = 0; i < contentItems.length; i++) {
      for (let j = i + 1; j < contentItems.length; j++) {
        const content1 = contentItems[i];
        const content2 = contentItems[j];
        
        const relationship = await this.calculateRelationship(content1, content2);
        
        if (relationship.strength > 0.3) {
          relationships.push(relationship);
        }
      }
    }
    
    // Sort by strength and return top relationships
    return relationships
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 50);
  }

  // Calculate relationship between two content items
  async calculateRelationship(content1, content2) {
    let strength = 0;
    const reasons = [];
    
    // Topic similarity
    if (content1.analysis && content2.analysis) {
      const topics1 = new Set(content1.analysis.topics.map(t => t.name));
      const topics2 = new Set(content2.analysis.topics.map(t => t.name));
      const intersection = new Set([...topics1].filter(x => topics2.has(x)));
      
      if (intersection.size > 0) {
        strength += intersection.size * 0.3;
        reasons.push(`Shared topics: ${Array.from(intersection).join(', ')}`);
      }
    }
    
    // Keyword similarity
    if (content1.analysis && content2.analysis) {
      const keywords1 = new Set(content1.analysis.keywords.map(k => k.word));
      const keywords2 = new Set(content2.analysis.keywords.map(k => k.word));
      const intersection = new Set([...keywords1].filter(x => keywords2.has(x)));
      
      if (intersection.size > 0) {
        strength += intersection.size * 0.2;
        reasons.push(`Shared keywords: ${Array.from(intersection).join(', ')}`);
      }
    }
    
    // Category similarity
    if (content1.category === content2.category) {
      strength += 0.4;
      reasons.push(`Same category: ${content1.category}`);
    }
    
    // Source similarity
    if (content1.source === content2.source) {
      strength += 0.1;
      reasons.push(`Same source: ${content1.source}`);
    }
    
    // Time proximity (created within 7 days)
    const timeDiff = Math.abs(content1.createdAt - content2.createdAt);
    if (timeDiff < 7 * 24 * 60 * 60 * 1000) { // 7 days
      strength += 0.2;
      reasons.push('Created within 7 days');
    }
    
    return {
      content1: content1.id,
      content2: content2.id,
      strength: Math.min(strength, 1.0),
      reasons: reasons,
      type: this.getRelationshipType(strength)
    };
  }

  // Get relationship type
  getRelationshipType(strength) {
    if (strength > 0.8) return 'very_strong';
    if (strength > 0.6) return 'strong';
    if (strength > 0.4) return 'moderate';
    if (strength > 0.2) return 'weak';
    return 'very_weak';
  }

  // Update analysis
  async updateAnalysis() {
    console.log('🔄 Updating content analysis...');
    
    // Re-analyze unanalyzed content
    await this.analyzeAllContent();
    
    // Update relationships
    const relationships = await this.findContentRelationships();
    this.relationshipGraph = new Map(relationships.map(r => [`${r.content1}-${r.content2}`, r]));
    
    // Update statistics
    this.updateStatistics();
    
    // Save updated index
    await this.saveContentIndex();
    
    console.log('   Analysis update completed');
  }

  // Update statistics
  updateStatistics() {
    const contentItems = Array.from(this.contentIndex.values());
    
    this.statistics.totalContent = contentItems.length;
    this.statistics.totalWords = contentItems.reduce((sum, c) => sum + (c.wordCount || 0), 0);
    this.statistics.totalTopics = new Set(
      contentItems.flatMap(c => c.analysis?.topics?.map(t => t.name) || [])
    ).size;
    this.statistics.totalRelationships = this.relationshipGraph.size;
  }

  // Save content index
  async saveContentIndex() {
    if (typeof window !== 'undefined') {
      const indexData = Object.fromEntries(this.contentIndex);
      localStorage.setItem('content_index', JSON.stringify(indexData));
    }
  }

  // Get analysis results
  getAnalysisResults() {
    const contentItems = Array.from(this.contentIndex.values());
    const analyzedContent = contentItems.filter(c => c.analyzed);
    
    return {
      totalContent: contentItems.length,
      analyzedContent: analyzedContent.length,
      analysisProgress: (analyzedContent.length / contentItems.length) * 100,
      statistics: this.statistics,
      topTopics: this.getTopTopics(),
      contentByCategory: this.getContentByCategory(),
      contentBySource: this.getContentBySource(),
      qualityDistribution: this.getQualityDistribution(),
      relationships: Array.from(this.relationshipGraph.values())
    };
  }

  // Get top topics
  getTopTopics() {
    const topicCounts = new Map();
    
    this.contentIndex.forEach(content => {
      if (content.analysis && content.analysis.topics) {
        content.analysis.topics.forEach(topic => {
          topicCounts.set(topic.name, (topicCounts.get(topic.name) || 0) + 1);
        });
      }
    });
    
    return Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
  }

  // Get content by category
  getContentByCategory() {
    const categoryCounts = new Map();
    
    this.contentIndex.forEach(content => {
      const category = content.category || 'unknown';
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
    
    return Object.fromEntries(categoryCounts);
  }

  // Get content by source
  getContentBySource() {
    const sourceCounts = new Map();
    
    this.contentIndex.forEach(content => {
      sourceCounts.set(content.source, (sourceCounts.get(content.source) || 0) + 1);
    });
    
    return Object.fromEntries(sourceCounts);
  }

  // Get quality distribution
  getQualityDistribution() {
    const qualityCounts = new Map();
    
    this.contentIndex.forEach(content => {
      if (content.analysis && content.analysis.quality) {
        const grade = content.analysis.quality.grade;
        qualityCounts.set(grade, (qualityCounts.get(grade) || 0) + 1);
      }
    });
    
    return Object.fromEntries(qualityCounts);
  }

  // Search content
  searchContent(query, options = {}) {
    const results = {
      query: query,
      totalResults: 0,
      content: [],
      filters: options
    };
    
    const searchLower = query.toLowerCase();
    
    this.contentIndex.forEach(content => {
      let matches = true;
      let score = 0;
      
      // Text search
      if (query) {
        const titleMatch = content.title.toLowerCase().includes(searchLower);
        const contentMatch = content.content.toLowerCase().includes(searchLower);
        
        if (titleMatch) score += 10;
        if (contentMatch) score += 5;
        
        matches = titleMatch || contentMatch;
      }
      
      // Apply filters
      if (options.category && content.category !== options.category) {
        matches = false;
      }
      
      if (options.source && content.source !== options.source) {
        matches = false;
      }
      
      if (options.minQuality && content.analysis?.quality?.score < options.minQuality) {
        matches = false;
      }
      
      if (options.topic && content.analysis?.topics?.some(t => t.name === options.topic)) {
        score += 8;
      }
      
      if (matches) {
        results.content.push({
          ...content,
          searchScore: score
        });
      }
    });
    
    // Sort by search score
    results.content.sort((a, b) => b.searchScore - a.searchScore);
    
    // Limit results
    if (options.limit) {
      results.content = results.content.slice(0, options.limit);
    }
    
    results.totalResults = results.content.length;
    
    return results;
  }

  // Generate content recommendations
  async generateContentRecommendations(contentId, limit = 5) {
    const content = this.contentIndex.get(contentId);
    
    if (!content) {
      return [];
    }
    
    const recommendations = [];
    
    // Find related content based on relationships
    this.relationshipGraph.forEach(relationship => {
      if (relationship.content1 === contentId || relationship.content2 === contentId) {
        const relatedId = relationship.content1 === contentId ? relationship.content2 : relationship.content1;
        const relatedContent = this.contentIndex.get(relatedId);
        
        if (relatedContent) {
          recommendations.push({
            content: relatedContent,
            relationshipStrength: relationship.strength,
            reasons: relationship.reasons
          });
        }
      }
    });
    
    // Sort by relationship strength and limit
    return recommendations
      .sort((a, b) => b.relationshipStrength - a.relationshipStrength)
      .slice(0, limit);
  }

  // Export analysis results
  async exportAnalysisResults(format = 'json') {
    const results = this.getAnalysisResults();
    
    switch (format.toLowerCase()) {
      case 'json':
        return JSON.stringify(results, null, 2);
      
      case 'csv':
        return this.convertToCSV(results);
      
      case 'markdown':
        return this.convertToMarkdown(results);
      
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  // Convert to CSV
  convertToCSV(results) {
    const csvLines = [];
    
    // Header
    csvLines.push('ID,Title,Category,Source,Quality Score,Word Count,Topics');
    
    // Data rows
    this.contentIndex.forEach(content => {
      if (content.analyzed && content.analysis) {
        const topics = content.analysis.topics.map(t => t.name).join(';');
        csvLines.push([
          content.id,
          `"${content.title}"`,
          content.category,
          content.source,
          content.analysis.quality?.score || 0,
          content.wordCount || 0,
          `"${topics}"`
        ].join(','));
      }
    });
    
    return csvLines.join('\n');
  }

  // Convert to Markdown
  convertToMarkdown(results) {
    let markdown = '# Content Analysis Report\n\n';
    
    // Statistics
    markdown += '## Statistics\n\n';
    markdown += `- Total Content: ${results.totalContent}\n`;
    markdown += `- Analyzed Content: ${results.analyzedContent}\n`;
    markdown += `- Analysis Progress: ${results.analysisProgress.toFixed(1)}%\n`;
    markdown += `- Total Words: ${results.statistics.totalWords}\n`;
    markdown += `- Total Topics: ${results.statistics.totalTopics}\n`;
    markdown += `- Total Relationships: ${results.statistics.totalRelationships}\n\n`;
    
    // Top Topics
    markdown += '## Top Topics\n\n';
    results.topTopics.forEach((topic, index) => {
      markdown += `${index + 1}. ${topic.name} (${topic.count} items)\n`;
    });
    markdown += '\n';
    
    // Content by Category
    markdown += '## Content by Category\n\n';
    Object.entries(results.contentByCategory).forEach(([category, count]) => {
      markdown += `- ${category}: ${count}\n`;
    });
    markdown += '\n';
    
    // Quality Distribution
    markdown += '## Quality Distribution\n\n';
    Object.entries(results.qualityDistribution).forEach(([grade, count]) => {
      markdown += `- ${grade}: ${count}\n`;
    });
    
    return markdown;
  }
}

// Export class
module.exports = ContentDataAnalyzer;
