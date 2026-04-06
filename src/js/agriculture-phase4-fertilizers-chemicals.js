/**
 * Phase 4: Fertilizers and Agricultural Chemicals Generator
 * Phân bón và Hóa chất nông nghiệp
 */

class FertilizersChemicalsGenerator {
    constructor() {
        this.categories = {
            // Phân bón vô cơ (Inorganic Fertilizers)
            nitrogen_fertilizers: { 
                id: "cat_nitrogen_fertilizers", 
                name: "Phân bón nitơ", 
                name_en: "Nitrogen Fertilizers", 
                name_ja: "窒素肥料", 
                products: 40 
            },
            phosphorus_fertilizers: { 
                id: "cat_phosphorus_fertilizers", 
                name: "Phân bón photpho", 
                name_en: "Phosphorus Fertilizers", 
                name_ja: "リン肥料", 
                products: 35 
            },
            potassium_fertilizers: { 
                id: "cat_potassium_fertilizers", 
                name: "Phân bón kali", 
                name_en: "Potassium Fertilizers", 
                name_ja: "カリウム肥料", 
                products: 30 
            },
            npk_fertilizers: { 
                id: "cat_npk_fertilizers", 
                name: "Phân NPK tổng hợp", 
                name_en: "NPK Compound Fertilizers", 
                name_ja: "NPK複合肥料", 
                products: 45 
            },
            micronutrient_fertilizers: { 
                id: "cat_micronutrient_fertilizers", 
                name: "Phân vi lượng", 
                name_en: "Micronutrient Fertilizers", 
                name_ja: "微量要素肥料", 
                products: 25 
            },
            
            // Phân bón hữu cơ (Organic Fertilizers)
            organic_fertilizers: { 
                id: "cat_organic_fertilizers", 
                name: "Phân bón hữu cơ", 
                name_en: "Organic Fertilizers", 
                name_ja: "有機肥料", 
                products: 30 
            },
            bio_fertilizers: { 
                id: "cat_bio_fertilizers", 
                name: "Phân sinh học", 
                name_en: "Bio-fertilizers", 
                name_ja: "生物肥料", 
                products: 25 
            },
            compost_fertilizers: { 
                id: "cat_compost_fertilizers", 
                name: "Phân compost", 
                name_en: "Compost Fertilizers", 
                name_ja: "堆肥", 
                products: 20 
            },
            
            // Thuốc trừ sâu (Pesticides)
            insecticides: { 
                id: "cat_insecticides", 
                name: "Thuốc trừ sâu", 
                name_en: "Insecticides", 
                name_ja: "殺虫剤", 
                products: 40 
            },
            fungicides: { 
                id: "cat_fungicides", 
                name: "Thuốc trừ nấm", 
                name_en: "Fungicides", 
                name_ja: "殺菌剤", 
                products: 35 
            },
            herbicides: { 
                id: "cat_herbicides", 
                name: "Thuốc diệt cỏ", 
                name_en: "Herbicides", 
                name_ja: "除草剤", 
                products: 40 
            },
            rodenticides: { 
                id: "cat_rodenticides", 
                name: "Thuốc diệt chuột", 
                name_en: "Rodenticides", 
                name_ja: "殺鼠剤", 
                products: 15 
            },
            
            // Hóa chất tăng trưởng (Growth Regulators)
            plant_growth_regulators: { 
                id: "cat_plant_growth_regulators", 
                name: "Chất điều hòa tăng trưởng", 
                name_en: "Plant Growth Regulators", 
                name_ja: "植物成長調整剤", 
                products: 25 
            },
            rooting_hormones: { 
                id: "cat_rooting_hormones", 
                name: "Hormone ra rễ", 
                name_en: "Rooting Hormones", 
                name_ja: "発根剤", 
                products: 15 
            },
            flowering_agents: { 
                id: "cat_flowering_agents", 
                name: "Chất kích thích ra hoa", 
                name_en: "Flowering Agents", 
                name_ja: "開花促進剤", 
                products: 15 
            },
            
            // Hóa chất xử lý đất (Soil Treatments)
            soil_conditioners: { 
                id: "cat_soil_conditioners", 
                name: "Chất cải tạo đất", 
                name_en: "Soil Conditioners", 
                name_ja: "土壌改良剤", 
                products: 20 
            },
            ph_adjusters: { 
                id: "cat_ph_adjusters", 
                name: "Chất điều chỉnh pH", 
                name_en: "pH Adjusters", 
                name_ja: "pH調整剤", 
                products: 15 
            },
            soil_sterilizers: { 
                id: "cat_soil_sterilizers", 
                name: "Chất diệt khuẩn đất", 
                name_en: "Soil Sterilizers", 
                name_ja: "土壌殺菌剤", 
                products: 10 
            },
            
            // Hóa chất bảo quản (Preservatives)
            post_harvest_chemicals: { 
                id: "cat_post_harvest_chemicals", 
                name: "Hóa chất sau thu hoạch", 
                name_en: "Post-Harvest Chemicals", 
                name_ja: "収穫後処理剤", 
                products: 20 
            },
            storage_preservatives: { 
                id: "cat_storage_preservatives", 
                name: "Chất bảo quản kho", 
                name_en: "Storage Preservatives", 
                name_ja: "貯蔵防腐剤", 
                products: 15 
            },
            
            // Adjuvants và phụ gia (Adjuvants & Additives)
            surfactants: { 
                id: "cat_surfactants", 
                name: "Chất hoạt động bề mặt", 
                name_en: "Surfactants", 
                name_ja: "界面活性剤", 
                products: 15 
            },
            spreader_stickers: { 
                id: "cat_spreader_stickers", 
                name: "Chất lan tỏa, bám dính", 
                name_en: "Spreader-Stickers", 
                name_ja: "展着剤", 
                products: 10 
            },
            wetting_agents: { 
                id: "cat_wetting_agents", 
                name: "Chất làm ướt", 
                name_en: "Wetting Agents", 
                name_ja: "湿潤剤", 
                products: 10 
            },
            
            // Phân bón chậm tan (Slow-Release Fertilizers)
            slow_release_fertilizers: { 
                id: "cat_slow_release_fertilizers", 
                name: "Phân bón chậm tan", 
                name_en: "Slow-Release Fertilizers", 
                name_ja: "緩効性肥料", 
                products: 20 
            },
            controlled_release_fertilizers: { 
                id: "cat_controlled_release_fertilizers", 
                name: "Phân bón giải phóng có kiểm soát", 
                name_en: "Controlled-Release Fertilizers", 
                name_ja: "被覆肥料", 
                products: 15 
            },
            
            // Phân bón lá (Foliar Fertilizers)
            foliar_fertilizers: { 
                id: "cat_foliar_fertilizers", 
                name: "Phân bón lá", 
                name_en: "Foliar Fertilizers", 
                name_ja: "葉面散布肥料", 
                products: 30 
            },
            liquid_fertilizers: { 
                id: "cat_liquid_fertilizers", 
                name: "Phân bón lỏng", 
                name_en: "Liquid Fertilizers", 
                name_ja: "液体肥料", 
                products: 25 
            },
            
            // Thuốc trừ sâu sinh học (Biopesticides)
            bio_insecticides: { 
                id: "cat_bio_insecticides", 
                name: "Thuốc trừ sâu sinh học", 
                name_en: "Bio-insecticides", 
                name_ja: "生物農薬（殺虫剤）", 
                products: 20 
            },
            bio_fungicides: { 
                id: "cat_bio_fungicides", 
                name: "Thuốc trừ nấm sinh học", 
                name_en: "Bio-fungicides", 
                name_ja: "生物農薬（殺菌剤）", 
                products: 20 
            },
            bio_herbicides: { 
                id: "cat_bio_herbicides", 
                name: "Thuốc diệt cỏ sinh học", 
                name_en: "Bio-herbicides", 
                name_ja: "生物農薬（除草剤）", 
                products: 15 
            },
            
            // Hóa chất đặc trị (Specialty Chemicals)
            nematicides: { 
                id: "cat_nematicides", 
                name: "Thuốc diệt tuyến trùng", 
                name_en: "Nematicides", 
                name_ja: "殺線虫剤", 
                products: 15 
            },
            acaricides: { 
                id: "cat_acaricides", 
                name: "Thuốc diệt nhện", 
                name_en: "Acaricides", 
                name_ja: "殺ダニ剤", 
                products: 10 
            },
            molluscicides: { 
                id: "cat_molluscicides", 
                name: "Thuốc diệt ốc sên", 
                name_en: "Molluscicides", 
                name_ja: "殺貝剤", 
                products: 10 
            },
            
            // Hóa chất kích thích (Stimulants)
            biostimulants: { 
                id: "cat_biostimulants", 
                name: "Chất kích thích sinh học", 
                name_en: "Biostimulants", 
                name_ja: "バイオスティミュラント", 
                products: 25 
            },
            amino_acid_fertilizers: { 
                id: "cat_amino_acid_fertilizers", 
                name: "Phân bón axit amin", 
                name_en: "Amino Acid Fertilizers", 
                name_ja: "アミノ酸肥料", 
                products: 20 
            },
            seaweed_extract: { 
                id: "cat_seaweed_extract", 
                name: "Chiết xuất rong biển", 
                name_en: "Seaweed Extract", 
                name_ja: "海藻エキス", 
                products: 15 
            },
            
            // Hóa chất xử lý hạt (Seed Treatments)
            seed_treatments: { 
                id: "cat_seed_treatments", 
                name: "Hóa chất xử lý hạt", 
                name_en: "Seed Treatments", 
                name_ja: "種子処理剤", 
                products: 20 
            },
            seed_coatings: { 
                id: "cat_seed_coatings", 
                name: "Vỏ bao hạt", 
                name_en: "Seed Coatings", 
                name_ja: "種子コーティング", 
                products: 15 
            },
            
            // Hóa chất môi trường (Environmental Chemicals)
            soil_moisture_retainers: { 
                id: "cat_soil_moisture_retainers", 
                name: "Chất giữ ẩm đất", 
                name_en: "Soil Moisture Retainers", 
                name_ja: "土壌保水剤", 
                products: 10 
            },
            soil_amendments: { 
                id: "cat_soil_amendments", 
                name: "Chất cải tạo đất chuyên dụng", 
                name_en: "Soil Amendments", 
                name_ja: "土壌改良資材", 
                products: 15 
            }
        };
        
        this.manufacturers = [
            "Viet Fertilizer", "Binh Dien Fertilizer", "Dau Tiem Rubber",
            "Lam Thao Fertilizer", "PetroVietnam Fertilizer", "Ba Ria Fertilizer",
            "Can Tho Fertilizer", "Southern Fertilizer", "Agricultural Genetics",
            "Plant Protection Company", "Central Fertilizer", "Mekong Fertilizer",
            "Tien Giang Fertilizer", "An Giang Fertilizer", "Dong Thap Fertilizer",
            "Vinachem", "AgriViet", "BioAgri Tech", "Green Farm", "EcoChem"
        ];
        
        this.brands = [
            "NPK-Master", "BioGrow", "AgriPlus", "FarmTech", "GreenHarvest",
            "CropCare", "PlantGuard", "SoilRich", "YieldBoost", "AgriSafe",
            "EcoPlant", "BioFarm", "GreenLife", "CropPro", "FarmGuard",
            "AgriChem", "PlantTech", "SoilCare", "YieldMax", "GreenTech"
        ];
        
        this.packagingTypes = [
            "Bao 25kg", "Bao 50kg", "Chai 1L", "Chai 5L", "Can 20L",
            "Thùng 10kg", "Bịch 1kg", "Bịch 5kg", "Bình 500ml", "Bình 1L",
            "Bao 40kg", "Can 10L", "Chai 500ml", "Thùng 20kg", "Bao 100kg"
        ];
        
        this.applicationMethods = [
            "Bón rễ", "Phun lá", "Tưới nhỏ giọt", "Bón lót", "Bón thúc",
            "Ngâm hạt", "Tưới gốc", "Phun sương", "Bón theo hàng", "Bón theo luống"
        ];
    }
    
