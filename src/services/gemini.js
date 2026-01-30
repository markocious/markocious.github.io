import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

export const initializeGemini = (apiKey) => {
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    localStorage.setItem('fishda_api_key', apiKey); // Save for future sessions
  }
};

export const getStoredKey = () => {
  return localStorage.getItem('fishda_api_key');
};

export const clearStoredKey = () => {
  localStorage.removeItem('fishda_api_key');
  genAI = null;
};

export const identifyFishWithGemini = async (imageBase64) => {
  if (!genAI) {
    // Try to auto-initialize from storage
    const stored = getStoredKey();
    if (stored) {
      initializeGemini(stored);
    } else {
      throw new Error("API_KEY_MISSING");
    }
  }

  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  // Remove data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = imageBase64.split(',')[1];
  
  const prompt = `
  You are 'Fishda', a friendly, calm, and trustworthy expert fishing companion.
  A user (possibly a child or beginner) has sent you a photo of a fish.
  
  Your task:
  1. Identify the fish.
  2. Determine if it is safe to eat.
  3. Provide simple cooking tips.
  4. Provide 3 specific, popular recipe names for this fish.
  5. Provide a fun fact.
  
  Return ONLY raw JSON (no markdown formatting) with this structure:
  {
    "commonName": "Common Name",
    "scientificName": "Scientific Name",
    "pronunciation": "Phonetic pronunciation",
    "safetyLevel": "safe" | "caution" | "avoid",
    "edibilityText": "2-3 warm, human-like sentences explaining if it's safe and what it tastes like. Use a helpful tone.",
    "cookingMethods": ["Tip 1", "Tip 2", "Tip 3"],
    "recipes": [
      { "name": "Recipe Name 1 (e.g. Sweet and Sour Fish)" },
      { "name": "Recipe Name 2" },
      { "name": "Recipe Name 3" }
    ],
    "funFact": "One cheerful and educational fact.",
    "tips": "One safety or handling tip."
  }

  If the image is NOT a fish, return:
  {
    "error": "not_fish",
    "message": "I can't quite see a fish there! Try getting a clearer photo."
  }
  `;

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: "image/jpeg", // Assuming JPEG/PNG, API handles generic image types well
    },
  };

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    // Clean up if the model wraps in markdown
    const cleanJson = text.replace(/```json|```/g, '').trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
