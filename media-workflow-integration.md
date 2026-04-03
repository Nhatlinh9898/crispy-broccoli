# Media Workflow Integration Guide
# Hướng dẫn tích hợp workflow xử lý media

## 📁 Tổng Quan Hệ Thống Media

Hệ thống quản lý media hỗ trợ 2 nguồn chính:

### **1. System Data (Data hệ thống)**
- **Pre-existing media**: Hình ảnh/video có sẵn trong hệ thống
- **Organized storage**: Được lưu trữ có cấu trúc
- **Auto-processed**: Đã được xử lý và phân tích
- **High quality**: Thường là media chất lượng cao

### **2. User Data (Người dùng cung cấp)**
- **User uploads**: Người dùng tải lên
- **Validation**: Kiểm tra định dạng và kích thước
- **Processing queue**: Xử lý theo hàng đợi
- **Quality assessment**: Đánh giá chất lượng

## 🔄 Workflow Integration

### **Complete Media Workflow**

```javascript
// 1. Khởi tạo Media Manager
const mediaManager = new MediaDataManager({
  systemDataPath: './data/system/media/',
  userDataPath: './data/user/media/',
  maxImageSize: 10 * 1024 * 1024, // 10MB
  maxVideoSize: 100 * 1024 * 1024, // 100MB
  generateThumbnails: true,
  analyzeContent: true
});

await mediaManager.initialize();

// 2. Xử lý media từ hệ thống
const systemMedia = mediaManager.getMediaBySource('system');
console.log(`Found ${systemMedia.length} system media files`);

// 3. Xử lý media từ người dùng
const userUpload = await handleUserUpload(fileObject);
const userMedia = await mediaManager.addUserMedia(userUpload);

// 4. Tìm kiếm và lọc media
const searchResults = mediaManager.searchMedia('product', {
  type: 'image',
  minSize: 100000,
  processedOnly: true
});

// 5. Tích hợp vào 100-layer system
const processedMedia = await integrateWithLayers(searchResults.media);
```

## 🏢 System Data Handling

### **Characteristics**
```javascript
// System media properties
const systemMedia = {
  id: 'system_1640995200000_product_image.jpg',
  filename: 'product_image.jpg',
  source: 'system',
  type: 'image',
  format: 'jpg',
  size: 2048576,
  path: './data/system/media/product_image.jpg',
  processed: true,
  thumbnails: [
    { size: 150, url: 'thumb_150.jpg', width: 150, height: 100 },
    { size: 300, url: 'thumb_300.jpg', width: 300, height: 200 }
  ],
  analysis: {
    quality: { score: 85, grade: 'good' },
    features: ['landscape', 'high_resolution'],
    tags: ['jpg', 'system_provided', 'large_file']
  },
  metadata: {
    width: 1920,
    height: 1080,
    format: 'jpg'
  }
};
```

### **Advantages**
- ✅ **Ready to use**: Đã được xử lý sẵn
- ✅ **High quality**: Được kiểm duyệt chất lượng
- ✅ **Optimized**: Có thumbnails và analysis
- ✅ **Reliable**: Nguồn ổn định, không thay đổi

### **Integration Pattern**
```javascript
class SystemMediaLayer extends ContentProcessor {
  constructor(config) {
    super(config);
    this.mediaManager = new MediaDataManager(config.media);
  }

  async processData(data) {
    if (data.useSystemMedia) {
      // Lấy media từ hệ thống
      const systemMedia = this.mediaManager.getMediaBySource('system');
      
      // Lọc theo yêu cầu
      const filteredMedia = systemMedia.filter(media => {
        return media.type === data.mediaType &&
               media.processed &&
               media.analysis.quality.score >= data.minQuality;
      });

      return {
        processed: true,
        mediaSource: 'system',
        media: filteredMedia,
        count: filteredMedia.length,
        readyToUse: true
      };
    }

    return await super.processData(data);
  }
}
```

## 👤 User Data Handling

