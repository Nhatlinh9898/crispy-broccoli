# Image Search and Processing Integration Guide
# Hướng dẫn tích hợp tìm kiếm và xử lý hình ảnh

## 🖼️ Tổng Quan Hệ Thống

Hệ thống tìm kiếm và xử lý hình ảnh sản phẩm bao gồm 3 thành phần chính:

1. **ImageSearchEngine**: Tìm kiếm hình ảnh từ nhiều nguồn
2. **ImageProcessor**: Xử lý và phân tích hình ảnh cơ bản
3. **ProductImageProcessor**: Chuyên biệt cho hình ảnh sản phẩm

## 🔍 Image Search Engine

### **Các Nguồn Tìm Kiếm**

#### **Google Custom Search**
```javascript
const searchEngine = new ImageSearchEngine({
  googleApiKey: 'YOUR_GOOGLE_API_KEY',
  searchEngineId: 'YOUR_SEARCH_ENGINE_ID'
});

const results = await searchEngine.searchImages('product photography', {
  maxResults: 10,
  imageType: 'photo',
  safeSearch: 'off'
});
```

#### **Bing Image Search**
```javascript
const searchEngine = new ImageSearchEngine({
  bingApiKey: 'YOUR_BING_API_KEY'
});

const results = await searchEngine.searchImages('fashion products', {
  maxResults: 15,
  size: 'Medium',
  color: 'Color'
});
```

#### **Unsplash API**
```javascript
const searchEngine = new ImageSearchEngine({
  unsplashApiKey: 'YOUR_UNSPLASH_API_KEY'
});

const results = await searchEngine.searchImages('modern furniture', {
  maxResults: 20,
  orientation: 'landscape'
});
```

### **Kết Quả Tìm Kiếm**

```javascript
{
  query: "product photography",
  totalResults: 15,
  images: [
    {
      url: "https://example.com/image1.jpg",
      thumbnail: "https://example.com/thumb1.jpg",
      title: "Professional Product Shot",
      source: "google",
      width: 1920,
      height: 1080,
      size: 245760,
      contextUrl: "https://example.com/page",
      fileSize: "240.0 KB"
    }
  ],
  sources: ["google", "bing"],
  metadata: {
    searchTime: 1250,
    processingTime: 0,
    errors: []
  }
}
```

## 🛠️ Image Processor

### **Basic Processing**

```javascript
const processor = new ImageProcessor({
  maxImageSize: 1024,
  compressionQuality: 0.8,
  enableResize: true,
  enableCompress: true,
  enableEnhance: true,
  enableAnalyze: true
});

const result = await processor.processImage(imageUrl, {
  targetSize: { width: 800, height: 600 },
  quality: 0.7,
  enhancement: {
    brightness: 110,
    contrast: 105,
    saturation: 110
  }
});
```

### **Image Analysis**

```javascript
// Color Analysis
{
  average: { r: 128, g: 128, b: 128 },
  dominant: [
    { r: 200, g: 150, b: 100, hex: "#c89664" }
  ],
  brightness: {
    average: 0.5,
    bright: 0.3,
    dark: 0.2
  },
  saturation: 0.6
}

// Edge Detection
{
  edgeCount: 15000,
  edgeDensity: 0.05,
  averageStrength: 45.2,
  hasStrongEdges: true
}

// Quality Assessment
{
  score: {
    overall: 85.5,
    resolution: 90.0,
    clarity: 80.0,
    color: 85.0
  },
  grade: "Good",
  recommendations: []
}
```

## 🛍️ Product Image Processor

### **Product-Specific Analysis**

```javascript
const productProcessor = new ProductImageProcessor({
  enableBackgroundRemoval: true,
  enableWatermarkDetection: true,
  enableProductClassification: true
});

const result = await productProcessor.processProductImage(
  imageUrl, 
  'electronics'
);
```

### **Product Classification**

```javascript
{
  category: "electronics",
  suitability: {
    score: { overall: 85, lighting: 90, background: 80, focus: 85 },
    grade: "Good",
    isSuitable: true
  },
  background: {
    isUniform: true,
    isLight: true,
    recommendation: "Background looks good"
  },
  lighting: {
    isWellLit: true,
    colorTemperature: "neutral",
    recommendation: "Lighting looks good"
  },
  composition: {
    isCentered: false,
    followsRuleOfThirds: true,
    hasGoodFocus: true,
    recommendation: "Composition looks good"
  },
  marketability: {
    score: 88.5,
    grade: "Good",
    is Marketable: true,
    potentialIssues: [],
    improvements: []
  }
}
```

