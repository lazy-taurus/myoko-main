import axios from "axios";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GOOGLE_API_KEY;

// System prompt to guide the AI for an e-commerce website
const SYSTEM_PROMPT = `
You are an AI assistant for an e-commerce website that specializes in helping users shop efficiently. 
Your tasks include:

1. **Product Recommendations**: Suggest products based on user preferences.
2. **Order Assistance**: Help track orders, process refunds, and provide delivery updates.
3. **Shopping Tips**: Guide users on finding discounts, best deals, and seasonal offers.
4. **Customer Support**: Answer FAQs about shipping, returns, and payment options.
5. **Product Comparisons**: Compare items based on features, reviews, and pricing.

If a question is unrelated to shopping or e-commerce, respond with: "I can only assist with shopping and e-commerce-related queries."
`;

export const generateContent = async (userPrompt) => {
  try {
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${userPrompt}`;

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: fullPrompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const generatedContent = response.data.candidates[0]?.content?.parts[0]?.text || "No response generated.";

    // Validate if the response is related to e-commerce
    if (!isEcommerceRelated(generatedContent)) {
      return "I can only assist with shopping and e-commerce-related queries.";
    }

    return generatedContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content.");
  }
};

// Helper function to check if the response is e-commerce-related
const isEcommerceRelated = (response) => {
  const ecommerceKeywords = [
    "shopping", "discount", "cart", "checkout", "order", "delivery", "payment",
    "refund", "product", "sale", "deal", "offer", "customer service",
    "shipping", "wishlist", "store", "buy", "sell", "recommendations"
  ]; 
  return ecommerceKeywords.some(keyword => response.toLowerCase().includes(keyword.toLowerCase()));
};