### **Upload Process**
```javascript
// 1. File validation
const validation = mediaManager.validateMediaFile(file);
if (!validation.valid) {
  throw new Error(validation.error);
}

// 2. Add to system
const mediaInfo = await mediaManager.addUserMedia(file, {
  uploadedBy: 'user_123',
  category: 'product_media',
  tags: ['user_upload', 'pending_review']
});

// 3. Processing queue
console.log(`Media ${mediaInfo.id} queued for processing`);

// 4. Monitor processing status
const checkStatus = async (mediaId) => {
  const media = mediaManager.getMedia(mediaId);
  return {
    processed: media.processed,
    thumbnails: media.thumbnails,
    analysis: media.analysis
  };
};
```

### **User Media Properties**
```javascript
const userMedia = {
  id: 'user_1640995200000_my_photo.jpg',
  filename: 'my_photo.jpg',
  source: 'user',
  type: 'image',
  format: 'jpg',
  size: 3145728,
  uploadedAt: 1640995200000,
  processed: false, // Initially false
  thumbnails: [], // Populated after processing
  analysis: null, // Populated after processing
  metadata: {
    uploadedBy: 'user_123',
    category: 'product_media'
  }
};
```

### **Processing Pipeline**
```javascript
// Processing stages for user media
const processingStages = [
  { stage: 'validation', duration: 100 },
  { stage: 'storage', duration: 500 },
  { stage: 'thumbnail_generation', duration: 1000 },
  { stage: 'content_analysis', duration: 2000 },
  { stage: 'quality_assessment', duration: 500 }
];

// Total processing time: ~3.7 seconds
```

## 🔗 Integration với 100-Layer System

### **Layer Configuration**
```javascript
// Cập nhật layer config để hỗ trợ media
getLayerConfig(layerId) {
  if (layerId >= 1 && layerId <= 15) {
    // Media search and processing layers
    return {
      processing: { 
        processorType: 'media',
        mediaConfig: {
          systemDataPath: './data/system/media/',
          userDataPath: './data/user/media/',
          enableSystemMedia: true,
          enableUserUploads: true,
          generateThumbnails: true,
          analyzeContent: true,
          maxImageSize: 10 * 1024 * 1024,
          maxVideoSize: 100 * 1024 * 1024
        }
      },
      validation: { 
        qualityThresholds: { 
          minQuality: 70,
          requireProcessed: true 
        } 
      },
      maxRetries: 2
    };
  }
  // ... other configs
}
```