## 🔗 Integration với 100-Layer System

### **Layer Integration**

```javascript
// Thêm vào layer-implementation-code.js
class ImageSearchLayer extends ContentProcessor {
  constructor(config) {
    super(config);
    this.searchEngine = new ImageSearchEngine(config.imageSearch);
    this.imageProcessor = new ProductImageProcessor(config.imageProcessing);
  }

  async processData(data) {
    if (data.type === 'image_search') {
      // Tìm kiếm hình ảnh
      const searchResults = await this.searchEngine.searchImages(
        data.query, 
        data.options
      );
      
      // Xử lý top images
      const processedImages = [];
      for (const image of searchResults.images.slice(0, 3)) {
        try {
          const processed = await this.imageProcessor.processProductImage(
            image.url,
            data.productCategory
          );
          processedImages.push({
            original: image,
            processed: processed,
            suitable: processed.productAnalysis.suitability.isSuitable
          });
        } catch (error) {
          console.error(`Failed to process image: ${error.message}`);
        }
      }

      return {
        processed: true,
        searchResults: searchResults,
        processedImages: processedImages,
        recommendations: this.generateImageRecommendations(processedImages)
      };
    }

    return await super.processData(data);
  }

  generateImageRecommendations(processedImages) {
    const recommendations = [];
    const suitableImages = processedImages.filter(img => img.suitable);
    
    if (suitableImages.length === 0) {
      recommendations.push('No suitable images found - consider different search terms');
    } else if (suitableImages.length < processedImages.length) {
      recommendations.push('Some images need improvement for product use');
    } else {
      recommendations.push('All images are suitable for product display');
    }

    return recommendations;
  }
}
```

### **Layer Configuration**

```javascript
// Cập nhật getLayerConfig trong layer-implementation-code.js
getLayerConfig(layerId) {
  if (layerId >= 1 && layerId <= 15) {
    // Nhóm tìm kiếm thông tin - với image search
    return {
      processing: { 
        processorType: 'imagesearch',
        imageSearch: {
          maxResults: 10,
          enableGoogle: true,
          enableBing: true,
          enableUnsplash: true
        },
        imageProcessing: {
          maxImageSize: 800,
          compressionQuality: 0.8,
          enableProductAnalysis: true
        }
      },
      validation: { qualityThresholds: { accuracy: 0.90, relevance: 0.85 } },
      maxRetries: 2
    };
  }
  // ... other layer configs
}
```

## 📊 Workflow Integration

### **Complete Workflow**

```javascript
async function processProductWithImages(productInfo) {
  const pipeline = new PipelineManager();
  
  // Step 1: Search for product images
  const searchLayer = new ImageSearchLayer({
    imageSearch: { maxResults: 5 },
    imageProcessing: { enableProductAnalysis: true }
  });
  
  const searchResult = await searchLayer.processData({
    type: 'image_search',
    query: `${productInfo.name} product photography`,
    productCategory: productInfo.category,
    options: {
      imageType: 'photo',
      safeSearch: 'off'
    }
  });
  
  // Step 2: Process and filter images
  const suitableImages = searchResult.processedImages.filter(img => img.suitable);
  
  // Step 3: Generate content with images
  const contentLayer = new ContentCreationLayer();
  const contentResult = await contentLayer.processData({
    productInfo: productInfo,
    images: suitableImages,
    contentType: 'product_description'
  });
  
  return {
    images: suitableImages,
    content: contentResult,
    recommendations: searchResult.recommendations
  };
}
```

## 🎯 Use Cases

### **1. E-commerce Product Catalog**
```javascript
// Tự động tìm và xử lý hình ảnh sản phẩm
const result = await processProductWithImages({
  name: 'Wireless Headphones',
  category: 'electronics',
  description: 'Premium noise-cancelling headphones'
});
```

