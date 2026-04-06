/**
 * Retail Products Generator
 * Generator for various retail product categories
 */

class RetailProductsGenerator {
    constructor() {
        this.categories = {
            // Đồ gia dụng (Home Appliances)
            kitchen_appliances: {
                id: "cat_kitchen_appliances",
                name: "Đồ gia dụng nhà bếp",
                name_en: "Kitchen Appliances",
                name_ja: "キッチン家電",
                products: 45
            },
            home_cleaning: {
                id: "cat_home_cleaning",
                name: "Máy làm sạch",
                name_en: "Home Cleaning Appliances",
                name_ja: "掃除機器",
                products: 30
            },
            personal_care: {
                id: "cat_personal_care",
                name: "Chăm sóc cá nhân",
                name_en: "Personal Care Appliances",
                name_ja: "パーソナルケア",
                products: 35
            },
            
            // Đồ điện tử (Electronics)
            mobile_phones: {
                id: "cat_mobile_phones",
                name: "Điện thoại di động",
                name_en: "Mobile Phones",
                name_ja: "携帯電話",
                products: 40
            },
            laptops_computers: {
                id: "cat_laptops_computers",
                name: "Máy tính xách tay",
                name_en: "Laptops & Computers",
                name_ja: "ノートPC・コンピューター",
                products: 30
            },
            audio_video: {
                id: "cat_audio_video",
                name: "Thiết bị âm thanh, hình ảnh",
                name_en: "Audio & Video Equipment",
                name_ja: "音響・映像機器",
                products: 35
            },
            gaming_consoles: {
                id: "cat_gaming_consoles",
                name: "Máy chơi game",
                name_en: "Gaming Consoles",
                name_ja: "ゲーム機",
                products: 15
            },
            
            // Thời trang (Fashion)
            mens_clothing: {
                id: "cat_mens_clothing",
                name: "Quần áo nam",
                name_en: "Men's Clothing",
                name_ja: "メンズファッション",
                products: 50
            },
            womens_clothing: {
                id: "cat_womens_clothing",
                name: "Quần áo nữ",
                name_en: "Women's Clothing",
                name_ja: "レディスファッション",
                products: 60
            },
            shoes_footwear: {
                id: "cat_shoes_footwear",
                name: "Giày dép",
                name_en: "Shoes & Footwear",
                name_ja: "靴・フットウェア",
                products: 40
            },
            accessories: {
                id: "cat_accessories",
                name: "Phụ kiện thời trang",
                name_en: "Fashion Accessories",
                name_ja: "ファッションアクセサリー",
                products: 35
            },
            
            // Sức khỏe & Làm đẹp (Health & Beauty)
            skincare: {
                id: "cat_skincare",
                name: "Chăm sóc da",
                name_en: "Skincare Products",
                name_ja: "スキンケア",
                products: 45
            },
            makeup_cosmetics: {
                id: "cat_makeup_cosmetics",
                name: "Mỹ phẩm trang điểm",
                name_en: "Makeup & Cosmetics",
                name_ja: "メイクアップ・化粧品",
                products: 40
            },
            hair_care: {
                id: "cat_hair_care",
                name: "Chăm sóc tóc",
                name_en: "Hair Care Products",
                name_ja: "ヘアケア",
                products: 30
            },
            health_supplements: {
                id: "cat_health_supplements",
                name: "Thực phẩm chức năng",
                name_en: "Health Supplements",
                name_ja: "健康サプリメント",
                products: 35
            },
            
            // Thể thao & Dạo ngoại (Sports & Outdoor)
            fitness_equipment: {
                id: "cat_fitness_equipment",
                name: "Thiết bị fitness",
                name_en: "Fitness Equipment",
                name_ja: "フィットネス器具",
                products: 30
            },
            outdoor_gear: {
                id: "cat_outdoor_gear",
                name: "Dụng cụ dạo ngoại",
                name_en: "Outdoor Gear",
                name_ja: "アウトドア用品",
                products: 35
            },
            sports_clothing: {
                id: "cat_sports_clothing",
                name: "Quần áo thể thao",
                name_en: "Sports Clothing",
                name_ja: "スポーツウェア",
                products: 25
            },
            
            // Sách & Văn phòng (Books & Office)
            books: {
                id: "cat_books",
                name: "Sách",
                name_en: "Books",
                name_ja: "書籍",
                products: 60
            },
            stationery: {
                id: "cat_stationery",
                name: "Văn phòng phẩm",
                name_en: "Stationery",
                name_ja: "文房具",
                products: 40
            },
            office_equipment: {
                id: "cat_office_equipment",
                name: "Thiết bị văn phòng",
                name_en: "Office Equipment",
                name_ja: "オフィス機器",
                products: 25
            },
            
            // Đồ chơi & Giải trí (Toys & Entertainment)
            toys: {
                id: "cat_toys",
                name: "Đồ chơi",
                name_en: "Toys",
                name_ja: "おもちゃ",
                products: 45
            },
            games: {
                id: "cat_games",
                name: "Trò chơi",
                name_en: "Games",
                name_ja: "ゲーム",
                products: 30
            },
            hobbies: {
                id: "cat_hobbies",
                name: "Sở thích",
                name_en: "Hobbies",
                name_ja: "趣味",
                products: 25
            },
            
            // Nhà cửa & Nội thất (Home & Furniture)
            furniture: {
                id: "cat_furniture",
                name: "Nội thất",
                name_en: "Furniture",
                name_ja: "家具",
                products: 35
            },
            home_decor: {
                id: "cat_home_decor",
                name: "Trang trí nhà cửa",
                name_en: "Home Decor",
                name_ja: "インテリア",
                products: 30
            },
            bedding: {
                id: "cat_bedding",
                name: "Chăn ga gối",
                name_en: "Bedding",
                name_ja: "寝具",
                products: 25
            },
            
            // Siêu thị & Tạp hóa (Grocery & Food)
            food_beverages: {
                id: "cat_food_beverages",
                name: "Thực phẩm & Đồ uống",
                name_en: "Food & Beverages",
                name_ja: "食品・飲料",
                products: 50
            },
            snacks: {
                id: "cat_snacks",
                name: "Đồ ăn vặt",
                name_en: "Snacks",
                name_ja: "スナック",
                products: 40
            },
            household_essentials: {
                id: "cat_household_essentials",
                name: "Đồ dùng thiết yếu",
                name_en: "Household Essentials",
                name_ja: "日用品",
                products: 30
            }
        };
        
        this.brands = {
            kitchen_appliances: ["Panasonic", "Samsung", "LG", "Toshiba", "Sharp", "Electrolux", "Midea", "Philips"],
            home_cleaning: ["Dyson", "Xiaomi", "Roborock", "Ecovacs", "Shark", "Bissell", "Hoover", "Miele"],
            personal_care: ["Philips", "Panasonic", "Braun", "Oral-B", "Gillette", "Remington", "Conair", "BaByliss"],
            mobile_phones: ["Apple", "Samsung", "Xiaomi", "OPPO", "Vivo", "Huawei", "OnePlus", "Nokia"],
            laptops_computers: ["Dell", "HP", "Lenovo", "Apple", "ASUS", "Acer", "Microsoft", "MSI"],
            audio_video: ["Sony", "Bose", "JBL", "Sennheiser", "Audio-Technica", "LG", "Samsung", "Panasonic"],
            gaming_consoles: ["Sony", "Nintendo", "Microsoft", "Valve", "Razer", "ASUS", "Alienware"],
            mens_clothing: ["Nike", "Adidas", "Uniqlo", "H&M", "Zara", "Gap", "Levi's", "Tommy Hilfiger"],
            womens_clothing: ["Zara", "H&M", "Uniqlo", "Mango", "Forever 21", "Gap", "Nike", "Adidas"],
            shoes_footwear: ["Nike", "Adidas", "Puma", "New Balance", "ASICS", "Converse", "Vans", "Timberland"],
            accessories: ["Coach", "Michael Kors", "Kate Spade", "Fossil", "Ray-Ban", "Oakley", "Casio", "Seiko"],
            skincare: ["La Roche-Posay", "Cetaphil", "Neutrogena", "Olay", "L'Oréal", "Shiseido", "SK-II", "Innisfree"],
            makeup_cosmetics: ["MAC", "Maybelline", "L'Oréal", "Revlon", "Clinique", "Estée Lauder", "Dior", "Chanel"],
            hair_care: ["Pantene", "Head & Shoulders", "Dove", "L'Oréal", "Schwarzkopf", "TRESemmé", "Herbal Essences"],
            health_supplements: ["Blackmores", "Swisse", "Nature's Way", "Centrum", "GNC", "Now Foods", "Solgar", "Thompson's"],
            fitness_equipment: ["Nike", "Adidas", "Under Armour", "Reebok", "Puma", "ASICS", "New Balance", "Fitbit"],
            outdoor_gear: ["The North Face", "Patagonia", "Columbia", "Arc'teryx", "Marmot", "REI", "Outdoor Research"],
            books: ["Penguin", "Random House", "HarperCollins", "Simon & Schuster", "Macmillan", "Hachette", "Scholastic"],
            stationery: ["Muji", "Staedtler", "Faber-Castell", "Pilot", "Zebra", "Kaweco", "Lamy", "Moleskine"],
            office_equipment: ["Brother", "Canon", "Epson", "HP", "Xerox", "Ricoh", "Kyocera", "Sharp"],
            toys: ["LEGO", "Hasbro", "Mattel", "Bandai", "Takara Tomy", "Fisher-Price", "Barbie", "Hot Wheels"],
            games: ["Nintendo", "Sony", "Microsoft", "Steam", "Epic Games", "Ubisoft", "EA", "Activision"],
            hobbies: ["Tamiya", "Revell", "Airfix", "Fujimi", "Hasegawa", "Dragon", "Trumpeter", "Academy"],
            furniture: ["IKEA", "Ashley Furniture", "La-Z-Boy", "Williams-Sonoma", "Restoration Hardware", "West Elm"],
            home_decor: ["Muji", "IKEA", "Target", "West Elm", "CB2", "Pottery Barn", "Anthropologie", "Urban Outfitters"],
            bedding: ["Muji", "IKEA", "Brooklinen", "Parachute", "Boll & Branch", "Saatva", "Casper", "Purple"],
            food_beverages: ["Coca-Cola", "Pepsi", "Nestlé", "Unilever", "Kellogg's", "General Mills", "Danone", "Kraft"],
            snacks: ["Lay's", "Pringles", "Doritos", "Cheetos", "Oreo", "KitKat", "Snickers", "M&M's"],
            household_essentials: ["Procter & Gamble", "Unilever", "Colgate-Palmolive", "Kimberly-Clark", "SC Johnson"]
        };
        
        this.suppliers = [
            "Vietnam Distribution Co.", "Asia Pacific Trading", "Global Retail Solutions",
            "Southeast Asia Import Export", "Vietnam Consumer Goods", "Asian Market Direct",
            "Pacific Rim Trading", "Ho Chi Minh Trading Co.", "Hanoi Distribution Network",
            "Mekong Delta Supplies", "Central Vietnam Trading", "Saigon Import Export",
            "Da Nang Commercial Co.", "Can Tho Trading House", "Hai Phong Distribution"
        ];
        
        this.retailers = [
            "VinMart", "Co.opmart", "Big C", "Lotte Mart", "AEON Mall", "Takashimaya",
            "Central Retail", "Masan Consumer", "Saigon Co.op", "Bach Hoa Xanh",
            "FPT Shop", "Thế Giới Di Động", "Điện Máy Xanh", "Nguyễn Kim", "MediaMart"
        ];
    }
    
