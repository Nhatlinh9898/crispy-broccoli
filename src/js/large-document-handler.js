// Large Document Handler
// Xử lý tài liệu lớn hàng trăm, hàng ngàn trang với hàng ngàn hình ảnh

class LargeDocumentHandler {
  constructor(config = {}) {
    this.config = {
      maxFileSize: config.maxFileSize || 1024 * 1024 * 1024, // 1GB
      maxPages: config.maxPages || 50000,
      maxImages: config.maxImages || 10000,
      chunkSize: config.chunkSize || 100, // Process 100 pages at a time
      memoryLimit: config.memoryLimit || 512 * 1024 * 1024, // 512MB
      tempStorage: config.tempStorage || './temp/large_docs/',
      parallelChunks: config.parallelChunks || 3,
      progressCallback: config.onProgress || null,
      errorCallback: config.onError || null
    };
    
    this.activeProcesses = new Map();
    this.chunkQueue = [];
    this.processingStats = {
      totalDocuments: 0,
      totalPagesProcessed: 0,
      totalImagesExtracted: 0,
      totalProcessingTime: 0,
      averagePagesPerSecond: 0
    };
  }

  // Initialize large document handler
  async initialize() {
    console.log('📚 Initializing Large Document Handler...');
    
    // Ensure temp directories exist
    await this.ensureDirectories();
    
    // Initialize memory monitoring
    this.initializeMemoryMonitoring();
    
    console.log('✅ Large Document Handler initialized');
    return true;
  }

  // Ensure directories exist
  async ensureDirectories() {
    const paths = [
      this.config.tempStorage,
      this.config.tempStorage + 'chunks/',
      this.config.tempStorage + 'images/',
      this.config.tempStorage + 'text/',
      this.config.tempStorage + 'metadata/',
      this.config.tempStorage + 'progress/'
    ];

    for (const path of paths) {
      await this.createDirectory(path);
    }
  }

