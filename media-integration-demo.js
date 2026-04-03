// Media Integration Demo
// Demo cho hệ thống quản lý media từ data hệ thống và người dùng

const MediaDataManager = require('./media-data-manager.js');

// Demo functions
async function demonstrateSystemMediaHandling() {
  console.log('=== SYSTEM MEDIA HANDLING DEMO ===\n');

  const mediaManager = new MediaDataManager({
    systemDataPath: './data/system/media/',
    userDataPath: './data/user/media/',
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    generateThumbnails: true,
    analyzeContent: true
  });

  // Initialize media manager
  console.log('🚀 Initializing Media Manager...');
  await mediaManager.initialize();

  // Get system media statistics
  const stats = mediaManager.getMediaStatistics();
  console.log('📊 System Media Statistics:');
  console.log(`   Total Files: ${stats.totalFiles}`);
  console.log(`   Images: ${stats.images}`);
  console.log(`   Videos: ${stats.videos}`);
  console.log(`   System Files: ${stats.systemFiles}`);
  console.log(`   User Files: ${stats.userFiles}`);
  console.log(`   Total Size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Processed Files: ${stats.processedFiles}`);

  // Get all system media
  const systemMedia = mediaManager.getMediaBySource('system');
  console.log(`\n📁 System Media Files (${systemMedia.length}):`);
  
  systemMedia.slice(0, 5).forEach((media, index) => {
    console.log(`   ${index + 1}. ${media.filename}`);
    console.log(`      Type: ${media.type} (${media.format})`);
    console.log(`      Size: ${(media.size / 1024).toFixed(2)} KB`);
    console.log(`      Path: ${media.path}`);
    console.log(`      Processed: ${media.processed}`);
    
    if (media.metadata.width && media.metadata.height) {
      console.log(`      Dimensions: ${media.metadata.width}×${media.metadata.height}px`);
    }
    
    if (media.analysis) {
      console.log(`      Quality: ${media.analysis.quality.grade} (${media.analysis.quality.score}/100)`);
      console.log(`      Features: ${media.analysis.features.join(', ')}`);
      console.log(`      Tags: ${media.analysis.tags.join(', ')}`);
    }
    
    console.log('');
  });

  return mediaManager;
}

