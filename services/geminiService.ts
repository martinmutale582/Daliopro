
import { GoogleGenAI, Chat } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

const SYSTEM_INSTRUCTION = `
You are DalioPro AI, a premier financial investment advisor specifically for the Zambian market.
Your traits:
1. Professional, encouraging, and knowledgeable about the Zambian economy (Copper prices, Kwacha volatility, Rainfall patterns for agriculture).
2. You explain concepts clearly to everyday Zambians who want to grow their wealth.
3. You deal in Zambian Kwacha (ZMW).
4. You are aware of risks like inflation and currency depreciation.
5. Always advise diversification.
6. Keep responses concise (under 150 words) unless asked for a detailed report.
7. If asked about specific stock advice, give general educational guidance but disclaim you are an AI.

Context:
- GRZ Bonds are safe but locking.
- Agriculture relies on rain/season (high risk/high reward).
- Mining is tied to global copper prices.
`;

export const createChatSession = (): Chat => {
  const client = getClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });
};

export const analyzePortfolio = async (portfolioDetails: string): Promise<string> => {
  const client = getClient();
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this portfolio risk and suggest improvements for a Zambian investor: ${portfolioDetails}`,
      config: {
        systemInstruction: "Be brief, analytical, and supportive. Focus on risk mitigation strategies within Zambia.",
      }
    });
    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Sorry, I could not analyze the portfolio at this moment. Please try again later.";
  }
};