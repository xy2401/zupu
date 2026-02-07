
import { GoogleGenAI } from "@google/genai";
import { Person } from "../types";

// Initialize the Google GenAI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateBiography(person: Person, familyName: string, origin: string): Promise<string> {
  try {
    const prompt = `
      请为以下这位家族成员撰写一段富有文学色彩、感人至深的生平传记：
      姓名：${familyName}${person.name}
      性别：${person.gender === 'male' ? '男' : '女'}
      祖籍：${origin}
      出生日期：${person.birthDate || '不详'}
      职业：${person.occupation || '不详'}
      
      要求：
      1. 使用典雅的中文叙事风格。
      2. 结合其所处的时代背景（如果是民国或清末）。
      3. 强调其在家族传承中的地位。
      4. 字数约200-300字。
    `;

    // Generate content using the Gemini 3 Flash model.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    // Access the generated text directly from the response object.
    return response.text || "未能生成传记，请稍后重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成生平失败，请手动输入或检查网络。";
  }
}
