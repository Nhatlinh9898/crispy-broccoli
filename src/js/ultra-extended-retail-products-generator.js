/**
 * Ultra Extended Retail Products Generator - Phase 3
 * Generator for specialized and niche retail product categories
 */

class UltraExtendedRetailProductsGenerator {
    constructor() {
        this.categories = {
            // Đồ thể thao chuyên nghiệp (Professional Sports)
            professional_fitness: {
                id: "cat_professional_fitness",
                name: "Thiết bị fitness chuyên nghiệp",
                name_en: "Professional Fitness Equipment",
                name_ja: "プロフェッショナルフィットネス器具",
                products: 35
            },
            team_sports: {
                id: "cat_team_sports",
                name: "Dụng cụ thể thao đồng đội",
                name_en: "Team Sports Equipment",
                name_ja: "チームスポーツ用具",
                products: 40
            },
            water_sports: {
                id: "cat_water_sports",
                name: "Thể thao dưới nước",
                name_en: "Water Sports Equipment",
                name_ja: "ウォータースポーツ用具",
                products: 30
            },
            winter_sports: {
                id: "cat_winter_sports",
                name: "Thể thao mùa đông",
                name_en: "Winter Sports Equipment",
                name_ja: "ウィンタースポーツ用具",
                products: 25
            },
            
            // Nghệ thuật & Sáng tạo (Arts & Crafts)
            art_supplies: {
                id: "cat_art_supplies",
                name: "Vật liệu nghệ thuật",
                name_en: "Art Supplies",
                name_ja: "画材・美術用品",
                products: 45
            },
            musical_instruments: {
                id: "cat_musical_instruments",
                name: "Nhạc cụ",
                name_en: "Musical Instruments",
                name_ja: "楽器",
                products: 35
            },
            photography: {
                id: "cat_photography",
                name: "Thiết bị nhiếp ảnh",
                name_en: "Photography Equipment",
                name_ja: "写真機材",
                products: 30
            },
            digital_art: {
                id: "cat_digital_art",
                name: "Thiết bị nghệ thuật số",
                name_en: "Digital Art Equipment",
                name_ja: "デジタルアート機材",
                products: 25
            },
            
            // Công nghệ cao (High Technology)
            vr_ar_devices: {
                id: "cat_vr_ar_devices",
                name: "Thiết bị VR/AR",
                name_en: "VR/AR Devices",
                name_ja: "VR/ARデバイス",
                products: 20
            },
            drones: {
                id: "cat_drones",
                name: "Máy bay không người lái",
                name_en: "Drones",
                name_ja: "ドローン",
                products: 25
            },
            robotics: {
                id: "cat_robotics",
                name: "Robot & Tự động hóa",
                name_en: "Robotics & Automation",
                name_ja: "ロボット・自動化",
                products: 30
            },
            printing_3d: {
                id: "cat_3d_printing",
                name: "Máy in 3D",
                name_en: "3D Printing",
                name_ja: "3Dプリンター",
                products: 20
            },
            
            // Sức khỏe chuyên sâu (Advanced Health)
            medical_wellness: {
                id: "cat_medical_wellness",
                name: "Thiết bị y tế & Wellness",
                name_en: "Medical & Wellness Devices",
                name_ja: "医療・ウェルネス機器",
                products: 35
            },
            fitness_trackers: {
                id: "cat_fitness_trackers",
                name: "Máy theo dõi fitness",
                name_en: "Fitness Trackers",
                name_ja: "フィットネストラッカー",
                products: 30
            },
            sleep_aid: {
                id: "cat_sleep_aid",
                name: "Thiết bị hỗ trợ giấc ngủ",
                name_en: "Sleep Aid Devices",
                name_ja: "睡眠補助機器",
                products: 25
            },
            air_purifiers: {
                id: "cat_air_purifiers",
                name: "Máy lọc không khí",
                name_en: "Air Purifiers",
                name_ja: "空気清浄機",
                products: 20
            },
            
            // Giáo dục & Học tập (Education & Learning)
            educational_toys: {
                id: "cat_educational_toys",
                name: "Đồ chơi giáo dục",
                name_en: "Educational Toys",
                name_ja: "教育玩具",
                products: 40
            },
            language_learning: {
                id: "cat_language_learning",
                name: "Thiết bị học ngoại ngữ",
                name_en: "Language Learning Devices",
                name_ja: "語学学習機器",
                products: 25
            },
            stem_tools: {
                id: "cat_stem_tools",
                name: "Công cụ STEM",
                name_en: "STEM Tools",
                name_ja: "STEMツール",
                products: 30
            },
            online_learning: {
                id: "cat_online_learning",
                name: "Thiết bị học trực tuyến",
                name_en: "Online Learning Equipment",
                name_ja: "オンライン学習機器",
                products: 20
            },
            
            // Nhà bếp chuyên nghiệp (Professional Kitchen)
            chef_equipment: {
                id: "cat_chef_equipment",
                name: "Dụng cụ đầu bếp chuyên nghiệp",
                name_en: "Professional Chef Equipment",
                name_ja: "プロ調理器具",
                products: 35
            },
            coffee_tea: {
                id: "cat_coffee_tea",
                name: "Thiết bị cà phê & trà",
                name_en: "Coffee & Tea Equipment",
                name_ja: "コーヒー・茶器具",
                products: 30
            },
            baking_tools: {
                id: "cat_baking_tools",
                name: "Dụng cụ làm bánh",
                name_en: "Baking Tools",
                name_ja: "ベーキング用具",
                products: 25
            },
            food_preservation: {
                id: "cat_food_preservation",
                name: "Thiết bị bảo quản thực phẩm",
                name_en: "Food Preservation Equipment",
                name_ja: "食品保存機器",
                products: 20
            },
            
            // Thời trang công nghệ (Tech Fashion)
            smart_clothing: {
                id: "cat_smart_clothing",
                name: "Quần áo thông minh",
                name_en: "Smart Clothing",
                name_ja: "スマートウェア",
                products: 25
            },
            wearable_tech: {
                id: "cat_wearable_tech",
                name: "Thiết bị đeo công nghệ",
                name_en: "Wearable Technology",
                name_ja: "ウェアラブルテック",
                products: 30
            },
            tech_accessories: {
                id: "cat_tech_accessories",
                name: "Phụ kiện công nghệ",
                name_en: "Tech Accessories",
                name_ja: "テックアクセサリー",
                products: 35
            },
            
            // Sản phẩm bền vững (Sustainable Products)
            eco_products: {
                id: "cat_eco_products",
                name: "Sản phẩm thân thiện môi trường",
                name_en: "Eco-Friendly Products",
                name_ja: "エコフレンドリー製品",
                products: 40
            },
            reusable_products: {
                id: "cat_reusable_products",
                name: "Sản phẩm tái sử dụng",
                name_en: "Reusable Products",
                name_ja: "再利用可能製品",
                products: 30
            },
            zero_waste: {
                id: "cat_zero_waste",
                name: "Sản phẩm không rác thải",
                name_en: "Zero Waste Products",
                name_ja: "ゼロウェイスト製品",
                products: 25
            },
            
            // Đồ chơi cao cấp (Premium Toys)
            collectible_toys: {
                id: "cat_collectible_toys",
                name: "Đồ chơi sưu tầm",
                name_en: "Collectible Toys",
                name_ja: "コレクション玩具",
                products: 30
            },
            luxury_toys: {
                id: "cat_luxury_toys",
                name: "Đồ chơi cao cấp",
                name_en: "Luxury Toys",
                name_ja: "ラグジュアリー玩具",
                products: 20
            },
            rc_vehicles: {
                id: "cat_rc_vehicles",
                name: "Xe điều khiển từ xa",
                name_en: "RC Vehicles",
                name_ja: "ラジコン車両",
                products: 25
            },
            
            // Sản phẩm địa phương (Local Products)
            vietnamese_crafts: {
                id: "cat_vietnamese_crafts",
                name: "Hàng thủ công Việt Nam",
                name_en: "Vietnamese Handicrafts",
                name_ja: "ベトナム工芸品",
                products: 35
            },
            local_food: {
                id: "cat_local_food",
                name: "Đặc sản địa phương",
                name_en: "Local Specialties",
                name_ja: "地元特産品",
                products: 30
            },
            traditional_medicine: {
                id: "cat_traditional_medicine",
                name: "Thuốc truyền thống",
                name_en: "Traditional Medicine",
                name_ja: "伝統医学",
                products: 25
            }
        };
        
        this.brands = {
            professional_fitness: ["Technogym", "Life Fitness", "Precor", "Cybex", "Hammer Strength", "Nautilus", "Matrix Fitness"],
            team_sports: ["Nike", "Adidas", "Wilson", "Spalding", "Molten", "Mikasa", "Kappa", "Puma"],
            water_sports: ["Speedo", "Arena", "TYR", "Zoggs", "Cressi", "Mares", "Aqua Lung", "Scubapro"],
            winter_sports: ["Rossignol", "Salomon", "Atomic", "Head", "Volkl", "Fischer", "Burton", "K2"],
            
            art_supplies: ["Winsor & Newton", "Daler-Rowney", "Faber-Castell", "Copic", "Prismacolor", "Derwent", "Staedtler"],
            musical_instruments: ["Yamaha", "Roland", "Korg", "Fender", "Gibson", "Taylor", "Martin", "Casio"],
            photography: ["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "Olympus", "Leica", "Hasselblad"],
            digital_art: ["Wacom", "Huion", "XP-Pen", "Intuos", "Adobe", "Autodesk", "Corel", "Clip Studio"],
            
            vr_ar_devices: ["Oculus", "HTC", "Valve", "Sony", "Samsung", "Google", "Microsoft", "Magic Leap"],
            drones: ["DJI", "Parrot", "Autel", "Skydio", "Yuneec", "PowerVision", "Walkera", "Hubsan"],
            robotics: ["Boston Dynamics", "iRobot", "SoftBank", "Universal Robots", "ABB", "KUKA", "Fanuc", "Mitsubishi"],
            printing_3d: ["Ultimaker", "MakerBot", "Prusa", "Formlabs", "Creality", "Anycubic", "Elegoo", "FlashForge"],
            
            medical_wellness: ["Omron", "Philips", "Beurer", "Withings", "iHealth", "Qardio", "AliveCor", "Fitbit"],
            fitness_trackers: ["Fitbit", "Garmin", "Polar", "Suunto", "Apple", "Samsung", "Xiaomi", "Huawei"],
            sleep_aid: ["Philips", "Sleep Number", "Tempur-Pedic", "Manta", "Manta Sleep", "Oura", "Withings"],
            air_purifiers: ["Dyson", "Philips", "Blueair", "Honeywell", "Sharp", "Panasonic", "LG", "Levoit"],
            
            educational_toys: ["LEGO Education", "Melissa & Doug", "VTech", "LeapFrog", "Hape", "PlanToys", "Learning Resources"],
            language_learning: ["Rosetta Stone", "Duolingo", "Babbel", "Pimsleur", "Rosetta Stone", "Living Language"],
            stem_tools: ["LEGO", "K'nex", "LittleBits", "Makeblock", "Arduino", "Raspberry Pi", "SparkFun"],
            online_learning: ["Logitech", "Microsoft", "Apple", "Dell", "HP", "Lenovo", "Samsung", "ASUS"],
            
            chef_equipment: ["Wüsthof", "Zwilling", "Global", "Shun", "Victorinox", "Henckels", "Miyabi", "MAC"],
            coffee_tea: ["Breville", "De'Longhi", "Nespresso", "Keurig", "Jura", "Bialetti", "Chemex", "Hario"],
            baking_tools: ["KitchenAid", "Cuisinart", "Breville", "Oster", "Hamilton Beach", "Sunbeam", "Kenwood"],
            food_preservation: ["FoodSaver", "VacMaster", "Weston", "LEM", "Chamberlain", "Anova", "SousVide"],
            
            smart_clothing: ["Sensoria", "Hexoskin", "OMsignal", "Athos", "Wearable X", "Ralph Lauren", "Tommy Hilfiger"],
            wearable_tech: ["Apple", "Samsung", "Garmin", "Fitbit", "Polar", "Suunto", "Withings", "Huawei"],
            tech_accessories: ["Anker", "Belkin", "Mophie", "OtterBox", "Spigen", "ZAGG", "Nomad", "Satechi"],
            
            eco_products: ["Patagonia", "Allbirds", "Eileen Fisher", "Reformation", "Everlane", "Stella McCartney"],
            reusable_products: ["Klean Kanteen", "Hydro Flask", "S'well", "Contigo", "CamelBak", "Nalgene", "Stanley"],
            zero_waste: ["Package Free", "Zero Waste Store", "Life Without Plastic", "EarthHero", "EcoRoots"],
            
            collectible_toys: ["Hot Toys", "Sideshow", "Hasbro", "Mattel", "LEGO", "Bandai", "Takara", "Funko"],
            luxury_toys: ["Steiff", "Hermann Teddy", "Moulin Roty", "Maileg", "Lego", "Playmobil", "Schleich"],
            rc_vehicles: ["Traxxas", "Axial", "Redcat Racing", "Losi", "Team Associated", "HPI Racing", "Kyosho"],
            
            vietnamese_crafts: ["Hanoi Handicraft", "Saigon Craft", "Hoi An Art", "Bat Trang Ceramic", "Van Phuc Silk"],
            local_food: ["Vinamilk", "Kinh Do", "Binh Tay", "Hai Phong", "Da Nang", "Hue", "Can Tho"],
            traditional_medicine: ["Truong Giang", "Thien Phuc", "Dong Y", "Nam Duoc", "Bach Mai", "Viet Herb"]
        };
        
        this.suppliers = [
            "Vietnam Professional Sports Co.", "Asia Pacific Art Supplies", "Global Tech Innovation",
            "Southeast Asia Medical", "Vietnam Educational Tools", "Asian Chef Equipment",
            "Pacific Sustainable Solutions", "Hanoi Local Crafts", "Saigon Premium Products",
            "Mekong Tech Distribution", "Central Wellness Hub", "Da Nang Creative Studio",
            "Can Tho Traditional Medicine", "Hai Phong Sports Equipment", "Nha Trang Art Gallery"
        ];
        
        this.retailers = [
            "Pro Sports Store", "Art Gallery", "Tech Hub", "Medical Center", "Education Store",
            "Chef Supply", "Eco Shop", "Luxury Toys", "Local Market", "Wellness Center",
            "Creative Studio", "Premium Retail", "Sustainable Store", "Traditional Medicine Shop"
        ];
    }
    
    // Generate professional fitness specs
    generateProfessionalFitnessSpecs(index) {
        const equipmentTypes = [
            "Treadmill chuyên nghiệp", "Elliptical trainer", "Stationary bike", "Rowing machine",
            "Weight bench", "Squat rack", "Cable machine", "Smith machine", "Leg press", "Lat pulldown"
        ];
        const type = equipmentTypes[index % equipmentTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Khối lượng tối đa (kg)": 150 + (index * 20),
            "Chất liệu": index % 2 === 0 ? "Thép không gỉ" : "Aluminum cao cấp",
            "Kích thước (mm)": `${2000 + (index * 100)}x${800 + (index * 50)}x${1500 + (index * 100)}`,
            "Trọng lượng (kg)": 80 + (index * 20),
            "Màn hình hiển thị": index % 2 === 0 ? "LCD 15 inch" : "LED 20 inch",
            "Chương trình tập": 20 + (index * 5),
            "Đo nhịp tim": index % 2 === 0 ? "Cảm biến tay" : "Cảm biến ngực",
            "Kết nối": ["Bluetooth", "WiFi", "USB"][index % 3],
            "Bảo hành (năm)": 3 + (index % 3),
            "Xuất xứ": index % 2 === 0 ? "Mỹ" : "Ý",
            "Chứng nhận": "CE, ISO 9001"
        };
    }
    
    // Generate art supplies specs
    generateArtSuppliesSpecs(index) {
        const artTypes = [
            "Bút vẽ màu nước", "Màu acrylic", "Màu dầu", "Giấy vẽ", "Cọ vẽ",
            "Bút chì kỹ thuật", "Màu pastel", "Bút lông", "Easel", "Palette"
        ];
        const type = artTypes[index % artTypes.length];
        
        return {
            "Loại vật liệu": type,
            "Chất liệu": index % 2 === 0 ? "Tự nhiên" : "Hữu cơ",
            "Số lượng": 12 + (index * 6),
            "Màu sắc": ["Đầy đủ màu", "Cơ bản", "Chuyên nghiệp"][index % 3],
            "Kích thước": ["A4", "A3", "A2", "A1"][index % 4],
            "Độ bền màu": "100+ năm",
            "Tương thích": index % 2 === 0 ? "Mọi giấy" : "Giấy chuyên dụng",
            "Bảo quản": "Nơi khô ráo, tránh ánh nắng",
            "Hạn sử dụng": "3-5 năm",
            "Xuất xứ": index % 2 === 0 ? "Pháp" : "Đức",
            "Chứng nhận": "ASTM D4236"
        };
    }
    
    // Generate VR/AR specs
    generateVRARSpecs(index) {
        const deviceTypes = [
            "VR Headset", "AR Glasses", "Mixed Reality", "VR Controller", "Motion Tracker",
            "Haptic Feedback", "Eye Tracking", "Hand Tracking", "Spatial Audio", "VR Treadmill"
        ];
        const type = deviceTypes[index % deviceTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Độ phân giải": index % 2 === 0 ? "4K per eye" : "8K per eye",
            "Tần số làm mới (Hz)": 90 + (index * 30),
            "Góc nhìn (độ)": 110 + (index * 10),
            "Kết nối": ["USB-C", "Wireless", "Bluetooth 5.0"][index % 3],
            "Theo dõi": index % 2 === 0 ? "Inside-out" : "Outside-in",
            "Pin (mAh)": 3000 + (index * 1000),
            "Thời gian sử dụng (giờ)": 2 + (index * 2),
            "Trọng lượng (g)": 400 + (index * 100),
            "Tương thích": ["SteamVR", "Oculus Store", "PlayStation VR"][index % 3],
            "Bảo hành (tháng)": 12 + (index * 6),
            "Xuất xứ": index % 2 === 0 ? "Mỹ" : "Trung Quốc"
        };
    }
    
    // Generate drone specs
    generateDroneSpecs(index) {
        const droneTypes = [
            "Quadcopter", "Hexacopter", "Octocopter", "Fixed-wing", "VTOL",
            "Racing drone", "Photography drone", "Agricultural drone", "Inspection drone", "Delivery drone"
        ];
        const type = droneTypes[index % droneTypes.length];
        
        return {
            "Loại drone": type,
            "Cánh quạt": 4 + (index % 4) * 2,
            "Camera": index % 2 === 0 ? "4K 60fps" : "8K 30fps",
            "Thời gian bay (phút)": 20 + (index * 5),
            "Tầm điều khiển (m)": 1000 + (index * 500),
            "Tốc độ tối đa (km/h)": 40 + (index * 10),
            "Pin (mAh)": 3000 + (index * 1000),
            "Trọng lượng (g)": 500 + (index * 200),
            "GPS": "Có",
            "Tránh chướng ngại vật": "Có",
            "Chống nước": index % 2 === 0 ? "Không" : "IP43",
            "Bảo hành (tháng)": 12 + (index * 6),
            "Xuất xứ": index % 2 === 0 ? "Trung Quốc" : "Mỹ"
        };
    }
    
    // Generate medical wellness specs
    generateMedicalWellnessSpecs(index) {
        const deviceTypes = [
            "Máy đo huyết áp tự động", "Máy xông mặt", "Máy massage chân", "Máy trị liệu ánh sáng",
            "Máy đo nồng độ oxy", "Máy điện xung", "Máy siêu âm", "Máy laser trị liệu",
            "Máy đo nhiệt độ", "Máy theo dõi ECG"
        ];
        const type = deviceTypes[index % deviceTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Chức năng": index % 2 === 0 ? "Đo lường" : "Trị liệu",
            "Độ chính xác": index % 2 === 0 ? "±1%" : "±2%",
            "Màn hình": index % 2 === 0 ? "LCD 7 inch" : "OLED 5 inch",
            "Kết nối": ["Bluetooth", "WiFi", "USB"][index % 3],
            "Bộ nhớ": index % 2 === 0 ? "100 lần đo" : "200 lần đo",
            "Pin (mAh)": 1500 + (index * 500),
            "Thời gian sử dụng (giờ)": 8 + (index * 4),
            "Chứng nhận": "FDA, CE, ISO 13485",
            "Bảo hành (tháng)": 12 + (index * 6),
            "Xuất xứ": index % 2 === 0 ? "Nhật Bản" : "Đức",
            "An toàn": "An toàn cho sử dụng tại nhà"
        };
    }
    
    // Generate educational toys specs
    generateEducationalToysSpecs(index) {
        const toyTypes = [
            "Lập trình robot", "Khoa học bộ kit", "Toán học trò chơi", "Ngôn ngữ học tập",
            "Địa lý bản đồ", "Hóa chất thí nghiệm", "Vật lý bộ kit", "Sinh học mô hình",
            "Lịch sử timeline", "Nghệ thuật sáng tạo"
        ];
        const type = toyTypes[index % toyTypes.length];
        
        return {
            "Loại đồ chơi": type,
            "Độ tuổi": index % 3 === 0 ? "3-6 tuổi" : index % 3 === 1 ? "7-12 tuổi" : "13+ tuổi",
            "Môn học": ["Toán", "Khoa học", "Ngôn ngữ", "Nghệ thuật"][index % 4],
            "Số bộ phận": 50 + (index * 25),
            "Chất liệu": index % 2 === 0 ? "Nhựa an toàn" : "Gỗ tự nhiên",
            "Kích thước (cm)": `${30 + (index * 5)}x${20 + (index * 3)}x${10 + (index * 2)}`,
            "Trọng lượng (g)": 500 + (index * 200),
            "Tính năng": index % 2 === 0 ? "Tương tác" : "Giáo dục",
            "Nguồn điện": index % 2 === 0 ? "Pin" : "Sạc",
            "Bảo hành (tháng)": 6 + (index * 3),
            "Xuất xứ": index % 2 === 0 ? "Mỹ" : "Đức",
            "Chứng nhận": "ASTM F963, CE"
        };
    }
    
    // Generate chef equipment specs
    generateChefEquipmentSpecs(index) {
        const equipmentTypes = [
            "Bộ dao đầu bếp", "Máy xay thực phẩm", "Máy cắt thịt", "Lò nướng chuyên nghiệp",
            "Máy làm mát", "Máy trộn bột", "Máy làm đá", "Bàn inox",
            "Tủ lạnh chuyên nghiệp", "Máy rửa bát công nghiệp"
        ];
        const type = equipmentTypes[index % equipmentTypes.length];
        
        return {
            "Loại thiết bị": type,
            "Chất liệu": index % 2 === 0 ? "Inox 304" : "Thép không gỉ",
            "Công suất (W)": 500 + (index * 200),
            "Điện áp (V)": 220,
            "Kích thước (mm)": `${600 + (index * 100)}x${500 + (index * 50)}x${800 + (index * 100)}`,
            "Trọng lượng (kg)": 20 + (index * 10),
            "Nhiệt độ (°C)": index % 2 === 0 ? "0-4°C" : "-18°C",
            "Dung tích (L)": 100 + (index * 50),
            "Chứng nhận": "NSF, ETL, CE",
            "Bảo hành (tháng)": 12 + (index * 6),
            "Xuất xứ": index % 2 === 0 ? "Đức" : "Nhật Bản",
            "An toàn": "An toàn thực phẩm"
        };
    }
    
    // Generate eco products specs
    generateEcoProductsSpecs(index) {
        const productTypes = [
            "Túi tái sử dụng", "Bình nước tre", "Bàn chải tre", "Khăn microfiber",
            "Bát tre", "Ly thủy tinh", "Sáp ong bọc thực phẩm", "Bột giặt hữu cơ",
            "Nến đậu nành", "Dầu gội hữu cơ"
        ];
        const type = productTypes[index % productTypes.length];
        
        return {
            "Loại sản phẩm": type,
            "Chất liệu": index % 2 === 0 ? "Tre" : "Hữu cơ",
            "Khả năng tái chế": "100%",
            "Thời gian phân hủy": index % 2 === 0 ? "6 tháng" : "1 năm",
            "Kích thước": "Standard",
            "Trọng lượng (g)": 50 + (index * 20),
            "Màu sắc": index % 2 === 0 ? "Tự nhiên" : "Nhuộm thực vật",
            "Bảo quản": "Nơi khô ráo",
            "Hạn sử dụng": "24 tháng",
            "Chứng nhận": "USDA Organic, FSC",
            "Xuất xứ": index % 2 === 0 ? "Việt Nam" : "Thái Lan",
            "Tác động môi trường": "Thân thiện với môi trường"
        };
    }
    
    // Generate Vietnamese crafts specs
    generateVietnameseCraftsSpecs(index) {
        const craftTypes = [
            "Gốm sứ Bát Tràng", "Lụa Vạn Phúc", "Đồng điêu khắc", "Tranh Đông Hồ",
            "Nón lá", "Rơm nếp", "Mây tre đan", "Tràng cẩm", "Gốm Chu Đậu", "Lụa tơ tằm"
        ];
        const type = craftTypes[index % craftTypes.length];
        
        return {
            "Loại thủ công": type,
            "Vùng miền": ["Bắc", "Trung", "Nam"][index % 3],
            "Chất liệu": index % 2 === 0 ? "Đất sét" : "Tơ tằm",
            "Kỹ thuật": index % 2 === 0 ? "Nung" : "Dệt",
            "Kích thước (cm)": `${20 + (index * 5)}x${15 + (index * 3)}x${10 + (index * 2)}`,
            "Trọng lượng (g)": 200 + (index * 100),
            "Màu sắc": index % 2 === 0 ? "Men tự nhiên" : "Màu tự nhiên",
            "Bảo quản": "Nơi khô ráo, tránh ẩm",
            "Thời gian sản xuất": "2-3 tuần",
            "Chứng nhận": "OCOP, UNESCO",
            "Xuất xứ": "Việt Nam",
            "Giá trị văn hóa": "Di sản văn hóa Việt Nam"
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
        if (categoryId.includes("fitness")) {
            specifications = this.generateProfessionalFitnessSpecs(index);
        } else if (categoryId.includes("art")) {
            specifications = this.generateArtSuppliesSpecs(index);
        } else if (categoryId.includes("vr") || categoryId.includes("ar")) {
            specifications = this.generateVRARSpecs(index);
        } else if (categoryId.includes("drone")) {
            specifications = this.generateDroneSpecs(index);
        } else if (categoryId.includes("medical") || categoryId.includes("wellness")) {
            specifications = this.generateMedicalWellnessSpecs(index);
        } else if (categoryId.includes("educational")) {
            specifications = this.generateEducationalToysSpecs(index);
        } else if (categoryId.includes("chef")) {
            specifications = this.generateChefEquipmentSpecs(index);
        } else if (categoryId.includes("eco")) {
            specifications = this.generateEcoProductsSpecs(index);
        } else if (categoryId.includes("vietnamese")) {
            specifications = this.generateVietnameseCraftsSpecs(index);
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
            id: `ULT${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`,
            sku: `ULT${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`,
            name: `${category.name.split(' ')[0]} ${index + 1}`,
            name_en: `${category.name_en.split(' ')[0]} ${index + 1}`,
            name_ja: `${category.name_ja.split(' ')[0]} ${index + 1}`,
            description: `Sản phẩm ${category.name.toLowerCase()} chất lượng cao chuyên nghiệp, phù hợp với nhu cầu chuyên sâu`,
            description_en: `High quality professional ${category.name_en.toLowerCase()} suitable for specialized needs`,
            description_ja: `専門的なニーズに適した高品質な${category.name_ja}`,
            category_id: category.id,
            subcategory: category.name,
            subcategory_en: category.name_en,
            subcategory_ja: category.name_ja,
            brand: brand,
            manufacturer: brand,
            origin: "Vietnam",
            specifications: specifications,
            pricing: {
                retail_price: 200000 + (index * 50000),
                wholesale_price: 160000 + (index * 40000),
                currency: "VND",
                min_order_quantity: 1,
                price_unit: "cái"
            },
            inventory: {
                in_stock: 200 + (index * 30),
                available: true,
                stock_status: "Còn hàng",
                warehouse_location: "Hà Nội, TP.HCM, Đà Nẵng",
                lead_time: "3-5 ngày"
            },
            images: [
                {
                    url: `https://example.com/images/ULT${String(index + 1).padStart(3, '0')}-1.jpg`,
                    alt: `${category.name} ${index + 1} - Tổng quan`,
                    type: "main"
                },
                {
                    url: `https://example.com/images/ULT${String(index + 1).padStart(3, '0')}-2.jpg`,
                    alt: `${category.name} ${index + 1} - Chi tiết`,
                    type: "detail"
                }
            ],
            attributes: [
                {
                    name: "Mã sản phẩm",
                    value: `ULT${String(index + 1).padStart(3, '0')}-${String(categoryId.split('_')[1]).padStart(3, '0')}`
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
            tags: [category.name.toLowerCase(), "chuyên nghiệp", "cao cấp", "đặc biệt"],
            rating: 4.5 + (index % 10) * 0.05,
            reviews: 20 + (index * 3),
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
    
    // Export all ultra extended retail products
    exportUltraExtendedRetailProducts() {
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
                description: `Danh mục ${category.name.toLowerCase()} với ${category.products} sản phẩm chuyên nghiệp`,
                description_en: `${category.name_en} category with ${category.products} professional products`,
                description_ja: `${category.name_ja}カテゴリ、${category.products}専門製品`,
                icon: "fas fa-star",
                parent_id: null,
                level: 1,
                product_count: category.products,
                specifications: Object.keys(this.generateProduct(categoryId, 0).specifications),
                applications: ["retail", "professional", "specialized", "premium"]
            });
        });
        
        return {
            metadata: {
                version: "3.0",
                generated_date: new Date().toISOString(),
                total_products: allProducts.length,
                total_categories: categoryData.length,
                total_brands: Object.values(this.brands).flat().length,
                total_suppliers: this.suppliers.length,
                total_retailers: this.retailers.length,
                source: "Ultra Extended Retail Products Generator",
                description: "Bộ dữ liệu sản phẩm bán lẻ siêu mở rộng với các sản phẩm chuyên nghiệp và đặc biệt",
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
            "Dưới 300k": 0,
            "300k-500k": 0,
            "500k-1M": 0,
            "1M-2M": 0,
            "2M-5M": 0,
            "5M-10M": 0,
            "Trên 10M": 0
        };
        
        products.forEach(product => {
            const price = product.pricing.retail_price;
            if (price < 300000) ranges["Dưới 300k"]++;
            else if (price < 500000) ranges["300k-500k"]++;
            else if (price < 1000000) ranges["500k-1M"]++;
            else if (price < 2000000) ranges["1M-2M"]++;
            else if (price < 5000000) ranges["2M-5M"]++;
            else if (price < 10000000) ranges["5M-10M"]++;
            else ranges["Trên 10M"]++;
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
            "4.8-4.9": 0,
            "4.5-4.7": 0,
            "4.0-4.4": 0,
            "Dưới 4.0": 0
        };
        
        products.forEach(product => {
            const rating = product.rating;
            if (rating >= 5.0) ratings["5.0"]++;
            else if (rating >= 4.8) ratings["4.8-4.9"]++;
            else if (rating >= 4.5) ratings["4.5-4.7"]++;
            else if (rating >= 4.0) ratings["4.0-4.4"]++;
            else ratings["Dưới 4.0"]++;
        });
        
        return Object.entries(ratings).map(([range, count]) => ({
            rating_range: range,
            product_count: count,
            percentage: ((count / products.length) * 100).toFixed(1) + '%'
        }));
    }
}

module.exports = UltraExtendedRetailProductsGenerator;