    // Generate nitrogen fertilizers
    generateNitrogenFertilizerSpecs(index) {
        const nitrogenSources = ["Ure", "Amonium Nitrate", "Amonium Sulfate", "CAN", "Urea Formaldehyde"];
        const nitrogenContent = [46, 33, 21, 27, 38];
        const source = nitrogenSources[index % nitrogenSources.length];
        const content = nitrogenContent[index % nitrogenContent.length];
        
        return {
            "Loại phân": `Phân ${source}`,
            "Hàm lượng N (%)": content,
            "Hàm lượng P2O5 (%)": 0,
            "Hàm lượng K2O (%)": 0,
            "Dạng bón": index % 2 === 0 ? "Hạt tan" : "Bột",
            "Màu sắc": index % 2 === 0 ? "Trắng" : "Vàng nhạt",
            "Độ ẩm (%)": 1 + (index % 3),
            "Tỷ lệ hòa tan (%)": 98 + (index % 2),
            "Ứng dụng chính": index % 2 === 0 ? "Cây lúa, rau màu" : "Cây công nghiệp, ăn quả",
            "Liều lượng khuyến cáo (kg/ha)": 80 + (index * 20),
            "Thời điểm bón": "Bón lót và bón thúc",
            "Tác động môi trường": index % 2 === 0 ? "Thấp" : "Trung bình"
        };
    }
    
