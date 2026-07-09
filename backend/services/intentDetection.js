const openai = require("../config/openai");
const intentExamples = require("../data/intentExamples.json");

const VALID_INTENTS = intentExamples.map((entry) => entry.intent);

function buildIntentReference() {
  return intentExamples
    .map((entry) => {
      const examples = entry.examples.slice(0, 4).join(" | ");
      return `- ${entry.intent}: e.g. "${examples}"`;
    })
    .join("\n");
}

async function detectIntent(message) {
  if (!openai) return "Unknown";
  if (!message || typeof message !== "string" || !message.trim()) {
    return "Unknown";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "You are an intent classifier for a clothing brand's sales chatbot. " +
            "Classify the customer's message into exactly ONE of the following intents. " +
            "Reply with ONLY the intent label, nothing else.\n\n" +
            `${buildIntentReference()}\n\n` +
            `Valid labels: ${VALID_INTENTS.join(", ")}`,
        },
        { role: "user", content: message },
      ],
    });

    const rawLabel = response.choices?.[0]?.message?.content?.trim();

    // Only accept labels that match our known intent list
    const matchedIntent = VALID_INTENTS.find(
      (intent) => intent.toLowerCase() === rawLabel?.toLowerCase()
    );

    return matchedIntent || "Unknown";
  } catch (error) {
    console.error("Intent detection failed:", error.message);
    return "Unknown";
  }
}

module.exports = { detectIntent };