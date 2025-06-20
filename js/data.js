/**
 * ShopEase - Product Data
 * This file contains all the product data used in the shopping website
 */

// Define product categories
const CATEGORIES = {
  CLOTHING: "clothing",
  ELECTRONICS: "electronics",
  JEWELRY: "jewelry",
  HOME: "home",
};

// Define product status
const PRODUCT_STATUS = {
  NEW: "new",
  SALE: "sale",
  OUT_OF_STOCK: "out_of_stock",
  BACK_ORDER: "back_order",
};

// Product data
const productsData = [
  // Clothing
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    category: CATEGORIES.CLOTHING,
    price: 24.99,
    originalPrice: 29.99,
    description:
      "A comfortable and versatile cotton t-shirt that is perfect for everyday wear. Made from 100% premium cotton for softness and durability.",
    details:
      "This classic t-shirt features a crew neck and short sleeves with a regular fit. It is made from 100% premium cotton that is soft, breathable, and comfortable for all-day wear. The fabric is pre-shrunk to maintain its shape after washing. Available in multiple colors and sizes.",
    rating: 4.5,
    reviews: 128,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 17,
    images: [],
    colors: ["black", "white", "navy", "gray", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    variations: [
      { color: "black", size: "M", stock: 15 },
      { color: "white", size: "L", stock: 20 },
      { color: "navy", size: "XL", stock: 10 },
    ],
    specifications: [
      { name: "Material", value: "100% Cotton" },
      { name: "Fit", value: "Regular Fit" },
      { name: "Care", value: "Machine Wash" },
      { name: "Neckline", value: "Crew Neck" },
      { name: "Sleeve Length", value: "Short Sleeve" },
    ],
    reviews_data: [
      {
        id: 101,
        user: "John D.",
        rating: 5,
        title: "Great quality and fit",
        comment:
          "This is the best t-shirt I have ever purchased. The quality is excellent and it fits perfectly. Highly recommend!",
        date: "2023-06-15",
      },
      {
        id: 102,
        user: "Sarah M.",
        rating: 4,
        title: "Nice but runs small",
        comment:
          "The quality is good but it runs a bit small. I would recommend sizing up for a more comfortable fit.",
        date: "2023-05-20",
      },
    ],
  },
  {
    id: 2,
    name: "Premium Denim Jeans",
    category: CATEGORIES.CLOTHING,
    price: 49.99,
    originalPrice: 69.99,
    description:
      "High-quality denim jeans with a modern fit. Made from premium materials for durability and style.",
    details:
      "These premium denim jeans feature a modern slim fit with a slight stretch for comfort. Made from high-quality denim that is durable and maintains its shape. The classic five-pocket design with a button and zip closure offers a timeless look. Perfect for casual or smart-casual occasions.",
    rating: 4.2,
    reviews: 95,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 29,
    images: [],
    colors: ["blue", "black", "gray"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    variations: [
      { color: "blue", size: "32", stock: 8 },
      { color: "black", size: "34", stock: 12 },
      { color: "gray", size: "30", stock: 5 },
    ],
    specifications: [
      { name: "Material", value: "98% Cotton, 2% Elastane" },
      { name: "Fit", value: "Slim Fit" },
      { name: "Rise", value: "Mid Rise" },
      { name: "Closure", value: "Button and Zip" },
      { name: "Care", value: "Machine Wash Cold" },
    ],
    reviews_data: [
      {
        id: 103,
        user: "Michael R.",
        rating: 5,
        title: "Perfect fit and very comfortable",
        comment:
          "These jeans fit perfectly and are very comfortable. The quality of the denim is excellent and they look great.",
        date: "2023-07-02",
      },
      {
        id: 104,
        user: "Laura K.",
        rating: 3,
        title: "Good quality but sizing is off",
        comment:
          "The jeans are good quality but the sizing is inconsistent. I had to return and get a different size.",
        date: "2023-06-18",
      },
    ],
  },
  {
    id: 3,
    name: "Casual Hooded Sweatshirt",
    category: CATEGORIES.CLOTHING,
    price: 34.99,
    originalPrice: 44.99,
    description:
      "A comfortable hooded sweatshirt perfect for casual wear or light workouts. Features a front pocket and adjustable hood.",
    details:
      "This casual hooded sweatshirt is made from a soft cotton-polyester blend that provides warmth and comfort. It features a front kangaroo pocket, adjustable drawstring hood, and ribbed cuffs and hem. The relaxed fit makes it perfect for layering or wearing on its own. Ideal for casual outings or light workouts.",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 22,
    images: [],
    colors: ["gray", "black", "navy", "burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    variations: [
      { color: "gray", size: "M", stock: 18 },
      { color: "black", size: "L", stock: 22 },
      { color: "navy", size: "XL", stock: 14 },
    ],
    specifications: [
      { name: "Material", value: "80% Cotton, 20% Polyester" },
      { name: "Fit", value: "Relaxed Fit" },
      { name: "Care", value: "Machine Wash Cold" },
      { name: "Features", value: "Kangaroo Pocket, Adjustable Hood" },
      { name: "Weight", value: "Medium Weight" },
    ],
    reviews_data: [
      {
        id: 105,
        user: "David P.",
        rating: 5,
        title: "So comfortable and warm",
        comment:
          "This is the most comfortable hoodie I have. It's warm but not too heavy and the material is super soft. Will definitely buy more.",
        date: "2023-07-10",
      },
      {
        id: 106,
        user: "Emily L.",
        rating: 4,
        title: "Great for everyday wear",
        comment:
          "Great quality hoodie that's perfect for everyday wear. The only reason I'm giving 4 stars is because the color was slightly different than pictured.",
        date: "2023-06-25",
      },
    ],
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    category: CATEGORIES.CLOTHING,
    price: 39.99,
    originalPrice: 39.99,
    description:
      "A beautiful floral print dress perfect for summer. Features a flattering silhouette and breathable fabric.",
    details:
      "This summer floral dress features a beautiful all-over print on a lightweight and breathable fabric. The A-line silhouette is flattering for all body types, while the V-neckline adds a feminine touch. The dress has a hidden zip closure at the back and falls just above the knee. Perfect for summer parties, vacations, or casual events.",
    rating: 4.8,
    reviews: 87,
    isNew: true,
    isSale: false,
    status: PRODUCT_STATUS.NEW,
    discount: 0,
    images: [],
    colors: ["blue floral", "pink floral", "yellow floral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    variations: [
      { color: "blue floral", size: "S", stock: 10 },
      { color: "pink floral", size: "M", stock: 15 },
      { color: "yellow floral", size: "L", stock: 8 },
    ],
    specifications: [
      { name: "Material", value: "100% Viscose" },
      { name: "Length", value: "Above Knee" },
      { name: "Silhouette", value: "A-Line" },
      { name: "Neckline", value: "V-Neck" },
      { name: "Closure", value: "Back Zip" },
      { name: "Care", value: "Hand Wash Cold" },
    ],
    reviews_data: [
      {
        id: 107,
        user: "Jessica M.",
        rating: 5,
        title: "Beautiful summer dress",
        comment:
          "This dress is absolutely beautiful! The fabric is lightweight and perfect for summer. The floral pattern is vibrant and exactly as pictured.",
        date: "2023-07-15",
      },
      {
        id: 108,
        user: "Rachel S.",
        rating: 5,
        title: "Perfect fit and great quality",
        comment:
          "I love this dress! The fit is perfect and the quality is great for the price. Received many compliments when wearing it.",
        date: "2023-07-05",
      },
    ],
  },

  // Electronics
  {
    id: 5,
    name: "Wireless Bluetooth Headphones",
    category: CATEGORIES.ELECTRONICS,
    price: 79.99,
    originalPrice: 99.99,
    description:
      "Premium wireless headphones with noise cancellation technology and long battery life.",
    details:
      "These premium wireless Bluetooth headphones feature active noise cancellation technology that blocks out external noise for an immersive listening experience. With up to 30 hours of battery life on a single charge, you can enjoy your music all day long. The plush ear cushions and adjustable headband provide comfort for extended use. The built-in microphone allows for hands-free calling, and the physical controls make it easy to adjust volume, skip tracks, and answer calls.",
    rating: 4.6,
    reviews: 215,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 20,
    images: [],
    colors: ["black", "silver", "blue"],
    sizes: [],
    variations: [
      { color: "black", stock: 25 },
      { color: "silver", stock: 18 },
      { color: "blue", stock: 12 },
    ],
    specifications: [
      { name: "Battery Life", value: "Up to 30 hours" },
      { name: "Bluetooth Version", value: "5.0" },
      { name: "Noise Cancellation", value: "Active" },
      { name: "Microphone", value: "Yes, Built-in" },
      { name: "Foldable Design", value: "Yes" },
      { name: "Charging Time", value: "2 hours" },
      { name: "Wireless Range", value: "Up to 10 meters (33 feet)" },
    ],
    reviews_data: [
      {
        id: 109,
        user: "James P.",
        rating: 5,
        title: "Excellent sound quality",
        comment:
          "These headphones have amazing sound quality and the noise cancellation works really well. The battery life is also impressive. Highly recommended!",
        date: "2023-07-08",
      },
      {
        id: 110,
        user: "Sophia L.",
        rating: 4,
        title: "Great but a bit heavy",
        comment:
          "The sound quality and noise cancellation are excellent, but they get a bit uncomfortable after wearing them for a few hours. Otherwise, great product.",
        date: "2023-06-30",
      },
    ],
  },
  {
    id: 6,
    name: 'Ultra HD Smart TV 55"',
    category: CATEGORIES.ELECTRONICS,
    price: 499.99,
    originalPrice: 649.99,
    description:
      "A 55-inch Ultra HD Smart TV with 4K resolution, HDR support, and built-in streaming apps.",
    details:
      "This 55-inch Ultra HD Smart TV brings entertainment to life with stunning 4K resolution and HDR support for vibrant colors and incredible detail. The slim bezel design provides a more immersive viewing experience and looks elegant in any living space. With built-in Wi-Fi and pre-installed streaming apps like Netflix, Prime Video, and YouTube, you can easily access your favorite content. The TV features multiple HDMI and USB ports for connecting gaming consoles, sound systems, and other devices.",
    rating: 4.4,
    reviews: 189,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 23,
    images: [],
    colors: ["black"],
    sizes: [],
    variations: [{ color: "black", stock: 15 }],
    specifications: [
      { name: "Screen Size", value: "55 inches" },
      { name: "Resolution", value: "3840 x 2160 (4K Ultra HD)" },
      { name: "HDR", value: "Yes" },
      { name: "Smart TV", value: "Yes" },
      { name: "Refresh Rate", value: "60Hz" },
      { name: "HDMI Ports", value: "3" },
      { name: "USB Ports", value: "2" },
      { name: "Wi-Fi", value: "Built-in" },
      { name: "Voice Control", value: "Yes" },
    ],
    reviews_data: [
      {
        id: 111,
        user: "Thomas G.",
        rating: 5,
        title: "Incredible picture quality",
        comment:
          "The picture quality on this TV is incredible. Setup was easy and the smart features work great. Very happy with this purchase.",
        date: "2023-07-12",
      },
      {
        id: 112,
        user: "Anna F.",
        rating: 4,
        title: "Great TV, but the interface is a bit slow",
        comment:
          "Picture quality is excellent and it looks great on the wall. My only complaint is that the smart interface can be a bit slow at times.",
        date: "2023-06-28",
      },
    ],
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    category: CATEGORIES.ELECTRONICS,
    price: 39.99,
    originalPrice: 59.99,
    description:
      "A compact, waterproof Bluetooth speaker with powerful sound and 12-hour battery life.",
    details:
      "This portable Bluetooth speaker delivers impressive sound in a compact, travel-friendly design. With IPX7 waterproof rating, it's perfect for pool parties or beach days. The rechargeable battery provides up to 12 hours of playtime on a single charge. The speaker features Bluetooth 5.0 for stable connection up to 100 feet, and the built-in microphone allows for hands-free calling. The rugged design is drop-resistant and the silicone exterior provides a secure grip.",
    rating: 4.7,
    reviews: 256,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 33,
    images: [],
    colors: ["black", "blue", "red", "gray"],
    sizes: [],
    variations: [
      { color: "black", stock: 30 },
      { color: "blue", stock: 22 },
      { color: "red", stock: 18 },
      { color: "gray", stock: 25 },
    ],
    specifications: [
      { name: "Battery Life", value: "Up to 12 hours" },
      { name: "Bluetooth Version", value: "5.0" },
      { name: "Waterproof Rating", value: "IPX7" },
      { name: "Power Output", value: "16W" },
      { name: "Charging Time", value: "3 hours" },
      { name: "Wireless Range", value: "Up to 30 meters (100 feet)" },
      { name: "Built-in Microphone", value: "Yes" },
      { name: "Dimensions", value: "7.2 x 2.8 x 2.8 inches" },
    ],
    reviews_data: [
      {
        id: 113,
        user: "Daniel M.",
        rating: 5,
        title: "Impressive sound for the size",
        comment:
          "I'm amazed at how good this little speaker sounds. The bass is impressive for the size and the volume gets quite loud. Battery life is great too!",
        date: "2023-07-14",
      },
      {
        id: 114,
        user: "Olivia K.",
        rating: 5,
        title: "Perfect for outdoor adventures",
        comment:
          "I've taken this speaker hiking and to the beach. It's durable, waterproof, and has great sound. Definitely worth the money!",
        date: "2023-07-01",
      },
    ],
  },
  {
    id: 8,
    name: "Smartphone Powerbank 20000mAh",
    category: CATEGORIES.ELECTRONICS,
    price: 29.99,
    originalPrice: 39.99,
    description:
      "High-capacity 20000mAh power bank with fast charging and multiple ports for all your devices.",
    details:
      "This high-capacity 20000mAh power bank can charge your smartphone multiple times on a single charge. It features fast charging technology to power up your devices quickly and efficiently. With multiple USB ports and a USB-C port, you can charge several devices simultaneously. The LED display shows the remaining battery percentage, so you always know when it's time to recharge. The compact and slim design makes it easy to carry in your bag or pocket.",
    rating: 4.5,
    reviews: 312,
    isNew: true,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 25,
    images: [],
    colors: ["black", "white", "blue"],
    sizes: [],
    variations: [
      { color: "black", stock: 35 },
      { color: "white", stock: 28 },
      { color: "blue", stock: 20 },
    ],
    specifications: [
      { name: "Capacity", value: "20000mAh" },
      { name: "Input Ports", value: "Micro USB, USB-C" },
      { name: "Output Ports", value: "2 x USB-A, 1 x USB-C" },
      { name: "Fast Charging", value: "Yes" },
      { name: "Display", value: "LED Digital Display" },
      { name: "Charging Time", value: "4-6 hours" },
      { name: "Dimensions", value: "6.0 x 2.8 x 0.8 inches" },
      { name: "Weight", value: "12.4 oz" },
    ],
    reviews_data: [
      {
        id: 115,
        user: "Ryan T.",
        rating: 5,
        title: "A must-have for travelers",
        comment:
          "This power bank has been a lifesaver during my travels. It can charge my phone multiple times and the fast charging is really convenient. The digital display is also very helpful.",
        date: "2023-07-16",
      },
      {
        id: 116,
        user: "Natalie P.",
        rating: 4,
        title: "Great capacity but a bit heavy",
        comment:
          "This power bank has amazing capacity and charges my devices quickly. The only downside is that it's a bit heavy to carry around all day.",
        date: "2023-06-22",
      },
    ],
  },

  // Jewelry
  {
    id: 9,
    name: "Sterling Silver Necklace",
    category: CATEGORIES.JEWELRY,
    price: 79.99,
    originalPrice: 99.99,
    description:
      "Elegant sterling silver necklace with a pendant, perfect for everyday wear or special occasions.",
    details:
      "This beautiful sterling silver necklace features a delicate pendant that catches the light beautifully. The chain is adjustable from 16 to 18 inches, allowing you to wear it at your preferred length. The high-quality 925 sterling silver is hypoallergenic and tarnish-resistant for lasting beauty. The pendant is adorned with cubic zirconia stones that sparkle like real diamonds. This versatile piece can be worn with casual or formal outfits and makes a perfect gift.",
    rating: 4.8,
    reviews: 154,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 20,
    images: [],
    colors: ["silver"],
    sizes: [],
    variations: [{ color: "silver", stock: 22 }],
    specifications: [
      { name: "Material", value: "925 Sterling Silver" },
      { name: "Chain Length", value: "Adjustable 16-18 inches" },
      { name: "Pendant Size", value: "0.6 inches" },
      { name: "Stones", value: "Cubic Zirconia" },
      { name: "Clasp Type", value: "Lobster Clasp" },
      { name: "Weight", value: "3.5g" },
      { name: "Hypoallergenic", value: "Yes" },
    ],
    reviews_data: [
      {
        id: 117,
        user: "Jennifer L.",
        rating: 5,
        title: "Beautiful and elegant",
        comment:
          "This necklace is absolutely beautiful! It's delicate but well-made and the pendant catches the light perfectly. I wear it almost every day.",
        date: "2023-07-09",
      },
      {
        id: 118,
        user: "Maria S.",
        rating: 5,
        title: "Perfect gift",
        comment:
          "I bought this as a gift for my sister and she loves it. The quality is excellent for the price and it comes in a nice gift box.",
        date: "2023-06-28",
      },
    ],
  },
  {
    id: 10,
    name: "Men's Stainless Steel Watch",
    category: CATEGORIES.JEWELRY,
    price: 129.99,
    originalPrice: 159.99,
    description:
      "Sophisticated stainless steel watch with analog display, water resistance, and premium design.",
    details:
      "This sophisticated men's stainless steel watch combines classic style with modern functionality. The sleek stainless steel case and band give it a premium look, while the high-quality quartz movement ensures accurate timekeeping. The watch features an analog display with luminous hands for visibility in low light. With 30m water resistance, it can withstand splashes and brief immersion in water. The scratch-resistant mineral crystal face keeps it looking new, and the date display adds practical functionality.",
    rating: 4.5,
    reviews: 187,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 19,
    images: [],
    colors: ["silver", "gold", "black"],
    sizes: [],
    variations: [
      { color: "silver", stock: 18 },
      { color: "gold", stock: 12 },
      { color: "black", stock: 15 },
    ],
    specifications: [
      { name: "Case Material", value: "Stainless Steel" },
      { name: "Band Material", value: "Stainless Steel" },
      { name: "Movement Type", value: "Quartz" },
      { name: "Case Diameter", value: "42mm" },
      { name: "Band Width", value: "20mm" },
      { name: "Water Resistance", value: "30m (3 ATM)" },
      { name: "Features", value: "Date Display, Luminous Hands" },
      { name: "Crystal Type", value: "Mineral Crystal" },
    ],
    reviews_data: [
      {
        id: 119,
        user: "Robert J.",
        rating: 5,
        title: "Excellent watch for the price",
        comment:
          "This watch looks much more expensive than it is. The quality is excellent and it keeps perfect time. Very satisfied with this purchase.",
        date: "2023-07-11",
      },
      {
        id: 120,
        user: "Christopher N.",
        rating: 4,
        title: "Good quality, slight issue with clasp",
        comment:
          "The watch itself is beautiful and well-made. The only minor issue is that the clasp feels a bit flimsy, but otherwise it's perfect.",
        date: "2023-06-25",
      },
    ],
  },
  {
    id: 11,
    name: "Rose Gold Diamond Ring",
    category: CATEGORIES.JEWELRY,
    price: 599.99,
    originalPrice: 799.99,
    description:
      "Elegant rose gold ring with a central diamond surrounded by smaller diamonds for extra sparkle.",
    details:
      "This stunning rose gold ring features a beautiful central diamond surrounded by a halo of smaller diamonds for maximum sparkle. The band is crafted from 14K rose gold, which has a warm, romantic hue that complements all skin tones. The central diamond is 0.5 carats with excellent cut and clarity, while the surrounding diamonds add an additional 0.25 carats. This ring makes a perfect engagement ring, anniversary gift, or a special treat for yourself.",
    rating: 4.9,
    reviews: 78,
    isNew: true,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 25,
    images: [],
    colors: ["rose gold"],
    sizes: ["5", "6", "7", "8", "9"],
    variations: [
      { color: "rose gold", size: "6", stock: 5 },
      { color: "rose gold", size: "7", stock: 7 },
      { color: "rose gold", size: "8", stock: 3 },
    ],
    specifications: [
      { name: "Metal", value: "14K Rose Gold" },
      { name: "Center Stone", value: "0.5 Carat Diamond" },
      { name: "Accent Stones", value: "0.25 Carat Total Weight" },
      { name: "Diamond Cut", value: "Round Brilliant" },
      { name: "Diamond Clarity", value: "VS1-VS2" },
      { name: "Diamond Color", value: "H-I" },
      { name: "Band Width", value: "2mm" },
      { name: "Certification", value: "GIA Certified" },
    ],
    reviews_data: [
      {
        id: 121,
        user: "William B.",
        rating: 5,
        title: "She said yes!",
        comment:
          "I proposed with this ring and she absolutely loved it! The quality of the diamonds is outstanding and the rose gold is beautiful. Worth every penny.",
        date: "2023-07-14",
      },
      {
        id: 122,
        user: "Samantha D.",
        rating: 5,
        title: "Even more beautiful in person",
        comment:
          "This ring is breathtaking in person. The diamonds catch the light from every angle and the rose gold is a perfect shade. I couldn't be happier!",
        date: "2023-07-02",
      },
    ],
  },
  {
    id: 12,
    name: "Pearl Earrings Set",
    category: CATEGORIES.JEWELRY,
    price: 89.99,
    originalPrice: 109.99,
    description:
      "Elegant freshwater pearl earrings set in sterling silver, perfect for both everyday wear and special occasions.",
    details:
      "This beautiful earrings set features genuine freshwater pearls set in sterling silver for a timeless, elegant look. The pearls measure 8-9mm in diameter and have a natural, luminous white color with excellent luster. The sterling silver settings are hypoallergenic and secure, with push-back closures for comfort. These versatile earrings can be worn with casual or formal outfits and make a perfect gift for anniversaries, birthdays, or weddings.",
    rating: 4.7,
    reviews: 126,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 18,
    images: [],
    colors: ["white pearl", "pink pearl"],
    sizes: [],
    variations: [
      { color: "white pearl", stock: 20 },
      { color: "pink pearl", stock: 15 },
    ],
    specifications: [
      { name: "Pearl Type", value: "Freshwater Cultured Pearl" },
      { name: "Pearl Size", value: "8-9mm" },
      { name: "Pearl Color", value: "White or Pink" },
      { name: "Metal", value: "925 Sterling Silver" },
      { name: "Closure Type", value: "Push Back" },
      { name: "Hypoallergenic", value: "Yes" },
      { name: "Pearl Shape", value: "Round" },
    ],
    reviews_data: [
      {
        id: 123,
        user: "Elizabeth C.",
        rating: 5,
        title: "Beautiful and classic",
        comment:
          "These pearl earrings are gorgeous! The pearls have a beautiful luster and the setting is simple and elegant. They go with everything in my wardrobe.",
        date: "2023-07-07",
      },
      {
        id: 124,
        user: "Patricia M.",
        rating: 4,
        title: "Lovely but slightly smaller than expected",
        comment:
          "These earrings are beautiful and well-made. The only reason I'm giving 4 stars is that the pearls are a bit smaller than I expected, but they're still lovely.",
        date: "2023-06-19",
      },
    ],
  },

  // Home & Decor
  {
    id: 13,
    name: "Luxury Bedding Set",
    category: CATEGORIES.HOME,
    price: 89.99,
    originalPrice: 129.99,
    description:
      "Premium cotton bedding set including duvet cover, fitted sheet, and pillowcases with elegant design.",
    details:
      "This luxury bedding set is crafted from 100% Egyptian cotton with a high thread count for exceptional softness and durability. The set includes a duvet cover with button closure, a fitted sheet with deep pockets to fit mattresses up to 18 inches thick, and two pillowcases. The elegant design features a subtle pattern that adds sophistication to any bedroom decor. The fabric is OEKO-TEX certified, ensuring it's free from harmful substances. Machine washable for easy care.",
    rating: 4.6,
    reviews: 205,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 31,
    images: [],
    colors: ["white", "gray", "navy", "sage"],
    sizes: ["Twin", "Full", "Queen", "King"],
    variations: [
      { color: "white", size: "Queen", stock: 18 },
      { color: "gray", size: "King", stock: 12 },
      { color: "navy", size: "Queen", stock: 15 },
    ],
    specifications: [
      { name: "Material", value: "100% Egyptian Cotton" },
      { name: "Thread Count", value: "600" },
      {
        name: "Includes",
        value: "1 Duvet Cover, 1 Fitted Sheet, 2 Pillowcases",
      },
      { name: "Fitted Sheet Pocket Depth", value: "18 inches" },
      { name: "Care", value: "Machine Wash Cold, Tumble Dry Low" },
      { name: "Certifications", value: "OEKO-TEX Standard 100" },
    ],
    reviews_data: [
      {
        id: 125,
        user: "Karen L.",
        rating: 5,
        title: "Luxurious and comfortable",
        comment:
          "This bedding set is absolutely worth every penny. The cotton is so soft and comfortable, and the quality is excellent. I'm sleeping better than ever!",
        date: "2023-07-08",
      },
      {
        id: 126,
        user: "Brian M.",
        rating: 4,
        title: "Great quality but wrinkles easily",
        comment:
          "The quality of this bedding set is excellent and it's very comfortable. The only downside is that it wrinkles quite easily after washing, but that's typical with cotton.",
        date: "2023-06-22",
      },
    ],
  },
  {
    id: 14,
    name: "Modern Table Lamp",
    category: CATEGORIES.HOME,
    price: 49.99,
    originalPrice: 69.99,
    description:
      "Stylish modern table lamp with adjustable brightness, perfect for bedrooms, living rooms, or offices.",
    details:
      "This stylish modern table lamp adds both illumination and aesthetic appeal to any space. The sleek design features a metal base with a fabric shade that diffuses light for a warm, inviting glow. The lamp has a touch control with three brightness levels, allowing you to adjust the lighting to your needs. The compact size makes it perfect for bedside tables, desks, or side tables. The lamp uses standard E26 bulbs (not included) and is compatible with LED, CFL, or incandescent bulbs.",
    rating: 4.5,
    reviews: 168,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 29,
    images: [],
    colors: ["black", "white", "brass"],
    sizes: [],
    variations: [
      { color: "black", stock: 22 },
      { color: "white", stock: 18 },
      { color: "brass", stock: 15 },
    ],
    specifications: [
      { name: "Dimensions", value: '12" x 12" x 18" (L x W x H)' },
      { name: "Base Material", value: "Metal" },
      { name: "Shade Material", value: "Fabric" },
      { name: "Bulb Type", value: "E26 (not included)" },
      { name: "Max Wattage", value: "60W" },
      { name: "Control Type", value: "Touch Control with 3 Brightness Levels" },
      { name: "Cord Length", value: "6 feet" },
    ],
    reviews_data: [
      {
        id: 127,
        user: "Michelle P.",
        rating: 5,
        title: "Beautiful lamp and great quality",
        comment:
          "This lamp looks much more expensive than it is. The touch control is very convenient and the three brightness levels are perfect for different needs throughout the day.",
        date: "2023-07-10",
      },
      {
        id: 128,
        user: "Jason K.",
        rating: 4,
        title: "Nice lamp but shade is a bit thin",
        comment:
          "The lamp looks great and works well. My only complaint is that the shade is thinner than I expected, so the light is a bit brighter than I would prefer at the lowest setting.",
        date: "2023-06-28",
      },
    ],
  },
  {
    id: 15,
    name: "Aromatic Scented Candle Set",
    category: CATEGORIES.HOME,
    price: 34.99,
    originalPrice: 44.99,
    description:
      "Set of 3 premium scented candles in elegant glass jars, perfect for creating a relaxing atmosphere.",
    details:
      "This aromatic scented candle set includes three premium candles in elegant glass jars with wooden lids. Each candle is made from 100% natural soy wax with lead-free cotton wicks for a clean, long-lasting burn. The set includes three complementary scents: Vanilla & Cedar, Fresh Linen, and Lavender & Sage. Each candle burns for approximately 40-45 hours, allowing you to enjoy the soothing fragrances for many evenings. The stylish design makes these candles a perfect addition to your home decor or an ideal gift.",
    rating: 4.8,
    reviews: 232,
    isNew: true,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 22,
    images: [],
    colors: [],
    sizes: [],
    variations: [{ stock: 30 }],
    specifications: [
      { name: "Candle Material", value: "100% Natural Soy Wax" },
      { name: "Wick Type", value: "Lead-free Cotton" },
      { name: "Burn Time", value: "40-45 hours per candle" },
      {
        name: "Scents",
        value: "Vanilla & Cedar, Fresh Linen, Lavender & Sage",
      },
      { name: "Container", value: "Glass Jar with Wooden Lid" },
      { name: "Candle Size", value: '3.5" x 3.5" x 4" each' },
      { name: "Total Weight", value: "12 oz per candle" },
    ],
    reviews_data: [
      {
        id: 129,
        user: "Amanda R.",
        rating: 5,
        title: "Absolutely heavenly scents",
        comment:
          "These candles smell amazing! The scents are natural and not overpowering. The jars are beautiful and look great in my living room. Will definitely buy again!",
        date: "2023-07-15",
      },
      {
        id: 130,
        user: "Tyler S.",
        rating: 5,
        title: "Perfect gift set",
        comment:
          "I bought this as a housewarming gift and the recipients loved it. The packaging is elegant and the candles smell wonderful. Great quality for the price.",
        date: "2023-07-03",
      },
    ],
  },
  {
    id: 16,
    name: "Decorative Throw Pillow Covers",
    category: CATEGORIES.HOME,
    price: 24.99,
    originalPrice: 34.99,
    description:
      "Set of 4 decorative throw pillow covers in various patterns, perfect for refreshing your home decor.",
    details:
      'This set of 4 decorative throw pillow covers is an easy and affordable way to refresh your home decor. Each cover features a different complementary pattern or texture, allowing you to mix and match for a designer look. Made from high-quality, durable fabric with hidden zipper closures for a clean finish. The covers fit standard 18" x 18" pillow inserts (not included) and are machine washable for easy care. Perfect for sofas, chairs, beds, or outdoor seating areas.',
    rating: 4.6,
    reviews: 187,
    isNew: false,
    isSale: true,
    status: PRODUCT_STATUS.SALE,
    discount: 29,
    images: [],
    colors: ["blue set", "neutral set", "green set"],
    sizes: [],
    variations: [
      { color: "blue set", stock: 25 },
      { color: "neutral set", stock: 20 },
      { color: "green set", stock: 18 },
    ],
    specifications: [
      { name: "Material", value: "55% Linen, 45% Cotton" },
      { name: "Size", value: '18" x 18" (fits standard pillow inserts)' },
      { name: "Closure Type", value: "Hidden Zipper" },
      { name: "Includes", value: "4 Pillow Covers (inserts not included)" },
      { name: "Care", value: "Machine Wash Cold, Tumble Dry Low" },
      { name: "Pattern", value: "Various Complementary Designs" },
    ],
    reviews_data: [
      {
        id: 131,
        user: "Lindsey C.",
        rating: 5,
        title: "Beautiful quality and patterns",
        comment:
          "These pillow covers are excellent quality and the patterns are beautiful together. They completely transformed my living room and I've received many compliments on them.",
        date: "2023-07-12",
      },
      {
        id: 132,
        user: "Mark P.",
        rating: 4,
        title: "Nice covers but colors slightly different",
        comment:
          "The quality of these covers is great and they look nice. However, the colors are slightly different from what was shown in the pictures. Still happy with the purchase overall.",
        date: "2023-06-30",
      },
    ],
  },
];

// Save products to localStorage
if (typeof window !== "undefined") {
  // Check if products already exist in localStorage
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(productsData));
  }
}

