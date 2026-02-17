import mongoose from "mongoose";
import { ProductModel } from "./models/product.model";
import { CategoryModel } from "./models/category.model";
import * as dotenv from "dotenv";
import path from "path";

// ✅ Load .env from backend root
dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

const categories = [
  {
    name: "Lights, Diyas & Candles",
    image: "image 50.png",
    description: "Festive lighting, diyas and scented candles"
  },
  {
    name: "Diwali Gifts",
    image: "image 51.png",
    description: "Perfect gifts for Diwali celebrations"
  },
  {
    name: "Appliances & Gadgets",
    image: "image 52.png",
    description: "Home appliances and smart gadgets"
  },
  {
    name: "Home & Living",
    image: "image 39.png",
    description: "Beautiful home decor and living essentials"
  },
  {
    name: "Vegetables & Fruits",
    image: "image 41.png",
    description: "Fresh farm vegetables and fruits"
  },
  {
    name: "Atta, Dal & Rice",
    image: "image 42.png",
    description: "Daily staples - atta, dal and rice"
  },
  {
    name: "Oil, Ghee & Masala",
    image: "image 43.png",
    description: "Cooking oils, ghee and Indian spices"
  },
  {
    name: "Dairy, Bread & Milk",
    image: "image 44 (1).png",
    description: "Fresh dairy products, bread and milk"
  },
];

