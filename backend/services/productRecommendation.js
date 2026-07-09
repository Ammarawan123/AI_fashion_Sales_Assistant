const Product = require("../models/Product");

const CATEGORY_KEYWORDS = {
  "Women's Dresses": ["dress", "gown", "maxi"],
  "Women's Kurtis": ["kurti"],
  "Women's Tops": ["top"],
  "Women's Formal Wear": ["lehenga", "bridal"],
  "Women's Accessories": ["scarf", "handbag"],
  "Men's Shirts": ["shirt"],
  "Men's Jeans": ["jeans"],
  "Men's Jackets": ["jacket"],
  "Men's Formal Wear": ["blazer", "sherwani"],
  "Men's Trousers": ["trouser", "pant"],
  "Shoes": ["shoe", "sneaker", "loafer", "heel"],
  "Accessories": ["belt", "bag", "clip"],
};

const COLOR_KEYWORDS = [
  "black", "white", "red", "blue", "navy", "green", "emerald",
  "pink", "yellow", "beige", "grey", "gray", "tan", "brown",
  "gold", "maroon", "charcoal",
];

const SIZE_KEYWORDS = ["xs", "s", "m", "l", "xl", "xxl", "free size"];

function extractFilters(message) {
  const lowerMessage = message.toLowerCase();
  const filters = {};

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lowerMessage.includes(kw))) {
      filters.category = category;
      break;
    }
  }

  const matchedColor = COLOR_KEYWORDS.find((color) => lowerMessage.includes(color));
  if (matchedColor) filters.color = matchedColor;

  const matchedSize = SIZE_KEYWORDS.find((size) =>
    new RegExp(`\\b${size}\\b`).test(lowerMessage)
  );
  if (matchedSize) filters.size = matchedSize;

  // Range checked first ("2000 to 5000") so it isn't misread as a single "under/above" bound
  const rangeMatch = lowerMessage.match(/(\d+)\s*(?:to|-)\s*(\d+)/);
  if (rangeMatch) {
    filters.minPrice = parseInt(rangeMatch[1], 10);
    filters.maxPrice = parseInt(rangeMatch[2], 10);
  } else {
    const underMatch = lowerMessage.match(/under\s*(?:rs\.?)?\s*(\d+)/i);
    if (underMatch) filters.maxPrice = parseInt(underMatch[1], 10);

    const aboveMatch = lowerMessage.match(/(?:above|over)\s*(?:rs\.?)?\s*(\d+)/i);
    if (aboveMatch) filters.minPrice = parseInt(aboveMatch[1], 10);
  }

  return filters;
}

// Recommends up to 5 in-stock products matching filters parsed from the customer's message
async function getProductRecommendations(message) {
  if (!message || typeof message !== "string" || !message.trim()) {
    return [];
  }

  try {
    const filters = extractFilters(message);
    const query = { stock: { $gt: 0 } };

    if (filters.category) query.category = filters.category;
    if (filters.color) query.colors = { $regex: filters.color, $options: "i" };
    if (filters.size) query.sizes = { $regex: `^${filters.size}$`, $options: "i" };
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    const products = await Product.find(query).limit(5).lean();
    return products;
  } catch (error) {
    console.error("Product recommendation failed:", error.message);
    return [];
  }
}

module.exports = { getProductRecommendations };