    // Generate phosphorus fertilizers
    generatePhosphorusFertilizerSpecs(index) {
        const phosphorusSources = ["Super Phosphate", "Triple Super Phosphate", "DAP", "Rock Phosphate", "MAP"];
        const phosphorusContent = [16, 46, 46, 30, 52];
        const source = phosphorusSources[index % phosphorusSources.length];
        const content = phosphorusContent[index % phosphorusContent.length];
        
        return {
            "Loại phân": `Phân ${source}`,
            "Hàm lượng N (%)": source.includes("DAP") ? 18 : source.includes("MAP") ? 11 : 0,
            "Hàm lượng P2O5 (%)": content,
            "Hàm lượng K2O (%)": 0,
            "Dạng bón": index % 2 === 0 ? "Hạt" : "Bột",
            "Độ hòa tan trong nước (%)": 85 + (index % 15),
            "Độ hòa tan trong citric (%)": 95 + (index % 5),
            "Ứng dụng chính": index % 2 === 0 ? "Cây ăn quả, rau màu" : "Cây lúa, công nghiệp",
            "Liều lượng khuyến cáo (kg/ha)": 60 + (index * 15),
            "Thời điểm bón": "Bón lót",
            "Tác động rễ": index % 2 === 0 ? "Phát triển rễ mạnh" : "Ra rễ tốt"
        };
    }
    
    // Generate potassium fertilizers
    generatePotassiumFertilizerSpecs(index) {
        const potassiumSources = ["Kali Clorua", "Kali Sunfat", "Kali Nitrate", "Kali Thiosulfate", "Kali Carbonate"];
        const potassiumContent = [60, 50, 46, 25, 57];
        const source = potassiumSources[index % potassiumSources.length];
        const content = potassiumContent[index % potassiumContent.length];
        
        return {
            "Loại phân": `Phân ${source}`,
            "Hàm lượng N (%)": source.includes("Nitrate") ? 13 : 0,
            "Hàm lượng P2O5 (%)": 0,
            "Hàm lượng K2O (%)": content,
            "Dạng bón": index % 2 === 0 ? "Tinh thể" : "Hạt",
            "Màu sắc": source.includes("Clorua") ? "Trắng đỏ" : "Trắng",
            "Độ ẩm (%)": 0.5 + (index % 2),
            "Chloride (%)": source.includes("Clorua") ? 60 : 0.1,
            "Ứng dụng chính": index % 2 === 0 ? "Cây ăn quả, cây công nghiệp" : "Rau màu, cây lúa",
            "Liều lượng khuyến cáo (kg/ha)": 50 + (index * 10),
            "Thời điểm bón": "Bón thúc",
            "Tính chất": source.includes("Clorua") ? "Nhạy cảm với Cl" : "An toàn cho cây nhạy cảm"
        };
    }
    
    // Generate NPK compound fertilizers
    generateNPKFertilizerSpecs(index) {
        const npkFormulas = [
            "20-20-15", "16-16-8", "15-5-20", "20-10-10", "12-12-17",
            "16-8-24", "20-15-15", "25-5-5", "10-20-20", "15-15-15",
            "18-9-18", "14-14-14", "22-11-11", "13-13-21", "17-17-17"
        ];
        const formula = npkFormulas[index % npkFormulas.length];
        const [n, p, k] = formula.split("-").map(Number);
        
        return {
            "Công thức N-P-K": formula,
            "Hàm lượng N (%)": n,
            "Hàm lượng P2O5 (%)": p,
            "Hàm lượng K2O (%)": k,
            "Dạng bón": index % 3 === 0 ? "Hạt tan" : index % 3 === 1 ? "Hạt không tan" : "Bột",
            "Màu sắc": ["Xanh", "Vàng", "Đỏ", "Tím", "Nâu"][index % 5],
            "Kích thước hạt (mm)": 2 + (index % 3),
            "Độ cứng (kg)": 2.5 + (index % 2),
            "Ứng dụng chính": index % 3 === 0 ? "Cây lúa" : index % 3 === 1 ? "Cây ăn quả" : "Rau màu",
            "Liều lượng khuyến cáo (kg/ha)": 100 + (index * 25),
            "Số lần bón": 2 + (index % 3),
            "Thành phần bổ sung": index % 2 === 0 ? "S, Mg, B" : "Zn, Mn, Cu"
        };
    }
    
    // Generate micronutrient fertilizers
    generateMicronutrientFertilizerSpecs(index) {
        const micronutrients = ["Kẽm (Zn)", "Sắt (Fe)", "Mangan (Mn)", "Đồng (Cu)", "Bo (B)", "Molypden (Mo)"];
        const nutrient = micronutrients[index % micronutrients.length];
        const content = [10, 12, 13, 5, 20, 0.5][index % micronutrients.length];
        
        return {
            "Yếu tố vi lượng": nutrient,
            "Hàm lượng (%)": content,
            "Dạng bón": index % 2 === 0 ? "Hạt tan" : "Lỏng",
            "Hòa tan trong nước (%)": 95 + (index % 5),
            "pH dung dịch": 5.5 + (index % 3),
            "Triệu chứng thiếu": index % 2 === 0 ? "Vàng lá, chậm lớn" : "Đốm lá, rụng quả",
            "Cây nhạy cảm": index % 3 === 0 ? "Ngô, sắn" : index % 3 === 1 ? "Cà phê, tiêu" : "Rau màu",
            "Liều lượng (kg/ha)": index % 2 === 0 ? 5 + (index * 2) : "2-5 L/ha",
            "Phương thức bón": index % 2 === 0 ? "Bón rễ" : "Phun lá",
            "Tương tác": index % 2 === 0 ? "Không tương tác P" : "Không tương tác K"
        };
    }
    
