const { ChatOpenAI } = require("@langchain/openai");
const { SystemMessage, HumanMessage, AIMessage } = require("@langchain/core/messages");

let chatModel = null;

if (process.env.OPENAI_API_KEY) {
  chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    configuration: {
      baseURL: "https://api.groq.com/openai/v1",
    },
  });
} else {
  console.error("OPENAI_API_KEY is missing in .env — LangChain reply generation will be disabled.");
}

// Per-session memory, capped so long chats don't grow the prompt indefinitely
const sessionHistories = new Map();
const MAX_HISTORY_MESSAGES = 10;

function getHistory(sessionId) {
  if (!sessionHistories.has(sessionId)) {
    sessionHistories.set(sessionId, []);
  }
  return sessionHistories.get(sessionId);
}

function appendToHistory(sessionId, humanText, aiText) {
  const history = getHistory(sessionId);
  history.push(new HumanMessage(humanText), new AIMessage(aiText));
  if (history.length > MAX_HISTORY_MESSAGES) {
    history.splice(0, history.length - MAX_HISTORY_MESSAGES);
  }
}

function buildSystemPrompt({ faqAnswer, recommendedProducts, sentiment }) {
  let prompt =
    "You are a friendly, professional AI sales assistant for a fashion store. " +
    "Keep replies short, natural, and on-brand. Never invent products, prices, or policies " +
    "that aren't given to you as context.";

  if (sentiment) {
    prompt += ` The customer currently seems ${sentiment.toLowerCase()}, so adjust your tone accordingly.`;
  }
  if (faqAnswer) {
    prompt += `\n\nRelevant store policy/FAQ info:\n${faqAnswer}`;
  }
  if (recommendedProducts && recommendedProducts.length > 0) {
    const productLines = recommendedProducts
      .map(
        (p) =>
          `- ${p.productName} (${p.category}), Rs ${p.price}, colors: ${p.colors.join(", ")}, sizes: ${p.sizes.join(", ")}, stock: ${p.stock}`
      )
      .join("\n");
    prompt += `\n\nProducts currently available to recommend:\n${productLines}`;
  }

  return prompt;
}

// Returns the generated reply, or null on any failure/unavailability so the caller can fall back
async function generateReply({ sessionId, message, faqAnswer, recommendedProducts, sentiment }) {
  if (!chatModel) return null;

  try {
    const history = getHistory(sessionId);
    const systemPrompt = buildSystemPrompt({ faqAnswer, recommendedProducts, sentiment });
    const messages = [new SystemMessage(systemPrompt), ...history, new HumanMessage(message)];

    const response = await chatModel.invoke(messages);
    const replyText = response.content;

    appendToHistory(sessionId, message, replyText);
    return replyText;
  } catch (err) {
    console.error("LangChain reply generation failed:", err.message);
    return null;
  }
}

module.exports = { generateReply };