// Media Data Manager
// Quản lý hình ảnh và video từ data hệ thống và người dùng

class MediaDataManager {
  constructor(config = {}) {
    this.config = {
      storagePaths: {
        systemData: config.systemDataPath || './data/system/media/',
        userData: config.userDataPath || './data/user/media/',
        temp: config.tempPath || './data/temp/media/',
        processed: config.processedPath || './data/processed/media/'
      },
      supportedFormats: {
        images: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg'],
        videos: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv']
      },
      maxFileSize: {
        image: config.maxImageSize || 50 * 1024 * 1024, // 50MB
        video: config.maxVideoSize || 500 * 1024 * 1024 // 500MB
      },
      processingOptions: {
        generateThumbnails: config.generateThumbnails !== false,
        extractFrames: config.extractFrames !== false,
        analyzeContent: config.analyzeContent !== false,
        optimizeStorage: config.optimizeStorage !== false
      }
    };
    
    this.mediaIndex = new Map(); // Index of all media files
    this.processingQueue = [];
    this.isProcessing = false;
  }

  // Initialize media manager
  async initialize() {
    console.log('🗂️ Initializing Media Data Manager...');
    
    // Create directories if they don't exist
    await this.ensureDirectories();
    
    // Scan existing media files
    await this.scanSystemMedia();
    await this.scanUserMedia();
    
    // Build index
    await this.buildMediaIndex();
    
    console.log(`📊 Media Index Built: ${this.mediaIndex.size} files`);
    return this.getMediaStatistics();
  }

  // Ensure directories exist
  async ensureDirectories() {
    const paths = Object.values(this.config.storagePaths);
    
    for (const path of paths) {
      try {
        // In browser environment, we'll use IndexedDB or localStorage
        if (typeof window !== 'undefined') {
          this.initializeBrowserStorage(path);
        } else {
          // Node.js environment - create directories
          await this.createDirectory(path);
        }
      } catch (error) {
        console.warn(`Warning: Could not create directory ${path}:`, error.message);
      }
    }
  }

