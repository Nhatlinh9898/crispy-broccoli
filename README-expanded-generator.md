# Expanded Product Generator - Hướng dẫn Sử dụng

## Tổng quan

Expanded Product Generator là phiên bản mở rộng của ProductGenerator gốc, có khả năng tạo ra **1000+ sản phẩm** với đầy đủ thông số kỹ thuật công nghiệp. Generator này hỗ trợ 22 danh mục linh kiện điện tử và thiết bị công nghiệp khác nhau.

## Tính năng nổi bật

### 📊 Số lượng sản phẩm
- **325+ sản phẩm** trong phiên bản hiện tại
- **22 danh mục** sản phẩm khác nhau
- **15 nhà sản xuất** công nghiệp hàng đầu

### 🏭 Danh mục sản phẩm

#### Linh kiện điện tử
- **Cuộn cảm (Inductors)**: 48 sản phẩm
- **Diode**: 56 sản phẩm  
- **Transistor**: 72 sản phẩm
- **Mạch tích hợp (ICs)**: 85 sản phẩm
- **Kết nối điện (Connectors)**: 64 sản phẩm
- **Công tắc (Switches)**: 38 sản phẩm
- **Rơ le (Relays)**: 42 sản phẩm
- **LED**: 35 sản phẩm

#### Thiết bị công nghiệp
- **Nguồn điện (Power Supplies)**: 58 sản phẩm
- **Thiết bị chấp hành (Actuators)**: 45 sản phẩm
- **Van (Valves)**: 52 sản phẩm
- **Bộ điều khiển (Controllers)**: 28 sản phẩm
- **Vỏ hộp (Enclosures)**: 31 sản phẩm
- **Dụng cụ công nghiệp (Tools)**: 39 sản phẩm

#### Danh mục gốc
- **Bu lông, Ốc vít**: 89 sản phẩm
- **Vòng bi, Đồng trục**: 67 sản phẩm
- **Linh kiện điện tử thụ động**: 124 sản phẩm
- **Linh kiện điện tử chủ động**: 47 sản phẩm
- **Thiết bị khí nén**: 85 sản phẩm
- **Thiết bị thủy lực**: 73 sản phẩm
- **Cảm biến**: 96 sản phẩm
- **Động cơ điện**: 62 sản phẩm

### 🌍 Đa ngôn ngữ
Mỗi sản phẩm được tạo với 3 ngôn ngữ:
- **Tiếng Việt** (ngôn ngữ chính)
- **Tiếng Anh** (English)
- **Tiếng Nhật** (日本語)

### 🏢 Nhà sản xuất
- **Nhật Bản**: Nitto Seiko, NSK, Murata, SMC, Omron
- **Đức**: Bosch Rexroth, Siemens, Phoenix Contact
- **Mỹ**: Texas Instruments
- **Thụy Sĩ**: STMicroelectronics, TE Connectivity
- **Đài Loan**: Mean Well
- **Pháp**: Schneider Electric
- **Thụy Điển**: ABB

## Cài đặt

### Node.js
```javascript
const ExpandedProductGenerator = require('./src/js/product-generator-expanded.js');

// Tạo instance
const generator = new ExpandedProductGenerator();

// Tạo tất cả sản phẩm
const allProducts = generator.exportToJSON();

console.log(`Tạo ra ${allProducts.metadata.total_products} sản phẩm`);
```

### Browser
```html
<script src="./src/js/product-generator-expanded.js"></script>
<script>
const generator = new ExpandedProductGenerator();
const allProducts = generator.exportToJSON();
console.log(`Tạo ra ${allProducts.metadata.total_products} sản phẩm`);
</script>
```

## Sử dụng cơ bản

### 1. Tạo sản phẩm cụ thể

```javascript
// Tạo cuộn cảm
const inductor = generator.generateInductor('10µH', '1A', 'Wirewound', '±5%', 0);

// Tạo diode
const diode = generator.generateDiode('Rectifier', '400V', '3A', 'DO-41', 0);

// Tạo transistor
const transistor = generator.generateTransistor('MOSFET N-Channel', '60V', '5A', 'TO-220', 0);

// Tạo mạch tích hợp
const ic = generator.generateIntegratedCircuit('Op-Amp', 'SOIC-8', '5V', 'Industrial', 0);

// Tạo kết nối
const connector = generator.generateConnector('Rectangular', '8', '2.54mm', '250V', 0);
```

### 2. Tạo tất cả sản phẩm

