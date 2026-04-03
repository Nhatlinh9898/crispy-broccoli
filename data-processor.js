// Data extraction and processing script for 部品分類マスタ
class PartsDataProcessor {
    constructor() {
        this.sheets = {
            'sheet001': '記入方法',
            'sheet002': 'NSSOLとの履歴', 
            'sheet003': '部品分類ツリーマスタ',
            'sheet004': '品名フリガナ索引',
            'sheet005': '品名文字列構成',
            'sheet006': '分類ツリーPIVOT',
            'sheet007': 'DFK辞典',
            'sheet008': '品目分類　現状',
            'sheet009': '選択肢',
            'sheet010': 'Sheet4',
            'sheet011': 'レポート出力結果'
        };
        this.processedData = {};
    }

    // Parse HTML table data from sheet files
    async parseSheetData(sheetFileName) {
        try {
            const response = await fetch(sheetFileName);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const tables = doc.querySelectorAll('table');
            const data = [];
            
            tables.forEach(table => {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 0) {
                        const rowData = Array.from(cells).map(cell => 
                            cell.textContent.trim().replace(/\s+/g, ' ')
                        );
                        data.push(rowData);
                    }
                });
            });
            
            return data;
        } catch (error) {
            console.error(`Error parsing ${sheetFileName}:`, error);
            return [];
        }
    }

    // Extract parts classification tree data
    async extractPartsTreeData() {
        const data = await this.parseSheetData('sheet003.htm');
        const partsTree = [];
        
        // Skip header rows and process data
        for (let i = 2; i < data.length; i++) {
            const row = data[i];
            if (row.length >= 5 && row[0]) {
                partsTree.push({
                    code: row[0] || '',
                    name: row[1] || '',
                    category: row[2] || '',
                    subcategory: row[3] || '',
                    specification: row[4] || '',
                    description: row[5] || '',
                    lastUpdated: row[6] || ''
                });
            }
        }
        
        return partsTree;
    }

    // Extract parts name index (furigana)
    async extractPartsNameIndex() {
        const data = await this.parseSheetData('sheet004.htm');
        const nameIndex = [];
        
        for (let i = 2; i < data.length; i++) {
            const row = data[i];
            if (row.length >= 3 && row[0]) {
                nameIndex.push({
                    partCode: row[0] || '',
                    partName: row[1] || '',
                    furigana: row[2] || '',
                    category: row[3] || ''
                });
            }
        }
        
        return nameIndex;
    }

    // Extract DFK dictionary data
    async extractDictionaryData() {
        const data = await this.parseSheetData('sheet007.htm');
        const dictionary = [];
        
        for (let i = 2; i < data.length; i++) {
            const row = data[i];
            if (row.length >= 4 && row[0]) {
                dictionary.push({
                    term: row[0] || '',
                    definition: row[1] || '',
                    category: row[2] || '',
                    standard: row[3] || '',
                    notes: row[4] || ''
                });
            }
        }
        
        return dictionary;
    }

    // Extract current classification status
    async extractCurrentClassification() {
        const data = await this.parseSheetData('sheet008.htm');
        const classification = [];
        
        for (let i = 2; i < data.length; i++) {
            const row = data[i];
            if (row.length >= 6 && row[0]) {
                classification.push({
                    itemCode: row[0] || '',
                    itemName: row[1] || '',
                    currentCategory: row[2] || '',
                    proposedCategory: row[3] || '',
                    status: row[4] || '',
                    remarks: row[5] || ''
                });
            }
        }
        
        return classification;
    }

    // Extract report data
    async extractReportData() {
        const data = await this.parseSheetData('sheet011.htm');
        const reports = [];
        
        for (let i = 2; i < data.length; i++) {
            const row = data[i];
            if (row.length >= 5 && row[0]) {
                reports.push({
                    reportName: row[0] || '',
                    generatedDate: row[1] || '',
                    fileType: row[2] || '',
                    size: row[3] || '',
                    description: row[4] || ''
                });
            }
        }
        
        return reports;
    }

    // Process all sheets and create structured data
    async processAllData() {
        console.log('Starting data processing...');
        
        this.processedData = {
            partsTree: await this.extractPartsTreeData(),
            nameIndex: await this.extractPartsNameIndex(),
            dictionary: await this.extractDictionaryData(),
            currentClassification: await this.extractCurrentClassification(),
            reports: await this.extractReportData(),
            metadata: {
                lastUpdated: '2022/7/26',
                totalParts: 0,
                totalCategories: 0,
                sheetCount: Object.keys(this.sheets).length
            }
        };
        
        // Calculate statistics
        this.processedData.metadata.totalParts = this.processedData.partsTree.length;
        this.processedData.metadata.totalCategories = 
            new Set(this.processedData.partsTree.map(p => p.category)).size;
        
        console.log('Data processing completed:', this.processedData.metadata);
        return this.processedData;
    }

    // Search functionality
    searchParts(query, searchType = 'all') {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        switch(searchType) {
            case 'parts':
                return this.processedData.partsTree.filter(part => 
                    part.name.toLowerCase().includes(lowerQuery) ||
                    part.code.toLowerCase().includes(lowerQuery) ||
                    part.category.toLowerCase().includes(lowerQuery)
                );
            case 'dictionary':
                return this.processedData.dictionary.filter(item =>
                    item.term.toLowerCase().includes(lowerQuery) ||
                    item.definition.toLowerCase().includes(lowerQuery)
                );
            case 'all':
            default:
                // Search across all datasets
                results.push(...this.processedData.partsTree.filter(part => 
                    part.name.toLowerCase().includes(lowerQuery) ||
                    part.code.toLowerCase().includes(lowerQuery)
                ));
                results.push(...this.processedData.dictionary.filter(item =>
                    item.term.toLowerCase().includes(lowerQuery)
                ));
                return results;
        }
    }

    // Get statistics by category
    getCategoryStatistics() {
        const stats = {};
        
        this.processedData.partsTree.forEach(part => {
            if (!stats[part.category]) {
                stats[part.category] = {
                    count: 0,
                    subcategories: new Set()
                };
            }
            stats[part.category].count++;
            if (part.subcategory) {
                stats[part.category].subcategories.add(part.subcategory);
            }
        });
        
        // Convert Sets to counts
        Object.keys(stats).forEach(category => {
            stats[category].subcategoryCount = stats[category].subcategories.size;
            delete stats[category].subcategories;
        });
        
        return stats;
    }

    // Export data to JSON
    exportToJSON() {
        return JSON.stringify(this.processedData, null, 2);
    }

    // Export data to CSV format
    exportToCSV(dataType = 'partsTree') {
        const data = this.processedData[dataType];
        if (!data || data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header] || '';
                return `"${value.toString().replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }
}

// Initialize and use the processor
const dataProcessor = new PartsDataProcessor();

// Auto-process data when page loads
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Show loading state
        if (window.showLoading) window.showLoading();
        
        // Process all data
        await dataProcessor.processAllData();
        
        // Update UI with processed data
        updateUIWithProcessedData();
        
        // Hide loading state
        if (window.hideLoading) window.hideLoading();
        
        console.log('Data processing completed successfully');
    } catch (error) {
        console.error('Error processing data:', error);
        if (window.hideLoading) window.hideLoading();
    }
});

function updateUIWithProcessedData() {
    // Update statistics cards
    const stats = dataProcessor.processedData.metadata;
    updateStatisticsCards(stats);
    
    // Update parts tree
    updatePartsTree(dataProcessor.processedData.partsTree);
    
    // Update dictionary
    updateDictionary(dataProcessor.processedData.dictionary);
    
    // Update reports
    updateReports(dataProcessor.processedData.reports);
}

function updateStatisticsCards(stats) {
    // Update total parts count
    const totalPartsElement = document.querySelector('.text-2xl');
    if (totalPartsElement) {
        totalPartsElement.textContent = stats.totalParts.toLocaleString();
    }
    
    // Update categories count
    const categoryElements = document.querySelectorAll('.text-2xl');
    if (categoryElements[1]) {
        categoryElements[1].textContent = stats.totalCategories;
    }
}

function updatePartsTree(partsData) {
    // This would update the parts tree UI
    console.log('Parts tree data:', partsData.length, 'items');
}

function updateDictionary(dictionaryData) {
    // This would update the dictionary UI
    console.log('Dictionary data:', dictionaryData.length, 'terms');
}

function updateReports(reportsData) {
    // This would update the reports UI
    console.log('Reports data:', reportsData.length, 'reports');
}

// Make dataProcessor available globally
window.dataProcessor = dataProcessor;