    // Generate organic fertilizers
    generateOrganicFertilizerSpecs(index) {
        const organicSources = ["Phân chuồng", "Phân xanh", "Phân trùn quế", "Phân cá", "Phân rong biển"];
        const source = organicSources[index % organicSources.length];
        
        return {
            "Nguồn gốc hữu cơ": source,
            "Hàm lượng hữu cơ (%)": 60 + (index * 5),
            "Hàm lượng N (%)": 1 + (index % 3),
            "Hàm lượng P2O5 (%)": 0.5 + (index % 2),
            "Hàm lượng K2O (%)": 0.5 + (index % 2),
            "Độ ẩm (%)": 20 + (index * 5),
            "Tỷ lệ C/N": 15 + (index % 10),
            "pH": 6.5 + (index % 2),
            "Ứng dụng": index % 2 === 0 ? "Cải tạo đất" : "Bón thúc",
            "Liều lượng (kg/ha)": 1000 + (index * 500),
            "Thời điểm bón": "Trồng vụ và sau thu hoạch",
            "Ưu điểm": "Cải tạo cấu trúc đất, tăng độ phì nhiêu"
        };
    }
    
    // Generate bio-fertilizers
    generateBioFertilizerSpecs(index) {
        const microorganisms = ["Rhizobium", "Azotobacter", "Azospirillum", "Phosphate Solubilizing", "Mycorrhiza"];
        const organism = microorganisms[index % microorganisms.length];
        
        return {
            "Vi sinh vật": organism,
            "Số lượng vi sinh (CFU/g)": 10_000_000 * (index + 1),
            "Dạng sản phẩm": index % 2 === 0 ? "Bột" : "Lỏng",
            "Sống còn (%)": 85 + (index % 10),
            "pH": 6.5 + (index % 2),
            "Độ ẩm (%)": index % 2 === 0 ? 15 : 5,
            "Cây phù hợp": index % 2 === 0 ? "Đậu nành, đậu xanh" : "Lúa, ngô",
            "Liều lượng": index % 2 === 0 ? "10-20 kg/ha" : "5-10 L/ha",
            "Phương thức": index % 2 === 0 ? "Ngâm hạt" : "Tưới gốc",
            "Hiệu quả": "Cố định đạm, giải phóng P"
        };
    }
    
    // Generate insecticides
    generateInsecticideSpecs(index) {
        const activeIngredients = ["Imidacloprid", "Chlorpyrifos", "Abamectin", "Deltamethrin", "Fipronil"];
        const ingredient = activeIngredients[index % activeIngredients.length];
        const concentration = [20, 40, 1.8, 2.5, 5][index % activeIngredients.length];
        
        return {
            "Hoạt chất chính": ingredient,
            "Hàm lượng (%)": concentration,
            "Nhóm hóa học": index % 2 === 0 ? "Neonicotinoid" : "Organophosphate",
            "Cơ chế tác động": index % 2 === 0 ? "Hệ thần kinh" : "Tiêu hóa",
            "Sâu hại mục tiêu": index % 3 === 0 ? "Sâu đục thân" : index % 3 === 1 ? "Rệp" : "Bọ trĩ",
            "Cây trồng": index % 2 === 0 ? "Lúa, rau màu" : "Cây ăn quả, công nghiệp",
            "Liều lượng (L/ha)": 0.5 + (index * 0.5),
            "Thời gian cách ly (ngày)": 7 + (index * 3),
            "Độc tính": index % 2 === 0 ? "II" : "III",
            "Tác động phụ": "An toàn cho môi trường khi dùng đúng liều"
        };
    }
    
    // Generate fungicides
    generateFungicideSpecs(index) {
        const activeIngredients = ["Mancozeb", "Metalaxyl", "Carbendazim", "Tebuconazole", "Copper Oxychloride"];
        const ingredient = activeIngredients[index % activeIngredients.length];
        const concentration = [80, 10, 50, 25, 50][index % activeIngredients.length];
        
        return {
            "Hoạt chất chính": ingredient,
            "Hàm lượng (%)": concentration,
            "Nhóm hóa học": index % 2 === 0 ? "Dithiocarbamate" : "Triazole",
            "Cơ chế tác động": index % 2 === 0 ? "Đa điểm" : "Hệ thống",
            "Bệnh mục tiêu": index % 3 === 0 ? "Bệnh đạo sợi" : index % 3 === 1 ? "Bệnh phấn trắng" : "Bệnh thán thư",
            "Cây trồng": index % 2 === 0 ? "Nho, cà phê" : "Lúa, rau màu",
            "Liều lượng (kg/ha)": 1 + (index * 0.5),
            "Thời gian cách ly (ngày)": 10 + (index * 5),
            "Phòng trị": index % 2 === 0 ? "Phòng" : "Trị",
            "Khả năng kháng": index % 2 === 0 ? "Thấp" : "Trung bình"
        };
    }
    
    // Generate herbicides
    generateHerbicideSpecs(index) {
        const activeIngredients = ["Glyphosate", "2,4-D", "Paraquat", "Atrazine", "Butachlor"];
        const ingredient = activeIngredients[index % activeIngredients.length];
        const concentration = [48, 80, 20, 50, 60][index % activeIngredients.length];
        
        return {
            "Hoạt chất chính": ingredient,
            "Hàm lượng (%)": concentration,
            "Nhóm hóa học": index % 2 === 0 ? "Organophosphate" : "Phenoxy",
            "Cơ chế tác động": index % 2 === 0 ? "Không chọn lọc" : "Chọn lọc",
            "Cỏ mục tiêu": index % 3 === 0 ? "Cỏ lá hẹp" : index % 3 === 1 ? "Cỏ lá rộng" : "Cỏ đa niên",
            "Cây trồng": index % 2 === 0 ? "Khoảng trống" : "Lúa, ngô",
            "Liều lượng (L/ha)": 1 + (index * 0.5),
            "Thời gian cách ly (ngày)": 15 + (index * 5),
            "Thời điểm phun": index % 2 === 0 ? "Trước trồng" : "Sau trồng",
            "Tác động": index % 2 === 0 ? "Tiêu diệt toàn bộ" : "Chọn lọc cỏ"
        };
    }
    