async function demonstrateUserMediaUpload() {
  console.log('=== USER MEDIA UPLOAD DEMO ===\n');

  const mediaManager = new MediaDataManager({
    userDataPath: './data/user/media/',
    maxImageSize: 5 * 1024 * 1024, // 5MB
    maxVideoSize: 50 * 1024 * 1024, // 50MB
    generateThumbnails: true,
    analyzeContent: true
  });

  await mediaManager.initialize();

  // Simulate user file uploads
  const userFiles = [
    {
      name: 'product_photo_1.jpg',
      size: 2048576, // 2MB
      type: 'image/jpeg',
      lastModified: Date.now()
    },
    {
      name: 'product_demo.mp4',
      size: 15728640, // 15MB
      type: 'video/mp4',
      lastModified: Date.now()
    },
    {
      name: 'logo.png',
      size: 51200, // 50KB
      type: 'image/png',
      lastModified: Date.now()
    },
    {
      name: 'banner.jpg',
      size: 3145728, // 3MB
      type: 'image/jpeg',
      lastModified: Date.now()
    }
  ];

  console.log('📤 Simulating user file uploads...\n');

  for (const file of userFiles) {
    try {
      console.log(`📁 Uploading: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      
      const mediaInfo = await mediaManager.addUserMedia(file, {
        uploadedBy: 'demo_user',
        category: 'product_media'
      });

      console.log(`✅ Upload successful:`);
      console.log(`   Media ID: ${mediaInfo.id}`);
      console.log(`   Type: ${mediaInfo.type}`);
      console.log(`   Format: ${mediaInfo.format}`);
      console.log(`   Source: ${mediaInfo.source}`);
      console.log(`   Processed: ${mediaInfo.processed}`);
      
      // Wait a bit for processing simulation
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('');

    } catch (error) {
      console.log(`❌ Upload failed for ${file.name}: ${error.message}\n`);
    }
  }

  // Get updated statistics
  const updatedStats = mediaManager.getMediaStatistics();
  console.log('📊 Updated Statistics:');
  console.log(`   Total Files: ${updatedStats.totalFiles}`);
  console.log(`   User Files: ${updatedStats.userFiles}`);
  console.log(`   Processed Files: ${updatedStats.processedFiles}`);

  return mediaManager;
}

async function demonstrateMediaSearch() {
  console.log('=== MEDIA SEARCH DEMO ===\n');

  const mediaManager = new MediaDataManager();
  await mediaManager.initialize();

  // Add some sample media for demonstration
  const sampleMedia = [
    { name: 'product_image_1.jpg', type: 'image/jpeg', size: 1024000 },
    { name: 'product_video_1.mp4', type: 'video/mp4', size: 10485760 },
    { name: 'banner_image.png', type: 'image/png', size: 512000 },
    { name: 'demo_video.webm', type: 'video/webm', size: 5242880 },
    { name: 'thumbnail.jpg', type: 'image/jpeg', size: 256000 }
  ];

  // Add sample media
  for (const media of sampleMedia) {
    try {
      await mediaManager.addUserMedia(media, { category: 'demo' });
    } catch (error) {
      // Ignore errors for demo
    }
  }

  // Test different search queries
  const searchQueries = [
    { query: 'image', options: { type: 'image' } },
    { query: 'video', options: { type: 'video' } },
    { query: 'product', options: {} },
    { query: '', options: { source: 'user', sortBy: 'size', sortOrder: 'desc' } },
    { query: '', options: { format: 'jpg', limit: 3 } }
  ];

  for (const search of searchQueries) {
    console.log(`🔍 Searching: "${search.query || 'all'}"`);
    console.log(`   Options: ${JSON.stringify(search.options)}`);
    
    const results = mediaManager.searchMedia(search.query, search.options);
    
    console.log(`📊 Search Results:`);
    console.log(`   Total Results: ${results.totalResults}`);
    
    results.media.forEach((media, index) => {
      console.log(`   ${index + 1}. ${media.filename}`);
      console.log(`      Type: ${media.type}, Format: ${media.format}`);
      console.log(`      Size: ${(media.size / 1024).toFixed(2)} KB`);
      console.log(`      Source: ${media.source}`);
      console.log(`      Processed: ${media.processed}`);
    });
    
    console.log('');
  }

  return mediaManager;
}

async function demonstrateMediaProcessing() {
  console.log('=== MEDIA PROCESSING DEMO ===\n');

  const mediaManager = new MediaDataManager({
    generateThumbnails: true,
    extractFrames: true,
    analyzeContent: true
  });

  await mediaManager.initialize();

  // Add sample media that will be processed
  const processingSamples = [
    {
      name: 'high_quality_product.jpg',
      type: 'image/jpeg',
      size: 4194304, // 4MB
      metadata: { width: 1920, height: 1080 }
    },
    {
      name: 'product_demo_video.mp4',
      type: 'video/mp4',
      size: 20971520, // 20MB
      metadata: { width: 1280, height: 720, duration: 120 }
    }
  ];

  console.log('📤 Adding media for processing...\n');

  for (const sample of processingSamples) {
    try {
      const mediaInfo = await mediaManager.addUserMedia(sample, {
        category: 'processing_demo'
      });

      console.log(`📁 Added: ${mediaInfo.filename}`);
      console.log(`   Media ID: ${mediaInfo.id}`);
      console.log(`   Processing Status: ${mediaInfo.processed ? 'Processed' : 'Queued'}`);

      // Wait for processing to complete (simulated)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check processing results
      const updatedMedia = mediaManager.getMedia(mediaInfo.id);
      
      if (updatedMedia.processed) {
        console.log(`✅ Processing completed:`);
        
        if (updatedMedia.thumbnails.length > 0) {
          console.log(`   Thumbnails: ${updatedMedia.thumbnails.length} generated`);
          updatedMedia.thumbnails.forEach(thumb => {
            console.log(`     ${thumb.size}px: ${thumb.width}×${thumb.height}`);
          });
        }
        
        if (updatedMedia.frames && updatedMedia.frames.length > 0) {
          console.log(`   Video Frames: ${updatedMedia.frames.length} extracted`);
        }
        
        if (updatedMedia.analysis) {
          console.log(`   Content Analysis:`);
          console.log(`     Quality: ${updatedMedia.analysis.quality.grade} (${updatedMedia.analysis.quality.score}/100)`);
          console.log(`     Features: ${updatedMedia.analysis.features.join(', ')}`);
          console.log(`     Tags: ${updatedMedia.analysis.tags.join(', ')}`);
        }
      } else {
        console.log(`⏳ Processing still in queue...`);
      }
      
      console.log('');

    } catch (error) {
      console.log(`❌ Error adding ${sample.name}: ${error.message}\n`);
    }
  }

  return mediaManager;
}

async function demonstrateMediaIntegration() {
  console.log('=== MEDIA INTEGRATION DEMO ===\n');

  const mediaManager = new MediaDataManager({
    systemDataPath: './data/system/media/',
    userDataPath: './data/user/media/',
    generateThumbnails: true,
    analyzeContent: true
  });

  await mediaManager.initialize();

  // Simulate system media (pre-existing)
  const systemMedia = [
    {
      name: 'system_banner.jpg',
      type: 'image/jpeg',
      size: 1048576,
      source: 'system',
      metadata: { width: 1200, height: 400 }
    },
    {
      name: 'system_logo.png',
      type: 'image/png',
      size: 25600,
      source: 'system',
      metadata: { width: 200, height: 200 }
    }
  ];

  // Add system media
  for (const media of systemMedia) {
    try {
      const mediaInfo = await mediaManager.addUserMedia(media, {
        source: 'system',
        category: 'brand_assets'
      });
      // Update source to system
      mediaInfo.source = 'system';
    } catch (error) {
      // Ignore for demo
    }
  }

  // Add user media
  const userMedia = [
    {
      name: 'user_product_1.jpg',
      type: 'image/jpeg',
      size: 2048576,
      metadata: { width: 800, height: 600 }
    },
    {
      name: 'user_product_2.jpg',
      type: 'image/jpeg',
      size: 1536000,
      metadata: { width: 1024, height: 768 }
    }
  ];

  for (const media of userMedia) {
    try {
      await mediaManager.addUserMedia(media, {
        uploadedBy: 'user_123',
        category: 'product_images'
      });
    } catch (error) {
      // Ignore for demo
    }
  }

  // Wait for processing
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('📊 Integration Results:');
  
  const allMedia = mediaManager.getAllMedia();
  const systemFiles = mediaManager.getMediaBySource('system');
  const userFiles = mediaManager.getMediaBySource('user');
  
  console.log(`   Total Media: ${allMedia.length}`);
  console.log(`   System Files: ${systemFiles.length}`);
  console.log(`   User Files: ${userFiles.length}`);
  
  console.log('\n📋 Media Inventory:');
  
  allMedia.forEach((media, index) => {
    const icon = media.source === 'system' ? '🏢' : '👤';
    const status = media.processed ? '✅' : '⏳';
    
    console.log(`   ${index + 1}. ${icon} ${status} ${media.filename}`);
    console.log(`      Type: ${media.type}, Size: ${(media.size / 1024).toFixed(2)} KB`);
    console.log(`      Source: ${media.source}, Processed: ${media.processed}`);
    
    if (media.analysis) {
      console.log(`      Quality: ${media.analysis.quality.grade}`);
    }
    
    console.log('');
  });

  // Demonstrate search and filtering
  console.log('🔍 Search Examples:');
  
  // Search by type
  const images = mediaManager.searchMedia('', { type: 'image' });
  console.log(`   Images: ${images.totalResults} files`);
  
  // Search by source
  const userContent = mediaManager.searchMedia('', { source: 'user' });
  console.log(`   User Content: ${userContent.totalResults} files`);
  
  // Search by quality
  const highQuality = mediaManager.getAllMedia().filter(m => 
    m.analysis && m.analysis.quality.score >= 80
  );
  console.log(`   High Quality: ${highQuality.length} files`);

  return mediaManager;
}

async function demonstrateMediaExportImport() {
  console.log('=== MEDIA EXPORT/IMPORT DEMO ===\n');

  const mediaManager = new MediaDataManager();
  await mediaManager.initialize();

  // Add sample media
  const sampleMedia = [
    {
      name: 'export_test_1.jpg',
      type: 'image/jpeg',
      size: 1024000,
      metadata: { width: 800, height: 600 }
    },
    {
      name: 'export_test_2.png',
      type: 'image/png',
      size: 512000,
      metadata: { width: 400, height: 400 }
    }
  ];

  for (const media of sampleMedia) {
    try {
      await mediaManager.addUserMedia(media, { category: 'export_test' });
    } catch (error) {
      // Ignore for demo
    }
  }

  // Wait for processing
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log('📤 Exporting Media Data...');
  
  const exportData = mediaManager.exportMediaData();
  
  console.log('✅ Export completed:');
  console.log(`   Version: ${exportData.version}`);
  console.log(`   Exported At: ${new Date(exportData.exportedAt).toLocaleString()}`);
  console.log(`   Media Items: ${exportData.media.length}`);
  console.log(`   Statistics: ${JSON.stringify(exportData.statistics)}`);

  // Simulate importing to a new manager
  console.log('\n📥 Importing Media Data...');
  
  const newManager = new MediaDataManager();
  await newManager.initialize();
  
  const importStats = await newManager.importMediaData(exportData);
  
  console.log('✅ Import completed:');
  console.log(`   Total Files: ${importStats.totalFiles}`);
  console.log(`   Images: ${importStats.images}`);
  console.log(`   Videos: ${importStats.videos}`);
  console.log(`   Imported Files: ${importStats.totalFiles}`);

  return { originalManager: mediaManager, importedManager: newManager };
}

// Main execution function
async function runAllMediaDemos() {
  try {
    console.log('🎯 MEDIA DATA MANAGER DEMOS\n');
    console.log('='.repeat(50));
    
    await demonstrateSystemMediaHandling();
    await demonstrateUserMediaUpload();
    await demonstrateMediaSearch();
    await demonstrateMediaProcessing();
    await demonstrateMediaIntegration();
    await demonstrateMediaExportImport();
    
    console.log('\n🎉 All media demos completed!');
    
  } catch (error) {
    console.error('💥 Demo execution failed:', error);
  }
}

// Export functions for individual testing
module.exports = {
  demonstrateSystemMediaHandling,
  demonstrateUserMediaUpload,
  demonstrateMediaSearch,
  demonstrateMediaProcessing,
  demonstrateMediaIntegration,
  demonstrateMediaExportImport,
  runAllMediaDemos
};

// Run all demos if this file is executed directly
if (require.main === module) {
  runAllMediaDemos();
}