    // Generate kitchen appliances
    generateKitchenApplianceSpecs(index) {
        const applianceTypes = [
            "Tủ lạnh", "Máy giặt", "Máy sấy", "Lò vi sóng", "Máy rửa bát",
            "Bếp từ", "Bếp gas", "Máy xay sinh tố", "Nồi cơm điện", "Máy hút mùi",
            "Lò nướng", "Máy làm kem", "Máy ép trái cây", "Bình nóng lạnh", "Máy lọc nước"
        ];
        const type = applianceTypes[index % applianceTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Công suất (W)": 500 + (index * 100),
            "Điện áp (V)": 220,
            "Tần số (Hz)": 50,
            "Chất liệu": index % 2 === 0 ? "Inox cao cấp" : "Nhựa ABS",
            "Kích thước (mm)": `${400 + (index * 50)}x${300 + (index * 30)}x${500 + (index * 40)}`,
            "Trọng lượng (kg)": 5 + (index * 2),
            "Tính năng": index % 2 === 0 ? "Tiết kiệm điện" : "Thông minh",
            "Bảo hành (tháng)": 12 + (index * 6),
            "Xuất xứ": index % 2 === 0 ? "Nhật Bản" : "Hàn Quốc",
            "Chứng nhận": "ISO 9001, CE"
        };
    }
    