    // Generate plant growth regulators
    generatePlantGrowthRegulatorSpecs(index) {
        const regulators = ["GA3 (Gibberellin)", "NAA (Naphthalene)", "6-BA", "Ethrel", "CCC"];
        const regulator = regulators[index % regulators.length];
        const concentration = [20, 10, 6, 39, 50][index % regulators.length];
        
        return {
            "Chất điều hòa": regulator,
            "Hàm lượng (%)": concentration,
            "Cơ chế tác động": index % 2 === 0 ? "Kích thích tăng trưởng" : "Ức chế tăng trưởng",
            "Mục tiêu": index % 3 === 0 ? "Tăng trưởng thân" : index % 3 === 1 ? "Ra hoa" : "Trái to",
            "Cây trồng": index % 2 === 0 ? "Nho, lê" : "Lúa, ngô",
            "Liều lượng (ppm)": 50 + (index * 50),
            "Thời điểm sử dụng": index % 2 === 0 ? "Trước ra hoa" : "Sau ra hoa",
            "Hiệu quả": index % 2 === 0 ? "Tăng năng suất 15-20%" : "Chống rụng trái",
            "Tác dụng phụ": "An toàn khi dùng đúng liều"
        };
    }
    
    // Generate soil conditioners
    generateSoilConditionerSpecs(index) {
        const conditioners = ["Gypsum", "Lime", "Organic Matter", "Biochar", "Zeolite"];
        const conditioner = conditioners[index % conditioners.length];
        
        return {
            "Chất cải tạo": conditioner,
            "Thành phần chính": index % 2 === 0 ? "CaSO4" : "CaCO3",
            "Hàm lượng (%)": 85 + (index % 10),
            "Dạng sản phẩm": index % 2 === 0 ? "Bột" : "Hạt",
            "pH": index % 2 === 0 ? 7 : 9,
            "Cải tạo": index % 3 === 0 ? "Độ kiềm" : index % 3 === 1 ? "Cấu trúc" : "Độ phì",
            "Liều lượng (kg/ha)": 500 + (index * 500),
            "Thời điểm": "Trước vụ trồng",
            "Hiệu quả": "Cải tạo đất trong 1-2 năm",
            "Tác động môi trường": "An toàn, bền vững"
        };
    }
    
    // Generate post-harvest chemicals
    generatePostHarvestChemicalSpecs(index) {
        const chemicals = ["Chlorine", "Sodium O-Phenylphenate", "Imazalil", "Thiabendazole", "1-MCP"];
        const chemical = chemicals[index % chemicals.length];
        const concentration = [2, 0.5, 0.1, 0.05, 0.01][index % chemicals.length];
        
        return {
            "Hóa chất": chemical,
            "Hàm lượng (%)": concentration,
            "Mục đích": index % 2 === 0 ? "Khử trùng" : "Chống nấm",
            "Sản phẩm": index % 3 === 0 ? "Trái cây" : index % 3 === 1 ? "Rau củ" : "Ngũ cốc",
            "Phương thức": index % 2 === 0 ? "Phun" : "Ngâm",
            "Liều lượng": index % 2 === 0 ? "100-200 ppm" : "500-1000 ppm",
            "Thời gian xử lý": "5-10 phút",
            "Thời gian bảo quản": "Tăng 2-4 tuần",
            "An toàn": "Tuân thủ MRL"
        };
    }
    
    // Generate surfactants
    generateSurfactantSpecs(index) {
        const surfactants = ["Non-ionic", "Anionic", "Cationic", "Amphoteric", "Organosilicon"];
        const surfactant = surfactants[index % surfactants.length];
        
        return {
            "Loại chất hoạt động": surfactant,
            "Tension bề mặt (mN/m)": 30 - (index % 5),
            "pH": 6 + (index % 3),
            "Độ ổn định pH": "5-9",
            "Tương thích": "Phổ rộng",
            "Liều lượng (L/100L nước)": 0.1 + (index * 0.1),
            "Hiệu quả": "Tăng độ lan tỏa 30-50%",
            "Ứng dụng": "Phun thuốc trừ sâu",
            "An toàn": "Phân hủy sinh học",
            "Bao bì": "Chai 1L, Can 20L"
        };
    }
    
    // Generate slow-release fertilizers
    generateSlowReleaseFertilizerSpecs(index) {
        const coatings = ["Polymer coating", "Sulfur coating", "Resin coating", "Urea-formaldehyde", "IBDU"];
        const coating = coatings[index % coatings.length];
        const duration = [3, 6, 9, 12][index % 4];
        
        return {
            "Loại phân": "Phân chậm tan",
            "Lớp bao phủ": coating,
            "Thời gian giải phóng (tháng)": duration,
            "Hàm lượng N (%)": 40 + (index % 10),
            "Hàm lượng P2O5 (%)": index % 2 === 0 ? 10 : 0,
            "Hàm lượng K2O (%)": index % 2 === 0 ? 10 : 0,
            "Kích thước hạt (mm)": 3 + (index % 2),
            "Tỷ lệ giải phóng (%)": 10 + (index * 5),
            "Ứng dụng": index % 2 === 0 ? "Cây công nghiệp" : "Cây ăn quả",
            "Liều lượng (kg/ha)": 150 + (index * 50),
            "Ưu điểm": "Giảm số lần bón, tăng hiệu suất sử dụng",
            "Môi trường": "Giảm rửa trôi, giảm ô nhiễm"
        };
    }
    
    // Generate controlled-release fertilizers
    generateControlledReleaseFertilizerSpecs(index) {
        const releaseTypes = ["Temperature-controlled", "Moisture-controlled", "pH-controlled", "Time-release"];
        const releaseType = releaseTypes[index % releaseTypes.length];
        
        return {
            "Loại phân": "Phân giải phóng có kiểm soát",
            "Cơ chế giải phóng": releaseType,
            "Hàm lượng N (%)": 42 + (index % 8),
            "Hàm lượng P2O5 (%)": 8 + (index % 4),
            "Hàm lượng K2O (%)": 8 + (index % 4),
            "Vật liệu bao phủ": index % 2 === 0 ? "Polymer" : "Resin",
            "Độ dày bao phủ (µm)": 50 + (index * 10),
            "Nhiệt độ kích hoạt (°C)": 20 + (index % 5),
            "Độ ẩm kích thích (%)": 60 + (index % 20),
            "Ứng dụng chính": "Nông nghiệp công nghệ cao",
            "Liều lượng (kg/ha)": 100 + (index * 25),
            "Hiệu quả": "Tăng hiệu suất 20-30%"
        };
    }
    
