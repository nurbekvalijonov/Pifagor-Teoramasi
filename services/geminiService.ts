import { GoogleGenAI } from "@google/genai";
import { GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGemini = async (topic: string, question: string): Promise<GeminiResponse> => {
  try {
    const prompt = `
      Sen 8-sinf o'quvchilari uchun matematika yordamchisisan.
      Mavzu: "${topic}".
      Savol: "${question}".
      
      Iltimos, Pifagor teoremasi ushbu vaziyatda qanday ishlatilishini juda sodda, qiziqarli va hayotiy qilib tushuntirib ber. 
      Agar kerak bo'lsa, Google Search tool'dan foydalanib qo'shimcha qiziqarli fakt qo'sh.
      Javobni o'zbek tilida ber.
      Maksimal 3-4 gap bo'lsin.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Keeping it strictly text output for simpler UI integration, handled via markdown later if needed
      }
    });

    // Extract text
    const text = response.text || "Uzr, ma'lumot topilmadi.";
    
    // Extract sources if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: string[] = [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri) {
        sources.push(chunk.web.uri);
      }
    });

    return {
      text,
      sources: Array.from(new Set(sources)) // Unique sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Kechirasiz, hozir bog'lanishda xatolik yuz berdi. Birozdan so'ng urinib ko'ring."
    };
  }
};