    // Generate mobile phone specs
    generateMobilePhoneSpecs(index) {
        const phoneTypes = ["Smartphone", "Basic Phone", "Foldable", "Gaming Phone", "Camera Phone"];
        const type = phoneTypes[index % phoneTypes.length];
        
        return {
            "Loại điện thoại": type,
            "Màn hình (inch)": 5.5 + (index % 3) * 0.5,
            "Độ phân giải": index % 2 === 0 ? "1080x2400" : "1440x3200",
            "Chipset": index % 3 === 0 ? "Snapdragon" : index % 3 === 1 ? "MediaTek" : "Apple A-series",
            "RAM (GB)": 4 + (index % 5) * 2,
            "Bộ nhớ trong (GB)": 64 + (index % 4) * 64,
            "Camera sau (MP)": 48 + (index * 12),
            "Camera trước (MP)": 12 + (index * 4),
            "Pin (mAh)": 4000 + (index * 500),
            "Hệ điều hành": index % 2 === 0 ? "Android" : "iOS",
            "Mạng": "5G, 4G LTE, 3G",
            "Tính năng": index % 2 === 0 ? "Face ID" : "Fingerprint",
            "Chống nước": index % 2 === 0 ? "IP68" : "IP67"
        };
    }
    
    // Generate clothing specs
    generateClothingSpecs(index, gender) {
        const clothingTypes = gender === "men" 
            ? ["Áo sơ mi", "Áo thun", "Quần jeans", "Quần tây", "Áo khoác", "Áo polo", "Quần short", "Áo nỉ"]
            : ["Váy", "Áo thun", "Quần jeans", "Chân váy", "Áo khoác", "Áo sơ mi", "Quần short", "Đầm"];
        
        const type = clothingTypes[index % clothingTypes.length];
        const materials = ["Cotton", "Polyester", "Linen", "Wool", "Denim", "Silk", "Rayon", "Nylon"];
        const material = materials[index % materials.length];
        
        return {
            "Loại trang phục": type,
            "Chất liệu": material,
            "Size": ["S", "M", "L", "XL", "XXL"][index % 5],
            "Màu sắc": ["Đen", "Trắng", "Xanh", "Đỏ", "Xám", "Nâu", "Be", "Hồng"][index % 8],
            "Kiểu dáng": index % 2 === 0 ? "Thời trang" : "Công sở",
            "Mùa": index % 3 === 0 ? "Xuân/Hè" : index % 3 === 1 ? "Thu/Đông" : "Bốn mùa",
            "Xuất xứ": index % 2 === 0 ? "Việt Nam" : "Trung Quốc",
            "Hướng dẫn giặt": index % 2 === 0 ? "Giặt máy" : "Giặt tay",
            "Bảo quản": "Phơi nơi thoáng mát"
        };
    }
    