  // Initialize browser storage (IndexedDB simulation)
  initializeBrowserStorage(path) {
    const storageKey = `media_${path.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify({}));
    }
    
    return storageKey;
  }

  // Scan system media files
  async scanSystemMedia() {
    console.log('🔍 Scanning system media files...');
    
    const systemFiles = await this.getFilesFromPath(this.config.storagePaths.systemData);
    
    for (const file of systemFiles) {
      const mediaInfo = await this.analyzeMediaFile(file, 'system');
      if (mediaInfo) {
        this.mediaIndex.set(mediaInfo.id, mediaInfo);
      }
    }
    
    console.log(`📁 Found ${systemFiles.length} system media files`);
  }

  // Scan user media files
  async scanUserMedia() {
    console.log('👤 Scanning user media files...');
    
    const userFiles = await this.getFilesFromPath(this.config.storagePaths.userData);
    
    for (const file of userFiles) {
      const mediaInfo = await this.analyzeMediaFile(file, 'user');
      if (mediaInfo) {
        this.mediaIndex.set(mediaInfo.id, mediaInfo);
      }
    }
    
    console.log(`📁 Found ${userFiles.length} user media files`);
  }

  // Get files from path (browser simulation)
  async getFilesFromPath(path) {
    // In browser environment, simulate file listing
    if (typeof window !== 'undefined') {
      return this.getBrowserFiles(path);
    }
    
    // Node.js environment - actual file system access
    return this.getNodeFiles(path);
  }

  // Browser file simulation
  getBrowserFiles(path) {
    const storageKey = this.initializeBrowserStorage(path);
    const stored = localStorage.getItem(storageKey);
    const data = JSON.parse(stored || '{}');
    
    return Object.keys(data).map(filename => ({
      name: filename,
      path: path + filename,
      size: data[filename].size || 0,
      type: data[filename].type || 'unknown',
      lastModified: data[filename].lastModified || Date.now()
    }));
  }

  // Node.js file system access
  async getNodeFiles(path) {
    // This would use fs.readdir in actual Node.js environment
    // For now, return empty array as simulation
    return [];
  }

  // Analyze media file
  async analyzeMediaFile(file, source) {
    try {
      const extension = this.getFileExtension(file.name);
      const mediaType = this.getMediaType(extension);
      
      if (!mediaType) {
        return null; // Unsupported format
      }

      const mediaInfo = {
        id: this.generateMediaId(file, source),
        filename: file.name,
        path: file.path,
        source: source,
        type: mediaType,
        format: extension,
        size: file.size,
        lastModified: file.lastModified,
        metadata: {},
        processed: false,
        thumbnails: [],
        analysis: null
      };

      // Extract basic metadata
      if (mediaType === 'image') {
        mediaInfo.metadata = await this.extractImageMetadata(file);
      } else if (mediaType === 'video') {
        mediaInfo.metadata = await this.extractVideoMetadata(file);
      }

      return mediaInfo;
    } catch (error) {
      console.error(`Error analyzing file ${file.name}:`, error);
      return null;
    }
  }

  // Extract image metadata
  async extractImageMetadata(file) {
    const metadata = {
      width: 0,
      height: 0,
      format: this.getFileExtension(file.name),
      colorSpace: 'unknown',
      hasAlpha: false,
      orientation: 1
    };

    // In browser environment, we can load the image to get dimensions
    if (typeof window !== 'undefined' && file.path) {
      try {
        const dimensions = await this.getImageDimensions(file.path);
        metadata.width = dimensions.width;
        metadata.height = dimensions.height;
      } catch (error) {
        console.warn(`Could not get image dimensions for ${file.name}`);
      }
    }

    return metadata;
  }

  // Extract video metadata
  async extractVideoMetadata(file) {
    const metadata = {
      width: 0,
      height: 0,
      duration: 0,
      format: this.getFileExtension(file.name),
      frameRate: 0,
      bitrate: 0,
      hasAudio: false
    };

    // Video metadata extraction would require video processing library
    // For now, return basic metadata
    return metadata;
  }

  // Get image dimensions
  async getImageDimensions(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = imageUrl;
    });
  }

  // Generate unique media ID
  generateMediaId(file, source) {
    const timestamp = Date.now();
    const filename = file.name.replace(/[^a-zA-Z0-9]/g, '_');
    return `${source}_${timestamp}_${filename}`;
  }

  // Get file extension
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  // Get media type from extension
  getMediaType(extension) {
    if (this.config.supportedFormats.images.includes(extension)) {
      return 'image';
    } else if (this.config.supportedFormats.videos.includes(extension)) {
      return 'video';
    }
    return null;
  }

  // Build media index
  async buildMediaIndex() {
    // Index is already built during scanning
    console.log('📊 Media index built successfully');
  }

  // Get media statistics
  getMediaStatistics() {
    const stats = {
      totalFiles: this.mediaIndex.size,
      images: 0,
      videos: 0,
      systemFiles: 0,
      userFiles: 0,
      totalSize: 0,
      processedFiles: 0
    };

    this.mediaIndex.forEach(media => {
      if (media.type === 'image') stats.images++;
      else if (media.type === 'video') stats.videos++;
      
      if (media.source === 'system') stats.systemFiles++;
      else if (media.source === 'user') stats.userFiles++;
      
      stats.totalSize += media.size || 0;
      if (media.processed) stats.processedFiles++;
    });

    return stats;
  }

  // Add user-uploaded media
  async addUserMedia(file, metadata = {}) {
    try {
      // Validate file
      const validation = this.validateMediaFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Generate unique ID and path
      const mediaId = this.generateMediaId(file, 'user');
      const filePath = `${this.config.storagePaths.userData}${mediaId}.${this.getFileExtension(file.name)}`;

      // Create media info object
      const mediaInfo = {
        id: mediaId,
        filename: file.name,
        path: filePath,
        source: 'user',
        type: validation.type,
        format: this.getFileExtension(file.name),
        size: file.size,
        lastModified: Date.now(),
        metadata: { ...metadata },
        processed: false,
        thumbnails: [],
        analysis: null,
        uploadedAt: Date.now()
      };

      // Store file (in browser, this would be IndexedDB or similar)
      await this.storeMediaFile(file, filePath);

      // Add to index
      this.mediaIndex.set(mediaId, mediaInfo);

      // Queue for processing
      if (this.config.processingOptions.generateThumbnails || 
          this.config.processingOptions.analyzeContent) {
        this.queueForProcessing(mediaId);
      }

      console.log(`✅ Added user media: ${file.name} (${mediaId})`);
      return mediaInfo;

    } catch (error) {
      console.error(`Error adding user media ${file.name}:`, error);
      throw error;
    }
  }

  // Validate media file
  validateMediaFile(file) {
    const extension = this.getFileExtension(file.name);
    const mediaType = this.getMediaType(extension);

    if (!mediaType) {
      return { valid: false, error: `Unsupported file format: ${extension}` };
    }

    const maxSize = mediaType === 'image' ? 
      this.config.maxFileSize.image : 
      this.config.maxFileSize.video;

    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: `File too large: ${file.size} bytes (max: ${maxSize} bytes)` 
      };
    }

    return { valid: true, type: mediaType };
  }

  // Store media file
  async storeMediaFile(file, path) {
    // In browser environment, store in IndexedDB or localStorage
    if (typeof window !== 'undefined') {
      return this.storeBrowserFile(file, path);
    }
    
    // Node.js environment - write to file system
    return this.storeNodeFile(file, path);
  }

  // Browser file storage
  async storeBrowserFile(file, path) {
    const storageKey = this.initializeBrowserStorage(path);
    const stored = localStorage.getItem(storageKey);
    const data = JSON.parse(stored || '{}');
    
    // Convert file to base64 for storage (simplified approach)
    const base64 = await this.fileToBase64(file);
    
    data[file.name] = {
      data: base64,
      size: file.size,
      type: file.type,
      lastModified: Date.now()
    };
    
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // Convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Queue media for processing
  queueForProcessing(mediaId) {
    this.processingQueue.push({
      mediaId: mediaId,
      queuedAt: Date.now(),
      status: 'queued'
    });

    // Start processing if not already running
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process media queue
  async processQueue() {
    if (this.isProcessing || this.processingQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log('⚙️ Processing media queue...');

    while (this.processingQueue.length > 0) {
      const item = this.processingQueue.shift();
      const media = this.mediaIndex.get(item.mediaId);

      if (media && !media.processed) {
        try {
          await this.processMedia(media);
          media.processed = true;
          console.log(`✅ Processed media: ${media.filename}`);
        } catch (error) {
          console.error(`❌ Failed to process media ${media.filename}:`, error);
        }
      }
    }

    this.isProcessing = false;
    console.log('🏁 Media processing queue completed');
  }

  // Process individual media
  async processMedia(media) {
    const processingTasks = [];

    // Generate thumbnails
    if (this.config.processingOptions.generateThumbnails) {
      processingTasks.push(this.generateThumbnails(media));
    }

    // Extract frames (for videos)
    if (media.type === 'video' && this.config.processingOptions.extractFrames) {
      processingTasks.push(this.extractVideoFrames(media));
    }

    // Analyze content
    if (this.config.processingOptions.analyzeContent) {
      processingTasks.push(this.analyzeMediaContent(media));
    }

    // Wait for all processing tasks to complete
    const results = await Promise.allSettled(processingTasks);

    // Update media with processing results
    if (results[0]?.status === 'fulfilled') {
      media.thumbnails = results[0].value;
    }

    if (media.type === 'video' && results[1]?.status === 'fulfilled') {
      media.frames = results[1].value;
    }

    if (results[results.length - 1]?.status === 'fulfilled') {
      media.analysis = results[results.length - 1].value;
    }
  }

  // Generate thumbnails
  async generateThumbnails(media) {
    const thumbnails = [];

    if (media.type === 'image') {
      // Generate image thumbnails
      const sizes = [150, 300, 600];
      
      for (const size of sizes) {
        try {
          const thumbnail = await this.createImageThumbnail(media, size);
          thumbnails.push({
            size: size,
            url: thumbnail.url,
            width: thumbnail.width,
            height: thumbnail.height
          });
        } catch (error) {
          console.warn(`Failed to generate ${size}px thumbnail for ${media.filename}`);
        }
      }
    } else if (media.type === 'video') {
      // Generate video thumbnails (extract frame)
      try {
        const thumbnail = await this.extractVideoThumbnail(media);
        thumbnails.push({
          size: 300,
          url: thumbnail.url,
          width: thumbnail.width,
          height: thumbnail.height,
          timestamp: thumbnail.timestamp
        });
      } catch (error) {
        console.warn(`Failed to generate thumbnail for video ${media.filename}`);
      }
    }

    return thumbnails;
  }

  // Create image thumbnail
  async createImageThumbnail(media, targetSize) {
    // In browser environment, use canvas to create thumbnail
    if (typeof window !== 'undefined') {
      return this.createBrowserImageThumbnail(media, targetSize);
    }
    
    // Node.js environment would use image processing library
    return { url: media.path, width: targetSize, height: targetSize };
  }

  // Browser image thumbnail creation
  async createBrowserImageThumbnail(media, targetSize) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate dimensions maintaining aspect ratio
        const aspectRatio = img.width / img.height;
        let width = targetSize;
        let height = targetSize;
        
        if (aspectRatio > 1) {
          height = width / aspectRatio;
        } else {
          width = height * aspectRatio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and resize
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve({
          url: canvas.toDataURL('image/jpeg', 0.8),
          width: width,
          height: height
        });
      };
      img.onerror = reject;
      img.src = media.path;
    });
  }

  // Extract video thumbnail
  async extractVideoThumbnail(media) {
    // Video thumbnail extraction would require video processing
    // For now, return placeholder
    return {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      width: 300,
      height: 200,
      timestamp: 0
    };
  }

  // Extract video frames
  async extractVideoFrames(media) {
    // Video frame extraction would require video processing
    // For now, return empty array
    return [];
  }

  // Analyze media content
  async analyzeMediaContent(media) {
    const analysis = {
      quality: 'unknown',
      features: [],
      tags: [],
      metadata: {}
    };

    if (media.type === 'image') {
      analysis.features = await this.analyzeImageFeatures(media);
      analysis.tags = await this.generateImageTags(media);
      analysis.quality = await this.assessImageQuality(media);
    } else if (media.type === 'video') {
      analysis.features = await this.analyzeVideoFeatures(media);
      analysis.tags = await this.generateVideoTags(media);
      analysis.quality = await this.assessVideoQuality(media);
    }

    return analysis;
  }

  // Analyze image features
  async analyzeImageFeatures(media) {
    const features = [];

    // Basic feature detection
    if (media.metadata.width && media.metadata.height) {
      const aspectRatio = media.metadata.width / media.metadata.height;
      
      if (aspectRatio > 1.5) {
        features.push('landscape');
      } else if (aspectRatio < 0.7) {
        features.push('portrait');
      } else {
        features.push('square');
      }
    }

    // Size-based features
    const megapixels = (media.metadata.width * media.metadata.height) / 1000000;
    if (megapixels > 5) {
      features.push('high_resolution');
    } else if (megapixels < 1) {
      features.push('low_resolution');
    }

    return features;
  }

  // Generate image tags
  async generateImageTags(media) {
    const tags = [];

    // Basic tags based on metadata
    tags.push(media.format);
    
    if (media.source === 'user') {
      tags.push('user_uploaded');
    } else {
      tags.push('system_provided');
    }

    // Add size-based tags
    if (media.size > 10 * 1024 * 1024) {
      tags.push('large_file');
    } else if (media.size < 1024 * 1024) {
      tags.push('small_file');
    }

    return tags;
  }

  // Assess image quality
  async assessImageQuality(media) {
    let score = 50; // Base score

    // Resolution scoring
    if (media.metadata.width && media.metadata.height) {
      const megapixels = (media.metadata.width * media.metadata.height) / 1000000;
      if (megapixels > 5) score += 30;
      else if (megapixels > 2) score += 20;
      else if (megapixels > 1) score += 10;
    }

    // File size consideration (proxy for quality)
    if (media.size > 5 * 1024 * 1024) score += 10;
    else if (media.size < 500 * 1024) score -= 10;

    // Format consideration
    if (media.format === 'png' || media.format === 'webp') score += 5;
    else if (media.format === 'jpg') score += 3;

    return {
      score: Math.max(0, Math.min(100, score)),
      grade: this.getQualityGrade(score),
      factors: ['resolution', 'file_size', 'format']
    };
  }

  // Analyze video features
  async analyzeVideoFeatures(media) {
    const features = [];

    // Basic video features
    if (media.metadata.duration) {
      if (media.metadata.duration > 300) {
        features.push('long_video');
      } else if (media.metadata.duration < 30) {
        features.push('short_video');
      } else {
        features.push('medium_video');
      }
    }

    if (media.metadata.hasAudio) {
      features.push('has_audio');
    }

    return features;
  }

  // Generate video tags
  async generateVideoTags(media) {
    const tags = [];

    tags.push(media.format);
    tags.push('video');
    
    if (media.source === 'user') {
      tags.push('user_uploaded');
    } else {
      tags.push('system_provided');
    }

    return tags;
  }

  // Assess video quality
  async assessVideoQuality(media) {
    let score = 50;

    // Resolution scoring
    if (media.metadata.width && media.metadata.height) {
      const pixels = media.metadata.width * media.metadata.height;
      if (pixels >= 1920 * 1080) score += 30; // HD+
      else if (pixels >= 1280 * 720) score += 20; // HD
      else if (pixels >= 640 * 480) score += 10; // SD
    }

    // Duration consideration
    if (media.metadata.duration) {
      if (media.metadata.duration > 60 && media.metadata.duration < 600) {
        score += 10; // Good duration range
      }
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      grade: this.getQualityGrade(score),
      factors: ['resolution', 'duration']
    };
  }

  // Get quality grade from score
  getQualityGrade(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    if (score >= 40) return 'poor';
    return 'very_poor';
  }

  // Search media files
  searchMedia(query, options = {}) {
    const results = {
      query: query,
      totalResults: 0,
      media: [],
      filters: options
    };

    const searchLower = query.toLowerCase();
    
    this.mediaIndex.forEach(media => {
      let matches = true;
      
      // Text search
      if (query) {
        const filenameMatch = media.filename.toLowerCase().includes(searchLower);
        const typeMatch = media.type.toLowerCase().includes(searchLower);
        const formatMatch = media.format.toLowerCase().includes(searchLower);
        
        matches = filenameMatch || typeMatch || formatMatch;
      }
      
      // Apply filters
      if (options.type && media.type !== options.type) {
        matches = false;
      }
      
      if (options.source && media.source !== options.source) {
        matches = false;
      }
      
      if (options.format && media.format !== options.format) {
        matches = false;
      }
      
      if (options.minSize && media.size < options.minSize) {
        matches = false;
      }
      
      if (options.maxSize && media.size > options.maxSize) {
        matches = false;
      }
      
      if (options.processedOnly && !media.processed) {
        matches = false;
      }
      
      if (matches) {
        results.media.push(media);
      }
    });
    
    results.totalResults = results.media.length;
    
    // Sort results
    if (options.sortBy) {
      results.media = this.sortMedia(results.media, options.sortBy, options.sortOrder);
    }
    
    // Limit results
    if (options.limit) {
      results.media = results.media.slice(0, options.limit);
    }
    
    return results;
  }

  // Sort media results
  sortMedia(media, sortBy, sortOrder = 'desc') {
    const sorted = [...media];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.filename.localeCompare(b.filename);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'date':
          comparison = a.lastModified - b.lastModified;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }

  // Get media by ID
  getMedia(mediaId) {
    return this.mediaIndex.get(mediaId);
  }

  // Get all media
  getAllMedia() {
    return Array.from(this.mediaIndex.values());
  }

  // Get media by type
  getMediaByType(type) {
    return Array.from(this.mediaIndex.values()).filter(media => media.type === type);
  }

  // Get media by source
  getMediaBySource(source) {
    return Array.from(this.mediaIndex.values()).filter(media => media.source === source);
  }

  // Delete media
  async deleteMedia(mediaId) {
    const media = this.mediaIndex.get(mediaId);
    
    if (!media) {
      throw new Error(`Media not found: ${mediaId}`);
    }
    
    try {
      // Remove from storage
      await this.removeMediaFile(media);
      
      // Remove from index
      this.mediaIndex.delete(mediaId);
      
      console.log(`🗑️ Deleted media: ${media.filename}`);
      return true;
    } catch (error) {
      console.error(`Error deleting media ${media.filename}:`, error);
      throw error;
    }
  }

  // Remove media file from storage
  async removeMediaFile(media) {
    if (typeof window !== 'undefined') {
      return this.removeBrowserFile(media);
    }
    
    return this.removeNodeFile(media);
  }

  // Remove browser file
  removeBrowserFile(media) {
    const storageKey = this.initializeBrowserStorage(media.path);
    const stored = localStorage.getItem(storageKey);
    const data = JSON.parse(stored || '{}');
    
    delete data[media.filename];
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // Export media data
  exportMediaData() {
    const exportData = {
      version: '1.0',
      exportedAt: Date.now(),
      statistics: this.getMediaStatistics(),
      media: Array.from(this.mediaIndex.values()).map(media => ({
        ...media,
        // Exclude large binary data from export
        thumbnails: media.thumbnails?.map(thumb => ({
          ...thumb,
          url: thumb.url.length > 100 ? '[thumbnail_data]' : thumb.url
        }))
      }))
    };
    
    return exportData;
  }

  // Import media data
  async importMediaData(importData) {
    try {
      console.log('📥 Importing media data...');
      
      // Validate import data
      if (!importData.media || !Array.isArray(importData.media)) {
        throw new Error('Invalid import data format');
      }
      
      // Import each media item
      for (const mediaData of importData.media) {
        // Generate new ID to avoid conflicts
        const newId = this.generateMediaId(
          { name: mediaData.filename, path: mediaData.path }, 
          'imported'
        );
        
        const media = {
          ...mediaData,
          id: newId,
          source: 'imported',
          importedAt: Date.now()
        };
        
        this.mediaIndex.set(newId, media);
      }
      
      console.log(`✅ Imported ${importData.media.length} media items`);
      return this.getMediaStatistics();
    } catch (error) {
      console.error('Error importing media data:', error);
      throw error;
    }
  }
}

// Export class
module.exports = MediaDataManager;
