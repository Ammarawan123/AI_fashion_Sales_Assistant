require("dotenv").config();
const connectDB = require("./config/db");
const Product = require("./models/Product");
const Customer = require("./models/Customer");
const Order = require("./models/Order");

const sampleProducts = [
  { productName: "Emerald Silk Evening Gown", category: "Women's Dresses", price: 8999, description: "Luxurious emerald silk gown, perfect for formal evening events.", images: ["https://placehold.co/400x500/046307/ffffff?text=Emerald+Silk+Gown"], sizes: ["S", "M", "L"], colors: ["Emerald Green"], stock: 12, discount: 10, rating: 4.7 },
  { productName: "Floral Print Summer Dress", category: "Women's Dresses", price: 3499, description: "Lightweight floral summer dress with a relaxed fit.", images: ["https://placehold.co/400x500/ffb6c1/333333?text=Floral+Summer+Dress"], sizes: ["S", "M", "L", "XL"], colors: ["Pink", "Yellow"], stock: 25, discount: 5, rating: 4.3 },
  { productName: "Black Embroidered Maxi", category: "Women's Dresses", price: 4999, description: "Elegant black embroidered maxi dress for formal occasions.", images: ["https://placehold.co/400x500/000000/ffffff?text=Black+Embroidered+Maxi"], sizes: ["S", "M", "L"], colors: ["Black"], stock: 20, discount: 10, rating: 4.5 },
  { productName: "Red Floral Kurti", category: "Women's Kurtis", price: 2499, description: "Casual red floral printed kurti, breathable fabric.", images: ["https://placehold.co/400x500/c1121f/ffffff?text=Red+Floral+Kurti"], sizes: ["M", "L"], colors: ["Red"], stock: 30, discount: 5, rating: 4.0 },
  { productName: "Hand Embroidered Bridal Lehenga", category: "Women's Formal Wear", price: 24999, description: "Fully hand embroidered bridal lehenga with dupatta.", images: ["https://placehold.co/400x500/800000/ffffff?text=Bridal+Lehenga"], sizes: ["S", "M", "L"], colors: ["Red", "Maroon"], stock: 3, discount: 0, rating: 5.0 },
  { productName: "Casual Summer Top", category: "Women's Tops", price: 1999, description: "Lightweight cotton top, perfect for summer.", images: ["https://placehold.co/400x500/fff176/333333?text=Casual+Summer+Top"], sizes: ["S", "M", "L"], colors: ["Yellow", "White"], stock: 22, discount: 10, rating: 3.9 },
  { productName: "Charcoal Slim Fit Blazer", category: "Men's Formal Wear", price: 7499, description: "Tailored charcoal blazer for formal and business occasions.", images: ["https://placehold.co/400x500/36454f/ffffff?text=Charcoal+Blazer"], sizes: ["M", "L", "XL"], colors: ["Charcoal Grey"], stock: 18, discount: 0, rating: 4.5 },
  { productName: "Beige Formal Shirt", category: "Men's Shirts", price: 2999, description: "Classic beige formal shirt for office wear.", images: ["https://placehold.co/400x500/f5f5dc/333333?text=Beige+Formal+Shirt"], sizes: ["M", "L", "XL"], colors: ["Beige"], stock: 25, discount: 0, rating: 4.3 },
  { productName: "Plain White Cotton Shirt", category: "Men's Shirts", price: 1999, description: "Simple, everyday white cotton shirt.", images: ["https://placehold.co/400x500/ffffff/333333?text=White+Cotton+Shirt"], sizes: ["M", "L", "XL"], colors: ["White"], stock: 40, discount: 0, rating: 4.0 },
  { productName: "Men's Slim Jeans", category: "Men's Jeans", price: 3499, description: "Slim fit denim jeans, stretchable fabric.", images: ["https://placehold.co/400x500/1560bd/ffffff?text=Slim+Jeans"], sizes: ["30", "32", "34", "36"], colors: ["Blue", "Black"], stock: 40, discount: 15, rating: 4.1 },
  { productName: "Navy Blue Denim Jacket", category: "Men's Jackets", price: 4999, description: "Classic navy denim jacket with a modern trim fit.", images: ["https://placehold.co/400x500/000080/ffffff?text=Navy+Denim+Jacket"], sizes: ["M", "L", "XL"], colors: ["Navy Blue"], stock: 30, discount: 15, rating: 4.4 },
  { productName: "Men's Winter Jacket", category: "Men's Jackets", price: 6999, description: "Warm padded jacket for winter season.", images: ["https://placehold.co/400x500/1a1a2e/ffffff?text=Winter+Jacket"], sizes: ["M", "L", "XL"], colors: ["Navy", "Black"], stock: 12, discount: 0, rating: 4.5 },
  { productName: "Men's Formal Trousers", category: "Men's Trousers", price: 3299, description: "Tailored formal trousers for office wear.", images: ["https://placehold.co/400x500/808080/ffffff?text=Formal+Trousers"], sizes: ["30", "32", "34", "36"], colors: ["Grey", "Black"], stock: 28, discount: 5, rating: 4.1 },
  { productName: "Tan Leather Loafers", category: "Shoes", price: 5499, description: "Premium tan leather loafers, handcrafted for everyday comfort.", images: ["https://placehold.co/400x500/d2b48c/333333?text=Tan+Loafers"], sizes: ["40", "41", "42", "43", "44"], colors: ["Tan"], stock: 20, discount: 0, rating: 4.6 },
  { productName: "White Sneakers", category: "Shoes", price: 3999, description: "Comfortable everyday white sneakers.", images: ["https://placehold.co/400x500/ffffff/333333?text=White+Sneakers"], sizes: ["38", "39", "40", "41", "42"], colors: ["White"], stock: 35, discount: 20, rating: 4.6 },
  { productName: "Limited Edition Sneakers", category: "Shoes", price: 5999, description: "Limited edition colorway sneakers.", images: ["https://placehold.co/400x500/ffd700/333333?text=Limited+Edition+Sneakers"], sizes: ["40", "41", "42"], colors: ["White/Gold"], stock: 2, discount: 10, rating: 4.6 },
  { productName: "Structured Leather Handbag", category: "Accessories", price: 6499, description: "Elegant structured handbag made from genuine leather.", images: ["https://placehold.co/400x500/5c4033/ffffff?text=Leather+Handbag"], sizes: ["One Size"], colors: ["Black", "Brown"], stock: 15, discount: 8, rating: 4.8 },
  { productName: "Leather Belt", category: "Accessories", price: 1499, description: "Genuine leather belt with metal buckle.", images: ["https://placehold.co/400x500/3b2f2f/ffffff?text=Leather+Belt"], sizes: ["Free Size"], colors: ["Black", "Brown"], stock: 50, discount: 0, rating: 4.4 },
  { productName: "Printed Chiffon Scarf", category: "Women's Accessories", price: 899, description: "Soft printed chiffon scarf.", images: ["https://placehold.co/400x500/da70d6/ffffff?text=Chiffon+Scarf"], sizes: ["Free Size"], colors: ["Multicolor"], stock: 60, discount: 0, rating: 4.2 },
  { productName: "Basic Hair Clip Set", category: "Accessories", price: 299, description: "Set of 3 basic hair clips.", images: ["https://placehold.co/400x500/ffa500/333333?text=Hair+Clip+Set"], sizes: ["Free Size"], colors: ["Assorted"], stock: 100, discount: 0, rating: 3.9 },

  // Edge-case test products from testingProductData.json
  { productName: "Ivory Lace Wedding Gown", category: "Women's Dresses", price: 12999, description: "Elegant ivory lace gown for wedding events.", images: ["https://placehold.co/400x500/fffff0/333333?text=Ivory+Lace+Gown"], sizes: ["S", "M", "L"], colors: ["Ivory"], stock: 0, discount: 0, rating: 4.9 }, 
  { productName: "Clearance Denim Jacket", category: "Men's Jackets", price: 4999, description: "Denim jacket on clearance sale.", images: ["https://placehold.co/400x500/4a69bd/ffffff?text=Clearance+Denim+Jacket"], sizes: ["M", "L"], colors: ["Blue"], stock: 5, discount: 50, rating: 3.8 }, 
  { productName: "One Size Printed Scarf", category: "Women's Accessories", price: 799, description: "Lightweight printed scarf, one size fits all.", images: ["https://placehold.co/400x500/ff69b4/ffffff?text=Printed+Scarf"], sizes: ["Free Size"], colors: ["Multicolor"], stock: 22, discount: 0, rating: 4.1 }, 
  { productName: "Mini Keychain Pouch", category: "Accessories", price: 199, description: "Small keychain pouch, great for essentials.", images: ["https://placehold.co/400x500/333333/ffffff?text=Keychain+Pouch"], sizes: ["Free Size"], colors: ["Black", "Pink"], stock: 80, discount: 0, rating: 3.7 }, 
  { productName: "Diamond Stitched Sherwani", category: "Men's Formal Wear", price: 27999, description: "Premium hand-stitched sherwani for weddings and formal events.", images: ["https://placehold.co/400x500/ffd700/333333?text=Diamond+Sherwani"], sizes: ["M", "L", "XL"], colors: ["Gold", "Cream"], stock: 4, discount: 0, rating: 4.9 },
  { productName: "Rose Gold Ankle Strap Heels", category: "Shoes", price: 4499, description: "Elegant rose gold heels with ankle strap detail.", images: ["https://placehold.co/400x500/b76e79/ffffff?text=Rose+Gold+Heels"], sizes: ["36", "37", "38"], colors: ["Rose Gold"], stock: 2, discount: 10, rating: 4.5 }, 
  { productName: "New Arrival Linen Shirt", category: "Men's Shirts", price: 2599, description: "Just-launched breathable linen shirt, not yet reviewed.", images: ["https://placehold.co/400x500/87ceeb/333333?text=Linen+Shirt"], sizes: ["M", "L", "XL"], colors: ["Sky Blue"], stock: 30, discount: 0, rating: 0 },
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