    // Generate skincare specs
    generateSkincareSpecs(index) {
        const productTypes = [
            "Sữa rửa mặt", "Toner", "Serum", "Kem dưỡng ẩm", "Kem chống nắng",
            "Mặt nạ", "Tẩy tế bào chết", "Dưỡng mắt", "Dưỡng môi", "Xịt khoáng"
        ];
        const type = productTypes[index % productTypes.length];
        const skinTypes = ["Da dầu", "Da khô", "Da hỗn hợp", "Da nhạy cảm", "Da thường"];
        const skinType = skinTypes[index % skinTypes.length];
        
        return {
            "Loại sản phẩm": type,
            "Loại da phù hợp": skinType,
            "Thành phần chính": index % 2 === 0 ? "Hyaluronic Acid" : "Vitamin C",
            "Dung tích (ml)": 50 + (index * 25),
            "Công dụng": index % 2 === 0 ? "Dưỡng ẩm" : "Chống lão hóa",
            "Hương thơm": index % 2 === 0 ? "Không mùi" : "Thiên nhiên",
            "Bảo quản": "Nơi khô ráo, tránh ánh nắng",
            "Hạn sử dụng": "24 tháng",
            "Xuất xứ": index % 2 === 0 ? "Hàn Quốc" : "Nhật Bản",
            "Chứng nhận": "FDA, KFDA",
            "Cách dùng": index % 2 === 0 ? "Sáng & Tối" : "Chỉ sáng"
        };
    }
    
