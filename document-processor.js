// Document Processor for Large Files
// Xử lý tài liệu lớn: .doc, .txt, .xls, PDF và nhiều định dạng khác

class DocumentProcessor {
  constructor(config = {}) {
    this.config = {
      maxFileSize: config.maxFileSize || 100 * 1024 * 1024, // 100MB
      maxPages: config.maxPages || 10000,
      chunkSize: config.chunkSize || 1000, // Process 1000 pages at a time
      supportedFormats: {
        text: ['txt', 'md', 'csv', 'json', 'xml', 'html', 'htm'],
        documents: ['doc', 'docx', 'pdf', 'rtf', 'odt'],
        spreadsheets: ['xls', 'xlsx', 'csv', 'ods'],
        presentations: ['ppt', 'pptx', 'odp'],
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'],
        archives: ['zip', 'rar', '7z', 'tar', 'gz']
      },
      processingOptions: {
        extractImages: config.extractImages !== false,
        extractTables: config.extractTables !== false,
        extractMetadata: config.extractMetadata !== false,
        ocrEnabled: config.ocrEnabled !== false,
        parallelProcessing: config.parallelProcessing !== false,
        progressTracking: config.progressTracking !== false
      },
      storage: {
        tempPath: config.tempPath || './temp/documents/',
        processedPath: config.processedPath || './processed/documents/',
        cacheEnabled: config.cacheEnabled !== false
      }
    };
    
    this.processingQueue = [];
    this.activeJobs = new Map();
    this.completedJobs = new Map();
    this.cache = new Map();
  }

  // Initialize document processor
  async initialize() {
    console.log('📄 Initializing Document Processor...');
    
    // Ensure directories exist
    await this.ensureDirectories();
    
    // Initialize processing workers
    if (this.config.processingOptions.parallelProcessing) {
      this.initializeWorkers();
    }
    
    console.log('✅ Document Processor initialized');
    return true;
  }

  // Ensure directories exist
  async ensureDirectories() {
    const paths = [
      this.config.storage.tempPath,
      this.config.storage.processedPath,
      this.config.storage.tempPath + 'images/',
      this.config.storage.tempPath + 'chunks/',
      this.config.storage.processedPath + 'text/',
      this.config.storage.processedPath + 'images/',
      this.config.storage.processedPath + 'metadata/'
    ];

    for (const path of paths) {
      await this.createDirectory(path);
    }
  }

