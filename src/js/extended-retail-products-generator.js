/**
 * Extended Retail Products Generator - Phase 2
 * Generator for additional retail product categories
 */

class ExtendedRetailProductsGenerator {
    constructor() {
        this.categories = {
            // Đồ trẻ em & Mẹ và bé (Baby & Kids)
            baby_care: {
                id: "cat_baby_care",
                name: "Chăm sóc bé",
                name_en: "Baby Care",
                name_ja: "ベビーケア",
                products: 40
            },
            baby_food: {
                id: "cat_baby_food",
                name: "Sữa bột & Đồ ăn dặm",
                name_en: "Baby Formula & Food",
                name_ja: "粉ミルク・離乳食",
                products: 35
            },
            diapers: {
                id: "cat_diapers",
                name: "Tã bỉm",
                name_en: "Diapers",
                name_ja: "おむつ",
                products: 25
            },
            baby_clothing: {
                id: "cat_baby_clothing",
                name: "Quần áo trẻ em",
                name_en: "Baby Clothing",
                name_ja: "ベビー服",
                products: 45
            },
            toys_baby: {
                id: "cat_toys_baby",
                name: "Đồ chơi trẻ em",
                name_en: "Baby Toys",
                name_ja: "ベビーおもちゃ",
                products: 30
            },
            
            // Chăm sóc thú cưng (Pet Care)
            pet_food: {
                id: "cat_pet_food",
                name: "Thức ăn thú cưng",
                name_en: "Pet Food",
                name_ja: "ペットフード",
                products: 40
            },
            pet_accessories: {
                id: "cat_pet_accessories",
                name: "Phụ kiện thú cưng",
                name_en: "Pet Accessories",
                name_ja: "ペットアクセサリー",
                products: 35
            },
            pet_grooming: {
                id: "cat_pet_grooming",
                name: "Chăm sóc thú cưng",
                name_en: "Pet Grooming",
                name_ja: "ペットグルーミング",
                products: 25
            },
            pet_toys: {
                id: "cat_pet_toys",
                name: "Đồ chơi thú cưng",
                name_en: "Pet Toys",
                name_ja: "ペットおもちゃ",
                products: 20
            },
            
            // Ô tô & Xe máy (Automotive)
            car_accessories: {
                id: "cat_car_accessories",
                name: "Phụ kiện ô tô",
                name_en: "Car Accessories",
                name_ja: "車アクセサリー",
                products: 45
            },
            car_care: {
                id: "cat_car_care",
                name: "Chăm sóc ô tô",
                name_en: "Car Care",
                name_ja: "車ケア",
                products: 30
            },
            motorcycle_accessories: {
                id: "cat_motorcycle_accessories",
                name: "Phụ kiện xe máy",
                name_en: "Motorcycle Accessories",
                name_ja: "バイクアクセサリー",
                products: 35
            },
            motorcycle_gear: {
                id: "cat_motorcycle_gear",
                name: "Trang phục xe máy",
                name_en: "Motorcycle Gear",
                name_ja: "バイクウェア",
                products: 25
            },
            
            // Công nghệ thông minh (Smart Technology)
            smart_home: {
                id: "cat_smart_home",
                name: "Nhà thông minh",
                name_en: "Smart Home",
                name_ja: "スマートホーム",
                products: 40
            },
            smart_wearables: {
                id: "cat_smart_wearables",
                name: "Thiết bị đeo thông minh",
                name_en: "Smart Wearables",
                name_ja: "スマートウェアラブル",
                products: 30
            },
            iot_devices: {
                id: "cat_iot_devices",
                name: "Thiết bị IoT",
                name_en: "IoT Devices",
                name_ja: "IoTデバイス",
                products: 35
            },
            
            // Sức khỏe tinh thần & Relax (Wellness & Relax)
            aromatherapy: {
                id: "cat_aromatherapy",
                name: "Trị liệu bằng hương thơm",
                name_en: "Aromatherapy",
                name_ja: "アロマテラピー",
                products: 30
            },
            massage_equipment: {
                id: "cat_massage_equipment",
                name: "Thiết bị massage",
                name_en: "Massage Equipment",
                name_ja: "マッサージ機器",
                products: 25
            },
            meditation: {
                id: "cat_meditation",
                name: "Thiền & Yoga",
                name_en: "Meditation & Yoga",
                name_ja: "瞑想・ヨガ",
                products: 35
            },
            
            // Năng lượng tái tạo (Renewable Energy)
            solar_products: {
                id: "cat_solar_products",
                name: "Sản phẩm năng lượng mặt trời",
                name_en: "Solar Products",
                name_ja: "太陽光製品",
                products: 30
            },
            power_banks: {
                id: "cat_power_banks",
                name: "Sạc dự phòng",
                name_en: "Power Banks",
                name_ja: "モバイルバッテリー",
                products: 40
            },
            energy_saving: {
                id: "cat_energy_saving",
                name: "Thiết bị tiết kiệm năng lượng",
                name_en: "Energy Saving Devices",
                name_ja: "省エネ機器",
                products: 25
            },
            
            // An ninh & Camera (Security & Cameras)
            security_cameras: {
                id: "cat_security_cameras",
                name: "Camera an ninh",
                name_en: "Security Cameras",
                name_ja: "防犯カメラ",
                products: 35
            },
            smart_locks: {
                id: "cat_smart_locks",
                name: "Khóa thông minh",
                name_en: "Smart Locks",
                name_ja: "スマートロック",
                products: 25
            },
            alarm_systems: {
                id: "cat_alarm_systems",
                name: "Hệ thống báo động",
                name_en: "Alarm Systems",
                name_ja: "アラームシステム",
                products: 20
            },
            
            // Dụng cụ làm vườn (Gardening Tools)
            gardening_tools: {
                id: "cat_gardening_tools",
                name: "Dụng cụ làm vườn",
                name_en: "Gardening Tools",
                name_ja: "園芸用具",
                products: 40
            },
            plants_seeds: {
                id: "cat_plants_seeds",
                name: "Cây & Hạt giống",
                name_en: "Plants & Seeds",
                name_ja: "植物・種",
                products: 35
            },
            garden_decor: {
                id: "cat_garden_decor",
                name: "Trang trí sân vườn",
                name_en: "Garden Decor",
                name_ja: "ガーデンデコ",
                products: 25
            },
            
            // Đồ thủ công (Handicrafts)
            handmade_jewelry: {
                id: "cat_handmade_jewelry",
                name: "Trang sức thủ công",
                name_en: "Handmade Jewelry",
                name_ja: "ハンドメイドジュエリー",
                products: 30
            },
            crafts_supplies: {
                id: "cat_crafts_supplies",
                name: "Nguyên liệu thủ công",
                name_en: "Crafts Supplies",
                name_ja: "クラフト用品",
                products: 35
            },
            handmade_decor: {
                id: "cat_handmade_decor",
                name: "Đồ trang trí thủ công",
                name_en: "Handmade Decor",
                name_ja: "ハンドメイドデコ",
                products: 25
            },
            
            // Thiết bị y tế gia đình (Home Medical)
            medical_devices: {
                id: "cat_medical_devices",
                name: "Thiết bị y tế gia đình",
                name_en: "Home Medical Devices",
                name_ja: "家庭用医療機器",
                products: 30
            },
            first_aid: {
                id: "cat_first_aid",
                name: "Y tế cấp cứu",
                name_en: "First Aid",
                name_ja: "救急医療",
                products: 20
            },
            health_monitors: {
                id: "cat_health_monitors",
                name: "Máy theo dõi sức khỏe",
                name_en: "Health Monitors",
                name_ja: "健康モニター",
                products: 25
            },
            
            // Đồ cắm trại & Du lịch (Camping & Travel)
            camping_equipment: {
                id: "cat_camping_equipment",
                name: "Trang bị cắm trại",
                name_en: "Camping Equipment",
                name_ja: "キャンプ用品",
                products: 35
            },
            travel_accessories: {
                id: "cat_travel_accessories",
                name: "Phụ kiện du lịch",
                name_en: "Travel Accessories",
                name_ja: "旅行アクセサリー",
                products: 30
            },
            luggage: {
                id: "cat_luggage",
                name: "Vali & Balo",
                name_en: "Luggage",
                name_ja: "スーツケース・バッグ",
                products: 25
            },
            
            // Đồ công sở (Office Supplies)
            office_furniture: {
                id: "cat_office_furniture",
                name: "Nội thất văn phòng",
                name_en: "Office Furniture",
                name_ja: "オフィス家具",
                products: 30
            },
            desk_accessories: {
                id: "cat_desk_accessories",
                name: "Phụ kiện bàn làm việc",
                name_en: "Desk Accessories",
                name_ja: "デスクアクセサリー",
                products: 25
            },
            storage_solutions: {
                id: "cat_storage_solutions",
                name: "Giải pháp lưu trữ",
                name_en: "Storage Solutions",
                name_ja: "保管ソリューション",
                products: 20
            }
        };
        
        this.brands = {
            baby_care: ["Huggies", "Pampers", "MamyPoko", "Dodie", "Moony", "Merries", "Goo.n", "Kao"],
            baby_food: ["NAN", "Enfamil", "Similac", "Aptamil", "Dumex", "Vinamilk", "Nutifood", "Dielac"],
            diapers: ["Huggies", "Pampers", "MamyPoko", "Dodie", "Moony", "Merries", "Goo.n", "Bobby"],
            baby_clothing: ["Carter's", "GAP Kids", "H&M Kids", "Zara Kids", "Uniqlo Baby", "Mothercare", "OshKosh"],
            toys_baby: ["Fisher-Price", "VTech", "LeapFrog", "Lego Duplo", "Melissa & Doug", "Hape", "PlanToys"],
            
            pet_food: ["Royal Canin", "Hill's", "Purina", "Whiskas", "Pedigree", "Eukanuba", "Orijen", "Acana"],
            pet_accessories: ["Ruffwear", "Kong", "Chuckit!", "Jolly Pets", "West Paw", "Nylabone", "Benebone"],
            pet_grooming: ["Andis", "Wahl", "Oster", "Andis", "Groomer's Edge", "Tropiclean", "Earthbath"],
            pet_toys: ["Kong", "Chuckit!", "Jolly Pets", "West Paw", "Nylabone", "Benebone", "ZippyPaws"],
            
            car_accessories: ["3M", "Bosch", "Philips", "Osram", "Michelin", "Goodyear", "Castrol", "Mobil"],
            car_care: ["Meguiar's", "Chemical Guys", "Mothers", "CarGuys", "Turtle Wax", "Sonax", "Griot's Garage"],
            motorcycle_accessories: ["Yamaha", "Honda", "Suzuki", "Kawasaki", "SHAD", "Givi", "Kappa", "Vortex"],
            motorcycle_gear: ["Alpinestars", "Dainese", "AGV", "Shoei", "HJC", "Arai", "Bell", "Fox"],
            
            smart_home: ["Google", "Amazon", "Apple", "Samsung", "Philips Hue", "Nest", "Ring", "TP-Link"],
            smart_wearables: ["Apple", "Samsung", "Fitbit", "Garmin", "Xiaomi", "Huawei", "Fossil", "Withings"],
            iot_devices: ["Google", "Amazon", "Apple", "Samsung", "Philips", "TP-Link", "Netgear", "D-Link"],
            
            aromatherapy: ["doTERRA", "Young Living", "Plant Therapy", "Eden's Garden", "Revive", "Mountain Rose Herbs"],
            massage_equipment: ["OSIM", "Panasonic", "HoMedics", "Brookstone", "Human Touch", "Inada", "Fujiiryoki"],
            meditation: ["Headspace", "Calm", "Insight Timer", "Gaia", "YogaWorks", "Down Dog", "Daily Yoga"],
            
            solar_products: ["SolarEdge", "Enphase", "LG", "SunPower", "Canadian Solar", "Jinko Solar", "Trina Solar"],
            power_banks: ["Anker", "Xiaomi", "Samsung", "Aukey", "RAVPower", "Mophie", "Belkin", "Zendure"],
            energy_saving: ["Philips", "Osram", "GE", "Sylvania", "Cree", "Feit Electric", "TCP", "Bulbrite"],
            
            security_cameras: ["Ring", "Nest", "Arlo", "Wyze", "Reolink", "Amcrest", "Lorex", "Swann"],
            smart_locks: ["August", "Schlage", "Yale", "Kwikset", "Nest", "Ring", "Ultraloq", "Level"],
            alarm_systems: ["ADT", "Ring", "Nest", "SimpliSafe", "Abode", "Frontpoint", "Vivint", "Brinks"],
            
            gardening_tools: ["Fiskars", "Scotts", "Miracle-Gro", "Ortho", "Roundup", "Bonide", "Espoma", "Jobe's"],
            plants_seeds: ["Burpee", "Park Seed", "Gurney's", "Baker Creek", "Johnny's", "High Mowing", "Territorial"],
            garden_decor: ["Home Depot", "Lowe's", "Wayfair", "Overstock", "Amazon", "Target", "Walmart"],
            
            handmade_jewelry: ["Etsy", "ArtFire", "Zibbet", "Handmade at Amazon", "Ruby Lane", "Chairish"],
            crafts_supplies: ["Michaels", "Hobby Lobby", "Jo-Ann", "Amazon", "Etsy", "Blick Art Materials"],
            handmade_decor: ["Etsy", "Wayfair", "Overstock", "Amazon Handmade", "Chairish", "One Kings Lane"],
            
            medical_devices: ["Omron", "Philips", "Beurer", "Withings", "iHealth", "Qardio", "AliveCor"],
            first_aid: ["Johnson & Johnson", "Band-Aid", "Neosporin", "Polysporin", "Curad", "3M", "Medi-First"],
            health_monitors: ["Omron", "Philips", "Beurer", "Withings", "iHealth", "Qardio", "Fitbit"],
            
            camping_equipment: ["The North Face", "Patagonia", "Marmot", "Columbia", "REI", "MSR", "Big Agnes"],
            travel_accessories: ["Travelon", "Lewis N. Clark", "Eagle Creek", "Osprey", "Patagonia", "Sea to Summit"],
            luggage: ["Samsonite", "Travelpro", "Briggs & Riley", "Tumi", "Delsey", "Rimowa", "Victorinox"],
            
            office_furniture: ["IKEA", "Steelcase", "Herman Miller", "Haworth", "Knoll", "Hon", "Bush Furniture"],
            desk_accessories: ["Muji", "Poppin", "Staedtler", "3M", "Post-it", "Sharpie", "Bic"],
            storage_solutions: ["IKEA", "Container Store", "Rubbermaid", "Sterilite", "ClosetMaid", "Elfa"]
        };
        
        this.suppliers = [
            "Vietnam Baby Products Co.", "Asia Pacific Baby Care", "Global Pet Supplies",
            "Southeast Asia Automotive", "Vietnam Smart Tech", "Asian Wellness Direct",
            "Pacific Security Systems", "Hanoi Garden Supplies", "Saigon Medical Equipment",
            "Mekong Travel Gear", "Central Office Solutions", "Da Nang Handicrafts",
            "Can Tho Energy Solutions", "Hai Phong Storage Systems", "Nha Trang Camping"
        ];
        
        this.retailers = [
            "Kids World", "Pet Paradise", "Auto Zone", "Smart Home Hub", "Wellness Center",
            "Security Store", "Garden Center", "Handmade Market", "Medical Supply", "Travel Store",
            "Office Depot", "Energy Shop", "Camping World", "Jewelry Box", "Storage Solutions"
        ];
    }
    