    // Generate book specs
    generateBookSpecs(index) {
        const genres = [
            "Tiểu thuyết", "Kinh doanh", "Tự lực", "Khoa học", "Lịch sử",
            "Truyện tranh", "Sách thiếu nhi", "Công nghệ", "Nấu ăn", "Sức khỏe"
        ];
        const genre = genres[index % genres.length];
        
        return {
            "Thể loại": genre,
            "Tác giả": `Tác giả ${(index % 20) + 1}`,
            "Nhà xuất bản": ["NXB Trẻ", "NXB Kim Đồng", "NXB Tổng hợp", "NXB Văn học", "NXB Giáo dục"][index % 5],
            "Số trang": 150 + (index * 50),
            "Kích thước (mm)": "130x200",
            "Loại bìa": index % 2 === 0 ? "Bìa mềm" : "Bìa cứng",
            "Năm xuất bản": 2020 + (index % 5),
            "Ngôn ngữ": "Tiếng Việt",
            "ISBN": `978-${600000000 + index * 1000}`,
            "Tái bản": index % 3 === 0 ? "Có" : "Không",
            "Độ tuổi": index % 2 === 0 ? "Trên 16 tuổi" : "Tất cả độ tuổi"
        };
    }
    
    // Generate food product specs
    generateFoodProductSpecs(index) {
        const foodTypes = [
            "Cà phê", "Trà", "Nước ngọt", "Sữa", "Bánh kẹo",
            "Mì ăn liền", "Gia vị", "Đồ hộp", "Rau củ quả", "Thịt cá"
        ];
        const type = foodTypes[index % foodTypes.length];
        
        return {
            "Loại sản phẩm": type,
            "Thương hiệu": this.brands.food_beverages[index % this.brands.food_beverages.length],
            "Trọng lượng (g)": 100 + (index * 50),
            "Hạn sử dụng": "12 tháng",
            "Điều kiện bảo quản": "Nơi khô ráo, thoáng mát",
            "Thành phần": index % 2 === 0 ? "Tự nhiên" : "Có thêm hương liệu",
            "Giá trị dinh dưỡng": "Thông tin trên bao bì",
            "Xuất xứ": index % 2 === 0 ? "Việt Nam" : "Thái Lan",
            "Chứng nhận": "ISO 22000, HACCP",
            "Bao bì": index % 2 === 0 ? "Hộp giấy" : "Túi nilon",
            "Số lượng": "Còn hàng"
        };
    }
    
