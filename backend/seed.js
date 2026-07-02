
require("dotenv").config();
const connectDB = require("./config/db");
const Product = require("./models/Product");
const Customer = require("./models/Customer");
const Order = require("./models/Order");

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear old data
    await Product.deleteMany();
    await Customer.deleteMany();
    await Order.deleteMany();
    console.log("Old data cleared.");

    // Insert sample products
    const products = await Product.insertMany([
      {
        productName: "Emerald Silk Evening Gown",
        category: "Women's Dresses",
        price: 8999,
        description: "Luxurious emerald silk gown, perfect for formal evening events.",
        sizes: ["S", "M", "L"],
        colors: ["Emerald Green"],
        stock: 12,
        discount: 10,
        rating: 4.7,
      },
      {
        productName: "Floral Print Summer Dress",
        category: "Women's Dresses",
        price: 3499,
        description: "Lightweight floral summer dress with a relaxed fit.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink", "Yellow"],
        stock: 25,
        discount: 5,
        rating: 4.3,
      },
      {
        productName: "Charcoal Slim Fit Blazer",
        category: "Men's Formal Wear",
        price: 7499,
        description: "Tailored charcoal blazer for formal and business occasions.",
        sizes: ["M", "L", "XL"],
        colors: ["Charcoal Grey"],
        stock: 18,
        rating: 4.5,
      },
      {
        productName: "Navy Blue Denim Jacket",
        category: "Men's Jackets",
        price: 4999,
        description: "Classic navy denim jacket with a modern trim fit.",
        sizes: ["M", "L", "XL"],
        colors: ["Navy Blue"],
        stock: 30,
        discount: 15,
        rating: 4.4,
      },
      {
        productName: "Tan Leather Loafers",
        category: "Shoes",
        price: 5499,
        description: "Premium tan leather loafers, handcrafted for everyday comfort.",
        sizes: ["40", "41", "42", "43", "44"],
        colors: ["Tan"],
        stock: 20,
        rating: 4.6,
      },
      {
        productName: "Structured Leather Handbag",
        category: "Accessories",
        price: 6499,
        description: "Elegant structured handbag made from genuine leather.",
        sizes: ["One Size"],
        colors: ["Black", "Brown"],
        stock: 15,
        discount: 8,
        rating: 4.8,
      },
    ]);
    console.log(`${products.length} products added.`);

    // Insert sample customers
    const customers = await Customer.insertMany([
      {
        name: "Ayesha Khan",
        phoneNumber: "923001112233",
        instagramId: "ayesha.k",
        address: "House 12, Gulberg, Lahore",
        preferences: { favoriteColor: "Black", favoriteCategory: "Dresses" },
      },
      {
        name: "Bilal Ahmed",
        phoneNumber: "923004445566",
        instagramId: "bilal.ahmed",
        address: "Flat 3B, Clifton, Karachi",
        preferences: { favoriteColor: "Navy Blue", favoriteCategory: "Jackets" },
      },
    ]);
    console.log(`${customers.length} customers added.`);

    // Insert sample orders
    const orders = await Order.insertMany([
      {
        customerId: customers[0]._id,
        products: [
          { productId: products[0]._id, quantity: 1 },
          { productId: products[5]._id, quantity: 1 },
        ],
        status: "Confirmed",
        paymentStatus: "Paid",
        trackingNumber: "TRK1001",
      },
      {
        customerId: customers[1]._id,
        products: [{ productId: products[3]._id, quantity: 1 }],
        status: "Pending",
        paymentStatus: "Unpaid",
      },
    ]);
    console.log(`${orders.length} orders added.`);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
