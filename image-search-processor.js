// Image Search and Product Image Processing System
// Hệ thống tìm kiếm và xử lý hình ảnh sản phẩm

class ImageSearchEngine {
  constructor(config = {}) {
    this.config = {
      searchEngines: {
        google: {
          enabled: true,
          apiKey: config.googleApiKey || process.env.GOOGLE_API_KEY,
          searchEngineId: config.searchEngineId || process.env.GOOGLE_SEARCH_ENGINE_ID,
          baseUrl: 'https://www.googleapis.com/customsearch/v1'
        },
        bing: {
          enabled: true,
          apiKey: config.bingApiKey || process.env.BING_API_KEY,
          baseUrl: 'https://api.bing.microsoft.com/v7.0/images/search'
        },
        unsplash: {
          enabled: true,
          apiKey: config.unsplashApiKey || process.env.UNSPLASH_API_KEY,
          baseUrl: 'https://api.unsplash.com/search/photos'
        }
      },
      maxResults: config.maxResults || 20,
      imageFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      minImageSize: config.minImageSize || { width: 200, height: 200 },
      maxImageSize: config.maxImageSize || { width: 4096, height: 4096 }
    };
  }

  async searchImages(query, options = {}) {
    const results = {
      query: query,
      totalResults: 0,
      images: [],
      sources: [],
      metadata: {
        searchTime: 0,
        processingTime: 0,
        errors: []
      }
    };

    const startTime = performance.now();

    try {
      // Search across multiple engines
      const searchPromises = [];

      if (this.config.searchEngines.google.enabled) {
        searchPromises.push(this.searchGoogleImages(query, options));
      }

      if (this.config.searchEngines.bing.enabled) {
        searchPromises.push(this.searchBingImages(query, options));
      }

      if (this.config.searchEngines.unsplash.enabled) {
        searchPromises.push(this.searchUnsplashImages(query, options));
      }

      const searchResults = await Promise.allSettled(searchPromises);
      
      // Combine results from all engines
      searchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.images.push(...result.value.images);
          results.sources.push(...result.value.sources);
        } else {
          results.metadata.errors.push({
            engine: Object.keys(this.config.searchEngines)[index],
            error: result.reason.message
          });
        }
      });

      // Remove duplicates and sort
      results.images = this.deduplicateImages(results.images);
      results.images = this.sortImagesByRelevance(results.images, query);
      results.totalResults = results.images.length;

      results.metadata.searchTime = performance.now() - startTime;

    } catch (error) {
      results.metadata.errors.push({
        engine: 'general',
        error: error.message
      });
    }

    return results;
  }

  async searchGoogleImages(query, options = {}) {
    const { google } = this.config.searchEngines;
    
    if (!google.apiKey || !google.searchEngineId) {
      throw new Error('Google Search API credentials not configured');
    }

    const params = new URLSearchParams({
      key: google.apiKey,
      cx: google.searchEngineId,
      q: query,
      searchType: 'image',
      num: Math.min(options.maxResults || 10, 10),
      safe: options.safeSearch || 'off',
      imgType: options.imageType || 'all',
      imgSize: options.imageSize || 'all',
      fileType: options.fileType || 'all'
    });

    const response = await fetch(`${google.baseUrl}?${params}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(`Google Search API error: ${data.error.message}`);
    }

    const images = (data.items || []).map(item => ({
      url: item.link,
      thumbnail: item.image?.thumbnailLink,
      title: item.title,
      source: 'google',
      width: item.image?.width,
      height: item.image?.height,
      size: item.image?.byteSize,
      contextUrl: item.image?.contextLink,
      fileSize: this.formatFileSize(item.image?.byteSize)
    }));

    return {
      images: images.filter(img => this.isValidImage(img)),
      sources: ['google']
    };
  }

  async searchBingImages(query, options = {}) {
    const { bing } = this.config.searchEngines;
    
    if (!bing.apiKey) {
      throw new Error('Bing Search API key not configured');
    }

    const params = new URLSearchParams({
      q: query,
      count: Math.min(options.maxResults || 10, 150),
      offset: options.offset || 0,
      mkt: options.market || 'en-US',
      safeSearch: options.safeSearch || 'Moderate',
      size: options.size || 'All',
      imageType: options.imageType || 'All',
      color: options.color || 'All'
    });

    const response = await fetch(`${bing.baseUrl}?${params}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': bing.apiKey
      }
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`Bing Search API error: ${data.error.message}`);
    }

    const images = (data.value || []).map(item => ({
      url: item.contentUrl,
      thumbnail: item.thumbnailUrl,
      title: item.name,
      source: 'bing',
      width: item.width,
      height: item.height,
      size: item.contentSize,
      contextUrl: item.hostPageUrl,
      fileSize: this.formatFileSize(item.contentSize)
    }));

    return {
      images: images.filter(img => this.isValidImage(img)),
      sources: ['bing']
    };
  }

  async searchUnsplashImages(query, options = {}) {
    const { unsplash } = this.config.searchEngines;
    
    if (!unsplash.apiKey) {
      throw new Error('Unsplash API key not configured');
    }

    const params = new URLSearchParams({
      query: query,
      per_page: Math.min(options.maxResults || 10, 30),
      page: options.page || 1,
      orientation: options.orientation || 'all',
      color: options.color || 'any'
    });

    const response = await fetch(`${unsplash.baseUrl}?${params}`, {
      headers: {
        'Authorization': `Client-ID ${unsplash.apiKey}`
      }
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Unsplash API error: ${data.errors[0]}`);
    }

    const images = (data.results || []).map(item => ({
      url: item.urls?.regular || item.urls?.full,
      thumbnail: item.urls?.thumb,
      title: item.alt_description || item.description || 'Unsplash Image',
      source: 'unsplash',
      width: item.width,
      height: item.height,
      size: null, // Unsplash doesn't provide file size
      contextUrl: item.links?.html,
      fileSize: 'Unknown',
      author: item.user?.name,
      authorUrl: item.user?.links?.html,
      license: 'Unsplash License'
    }));

    return {
      images: images.filter(img => this.isValidImage(img)),
      sources: ['unsplash']
    };
  }

  isValidImage(image) {
    // Check image dimensions
    if (image.width && image.height) {
      if (image.width < this.config.minImageSize.width || 
          image.height < this.config.minImageSize.height) {
        return false;
      }
      if (image.width > this.config.maxImageSize.width || 
          image.height > this.config.maxImageSize.height) {
        return false;
      }
    }

    // Check file format
    if (image.url) {
      const extension = image.url.split('.').pop()?.toLowerCase();
      if (!this.config.imageFormats.includes(extension)) {
        return false;
      }
    }

    return true;
  }

  deduplicateImages(images) {
    const seen = new Set();
    return images.filter(image => {
      const key = image.url || image.thumbnail;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  sortImagesByRelevance(images, query) {
    // Simple relevance scoring based on title match and image quality
    return images.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, query);
      const scoreB = this.calculateRelevanceScore(b, query);
      return scoreB - scoreA;
    });
  }

  calculateRelevanceScore(image, query) {
    let score = 0;

    // Title matching
    if (image.title) {
      const titleLower = image.title.toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (titleLower === queryLower) score += 100;
      else if (titleLower.includes(queryLower)) score += 50;
      else if (queryLower.includes(titleLower)) score += 25;
    }

    // Image quality scoring
    if (image.width && image.height) {
      const pixels = image.width * image.height;
      if (pixels > 1000000) score += 20; // > 1MP
      else if (pixels > 500000) score += 10; // > 0.5MP
    }

    // Source preference
    if (image.source === 'unsplash') score += 15;
    else if (image.source === 'google') score += 10;
    else if (image.source === 'bing') score += 5;

    // Has metadata
    if (image.author) score += 5;
    if (image.license) score += 5;

    return score;
  }

  formatFileSize(bytes) {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

class ImageProcessor {
  constructor(config = {}) {
    this.config = {
      maxImageSize: config.maxImageSize || 4096,
      compressionQuality: config.compressionQuality || 0.8,
      supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
      processingOptions: {
        resize: config.enableResize !== false,
        compress: config.enableCompress !== false,
        enhance: config.enableEnhance !== false,
        analyze: config.enableAnalyze !== false
      }
    };
  }

  async processImage(imageUrl, options = {}) {
    const startTime = performance.now();
    
    try {
      // Load image
      const image = await this.loadImage(imageUrl);
      
      const result = {
        original: {
          url: imageUrl,
          width: image.width,
          height: image.height,
          format: this.getImageFormat(imageUrl),
          size: await this.getImageSize(imageUrl)
        },
        processed: {},
        analysis: {},
        metadata: {
          processingTime: 0,
          operations: []
        }
      };

      // Resize if needed
      if (options.resize || this.config.processingOptions.resize) {
        const resized = await this.resizeImage(image, options.targetSize);
        result.processed.resized = resized;
        result.metadata.operations.push('resize');
      }

      // Compress if needed
      if (options.compress || this.config.processingOptions.compress) {
        const compressed = await this.compressImage(image, options.quality);
        result.processed.compressed = compressed;
        result.metadata.operations.push('compress');
      }

      // Enhance image
      if (options.enhance || this.config.processingOptions.enhance) {
        const enhanced = await this.enhanceImage(image, options.enhancement);
        result.processed.enhanced = enhanced;
        result.metadata.operations.push('enhance');
      }

      // Analyze image
      if (options.analyze || this.config.processingOptions.analyze) {
        const analysis = await this.analyzeImage(image);
        result.analysis = analysis;
        result.metadata.operations.push('analyze');
      }

      result.metadata.processingTime = performance.now() - startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }

  async loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      
      img.src = url;
    });
  }

  async resizeImage(image, targetSize) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate target dimensions
    let targetWidth, targetHeight;
    
    if (targetSize) {
      targetWidth = targetSize.width;
      targetHeight = targetSize.height;
    } else {
      // Auto-resize to fit within max dimensions
      const maxDim = this.config.maxImageSize;
      const aspectRatio = image.width / image.height;
      
      if (image.width > image.height) {
        targetWidth = Math.min(image.width, maxDim);
        targetHeight = targetWidth / aspectRatio;
      } else {
        targetHeight = Math.min(image.height, maxDim);
        targetWidth = targetHeight * aspectRatio;
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Draw resized image
    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    
    return {
      url: canvas.toDataURL('image/jpeg', this.config.compressionQuality),
      width: targetWidth,
      height: targetHeight,
      format: 'jpeg',
      aspectRatio: targetWidth / targetHeight
    };
  }

  async compressImage(image, quality) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    ctx.drawImage(image, 0, 0);
    
    const compressedQuality = quality || this.config.compressionQuality;
    const compressedUrl = canvas.toDataURL('image/jpeg', compressedQuality);
    
    // Estimate compressed size
    const base64Data = compressedUrl.split(',')[1];
    const compressedSize = Math.round(base64Data.length * 0.75); // Base64 to binary approximation
    
    return {
      url: compressedUrl,
      quality: compressedQuality,
      estimatedSize: compressedSize,
      format: 'jpeg',
      compressionRatio: compressedSize / (image.width * image.height * 4) // Rough estimate
    };
  }

  async enhanceImage(image, options = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Apply enhancements
    ctx.filter = this.buildFilterString(options);
    ctx.drawImage(image, 0, 0);
    
    return {
      url: canvas.toDataURL('image/jpeg', this.config.compressionQuality),
      filters: options,
      format: 'jpeg'
    };
  }

  buildFilterString(options) {
    const filters = [];
    
    if (options.brightness !== undefined) {
      filters.push(`brightness(${options.brightness}%)`);
    }
    if (options.contrast !== undefined) {
      filters.push(`contrast(${options.contrast}%)`);
    }
    if (options.saturation !== undefined) {
      filters.push(`saturate(${options.saturation}%)`);
    }
    if (options.blur !== undefined) {
      filters.push(`blur(${options.blur}px)`);
    }
    if (options.sharpen !== undefined) {
      filters.push(`contrast(${100 + options.sharpen}%)`);
    }
    
    return filters.join(' ') || 'none';
  }

  async analyzeImage(image) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Basic color analysis
    const colorAnalysis = this.analyzeColors(data);
    
    // Edge detection (simplified)
    const edgeAnalysis = this.detectEdges(imageData);
    
    // Texture analysis
    const textureAnalysis = this.analyzeTexture(imageData);
    
    // Composition analysis
    const compositionAnalysis = this.analyzeComposition(imageData);
    
    return {
      colors: colorAnalysis,
      edges: edgeAnalysis,
      texture: textureAnalysis,
      composition: compositionAnalysis,
      quality: this.assessImageQuality(image, colorAnalysis, edgeAnalysis),
      metadata: {
        dimensions: { width: image.width, height: image.height },
        aspectRatio: image.width / image.height,
        megapixels: (image.width * image.height) / 1000000,
        format: this.getImageFormat(image.src)
      }
    };
  }

  analyzeColors(data) {
    let r = 0, g = 0, b = 0;
    let brightPixels = 0;
    let darkPixels = 0;
    const colorHistogram = {};
    
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      
      r += red;
      g += green;
      b += blue;
      
      const brightness = (red + green + blue) / 3;
      if (brightness > 200) brightPixels++;
      else if (brightness < 50) darkPixels++;
      
      // Simple color histogram (quantized)
      const colorKey = `${Math.floor(red/32)*32},${Math.floor(green/32)*32},${Math.floor(blue/32)*32}`;
      colorHistogram[colorKey] = (colorHistogram[colorKey] || 0) + 1;
    }
    
    const pixelCount = data.length / 4;
    
    return {
      average: {
        r: Math.round(r / pixelCount),
        g: Math.round(g / pixelCount),
        b: Math.round(b / pixelCount)
      },
      dominant: this.getDominantColors(colorHistogram, 5),
      brightness: {
        average: (r + g + b) / (3 * pixelCount),
        bright: brightPixels / pixelCount,
        dark: darkPixels / pixelCount
      },
      saturation: this.calculateSaturation(data),
      histogram: colorHistogram
    };
  }

  getDominantColors(histogram, count) {
    const sorted = Object.entries(histogram)
      .sort(([,a], [,b]) => b - a)
      .slice(0, count)
      .map(([color]) => {
        const [r, g, b] = color.split(',').map(Number);
        return { r, g, b, hex: this.rgbToHex(r, g, b) };
      });
    
    return sorted;
  }

  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  calculateSaturation(data) {
    let totalSaturation = 0;
    let pixelCount = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;
      
      totalSaturation += saturation;
      pixelCount++;
    }
    
    return totalSaturation / pixelCount;
  }

  detectEdges(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    let edgeStrength = 0;
    let edgeCount = 0;
    
    // Simple Sobel edge detection
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        // Get surrounding pixels
        const tl = data[((y - 1) * width + (x - 1)) * 4];
        const tm = data[((y - 1) * width + x) * 4];
        const tr = data[((y - 1) * width + (x + 1)) * 4];
        const ml = data[(y * width + (x - 1)) * 4];
        const mr = data[(y * width + (x + 1)) * 4];
        const bl = data[((y + 1) * width + (x - 1)) * 4];
        const bm = data[((y + 1) * width + x) * 4];
        const br = data[((y + 1) * width + (x + 1)) * 4];
        
        // Sobel X
        const sobelX = -tl - 2*ml - bl + tr + 2*mr + br;
        // Sobel Y
        const sobelY = -tl - 2*tm - tr + bl + 2*bm + br;
        
        const edge = Math.sqrt(sobelX * sobelX + sobelY * sobelY);
        
        if (edge > 30) {
          edgeCount++;
          edgeStrength += edge;
        }
      }
    }
    
    const totalPixels = width * height;
    
    return {
      edgeCount,
      edgeDensity: edgeCount / totalPixels,
      averageStrength: edgeCount > 0 ? edgeStrength / edgeCount : 0,
      hasStrongEdges: edgeCount > totalPixels * 0.01
    };
  }

  analyzeTexture(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    let textureVariance = 0;
    let sampleCount = 0;
    
    // Sample texture by comparing neighboring pixels
    for (let y = 0; y < height - 1; y += 2) {
      for (let x = 0; x < width - 1; x += 2) {
        const idx = (y * width + x) * 4;
        const rightIdx = (y * width + (x + 1)) * 4;
        const bottomIdx = ((y + 1) * width + x) * 4;
        
        const current = data[idx] + data[idx + 1] + data[idx + 2];
        const right = data[rightIdx] + data[rightIdx + 1] + data[rightIdx + 2];
        const bottom = data[bottomIdx] + data[bottomIdx + 1] + data[bottomIdx + 2];
        
        const diff1 = Math.abs(current - right);
        const diff2 = Math.abs(current - bottom);
        
        textureVariance += (diff1 + diff2) / 2;
        sampleCount++;
      }
    }
    
    const averageTexture = sampleCount > 0 ? textureVariance / sampleCount : 0;
    
    return {
      averageTexture,
      textureComplexity: averageTexture > 50 ? 'high' : averageTexture > 20 ? 'medium' : 'low',
      isSmooth: averageTexture < 10,
      isDetailed: averageTexture > 100
    };
  }

  analyzeComposition(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Rule of thirds analysis
    const thirdWidth = width / 3;
    const thirdHeight = height / 3;
    
    const centerWeight = this.calculateRegionWeight(data, width, height, 
      thirdWidth, 2 * thirdWidth, thirdHeight, 2 * thirdHeight);
    
    const totalWeight = this.calculateRegionWeight(data, width, height, 0, width, 0, height);
    
    const centerRatio = centerWeight / totalWeight;
    
    return {
      centerWeight: centerRatio,
      followsRuleOfThirds: centerRatio > 0.3 && centerRatio < 0.7,
      isCentered: centerRatio > 0.6,
      isBalanced: Math.abs(centerRatio - 0.5) < 0.2
    };
  }

  calculateRegionWeight(data, width, height, x1, x2, y1, y2) {
    let weight = 0;
    
    for (let y = Math.floor(y1); y < Math.floor(y2); y++) {
      for (let x = Math.floor(x1); x < Math.floor(x2); x++) {
        const idx = (y * width + x) * 4;
        weight += data[idx] + data[idx + 1] + data[idx + 2];
      }
    }
    
    return weight;
  }

  assessImageQuality(image, colorAnalysis, edgeAnalysis) {
    const score = {
      overall: 0,
      resolution: 0,
      clarity: 0,
      composition: 0,
      color: 0
    };
    
    // Resolution scoring
    const megapixels = (image.width * image.height) / 1000000;
    score.resolution = Math.min(100, megapixels * 20);
    
    // Clarity scoring based on edges
    score.clarity = Math.min(100, edgeAnalysis.edgeDensity * 1000);
    
    // Color scoring
    const colorVariance = this.calculateColorVariance(colorAnalysis.histogram);
    score.color = Math.min(100, colorVariance * 2);
    
    // Overall quality
    score.overall = (score.resolution + score.clarity + score.color) / 3;
    
    return {
      score: score,
      grade: this.getQualityGrade(score.overall),
      recommendations: this.getQualityRecommendations(score)
    };
  }

  calculateColorVariance(histogram) {
    const colors = Object.values(histogram);
    if (colors.length === 0) return 0;
    
    const mean = colors.reduce((a, b) => a + b, 0) / colors.length;
    const variance = colors.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / colors.length;
    
    return Math.sqrt(variance);
  }

  getQualityGrade(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Very Poor';
  }

  getQualityRecommendations(score) {
    const recommendations = [];
    
    if (score.resolution < 50) {
      recommendations.push('Use higher resolution images');
    }
    if (score.clarity < 50) {
      recommendations.push('Improve image sharpness');
    }
    if (score.color < 50) {
      recommendations.push('Enhance color contrast');
    }
    
    return recommendations;
  }

  getImageFormat(url) {
    const extension = url.split('.').pop()?.toLowerCase();
    return this.config.supportedFormats.includes(extension) ? extension : 'unknown';
  }

  async getImageSize(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentLength = response.headers.get('content-length');
      return contentLength ? parseInt(contentLength) : null;
    } catch {
      return null;
    }
  }
}

class ProductImageProcessor extends ImageProcessor {
  constructor(config = {}) {
    super(config);
    this.productConfig = {
      ...config,
      processingOptions: {
        ...config.processingOptions,
        backgroundRemoval: config.enableBackgroundRemoval !== false,
        watermarkDetection: config.enableWatermarkDetection !== false,
        productClassification: config.enableProductClassification !== false
      }
    };
  }

  async processProductImage(imageUrl, productCategory = null) {
    const baseResult = await this.processImage(imageUrl, {
      analyze: true,
      enhance: true,
      resize: true
    });

    const productAnalysis = await this.analyzeProductImage(imageUrl, productCategory);
    
    return {
      ...baseResult,
      productAnalysis: productAnalysis,
      recommendations: this.getProductRecommendations(baseResult, productAnalysis)
    };
  }

  async analyzeProductImage(imageUrl, productCategory) {
    const image = await this.loadImage(imageUrl);
    const analysis = await this.analyzeImage(image);
    
    const productAnalysis = {
      category: productCategory || this.classifyProductCategory(analysis),
      suitability: this.assessProductSuitability(analysis),
      background: this.analyzeBackground(analysis),
      lighting: this.analyzeLighting(analysis),
      composition: this.analyzeProductComposition(analysis),
      marketability: this.assessMarketability(analysis)
    };

    return productAnalysis;
  }

  classifyProductCategory(analysis) {
    const { colors, edges, texture } = analysis;
    
    // Simple heuristic classification
    if (texture.textureComplexity === 'high' && edges.edgeDensity > 0.05) {
      return 'electronics';
    } else if (colors.brightness.bright > 0.6 && colors.saturation > 0.5) {
      return 'fashion';
    } else if (colors.brightness.dark > 0.4 && texture.isSmooth) {
      return 'furniture';
    } else if (edges.edgeDensity < 0.02 && colors.saturation > 0.6) {
      return 'food';
    }
    
    return 'general';
  }

  assessProductSuitability(analysis) {
    const score = {
      overall: 0,
      lighting: 0,
      background: 0,
      focus: 0,
      composition: 0
    };

    // Lighting assessment
    const brightness = analysis.colors.brightness.average;
    score.lighting = brightness > 0.3 && brightness < 0.8 ? 100 : 50;

    // Background assessment (simple - assumes uniform background is better)
    const colorVariance = this.calculateColorVariance(analysis.colors.histogram);
    score.background = colorVariance < 50 ? 100 : Math.max(0, 100 - colorVariance);

    // Focus assessment based on edge clarity
    score.focus = Math.min(100, analysis.edges.averageStrength * 2);

    // Composition assessment
    score.composition = analysis.composition.isBalanced ? 100 : 60;

    score.overall = (score.lighting + score.background + score.focus + score.composition) / 4;

    return {
      score: score,
      grade: this.getQualityGrade(score.overall),
      isSuitable: score.overall >= 70
    };
  }

  analyzeBackground(analysis) {
    const colorVariance = this.calculateColorVariance(analysis.colors.histogram);
    const brightness = analysis.colors.brightness.average;
    
    return {
      isUniform: colorVariance < 30,
      isLight: brightness > 0.7,
      isDark: brightness < 0.3,
      hasPattern: colorVariance > 100,
      recommendation: this.getBackgroundRecommendation(colorVariance, brightness)
    };
  }

  getBackgroundRecommendation(variance, brightness) {
    if (variance > 100) {
      return 'Consider using a cleaner background';
    } else if (brightness < 0.2 || brightness > 0.9) {
      return 'Adjust background brightness for better contrast';
    }
    return 'Background looks good';
  }

  analyzeLighting(analysis) {
    const brightness = analysis.colors.brightness;
    const colors = analysis.colors.average;
    
    return {
      isWellLit: brightness.average > 0.3 && brightness.average < 0.8,
      isTooBright: brightness.bright > 0.7,
      isTooDark: brightness.dark > 0.5,
      hasHarshShadows: brightness.dark > 0.3 && brightness.bright > 0.5,
      colorTemperature: this.estimateColorTemperature(colors),
      recommendation: this.getLightingRecommendation(brightness)
    };
  }

  estimateColorTemperature(colors) {
    const { r, g, b } = colors;
    
    if (r > g && r > b) {
      return 'warm';
    } else if (b > r && b > g) {
      return 'cool';
    }
    return 'neutral';
  }

  getLightingRecommendation(brightness) {
    if (brightness.average < 0.3) {
      return 'Increase lighting for better visibility';
    } else if (brightness.average > 0.8) {
      return 'Reduce lighting to avoid overexposure';
    } else if (brightness.dark > 0.3 && brightness.bright > 0.5) {
      return 'Use diffused lighting to reduce harsh shadows';
    }
    return 'Lighting looks good';
  }

  analyzeProductComposition(analysis) {
    const composition = analysis.composition;
    const edges = analysis.edges;
    
    return {
      isCentered: composition.isCentered,
      followsRuleOfThirds: composition.followsRuleOfThirds,
      hasGoodFocus: edges.averageStrength > 30,
      isBalanced: composition.isBalanced,
      recommendation: this.getCompositionRecommendation(composition, edges)
    };
  }

  getCompositionRecommendation(composition, edges) {
    if (composition.isCentered) {
      return 'Consider using rule of thirds for more dynamic composition';
    } else if (!composition.isBalanced) {
      return 'Improve balance in composition';
    } else if (edges.averageStrength < 20) {
      return 'Ensure product is in sharp focus';
    }
    return 'Composition looks good';
  }

  assessMarketability(analysis) {
    const suitability = this.assessProductSuitability(analysis);
    const quality = this.assessImageQuality(null, analysis, analysis.edges);
    
    const marketabilityScore = (suitability.score.overall + quality.score.overall) / 2;
    
    return {
      score: marketabilityScore,
      grade: this.getQualityGrade(marketabilityScore),
      is Marketable: marketabilityScore >= 75,
      potentialIssues: this.getMarketabilityIssues(suitability, quality),
      improvements: this.getMarketabilityImprovements(suitability, quality)
    };
  }

  getMarketabilityIssues(suitability, quality) {
    const issues = [];
    
    if (suitability.score.lighting < 70) issues.push('Poor lighting');
    if (suitability.score.background < 70) issues.push('Distracting background');
    if (suitability.score.focus < 70) issues.push('Lack of focus');
    if (quality.score.resolution < 70) issues.push('Low resolution');
    
    return issues;
  }

  getMarketabilityImprovements(suitability, quality) {
    const improvements = [];
    
    if (suitability.score.lighting < 70) {
      improvements.push('Improve lighting conditions');
    }
    if (suitability.score.background < 70) {
      improvements.push('Use cleaner background');
    }
    if (suitability.score.focus < 70) {
      improvements.push('Ensure sharp focus on product');
    }
    if (quality.score.resolution < 70) {
      improvements.push('Use higher resolution images');
    }
    
    return improvements;
  }

  getProductRecommendations(baseResult, productAnalysis) {
    const recommendations = [];
    
    // Base image recommendations
    if (baseResult.metadata.operations.includes('resize')) {
      recommendations.push('Consider using original resolution for better quality');
    }
    
    // Product-specific recommendations
    if (!productAnalysis.suitability.isSuitable) {
      recommendations.push('Image may not be suitable for product display');
    }
    
    if (!productAnalysis.marketability.is Marketable) {
      recommendations.push('Improve image quality for better marketability');
    }
    
    // Technical recommendations
    if (baseResult.original.format === 'png' && baseResult.original.size > 1000000) {
      recommendations.push('Consider using JPEG format for smaller file size');
    }
    
    return recommendations;
  }
}

// Export classes
module.exports = {
  ImageSearchEngine,
  ImageProcessor,
  ProductImageProcessor
};