    // Generate toy specs
    generateToySpecs(index) {
        const toyTypes = [
            "Đồ chơi giáo dục", "Xe đồ chơi", "Búp bê", "Lego", "Đồ chơi lắp ráp",
            "Trò chơi board", "Đồ chơi thể thao", "Đồ chơi âm nhạc", "Đồ chơi nghệ thuật", "Robot"
        ];
        const type = toyTypes[index % toyTypes.length];
        
        return {
            "Loại đồ chơi": type,
            "Độ tuổi": index % 3 === 0 ? "3-5 tuổi" : index % 3 === 1 ? "6-8 tuổi" : "9-12 tuổi",
            "Chất liệu": index % 2 === 0 ? "Nhựa an toàn" : "Gỗ",
            "Kích thước (mm)": `${100 + (index * 20)}x${80 + (index * 15)}x${50 + (index * 10)}`,
            "Trọng lượng (g)": 200 + (index * 100),
            "Màu sắc": "Đa sắc màu",
            "Tính năng": index % 2 === 0 ? "Phát triển tư duy" : "Rèn luyện kỹ năng",
            "An toàn": index % 2 === 0 ? "ASTM F963" : "EN71",
            "Số bộ phận": 10 + (index * 5),
            "Hướng dẫn": "Có sách hướng dẫn",
            "Xuất xứ": index % 2 === 0 ? "Việt Nam" : "Trung Quốc"
        };
    }
    
    // Generate fitness equipment specs
    generateFitnessEquipmentSpecs(index) {
        const equipmentTypes = [
            "Máy chạy bộ", "Xe đạp tập", "Tạ", "Thảm tập yoga", "Ghế tập tạ",
            "Dây nhảy", "Bóng yoga", "Găng tay tập", "Máy massage", "Vòng eo"
        ];
        const type = equipmentTypes[index % equipmentTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Chất liệu": index % 2 === 0 ? "Thép cao cấp" : "Nhựa PP",
            "Tải trọng tối đa (kg)": 100 + (index * 20),
            "Kích thước (mm)": `${1000 + (index * 100)}x${500 + (index * 50)}x${1200 + (index * 100)}`,
            "Trọng lượng (kg)": 20 + (index * 10),
            "Tính năng": index % 2 === 0 ? "Đếm calo" : "Đo nhịp tim",
            "Màn hình hiển thị": index % 2 === 0 ? "LCD" : "LED",
            "Bảo hành (tháng)": 12 + (index * 6),
            "Lắp đặt": "Dễ dàng lắp đặt",
            "Phụ kiện": "Sách hướng dẫn, dụng cụ lắp ráp",
            "Xuất xứ": index % 2 === 0 ? "Đài Loan" : "Trung Quốc"
        };
    }
    