// Function to get all products
function getAllProducts() {
  if (typeof window !== "undefined") {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : productsData;
  }
  return productsData;
}

// Function to get product by ID
function getProductById(id) {
  const products = getAllProducts();
  return products.find((product) => product.id === parseInt(id));
}

// Function to get products by category
function getProductsByCategory(category) {
  const products = getAllProducts();
  return category === "all"
    ? products
    : products.filter((product) => product.category === category);
}

// Function to get featured products
function getFeaturedProducts(limit = 8) {
  const products = getAllProducts();
  // Get a mix of new and sale products
  const featured = products.filter(
    (product) => product.isNew || product.isSale
  );
  // Shuffle and limit
  return shuffleArray(featured).slice(0, limit);
}

// Function to get on sale products
function getOnSaleProducts(limit = 8) {
  const products = getAllProducts();
  const onSale = products.filter((product) => product.isSale);
  return shuffleArray(onSale).slice(0, limit);
}

// Function to get new arrivals
function getNewArrivals(limit = 8) {
  const products = getAllProducts();
  const newArrivals = products.filter((product) => product.isNew);
  return shuffleArray(newArrivals).slice(0, limit);
}

// Function to search products
function searchProducts(query) {
  if (!query) return [];

  const products = getAllProducts();
  query = query.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );
}

