const openai = require("../config/openai");

const VALID_SENTIMENTS = ["Happy", "Angry", "Frustrated", "Interested Buyer"];

async function detectSentiment(message) {
  if (!openai) return "Neutral";
  if (!message || typeof message !== "string" || !message.trim()) {
    return "Neutral";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment classifier for a clothing brand's sales chatbot. " +
            "Classify the customer's message into exactly ONE of these sentiments: " +
            `${VALID_SENTIMENTS.join(", ")}. ` +
            "Reply with ONLY the sentiment label, nothing else.",
        },
        { role: "user", content: message },
      ],
    });

    const rawLabel = response.choices?.[0]?.message?.content?.trim();

    // Only accept labels that match our known sentiment list
    const matchedSentiment = VALID_SENTIMENTS.find(
      (sentiment) => sentiment.toLowerCase() === rawLabel?.toLowerCase()
    );

    return matchedSentiment || "Neutral";
  } catch (error) {
    console.error("Sentiment analysis failed:", error.message);
    return "Neutral";
  }
}

module.exports = { detectSentiment };