    // Generate baby care specs
    generateBabyCareSpecs(index) {
        const productTypes = [
            "Sữa tắm", "Kem chống hăm", "Dầu gió", "Nước xả phòng", "Tăm bông",
            "Khăn ấm", "Bình sữa", "Núm ty", "Máy hút sữa", "Máy hâm sữa"
        ];
        const type = productTypes[index % productTypes.length];
        
        return {
            "Loại sản phẩm": type,
            "Độ tuổi": index % 3 === 0 ? "0-6 tháng" : index % 3 === 1 ? "6-12 tháng" : "12+ tháng",
            "Thành phần": index % 2 === 0 ? "Tự nhiên" : "Hữu cơ",
            "Khối lượng (g/ml)": 100 + (index * 50),
            "Hương thơm": index % 2 === 0 ? "Không mùi" : "Thơm nhẹ",
            "Bảo quản": "Nơi khô ráo, tránh ánh nắng",
            "Hạn sử dụng": "24 tháng",
            "Chứng nhận": "ISO 9001, FDA",
            "Xuất xứ": index % 2 === 0 ? "Nhật Bản" : "Hàn Quốc",
            "An toàn": "Đã kiểm định an toàn cho bé"
        };
    }
    
    // Generate pet food specs
    generatePetFoodSpecs(index) {
        const petTypes = ["Chó", "Mèo", "Chim", "Cá", "Hamster", "Thỏ"];
        const petType = petTypes[index % petTypes.length];
        const foodTypes = ["Kibble", "Pate", "Wet food", "Treats", "Supplements"];
        const foodType = foodTypes[index % foodTypes.length];
        
        return {
            "Loại thú cưng": petType,
            "Loại thức ăn": foodType,
            "Hương vị": ["Thịt bò", "Thịt gà", "Cá", "Heo", "Rau củ"][index % 5],
            "Khối lượng (kg)": 1 + (index % 10),
            "Protein (%)": 20 + (index * 2),
            "Fat (%)": 8 + (index % 5),
            "Fiber (%)": 3 + (index % 3),
            "Độ tuổi": index % 3 === 0 ? "Bé" : index % 3 === 1 ? "Trưởng thành" : "Già",
            "Hạn sử dụng": "18 tháng",
            "Bảo quản": "Nơi khô ráo, thoáng mát",
            "Xuất xứ": index % 2 === 0 ? "Mỹ" : "Châu Âu",
            "Chứng nhận": "AAFCO, FDA"
        };
    }
    