    // Generate foliar fertilizers
    generateFoliarFertilizerSpecs(index) {
        const nutrientTypes = ["NPK cao", "Vi lượng", "Axit amin", "Humic acid", "Seaweed"];
        const nutrientType = nutrientTypes[index % nutrientTypes.length];
        
        return {
            "Loại phân": "Phân bón lá",
            "Thành phần chính": nutrientType,
            "Hàm lượng N (%)": 10 + (index % 15),
            "Hàm lượng P2O5 (%)": 5 + (index % 10),
            "Hàm lượng K2O (%)": 5 + (index % 10),
            "pH dung dịch": 5.5 + (index % 2),
            "Độ nhớt (cP)": 10 + (index % 5),
            "Tỷ lệ phun (L/ha)": 200 + (index * 100),
            "Thời điểm phun": index % 2 === 0 ? "Sáng sớm" : "Chiều mát",
            "Tác dụng nhanh (giờ)": 24 + (index * 12),
            "Hiệu quả": "Tăng hấp thu qua lá 90%"
        };
    }
    
    // Generate liquid fertilizers
    generateLiquidFertilizerSpecs(index) {
        const liquidTypes = ["NPK lỏng", "Ure lỏng", "Canxi lỏng", "Magie lỏng", "Vi lượng lỏng"];
        const liquidType = liquidTypes[index % liquidTypes.length];
        
        return {
            "Loại phân": "Phân bón lỏng",
            "Dạng": liquidType,
            "Hàm lượng N (%)": 15 + (index % 20),
            "Hàm lượng P2O5 (%)": 5 + (index % 15),
            "Hàm lượng K2O (%)": 5 + (index % 15),
            "Tỷ trọng (g/mL)": 1.1 + (index % 3) * 0.1,
            "pH": 6 + (index % 3),
            "Độ ổn định": "Ổn định 12 tháng",
            "Phương thức bón": "Tưới nhỏ giọt, phun lá",
            "Liều lượng (L/ha)": 5 + (index * 5),
            "Ưu điểm": "Dễ hòa tan, hấp thu nhanh"
        };
    }
    
    // Generate bio-insecticides
    generateBioInsecticideSpecs(index) {
        const bioAgents = ["Bacillus thuringiensis", "Beauveria bassiana", "Metarhizium", "Neem oil", "Pyrethrin"];
        const agent = bioAgents[index % bioAgents.length];
        const concentration = [1000, 500, 200, 5000, 50][index % bioAgents.length];
        
        return {
            "Tác động sinh học": agent,
            "Nồng độ (CFU/g hoặc ppm)": concentration,
            "Cơ chế tác động": index % 2 === 0 ? "Độc tố" : "Ký sinh",
            "Sâu hại mục tiêu": index % 3 === 0 ? "Sâu xanh" : index % 3 === 1 ? "Sâu đục thân" : "Bọ trĩ",
            "Thời gian tác động (ngày)": 3 + (index % 5),
            "Tác động phụ": index % 2 === 0 ? "Không" : "Thấp",
            "Phạm vi": "Chọn lọc",
            "Liều lượng": index % 2 === 0 ? "1-2 kg/ha" : "2-5 L/ha",
            "An toàn": "An toàn cho người và môi trường",
            "Chống chỉ định": "Không có"
        };
    }
    
    // Generate bio-fungicides
    generateBioFungicideSpecs(index) {
        const bioAgents = ["Trichoderma", "Bacillus subtilis", "Pseudomonas", "Gliocladium", "Streptomyces"];
        const agent = bioAgents[index % bioAgents.length];
        
        return {
            "Vi sinh vật": agent,
            "Nồng độ (CFU/g)": 1000000 * (index + 1),
            "Cơ chế": index % 2 === 0 ? "Cạnh tranh" : "Kháng sinh",
            "Bệnh mục tiêu": index % 3 === 0 ? "Đạo sợi" : index % 3 === 1 ? "Phấn trắng" : "Thán thư",
            "Thời gian ủ bệnh (ngày)": 5 + (index % 3),
            "Tác động": "Phòng và trị",
            "Liều lượng (kg/ha)": 2 + (index * 2),
            "Thời điểm": index % 2 === 0 ? "Phòng" : "Khi có bệnh",
            "Tương thích": "Phổ rộng",
            "Khả năng kháng": "Rất thấp"
        };
    }
    
    // Generate nematicides
    generateNematicideSpecs(index) {
        const activeIngredients = ["Fluopyram", "Abamectin", "Fosthiazate", "Oxamyl", "Carbofuran"];
        const ingredient = activeIngredients[index % activeIngredients.length];
        const concentration = [0.5, 1.8, 10, 24, 3][index % activeIngredients.length];
        
        return {
            "Hoạt chất": ingredient,
            "Hàm lượng (%)": concentration,
            "Cơ chế": index % 2 === 0 ? "Hệ thần kinh" : "Hô hấp",
            "Tuyến trùng mục tiêu": index % 3 === 0 ? "Meloidogyne" : index % 3 === 1 ? "Pratylenchus" : "Radopholus",
            "Cây trồng": index % 2 === 0 ? "Cà phê, tiêu" : "Rau màu",
            "Liều lượng (L/ha)": 1 + (index * 0.5),
            "Thời gian cách ly (ngày)": 30 + (index * 15),
            "Độc tính": index % 2 === 0 ? "II" : "III",
            "Phương thức": "Tưới gốc, bón rễ",
            "Hiệu quả": "80-95%"
        };
    }
    