const products = [
  // ── Lights, Diyas & Candles ──────────────────────────────
  {
    name: "Golden Glass Wooden Lid Candle",
    description: "Premium scented candle with golden glass and wooden lid. Perfect for festive decoration.",
    price: 79,
    image: "image 54.png",
    category: "Lights, Diyas & Candles",
    stock: 50,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Premium Scented Candle",
    description: "Luxury scented candle with long burning time and soothing fragrance.",
    price: 99,
    image: "image 63.png",
    category: "Lights, Diyas & Candles",
    stock: 45,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Decorative Diya Set",
    description: "Beautiful handcrafted diya set for Diwali celebrations. Pack of 12.",
    price: 149,
    image: "image 50.png",
    category: "Lights, Diyas & Candles",
    stock: 80,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Festive String Lights",
    description: "Colorful LED string lights for festive decoration. 10 meters long.",
    price: 199,
    image: "image 55.png",
    category: "Lights, Diyas & Candles",
    stock: 60,
    deliveryTime: "16",
    isActive: true,
  },

  // ── Diwali Gifts ─────────────────────────────────────────
  {
    name: "Royal Gulab Jamun By Bikano",
    description: "Authentic traditional Indian sweets. Perfect Diwali gift for family and friends.",
    price: 149,
    image: "image 57.png",
    category: "Diwali Gifts",
    stock: 30,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Diwali Special Gift Box",
    description: "Premium Diwali gift box with assorted sweets and dry fruits.",
    price: 499,
    image: "image 51.png",
    category: "Diwali Gifts",
    stock: 25,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Premium Dry Fruits Box",
    description: "Assorted premium dry fruits - cashews, almonds, pistachios and raisins.",
    price: 349,
    image: "image 60.png",
    category: "Diwali Gifts",
    stock: 40,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Festive Sweet Hamper",
    description: "Deluxe festive hamper with traditional sweets, chocolates and namkeen.",
    price: 699,
    image: "image 61.png",
    category: "Diwali Gifts",
    stock: 20,
    deliveryTime: "20",
    isActive: true,
  },

  // ── Home & Living ─────────────────────────────────────────
  {
    name: "Decorative Items Set",
    description: "Beautiful home decorative set. Includes vase, candle holder and decorative pieces.",
    price: 199,
    image: "image 33.png",
    category: "Home & Living",
    stock: 25,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Premium Cushion Covers Set",
    description: "Set of 5 premium cushion covers with beautiful embroidery design.",
    price: 299,
    image: "image 39.png",
    category: "Home & Living",
    stock: 40,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Ceramic Flower Vase",
    description: "Elegant ceramic flower vase for modern home decor.",
    price: 249,
    image: "image 34.png",
    category: "Home & Living",
    stock: 30,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Wooden Wall Frame Set",
    description: "Set of 3 rustic wooden photo frames for your living room wall.",
    price: 399,
    image: "image 35.png",
    category: "Home & Living",
    stock: 20,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Scented Room Diffuser",
    description: "Aromatic room diffuser with natural essential oils. Lasts 30 days.",
    price: 299,
    image: "image 36.png",
    category: "Home & Living",
    stock: 35,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Decorative Table Runner",
    description: "Premium fabric table runner with traditional Indian embroidery.",
    price: 179,
    image: "image 37.png",
    category: "Home & Living",
    stock: 50,
    deliveryTime: "20",
    isActive: true,
  },
  {
    name: "Handcrafted Basket Set",
    description: "Set of 3 handwoven storage baskets. Perfect for kitchen and bedroom.",
    price: 349,
    image: "image 38.png",
    category: "Home & Living",
    stock: 25,
    deliveryTime: "20",
    isActive: true,
  },

  // ── Vegetables & Fruits ───────────────────────────────────
  {
    name: "Fresh Vegetables Pack",
    description: "Farm fresh seasonal vegetables pack. Includes tomatoes, onions, potatoes and more.",
    price: 129,
    image: "image 41.png",
    category: "Vegetables & Fruits",
    stock: 100,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Fresh Fruit Basket",
    description: "Assorted seasonal fresh fruits. Includes apples, bananas, oranges and grapes.",
    price: 249,
    image: "image 41.png",
    category: "Vegetables & Fruits",
    stock: 60,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Fresh Tomatoes 1kg",
    description: "Farm fresh red ripe tomatoes. Perfect for cooking and salads.",
    price: 39,
    image: "tomato.png",
    category: "Vegetables & Fruits",
    stock: 150,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Fresh Potatoes 2kg",
    description: "Clean and fresh potatoes. Best quality from local farms.",
    price: 49,
    image: "potato.png",
    category: "Vegetables & Fruits",
    stock: 200,
    deliveryTime: "16",
    isActive: true,
  },

  // ── Atta, Dal & Rice ──────────────────────────────────────
  {
    name: "Premium Basmati Rice 5kg",
    description: "Long grain premium basmati rice. Aged for perfect aroma and taste.",
    price: 299,
    image: "image 42.png",
    category: "Atta, Dal & Rice",
    stock: 60,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Whole Wheat Atta 10kg",
    description: "100% whole wheat flour. Stone ground for better nutrition and taste.",
    price: 399,
    image: "image 42.png",
    category: "Atta, Dal & Rice",
    stock: 75,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Mixed Dal Pack 2kg",
    description: "Premium quality mixed dal pack including toor, moong and chana dal.",
    price: 189,
    image: "image 42.png",
    category: "Atta, Dal & Rice",
    stock: 90,
    deliveryTime: "16",
    isActive: true,
  },

  // ── Oil, Ghee & Masala ────────────────────────────────────
  {
    name: "Pure Desi Ghee 500ml",
    description: "Pure cow ghee made from fresh cream. Rich aroma and authentic taste.",
    price: 349,
    image: "image 43.png",
    category: "Oil, Ghee & Masala",
    stock: 55,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Sunflower Cooking Oil 1L",
    description: "100% pure sunflower oil. Light and healthy for everyday cooking.",
    price: 149,
    image: "image 43.png",
    category: "Oil, Ghee & Masala",
    stock: 80,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Kitchen King Masala 200g",
    description: "Aromatic blend of premium Indian spices. Perfect for curries and gravies.",
    price: 89,
    image: "image 43.png",
    category: "Oil, Ghee & Masala",
    stock: 120,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Garam Masala Powder 100g",
    description: "Freshly ground garam masala. Rich blend of whole spices for authentic flavour.",
    price: 69,
    image: "image 40.png",
    category: "Oil, Ghee & Masala",
    stock: 100,
    deliveryTime: "16",
    isActive: true,
  },

  // ── Dairy, Bread & Milk ───────────────────────────────────
  {
    name: "Fresh Full Cream Milk 1L",
    description: "Fresh full cream milk. Rich in protein and calcium. Delivered fresh daily.",
    price: 60,
    image: "milk.png",
    category: "Dairy, Bread & Milk",
    stock: 200,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Whole Wheat Bread Loaf",
    description: "Freshly baked whole wheat bread. Soft texture with no preservatives.",
    price: 45,
    image: "image 44 (1).png",
    category: "Dairy, Bread & Milk",
    stock: 150,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Fresh Paneer 200g",
    description: "Soft and fresh homestyle paneer. Made from pure cow milk.",
    price: 89,
    image: "image 44 (1).png",
    category: "Dairy, Bread & Milk",
    stock: 100,
    deliveryTime: "16",
    isActive: true,
  },
  {
    name: "Greek Yogurt 400g",
    description: "Thick and creamy Greek yogurt. High protein, low fat. No added sugar.",
    price: 79,
    image: "image 44 (1).png",
    category: "Dairy, Bread & Milk",
    stock: 80,
    deliveryTime: "16",
    isActive: true,
  },

  // ── Appliances & Gadgets ──────────────────────────────────
  {
    name: "Smart LED Bulb Pack",
    description: "Energy efficient smart LED bulbs. Pack of 4. Compatible with voice assistants.",
    price: 599,
    image: "image 52.png",
    category: "Appliances & Gadgets",
    stock: 35,
    deliveryTime: "30",
    isActive: true,
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact wireless speaker with 10 hour battery life and deep bass.",
    price: 899,
    image: "image 52.png",
    category: "Appliances & Gadgets",
    stock: 20,
    deliveryTime: "30",
    isActive: true,
  },
  {
    name: "Digital Kitchen Scale",
    description: "Precise digital kitchen scale. Measures up to 5kg with 1g accuracy.",
    price: 449,
    image: "image 31.png",
    category: "Appliances & Gadgets",
    stock: 30,
    deliveryTime: "30",
    isActive: true,
  },
  {
    name: "Electric Kettle 1.5L",
    description: "Fast boiling electric kettle with auto shut-off and boil-dry protection.",
    price: 699,
    image: "image 32.png",
    category: "Appliances & Gadgets",
    stock: 25,
    deliveryTime: "30",
    isActive: true,
  },
  {
    name: "Air Purifier Mini",
    description: "Compact HEPA air purifier. Removes 99.97% of airborne particles.",
    price: 1999,
    image: "image 53.png",
    category: "Appliances & Gadgets",
    stock: 15,
    deliveryTime: "30",
    isActive: true,
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad. Compatible with all Qi-enabled devices.",
    price: 799,
    image: "image 45 (1).png",
    category: "Appliances & Gadgets",
    stock: 40,
    deliveryTime: "30",
    isActive: true,
  },
];
async function seed() {
  try {
    console.log("🔄 Connecting to MongoDB Atlas...");
    console.log("📡 URI:", MONGO_URI.substring(0, 40) + "...");

    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas!");

    // ✅ Clear existing
    console.log("\n🗑️  Clearing existing data...");
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    console.log("✅ Cleared existing categories and products");

    // ✅ Insert Categories
    console.log("\n📦 Inserting categories...");
    const insertedCategories = await CategoryModel.insertMany(categories);
    console.log(`✅ Inserted ${insertedCategories.length} categories:`);
    insertedCategories.forEach(c => console.log(`   - ${c.name}`));

    //  Insert Products
    console.log("\n  Inserting products...");
    const insertedProducts = await ProductModel.insertMany(products);
    console.log(` Inserted ${insertedProducts.length} products:`);
    insertedProducts.forEach(p => console.log(`   - ${p.name} (${p.category}) ₹${p.price}`));

    console.log("\n ========================");
    console.log("   SEED COMPLETED!");
    console.log("========================");
    console.log(`Categories: ${insertedCategories.length}`);
    console.log(`Products:   ${insertedProducts.length}`);
    console.log("========================\n");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Seed failed:", error.message);
    if (error.message.includes("MONGO_URI")) {
      console.error("💡 Make sure your .env file has MONGO_URI set correctly");
    }
    process.exit(1);
  }
}

seed();