    // Generate generic product
    generateProduct(categoryId, index) {
        const category = this.categories[categoryId];
        const brand = this.brands[categoryId] ? this.brands[categoryId][index % this.brands[categoryId].length] : "Generic Brand";
        const supplier = this.suppliers[index % this.suppliers.length];
        const retailer = this.retailers[index % this.retailers.length];
        
        let specifications = {};
        
        // Generate specifications based on category
        if (categoryId.includes("kitchen_appliances")) {
            specifications = this.generateKitchenApplianceSpecs(index);
        } else if (categoryId.includes("mobile_phones")) {
            specifications = this.generateMobilePhoneSpecs(index);
        } else if (categoryId.includes("clothing")) {
            const gender = categoryId.includes("mens") ? "men" : "women";
            specifications = this.generateClothingSpecs(index, gender);
        } else if (categoryId.includes("skincare")) {
            specifications = this.generateSkincareSpecs(index);
        } else if (categoryId.includes("books")) {
            specifications = this.generateBookSpecs(index);
        } else if (categoryId.includes("food") || categoryId.includes("snacks")) {
            specifications = this.generateFoodProductSpecs(index);
        } else if (categoryId.includes("toys")) {
            specifications = this.generateToySpecs(index);
        } else if (categoryId.includes("fitness")) {
            specifications = this.generateFitnessEquipmentSpecs(index);
        } else {
            // Generic specifications
            specifications = {
                "Màu sắc": ["Đen", "Trắng", "Xanh", "Đỏ", "Xám"][index % 5],
                "Kích thước": "Standard",
                "Trọng lượng": "1kg",
                "Chất liệu": "High Quality",
                "Xuất xứ": "Vietnam"
            };
        }
        
        return {
            id: `RTL${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`,
            sku: `RTL${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`,
            name: `${category.name.split(' ')[0]} ${index + 1}`,
            name_en: `${category.name_en.split(' ')[0]} ${index + 1}`,
            name_ja: `${category.name_ja.split(' ')[0]} ${index + 1}`,
            description: `Sản phẩm ${category.name.toLowerCase()} chất lượng cao, phù hợp với nhu cầu tiêu dùng hiện đại`,
            description_en: `High quality ${category.name_en.toLowerCase()} suitable for modern consumer needs`,
            description_ja: `現代の消費者ニーズに適した高品質な${category.name_ja}`,
            category_id: category.id,
            subcategory: category.name,
            subcategory_en: category.name_en,
            subcategory_ja: category.name_ja,
            brand: brand,
            manufacturer: brand,
            origin: "Vietnam",
            specifications: specifications,
            pricing: {
                retail_price: 50000 + (index * 10000),
                wholesale_price: 40000 + (index * 8000),
                currency: "VND",
                min_order_quantity: 1,
                price_unit: "cái"
            },
            inventory: {
                in_stock: 1000 + (index * 100),
                available: true,
                stock_status: "Còn hàng",
                warehouse_location: "Hà Nội, TP.HCM, Đà Nẵng",
                lead_time: "1-2 ngày"
            },
            images: [
                {
                    url: `https://example.com/images/RTL${String(index + 1).padStart(3, '0')}-1.jpg`,
                    alt: `${category.name} ${index + 1} - Tổng quan`,
                    type: "main"
                },
                {
                    url: `https://example.com/images/RTL${String(index + 1).padStart(3, '0')}-2.jpg`,
                    alt: `${category.name} ${index + 1} - Chi tiết`,
                    type: "detail"
                }
            ],
            attributes: [
                {
                    name: "Mã sản phẩm",
                    value: `RTL${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`
                },
                {
                    name: "Thương hiệu",
                    value: brand
                },
                {
                    name: "Xuất xứ",
                    value: "Vietnam"
                },
                {
                    name: "Bảo hành",
                    value: "12 tháng"
                }
            ],
            supplier: supplier,
            retailer: retailer,
            tags: [category.name.toLowerCase(), "bán lẻ", "chất lượng cao"],
            rating: 4.0 + (index % 10) * 0.1,
            reviews: 50 + (index * 10),
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString()
        };
    }
    
    // Generate all products for a category
    generateCategoryProducts(categoryId) {
        const category = this.categories[categoryId];
        const products = [];
        
        for (let i = 0; i < category.products; i++) {
            products.push(this.generateProduct(categoryId, i));
        }
        
        return products;
    }
    