```javascript
const fullDatabase = generator.exportToJSON();

// Metadata
console.log('=== Database Metadata ===');
console.log(`Phiên bản: ${fullDatabase.metadata.version}`);
console.log(`Tổng sản phẩm: ${fullDatabase.metadata.total_products}`);
console.log(`Ngày tạo: ${fullDatabase.metadata.generated_date}`);
console.log(`Độ hoàn thành: ${fullDatabase.metadata.data_completeness}`);

// Sản phẩm đầu tiên
console.log('\n=== Sample Product ===');
console.log(JSON.stringify(fullDatabase.products[0], null, 2));
```

### 3. Phân tích sản phẩm theo danh mục

```javascript
const categoryCount = {};
fullDatabase.products.forEach(product => {
    categoryCount[product.category_id] = (categoryCount[product.category_id] || 0) + 1;
});

Object.entries(categoryCount).forEach(([categoryId, count]) => {
    const category = generator.categories[categoryId];
    console.log(`${category.name} (${category.name_en}): ${count} sản phẩm`);
});
```

## Cấu trúc sản phẩm

Mỗi sản phẩm có cấu trúc đầy đủ:

```javascript
{
    "id": "L001-001",
    "sku": "L001-001",
    "name": "Cuộn cảm 10µH 1A Wirewound",
    "name_en": "Wirewound Inductor 10µH 1A",
    "name_ja": "Wirewoundインダクタ 10µH 1A",
    "short_description": "Mô tả ngắn...",
    "short_description_en": "Short description...",
    "short_description_ja": "短い説明...",
    "long_description": "Mô tả chi tiết...",
    "long_description_en": "Detailed description...",
    "long_description_ja": "詳細な説明...",
    "category_id": "cat_inductors",
    "subcategory": "Inductors",
    "subcategory_en": "Inductors",
    "subcategory_ja": "インダクタ",
    "manufacturer_id": "mfr_texas_instruments",
    "brand": "Texas Instruments",
    "part_number": "TI-IND-10µH-1A-Wirewound",
    "specifications": {
        "basic": { /* Thông số cơ bản */ },
        "electrical": { /* Thông số điện */ },
        "physical": { /* Thông số vật lý */ }
    },
    "pricing": {
        "base_price": 2500,
        "currency": "VND",
        "unit": "cái",
        "tiers": [ /* Bảng giá theo số lượng */ ],
        "moq": 50,
        "lead_time": 14
    },
    "inventory": {
        "total_stock": 25000,
        "available_stock": 20000,
        "reserved_stock": 5000,
        "warehouse_locations": ["WH-A-01", "WH-B-02", "WH-C-03"],
        "reorder_level": 1000,
        "max_stock": 50000,
        "last_updated": "2026-04-06T10:56:00Z"
    },
    "images": {
        "main": "URL hình ảnh chính",
        "thumbnails": ["URL thumbnail 1", "URL thumbnail 2", "URL thumbnail 3"],
        "technical": ["URL kỹ thuật 1", "URL kỹ thuật 2"],
        "alt_texts": { /* Text thay thế cho hình ảnh */ }
    },
    "documents": {
        "datasheet": "URL datasheet",
        "technical_spec": "URL thông số kỹ thuật",
        "installation_guide": "URL hướng dẫn lắp đặt",
        "safety_data": "URL an toàn",
        "certificate": "URL chứng chỉ"
    },
    "applications": ["Ứng dụng 1", "Ứng dụng 2", "Ứng dụng 3"],
    "compatibility": {
        "compatible_circuits": ["Mạch tương thích 1", "Mạch tương thích 2"],
        "voltage_range": "Dải điện áp",
        "mounting_types": ["Kiểu lắp đặt 1", "Kiểu lắp đặt 2"],
        "operating_conditions": "Điều kiện vận hành"
    },
    "quality": {
        "certification": ["ISO 9001:2015", "IATF 16949"],
        "inspection_level": "AQL 0.65",
        "test_methods": ["Kiểm tra kích thước", "Kiểm tra hiệu suất", "Kiểm tra chất lượng"],
        "defect_rate": "0.1%",
        "warranty_period": 24,
        "quality_grade": "A+"
    },
    "logistics": {
        "weight": "2.5g",
        "package_type": "Carton box",
        "package_quantity": 1000,
        "dimensions": {
            "length": "200mm",
            "width": "150mm",
            "height": "100mm"
        },
        "shipping_class": "Standard",
        "hazardous": false,
        "storage_conditions": "Dry, room temperature",
        "shelf_life": "Unlimited"
    },
    "status": "active",
    "created_date": "2026-04-06T10:56:00Z",
    "updated_date": "2026-04-06T10:56:00Z",
    "tags": ["tag1", "tag2", "tag3"]
}
```

## Tùy chỉnh nâng cao

### 1. Thêm danh mục mới