### **Media Processing Layer**
```javascript
class MediaProcessingLayer extends ContentProcessor {
  constructor(config) {
    super(config);
    this.mediaManager = new MediaDataManager(config.mediaConfig);
  }

  async processData(data) {
    const result = {
      processed: false,
      media: [],
      sources: [],
      recommendations: []
    };

    // 1. Process system media
    if (data.includeSystemMedia) {
      const systemMedia = await this.processSystemMedia(data);
      result.media.push(...systemMedia);
      result.sources.push('system');
    }

    // 2. Process user uploads
    if (data.userUploads && data.userUploads.length > 0) {
      const userMedia = await this.processUserUploads(data.userUploads);
      result.media.push(...userMedia);
      result.sources.push('user');
    }

    // 3. Filter and rank media
    result.media = this.filterAndRankMedia(result.media, data.requirements);

    // 4. Generate recommendations
    result.recommendations = this.generateMediaRecommendations(result.media, data);

    result.processed = true;
    return result;
  }

  async processSystemMedia(data) {
    const systemMedia = this.mediaManager.getMediaBySource('system');
    
    return systemMedia.filter(media => {
      // Apply filters
      if (data.mediaType && media.type !== data.mediaType) return false;
      if (data.minQuality && media.analysis.quality.score < data.minQuality) return false;
      if (data.processedOnly && !media.processed) return false;
      
      return true;
    });
  }

  async processUserUploads(uploads) {
    const processedMedia = [];

    for (const upload of uploads) {
      try {
        // Validate and add upload
        const mediaInfo = await this.mediaManager.addUserMedia(upload, {
          uploadedBy: upload.userId,
          category: upload.category
        });

        // Wait for processing if needed
        if (upload.waitForProcessing) {
          await this.waitForProcessing(mediaInfo.id);
        }

        processedMedia.push(mediaInfo);
      } catch (error) {
        console.error(`Failed to process upload ${upload.name}:`, error);
      }
    }

    return processedMedia;
  }

  async waitForProcessing(mediaId, timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const media = this.mediaManager.getMedia(mediaId);
      if (media.processed) return media;
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    throw new Error(`Processing timeout for media ${mediaId}`);
  }

  filterAndRankMedia(media, requirements) {
    let filtered = [...media];

    // Apply filters
    if (requirements.minQuality) {
      filtered = filtered.filter(m => 
        m.analysis && m.analysis.quality.score >= requirements.minQuality
      );
    }

    if (requirements.features) {
      filtered = filtered.filter(m => 
        requirements.features.every(feature => 
          m.analysis.features.includes(feature)
        )
      );
    }

    if (requirements.maxSize) {
      filtered = filtered.filter(m => m.size <= requirements.maxSize);
    }

    // Rank by quality score
    filtered.sort((a, b) => {
      const scoreA = a.analysis?.quality?.score || 0;
      const scoreB = b.analysis?.quality?.score || 0;
      return scoreB - scoreA;
    });

    return filtered;
  }

  generateMediaRecommendations(media, requirements) {
    const recommendations = [];

    if (media.length === 0) {
      recommendations.push('No suitable media found - consider adjusting requirements');
      return recommendations;
    }

    const highQualityMedia = media.filter(m => 
      m.analysis && m.analysis.quality.score >= 80
    );

    if (highQualityMedia.length === 0) {
      recommendations.push('Consider improving image quality for better results');
    }

    const unprocessedMedia = media.filter(m => !m.processed);
    if (unprocessedMedia.length > 0) {
      recommendations.push(`${unprocessedMedia.length} files still processing`);
    }

    if (media.length < requirements.minCount) {
      recommendations.push(`Need ${requirements.minCount - media.length} more media files`);
    }

    return recommendations;
  }
}
```

## 📊 Use Cases và Scenarios

### **Scenario 1: E-commerce Product Catalog**
```javascript
// Tạo catalog sản phẩm với mixed media sources
async function createProductCatalog(productInfo) {
  const mediaLayer = new MediaProcessingLayer({
    mediaConfig: {
      systemDataPath: './data/system/products/',
      userDataPath: './data/user/uploads/'
    }
  });

  const result = await mediaLayer.processData({
    includeSystemMedia: true,
    userUploads: productInfo.userImages || [],
    requirements: {
      mediaType: 'image',
      minQuality: 75,
      processedOnly: true,
      minCount: 3,
      features: ['high_resolution', 'landscape']
    }
  });

  return {
    product: productInfo,
    media: result.media,
    recommendations: result.recommendations,
    readyForCatalog: result.media.length >= 3
  };
}
```

### **Scenario 2: Content Generation with Media**
```javascript
// Tạo nội dung với media từ nhiều nguồn
async function generateContentWithMedia(topic, userFiles = []) {
  const mediaLayer = new MediaProcessingLayer();
  
  // Get relevant media
  const mediaResult = await mediaLayer.processData({
    includeSystemMedia: true,
    userUploads: userFiles,
    requirements: {
      mediaType: 'image',
      minQuality: 70,
      features: ['professional']
    }
  });

  // Generate content
  const contentLayer = new ContentCreationLayer();
  const content = await contentLayer.processData({
    topic: topic,
    media: mediaResult.media,
    includeMedia: true
  });

  return {
    content: content,
    media: mediaResult.media,
    recommendations: [
      ...mediaResult.recommendations,
      ...content.recommendations
    ]
  };
}
```

