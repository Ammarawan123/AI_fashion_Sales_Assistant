require("dotenv").config();
const connectDB = require("./config/db");
const Product = require("./models/Product");
const Customer = require("./models/Customer");
const Order = require("./models/Order");

// Sample Data

const sampleProducts = [
  { productName: "Emerald Silk Evening Gown", category: "Women's Dresses", price: 8999, description: "Luxurious emerald silk gown, perfect for formal evening events.", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"], sizes: ["S", "M", "L"], colors: ["Emerald Green"], stock: 12, discount: 10, rating: 4.7 },
  { productName: "Floral Print Summer Dress", category: "Women's Dresses", price: 3499, description: "Lightweight floral summer dress with a relaxed fit.", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"], sizes: ["S", "M", "L", "XL"], colors: ["Pink", "Yellow"], stock: 25, discount: 5, rating: 4.3 },
  { productName: "Black Embroidered Maxi", category: "Women's Dresses", price: 4999, description: "Elegant black embroidered maxi dress for formal occasions.", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"], sizes: ["S", "M", "L"], colors: ["Black"], stock: 20, discount: 10, rating: 4.5 },
  { productName: "Red Floral Kurti", category: "Women's Kurtis", price: 2499, description: "Casual red floral printed kurti, breathable fabric.", images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"], sizes: ["M", "L"], colors: ["Red"], stock: 30, discount: 5, rating: 4.0 },
  { productName: "Hand Embroidered Bridal Lehenga", category: "Women's Formal Wear", price: 24999, description: "Fully hand embroidered bridal lehenga with dupatta.", images: ["https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?w=400"], sizes: ["S", "M", "L"], colors: ["Red", "Maroon"], stock: 3, discount: 0, rating: 5.0 },
  { productName: "Casual Summer Top", category: "Women's Tops", price: 1999, description: "Lightweight cotton top, perfect for summer.", images: ["https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400"], sizes: ["S", "M", "L"], colors: ["Yellow", "White"], stock: 22, discount: 10, rating: 3.9 },
  { productName: "Charcoal Slim Fit Blazer", category: "Men's Formal Wear", price: 7499, description: "Tailored charcoal blazer for formal and business occasions.", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"], sizes: ["M", "L", "XL"], colors: ["Charcoal Grey"], stock: 18, discount: 0, rating: 4.5 },
  { productName: "Beige Formal Shirt", category: "Men's Shirts", price: 2999, description: "Classic beige formal shirt for office wear.", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"], sizes: ["M", "L", "XL"], colors: ["Beige"], stock: 25, discount: 0, rating: 4.3 },
  { productName: "Plain White Cotton Shirt", category: "Men's Shirts", price: 1999, description: "Simple, everyday white cotton shirt.", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400"], sizes: ["M", "L", "XL"], colors: ["White"], stock: 40, discount: 0, rating: 4.0 },
  { productName: "Men's Slim Jeans", category: "Men's Jeans", price: 3499, description: "Slim fit denim jeans, stretchable fabric.", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"], sizes: ["30", "32", "34", "36"], colors: ["Blue", "Black"], stock: 40, discount: 15, rating: 4.1 },
  { productName: "Navy Blue Denim Jacket", category: "Men's Jackets", price: 4999, description: "Classic navy denim jacket with a modern trim fit.", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"], sizes: ["M", "L", "XL"], colors: ["Navy Blue"], stock: 30, discount: 15, rating: 4.4 },
  { productName: "Men's Winter Jacket", category: "Men's Jackets", price: 6999, description: "Warm padded jacket for winter season.", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"], sizes: ["M", "L", "XL"], colors: ["Navy", "Black"], stock: 12, discount: 0, rating: 4.5 },
  { productName: "Men's Formal Trousers", category: "Men's Trousers", price: 3299, description: "Tailored formal trousers for office wear.", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400"], sizes: ["30", "32", "34", "36"], colors: ["Grey", "Black"], stock: 28, discount: 5, rating: 4.1 },
  { productName: "Tan Leather Loafers", category: "Shoes", price: 5499, description: "Premium tan leather loafers, handcrafted for everyday comfort.", images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400"], sizes: ["40", "41", "42", "43", "44"], colors: ["Tan"], stock: 20, discount: 0, rating: 4.6 },
  { productName: "White Sneakers", category: "Shoes", price: 3999, description: "Comfortable everyday white sneakers.", images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400"], sizes: ["38", "39", "40", "41", "42"], colors: ["White"], stock: 35, discount: 20, rating: 4.6 },
  { productName: "Limited Edition Sneakers", category: "Shoes", price: 5999, description: "Limited edition colorway sneakers.", images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400"], sizes: ["40", "41", "42"], colors: ["White/Gold"], stock: 2, discount: 10, rating: 4.6 },
  { productName: "Structured Leather Handbag", category: "Accessories", price: 6499, description: "Elegant structured handbag made from genuine leather.", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"], sizes: ["One Size"], colors: ["Black", "Brown"], stock: 15, discount: 8, rating: 4.8 },
  { productName: "Leather Belt", category: "Accessories", price: 1499, description: "Genuine leather belt with metal buckle.", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"], sizes: ["Free Size"], colors: ["Black", "Brown"], stock: 50, discount: 0, rating: 4.4 },
  { productName: "Printed Chiffon Scarf", category: "Women's Accessories", price: 899, description: "Soft printed chiffon scarf.", images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400"], sizes: ["Free Size"], colors: ["Multicolor"], stock: 60, discount: 0, rating: 4.2 },
  { productName: "Basic Hair Clip Set", category: "Accessories", price: 299, description: "Set of 3 basic hair clips.", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"], sizes: ["Free Size"], colors: ["Assorted"], stock: 100, discount: 0, rating: 3.9 },
];

const sampleCustomers = [
  { name: "Ayesha Khan", phoneNumber: "923001112233", instagramId: "ayesha.k", address: "House 12, Gulberg, Lahore", preferences: { favoriteColor: "Black", favoriteCategory: "Dresses" } },
  { name: "Bilal Ahmed", phoneNumber: "923004445566", instagramId: "bilal.ahmed", address: "Flat 3B, Clifton, Karachi", preferences: { favoriteColor: "Navy Blue", favoriteCategory: "Jackets" } },
  { name: "Sana Malik", phoneNumber: "923007778899", instagramId: "sana.malik", address: "Street 5, F-10, Islamabad", preferences: { favoriteColor: "Red", favoriteCategory: "Kurtis" } },
  { name: "Usman Tariq", phoneNumber: "923009991122", instagramId: "usman.t", address: "House 45, DHA, Lahore", preferences: { favoriteColor: "Black", favoriteCategory: "Shoes" } },
  { name: "Hira Sheikh", phoneNumber: "923002223344", instagramId: "hira.sheikh", address: "Flat 7, Bahria Town, Rawalpindi", preferences: { favoriteColor: "Beige", favoriteCategory: "Tops" } },
  { name: "Fahad Rana", phoneNumber: "923005556677", instagramId: "fahad.rana", address: "House 22, Model Town, Lahore", preferences: { favoriteColor: "Navy", favoriteCategory: "Jackets" } },
];


// Helper Functions


async function clearCollections() {
  try {
    await Promise.all([
      Product.deleteMany(),
      Customer.deleteMany(),
      Order.deleteMany(),
    ]);
    console.log("Old data cleared.");
  } catch (error) {
    throw new Error(`Failed to clear existing collections: ${error.message}`);
  }
}

async function seedProducts() {
  try {
    const products = await Product.insertMany(sampleProducts, { ordered: true });
    console.log(`${products.length} products added.`);
    return products;
  } catch (error) {
    throw new Error(`Failed to seed products: ${error.message}`);
  }
}

async function seedCustomers() {
  try {
    const customers = await Customer.insertMany(sampleCustomers, { ordered: true });
    console.log(`${customers.length} customers added.`);
    return customers;
  } catch (error) {
    throw new Error(`Failed to seed customers: ${error.message}`);
  }
}

async function seedOrders(products, customers) {
  if (!products?.length || !customers?.length) {
    throw new Error(
      "Cannot seed orders: products or customers list is empty. Seed products and customers first."
    );
  }

  const orderDefinitions = [
    {
      customerIndex: 0,
      items: [
        { productIndex: 0, quantity: 1 },
        { productIndex: 16, quantity: 1 },
      ],
      status: "Confirmed",
      paymentStatus: "Paid",
      trackingNumber: "TRK1001",
    },
    {
      customerIndex: 1,
      items: [{ productIndex: 10, quantity: 1 }],
      status: "Pending",
      paymentStatus: "Unpaid",
      trackingNumber: null,
    },
    {
      customerIndex: 2,
      items: [
        { productIndex: 3, quantity: 1 },
        { productIndex: 18, quantity: 1 },
      ],
      status: "Shipped",
      paymentStatus: "Paid",
      trackingNumber: "TRK1002",
    },
    {
      customerIndex: 3,
      items: [{ productIndex: 14, quantity: 1 }],
      status: "Delivered",
      paymentStatus: "Paid",
      trackingNumber: "TRK1003",
    },
  ];

  const ordersToInsert = [];

  for (const def of orderDefinitions) {
    const customer = customers[def.customerIndex];

    if (!customer) {
      console.warn(`Skipping order: no customer found at index ${def.customerIndex}.`);
      continue;
    }

    const orderProducts = [];
    let hasInvalidProduct = false;

    for (const item of def.items) {
      const product = products[item.productIndex];

      if (!product) {
        console.warn(
          `Skipping order for ${customer.name}: no product found at index ${item.productIndex}.`
        );
        hasInvalidProduct = true;
        break;
      }

      orderProducts.push({ productId: product._id, quantity: item.quantity });
    }

    if (hasInvalidProduct || orderProducts.length === 0) {
      continue;
    }

    ordersToInsert.push({
      customerId: customer._id,
      products: orderProducts,
      status: def.status,
      paymentStatus: def.paymentStatus,
      trackingNumber: def.trackingNumber,
    });
  }

  if (ordersToInsert.length === 0) {
    console.warn("No valid orders to insert.");
    return [];
  }

  try {
    const orders = await Order.insertMany(ordersToInsert, { ordered: true });
    console.log(`${orders.length} orders added.`);
    return orders;
  } catch (error) {
    throw new Error(`Failed to seed orders: ${error.message}`);
  }
}

// Main Seed Runner

async function seedDatabase() {
  try {
    await connectDB();

    await clearCollections();

    const products = await seedProducts();
    const customers = await seedCustomers();
    await seedOrders(products, customers);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed. The database may be partially seeded.");
    console.error(`Reason: ${error.message}`);
    process.exit(1);
  }
}

seedDatabase();
