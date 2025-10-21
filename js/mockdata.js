// AMNA Shop - Mock Data
// Comprehensive mock data for products, users, and other entities

// ========================================
// PRODUCTS DATA
// ========================================

const products = [
    // Electronics
    { 
        id: 1, 
        name: "Wireless Headphones", 
        price: 1249, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
        description: "Experience premium audio with these high-quality wireless headphones featuring advanced active noise cancellation technology. Built with premium materials and ergonomic design for all-day comfort. Features include 30-hour battery life, quick charge capability (3 minutes = 3 hours playback), crystal-clear voice calls with dual microphones, and seamless Bluetooth 5.0 connectivity. Perfect for music lovers, professionals, and travelers who demand superior sound quality and comfort.",
        specifications: {
            "Driver Size": "40mm dynamic drivers",
            "Frequency Response": "20Hz - 20kHz",
            "Impedance": "32 ohms",
            "Sensitivity": "100 dB SPL/mW",
            "Battery Life": "30 hours (ANC on), 40 hours (ANC off)",
            "Charging Time": "2 hours (full charge), 3 minutes = 3 hours playback",
            "Connectivity": "Bluetooth 5.0, 3.5mm jack",
            "Range": "Up to 30 feet (10 meters)",
            "Weight": "250g",
            "Noise Cancellation": "Active Noise Cancellation (ANC)",
            "Microphones": "Dual beamforming microphones",
            "Codecs": "SBC, AAC, aptX, aptX HD",
            "Water Resistance": "IPX4",
            "Case Dimensions": "200 x 180 x 80 mm",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 50,
        rating: 4.5,
        reviews: 128
    },
    { 
        id: 2, 
        name: "Smart Watch", 
        price: 2999, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
        description: "Revolutionary smartwatch that combines cutting-edge technology with elegant design. Features a vibrant AMOLED display, comprehensive health monitoring including heart rate, blood oxygen, sleep tracking, and stress levels. Built-in GPS for accurate fitness tracking, water resistance up to 50 meters, and 7-day battery life. Seamlessly connects to your smartphone for notifications, calls, and app control. Includes 20+ workout modes, music storage, and customizable watch faces. Perfect companion for active lifestyles and health-conscious individuals.",
        specifications: {
            "Display": "1.4-inch AMOLED touchscreen, 454 x 454 pixels",
            "Processor": "Dual-core 1.2GHz processor",
            "RAM": "512MB",
            "Storage": "4GB internal storage",
            "Operating System": "Wear OS 3.0",
            "Battery Life": "7 days (typical use), 2 days (heavy use)",
            "Charging": "Magnetic charging dock, 2-hour charge time",
            "Connectivity": "Bluetooth 5.0, Wi-Fi 802.11 b/g/n, NFC",
            "Sensors": "Heart rate, SpO2, Accelerometer, Gyroscope, GPS, Compass",
            "Water Resistance": "5ATM (50 meters underwater)",
            "Materials": "Aluminum case, Gorilla Glass 3, Silicone band",
            "Dimensions": "44 x 44 x 12.5 mm",
            "Weight": "45g (without band)",
            "Compatibility": "Android 6.0+, iOS 12.0+",
            "Workout Modes": "20+ pre-installed modes",
            "Music Storage": "Up to 500 songs",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 30,
        rating: 4.7,
        reviews: 89
    },
    { 
        id: 3, 
        name: "Wireless Speaker", 
        price: 899, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&crop=center",
        description: "Premium portable Bluetooth speaker delivering exceptional 360-degree sound with deep bass and crystal-clear highs. Features IPX7 waterproof rating for poolside and beach adventures, 12-hour battery life, and built-in microphone for hands-free calls. Advanced audio technology with dual passive radiators and custom-tuned drivers. Includes voice assistant compatibility, party mode for multiple speaker pairing, and rugged design that withstands drops and impacts. Perfect for outdoor adventures, parties, and home entertainment.",
        specifications: {
            "Driver Configuration": "2 x 1.75-inch full-range drivers, 2 x passive radiators",
            "Frequency Response": "65Hz - 20kHz",
            "Output Power": "20W RMS (40W peak)",
            "Battery Life": "12 hours (50% volume), 8 hours (max volume)",
            "Charging Time": "3 hours (USB-C)",
            "Connectivity": "Bluetooth 5.0, 3.5mm aux input",
            "Range": "Up to 100 feet (30 meters)",
            "Water Resistance": "IPX7 (submersible up to 1 meter)",
            "Dimensions": "185 x 70 x 70 mm",
            "Weight": "600g",
            "Voice Assistant": "Google Assistant, Siri compatible",
            "Party Mode": "Connect up to 100+ speakers",
            "Microphone": "Built-in noise-canceling microphone",
            "Materials": "Rubberized exterior, metal grille",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 75,
        rating: 4.3,
        reviews: 156
    },
    { 
        id: 4, 
        name: "Bluetooth Earbuds", 
        price: 1499, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
        description: "Cutting-edge true wireless earbuds featuring advanced active noise cancellation technology that adapts to your environment. Delivers studio-quality sound with custom-tuned drivers and supports high-resolution audio codecs. Features include 8-hour battery life with 24-hour total with charging case, IPX4 water resistance, touch controls, and voice assistant integration. Ergonomic design with multiple ear tip sizes for secure fit during workouts. Includes fast charging (15 minutes = 3 hours playback) and wireless charging case. Ideal for audiophiles, commuters, and fitness enthusiasts.",
        specifications: {
            "Driver Size": "6mm dynamic drivers",
            "Frequency Response": "20Hz - 20kHz",
            "Impedance": "16 ohms",
            "Sensitivity": "103 dB SPL/mW",
            "Battery Life": "8 hours (earbuds), 24 hours (with case)",
            "Charging Time": "1.5 hours (earbuds), 2 hours (case)",
            "Fast Charging": "15 minutes = 3 hours playback",
            "Connectivity": "Bluetooth 5.2, Wireless charging case",
            "Range": "Up to 30 feet (10 meters)",
            "Noise Cancellation": "Active Noise Cancellation (ANC)",
            "Water Resistance": "IPX4 (sweat and splash resistant)",
            "Touch Controls": "Tap, double-tap, triple-tap, hold",
            "Voice Assistant": "Google Assistant, Siri compatible",
            "Codecs": "SBC, AAC, aptX, aptX Adaptive",
            "Ear Tips": "3 sizes (S, M, L) included",
            "Weight": "5.5g per earbud, 45g case",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 40,
        rating: 4.6,
        reviews: 203
    },
    { 
        id: 5, 
        name: "Laptop Stand", 
        price: 599, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
        description: "Premium aluminum laptop stand designed for optimal ergonomics and enhanced productivity. Features 6 adjustable height levels (0-8 inches) and 180-degree rotation for perfect viewing angles. Built with aircraft-grade aluminum for durability and stability, supporting laptops up to 15.6 inches. Improves airflow for better cooling, reduces neck and back strain, and creates a more comfortable workspace. Foldable design for easy portability and storage. Includes non-slip rubber pads to protect your laptop and prevent sliding. Essential accessory for remote workers, students, and professionals.",
        specifications: {
            "Material": "Aircraft-grade aluminum alloy",
            "Laptop Size Support": "Up to 15.6 inches",
            "Weight Capacity": "Up to 8kg (17.6 lbs)",
            "Height Adjustment": "6 levels (0-8 inches / 0-20cm)",
            "Rotation": "180-degree rotation",
            "Dimensions (Folded)": "320 x 240 x 25 mm",
            "Dimensions (Extended)": "320 x 240 x 200 mm",
            "Weight": "800g",
            "Surface": "Non-slip rubber pads",
            "Ventilation": "Open design for improved airflow",
            "Compatibility": "All laptop brands and sizes",
            "Foldable": "Yes, for easy storage and portability",
            "Color": "Silver aluminum",
            "Assembly": "No tools required",
            "Warranty": "1 year manufacturer warranty"
        },
        stock: 25,
        rating: 4.4,
        reviews: 67
    },

    // Fashion & Clothing
    { 
        id: 6, 
        name: "Classic T-Shirt", 
        price: 399, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center",
        description: "Essential wardrobe staple crafted from 100% premium organic cotton for ultimate comfort and breathability. Features a relaxed fit with modern tailoring, reinforced seams for durability, and pre-shrunk fabric to maintain shape after washing. Available in multiple colors with a soft, smooth texture that gets better with each wear. Perfect for layering or wearing alone, this versatile t-shirt transitions seamlessly from casual weekends to smart-casual office wear. Machine washable and designed to last through countless wears while maintaining its color and shape.",
        specifications: {
            "Material": "100% premium organic cotton",
            "Weight": "180 GSM (grams per square meter)",
            "Fit": "Relaxed fit",
            "Sizes Available": "XS, S, M, L, XL, XXL",
            "Colors": "White, Black, Navy, Gray, Olive, Burgundy",
            "Care Instructions": "Machine wash cold, tumble dry low",
            "Pre-shrunk": "Yes, maintains shape after washing",
            "Seams": "Reinforced for durability",
            "Neckline": "Classic crew neck",
            "Sleeve Length": "Short sleeve",
            "Length": "Regular length",
            "Origin": "Made in Egypt",
            "Certification": "Organic cotton certified",
            "Packaging": "Individual poly bag",
            "Warranty": "Quality guarantee"
        },
        stock: 100,
        rating: 4.2,
        reviews: 45
    },
    { 
        id: 7, 
        name: "Denim Jeans", 
        price: 1299, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop&crop=center",
        description: "Premium denim jeans crafted from high-quality cotton denim with a perfect blend of comfort and style. Features a classic straight fit that flatters all body types, reinforced stitching for durability, and a comfortable mid-rise waist. Made with stretch denim for ease of movement while maintaining the authentic denim look. Includes five-pocket styling, button fly closure, and a timeless indigo wash that pairs with everything. Pre-shrunk and designed to maintain shape through multiple washes. Perfect for everyday wear, casual outings, and smart-casual occasions.",
        specifications: {
            "Material": "98% Cotton, 2% Elastane",
            "Weight": "12.5 oz denim",
            "Fit": "Classic straight fit",
            "Rise": "Mid-rise (10 inches)",
            "Sizes Available": "28-40 inch waist, 30-36 inch inseam",
            "Colors": "Indigo, Dark Wash, Light Wash, Black",
            "Stretch": "2% elastane for comfort",
            "Closure": "Button fly with 5-pocket styling",
            "Care Instructions": "Machine wash cold, hang dry",
            "Pre-shrunk": "Yes, minimal shrinkage",
            "Stitching": "Reinforced for durability",
            "Origin": "Made in Egypt",
            "Certification": "OEKO-TEX Standard 100",
            "Packaging": "Individual poly bag",
            "Warranty": "Quality guarantee"
        },
        stock: 60,
        rating: 4.5,
        reviews: 78
    },
    { 
        id: 8, 
        name: "Hoodie", 
        price: 999, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center",
        description: "Ultra-comfortable pullover hoodie made from premium cotton blend fleece for maximum warmth and softness. Features a roomy kangaroo pocket for hands and storage, adjustable drawstring hood with metal eyelets, and ribbed cuffs and hem for a secure fit. Relaxed fit design perfect for layering or wearing alone. Includes a soft brushed interior for added comfort and warmth. Available in multiple colors with a modern, minimalist aesthetic. Perfect for casual wear, outdoor activities, lounging at home, or layering during cooler weather. Machine washable and designed to maintain its shape and softness.",
        specifications: {
            "Material": "80% Cotton, 20% Polyester fleece",
            "Weight": "280 GSM",
            "Fit": "Relaxed fit",
            "Sizes Available": "XS, S, M, L, XL, XXL",
            "Colors": "Black, Gray, Navy, Olive, Burgundy, White",
            "Hood": "Adjustable drawstring with metal eyelets",
            "Pocket": "Kangaroo pocket",
            "Cuffs": "Ribbed cuffs and hem",
            "Interior": "Brushed fleece interior",
            "Care Instructions": "Machine wash cold, tumble dry low",
            "Pre-shrunk": "Yes",
            "Origin": "Made in Egypt",
            "Certification": "OEKO-TEX Standard 100",
            "Packaging": "Individual poly bag",
            "Warranty": "Quality guarantee"
        },
        stock: 45,
        rating: 4.3,
        reviews: 92
    },
    { 
        id: 9, 
        name: "Summer Dress", 
        price: 799, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center",
        description: "Stunning summer dress featuring a beautiful floral pattern that captures the essence of warm weather elegance. Made from lightweight, breathable fabric that drapes beautifully and keeps you cool in hot weather. Features a flattering A-line silhouette, comfortable midi length, and adjustable straps for a perfect fit. The vibrant floral print adds a touch of femininity and sophistication. Perfect for garden parties, brunch dates, beach walks, or any summer occasion. Easy-care fabric that resists wrinkles and maintains its vibrant colors through multiple washes.",
        stock: 35,
        rating: 4.6,
        reviews: 56
    },
    { 
        id: 10, 
        name: "Running Shoes", 
        price: 1999, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center",
        description: "High-performance running shoes engineered for serious athletes and fitness enthusiasts. Features advanced cushioning technology that provides superior shock absorption and energy return with every step. Breathable mesh upper with strategic ventilation zones keeps feet cool and dry during intense workouts. Lightweight design with responsive midsole technology enhances speed and agility. Durable rubber outsole with multi-directional traction pattern provides excellent grip on various surfaces. Perfect for long-distance running, training, and competitive sports. Available in multiple colors and sizes for both men and women.",
        specifications: {
            "Upper Material": "Breathable mesh with synthetic overlays",
            "Midsole": "Advanced cushioning foam with energy return",
            "Outsole": "Durable rubber with multi-directional traction",
            "Weight": "280g (size 9)",
            "Drop": "8mm heel-to-toe drop",
            "Sizes Available": "US 6-13 (Men), US 5-12 (Women)",
            "Colors": "Black/White, Navy/Red, Gray/Blue, White/Pink",
            "Arch Support": "Neutral to moderate",
            "Breathability": "Strategic ventilation zones",
            "Cushioning": "High-level cushioning",
            "Flexibility": "High flexibility in forefoot",
            "Durability": "Designed for 500+ miles",
            "Origin": "Made in Egypt",
            "Certification": "International athletic standards",
            "Warranty": "6 months manufacturer warranty"
        },
        stock: 80,
        rating: 4.7,
        reviews: 134
    },

    // Accessories
    { 
        id: 11, 
        name: "Leather Watch", 
        price: 2499, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
        description: "Exquisite timepiece featuring genuine Italian leather strap and precision Swiss movement for unparalleled accuracy and reliability. Classic round case design with scratch-resistant sapphire crystal and elegant Roman numeral markers. Water-resistant up to 50 meters, making it suitable for everyday wear and light water activities. The supple leather strap develops a unique patina over time, adding character and sophistication. Features date display, luminous hands for low-light visibility, and a secure deployment clasp. Perfect for business meetings, formal events, or adding a touch of elegance to casual outfits. A timeless investment piece that will last for generations.",
        specifications: {
            "Movement": "Swiss automatic movement",
            "Case Material": "Stainless steel 316L",
            "Case Diameter": "42mm",
            "Case Thickness": "12mm",
            "Crystal": "Scratch-resistant sapphire crystal",
            "Dial": "White dial with Roman numerals",
            "Hands": "Luminous hands and markers",
            "Strap": "Genuine Italian leather",
            "Strap Width": "22mm",
            "Clasp": "Deployment clasp with safety",
            "Water Resistance": "5ATM (50 meters)",
            "Functions": "Hours, minutes, seconds, date",
            "Power Reserve": "42 hours",
            "Accuracy": "+/- 15 seconds per month",
            "Weight": "85g",
            "Origin": "Swiss movement, Italian leather",
            "Warranty": "2 years international warranty"
        },
        stock: 20,
        rating: 4.8,
        reviews: 67
    },
    { 
        id: 12, 
        name: "Designer Sunglasses", 
        price: 1799, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop&crop=center",
        description: "Luxury designer sunglasses combining fashion-forward style with superior eye protection. Features 100% UV400 protection against harmful UVA and UVB rays, polarized lenses that reduce glare and enhance visual clarity, and premium acetate frames with metal accents. The oversized lens design provides maximum coverage and a trendy, celebrity-inspired look. Includes a premium case and microfiber cleaning cloth. Perfect for sunny days, beach vacations, driving, and outdoor activities. The timeless design complements both casual and formal outfits, making it a versatile accessory for any wardrobe.",
        specifications: {
            "Lens Material": "CR-39 polarized lenses",
            "UV Protection": "100% UV400 (UVA/UVB)",
            "Lens Technology": "Polarized with anti-reflective coating",
            "Frame Material": "Premium acetate with metal accents",
            "Frame Colors": "Black, Tortoise, Havana, Clear",
            "Lens Colors": "Brown, Gray, Green, Blue",
            "Lens Width": "55mm",
            "Bridge Width": "18mm",
            "Temple Length": "145mm",
            "Weight": "25g",
            "Lens Shape": "Oversized square",
            "Hinge": "Spring-loaded hinges",
            "Nose Pads": "Adjustable silicone nose pads",
            "Accessories": "Premium case and microfiber cloth",
            "Origin": "Designed in Italy",
            "Warranty": "1 year manufacturer warranty"
        },
        stock: 55,
        rating: 4.4,
        reviews: 89
    },
    { 
        id: 13, 
        name: "Leather Wallet", 
        price: 699, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
        description: "Handcrafted genuine leather wallet made from premium full-grain leather that develops a beautiful patina over time. Features multiple card slots for credit cards, ID, and business cards, a spacious bill compartment, and a secure coin pocket with snap closure. Compact bi-fold design fits comfortably in front or back pockets without bulk. The soft, supple leather is treated for water resistance and durability. Includes RFID blocking technology to protect your cards from electronic theft. Perfect for everyday use, business meetings, and travel. A classic accessory that combines functionality with timeless style.",
        stock: 40,
        rating: 4.3,
        reviews: 34
    },
    { 
        id: 14, 
        name: "Phone Case", 
        price: 299, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1601972602288-8634c6c4a6a0?w=300&h=300&fit=crop&crop=center",
        description: "Ultra-protective phone case featuring advanced shock absorption technology and military-grade drop protection. Made from premium materials including a flexible inner core and rigid outer shell that work together to disperse impact energy. Features precise cutouts for all buttons, ports, and cameras, ensuring full functionality while maintaining protection. Raised edges around the screen and camera provide additional protection against scratches. Available in multiple colors and patterns to match your personal style. Slim profile design doesn't add bulk while providing maximum protection. Perfect for active lifestyles and accident-prone users.",
        stock: 120,
        rating: 4.1,
        reviews: 156
    },
    { 
        id: 15, 
        name: "Backpack", 
        price: 1199, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
        description: "Professional-grade backpack designed for modern commuters and travelers. Features a dedicated padded laptop compartment that fits up to 15.6-inch laptops, multiple organizational pockets for accessories, and a spacious main compartment. Made from water-resistant nylon with reinforced stitching for durability. Includes comfortable padded shoulder straps, chest and waist straps for stability, and a top handle for easy carrying. The sleek, minimalist design transitions seamlessly from office to travel. Perfect for business trips, daily commutes, and weekend adventures. Includes a built-in USB charging port for on-the-go device charging.",
        stock: 30,
        rating: 4.5,
        reviews: 78
    },

    // Home & Living
    { 
        id: 16, 
        name: "Modern Lamp", 
        price: 1299, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
        description: "Sleek contemporary table lamp featuring a minimalist design that complements any modern interior. Made from premium materials including brushed metal base and fabric shade for a sophisticated look. Features touch-sensitive dimming control with three brightness levels and warm LED lighting that's easy on the eyes. The adjustable head allows you to direct light exactly where you need it. Energy-efficient LED technology provides long-lasting illumination while consuming minimal power. Perfect for reading, working, or creating ambient lighting in living rooms, bedrooms, or home offices. Easy assembly and maintenance-free operation.",
        specifications: {
            "Base Material": "Brushed aluminum",
            "Shade Material": "Premium fabric",
            "Light Source": "LED (included)",
            "Power": "9W LED bulb",
            "Brightness": "800 lumens",
            "Color Temperature": "3000K (warm white)",
            "Dimming": "Touch-sensitive 3-level dimming",
            "Height": "60cm (adjustable)",
            "Base Diameter": "15cm",
            "Shade Diameter": "25cm",
            "Weight": "1.2kg",
            "Cord Length": "1.5 meters",
            "Voltage": "220V (Egypt standard)",
            "Energy Rating": "A++ (most efficient)",
            "Assembly": "Tool-free assembly",
            "Origin": "Made in Egypt",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 25,
        rating: 4.4,
        reviews: 42
    },
    { 
        id: 17, 
        name: "Coffee Mug Set", 
        price: 399, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop&crop=center",
        description: "Premium ceramic coffee mug set featuring four beautifully designed mugs perfect for your morning routine or entertaining guests. Made from high-quality stoneware with a smooth, glossy finish and comfortable ergonomic handle design. Each mug holds 12 ounces and features a wide mouth for easy drinking and cleaning. The elegant design includes subtle patterns and colors that complement any kitchen or dining room decor. Microwave and dishwasher safe for convenience. Perfect for coffee, tea, hot chocolate, or any warm beverage. Makes an excellent gift for coffee lovers and home decor enthusiasts.",
        stock: 50,
        rating: 4.2,
        reviews: 28
    },
    { 
        id: 18, 
        name: "Decorative Plant", 
        price: 599, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop&crop=center",
        description: "Lush indoor plant in an elegant decorative pot, bringing nature's beauty into your home. Features a low-maintenance variety that thrives in indoor conditions with minimal care. The plant comes in a stylish ceramic pot with drainage holes and a matching saucer. Perfect for adding life and color to any room, improving air quality, and creating a calming atmosphere. Ideal for beginners and busy individuals who want the benefits of houseplants without the hassle. Includes care instructions and can be placed on tables, shelves, or windowsills. A natural way to enhance your home's aesthetic and promote well-being.",
        stock: 35,
        rating: 4.6,
        reviews: 19
    },
    { 
        id: 19, 
        name: "Throw Pillow", 
        price: 299, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
        description: "Luxurious throw pillow featuring a sophisticated geometric pattern that adds visual interest to any living space. Made from premium fabric blend that's soft to the touch and durable for everyday use. The 18x18 inch size is perfect for sofas, chairs, beds, or floor seating. Features a hidden zipper closure for easy cleaning and maintenance. The modern geometric design complements contemporary, minimalist, and eclectic decor styles. Machine washable and fade-resistant to maintain its vibrant colors. Perfect for adding comfort, style, and personality to your home decor.",
        stock: 60,
        rating: 4.3,
        reviews: 37
    },
    { 
        id: 20, 
        name: "Wall Art", 
        price: 899, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&crop=center",
        description: "Stunning modern wall art print featuring vibrant colors and contemporary abstract design that transforms any space into a gallery-worthy environment. Printed on high-quality canvas with fade-resistant inks that maintain their brilliance for years. The 24x36 inch size makes a bold statement while fitting perfectly in living rooms, bedrooms, or offices. Features a sleek black frame with protective glass and ready-to-hang hardware. The abstract composition uses bold brushstrokes and dynamic color combinations that evoke energy and creativity. Perfect for art lovers and anyone looking to add sophisticated style to their home decor.",
        stock: 15,
        rating: 4.7,
        reviews: 23
    },

    // Beauty & Personal Care
    { 
        id: 21, 
        name: "Skincare Set", 
        price: 1499, 
        category: "Beauty", 
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
        description: "Complete professional skincare routine set featuring three essential products for healthy, glowing skin. Includes a gentle foaming cleanser that removes dirt and makeup without stripping natural oils, a hydrating toner that balances pH levels and prepares skin for treatment, and a nourishing moisturizer with SPF protection. All products are formulated with natural ingredients including hyaluronic acid, vitamin E, and botanical extracts. Suitable for all skin types and designed to work together for optimal results. The travel-friendly sizes are perfect for daily use at home or on the go. Achieve radiant, healthy skin with this comprehensive skincare solution.",
        specifications: {
            "Set Contents": "Cleanser (150ml), Toner (200ml), Moisturizer (50ml)",
            "Skin Type": "All skin types",
            "Key Ingredients": "Hyaluronic acid, Vitamin E, Aloe vera, Green tea extract",
            "Cleanser": "Gentle foaming formula, pH balanced",
            "Toner": "Alcohol-free, hydrating formula",
            "Moisturizer": "SPF 30, non-comedogenic",
            "Fragrance": "Light, natural fragrance",
            "Paraben-free": "Yes",
            "Cruelty-free": "Yes",
            "Packaging": "Recyclable materials",
            "Usage": "Morning and evening routine",
            "Results": "Visible improvement in 2-4 weeks",
            "Origin": "Made in Egypt",
            "Certification": "Dermatologically tested",
            "Expiry": "24 months from manufacture date",
            "Warranty": "Satisfaction guarantee"
        },
        stock: 40,
        rating: 4.5,
        reviews: 89
    },
    { 
        id: 22, 
        name: "Perfume", 
        price: 1999, 
        category: "Beauty", 
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop&crop=center",
        description: "Exquisite luxury perfume crafted by master perfumers using the finest ingredients from around the world. Features a sophisticated blend of top, middle, and base notes that create a unique and memorable fragrance experience. The elegant glass bottle with gold accents reflects the premium quality of the fragrance inside. Long-lasting formula that develops beautifully throughout the day, with notes that evolve from fresh and vibrant to warm and sensual. Perfect for special occasions, date nights, or when you want to make a lasting impression. A signature scent that becomes part of your personal style and leaves a trail of elegance wherever you go.",
        specifications: {
            "Volume": "100ml (3.4 fl oz)",
            "Concentration": "Eau de Parfum (15-20% fragrance oil)",
            "Fragrance Family": "Oriental Floral",
            "Top Notes": "Bergamot, Pink pepper, Black currant",
            "Middle Notes": "Rose, Jasmine, Lily of the valley",
            "Base Notes": "Sandalwood, Vanilla, Musk",
            "Longevity": "8-12 hours",
            "Sillage": "Moderate to strong",
            "Gender": "Unisex",
            "Season": "All seasons",
            "Occasion": "Evening, special events",
            "Bottle Material": "Glass with gold accents",
            "Packaging": "Premium gift box",
            "Origin": "Made in France",
            "Alcohol Content": "80%",
            "Warranty": "Authenticity guarantee"
        },
        stock: 25,
        rating: 4.8,
        reviews: 67
    },
    { 
        id: 23, 
        name: "Makeup Kit", 
        price: 2299, 
        category: "Beauty", 
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
        description: "Complete professional makeup kit featuring all essential cosmetics and high-quality brushes for creating stunning looks. Includes foundation, concealer, eyeshadow palette with 12 versatile shades, mascara, lipstick in multiple colors, blush, and bronzer. The kit comes with professional-grade brushes including foundation brush, eyeshadow brushes, blending brush, and lip brush. All products are made with premium ingredients that provide long-lasting wear and vibrant color payoff. The compact design makes it perfect for travel, and the included mirror allows for easy application anywhere. Perfect for makeup enthusiasts, beginners learning the basics, or professionals who need a portable kit.",
        stock: 30,
        rating: 4.6,
        reviews: 112
    },
    { 
        id: 24, 
        name: "Hair Care Set", 
        price: 799, 
        category: "Beauty", 
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop&crop=center",
        description: "Premium hair care set designed to nourish, strengthen, and beautify your hair from root to tip. Includes a sulfate-free shampoo that gently cleanses without stripping natural oils, a deeply conditioning conditioner that restores moisture and shine, and a leave-in treatment that protects against heat damage and environmental stressors. Formulated with natural ingredients including argan oil, keratin, and botanical extracts. Suitable for all hair types including color-treated and damaged hair. The professional-grade formulas provide salon-quality results at home, leaving hair soft, manageable, and beautifully styled.",
        stock: 45,
        rating: 4.4,
        reviews: 56
    },
    { 
        id: 25, 
        name: "Face Mask Set", 
        price: 499, 
        category: "Beauty", 
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
        description: "Comprehensive face mask collection featuring five different treatments for various skin concerns and types. Includes a hydrating mask with hyaluronic acid for dry skin, a purifying clay mask for oily and acne-prone skin, an anti-aging mask with retinol for mature skin, a brightening mask with vitamin C for dull skin, and a soothing mask with aloe vera for sensitive skin. Each mask is individually packaged for freshness and convenience. Made with natural ingredients and free from harsh chemicals. Perfect for creating a spa-like experience at home and addressing multiple skin concerns. Ideal for skincare enthusiasts who want to customize their routine.",
        stock: 70,
        rating: 4.3,
        reviews: 78
    },

    // Additional Electronics
    { 
        id: 26, 
        name: "Gaming Mouse", 
        price: 799, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
        description: "Professional gaming mouse engineered for competitive gaming with ultra-precise optical sensor delivering up to 16,000 DPI for pixel-perfect accuracy. Features customizable RGB lighting with 16.8 million colors and multiple lighting effects. Includes 8 programmable buttons with macro support and onboard memory for custom profiles. Ergonomic design with textured grips and adjustable weight system for personalized comfort. Ultra-fast 1000Hz polling rate and 1ms response time for lag-free gaming. Durable switches rated for 50 million clicks. Perfect for FPS, MOBA, and MMO gaming with customizable software for advanced settings.",
        specifications: {
            "Sensor": "Optical sensor up to 16,000 DPI",
            "Polling Rate": "1000Hz (1ms response time)",
            "Buttons": "8 programmable buttons",
            "RGB Lighting": "16.8 million colors, multiple effects",
            "Weight": "Adjustable (80-120g)",
            "Dimensions": "126 x 66 x 40 mm",
            "Cable": "1.8m braided cable",
            "Connectivity": "USB 2.0",
            "Onboard Memory": "5 profiles",
            "Macro Support": "Yes, unlimited macros",
            "Grip Style": "Palm, claw, fingertip",
            "Switches": "50 million click rating",
            "Software": "Customizable gaming software",
            "Compatibility": "Windows 7+, macOS 10.12+",
            "Origin": "Made in Egypt",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 45,
        rating: 4.6,
        reviews: 92
    },
    { 
        id: 27, 
        name: "Mechanical Keyboard", 
        price: 1299, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop&crop=center",
        description: "High-performance mechanical keyboard featuring premium Cherry MX switches for exceptional tactile feedback and durability. Full-size layout with 104 keys including dedicated media controls and volume wheel. RGB backlighting with customizable lighting effects and per-key programming. Aircraft-grade aluminum frame provides stability and premium feel. Double-shot PBT keycaps resist wear and shine. Includes detachable USB-C cable, adjustable feet, and wrist rest for comfort. Perfect for gaming, programming, and professional typing with customizable macros and profiles. Built to last with switches rated for 50 million keystrokes.",
        specifications: {
            "Switch Type": "Cherry MX Blue (tactile, clicky)",
            "Layout": "Full-size 104 keys",
            "Backlighting": "RGB per-key lighting",
            "Frame": "Aircraft-grade aluminum",
            "Keycaps": "Double-shot PBT",
            "Cable": "Detachable USB-C cable",
            "Dimensions": "440 x 130 x 35 mm",
            "Weight": "1.2kg",
            "Key Rollover": "N-key rollover (NKRO)",
            "Media Controls": "Dedicated volume wheel and media keys",
            "Wrist Rest": "Included magnetic wrist rest",
            "Feet": "Adjustable height feet",
            "Software": "Customizable RGB and macro software",
            "Compatibility": "Windows 7+, macOS 10.12+",
            "Origin": "Made in Egypt",
            "Warranty": "2 years manufacturer warranty"
        },
        stock: 35,
        rating: 4.7,
        reviews: 118
    },
    { 
        id: 28, 
        name: "Webcam", 
        price: 999, 
        category: "Electronics", 
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=300&fit=crop&crop=center",
        description: "Professional HD webcam delivering crystal-clear 1080p video at 30fps for video calls, streaming, and content creation. Features advanced auto-focus technology that keeps you sharp even when moving, and built-in noise-canceling microphone for clear audio. Low-light correction ensures great video quality in any lighting condition. Universal clip mount fits laptops, monitors, and tripods. Plug-and-play USB connectivity works with all major video conferencing platforms. Privacy shutter protects your privacy when not in use. Perfect for remote work, online meetings, live streaming, and video content creation. Compact design that doesn't take up desk space.",
        stock: 60,
        rating: 4.4,
        reviews: 76
    },

    // Additional Fashion
    { 
        id: 29, 
        name: "Winter Jacket", 
        price: 1899, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&crop=center",
        description: "Premium winter jacket designed to keep you warm and stylish in the coldest weather. Features advanced insulation technology that traps body heat while remaining breathable. Water-resistant outer shell with sealed seams protects against rain and snow. Modern slim-fit design with adjustable hood, multiple pockets for storage, and zippered closure. Made from high-quality materials that maintain their shape and color through multiple seasons. Perfect for outdoor activities, commuting, or casual wear during winter months. Available in classic colors that complement any wardrobe. A must-have piece for anyone living in cold climates.",
        stock: 40,
        rating: 4.5,
        reviews: 67
    },
    { 
        id: 30, 
        name: "Casual Sneakers", 
        price: 1199, 
        category: "Fashion", 
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center",
        description: "Versatile casual sneakers combining comfort, style, and durability for everyday wear. Features a lightweight, breathable upper with cushioned insole for all-day comfort. The classic design with modern touches makes them perfect for any casual occasion. Durable rubber outsole provides excellent traction on various surfaces. Easy slip-on design with elastic panels for convenience. Available in multiple colors to match your personal style. Perfect for walking, light exercise, running errands, or simply looking stylish while staying comfortable. A wardrobe essential that pairs well with jeans, shorts, or casual dresses.",
        stock: 85,
        rating: 4.3,
        reviews: 143
    },

    // Additional Accessories
    { 
        id: 31, 
        name: "Wireless Charger", 
        price: 399, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop&crop=center",
        description: "Advanced wireless charging pad delivering fast, efficient charging for all Qi-enabled smartphones and devices. Features 15W fast charging capability that charges your device up to 50% faster than standard wireless chargers. Sleek, minimalist design with LED indicator light and non-slip surface to keep your device secure. Built-in safety features including overcharge protection, temperature control, and foreign object detection. Compatible with iPhone, Samsung Galaxy, and other Qi-enabled devices. Perfect for bedside tables, desks, or anywhere you need convenient charging. Eliminates the need for cables and provides a clutter-free charging solution.",
        stock: 90,
        rating: 4.2,
        reviews: 89
    },
    { 
        id: 32, 
        name: "Travel Bag", 
        price: 1499, 
        category: "Accessories", 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
        description: "Professional travel bag engineered for frequent travelers and business professionals. Features multiple organized compartments for clothes, shoes, electronics, and toiletries. TSA-approved combination locks provide security while allowing easy airport screening. Made from durable, water-resistant materials with reinforced corners and handles. Spinner wheels and telescopic handle for easy maneuverability through airports and hotels. Expandable design provides extra packing space when needed. Perfect for business trips, vacations, and weekend getaways. Includes laundry bag, shoe bag, and packing cubes for maximum organization.",
        stock: 25,
        rating: 4.6,
        reviews: 54
    },

    // Additional Home
    { 
        id: 33, 
        name: "Smart Speaker", 
        price: 1799, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&crop=center",
        description: "Advanced smart speaker featuring high-quality audio and intelligent voice control. Stream music from your favorite services, control smart home devices, get weather updates, set reminders, and answer questions using voice commands. Features premium sound with deep bass and clear highs, far-field voice recognition for hands-free control from across the room, and built-in privacy controls. Connects to your home Wi-Fi and integrates with hundreds of smart home devices. Perfect for kitchens, living rooms, or bedrooms. Includes easy setup through smartphone app and regular software updates for new features and improvements.",
        stock: 30,
        rating: 4.5,
        reviews: 98
    },
    { 
        id: 34, 
        name: "Desk Organizer", 
        price: 299, 
        category: "Home", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
        description: "Efficient desk organizer designed to maximize workspace productivity and minimize clutter. Features multiple compartments of various sizes for pens, pencils, paper clips, sticky notes, and other office supplies. Made from durable, easy-to-clean materials with a modern, minimalist design that complements any office or home workspace. Compact footprint saves valuable desk space while providing ample storage. Perfect for students, professionals, and anyone who wants to maintain an organized and efficient workspace. Helps improve focus and productivity by keeping essential items within easy reach.",
        stock: 55,
        rating: 4.1,
        reviews: 42
    },

    // Additional Beauty
    { 
        id: 35, 
        name: "Lipstick Set", 
        price: 699, 
        category: "Beauty", 
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
        description: "Curated lipstick collection featuring six carefully selected shades for every occasion and mood. Includes classic red for special events, nude for everyday wear, pink for romantic dates, coral for summer vibes, berry for autumn elegance, and plum for evening sophistication. Each lipstick features long-lasting, highly pigmented formula that glides on smoothly and stays put for hours. Moisturizing ingredients prevent dryness and keep lips soft. Perfect for building a versatile lipstick wardrobe or as a gift for makeup enthusiasts. Compact travel-friendly sizes make it easy to carry multiple shades wherever you go.",
        stock: 65,
        rating: 4.4,
        reviews: 87
    }
];

// ========================================
// USERS DATA
// ========================================

const users = [
    {
        id: 1,
        username: "admin",
        email: "admin@amnashop.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
        signupDate: "2024-01-01T00:00:00.000Z",
        permissions: ["users", "orders", "products", "analytics", "settings"],
        profile: {
            phone: "+20 100 000 0000",
            address: "Cairo, Egypt",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 2,
        username: "mohamed",
        email: "mohamed@amnashop.com",
        password: "12345",
        name: "Mohamed Ahmed",
        role: "user",
        signupDate: "2024-01-15T10:30:00.000Z",
        profile: {
            phone: "+20 101 111 1111",
            address: "Alexandria, Egypt",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 3,
        username: "ahmed",
        email: "ahmed@amnashop.com",
        password: "12345",
        name: "Ahmed Hassan",
        role: "user",
        signupDate: "2024-02-01T14:20:00.000Z",
        profile: {
            phone: "+20 102 222 2222",
            address: "Giza, Egypt",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 4,
        username: "abdallah",
        email: "abdallah@amnashop.com",
        password: "12345",
        name: "Abdallah Mohamed",
        role: "user",
        signupDate: "2024-02-10T09:15:00.000Z",
        profile: {
            phone: "+20 103 333 3333",
            address: "Luxor, Egypt",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 5,
        username: "nour",
        email: "nour@amnashop.com",
        password: "12345",
        name: "Nour Ali",
        role: "user",
        signupDate: "2024-02-20T16:45:00.000Z",
        profile: {
            phone: "+20 104 444 4444",
            address: "Aswan, Egypt",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 6,
        username: "test",
        email: "test@amnashop.com",
        password: "password123",
        name: "Test User",
        role: "user",
        signupDate: "2024-03-01T12:00:00.000Z",
        profile: {
            phone: "+20 105 555 5555",
            address: "Cairo, Egypt",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        id: 7,
        username: "demo",
        email: "demo@amnashop.com",
        password: "demo123",
        name: "Demo User",
        role: "user",
        signupDate: "2024-03-05T08:30:00.000Z",
        profile: {
            phone: "+20 106 666 6666",
            address: "Alexandria, Egypt",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
    }
];

// ========================================
// CATEGORIES DATA
// ========================================

const categories = [
    { id: 1, name: "Electronics", icon: "📱", description: "Latest electronic devices and gadgets" },
    { id: 2, name: "Fashion", icon: "👕", description: "Trendy clothing and accessories" },
    { id: 3, name: "Accessories", icon: "⌚", description: "Watches, bags, and lifestyle accessories" },
    { id: 4, name: "Home", icon: "🏠", description: "Home decoration and living essentials" },
    { id: 5, name: "Beauty", icon: "💄", description: "Beauty and personal care products" }
];

// ========================================
// ORDERS DATA (Sample)
// ========================================

const sampleOrders = [
    {
        orderId: "ORD-2024-001",
        userId: 2,
        email: "mohamed@amnashop.com",
        name: "Mohamed Ahmed",
        phone: "+20 101 111 1111",
        address: "123 Main Street, Alexandria, Egypt",
        items: [
            { id: 1, name: "Wireless Headphones", price: 1249, quantity: 1 },
            { id: 6, name: "Classic T-Shirt", price: 399, quantity: 2 }
        ],
        total: 2047,
        status: "Delivered",
        orderDate: "2024-01-20T10:30:00.000Z",
        deliveryDate: "2024-01-22T14:00:00.000Z"
    },
    {
        orderId: "ORD-2024-002",
        userId: 3,
        email: "ahmed@amnashop.com",
        name: "Ahmed Hassan",
        phone: "+20 102 222 2222",
        address: "456 Garden Avenue, Giza, Egypt",
        items: [
            { id: 2, name: "Smart Watch", price: 2999, quantity: 1 },
            { id: 11, name: "Leather Watch", price: 2499, quantity: 1 }
        ],
        total: 5498,
        status: "Confirmed",
        orderDate: "2024-02-05T15:45:00.000Z"
    },
    {
        orderId: "ORD-2024-003",
        userId: 4,
        email: "abdallah@amnashop.com",
        name: "Abdallah Mohamed",
        phone: "+20 103 333 3333",
        address: "789 Nile Street, Luxor, Egypt",
        items: [
            { id: 10, name: "Running Shoes", price: 1999, quantity: 1 },
            { id: 15, name: "Backpack", price: 1199, quantity: 1 }
        ],
        total: 3198,
        status: "Pending",
        orderDate: "2024-02-15T09:20:00.000Z"
    }
];

// ========================================
// CONTACT MESSAGES DATA (Sample)
// ========================================

const sampleContactMessages = [
    {
        id: 1,
        name: "Sarah Mohamed",
        email: "sarah@example.com",
        message: "I love the quality of products on your website! When will you have more wireless headphones in stock?",
        timestamp: "2024-02-28T10:30:00.000Z",
        read: false
    },
    {
        id: 2,
        name: "Omar Hassan",
        email: "omar@example.com",
        message: "Great customer service! My order arrived faster than expected. Thank you!",
        timestamp: "2024-02-27T16:45:00.000Z",
        read: true
    },
    {
        id: 3,
        name: "Fatma Ali",
        email: "fatma@example.com",
        message: "Do you offer international shipping? I'm interested in some of your beauty products.",
        timestamp: "2024-02-26T14:20:00.000Z",
        read: false
    }
];

// ========================================
// TEAM MEMBERS DATA
// ========================================

const teamMembers = [
    {
        id: 1,
        name: "Ahmed",
        role: "Frontend Developer",
        bio: "Passionate about creating beautiful and responsive user interfaces. Specializes in HTML, CSS, and JavaScript.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        skills: ["HTML5", "CSS3", "JavaScript", "React"],
        social: {
            linkedin: "#",
            github: "#",
            email: "ahmed@amnashop.com"
        }
    },
    {
        id: 2,
        name: "Mohamed",
        role: "Backend Developer",
        bio: "Expert in server-side development and database management. Ensures robust and scalable backend solutions.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        skills: ["Node.js", "Python", "MySQL", "MongoDB"],
        social: {
            linkedin: "#",
            github: "#",
            email: "mohamed@amnashop.com"
        }
    },
    {
        id: 3,
        name: "Abdallah",
        role: "UI/UX Designer",
        bio: "Creative designer focused on user experience and modern design principles. Creates intuitive and engaging interfaces.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
        skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
        social: {
            linkedin: "#",
            behance: "#",
            email: "abdallah@amnashop.com"
        }
    },
    {
        id: 4,
        name: "Nour",
        role: "Project Manager",
        bio: "Organized and detail-oriented project manager who ensures smooth development processes and timely delivery.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        skills: ["Agile", "Scrum", "Project Planning", "Team Coordination"],
        social: {
            linkedin: "#",
            email: "nour@amnashop.com"
        }
    }
];

// ========================================
// SERVICES DATA
// ========================================

const services = [
    {
        id: 1,
        title: "Fast Delivery",
        description: "Get your orders delivered quickly and safely to your doorstep across Egypt.",
        icon: "🚚",
        features: ["Same-day delivery in Cairo", "2-3 days nationwide", "Real-time tracking", "Secure packaging"]
    },
    {
        id: 2,
        title: "Secure Payment",
        description: "Your payment information is protected with industry-standard security measures.",
        icon: "🔒",
        features: ["SSL encryption", "Multiple payment methods", "Secure checkout", "Payment protection"]
    },
    {
        id: 3,
        title: "24/7 Support",
        description: "Our customer support team is always here to help you with any questions or concerns.",
        icon: "💬",
        features: ["Live chat support", "Email support", "Phone support", "FAQ section"]
    },
    {
        id: 4,
        title: "Quality Guarantee",
        description: "We guarantee the quality of all our products with a comprehensive return policy.",
        icon: "⭐",
        features: ["30-day return policy", "Quality inspection", "Warranty coverage", "Customer satisfaction"]
    }
];

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Get user by email
function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

// Get user by username
function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

// Get orders by user ID
function getOrdersByUserId(userId) {
    return sampleOrders.filter(order => order.userId === userId);
}

// Get unread contact messages
function getUnreadContactMessages() {
    return sampleContactMessages.filter(message => !message.read);
}

// Search products
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Get featured products (top rated)
function getFeaturedProducts(limit = 6) {
    return products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

// Get new products (recently added)
function getNewProducts(limit = 6) {
    return products
        .sort((a, b) => b.id - a.id)
        .slice(0, limit);
}

// Get products on sale (mock function)
function getSaleProducts(limit = 6) {
    return products
        .filter(product => product.id % 3 === 0) // Mock sale products
        .slice(0, limit);
}

// Calculate cart total
function calculateCartTotal(cartItems) {
    return cartItems.reduce((total, item) => {
        const product = getProductById(item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

// Format currency (Egyptian Pounds)
function formatCurrency(amount) {
    return `${amount.toFixed(2)} EGP`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        users,
        categories,
        sampleOrders,
        sampleContactMessages,
        teamMembers,
        services,
        getProductsByCategory,
        getProductById,
        getUserByEmail,
        getUserByUsername,
        getOrdersByUserId,
        getUnreadContactMessages,
        searchProducts,
        getFeaturedProducts,
        getNewProducts,
        getSaleProducts,
        calculateCartTotal,
        generateOrderId,
        formatCurrency,
        formatDate
    };
}