  // Create directory (browser simulation)
  async createDirectory(path) {
    if (typeof window !== 'undefined') {
      // Browser environment - use IndexedDB or localStorage
      const storageKey = `dir_${path.replace(/[^a-zA-Z0-9]/g, '_')}`;
      if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, JSON.stringify({}));
      }
    } else {
      // Node.js environment - actual file system
      // This would use fs.mkdir in actual implementation
      console.log(`Creating directory: ${path}`);
    }
  }

  // Process document
  async processDocument(file, options = {}) {
    const jobId = this.generateJobId();
    const startTime = Date.now();
    
    try {
      console.log(`📄 Processing document: ${file.name} (Job: ${jobId})`);
      
      // Validate file
      const validation = this.validateDocument(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Create job object
      const job = {
        id: jobId,
        filename: file.name,
        fileType: validation.type,
        format: validation.format,
        size: file.size,
        status: 'queued',
        progress: 0,
        startTime: startTime,
        options: options,
        result: null,
        error: null
      };

      this.activeJobs.set(jobId, job);

      // Start processing
      if (this.config.processingOptions.parallelProcessing) {
        this.queueForProcessing(job);
      } else {
        await this.processJob(job);
      }

      return job;

    } catch (error) {
      console.error(`Error processing document ${file.name}:`, error);
      throw error;
    }
  }

  // Validate document
  validateDocument(file) {
    const extension = this.getFileExtension(file.name);
    const fileType = this.getFileType(extension);

    if (!fileType) {
      return { valid: false, error: `Unsupported file format: ${extension}` };
    }

    if (file.size > this.config.maxFileSize) {
      return { 
        valid: false, 
        error: `File too large: ${file.size} bytes (max: ${this.config.maxFileSize} bytes)` 
      };
    }

    return { 
      valid: true, 
      type: fileType, 
      format: extension 
    };
  }

  // Get file extension
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  // Get file type from extension
  getFileType(extension) {
    for (const [type, formats] of Object.entries(this.config.supportedFormats)) {
      if (formats.includes(extension)) {
        return type;
      }
    }
    return null;
  }

  // Generate job ID
  generateJobId() {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Process job
  async processJob(job) {
    try {
      job.status = 'processing';
      job.progress = 0;

      let result;

      switch (job.fileType) {
        case 'text':
          result = await this.processTextFile(job);
          break;
        case 'documents':
          result = await this.processDocumentFile(job);
          break;
        case 'spreadsheets':
          result = await this.processSpreadsheetFile(job);
          break;
        case 'presentations':
          result = await this.processPresentationFile(job);
          break;
        case 'images':
          result = await this.processImageFile(job);
          break;
        case 'archives':
          result = await this.processArchiveFile(job);
          break;
        default:
          throw new Error(`Unsupported file type: ${job.fileType}`);
      }

      job.result = result;
      job.status = 'completed';
      job.progress = 100;
      job.endTime = Date.now();

      this.completedJobs.set(job.id, job);
      this.activeJobs.delete(job.id);

      console.log(`✅ Completed processing ${job.filename} in ${job.endTime - job.startTime}ms`);

      return job;

    } catch (error) {
      job.status = 'failed';
      job.error = error.message;
      job.endTime = Date.now();

      console.error(`❌ Failed to process ${job.filename}:`, error);
      throw error;
    }
  }

  // Process text files
  async processTextFile(job) {
    console.log(`📝 Processing text file: ${job.filename}`);
    
    const result = {
      type: 'text',
      filename: job.filename,
      size: job.size,
      content: '',
      pages: 1,
      images: [],
      metadata: {},
      tables: [],
      processingTime: 0
    };

    try {
      // Read file content
      const content = await this.readTextFile(job);
      result.content = content;
      result.pages = this.estimatePages(content);
      
      // Extract metadata
      if (this.config.processingOptions.extractMetadata) {
        result.metadata = await this.extractTextMetadata(content, job);
      }

      // Extract images if HTML
      if (job.format === 'html' || job.format === 'htm') {
        result.images = await this.extractHtmlImages(content);
      }

      // Extract tables if HTML
      if (job.format === 'html' || job.format === 'htm') {
        result.tables = await this.extractHtmlTables(content);
      }

      result.processingTime = Date.now() - job.startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Text processing failed: ${error.message}`);
    }
  }

  // Process document files (DOC, DOCX, PDF)
  async processDocumentFile(job) {
    console.log(`📄 Processing document: ${job.filename}`);
    
    const result = {
      type: 'document',
      filename: job.filename,
      format: job.format,
      size: job.size,
      content: '',
      pages: 0,
      images: [],
      metadata: {},
      tables: [],
      sections: [],
      processingTime: 0
    };

    try {
      let documentData;

      switch (job.format) {
        case 'pdf':
          documentData = await this.processPDF(job);
          break;
        case 'docx':
          documentData = await this.processDOCX(job);
          break;
        case 'doc':
          documentData = await this.processDOC(job);
          break;
        default:
          documentData = await this.processGenericDocument(job);
      }

      result.content = documentData.content;
      result.pages = documentData.pages;
      result.images = documentData.images || [];
      result.metadata = documentData.metadata || {};
      result.tables = documentData.tables || [];
      result.sections = documentData.sections || [];
      
      result.processingTime = Date.now() - job.startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Document processing failed: ${error.message}`);
    }
  }

  // Process spreadsheet files (XLS, XLSX)
  async processSpreadsheetFile(job) {
    console.log(`📊 Processing spreadsheet: ${job.filename}`);
    
    const result = {
      type: 'spreadsheet',
      filename: job.filename,
      format: job.format,
      size: job.size,
      content: '',
      sheets: [],
      images: [],
      metadata: {},
      tables: [],
      processingTime: 0
    };

    try {
      let spreadsheetData;

      switch (job.format) {
        case 'xlsx':
          spreadsheetData = await this.processXLSX(job);
          break;
        case 'xls':
          spreadsheetData = await this.processXLS(job);
          break;
        case 'csv':
          spreadsheetData = await this.processCSV(job);
          break;
        default:
          spreadsheetData = await this.processGenericSpreadsheet(job);
      }

      result.sheets = spreadsheetData.sheets || [];
      result.images = spreadsheetData.images || [];
      result.metadata = spreadsheetData.metadata || {};
      result.tables = spreadsheetData.tables || [];
      
      // Combine all sheet content
      result.content = result.sheets.map(sheet => sheet.content).join('\n\n');
      
      result.processingTime = Date.now() - job.startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Spreadsheet processing failed: ${error.message}`);
    }
  }

  // Process presentation files (PPT, PPTX)
  async processPresentationFile(job) {
    console.log(`📽️ Processing presentation: ${job.filename}`);
    
    const result = {
      type: 'presentation',
      filename: job.filename,
      format: job.format,
      size: job.size,
      content: '',
      slides: [],
      images: [],
      metadata: {},
      processingTime: 0
    };

    try {
      let presentationData;

      switch (job.format) {
        case 'pptx':
          presentationData = await this.processPPTX(job);
          break;
        case 'ppt':
          presentationData = await this.processPPT(job);
          break;
        default:
          presentationData = await this.processGenericPresentation(job);
      }

      result.slides = presentationData.slides || [];
      result.images = presentationData.images || [];
      result.metadata = presentationData.metadata || {};
      
      // Combine all slide content
      result.content = result.slides.map(slide => slide.content).join('\n\n');
      
      result.processingTime = Date.now() - job.startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Presentation processing failed: ${error.message}`);
    }
  }

  // Process image files
  async processImageFile(job) {
    console.log(`🖼️ Processing image: ${job.filename}`);
    
    const result = {
      type: 'image',
      filename: job.filename,
      format: job.format,
      size: job.size,
      content: '',
      metadata: {},
      ocrText: '',
      processingTime: 0
    };

    try {
      // Extract image metadata
      result.metadata = await this.extractImageMetadata(job);
      
      // OCR if enabled
      if (this.config.processingOptions.ocrEnabled) {
        result.ocrText = await this.performOCR(job);
        result.content = result.ocrText;
      }

      result.processingTime = Date.now() - job.startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }

  // Process archive files
  async processArchiveFile(job) {
    console.log(`📦 Processing archive: ${job.filename}`);
    
    const result = {
      type: 'archive',
      filename: job.filename,
      format: job.format,
      size: job.size,
      content: '',
      files: [],
      images: [],
      metadata: {},
      processingTime: 0
    };

    try {
      // Extract archive contents
      const extractedFiles = await this.extractArchive(job);
      result.files = extractedFiles;
      
      // Process extracted files
      for (const file of extractedFiles) {
        if (this.getFileType(file.extension) === 'images') {
          result.images.push(file);
        }
        
        // Add file content to overall content
        if (file.content) {
          result.content += `\n\n--- File: ${file.name} ---\n${file.content}`;
        }
      }

      result.metadata.totalFiles = extractedFiles.length;
      result.metadata.imageFiles = result.images.length;
      
      result.processingTime = Date.now() - job.startTime;
      
      return result;

    } catch (error) {
      throw new Error(`Archive processing failed: ${error.message}`);
    }
  }

  // Read text file
  async readTextFile(job) {
    // In browser environment, this would use FileReader
    if (typeof window !== 'undefined') {
      return await this.readBrowserTextFile(job);
    }
    
    // Node.js environment would use fs.readFile
    return `Simulated content for ${job.filename}`;
  }

  // Read text file in browser
  async readBrowserTextFile(job) {
    return new Promise((resolve, reject) => {
      // Simulate file reading
      setTimeout(() => {
        resolve(`This is simulated content for ${job.filename}. In a real implementation, this would be the actual file content.`);
      }, 100);
    });
  }

  // Estimate pages from content
  estimatePages(content) {
    // Rough estimation: 2500 characters per page
    return Math.ceil(content.length / 2500);
  }

  // Extract text metadata
  async extractTextMetadata(content, job) {
    const metadata = {
      wordCount: content.split(/\s+/).length,
      characterCount: content.length,
      lineCount: content.split('\n').length,
      encoding: 'utf-8',
      language: this.detectLanguage(content)
    };

    return metadata;
  }

  // Detect language (simplified)
  detectLanguage(content) {
    // Simple language detection based on character patterns
    const vietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/i;
    const englishChars = /[a-zA-Z]/;
    
    const vietnameseMatches = (content.match(vietnameseChars) || []).length;
    const englishMatches = (content.match(englishChars) || []).length;
    
    if (vietnameseMatches > englishMatches * 0.1) {
      return 'vi';
    } else if (englishMatches > 0) {
      return 'en';
    }
    
    return 'unknown';
  }

  // Extract HTML images
  async extractHtmlImages(content) {
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    const images = [];
    let match;

    while ((match = imgRegex.exec(content)) !== null) {
      images.push({
        src: match[1],
        alt: this.extractAttribute(match[0], 'alt'),
        title: this.extractAttribute(match[0], 'title')
      });
    }

    return images;
  }

  // Extract HTML tables
  async extractHtmlTables(content) {
    const tables = [];
    const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/g;
    let match;

    while ((match = tableRegex.exec(content)) !== null) {
      const tableHtml = match[1];
      const rows = this.parseHtmlTable(tableHtml);
      
      tables.push({
        html: match[0],
        rows: rows,
        rowCount: rows.length,
        columnCount: rows[0] ? rows[0].length : 0
      });
    }

    return tables;
  }

  // Parse HTML table
  parseHtmlTable(tableHtml) {
    const rows = [];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    let rowMatch;

    while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
      const cells = [];
      const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g;
      let cellMatch;

      while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
        cells.push(cellMatch[1].replace(/<[^>]*>/g, '').trim());
      }

      rows.push(cells);
    }

    return rows;
  }

  // Extract attribute from HTML tag
  extractAttribute(tag, attribute) {
    const regex = new RegExp(`${attribute}="([^"]*)"`, 'i');
    const match = tag.match(regex);
    return match ? match[1] : '';
  }

  // Process PDF (simulated)
  async processPDF(job) {
    console.log(`📄 Processing PDF: ${job.filename}`);
    
    // Simulate PDF processing
    const pages = Math.min(Math.floor(job.size / 50000), this.config.maxPages);
    const content = `PDF content for ${job.filename}. This would contain the extracted text from ${pages} pages.`;
    
    return {
      content: content,
      pages: pages,
      images: [],
      metadata: {
        title: job.filename.replace('.pdf', ''),
        author: 'Unknown',
        creator: 'Unknown',
        producer: 'Unknown',
        creationDate: new Date().toISOString()
      },
      tables: [],
      sections: []
    };
  }

  // Process DOCX (simulated)
  async processDOCX(job) {
    console.log(`📄 Processing DOCX: ${job.filename}`);
    
    // Simulate DOCX processing
    const content = `DOCX content for ${job.filename}. This would contain the extracted text from the document.`;
    
    return {
      content: content,
      pages: Math.ceil(content.length / 2500),
      images: [],
      metadata: {
        title: job.filename.replace('.docx', ''),
        author: 'Unknown',
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      },
      tables: [],
      sections: []
    };
  }

  // Process DOC (simulated)
  async processDOC(job) {
    console.log(`📄 Processing DOC: ${job.filename}`);
    
    return await this.processDOCX(job);
  }

  // Process XLSX (simulated)
  async processXLSX(job) {
    console.log(`📊 Processing XLSX: ${job.filename}`);
    
    // Simulate XLSX processing
    const sheets = [
      {
        name: 'Sheet1',
        content: 'Sheet1 content with cell data',
        rows: 100,
        columns: 10
      },
      {
        name: 'Sheet2',
        content: 'Sheet2 content with more data',
        rows: 50,
        columns: 8
      }
    ];
    
    return {
      sheets: sheets,
      images: [],
      metadata: {
        title: job.filename.replace('.xlsx', ''),
        sheets: sheets.length,
        totalRows: sheets.reduce((sum, s) => sum + s.rows, 0),
        totalColumns: sheets.reduce((sum, s) => sum + s.columns, 0)
      },
      tables: sheets
    };
  }

  // Process XLS (simulated)
  async processXLS(job) {
    console.log(`📊 Processing XLS: ${job.filename}`);
    
    return await this.processXLSX(job);
  }

  // Process CSV (simulated)
  async processCSV(job) {
    console.log(`📊 Processing CSV: ${job.filename}`);
    
    // Simulate CSV processing
    const content = `CSV content for ${job.filename}. This would contain comma-separated values.`;
    
    return {
      sheets: [{
        name: 'CSV Data',
        content: content,
        rows: 1000,
        columns: 5
      }],
      images: [],
      metadata: {
        delimiter: ',',
        encoding: 'utf-8',
        rows: 1000,
        columns: 5
      },
      tables: []
    };
  }

  // Process PPTX (simulated)
  async processPPTX(job) {
    console.log(`📽️ Processing PPTX: ${job.filename}`);
    
    // Simulate PPTX processing
    const slides = [];
    const slideCount = Math.min(Math.floor(job.size / 100000), 100);
    
    for (let i = 1; i <= slideCount; i++) {
      slides.push({
        number: i,
        title: `Slide ${i}`,
        content: `Content for slide ${i}`,
        notes: `Notes for slide ${i}`
      });
    }
    
    return {
      slides: slides,
      images: [],
      metadata: {
        title: job.filename.replace('.pptx', ''),
        slides: slides.length,
        author: 'Unknown',
        created: new Date().toISOString()
      }
    };
  }

  // Process PPT (simulated)
  async processPPT(job) {
    console.log(`📽️ Processing PPT: ${job.filename}`);
    
    return await this.processPPTX(job);
  }

  // Extract image metadata
  async extractImageMetadata(job) {
    // Simulate image metadata extraction
    return {
      format: job.format,
      size: job.size,
      dimensions: {
        width: 1920,
        height: 1080
      },
      colorSpace: 'RGB',
      dpi: 72,
      compression: 'JPEG'
    };
  }

  // Perform OCR (simulated)
  async performOCR(job) {
    console.log(`🔍 Performing OCR on: ${job.filename}`);
    
    // Simulate OCR processing
    return `OCR extracted text from ${job.filename}. This would contain the text recognized from the image using optical character recognition.`;
  }

  // Extract archive (simulated)
  async extractArchive(job) {
    console.log(`📦 Extracting archive: ${job.filename}`);
    
    // Simulate archive extraction
    const files = [];
    const fileCount = Math.min(Math.floor(job.size / 10000), 1000);
    
    for (let i = 1; i <= fileCount; i++) {
      const extension = i % 3 === 0 ? 'jpg' : 'txt';
      files.push({
        name: `file_${i}.${extension}`,
        extension: extension,
        size: Math.random() * 100000,
        content: extension === 'txt' ? `Content of file ${i}` : null
      });
    }
    
    return files;
  }

  // Generic processing methods
  async processGenericDocument(job) {
    return await this.processDOCX(job);
  }

  async processGenericSpreadsheet(job) {
    return await this.processXLSX(job);
  }

  async processGenericPresentation(job) {
    return await this.processPPTX(job);
  }

  // Queue management for parallel processing
  queueForProcessing(job) {
    this.processingQueue.push(job);
    this.processQueue();
  }

  async processQueue() {
    if (this.processingQueue.length === 0) {
      return;
    }

    const job = this.processingQueue.shift();
    
    try {
      await this.processJob(job);
    } catch (error) {
      console.error(`Queue processing error for job ${job.id}:`, error);
    }

    // Process next job
    if (this.processingQueue.length > 0) {
      setTimeout(() => this.processQueue(), 100);
    }
  }

  // Get job status
  getJobStatus(jobId) {
    const activeJob = this.activeJobs.get(jobId);
    if (activeJob) {
      return activeJob;
    }

    const completedJob = this.completedJobs.get(jobId);
    if (completedJob) {
      return completedJob;
    }

    return null;
  }

  // Get all jobs
  getAllJobs() {
    const activeJobs = Array.from(this.activeJobs.values());
    const completedJobs = Array.from(this.completedJobs.values());
    
    return {
      active: activeJobs,
      completed: completedJobs,
      total: activeJobs.length + completedJobs.length
    };
  }

  // Cancel job
  async cancelJob(jobId) {
    const job = this.activeJobs.get(jobId);
    if (job) {
      job.status = 'cancelled';
      job.endTime = Date.now();
      
      this.activeJobs.delete(jobId);
      this.completedJobs.set(jobId, job);
      
      return true;
    }

    return false;
  }

  // Clean up old jobs
  cleanupOldJobs(maxAge = 24 * 60 * 60 * 1000) { // 24 hours
    const now = Date.now();
    const toDelete = [];

    this.completedJobs.forEach((job, jobId) => {
      if (now - job.endTime > maxAge) {
        toDelete.push(jobId);
      }
    });

    toDelete.forEach(jobId => {
      this.completedJobs.delete(jobId);
    });

    console.log(`🧹 Cleaned up ${toDelete.length} old jobs`);
    return toDelete.length;
  }

  // Get processing statistics
  getStatistics() {
    const jobs = this.getAllJobs();
    
    const stats = {
      totalJobs: jobs.total,
      activeJobs: jobs.active.length,
      completedJobs: jobs.completed.length,
      queueLength: this.processingQueue.length,
      successRate: 0,
      averageProcessingTime: 0,
      fileTypeDistribution: {},
      totalProcessedSize: 0
    };

    // Calculate success rate
    const successfulJobs = jobs.completed.filter(job => job.status === 'completed');
    stats.successRate = jobs.completed.length > 0 ? 
      (successfulJobs.length / jobs.completed.length) * 100 : 0;

    // Calculate average processing time
    const completedTimes = jobs.completed
      .filter(job => job.status === 'completed')
      .map(job => job.endTime - job.startTime);
    
    if (completedTimes.length > 0) {
      stats.averageProcessingTime = 
        completedTimes.reduce((sum, time) => sum + time, 0) / completedTimes.length;
    }

    // File type distribution
    jobs.completed.forEach(job => {
      stats.fileTypeDistribution[job.fileType] = 
        (stats.fileTypeDistribution[job.fileType] || 0) + 1;
    });

    // Total processed size
    stats.totalProcessedSize = jobs.completed
      .reduce((sum, job) => sum + (job.size || 0), 0);

    return stats;
  }
}

// Export class
module.exports = DocumentProcessor;