### **2. Content Creation**
```javascript
// Tạo nội dung với hình ảnh phù hợp
const contentWithImages = await createContentWithImages({
  topic: 'Modern Home Decor',
  imageRequirements: {
    count: 5,
    style: 'professional',
    background: 'white'
  }
});
```

### **3. Quality Assurance**
```javascript
// Kiểm tra chất lượng hình ảnh sản phẩm
const qualityCheck = await checkImageQuality(imageUrl, {
  category: 'fashion',
  requirements: {
    minResolution: 1000,
    uniformBackground: true,
    goodLighting: true
  }
});
```

## ⚙️ Configuration Options

### **Search Engine Configuration**
```javascript
{
  searchEngines: {
    google: { enabled: true, maxResults: 10 },
    bing: { enabled: true, maxResults: 10 },
    unsplash: { enabled: true, maxResults: 5 }
  },
  imageFormats: ['jpg', 'jpeg', 'png', 'webp'],
  minImageSize: { width: 200, height: 200 },
  maxImageSize: { width: 4096, height: 4096 }
}
```

### **Processing Configuration**
```javascript
{
  maxImageSize: 1024,
  compressionQuality: 0.8,
  enableResize: true,
  enableCompress: true,
  enableEnhance: true,
  enableAnalyze: true,
  processingOptions: {
    backgroundRemoval: true,
    watermarkDetection: true,
    productClassification: true
  }
}
```

## 🚀 Performance Optimization

### **Caching Strategy**
```javascript
class CachedImageProcessor extends ProductImageProcessor {
  constructor(config) {
    super(config);
    this.cache = new Map();
  }

  async processProductImage(imageUrl, category) {
    const cacheKey = `${imageUrl}_${category}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const result = await super.processProductImage(imageUrl, category);
    this.cache.set(cacheKey, result);
    
    return result;
  }
}
```

### **Batch Processing**
```javascript
async function batchProcessImages(imageUrls, category) {
  const processor = new ProductImageProcessor();
  const results = [];
  
  // Process in parallel with concurrency limit
  const concurrency = 3;
  for (let i = 0; i < imageUrls.length; i += concurrency) {
    const batch = imageUrls.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map(url => processor.processProductImage(url, category))
    );
    
    results.push(...batchResults);
  }
  
  return results;
}
```

## 📋 API Reference

### **ImageSearchEngine Methods**
- `searchImages(query, options)` - Search for images
- `searchGoogleImages(query, options)` - Google-specific search
- `searchBingImages(query, options)` - Bing-specific search
- `searchUnsplashImages(query, options)` - Unsplash-specific search

### **ImageProcessor Methods**
- `processImage(imageUrl, options)` - Process single image
- `loadImage(url)` - Load image from URL
- `resizeImage(image, targetSize)` - Resize image
- `compressImage(image, quality)` - Compress image
- `enhanceImage(image, options)` - Enhance image
- `analyzeImage(image)` - Analyze image

### **ProductImageProcessor Methods**
- `processProductImage(imageUrl, category)` - Process product image
- `analyzeProductImage(imageUrl, category)` - Analyze product-specific features
- `classifyProductCategory(analysis)` - Classify product type
- `assessProductSuitability(analysis)` - Assess suitability for product use

## 🔧 Troubleshooting

### **Common Issues**

1. **API Key Errors**
   ```javascript
   // Check API keys are properly configured
   if (!searchEngine.config.searchEngines.google.apiKey) {
     console.error('Google API key not configured');
   }
   ```

2. **Image Loading Failures**
   ```javascript
   // Handle CORS issues
   const image = await loadImageWithFallback(url, fallbackUrl);
   ```

3. **Memory Issues**
   ```javascript
   // Reduce image size for processing
   const processor = new ImageProcessor({ maxImageSize: 512 });
   ```

### **Error Handling**
```javascript
try {
  const result = await processor.processImage(imageUrl);
} catch (error) {
  if (error.message.includes('Failed to load image')) {
    // Try alternative image source
    const fallbackResult = await processor.processImage(fallbackUrl);
  } else {
    console.error('Processing failed:', error);
  }
}
```

---

**Lưu ý**: Hệ thống này yêu cầu các API keys cho các dịch vụ tìm kiếm hình ảnh. Hãy đảm bảo cấu hình đúng các environment variables trước khi sử dụng.