    // Generate car accessories specs
    generateCarAccessoriesSpecs(index) {
        const accessoryTypes = [
            "Camera hành trình", "Màn hình Android", "Loa ô tô", "Đèn LED", "Thảm lót sàn",
            "Bao da vô lăng", "Gương chiếu hậu", "Cảm biến đỗ xe", "Chấn khung", "Máy lọc không khí"
        ];
        const type = accessoryTypes[index % accessoryTypes.length];
        
        return {
            "Loại phụ kiện": type,
            "Tương thích": index % 2 === 0 ? "Mọi dòng xe" : "Chọn dòng xe",
            "Kích thước": "Standard",
            "Điện áp (V)": 12,
            "Công suất (W)": 10 + (index * 5),
            "Chất liệu": index % 2 === 0 ? "Nhựa ABS" : "Da thật",
            "Màu sắc": ["Đen", "Bạc", "Vàng", "Xanh", "Đỏ"][index % 5],
            "Bảo hành (tháng)": 12 + (index * 6),
            "Lắp đặt": "Dễ dàng lắp đặt",
            "Tính năng": index % 2 === 0 ? "Thông minh" : "Cơ bản",
            "Xuất xứ": index % 2 === 0 ? "Đài Loan" : "Trung Quốc"
        };
    }
    
