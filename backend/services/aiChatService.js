const { detectIntent } = require("./intentDetection");
const { detectSentiment } = require("./sentimentAnalysis");
const { getProductRecommendations } = require("./productRecommendation");
const { generateReply } = require("./langchainClient");
const faqDataset = require("../data/faqDataset.json");

const PRODUCT_INTENTS = ["Product Search", "Size Inquiry", "Color Inquiry", "Discount Inquiry"];

const DEFAULT_FALLBACK_REPLY =
  "Thanks for reaching out! Could you tell me a bit more about what you're looking for, so I can help you better?";

// Finds the FAQ whose question shares the most words with the customer message
function findFaqAnswer(message) {
  const messageWords = message.toLowerCase().match(/\b\w+\b/g) || [];
  if (messageWords.length === 0) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const faq of faqDataset) {
    const questionWords = faq.question.toLowerCase().match(/\b\w+\b/g) || [];
    const score = questionWords.filter((word) => messageWords.includes(word)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  return bestScore >= 2 ? bestMatch.answer : null;
}

async function getChatResponse(message, sessionId) {
  if (!message || typeof message !== "string" || !message.trim()) {
    return {
      reply: DEFAULT_FALLBACK_REPLY,
      intent: "Unknown",
      sentiment: "Neutral",
      recommendedProducts: [],
    };
  }

  const safeSessionId = sessionId || "anonymous";

  const intent = await detectIntent(message);
  const sentiment = await detectSentiment(message);

  const recommendedProducts = PRODUCT_INTENTS.includes(intent)
    ? await getProductRecommendations(message)
    : [];

  const faqAnswer = findFaqAnswer(message);

  try {
    const reply = await generateReply({
      sessionId: safeSessionId,
      message,
      faqAnswer,
      recommendedProducts,
      sentiment,
    });

    return {
      reply: reply || faqAnswer || DEFAULT_FALLBACK_REPLY,
      intent,
      sentiment,
      recommendedProducts,
    };
  } catch (error) {
    console.error("aiChatService failed, using fallback reply:", error.message);
    return {
      reply: faqAnswer || DEFAULT_FALLBACK_REPLY,
      intent,
      sentiment,
      recommendedProducts,
    };
  }
}

module.exports = { getChatResponse };