  // Create directory
  async createDirectory(path) {
    if (typeof window !== 'undefined') {
      const storageKey = `large_dir_${path.replace(/[^a-zA-Z0-9]/g, '_')}`;
      if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, JSON.stringify({}));
      }
    } else {
      console.log(`Creating directory: ${path}`);
    }
  }

  // Initialize memory monitoring
  initializeMemoryMonitoring() {
    this.memoryMonitor = {
      used: 0,
      peak: 0,
      warnings: []
    };
  }

  // Process large document
  async processLargeDocument(file, options = {}) {
    const processId = this.generateProcessId();
    const startTime = Date.now();
    
    try {
      console.log(`📚 Processing large document: ${file.name} (${this.formatFileSize(file.size)})`);
      
      // Validate large document
      const validation = this.validateLargeDocument(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Create process object
      const process = {
        id: processId,
        filename: file.name,
        size: file.size,
        status: 'initializing',
        progress: 0,
        startTime: startTime,
        options: { ...options },
        chunks: [],
        results: {
          text: '',
          images: [],
          metadata: {},
          tables: [],
          sections: []
        },
        statistics: {
          totalPages: 0,
          processedPages: 0,
          extractedImages: 0,
          extractedTables: 0,
          processingTime: 0,
          memoryUsage: 0
        },
        errors: []
      };

      this.activeProcesses.set(processId, process);

      // Start processing
      await this.executeLargeDocumentProcessing(process);

      return process;

    } catch (error) {
      console.error(`Error processing large document ${file.name}:`, error);
      throw error;
    }
  }

  // Validate large document
  validateLargeDocument(file) {
    if (file.size > this.config.maxFileSize) {
      return { 
        valid: false, 
        error: `File too large: ${this.formatFileSize(file.size)} (max: ${this.formatFileSize(this.config.maxFileSize)})` 
      };
    }

    return { valid: true };
  }

  // Generate process ID
  generateProcessId() {
    return `large_doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Execute large document processing
  async executeLargeDocumentProcessing(process) {
    try {
      // Step 1: Document analysis and chunking
      process.status = 'analyzing';
      await this.analyzeAndChunkDocument(process);
      
      // Step 2: Process chunks in parallel
      process.status = 'processing_chunks';
      await this.processDocumentChunks(process);
      
      // Step 3: Aggregate results
      process.status = 'aggregating';
      await this.aggregateChunkResults(process);
      
      // Step 4: Final processing and optimization
      process.status = 'finalizing';
      await this.finalizeDocumentProcessing(process);
      
      // Complete
      process.status = 'completed';
      process.progress = 100;
      process.endTime = Date.now();
      
      // Update global statistics
      this.updateGlobalStatistics(process);
      
      console.log(`✅ Completed large document processing: ${process.filename}`);
      console.log(`   Total pages: ${process.statistics.totalPages}`);
      console.log(`   Processing time: ${process.endTime - process.startTime}ms`);
      console.log(`   Images extracted: ${process.statistics.extractedImages}`);
      
      return process;

    } catch (error) {
      process.status = 'failed';
      process.errors.push(error.message);
      process.endTime = Date.now();
      
      if (this.config.errorCallback) {
        this.config.errorCallback(process, error);
      }
      
      throw error;
    }
  }

  // Analyze and chunk document
  async analyzeAndChunkDocument(process) {
    console.log(`📊 Analyzing document structure: ${process.filename}`);
    
    // Simulate document analysis
    const estimatedPages = Math.min(
      Math.floor(process.size / 50000), // Estimate 50KB per page
      this.config.maxPages
    );
    
    const numberOfChunks = Math.ceil(estimatedPages / this.config.chunkSize);
    
    process.statistics.totalPages = estimatedPages;
    process.chunks = [];
    
    // Create chunks
    for (let i = 0; i < numberOfChunks; i++) {
      const startPage = i * this.config.chunkSize;
      const endPage = Math.min(startPage + this.config.chunkSize, estimatedPages);
      
      const chunk = {
        id: `chunk_${i}`,
        startPage: startPage,
        endPage: endPage,
        pageCount: endPage - startPage,
        status: 'pending',
        result: null,
        error: null,
        processingTime: 0,
        memoryUsage: 0
      };
      
      process.chunks.push(chunk);
    }
    
    console.log(`   Estimated pages: ${estimatedPages}`);
    console.log(`   Created ${numberOfChunks} chunks of ${this.config.chunkSize} pages each`);
    
    this.updateProgress(process, 10, 'Document analysis completed');
  }

  // Process document chunks
  async processDocumentChunks(process) {
    console.log(`⚙️ Processing ${process.chunks.length} chunks in parallel...`);
    
    const chunks = [...process.chunks];
    const activePromises = [];
    
    // Process chunks in parallel batches
    for (let i = 0; i < chunks.length; i += this.config.parallelChunks) {
      const batch = chunks.slice(i, i + this.config.parallelChunks);
      
      // Process batch
      const batchPromises = batch.map(chunk => 
        this.processChunk(process, chunk)
      );
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      // Update chunk status
      batchResults.forEach((result, index) => {
        const chunk = batch[index];
        if (result.status === 'fulfilled') {
          chunk.status = 'completed';
          chunk.result = result.value;
        } else {
          chunk.status = 'failed';
          chunk.error = result.reason.message;
          process.errors.push(`Chunk ${chunk.id}: ${result.reason.message}`);
        }
      });
      
      // Update progress
      const completedChunks = process.chunks.filter(c => c.status === 'completed').length;
      const progress = 10 + (completedChunks / process.chunks.length) * 70;
      this.updateProgress(process, progress, `Processed ${completedChunks}/${process.chunks.length} chunks`);
      
      // Memory management
      await this.manageMemory();
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`   Completed chunk processing`);
  }

  // Process individual chunk
  async processChunk(process, chunk) {
    const startTime = Date.now();
    
    try {
      console.log(`   Processing chunk ${chunk.id} (pages ${chunk.startPage + 1}-${chunk.endPage})`);
      
      // Simulate chunk processing
      const chunkResult = await this.simulateChunkProcessing(process, chunk);
      
      chunk.processingTime = Date.now() - startTime;
      chunk.memoryUsage = this.estimateChunkMemoryUsage(chunk);
      
      // Update process statistics
      process.statistics.processedPages += chunk.pageCount;
      process.statistics.extractedImages += chunkResult.images.length;
      process.statistics.extractedTables += chunkResult.tables.length;
      
      return chunkResult;
      
    } catch (error) {
      chunk.error = error.message;
      chunk.processingTime = Date.now() - startTime;
      throw error;
    }
  }

  // Simulate chunk processing
  async simulateChunkProcessing(process, chunk) {
    // Simulate processing time based on chunk size
    const processingTime = chunk.pageCount * 50; // 50ms per page
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    // Generate chunk content
    const content = this.generateChunkContent(process, chunk);
    const images = this.generateChunkImages(chunk);
    const tables = this.generateChunkTables(chunk);
    const metadata = this.generateChunkMetadata(chunk);
    
    return {
      chunkId: chunk.id,
      content: content,
      images: images,
      tables: tables,
      metadata: metadata,
      pageCount: chunk.pageCount
    };
  }

  // Generate chunk content
  generateChunkContent(process, chunk) {
    const lines = [];
    
    for (let page = chunk.startPage; page < chunk.endPage; page++) {
      lines.push(`--- Page ${page + 1} ---`);
      lines.push(`Content for page ${page + 1} of ${process.filename}`);
      lines.push(`This is simulated text content for the large document.`);
      lines.push(`In a real implementation, this would be the actual extracted text.`);
      lines.push(`Page ${page + 1} contains various information and data.`);
      lines.push(''); // Empty line between pages
    }
    
    return lines.join('\n');
  }

  // Generate chunk images
  generateChunkImages(chunk) {
    const images = [];
    const imagesPerPage = Math.floor(Math.random() * 3) + 1; // 1-3 images per page
    
    for (let page = chunk.startPage; page < chunk.endPage; page++) {
      for (let i = 0; i < imagesPerPage; i++) {
        images.push({
          id: `img_${page + 1}_${i + 1}`,
          page: page + 1,
          index: i + 1,
          src: `image_${page + 1}_${i + 1}.jpg`,
          alt: `Image on page ${page + 1}`,
          size: Math.floor(Math.random() * 1000000) + 100000, // 100KB - 1.1MB
          dimensions: {
            width: Math.floor(Math.random() * 1000) + 500,
            height: Math.floor(Math.random() * 800) + 300
          }
        });
      }
    }
    
    return images;
  }

  // Generate chunk tables
  generateChunkTables(chunk) {
    const tables = [];
    const tableFrequency = 0.1; // 10% of pages have tables
    
    for (let page = chunk.startPage; page < chunk.endPage; page++) {
      if (Math.random() < tableFrequency) {
        const rows = Math.floor(Math.random() * 20) + 5;
        const columns = Math.floor(Math.random() * 10) + 3;
        
        tables.push({
          id: `table_${page + 1}`,
          page: page + 1,
          rows: rows,
          columns: columns,
          title: `Table on page ${page + 1}`,
          data: this.generateTableData(rows, columns)
        });
      }
    }
    
    return tables;
  }

  // Generate table data
  generateTableData(rows, columns) {
    const data = [];
    
    // Header row
    const header = [];
    for (let col = 0; col < columns; col++) {
      header.push(`Column ${col + 1}`);
    }
    data.push(header);
    
    // Data rows
    for (let row = 0; row < rows; row++) {
      const rowData = [];
      for (let col = 0; col < columns; col++) {
        rowData.push(`Data ${row + 1}-${col + 1}`);
      }
      data.push(rowData);
    }
    
    return data;
  }

  // Generate chunk metadata
  generateChunkMetadata(chunk) {
    return {
      chunkId: chunk.id,
      startPage: chunk.startPage,
      endPage: chunk.endPage,
      pageCount: chunk.pageCount,
      wordCount: chunk.pageCount * 250, // Estimate 250 words per page
      characterCount: chunk.pageCount * 1500, // Estimate 1500 characters per page
      processingTime: Date.now(),
      language: 'vi',
      encoding: 'utf-8'
    };
  }

  // Estimate chunk memory usage
  estimateChunkMemoryUsage(chunk) {
    // Rough estimation: 1KB per page of content + 100KB per image
    const baseMemory = chunk.pageCount * 1024;
    const imageMemory = chunk.pageCount * 2 * 100000; // 2 images per page average
    return baseMemory + imageMemory;
  }

  // Aggregate chunk results
  async aggregateChunkResults(process) {
    console.log(`🔄 Aggregating results from ${process.chunks.length} chunks...`);
    
    const aggregatedResults = {
      text: '',
      images: [],
      tables: [],
      metadata: {
        totalPages: 0,
        totalWords: 0,
        totalCharacters: 0,
        totalProcessingTime: 0
      }
    };
    
    // Aggregate content from completed chunks
    const completedChunks = process.chunks.filter(chunk => chunk.status === 'completed');
    
    for (const chunk of completedChunks) {
      if (chunk.result) {
        // Aggregate text content
        aggregatedResults.text += chunk.result.content + '\n\n';
        
        // Aggregate images
        aggregatedResults.images.push(...chunk.result.images);
        
        // Aggregate tables
        aggregatedResults.tables.push(...chunk.result.tables);
        
        // Aggregate metadata
        if (chunk.result.metadata) {
          aggregatedResults.metadata.totalPages += chunk.result.metadata.pageCount;
          aggregatedResults.metadata.totalWords += chunk.result.metadata.wordCount;
          aggregatedResults.metadata.totalCharacters += chunk.result.metadata.characterCount;
          aggregatedResults.metadata.totalProcessingTime += chunk.processingTime;
        }
      }
    }
    
    // Store aggregated results
    process.results = aggregatedResults;
    process.statistics.processingTime = aggregatedResults.metadata.totalProcessingTime;
    
    console.log(`   Aggregated text: ${aggregatedResults.text.length} characters`);
    console.log(`   Aggregated images: ${aggregatedResults.images.length}`);
    console.log(`   Aggregated tables: ${aggregatedResults.tables.length}`);
    
    this.updateProgress(process, 85, 'Results aggregation completed');
  }

  // Finalize document processing
  async finalizeDocumentProcessing(process) {
    console.log(`🔧 Finalizing document processing: ${process.filename}`);
    
    // Create final metadata
    const finalMetadata = {
      filename: process.filename,
      size: process.size,
      totalPages: process.statistics.totalPages,
      totalWords: process.results.metadata.totalWords,
      totalCharacters: process.results.metadata.totalCharacters,
      extractedImages: process.statistics.extractedImages,
      extractedTables: process.statistics.extractedTables,
      processingTime: process.endTime - process.startTime,
      averagePageProcessingTime: process.statistics.processingTime / process.statistics.totalPages,
      language: 'vi',
      encoding: 'utf-8',
      quality: this.assessProcessingQuality(process)
    };
    
    // Optimize results
    const optimizedResults = await this.optimizeResults(process.results);
    
    // Update process with final results
    process.results = optimizedResults;
    process.results.metadata = finalMetadata;
    
    // Save to storage
    await this.saveProcessingResults(process);
    
    this.updateProgress(process, 95, 'Document processing finalized');
  }

  // Assess processing quality
  assessProcessingQuality(process) {
    let qualityScore = 100;
    
    // Deduct points for failed chunks
    const failedChunks = process.chunks.filter(c => c.status === 'failed').length;
    qualityScore -= failedChunks * 10;
    
    // Deduct points for processing errors
    qualityScore -= process.errors.length * 5;
    
    // Ensure minimum score
    qualityScore = Math.max(0, qualityScore);
    
    return {
      score: qualityScore,
      grade: this.getQualityGrade(qualityScore),
      issues: process.errors,
      failedChunks: failedChunks
    };
  }

  // Get quality grade
  getQualityGrade(score) {
    if (score >= 95) return 'excellent';
    if (score >= 85) return 'good';
    if (score >= 70) return 'fair';
    if (score >= 50) return 'poor';
    return 'very_poor';
  }

  // Optimize results
  async optimizeResults(results) {
    console.log(`⚡ Optimizing processing results...`);
    
    // Optimize text content
    const optimizedText = this.optimizeTextContent(results.text);
    
    // Optimize images list
    const optimizedImages = this.optimizeImagesList(results.images);
    
    // Optimize tables
    const optimizedTables = this.optimizeTablesData(results.tables);
    
    return {
      text: optimizedText,
      images: optimizedImages,
      tables: optimizedTables,
      sections: this.createDocumentSections(results),
      summary: this.createDocumentSummary(results)
    };
  }

  // Optimize text content
  optimizeTextContent(text) {
    // Remove excessive whitespace
    let optimized = text.replace(/\s+/g, ' ');
    
    // Remove excessive newlines
    optimized = optimized.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Trim
    optimized = optimized.trim();
    
    return optimized;
  }

  // Optimize images list
  optimizeImagesList(images) {
    // Sort images by page and index
    const sorted = images.sort((a, b) => {
      if (a.page !== b.page) {
        return a.page - b.page;
      }
      return a.index - b.index;
    });
    
    // Add sequential IDs
    return sorted.map((image, index) => ({
      ...image,
      id: `img_${index + 1}`,
      sequentialIndex: index + 1
    }));
  }

  // Optimize tables data
  optimizeTablesData(tables) {
    // Sort tables by page
    const sorted = tables.sort((a, b) => a.page - b.page);
    
    // Add sequential IDs
    return sorted.map((table, index) => ({
      ...table,
      id: `table_${index + 1}`,
      sequentialIndex: index + 1,
      rowCount: table.data ? table.data.length : 0,
      columnCount: table.data && table.data.length > 0 ? table.data[0].length : 0
    }));
  }

  // Create document sections
  createDocumentSections(results) {
    const sections = [];
    const chunkSize = 5000; // Characters per section
    const text = results.text;
    
    for (let i = 0; i < text.length; i += chunkSize) {
      const sectionText = text.substring(i, i + chunkSize);
      const startChar = i + 1;
      const endChar = Math.min(i + chunkSize, text.length);
      
      sections.push({
        id: `section_${Math.floor(i / chunkSize) + 1}`,
        startCharacter: startChar,
        endCharacter: endChar,
        content: sectionText,
        wordCount: sectionText.split(/\s+/).length,
        characterCount: sectionText.length
      });
    }
    
    return sections;
  }

  // Create document summary
  createDocumentSummary(results) {
    return {
      totalCharacters: results.text.length,
      totalWords: results.text.split(/\s+/).length,
      totalImages: results.images.length,
      totalTables: results.tables.length,
      averageWordsPerPage: Math.floor(results.text.split(/\s+/).length / (results.images.length || 1)),
      hasImages: results.images.length > 0,
      hasTables: results.tables.length > 0,
      complexity: this.assessDocumentComplexity(results)
    };
  }

  // Assess document complexity
  assessDocumentComplexity(results) {
    let complexity = 'medium';
    
    const imageDensity = results.images.length / (results.text.length / 2500); // Images per page
    const tableDensity = results.tables.length / (results.text.length / 2500); // Tables per page
    
    if (imageDensity > 2 || tableDensity > 1) {
      complexity = 'high';
    } else if (imageDensity < 0.5 && tableDensity < 0.2) {
      complexity = 'low';
    }
    
    return complexity;
  }

  // Save processing results
  async saveProcessingResults(process) {
    console.log(`💾 Saving processing results: ${process.filename}`);
    
    // In browser environment, save to localStorage/IndexedDB
    if (typeof window !== 'undefined') {
      const storageKey = `large_doc_${process.id}`;
      const dataToSave = {
        id: process.id,
        filename: process.filename,
        status: process.status,
        results: process.results,
        statistics: process.statistics,
        timestamp: Date.now()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
    
    // In Node.js environment, save to file system
    console.log(`   Results saved for process ${process.id}`);
  }

  // Update progress
  updateProgress(process, progress, message) {
    process.progress = progress;
    
    if (this.config.progressCallback) {
      this.config.progressCallback(process, progress, message);
    }
    
    console.log(`   Progress: ${progress.toFixed(1)}% - ${message}`);
  }

  // Memory management
  async manageMemory() {
    // Simulate memory management
    const currentUsage = this.estimateCurrentMemoryUsage();
    
    if (currentUsage > this.config.memoryLimit) {
      console.log(`⚠️ Memory usage high: ${this.formatFileSize(currentUsage)}`);
      
      // Trigger garbage collection simulation
      if (typeof window !== 'undefined' && window.gc) {
        window.gc();
      }
      
      // Clear cache if needed
      if (this.cache && this.cache.size > 100) {
        this.cache.clear();
      }
    }
  }

  // Estimate current memory usage
  estimateCurrentMemoryUsage() {
    let usage = 0;
    
    this.activeProcesses.forEach(process => {
      usage += process.size;
      usage += process.results.text.length * 2; // UTF-16 characters
      usage += process.results.images.length * 1000; // Estimate per image
      usage += process.results.tables.length * 5000; // Estimate per table
    });
    
    return usage;
  }

  // Update global statistics
  updateGlobalStatistics(process) {
    this.processingStats.totalDocuments++;
    this.processingStats.totalPagesProcessed += process.statistics.totalPages;
    this.processingStats.totalImagesExtracted += process.statistics.extractedImages;
    this.processingStats.totalProcessingTime += process.endTime - process.startTime;
    
    // Calculate average pages per second
    if (this.processingStats.totalProcessingTime > 0) {
      this.processingStats.averagePagesPerSecond = 
        this.processingStats.totalPagesProcessed / (this.processingStats.totalProcessingTime / 1000);
    }
  }

  // Get processing statistics
  getProcessingStatistics() {
    return {
      ...this.processingStats,
      activeProcesses: this.activeProcesses.size,
      queuedChunks: this.chunkQueue.length,
      memoryUsage: this.estimateCurrentMemoryUsage(),
      memoryLimit: this.config.memoryLimit,
      memoryUtilization: (this.estimateCurrentMemoryUsage() / this.config.memoryLimit) * 100
    };
  }

  // Get process status
  getProcessStatus(processId) {
    return this.activeProcesses.get(processId);
  }

  // Cancel process
  async cancelProcess(processId) {
    const process = this.activeProcesses.get(processId);
    if (process) {
      process.status = 'cancelled';
      process.endTime = Date.now();
      
      this.activeProcesses.delete(processId);
      
      console.log(`🚫 Cancelled process: ${processId}`);
      return true;
    }
    
    return false;
  }

  // Format file size
  formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }

  // Clean up old processes
  cleanupOldProcesses(maxAge = 24 * 60 * 60 * 1000) { // 24 hours
    const now = Date.now();
    const toDelete = [];

    this.activeProcesses.forEach((process, processId) => {
      if (process.endTime && (now - process.endTime) > maxAge) {
        toDelete.push(processId);
      }
    });

    toDelete.forEach(processId => {
      this.activeProcesses.delete(processId);
    });

    console.log(`🧹 Cleaned up ${toDelete.length} old processes`);
    return toDelete.length;
  }
}

// Export class
module.exports = LargeDocumentHandler;