    // Generate smart home specs
    generateSmartHomeSpecs(index) {
        const deviceTypes = [
            "Đèn thông minh", "Công tắc thông minh", "Loa thông minh", "Camera an ninh",
            "Cảm biến chuyển động", "Cửa cuốn thông minh", "Máy lạnh thông minh", "TV thông minh"
        ];
        const type = deviceTypes[index % deviceTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Kết nối": ["WiFi", "Bluetooth", "Zigbee", "Z-Wave"][index % 4],
            "Điện áp (V)": 220,
            "Công suất (W)": 5 + (index * 10),
            "Kích thước (mm)": `${100 + (index * 20)}x${80 + (index * 15)}x${50 + (index * 10)}`,
            "Trọng lượng (g)": 200 + (index * 50),
            "Ứng dụng": index % 2 === 0 ? "Google Home" : "Amazon Alexa",
            "Tính năng": index % 2 === 0 ? "Điều khiển từ xa" : "Tự động hóa",
            "Bảo mật": "Mã hóa SSL/TLS",
            "Bảo hành (tháng)": 24,
            "Xuất xứ": index % 2 === 0 ? "Mỹ" : "Trung Quốc"
        };
    }
    
    // Generate aromatherapy specs
    generateAromatherapySpecs(index) {
        const oilTypes = [
            "Oải hương", "Sả chanh", "Bưởi", "Cúc la mã", "Bạc hà", "Tràm trà", "Gỗ đàn hương", "Oải hương Pháp"
        ];
        const oilType = oilTypes[index % oilTypes.length];
        const productTypes = ["Tinh dầu", "Đèn xông", "Máy khuếch tán", "Nến thơm", "Xịt phòng"];
        const productType = productTypes[index % productTypes.length];
        
        return {
            "Loại sản phẩm": productType,
            "Hương thơm chính": oilType,
            "Dung tích (ml)": 10 + (index * 5),
            "Thành phần": index % 2 === 0 ? "100% thiên nhiên" : "Hỗn hợp",
            "Công dụng": index % 2 === 0 ? "Thư giãn" : "Tỉnh táo",
            "Thời gian sử dụng": index % 2 === 0 ? "6-8 giờ" : "8-10 giờ",
            "Bảo quản": "Nơi khô ráo, tránh ánh nắng",
            "Hạn sử dụng": "36 tháng",
            "Chứng nhận": "USDA Organic",
            "Xuất xứ": index % 2 === 0 ? "Úc" : "Pháp",
            "An toàn": "Không hóa chất độc hại"
        };
    }
    
