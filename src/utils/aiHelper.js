import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
console.log("Gemini API Key:", API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getWeatherSummary(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash", 
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate a weather summary.";
  }
}