    // Generate biostimulants
    generateBiostimulantSpecs(index) {
        const bioTypes = ["Humic substances", "Fulvic acid", "Seaweed extract", "Amino acids", "Vitamins"];
        const bioType = bioTypes[index % bioTypes.length];
        
        return {
            "Loại chất kích thích": bioType,
            "Nguồn gốc": index % 2 === 0 ? "Thực vật" : "Vi sinh",
            "Hàm lượng (%)": 10 + (index * 5),
            "pH": 5 + (index % 4),
            "Tác động": index % 3 === 0 ? "Rễ" : index % 3 === 1 ? "Cây" : "Quả",
            "Cây phù hợp": index % 2 === 0 ? "Rau màu" : "Cây ăn quả",
            "Liều lượng (L/ha)": 2 + (index * 2),
            "Tần suất": "10-15 ngày/lần",
            "Hiệu quả": "Tăng năng suất 10-25%",
            "Tính chất": "Hoàn toàn hữu cơ"
        };
    }
    
    // Generate amino acid fertilizers
    generateAminoAcidFertilizerSpecs(index) {
        const aminoAcids = ["Glycine", "Glutamic acid", "Aspartic acid", "Alanine", "Serine"];
        const aminoAcid = aminoAcids[index % aminoAcids.length];
        
        return {
            "Axit amin chính": aminoAcid,
            "Tổng axit amin (%)": 15 + (index * 5),
            "N hữu cơ (%)": 8 + (index % 4),
            "Dạng": index % 2 === 0 ? "Bột" : "Lỏng",
            "pH": 4.5 + (index % 3),
            "Tỷ lệ hấp thu (%)": 95 + (index % 5),
            "Tác động": index % 2 === 0 ? "Tăng trưởng" : "Chống stress",
            "Liều lượng": index % 2 === 0 ? "2-5 kg/ha" : "1-3 L/ha",
            "Thời điểm": "Giai đoạn tăng trưởng nhanh",
            "Kết hợp": "Phù hợp với phân bón khác"
        };
    }
    
    // Generate seaweed extract
    generateSeaweedExtractSpecs(index) {
        const seaweedTypes = ["Ascophyllum", "Ecklonia", "Laminaria", "Sargassum", "Gracilaria"];
        const seaweedType = seaweedTypes[index % seaweedTypes.length];
        
        return {
            "Loại rong biển": seaweedType,
            "Nguồn": index % 2 === 0 ? "Biển lạnh" : "Nhiệt đới",
            "Hàm lượng chiết xuất (%)": 20 + (index * 10),
            "Alginates (%)": 10 + (index % 5),
            "Mannitol (%)": 5 + (index % 3),
            "Hormone tự nhiên": "Cytokinin, Auxin",
            "Tác động": "Kích thích tăng trưởng, chống stress",
            "Liều lượng (L/ha)": 2 + (index * 3),
            "Phương thức": "Phun lá, tưới gốc",
            "Tần suất": "15-20 ngày/lần",
            "Hiệu quả": "Tăng chất lượng nông sản"
        };
    }
    
    // Generate seed treatments
    generateSeedTreatmentSpecs(index) {
        const treatmentTypes = ["Fungicide", "Insecticide", "Growth regulator", "Micronutrient", "Biological"];
        const treatmentType = treatmentTypes[index % treatmentTypes.length];
        
        return {
            "Loại xử lý": treatmentType,
            "Hoạt chất": index % 2 === 0 ? "Thiophanate" : "Imidacloprid",
            "Hàm lượng (g/kg hạt)": 2 + (index * 2),
            "Cơ chế": index % 2 === 0 ? "Bảo vệ" : "Kích thích",
            "Hạt phù hợp": index % 3 === 0 ? "Lúa" : index % 3 === 1 ? "Ngô" : "Đậu",
            "Tỷ lệ xử lý (%)": 0.1 + (index * 0.1),
            "Thời gian bảo vệ (ngày)": 15 + (index * 5),
            "Tăng tỷ lệ nảy mầm (%)": 5 + (index * 3),
            "Phương thức": "Trộn máy, trộn tay",
            "Lưu trữ": "Bảo quản 6 tháng"
        };
    }
    
    // Generate soil moisture retainers
    generateSoilMoistureRetainerSpecs(index) {
        const polymerTypes = ["Polyacrylamide", "Potassium polyacrylate", "Sodium polyacrylate", "Cross-linked PAM"];
        const polymerType = polymerTypes[index % polymerTypes.length];
        
        return {
            "Loại polymer": polymerType,
            "Công nghệ": index % 2 === 0 ? "Cross-linked" : "Linear",
            "Năng lực giữ nước (g/g)": 200 + (index * 100),
            "Thời gian hiệu quả (năm)": 2 + (index % 3),
            "pH hoạt động": "6-8",
            "Độ mặn chịu được (ppm)": 1000 + (index * 500),
            "Liều lượng (kg/ha)": 10 + (index * 5),
            "Phương thức bón": "Trộn với đất",
            "Tăng hiệu quả tưới (%)": 20 + (index * 10),
            "Tác động môi trường": "An toàn, phân hủy sinh học"
        };
    }

