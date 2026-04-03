# Hệ thống Thông tin Phân loại Linh kiện - Phiên bản Tiếng Việt

## Tổng quan

Đây là một hệ thống thông tin web hiện đại để hiển thị và quản lý dữ liệu master phân loại linh kiện bằng tiếng Việt. Hệ thống chuyển đổi các sheet dữ liệu HTML được xuất từ Excel thành một ứng dụng web tương tác và dễ sử dụng.

## Tính năng

### 🎨 Thiết kế UI Hiện đại
- Thiết kế đáp ứng với Tailwind CSS
- Điều hướng dựa trên tab trực quan
- Hiệu ứng hoạt hình và chuyển tiếp
- Giao diện thân thiện với thiết bị di động

### 📊 Chức năng Quản lý Dữ liệu
- Quản lý tích hợp **11 sheet dữ liệu**
- Hỗ trợ **15,000+** dữ liệu linh kiện
- Tìm kiếm dữ liệu thời gian thực
- Lọc theo danh mục
- Hiển thị thông tin chi tiết

### 🔍 Chức năng Tìm kiếm Mạnh mẽ
- Tìm kiếm theo tên linh kiện, mã, phân loại
- Hiển thị kết quả tìm kiếm thời gian thực
- Truy cập trực tiếp đến trang chi tiết

### 📈 Chức năng Báo cáo
- Thống kê phân loại linh kiện
- Báo cáo tình trạng kho
- Phân tích xu hướng giá
- Xuất dữ liệu định dạng PDF/Excel

## Cấu trúc Hệ thống

### Danh sách Sheet Dữ liệu

| Tên sheet | Nội dung | Mô tả |
|---------|---------|-------|
| Cách nhập liệu | sheet001 | Hướng dẫn nhập dữ liệu |
| Lịch sử với NSSOL | sheet002 | Thông tin lịch sử liên quan NSSOL |
| Master Cây phân loại Linh kiện | sheet003 | Dữ liệu phân cấp linh kiện chính |
| Chỉ mục Furigana Tên linh kiện | sheet004 | Chỉ mục furigana tên linh kiện |
| Cấu trúc Chuỗi Tên linh kiện | sheet005 | Quy tắc cấu trúc chuỗi tên linh kiện |
| Cây phân loại PIVOT | sheet006 | Dữ liệu phân loại định dạng bảng pivot |
| Từ điển DFK | sheet007 | Dữ liệu từ điển thuật ngữ |
| Phân loại Hiện trạng | sheet008 | Tình trạng phân loại hiện tại |
| Lựa chọn | sheet009 | Dữ liệu lựa chọn khác nhau |
| Sheet4 | sheet010 | Dữ liệu phụ trợ |
| Kết quả Xuất Báo cáo | sheet011 | Danh sách báo cáo đã tạo |

## Cấu trúc File

```
Phan_loai_linh_kien_master_files/
├── index.html              # Trang ứng dụng chính (Tiếng Nhật)
├── index-vi.html           # Trang ứng dụng chính (Tiếng Việt)
├── data-processor.js       # Script xử lý dữ liệu
├── stylesheet.css          # Bảng kiểu
├── sheet001.htm - sheet011.htm  # Sheet dữ liệu gốc
├── image001.png - image1749.png # Hình ảnh liên quan
├── filelist.xml            # Danh sách file
├── tabstrip.htm            # Tab strip
└── README.md               # File này
```

## Đặc điểm Kỹ thuật

### Công nghệ Frontend
- **HTML5**: Đánh dấu ngữ nghĩa
- **CSS3**: Framework Tailwind CSS
- **JavaScript (ES6+):** Các tính năng JavaScript hiện đại
- **Font Awesome:** Thư viện biểu tượng

### Xử lý Dữ liệu
- **Bộ phân tích DOM:** Phân tích dữ liệu bảng HTML
- **Xử lý không đồng bộ:** Tải dữ liệu dựa trên Promise
- **Tạo nội dung động:** Tạo UI bằng JavaScript

### Hỗ trợ Trình duyệt
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Cài đặt và Sử dụng

### 1. Sắp xếp File
Đặt tất cả file trong cùng một thư mục.

### 2. Khởi động Web Server
Bạn cần host file qua một web server cục bộ.

#### Sử dụng Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Sử dụng Node.js:
```bash
npx http-server -p 8000
```

#### Sử dụng PHP:
```bash
php -S localhost:8000
```

### 3. Truy cập
Mở trình duyệt và truy cập `http://localhost:8000`.