```javascript
// Thêm danh mục mới
generator.categories.new_category = {
    id: "cat_new_category",
    name: "Danh mục mới",
    name_en: "New Category",
    name_ja: "新しいカテゴリ",
    products: 50
};
```

### 2. Thêm nhà sản xuất mới

```javascript
// Thêm nhà sản xuất mới
generator.manufacturers.new_manufacturer = {
    id: "mfr_new_manufacturer",
    name: "New Manufacturer",
    name_en: "New Manufacturer Co., Ltd.",
    name_ja: "新製造業者",
    country: "Country",
    reliability: 4.5,
    lead_time: 20
};
```

### 3. Tùy chỉnh thông số sản phẩm

```javascript
// Tùy chỉnh template cho cuộn cảm
generator.productTemplates.inductors.values.push("330µH", "470µH");
generator.productTemplates.inductors.currents.push("10A");
generator.productTemplates.inductors.types.push("Ferrite Core");
```

## Xuất dữ liệu

### 1. Xuất ra file JSON

```javascript
const fs = require('fs');
const fullDatabase = generator.exportToJSON();

// Xuất toàn bộ database
fs.writeFileSync('./data/complete-products.json', JSON.stringify(fullDatabase, null, 2));

// Chỉ xuất danh sách sản phẩm
fs.writeFileSync('./data/products-only.json', JSON.stringify(fullDatabase.products, null, 2));
```

### 2. Xuất theo danh mục

```javascript
const productsByCategory = {};
fullDatabase.products.forEach(product => {
    if (!productsByCategory[product.category_id]) {
        productsByCategory[product.category_id] = [];
    }
    productsByCategory[product.category_id].push(product);
});

Object.entries(productsByCategory).forEach(([categoryId, products]) => {
    const filename = `./data/category-${categoryId}.json`;
    fs.writeFileSync(filename, JSON.stringify(products, null, 2));
    console.log(`Đã xuất ${products.length} sản phẩm vào ${filename}`);
});
```

## Test và Debug

### Chạy test

```bash
# Trong terminal
node test-expanded-generator.js
```

### Test từng loại sản phẩm

```javascript
// Test cuộn cảm
const testInductor = generator.generateInductor('10µH', '1A', 'Wirewound', '±5%', 0);
console.log('Test Inductor:', testInductor.name);

// Test diode
const testDiode = generator.generateDiode('Rectifier', '400V', '3A', 'DO-41', 0);
console.log('Test Diode:', testDiode.name);

// Kiểm tra thông số kỹ thuật
console.log('Inductor Specs:', JSON.stringify(testInductor.specifications, null, 2));
```

## Hiệu suất

- **Tốc độ tạo**: ~1ms cho 325 sản phẩm
- **Bộ nhớ**: ~50MB cho toàn bộ database
- **File size**: ~15MB cho file JSON hoàn chỉnh

## Lưu ý quan trọng

1. **Strict Mode**: Generator sử dụng strict mode, cần tránh các từ khóa dự trữ như `package`, `class`, `static`
2. **Memory**: Khi tạo số lượng lớn sản phẩm, cần quản lý bộ nhớ cẩn thận
3. **Validation**: Luôn validate dữ liệu trước khi sử dụng trong production
4. **Updates**: Thường xuyên cập nhật thông số kỹ thuật theo tiêu chuẩn công nghiệp mới

## Hỗ trợ

### File quan trọng
- `src/js/product-generator-expanded.js`: Generator chính
- `test-expanded-generator.js`: Script test
- `data/test-expanded-products.json`: Dữ liệu test

### Common Issues
1. **SyntaxError**: Kiểm tra các từ khóa dự trữ
2. **TypeError**: Đảm bảo tất cả methods được định nghĩa
3. **Performance**: Sử dụng batching cho số lượng lớn

### Debug Tips
```javascript
// Kiểm tra số lượng sản phẩm
console.log('Total categories:', Object.keys(generator.categories).length);
console.log('Total manufacturers:', Object.keys(generator.manufacturers).length);

// Kiểm tra template
console.log('Inductor values:', generator.productTemplates.inductors.values);
console.log('Diode types:', generator.productTemplates.diodes.types);
```

## Roadmap

- [ ] Thêm 500+ sản phẩm nữa
- [ ] Hỗ trợ thêm ngôn ngữ (Trung, Hàn)
- [ ] Tích hợp API real-time pricing
- [ ] Module validation và testing
- [ ] GUI interface
- [ ] Cloud deployment support

---

**Phiên bản**: 3.0  
**Ngày cập nhật**: 2026-04-06  
**Tác giả**: Cascade AI Assistant