    generateProduct(categoryKey, index) {
        const category = this.categories[categoryKey];
        const manufacturer = this.manufacturers[index % this.manufacturers.length];
        const brand = this.brands[index % this.brands.length];
        const packaging = this.packagingTypes[index % this.packagingTypes.length];
        const application = this.applicationMethods[index % this.applicationMethods.length];
        
        let specs = {};
        
        switch(categoryKey) {
            case "nitrogen_fertilizers":
                specs = this.generateNitrogenFertilizerSpecs(index);
                break;
            case "phosphorus_fertilizers":
                specs = this.generatePhosphorusFertilizerSpecs(index);
                break;
            case "potassium_fertilizers":
                specs = this.generatePotassiumFertilizerSpecs(index);
                break;
            case "npk_fertilizers":
                specs = this.generateNPKFertilizerSpecs(index);
                break;
            case "micronutrient_fertilizers":
                specs = this.generateMicronutrientFertilizerSpecs(index);
                break;
            case "organic_fertilizers":
                specs = this.generateOrganicFertilizerSpecs(index);
                break;
            case "bio_fertilizers":
                specs = this.generateBioFertilizerSpecs(index);
                break;
            case "compost_fertilizers":
                specs = this.generateOrganicFertilizerSpecs(index + 20);
                break;
            case "insecticides":
                specs = this.generateInsecticideSpecs(index);
                break;
            case "fungicides":
                specs = this.generateFungicideSpecs(index);
                break;
            case "herbicides":
                specs = this.generateHerbicideSpecs(index);
                break;
            case "rodenticides":
                specs = this.generateInsecticideSpecs(index + 40);
                break;
            case "plant_growth_regulators":
                specs = this.generatePlantGrowthRegulatorSpecs(index);
                break;
            case "rooting_hormones":
                specs = this.generatePlantGrowthRegulatorSpecs(index + 25);
                break;
            case "flowering_agents":
                specs = this.generatePlantGrowthRegulatorSpecs(index + 40);
                break;
            case "soil_conditioners":
                specs = this.generateSoilConditionerSpecs(index);
                break;
            case "ph_adjusters":
                specs = this.generateSoilConditionerSpecs(index + 20);
                break;
            case "soil_sterilizers":
                specs = this.generateSoilConditionerSpecs(index + 30);
                break;
            case "post_harvest_chemicals":
                specs = this.generatePostHarvestChemicalSpecs(index);
                break;
            case "storage_preservatives":
                specs = this.generatePostHarvestChemicalSpecs(index + 20);
                break;
            case "surfactants":
                specs = this.generateSurfactantSpecs(index);
                break;
            case "spreader_stickers":
                specs = this.generateSurfactantSpecs(index + 15);
                break;
            case "wetting_agents":
                specs = this.generateSurfactantSpecs(index + 25);
                break;
            case "slow_release_fertilizers":
                specs = this.generateSlowReleaseFertilizerSpecs(index);
                break;
            case "controlled_release_fertilizers":
                specs = this.generateControlledReleaseFertilizerSpecs(index);
                break;
            case "foliar_fertilizers":
                specs = this.generateFoliarFertilizerSpecs(index);
                break;
            case "liquid_fertilizers":
                specs = this.generateLiquidFertilizerSpecs(index);
                break;
            case "bio_insecticides":
                specs = this.generateBioInsecticideSpecs(index);
                break;
            case "bio_fungicides":
                specs = this.generateBioFungicideSpecs(index);
                break;
            case "bio_herbicides":
                specs = this.generateBioInsecticideSpecs(index + 20);
                break;
            case "nematicides":
                specs = this.generateNematicideSpecs(index);
                break;
            case "acaricides":
                specs = this.generateInsecticideSpecs(index + 80);
                break;
            case "molluscicides":
                specs = this.generateInsecticideSpecs(index + 90);
                break;
            case "biostimulants":
                specs = this.generateBiostimulantSpecs(index);
                break;
            case "amino_acid_fertilizers":
                specs = this.generateAminoAcidFertilizerSpecs(index);
                break;
            case "seaweed_extract":
                specs = this.generateSeaweedExtractSpecs(index);
                break;
            case "seed_treatments":
                specs = this.generateSeedTreatmentSpecs(index);
                break;
            case "seed_coatings":
                specs = this.generateSeedTreatmentSpecs(index + 20);
                break;
            case "soil_moisture_retainers":
                specs = this.generateSoilMoistureRetainerSpecs(index);
                break;
            case "soil_amendments":
                specs = this.generateSoilConditionerSpecs(index + 40);
                break;
        }
        
        return {
            id: `${category.id}_product_${String(index + 1).padStart(3, '0')}`,
            name: `${brand} ${category.name.split(' ')[0]} ${index + 1}`,
            name_en: `${brand} ${category.name_en.split(' ')[0]} ${index + 1}`,
            name_ja: `${brand} ${category.name_ja.split(' ')[0]} ${index + 1}`,
            category: category.id,
            category_name: category.name,
            category_name_en: category.name_en,
            category_name_ja: category.name_ja,
            manufacturer: manufacturer,
            brand: brand,
            packaging: packaging,
            application_method: application,
            specifications: specs,
            metadata: {
                created_date: new Date().toISOString(),
                phase: 4,
                sub_category: categoryKey.split('_')[0],
                regulatory_compliance: "Bộ NN&PTNT",
                safety_level: index % 3 === 0 ? "An toàn" : index % 3 === 1 ? "Thận trọng" : "Nguy hiểm",
                storage_condition: "Nơi khô ráo, thoáng mát",
                shelf_life: "24-36 tháng",
                registration_number: `NN-${2024 + (index % 3)}-${String(index + 1).padStart(4, '0')}`
            }
        };
    }
    
    generateAllProducts() {
        const allProducts = [];
        
        for (const [categoryKey, category] of Object.entries(this.categories)) {
            for (let i = 0; i < category.products; i++) {
                const product = this.generateProduct(categoryKey, i);
                allProducts.push(product);
            }
        }
        
        return allProducts;
    }
    
    exportPhase4Products() {
        const products = this.generateAllProducts();
        
        return {
            metadata: {
                phase: 4,
                name: "Phân bón và Hóa chất nông nghiệp",
                name_en: "Fertilizers and Agricultural Chemicals",
                name_ja: "肥料・農薬",
                description: "Comprehensive range of fertilizers, pesticides, and agricultural chemicals for modern farming",
                description_en: "Comprehensive range of fertilizers, pesticides, and agricultural chemicals for modern farming",
                description_ja: "近代農業向けの肥料、農薬、農業化学薬品の総合製品群",
                total_products: products.length,
                categories: Object.keys(this.categories).length,
                generated_date: new Date().toISOString(),
                version: "1.0.0",
                standards: ["TCCS", "ISO 9001", "GAP", "GMP"],
                applications: ["Nông nghiệp công nghệ cao", "Nông nghiệp hữu cơ", "Nông nghiệp thông thường"],
                coverage: "Toàn quốc và xuất khẩu"
            },
            categories: this.categories,
            products: products,
            statistics: {
                by_category: Object.fromEntries(
                    Object.entries(this.categories).map(([key, cat]) => [
                        key, 
                        {
                            name: cat.name,
                            name_en: cat.name_en,
                            name_ja: cat.name_ja,
                            product_count: cat.products,
                            percentage: ((cat.products / products.length) * 100).toFixed(1) + '%'
                        }
                    ])
                ),
                by_type: {
                    "Phân bón": 415,
                    "Thuốc bảo vệ thực vật": 240,
                    "Chất điều hòa tăng trưởng": 95,
                    "Hóa chất xử lý": 65,
                    "Phụ gia": 35
                }
            }
        };
    }
}

module.exports = FertilizersChemicalsGenerator;