    // Generate solar products specs
    generateSolarProductsSpecs(index) {
        const productTypes = [
            "Pin mặt trời", "Bộ sạc solar", "Đèn solar", "Máy bơm solar", "Vòi nước solar",
            "Quạt solar", "Camera solar", "Đèn đường solar"
        ];
        const type = productTypes[index % productTypes.length];
        
        return {
            "Loại sản phẩm": type,
            "Công suất (W)": 5 + (index * 10),
            "Điện áp (V)": 12 + (index % 2) * 12,
            "Dung lượng pin (mAh)": 5000 + (index * 1000),
            "Thời gian sạc (giờ)": 6 + (index % 4),
            "Thời gian sử dụng (giờ)": 8 + (index * 2),
            "Chất liệu": index % 2 === 0 ? "Silicon" : "Poly-Si",
            "Kháng nước": index % 2 === 0 ? "IP65" : "IP67",
            "Bảo hành (năm)": 2 + (index % 3),
            "Kích thước (mm)": `${200 + (index * 50)}x${150 + (index * 30)}x${20 + (index * 5)}`,
            "Xuất xứ": index % 2 === 0 ? "Việt Nam" : "Trung Quốc"
        };
    }
    
    // Generate security camera specs
    generateSecurityCameraSpecs(index) {
        const cameraTypes = [
            "Camera trong nhà", "Camera ngoài trời", "Camera wifi", "Camera POE", "Camera PTZ",
            "Camera 360", "Camera baby", "Camera xe hơi"
        ];
        const type = cameraTypes[index % cameraTypes.length];
        
        return {
            "Loại camera": type,
            "Độ phân giải": index % 2 === 0 ? "1080P" : "4K",
            "Góc quay (độ)": 90 + (index * 15),
            "Kết nối": index % 2 === 0 ? "WiFi" : "Ethernet",
            "Đèn hồng ngoại": index % 2 === 0 ? "Có" : "Không",
            "Độ nhạy sáng": 0.01 + (index * 0.01),
            "Lưu trữ": index % 2 === 0 ? "Cloud" : "SD Card",
            "Đàm thoại 2 chiều": index % 2 === 0 ? "Có" : "Không",
            "Kháng nước": index % 2 === 0 ? "Không" : "IP66",
            "Nguồn điện": index % 2 === 0 ? "Pin" : "Adaptor",
            "Bảo hành (tháng)": 12 + (index * 6)
        };
    }
    