### 4. Chuyển đổi Ngôn ngữ
Sử dụng bộ chuyển đổi ngôn ngữ ở góc trên bên phải để chuyển giữa Tiếng Nhật và Tiếng Việt:
- 🇯🇵 **日本語** - Phiên bản Tiếng Nhật
- 🇻🇳 **Tiếng Việt** - Phiên bản Tiếng Việt

## Chi tiết Tính năng

### Chức năng Chính

#### 🏠 Tổng quan Dashboard
- Hiển thị thống kê hệ thống
- Nút hành động nhanh
- Danh sách sheet dữ liệu

#### 🌳 Cây Phân loại Linh kiện
- Hiển thị phân cấp linh kiện
- Hiển thị số lượng theo danh mục
- Chức năng mở rộng/thu gọn

#### 📋 Danh sách Linh kiện
- Hiển thị dạng bảng
- Chức năng sắp xếp và lọc
- Phân trang

#### 📚 Từ điển DFK
- Hiển thị thuật ngữ và định nghĩa
- Phân loại theo danh mục
- Chức năng tìm kiếm

#### 📊 Báo cáo
- Các báo cáo thống kê khác nhau
- Chức năng xuất
- Lịch sử báo cáo

### Chức năng Tìm kiếm

#### 🔍 Tìm kiếm Toàn văn
- Tìm kiếm theo tên, mã, phân loại linh kiện
- Kết quả tìm kiếm thời gian thực
- Làm nổi bật kết quả tìm kiếm

#### 📱 Hỗ trợ Di động
- Giao diện thân thiện với cảm ứng
- Thiết kế đáp ứng
- Tối ưu hóa cho di động

## Tùy chỉnh

### Thay đổi Chủ đề
Bạn có thể tùy chỉnh chủ đề bằng cách thay đổi các lớp CSS trong `index-vi.html`.

```html
<!-- Thay đổi chủ đề màu -->
<style>
    .bg-blue-600 { background-color: #your-color; }
    .text-blue-600 { color: #your-color; }
</style>
```

### Thêm Nguồn dữ liệu
Bạn có thể thêm nguồn dữ liệu mới bằng cách sửa đổi `data-processor.js`.

```javascript
// Thêm nguồn dữ liệu mới
async extractNewData() {
    const data = await this.parseSheetData('new-sheet.htm');
    // Logic xử lý dữ liệu
    return processedData;
}
```

## Gỡ rối

### Vấn đề Thường gặp

#### Hỏi: Dữ liệu không hiển thị
Đáp: Đảm bảo bạn truy cập qua web server. Nếu mở file trực tiếp, các hạn chế bảo mật sẽ ngăn hoạt động.

#### Hỏi: Chữ tiếng Việt bị lỗi hiển thị
Đáp: Đảm bảo file được mã hóa UTF-8.

#### Hỏi: Tìm kiếm không hoạt động
Đáp: Đảm bảo JavaScript được bật trong trình duyệt.

### Gỡ lỗi

1. Mở công cụ nhà phát triển trình duyệt (F12)
2. Kiểm tra lỗi trong tab Console
3. Kiểm tra tải file trong tab Network

## Tối ưu hóa Hiệu suất

### Tối ưu hóa Tải dữ liệu
- Chia dữ liệu lớn để tải từng phần
- Sử dụng xử lý không đồng bộ
- Triển khai chức năng cache

### Tối ưu hóa UI
- Triển khai cuộn ảo
- Tải hình ảnh chậm
- Tối ưu hóa hoạt ảnh CSS

## Cân nhắc Bảo mật

- Chống XSS: Làm sạch dữ liệu đầu vào
- Chống CSRF: Sử dụng token
- Xác thực dữ liệu: Kiểm tra kép ở client và server

## Giấy phép

Dự án này được cung cấp theo Giấy phép MIT.

## Đóng góp

Báo cáo lỗi và yêu cầu tính năng được chào đón qua GitHub Issues.

## Lịch sử Cập nhật

### v1.1.0 (2026-04-03)
- Thêm hỗ trợ Tiếng Việt
- Bộ chuyển đổi ngôn ngữ
- Cải thiện UI/UX
- Tối ưu hóa cho người dùng Việt Nam

### v1.0.0 (2022-07-26)
- Phiên bản đầu tiên
- Chức năng hiển thị dữ liệu cơ bản
- Triển khai chức năng tìm kiếm
- Thiết kế đáp ứng

---

## Liên hệ

Để được hỗ trợ kỹ thuật và các câu hỏi, vui lòng liên hệ:

- Email: support@example.com
- GitHub: https://github.com/your-repo

---

*Hệ thống này được phát triển để đáp ứng nhu cầu quản lý linh kiện trong ngành công nghiệp Việt Nam.*