### **Scenario 3: Media Quality Control**
```javascript
// Quality control workflow
async function qualityControlWorkflow(mediaId) {
  const mediaManager = new MediaDataManager();
  await mediaManager.initialize();

  const media = mediaManager.getMedia(mediaId);
  
  const qualityReport = {
    mediaId: mediaId,
    filename: media.filename,
    source: media.source,
    quality: media.analysis?.quality || { score: 0, grade: 'unknown' },
    issues: [],
    recommendations: [],
    approved: false
  };

  // Quality checks
  if (media.analysis?.quality.score < 70) {
    qualityReport.issues.push('Low quality score');
    qualityReport.recommendations.push('Improve image resolution or clarity');
  }

  if (!media.processed) {
    qualityReport.issues.push('Not yet processed');
    qualityReport.recommendations.push('Wait for processing to complete');
  }

  if (media.size > 10 * 1024 * 1024) {
    qualityReport.issues.push('Large file size');
    qualityReport.recommendations.push('Compress image for better performance');
  }

  // Approval decision
  qualityReport.approved = qualityReport.issues.length === 0 && 
                         media.analysis?.quality.score >= 70;

  return qualityReport;
}
```

## ⚙️ Configuration Best Practices

### **System Media Setup**
```javascript
const systemConfig = {
  systemDataPath: './data/system/media/',
  // Pre-organized, high-quality media
  supportedFormats: {
    images: ['jpg', 'png', 'webp'],
    videos: ['mp4', 'webm']
  },
  // Higher limits for system media
  maxFileSize: {
    image: 50 * 1024 * 1024, // 50MB
    video: 500 * 1024 * 1024 // 500MB
  },
  processingOptions: {
    generateThumbnails: true,
    analyzeContent: true,
    optimizeStorage: true
  }
};
```

### **User Media Setup**
```javascript
const userConfig = {
  userDataPath: './data/user/media/',
  // Stricter validation for user uploads
  supportedFormats: {
    images: ['jpg', 'jpeg', 'png', 'webp'],
    videos: ['mp4', 'webm', 'mov']
  },
  // Conservative limits for user uploads
  maxFileSize: {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024 // 100MB
  },
  processingOptions: {
    generateThumbnails: true,
    analyzeContent: true,
    extractFrames: true
  }
};
```

## 🔧 Performance Optimization

### **Caching Strategy**
```javascript
class CachedMediaManager extends MediaDataManager {
  constructor(config) {
    super(config);
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async getMedia(mediaId) {
    const cacheKey = `media_${mediaId}`;
    const cached = this.cache.get(cacheKey);

    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }

    const media = await super.getMedia(mediaId);
    this.cache.set(cacheKey, {
      data: media,
      timestamp: Date.now()
    });

    return media;
  }
}
```

### **Batch Processing**
```javascript
// Process multiple user uploads efficiently
async function batchProcessUserUploads(files, options = {}) {
  const mediaManager = new MediaDataManager(options);
  await mediaManager.initialize();

  const results = [];
  const concurrency = 3; // Process 3 files at a time

  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    const batchPromises = batch.map(file => 
      mediaManager.addUserMedia(file, options.metadata)
        .catch(error => ({ error: error.message, file: file.name }))
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}
```

## 📋 API Reference

### **MediaDataManager Methods**
- `initialize()` - Khởi tạo hệ thống
- `addUserMedia(file, metadata)` - Thêm media từ người dùng
- `getMedia(mediaId)` - Lấy media theo ID
- `searchMedia(query, options)` - Tìm kiếm media
- `getMediaBySource(source)` - Lấy media theo nguồn
- `deleteMedia(mediaId)` - Xóa media
- `exportMediaData()` - Export dữ liệu media
- `importMediaData(data)` - Import dữ liệu media

### **Media Properties**
- `id` - Unique identifier
- `filename` - Tên file gốc
- `source` - 'system' hoặc 'user'
- `type` - 'image' hoặc 'video'
- `format` - Định dạng file
- `size` - Kích thước file (bytes)
- `processed` - Đã xử lý chưa
- `thumbnails` - Danh sách thumbnails
- `analysis` - Kết quả phân tích
- `metadata` - Metadata bổ sung

---

**Lưu ý**: Hệ thống này được thiết kế để xử lý hiệu quả cả media có sẵn trong hệ thống và media do người dùng tải lên, với quy trình xử lý tự động và kiểm soát chất lượng.