    // Generate gardening tools specs
    generateGardeningToolsSpecs(index) {
        const toolTypes = [
            "Xẻng", "Cái cuốc", "Cái kéo", "Bình tưới", "Găng tay",
            "Mũ làm vườn", "Giàn trồng", "Chậu cây", "Đất trồng", "Phân bón"
        ];
        const type = toolTypes[index % toolTypes.length];
        
        return {
            "Loại dụng cụ": type,
            "Chất liệu": index % 2 === 0 ? "Thép không gỉ" : "Nhựa cao cấp",
            "Kích thước (cm)": `${20 + (index * 5)}x${10 + (index * 2)}`,
            "Trọng lượng (g)": 200 + (index * 50),
            "Màu sắc": ["Xanh", "Đỏ", "Đen", "Vàng", "Nâu"][index % 5],
            "Tính năng": index % 2 === 0 ? "Đa năng" : "Chuyên dụng",
            "Bảo quản": "Sau khi dùng hãy làm sạch và để khô",
            "Bảo hành (tháng)": 6 + (index * 3),
            "Xuất xứ": index % 2 === 0 ? "Việt Nam" : "Trung Quốc",
            "An toàn": "An toàn cho người sử dụng"
        };
    }
    
    // Generate medical devices specs
    generateMedicalDevicesSpecs(index) {
        const deviceTypes = [
            "Máy đo huyết áp", "Máy đo đường huyết", "Máy xông mũi", "Máy massage",
            "Nhiệt kế", "Máy đo nồng độ oxy", "Máy hút đờm", "Máy trị liệu"
        ];
        const type = deviceTypes[index % deviceTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Chức năng": index % 2 === 0 ? "Đo lường" : "Trị liệu",
            "Độ chính xác": index % 2 === 0 ? "±1%" : "±2%",
            "Nguồn điện": index % 2 === 0 ? "Pin" : "AC Adapter",
            "Thời gian sử dụng (giờ)": 8 + (index * 4),
            "Bộ nhớ": index % 2 === 0 ? "90 lần đo" : "60 lần đo",
            "Màn hình": index % 2 === 0 ? "LCD" : "LED",
            "Kích thước (mm)": `${100 + (index * 20)}x${80 + (index * 15)}x${30 + (index * 5)}`,
            "Trọng lượng (g)": 300 + (index * 100),
            "Chứng nhận": "ISO 13485, CE",
            "Bảo hành (tháng)": 12 + (index * 6)
        };
    }
    