// Helper function to shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to filter products
function filterProducts(filters) {
  let products = getAllProducts();

  // Filter by category
  if (
    filters.categories &&
    filters.categories.length > 0 &&
    !filters.categories.includes("all")
  ) {
    products = products.filter((product) =>
      filters.categories.includes(product.category)
    );
  }

  // Filter by price range
  if (filters.minPrice !== undefined && filters.minPrice !== null) {
    products = products.filter((product) => product.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
    products = products.filter((product) => product.price <= filters.maxPrice);
  }

  // Filter by rating
  if (filters.rating) {
    products = products.filter((product) => product.rating >= filters.rating);
  }

  // Filter by sale items
  if (filters.onSale) {
    products = products.filter((product) => product.isSale);
  }

  // Filter by new items
  if (filters.isNew) {
    products = products.filter((product) => product.isNew);
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        products.sort((a, b) => b.isNew - a.isNew);
        break;
      case "featured":
      default:
        // Mix of new and featured products first
        products.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        });
        break;
    }
  }

  return products;
}

// Function to get related products
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];

  const products = getAllProducts();

  // Get products in the same category
  let related = products.filter(
    (p) => p.id !== parseInt(productId) && p.category === product.category
  );

  // If we don't have enough related products, add some random ones
  if (related.length < limit) {
    const others = products.filter(
      (p) => p.id !== parseInt(productId) && p.category !== product.category
    );
    related = [
      ...related,
      ...shuffleArray(others).slice(0, limit - related.length),
    ];
  }

  return shuffleArray(related).slice(0, limit);
}

// Export functions if in a module environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getOnSaleProducts,
    getNewArrivals,
    searchProducts,
    filterProducts,
    getRelatedProducts,
  };
}