    // Export all retail products
    exportRetailProducts() {
        const allProducts = [];
        const categoryData = [];
        
        Object.entries(this.categories).forEach(([categoryId, category]) => {
            const products = this.generateCategoryProducts(categoryId);
            allProducts.push(...products);
            
            categoryData.push({
                id: category.id,
                name: category.name,
                name_en: category.name_en,
                name_ja: category.name_ja,
                description: `Danh mục ${category.name.toLowerCase()} với ${category.products} sản phẩm`,
                description_en: `${category.name_en} category with ${category.products} products`,
                description_ja: `${category.name_ja}カテゴリ、${category.products}製品`,
                icon: "fas fa-shopping-cart",
                parent_id: null,
                level: 1,
                product_count: category.products,
                specifications: Object.keys(this.generateProduct(categoryId, 0).specifications),
                applications: ["retail", "consumer", "ecommerce"]
            });
        });
        
        return {
            metadata: {
                version: "1.0",
                generated_date: new Date().toISOString(),
                total_products: allProducts.length,
                total_categories: categoryData.length,
                total_brands: Object.values(this.brands).flat().length,
                total_suppliers: this.suppliers.length,
                total_retailers: this.retailers.length,
                source: "Retail Products Generator",
                description: "Bộ dữ liệu sản phẩm bán lẻ đa ngành với đầy đủ thông tin chi tiết",
                last_updated: new Date().toISOString(),
                data_completeness: "100%",
                image_coverage: "100%"
            },
            categories: categoryData,
            products: allProducts,
            statistics: {
                by_category: categoryData.map(cat => ({
                    category_id: cat.id,
                    name: cat.name,
                    product_count: cat.product_count,
                    percentage: ((cat.product_count / allProducts.length) * 100).toFixed(1) + '%'
                })),
                by_brand: this.calculateBrandStatistics(allProducts),
                by_price_range: this.calculatePriceRangeStatistics(allProducts),
                by_rating: this.calculateRatingStatistics(allProducts)
            }
        };
    }
    
    // Calculate brand statistics
    calculateBrandStatistics(products) {
        const brandCounts = {};
        products.forEach(product => {
            brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
        });
        
        return Object.entries(brandCounts)
            .map(([brand, count]) => ({
                brand: brand,
                product_count: count,
                percentage: ((count / products.length) * 100).toFixed(1) + '%'
            }))
            .sort((a, b) => b.product_count - a.product_count);
    }
    
    // Calculate price range statistics
    calculatePriceRangeStatistics(products) {
        const ranges = {
            "Dưới 100k": 0,
            "100k-500k": 0,
            "500k-1M": 0,
            "1M-5M": 0,
            "Trên 5M": 0
        };
        
        products.forEach(product => {
            const price = product.pricing.retail_price;
            if (price < 100000) ranges["Dưới 100k"]++;
            else if (price < 500000) ranges["100k-500k"]++;
            else if (price < 1000000) ranges["500k-1M"]++;
            else if (price < 5000000) ranges["1M-5M"]++;
            else ranges["Trên 5M"]++;
        });
        
        return Object.entries(ranges).map(([range, count]) => ({
            price_range: range,
            product_count: count,
            percentage: ((count / products.length) * 100).toFixed(1) + '%'
        }));
    }
    
    // Calculate rating statistics
    calculateRatingStatistics(products) {
        const ratings = {
            "5.0": 0,
            "4.0-4.9": 0,
            "3.0-3.9": 0,
            "2.0-2.9": 0,
            "Dưới 2.0": 0
        };
        
        products.forEach(product => {
            const rating = product.rating;
            if (rating >= 5.0) ratings["5.0"]++;
            else if (rating >= 4.0) ratings["4.0-4.9"]++;
            else if (rating >= 3.0) ratings["3.0-3.9"]++;
            else if (rating >= 2.0) ratings["2.0-2.9"]++;
            else ratings["Dưới 2.0"]++;
        });
        
        return Object.entries(ratings).map(([range, count]) => ({
            rating_range: range,
            product_count: count,
            percentage: ((count / products.length) * 100).toFixed(1) + '%'
        }));
    }
}

module.exports = RetailProductsGenerator;