    // Generate camping equipment specs
    generateCampingEquipmentSpecs(index) {
        const equipmentTypes = [
            "Lều trại", "Túi ngủ", "Bếp cắm trại", "Đèn pin", "Balo",
            "Giày trekking", "Bình giữ nhiệt", "Dao đa năng", "Móc treo đồ", "Thảm picnic"
        ];
        const type = equipmentTypes[index % equipmentTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Sức chứa (người)": 2 + (index % 4),
            "Chất liệu": index % 2 === 0 ? "Nylon" : "Polyester",
            "Khối lượng (g)": 500 + (index * 200),
            "Kích thước (cm)": `${100 + (index * 20)}x${80 + (index * 15)}x${50 + (index * 10)}`,
            "Màu sắc": ["Xanh", "Cam", "Đỏ", "Xám", "Đen"][index % 5],
            "Kháng nước": index % 2 === 0 ? "IPX4" : "IPX5",
            "Tính năng": index % 2 === 0 ? "Nhẹ" : "Bền",
            "Bảo quản": "Lau khô sau khi sử dụng",
            "Bảo hành (tháng)": 12 + (index * 6),
            "Xuất xứ": index % 2 === 0 ? "Mỹ" : "Trung Quốc"
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
        if (categoryId.includes("baby")) {
            specifications = this.generateBabyCareSpecs(index);
        } else if (categoryId.includes("pet")) {
            specifications = this.generatePetFoodSpecs(index);
        } else if (categoryId.includes("car")) {
            specifications = this.generateCarAccessoriesSpecs(index);
        } else if (categoryId.includes("smart")) {
            specifications = this.generateSmartHomeSpecs(index);
        } else if (categoryId.includes("aromatherapy")) {
            specifications = this.generateAromatherapySpecs(index);
        } else if (categoryId.includes("solar")) {
            specifications = this.generateSolarProductsSpecs(index);
        } else if (categoryId.includes("security")) {
            specifications = this.generateSecurityCameraSpecs(index);
        } else if (categoryId.includes("gardening")) {
            specifications = this.generateGardeningToolsSpecs(index);
        } else if (categoryId.includes("medical")) {
            specifications = this.generateMedicalDevicesSpecs(index);
        } else if (categoryId.includes("camping")) {
            specifications = this.generateCampingEquipmentSpecs(index);
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
            id: `EXT${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`,
            sku: `EXT${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`,
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
                retail_price: 100000 + (index * 20000),
                wholesale_price: 80000 + (index * 15000),
                currency: "VND",
                min_order_quantity: 1,
                price_unit: "cái"
            },
            inventory: {
                in_stock: 500 + (index * 50),
                available: true,
                stock_status: "Còn hàng",
                warehouse_location: "Hà Nội, TP.HCM, Đà Nẵng",
                lead_time: "2-3 ngày"
            },
            images: [
                {
                    url: `https://example.com/images/EXT${String(index + 1).padStart(3, '0')}-1.jpg`,
                    alt: `${category.name} ${index + 1} - Tổng quan`,
                    type: "main"
                },
                {
                    url: `https://example.com/images/EXT${String(index + 1).padStart(3, '0')}-2.jpg`,
                    alt: `${category.name} ${index + 1} - Chi tiết`,
                    type: "detail"
                }
            ],
            attributes: [
                {
                    name: "Mã sản phẩm",
                    value: `EXT${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`
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
            tags: [category.name.toLowerCase(), "bán lẻ", "chất lượng cao", "mở rộng"],
            rating: 4.2 + (index % 10) * 0.08,
            reviews: 30 + (index * 5),
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
    
    // Export all extended retail products
    exportExtendedRetailProducts() {
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
                icon: "fas fa-shopping-bag",
                parent_id: null,
                level: 1,
                product_count: category.products,
                specifications: Object.keys(this.generateProduct(categoryId, 0).specifications),
                applications: ["retail", "consumer", "ecommerce", "extended"]
            });
        });
        
        return {
            metadata: {
                version: "2.0",
                generated_date: new Date().toISOString(),
                total_products: allProducts.length,
                total_categories: categoryData.length,
                total_brands: Object.values(this.brands).flat().length,
                total_suppliers: this.suppliers.length,
                total_retailers: this.retailers.length,
                source: "Extended Retail Products Generator",
                description: "Bộ dữ liệu sản phẩm bán lẻ mở rộng với đầy đủ thông tin chi tiết",
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
            "Dưới 200k": 0,
            "200k-500k": 0,
            "500k-1M": 0,
            "1M-2M": 0,
            "Trên 2M": 0
        };
        
        products.forEach(product => {
            const price = product.pricing.retail_price;
            if (price < 200000) ranges["Dưới 200k"]++;
            else if (price < 500000) ranges["200k-500k"]++;
            else if (price < 1000000) ranges["500k-1M"]++;
            else if (price < 2000000) ranges["1M-2M"]++;
            else ranges["Trên 2M"]++;
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
            "4.5-4.9": 0,
            "4.0-4.4": 0,
            "3.5-3.9": 0,
            "Dưới 3.5": 0
        };
        
        products.forEach(product => {
            const rating = product.rating;
            if (rating >= 5.0) ratings["5.0"]++;
            else if (rating >= 4.5) ratings["4.5-4.9"]++;
            else if (rating >= 4.0) ratings["4.0-4.4"]++;
            else if (rating >= 3.5) ratings["3.5-3.9"]++;
            else ratings["Dưới 3.5"]++;
        });
        
        return Object.entries(ratings).map(([range, count]) => ({
            rating_range: range,
            product_count: count,
            percentage: ((count / products.length) * 100).toFixed(1) + '%'
        }));
    }
}

module.exports = ExtendedRetailProductsGenerator;
